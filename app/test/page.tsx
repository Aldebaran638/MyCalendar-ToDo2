"use client";
import { useState } from "react";
import { JSX } from "react";
const TimeGap = 30;

class time {
  y: number;
  mo: number;
  d: number;
  h: number;
  mi: number;

  constructor(
    y: number = 0,
    mo: number = 0,
    d: number = 0,
    h: number = 0,
    mi: number = 0
  ) {
    this.y = y;
    this.mo = mo;
    this.d = d;
    this.h = h;
    this.mi = mi;
  }
}

const dates: Date[] = [];

function getRecentWeekDates() {
  dates.length = 0; // 避免多次push导致数组越来越长
  const today = new Date();
  const weekDay = today.getDay() === 0 ? 7 : today.getDay(); // 周日为7
  // 计算本周一的日期
  const monday = new Date(today);
  monday.setDate(today.getDate() - (weekDay - 1));
  for (let i = 0; i < 7; i++) {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    dates.push(d);
  }
  return dates;
}

export default function TestPage() {
  getRecentWeekDates();

  const [result, setResult] = useState<time | null>(null);

  const posToTime = (e: React.MouseEvent) => {
    let t: time = new time();
    const target = e.target as HTMLElement;
    const id = target.id;

    // 只处理id以"CalendarWeekMainButton"开头的按钮
    if (!id.startsWith("CalendarWeekMainButton")) return t;

    // 解析按钮序号
    const indexStr = id.replace("CalendarWeekMainButton", "");
    const index = parseInt(indexStr, 10);
    if (isNaN(index)) return t;

    const rowCount = (24 * 60) / TimeGap; // 总行数
    const colCount = 8; // 总列数

    // 计算行号和列号（行号从1开始，列号从1开始）
    const row = Math.ceil(index / colCount);
    let col = index % colCount;
    if (col === 0) col = colCount; // 余数为0时在第8列

    // 第一列不处理
    if (col === 1) return t;

    // 设置年月日
    // dates[0]对应第2列，dates[1]对应第3列，以此类推
    const dateIdx = col - 2;
    if (dates[dateIdx]) {
      t.y = dates[dateIdx].getFullYear();
      t.mo = dates[dateIdx].getMonth() + 1; // 月份从0开始
      t.d = dates[dateIdx].getDate();
    }

    // 设置小时和分钟
    t.h = Math.floor(((row - 1) * TimeGap) / 60);
    t.mi = ((row - 1) * TimeGap) % 60;

    return t;
  };

  // 生成测试按钮
  const rowCount = (24 * 60) / TimeGap;
  const colCount = 8;
  const buttons: JSX.Element[] = [];
  let idx = 1;
  for (let row = 1; row <= rowCount; row++) {
    const rowButtons: JSX.Element[] = [];
    for (let col = 1; col <= colCount; col++) {
      const id = `CalendarWeekMainButton${idx}`;
      rowButtons.push(
        <button
          key={id}
          id={id}
          style={{
            width: 60,
            height: 30,
            margin: 2,
            background: col === 1 ? "#eee" : "#b2bec3",
            color: col === 1 ? "#636e72" : "#fff",
            border: "1px solid #dfe6e9",
            cursor: "pointer",
          }}
          onClick={(e) => {
            const t = posToTime(e);
            setResult(t);
          }}
        >
          {col === 1 ? "时间" : `${row},${col}`}
        </button>
      );
      idx++;
    }
    buttons.push(
      <div key={`row-${row}`} style={{ display: "flex" }}>
        {rowButtons}
      </div>
    );
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>posToTime 测试页面</h2>
      <div style={{ marginBottom: 20 }}>
        <b>点击下方任意按钮，查看解析结果：</b>
      </div>
      <div
        style={{
          maxHeight: 400,
          overflow: "auto",
          border: "1px solid #dfe6e9",
          padding: 10,
        }}
      >
        {buttons}
      </div>
      <div style={{ marginTop: 30, fontSize: 18 }}>
        <b>posToTime 返回结果：</b>
        {result ? (
          <div>
            年：{result.y}，月：{result.mo}，日：{result.d}，小时：{result.h}
            ，分钟：{result.mi}
          </div>
        ) : (
          <div>请点击上方按钮</div>
        )}
      </div>
    </div>
  );
}
