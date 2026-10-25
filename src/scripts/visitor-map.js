const section = document.querySelector('[data-visitor-map]');

if (section) {
  const localHosts = ['localhost', '127.0.0.1', '[::1]'];
  const isLocal = localHosts.includes(location.hostname);
  const isPublic = location.protocol === 'https:' && location.hostname === section.dataset.siteHost;
  if (isLocal || isPublic) section.hidden = false;

  // The account's tracker is only requested on the canonical HTTPS site.
  // Local and staging previews never send visits to the provider.
  if (isPublic && section.dataset.siteId && !document.getElementById('mapmyvisitors')) {
    const live = section.querySelector('[data-visitor-live]');
    const fallback = section.querySelector('[data-visitor-fallback]');
    const status = section.querySelector('[data-visitor-status]');
    const note = section.querySelector('[data-visitor-note]');
    const palette = () => {
      const styles = getComputedStyle(section);
      return Object.fromEntries([['co', 'ocean'], ['cl', 'land'], ['ct', 'text']].map(([key, color]) => [key, styles.getPropertyValue(`--visitor-${color}`).trim().replace('#', '')]));
    };
    const recolor = () => {
      const map = live.querySelector('.mapmyvisitors-map');
      if (!map) return;
      const colors = palette();
      // Change only the provider's background artwork; do not reload its tracker.
      map.style.backgroundImage = map.style.backgroundImage
        .replace(/-co_[a-f\d]{6}/i, `-co_${colors.co}`)
        .replace(/-cl_[a-f\d]{6}/i, `-cl_${colors.cl}`);
    };
    const unavailable = () => {
      if (section.dataset.state === 'ready') return;
      section.dataset.state = 'unavailable';
      status.textContent = 'Temporarily unavailable';
      note.textContent = 'The visitor map could not be loaded.';
      live.setAttribute('aria-hidden', 'true');
      live.inert = true;
    };
    section.dataset.state = 'loading';
    status.textContent = 'Loading visitor map';
    note.textContent = 'Approximate visitor locations.';
    section.querySelector('[data-visitor-provider]').hidden = false;
    section.querySelector('#visitor-map-title').textContent = 'World map';
    section.querySelector('#visitor-map-description').textContent = 'Static map while visitor data is unavailable. No visitor locations or counts are shown.';
    live.inert = true;
    const timeout = setTimeout(unavailable, 15000);
    const observer = new MutationObserver(() => {
      if (!live.querySelector('.mapmyvisitors-map') || live.querySelector('.mapmyvisitors-loading')) return;
      observer.disconnect();
      clearTimeout(timeout);
      recolor();
      section.dataset.state = 'ready';
      fallback.hidden = true;
      live.removeAttribute('aria-hidden');
      live.inert = false;
      status.hidden = true;
    });
    observer.observe(live, { childList: true, subtree: true });
    new MutationObserver(recolor).observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    const script = document.createElement('script');
    script.id = 'mapmyvisitors';
    script.async = true;
    script.src = `https://mapmyvisitors.com/map.js?${new URLSearchParams({ d: section.dataset.siteId, ...palette(), w: 'a' })}`;
    script.addEventListener('error', () => { clearTimeout(timeout); unavailable(); });
    live.append(script);
  }
}
