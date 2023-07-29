import Client from "@dagger.io/dagger";
import { withDevbox } from "https://deno.land/x/nix_installer_pipeline@v0.3.6/src/dagger/steps.ts";
import { Dagger } from "https://deno.land/x/android_pipeline@v0.2.3/mod.ts";
import { withBaseAlpine, withEnv, withSrc } from "./lib.ts";

const { withAndroidSdk } = Dagger;

export const buildDebug = async (client: Client, src = ".") => {
  const context = await client.host().directory(src);

  const baseCtr = withDevbox(
    withAndroidSdk(
      withBaseAlpine(
        client.pipeline("buildDebug").container().from("alpine:latest")
      )
    )
      .withMountedCache("/nix", client.cacheVolume("nix"))
      .withMountedCache("/etc/nix", client.cacheVolume("nix-etc"))
  );

  const ctr = withEnv(withSrc(baseCtr, client, context))
    .withExec(["sh", "-c", "devbox run -- bun install"])
    .withExec(["sh", "-c", "devbox run -- bundle install"])
    .withExec([
      "sh",
      "-c",
      "devbox run -- bundle exec fastlane android buildDebug",
    ]);

  const result = await ctr.stdout();

  console.log(result);
};

export const buildRelease = async (client: Client, src = ".") => {
  const context = await client.host().directory(src);
  const baseCtr = withDevbox(
    withAndroidSdk(
      withBaseAlpine(
        client.pipeline("buildRelease").container().from("alpine:latest")
      )
    )
      .withMountedCache("/nix", client.cacheVolume("nix"))
      .withMountedCache("/etc/nix", client.cacheVolume("nix-etc"))
  );

  const ctr = withEnv(withSrc(baseCtr, client, context))
    .withEnvVariable("NODE_OPTIONS", "--max-old-space-size=4096")
    .withExec(["sh", "-c", "ls -ltr /nix"])
    .withExec(["sh", "-c", "devbox run -- bun install"])
    .withExec(["sh", "-c", "devbox run -- bundle install"])
    .withExec([
      "sh",
      "-c",
      "devbox run -- bundle exec fastlane android buildRelease",
    ]);

  const result = await ctr.stdout();

  console.log(result);
};

export const testDebug = async (client: Client, src = ".") => {
  const context = await client.host().directory(src);

  const baseCtr = withDevbox(
    withAndroidSdk(
      withBaseAlpine(
        client.pipeline("testDebug").container().from("alpine:latest")
      )
    )
  );

  const ctr = withEnv(withSrc(baseCtr, client, context))
    .withExec(["sh", "-c", "devbox run -- bun install"])
    .withExec(["sh", "-c", "devbox run -- bundle install"])
    .withExec([
      "sh",
      "-c",
      "devbox run -- bundle exec fastlane android testDebug",
    ]);

  const result = await ctr.stdout();

  console.log(result);
};

export const internalDistribute = async (client: Client, src = ".") => {
  const context = await client.host().directory(src);
  const baseCtr = withDevbox(
    withAndroidSdk(
      withBaseAlpine(
        client.pipeline("internalDistribute").container().from("alpine:latest")
      )
    )
      .withMountedCache("/nix", client.cacheVolume("nix"))
      .withMountedCache("/etc/nix", client.cacheVolume("nix-etc"))
  );

  const ctr = withEnv(withSrc(baseCtr, client, context))
    .withEnvVariable("NODE_OPTIONS", "--max-old-space-size=4096")
    .withExec(["sh", "-c", "devbox run -- bun install"])
    .withExec(["sh", "-c", "devbox run -- bundle install"])
    .withExec([
      "sh",
      "-c",
      "devbox run -- bundle exec fastlane android internalDistribute",
    ]);

  const result = await ctr.stdout();

  console.log(result);
};

export const alphaDistribute = async (client: Client, src = ".") => {
  const context = await client.host().directory(src);
  const baseCtr = withDevbox(
    withAndroidSdk(
      withBaseAlpine(
        client.pipeline("alphaDistribute").container().from("alpine:latest")
      )
    )
      .withMountedCache("/nix", client.cacheVolume("nix"))
      .withMountedCache("/etc/nix", client.cacheVolume("nix-etc"))
  );

  const ctr = withEnv(withSrc(baseCtr, client, context))
    .withEnvVariable("NODE_OPTIONS", "--max-old-space-size=4096")
    .withExec(["sh", "-c", "devbox run -- bun install"])
    .withExec(["sh", "-c", "devbox run -- bundle install"])
    .withExec([
      "sh",
      "-c",
      "devbox run -- bundle exec fastlane android alphaDistribute",
    ]);

  const result = await ctr.stdout();

  console.log(result);
};

