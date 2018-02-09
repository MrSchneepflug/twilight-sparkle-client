#!/usr/bin/env bash

npm run build

cp build/static/js/main.*.js ../server/public/js/client.js
cp build/static/js/main.*.map ../server/public/js/client.js.map
cp build/static/css/main.*.css ../server/public/css/client.css
cp build/static/css/main.*.map ../server/public/css/client.css.map

