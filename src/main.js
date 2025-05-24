function setImageAttributes(image) {
  image.classList.add('loading');
  image.dataset.src = image.src;
  image.setAttribute('width', image.naturalWidth || image.width);
  image.setAttribute('height', image.naturalHeight || image.height);
  // image.src = ''; // Avoid clearing src to prevent broken icon
  image.loading = 'lazy'; // Native lazy loading
}

function handleImageLoad(image, container, observer) {
  image.classList.remove('loading');
  image.classList.add('loaded');
  if (container) {
    container.classList.remove('loading');
    container.classList.add('loaded');
  }
  observer.unobserve(image);
  image.onload = null; // Clean up
}

function observeImage(image) {
  const container = image.closest('.image-container');
  if (container) container.classList.add('loading');
  setImageAttributes(image);

  if ('loading' in HTMLImageElement.prototype) {
    // Native lazy loading supported
    image.addEventListener('load', () => handleImageLoad(image, container, { unobserve: () => {} }));
    return;
  }

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && image.dataset.src) {
        image.src = image.dataset.src;
        image.onload = () => handleImageLoad(image, container, obs);
        obs.unobserve(image);
      }
    });
  }, { threshold: 0.4 });

  observer.observe(image);
}

document.querySelectorAll('img').forEach(observeImage);
