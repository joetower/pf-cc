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

  const options = {
    root: null,
    rootMargin: "0px",
    threshold: 0.6,
  };

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && image.dataset.src) {
        image.src = image.dataset.src;
        image.onload = () => handleImageLoad(image, container, obs);
        obs.unobserve(image);
      }
    });
  }, options);

  observer.observe(image);
}

document.querySelectorAll('img').forEach(observeImage);


// Header tasks button
const tasksButton = document.querySelector('.blog__challenge');
const tasksList = document.querySelector('.blog__challenge__tasks');


// when you click the tasksButton the tasksList will reveal
tasksButton.addEventListener('click', function() {
  // Add logic to reveal the tasksList here
  if (tasksButton.getAttribute('aria-expanded') === "false") {
    tasksButton.setAttribute('aria-expanded', "true");
    tasksList.setAttribute('aria-hidden', false);
  } else {
    tasksButton.setAttribute('aria-expanded', false);
    tasksList.setAttribute('aria-hidden', true);
  }
});

// Close tasksList when Escape key is pressed
document.addEventListener('keydown', function(e) {
  if (
    e.key === 'Escape' &&
    tasksButton.getAttribute('aria-expanded') === "true"
  ) {
    tasksButton.setAttribute('aria-expanded', false);
    tasksList.setAttribute('aria-hidden', true);
    tasksButton.focus();
  }
});
