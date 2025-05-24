function setImageAttributes(image) {
  image.classList.add('loading');
  image.dataset.src = image.src;
  image.setAttribute('width', image.naturalWidth || image.width);
  image.setAttribute('height', image.naturalHeight || image.height);
  image.src = ''; // Hide image until in viewport
}

function handleImageLoad(image, container, observer) {
  image.classList.remove('loading');
  image.classList.add('loaded');
  if (container) {
    container.classList.remove('loading');
    container.classList.add('loaded');
  }
  observer.unobserve(image);
}

function observeImage(image) {
  const container = image.closest('.image-container');
  if (container) container.classList.add('loading');
  setImageAttributes(image);

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        image.src = image.dataset.src;
        image.onload = () => handleImageLoad(image, container, obs);
      }
    });
  }, { threshold: 0.1 });

  observer.observe(image);
}

document.querySelectorAll('img').forEach(observeImage);
