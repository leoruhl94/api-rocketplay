import {Response, Request, Router, NextFunction} from 'express';
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

// Para ver mis listas de reproduccion 
// https://youtube.googleapis.com/youtube/v3/channels?part=contentDetails&mine=true&key=AIzaSyCy5bFCjzTESdANJcoW8GNZRvVS6LJ2864&access_token=ya29.a0ARrdaM_0HeyVKEOYyVvJ0FMHTiy4mQu8qEd_gvPQRVyaRTeCAcwJ43v0stDfhlTdqy_haABBpaWj13Ubhb_nYZIcrnO0qqyrvu0pmv3Pdiby7IFQH2xU8r7bDJRech3aAcNq8tb7VBSqL8NLgih91V_Mdcp7

// Para ver los videos de la lista de reproduccion (sacar el id de lo de arriba)
// https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet%2CcontentDetails%2Cstatus&playlistId=UU2VixUI_oav1QOvFn95rEhA&key=AIzaSyCy5bFCjzTESdANJcoW8GNZRvVS6LJ2864&access_token=ya29.a0ARrdaM_0HeyVKEOYyVvJ0FMHTiy4mQu8qEd_gvPQRVyaRTeCAcwJ43v0stDfhlTdqy_haABBpaWj13Ubhb_nYZIcrnO0qqyrvu0pmv3Pdiby7IFQH2xU8r7bDJRech3aAcNq8tb7VBSqL8NLgih91V_Mdcp7


router.post('/', async (req:Request, res:Response, next:NextFunction) => {//subir un video
  try {
    upload(req, res, async function(err){

      const oAuthClient = new google.auth.OAuth2(
        OAuth2Data.web.client_id,
        OAuth2Data.web.client_secret,
        OAuth2Data.web.redirect_uris[0]
      )
      const {title, tokens} = req.body
      await oAuthClient.setCredentials(JSON.parse(tokens))     
      if(err) throw err
      
      const youtube = google.youtube({
        version: 'v3',
        auth: oAuthClient
      })

      youtube.videos.insert({//metodo para subir un video
        resource:{
          snippet:{
            title, //titulo
            description: 'this is a test of youtube api' ///descripcion
          },
          status:{
            privacyStatus: 'private' //video publico, privado o no listado
          }
        },
        part:'snippet,status',
        media:{
          body:fs.createReadStream(req.file.path)
        }
      },
      (err, data) => {
        if(err) throw err
        console.log('uploading video done!')
        
        //borra la copia del video de la carpeta upload
        res.send('success!')
        fs.unlink(req.file.path, err => {
          if (err) throw err;
        })
        
      })
      
    })
    
              
  } catch(error) {
    res.send(error)
  }     
})

module.exports = router;