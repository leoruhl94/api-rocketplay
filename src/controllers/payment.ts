import {Response, Request} from 'express';
const axios = require('axios').default;
const config = require("../config/config")
const {Plans} = require('../libs/sequelize');
const mercadopago = require('mercadopago');
mercadopago.configure({
    access_token: config.tokenMP
  });
const payment = {
createPlan: async (req:Request, res:Response) => {
  const {back_url, reason,description,userLimit,currency_id, transaction_amount,
    repetitions,billing_day, external_reference,freeTrial} = req.body;

 const preference = {
     back_url,
     reason,
     auto_recurring: {
     currency_id,
     frequency:1,        
     frequency_type: "months",
     transaction_amount,
     repetitions,
     billing_day,
     external_reference,
     billing_day_proportional: true,
     free_trial: freeTrial?{ //por si queremos dar prueba gratis
         frequency_type: "months",
         frequency: 1
       }:
       null
     }
   };

   await axios.post(`https://api.mercadopago.com/preapproval_plan?access_token=${config.tokenMP}`,
   JSON.stringify(preference),
    {
      headers:{
        'Authorization': 'Bearer ENV_ACCESS_TOKEN',
        'Content-Type': 'application/json'
      }
    }
)
.then(async(result)=>{
  await Plans.create({name:reason,description,price:transaction_amount,userLimit,
    subscriptionMP: result.data.init_point});
  return res.status(200).json({message:"Success"})
  })
.catch(error=>res.status(400).json({message:error}));
},
createSubscription: async(req:Request, res:Response)=>{
  const {name} = req.params;
    await Plans.findOne({
      where:{
        name
      }
    }).then(plan=>{
      if(plan){
        return res.redirect(plan.subscriptionMP);
      }else{
        return res.status(400).json({message:"Plan Not Found"})
      }
    })
}
}
export default payment;