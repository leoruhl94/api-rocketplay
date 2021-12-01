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

/***/ "./src/Routes/aboutUs.ts":
/*!*******************************!*\
  !*** ./src/Routes/aboutUs.ts ***!
  \*******************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\r\nvar __importDefault = (this && this.__importDefault) || function (mod) {\r\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\r\n};\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nconst express_1 = __importDefault(__webpack_require__(/*! express */ \"express\"));\r\nconst aboutUs_1 = __importDefault(__webpack_require__(/*! ../controllers/aboutUs */ \"./src/controllers/aboutUs.ts\"));\r\nconst router = (0, express_1.default)();\r\nrouter.use(\"/\", aboutUs_1.default);\r\nexports[\"default\"] = router;\r\n\n\n//# sourceURL=webpack://api-rocketplay/./src/Routes/aboutUs.ts?");

/***/ }),

/***/ "./src/Routes/index.ts":
/*!*****************************!*\
  !*** ./src/Routes/index.ts ***!
  \*****************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\r\nvar __importDefault = (this && this.__importDefault) || function (mod) {\r\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\r\n};\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nconst express_1 = __importDefault(__webpack_require__(/*! express */ \"express\"));\r\nconst router = (0, express_1.default)();\r\nconst aboutUs_1 = __importDefault(__webpack_require__(/*! ./aboutUs */ \"./src/Routes/aboutUs.ts\"));\r\nrouter.use(\"/aboutUs\", aboutUs_1.default);\r\nexports[\"default\"] = router;\r\n\n\n//# sourceURL=webpack://api-rocketplay/./src/Routes/index.ts?");

/***/ }),

/***/ "./src/app.ts":
/*!********************!*\
  !*** ./src/app.ts ***!
  \********************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\r\nvar __importDefault = (this && this.__importDefault) || function (mod) {\r\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\r\n};\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nconst express_1 = __importDefault(__webpack_require__(/*! express */ \"express\"));\r\nconst morgan_1 = __importDefault(__webpack_require__(/*! morgan */ \"morgan\"));\r\nconst Routes_1 = __importDefault(__webpack_require__(/*! ./Routes */ \"./src/Routes/index.ts\"));\r\nconst errorHandler_1 = __importDefault(__webpack_require__(/*! ./middlewares/errorHandler */ \"./src/middlewares/errorHandler.ts\"));\r\nconst setHeaders_1 = __importDefault(__webpack_require__(/*! ./middlewares/setHeaders */ \"./src/middlewares/setHeaders.ts\"));\r\nconst server = (0, express_1.default)();\r\nserver.use(express_1.default.urlencoded({ extended: true, limit: \"50mb\" }));\r\nserver.use(express_1.default.json({ limit: \"50mb\" }));\r\nserver.use((0, morgan_1.default)('tiny'));\r\nserver.use(setHeaders_1.default);\r\nserver.use('/', Routes_1.default);\r\nserver.use(errorHandler_1.default);\r\nserver.get('/home', (req, res) => {\r\n    return res.json('Hello, we are up and running!');\r\n});\r\nexports[\"default\"] = server;\r\n\n\n//# sourceURL=webpack://api-rocketplay/./src/app.ts?");

/***/ }),

/***/ "./src/config/config.ts":
/*!******************************!*\
  !*** ./src/config/config.ts ***!
  \******************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\r\n(__webpack_require__(/*! dotenv */ \"dotenv\").config)();\r\nconst config = {\r\n    env: \"development\" || 0,\r\n    isProd: \"development\" === 'production',\r\n    port: process.env.PORT || 3002,\r\n    dbUser: process.env.DB_USER,\r\n    dbHost: process.env.DB_HOST,\r\n    dbName: process.env.DB_NAME,\r\n    dbPort: process.env.DB_PORT,\r\n    dbPassword: process.env.DB_PASSWORD,\r\n    // en el archivo .env hay q usar comillas dobles y no backticks \r\n    // DATABASE_URL=\"postgres://postgres:38644082@localhost:5432/RocketPlay\";\r\n    dbUrl: process.env.DATABASE_URL,\r\n};\r\nmodule.exports = config;\r\n\n\n//# sourceURL=webpack://api-rocketplay/./src/config/config.ts?");

/***/ }),

