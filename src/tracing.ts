import {
  ConsoleSpanExporter,
  SimpleSpanProcessor,
} from '@opentelemetry/sdk-trace-base';
import { NodeSDK } from '@opentelemetry/sdk-node';
import * as process from 'process';
import { HttpInstrumentation } from '@opentelemetry/instrumentation-http';
import { ExpressInstrumentation } from '@opentelemetry/instrumentation-express';
import { NestInstrumentation } from '@opentelemetry/instrumentation-nestjs-core';
import { PrismaInstrumentation } from '@prisma/instrumentation';
import { JaegerExporter } from '@opentelemetry/exporter-jaeger';
import { Resource } from '@opentelemetry/resources';
import { SemanticResourceAttributes } from '@opentelemetry/semantic-conventions';

const traceExporter = process.env.SHOW_TRACES_IN_CONSOLE
  ? new ConsoleSpanExporter()
  : new JaegerExporter({ endpoint: 'http://localhost:14268/api/traces' });

const resource = new Resource({
  [SemanticResourceAttributes.SERVICE_NAME]: 'median',
});

export const otelSDK = new NodeSDK({
  resource,
  traceExporter,
  spanProcessor: new SimpleSpanProcessor(traceExporter),
  instrumentations: [
    new HttpInstrumentation(),
    new ExpressInstrumentation(),
    new NestInstrumentation(),
    new PrismaInstrumentation(),
  ],
});

// gracefully shut down the SDK on process exit
process.on('SIGTERM', () => {
  otelSDK
    .shutdown()
    .then(
      () => console.log('SDK shut down successfully'),
      (err) => console.log('Error shutting down SDK', err),
    )
    .finally(() => process.exit(0));
});
