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

const simulateProcessing = (data) =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(`Processed Data: ${data.toUpperCase()}`);
    }, 250);
  });

fastify.get("/complex", async (request, reply) => {
  try {
    // Simulate first HTTP request
    const firstHttpSpan = tracer.startSpan("http-fetch-first", {});
    const firstResponse = await fetch("https://api.github.com", {
      headers: { Accept: "application/json" },
    });
    const firstData = await firstResponse.json();
    firstHttpSpan.setAttribute("http.status_code", firstResponse.status);
    firstHttpSpan.end();

    // Simulate second HTTP request
    const secondHttpSpan = tracer.startSpan("http-fetch-second", {});
    const secondResponse = await fetch(
      "https://jsonplaceholder.typicode.com/posts/1",
      {
        headers: { Accept: "application/json" },
      },
    );
    const secondData = await secondResponse.json();
    secondHttpSpan.setAttribute("http.status_code", secondResponse.status);
    secondHttpSpan.end();

    // Simulate data processing
    const processingSpan = tracer.startSpan("data-processing", {});
    const processedData = await simulateProcessing(
      `${firstData.current_user_url}, ${secondData.title}`,
    );
    processingSpan.setAttribute("processed.result", processedData);
    processingSpan.end();

    reply.send({ result: processedData });
  } catch (err) {
    // Handle errors and record them in the trace
    tracer.recordException(err);
    tracer.setAttribute("error", true);
    tracer.end();
    reply.status(500).send({ error: "Internal Server Error" });
  }
});

fastify.listen({ port: PORT }, function (err, address) {
  if (err) {
    console.error(err);
    process.exit(1);
  }

  console.log(`Listening for requests on ${address}`);
});
