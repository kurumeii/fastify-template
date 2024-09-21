# Fastify Template

## Description

My custom template for Restful API

### Tech Stack

- Node >= 20.0.0
- Fastify >= 5.0.0
- TypeScript >= 5.6.2
- swc >= 1.7.26
- biomejs >= 1.9.2
- lefthook >= 1.7.15

### Getting Started

1. Adding new environment variable

- Create a new environment variable in `.env` file
- Add new variable in `src/configs/share.schema.ts` file like this

```ts
export const envSchema = Type.Object({
  ...
  FOO: Type.String(),
})
