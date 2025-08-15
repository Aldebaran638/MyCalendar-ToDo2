"use client";

export default function mainpage() {
  return (
    <section>
      <h1>h1标题:文本</h1>
      {/* <!--段落文字使用p--> */}
      <p>段落文字标签为p</p>
      {/* <!--超链接使用href--> */}
      <a href="https://www.example.com">超链接标签为a,链接属性指定用herf</a>

      {/* <!--div,span,article,nav,footer,section用于代码分块,让代码更具有可读性和可维护性--> */}
      <section>
        section:两种列表
        {/* <!--无序列表使用ul--> */}
        <ul>
          <li>这个是ul列表</li>
          <li>苹果</li>
          <li>香蕉</li>
          <li>橙子</li>
        </ul>
        {/* <!--有序列表使用ol--> */}
        <ol>
          <li>这个是ol列表</li>
          <li>第一步</li>
          <li>第二步</li>
          <li>第三步</li>
        </ol>
      </section>
      {/* <!--table:指定这是一个表格;
        tr:指定一行的内容;
        th:指定一个标头;
        td:指定一个表格内容--> */}
      <table border={1}>
        <tr>
          <th>姓名:th用来写标头</th>
          <th>年龄</th>
          <th>城市</th>
        </tr>
        <tr>
          <td>小明:td用来写内容</td>
          <td>18</td>
          <td>北京</td>
        </tr>
        <tr>
          <td>小红</td>
          <td>20</td>
          <td>上海</td>
        </tr>
      </table>
      <h2>h2标题:组件以及组件的各种属性定义</h2>
      <button id="button">button标签用于创建按钮</button>
      <input
        placeholder="input标签用于创建输入框"
        onClick={() => alert("asdkha")}
      />
      <form>
        form:容器,用于包裹组件
        <input
          id="myInput"
          type="text"
          placeholder="请输入内容"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              alert((e.target as HTMLInputElement).value);
            }
          }}
        />
      </form>
      <select id="selectcomponent" name="city">
        <option value="beijing">
          select标签用于创建选择框,option标签用来指定选项
        </option>
        <option value="beijing">北京</option>
        <option value="shanghai">上海</option>
      </select>
      <br />
      <h3>h3标题</h3>

      <h4>h4标题</h4>

      <h5>h5标题</h5>
      <h6>h6标题</h6>
      {/* <!--script标签用于引入script脚本文件.defer表示直到html文件加载完了再加载该js文件--> */}
      <script src="index.js" defer></script>
    </section>
  );
}
