const Router = require('express')
const axios = require('axios')
const {google} = require('googleapis')
const router = Router();
const OAuth2Data = require('../../googleYoutube.json')
//este archivo se descarga desde las credenciales con json
const multer = require('multer')
const fs = require('fs')
const Vimeo = require('vimeo').Vimeo

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


router.post('/', async (req, res, next) => {//subir un video
  try {
    upload(req, res, async function(err){

    //   const oAuthClient = new google.auth.OAuth2(
    //     OAuth2Data.web.client_id,
    //     OAuth2Data.web.client_secret,
    //     OAuth2Data.web.redirect_uris[0]
    //   )
    //   const {title, tokens} = req.body
    //   await oAuthClient.setCredentials(JSON.parse(tokens))     
    //   if(err) throw err
      
    //   const youtube = google.youtube({
    //     version: 'v3',
    //     auth: oAuthClient
    //   })

    //   youtube.videos.insert({//metodo para subir un video
    //     resource:{
    //       snippet:{
    //         title, //titulo
    //         description: 'this is a test of youtube api' ///descripcion
    //       },
    //       status:{
    //         privacyStatus: 'private', //video publico, privado o no listado,
    //         embeddable: true
    //       }
    //     },
    //     part:'snippet,status',
    //     media:{
    //       body:fs.createReadStream(req.file.path)
    //     }
    //   },
    //   (err, data) => {
    //     if(err) throw err
    //     console.log(data)
        
    //     //borra la copia del video de la carpeta upload
    //     fs.unlink(req.file.path, err => {
    //       if (err) throw err;
    //     })
    //     res.send("Ok")
        
    //   })
      
    // })

      const TOKEN = "7c8c0f06ddcc065b8f53e76b2deddcd1"
      const CLIENT_ID = "77a095e87b9b446f5b1b6a8967eac08e3e2283ee"
      const CLIENT_SECRET = "K5szKnT8zK+3AWzD0hfGGVzdBLoJblzDlvKh77fxzXNO24DFknIFS28UljuRbNMG28V65TW7LvZA6iobEk5yQzmZXc6w9Uhdi5JJF+1Am25cbUWUr0Nz7chAANHvm6lG"

      // https://vimeo.com/api/oembed.json?url=https://vimeo.com/652679928 --> 
      var client = new Vimeo(CLIENT_ID, CLIENT_SECRET, TOKEN)
      // console.log(fs.createReadStream(req.file.path).path)

      // client.upload(
      //   fs.createReadStream(req.file.path).path,
      //   {
      //     "name": "Test",
      //     "description": "This is the description"
      //   },
      //   function (uri) {
      //     console.log('File upload completed. Your Vimeo URI is:', uri)
      //   },
      //   function (bytesUploaded, bytesTotal) {
      //     var percentage = (bytesUploaded / bytesTotal * 100).toFixed(2)
      //     console.log(bytesUploaded, bytesTotal, percentage + '%')
      //   },
      //   function (error) {
      //     console.log('Failed because: ' + error)
      //   }
      // )
      client.request({
        path: "/videos/652679928/likes"
      }, /*callback*/function (error, body, status_code, headers) {
        if (error) {
          console.log('error');
          console.log(error);
        } else {
          console.log('body');
          console.log(body);
        }
       
        console.log('status code');
        console.log(status_code);
        console.log('headers');
        console.log(headers);
      })

    })
              
  } catch(error) {
    res.send(error)
  }     
})

module.exports = router;