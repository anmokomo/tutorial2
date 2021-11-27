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

    "create:migration": "mikro-orm migration:create"
    - creates migration file if needed; if entity isn't updating, check if it's added in `mikro-orm.config.ts`

#1 adding the orm
1. added mikro-orm packages 
2. updated config files according to the mikro-orm installation docs 
3. created src/entities
4. created Post entity
5. updated index.ts with orm methods 
6. create migration and run 

#4 express
1. install express and types
2. put express startup in index.ts 

#3 graphql
1. install graphql and apolloServer
2. put apolloServer startup, apply middleware in index.ts
3. create resolvers 
4. create types.ts w/ type of `orm.em`
5. 
#3 entities and orm 


#migrations and orm info 
- `yarn create:migration` to create a new migration
- in index.ts - await orm.getMigrator().up() = migrations run when server goes up
- mikro_orm_migrations table keeps track of what migrations have been run
- it's NOT rerunning old migrations; if you look at the sql being run, it selects from the migrations table
 
