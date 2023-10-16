import { gql } from "../../deps.ts";

export const execLane = gql`
  query execLane($lane: String!, $src: String!) {
    execLane(lane: $lane, src: $src)
  }
`;
