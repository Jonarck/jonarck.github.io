const trigger = document.querySelector('.name-script-trigger');
const dialog = document.getElementById('name-script-dialog');
if (trigger && dialog && typeof dialog.showModal === 'function') {
  const options = [...dialog.querySelectorAll('[data-name-script]')];
  const ids = options.map(option => option.dataset.nameScript);
  const artwork = trigger.querySelector('use');
  const apply = id => {
    if (!ids.includes(id)) return;
    artwork.setAttribute('href', `#name-glyph-${id}`);
    trigger.dataset.script = id;
    const selected = options.find(option => option.dataset.nameScript === id);
    trigger.title = `${selected.dataset.scriptLabel} · Change writing style`;
    options.forEach(option => option.setAttribute('aria-pressed', String(option === selected)));
  };
  let selected = 'clerical';
  try { selected = localStorage.getItem('name-script') || selected; } catch {}
  apply(ids.includes(selected) ? selected : 'clerical');
  trigger.hidden = false;
  document.querySelector('.name-script-fallback').hidden = true;
  trigger.addEventListener('click', () => {
    dialog.showModal();
    trigger.setAttribute('aria-expanded', 'true');
    document.documentElement.classList.add('name-scripts-open');
  });
  options.forEach(option => option.addEventListener('click', () => {
    const id = option.dataset.nameScript;
    apply(id);
    try { localStorage.setItem('name-script', id); } catch {}
    dialog.close();
  }));
  dialog.querySelector('[data-close-name-scripts]').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => {
    if (event.target !== dialog) return;
    const rect = dialog.getBoundingClientRect();
    if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
  });
  dialog.addEventListener('close', () => {
    trigger.setAttribute('aria-expanded', 'false');
    document.documentElement.classList.remove('name-scripts-open');
  });
}
