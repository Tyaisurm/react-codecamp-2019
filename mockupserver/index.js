const jsonServer = require('json-server')
const fs = require('fs-extra')
const server = jsonServer.create()
const path = require('path')
const router = jsonServer.router(path.join(__dirname, 'mockupdb.json'))
const PORT  = 3001

let middlewares = jsonServer.defaults({static: "./staticfiles"})
if(false){// use if want to make real time changes to file during run
middlewares = [
  ...jsonServer.defaults({ static: "./staticfiles" }),
  ...[
    (req, res, next) => fs
      .readJson(path.join(__dirname, 'mockupdb.json'))
      .then(contents => {
        console.log("Hold up! Updating database(memory) from database(file)...");
        router.db.assign(contents).write();
        next();
      })
  ]
];
}

router.render = (req, res) => {
  console.log("Status code was: ",res.statusCode);
  switch(res.statusCode){
    case 500:
    res.status(500).jsonp({
      error: "500 - Internal Server Error"
    })
  break;
  case 404:
  res.status(404).jsonp({
    error: "404 - Not Found"
  })
  break;
  case 401:
  res.status(401).jsonp({
    error: "401 - Forbidden"
  })
  break;
  default:
  res.jsonp(res.locals.data);
}
}

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares)

//server.use('/api', router)
//server.use(jsonServer.bodyParser)

var routes = JSON.parse(fs.readFileSync(path.join(__dirname, './mockuproutes.json')));
server.use(jsonServer.rewriter(routes));

 //Use default router
server.use('/api',router)
server.listen(PORT, () => {
  console.log('JSON Server is running in localhost port ',PORT)
})