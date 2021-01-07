#!/bin/sh

cd client
npm i
npm run build 
cd ..
node app.js