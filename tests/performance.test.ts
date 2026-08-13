import { execSync } from 'child_process';
import { describe, it, expect } from 'vitest';
import { readdirSync, statSync } from 'fs';
import { join } from 'path';

describe('Performance and bundle size', () => {
  it('[US-010#1] bundle size is under 2 MB', () => {
    // Run Vite build
    execSync('npm run build', { stdio: 'inherit' });
    const distDir = join(process.cwd(), 'dist');
    const files = readdirSync(distDir);
    // Find the main JS bundle (usually index-<hash>.js)
    const jsFiles = files.filter((f) => f.endsWith('.js'));
    expect(jsFiles.length).toBeGreaterThan(0);
    const sizes = jsFiles.map((f) => statSync(join(distDir, f)).size);
    const totalSize = sizes.reduce((a, b) => a + b, 0);
    // 2 MB = 2 * 1024 * 1024 bytes
    expect(totalSize).toBeLessThanOrEqual(2 * 1024 * 1024);
  });
});
