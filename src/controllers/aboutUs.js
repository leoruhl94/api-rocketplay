const { Router } = require("express");

const router = Router();


router.get("/", async (req, res, next) => {
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
        description: `Who am I? ✋ 📌 I'm Pablo, but every calls me Lole. This year I found in programming a new passion. Now I can say that I'm close to be a Full Stack Web Developer. I'm finding my path in this wonderful world which is programming, and learning all the time. 📋 I've been working as a trader in the agricultural area for many years, with experience in commodities as soybeans, corn, wheat, barley and others. I've decided to change that way of life, today I'm looking forward to learn and apply all kind of knowledge related to this new passion. 🔍 I'm looking for new experiences and hoping to have the chance to contribute with my knowledges and continue learning, to improve as a professional. 💪 I really like to work in teams and also enjoy working alone if necessary. 💻 I've been studying languages and techs as JavaScript, HTML, CSS, React, Redux, NodeJs, Express, PostgreSQL, Sequelize, and others as Babel, Webpack, TypeScript, and a never ending list of "to learn in the future..." 📨Contact me: ◻ E-mail: martinezpm@gmail.com ◻ GitHub: https://github.com/LOLE81/ ◻ Twitter: @LOLE81PM ◻ Whatsapp: https://wa.link/x3n03h`,
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
        description: `Hola!! Mi nombre es Leo y Soy Full Stack Developer con experiencia en el desarrollo de aplicaciones Front-end y Back-end. Me apasiona Programar, Enseñar y encarar nuevos desafíos que continuamente me permitan aprender algo nuevo.

        Desde la infancia me ha gustado crear cosas, decidí entrar al mundo IT porque para crear algo grandioso, el único limite que existe es tu imaginación.
        Desde entonces no dejo de sorprenderme de lo que se puede lograr trabajando en equipo y con solo unas líneas de código.
        
        🔍Estoy en búsqueda de nuevos desafíos donde pueda aportar mi experiencia y conocimientos. Busco un puesto que me permita seguir aprendiendo y desarrollarme como profesional.
        
        🧠Me considero una persona autodidacta, actualmente estoy estudiando tecnologías de Front-end para especializarme en esa área de desarrollo.
        
        💡Tecnologías
        ◻ Lenguaje de programación: JavaScript, TypeScript
        ◻ Desarrollo Front-End: HTML5, CSS3, React, Redux, React Native
        ◻ Desarrollo Back-End: NodeJS, Express, Sequelize, PostgreSQL
        ◻ Otros: Webpack, Git, Github, Slack, Trello, Jira, Heroku, Scrum, FileZilla
        
        📨Contacto
        ◻ E-mail: Leoruhl94@gmail.com
        ◻ Github: https://github.com/leoruhl94
        ◻ Whatsapp: wa.link/x4hwcq`,
      },
      {
        id: 7,
        name: "Marcos Stricker",
        links: {
          LinkedIn: "https://www.linkedin.com/in/marcos-stricker/",
          GitHub: "https://github.com/marcosst17",
        },
        photo: "https://avatars.githubusercontent.com/u/80062940?v=4",
        description: `Who Am I? 🤔
        🔸 My name is Marcos, I'm from Argentina and I'm a Full Stack Web Developer. I've been in love with computers in general since I was a teen, I've built all the computers that I ever had and I repaired a lot of computers from my friends as a side gig / hobby. I finally decided to dive into programming and I'm very motivated to learn and be able to create new things.
        
        Why Me? ❔
        🔸 I'm very passionate about programming and computers in general, I'm always trying to learn new things and put myself in a position in which I need to learn something. I'm very charismatic and able to adapt to any environment.
        
        Tech Stack 📋
        🔸 HTML - CSS - JavaScript - React - Redux - NodeJS - Express - PostgreSQL - Sequelize - TypeScript - Python.
        
        Languages
        🔸 English (C2) - Spanish (Native) - Portuguese (B1/B2)
        
        I'm currently looking forward to bring my experience into a team and help in every way I can.`,
      },
    ];
    res.status(200).json(aboutUs);
  } catch (error) {
    res.status(400).json({ message: error });
  }
});

module.exports = router;
