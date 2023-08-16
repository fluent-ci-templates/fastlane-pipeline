# Fastlane Pipeline

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
import { Client, connect } from "https://esm.sh/@dagger.io/dagger@0.8.1";
import { Dagger } from "https://deno.land/x/fastlane_pipeline/mod.ts";

const { execLane } = Dagger;

function pipeline(src = ".") {
  connect(async (client: Client) => {
    await execLane(client, "buildRelease", src);
  });
}

pipeline();
```
