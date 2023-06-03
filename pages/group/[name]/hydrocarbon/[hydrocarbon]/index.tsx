import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Hydrocarbon({ data }: any) {
  const [hydrogens, setHydrogens] = useState<any>(null);

  const router = useRouter();

  useEffect(() => {
    setHydrogens(
      eval(require(`@/data/hydrocarbons/${router.query.name}/_info.json`).pattern.replace("n", data.hydrogens))
    );
  }, [])


  return (
    <div>
      <h1> {data.name} </h1>
      <span style={{ fontSize: "30px" }}>
        C
        <span style={{ fontSize: "20px" }}>
          {data.hydrogens > 1 && data.hydrogens}
        </span>
        H
        <span style={{ fontSize: "20px" }}>
          {hydrogens}
        </span>
      </span>
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
