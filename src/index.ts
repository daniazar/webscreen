#!/usr/bin/env node
import * as fs from "fs";
import { Browser, launch } from "puppeteer";
var filenamifyUrl = require('filenamify-url');
var filenamify = require('filenamify');

class Main {
  browser: Browser;
  urls: any;
  constructor() {

  }

  async initialize() {
    this.browser = await launch({ headless: false });
    return this.browser;
  }

  readFile() {
    let rawdata = fs.readFileSync("url.json");
    this.urls = JSON.parse(rawdata.toString());
  }

  async parsePage(input) {

    const url = input.url;
    const name = input.name;
    const fullPage = input.fullPage;
    const elements = input.elements;
    const capturePage = input.capturePage;
    const extension = input.extension;
    const viewport = input.viewport;
    const omitBackground = url.omitBackground;
    const page = await this.browser.newPage();
    await page.setViewport(viewport);
    //page.random_useragent();
    await page.goto(url);

    if (capturePage) {
      await page.screenshot({ path: "screenshots/" + name + "." + extension, fullPage: fullPage, type: extension, omitBackground: omitBackground });
    }

    if (elements) {
      await Promise.all(elements.map(async (element) => {
        let el = await page.$(element);
        console.log(el);
        if (el) {
          await el.screenshot({ path: "screenshots/" + name + " " + filenamify(element) + "." + extension, type: extension, omitBackground: omitBackground });
        }
      }));
    }
    await page.close();
  }

  async processPages() {
    await Promise.all(this.urls.map(async (url) => {
      url.name = url.name ? url.name : filenamifyUrl(url.url);
      url.fullPage = url.fullPage ? url.fullPage : false;
      url.extension = url.extension ? url.extension : "png";
      url.omitBackground = url.omitBackground ? url.omitBackground : false;
      url.viewport = url.viewport ? url.viewport : {
        width: 800,
        height: 600
      }
      url.viewport.width = url.viewport.width ? url.viewport.width : 800;
      url.viewport.height = url.viewport.height ? url.viewport.height : 600;
      await this.parsePage(url);
    }));
    await this.browser.close();
  }

}

async function main() {
  var m = new Main();
  await m.initialize();
  await m.readFile();
  await m.processPages();
}

main();
