"use client";
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
