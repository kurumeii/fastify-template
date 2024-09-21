import fastifyBearerAuth from "@fastify/bearer-auth"
import type { FastifyPluginAsync } from "fastify"
import fastifyPlugin from "fastify-plugin"

const bearerPlugin: FastifyPluginAsync = async (server) => {
  await server.register(fastifyBearerAuth, {
    keys: [server.env.SECRET, server.env.ANOTHER_SECRET],
    addHook: false,
    verifyErrorLogLevel: "error",
  })
  server.decorate("verifyAuth", (req, res, done) => {
    if (!server.verifyBearerAuth) {
      throw new Error("Fastify verifyBearerAuth decorator required")
    }
    return server.verifyBearerAuth(req, res, done)
  })
}

export default fastifyPlugin(bearerPlugin)
