import Client, { connect } from "../../deps.ts";
import { withEnv, withSrc } from "./lib.ts";

export enum Job {
  execLane = "execLane",
}

export const execLane = async (name: string, src = ".") => {
  await connect(async (client: Client) => {
    const context = await client.host().directory(src);
    const baseCtr = client
      .pipeline(Job.execLane)
      .container()
      .from("ghcr.io/fluentci-io/fastlane:latest");

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