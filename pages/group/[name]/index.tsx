"use client"
import router from "next/router";
import baseHydroCarbons from "@/data/basehydrocarbons.json"
import { useEffect, useState } from "react";

export default function Group(props: any) {
  //idk but this must be here ->
  const [name, setName] = useState("")
  useEffect(() => {
    console.log(router.query.name);
    
    setName(router.query.name as string)
  }, [])

  
  return (
    <div>
      <h1 style={{ textAlign: "center" }}>{name}</h1>
      {
        baseHydroCarbons.map((hydrocarbon: {name: string; hydrogens: number; pattern: string} )=> {
          return (
            <div key={hydrocarbon.name + props.data.end }>
              <h1> { hydrocarbon.name + props.data.end } </h1>
                <span style={{fontSize: "30px"}}>
                  C<span style={{fontSize: "20px"}}>{hydrocarbon.hydrogens > 1 && hydrocarbon.hydrogens}</span>H<span style={{fontSize: "20px"}}>{eval(props.data?.pattern.replace("n", hydrocarbon.hydrogens))}</span>
                </span>
            </div>
          )
        })
      }
    </div>
  );
}

export async function getServerSideProps(content: any) {
  console.log(content.params.name);
  
  return {
    props: {
      data: require(`@/data/hydrocarbons/${content.params.name}/_info.json`)
    }, // will be passed to the page component as props
  }
}