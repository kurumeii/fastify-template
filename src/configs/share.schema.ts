import { Type, type Static } from "@sinclair/typebox"
import { StringEnum } from "~/utils/typebox.helper"

export const envSchema = Type.Object({
  PORT: Type.String({
    default: "8000",
  }),
  NODE_ENV: StringEnum(["development", "production"]),
  SECRET: Type.String({
    examples: ["super-secret-key"],
  }),
  ANOTHER_SECRET: Type.String({
    examples: ["super-duper-secret-key"],
  }),
})

export type Env = Static<typeof envSchema>
