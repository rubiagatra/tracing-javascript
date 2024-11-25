# Tracing JavaScript

This project demonstrates the integration of [OpenTelemetry](https://opentelemetry.io/) into an application to enhance observability. OpenTelemetry is a powerful open-source observability framework for capturing, generating, and exporting telemetry data such as metrics, logs, and traces.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Setup and Installation](#setup-and-installation)
- [Usage](#usage)

## Introduction

OpenTelemetry is a comprehensive observability framework designed to simplify telemetry data collection. It provides consistent APIs and SDKs for instrumenting applications and integrates seamlessly with various backend systems for data export and analysis.

This project showcases:

- Automatic and manual instrumentation of services.
- Collecting and exporting telemetry data.
- Implementing trace and metrics data pipelines for observability.

## Features

- **Metrics**: Collects performance data to measure service health.
- **Exporters**: Supports exporting data to observability backends like Prometheus, Grafana, Jaeger, and BetterStack.
- **Logging**: Context-aware structured logs (if implemented).
- **Tracing**: Captures distributed traces for requests spanning multiple services.

## Setup and Installation

### Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd <project-directory>
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

## Usage

1. Start the Demo
   ```bash
   docker compose up -d
   pnpm --filter fastify-app dev
   ```
