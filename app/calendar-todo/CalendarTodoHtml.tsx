"use client";
import "./CalendarTodoCSS.css";
import "./CalendarWeek.tsx";

import { JSX } from "react";
import { useState } from "react";
import CalendarWeek from "./CalendarWeek.tsx";
export default function CalendarTodoPage() {
  /* -------------------------other------------------------- */
  
  /* -------------------------other------------------------- */
  /* -------------------------Switchers------------------------- */

  /**顶部Switcher转换器组件 */
  const Switchers: JSX.Element[] = [];
  /**使用 useState 替代全局变量,但是useState是不能放在函数之外的 */
  /**这里可以看作是用useState定义了两个东西。第一个变量用来判断当前状态，第二个函数用于设置状态 */
  const [stateCalendarTodo, setStateCalendarTodo] = useState(1);
  const [stateCalendarControllerTodos, setStateCalendarControllerTodos] =
    useState(1);
  function getSwitchers() {
    Switchers.length = 0;
    Switchers.push(
      <div id="Switchers" style={{ display: "flex" }}>
        <button
          /**使用useState的第一个东西，即变量来判断当前状态，从而动态决定按钮样式 */
          className={`NavigationButton ${
            stateCalendarTodo === 1 ? "BlueButton" : "WhiteButton"
          }`}
          onClick={() => {
            /**使用useState的第二个东西，即函数来设置当前状态 */
            setStateCalendarTodo(stateCalendarTodo === 1 ? 2 : 1);
          }}
        >
          Calendar
        </button>
        <button
          /**使用useState的第一个东西，即变量来判断当前状态，从而动态决定按钮样式 */
          className={`NavigationButton ${
            stateCalendarTodo === 1 ? "WhiteButton" : "BlueButton"
          }`}
          onClick={() => {
            /**使用useState的第二个东西，即函数来设置当前状态 */
            setStateCalendarTodo(stateCalendarTodo === 1 ? 2 : 1);
          }}
        >
          Todo
        </button>
        <button className={`NavigationBlankButton WhiteButton`}></button>
        <button
          /**使用useState的第一个东西，即变量来判断当前状态，从而动态决定按钮样式 */
          className={`NavigationButton ${
            stateCalendarControllerTodos === 1 ? "BlueButton" : "WhiteButton"
          }`}
          onClick={() => {
            /**使用useState的第二个东西，即函数来设置当前状态 */
            setStateCalendarControllerTodos(
              stateCalendarControllerTodos === 1 ? 2 : 1
            );
          }}
        >
          Calendar Controller
        </button>
        <button
          /**使用useState的第一个东西，即变量来判断当前状态，从而动态决定按钮样式 */
          className={`NavigationButton ${
            stateCalendarControllerTodos === 1 ? "WhiteButton" : "BlueButton"
          }`}
          onClick={() => {
            /**使用useState的第二个东西，即函数来设置当前状态 */
            setStateCalendarControllerTodos(
              stateCalendarControllerTodos === 1 ? 2 : 1
            );
          }}
        >
          Todos
        </button>
      </div>
    );
  }

  /* -------------------------Switchers------------------------- */

  /* -------------------------CalendarHeaderComponents------------------------- */

  const CalendarHeaderComponents: JSX.Element[] = [];
  const [stateCalendarHeaderSwitcher, setStateCalendarHeaderSwitcher] =
    useState(2);
  function getCalendarHeaderComponents() {
    CalendarHeaderComponents.length = 0; // 记得清空
    CalendarHeaderComponents.push(
      <div
        id="CalendarHeader"
        style={{
          display: "flex",
          padding: "5px 0px", // 与矩形边界的距离（上下10px，左右20px）
          alignItems: "center", // 垂直居中
        }}
      >
        {/**日期显示按钮 */}
        <button className="CalendarHeaderButtonDate BlankButton">
          2024/08/19
        </button>

        {/**空白按钮1 */}
        <button className="CalendarHeaderButton1 BlankButton"></button>

        {/**日历模式转换器 */}
        <button
          className={`CalendarHeaderSwitcherButton ${
            stateCalendarHeaderSwitcher === 1 ? "BlueButton" : "WhiteButton"
          }`}
          onClick={() => {
            setStateCalendarHeaderSwitcher(1);
          }}
        >
          Month
        </button>
        <button
          className={`CalendarHeaderSwitcherButton ${
            stateCalendarHeaderSwitcher === 2 ? "BlueButton" : "WhiteButton"
          }`}
          onClick={() => {
            setStateCalendarHeaderSwitcher(2);
          }}
        >
          Week
        </button>
        <button
          className={`CalendarHeaderSwitcherButton ${
            stateCalendarHeaderSwitcher === 3 ? "BlueButton" : "WhiteButton"
          }`}
          onClick={() => {
            setStateCalendarHeaderSwitcher(3);
          }}
        >
          Day
        </button>

        {/**空白按钮2 */}
        <button className="CalendarHeaderButton2 BlankButton"></button>

        {/**左按钮,内容为👈 */}
        <button className="CalendarHeaderButtonHand">👈</button>

        {/**右按钮,内容为👉 */}
        <button className="CalendarHeaderButtonHand">👉</button>

        {/**空白按钮3 */}
        <button className="CalendarHeaderButton3 BlankButton"></button>

        {/**Today按钮 */}
        <button className="CalendarHeaderButtonToday">Today</button>
        {/* *空白按钮4
        <button className="CalendarHeaderButton4 BlankButton"></button> */}
      </div>
    );
  }

  /* -------------------------CalendarHeaderComponents------------------------- */

  getSwitchers();
  getCalendarHeaderComponents();
  return (
    <section>
      {/**导航容器 */}
      <div id="Navigation" style={{ width: "100vw", height: "4vh" }}>
        {Switchers}
      </div>
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
        >
          {CalendarHeaderComponents}
        </div>
        {/**周模式下日历容器 */}
        <div>
          <CalendarWeek />
        </div>
      </div>
      <div
        id="Controller"
        style={{
          display: "absolute",
          left: "75vw",
          top: "4vh",
          width: "25vw",
          height: "96vh",
        }}
      ></div>
    </section>
  );
}
