export default function CalendarTodoPage() {
  const buttons: JSX.Element[] = [];
  for (let i = 0; i < 8; i++) {
    buttons.push(<button key={i}>{i + 1}</button>);
  }

  return (
    <main>
      {/**周模式下日历主体部分容器 */}
      <div
        id="1"
        style={{
          height: "80vh",
          overflow: "auto", // 添加滚动条
        }}
      >
        {buttons}
      </div>
    </main>
  );
}
