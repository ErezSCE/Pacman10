# Product Manager Mission Report

**Agent**: product-manager  
**Generated**: 2026-08-13T21:44:10.495Z

---

## User Stories (11)

### US-001: As a player, I want to see the maze rendered and control Pac-Man
- So that: I can play the core gameplay loop
- AC: The maze with walls, dots, and power pellets is drawn correctly on the canvas for the current level.; Pac-Man moves continuously in the last direction chosen, stops at walls, and mouth animation syncs with movement.; Eating a dot removes it from the maze and adds 10 points to the score.; When all dots and power pellets are consumed, the level is marked complete.
### US-002: As a player, I want ghosts with distinct personalities and chase/scatter behavior
- So that: the challenge feels authentic and varied
- AC: Each of the four ghosts follows its defined targeting algorithm (direct chase, ambush, flank, random).; Ghosts alternate between chase and scatter modes according to the timer defined in level config.; When Pac-Man enters a tunnel, both Pac-Man and ghosts wrap correctly from one side of the maze to the opposite side.
### US-003: As a player, I want power pellets to trigger scared mode so I can eat ghosts
- So that: I can gain extra points and strategic advantage
- AC: Consuming a power pellet puts all ghosts into scared mode for the configured duration.; During scared mode ghosts change to the vulnerable color, move slower, and reverse direction immediately.; In the last two seconds of scared mode ghosts flash to indicate the state is ending.; Eating a scared ghost awards escalating points (200, 400, 800, 1600) and the ghost turns into eyes that return to the ghost house.
### US-004: As a player, I want bonus fruits to appear and award points
- So that: I have additional scoring opportunities
- AC: A fruit spawns after the configured number of dots are eaten (e.g., ~70 for first fruit, ~170 for second).; The fruit displayed matches the level-specific type and point value.; If the player does not collect the fruit within the timeout, it disappears.; Collecting the fruit adds the correct points to the score.
### US-005: As a player, I want my score, lives, and extra lives to be tracked
- So that: I can see my progress and continue playing longer
- AC: Score updates correctly for dots, pellets, ghost eats, and fruit collection.; The player starts with three lives; a life is lost when a non‑scared ghost collides with Pac-Man.; An extra life is awarded automatically when the score reaches 10,000 points.; When all lives are lost, the Game Over screen is shown.
### US-006: As a player, I want intuitive screens to start, pause, and view high scores
- So that: I can navigate the game without confusion
- AC: The Start Screen displays the game title, a "Start" button, and the current top‑10 high scores.; Pressing Start triggers a 3‑2‑1 countdown before gameplay begins.; Pressing the pause button or the "P" key shows the Pause overlay and freezes all game activity.; After a game ends, the Game Over screen allows initials entry (if a high score) and a button to restart.
### US-007: As a player, I want sound effects and background music with mute control
- So that: the game feels immersive and I can silence it if needed
- AC: Each game event (dot, power pellet, ghost eat, death, fruit, extra life, start‑up jingle) plays the correct sound effect.; A looping background siren plays during normal gameplay and its pitch/speed changes as the level progresses.; A visible mute button toggles all audio on and off instantly.
### US-008: As a user, I want the game to work offline and high scores to persist
- So that: I can play without an internet connection and keep my achievements
- AC: After the first load, the Service Worker caches all game assets and the app loads successfully with the network disabled.; High scores are saved to IndexedDB (or localStorage fallback) and are available after closing and reopening the browser.
### US-009: As a player with accessibility needs, I want full keyboard navigation, ARIA labels, focus indicators, and a color‑blind palette
- So that: I can play the game comfortably
- AC: All interactive elements (buttons, menus) are reachable via Tab/Shift+Tab and have visible focus outlines.; ARIA labels describe the purpose of each button and screen for screen readers.; A toggle switches the ghost colors to a color‑blind‑friendly palette, and the change is reflected in the rendered game.; The game can be played entirely with keyboard input (no mouse required).
### US-010: As a player, I want smooth 60 fps performance and a responsive layout
- So that: the game feels fluid on any device
- AC: The game maintains a stable 60 fps frame rate on typical desktop and mobile browsers.; The production bundle size reported by Vite is under 2 MB.; The layout adapts gracefully from 375 px wide phones to 2560 px wide desktops, keeping UI elements readable.
### US-011: As a player, I want all components wired together so the game is playable end‑to‑end
- So that: I can start, play, pause, and finish a game without errors
- AC: Launching the app shows the Start Screen; after clicking Start, the countdown runs and gameplay begins with input, rendering, audio, scoring, and lives functioning.; Pausing freezes the game loop and shows the Pause overlay; unpausing resumes the loop.; When the player loses all lives, the Game Over screen appears, high scores are saved, and the Restart button returns to the Start Screen.; The application works offline after the first load and the high‑score list persists across sessions.

