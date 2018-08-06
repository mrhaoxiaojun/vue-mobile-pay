// https://github.com/michael-ciniawsky/postcss-load-config
/**
* creat mrhaoxiaojun@126.com
* 配置此文档api： https://github.com/michael-ciniawsky/postcss-load-config
* vue-laoder说明：https://vue-loader.vuejs.org/zh-cn/postcss.html
*/
/**
 * 重要提示
 * vue-loader 从 11.0 版本开始支持通过 postcss-loader 自动加载同一个配置文件：
 * 名字可以是No1：postcss.config.js   No2：.postcssrc（本文件使用this）
 * 安装 postcss-loader 包
 * 使用配置文件允许你在由 postcss-loader 处理的普通CSS文件和 *.vue 文件中的 CSS 之间共享相同的配置，这是推荐的做法。
 * webpack.config.js加入
 * rules: [{
 *     test: /\.(css|scss)$/,
 *     loader:"style-loader!css-loader!postcss-loader!sass-loader"
 * }],
 */

/**
 * postcss 插件介绍
 * plugins支持数组，支持对象
 *
 * autoprefixer： 自动补写前缀
 * postcss-px2rem：https://www.npmjs.com/package/postcss-px2rem
 * postcss-pxtorem:https://www.npmjs.com/package/postcss-pxtorem
 * 二者都为解决px转化为rem而而生，前者做的相对来说比较单薄，后者配置项相对来说丰富些
*/
module.exports = {
  "plugins": {
    // "postcss-import": {},
    // "postcss-url": {},
    // to edit target browsers: use "browserslist" field in package.json
    "autoprefixer": {},
    'postcss-pxtorem':{
      root_value: '40', // 基准值
      prop_white_list: [], // 对所有 px 值生效
      minPixelValue: 2 // 忽略 1px 值
  }
  }
}
