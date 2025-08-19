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
- - 注意:useState变量是不能放在函数之外的