export const betaDistribute = async (client: Client, src = ".") => {
  const context = await client.host().directory(src);
  const baseCtr = withDevbox(
    withAndroidSdk(
      withBaseAlpine(
        client.pipeline("betaDistribute").container().from("alpine:latest")
      )
    )
      .withMountedCache("/nix", client.cacheVolume("nix"))
      .withMountedCache("/etc/nix", client.cacheVolume("nix-etc"))
  );

  const ctr = withEnv(withSrc(baseCtr, client, context))
    .withEnvVariable("NODE_OPTIONS", "--max-old-space-size=4096")
    .withExec(["sh", "-c", "devbox run -- bun install"])
    .withExec(["sh", "-c", "devbox run -- bundle install"])
    .withExec([
      "sh",
      "-c",
      "devbox run -- bundle exec fastlane android betaDistribute",
    ]);

  const result = await ctr.stdout();

  console.log(result);
};

export const productionDistribute = async (client: Client, src = ".") => {
  const context = await client.host().directory(src);
  const baseCtr = withDevbox(
    withAndroidSdk(
      withBaseAlpine(
        client
          .pipeline("productionDistribute")
          .container()
          .from("alpine:latest")
      )
    )
      .withMountedCache("/nix", client.cacheVolume("nix"))
      .withMountedCache("/etc/nix", client.cacheVolume("nix-etc"))
  );

  const ctr = withEnv(withSrc(baseCtr, client, context))
    .withEnvVariable("NODE_OPTIONS", "--max-old-space-size=4096")
    .withExec(["sh", "-c", "devbox run -- bun install"])
    .withExec(["sh", "-c", "devbox run -- bundle install"])
    .withExec([
      "sh",
      "-c",
      "devbox run -- bundle exec fastlane android promoteAlphaToBeta",
    ]);

  const result = await ctr.stdout();

  console.log(result);
};

export const promoteBetaToProduction = async (client: Client, src = ".") => {
  const context = await client.host().directory(src);
  const baseCtr = withDevbox(
    withAndroidSdk(
      withBaseAlpine(
        client
          .pipeline("promoteBetaToProduction")
          .container()
          .from("alpine:latest")
      )
    )
      .withMountedCache("/nix", client.cacheVolume("nix"))
      .withMountedCache("/etc/nix", client.cacheVolume("nix-etc"))
  );

  const ctr = withEnv(withSrc(baseCtr, client, context))
    .withEnvVariable("NODE_OPTIONS", "--max-old-space-size=4096")
    .withExec(["sh", "-c", "devbox run -- bun install"])
    .withExec(["sh", "-c", "devbox run -- bundle install"])
    .withExec([
      "sh",
      "-c",
      "devbox run -- bundle exec fastlane android promoteBetaToProduction",
    ]);

  const result = await ctr.stdout();

  console.log(result);
};

export const promoteAlphaToProduction = async (client: Client, src = ".") => {
  const context = await client.host().directory(src);
  const baseCtr = withDevbox(
    withAndroidSdk(
      withBaseAlpine(
        client
          .pipeline("promoteAlphaToProduction")
          .container()
          .from("alpine:latest")
      )
    )
      .withMountedCache("/nix", client.cacheVolume("nix"))
      .withMountedCache("/etc/nix", client.cacheVolume("nix-etc"))
  );

  const ctr = withEnv(withSrc(baseCtr, client, context))
    .withEnvVariable("NODE_OPTIONS", "--max-old-space-size=4096")
    .withExec(["sh", "-c", "devbox run -- bun install"])
    .withExec(["sh", "-c", "devbox run -- bundle install"])
    .withExec([
      "sh",
      "-c",
      "devbox run --bundle exec fastlane android promoteAlphaToProduction",
    ]);

  const result = await ctr.stdout();

  console.log(result);
};

