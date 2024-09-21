import fastifyAuth from "@fastify/auth"
import fastifyCompress from "@fastify/compress"
import fastifyCors from "@fastify/cors"
import fastifyFormbody from "@fastify/formbody"
import fastifyHelmet from "@fastify/helmet"
import fastifyMultipart from "@fastify/multipart"
import fastifySensible from "@fastify/sensible"
import {
  TypeBoxValidatorCompiler,
  type TypeBoxTypeProvider,
} from "@fastify/type-provider-typebox"
import GracefulServer from "@gquittet/graceful-server"
import dayjs from "dayjs"
import vi from "dayjs/locale/vi"
import localizeFormat from "dayjs/plugin/localizedFormat"
import fastify from "fastify"
dayjs.locale(vi)
dayjs.extend(localizeFormat)

const server = fastify({
  logger: {
    transport: {
      target: "@fastify/one-line-logger",
    },
  },
})
  .withTypeProvider<TypeBoxTypeProvider>()
  .setValidatorCompiler(TypeBoxValidatorCompiler)

const gracefulServer = GracefulServer(server.server)

gracefulServer.on(GracefulServer.READY, () => {
  server.log.info("Server is ready")
})

gracefulServer.on(GracefulServer.SHUTTING_DOWN, () => {
  server.log.info("Server is shutting down")
})

gracefulServer.on(GracefulServer.SHUTDOWN, (error) => {
  server.log.info("Server is down because of", error.message)
})

const start = async () => {
  try {
    //#region Plugins
    await server.register(import("./plugins/env.plugin"))
    await server.register(fastifyCors)
    await server.register(fastifyHelmet)
    await server.register(fastifyFormbody)
    await server.register(fastifyCompress)
    await server.register(fastifyMultipart)
    await server.register(fastifySensible)
    await server.register(fastifyAuth)
    await server.register(import("./plugins/bearerAuth.plugin"))
    //#endregion

    //#region Routes
    await server.register(import("./modules/public/index.route"), {
      prefix: "/public",
    })
    await server.register(import("./modules/private/index.route"), {
      prefix: "/private",
    })
    //#endregion
    await server.ready()
    server.log.info("All plugins are loaded !")
    gracefulServer.setReady()
    await server.listen({ port: Number.parseInt(server.env.PORT) })
  } catch (error) {
    server.log.error(error)
    process.exit(1)
  }
}

start()
