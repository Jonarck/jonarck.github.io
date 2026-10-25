"""Trace supplied historical specimens into transparent, currentColor SVG paths.

Usage: python tools/build-name-scripts.py --sources PATH_TO_EXTRACTED_PNGS
Requires numpy, opencv-python, scipy and scikit-image. No generative reconstruction is used.
The recipes are recorded in name-script-sources.json for reproducible extraction.
"""
from pathlib import Path
import argparse
import hashlib
import html
import json
import os
import cv2
import numpy as np
from scipy.ndimage import binary_fill_holes, distance_transform_edt, gaussian_filter
from skimage.morphology import skeletonize
from skimage.measure import find_contours

ROOT = Path(__file__).resolve().parents[1]
parser = argparse.ArgumentParser(description=__doc__)
parser.add_argument('--sources', type=Path, default=ROOT/'tools/ui-preview/name-scripts-2026-10-26/originals')
parser.add_argument('--preview', type=Path, default=ROOT/'tools/ui-preview/name-scripts-2026-10-26/trace-review.html')
parser.add_argument('--baseline', type=Path, help='Optional older name-scripts.json for a before/after review')
args = parser.parse_args()
recipes = json.loads((ROOT/'tools/name-script-sources.json').read_text(encoding='utf-8'))

def small_components(mask, minimum):
    count, labels, stats, _ = cv2.connectedComponentsWithStats(mask, 8)
    keep = np.zeros(count, dtype=np.uint8)
    keep[1:] = (stats[1:, cv2.CC_STAT_AREA] >= minimum) * 255
    return keep[labels]

def stroke_width(mask, scale):
    """Robust typical stroke width; ignore hairline ends and residual scan pinholes."""
    widths = 2 * distance_transform_edt(mask)[skeletonize(mask)] * scale
    widths = widths[widths > 1]
    return float(np.percentile(widths, 60))

def trace(gray, recipe, target):
    x0, y0, x1, y1 = recipe['crop']
    crop = gray[y0:y1, x0:x1]
    mask = ((crop > 170) if recipe.get('inverted') else (crop < 170)).astype(np.uint8)*255
    if 'polygon' in recipe:
        bounds = np.zeros_like(mask)
        polygon = np.array(recipe['polygon'], np.int32)-[x0,y0]
        cv2.fillPoly(bounds, [polygon.astype(np.int32)], 255)
        mask &= bounds
    for rectangle in recipe.get('exclude', []):
        left,top,right,bottom=rectangle
        mask[max(0,top-y0):bottom-y0, max(0,left-x0):right-x0]=0
    for operation, flag in [('opening', cv2.MORPH_OPEN), ('closing', cv2.MORPH_CLOSE)]:
        size = recipe.get(operation, 1)
        if size > 1:
            mask = cv2.morphologyEx(mask, flag, cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (size,size)))
    mask = small_components(mask, recipe.get('minArea',100))
    filled = binary_fill_holes(mask > 0)
    holes = (filled & (mask == 0)).astype(np.uint8)*255
    large_holes = small_components(holes, recipe.get('fillHoles',0)+1)
    mask |= holes & ~large_holes
    # Padding allows controlled thickening without clipping at the original crop.
    mask = np.pad(mask > 0, 24)
    x,y,w,h = cv2.boundingRect(mask.astype(np.uint8))
    scale = min(86/w, 92/h)
    # Smooth the signed-distance field, not the final SVG or its CSS rendering.
    # This removes scan chatter while leaving actual counters and major strokes.
    field = distance_transform_edt(mask) - distance_transform_edt(~mask)
    field = gaussian_filter(field, sigma=recipe.get('smooth',.45)/scale)
    clean = field > 0
    before = stroke_width(clean, scale)
    offset = float(np.clip((target-before)/2, -recipe.get('maxWeightOffset',1.4), recipe.get('maxWeightOffset',1.4)))
    level = -offset/scale
    final = field > level
    x,y,w,h = cv2.boundingRect(final.astype(np.uint8))
    scale = min(86/w, 92/h)
    tx,ty = (100-w*scale)/2-x*scale, (108-h*scale)/2-y*scale
    parts=[]
    for contour in find_contours(field, level=level):
        # Marching squares supplies subpixel contours rather than pixel stair-steps.
        contour = contour[:,::-1].astype(np.float32).reshape(-1,1,2)
        if abs(cv2.contourArea(contour)) * scale**2 < .12: continue
        vertices=cv2.approxPolyDP(contour, .65, True).reshape(-1,2)
        if len(vertices) < 3:continue
        points=vertices*scale+[tx,ty]
        parts.append('M'+'L'.join(f'{a:.2f},{b:.2f}' for a,b in points)+'Z')
    return ''.join(parts), dict(before=round(before,2),after=round(stroke_width(final,scale),2),target=target,offset=round(offset,2))

