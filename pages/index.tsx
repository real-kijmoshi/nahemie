/* eslint-disable react/jsx-key */
import { readdirSync } from "fs";
import { join } from "path";
import Group from "./components/Group";

export default function Home({
  hydrocarbons,
}: {
  hydrocarbons: Array<string>;
}) {
  return (
    <>
      {hydrocarbons.map((x: string) => {
        return (
          <Group
            name={x}
            data={
              require(`../data/hydrocarbons/${x}/_info.json`) as {
                end: string;
                pattern: string;
              }
            }
          />
        );
      })}
    </>
  );
}

export async function getStaticProps() {
  const hydrocarbons = readdirSync(join(process.cwd(), "data", "hydrocarbons"));
  return { props: { hydrocarbons } };
}
