import Client from "@dagger.io/dagger";
import { withDevbox } from "https://deno.land/x/nix_installer_pipeline@v0.3.6/src/dagger/steps.ts";
import { Dagger } from "https://deno.land/x/android_pipeline@v0.2.3/mod.ts";
import { withBaseAlpine, withEnv, withSrc } from "./lib.ts";

export enum Job {
  buildDebug = "buildDebug",
  buildRelease = "buildRelease",
  internalDistribute = "internalDistribute",
  alphaDistribute = "alphaDistribute",
  betaDistribute = "betaDistribute",
  productionDistribute = "productionDistribute",
  promoteAlphaToBeta = "promoteAlphaToBeta",
  promoteBetaToProduction = "promoteBetaToProduction",
  promoteAlphaToProduction = "promoteAlphaToProduction",
  promoteInternalToAlpha = "promoteInternalToAlpha",
  promoteInternalToBeta = "promoteInternalToBeta",
  promoteInternalToProduction = "promoteInternalToProduction",
  firebaseAppDistribution = "firebaseAppDistribution",
  appCenterDistribute = "appCenterDistribute",
}

const { withAndroidSdk } = Dagger;

export const buildDebug = async (client: Client, src = ".") => {
  const context = await client.host().directory(src);

  const baseCtr = withDevbox(
    withAndroidSdk(
      withBaseAlpine(
        client.pipeline(Job.buildDebug).container().from("alpine:latest")
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
        client.pipeline(Job.buildRelease).container().from("alpine:latest")
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

export const internalDistribute = async (client: Client, src = ".") => {
  const context = await client.host().directory(src);
  const baseCtr = withDevbox(
    withAndroidSdk(
      withBaseAlpine(
        client
          .pipeline(Job.internalDistribute)
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
        client.pipeline(Job.alphaDistribute).container().from("alpine:latest")
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
        client.pipeline(Job.betaDistribute).container().from("alpine:latest")
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
          .pipeline(Job.productionDistribute)
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
      "devbox run -- bundle exec fastlane android productionDistribute",
    ]);

  const result = await ctr.stdout();

  console.log(result);
};

export const promoteAlphaToBeta = async (client: Client, src = ".") => {
  const context = await client.host().directory(src);
  const baseCtr = withDevbox(
    withAndroidSdk(
      withBaseAlpine(
        client
          .pipeline(Job.promoteAlphaToBeta)
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
          .pipeline(Job.promoteBetaToProduction)
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
          .pipeline(Job.promoteAlphaToProduction)
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
          .pipeline(Job.promoteInternalToAlpha)
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
          .pipeline(Job.promoteInternalToBeta)
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
          .pipeline(Job.promoteInternalToProduction)
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
          .pipeline(Job.firebaseAppDistribution)
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
        client
          .pipeline(Job.appCenterDistribute)
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
      "devbox run -- bundle exec fastlane android appCenterDistribute",
    ]);
  const result = await ctr.stdout();

  console.log(result);
};

export type JobExec = (
  client: Client,
  src?: string
) =>
  | Promise<void>
  | ((
      client: Client,
      src?: string,
      options?: {
        ignore: string[];
      }
    ) => Promise<void>);

export const runnableJobs: Record<Job, JobExec> = {
  [Job.buildDebug]: buildDebug,
  [Job.buildRelease]: buildRelease,
  [Job.internalDistribute]: internalDistribute,
  [Job.alphaDistribute]: alphaDistribute,
  [Job.betaDistribute]: betaDistribute,
  [Job.productionDistribute]: productionDistribute,
  [Job.promoteAlphaToBeta]: promoteAlphaToBeta,
  [Job.promoteBetaToProduction]: promoteBetaToProduction,
  [Job.promoteAlphaToProduction]: promoteAlphaToProduction,
  [Job.promoteInternalToAlpha]: promoteInternalToAlpha,
  [Job.promoteInternalToBeta]: promoteInternalToBeta,
  [Job.promoteInternalToProduction]: promoteInternalToProduction,
  [Job.firebaseAppDistribution]: firebaseAppDistribution,
  [Job.appCenterDistribute]: appCenterDistribute,
};

export const jobDescriptions: Record<Job, string> = {
  [Job.buildDebug]: "Builds a debug APK",
  [Job.buildRelease]: "Builds a release APK",
  [Job.internalDistribute]: "Distributes to internal testers",
  [Job.alphaDistribute]: "Distributes to alpha testers",
  [Job.betaDistribute]: "Distributes to beta testers",
  [Job.productionDistribute]: "Distributes to production",
  [Job.promoteAlphaToBeta]: "Promotes alpha to beta",
  [Job.promoteBetaToProduction]: "Promotes beta to production",
  [Job.promoteAlphaToProduction]: "Promotes alpha to production",
  [Job.promoteInternalToAlpha]: "Promotes internal to alpha",
  [Job.promoteInternalToBeta]: "Promotes internal to beta",
  [Job.promoteInternalToProduction]: "Promotes internal to production",
  [Job.firebaseAppDistribution]: "Distributes to firebase app distribution",
  [Job.appCenterDistribute]: "Distributes to app center",
};
