# Bulk Image Generator for Google Flow

A lightweight Chrome extension that helps you manage multiple image-generation prompts for **Google Flow**.

Instead of repeatedly keeping prompts in a separate text file and manually selecting them, this extension lets you upload a `.txt` file, separates the prompts, and provides a **Copy** button for each prompt.

> **Important:** This extension does **not** automatically enter or submit prompts in Google Flow. Copying and pasting the prompts into Google Flow is done manually.

---

## Features

- Upload multiple prompts using a `.txt` file
- Automatically separates prompts using blank lines
- Displays prompts individually
- Copy each prompt with one click
- Works as a local Chrome extension
- No backend required
- No API key required
- No database required
- Simple and lightweight

---

## How It Works

```text
                 prompts.txt
                     │
                     ▼
          ┌─────────────────────┐
          │   Bulk Image        │
          │     Generator       │
          │      Extension      │
          └──────────┬──────────┘
                     │
                     ▼
              Prompt 1 → Copy
              Prompt 2 → Copy
              Prompt 3 → Copy
              Prompt 4 → Copy
                     │
                     ▼
                Google Flow
                     │
                     ▼
            Paste Prompt Manually
                     │
                     ▼
               Generate Image
```

The extension handles **prompt organization and copying**.

Google Flow handles the actual image generation.

---

# Installation

This extension is currently distributed as an **unpacked Chrome extension** and is not installed through the Chrome Web Store.

## Step 1 — Download the Repository

Go to the GitHub repository:

**Bulk Image Generator**

Click:

```text
Code → Download ZIP
```

---

## Step 2 — Extract the ZIP

Extract the downloaded ZIP file.

You should see the project folder.

Inside the repository, the extension is located in:

```text
bulk image generator/
```

---

## Step 3 — Open Chrome Extensions

Open Google Chrome and go to:

```text
chrome://extensions
```

---

## Step 4 — Enable Developer Mode

Turn on:

```text
Developer mode
```

You will find this option in the top-right corner of the Chrome Extensions page.

---

## Step 5 — Load the Extension

Click:

```text
Load unpacked
```

Select the:

```text
bulk image generator
```

folder.

Make sure this is the folder containing:

```text
manifest.json
```

Chrome will load the extension.

---

## Step 6 — Open the Extension

The **Bulk Image Generator** extension should now appear in your Chrome extensions list.

You can pin it to the Chrome toolbar for easier access.

---

# Usage

## Step 1 — Create a `.txt` File

Create a normal text file.

For example:

```text
prompts.txt
```

Write your image-generation prompts inside this file.

### Important

Use a **blank line between each prompt**.

For example:

```text
A cinematic portrait of a warrior standing on a mountain at sunrise.

A futuristic city at night with neon lights, flying cars and rain reflections.

A peaceful Japanese village during autumn, cinematic lighting and detailed environment.

A realistic astronaut standing on Mars during sunset, cinematic composition.
```

The extension will treat this as **4 separate prompts**.

---

# Prompt Format

The basic format is:

```text
Prompt 1

Prompt 2

Prompt 3

Prompt 4
```

Each prompt should be separated by a blank line.

### Example

```text
A cinematic portrait of a warrior standing on a mountain.

A futuristic city at night with neon lights and flying cars.

A peaceful village during autumn with mountains in the background.
```

The extension identifies:

```text
Prompt 1
Prompt 2
Prompt 3
```

as separate prompts.

---

# Using the Extension

## 1. Open the Extension

Click the **Bulk Image Generator** extension from the Chrome toolbar.

---

## 2. Upload Your `.txt` File

Select the `.txt` file containing your prompts.

For example:

```text
prompts.txt
```

The extension will read the file and separate the prompts automatically.

---

## 3. View Your Prompts

The extension will display your prompts individually.

For example:

```text
Prompt 1
[Copy]

Prompt 2
[Copy]

Prompt 3
[Copy]

Prompt 4
[Copy]
```

---

## 4. Copy a Prompt

Click the **Copy** button next to the prompt you want to use.

The prompt is copied to your clipboard.

---

## 5. Open Google Flow

Open **Google Flow** in Chrome.

