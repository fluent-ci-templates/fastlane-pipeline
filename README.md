# Fastlane Pipeline

[![deno module](https://shield.deno.dev/x/fastlane_pipeline)](https://deno.land/x/fastlane_pipeline)
![deno compatibility](https://shield.deno.dev/deno/^1.34)
[![](https://img.shields.io/codecov/c/gh/fluent-ci-templates/fastlane-pipeline)](https://codecov.io/gh/fluent-ci-templates/fastlane-pipeline)

A ready-to-use Fastlane pipeline for React Native projects.

## 🚀 Usage

Run the following command:

```bash
dagger run fluentci fastlane_pipeline
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

| Job                          | Description                            |
| --------------------------- | --------------------------------------- |
| buildRelease                | generate apk (release)                  |
| internalDistribute          | distribute to internal testers          |
| alphaDistribute             | distribute to alpha testers             |
| betaDistribute              | distribute to beta testers              |
| productionDistribute        | distribute to production testers        |
| promoteAlphaToBeta          | promote alpha to beta                   |
| promoteBetaToProduction     | promote beta to production              |
| promoteAlphaToProduction    | promote alpha to production             |
| promoteInternalToAlpha      | promote internal to alpha               |
| promoteInternalToBeta       | promote internal to beta                |
| promoteInternalToProduction | promote internal to production          |
| firebaseAppDistribution     | distribute to firebase app distribution |
| appCenterDistribute         | distribute to app center                |

## Programmatic usage

You can also use this pipeline programmatically:

```ts
import Client, { connect } from "@dagger.io/dagger";
import { Dagger } from "https://deno.land/x/fastlane_pipeline/mod.ts";

const { buildRelease } = Dagger;

export default function pipeline(src = ".") {
  connect(async (client: Client) => {
    await buildRelease(client, src);
  });
}
```