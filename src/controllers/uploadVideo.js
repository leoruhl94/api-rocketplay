const {Router} = require('express');
const axios = require('axios')
const {google} = require('googleapis')
const router = Router();
const OAuth2Data = require('../../googleYoutube.json')
//este archivo se descarga desde las credenciales con json
const multer = require('multer')
const fs = require('fs')

//modelo de la copia del video que va a crear en la carpeta upload
const storage = multer.diskStorage({
    destination: function (req, file, cb){
        cb(null, 'uploads')
    },
    filename: function(req, file, cb){
        cb(null, `${Date.now()}-${file.originalname}`)
    }
})
//guardamos el video que me llega con multer
const upload = multer({storage: storage}).single('videoFile') //el nombre del key donde viene el archivo de video
//datos del cliente
const oAuthClient = new google.auth.OAuth2(
    OAuth2Data.web.client_id,
    OAuth2Data.web.client_secret
)

const youtube = google.youtube({
    version: 'v3',
    auth: oAuthClient
})


router.get('/', async (req, res, next) => {//subir un video
    youtube.search.list({
        part: 'snippet',
        q: 'your search query'
      }, function (err, data) {
        if (err) {
          res.send('Error: ' + err);
        }
        if (data) {
          res.json(data)
        }
      });

    // upload(req, res, function(err){
    //     if(err) throw err
    //     const {title} = req.body

    //     const youtube = google.youtube({ //youtube authentication
    //         version: 'v3',
    //         auth: oAuthClient
    //     })
        
    //     youtube.videos.insert({//metodo para subir un video
    //         resource:{
    //             snippet:{
    //                 title, //titulo
    //                 description: 'this is a test of youtube api' ///descripcion
    //             },
    //             status:{
    //                 privacityStatus: 'private' //video publico, privado o no listado
    //             }
    //         },
    //         part:'snippet,status',
    //         media:{
    //             body:fs.createReadStream(req.file.path)
    //         }
    //     },
    //     (err, data) => {
    //         if(err) throw err
    //         console.log('uploading video done!')

    //         fs.unlinkSync(req.file.path)//borra la copia del video de la carpeta upload
    //         res.send('success!')
    //     })
    // })
})

module.exports = router;