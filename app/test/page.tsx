"use client";
import { useState } from "react";

const TimeGap = 30;

const dates: Date[] = [];
export default function Page() {
  let [style, setstyle] = useState<number>(0);
  function changestyle() {
    setstyle(style === 1 ? 0 : 1);
  }
  let [id, setid] = useState<number>(0);
  function setid2() {
    setid(id + 1);
  }
  return (
    <main>
      <button onClick={setid2}>点击我{id}加一</button>
      <button
        onClick={changestyle}
        style={{
          height: style === 1 ? "10vh" : "5vh",
        }}
      >
        点击我变{style === 1 ? "短" : "长"}
      </button>
      <button>{id}</button>
    </main>
  );
}
