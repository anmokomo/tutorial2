# tutorial2
a fullstack tutorial

#package.json
  ##scripts
    "watch": "tsc -w"
     - runs Typescript w/ watch flag; /dist will auto update when a change to ts happens 
     - compiles src/index.ts
     - creates/updates dist/ (js versions of our ts)
     
    "start": "node dist/index.js"
      - executes dist/index.js with node
      
    "dev": "nodemon dist/index.js"
     - nodemon makes it so we don't have to manually run `yarn start` after changes, reruns automatically

#1 adding the orm
1. added mikro-orm packages 
2. updated config files according to the mikro-orm installation docs 
3. created src/entities
4. created Post entity
5. updated index.ts with orm methods 
