# TechBubbles

A lightweight, high-performance animated background module that renders
floating technology bubbles with:

Developed together with LLM ChatGPT 5.2 to enhance a minimal portfolio
background using icons that best represent my core skills and technology
stack.\
The original visual inspiration comes from the well-known website
https://cryptobubbles.net.\
You are free to copy, modify, and adapt this code to your own needs.\
The best support is simply giving this repository a star.

-   Elastic collisions
-   Wall bounce physics
-   Configurable speed and weight
-   Inner neon glow (GPU-friendly, no shadowBlur)
-   Fully isolated architecture (no globals)
-   Zero dependencies

------------------------------------------------------------------------

## ✨ Features

-   High performance (no shadowBlur)
-   Configurable via JSON
-   Fully modular and portable
-   Customizable glow color & strength
-   Retina-ready
-   Reusable across projects

------------------------------------------------------------------------

## 📁 Project Structure

    /bubbles/
        bubbles.js
        bubbles.css
        icons.json
        /icons/
            *.svg

------------------------------------------------------------------------

## 🚀 Installation

Include the module in your HTML:

``` html
<link rel="stylesheet" href="bubbles/bubbles.css">
<script src="bubbles/bubbles.js"></script>

<script>
  TechBubbles.init();
</script>
```

------------------------------------------------------------------------

## ⚙ Configuration

All settings are controlled via:

    /bubbles/icons.json

### Example Configuration

``` json
{
  "bubbleCount": 25,
  "speed": 0.8,
  "glow": true,
  "glowStrength": 12,
  "glowColor": "#d946ef",
  "icons": [
    { "file": "typescript.svg", "weight": 10 },
    { "file": "ethereum.svg", "weight": 9 }
  ]
}
```

------------------------------------------------------------------------

## 🔧 Configuration Fields

Field          Type      Description
  -------------- --------- ------------------------------------
bubbleCount    number    Minimum number of bubbles
speed          number    Global speed multiplier
glow           boolean   Enable / disable inner glow
glowStrength   number    Glow thickness (1--30 recommended)
glowColor      string    HEX glow color
icons          array     Icon list with weights

------------------------------------------------------------------------

## 🧠 How It Works

-   Bubbles use simple elastic collision physics
-   Movement is frame-based via requestAnimationFrame
-   Glow is implemented using radial gradients (no shadowBlur)
-   Weight affects size, mass, and relative speed

------------------------------------------------------------------------

## 📈 Performance Notes

-   25--50 bubbles run smoothly on modern devices
-   Avoid extreme `speed` values (\> 2.0)
-   No heavy canvas filters are used

------------------------------------------------------------------------

## 📜 License

MIT --- free to use, modify, and distribute.
