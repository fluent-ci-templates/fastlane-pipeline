import { dag, env, Container, Directory, DirectoryID } from "../../deps.ts";

export const exclude = [
  "node_modules",
  "build",
  ".gradle",
  "app/build/",
  "vendor",
  "android/app/build/",
  "android/.gradle",
  ".devbox",
  ".fluentci",
];

export const getDirectory = async (
  src: string | Directory | undefined = "."
) => {
  if (src instanceof Directory) {
    return src;
  }
  if (typeof src === "string") {
    try {
      const directory = dag.loadDirectoryFromID(src as DirectoryID);
      await directory.id();
      return directory;
    } catch (_) {
      return dag.host
        ? dag.host().directory(src)
        : dag.currentModule().source().directory(src);
    }
  }
  return dag.host
    ? dag.host().directory(src)
    : dag.currentModule().source().directory(src);
};

export const withSrc = (ctr: Container, context: Directory) =>
  ctr
    .withMountedCache("/app/android/.gradle", dag.cacheVolume("gradle"))
    .withMountedCache("/app/android/app/build", dag.cacheVolume("build"))
    .withMountedCache("/app/vendor", dag.cacheVolume("vendor"))
    .withMountedCache("/app/node_modules", dag.cacheVolume("node_modules"))
    .withMountedCache(
      "/root/android-sdk/platforms",
      dag.cacheVolume("sdk-platforms")
    )
    .withMountedCache(
      "/root/android-sdk/system-images",
      dag.cacheVolume("sdk-system-images")
    )
    .withMountedCache(
      "/root/android-sdk/build-tools",
      dag.cacheVolume("sdk-build-tools")
    )
    .withDirectory("/app", context, { exclude })
    .withWorkdir("/app")
    .withExec(["sh", "-c", "yes | sdkmanager --licenses"])
    .withEnvVariable("LC_ALL", "en_US.UTF-8")
    .withEnvVariable("LANG", "en_US.UTF-8")
    .withExec(["chmod", "+x", "/app/android/gradlew"]);

export const withEnv = (ctr: Container) =>
  ctr
    .withEnvVariable(
      "GOOGLE_PLAY_SERVICE_ACCOUNT_JSON",
      env.get("GOOGLE_PLAY_SERVICE_ACCOUNT_JSON") || ""
    )
    .withEnvVariable("FIREBASE_APP_ID", env.get("FIREBASE_APP_ID") || "")
    .withEnvVariable(
      "FIREBASE_TESTERS_LIST",
      env.get("FIREBASE_TESTERS_LIST") || ""
    )
    .withEnvVariable(
      "FIREBASE_TESTERS_GROUPS",
      env.get("FIREBASE_TESTERS_GROUPS") || ""
    )
    .withEnvVariable(
      "APPCENTER_API_TOKEN",
      env.get("APPCENTER_API_TOKEN") || ""
    )
    .withEnvVariable(
      "APPCENTER_OWNER_NAME",
      env.get("APPCENTER_OWNER_NAME") || ""
    )
    .withEnvVariable("APPCENTER_APP_NAME", env.get("APPCENTER_APP_NAME") || "");
