/* eslint-disable react/jsx-key */
import { readdirSync } from "fs";
import { join } from "path";
import Group from "./components/Group";
import styles from "@/styles/index.module.css";
import definitions from "@/data/definitions.json";
import Definition from "./components/Definition";

export default function Home({
  hydrocarbons,
}: {
  hydrocarbons: Array<string>;
}) {
  return (
    <div>
      <div id={styles.groups}>
        {hydrocarbons.map((x: string) => {
          return (
            <Group
              name={x}
              data={
                require(`@/data/hydrocarbons/${x}/_info.json`) as {
                  end: string;
                  pattern: string;
                }
              }
            />
          );
        })}
      </div>

      <div id={styles.circle1} />
      <div id={styles.circle2} />
      <div id={styles.circle3} />
      <div id={styles.circle4} />
      <div id={styles.circle5} />

      <hr style={{ marginTop: 150, position: "static" }} id={styles.line} />
      <div id={styles.definitions}>
        {definitions.map((definition) => (
          <Definition key={definition.name} definition={definition} />
        ))}
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const hydrocarbons = readdirSync(join(process.cwd(), "data", "hydrocarbons"));

  return { props: { hydrocarbons } };
}