## Tasks (49)

- **TASK-001** [infra/Vite, Preact, TypeScript] Initialize Vite + Preact + TypeScript project
- **TASK-002** [infra/npm / yarn] Install core dependencies
- **TASK-003** [infra/GitHub Actions] Configure GitHub Actions CI/CD workflow
- **TASK-004** [infra/Vite-PWA, Workbox] Set up Vite-PWA service worker
- **TASK-005** [backend/TypeScript, Canvas API] Render maze walls and dots
- **TASK-006** [backend/TypeScript] Implement Pac-Man movement and collision detection
- **TASK-007** [backend/TypeScript] Extend GameState type with score, lives, and level
- **TASK-008** [frontend/Preact, Zustand] Display score, lives, and level on GameScreen
- **TASK-009** [testing/Vitest] Unit tests for movement and dot consumption
- **TASK-010** [backend/TypeScript] Implement ghost AI personalities
- **TASK-011** [backend/TypeScript] Add chase/scatter timer logic
- **TASK-012** [backend/TypeScript] Implement tunnel wrapping for Pac-Man and ghosts
- **TASK-013** [testing/Vitest] Unit tests for ghost behavior and tunnel wrapping
- **TASK-014** [backend/TypeScript] Handle power pellet consumption and scared mode activation
- **TASK-015** [backend/Canvas API] Render ghost color change and flashing during scared mode
- **TASK-016** [backend/TypeScript] Escalating ghost‑eating score logic
- **TASK-017** [testing/Vitest] Unit tests for scared mode timing and ghost‑eating points
- **TASK-018** [backend/TypeScript] Implement fruit spawn logic based on dot count
- **TASK-019** [backend/Canvas API] Render fruit sprite on canvas
- **TASK-020** [backend/TypeScript] Award points when fruit is collected
- **TASK-021** [testing/Vitest] Unit tests for fruit spawn, timeout, and collection
- **TASK-022** [backend/TypeScript] Implement lives management and extra‑life logic
- **TASK-023** [frontend/Preact, Zustand] Show lives and extra‑life notification in UI
- **TASK-024** [frontend/Preact, Zustand] Implement Game Over flow and restart logic
- **TASK-025** [testing/Vitest] Unit tests for life loss and extra‑life awarding
- **TASK-026** [frontend/Preact, Zustand] Wire high‑score display into StartScreen
- **TASK-027** [frontend/Preact] Create Countdown overlay component
- **TASK-028** [frontend/Preact, Zustand] Implement PauseOverlay behavior to freeze the game loop
- **TASK-029** [frontend/Preact, Zustand] Connect HighScoreList component with storage services
- **TASK-030** [testing/Playwright] Playwright end‑to‑end tests for UI navigation
- **TASK-031** [backend/TypeScript, Howler.js] Hook AudioManager into GameEngine events
- **TASK-032** [frontend/Preact] Add mute button UI and connect to AudioManager
- **TASK-033** [backend/Howler.js] Dynamic siren pitch/speed based on level progress
- **TASK-034** [testing/Vitest, jest-mock] Unit tests for AudioManager mute functionality
- **TASK-035** [infra/Vite-PWA, Workbox] Configure Vite-PWA plugin for asset precaching
- **TASK-036** [backend/TypeScript, IndexedDB] Implement robust StorageManager with IndexedDB fallback
- **TASK-037** [frontend/Preact, Zustand] Load high scores on app start and display them
- **TASK-038** [testing/Playwright] Playwright test for offline capability
- **TASK-039** [frontend/Preact, HTML ARIA] Add ARIA labels and keyboard navigation to UI components
- **TASK-040** [frontend/CSS] Implement visible focus indicator styling
- **TASK-041** [frontend/Preact, Zustand] Add color‑blind palette toggle and propagate to renderer
- **TASK-042** [testing/Vitest] Unit test for color‑blind palette rendering
- **TASK-043** [backend/Canvas API, requestAnimationFrame] Optimize rendering loop for minimal redraws
- **TASK-044** [infra/Vite, Rollup] Configure Vite build for bundle size <2 MB
- **TASK-045** [frontend/CSS, Flexbox, Grid] Responsive layout for canvas and UI
- **TASK-046** [testing/Vitest] Performance test to measure frame time
- **TASK-047** [frontend/Preact, Zustand] Wire all services and mount root UI component
- **TASK-048** [frontend/Preact, Zustand] Coordinate game loop start/stop with UI states
- **TASK-049** [testing/Playwright] End‑to‑end integration test for full game flow
