import styles from "@/styles/index.module.css";
import router from "next/router";

export default function Group(props: {
  name: string;
  data: { end: string; pattern: string };
}) {
  return (
    <div
      key={props.name}
      className={styles.group}
      onClick={() => {
        router.push(`/group/${props.name}`);
      }}
    >
      <h1 style={{ fontSize: "90px" }}>{props.name}</h1>
      <div className={styles.addionalInfo}>
        <h1>
          Wzor: C<span style={{ fontSize: "20px" }}>n</span>H
          <span style={{ fontSize: "20px" }}>{props.data.pattern}</span>
        </h1>
        <h1>koncowka: {props.data.end}</h1>
      </div>
    </div>
  );
}
