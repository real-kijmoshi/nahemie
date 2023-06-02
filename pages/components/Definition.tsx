import { useState } from "react";
import styles from "@/styles/index.module.css";

export default function Definition({ definition }: any) {
  const [hover, setHover] = useState<boolean>(false);

  return (
    <div
      key={definition.name}
      className={styles.definition}
      onMouseEnter={() => {
        setHover(true);
      }}
      onMouseLeave={() => {
        setHover(false);
      }}
      onClick={() => {
        setHover(!hover);
      }}
    >
      <h1>{definition.name}</h1>
      <h2 className={styles.definitionAddionalInfo}>
        {hover && definition.definition}
      </h2>
    </div>
  );
}
