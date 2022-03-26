import Fastify, { FastifyReply, FastifyRequest } from "fastify";
import helmet from "fastify-helmet";
import cors from "fastify-cors";
import fastifyPassport from "fastify-passport";
import fastifySecureSession from "fastify-secure-session";
import { Strategy as BearerStrategy } from "passport-http-bearer";

const fastify = Fastify({
  logger: true,
});

fastify.register(helmet);
fastify.register(cors, {
  credentials: true,
});
fastify.register(fastifySecureSession, {
  key: "super-secret-key-fjeowafjoeijwafiowjfoejawoifjaow",
});
fastify.register(fastifyPassport.initialize());
fastify.register(fastifyPassport.secureSession());

fastifyPassport.use(
  new BearerStrategy(function (token, done) {
    // 実際にはトークンを使ってユーザー情報を取りにき、その結果で返す。
    // サンプル例では単純にtokenの値を見て判断する
    if (token !== "some-secret-token") {
      done("not authenticate");
    }

    return done(null, { username: "test" }, { scope: "all" });
  })
);

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
      reply.code(200).send({ token: "some-secret-token" });
    } else {
      reply.code(401).send();
    }
  }
);

fastify.post("/auth/logout", (request: FastifyRequest, reply: FastifyReply) => {
  reply.code(200).send();
});

// 現在のユーザーを取得する
// preValidation で認証済みかどうかを判断する
fastify.get(
  "/auth/user",
  { preValidation: fastifyPassport.authenticate("bearer", { session: false }) },
  (request: FastifyRequest, reply: FastifyReply) => {
    // fastifyPassport.authenticateで認証した場合、request.userでユーザー情報にアクセスできる
    console.log(request.user);

    const user = request.user as { username: string };

    reply.code(200).send({ user: { username: user.username } });
  }
);

fastify.listen(3001, "0.0.0.0", function (err, address) {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  fastify.log.info(`server listening on ${address}`);
});
