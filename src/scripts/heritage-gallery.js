document.querySelectorAll('[data-heritage-gallery]').forEach(gallery => {
  const dialog = gallery.querySelector('[data-gallery-dialog]');
  if (!dialog || typeof dialog.showModal !== 'function') return;
  const links = [...gallery.querySelectorAll('[data-gallery-item]')];
  const zh = gallery.dataset.galleryLang.startsWith('zh');
  const image = dialog.querySelector('[data-gallery-image]');
  const stage = dialog.querySelector('[data-gallery-stage]');
  const status = dialog.querySelector('[data-gallery-status]');
  const zoom = dialog.querySelector('[data-gallery-zoom]');
  let current = 0;
  const resetZoom = () => {
    stage.classList.remove('is-zoomed');
    zoom.setAttribute('aria-pressed','false');
    zoom.textContent = zh ? '放大查看' : 'Zoom in';
    stage.scrollTo(0,0);
  };
  const show = index => {
    current = (index + links.length) % links.length;
    const link = links[current];
    resetZoom();
    image.hidden = true;
    status.hidden = false;
    status.textContent = zh ? '正在加载图片…' : 'Loading image…';
    image.alt = link.querySelector('img').alt;
    image.width = Number(link.dataset.galleryWidth);
    image.height = Number(link.dataset.galleryHeight);
    image.src = link.href;
    dialog.querySelector('[data-gallery-counter]').textContent = `${String(current + 1).padStart(2,'0')} / ${links.length}`;
    dialog.querySelector('[data-gallery-open]').href = link.href;
  };
  image.addEventListener('load',() => { image.hidden=false; status.hidden=true; });
  image.addEventListener('error',() => { image.hidden=true; status.hidden=false; status.textContent=zh?'图片暂时无法加载，请重试或在新窗口打开。':'This image could not be loaded. Try again or open it in a new tab.'; });
  links.forEach((link,index) => link.addEventListener('click',event => {
    if(event.metaKey||event.ctrlKey||event.shiftKey||event.altKey) return;
    event.preventDefault();
    show(index);
    dialog.showModal();
    document.documentElement.classList.add('gallery-open');
  }));
  dialog.querySelector('[data-gallery-prev]').addEventListener('click',()=>show(current-1));
  dialog.querySelector('[data-gallery-next]').addEventListener('click',()=>show(current+1));
  dialog.querySelector('[data-gallery-close]').addEventListener('click',()=>dialog.close());
  zoom.addEventListener('click',()=>{
    const active=stage.classList.toggle('is-zoomed');
    zoom.setAttribute('aria-pressed',String(active));
    zoom.textContent=active?(zh?'适应窗口':'Fit image'):(zh?'放大查看':'Zoom in');
    stage.scrollTo(0,0);
  });
  dialog.addEventListener('keydown',event=>{
    if(stage.classList.contains('is-zoomed')) return;
    if(event.key==='ArrowLeft'){event.preventDefault();show(current-1);}
    if(event.key==='ArrowRight'){event.preventDefault();show(current+1);}
  });
  dialog.addEventListener('click',event=>{
    const r=dialog.getBoundingClientRect();
    if(event.target===dialog&&(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom))dialog.close();
  });
  dialog.addEventListener('close',()=>{document.documentElement.classList.remove('gallery-open');resetZoom();});
});
