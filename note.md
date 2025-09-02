- 在ts中，一个变量在被赋值前是无法使用的
- useState使用典例：
```ts
  <div id="Switchers" style={{ display: "flex" }}>
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
      Calendar
    </button>
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
      Todo
    </button>
  </div>
```

# TS语法

## 数组的map映射

# React前端UI库

## MouseEvent

## useState

## 渲染
```ts
<div
  key={block.id}
  className="CalendarWeekEventBlock"
  style={{
    position: "absolute",
    ...position,
    zIndex: 10,
  }}
>
```

### 简介

- useState是React的一个Hook,用于动态渲染组件
- 每次useState定义的状态变量被更新的时候,React都会重新渲染组件(如果使用普通的TS语法编写的组件则没有这样的功能,这就是React的优点)
- 注意:useState变量是不能放在函数之外的
### 使用示例
```ts
//useState必须在Client页面中使用
"use client";
//从react中导入useState
import { useState } from "react";

export default function MouseMoveTest() {
  // 存储鼠标当前位置
  const [mousePos, setMousePos] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  // 存储点击位置（可选）
  const [clickPos, setClickPos] = useState<{ x: number; y: number } | null>(
    null
  );

  // 监听鼠标移动(监听行为)
  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  };

  // 监听鼠标点击(监听行为)
  const handleClick = (e: React.MouseEvent) => {
    setClickPos({ x: e.clientX, y: e.clientY });
  };

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        backgroundColor: "#f0f0f0",
        cursor: "crosshair", // 改变鼠标样式
      }}
      onMouseMove={handleMouseMove} // 添加鼠标移动监听
      onClick={handleClick}
    >
      {/* 显示鼠标当前位置 */}
      <div style={{ position: "fixed", top: "10px", left: "10px" }}>
        鼠标位置: x={mousePos.x}, y={mousePos.y}
      </div>

      {/* 显示点击位置（如果有的话） */}
      {clickPos && (
        <div style={{ position: "fixed", top: "40px", left: "10px" }}>
          点击位置: x={clickPos.x}, y={clickPos.y}
        </div>
      )}

      {/* 跟随鼠标的小圆点 */}
      <div
        style={{
          position: "fixed",
          left: mousePos.x - 5,
          top: mousePos.y - 5,
          width: "10px",
          height: "10px",
          backgroundColor: "red",
          borderRadius: "50%",
          pointerEvents: "none", // 防止干扰鼠标事件
        }}
      />

      {/* 点击位置的标记（如果有的话） */}
      {clickPos && (
        <div
          style={{
            position: "fixed",
            left: clickPos.x - 8,
            top: clickPos.y - 8,
            width: "16px",
            height: "16px",
            border: "2px solid blue",
            borderRadius: "50%",
            pointerEvents: "none",
          }}
        />
      )}
    </div>
  );
}

```

### 语法(例子解释)

#### 导入Hook

```ts
import { useState } from "react";
```

#### 定义一组useState状态变量和更新函数

```ts
const [mousePos, setMousePos] = useState<{ x: number; y: number }>({
  x: 0,
  y: 0,
});
```
解释
- 定义了两个东西
- - mousePos状态变量
- - - 类型:{ x: number; y: number }(也就是一个对象(类似结构体),拥有x和y两个类型为number的成员);
- - setMousePos更新函数
- - - 类型:({ x:number;y:number })=>void(在TS中,只要函数没有显式return东西,那么他就是返回void).
- - - 内容:将mousePos状态变量的值改变为传入参数的值.
- 如何定义的?
- useState是一个泛型函数,接受了一个数据类型和一个参数
- - <>中的类型{ x: number; y: number }规定了mousePos的类型和setMousePos接受参数的类型
- - ()中的参数{ x: 0,y: 0, },规定了mousePos的初始值

补充解释
- 在clickPos定义场景中,clickPos被定义为{ x: number; y: number } | null类型,这个被称为联合类型,它表示这个值可以是以下两种类型之一
- - 对象类型：{ x: number; y: number }
- - null 类型(表示这个值可以为空)

#### 定义函数

```ts
const handleClick = (e: React.MouseEvent) => {
  setClickPos({ x: e.clientX, y: e.clientY });
};
```
解释
- 定义了一个handleClick变量
- - 类型:(e: React.MouseEvent) =>void 即一种函数
- - 内容:setClickPos({ x: e.clientX, y: e.clientY });

#### 为模块添加属性
```ts
    <div
      ...
      onMouseMove={handleMouseMove} // 添加鼠标移动监听
      onClick={handleClick}
    >

      {/* 显示鼠标当前位置 */}
      <div style={{ position: "fixed", top: "10px", left: "10px" }}>
        鼠标位置: x={mousePos.x}, y={mousePos.y}
      </div>

      {/* 显示点击位置（如果有的话） */}
      {clickPos && (
      <div style={{ position: "fixed", top: "40px", left: "10px" }}>
        点击位置: x={clickPos.x}, y={clickPos.y}
      </div>
      )}

    </div>
```
解释
- 在该div模块中规定了onMouseMove和onClick两方面属性,行为分别是handleMouseMove和handleClick
- 该div模块展示了mousePos和clickPos两方面信息,且由于clickPos由useState定义,所以展示的信息会根据鼠标信息动态调整

# CSS全局变量
## 定义

```css
:root {
  --main-blue: #3498db;
  --main-white: #fff;
  --calendar-width: 75vw;
  --calendar-height: 96vh;
  --header-height: 8vh;
  --timegap: 15px;
}
```

## 样式中使用

```css
.CalendarHeader {
  background: var(--main-blue);
  height: var(--header-height);
}

#Calendar {
  width: var(--calendar-width);
  height: var(--calendar-height);
}
```