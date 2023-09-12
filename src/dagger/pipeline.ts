import Client, { connect } from "@fluentci.io/dagger";
import * as jobs from "./jobs.ts";

const { execLane } = jobs;

export default function pipeline(lanes: string[], src = ".") {
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
