# WebScreen

##### Table of Contents

- [Overview](#overview)
- [Getting started](#Getting-started)
- [URL JSON](#URL-JSON)
  - [Example JSON file](#Example-JSON-file)
  - [JSON (options)](#JSON-(options))
- [Output](#Output)
- [puppeteer vs puppeteer-core](#puppeteer-vs-puppeteer-core)


### Overview

WebScreen is a tool to generate images of a website. It works with Puppeteer API, headless Chrome.


> **NOTE** It supports full site images, window images, and id or class selector images.
.
Please fell free to clone and adapt the code to your needs.

### Getting-started

To run the project, first we need to install npm packages. Execute the following commands:

- npm install
- npm start

Then you need to modify `url.json` file to add the sites and selectors you want to screenshot.

### URL-JSON

This file contains an array of the URLs to process. Inside the url it has an elements object. The elements object is an array with css selectors to capture a specific area.

#### Example JSON file

```JSON

[
    {
        "url": "https://github.com/",
        "name": "github",
        "fullPage": true,
        "capturePage": true,
        "elements": [
            ".home-hero-signup"
        ],
        "extension": "jpeg"
    },
    {
        "url": "https://google.com/",
        "viewport": {
            "width": 300,
            "height": 400
        },
                "capturePage": true,

        "elements": [
            ".content",
            "#gws-output-pages-elements-homepage_additional_languages__als"
        ]
    }
]

```

#### JSON (options)

- `url` <[string]>  Must inlude url to capture. All other parameters are optional.
- `name` <[string]> name for image outputs url part. Defaults to parsed url.
- `fullPage` <[boolean]> should capture entire page, must have capture page to true. If this is false captures viewport only. Defaults to false.
- `capturePage` <[boolean]> should capture complete web page. Defaults to false.
- `extension` <[string]> Specify screenshot type, can be either `jpeg` or `png`. Defaults to 'png'.
- `omitBackground` <[boolean]> Hides default white background and allows capturing screenshots with transparency. Defaults to `false`.

- `elements` <[string[]]>" array of strings with css selectors to capture.
- `viewport` <[Object]> Viewport object which might have the following properties:
  - `width` <[number]> page width in pixels. Defaults to 800.
  - `height` <[number]> page height in pixels. Defaults to 600.
  - `deviceScaleFactor` <[number]> Specify device scale factor (can     be - thought of as dpr). Defaults to 1.
  - `isMobile` <[boolean]> Whether the meta viewport tag is taken     into - account. Defaults to false.
  - `hasTouch`<[boolean]> Specifies if viewport supports touch     events. - Defaults to false
  - `isLandscape` <[boolean]> Specifies if viewport is in landscape     . - Defaults to false.

### Output

The output is inside the screenshots folder. The images are labeled by default using the url and selector.

> **NOTE** It supports full site images, window images, and id or class selector images.
.
Please fell free to clone and adapt the code to your needs.

### Puppeteer vs puppeteer-core

To modify the code, you should understand how to control headless chrome in NodeJs

- [puppeteer](https://www.npmjs.com/package/puppeteer)
- [puppeteer-core](https://www.npmjs.com/package/puppeteer-core)

`puppeteer` is a *product* for browser automation. When installed, it downloads a version of
Chromium, which it then drives using `puppeteer-core`. Being an end-user product, `puppeteer` supports a bunch of convenient `PUPPETEER_*` env variables to tweak its behavior.

`puppeteer-core` is a *library* to help drive anything that supports DevTools protocol. `puppeteer-core` doesn't download Chromium when installed. Being a library, `puppeteer-core` is fully driven
through its programmatic interface and disregards all the `PUPPETEER_*` env variables.

To sum up, the only differences between `puppeteer-core` and `puppeteer` are:

- `puppeteer-core` doesn't automatically download Chromium when installed.
- `puppeteer-core` ignores all `PUPPETEER_*` env variables.

In most cases, you'll be fine using the `puppeteer` package.

However, you should use `puppeteer-core` if:

- you're building another end-user product or library atop of DevTools protocol. For example, one might build PDF generator using `puppeteer-core` and write a custom `install.js` script that downloads [`headless_shell`](https://chromium.googlesource.com/chromium/src/+/lkgr/headless/README.md) instead of Chromium to save disk space.
- you're bundling Puppeteer to use in Chrome Extension / browser with the DevTools protocol where downloading an additional Chromium binary is unnecessary.

When using `puppeteer-core`, remember to change the *include* line:

```typescrypt
const puppeteer = require('puppeteer-core');
```
