# MerchWizard Pro Chrome Extension

This folder contains the source code for the MerchWizard Pro Chrome extension.

## How to Install (Developer Mode)

1. Open Chrome and navigate to `chrome://extensions/`.
2. Enable **Developer mode** in the top right corner.
3. Click **Load unpacked**.
4. Select this directory (`/chrome-extension`).

## Architecture

- `manifest.json`: Defines the extension's capabilities and permissions. (V3)
- `content.js`: Injected into Amazon pages to fetch BSR and render overlays.
- `background.js`: Handles long-running tasks like bulk scanning and data synchronization.
- `popup.html`: The quick-access interface for sellers.

## Integration with Dashboard

The extension communicates with the main dashboard (built in the root of this project) using the `chrome.storage` API or by sending data to the sync endpoint.
