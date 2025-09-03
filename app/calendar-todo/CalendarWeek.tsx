"use client";
import "./CalendarTodoCSS.css";
import { JSX } from "react";
import { useState } from "react";
//在主体部分，以TimeGap分钟作为一个时间块的大小
const TimeGap = 15;
//时间对象定义
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
let CalendarWeekMainBlockId = 0; // CalendarWeekMainBlock的自增id，每次刷新页面重置
//如果放在 CalendarTodoPage 函数内部，那么每次组件渲染时，这个变量都会被重新赋值为 0

export default function CalendarWeek() {
  /* -------------------------other------------------------- */
  // 生成最近7天日期
  const dates: Date[] = [];
  /* -------------------------other------------------------- */

  /* -------------------------CalendarWeekHeaderButtons------------------------- */

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
  /**用于获取最近一周的日期 */
  function getRecentWeekDates() {
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
          date.toLocaleDateString("zh-CN", {
            month: "2-digit",
            day: "2-digit",
          }) +
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

  /* -------------------------CalendarWeekHeaderButtons------------------------- */

  /* -------------------------CalendarWeekMainButtons------------------------- */
  const CalendarWeekMainButtons: JSX.Element[] = [];
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
        id = "CalendarWeekMainButton" + ((i - 1) * 8 + j);
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
  /* -------------------------CalendarWeekMainButtons------------------------- */

  /* -------------------------CalendarWeekMainBlocks------------------------- */
  //事件块对象定义
  type eventBlock = {
    id: string;
    title: string;
    description: string;
    startTime: time;
    endTime: time;
    group: number;
    createTime: number; //创建时间的时间戳
  };
  //动态存储事件块信息
  const [CalendarWeekMainBlocks, setCalendarWeekMainBlocks] = useState<
    Array<eventBlock>
  >([]);
  //鼠标坐标转时间函数
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
  // 计算事件块位置
  const timeToPos = (block: eventBlock) => {
    // 计算行列
    const startTimeMinutes = block.startTime.h * 60 + block.startTime.mi;
    const endTimeMinutes = block.endTime.h * 60 + block.endTime.mi;

    // 计算第几行(从0开始计算)
    const startRow = Math.floor(startTimeMinutes / TimeGap);
    const endRow = Math.ceil(endTimeMinutes / TimeGap);

    // 计算对应的列（这里从dates中获取对应的日期，然后计算是星期几）
    let col = 2; // 默认第二列
    for (let i = 0; i < dates.length; i++) {
      const date = dates[i];
      if (
        date.getFullYear() === block.startTime.y &&
        date.getMonth() + 1 === block.startTime.mo &&
        date.getDate() === block.startTime.d
      ) {
        col = i + 1; // dates[0]对应第2列，依此类推
        break;
      }
    }

    // 每个按钮的高度和宽度(从样式表中获取，或根据实际测量值)
    const buttonHeight = 15; // 假设每个按钮高30px
    const buttonWidth = 60; // 假设每个按钮宽60px

    // 计算位置
    const top = startRow * buttonHeight;
    const left = col * 9.375; // 第一列是时间列
    const height = (endRow - startRow) * buttonHeight;

    return {
      top: `${top}px`,
      left: `${left}vw`,
      height: `${height * 5}px`,
      width: `9.375vw`,
    };
  };
  //动态存储临时事件块信息
  let [CalendarWeekMainTmpBlock, setCalendarWeekMainTmpBlock] =
    useState<eventBlock | null>(null);
  //新创建一个临时事件函数
  const addCalendarWeekMainTmpBlock = (e: React.MouseEvent) => {
    // 获取起始时间
    const startTime: time = posToTime(e);

    // 如果未点击有效时间块，直接返回
    if (!startTime || startTime.y === 0) return;

    // 计算结束时间
    let endH = startTime.h;
    let endMi = startTime.mi + TimeGap;
    if (endMi >= 60) {
      endH += Math.floor(endMi / 60);
      endMi = endMi % 60;
    }
    const endTime: time = new time(
      startTime.y,
      startTime.mo,
      startTime.d,
      endH,
      endMi
    );
    // 事件块属性
    let id: string = `CalendarWeekMainTmpBlock${CalendarWeekMainBlockId}`;
    let title: string = "default";
    let description: string = "default";
    let group: number = 0;
    let createTime: number = Date.now(); // 当前时间戳
    // 构造事件块对象
    const block: eventBlock = {
      id,
      title,
      description,
      startTime,
      endTime,
      group,
      createTime,
    };

    /**
     * 不能写CalendarWeekMainTmpBlock=block，否则你会发现点击屏幕没反应
     * 必须用规定函数设置动态属性
     */
    setCalendarWeekMainTmpBlock(block);
  };
  //调整临时事件大小函数
  const updateCalendarWeekMainTmpBlock = (e: React.MouseEvent) => {
    // 获取起始时间
    if (CalendarWeekMainTmpBlock) {
      const startTime: time = CalendarWeekMainTmpBlock.startTime;

      // 计算结束时间
      let endTime: time = posToTime(e);
      if (
        endTime.y != CalendarWeekMainTmpBlock.startTime.y ||
        endTime.mo != CalendarWeekMainTmpBlock.startTime.mo ||
        endTime.d != CalendarWeekMainTmpBlock.startTime.d
      ) {
        return;
      } else {
        let endH = endTime.h;
        let endMi = endTime.mi + TimeGap;
        if (endMi >= 60) {
          endH += Math.floor(endMi / 60);
          endMi = endMi % 60;
        }
        endTime.h = endH;
        endTime.mi = endMi;
        // 事件块属性
        let id: string = `CalendarWeekMainTmpBlock${CalendarWeekMainBlockId}`;
        let title: string = "default";
        let description: string = "default";
        let group: number = 0;
        let createTime: number = CalendarWeekMainTmpBlock.createTime; // 当前时间戳
        // 构造事件块对象
        const block: eventBlock = {
          id,
          title,
          description,
          startTime,
          endTime,
          group,
          createTime,
        };

        setCalendarWeekMainTmpBlock(block);
      }
    }
  };
  //删除临时事件函数
  const deleteCalendarWeekMainTmpBlock = (e: React.MouseEvent) => {
    if (CalendarWeekMainTmpBlock) {
      let block = CalendarWeekMainTmpBlock as eventBlock;
      block.createTime = CalendarWeekMainTmpBlock.createTime;
      CalendarWeekMainBlocks.push(block);
      setCalendarWeekMainTmpBlock(null);
    }
  };
  //修改事件信息函数
  //删除事件函数
  /* -------------------------CalendarWeekMainBlocks------------------------- */
  getCalendarWeekHeaderButtons();
  getCalendarWeekMainButtons();

  return (
    <main>
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
            position: "relative",
          }}
          //点击时间块以开始创建新事件
          onMouseDown={addCalendarWeekMainTmpBlock}
          // 鼠标拖拽时，调整临时事件块大小
          onMouseMove={updateCalendarWeekMainTmpBlock}
          // 鼠标释放时，删除临时事件块并添加新事件进入数组
          onMouseUp={deleteCalendarWeekMainTmpBlock}
        >
          {CalendarWeekMainBlocks.map((block) => {
            const position = timeToPos(block);

            return (
              <div
                key={block.id}
                className="CalendarWeekEventBlock"
                style={{
                  position: "absolute",
                  ...position,
                  zIndex: 10,
                  height:
                    ((block.endTime.h * 60 +
                      block.endTime.mi -
                      block.startTime.h * 60 -
                      block.startTime.mi) *
                      15) /
                    TimeGap,
                }}
              >
                <div>{block.title}</div>
                <div>
                  {block.startTime.h.toString().padStart(2, "0")}:
                  {block.startTime.mi.toString().padStart(2, "0")} -
                  {block.endTime.h.toString().padStart(2, "0")}:
                  {block.endTime.mi.toString().padStart(2, "0")}
                </div>
                <div>{block.description}</div>
              </div>
            );
          })}
          {CalendarWeekMainTmpBlock &&
            (() => {
              const block = CalendarWeekMainTmpBlock;
              const position = timeToPos(block);
              return (
                <div
                  key={block.id}
                  className="CalendarWeekTmpEventBlock"
                  style={{
                    position: "absolute",
                    ...position,
                    zIndex: 10,
                    height:
                      ((block.endTime.h * 60 +
                        block.endTime.mi -
                        block.startTime.h * 60 -
                        block.startTime.mi) *
                        15) /
                      TimeGap,
                  }}
                >
                  <div>{block.title}</div>
                  <div>
                    {block.startTime.h.toString().padStart(2, "0")}:
                    {block.startTime.mi.toString().padStart(2, "0")} -
                    {block.endTime.h.toString().padStart(2, "0")}:
                    {block.endTime.mi.toString().padStart(2, "0")}
                  </div>
                  <div>{block.description}</div>
                </div>
              );
            })()}
          {/**周日历时间块 */}
          {CalendarWeekMainButtons}
        </div>
      </div>
    </main>
  );
}
