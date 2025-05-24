# pf-cc
[View latest deploy](https://pf-cc.netlify.app/)

## This project is a code challenge
It uses:
- tailwindcss (both using utility classes and the `@apply` function) along with vanilla CSS
- lazy-loaded images which animated in when they're in the user's viewport.
- a JS-based toggle button to expand the list of this challenge's tasks.
- a hover animation when you hover over the PF logo.
- All animation is disabled if a user has the `prefers-reduced-motion` computer OS setting enabled.
- The toggle button, when open, can be closed by pressing the escape key on your keyboard. When closed, the button will receive focus.
- The toggle button state is communicated for screen readers via `aria-label` atribute.
- All links have a `:focus-visible` CSS declaration to improve accessibility and discoverability for keyboard-navigating users.
