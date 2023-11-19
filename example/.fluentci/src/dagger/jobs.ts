import Client, { Directory } from "../../deps.ts";
import { connect } from "../../sdk/connect.ts";
import { withEnv, withSrc, getDirectory } from "./lib.ts";

export enum Job {
  execLane = "execLane",
}

export const execLane = async (
  name: string,
  src: string | Directory | undefined = "."
) => {
  await connect(async (client: Client) => {
    const context = getDirectory(client, src);
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
        `eval "$(devbox global shellenv)" && bundle exec fastlane android ${name}`,
      ]);

    const result = await ctr.stdout();

    console.log(result);
  });
  return "done";
};

export type JobExec = (name: string, src?: string) => Promise<string>;

export const runnableJobs: Record<Job, JobExec> = {
  [Job.execLane]: execLane,
};

export const jobDescriptions: Record<Job, string> = {
  [Job.execLane]: "Executes a lane",
};
