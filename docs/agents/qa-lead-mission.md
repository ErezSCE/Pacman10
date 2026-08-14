# QA Lead — Test Plan

**Agent**: qa-lead  
**Generated**: 2026-08-14T02:41:00.018Z

---

## Test Plan

{
  "scope": "All acceptance criteria are covered by the test plan.",
  "unit": [
    {
      "target": "src/services/Renderer.ts - drawMaze",
      "description": "Verifies that the maze with walls, dots, and power pellets is rendered correctly for the current level.",
      "framework": "vitest",
      "storyId": "US-001",
      "acIndex": 0,
      "moduleId": "Renderer"
    },
    {
      "target": "src/services/GameEngine.ts - updatePacManMovement",
      "description": "Ensures Pac-Man moves continuously in the last chosen direction, stops at walls, and mouth animation syncs with movement.",
      "framework": "vitest",
      "storyId": "US-001",
      "acIndex": 1,
      "moduleId": "GameEngine"
    },
    {
      "target": "src/services/GameEngine.ts - handleDotCollision",
      "description": "Confirms that eating a dot removes it from the maze and adds 10 points to the score.",
      "framework": "vitest",
      "storyId": "US-001",
      "acIndex": 2,
      "moduleId": "GameEngine"
    },
    {
      "target": "src/services/GameEngine.ts - checkLevelCompletion",
      "description": "Validates that when all dots and power pellets are consumed, the level is marked complete.",
      "framework": "vitest",
      "storyId": "US-001",
      "acIndex": 3,
      "moduleId": "GameEngine"
    },
    {
      "target": "src/services/ghosts/RedGhostAI.ts",
      "description": "Tests Red ghost's direct chase targeting algorithm.",
      "framework": "vitest",
      "storyId": "US-002",
      "acIndex": 0,
      "moduleId": "RedGhostAI"
    },
    {
      "target": "src/services/ghosts/PinkGhostAI.ts",
      "description": "Tests Pink ghost's ambush targeting algorithm.",
      "framework": "vitest",
      "storyId": "US-002",
      "acIndex": 0,
      "moduleId": "PinkGhostAI"
    },
    {
      "target": "src/services/ghosts/BlueGhostAI.ts",
      "description": "Tests Blue ghost's flank targeting algorithm.",
      "framework": "vitest",
      "storyId": "US-002",
      "acIndex": 0,
      "moduleId": "BlueGhostAI"
    },
    {
      "target": "src/services/ghosts/OrangeGhostAI.ts",
      "description": "Tests Orange ghost's random targeting algorithm.",
      "framework": "vitest",
      "storyId": "US-002",
      "acIndex": 0,
      "moduleId": "OrangeGhostAI"
    },
    {
      "target": "src/services/GhostManager.ts - modeSwitchTimer",
      "description": "Ensures ghosts alternate between chase and scatter modes according to level config timers.",
      "framework": "vitest",
      "storyId": "US-002",
      "acIndex": 1,
      "moduleId": "GhostManager"
    },
    {
      "target": "src/services/PositionUtils.ts - wrapAroundTunnel",
      "description": "Verifies that Pac-Man and ghosts wrap correctly when moving through tunnel edges.",
      "framework": "vitest",
      "storyId": "US-002",
      "acIndex": 2,
      "moduleId": "PositionUtils"
    },
    {
      "target": "src/services/GameEngine.ts - handlePowerPellet",
      "description": "Checks that consuming a power pellet puts all ghosts into scared mode for the configured duration.",
      "framework": "vitest",
      "storyId": "US-003",
      "acIndex": 0,
      "moduleId": "GameEngine"
    },
    {
      "target": "src/services/ghosts/ScaredGhostBehavior.ts",
      "description": "Validates that scared ghosts change color, move slower, and reverse direction immediately.",
      "framework": "vitest",
      "storyId": "US-003",
      "acIndex": 1,
      "moduleId": "ScaredGhostBehavior"
    },
    {
      "target": "src/services/ghosts/ScaredGhostBehavior.ts - flashTimer",
      "description": "Ensures ghosts flash during the last two seconds of scared mode.",
      "framework": "vitest",
      "storyId": "US-003",
      "acIndex": 2,
      "moduleId": "ScaredGhostBehavior"
    },
    {
      "target": "src/services/ghosts/EatScaredGhost.ts",
      "description": "Confirms escalating points (200, 400, 800, 1600) are awarded and ghost turns into eyes after being eaten.",
      "framework": "vitest",
      "storyId": "US-003",
      "acIndex": 3,
      "moduleId": "EatScaredGhost"
    },
    {
      "target": "src/services/FruitSpawner.ts - spawnLogic",
      "description": "Validates fruit spawns after the configured number of dots are eaten.",
      "framework": "vitest",
      "storyId": "US-004",
      "acIndex": 0,
      "moduleId": "FruitSpawner"
    },
    {
      "target": "src/services/FruitData.ts",
      "description": "Ensures the spawned fruit matches level‑specific type and point value.",
      "framework": "vitest",
      "storyId": "US-004",
      "acIndex": 1,
      "moduleId": "FruitData"
    },
    {
      "target": "src/services/FruitSpawner.ts - timeoutHandler",
      "description": "Checks that fruit disappears if not collected within the timeout period.",
      "framework": "vitest",
      "storyId": "US-004",
      "acIndex": 2,
      "moduleId": "FruitSpawner"
    },
    {
      "target": "src/services/GameEngine.ts - handleFruitCollision",
      "description": "Verifies that collecting a fruit adds the correct points to the score.",
      "framework": "vitest",
      "storyId": "US-004",
      "acIndex": 3,
      "moduleId": "GameEngine"
    },
    {
      "target": "src/services/ScoreManager.ts - updateScore",
      "description": "Ensures score updates correctly for dots, pellets, ghost eats, and fruit collection.",
      "framework": "vitest",
      "storyId": "US-005",
      "acIndex": 0,
      "moduleId": "ScoreManager"
    },
    {
      "target": "src/services/LifeManager.ts",
      "description": "Confirms player starts with three lives and loses one on collision with a non‑scared ghost.",
      "framework": "vitest",
      "storyId": "US-005",
      "acIndex": 1,
      "moduleId": "LifeManager"
    },
    {
      "target": "src/services/ExtraLifeTrigger.ts",
      "description": "Validates that an extra life is awarded automatically when score reaches 10,000 points.",
      "framework": "vitest",
      "storyId": "US-005",
      "acIndex": 2,
      "moduleId": "ExtraLifeTrigger"
    },
    {
      "target": "src/components/GameOverScreen.tsx",
      "description": "Checks that Game Over screen is displayed when all lives are lost.",
      "framework": "vitest",
      "storyId": "US-005",
      "acIndex": 3,
      "moduleId": "GameOverScreen"
    },
    {
      "target": "src/components/StartScreen.tsx",
      "description": "Verifies Start Screen shows title, Start button, and top‑10 high scores.",
      "framework": "vitest",
      "storyId": "US-006",
      "acIndex": 0,
      "moduleId": "StartScreen"
    },
    {
      "target": "src/components/Countdown.tsx",
      "description": "Ensures pressing Start triggers a 3‑2‑1 countdown before gameplay begins.",
      "framework": "vitest",
      "storyId": "US-006",
      "acIndex": 1,
      "moduleId": "Countdown"
    },
    {
      "target": "src/components/PauseOverlay.tsx",
      "description": "Validates that pressing Pause button or 'P' key shows overlay and freezes game activity.",
      "framework": "vitest",
      "storyId": "US-006",
      "acIndex": 2,
      "moduleId": "PauseOverlay"
    },
    {
      "target": "src/components/GameOverScreen.tsx - initialsEntry",
      "description": "Checks that Game Over screen allows initials entry (if high score) and provides a Restart button.",
      "framework": "vitest",
      "storyId": "US-006",
      "acIndex": 3,
      "moduleId": "GameOverScreen"
    },
    {
      "target": "src/services/AudioManager.ts - soundMap",
      "description": "Ensures each game event plays the correct sound effect.",
      "framework": "vitest",
      "storyId": "US-007",
      "acIndex": 0,
      "moduleId": "AudioManager"
    },
    {
      "target": "src/services/AudioManager.ts - backgroundSiren",
      "description": "Validates looping background siren plays during gameplay and pitch changes as level progresses.",
      "framework": "vitest",
      "storyId": "US-007",
      "acIndex": 1,
      "moduleId": "AudioManager"
    },
    {
      "target": "src/components/MuteButton.tsx",
      "description": "Confirms mute button toggles all audio on and off instantly.",
      "framework": "vitest",
      "storyId": "US-007",
      "acIndex": 2,
      "moduleId": "MuteButton"
    },
    {
      "target": "src/serviceWorker.ts",
      "description": "Verifies Service Worker caches all assets after first load for offline use.",
      "framework": "vitest",
      "storyId": "US-008",
      "acIndex": 0,
      "moduleId": "ServiceWorker"
    },
    {
      "target": "src/services/StorageManager.ts",
      "description": "Ensures high scores are persisted to IndexedDB (or localStorage fallback) and survive browser restarts.",
      "framework": "vitest",
      "storyId": "US-008",
      "acIndex": 1,
      "moduleId": "StorageManager"
    },
    {
      "target": "src/components/AccessibilityToggle.tsx",
      "description": "Validates that toggling the color‑blind palette updates ghost colors in the rendered game.",
      "framework": "vitest",
      "storyId": "US-009",
      "acIndex": 2,
      "moduleId": "AccessibilityToggle"
    },
    {
      "target": "src/components/KeyboardNavigation.ts",
      "description": "Ensures all interactive elements are reachable via Tab/Shift+Tab with visible focus outlines.",
      "framework": "vitest",
      "storyId": "US-009",
      "acIndex": 0,
      "moduleId": "KeyboardNavigation"
    },
    {
      "target": "src/components/AriaLabels.tsx",
      "description": "Checks that ARIA labels correctly describe buttons and screens for screen readers.",
      "framework": "vitest",
      "storyId": "US-009",
      "acIndex": 1,
      "moduleId": "AriaLabels"
    },
    {
      "target": "src/components/KeyboardOnlyPlay.tsx",
      "description": "Confirms the game can be played entirely with keyboard input (no mouse required).",
      "framework": "vitest",
      "storyId": "US-009",
      "acIndex": 3,
      "moduleId": "KeyboardOnlyPlay"
    },
    {
      "target": "src/performance/FrameRateMonitor.ts",
      "description": "Measures that the game maintains a stable 60 fps on typical browsers.",
      "framework": "vitest",
      "storyId": "US-010",
      "acIndex": 0,
      "moduleId": "FrameRateMonitor"
    },
    {
      "target": "vite.config.ts",
      "description": "Checks that the production bundle size reported by Vite is under 2 MB.",
      "framework": "vitest",
      "storyId": "US-010",
      "acIndex": 1,
      "moduleId": "ViteConfig"
    },
    {
      "target": "src/components/ResponsiveLayout.tsx",
      "description": "Ensures UI layout adapts gracefully from 375 px to 2560 px while keeping elements readable.",
      "framework": "vitest",
      "storyId": "US-010",
      "acIndex": 2,
      "moduleId": "ResponsiveLayout"
    },
    {
      "target": "src/app.tsx",
      "description": "Validates that launching the app shows Start Screen, countdown runs, and gameplay starts with all subsystems active.",
      "framework": "vitest",
      "storyId": "US-011",
      "acIndex": 0,
      "moduleId": "App"
    },
    {
      "target": "src/services/GameLoop.ts - pauseResume",
      "description": "Ensures pausing freezes the game loop and unpausing resumes it.",
      "framework": "vitest",
      "storyId": "US-011",
      "acIndex": 1,
      "moduleId": "GameLoop"
    },
    {
      "target": "src/components/GameOverScreen.tsx - restartFlow",
      "description": "Checks that after Game Over, high scores are saved and Restart returns to Start Screen.",
      "framework": "vitest",
      "storyId": "US-011",
      "acIndex": 2,
      "moduleId": "GameOverScreen"
    },
    {
      "target": "src/serviceWorker.ts - offlineAfterFirstLoad",
      "description": "Verifies the application works offline after the first load and high‑score list persists across sessions.",
      "framework": "vitest",
      "storyId": "US-011",
      "acIndex": 3,
      "moduleId": "ServiceWorker"
    }
  ],
  "integration": [
    {
      "target": "Renderer ↔ GameEngine integration",
      "description": "Ensures Renderer draws maze, Pac‑Man, and ghosts based on GameEngine state each frame.",
      "framework": "vitest",
      "storyId": "US-001",
      "acIndex": 0,
      "moduleId": "Renderer"
    },
    {
      "target": "InputHandler → GameEngine interaction",
      "description": "Validates that keyboard/touch inputs are correctly translated into direction intents and affect Pac‑Man movement.",
      "framework": "vitest",
      "storyId": "US-001",
      "acIndex": 1,
      "moduleId": "InputHandler"
    },
    {
      "target": "GameEngine level completion flow",
      "description": "Confirms that when all dots/pellets are cleared, GameEngine signals level completion and triggers level progression.",
      "framework": "vitest",
      "storyId": "US-001",
      "acIndex": 3,
      "moduleId": "GameEngine"
    },
    {
      "target": "GhostManager mode switching",
      "description": "Tests that ghosts correctly transition between chase and scatter modes per level timer.",
      "framework": "vitest",
      "storyId": "US-002",
      "acIndex": 1,
      "moduleId": "GhostManager"
    },
    {
      "target": "PowerPellet → ScaredMode cascade",
      "description": "Ensures consuming a power pellet triggers scared mode across all ghosts and starts the timer.",
      "framework": "vitest",
      "storyId": "US-003",
      "acIndex": 0,
      "moduleId": "GameEngine"
    },
    {
      "target": "ScaredGhost behavior integration",
      "description": "Verifies color change, speed reduction, and direction reversal for ghosts in scared mode.",
      "framework": "vitest",
      "storyId": "US-003",
      "acIndex": 1,
      "moduleId": "ScaredGhostBehavior"
    },
    {
      "target": "Fruit collection scoring",
      "description": "Checks that when Pac‑Man collides with a fruit, the score is updated with the fruit's point value and the fruit disappears.",
      "framework": "vitest",
      "storyId": "US-004",
      "acIndex": 3,
      "moduleId": "GameEngine"
    },
    {
      "target": "ScoreManager ↔ LifeManager integration",
      "description": "Ensures extra life is granted at 10,000 points and lives decrement on ghost collisions.",
      "framework": "vitest",
      "storyId": "US-005",
      "acIndex": 2,
      "moduleId": "ScoreManager"
    },
    {
      "target": "AudioManager ↔ GameEngine events",
      "description": "Validates that game events (dot, pellet, ghost eat, fruit, extra life, death) trigger the correct sound effects.",
      "framework": "vitest",
      "storyId": "US-007",
      "acIndex": 0,
      "moduleId": "AudioManager"
    },
    {
      "target": "StorageManager ↔ HighScoreService persistence",
      "description": "Confirms high scores are correctly written to and read from IndexedDB across sessions.",
      "framework": "vitest",
      "storyId": "US-008",
      "acIndex": 1,
      "moduleId": "HighScoreService"
    },
    {
      "target": "ResponsiveLayout rendering across viewports",
      "description": "Runs integration checks that UI components reflow correctly at breakpoints 375 px, 768 px, 1024 px, and 2560 px.",
      "framework": "vitest",
      "storyId": "US-010",
      "acIndex": 2,
      "moduleId": "ResponsiveLayout"
    },
    {
      "target": "Full app start‑to‑end flow",
      "description": "Integrates Start Screen, countdown, gameplay, pause, and Game Over ensuring no runtime errors.",
      "framework": "vitest",
      "storyId": "US-011",
      "acIndex": 0,
      "moduleId": "App"
    }
  ],
  "e2e": [
    {
      "scenario": "Start game flow with countdown and initial gameplay",
      "description": "User lands on Start Screen, sees title and high scores, clicks Start, observes 3‑2‑1 countdown, then Pac‑Man moves and score updates on dot consumption.",
      "criticalPath": true,
      "storyId": "US-006",
      "acIndex": 1,
      "moduleId": "StartScreen"
    },
    {
      "scenario": "Pause and resume using button and 'P' key",
      "description": "During gameplay, user presses Pause button or 'P' key, Pause overlay appears and game loop freezes; pressing Resume unfreezes and continues.",
      "criticalPath": true,
      "storyId": "US-006",
      "acIndex": 2,
      "moduleId": "PauseOverlay"
    },
    {
      "scenario": "Game Over and high‑score entry",
      "description": "Player loses all lives, Game Over screen shows, initials entry appears if score qualifies, and Restart button returns to Start Screen.",
      "criticalPath": true,
      "storyId": "US-005",
      "acIndex": 3,
      "moduleId": "GameOverScreen"
    },
    {
      "scenario": "Mute toggle functionality",
      "description": "User clicks mute button during gameplay; all audio stops instantly; clicking again restores audio.",
      "criticalPath": true,
      "storyId": "US-007",
      "acIndex": 2,
      "moduleId": "MuteButton"
    },
    {
      "scenario": "Accessibility keyboard navigation and ARIA verification",
      "description": "Tab through all interactive elements, verify focus outlines, and inspect ARIA labels for buttons and screens using screen‑reader simulation.",
      "criticalPath": true,
      "storyId": "US-009",
      "acIndex": 0,
      "moduleId": "KeyboardNavigation"
    },
    {
      "scenario": "Color‑blind palette toggle effect",
      "description": "User activates color‑blind mode; ghost colors change to the alternate palette both in UI legend and in‑game rendering.",
      "criticalPath": true,
      "storyId": "US-009",
      "acIndex": 2,
      "moduleId": "AccessibilityToggle"
    },
    {
      "scenario": "Offline load after first visit",
      "description": "After initial load, network is disabled; user reloads page and verifies the game loads fully, assets served from Service Worker cache, and high scores persist.",
      "criticalPath": true,
      "storyId": "US-008",
      "acIndex": 0,
      "moduleId": "ServiceWorker"
    },
    {
      "scenario": "Full gameplay round including power pellet, scared ghosts, and fruit",
      "description": "Player eats a power pellet, ghosts turn blue and flash, player eats a scared ghost for escalating points, later a fruit spawns, is collected for points, and level completes.",
      "criticalPath": true,
      "storyId": "US-003",
      "acIndex": 3,
      "moduleId": "GamePlay"
    },
    {
      "scenario": "Responsive layout verification on mobile and desktop",
      "description": "Resize viewport to 375 px and 2560 px, ensure UI elements (score, lives, mute button) remain readable and correctly positioned.",
      "criticalPath": true,
      "storyId": "US-010",
      "acIndex": 2,
      "moduleId": "ResponsiveLayout"
    },
    {
      "scenario": "Performance benchmark for 60 fps",
      "description": "Run the game in a headless browser and capture frame timestamps to assert average frame rate ≥ 60 fps over a 30‑second interval.",
      "criticalPath": false,
      "storyId": "US-010",
      "acIndex": 0,
      "moduleId": "FrameRateMonitor"
    },
    {
      "scenario": "High score persistence across sessions",
      "description": "Player achieves a high score, enters initials, closes browser, reopens, and verifies the score appears in the top‑10 list.",
      "criticalPath": false,
      "storyId": "US-008",
      "acIndex": 1,
      "moduleId": "HighScoreService"
    },
    {
      "scenario": "Ghost tunnel wrap-around behavior",
      "description": "During gameplay, Pac‑Man and a ghost enter the left tunnel and emerge correctly on the right side, maintaining direction.",
      "criticalPath": false,
      "storyId": "US-002",
      "acIndex": 2,
      "moduleId": "PositionUtils"
    }
  ],
  "coverageTargets": {
    "unit": 85,
    "integration": 70,
    "e2e": 100
  }
}
