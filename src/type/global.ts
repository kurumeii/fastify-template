import type { verifyBearerAuth } from "@fastify/bearer-auth"
import type { Env } from "~/configs/share.schema"

declare module "fastify" {
  interface FastifyInstance {
    env: Env
    verifyAuth: verifyBearerAuth
  }
}
