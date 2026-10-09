# CSS Challenge Arena

An interactive browser-based CSS puzzle game where users solve layout challenges in real time by writing CSS to match target layouts.

## Live Demo & Preview

- **Live Demo:** https://sanskritidasila.github.io/css-challenge-arena/

## Demo Notice

All levels, styling targets, and user evaluations run entirely in-browser on the client side. No server is required.

## Features

- Solve 5 progressive layout challenges covering Flexbox centering, space distribution, column stacks, CSS Grid, and absolute badge positioning.
- Write CSS directly into an integrated code editor with automatic debounced live previewing.
- Compare your work side-by-side with a rendered target preview before submitting.
- Request progressive hints when stuck without revealing the full solution upfront.
- Track completion progress automatically across browser reloads.
- Receive immediate celebratory confetti feedback upon completing each challenge.

## Tech Stack

- JavaScript (ES6+)
- HTML5
- CSS3 (Flexbox & CSS Grid)
- DOM APIs (`getBoundingClientRect`, `HTMLIFrameElement.srcdoc`, `CanvasRenderingContext2D`)
- `localStorage` API

## How to Run It Locally

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/sanskritidasila/css-challenge-arena.git](https://github.com/sanskritidasila/css-challenge-arena.git)
   cd css-challenge-arena
