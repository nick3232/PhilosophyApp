# PhilosophyApp prototype

Open `index.html` in any modern browser. No server, installation, internet connection, or build step is required. Britannica links require internet access.

Keep the five HTML pages (`index.html`, `ideas.html`, `schools.html`, `influence.html`, `quiz.html`), `styles.css`, and all root-level JavaScript files together. These files can also be uploaded to any static web host.

Use the navigation to switch between the timeline, Philosophical Ideas Explorer (`ideas.html`), Philosophical Schools (`schools.html`), Who Influenced Whom? (`influence.html`), and Philosophy Quiz (`quiz.html`). The Explorer starts with “What makes a good life?”; select a question to compare its three philosopher perspectives. Question buttons support keyboard Tab navigation and Enter or Space activation.

Philosophy Quiz draws 10 distinct questions at random from a bank of 20 covering philosophers, schools, and ideas. Each answer locks on selection and reveals the correct answer and an explanation. Advance at your own pace, then see your score and expand Review Answers entries to revisit all 10 questions. Start another quiz for a fresh random session. Progress is not saved when you leave or reload the page.

Who Influenced Whom? (`influence.html`) maps 11 philosophers and selected historical connections. Select a philosopher to highlight their connections, or choose an arrow or relationship button to read its explanation and linked ancient source. Solid arrows show direct personal relationships; dashed arrows show intellectual influence. Arrows point from influencing to influenced philosopher. Clear selection restores the full network. The diagram scrolls horizontally on narrow screens; native relationship buttons offer a keyboard- and touch-friendly alternative. External source links require internet access.

Philosophical Schools introduces Stoicism, Epicureanism, Cynicism, Platonism, and Aristotelianism through overview cards and a comparison table. All five schools are selected initially. Use the checkboxes to choose schools and the category dropdown to focus on happiness, virtue, knowledge, or distinctive emphasis. On smaller screens, scroll horizontally within the full table. Edit `schools-data.js` to update school content; principal figures reference philosopher IDs from `data.js`.

Edit `ideas-data.js` to update or add questions and answers. Each answer uses a `philosopherId` from `data.js`, a display tradition, and a summary. Philosopher names are reused from the shared collection. The layout renders the answers in their listed order, vertically, without needing changes for additional questions.

The ten records in `data.js` were taken from the Greek and Roman philosophy spreadsheet. Edit this file to update the site; changes to the spreadsheet do not automatically update the site. Keep birth and death as numeric historical years, using negative numbers for BCE and positive numbers for CE. Do not use year zero. The current timeline covers 500 BCE to 200 CE; extending the collection outside this range requires changing the limits and tick marks in `app.js`.

Click or keyboard-focus a lifespan bar and press Enter or Space to read its details. On phone screens, the timeline fits the screen with names above each bar and three date markers. Tap any row to select a philosopher. On intermediate screens, scroll horizontally; the name column stays visible.

Optional developer checks: with Node.js installed, run `node --test tests/quiz-state.test.cjs` from the project root. Node.js is not required to use the application.
