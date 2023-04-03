"use client"
import router from "next/router"

export default function Group() {
  return (
    <div>
      <h1 style={{textAlign: "center"}}>{router.query.name}</h1>
    </div>
  );
}