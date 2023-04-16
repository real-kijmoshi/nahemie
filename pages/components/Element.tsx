import router from "next/router";

export default function Group(props: any) {
  return (
    <div
      onClick={() => {
        router.push(`/group/${props.name}`);
      }}
    >
      <h1>
        {props.name} {props.data.pattern}
      </h1>
    </div>
  );
}
