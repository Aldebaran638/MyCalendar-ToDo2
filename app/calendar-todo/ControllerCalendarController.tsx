import { JSX } from "react";
import "./SharedStateContext";
import "./CalendarTodoCSS.css";
import { useContext } from "react";
import { SharedStateContext } from "./SharedStateContext";
export default function ControllerCalendarController() {
  /* -------------------------从父组件中导入全局useState变量------------------------- */
  const sharedState = useContext(SharedStateContext);
  if (!sharedState) {
    // You can render a fallback UI or return null if context is not available
    return <div> SharedState context not found.</div>;
  }
  const {
    controllerStartTime,
    setControllerStartTime,
    controllerEndTime,
    setcontrollerEndTime,
    controllerError,
    setControllerError,
  } = sharedState;
  /* -------------------------从父组件中导入全局useState变量------------------------- */
  // 时间选择框的处理函数
  const handleStartTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (controllerEndTime) {
      // 检查是否在同一天
      const startDate = new Date(value).toDateString();

      // 如果有结束时间，需要构建完整的结束时间日期（用开始日期 + 结束时间）
      const controllerEndTimeHourMinute = controllerEndTime.split(":");
      const controllerEndTimeDate = new Date(
        new Date(value).setHours(
          parseInt(controllerEndTimeHourMinute[0]),
          parseInt(controllerEndTimeHourMinute[1])
        )
      );

      // 检查是否在同一天和时间大小
      if (startDate !== controllerEndTimeDate.toDateString()) {
        setControllerError("开始时间和结束时间必须在同一天！");
        return;
      }

      if (value >= controllerEndTimeDate.toISOString().slice(0, 16)) {
        setControllerError("开始时间不能大于或等于结束时间！");
        return;
      }
    }

    setControllerError("");
    setControllerStartTime(value);
  };

  const handlecontrollerEndTimeChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value; // 这里只有时分

    if (controllerStartTime) {
      // 从开始时间提取日期部分
      const startDateTime = new Date(controllerStartTime);

      // 从输入的时间值提取小时和分钟
      const [hours, minutes] = value.split(":").map(Number);

      // 创建结束时间的完整日期时间（使用开始时间的日期部分）
      const endDateTime = new Date(startDateTime);
      endDateTime.setHours(hours, minutes);

      // 检查是否是同一天
      if (startDateTime.toDateString() !== endDateTime.toDateString()) {
        setControllerError("开始时间和结束时间必须在同一天！");
        return;
      }

      // 检查时间大小
      if (startDateTime >= endDateTime) {
        setControllerError("结束时间不能小于或等于开始时间！");
        return;
      }
    }

    setControllerError("");
    setcontrollerEndTime(value);
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
          value={controllerStartTime}
          onChange={handleStartTimeChange}
        />
      </div>
    </main>
  );

  const controllerEndTimeElem: JSX.Element = (
    <main>
      <div
        id="ControllerCalendarControllercontrollerEndTime"
        style={{
          display: "flex",
          flexDirection: "column",
        }}
        className="ControllerCalendarControllercontrollerEndTime"
      >
        <span>结束时间（不能跨天）：</span>
        <input
          type="time"
          value={controllerEndTime}
          onChange={handlecontrollerEndTimeChange}
        />
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
        {controllerEndTimeElem}
        {createTime}
      </div>
    </main>
  );
}
