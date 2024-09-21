import type { FastifyPluginAsync } from "fastify"
import fastifyPlugin from "fastify-plugin"

const publicRoutes: FastifyPluginAsync = async (server) => {
  server.get("/ping", async (_request, reply) => {
    reply.send({ publicPong: true })
  })
}

export default fastifyPlugin(publicRoutes, {
  name: "public-routes",
  fastify: "5.x",
  encapsulate: true,
})
