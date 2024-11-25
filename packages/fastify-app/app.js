import "./instrumentation.js";
import Fastify from "fastify";
import { trace } from "@opentelemetry/api";

const tracer = trace.getTracer("fastify-app", "0.1.0");

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

function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

fastify.get("/fibonacci/:n", (request, reply) => {
  const n = parseInt(request.params.n, 10);

  const span = tracer.startSpan("calculate-fibonacci-number", {
    attributes: {
      "fibonacci.input": n,
    },
  });

  const result = fibonacci(n);
  span.setAttribute("fibonacci.result", result);
  span.end();

  reply.send({ result });
});

const PORT = parseInt(process.env.PORT || "8080");

fastify.listen({ port: PORT }, function (err, address) {
  if (err) {
    console.error(err);
    process.exit(1);
  }

  console.log(`Listening for requests on ${address}`);
});
