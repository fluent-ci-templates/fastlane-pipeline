import { type Directory, type Container, dag } from "../../deps.ts";
import { withEnv, withSrc, getDirectory } from "./lib.ts";

export enum Job {
  execLane = "execLane",
}

/**
 * Execute a lane
 *
 * @function
 * @description Execute a lane
 * @param lane {string}
 * @param src {src: string | Directory | undefined}
 * @returns {string}
 */
export async function execLane(
  lane: string,
  src: string | Directory | undefined = "."
): Promise<Container | string> {
  const context = await getDirectory(src);
  const baseCtr = dag
    .pipeline(Job.execLane)
    .container()
    .from("ghcr.io/fluent-ci-templates/fastlane:latest")
    .withExec(["sh", "-c", "devbox update"]);

  const ctr = withEnv(withSrc(baseCtr, context))
    .withEnvVariable("NODE_OPTIONS", "--max-old-space-size=4096")
    .withExec(["sh", "-c", "[ -f devbox.json ] || devbox init"])
    .withExec([
      "sh",
      "-c",
      "grep -q 'ruby' devbox.json || devbox add ruby@3.2.2 jdk@17.0.7+7",
    ])
    .withExec(["sh", "-c", "devbox run -- bun install"])
    .withExec(["sh", "-c", "devbox run -- bundle install"])
    .withExec([
      "sh",
      "-c",
      `devbox run -- bundle exec fastlane android ${lane}`,
    ]);

  await ctr.stdout();
  const id = await ctr.id();
  return id;
}

export type JobExec = (
  name: string,
  src?: string
) => Promise<Container | string>;

export const runnableJobs: Record<Job, JobExec> = {
  [Job.execLane]: execLane,
};

export const jobDescriptions: Record<Job, string> = {
  [Job.execLane]: "Execute a lane",
};
