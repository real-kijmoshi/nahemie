import router from "next/router";

export default function Group(props: {
  name: string;
  data: { end: string; pattern: string };
}) {
  return (
    <div
      onClick={() => {
        router.push(`/group/${props.name}`);
      }}
    >
      <h1>{props.name}</h1>
    </div>
  );
}
