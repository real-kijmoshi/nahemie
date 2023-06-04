import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { Slide } from "react-slideshow-image";

import styles from "@/styles/hydrocarbon.module.css";
import "react-slideshow-image/dist/styles.css";

export default function Hydrocarbon({ data }: any) {
  const [hydrogens, setHydrogens] = useState<any>(null);
  const [hydrocarbonOverData, setHydrocarbonOverData] = useState<any>(null);

  const router = useRouter();

  useEffect(() => {
    setHydrogens(
      eval(
        require(`@/data/hydrocarbons/${router.query.name}/_info.json`).pattern.replace(
          "n",
          data.hydrogens
        )
      )
    );

    try {
      setHydrocarbonOverData(
        require(`@/data/hydrocarbons/${router.query.name}/${router.query.hydrocarbon}.json`)
      );

      console.log(hydrocarbonOverData);
    } catch (error) {
      setHydrocarbonOverData({ exist: false });
    }
  }, []);

  return (
    <div id={styles.hydrocarbon}>
      <h1 style={{ textAlign: "center", fontSize: "70px" }}> {data.name} </h1>
      <span style={{ fontSize: "50px", textAlign: "center" }}>
        C
        <span style={{ fontSize: "40px" }}>
          {data.hydrogens > 1 && data.hydrogens}
        </span>
        H<span style={{ fontSize: "40px" }}>{hydrogens}</span>
      </span>

      <div id={styles.circle1} />
      <div id={styles.circle2} />
      <div id={styles.circle3} />

      <div id={styles.application}>
        <h2>zastosowania</h2>
        <ul>
          {hydrocarbonOverData?.application?.map((x: any) => {
            return (
              <>
                <li>{x}</li>
              </>
            );
          })}
        </ul>
      </div>

      {hydrocarbonOverData?.properties && (
        <div id={styles.properties_container}>
          <h2>Właściwości</h2>
          <div id={styles.properties}>
            <div>
              <h3>Chemiczne</h3>
              <ul>
                {hydrocarbonOverData?.properties?.chemical?.map((x: any) => {
                  return (
                    <>
                      <li>{x}</li>
                    </>
                  );
                })}
              </ul>
            </div>

            <div>
              <h3>Fizyczne</h3>
              <ul>
                {hydrocarbonOverData?.properties?.physical?.map((x: any) => {
                  return (
                    <>
                      <li>{x}</li>
                    </>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      )}

      <div id={styles.ciekawostki}>
        <h2>Ciekawostki</h2>
        <ul>
          {hydrocarbonOverData?.ciekawostki?.map((x: any) => {
            return (
              <>
                <li>{x}</li>
              </>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export async function getServerSideProps(content: any) {
  let baseHydroCarbon = require(`@/data/basehydrocarbons.json`).filter(
    (x: any) => content.params.hydrocarbon.startsWith(x.name)
  )[0];
  let hydrocarbonOverData;

  try {
    hydrocarbonOverData = require(`@/data/hydrocarbons/${content.params.name}/${
      content.params.hydrocarbon + baseHydroCarbon.end
    }.json`);
  } catch (error) {}

  baseHydroCarbon = { ...baseHydroCarbon, ...hydrocarbonOverData };
  baseHydroCarbon.name = content.params.hydrocarbon;

  return {
    props: {
      data: baseHydroCarbon,
    }, // will be passed to the page component as props
  };
}
