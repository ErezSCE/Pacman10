# QA Lead — Test Plan

**Agent**: qa-lead  
**Generated**: 2026-08-13T23:44:05.615Z

---

## Test Plan

{
  "scope": "All acceptance criteria are covered by the test items below. No uncovered criteria remain.",
  "unit": [
    {
      "target": "MazeRenderer.renderMaze",
      "description": "Renders walls, dots, and power pellets for the current level correctly",
      "framework": "vitest",
      "storyId": "US-001",
      "acIndex": 0,
      "moduleId": "Renderer"
    },
    {
      "target": "PacMan.updateMovement",
      "description": "Ensures Pac‑Man moves continuously in the last chosen direction, stops at walls, and mouth animation syncs with movement",
      "framework": "vitest",
      "storyId": "US-001",
      "acIndex": 1,
      "moduleId": "GameEngine"
    },
    {
      "target": "GameEngine.consumeDot",
      "description": "Removes a dot from the maze and adds 10 points to the score",
      "framework": "vitest",
      "storyId": "US-001",
      "acIndex": 2,
      "moduleId": "GameEngine"
    },
    {
      "target": "GameEngine.checkLevelComplete",
      "description": "Detects when all dots and power pellets are consumed and marks the level complete",
      "framework": "vitest",
      "storyId": "US-001",
      "acIndex": 3,
      "moduleId": "GameEngine"
    },
    {
      "target": "GhostAI.calculateTarget",
      "description": "Computes target tile for each ghost according to its personality algorithm (chase, ambush, flank, random)",
      "framework": "vitest",
      "storyId": "US-002",
      "acIndex": 0,
      "moduleId": "GhostAI"
    },
    {
      "target": "GhostAI.updateModeTimer",
      "description": "Switches ghosts between chase and scatter modes based on level config timer",
      "framework": "vitest",
      "storyId": "US-002",
      "acIndex": 1,
      "moduleId": "GhostAI"
    },
    {
      "target": "GameEngine.handleTunnelWrap",
      "description": "Wraps Pac‑Man and ghosts correctly when they move through a tunnel edge",
      "framework": "vitest",
      "storyId": "US-002",
      "acIndex": 2,
      "moduleId": "GameEngine"
    },
    {
      "target": "GameEngine.activateScaredMode",
      "description": "Puts all ghosts into scared mode for the configured duration after a power pellet is consumed",
      "framework": "vitest",
      "storyId": "US-003",
      "acIndex": 0,
      "moduleId": "GameEngine"
    },
    {
      "target": "Ghost.enterScaredState",
      "description": "Changes ghost color, reduces speed, and reverses direction when scared mode starts",
      "framework": "vitest",
      "storyId": "US-003",
      "acIndex": 1,
      "moduleId": "Ghost"
    },
    {
      "target": "Ghost.flashWhenScaredEnding",
      "description": "Makes ghosts flash during the last two seconds of scared mode",
      "framework": "vitest",
      "storyId": "US-003",
      "acIndex": 2,
      "moduleId": "Ghost"
    },
    {
      "target": "GameEngine.consumeScaredGhost",
      "description": "Awards escalating points (200,400,800,1600) and turns the eaten ghost into eyes returning to the ghost house",
      "framework": "vitest",
      "storyId": "US-003",
      "acIndex": 3,
      "moduleId": "GameEngine"
    },
    {
      "target": "FruitSpawner.checkSpawnCondition",
      "description": "Spawns a fruit after the configured number of dots have been eaten",
      "framework": "vitest",
      "storyId": "US-004",
      "acIndex": 0,
      "moduleId": "FruitSpawner"
    },
    {
      "target": "FruitSpawner.getFruitInfo",
      "description": "Returns the correct fruit type and point value for the current level",
      "framework": "vitest",
      "storyId": "US-004",
      "acIndex": 1,
      "moduleId": "FruitSpawner"
    },
    {
      "target": "FruitSpawner.handleTimeout",
      "description": "Removes the fruit from the maze when its timeout expires without being collected",
      "framework": "vitest",
      "storyId": "US-004",
      "acIndex": 2,
      "moduleId": "FruitSpawner"
    },
    {
      "target": "GameEngine.consumeFruit",
      "description": "Adds the fruit's point value to the score when collected",
      "framework": "vitest",
      "storyId": "US-004",
      "acIndex": 3,
      "moduleId": "GameEngine"
    },
    {
      "target": "ScoreManager.updateScore",
      "description": "Updates the total score for dots, pellets, ghost eats, and fruit collection",
      "framework": "vitest",
      "storyId": "US-005",
      "acIndex": 0,
      "moduleId": "ScoreManager"
    },
    {
      "target": "GameEngine.handleLifeLoss",
      "description": "Decrements lives when Pac‑Man collides with a non‑scared ghost",
      "framework": "vitest",
      "storyId": "US-005",
      "acIndex": 1,
      "moduleId": "GameEngine"
    },
    {
      "target": "ScoreManager.checkExtraLifeAward",
      "description": "Awards an extra life automatically when score reaches 10,000 points",
      "framework": "vitest",
      "storyId": "US-005",
      "acIndex": 2,
      "moduleId": "ScoreManager"
    },
    {
      "target": "UI.showGameOverScreen",
      "description": "Displays the Game Over overlay when all lives are lost",
      "framework": "vitest",
      "storyId": "US-005",
      "acIndex": 3,
      "moduleId": "UI"
    },
    {
      "target": "StartScreen.render",
      "description": "Renders title, Start button and top‑10 high scores on the Start screen",
      "framework": "vitest",
      "storyId": "US-006",
      "acIndex": 0,
      "moduleId": "UI"
    },
    {
      "target": "Countdown.start",
      "description": "Runs a 3‑2‑1 countdown after Start is pressed before gameplay begins",
      "framework": "vitest",
      "storyId": "US-006",
      "acIndex": 1,
      "moduleId": "UI"
    },
    {
      "target": "PauseHandler.togglePause",
      "description": "Shows Pause overlay and freezes game loop when pause button or 'P' key is pressed, and resumes on second press",
      "framework": "vitest",
      "storyId": "US-006",
      "acIndex": 2,
      "moduleId": "PauseHandler"
    },
    {
      "target": "GameOverScreen.handleInitialsEntry",
      "description": "Accepts player initials when a high score is achieved and provides a Restart button",
      "framework": "vitest",
      "storyId": "US-006",
      "acIndex": 3,
      "moduleId": "UI"
    },
    {
      "target": "AudioManager.playSound",
      "description": "Plays the correct sound effect for each game event (dot, pellet, ghost eat, death, fruit, extra life, start‑up jingle)",
      "framework": "vitest",
      "storyId": "US-007",
      "acIndex": 0,
      "moduleId": "AudioManager"
    },
    {
      "target": "AudioManager.playBackgroundSiren",
      "description": "Loops background siren during normal gameplay and adjusts pitch/speed as level progresses",
      "framework": "vitest",
      "storyId": "US-007",
      "acIndex": 1,
      "moduleId": "AudioManager"
    },
    {
      "target": "AudioManager.toggleMute",
      "description": "Mutes or unmutes all audio instantly when the mute button is toggled",
      "framework": "vitest",
      "storyId": "US-007",
      "acIndex": 2,
      "moduleId": "AudioManager"
    },
    {
      "target": "StorageManager.saveHighScore",
      "description": "Persists a high‑score record to IndexedDB (or localStorage fallback)",
      "framework": "vitest",
      "storyId": "US-008",
      "acIndex": 1,
      "moduleId": "StorageManager"
    },
    {
      "target": "Accessibility.focusManagement",
      "description": "Ensures all interactive elements are reachable via Tab/Shift+Tab and display visible focus outlines",
      "framework": "vitest",
      "storyId": "US-009",
      "acIndex": 0,
      "moduleId": "Accessibility"
    },
    {
      "target": "Accessibility.ariaLabels",
      "description": "Provides appropriate ARIA labels for buttons and screens for screen readers",
      "framework": "vitest",
      "storyId": "US-009",
      "acIndex": 1,
      "moduleId": "Accessibility"
    },
    {
      "target": "ColorPalette.toggleColorBlindMode",
      "description": "Switches ghost colors to a color‑blind‑friendly palette and updates rendering accordingly",
      "framework": "vitest",
      "storyId": "US-009",
      "acIndex": 2,
      "moduleId": "ColorPalette"
    },
    {
      "target": "InputHandler.keyboardOnlyMode",
      "description": "Allows full gameplay using only keyboard input, no mouse required",
      "framework": "vitest",
      "storyId": "US-009",
      "acIndex": 3,
      "moduleId": "InputHandler"
    },
    {
      "target": "PerformanceMonitor.checkFPS",
      "description": "Verifies that the game maintains a stable 60 fps on typical desktop and mobile browsers",
      "framework": "vitest",
      "storyId": "US-010",
      "acIndex": 0,
      "moduleId": "PerformanceMonitor"
    },
    {
      "target": "BuildConfig.checkBundleSize",
      "description": "Ensures the production bundle size reported by Vite is under 2 MB",
      "framework": "vitest",
      "storyId": "US-010",
      "acIndex": 1,
      "moduleId": "BuildConfig"
    },
    {
      "target": "LayoutResponsive.checkBreakpoints",
      "description": "Confirms UI elements remain readable and correctly positioned from 375 px to 2560 px widths",
      "framework": "vitest",
      "storyId": "US-010",
      "acIndex": 2,
      "moduleId": "LayoutResponsive"
    },
    {
      "target": "App.startupSequence",
      "description": "Validates that launching the app shows the Start screen, runs countdown, and begins gameplay with all subsystems active",
      "framework": "vitest",
      "storyId": "US-011",
      "acIndex": 0,
      "moduleId": "App"
    },
    {
      "target": "PauseHandler.integrationTest",
      "description": "Ensures pausing freezes the game loop and unpausing resumes it without state loss",
      "framework": "vitest",
      "storyId": "US-011",
      "acIndex": 1,
      "moduleId": "PauseHandler"
    },
    {
      "target": "GameOverFlow.integrationTest",
      "description": "Checks that losing all lives shows Game Over, saves high scores, and Restart returns to Start screen",
      "framework": "vitest",
      "storyId": "US-011",
      "acIndex": 2,
      "moduleId": "GameOverFlow"
    },
    {
      "target": "OfflinePersistence.integrationTest",
      "description": "Verifies the app works offline after first load and high‑score list persists across sessions",
      "framework": "vitest",
      "storyId": "US-011",
      "acIndex": 3,
      "moduleId": "ServiceWorker"
    }
  ],
  "integration": [
    {
      "target": "InputHandler → GameEngine direction update",
      "description": "Tests that keyboard, WASD, touch‑swipe and on‑screen button events are normalized and correctly update Pac‑Man's intended direction",
      "framework": "vitest",
      "storyId": "US-001",
      "acIndex": 1,
      "moduleId": "InputHandler"
    },
    {
      "target": "GameEngine → Renderer maze draw",
      "description": "Ensures the Renderer reads the game state and draws walls, dots and pellets exactly as defined by the level config",
      "framework": "vitest",
      "storyId": "US-001",
      "acIndex": 0,
      "moduleId": "Renderer"
    },
    {
      "target": "GameEngine → AudioManager dot sound",
      "description": "Confirms that consuming a dot triggers the correct sound effect via AudioManager",
      "framework": "vitest",
      "storyId": "US-007",
      "acIndex": 0,
      "moduleId": "AudioManager"
    },
    {
      "target": "GameEngine → StorageManager high‑score save",
      "description": "Validates that when a high score is achieved, StorageManager persists it to IndexedDB",
      "framework": "vitest",
      "storyId": "US-008",
      "acIndex": 1,
      "moduleId": "StorageManager"
    },
    {
      "target": "ServiceWorker cache assets",
      "description": "Checks that after the first load the Service Worker precaches all game assets and the app loads successfully with network disabled",
      "framework": "vitest",
      "storyId": "US-008",
      "acIndex": 0,
      "moduleId": "ServiceWorker"
    },
    {
      "target": "HighScoreService ranking logic",
      "description": "Ensures HighScoreService reads scores from StorageManager, inserts a new score, and returns a correctly ordered top‑10 list",
      "framework": "vitest",
      "storyId": "US-005",
      "acIndex": 0,
      "moduleId": "HighScoreService"
    },
    {
      "target": "PauseHandler → GameEngine loop control",
      "description": "Verifies that invoking PauseHandler.togglePause freezes the game loop and that a second toggle resumes it",
      "framework": "vitest",
      "storyId": "US-006",
      "acIndex": 2,
      "moduleId": "PauseHandler"
    },
    {
      "target": "ColorPalette → Renderer color update",
      "description": "Tests that toggling the color‑blind palette updates ghost colors in the Renderer output",
      "framework": "vitest",
      "storyId": "US-009",
      "acIndex": 2,
      "moduleId": "Renderer"
    },
    {
      "target": "Accessibility → UI ARIA verification",
      "description": "Checks that all UI components expose appropriate ARIA labels and roles",
      "framework": "vitest",
      "storyId": "US-009",
      "acIndex": 1,
      "moduleId": "Accessibility"
    },
    {
      "target": "PerformanceMonitor ↔ Renderer FPS hook",
      "description": "Measures frame timestamps from Renderer to confirm average 60 fps over a 5‑second window",
      "framework": "vitest",
      "storyId": "US-010",
      "acIndex": 0,
      "moduleId": "PerformanceMonitor"
    },
    {
      "target": "BuildConfig bundle size check",
      "description": "Runs Vite build and asserts the generated bundle is <2 MB",
      "framework": "vitest",
      "storyId": "US-010",
      "acIndex": 1,
      "moduleId": "BuildConfig"
    },
    {
      "target": "LayoutResponsive → UI breakpoint test",
      "description": "Renders the app at multiple viewport widths and asserts UI elements remain legible and correctly positioned",
      "framework": "vitest",
      "storyId": "US-010",
      "acIndex": 2,
      "moduleId": "LayoutResponsive"
    },
    {
      "target": "App wiring end‑to‑end",
      "description": "Ensures that Start Screen, Countdown, GameEngine, Renderer, AudioManager, ScoreManager and UI are all instantiated and communicate correctly when a game session begins",
      "framework": "vitest",
      "storyId": "US-011",
      "acIndex": 0,
      "moduleId": "App"
    }
  ],
  "e2e": [
    {
      "scenario": "Start game, play through first level, eat dots and power pellet, trigger scared mode, eat a ghost, collect fruit, pause, resume, lose all lives, view Game Over and submit high score",
      "description": "Covers US‑001, US‑003, US‑004, US‑005, US‑006, US‑007, US‑011 critical flow end‑to‑end",
      "criticalPath": true,
      "storyId": "US-011",
      "acIndex": 0,
      "moduleId": "E2E"
    },
    {
      "scenario": "Navigate UI using only keyboard: Tab through Start button, High Scores, Mute toggle, and start game without mouse",
      "description": "Validates US‑009 keyboard navigation and focus outlines",
      "criticalPath": true,
      "storyId": "US-009",
      "acIndex": 3,
      "moduleId": "E2E"
    },
    {
      "scenario": "Toggle color‑blind palette from Settings and verify ghost colors change in the canvas",
      "description": "Ensures US‑009 color‑blind palette toggle works and is reflected visually",
      "criticalPath": true,
      "storyId": "US-009",
      "acIndex": 2,
      "moduleId": "E2E"
    },
    {
      "scenario": "Mute and unmute audio during gameplay and verify no sound is heard when muted",
      "description": "Tests US‑007 mute button functionality in a real browser context",
      "criticalPath": true,
      "storyId": "US-007",
      "acIndex": 2,
      "moduleId": "E2E"
    },
    {
      "scenario": "Load the game after closing the browser (offline mode) and confirm high‑score list persists",
      "description": "Validates US‑008 offline caching and persistent high scores across sessions",
      "criticalPath": true,
      "storyId": "US-008",
      "acIndex": 1,
      "moduleId": "E2E"
    },
    {
      "scenario": "Resize browser window from 375px to 2560px and verify UI remains readable and controls accessible",
      "description": "Covers US‑010 responsive layout requirement",
      "criticalPath": true,
      "storyId": "US-010",
      "acIndex": 2,
      "moduleId": "E2E"
    },
    {
      "scenario": "Verify that the game maintains ~60 fps on desktop Chrome during active play",
      "description": "Measures performance to satisfy US‑010 fps requirement",
      "criticalPath": true,
      "storyId": "US-010",
      "acIndex": 0,
      "moduleId": "E2E"
    },
    {
      "scenario": "Pause the game using the 'P' key and ensure the game loop stops and UI overlay appears",
      "description": "Validates US‑006 pause via keyboard",
      "criticalPath": true,
      "storyId": "US-006",
      "acIndex": 2,
      "moduleId": "E2E"
    },
    {
      "scenario": "Start a new game after Game Over using the Restart button and confirm the Start screen reappears",
      "description": "Ensures US‑006 restart flow works end‑to‑end",
      "criticalPath": true,
      "storyId": "US-006",
      "acIndex": 3,
      "moduleId": "E2E"
    },
    {
      "scenario": "Collect all dots and power pellets to complete a level and verify level‑complete state triggers next level load",
      "description": "Covers US‑001 level completion criterion",
      "criticalPath": true,
      "storyId": "US-001",
      "acIndex": 3,
      "moduleId": "E2E"
    }
  ],
  "coverageTargets": {
    "unit": 85,
    "integration": 70,
    "e2e": 100
  }
}
