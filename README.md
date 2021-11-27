# tutorial2
a fullstack tutorial

#package.json
  scripts
    "watch": "tsc -w"
     - runs Typescript w/ watch flag; /dist will auto update when a change to ts happens 
     - compiles src/index.ts
     - creates/updates dist/ (js versions of our ts)
     
    "start": "node dist/index.js"
      - executes dist/index.js with node
      
    "dev": "nodemon dist/index.js"
     - nodemon makes it so we don't have to manually run `yarn start` after changes, reruns automatically