result=[]
baseline={item['id']:item for item in json.loads(args.baseline.read_text(encoding='utf-8'))} if args.baseline else {}
measurements={}
review=['<!doctype html><meta charset="utf-8"><title>Historical glyph tracing review</title><style>body{font:15px system-ui;background:#eef1f3;color:#2d424e;margin:30px}section{margin:40px 0}article{display:inline-flex;vertical-align:top;gap:12px;margin-right:20px}.source{width:130px;height:170px;position:relative;overflow:hidden;background:white}.source img{position:absolute;max-width:none}svg{width:130px;height:170px;background:repeating-conic-gradient(#fff 0% 25%,#e2e9eb 0% 50%) 0/12px 12px}small{display:block}</style>']
for script in recipes:
    file=args.sources/script['file']
    raw=file.read_bytes()
    gray=cv2.imdecode(np.frombuffer(raw, np.uint8), cv2.IMREAD_GRAYSCALE)
    glyphs=[]
    review.append(f'<section><h2>{script["label"]}</h2>')
    measurements[script['id']]=[]
    for index,glyph in enumerate(script['glyphs']):
        path,metrics=trace(gray,glyph,script['targetStroke'])
        measurements[script['id']].append(dict(char=glyph['char'],**metrics))
        data={key:glyph[key] for key in ['char','work','attribution','workEn','attributionEn','note','noteEn','url'] if key in glyph}
        data.update(path=path,viewBox='0 0 100 108')
        glyphs.append(data)
        x0,y0,x1,y1=glyph['crop']
        z=min(130/(x1-x0),170/(y1-y0))
        rel=Path(os.path.relpath(file,args.preview.parent)).as_posix()
        if script['id'] in baseline:
            old=baseline[script['id']]['glyphs'][index]['path']
            review.append(f'<article><div><svg viewBox="0 0 100 108"><path d="{old}" fill="currentColor" fill-rule="evenodd"/></svg><small>Before</small></div><div><svg viewBox="0 0 100 108"><path d="{path}" fill="currentColor" fill-rule="evenodd"/></svg><small>After · {metrics["after"]}</small></div></article>')
        else:
            review.append(f'<article><div><div class="source" style="height:{(y1-y0)*z}px"><img src="{rel}" style="width:{gray.shape[1]*z}px;left:{-x0*z}px;top:{-y0*z}px"></div><small>{glyph["char"]} · {html.escape(glyph["work"])}</small></div><svg viewBox="0 0 100 108"><path d="{path}" fill="currentColor" fill-rule="evenodd"/></svg></article>')
    review.append('</section>')
    result.append(dict(id=script['id'],label=script['label'],english=script['english'],viewBox='0 0 320 108',glyphs=glyphs,sourceFile=script['file'],sha256=hashlib.sha256(raw).hexdigest()))
(ROOT/'src/data/name-scripts.json').write_text(json.dumps(result,ensure_ascii=False,separators=(',',':'))+'\n',encoding='utf-8')
args.preview.parent.mkdir(parents=True,exist_ok=True)
args.preview.write_text(''.join(review),encoding='utf-8')
(args.preview.parent/'stroke-metrics.json').write_text(json.dumps(measurements,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
print('Traced 21 glyphs in 7 styles. Review original/vector pairs at', args.preview)
