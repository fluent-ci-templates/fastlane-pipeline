import Client from '@dagger.io/dagger';
import {withDevbox} from 'https://deno.land/x/nix_installer_pipeline@v0.3.6/src/dagger/steps.ts';
import {Dagger} from 'https://deno.land/x/android_pipeline@v0.2.3/mod.ts';
import {withBaseAlpine, withEnv, withSrc} from './lib.ts';

export enum Job {
  execLane = 'execLane',
}

const {withAndroidSdk} = Dagger;

export const execLane = async (client: Client, name: string, src = '.') => {
  const context = await client.host().directory(src);
  const baseCtr = withDevbox(
    withAndroidSdk(
      withBaseAlpine(
        client.pipeline(Job.execLane).container().from('alpine:latest'),
      ),
    )
      .withMountedCache('/nix', client.cacheVolume('nix'))
      .withMountedCache('/etc/nix', client.cacheVolume('nix-etc')),
  );

  const ctr = withEnv(withSrc(baseCtr, client, context))
    .withEnvVariable('NODE_OPTIONS', '--max-old-space-size=4096')
    .withExec(['sh', '-c', 'devbox run -- bun install'])
    .withExec(['sh', '-c', 'devbox run -- bundle install'])
    .withExec([
      'sh',
      '-c',
      `devbox run -- bundle exec fastlane android ${name}`,
    ]);

  const result = await ctr.stdout();

  console.log(result);
};

export type JobExec = (
  client: Client,
  name: string,
  src?: string,
) => Promise<void>;

export const runnableJobs: Record<Job, JobExec> = {
  [Job.execLane]: execLane,
};

export const jobDescriptions: Record<Job, string> = {
  [Job.execLane]: 'Executes a lane',
};
