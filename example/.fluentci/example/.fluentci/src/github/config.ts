import {JobSpec, Workflow} from 'fluent_github_actions';

export function generateYaml(): Workflow {
  const workflow = new Workflow('Build Application');

  const push = {
    branches: ['main'],
  };

  const setupDagger = `\
  curl -L https://dl.dagger.io/dagger/install.sh | DAGGER_VERSION=0.8.1 sh
  sudo mv bin/dagger /usr/local/bin
  dagger version`;

  const build: JobSpec = {
    'runs-on': 'ubuntu-latest',
    steps: [
      {
        uses: 'actions/checkout@v2',
      },
      {
        uses: 'denoland/setup-deno@v1',
        with: {
          'deno-version': 'v1.37',
        },
      },
      {
        name: 'Setup Fluent CI CLI',
        run: 'deno install -A -r https://cli.fluentci.io -n fluentci',
      },
      {
        name: 'Setup Dagger',
        run: setupDagger,
      },
      {
        name: 'Run Dagger Pipelines',
        run: 'dagger run fluentci fastlane_pipeline buildRelease',
      },
    ],
  };

  workflow.on({push}).jobs({build});

  return workflow;
}
