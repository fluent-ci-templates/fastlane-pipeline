import { Directory, Container, dag } from "../../deps.ts";
import { withEnv, withSrc, getDirectory } from "./lib.ts";

export enum Job {
  execLane = "execLane",
}

/**
 * @function
 * @description Executes a lane
 * @param lane {string}
 * @param src {src: string | Directory | undefined}
 * @returns {string}
 */
export async function execLane(
  lane: string,
  src: string | Directory | undefined = "."
): Promise<Container | string> {
    const context = await getDirectory(dag, src);
    const baseCtr = dag
      .pipeline(Job.execLane)
      .container()
      .from("ghcr.io/fluent-ci-templates/fastlane:latest");

    const ctr = withEnv(withSrc(baseCtr, dag, context))
      .withEnvVariable("NODE_OPTIONS", "--max-old-space-size=4096")
      .withExec(["sh", "-c", 'eval "$(devbox global shellenv)" && bun install'])
      .withExec([
        "sh",
        "-c",
        'eval "$(devbox global shellenv)" && bundle install',
      ])
      .withExec([
        "sh",
        "-c",
        `eval "$(devbox global shellenv)" && bundle exec fastlane android ${lane}`,
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
  [Job.execLane]: "Executes a lane",
};
