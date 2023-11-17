import { JobSpec, Workflow } from "fluent_github_actions";

/**
 * Generates a GitHub Actions workflow for building the application.
 * @returns The generated workflow.
 */
export function generateYaml(): Workflow {
  const workflow = new Workflow("Build Application");

  const push = {
    branches: ["main"],
  };

  const build: JobSpec = {
    "runs-on": "ubuntu-latest",
    steps: [
      {
        uses: "actions/checkout@v2",
      },
      {
        name: "Setup Fluent CI",
        uses: "fluentci-io/setup-fluentci@v2",
      },
      {
        name: "Run Dagger Pipelines",
        run: "fluentci run fastlane_pipeline buildRelease",
      },
    ],
  };

  workflow.on({ push }).jobs({ build });

  return workflow;
}
