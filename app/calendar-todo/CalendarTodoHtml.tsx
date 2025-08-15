"use client";
import "./CalendarTodoCSS.css";
export default function CalendarTodoPage() {
  return (
    <section>
      {/**日历容器 */}
      <div id="Calendar" style={{ display: "flex", height: "100vh" }}>
        {/**周模式下日历左侧时间轴容器 */}
        <div
          id="CalendarWeekLeft"
          style={{
            width: "15vw",
            height: "100vh",
            overflow: "auto",
          }}
        ></div>
        {/**周模式下日历右侧容器（日期显示+主体部分） */}
        <div
          id="CalendarWeekRight"
          style={{
            display: "flex",
            flexDirection: "column",
            width: "100vw",
            height: "100vh",
            overflow: "auto",
          }}
        >
          {/**周模式下日历顶部时间容器 */}
          <div
            id="CalendarWeekHeader"
            style={{
              display: "flex",
              flexDirection: "row",
              width: "100vw",
              height: "5vh",
              overflow: "auto",
            }}
          ></div>
          {/**日历主体部分容器 */}
          <div
            id="CalendarWeekMain"
            style={{
              width: "100vw",
              height: "100vh",
              overflow: "auto",
            }}
          >
            {/**96*7个周日历时间块 */}
            {Array.from({ length: 96 }).map((_, rowIdx) => (
              <div key={rowIdx} style={{ display: "flex" }}>
                {Array.from({ length: 7 }).map((_, colIdx) => {
                  // 用于规定各种类型的时间块样式
                  let extraClass = "";
                  //第1列按钮去掉左边界，第6列的按钮去掉右边界
                  {
                    if (colIdx === 0) extraClass += " NoLeftBorder";
                    if (colIdx === 6) extraClass += " NoRightBorder";
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
    </section>
  );
}
