import Fastify, { FastifyReply, FastifyRequest } from "fastify";
import helmet from "fastify-helmet";
import cors from "fastify-cors";

const fastify = Fastify({
  logger: true,
});

fastify.register(helmet);
fastify.register(cors, {
  credentials: true,
});

fastify.get("/", (request: FastifyRequest, reply: FastifyReply) => {
  reply.code(200).send({ message: "hello world!" });
});

//
// 認証部分
//
fastify.post(
  "/auth/login",
  (
    request: FastifyRequest<{ Body: { username: string; password: string } }>,
    reply: FastifyReply
  ) => {
    if (request.body.username === "test") {
      reply.code(200).send({ token: "aaaa" });
    } else {
      reply.code(401).send();
    }
  }
);

fastify.post("/auth/logout", (request: FastifyRequest, reply: FastifyReply) => {
  reply.code(200).send();
});

fastify.get("/auth/user", (request: FastifyRequest, reply: FastifyReply) => {
  reply.code(200).send({ user: { username: "test" } });
});

fastify.listen(3001, "0.0.0.0", function (err, address) {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  fastify.log.info(`server listening on ${address}`);
});
