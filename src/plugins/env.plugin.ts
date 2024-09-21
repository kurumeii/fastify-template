import fastifyEnv from "@fastify/env"
import type { FastifyPluginAsync } from "fastify"
import fastifyPlugin from "fastify-plugin"
import { envSchema } from "~/configs/share.schema"

const envPlugin: FastifyPluginAsync = async (server) => {
  await server.register(fastifyEnv, {
    confKey: "env",
    schema: envSchema,
    data: process.env,
    dotenv: true,
  })
}

export default fastifyPlugin(envPlugin)