Go to the image-generation interface.

---

## 6. Paste the Prompt Manually

Paste the copied prompt into Google Flow.

The process is:

```text
Bulk Image Generator
        │
        ▼
   Click Copy
        │
        ▼
   Open Google Flow
        │
        ▼
   Paste Prompt
        │
        ▼
 Generate Image
```

---

## 7. Repeat

Copy the next prompt from the extension and manually paste it into Google Flow.

Repeat this process for all prompts.

---

# Important: Manual Copy & Paste

This extension **does not automatically control Google Flow**.

It does not:

- Automatically paste prompts
- Automatically click Generate
- Automatically submit prompts
- Automatically generate images
- Automatically interact with Google Flow

The user manually performs:

**Copy → Paste → Generate**

This keeps the extension simple and avoids directly automating the Google Flow interface.

---

# Example Workflow

Suppose your `prompts.txt` contains:

```text
A cinematic portrait of a samurai standing in the rain.

A futuristic city with flying cars at night.

A peaceful forest with sunlight passing through the trees.

An astronaut walking on Mars during sunset.
```

The extension separates them into:

```text
Prompt 1
Prompt 2
Prompt 3
Prompt 4
```

Then:

```text
Prompt 1 → Copy → Paste into Google Flow → Generate

Prompt 2 → Copy → Paste into Google Flow → Generate

Prompt 3 → Copy → Paste into Google Flow → Generate

Prompt 4 → Copy → Paste into Google Flow → Generate
```

---

# Recommended Prompt File

For the best results, keep each prompt as a separate paragraph.

Example:

```text
A cinematic photograph of a lone warrior standing on a mountain peak during sunrise, dramatic clouds, realistic lighting, detailed environment.

A futuristic cyberpunk city at night, neon signs, flying vehicles, wet streets reflecting colorful lights, cinematic photography.

A peaceful Japanese village during autumn, traditional houses, orange maple trees, mountains in the background, warm morning light.

A realistic astronaut standing on the surface of Mars, dramatic sunset, detailed spacesuit, cinematic composition.
```

---

# Requirements

You need:

- Google Chrome
- Google Flow access
- The Bulk Image Generator extension
- A `.txt` file containing your prompts

---

# Privacy

The extension is designed to work locally in the browser.

Your prompt `.txt` file is used by the extension to read and display your prompts.

No backend or database is required for the extension's basic functionality.

---

# Troubleshooting

## Extension does not appear

Go to:

```text
chrome://extensions
```

Make sure **Developer mode** is enabled.

Then click:

```text
Load unpacked
```

and select the folder containing:

```text
manifest.json
```

---

## Prompts are not separated correctly

Make sure there is a **blank line** between prompts.

Correct:

```text
Prompt 1

Prompt 2

Prompt 3
```

Incorrect:

```text
Prompt 1
Prompt 2
Prompt 3
```

---

## Copy button does not work

Make sure the extension is properly loaded and enabled.

You can also reload the extension from:

```text
chrome://extensions
```

by clicking the reload icon for the extension.

---

# Project Structure

```text
Bulk_image_generator/
│
├── bulk image generator/
│   ├── manifest.json
│   ├── popup.html
│   ├── popup.js
│   ├── content.js
│   ├── style.css
│   └── ...
│
└── README.md
```

> The exact files may vary depending on the current version of the extension.

---

# Limitations

The current version focuses on **prompt management and manual copying**.

It does not provide automated bulk generation inside Google Flow.

You still need to manually:

```text
Copy → Paste → Generate
```

for each prompt.

---

# Future Improvements

Possible future improvements include:

- Prompt history
- Prompt search
- Prompt editing
- Prompt numbering
- Better queue management
- Generation status tracking
- Improved UI
- Additional prompt management features

---

# Disclaimer

This is an independent browser extension project.

It is not an official Google product and is not affiliated with or endorsed by Google.

Google Flow's interface and functionality may change over time, which could affect compatibility with the extension.

---

# Author

**Shailesh Shripathi**

GitHub:

https://github.com/shaileshgoku

---

## Repository

**Bulk Image Generator**

https://github.com/shaileshgoku/Bulk_image_generator
