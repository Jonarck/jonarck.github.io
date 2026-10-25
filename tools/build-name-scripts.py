"""Render the three name glyphs from attributed font sources without shipping fonts."""
from pathlib import Path
import hashlib
import json
import shutil
from fontTools.ttLib import TTFont
from fontTools.pens.boundsPen import BoundsPen
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen

ROOT = Path(__file__).resolve().parents[1]
SOURCES = ROOT / 'tools/ui-preview/name-scripts'
FONTS = [
    ('seal', '小篆', 'Small seal', '蔣卓洋', 'CNS-Seal.ttf', '數位發展部 · CNS11643 中文標準交換碼全字庫', 'https://www.cns11643.gov.tw/downloadList.jsp?ID=2&ID2=20'),
    ('clerical', '隶书', 'Clerical', '蔣卓洋', 'eduLi-v3.0-2019-06.ttf', '中華民國教育部 · 教育部隸書', 'https://language.moe.gov.tw/material/info?m=9fe3fb11-c3d5-41f2-b029-6d18a2c2fd0d'),
    ('regular', '楷书', 'Regular', '蒋卓洋', 'MaShanZheng-Regular.ttf', 'Ma Shan Zheng Project Authors', 'https://github.com/googlefonts/mashanzheng'),
    ('running', '行书', 'Running', '蒋卓洋', 'ZhiMangXing-Regular.ttf', 'Zhi Mang Xing Project Authors', 'https://github.com/googlefonts/zhimangxing'),
    ('cursive', '草书', 'Cursive', '蒋卓洋', 'LiuJianMaoCao-Regular.ttf', 'Liu Jian Mao Cao Project Authors', 'https://github.com/googlefonts/liujianmaocao'),
]
result = []
for key, label, english, text, filename, credit, source in FONTS:
    file = SOURCES / filename
    font = TTFont(file)
    cmap = font.getBestCmap()
    assert all(ord(char) in cmap for char in text), f'Missing name glyph in {filename}'
    glyphs = font.getGlyphSet()
    bounds = BoundsPen(glyphs)
    placements = []
    cursor = 0
    for char in text:
        name = cmap[ord(char)]
        placements.append((name, cursor))
        glyphs[name].draw(TransformPen(bounds, (1, 0, 0, 1, cursor, 0)))
        cursor += font['hmtx'][name][0] + font['head'].unitsPerEm * .08
    x0, y0, x1, y1 = bounds.bounds
    scale = min(300 / (x1-x0), 92 / (y1-y0))
    tx = (320 - (x1-x0)*scale) / 2 - x0*scale
    ty = (108 - (y1-y0)*scale) / 2 + y1*scale
    pen = SVGPathPen(glyphs, ntos=lambda value: f'{value:.2f}'.rstrip('0').rstrip('.') if '.' in f'{value:.2f}' else str(value))
    for name, x in placements:
        glyphs[name].draw(TransformPen(pen, (scale, 0, 0, -scale, tx+x*scale, ty)))
    result.append(dict(id=key, label=label, english=english, text=text, viewBox='0 0 320 108', path=pen.getCommands(), credit=credit, source=source, sourceFile=filename, sha256=hashlib.sha256(file.read_bytes()).hexdigest()))
    font.close()

(ROOT / 'src/data/name-scripts.json').write_text(json.dumps(result, ensure_ascii=False, separators=(',', ':')) + '\n', encoding='utf-8')
licenses = ROOT / 'licenses/name-scripts'
licenses.mkdir(parents=True, exist_ok=True)
for family in ['mashanzheng', 'zhimangxing', 'liujianmaocao']:
    shutil.copyfile(SOURCES / f'{family}-OFL.txt', licenses / f'{family}-OFL.txt')
print('Rendered five three-glyph name specimens; no font binaries distributed.')
