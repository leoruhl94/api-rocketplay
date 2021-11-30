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
  
  // youtube.search.list({
    //     part: 'snippet',
    //     q: 'your search query'
    //   }, function (err, data) {
      //     if (err) {
        //       res.send('Error: ' + err);
        //     }
        //     if (data) {
          //       res.json(data)
          //     }
          //   });
          try {
            const oAuthClient = new google.auth.OAuth2(
              OAuth2Data.web.client_id,
              OAuth2Data.web.client_secret,
              OAuth2Data.web.redirect_uris[0]
              )
              const {title, accessToken} = req.body
              oAuthClient.credentials = {
                  access_token: accessToken
                }
                
                const youtube = google.youtube({
                  version: 'v3',
                  auth: oAuthClient
                })
                
                upload(req, res, function(err){
                  if(err) throw err
                  console.log(req.body.title)
  
          // const youtube = google.youtube({ //youtube authentication
          //     version: 'v3',
          //     auth: oAuthClient
          // })
          console.log("llegue aca")
          // let a = axios.post("https://www.googleapis.com/upload/youtube/v3/videos&key=AIzaSyCy5bFCjzTESdANJcoW8GNZRvVS6LJ2864&access_token=ya29.a0ARrdaM_0HeyVKEOYyVvJ0FMHTiy4mQu8qEd_gvPQRVyaRTeCAcwJ43v0stDfhlTdqy_haABBpaWj13Ubhb_nYZIcrnO0qqyrvu0pmv3Pdiby7IFQH2xU8r7bDJRech3aAcNq8tb7VBSqL8NLgih91V_Mdcp7", {
          //   resource:{
          //     snippet:{
          //         title, //titulo
          //         description: 'this is a test of youtube api' ///descripcion
          //     },
          //     status:{
          //         privacityStatus: 'private' //video publico, privado o no listado
          //     }
          //   },
          //   part:'snippet,status',
          //   media:{
          //       body:fs.createReadStream(req.file.path)
          //   }
          // }).then(r => console.log("Done !")).catch(r => console.log("Entre al catch"))
          // res.send("asd")
          youtube.videos.insert({//metodo para subir un video
              resource:{
                  snippet:{
                      title, //titulo
                      description: 'this is a test of youtube api' ///descripcion
                  },
                  status:{
                      privacityStatus: 'private' //video publico, privado o no listado
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
      
              fs.unlinkSync(req.file.path)//borra la copia del video de la carpeta upload
              res.send('success!')
          })
        })

    } catch(error) {
      res.send(error)
    }

        
    
})

module.exports = router;