export const promoteInternalToAlpha = async (client: Client, src = ".") => {
  const context = await client.host().directory(src);
  const baseCtr = withDevbox(
    withAndroidSdk(
      withBaseAlpine(
        client
          .pipeline("promoteInternalToAlpha")
          .container()
          .from("alpine:latest")
      )
    )
      .withMountedCache("/nix", client.cacheVolume("nix"))
      .withMountedCache("/etc/nix", client.cacheVolume("nix-etc"))
  );

  const ctr = withEnv(withSrc(baseCtr, client, context))
    .withEnvVariable("NODE_OPTIONS", "--max-old-space-size=4096")
    .withExec(["sh", "-c", "devbox run -- bun install"])
    .withExec(["sh", "-c", "devbox run -- bundle install"])
    .withExec([
      "sh",
      "-c",
      "devbox run -- bundle exec fastlane android promoteInternalToAlpha",
    ]);

  const result = await ctr.stdout();

  console.log(result);
};

export const promoteInternalToBeta = async (client: Client, src = ".") => {
  const context = await client.host().directory(src);
  const baseCtr = withDevbox(
    withAndroidSdk(
      withBaseAlpine(
        client
          .pipeline("promoteInternalToBeta")
          .container()
          .from("alpine:latest")
      )
    )
  );

  const ctr = withEnv(withSrc(baseCtr, client, context))
    .withEnvVariable("NODE_OPTIONS", "--max-old-space-size=4096")
    .withExec(["sh", "-c", "devbox run -- bun install"])
    .withExec(["sh", "-c", "devbox run -- bundle install"])
    .withExec([
      "sh",
      "-c",
      "devbox run -- bundle exec fastlane android promoteInternalToBeta",
    ]);

  const result = await ctr.stdout();

  console.log(result);
};

export const promoteInternalToProduction = async (
  client: Client,
  src = "."
) => {
  const context = await client.host().directory(src);
  const baseCtr = withDevbox(
    withAndroidSdk(
      withBaseAlpine(
        client
          .pipeline("promoteInternalToProduction")
          .container()
          .from("alpine:latest")
      )
    )
      .withMountedCache("/nix", client.cacheVolume("nix"))
      .withMountedCache("/etc/nix", client.cacheVolume("nix-etc"))
  );

  const ctr = withEnv(withSrc(baseCtr, client, context))
    .withEnvVariable("NODE_OPTIONS", "--max-old-space-size=4096")
    .withExec(["sh", "-c", "devbox run -- bun install"])
    .withExec(["sh", "-c", "devbox run -- bundle install"])
    .withExec([
      "sh",
      "-c",
      "devbox run -- bundle exec fastlane android promoteInternalToProduction",
    ]);

  const result = await ctr.stdout();

  console.log(result);
};

export const firebaseAppDistribution = async (client: Client, src = ".") => {
  const context = await client.host().directory(src);
  const baseCtr = withDevbox(
    withAndroidSdk(
      withBaseAlpine(
        client
          .pipeline("firebaseAppDistribution")
          .container()
          .from("alpine:latest")
      )
    )
      .withMountedCache("/nix", client.cacheVolume("nix"))
      .withMountedCache("/etc/nix", client.cacheVolume("nix-etc"))
  );

  const ctr = withEnv(withSrc(baseCtr, client, context))
    .withEnvVariable("NODE_OPTIONS", "--max-old-space-size=4096")
    .withExec([
      "sh",
      "-c",
      "eval $(devbox shell --print-env) && \
      bun install && \
      bundle install && \
      bundle exec fastlane android firebaseAppDistribution",
    ]);

  const result = await ctr.stdout();

  console.log(result);
};

export const appCenterDistribute = async (client: Client, src = ".") => {
  const context = await client.host().directory(src);
  const baseCtr = withDevbox(
    withAndroidSdk(
      withBaseAlpine(
        client.pipeline("appCenterDistribute").container().from("alpine:latest")
      )
    )
      .withMountedCache("/nix", client.cacheVolume("nix"))
      .withMountedCache("/etc/nix", client.cacheVolume("nix-etc"))
  );

  const ctr = withEnv(withSrc(baseCtr, client, context))
    .withEnvVariable("NODE_OPTIONS", "--max-old-space-size=4096")
    .withExec(["sh", "-c", "devbox run -- bun install"])
    .withExec(["sh", "-c", "devbox run -- bundle install"])
    .withExec([
      "sh",
      "-c",
      "devbox run -- bundle exec fastlane android appCenterDistribute",
    ]);
  const result = await ctr.stdout();

  console.log(result);
};
