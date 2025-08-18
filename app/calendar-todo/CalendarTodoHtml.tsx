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
  for (let i = 0; i < 8; i++) {
    CalendarWeekHeaderButtons.push(
      <button id={i.toString()} className="CalendarWeekHeaderButton">
        {weekNames[i]}
      </button>
    );
  }
}

export default function CalendarTodoPage() {
  getCalendarWeekHeaderButtons();
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
              {/**96*8个周日历时间块 */}
              {Array.from({ length: 96 }).map((_, rowIdx) => (
                <div key={rowIdx} style={{ display: "flex" }}>
                  {Array.from({ length: 8 }).map((_, colIdx) => {
                    // 用于规定各种类型的时间块样式
                    let extraClass = "";
                    //第1列按钮去掉左边界，第6列的按钮去掉右边界
                    {
                      if (colIdx === 0) extraClass += " NoLeftBorder";
                      if (colIdx === 7) extraClass += " NoRightBorder";
                    }

                    // 行数为4的按钮去除上边界保留下边界，其它的去除上下边界（只保留对应整时的横线）
                    {
                      if ((rowIdx + 1) % 4 === 0) {
                        extraClass += " NoTopBorder";
                      } else {
                        extraClass += " NoVerticalBorder";
                      }
                    }
                    // 奇数列的按钮为灰色，偶数列的按钮为白色
                    {
                      if ((colIdx + 1) % 2 != 0) {
                        extraClass += " GreyButton";
                      } else {
                        extraClass += " WhiteButton";
                      }
                    }
                    return (
                      <button
                        key={colIdx}
                        className={`CalendarWeekBlock${extraClass}`}
                      ></button>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
