import { GitlabCI } from "https://deno.land/x/fluent_gitlab_ci@v0.3.2/mod.ts";
import {
  buildDebug,
  buildJob,
  buildRelease,
  ensureContainer,
  promoteAlpha,
  promoteBeta,
  promoteJob,
  promoteProduction,
  publishInternal,
  testDebug,
  updateContainer,
  updateContainerJob,
} from "./jobs.ts";

const gitlabci = new GitlabCI()
  .stages([
    "environment",
    "build",
    "test",
    "deploy",
    "internal",
    "alpha",
    "beta",
    "production",
  ])
  .addJob(".updateContainerJob", updateContainerJob)
  .addJob("updateContainer", updateContainer)
  .addJob("ensureContainer", ensureContainer)
  .addJob(".build_job", buildJob)
  .addJob("buildDebug", buildDebug)
  .addJob("buildRelease", buildRelease)
  .addJob("testDebug", testDebug)
  .addJob("publishInternal", publishInternal)
  .addJob(".promote_job", promoteJob)
  .addJob("promoteAlpha", promoteAlpha)
  .addJob("promoteBeta", promoteBeta)
  .addJob("promoteProduction", promoteProduction);

export default gitlabci;
