"use client";
import "./CalendarTodoCSS.css";
import { JSX } from "react";

function getRecentWeekDates() {
  const today = new Date();
  const weekDay = today.getDay() === 0 ? 7 : today.getDay(); // 周日为7
  // 计算本周一的日期
  const monday = new Date(today);
  monday.setDate(today.getDate() - (weekDay - 1));
  // 生成7天日期
  const dates = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    dates.push(d);
  }
  return dates;
}

const weekNames: string[] = [
  "",
  "星期一",
  "星期二",
  "星期三",
  "星期四",
  "星期五",
  "星期六",
  "星期日",
];

const CalendarWeekHeaderButtons: JSX.Element[] = [];

/**绘制CalendarWeekHeader容器的按钮 */
function getCalendarWeekHeaderButtons() {
  CalendarWeekHeaderButtons.length = 0;
  const weekDates = getRecentWeekDates(); // 获取最近一周的日期
  for (let i = 0; i < 8; i++) {
    let className: string = "CalendarWeekHeaderButton";
    let content: string = "";
    let id: string = `CalendarWeekHeaderButton${i.toString()}`;
    if (i === 0) {
      // 第一列不填内容
      content = "";
    } else {
      // 后面7列显示日期和星期
      const date = weekDates[i - 1];
      const today = new Date();
      // 判断是否为今天，若是可加特殊样式
      const isToday =
        date.getFullYear() === today.getFullYear() &&
        date.getMonth() === today.getMonth() &&
        date.getDate() === today.getDate();
      if (isToday) className += " CalendarWeekHeaderButtonToday";
      // 格式：08/11 \n 星期一
      content =
        date.toLocaleDateString("zh-CN", { month: "2-digit", day: "2-digit" }) +
        "\n" +
        weekNames[i];
    }
    CalendarWeekHeaderButtons.push(
      <button
        id={id}
        className={className}
        key={id}
        style={{ whiteSpace: "pre-line" }}
      >
        {content}
      </button>
    );
  }
}
const CalendarWeekMainButtons: JSX.Element[] = [];
const TimeGap = 15; //在主体部分，以TimeGap分钟作为一个时间块的大小
function getCalendarWeekMainButtons() {
  CalendarWeekMainButtons.length = 0; //记得清空旧的内容！！！
  const Row: number = (24 * 60) / TimeGap;
  for (let i = 1; i <= Row; i++) {
    const Tmp: JSX.Element[] = [];
    for (let j = 1; j <= 8; j++) {
      let className: string = `CalendarWeekMainButton`;
      let content: string = "";
      let id: string = "";
      //第一列,需要标注时间
      if (j == 1) {
        if (
          i % (60 / TimeGap) == 1 ||
          i % (60 / TimeGap) == 60 / TimeGap / 2 + 1
        ) {
          let h = Math.floor(i / (60 / TimeGap));
          let m = ((i % (60 / TimeGap)) - 1) * TimeGap;
          content = `${h.toString().padStart(2, "0")}:
                ${m.toString().padStart(2, "0")}`;
        }
      }
      //奇数列,填充为灰色
      if (j % 2 == 1) {
        className += ` GreyButton`;
      }
      //偶数列,填充为白色
      else {
        className += ` WhiteButton`;
      }
      //第一列,去掉左边界
      if (j == 1) {
        className += ` NoLeftBorder`;
      }
      //最后一列，去掉右边界
      else if (j == 8) {
        className += ` NoRightBorder`;
      }
      //特殊行,只去掉上边界
      if (i % (60 / TimeGap) == 0) {
        className += ` NoTopBorder`;
      }
      //其余行去掉上下边界
      else {
        className += ` NoVerticalBorder`;
      }
      Tmp.push(
        <button id={id} className={className}>
          {content}
        </button>
      );
    }
    //用<div>包裹而非使用二维数组，可以让TS将按钮渲染成想要的二维表格形状
    CalendarWeekMainButtons.push(
      <div key={i} style={{ display: "flex" }}>
        {Tmp}
      </div>
    );
  }
}

export default function CalendarTodoPage() {
  getCalendarWeekHeaderButtons();
  getCalendarWeekMainButtons();
  return (
    <section>
      {/**日历容器 */}
      <div id="Calendar" style={{ display: "flex", height: "100vh" }}>
        {/**日历容器 */}
        <div
          id="Calendar"
          style={{
            width: "75vw",
            height: "96vh",
          }}
        >
          {/**日历头部容器 */}
          <div
            id="CalendarHeader"
            style={{
              height: "8vh",
            }}
          ></div>
          {/**周模式下日历容器 */}
          <div
            id="CalendarWeek"
            style={{
              height: "80vh",
            }}
          >
            {/**周模式下日历头部时间容器 */}
            <div
              id="CalendarWeekHeader"
              style={{
                height: "8vh",
              }}
            >
              <div style={{ display: "flex" }}>
                {/* 绘制CalendarWeekHeader的八个组件按钮 */}
                {CalendarWeekHeaderButtons}
              </div>
            </div>
            {/**周模式下日历主体部分容器 */}
            <div
              id="CalendarWeekMain"
              style={{
                height: "80vh",
                overflow: "auto", // 添加滚动条
              }}
            >
              {/**周日历时间块 */}
              {CalendarWeekMainButtons}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
