import Client, { Directory, Container } from "../../deps.ts";
import { connect } from "../../sdk/connect.ts";
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
  let id = "";
  await connect(async (client: Client) => {
    const context = await getDirectory(client, src);
    const baseCtr = client
      .pipeline(Job.execLane)
      .container()
      .from("ghcr.io/fluent-ci-templates/fastlane:latest");

    const ctr = withEnv(withSrc(baseCtr, client, context))
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
    id = await ctr.id();
  });
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
