#!/bin/sh

cd client
npm install
cd ..
cd server
npm install
npm install prisma --save-dev
npm run build
cd ..
npm run start:docker
