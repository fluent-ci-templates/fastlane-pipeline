import * as jobs from "./jobs.ts";
import { exit } from "../../deps.ts";

const { execLane } = jobs;

export default async function pipeline(lanes: string[], src = ".") {
  if (lanes.length === 0) {
    console.log("No lanes specified");
    exit(1);
  }

  for (const lane of lanes) {
    await execLane(lane, src);
  }
}
