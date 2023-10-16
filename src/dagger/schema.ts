import {
  queryType,
  makeSchema,
  dirname,
  join,
  resolve,
  stringArg,
  nonNull,
} from "../../deps.ts";

import { execLane } from "./jobs.ts";

const Query = queryType({
  definition(t) {
    t.string("execLane", {
      args: {
        src: nonNull(stringArg()),
        lane: nonNull(stringArg()),
      },
      resolve: async (_root, args, _ctx) => await execLane(args.lane, args.src),
    });
  },
});

export const schema = makeSchema({
  types: [Query],
  outputs: {
    schema: resolve(join(dirname(".."), dirname(".."), "schema.graphql")),
    typegen: resolve(join(dirname(".."), dirname(".."), "gen", "nexus.ts")),
  },
});
