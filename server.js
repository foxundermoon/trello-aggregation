const Koa = require('koa')
const Router = require('koa-router')
const mount = require("koa-mount")
const next = require('next')
const trelloApi = require("./server/trello")

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({
  dev
})
const handle = app.getRequestHandler()

app.prepare()
  .then(() => {
    const nexServer = new Koa()
    const router = new Router()

    router.get('*', async ctx => {
      await handle(ctx.req, ctx.res)
      ctx.respond = false
    })

    nexServer.use(async (ctx, next) => {
      let {
        path
      } = ctx;
      if (!path.startsWith("/api")) {
        ctx.res.statusCode = 200;
        await next();
      }
    })



    const parentApp = new Koa()

    nexServer.use(router.routes())

    parentApp.use(mount("/api", trelloApi.routes()))
    parentApp.use(mount(nexServer))

    parentApp.listen(port, () => {
      console.log(`> Ready on http://localhost:${port}`)
    })
  })