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


#migrations and orm info 
- `yarn create:migration` to create a new migration
- in index.ts - await orm.getMigrator().up() = migrations run when server goes up
- mikro_orm_migrations table keeps track of what migrations have been run
- it's NOT rerunning old migrations; if you look at the sql being run, it selects from the migrations table
 
#sessions
- store some data about user on our servers (Redis; could also use postgres)
- expressjs-sessions
- cookie keeps user logged in 
-------
1. session created - `req.session.userId = user.id`
2. value stored in Redis
  - {userId: 1} -> sent to Redis (key-value store)
  - 'sess:jfoidfvjfjdfd' --returns--> { userId: 1 }
3. signed version of key set on browser 
  - express-session middleware sets cookie on client browser; like a signed version of the key above (that returns Redis value)
    - example:  
      - Cookie is set and = fsdjfkl78979sdfs
3. when user makes a request, fsdjfkl78979sdfs is sent to server 
4. Server decrypts the cookie 'fsdjfkl78979sdfs' with the secret set in app.use(session...) options
  -'fsdjfkl78979sdfs' ---> sess:jfoidfvjfjdfd 
5. Make request to Redis
  - sess:jfoidfvjfjdfd --returns--> { userId: 1 } 

#4 Redis
1. install Redis (I did via Homebrew) and other packages (connect-redis)
2. set up connection in index.ts
3. "me" query in user.resolver.ts uses user session cookie (looks at userId)
4. 
