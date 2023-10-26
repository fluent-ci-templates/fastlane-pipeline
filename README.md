# Fastlane Pipeline

[![fluentci pipeline](https://img.shields.io/badge/dynamic/json?label=pkg.fluentci.io&labelColor=%23000&color=%23460cf1&url=https%3A%2F%2Fapi.fluentci.io%2Fv1%2Fpipeline%2Ffastlane_pipeline&query=%24.version)](https://pkg.fluentci.io/fastlane_pipeline)
[![deno module](https://shield.deno.dev/x/fastlane_pipeline)](https://deno.land/x/fastlane_pipeline)
![deno compatibility](https://shield.deno.dev/deno/^1.37)
[![](https://img.shields.io/codecov/c/gh/fluent-ci-templates/fastlane-pipeline)](https://codecov.io/gh/fluent-ci-templates/fastlane-pipeline)

A ready-to-use Fastlane pipeline for React Native projects.

## 🚀 Usage

Run the following command:

```bash
fluentci run fastlane_pipeline <lane>
```

Or, if you want to use it as a template:

```bash
fluentci init -t fastlane
```

This will create a `.fluentci` folder in your project.

Now you can run the pipeline with:

```bash
fluentci run .
```

## Jobs

| Job         | Description               |
| ----------- | ------------------------- |
| execLane    | Executes a Fastlane lane  |

```graphql
execLane(lane: String!, src: String!): String
```

## Programmatic usage

You can also use this pipeline programmatically:

```ts
import { execLane } from "https://pkg.fluentci.io/fastlane_pipeline@v0.7.2/mod.ts";

await execLane("buildRelease");
```
