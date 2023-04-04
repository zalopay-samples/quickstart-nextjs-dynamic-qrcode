import CryptoJS from "crypto-js";
import {configZLP} from "../config";

export default async function handler(req, res) {
  if (req.method !== 'POST') {    
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
    return;
  }
  try {
    let result = {};
    try {
      let dataStr = req.body.data;
      let reqMac = req.body.mac;

      let mac = CryptoJS.HmacSHA256(dataStr, configZLP.key2).toString();
      console.log("mac =", mac);


      if (reqMac !== mac) {
        // invalid callback
        result.return_code = -1;
        result.return_message = "mac is not equal";
      } else {
        // the payment is successful
        let dataJson = JSON.parse(dataStr, configZLP.key2);
        console.log(`💰  Payment Callback received!`);
        console.log("✅  Update order's status = success where app_trans_id =", dataJson["app_trans_id"]);

        result.return_code = 1;
        result.return_message = "success";
      }
    } catch (ex) {
      result.return_code = 0; // ZaloPay server will callback (at most 3 times)
      result.return_message = ex.message;
    }

    // return response to ZaloPay
    res.json(result);
  } catch (err) {
    res.status(500).json({statusCode: 500, message: err.message});
  }
} 
