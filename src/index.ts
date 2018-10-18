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

  async parsePage(url, name, fullPage, elements) {

    const page = await this.browser.newPage();

    //page.random_useragent();
    await page.goto(url);

    await page.screenshot({ path: "screenshots/" + name + ".jpg", fullPage: fullPage, type: "jpeg" });

    if (elements) {
      await Promise.all(elements.map(async (element) => {
        let el = await page.$(element);
        console.log(el);
        if (el) {
          await el.screenshot({ path: "screenshots/" + name + " " + filenamify(element) + ".jpg", type: "jpeg" });
        }
      }));
    }
    await page.close();
  }

  async processPages() {
    await Promise.all(this.urls.map(async (url) => {
      await this.parsePage(url.url, url.name ? url.name : filenamifyUrl(url.url), url.fullPage ? url.fullPage : false, url.elements);
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