/***/ "./src/controllers/aboutUs.ts":
/*!************************************!*\
  !*** ./src/controllers/aboutUs.ts ***!
  \************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\r\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\r\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\r\n    return new (P || (P = Promise))(function (resolve, reject) {\r\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\r\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\r\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\r\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\r\n    });\r\n};\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nconst express_1 = __webpack_require__(/*! express */ \"express\");\r\nconst router = (0, express_1.Router)();\r\nrouter.get(\"/\", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {\r\n    try {\r\n        const aboutUs = [\r\n            {\r\n                id: 1,\r\n                name: \"Franco Alfano\",\r\n                links: {\r\n                    LinkedIn: \"https://www.linkedin.com/in/franco-alfano-4a6a7b216/\",\r\n                    GitHub: \"https://github.com/Kofrantz\",\r\n                },\r\n                photo: \"https://avatars.githubusercontent.com/u/88412878?v=4\",\r\n                description: `¿Quién soy?🤔\r\n        🔸Me llamo Franco y soy desarrollador web full Stack. Desde mi adolescencia me apasiona la programación y siempre busco oportunidades de aprender y mejorar. Mi especialidad son Javascript, HTML y CSS, y herramientas de desarrollo como React.js y Express.js. También me gusta incursionar en otros lenguajes como Python y C#.\r\n        \r\n        ¿Por qué yo?❔\r\n        🔸La pasión que me genera programar me motiva a aprender todo el tiempo y mejorar en lo que ya sé. Tengo la capacidad de adaptarme a cualquier entorno, y de aprender por mi cuenta lo que necesite para cumplir un objetivo.\r\n        \r\n        Experiencia📋\r\n        🔸Mi experiencia se encuentra principalmente en el Bootcamp que estoy cursando actualmente, donde pude potenciar mis conocimientos, y construí una pagina web y una API Rest que trabaja en conjunto, como proyecto individual del Bootcamp, en solo un par de semanas (Enlace: https://pikaboss.herokuapp.com/)\r\n        🔸Por mi cuenta, desarrollé otros proyectos con conocimientos que adquirí de manera autodidacta, relacionados con:\r\n        ◾Desarrollo de Videojuegos con Unity Engine (C#)\r\n        ◾Computer Vision con Python, OpenCV y MediaPipe\r\n        ◾Modelado 3D con Blender\r\n        ◾Proyectos avanzados en Excel con Visual Basic\r\n        \r\n        Contacto:\r\n        Mail: franco.Alfano1404@gmail.com\r\n        WhatsApp: +54 9 351 671 5181`,\r\n            },\r\n            {\r\n                id: 2,\r\n                name: \"Agustin Bringas\",\r\n                links: {\r\n                    LinkedIn: \"https://www.linkedin.com/in/francisco-agustin-bringas/\",\r\n                    GitHub: \"https://github.com/AgustinBringas\",\r\n                },\r\n                photo: \"https://avatars.githubusercontent.com/u/67709252?v=4\",\r\n                description: `Introduction:\r\n        ◻ I'm a Full Stack Developer with experience in Front-End and Back-End development. I studied Software Engineer for 3 year before descovering Soy Henry. I got more than 800+ programming in SoyHenry's bootcamp where I developed new knowledge in the IT field.\r\n        \r\n        Qualities:\r\n        ◻ Although all the members of this community have excellent technical skills, I excel at solving problems, listening to the team, and I'm always willing to teach and learn from others.\r\n        \r\n        Technologies:\r\n        ◻ JavaScript\r\n        ◻ Front-End: HTML5, CSS3, React, Redux, React Native\r\n        ◻ Back-End: NodeJS, Express, Sequelize, PostgreSQL\r\n        ◻ Extras: Git, Github, Slack, Trello, Scrum\r\n        \r\n        Contact:\r\n        ◻ U can message me here or send a mail to agustin.bringas.2107@gmail.com`,\r\n            },\r\n            {\r\n                id: 3,\r\n                name: \"Elias Delgado\",\r\n                links: {\r\n                    LinkedIn: \"https://www.linkedin.com/in/delgadoelias-fullstackweb/\",\r\n                    GitHub: \"https://github.com/DelgadoElias\",\r\n                },\r\n                photo: \"https://avatars.githubusercontent.com/u/82496172?v=4\",\r\n                description: `Técnico informático personal y profesional. Al graduarme del nivel secundario mi pasión por la programación me llevó a aplicar un bootcamp donde aprendí todo lo relacionado al desarrollo web con tecnologías de vanguardia. Con todo lo aprendido, estoy más creativo, autodidacta y apasionado por aprender cada día más, sabiendo que estoy más cerca de mis objetivos.\r\n\r\n        ►FrontEnd: Angular, React, Bootstrap, JavaScript, Typescript, HTML5, CSS3.\r\n        ►BackEnd: Node.Js, Express.\r\n        ►Bases de datos: SQL, Postgres, Sequelize, MongoDB.\r\n        ►Gestión de Versiones: GIT, GitHub.\r\n        ►Gestión de proyectos: SCRUM, Trello, Notion.\r\n        ►Móvil: Android + Kotlin (básico).\r\n        \r\n        ¿Querés saber más de mi?\r\n        Email: eliaslautarodelgado@gmail.com\r\n        WP: https://wa.link/uxonlm`,\r\n            },\r\n            {\r\n                id: 4,\r\n                name: \"Pablo Martinez\",\r\n                links: {\r\n                    LinkedIn: \"https://www.linkedin.com/in/pablomartinez-js/\",\r\n                    GitHub: \"https://github.com/LOLE81\",\r\n                },\r\n                photo: \"https://avatars.githubusercontent.com/u/87158728?v=4\",\r\n                description: `Who am I? ✋ 📌 I'm Pablo, but every calls me Lole. This year I found in programming a new passion. Now I can say that I'm close to be a Full Stack Web Developer. I'm finding my path in this wonderful world which is programming, and learning all the time. 📋 I've been working as a trader in the agricultural area for many years, with experience in commodities as soybeans, corn, wheat, barley and others. I've decided to change that way of life, today I'm looking forward to learn and apply all kind of knowledge related to this new passion. 🔍 I'm looking for new experiences and hoping to have the chance to contribute with my knowledges and continue learning, to improve as a professional. 💪 I really like to work in teams and also enjoy working alone if necessary. 💻 I've been studying languages and techs as JavaScript, HTML, CSS, React, Redux, NodeJs, Express, PostgreSQL, Sequelize, and others as Babel, Webpack, TypeScript, and a never ending list of \"to learn in the future...\" 📨Contact me: ◻ E-mail: martinezpm@gmail.com ◻ GitHub: https://github.com/LOLE81/ ◻ Twitter: @LOLE81PM ◻ Whatsapp: https://wa.link/x3n03h`,\r\n            },\r\n            {\r\n                id: 5,\r\n                name: \"Jimena Medina\",\r\n                links: {\r\n                    LinkedIn: \"https://www.linkedin.com/in/jimena-medina-javascript/\",\r\n                    GitHub: \"https://github.com/Jime227\",\r\n                },\r\n                photo: \"https://avatars.githubusercontent.com/u/86322114?v=4\",\r\n                description: `Hello there! I'm currently working on my group project at Henry Bootcamp to finish my training as a Full Stack Developer.\r\n        I'm in the middle of a life make-over, looking for new challenges as I change my career path.\r\n        At Henry, I have learned so far JavaScrip, Node, React, Redux, Express, Sequelize among a few more technologies. I'm a curious person, that believes that we should never stop learning which keeps me always on the lookout for a new adventure.\r\n        I'm a social person that enjoys working in teams, participating in meetings and get-togethers.\r\n        Love reading! Big fan of the Harry Potter world!\r\n        Part of a homeschooling family that encourages self-teaching, mentoring, and hands-on learning that allowed me to get very good communicating skills, learn to be an active listener, and adapt to change fast.`,\r\n            },\r\n            {\r\n                id: 6,\r\n                name: \"Leonardo Ruhl\",\r\n                links: {\r\n                    LinkedIn: \"https://www.linkedin.com/in/leonardo-ruhl/\",\r\n                    GitHub: \"https://github.com/leoruhl94\",\r\n                },\r\n                photo: \"https://avatars.githubusercontent.com/u/41834037?v=4\",\r\n                description: `Hola!! Mi nombre es Leo y Soy Full Stack Developer con experiencia en el desarrollo de aplicaciones Front-end y Back-end. Me apasiona Programar, Enseñar y encarar nuevos desafíos que continuamente me permitan aprender algo nuevo.\r\n\r\n        Desde la infancia me ha gustado crear cosas, decidí entrar al mundo IT porque para crear algo grandioso, el único limite que existe es tu imaginación.\r\n        Desde entonces no dejo de sorprenderme de lo que se puede lograr trabajando en equipo y con solo unas líneas de código.\r\n        \r\n        🔍Estoy en búsqueda de nuevos desafíos donde pueda aportar mi experiencia y conocimientos. Busco un puesto que me permita seguir aprendiendo y desarrollarme como profesional.\r\n        \r\n        🧠Me considero una persona autodidacta, actualmente estoy estudiando tecnologías de Front-end para especializarme en esa área de desarrollo.\r\n        \r\n        💡Tecnologías\r\n        ◻ Lenguaje de programación: JavaScript, TypeScript\r\n        ◻ Desarrollo Front-End: HTML5, CSS3, React, Redux, React Native\r\n        ◻ Desarrollo Back-End: NodeJS, Express, Sequelize, PostgreSQL\r\n        ◻ Otros: Webpack, Git, Github, Slack, Trello, Jira, Heroku, Scrum, FileZilla\r\n        \r\n        📨Contacto\r\n        ◻ E-mail: Leoruhl94@gmail.com\r\n        ◻ Github: https://github.com/leoruhl94\r\n        ◻ Whatsapp: wa.link/x4hwcq`,\r\n            },\r\n            {\r\n                id: 7,\r\n                name: \"Daniel Sereno\",\r\n                links: {\r\n                    LinkedIn: \"https://www.linkedin.com/in/danielserenopd/\",\r\n                    GitHub: \"https://github.com/DanielSerenoPD\",\r\n                },\r\n                photo: \"https://avatars.githubusercontent.com/u/86926807?v=4\",\r\n                description: `Quién soy? ✋\r\n        📌 Soy un desarrollador Web Full Stack con conocimientos en JavaScript, Java y Python 👨‍💻. me siento muy cómodo desarrollando apps con tecnologías como React, Redux, Node, Express y Sequelize. Disfruto bastante el sentarme y ponerme a codear todo lo que veo en mi día a día, me siento poderoso cuando veo algo y me digo a mi mismo,\"Estoy seguro que puedo programar eso\", en fin mi pasión es programar!😊\r\n        \r\n        ¿Que me caracteriza? 🤷🏽‍♂️\r\n        📌 Lo que me caracteriza es la pasión que le pongo a los proyectos que estoy realizando, cuando me pongo a programar o a estudiar lo disfruto al máximo! Cuando hablo o me preguntan sobre lo que hago se nota la emoción en mi voz, tanto que hasta me pongo sentimental. Disfruto bastante el trabajo en equipo, siempre he sido una persona que le gusta trabajar con muchas personas, nunca he sido individualista, pero eso no quiere decir que no pueda desempeñarme al máximo trabajando solo.😊\r\n        \r\n        📌 También, tras estar codeando en java y manejando bases de datos con mysql desde hace dos añitos mas o menos, y hasta la fecha sigo codeando en Java, me tuve que casar con el debido a la facultad!🤷🏽‍♂️ , algunos cursos de Python, flask y estar cursando un bootcamp de más de 800 horas de programación Web Full Stack, estoy listo para afrontar cualquier reto que me ayude a desarrollarme en estas áreas al aplicar toda mi experiencia, conocimientos en un lugar de trabajo que me ayude a seguir aprendiendo, que este lleno de retos que me hagan crecer profesionalmente!!\r\n        \r\n        📚 Tecnologías por aprender:\r\n        Spring, Angular: Estoy bastante entusiasmado aprendiendo estas tecnologías, tengo un manejo de Java bastante bueno y quiero desarrollar un potente punto de venta con estas tecnologías!💻\r\n        \r\n        ¡Mi experiencia! 💻\r\n        Hasta ahora, mi experiencia es principalmente académica. Pueden ver un poquito sobre quien soy yo plasmado en código en mis repositorios!❤️\r\n        \r\n        https://github.com/DanielSerenoPD\r\n        \r\n        💬 Pregúntame sobre cualquier cosa, estoy feliz de poder ayudarte.`,\r\n            },\r\n            {\r\n                id: 8,\r\n                name: \"Marcos Striker\",\r\n                links: {\r\n                    LinkedIn: \"https://www.linkedin.com/in/marcos-stricker/\",\r\n                    GitHub: \"https://github.com/marcosst17\",\r\n                },\r\n                photo: \"https://avatars.githubusercontent.com/u/80062940?v=4\",\r\n                description: `Hi ! My name is Marcos and i'm from Argentina.. I'm currently studying Full Stack Web Development in Henry and so far it has been really good.\r\n        Im fluent in English and native in Spanish and I look forward to working remotely for a company somewhere abroad.`,\r\n            },\r\n        ];\r\n        res.status(200).json(aboutUs);\r\n    }\r\n    catch (error) {\r\n        res.status(400).json({ message: error });\r\n    }\r\n}));\r\nexports[\"default\"] = router;\r\n\n\n//# sourceURL=webpack://api-rocketplay/./src/controllers/aboutUs.ts?");

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