import {
  Environment,
  Job,
} from "https://deno.land/x/fluent_gitlab_ci@v0.3.2/mod.ts";

export const updateContainerJob = new Job()
  .image("docker:stable")
  .stage("environment")
  .services(["docker:dind"]).script(`
    docker login -u gitlab-ci-token -p $CI_JOB_TOKEN $CI_REGISTRY
    docker pull --quiet $CI_REGISTRY_IMAGE:$CI_COMMIT_REF_SLUG || true
    docker build --cache-from $CI_REGISTRY_IMAGE:$CI_COMMIT_REF_SLUG -t $CI_REGISTRY_IMAGE:$CI_COMMIT_REF_SLUG .
    docker push $CI_REGISTRY_IMAGE:$CI_COMMIT_REF_SLUG
  `);

export const updateContainer = new Job()
  .extends(".updateContainerJob")
  .only({ changes: ["Dockerfile"] });

export const ensureContainer = new Job()
  .extends(".updateContainerJob")
  .allowFailure(true)
  .beforeScript(
    `
    mkdir -p ~/.docker && echo '{"experimental": "enabled"}' > ~/.docker/config.json
    docker login -u gitlab-ci-token -p $CI_JOB_TOKEN $CI_REGISTRY
  `,
  )
  .beforeScript(
    `
if docker manifest inspect $CI_REGISTRY_IMAGE:$CI_COMMIT_REF_SLUG > /dev/null; then
  echo 'Skipping job since there is already an image with this tag'
  exit 0
fi`,
    { multiline: true },
  );

export const buildJob = new Job()
  .image("$CI_REGISTRY_IMAGE:$CI_COMMIT_REF_SLUG")
  .stage("build")
  .beforeScript(
    `
  echo \"$signing_jks_file_hex\" | xxd -r -p - > android-signing-keystore.jks
  export VERSION_CODE="$CI_PIPELINE_IID" && echo \"$VERSION_CODE\"
  export VERSION_SHA=\"\${CI_COMMIT_SHA:0:8}\" && echo \"$VERSION_SHA\"
  `,
  )
  .afterScript("rm -f android-signing-keystore.jks || true")
  .artifacts({ paths: ["app/build/outputs"] });

export const buildDebug = new Job()
  .extends(".build_job")
  .script("bundle exec fastlane buildDebug");

export const buildRelease = new Job()
  .extends(".build_job")
  .script("bundle exec fastlane buildRelease")
  .environment(new Environment("production"));

export const testDebug = new Job()
  .image("$CI_REGISTRY_IMAGE:$CI_COMMIT_REF_SLUG")
  .stage("test")
  .dependencies(["buildDebug"])
  .script("bundle exec fastlane test");

export const publishInternal = new Job()
  .image("$CI_REGISTRY_IMAGE:$CI_COMMIT_REF_SLUG")
  .stage("internal")
  .dependencies(["buildRelease"])
  .when("manual")
  .beforeScript(
    "echo $google_play_service_account_api_key_json > ~/google_play_api_key.json",
  )
  .afterScript("rm ~/google_play_api_key.json")
  .script("bundle exec fastlane internal");

export const promoteJob = new Job()
  .image("$CI_REGISTRY_IMAGE:$CI_COMMIT_REF_SLUG")
  .when("manual")
  .dependencies([])
  .beforeScript(
    "echo $google_play_service_account_api_key_json > ~/google_play_api_key.json",
  )
  .afterScript("rm ~/google_play_api_key.json");

export const promoteAlpha = new Job()
  .extends(".promote_job")
  .stage("alpha")
  .script("bundle exec fastlane promote_internal_to_alpha");

export const promoteBeta = new Job()
  .extends(".promote_job")
  .stage("beta")
  .script("bundle exec fastlane promote_alpha_to_beta");

export const promoteProduction = new Job()
  .extends(".promote_job")
  .stage("production")
  .only({
    variables: ["$CI_COMMIT_BRANCH == $CI_DEFAULT_BRANCH"],
  })
  .script("bundle exec fastlane promote_beta_to_production");
