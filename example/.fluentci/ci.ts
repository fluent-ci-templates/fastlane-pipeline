import Client, { connect } from "https://sdk.fluentci.io/v0.1.9/mod.ts";
import { execLane } from "https://pkg.fluentci.io/fastlane_pipeline@v0.6.3/mod.ts";

function pipeline(src = ".") {
  connect(async (client: Client) => {
    await execLane(client, "buildRelease", src);
  });
}

pipeline();
