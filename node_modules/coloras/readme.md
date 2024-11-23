<p align="center">
  <img src="https://github.com/mister-coded/coloras/raw/master/coloras.png" alt="Coloras">
</p>

<h1 align="center">Coloras</h1>

> 👨‍💻 User friendly color manipulation library & CLI tool

<p align="center">
  <img src="https://img.shields.io/npm/v/coloras?label=Latest%20Version&style=for-the-badge&logo=npm&color=informational">
  <img src="https://img.shields.io/npm/dw/coloras?style=for-the-badge">
  <img src="https://img.shields.io/github/forks/mister-coded/coloras?style=for-the-badge">
  <img src="https://img.shields.io/github/stars/mister-coded/coloras?style=for-the-badge">
</p>

## Install

**Module:**

```
$ npm install coloras
```

**CLI:**

```
$ npm install -g coloras
```

## Module

### Usage

```js
const { Color } = require("coloras");

const color = new Color("#1f1f1f"); // Create a new Color instance

color.toHex(); // -> #1f1f1f
color.toRgb(); // -> rgb(31, 31, 31)
color.toHsl(); // -> hsl(0, 0%, 12%)
color.toHsv(); // -> hsv(0, 0%, 12%)
color.toCmyk(); // -> cmyk(0, 0, 0, 88)

color.toArray(); // -> ["1f","1f","1f"]

color.imageUrl; // -> https://dummyimage.com/600x400/1f1f1f/1f1f1f.png
```

Create a random color

```js
const { Color } = require("coloras");

// Create a random color by not passing any parameters in the constructor
const random = new Color(); 

random.toHex(); // Generated color in hex format
random.toRgb(); // Generated color in rgb format
random.toHsl(); // Generated color in hsl format
random.toHsv(); // Generated color in hsv format
random.toCmyk(); // Generated color in cmyk format

random.toArray(); /* -> 
{ 
  hex: Array<string>,
  rgb: Array<string>,
  hsl: Array<string>,
  hsv: Array<string>,
  cmyk: Array<string>
} */

random.toArray().hex; // Array with generated hex color values

random.imageUrl; // An image url for the random color
```

Check if a string is a color and, if so, also check its color system

```js
const { isColor } = require("coloras");

// isColor(color: string): { color: boolean, colorSystem: string | null }

isColor("#1f1f1f"); // -> { color: true, colorSystem: "hex" }
isColor("coloras"); // -> { color: false, colorSystem: null }
```

## CLI

### Usage

`coloras <command>`

**See usage examples [here!](https://github.com/mister-coded/coloras/blob/master/cli_demo)**

### Commands

- `coloras <-version|-v>`
- `coloras help`
- `coloras <convert|conv> [-copy|-c]`
- `coloras <generate|gen> [-copy|-c]`
- `coloras <image|img> [-copy|-c]`

| Command |   Alias | Description | Flags | Example |
| ----- | ----- | ----- | ----- | ----- |
| `-version` | `-v` | Output current version|  | `coloras -v` |
| `help` |  | Output usage/help information |  | `coloras help` |
| `convert` | `conv` | Convert a color among different color systems | `-copy` ; `-c` Copy the color to clipboard | `coloras conv -c` |
| `generate` | `gen` | Generate a random color | `-copy` ; `-c` Copy the color to clipboard | `coloras gen -c` |
| `image` | `img` | Get an image url for a color | `-copy` ; `-c` Copy the url to clipboard | `coloras img -c` |

## Contributing

Contributing, issues and feature requests are welcome.