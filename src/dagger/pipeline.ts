import Client, { connect } from "@dagger.io/dagger";
import { buildRelease } from "./jobs.ts";

export default function pipeline(src = ".") {
  connect(async (client: Client) => {
    await buildRelease(client, src);
  });
}
