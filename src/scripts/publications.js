const library = document.querySelector('[data-publications]');
if (library) {
  const form = library.querySelector('.publication-filters');
  const rows = [...library.querySelectorAll('[data-publication]')];
  const groups = [...library.querySelectorAll('[data-publication-group]')];
  const results = document.getElementById('publication-results');
  const selectionNote = document.getElementById('selection-note');
  const empty = document.getElementById('publication-empty');

  function render() {
    const values = new FormData(form);
    const selection = values.get('selection');
    const area = values.get('area');
    let visible = 0;
    for (const row of rows) {
      row.hidden = (selection === 'selected' && row.dataset.selected !== 'true') ||
        (area !== 'all' && row.dataset.topic !== area);
      if (!row.hidden) visible++;
    }
    let visibleEmptyArea = false;
    for (const group of groups) {
      const groupRows = [...group.querySelectorAll('[data-publication]')];
      const count = groupRows.filter(row => !row.hidden).length;
      const matchesArea = area === 'all' || area === group.dataset.publicationGroup;
      group.hidden = !matchesArea || (groupRows.length > 0 && count === 0);
      if (!group.hidden && groupRows.length === 0) visibleEmptyArea = true;
      group.querySelector('[data-group-count]').textContent = String(count);
    }
    results.textContent = `${visible} ${selection === 'selected' ? 'selected ' : ''}publication${visible === 1 ? '' : 's'}`;
    selectionNote.hidden = selection !== 'selected';
    empty.hidden = visible !== 0 || visibleEmptyArea;
  }
  form.hidden = false;
  form.addEventListener('submit', event => event.preventDefault());
  form.addEventListener('change', render);
  document.getElementById('reset-publications').addEventListener('click', () => {
    form.reset();
    render();
    form.querySelector('input').focus();
  });
  render();

  const dialog = document.getElementById('figure-dialog');
  if (dialog && typeof dialog.showModal === 'function') {
    const dialogImage = document.getElementById('figure-dialog-image');
    const dialogTitle = document.getElementById('figure-dialog-title');
    const dialogCaption = document.getElementById('figure-dialog-caption');
    for (const link of library.querySelectorAll('[data-figure]')) {
      link.addEventListener('click', event => {
        if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
        event.preventDefault();
        const source = link.querySelector('img');
        dialogImage.src = link.href;
        dialogImage.alt = source.alt;
        dialogImage.width = source.naturalWidth;
        dialogImage.height = source.naturalHeight;
        dialogTitle.textContent = link.dataset.title;
        dialogCaption.textContent = link.dataset.caption;
        dialog.showModal();
        document.documentElement.classList.add('figure-open');
      });
    }
    dialog.querySelector('button').addEventListener('click', () => dialog.close());
    dialog.addEventListener('click', event => {
      if (event.target !== dialog) return;
      const rect = dialog.getBoundingClientRect();
      if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
    });
    dialog.addEventListener('close', () => document.documentElement.classList.remove('figure-open'));
  }
}
