import Fastify from "fastify";

const fastify = Fastify({
  logger: false,
});

fastify.get("/", async function (request, reply) {
  const response = await fetch("https://icanhazdadjoke.com/", {
    headers: {
      Accept: "application/json",
    },
  });
  const data = await response.json();
  reply.send({ data });
});

const PORT = parseInt(process.env.PORT || "8080");

fastify.listen({ port: PORT }, function (err, address) {
  if (err) {
    console.error(err);
    process.exit(1);
  }

  console.log(`Listening for requests on ${address}`);
});
