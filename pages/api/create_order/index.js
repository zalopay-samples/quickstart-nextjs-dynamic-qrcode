import axios from "axios";
import CryptoJS from "crypto-js";
import moment from "moment";
import {configZLP} from "../config";

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      console.log(configZLP)
      const embed_data = {zlppaymentid: "P271021"};
      const items = [{}];
      const transID = Math.floor(Math.random() * 1000000);
      const appTransID = `${moment().format('YYMMDD')}_${transID}`;
      const order = {
        app_id: configZLP.app_id,
        app_trans_id: appTransID, // translation missing: vi.docs.shared.sample_code.comments.app_trans_id
        app_user: "user123",
        app_time: Date.now(), // miliseconds
        item: JSON.stringify(items),
        embed_data: JSON.stringify(embed_data),
        amount: 50000,
        description: `Lazada - Payment for the order #${transID}`,
        bank_code: "zalopayapp",
        callback_url: configZLP.callback_url
      };

      // appid|app_trans_id|appuser|amount|apptime|embeddata|item
      const data = configZLP.app_id + "|" + order.app_trans_id + "|" + order.app_user + "|" + order.amount + "|" + order.app_time + "|" + order.embed_data + "|" + order.item;
      order.mac = CryptoJS.HmacSHA256(data, configZLP.key1).toString();

      axios.post(configZLP.endpoint + 'create', null, {params: order})
      .then(result => {
        res.status(200).json({
          appTransID: appTransID,
          url: result.data.order_url
        });
      })
      .catch(err => console.log(err));
    } catch (err) {
      res.status(500).json({statusCode: 500, message: err.message});
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}