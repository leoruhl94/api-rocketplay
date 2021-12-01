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

/***/ "./index.ts":
/*!******************!*\
  !*** ./index.ts ***!
  \******************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\r\nvar __importDefault = (this && this.__importDefault) || function (mod) {\r\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\r\n};\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nconst app_1 = __importDefault(__webpack_require__(/*! ./src/app */ \"./src/app.ts\"));\r\nconst { PORT = 3002, } = process.env;\r\napp_1.default.listen(PORT, () => {\r\n    console.log(`App listening on port ${PORT}`);\r\n});\r\n\n\n//# sourceURL=webpack://api-rocketplay/./index.ts?");

/***/ }),

/***/ "./src/app.ts":
/*!********************!*\
  !*** ./src/app.ts ***!
  \********************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\r\nvar __importDefault = (this && this.__importDefault) || function (mod) {\r\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\r\n};\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nconst express_1 = __importDefault(__webpack_require__(/*! express */ \"express\"));\r\nconst morgan_1 = __importDefault(__webpack_require__(/*! morgan */ \"morgan\"));\r\n//import routes from './Routes';\r\nconst errorHandler_1 = __importDefault(__webpack_require__(/*! ./middlewares/errorHandler */ \"./src/middlewares/errorHandler.ts\"));\r\nconst setHeaders_1 = __importDefault(__webpack_require__(/*! ./middlewares/setHeaders */ \"./src/middlewares/setHeaders.ts\"));\r\nconst server = (0, express_1.default)();\r\nserver.use(express_1.default.urlencoded({ extended: true, limit: \"50mb\" }));\r\nserver.use(express_1.default.json({ limit: \"50mb\" }));\r\nserver.use((0, morgan_1.default)('tiny'));\r\nserver.use(setHeaders_1.default);\r\n//server.use('/', routes);\r\nserver.use(errorHandler_1.default);\r\nserver.get('/home', (req, res) => {\r\n    return res.json('Hello, we are up and running!');\r\n});\r\nexports[\"default\"] = server;\r\n\n\n//# sourceURL=webpack://api-rocketplay/./src/app.ts?");

/***/ }),

/***/ "./src/config/config.ts":
/*!******************************!*\
  !*** ./src/config/config.ts ***!
  \******************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\r\n(__webpack_require__(/*! dotenv */ \"dotenv\").config)();\r\nconst config = {\r\n    env: \"development\" || 0,\r\n    isProd: \"development\" === 'production',\r\n    port: process.env.PORT || 3002,\r\n    dbUser: process.env.DB_USER,\r\n    dbHost: process.env.DB_HOST,\r\n    dbName: process.env.DB_NAME,\r\n    dbPort: process.env.DB_PORT,\r\n    dbPassword: process.env.DB_PASSWORD,\r\n    // en el archivo .env hay q usar comillas dobles y no backticks \r\n    // DATABASE_URL=\"postgres://postgres:38644082@localhost:5432/RocketPlay\";\r\n    dbUrl: process.env.DATABASE_URL,\r\n};\r\nmodule.exports = config;\r\n\n\n//# sourceURL=webpack://api-rocketplay/./src/config/config.ts?");

/***/ }),

/***/ "./src/middlewares/errorHandler.ts":
/*!*****************************************!*\
  !*** ./src/middlewares/errorHandler.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nconst errorHandler = ((err, req, res, next) => {\r\n    const status = err.status || 500;\r\n    const message = err.message || err;\r\n    console.error(err);\r\n    res.status(status).send(message);\r\n});\r\nexports[\"default\"] = errorHandler;\r\n\n\n//# sourceURL=webpack://api-rocketplay/./src/middlewares/errorHandler.ts?");

/***/ }),

/***/ "./src/middlewares/setHeaders.ts":
/*!***************************************!*\
  !*** ./src/middlewares/setHeaders.ts ***!
  \***************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\r\nvar __importDefault = (this && this.__importDefault) || function (mod) {\r\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\r\n};\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nconst cors_1 = __importDefault(__webpack_require__(/*! cors */ \"cors\"));\r\nconst config = __webpack_require__(/*! ../config/config */ \"./src/config/config.ts\");\r\n// import config from '../config/config';\r\nconst setHeaders = ((req, res, next) => {\r\n    (0, cors_1.default)({\r\n        origin: config.cors,\r\n        credentials: true,\r\n        methods: ['GET', 'POST', 'OPTIONS', 'PUT', 'DELETE'],\r\n        allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept'],\r\n    });\r\n    next();\r\n});\r\nexports[\"default\"] = setHeaders;\r\n\n\n//# sourceURL=webpack://api-rocketplay/./src/middlewares/setHeaders.ts?");

/***/ }),

/***/ "cors":
/*!***********************!*\
  !*** external "cors" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("cors");

/***/ }),

/***/ "dotenv":
/*!*************************!*\
  !*** external "dotenv" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("dotenv");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/***/ ((module) => {

module.exports = require("express");

/***/ }),

/***/ "morgan":
/*!*************************!*\
  !*** external "morgan" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("morgan");

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
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./index.ts");
/******/ 	
/******/ })()
;