"use client";
import router from "next/router";
import baseHydroCarbons from "@/data/basehydrocarbons.json";
import { useEffect, useState } from "react";
import styles from "@/styles/group.module.css";

export default function Group(props: any) {
  //idk but this must be here ->
  const [name, setName] = useState("");
  useEffect(() => {
    setName(router.query.name as string);
  }, []);

  return (
    <div>
      <div id={styles.circle1} />
      <div id={styles.circle2} />
      <div id={styles.circle3} />

      <h1 style={{ textAlign: "center", fontSize: 80 }}>{name}</h1>
      <div id={styles.hydrocarbons}>
        {baseHydroCarbons.map(
          (hydrocarbon: {
            name: string;
            hydrogens: number;
            pattern: string;
          }) => {
            let hydrocarbonOverData: { exist: any };
            try {
              hydrocarbonOverData = require(`@/data/hydrocarbons/${name}/${
                hydrocarbon.name + props.data?.end
              }.json`);
              console.log(hydrocarbonOverData);
            } catch (e) {
              hydrocarbonOverData = { exist: true };
            }
            return (
              <div
                key={hydrocarbon.name}
                className={styles.hydrocarbon}
                style={
                  hydrocarbonOverData.exist == false
                  ? { cursor: "not-allowed" }
                  : { cursor: "pointer" }
                }
                onClick={() => {
                  if (hydrocarbonOverData.exist != false)
                    router.push(
                      `/group/${name}/hydrocarbon/${
                        hydrocarbon.name + props.data.end
                      }`
                    );
                }}
              >
                <div key={hydrocarbon.name + props.data.end}>
                  <h1
                    style={
                      hydrocarbonOverData.exist == false
                        ? { textDecoration: "line-through"}
                        : {}
                    }
                  >
                    {" "}
                    {hydrocarbon.name + props.data.end}{" "}
                  </h1>
                  <span
                    style={
                      hydrocarbonOverData.exist == false
                        ? { fontSize: "30px", textDecoration: "line-through" }
                        : { fontSize: "30px" }
                    }
                  >
                    C
                    <span style={{ fontSize: "20px" }}>
                      {hydrocarbon.hydrogens > 1 && hydrocarbon.hydrogens}
                    </span>
                    H
                    <span style={{ fontSize: "20px" }}>
                      {eval(
                        props.data?.pattern.replace("n", hydrocarbon.hydrogens)
                      )}
                    </span>
                  </span>
                </div>
              </div>
            );
          }
        )}
      </div>
    </div>
  );
}

export async function getServerSideProps(content: any) {
  return {
    props: {
      data: require(`@/data/hydrocarbons/${content.params.name}/_info.json`),
    }, // will be passed to the page component as props
  };
}
