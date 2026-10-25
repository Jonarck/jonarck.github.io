const switcher = document.querySelector('[data-name-scripts]');
const trigger = switcher?.querySelector('.name-script-trigger');
const dialog = document.getElementById('name-script-dialog');

if (trigger && dialog && typeof dialog.showModal === 'function') {
  const panels = [...dialog.querySelectorAll('[data-script-source]')];
  const artwork = trigger.querySelector('use');
  const playback = switcher.querySelector('.name-script-playback');
  const viewToggle = dialog.querySelector('[data-name-view-toggle]');
  const sourceView = dialog.querySelector('[data-source-view]');
  const overview = dialog.querySelector('[data-overview-view]');
  const context = dialog.querySelector('[data-script-context]');
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  const interval = 6000;
  let current = 0;
  let sourceIndex = 0;
  let timer;
  let paused = motion.matches;
  let hovering = false;
  let focused = false;

  function showSource(index) {
    sourceIndex = index;
    panels.forEach((panel, i) => { panel.hidden = i !== index; });
    const { scriptLabel, scriptEnglish } = panels[index].dataset;
    context.children[0].textContent = scriptLabel;
    context.children[1].textContent = scriptEnglish;
    sourceView.hidden = false;
    overview.hidden = true;
    dialog.querySelector('[data-view-title]').textContent = '字形出处';
    dialog.querySelector('[data-view-subtitle]').textContent = 'Script sources';
    viewToggle.innerHTML = '全部书体 <span lang="en">· All scripts →</span>';
    dialog.scrollTop = 0;
  }

  function showOverview() {
    sourceView.hidden = true;
    overview.hidden = false;
    context.children[0].textContent = '蒋卓洋';
    context.children[1].textContent = '7 scripts';
    dialog.querySelector('[data-view-title]').textContent = '七种书体';
    dialog.querySelector('[data-view-subtitle]').textContent = 'Calligraphy overview';
    viewToggle.innerHTML = '← 字形出处 <span lang="en">· Sources</span>';
    dialog.scrollTop = 0;
  }

  function applyCurrent() {
    const { scriptSource, scriptLabel, scriptEnglish } = panels[current].dataset;
    artwork.setAttribute('href', `#name-glyph-${scriptSource}`);
    trigger.dataset.script = scriptSource;
    trigger.title = `${scriptLabel} · ${scriptEnglish} · View sources`;
  }

  function schedule() {
    clearTimeout(timer);
    if (paused || hovering || focused || dialog.open || document.hidden) return;
    timer = setTimeout(() => {
      current = (current + 1) % panels.length;
      applyCurrent();
      schedule();
    }, interval);
  }

  function updatePlayback() {
    playback.setAttribute('aria-pressed', String(paused));
    playback.setAttribute('aria-label', paused ? 'Resume calligraphy rotation' : 'Pause calligraphy rotation');
    playback.title = paused ? 'Resume rotation' : 'Pause rotation';
    playback.querySelector('[data-pause-icon]').setAttribute('display', paused ? 'none' : 'inline');
    playback.querySelector('[data-play-icon]').setAttribute('display', paused ? 'inline' : 'none');
    schedule();
  }

  applyCurrent();
  trigger.hidden = false;
  playback.hidden = false;
  switcher.querySelector('.name-script-fallback').hidden = true;
  updatePlayback();

  trigger.addEventListener('click', () => {
    showSource(current);
    dialog.showModal();
    trigger.setAttribute('aria-expanded', 'true');
    document.documentElement.classList.add('name-scripts-open');
    schedule();
  });
  playback.addEventListener('click', () => { paused = !paused; updatePlayback(); });
  switcher.addEventListener('pointerenter', event => { if (event.pointerType === 'mouse') { hovering = true; schedule(); } });
  switcher.addEventListener('pointerleave', () => { hovering = false; schedule(); });
  switcher.addEventListener('focusin', () => { focused = Boolean(switcher.querySelector(':focus-visible')); schedule(); });
  switcher.addEventListener('focusout', event => { focused = switcher.contains(event.relatedTarget) && event.relatedTarget.matches(':focus-visible'); schedule(); });
  document.addEventListener('visibilitychange', schedule);
  motion.addEventListener('change', () => { paused = motion.matches; updatePlayback(); });

  viewToggle.addEventListener('click', () => overview.hidden ? showOverview() : showSource(sourceIndex));
  dialog.querySelectorAll('[data-view-source]').forEach(button => button.addEventListener('click', () => {
    showSource(panels.findIndex(panel => panel.dataset.scriptSource === button.dataset.viewSource));
    viewToggle.focus({ preventScroll: true });
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
    schedule();
  });
}
