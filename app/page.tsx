import Mainpage from "./AppHtml";

/**
 * export：导出该组件，使得该组件可以被其他文件使用
 * default： 表示这个模块（文件）默认导出某个变量、函数或类。在本文件中
 *  由于Home函数前面有export default，所以本文件默认导出Home函数
 * @returns ：在函数注释里写 @returns，可以告诉别人这个函数会返回什么内容。
 */
export default function Home() {
  {
    /* 这里是注释.在React的JSX语法中,必须用大括号和/*包裹注释,且不能用// */
  }
  return (
    <main>
      {/**
       * 在 React 和 Next.js 中，组件名称必须以大写字母开头（如 Mainpage）
       *  这样 React 才会把它当作自定义组件处理。
       * 如果用小写（如 mainpage），React 会当作原生 HTML 标签，导致找不到对应标签并报错。*/}
      <Mainpage />
    </main>
  );
}
{
  /**只需在 app 目录下新建文件夹和 page.tsx 文件，Next.js 会自动把它映射为对应的路由页面。 */
}
