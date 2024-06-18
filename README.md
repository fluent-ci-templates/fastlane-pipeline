# Fastlane Pipeline

[![fluentci pipeline](https://shield.fluentci.io/x/fastlane_pipeline)](https://pkg.fluentci.io/fastlane_pipeline)
[![deno module](https://shield.deno.dev/x/fastlane_pipeline)](https://deno.land/x/fastlane_pipeline)
![deno compatibility](https://shield.deno.dev/deno/^1.41)
[![dagger-min-version](https://shield.fluentci.io/dagger/v0.11.7)](https://dagger.io)
[![](https://jsr.io/badges/@fluentci/fastlane)](https://jsr.io/@fluentci/fastlane)
[![](https://img.shields.io/codecov/c/gh/fluent-ci-templates/fastlane-pipeline)](https://codecov.io/gh/fluent-ci-templates/fastlane-pipeline)
[![ci](https://github.com/fluent-ci-templates/fastlane-pipeline/actions/workflows/ci.yml/badge.svg)](https://github.com/fluent-ci-templates/fastlane-pipeline/actions/workflows/ci.yml)

A ready-to-use Fastlane pipeline for React Native projects.

![Made with VHS](https://vhs.charm.sh/vhs-3BdWbrCDU6CerRImplYFxo.gif)

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

## 🧩 Dagger Module

Use as a [Dagger](https://dagger.io) Module:

```bash
dagger install github.com/fluent-ci-templates/fastlane-pipeline@main
```

Call a function from the module:

```bash
dagger call exec-lane --lane buildRelease --src .
```

## ✨ Jobs

| Job         | Description               |
| ----------- | ------------------------- |
| execLane    | Executes a Fastlane lane  |

```typescript
execLane(
  lane: string,
  src: string | Directory | undefined = "."
): Promise<Container | string>
```

## 👨‍💻 Programmatic usage

You can also use this pipeline programmatically:

```ts
import { execLane } from "jsr:@fluentci/fastlane";

await execLane("buildRelease");
```
