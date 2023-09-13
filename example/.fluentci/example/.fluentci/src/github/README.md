# Github Actions

[![deno module](https://shield.deno.dev/x/fastlane_pipeline)](https://deno.land/x/fastlane_pipeline)
![deno compatibility](https://shield.deno.dev/deno/^1.34)
[![](https://img.shields.io/codecov/c/gh/fluent-ci-templates/fastlane-pipeline)](https://codecov.io/gh/fluent-ci-templates/fastlane-pipeline)

The following command will generate a `.github/workflows/build.yml` file in your project:

```bash
fluentci gh init -t fastlane_pipeline
```

Or, if you already have a `.fluentci` folder (generated from `fluentci init -t fastlane`) in your project:

```bash
fluentci gh init
```

Generated file:

```yaml
# Do not edit this file directly. It is generated by Fluent Github Actions

name: Build Application
on:
  push:
    branches:
      - main
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: denoland/setup-deno@v1
        with:
          deno-version: v1.36
      - name: Setup Fluent CI CLI
        run: deno install -A -r https://cli.fluentci.io -n fluentci
      - name: Setup Dagger
        run: |
            curl -L https://dl.dagger.io/dagger/install.sh | DAGGER_VERSION=0.8.1 sh
            sudo mv bin/dagger /usr/local/bin
            dagger version
      - name: Run Dagger Pipelines
        run: dagger run fluentci fastlane_pipeline buildRelease
```

Feel free to edit the template generator at `.fluentci/src/github/config.ts` to your needs.