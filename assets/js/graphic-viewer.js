(() => {
  const dialog = document.querySelector('#image-viewer');
  if (!dialog || typeof dialog.showModal !== 'function') return;
  const image = dialog.querySelector('img');
  const canvas = dialog.querySelector('.viewer-canvas');
  const title = dialog.querySelector('#viewer-title');
  const original = dialog.querySelector('[data-original]');
  const zoom = dialog.querySelector('[data-zoom]');
  let trigger = null;
  function resetZoom() {
    canvas.classList.remove('is-zoomed');
    zoom.textContent = 'View at 100%';
    zoom.setAttribute('aria-pressed', 'false');
    canvas.scrollTo(0, 0);
  }
  function toggleZoom() {
    const expanded = canvas.classList.toggle('is-zoomed');
    zoom.textContent = expanded ? 'Fit to screen' : 'View at 100%';
    zoom.setAttribute('aria-pressed', String(expanded));
    canvas.scrollTo(0, 0);
  }
  document.querySelectorAll('.graphic-link').forEach(link => {
    link.addEventListener('click', event => {
      if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      trigger = link;
      image.src = link.href;
      image.alt = link.querySelector('img').alt;
      title.textContent = link.dataset.title;
      original.href = link.href;
      resetZoom();
      dialog.showModal();
      document.body.classList.add('viewer-open');
    });
  });
  zoom.addEventListener('click', toggleZoom);
  image.addEventListener('click', toggleZoom);
  dialog.querySelector('[data-close]').addEventListener('click', () => dialog.close());
  dialog.addEventListener('close', () => {
    document.body.classList.remove('viewer-open');
    resetZoom();
    trigger?.focus({ preventScroll: true });
  });
})();
