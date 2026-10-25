(() => {
  document.querySelectorAll('[data-collection]').forEach(collection => {
    const input = collection.querySelector('[data-search-input]');
    if (!input) return;

    const controls = collection.querySelector('[data-search-controls]');
    const clear = collection.querySelector('[data-search-clear]');
    const status = collection.querySelector('[data-search-status]');
    const empty = collection.querySelector('[data-no-results]');
    const normalize = text => text.normalize('NFKC').toLocaleLowerCase();
    const items = Array.from(collection.querySelectorAll('[data-collection-item]'), element => ({
      element,
      text: normalize(element.dataset.search || '')
    }));

    const filter = () => {
      const query = normalize(input.value.trim());
      const terms = query.split(/\s+/).filter(Boolean);
      let count = 0;
      items.forEach(({ element, text }) => {
        element.hidden = !terms.every(term => text.includes(term));
        if (!element.hidden) count += 1;
      });
      clear.hidden = input.value.length === 0;
      empty.hidden = count !== 0;
      status.textContent = `${count} ${count === 1 ? 'result' : 'results'}`;
    };

    input.addEventListener('input', filter);
    clear.addEventListener('click', () => {
      input.value = '';
      filter();
      input.focus();
    });
    controls.hidden = false;
    filter();
  });
})();
