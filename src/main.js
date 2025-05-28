// Select all elements with [data-animate-item] attribute
const elementsToAnimate = document.querySelectorAll(
  '.image-container img'
);

// Check if the user prefers reduced motion
const prefersReducedMotionNoPref = window.matchMedia(
  '(prefers-reduced-motion: no-preference)'
).matches;

// Create a new Intersection Observer
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    const animatedElement = entry.target;
    animatedElement.setAttribute('width', animatedElement.naturalWidth || animatedElement.width);
    animatedElement.setAttribute('height', animatedElement.naturalHeight || animatedElement.height);
    animatedElement.loading = 'lazy'; // Native lazy loading

    if (entry.isIntersecting) {
      // If the element is in the viewport, add the 'animate' class
      setTimeout(() => {
        animatedElement.setAttribute('component-is-animating', 'true');
      }, 100 * (entries.indexOf(entry) + 1));
    }
  });
}, {
  threshold: 0.40 // Trigger when 40% of the element is visible
});

// Only add observer if siteAnimationEnabled, there are elements to animate,
// and if user hasn't enabled reduced motion.
if (elementsToAnimate && prefersReducedMotionNoPref) {
  // Observe each .divider element
  elementsToAnimate.forEach((animatedElement) => {
    observer.observe(animatedElement);
  });
}


// Header tasks button
const tasksButton = document.querySelector('.blog__challenge');
const tasksList = document.querySelector('.blog__challenge__tasks');


// when you click the tasksButton the tasksList will reveal
tasksButton.addEventListener('click', function() {
  // Add logic to reveal the tasksList here
  if (tasksButton.getAttribute('aria-expanded') === "false") {
    tasksButton.setAttribute('aria-label', 'Collapse the task list')
    tasksButton.setAttribute('aria-expanded', "true");
    tasksList.setAttribute('aria-hidden', false);
  } else {
    tasksButton.setAttribute('aria-label', 'Expand the task list')
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

// intersection observer to observe when blog__site__footer is in view
const footer = document.querySelector('.blog__site__footer');
const body = document.body;
const footerObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      body.classList.add('footer-in-view');
    } else {
      body.classList.remove('footer-in-view');
    }
  });
}, {
  threshold: 1.0 // Trigger when 100% of the element is visible
});

if (footer) {
  footerObserver.observe(footer);
}


// footer button

const a11yButton = document.querySelector('.blog__footer__button');
const root = document.documentElement;

// Check localStorage for saved a11y preference
let isA11y = localStorage.getItem('a11yMode') === 'true';

// Apply the saved preference on load
if (isA11y) {
  root.style.setProperty('--color-pf-orange', `var(--color-pf-orange-a11y)`);
} else {
  root.style.setProperty('--color-pf-orange', `var(--color-pf-orange-original)`);
}

a11yButton.addEventListener('click', function() {
  isA11y = !isA11y;
  if (isA11y) {
    root.style.setProperty('--color-pf-orange', `var(--color-pf-orange-a11y)`);
  } else {
    root.style.setProperty('--color-pf-orange', `var(--color-pf-orange-original)`);
  }
  localStorage.setItem('a11yMode', isA11y);
});
