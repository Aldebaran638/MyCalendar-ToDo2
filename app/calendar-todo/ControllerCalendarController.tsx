import { JSX } from "react";
import { useState } from "react";
import "./CalendarTodoCSS.css";
export default function ControllerCalendarController() {
  // //事件块对象定义
  // type eventBlock = {
  //   id: string;
  //   title: string;
  //   description: string;

  //   startTime: time;
  //   endTime: time;

  //   group: number;
  //   createTime: number; //创建时间的时间戳
  // };
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [error, setError] = useState("");
  // 时间选择框的处理函数
  const handleStartTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (endTime) {
      // 检查是否在同一天
      const startDate = new Date(value).toDateString();

      // 如果有结束时间，需要构建完整的结束时间日期（用开始日期 + 结束时间）
      const endTimeHourMinute = endTime.split(":");
      const endTimeDate = new Date(
        new Date(value).setHours(
          parseInt(endTimeHourMinute[0]),
          parseInt(endTimeHourMinute[1])
        )
      );

      // 检查是否在同一天和时间大小
      if (startDate !== endTimeDate.toDateString()) {
        setError("开始时间和结束时间必须在同一天！");
        return;
      }

      if (value >= endTimeDate.toISOString().slice(0, 16)) {
        setError("开始时间不能大于或等于结束时间！");
        return;
      }
    }

    setError("");
    setStartTime(value);
  };

  const handleEndTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value; // 这里只有时分

    if (startTime) {
      // 从开始时间提取日期部分
      const startDateTime = new Date(startTime);

      // 从输入的时间值提取小时和分钟
      const [hours, minutes] = value.split(":").map(Number);

      // 创建结束时间的完整日期时间（使用开始时间的日期部分）
      const endDateTime = new Date(startDateTime);
      endDateTime.setHours(hours, minutes);

      // 检查是否是同一天
      if (startDateTime.toDateString() !== endDateTime.toDateString()) {
        setError("开始时间和结束时间必须在同一天！");
        return;
      }

      // 检查时间大小
      if (startDateTime >= endDateTime) {
        setError("结束时间不能小于或等于开始时间！");
        return;
      }
    }

    setError("");
    setEndTime(value);
  };

  const title: JSX.Element = (
    <main>
      <div
        id="ControllerCalendarControllerTitle"
        style={{
          display: "flex",
          flexDirection: "column",
        }}
        className="ControllerCalendarControllerTitle"
      >
        <span>标题：</span>
        <input type="text" placeholder="请输入事件块标题" />
      </div>
    </main>
  );
  const description: JSX.Element = (
    <main>
      <div
        id="ControllerCalendarControllerDescription"
        style={{
          display: "flex",
          flexDirection: "column",
        }}
        className="ControllerCalendarControllerDescription"
      >
        <span>描述：</span>
        <input type="text" placeholder="请输入事件块描述" />
      </div>
    </main>
  );
  const startTimeElem: JSX.Element = (
    <main>
      <div
        id="ControllerCalendarControllerStartTime"
        style={{
          display: "flex",
          flexDirection: "column",
        }}
        className="ControllerCalendarControllerStartTime"
      >
        <span>开始时间：</span>
        <input
          type="datetime-local"
          value={startTime}
          onChange={handleStartTimeChange}
        />
      </div>
    </main>
  );

  const endTimeElem: JSX.Element = (
    <main>
      <div
        id="ControllerCalendarControllerEndTime"
        style={{
          display: "flex",
          flexDirection: "column",
        }}
        className="ControllerCalendarControllerEndTime"
      >
        <span>结束时间（不能跨天）：</span>
        <input type="time" value={endTime} onChange={handleEndTimeChange} />
      </div>
    </main>
  );

  const createTime: JSX.Element = (
    <main>
      <div
        id="ControllerCalendarControllerCreateTime"
        style={{
          display: "flex",
          flexDirection: "column",
        }}
        className="ControllerCalendarControllerCreateTime"
      >
        <span>创建时间：</span>
        <span>{new Date().toLocaleString()}</span>
      </div>
    </main>
  );
  return (
    <main>
      <div
        id="ControllerCalendarController"
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "3vh",
        }}
      >
        {title}
        {description}
        {startTimeElem}
        {endTimeElem}
        {createTime}
      </div>
    </main>
  );
}
