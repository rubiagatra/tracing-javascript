import { NodeSDK } from "@opentelemetry/sdk-node";
import { OTLPTraceExporter } from "@opentelemetry/exporter-trace-otlp-proto";
import { FastifyInstrumentation } from "@opentelemetry/instrumentation-fastify";
import { HttpInstrumentation } from "@opentelemetry/instrumentation-http";

// Configure OpenTelemetry SDK
const sdk = new NodeSDK({
  traceExporter: new OTLPTraceExporter({
    url: "http://localhost:4318/v1/traces", // Jaeger OpenTelemetry HTTP endpoint
  }),
  instrumentations: [
    new FastifyInstrumentation(), // Add Fastify-specific instrumentation
    new HttpInstrumentation(), // Add HTTP-specific instrumentation
  ],
});

// Start OpenTelemetry SDK
sdk.start();
