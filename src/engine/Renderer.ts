// src/engine/Renderer.ts
// Minimal renderer for testing palette rendering.

export function getGhostColors(paletteBlind: boolean): string[] {
  // Standard palette: red, pink, cyan, orange
  // Color‑blind palette: blue, purple, yellow, green
  return paletteBlind
    ? ['#0000FF', '#800080', '#FFFF00', '#008000']
    : ['#FF0000', '#FFC0CB', '#00FFFF', '#FFA500'];
}

/**
 * Draw four ghost squares on the provided canvas context.
 * The `paletteBlind` flag selects which colour set to use.
 */
export function draw(ctx: any, paletteBlind: boolean): void {
  const colors = getGhostColors(paletteBlind);
  // Simple layout: four 20x20 squares spaced 5px apart.
  const size = 20;
  const gap = 5;
  colors.forEach((c, i) => {
    ctx.fillStyle = c;
    ctx.fillRect(i * (size + gap), 0, size, size);
  });
}
