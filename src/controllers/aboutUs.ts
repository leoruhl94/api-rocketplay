import { Response, Request, Router, NextFunction } from "express";

const router = Router();
const { conn } = require("../libs/sequelize");
const sequelize = conn;

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const aboutUs = [
      {
        id: 1,
        name: "Franco Alfano",
        links: {
          LinkedIn: "https://www.linkedin.com/in/franco-alfano-4a6a7b216/",
          GitHub: "https://github.com/Kofrantz",
        },
        photo: "https://avatars.githubusercontent.com/u/88412878?v=4",
        description: `¿Quién soy?🤔
        🔸Me llamo Franco y soy desarrollador web full Stack. Desde mi adolescencia me apasiona la programación y siempre busco oportunidades de aprender y mejorar. Mi especialidad son Javascript, HTML y CSS, y herramientas de desarrollo como React.js y Express.js. También me gusta incursionar en otros lenguajes como Python y C#.
        
        ¿Por qué yo?❔
        🔸La pasión que me genera programar me motiva a aprender todo el tiempo y mejorar en lo que ya sé. Tengo la capacidad de adaptarme a cualquier entorno, y de aprender por mi cuenta lo que necesite para cumplir un objetivo.
        
        Experiencia📋
        🔸Mi experiencia se encuentra principalmente en el Bootcamp que estoy cursando actualmente, donde pude potenciar mis conocimientos, y construí una pagina web y una API Rest que trabaja en conjunto, como proyecto individual del Bootcamp, en solo un par de semanas (Enlace: https://pikaboss.herokuapp.com/)
        🔸Por mi cuenta, desarrollé otros proyectos con conocimientos que adquirí de manera autodidacta, relacionados con:
        ◾Desarrollo de Videojuegos con Unity Engine (C#)
        ◾Computer Vision con Python, OpenCV y MediaPipe
        ◾Modelado 3D con Blender
        ◾Proyectos avanzados en Excel con Visual Basic
        
        Contacto:
        Mail: franco.Alfano1404@gmail.com
        WhatsApp: +54 9 351 671 5181`,
      },
      {
        id: 2,
        name: "Agustin Bringas",
        links: {
          LinkedIn: "https://www.linkedin.com/in/francisco-agustin-bringas/",
          GitHub: "https://github.com/AgustinBringas",
        },
        photo: "https://avatars.githubusercontent.com/u/67709252?v=4",
        description: `Introduction:
        ◻ I'm a Full Stack Developer with experience in Front-End and Back-End development. I studied Software Engineer for 3 year before descovering Soy Henry. I got more than 800+ programming in SoyHenry's bootcamp where I developed new knowledge in the IT field.
        
        Qualities:
        ◻ Although all the members of this community have excellent technical skills, I excel at solving problems, listening to the team, and I'm always willing to teach and learn from others.
        
        Technologies:
        ◻ JavaScript
        ◻ Front-End: HTML5, CSS3, React, Redux, React Native
        ◻ Back-End: NodeJS, Express, Sequelize, PostgreSQL
        ◻ Extras: Git, Github, Slack, Trello, Scrum
        
        Contact:
        ◻ U can message me here or send a mail to agustin.bringas.2107@gmail.com`,
      },
      {
        id: 3,
        name: "Elias Delgado",
        links: {
          LinkedIn: "https://www.linkedin.com/in/delgadoelias-fullstackweb/",
          GitHub: "https://github.com/DelgadoElias",
        },
        photo: "https://avatars.githubusercontent.com/u/82496172?v=4",
        description: `Técnico informático personal y profesional. Al graduarme del nivel secundario mi pasión por la programación me llevó a aplicar un bootcamp donde aprendí todo lo relacionado al desarrollo web con tecnologías de vanguardia. Con todo lo aprendido, estoy más creativo, autodidacta y apasionado por aprender cada día más, sabiendo que estoy más cerca de mis objetivos.

        ►FrontEnd: Angular, React, Bootstrap, JavaScript, Typescript, HTML5, CSS3.
        ►BackEnd: Node.Js, Express.
        ►Bases de datos: SQL, Postgres, Sequelize, MongoDB.
        ►Gestión de Versiones: GIT, GitHub.
        ►Gestión de proyectos: SCRUM, Trello, Notion.
        ►Móvil: Android + Kotlin (básico).
        
        ¿Querés saber más de mi?
        Email: eliaslautarodelgado@gmail.com
        WP: https://wa.link/uxonlm`,
      },
      {
        id: 4,
        name: "Pablo Martinez",
        links: {
          LinkedIn: "https://www.linkedin.com/in/pablomartinez-js/",
          GitHub: "https://github.com/LOLE81",
        },
        photo: "https://avatars.githubusercontent.com/u/87158728?v=4",
        description: `in progress`,
      },
      {
        id: 5,
        name: "Jimena Medina",
        links: {
          LinkedIn: "https://www.linkedin.com/in/jimena-medina-javascript/",
          GitHub: "https://github.com/Jime227",
        },
        photo: "https://avatars.githubusercontent.com/u/86322114?v=4",
        description: `Hello there! I'm currently working on my group project at Henry Bootcamp to finish my training as a Full Stack Developer.
        I'm in the middle of a life make-over, looking for new challenges as I change my career path.
        At Henry, I have learned so far JavaScrip, Node, React, Redux, Express, Sequelize among a few more technologies. I'm a curious person, that believes that we should never stop learning which keeps me always on the lookout for a new adventure.
        I'm a social person that enjoys working in teams, participating in meetings and get-togethers.
        Love reading! Big fan of the Harry Potter world!
        Part of a homeschooling family that encourages self-teaching, mentoring, and hands-on learning that allowed me to get very good communicating skills, learn to be an active listener, and adapt to change fast.`,
      },
      {
        id: 6,
        name: "Leonardo Ruhl",
        links: {
          LinkedIn: "https://www.linkedin.com/in/leonardo-ruhl/",
          GitHub: "https://github.com/leoruhl94",
        },
        photo: "https://avatars.githubusercontent.com/u/41834037?v=4",
        description: `¿Quien soy?
        Soy Full Stack Developer con experiencia en el desarrollo de aplicaciones Front-end y Back-end. actualmente especializándome en Front-end.
        Me apasiona Programar, Enseñar y encarar nuevos desafíos que constantemente me hagan estar aprendiendo algo nuevo.
        
        🔍Estoy en búsqueda de nuevos desafíos donde pueda aportar con mi experiencia y conocimientos. Busco un puesto que me permita seguir aprendiendo y desarrollarme como profesional.
        
        Desde que era chico siempre me ha gustado crear cosas, cuando descubrí la programación, decidí entrar al mundo IT porque te brinda la posibilidad de crear lo que sea que puedas imaginar.
        Desde entonces no dejo de sorprenderme de lo que se puede lograr trabajando en equipo y con unas solo líneas de código.
        
        🧠Me considero una persona autodidacta, actualmente estoy estudiando para especializarme en tecnologías de Front-end.
        
        💡Tecnologías
        ◻ Lenguaje de programación: JavaScript, TypeScript
        ◻ Desarrollo Front-End: HTML5, CSS3, React, Redux, React Native
        ◻ Desarrollo Back-End: NodeJS, Express, Sequelize, PostgreSQL
        ◻ Otros: Webpack, Git, Github, Slack, Trello, Jira, Heroku, Scrum
        
        📨Contacto
        ◻ E-mail: Leoruhl94@gmail.com
        ◻ Github: leoruhl94 - Overview
        ◻ Whatsapp: wa.link/x4hwcq`,
      },
      {
        id: 7,
        name: "Daniel Sereno",
        links: {
          LinkedIn: "https://www.linkedin.com/in/danielserenopd/",
          GitHub: "https://github.com/DanielSerenoPD",
        },
        photo: "https://avatars.githubusercontent.com/u/86926807?v=4",
        description: `Quién soy? ✋
        📌 Soy un desarrollador Web Full Stack con conocimientos en JavaScript, Java y Python 👨‍💻. me siento muy cómodo desarrollando apps con tecnologías como React, Redux, Node, Express y Sequelize. Disfruto bastante el sentarme y ponerme a codear todo lo que veo en mi día a día, me siento poderoso cuando veo algo y me digo a mi mismo,"Estoy seguro que puedo programar eso", en fin mi pasión es programar!😊
        
        ¿Que me caracteriza? 🤷🏽‍♂️
        📌 Lo que me caracteriza es la pasión que le pongo a los proyectos que estoy realizando, cuando me pongo a programar o a estudiar lo disfruto al máximo! Cuando hablo o me preguntan sobre lo que hago se nota la emoción en mi voz, tanto que hasta me pongo sentimental. Disfruto bastante el trabajo en equipo, siempre he sido una persona que le gusta trabajar con muchas personas, nunca he sido individualista, pero eso no quiere decir que no pueda desempeñarme al máximo trabajando solo.😊
        
        📌 También, tras estar codeando en java y manejando bases de datos con mysql desde hace dos añitos mas o menos, y hasta la fecha sigo codeando en Java, me tuve que casar con el debido a la facultad!🤷🏽‍♂️ , algunos cursos de Python, flask y estar cursando un bootcamp de más de 800 horas de programación Web Full Stack, estoy listo para afrontar cualquier reto que me ayude a desarrollarme en estas áreas al aplicar toda mi experiencia, conocimientos en un lugar de trabajo que me ayude a seguir aprendiendo, que este lleno de retos que me hagan crecer profesionalmente!!
        
        📚 Tecnologías por aprender:
        Spring, Angular: Estoy bastante entusiasmado aprendiendo estas tecnologías, tengo un manejo de Java bastante bueno y quiero desarrollar un potente punto de venta con estas tecnologías!💻
        
        ¡Mi experiencia! 💻
        Hasta ahora, mi experiencia es principalmente académica. Pueden ver un poquito sobre quien soy yo plasmado en código en mis repositorios!❤️
        
        https://github.com/DanielSerenoPD
        
        💬 Pregúntame sobre cualquier cosa, estoy feliz de poder ayudarte.`,
      },
      {
        id: 8,
        name: "Marcos Striker",
        links: {
          LinkedIn: "https://www.linkedin.com/in/marcos-stricker/",
          GitHub: "https://github.com/marcosst17",
        },
        photo: "https://avatars.githubusercontent.com/u/80062940?v=4",
        description: `Hi ! My name is Marcos and i'm from Argentina.. I'm currently studying Full Stack Web Development in Henry and so far it has been really good.
        Im fluent in English and native in Spanish and I look forward to working remotely for a company somewhere abroad.`,
      },
    ];
    res.status(200).json(aboutUs);
  } catch (error) {
    res.status(400).json({ message: error });
  }
});

module.exports = router;
