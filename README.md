# Mum's 50th — Istanbul Birthday Surprise

A cute, interactive birthday website made with Python (Flask), HTML, CSS and JavaScript.

## How to run in VS Code

1. Open this folder (`istanbul_birthday_surprise`) in VS Code.
2. Open **Terminal → New Terminal**.
3. Install Flask:
   ```bash
   python -m pip install -r requirements.txt
   ```
   On some Macs/Linux computers, use `python3` instead of `python`.
4. Start the site:
   ```bash
   python app.py
   ```
5. Open **http://127.0.0.1:5000** in your browser.

## The game

1. Click the envelope and watch it open with confetti.
2. Read the surprise invitation.
3. Enter a birthday (day and month).
4. **22 November** unlocks a special winner screen announcing a trip to **Istanbul**.
5. Any other date gets a playful "try again" response.

## Personalise it

- **Invitation text:** edit `templates/index.html`, especially the `letter-screen` section.
- **Reveal message:** edit `templates/index.html` under `reveal-screen`.
- **Birthday answer:** edit this line in `static/script.js`:
  ```js
  if (Number(daySelect.value) === 22 && Number(monthSelect.value) === 11) {
  ```
- **Colours and fonts:** edit `static/style.css`.

## Sharing with Mum

The URL `127.0.0.1:5000` only works on your own computer. To send Mum a link, publish the project on a hosting service that supports Python/Flask (e.g. Render or PythonAnywhere). Don't run Flask's debug server publicly. Alternatively, you can show her the website on your laptop.

The website imports Google Fonts when online, but falls back to standard fonts when offline. No images or extra JavaScript libraries required.

## Deploy on Render
Upload contents of this folder (not the folder itself) to a GitHub repository. On Render, New > Web Service > connect your repository. Use Python 3, Free instance, build command `pip install -r requirements.txt` and start command `gunicorn app:app`. The included `render.yaml` also documents this setup.
