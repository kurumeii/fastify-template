import type { FastifyPluginAsync } from "fastify"
import fastifyPlugin from "fastify-plugin"

const privateRoutes: FastifyPluginAsync = async (server) => {
  server.get(
    "/ping",
    {
      preHandler: [server.verifyAuth],
    },
    async (_request, reply) => {
      reply.send({ privatePong: true })
    },
  )
}

export default fastifyPlugin(privateRoutes, {
  name: "private-routes",
  fastify: "5.x",
  encapsulate: true,
})
