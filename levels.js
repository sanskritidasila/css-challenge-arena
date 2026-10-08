const levels = [
  {
    id: 1,
    title: "Level 1: Center the Box",
    description: "Use Flexbox on the parent container (<code>.container</code>) to center the child item (<code>.item</code>) both horizontally and vertically.",
    hint: "Set <code>display: flex;</code>, <code>justify-content: center;</code>, and <code>align-items: center;</code>.",
    html: `
      <div class="container">
        <div class="item">Center Me</div>
      </div>
    `,
    baseCss: `
      * { box-sizing: border-box; margin: 0; padding: 0; }
      body { width: 100vw; height: 100vh; overflow: hidden; font-family: sans-serif; }
      .container { width: 100%; height: 100%; background: #1e293b; }
      .item { width: 120px; height: 60px; background: #3b82f6; color: white; display: flex; align-items: center; justify-content: center; border-radius: 6px; font-weight: bold; }
    `,
    solutionCss: `
      .container {
        display: flex;
        justify-content: center;
        align-items: center;
      }
    `,
    targetSelector: ".item"
  },
  {
    id: 2,
    title: "Level 2: Space Between Items",
    description: "Align three cards across a navigation header so that the first is at the start, the last is at the end, and spacing is distributed evenly.",
    hint: "Use <code>display: flex;</code> and <code>justify-content: space-between;</code> with <code>align-items: center;</code> on the container.",
    html: `
      <div class="container">
        <div class="item">Nav 1</div>
        <div class="item">Nav 2</div>
        <div class="item">Nav 3</div>
      </div>
    `,
    baseCss: `
      * { box-sizing: border-box; margin: 0; padding: 0; }
      body { width: 100vw; height: 100vh; overflow: hidden; font-family: sans-serif; }
      .container { width: 100%; height: 80px; background: #0f172a; padding: 0 20px; }
      .item { width: 70px; height: 40px; background: #10b981; color: white; display: flex; align-items: center; justify-content: center; border-radius: 4px; font-weight: bold; }
    `,
    solutionCss: `
      .container {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
    `,
    targetSelector: ".item"
  },
  {
    id: 3,
    title: "Level 3: Two-Column Grid",
    description: "Create a 2-column grid layout with equal columns and a 16px gap between items.",
    hint: "Use <code>display: grid;</code>, <code>grid-template-columns: 1fr 1fr;</code>, and <code>gap: 16px;</code>.",
    html: `
      <div class="container">
        <div class="item">1</div>
        <div class="item">2</div>
        <div class="item">3</div>
        <div class="item">4</div>
      </div>
    `,
    baseCss: `
      * { box-sizing: border-box; margin: 0; padding: 0; }
      body { width: 100vw; height: 100vh; overflow: hidden; font-family: sans-serif; padding: 16px; }
      .container { width: 100%; height: 100%; }
      .item { height: 70px; background: #8b5cf6; color: white; display: flex; align-items: center; justify-content: center; border-radius: 6px; font-weight: bold; }
    `,
    solutionCss: `
      .container {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 16px;
      }
    `,
    targetSelector: ".item"
  },
  {
    id: 4,
    title: "Level 4: Vertical Stack & Alignment",
    description: "Align the items in a vertical column centered along the cross-axis, with a 12px gap between each item.",
    hint: "Use <code>display: flex;</code>, <code>flex-direction: column;</code>, <code>align-items: center;</code>, and <code>gap: 12px;</code>.",
    html: `
      <div class="container">
        <div class="item">Card 1</div>
        <div class="item">Card 2</div>
        <div class="item">Card 3</div>
      </div>
    `,
    baseCss: `
      * { box-sizing: border-box; margin: 0; padding: 0; }
      body { width: 100vw; height: 100vh; overflow: hidden; font-family: sans-serif; padding: 20px; }
      .container { width: 100%; height: 100%; background: #0f172a; }
      .item { width: 140px; height: 36px; background: #ec4899; color: white; display: flex; align-items: center; justify-content: center; border-radius: 4px; font-weight: bold; }
    `,
    solutionCss: `
      .container {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 12px;
      }
    `,
    targetSelector: ".item"
  },
  {
    id: 5,
    title: "Level 5: Absolute Badge Overlay",
    description: "Position the notification badge (<code>.badge</code>) at the top-right corner of the parent card (<code>.card</code>).",
    hint: "Set <code>position: relative;</code> on <code>.card</code>, and <code>position: absolute; top: -8px; right: -8px;</code> on <code>.badge</code>.",
    html: `
      <div class="card">
        Profile
        <span class="badge">9+</span>
      </div>
    `,
    baseCss: `
      * { box-sizing: border-box; margin: 0; padding: 0; }
      body { width: 100vw; height: 100vh; overflow: hidden; display: flex; align-items: center; justify-content: center; font-family: sans-serif; background: #1e293b; }
      .card { width: 160px; height: 100px; background: #334155; color: white; display: flex; align-items: center; justify-content: center; border-radius: 8px; font-weight: bold; }
      .badge { width: 28px; height: 28px; background: #ef4444; color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 11px; }
    `,
    solutionCss: `
      .card {
        position: relative;
      }
      .badge {
        position: absolute;
        top: -8px;
        right: -8px;
      }
    `,
    targetSelector: ".badge"
  }
];