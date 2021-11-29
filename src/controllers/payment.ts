import {Response, Request} from 'express';
const config = require("../config/config")
const mercadopago = require('mercadopago');
mercadopago.configure({
    access_token: config.keyMP
  });
const payment = {
 generatePayment: async (req:Request, res:Response) => {
     try{
     const {name, price, quantity} = req.body;
    let preference = {
        items: [
          { 
              title:name,
              unit_price:+price,
              quantity:+quantity

          } 
        ]
      };
      const result = await mercadopago.preferences.create(preference);
      res.redirect(result.body.init_point);
    }catch(error){
        res.status(400).json({message:error})
    }
}
}
export default payment;