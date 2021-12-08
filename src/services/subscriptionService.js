const axios = require("axios").default;
const { Subscriptions, Users, Plans } = require("../libs/sequelize");
const config = require("../config/config");

class SubscriptionService {
  async findOneMP(subscriptionId) {
    try {
      const response = await axios.get(
        `https://api.mercadopago.com/preapproval/search?id=${subscriptionId}&access_token=${config.tokenMP}`,
        {
          headers: {
            Authorization: "Bearer ENV_ACCESS_TOKEN",
          },
        }
      );
      return response.data.results[0];
    } catch (error) {
      throw new Error(error.message || "se rompio todo");
    }
  }
  async updateSubscriptionMP(subscriptionId, newStatus) {
    try {
      console.log(subscriptionId, newStatus)
      let data = {"status": "authorized"}
      // let url =  `https://api.mercadopago.com/preapproval/${subscriptionId}&access_token=${config.tokenMP}`
      let url =  "https://api.mercadopago.com/preapproval/2c9380847d94c33d017d9c4a293303ea&access_token="+config.tokenMP;
      const response = await axios.put( url, JSON.stringify(data), {
          headers: {
            "Authorization": "Bearer ENV_ACCESS_TOKEN",
            "Content-Type": "application/json"
          },
        }
      );
      console.log(response)
        return response.data
    } catch (error) {
      throw new Error(error.message || "se rompio todo");
    }
  }
  // async deleteSubscriptionMP(subscriptionId) {
  //   try {
  //     const response = await axios.get(
  //       `https://api.mercadopago.com/preapproval/search?id=${subscriptionId}&access_token=${config.tokenMP}`,
  //       {
  //         headers: {
  //           Authorization: "Bearer ENV_ACCESS_TOKEN",
  //         },
  //       }
  //     );
  //     response.data.results[0].status = 'cancelled';
  //     res.json('Your subscription was cancelled')
  //   } catch (error) {
  //     throw new Error(error.message || "se rompio todo");
  //   }
  // }
  async findAllMP(limit = 10) {
    try {
      const response = await axios.get(
        `https://api.mercadopago.com/preapproval/search?limit=${limit}&access_token=${config.tokenMP}`,
        {
          headers: {
            Authorization: "Bearer ENV_ACCESS_TOKEN",
          },
        }
      );
      return response.data;
    } catch (error) {
      throw new Error(error.message || "se rompio todo");
    }
  }

  async findOneDB(id) {
    try {
      let subscriptions = await Subscriptions.findOne({
        where: {
          id,
        },
      });
      return subscriptions;
    } catch (error) {
      throw new Error(error.message || "se rompio todo");
    }
  }
  async findAllDB() {
    try {
      // let subscriptions = await Subscriptions.findAll({include: ["schema", Plans]});
      let subscriptions = await Subscriptions.findAll();
      return subscriptions;
    } catch (error) {
      throw new Error(error.message || "se rompio todo");
    }
  }
  async deleteByIdDB(id) {
    try {
      let subscriptions = await Subscriptions.destroy({
        where: {
          id,
        },
      });
      return "deleted";
    } catch (error) {
      throw new Error(error.message || "se rompio todo");
    }
  }
}

module.exports = SubscriptionService;





// async function startUpload(e){
//   e.preventDefault();
//   try {
//     const params = {
//       fileName: input.title,
//       fileType: input.file.type
//     };

//     let resp = await axios.get(`${URL_BASE}/uploadVideo/start-upload`, {params})
    
//     // var uploadIdTest = resp.data.uploadId
    
//     setUploadIdState({uploadId: resp.data.uploadId})
//     uploadMultipartFile()
//   } catch (err) {
//     console.log(err)
//   }
// }

// async function uploadMultipartFile(){
//   try {
//     const CHUNK_SIZE = 5000000 // 5 MB
//     const fileSize = input.file.size
//     const CHUNKS_COUNT = Math.floor(fileSize / CHUNK_SIZE) + 1
//     let promisesArray: any = []
//     let start, end, blob

//     for (let index = 1; index < CHUNKS_COUNT + 1; index++){
//       start = (index - 1) * CHUNK_SIZE
//       end = (index) * CHUNK_SIZE
//       blob = (index < CHUNKS_COUNT) ? input.file.slice(start, end) : input.file.slice(start)
//       console.log(uploadIdState)
//       let getUploadUrlResp = await axios.get(`${URL_BASE}/uploadVideo/get-upload-url`, {
//         params: {
//           fileName: input.title,
//           partNumber: index,
//           uploadId: uploadIdState.uploadId
//         }
//       })
//       let { presignedUrl } = getUploadUrlResp.data
//       console.log('   Presigned URL ' + index + ': ' + presignedUrl + ' filetype ' + input.file.type)

//       let uploadResp = axios.put(presignedUrl, blob, {
//         headers: {
//           'Content-Type': input.file.type
//         }
//       });
//       promisesArray.push(uploadResp)
//     }

//     let resolvedArray = await Promise.all(promisesArray)
//     console.log(resolvedArray, ' resolvedAr')

//     let uploadPartsArray: any = []
//     resolvedArray.forEach((resolvedPromise: any, index: any) => {
//       uploadPartsArray.push({
//         ETag: resolvedPromise.headers.etag,
//         PartNumber: index + 1,
//       })
//     })

//     let completeUploadResp = await axios.post(`${URL_BASE}/uploadVideo/complete-upload`, {
//       params: {
//         fileName: input.title,
//         parts: uploadPartsArray,
//         uploadId: uploadIdState.uploadId
//       }
//     })

//     console.log(completeUploadResp.data, "complete upload response")


//   } catch(err){
//     console.log(err)
//   }
// }