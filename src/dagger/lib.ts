import Client, { Container, Directory } from "@fluentci.io/dagger";

export const withSrc = (ctr: Container, client: Client, context: Directory) =>
  ctr
    .withMountedCache("/app/android/.gradle", client.cacheVolume("gradle"))
    .withMountedCache("/root/.gradle", client.cacheVolume("gradle-cache"))
    .withMountedCache("/app/android/app/build", client.cacheVolume("build"))
    .withMountedCache("/app/vendor", client.cacheVolume("vendor"))
    .withMountedCache("/app/node_modules", client.cacheVolume("node_modules"))
    .withMountedCache(
      "/root/android-sdk/platforms",
      client.cacheVolume("sdk-platforms")
    )
    .withMountedCache(
      "/root/android-sdk/system-images",
      client.cacheVolume("sdk-system-images")
    )
    .withMountedCache(
      "/root/android-sdk/build-tools",
      client.cacheVolume("sdk-build-tools")
    )
    .withDirectory("/app", context, {
      exclude: [
        "node_modules",
        "build",
        ".gradle",
        "app/build",
        "vendor",
        "android/app/build",
        "android/.gradle",
        ".devbox",
        ".fluentci",
      ],
    })
    .withWorkdir("/app")
    .withExec(["sh", "-c", "yes | sdkmanager --licenses"])
    .withEnvVariable("LC_ALL", "en_US.UTF-8")
    .withEnvVariable("LANG", "en_US.UTF-8");

export const withEnv = (ctr: Container) =>
  ctr
    .withEnvVariable(
      "GOOGLE_PLAY_SERVICE_ACCOUNT_JSON",
      Deno.env.get("GOOGLE_PLAY_SERVICE_ACCOUNT_JSON") || ""
    )
    .withEnvVariable("FIREBASE_APP_ID", Deno.env.get("FIREBASE_APP_ID") || "")
    .withEnvVariable(
      "FIREBASE_TESTERS_LIST",
      Deno.env.get("FIREBASE_TESTERS_LIST") || ""
    )
    .withEnvVariable(
      "FIREBASE_TESTERS_GROUPS",
      Deno.env.get("FIREBASE_TESTERS_GROUPS") || ""
    )
    .withEnvVariable(
      "APPCENTER_API_TOKEN",
      Deno.env.get("APPCENTER_API_TOKEN") || ""
    )
    .withEnvVariable(
      "APPCENTER_OWNER_NAME",
      Deno.env.get("APPCENTER_OWNER_NAME") || ""
    )
    .withEnvVariable(
      "APPCENTER_APP_NAME",
      Deno.env.get("APPCENTER_APP_NAME") || ""
    );
