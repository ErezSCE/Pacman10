# QA Lead — Test Plan

**Agent**: qa-lead  
**Generated**: 2026-08-14T01:06:19.072Z

---

## Test Plan

{
  "scope": "All acceptance criteria are covered by the test plan.",
  "unit": [
    {
      "target": "GameEngine.movePacMan",
      "description": "[US-001#1] Pac-Man moves continuously in the last direction, stops at walls, and mouth animation syncs with movement.",
      "framework": "vitest",
      "storyId": "US-001",
      "acIndex": 1,
      "moduleId": "GameEngine"
    },
    {
      "target": "GameEngine.eatDot",
      "description": "[US-001#2] Eating a dot removes it from the maze and adds 10 points to the score.",
      "framework": "vitest",
      "storyId": "US-001",
      "acIndex": 2,
      "moduleId": "GameEngine"
    },
    {
      "target": "GameEngine.checkLevelComplete",
      "description": "[US-001#3] When all dots and power pellets are consumed, the level is marked complete.",
      "framework": "vitest",
      "storyId": "US-001",
      "acIndex": 3,
      "moduleId": "GameEngine"
    },
    {
      "target": "GhostAI.chaseAlgorithm",
      "description": "[US-002#0] Each ghost follows its defined targeting algorithm (direct chase, ambush, flank, random).",
      "framework": "vitest",
      "storyId": "US-002",
      "acIndex": 0,
      "moduleId": "GhostAI"
    },
    {
      "target": "GhostController.toggleMode",
      "description": "[US-002#1] Ghosts alternate between chase and scatter modes according to the level timer.",
      "framework": "vitest",
      "storyId": "US-002",
      "acIndex": 1,
      "moduleId": "GhostController"
    },
    {
      "target": "GameEngine.handleTunnelWrap",
      "description": "[US-002#2] Pac-Man and ghosts wrap correctly when moving through a tunnel.",
      "framework": "vitest",
      "storyId": "US-002",
      "acIndex": 2,
      "moduleId": "GameEngine"
    },
    {
      "target": "GameEngine.consumePowerPellet",
      "description": "[US-003#0] Consuming a power pellet puts all ghosts into scared mode for the configured duration.",
      "framework": "vitest",
      "storyId": "US-003",
      "acIndex": 0,
      "moduleId": "GameEngine"
    },
    {
      "target": "GhostAI.enterScaredMode",
      "description": "[US-003#1] In scared mode ghosts change color, move slower, and reverse direction immediately.",
      "framework": "vitest",
      "storyId": "US-003",
      "acIndex": 1,
      "moduleId": "GhostAI"
    },
    {
      "target": "GhostAI.scaredModeFlash",
      "description": "[US-003#2] In the last two seconds of scared mode ghosts flash to indicate the state is ending.",
      "framework": "vitest",
      "storyId": "US-003",
      "acIndex": 2,
      "moduleId": "GhostAI"
    },
    {
      "target": "GameEngine.eatScaredGhost",
      "description": "[US-003#3] Eating a scared ghost awards escalating points and turns the ghost into eyes that return to the ghost house.",
      "framework": "vitest",
      "storyId": "US-003",
      "acIndex": 3,
      "moduleId": "GameEngine"
    },
    {
      "target": "FruitSpawner.checkSpawnCondition",
      "description": "[US-004#0] A fruit spawns after the configured number of dots are eaten.",
      "framework": "vitest",
      "storyId": "US-004",
      "acIndex": 0,
      "moduleId": "FruitSpawner"
    },
    {
      "target": "FruitSpawner.getFruitForLevel",
      "description": "[US-004#1] The fruit displayed matches the level‑specific type and point value.",
      "framework": "vitest",
      "storyId": "US-004",
      "acIndex": 1,
      "moduleId": "FruitSpawner"
    },
    {
      "target": "FruitSpawner.handleTimeout",
      "description": "[US-004#2] If the player does not collect the fruit within the timeout, it disappears.",
      "framework": "vitest",
      "storyId": "US-004",
      "acIndex": 2,
      "moduleId": "FruitSpawner"
    },
    {
      "target": "GameEngine.collectFruit",
      "description": "[US-004#3] Collecting the fruit adds the correct points to the score.",
      "framework": "vitest",
      "storyId": "US-004",
      "acIndex": 3,
      "moduleId": "GameEngine"
    },
    {
      "target": "LifeManager.initializeLives",
      "description": "[US-005#1] Player starts with three lives and loses one on collision with a non‑scared ghost.",
      "framework": "vitest",
      "storyId": "US-005",
      "acIndex": 1,
      "moduleId": "LifeManager"
    },
    {
      "target": "LifeManager.checkExtraLife",
      "description": "[US-005#2] An extra life is awarded automatically when the score reaches 10,000 points.",
      "framework": "vitest",
      "storyId": "US-005",
      "acIndex": 2,
      "moduleId": "LifeManager"
    },
    {
      "target": "AudioManager.playEventSound",
      "description": "[US-007#0] Each game event triggers the correct sound effect.",
      "framework": "vitest",
      "storyId": "US-007",
      "acIndex": 0,
      "moduleId": "AudioManager"
    },
    {
      "target": "AudioManager.backgroundSiren",
      "description": "[US-007#1] Background siren loops during gameplay and its pitch changes as the level progresses.",
      "framework": "vitest",
      "storyId": "US-007",
      "acIndex": 1,
      "moduleId": "AudioManager"
    },
    {
      "target": "AudioManager.toggleMute",
      "description": "[US-007#2] Mute button instantly toggles all audio on and off.",
      "framework": "vitest",
      "storyId": "US-007",
      "acIndex": 2,
      "moduleId": "AudioManager"
    },
    {
      "target": "StorageManager.saveHighScore",
      "description": "[US-008#1] High scores are saved to IndexedDB (or localStorage fallback) and persist across sessions.",
      "framework": "vitest",
      "storyId": "US-008",
      "acIndex": 1,
      "moduleId": "StorageManager"
    },
    {
      "target": "PaletteSwitcher.toggleColorBlindMode",
      "description": "[US-009#2] Toggling the color‑blind palette updates ghost colors in the rendered game.",
      "framework": "vitest",
      "storyId": "US-009",
      "acIndex": 2,
      "moduleId": "PaletteSwitcher"
    },
    {
      "target": "PerformanceMonitor.checkFps",
      "description": "[US-010#0] Game maintains a stable 60 fps frame rate on typical browsers.",
      "framework": "vitest",
      "storyId": "US-010",
      "acIndex": 0,
      "moduleId": "PerformanceMonitor"
    },
    {
      "target": "BuildConfig.bundleSize",
      "description": "[US-010#1] Production bundle size reported by Vite is under 2 MB.",
      "framework": "vitest",
      "storyId": "US-010",
      "acIndex": 1,
      "moduleId": "BuildConfig"
    },
    {
      "target": "ResponsiveLayout.adjustBreakpoints",
      "description": "[US-010#2] Layout adapts gracefully from 375 px to 2560 px while keeping UI readable.",
      "framework": "vitest",
      "storyId": "US-010",
      "acIndex": 2,
      "moduleId": "ResponsiveLayout"
    }
  ],
  "integration": [
    {
      "target": "Renderer.renderMaze",
      "description": "[US-001#0] Maze with walls, dots, and power pellets is drawn correctly for the current level.",
      "framework": "vitest",
      "storyId": "US-001",
      "acIndex": 0,
      "moduleId": "Renderer"
    },
    {
      "target": "GameEngine + Renderer interaction",
      "description": "[US-001#3] When all dots are consumed, GameEngine signals Renderer to display level‑complete overlay.",
      "framework": "vitest",
      "storyId": "US-001",
      "acIndex": 3,
      "moduleId": "GameEngine"
    },
    {
      "target": "InputHandler -> GameEngine",
      "description": "[US-011#0] Input events are correctly forwarded to GameEngine, affecting game state.",
      "framework": "vitest",
      "storyId": "US-011",
      "acIndex": 0,
      "moduleId": "InputHandler"
    },
    {
      "target": "GameEngine -> AudioManager",
      "description": "[US-007#0] GameEngine triggers AudioManager to play appropriate sound effects on events.",
      "framework": "vitest",
      "storyId": "US-007",
      "acIndex": 0,
      "moduleId": "GameEngine"
    },
    {
      "target": "Pause overlay interaction",
      "description": "[US-006#2] Pressing pause button or 'P' key shows Pause overlay and freezes GameEngine loop.",
      "framework": "vitest",
      "storyId": "US-006",
      "acIndex": 2,
      "moduleId": "UI.PauseOverlay"
    },
    {
      "target": "HighScoreService ranking",
      "description": "[US-005#0] Score updates correctly for dots, pellets, ghost eats, and fruit collection.",
      "framework": "vitest",
      "storyId": "US-005",
      "acIndex": 0,
      "moduleId": "HighScoreService"
    },
    {
      "target": "GameEngine -> LifeManager collision handling",
      "description": "[US-005#1] Collision with a non‑scared ghost reduces lives.",
      "framework": "vitest",
      "storyId": "US-005",
      "acIndex": 1,
      "moduleId": "GameEngine"
    },
    {
      "target": "GameEngine -> UI.GameOver transition",
      "description": "[US-005#3] When lives reach zero, GameEngine triggers Game Over screen.",
      "framework": "vitest",
      "storyId": "US-005",
      "acIndex": 3,
      "moduleId": "UI.GameOver"
    },
    {
      "target": "ServiceWorker precache",
      "description": "[US-008#0] Service Worker caches all assets after first load for offline use.",
      "framework": "vitest",
      "storyId": "US-008",
      "acIndex": 0,
      "moduleId": "ServiceWorker"
    },
    {
      "target": "Accessibility focus management",
      "description": "[US-009#0] All interactive elements are reachable via Tab/Shift+Tab with visible focus outlines.",
      "framework": "vitest",
      "storyId": "US-009",
      "acIndex": 0,
      "moduleId": "UI.Accessibility"
    },
    {
      "target": "ARIA label verification",
      "description": "[US-009#1] ARIA labels correctly describe buttons and screens for screen readers.",
      "framework": "vitest",
      "storyId": "US-009",
      "acIndex": 1,
      "moduleId": "UI.Accessibility"
    }
  ],
  "e2e": [
    {
      "scenario": "Start screen displays title, start button, and top‑10 high scores",
      "description": "[US-006#0] Verify Start Screen UI elements are present and high scores are listed.",
      "criticalPath": true,
      "storyId": "US-006",
      "acIndex": 0,
      "moduleId": "UI.StartScreen"
    },
    {
      "scenario": "Press Start triggers 3‑2‑1 countdown and begins gameplay",
      "description": "[US-006#1] Ensure countdown runs and game loop starts after it finishes.",
      "criticalPath": true,
      "storyId": "US-006",
      "acIndex": 1,
      "moduleId": "UI.StartScreen"
    },
    {
      "scenario": "Pause overlay appears and game loop freezes on pause button click",
      "description": "[US-006#2] Click pause button and verify overlay and frozen state.",
      "criticalPath": true,
      "storyId": "US-006",
      "acIndex": 2,
      "moduleId": "UI.PauseOverlay"
    },
    {
      "scenario": "Game Over screen allows initials entry and restart",
      "description": "[US-006#3] After losing all lives, enter initials, submit, and restart to return to Start Screen.",
      "criticalPath": true,
      "storyId": "US-006",
      "acIndex": 3,
      "moduleId": "UI.GameOver"
    },
    {
      "scenario": "Mute button toggles all audio instantly",
      "description": "[US-007#2] Click mute button and verify no sound plays for subsequent events.",
      "criticalPath": true,
      "storyId": "US-007",
      "acIndex": 2,
      "moduleId": "UI.MuteButton"
    },
    {
      "scenario": "Offline load after first visit",
      "description": "[US-008#0] Load the app, then disable network and reload; verify the game loads and is playable.",
      "criticalPath": true,
      "storyId": "US-008",
      "acIndex": 0,
      "moduleId": "ServiceWorker"
    },
    {
      "scenario": "High scores persist across sessions",
      "description": "[US-008#1] Submit a high score, close the browser, reopen, and confirm the score is still listed.",
      "criticalPath": true,
      "storyId": "US-008",
      "acIndex": 1,
      "moduleId": "HighScoreService"
    },
    {
      "scenario": "Keyboard navigation with focus outlines",
      "description": "[US-009#0] Tab through all interactive elements and verify visible focus indicators.",
      "criticalPath": true,
      "storyId": "US-009",
      "acIndex": 0,
      "moduleId": "UI.Accessibility"
    },
    {
      "scenario": "ARIA labels are present on buttons and screens",
      "description": "[US-009#1] Inspect DOM to ensure ARIA‑label attributes exist and are descriptive.",
      "criticalPath": true,
      "storyId": "US-009",
      "acIndex": 1,
      "moduleId": "UI.Accessibility"
    },
    {
      "scenario": "Toggle color‑blind palette changes ghost colors",
      "description": "[US-009#2] Activate color‑blind mode and verify ghost sprites use the alternate palette.",
      "criticalPath": true,
      "storyId": "US-009",
      "acIndex": 2,
      "moduleId": "UI.PaletteToggle"
    },
    {
      "scenario": "Play entire game using only keyboard",
      "description": "[US-009#3] Start a game and control Pac‑Man solely via arrow keys; verify no mouse interaction is required.",
      "criticalPath": true,
      "storyId": "US-009",
      "acIndex": 3,
      "moduleId": "InputHandler"
    },
    {
      "scenario": "Responsive layout adapts at multiple breakpoints",
      "description": "[US-010#2] Resize viewport to 375 px, 768 px, 1280 px, 2560 px and verify UI remains readable and functional.",
      "criticalPath": true,
      "storyId": "US-010",
      "acIndex": 2,
      "moduleId": "ResponsiveLayout"
    },
    {
      "scenario": "Full end‑to‑end gameplay flow",
      "description": "[US-011#0] Launch app, start game, play through a level, pause, resume, lose all lives, submit high score, and restart; ensure no errors occur.",
      "criticalPath": true,
      "storyId": "US-011",
      "acIndex": 0,
      "moduleId": "E2E.FullGame"
    },
    {
      "scenario": "Pause freezes game loop and resumes correctly",
      "description": "[US-011#1] During gameplay, pause and verify timer and animation stop; unpause and verify they resume.",
      "criticalPath": true,
      "storyId": "US-011",
      "acIndex": 1,
      "moduleId": "E2E.PauseResume"
    },
    {
      "scenario": "Game Over persists high scores and allows restart",
      "description": "[US-011#2] After Game Over, check high score saved and that Restart button returns to Start Screen.",
      "criticalPath": true,
      "storyId": "US-011",
      "acIndex": 2,
      "moduleId": "E2E.GameOver"
    },
    {
      "scenario": "Offline after first load and high‑score persistence",
      "description": "[US-011#3] After playing once, go offline and reload; verify game loads and previously saved high scores appear.",
      "criticalPath": true,
      "storyId": "US-011",
      "acIndex": 3,
      "moduleId": "E2E.OfflinePersistence"
    }
  ],
  "coverageTargets": {
    "unit": 85,
    "integration": 70,
    "e2e": 100
  }
}
