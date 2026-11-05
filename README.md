# Bulk Image Generator for Google Flow

A Chrome extension that helps you manage and process multiple image-generation prompts for Google Flow.

## Installation

1. Download this repository:
   - Click **Code**
   - Click **Download ZIP**

2. Extract the ZIP file.

3. Open Google Chrome and go to:

   `chrome://extensions`

4. Turn ON **Developer mode**.

5. Click **Load unpacked**.

6. Open the extracted repository and select the **`bulk image generator`** folder.

7. Make sure you select the folder that contains `manifest.json`.

8. The extension will now appear in Chrome.

---

## Usage

### 1. Create your prompts `.txt` file

Create a normal text file, for example:

```text
prompts.txt
```

Write your image-generation prompts inside the file.

**Important:** Keep one prompt as one paragraph and leave a **blank line** between prompts.

Example:

```text
A cinematic portrait of a warrior standing on a mountain at sunrise.

A futuristic city at night, neon lights, flying cars and rain reflections.

A peaceful Japanese village during autumn, cinematic lighting and detailed environment.

A realistic astronaut standing on Mars, dramatic sunset and cinematic composition.
```

Each separated block is treated as **one prompt**.

So the above file contains **4 prompts**.

### 2. Open Google Flow

Open Google Flow in Chrome and go to the image generation workflow.

### 3. Open Bulk Image Generator

Click the **Bulk Image Generator** extension from the Chrome extensions menu.

### 4. Upload your `.txt` file

Upload the `prompts.txt` file you created.

The extension will read the file and separate the prompts automatically.

### 5. Generate images

Use the extension's prompt controls to process the prompts one by one in Google Flow.

---

## Prompt File Format

Use:

```text
Prompt 1

Prompt 2

Prompt 3

Prompt 4
```

### Don't do this

```text
Prompt 1
Prompt 2
Prompt 3
Prompt 4
```

Keep a **blank line** between prompts so the extension can identify them as separate prompts.

---

## Example

Your `.txt` file:

```text
A cute golden retriever sitting in a beautiful garden, cinematic photography.

A futuristic sports car driving through Tokyo at night, neon lights, rain.

A traditional Indian village during sunrise, cinematic wide-angle photography.
```

The extension will interpret this as:

```text
Prompt 1 → Golden retriever

Prompt 2 → Futuristic sports car

Prompt 3 → Indian village
```

---

## Important

This extension is provided as an **unpacked Chrome extension**. It is not installed through the Chrome Web Store.

You need to keep **Developer mode** enabled in Chrome to use it.

The extension is designed to work with **Google Flow** and requires access to Google Flow in your browser.
