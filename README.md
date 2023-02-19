# Datalinks

This is an HTML recreation of the datalinks in Sid Meier's Alpha Centauri.

The sources used were from GoG's Sid Meier's Alien Crossfire with the addition
of the [Comprehensive Datalinks
Update](http://forums.civfanatics.com/showthread.php?t=291246) by GooglyBoogly.
In addition, missing blurbs for the new base facilities were taken from [AC
Wiki](http://alphacentauri2.info/wiki/Main_Page).

## Build Setup

``` bash
# install dependencies
npm install

# local dev server
npm run dev

# build for production with minification
npm run build
cp -r img dist/img
# if you have voices copy them into dist too
```
