import Client, { connect, uploadContext } from "../../deps.ts";
import * as jobs from "./jobs.ts";
import { exclude } from "./lib.ts";

const { execLane } = jobs;

export default async function pipeline(lanes: string[], src = ".") {
  if (Deno.env.has("FLUENTCI_SESSION_ID")) {
    await uploadContext(src, exclude);
  }

  connect(async (client: Client) => {
    if (lanes.length === 0) {
      console.log("No lanes specified");
      Deno.exit(1);
    }

    for (const lane of lanes) {
      await execLane(client, lane, src);
    }
  });
}
