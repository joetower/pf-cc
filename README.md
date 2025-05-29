# pf-cc
[View latest deploy](https://pf-cc.netlify.app/)

## This project is a PF code challenge
**The project features:**
- Tailwindcss (both using utility classes and the `@apply` function) along with vanilla CSS
- Lazy-loaded images, which animate in when they're in the user's viewport.
- A JavaScript-based toggle button to expand the list of this challenge's tasks.
- A fun hover animation when you hover over the PF logo in the header. 
  - The logo is linked to the live version of the post and opens in a new tab/window.
- Both `open sans` and `oswald` are being served via https://cdn.jsdelivr.net/fontsource. 
  - Both use the variable type version of the typeface, making weights easy to adjust on the fly and making the font more performant.
- Typography is setup to use `css variables`. There are several variables setup which assign a `clamp` function to define a minimum, preferred, and maximum font-size. This makes the font-size adjust, within a set of guardrails, responsively. It also ensures the font-size is scalable for accessibility.
- Dark mode OS support
- Accessibility features:
  - While replicating the post, I noticed some accessibility improvements that should be made, so I addressed many of them. 
  - The page HTML uses the `<article>` element around the post content for greater semantics. Using it (or assigning `role="article"`) allows search engines to understand that the post is a self-contained piece of content.
  - The post title is an `<h1>`, as a child of the `<article>` element.
  - All animation is disabled if a user has the `prefers-reduced-motion` computer OS setting enabled.
  - The toggle button, when open, can be closed by pressing the escape key on your keyboard. When closed, the button will receive focus.
  - The toggle button state is communicated to screen readers via the `aria-label` attribute.
  - All links have a `:focus-visible` CSS declaration to improve accessibility and discoverability for keyboard-navigating users.
