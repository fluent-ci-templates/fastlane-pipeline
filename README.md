# Fastlane Pipeline

[![fluentci pipeline](https://img.shields.io/badge/dynamic/json?label=pkg.fluentci.io&labelColor=%23000&color=%23460cf1&url=https%3A%2F%2Fapi.fluentci.io%2Fv1%2Fpipeline%2Ffastlane_pipeline&query=%24.version)](https://pkg.fluentci.io/fastlane_pipeline)
[![deno module](https://shield.deno.dev/x/fastlane_pipeline)](https://deno.land/x/fastlane_pipeline)
![deno compatibility](https://shield.deno.dev/deno/^1.34)
[![](https://img.shields.io/codecov/c/gh/fluent-ci-templates/fastlane-pipeline)](https://codecov.io/gh/fluent-ci-templates/fastlane-pipeline)

A ready-to-use Fastlane pipeline for React Native projects.

## 🚀 Usage

Run the following command:

```bash
dagger run fluentci fastlane_pipeline <lane>
```

Or, if you want to use it as a template:

```bash
fluentci init -t fastlane
```

This will create a `.fluentci` folder in your project.

Now you can run the pipeline with:

```bash
dagger run fluentci .
```

## Jobs

| Job         | Description               |
| ----------- | ------------------------- |
| execLane    | Executes a Fastlane lane  |

## Programmatic usage

You can also use this pipeline programmatically:

```ts
import Client, { connect } from "https://sdk.fluentci.io/v0.1.4/mod.ts";
import { Dagger } from "https://pkg.fluentci.io/fastlane_pipeline/mod.ts";

const { execLane } = Dagger;

function pipeline(src = ".") {
  connect(async (client: Client) => {
    await execLane(client, "buildRelease", src);
  });
}

pipeline();
```
