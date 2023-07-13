/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/dist/cjs.js!./src/input.css":
/*!*******************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/dist/cjs.js!./src/input.css ***!
  \*******************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/noSourceMaps.js */ \"./node_modules/css-loader/dist/runtime/noSourceMaps.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/getUrl.js */ \"./node_modules/css-loader/dist/runtime/getUrl.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__);\n// Imports\n\n\n\nvar ___CSS_LOADER_URL_IMPORT_0___ = new URL(/* asset import */ __webpack_require__(/*! ./originals/NotoSans-Medium.ttf */ \"./src/originals/NotoSans-Medium.ttf\"), __webpack_require__.b);\nvar ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));\nvar ___CSS_LOADER_URL_REPLACEMENT_0___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_0___);\n// Module\n___CSS_LOADER_EXPORT___.push([module.id, `:root {\n  --system-ui: system-ui, \"Segoe UI\", Roboto, Helvetica, Arial, sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\";\n}\n\n* {\n  margin: 0;\n  padding: 0;\n  box-sizing: border-box;\n  vertical-align: baseline;\n  border-collapse: collapse;\n  border-spacing: 0;\n  font-family: var(--system-ui);\n  overflow-wrap: break-word;\n  hyphens: auto;\n  font-size: 62.5%;\n}\n\nspan {\n  font-size: 1.6rem;\n}\n\nbody {\n  width: 100%; /* might be changed if necessary */\n  padding: 0; /* might be changed if necessary */\n  font-size: 1.6rem;\n  line-height: 1.75;\n  letter-spacing: 0.05rem;\n}\n\nimg, picture, video, canvas, svg,\narticle, aside, details, figcaption, figure,\nfooter, header, hgroup, menu, nav, section {\n  display: block;\n  max-width: 100%;\n}\n\nbutton, textarea, select, input, li {\n  font: inherit;\n  font-size: 1.6rem;\n}\n\nbutton {\n  padding: 0.5rem 1rem;\n}\n\nh1, h2, h3 {\n  font-weight: 700;\n}\n\nh1 {\n  font-size: 3rem;\n}\n\nh2 {\n  font-size: 2.5rem;\n}\n\nh3 {\n  font-size: 2rem;\n}\n\nul {\nlist-style: disc;\n}\n\nol {\n  list-style-position: outside;\n  list-style: decimal;\n}\n\ntd, th {\n  border: 1px solid black;\n}\n\nblockquote, q {\nquotes: none;\n}\n\n*::not(img),\n*::before,\n*::after {\n  margin: inherit;\n  padding: inherit;\n  box-sizing: inherit;\n}\n\ninput {\n-webkit-appearance: none;\nappearance: none;\nbackground-color: #fff;\nmargin: 0;\npadding: 0;\n}\n\n\n/* START */\n\n* {\n  color: black;\n  font-weight: 500;\n  font-family: \"NotoSans\", sans-serif;\n  border-collapse: collapse;\n}\n\n@font-face {\nfont-family: \"NotoSans\";\nsrc: url(${___CSS_LOADER_URL_REPLACEMENT_0___});\n}\n\nbody {\n  min-height: 100vh;\n}\n\n.content {\n  min-height: 100vh;\n  display: grid;\n  grid-template-columns: 30rem 1fr;\n  grid-template-rows: 4rem 1fr;\n}\n\n.content header {\n  grid-area: 1 / 1 / 2 / 3;\n  display: grid;\n  grid-template-columns: 3rem 25rem 1fr 3rem;\n  justify-items: stretch;\n  align-items: stretch;\n  background: linear-gradient(to right, rgb(255, 238, 0), rgb(255, 162, 0));\n  padding: 0 2rem;\n}\n\n.content header > * {\n  height: 100%;\n}\n\n.content .heading {\n  grid-area: 1 / 2 / 2 / 3;\n  display: grid;\n  grid-template-columns: 3rem 1fr;\n  justify-items: start;\n  align-items: center;\n  padding-left: 3.85rem;\n}\n\n.heading .logo {\n  justify-self: start;\n}\n\n.heading h1 {\n  justify-self: start;\n  font-size: 2rem;\n}\n\n.header .view-options {\n  grid-area: 1 / 4 / 2 / 5;\n}\n\n.header .aside-icon {\n  grid-area: 1 / 1 / 2 / 2;\n  justify-items: center;\n  align-items: center;\n}\n\n.content aside {\n  grid-area: 2 / 1 / 3 / 2;\n  background-color: rgb(255, 249, 165);\n  display: grid;\n  grid-template-rows: 20rem 1fr 3rem;\n  row-gap: 5rem;\n  padding: 2rem;\n  padding-bottom: 1rem;\n}\n\n.content aside * {\n  font-size: 1.3rem;\n}\n\n.bar-types {\n  display: grid;\n  justify-items: stretch;\n  gap: 1rem;\n}\n\n.bar-types > * {\n  display: grid;\n  grid-template-columns: 2rem 1fr;\n  justify-items: start;\n  align-items: center;\n  gap: 0.3rem;\n  background-color: rgb(255, 238, 0);\n  border: 0.1rem solid whitesmoke;\n  border-radius: 0.5rem;\n  padding: 0.5rem 1rem;\n}\n\n.bar-projects {\n  display: grid;\n  grid-template-rows: 4.75rem 1fr;\n  gap: 1rem;\n  background-color: rgb(255, 238, 0);\n  border: 0.1rem solid whitesmoke;\n  border-radius: 0.5rem;\n  padding: 1rem;\n  padding-top: 0.5rem;\n}\n\n.bar-projects > * {\n  display: grid;\n  justify-items: start;\n  gap: 0.3rem;\n}\n\n.projects-menu {\n  display: grid;\n  grid-template-columns: 2rem 1fr 2rem;\n  align-content: center;\n  justify-items: start;\n  border-bottom: 1px solid black;\n}\n\n.projects-list {\n  display: grid;\n  align-content: start;\n  justify-items: stretch;\n}\n\n.bar-projects .project {\n  display: grid;\n  grid-template-columns: 2rem 1fr 2rem 2rem;\n  align-content: center;\n  justify-items: stretch;\n  background-color: whitesmoke;\n  padding: 0.5rem;\n  border-radius: 0.5rem;\n}\n\n.bar-projects .project span {\n  font-size: 1.2rem;\n  margin-left: 0.5rem;\n}\n\n.bar-footer {\n  display: grid;\n  justify-items: center;\n  place-content: center;\n  background-color: rgb(255, 238, 0);\n  border: 0.1rem solid whitesmoke;\n  border-radius: 0.5rem;\n  padding: 1rem;\n}\n\n.content main {\n  grid-area: 2 / 2 / 3 / 3;\n  background-color: whitesmoke;\n  display: grid;\n  grid-template-rows: 5rem auto 1fr 4em;\n  padding: 1rem 10rem;\n  gap: 2rem;\n}\n\nmain .header {\n  height: 100%;\n  grid-area: 1 / 1 / 2 / 2;\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  align-items: center;\n}\n\nmain .header img {\n  justify-self: end;\n  height: auto;\n}\n\nmain .header span {\n  font-size: 3rem;\n}\n\nmain .task-menu {\n  display: grid;\n  align-content: end;\n  grid-template-columns: auto 35rem 3rem;\n  justify-content: space-between;\n  gap: 0.75rem;\n  border-bottom: 1px solid black;\n}\n\n.buttons-task-submenu {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(7rem, 1fr));\n}\n\n.buttons-task-submenu > * {\n  background-color: rgb(255, 249, 165);\n  border-radius: 0.5rem;\n  padding: 0.5rem;\n  font-size: 1.2rem;\n}\n\n.task-menu > * {\n  border-radius: 0.5rem;\n  padding: 0.5rem;\n}\n\n.task-menu .task-number {\n  display: grid;\n  justify-items: start;\n  background: none;\n  padding-left: 1rem;\n}\n\n.task-menu span {\n  align-self: center;\n  justify-self: start;\n}\n\n.task-list {\n  display: grid;\n  grid-auto-rows: 4rem;\n  gap: 1rem;\n}\n\n.task {\n  display: grid;\n  background-color: white;\n  grid-template-columns: 2rem 1fr 10rem 2rem 2rem 2rem;\n  justify-items: stretch;\n  align-items: center;\n  border-radius: 0.5rem;\n  padding: 0.5rem 2rem;\n  gap: 2rem;\n}\n\n.task * {\n  font-size: 1.2rem;\n}\n`, \"\"]);\n// Exports\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);\n\n\n//# sourceURL=webpack://restaurant-page/./src/input.css?./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/dist/cjs.js");

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {

eval("\n\n/*\n  MIT License http://www.opensource.org/licenses/mit-license.php\n  Author Tobias Koppers @sokra\n*/\nmodule.exports = function (cssWithMappingToString) {\n  var list = [];\n\n  // return the list of modules as css string\n  list.toString = function toString() {\n    return this.map(function (item) {\n      var content = \"\";\n      var needLayer = typeof item[5] !== \"undefined\";\n      if (item[4]) {\n        content += \"@supports (\".concat(item[4], \") {\");\n      }\n      if (item[2]) {\n        content += \"@media \".concat(item[2], \" {\");\n      }\n      if (needLayer) {\n        content += \"@layer\".concat(item[5].length > 0 ? \" \".concat(item[5]) : \"\", \" {\");\n      }\n      content += cssWithMappingToString(item);\n      if (needLayer) {\n        content += \"}\";\n      }\n      if (item[2]) {\n        content += \"}\";\n      }\n      if (item[4]) {\n        content += \"}\";\n      }\n      return content;\n    }).join(\"\");\n  };\n\n  // import a list of modules into the list\n  list.i = function i(modules, media, dedupe, supports, layer) {\n    if (typeof modules === \"string\") {\n      modules = [[null, modules, undefined]];\n    }\n    var alreadyImportedModules = {};\n    if (dedupe) {\n      for (var k = 0; k < this.length; k++) {\n        var id = this[k][0];\n        if (id != null) {\n          alreadyImportedModules[id] = true;\n        }\n      }\n    }\n    for (var _k = 0; _k < modules.length; _k++) {\n      var item = [].concat(modules[_k]);\n      if (dedupe && alreadyImportedModules[item[0]]) {\n        continue;\n      }\n      if (typeof layer !== \"undefined\") {\n        if (typeof item[5] === \"undefined\") {\n          item[5] = layer;\n        } else {\n          item[1] = \"@layer\".concat(item[5].length > 0 ? \" \".concat(item[5]) : \"\", \" {\").concat(item[1], \"}\");\n          item[5] = layer;\n        }\n      }\n      if (media) {\n        if (!item[2]) {\n          item[2] = media;\n        } else {\n          item[1] = \"@media \".concat(item[2], \" {\").concat(item[1], \"}\");\n          item[2] = media;\n        }\n      }\n      if (supports) {\n        if (!item[4]) {\n          item[4] = \"\".concat(supports);\n        } else {\n          item[1] = \"@supports (\".concat(item[4], \") {\").concat(item[1], \"}\");\n          item[4] = supports;\n        }\n      }\n      list.push(item);\n    }\n  };\n  return list;\n};\n\n//# sourceURL=webpack://restaurant-page/./node_modules/css-loader/dist/runtime/api.js?");

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/getUrl.js":
/*!********************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/getUrl.js ***!
  \********************************************************/
/***/ ((module) => {

eval("\n\nmodule.exports = function (url, options) {\n  if (!options) {\n    options = {};\n  }\n  if (!url) {\n    return url;\n  }\n  url = String(url.__esModule ? url.default : url);\n\n  // If url is already wrapped in quotes, remove them\n  if (/^['\"].*['\"]$/.test(url)) {\n    url = url.slice(1, -1);\n  }\n  if (options.hash) {\n    url += options.hash;\n  }\n\n  // Should url be wrapped?\n  // See https://drafts.csswg.org/css-values-3/#urls\n  if (/[\"'() \\t\\n]|(%20)/.test(url) || options.needQuotes) {\n    return \"\\\"\".concat(url.replace(/\"/g, '\\\\\"').replace(/\\n/g, \"\\\\n\"), \"\\\"\");\n  }\n  return url;\n};\n\n//# sourceURL=webpack://restaurant-page/./node_modules/css-loader/dist/runtime/getUrl.js?");

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/noSourceMaps.js":
/*!**************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/noSourceMaps.js ***!
  \**************************************************************/
/***/ ((module) => {

eval("\n\nmodule.exports = function (i) {\n  return i[1];\n};\n\n//# sourceURL=webpack://restaurant-page/./node_modules/css-loader/dist/runtime/noSourceMaps.js?");

/***/ }),

/***/ "./src/input.css":
/*!***********************!*\
  !*** ./src/input.css ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ \"./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleDomAPI.js */ \"./node_modules/style-loader/dist/runtime/styleDomAPI.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertBySelector.js */ \"./node_modules/style-loader/dist/runtime/insertBySelector.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ \"./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertStyleElement.js */ \"./node_modules/style-loader/dist/runtime/insertStyleElement.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleTagTransform.js */ \"./node_modules/style-loader/dist/runtime/styleTagTransform.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var _node_modules_css_loader_dist_cjs_js_node_modules_postcss_loader_dist_cjs_js_input_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../node_modules/css-loader/dist/cjs.js!../node_modules/postcss-loader/dist/cjs.js!./input.css */ \"./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/dist/cjs.js!./src/input.css\");\n\n      \n      \n      \n      \n      \n      \n      \n      \n      \n\nvar options = {};\n\noptions.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());\noptions.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());\n\n      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, \"head\");\n    \noptions.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());\noptions.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());\n\nvar update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_node_modules_postcss_loader_dist_cjs_js_input_css__WEBPACK_IMPORTED_MODULE_6__[\"default\"], options);\n\n\n\n\n       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_node_modules_postcss_loader_dist_cjs_js_input_css__WEBPACK_IMPORTED_MODULE_6__[\"default\"] && _node_modules_css_loader_dist_cjs_js_node_modules_postcss_loader_dist_cjs_js_input_css__WEBPACK_IMPORTED_MODULE_6__[\"default\"].locals ? _node_modules_css_loader_dist_cjs_js_node_modules_postcss_loader_dist_cjs_js_input_css__WEBPACK_IMPORTED_MODULE_6__[\"default\"].locals : undefined);\n\n\n//# sourceURL=webpack://restaurant-page/./src/input.css?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {

eval("\n\nvar stylesInDOM = [];\nfunction getIndexByIdentifier(identifier) {\n  var result = -1;\n  for (var i = 0; i < stylesInDOM.length; i++) {\n    if (stylesInDOM[i].identifier === identifier) {\n      result = i;\n      break;\n    }\n  }\n  return result;\n}\nfunction modulesToDom(list, options) {\n  var idCountMap = {};\n  var identifiers = [];\n  for (var i = 0; i < list.length; i++) {\n    var item = list[i];\n    var id = options.base ? item[0] + options.base : item[0];\n    var count = idCountMap[id] || 0;\n    var identifier = \"\".concat(id, \" \").concat(count);\n    idCountMap[id] = count + 1;\n    var indexByIdentifier = getIndexByIdentifier(identifier);\n    var obj = {\n      css: item[1],\n      media: item[2],\n      sourceMap: item[3],\n      supports: item[4],\n      layer: item[5]\n    };\n    if (indexByIdentifier !== -1) {\n      stylesInDOM[indexByIdentifier].references++;\n      stylesInDOM[indexByIdentifier].updater(obj);\n    } else {\n      var updater = addElementStyle(obj, options);\n      options.byIndex = i;\n      stylesInDOM.splice(i, 0, {\n        identifier: identifier,\n        updater: updater,\n        references: 1\n      });\n    }\n    identifiers.push(identifier);\n  }\n  return identifiers;\n}\nfunction addElementStyle(obj, options) {\n  var api = options.domAPI(options);\n  api.update(obj);\n  var updater = function updater(newObj) {\n    if (newObj) {\n      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {\n        return;\n      }\n      api.update(obj = newObj);\n    } else {\n      api.remove();\n    }\n  };\n  return updater;\n}\nmodule.exports = function (list, options) {\n  options = options || {};\n  list = list || [];\n  var lastIdentifiers = modulesToDom(list, options);\n  return function update(newList) {\n    newList = newList || [];\n    for (var i = 0; i < lastIdentifiers.length; i++) {\n      var identifier = lastIdentifiers[i];\n      var index = getIndexByIdentifier(identifier);\n      stylesInDOM[index].references--;\n    }\n    var newLastIdentifiers = modulesToDom(newList, options);\n    for (var _i = 0; _i < lastIdentifiers.length; _i++) {\n      var _identifier = lastIdentifiers[_i];\n      var _index = getIndexByIdentifier(_identifier);\n      if (stylesInDOM[_index].references === 0) {\n        stylesInDOM[_index].updater();\n        stylesInDOM.splice(_index, 1);\n      }\n    }\n    lastIdentifiers = newLastIdentifiers;\n  };\n};\n\n//# sourceURL=webpack://restaurant-page/./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {

eval("\n\nvar memo = {};\n\n/* istanbul ignore next  */\nfunction getTarget(target) {\n  if (typeof memo[target] === \"undefined\") {\n    var styleTarget = document.querySelector(target);\n\n    // Special case to return head of iframe instead of iframe itself\n    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {\n      try {\n        // This will throw an exception if access to iframe is blocked\n        // due to cross-origin restrictions\n        styleTarget = styleTarget.contentDocument.head;\n      } catch (e) {\n        // istanbul ignore next\n        styleTarget = null;\n      }\n    }\n    memo[target] = styleTarget;\n  }\n  return memo[target];\n}\n\n/* istanbul ignore next  */\nfunction insertBySelector(insert, style) {\n  var target = getTarget(insert);\n  if (!target) {\n    throw new Error(\"Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.\");\n  }\n  target.appendChild(style);\n}\nmodule.exports = insertBySelector;\n\n//# sourceURL=webpack://restaurant-page/./node_modules/style-loader/dist/runtime/insertBySelector.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {

eval("\n\n/* istanbul ignore next  */\nfunction insertStyleElement(options) {\n  var element = document.createElement(\"style\");\n  options.setAttributes(element, options.attributes);\n  options.insert(element, options.options);\n  return element;\n}\nmodule.exports = insertStyleElement;\n\n//# sourceURL=webpack://restaurant-page/./node_modules/style-loader/dist/runtime/insertStyleElement.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\n\n/* istanbul ignore next  */\nfunction setAttributesWithoutAttributes(styleElement) {\n  var nonce =  true ? __webpack_require__.nc : 0;\n  if (nonce) {\n    styleElement.setAttribute(\"nonce\", nonce);\n  }\n}\nmodule.exports = setAttributesWithoutAttributes;\n\n//# sourceURL=webpack://restaurant-page/./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {

eval("\n\n/* istanbul ignore next  */\nfunction apply(styleElement, options, obj) {\n  var css = \"\";\n  if (obj.supports) {\n    css += \"@supports (\".concat(obj.supports, \") {\");\n  }\n  if (obj.media) {\n    css += \"@media \".concat(obj.media, \" {\");\n  }\n  var needLayer = typeof obj.layer !== \"undefined\";\n  if (needLayer) {\n    css += \"@layer\".concat(obj.layer.length > 0 ? \" \".concat(obj.layer) : \"\", \" {\");\n  }\n  css += obj.css;\n  if (needLayer) {\n    css += \"}\";\n  }\n  if (obj.media) {\n    css += \"}\";\n  }\n  if (obj.supports) {\n    css += \"}\";\n  }\n  var sourceMap = obj.sourceMap;\n  if (sourceMap && typeof btoa !== \"undefined\") {\n    css += \"\\n/*# sourceMappingURL=data:application/json;base64,\".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), \" */\");\n  }\n\n  // For old IE\n  /* istanbul ignore if  */\n  options.styleTagTransform(css, styleElement, options.options);\n}\nfunction removeStyleElement(styleElement) {\n  // istanbul ignore if\n  if (styleElement.parentNode === null) {\n    return false;\n  }\n  styleElement.parentNode.removeChild(styleElement);\n}\n\n/* istanbul ignore next  */\nfunction domAPI(options) {\n  if (typeof document === \"undefined\") {\n    return {\n      update: function update() {},\n      remove: function remove() {}\n    };\n  }\n  var styleElement = options.insertStyleElement(options);\n  return {\n    update: function update(obj) {\n      apply(styleElement, options, obj);\n    },\n    remove: function remove() {\n      removeStyleElement(styleElement);\n    }\n  };\n}\nmodule.exports = domAPI;\n\n//# sourceURL=webpack://restaurant-page/./node_modules/style-loader/dist/runtime/styleDomAPI.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ ((module) => {

eval("\n\n/* istanbul ignore next  */\nfunction styleTagTransform(css, styleElement) {\n  if (styleElement.styleSheet) {\n    styleElement.styleSheet.cssText = css;\n  } else {\n    while (styleElement.firstChild) {\n      styleElement.removeChild(styleElement.firstChild);\n    }\n    styleElement.appendChild(document.createTextNode(css));\n  }\n}\nmodule.exports = styleTagTransform;\n\n//# sourceURL=webpack://restaurant-page/./node_modules/style-loader/dist/runtime/styleTagTransform.js?");

/***/ }),

/***/ "./src/components/page.js":
/*!********************************!*\
  !*** ./src/components/page.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils.js */ \"./src/components/utils.js\");\n\n\nconst content = document.querySelector('.content');\n\nconst header = (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.createElementWithAttributes)('header', {}, content);\n\nconst asideIcon = (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.createElementWithAttributes)('div', {class: `aside-icon`}, header);\n\nconst heading = (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.createElementWithAttributes)('div', {class: `heading`}, header);\n\nconst logoIcon = (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.createElementWithAttributes)('img', { \n    src: '../src/originals/fav-icon.svg',\n    class: `logo`,\n    alt: `ToDo List logo`}, heading);\n\nconst headingText = (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.createElementWithAttributes)('h1', {}, heading);\nheadingText.textContent = `ToDo List`;\n\nconst emptyDiv = (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.createElementWithAttributes)('div', {}, header);\n\nconst viewOptionsIcon = (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.createElementWithAttributes)('img', { \n    src: '../src/originals/view-options.svg',\n    class: `view-options`,\n    alt: `View Options logo`}, header);\n\nconst sidebar = (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.createElementWithAttributes)('aside', {}, content);\n\nconst barTypes = (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.createElementWithAttributes)('div', {class: `bar-types`}, sidebar);\n\nconst tasksAll = (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.createElementWithAttributes)('div', {class: `tasks-all`}, barTypes);\nconst tasksAllImage = (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.createElementWithAttributes)('img', { \n    src: '../src/originals/calendar-all.svg',\n    alt: `All tasks icon`\n}, tasksAll);\nconst tasksAllText = (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.createElementWithAttributes)('span', {}, tasksAll);\ntasksAllText.textContent = `All`;\n\nconst tasksToday = (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.createElementWithAttributes)('div', {class: `tasks-today`}, barTypes);\nconst tasksTodayImage = (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.createElementWithAttributes)('img', {\n    src: '../src/originals/calendar-today.svg',\n    alt: `Today tasks icon`\n}, tasksToday);\nconst tasksTodayText = (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.createElementWithAttributes)('span', {}, tasksToday);\ntasksTodayText.textContent = `Today`;\n\nconst tasksWeek = (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.createElementWithAttributes)('div', {class: `tasks-week`}, barTypes);\nconst tasksWeekImage = (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.createElementWithAttributes)('img', {\n    src: '../src/originals/calendar-week.svg',\n    alt: `Week tasks icon`\n}, tasksWeek);\nconst tasksWeekText = (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.createElementWithAttributes)('span', {}, tasksWeek);\ntasksWeekText.textContent = `Week`;\n\nconst tasksCompleted = (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.createElementWithAttributes)('div', {class: `tasks-Completed`}, barTypes);\nconst tasksCompletedImage = (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.createElementWithAttributes)('img', {\n    src: '../src/originals/calendar-finished.svg',\n    alt: `Completed tasks icon`\n}, tasksCompleted);\nconst tasksCompletedText = (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.createElementWithAttributes)('span', {}, tasksCompleted);\ntasksCompletedText.textContent = `Completed`;\n\nconst barProjects = (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.createElementWithAttributes)('div', {class: `bar-projects`}, sidebar);\n\nconst projectsMenu = (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.createElementWithAttributes)('div', {class: `projects-menu`}, barProjects);\nconst projectsMenuImage = (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.createElementWithAttributes)('img', {\n    src: '../src/originals/projects.svg',\n    alt: `Projects icon`\n}, projectsMenu);\nconst projectsMenuText = (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.createElementWithAttributes)('span', {}, projectsMenu);\nprojectsMenuText.textContent = `Projects (0)`;\nconst projectsMenuAddImage = (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.createElementWithAttributes)('img', {\n    src: '../src/originals/add-new.svg',\n    alt: `Add new project icon`\n}, projectsMenu);\n\nconst projectsList = (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.createElementWithAttributes)('ul', {class: `projects-list`}, barProjects);\n\nconst exampleProject = (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.createElementWithAttributes)('li', { class: `project`, data: `0` }, projectsList);\nconst exampleProjectImage = (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.createElementWithAttributes)('img', {\n    src: '../src/originals/category-other.svg',\n    alt: `Add new project icon`\n}, exampleProject);\nconst exampleProjectText = (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.createElementWithAttributes)('span', {}, exampleProject);\nexampleProjectText.textContent = `New project`;\nconst exampleProjectEditImage = (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.createElementWithAttributes)('img', {\n    src: '../src/originals/edit.svg',\n    alt: `Edit project icon`\n}, exampleProject);\nconst exampleProjectDeleteImage = (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.createElementWithAttributes)('img', {\n    src: '../src/originals/delete.svg',\n    alt: `Remove project icon`\n}, exampleProject);\n\n\nconst barFooter = (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.createElementWithAttributes)('div', {class: `bar-footer`}, sidebar);\n\nconst footerText = (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.createElementWithAttributes)('span', {}, barFooter);\nfooterText.textContent = `\\u00A9 F3GR, 2023`;\n\nconst main = (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.createElementWithAttributes)('main', {}, content);\n\nconst mainHeadBox = (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.createElementWithAttributes)('div', {class: `header`}, main);\nconst mainHeadImage = (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.createElementWithAttributes)('img', { \n    src: '../src/originals/calendar-all.svg',\n    alt: `All tasks icon`\n}, mainHeadBox);\nconst mainHeadText = (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.createElementWithAttributes)('span', {}, mainHeadBox);\nmainHeadText.textContent = \"All\";\n\nconst mainTaskMenu = (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.createElementWithAttributes)('div', {class: `task-menu`}, main);\n\nconst mainTaskNumber = (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.createElementWithAttributes)('div', {class: `task-number`}, mainTaskMenu);\nconst taskMenuText = (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.createElementWithAttributes)('span', {}, mainTaskNumber);\ntaskMenuText.textContent = `Tasks (0)`;\n\nconst buttonsTaskSubMenu = (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.createElementWithAttributes)('div', {class: `buttons-task-submenu`}, mainTaskMenu);\n\nconst buttonHighPriority = (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.createElementWithAttributes)('button', {class: `high-priority`}, buttonsTaskSubMenu);\nbuttonHighPriority.textContent = `High`;\n\nconst buttonMediumPriority = (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.createElementWithAttributes)('button', {class: `medium-priority`}, buttonsTaskSubMenu);\nbuttonMediumPriority.textContent = `Medium`;\n\nconst buttonNormalPriority = (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.createElementWithAttributes)('button', {class: `normal-priority`}, buttonsTaskSubMenu);\nbuttonNormalPriority.textContent = `Normal`;\n\nconst selectSortOption = (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.createElementWithAttributes)('select', {name: `sorting-option`}, buttonsTaskSubMenu);\nselectSortOption.textContent = `Sort by: `;\n\nconst sortByDate = (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.createElementWithAttributes)('option', {value: `date-from-oldest`},selectSortOption);\nsortByDate.textContent = `Date`;\n\nconst sortByPriority = (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.createElementWithAttributes)('option', {value: `priority-from-highest`},selectSortOption);\nsortByPriority.textContent = `Priority`;\n\nconst sortByStatus = (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.createElementWithAttributes)('option', {value: `priority-from-due`},selectSortOption);\nsortByStatus.textContent = `Status`;\n\nconst addNewProjectIcon = (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.createElementWithAttributes)('img', { \n    src: '../src/originals/add-new.svg',\n    alt: `Add new project icon`\n}, mainTaskMenu);\n\nconst taskList = (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.createElementWithAttributes)('ul', {class: `task-list`}, main);\n\nconst exampleTask = (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.createElementWithAttributes)('li', {class: `task`, data: `0`}, taskList);\n\nconst taskStatusIcon  = (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.createElementWithAttributes)('img', {\n    src: `../src/originals/radio-unchecked.svg`, \n    alt: `Task status icon`\n}, exampleTask);\n\nconst taskNameBox = (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.createElementWithAttributes)('div', {class: `task-name-box`}, exampleTask);\nconst taskName = (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.createElementWithAttributes)('span', {class: `task-name-box`}, taskNameBox);\ntaskName.textContent = `New task`;\n\nconst taskDueDateBox = (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.createElementWithAttributes)('div', {class: `task-due-date`, }, exampleTask);\nconst taskDueDateText = (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.createElementWithAttributes)('span', {class: ``, }, taskDueDateBox);\ntaskDueDateText.textContent = `2023-01-07`;\n\nconst taskEditIcon = (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.createElementWithAttributes)('img', {\n    src: `../src/originals/edit.svg`, \n    alt: `Task edit information icon`\n}, exampleTask);\n\nconst taskRemoveIcon = (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.createElementWithAttributes)('img', {\n    src: `../src/originals/delete.svg`, \n    alt: `Task remove icon`\n}, exampleTask);\n\nconst taskUnfoldIcon = (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.createElementWithAttributes)('img', {\n    src: `../src/originals/unfold.svg`, \n    alt: `Task information unfold or fold icon`\n}, exampleTask);\n\n//# sourceURL=webpack://restaurant-page/./src/components/page.js?");

/***/ }),

/***/ "./src/components/utils.js":
/*!*********************************!*\
  !*** ./src/components/utils.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   checkIfCurrent: () => (/* binding */ checkIfCurrent),\n/* harmony export */   createElementWithAttributes: () => (/* binding */ createElementWithAttributes),\n/* harmony export */   removeCurrentStatus: () => (/* binding */ removeCurrentStatus)\n/* harmony export */ });\nfunction createElementWithAttributes(tagName, attributes = {}, parentElement) {\n    const element = document.createElement(tagName);\n  \n    Object.entries(attributes).forEach(([key, value]) => {\n      element.setAttribute(key, value);\n    });\n  \n    if (parentElement) {\n      parentElement.appendChild(element);\n    }\n  \n    return element;\n}\n\nfunction checkIfCurrent(element) {\n  if (element.getAttribute('data-value') === 'current') {\n    return true;\n  }\n  return false;\n}\n\nfunction removeCurrentStatus(element) {\n  element.removeAttribute('data-value');\n}\n\n//# sourceURL=webpack://restaurant-page/./src/components/utils.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _components_utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/utils.js */ \"./src/components/utils.js\");\n/* harmony import */ var _input_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./input.css */ \"./src/input.css\");\n/* harmony import */ var _components_page_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/page.js */ \"./src/components/page.js\");\nObject(function webpackMissingModule() { var e = new Error(\"Cannot find module './components/app.js'\"); e.code = 'MODULE_NOT_FOUND'; throw e; }());\n\n\n\n\n\n(function() {\n})();\n\n\n//# sourceURL=webpack://restaurant-page/./src/index.js?");

/***/ }),

/***/ "./src/originals/NotoSans-Medium.ttf":
/*!*******************************************!*\
  !*** ./src/originals/NotoSans-Medium.ttf ***!
  \*******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("module.exports = __webpack_require__.p + \"93b8fac456d54c025376.ttf\";\n\n//# sourceURL=webpack://restaurant-page/./src/originals/NotoSans-Medium.ttf?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript)
/******/ 				scriptUrl = document.currentScript.src;
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) {
/******/ 					var i = scripts.length - 1;
/******/ 					while (i > -1 && !scriptUrl) scriptUrl = scripts[i--].src;
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		__webpack_require__.b = document.baseURI || self.location.href;
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"main": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		// no on chunks loaded
/******/ 		
/******/ 		// no jsonp function
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;