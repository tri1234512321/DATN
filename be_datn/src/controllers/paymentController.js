/** @format */
import buyerService from "../services/BuyerService";
import { verifyToken } from "../middleware/JWTAction";

import paymentService from "../services/paymentService";
const axios = require("axios").default; // npm install axios
const CryptoJS = require("crypto-js"); // npm install crypto-js
const moment = require("moment"); // npm install moment
const qs = require("qs");
import dotenv from "dotenv";
dotenv.config();

const config = {
  app_id: Number(process.env.APP_ID),
  key1: process.env.KEY1,
  key2: process.env.KEY2,
  endpoint: process.env.ENDPOINT,
};

// const config = {
//   app_id: 2553,
//   key1: 'PcY4iZIKFCIdgZvA6ueMcMHHUbRLYjPL',
//   key2: 'kLtgPl8HHhfvMuDHPwKfgfsY4Ydm9eIz',
//   endpoint: 'https://sb-openapi.zalopay.vn/v2/create',
// };

const handlePayment = async (req, res) => {
  let { access_token, totalMoney, allFood, timeOrder } = req.body;
  console.log("check payment", req.body);
  const decode = verifyToken(access_token);
  const idBuyer = parseInt(decode.idUser);

  // console.log(config);
  const embed_data = {
    //sau khi hoàn tất thanh toán sẽ đi vào link này (thường là link web thanh toán thành công của mình)
    redirecturl: "https://df59-113-161-73-175.ngrok-free.app",
  };

  const items = [];
  const transID = Math.floor(Math.random() * 1000000);

  const order = {
    app_id: config.app_id,
    app_trans_id: `${moment().format("YYMMDD")}_${transID}`, // translation missing: vi.docs.shared.sample_code.comments.app_trans_id
    app_user: idBuyer,
    app_time: Date.now(), // miliseconds
    item: JSON.stringify(allFood),
    embed_data: JSON.stringify(embed_data),
    amount: totalMoney,
    //khi thanh toán xong, zalopay server sẽ POST đến url này để thông báo cho server của mình
    //Chú ý: cần dùng ngrok để public url thì Zalopay Server mới call đến được
    callback_url:
      "https://20d2-113-161-73-175.ngrok-free.app/api/payment/callback",
    description: `Lazada - Payment for the order #${transID}`,
    bank_code: "",
  };

  // appid|app_trans_id|appuser|amount|apptime|embeddata|item
  const data =
    config.app_id +
    "|" +
    order.app_trans_id +
    "|" +
    order.app_user +
    "|" +
    order.amount +
    "|" +
    order.app_time +
    "|" +
    order.embed_data +
    "|" +
    order.item;
  order.mac = CryptoJS.HmacSHA256(data, config.key1).toString();

  // console.log(order.app_trans_id)

  try {
    await buyerService.paymentAll({
      idBuyer,
      totalMoney,
      allFood,
      timeOrder,
      code: order.app_trans_id,
    });

    const result = await axios.post(config.endpoint, null, { params: order });

    return res.status(200).json(result.data);
  } catch (error) {
    console.log(error);
  }
};

const handleCallback = async (req, res) => {
  let result = {};
  // console.log(req.body);
  try {
    let dataStr = req.body.data;
    let reqMac = req.body.mac;

    let mac = CryptoJS.HmacSHA256(dataStr, config.key2).toString();
    // console.log('mac =', mac);

    // kiểm tra callback hợp lệ (đến từ ZaloPay server)
    if (reqMac !== mac) {
      // callback không hợp lệ
      result.return_code = -1;
      result.return_message = "mac not equal";
    } else {
      // thanh toán thành công
      // merchant cập nhật trạng thái cho đơn hàng ở đây
      let dataJson = JSON.parse(dataStr, config.key2);
      console.log(await buyerService.updateOrder(dataJson["app_trans_id"]));

      result.return_code = 1;
      result.return_message = "success";
    }
  } catch (ex) {
    console.log("lỗi:::" + ex.message);
    result.return_code = 0; // ZaloPay server sẽ callback lại (tối đa 3 lần)
    result.return_message = ex.message;
  }

  // thông báo kết quả cho ZaloPay server
  res.json(result);
};

const handleCheckStatusOrder = async (req, res) => {
  const { app_trans_id } = req.body;
  const { app_id } = req.body;
  // console.log("App id: " + app_trans_id)
  let postData = {
    app_id: app_id,
    app_trans_id: app_trans_id, // Input your app_trans_id
  };

  let data = postData.app_id + "|" + postData.app_trans_id + "|" + config.key1; // appid|app_trans_id|key1
  postData.mac = CryptoJS.HmacSHA256(data, config.key1).toString();

  let postConfig = {
    method: "post",
    url: "https://sb-openapi.zalopay.vn/v2/query",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    data: qs.stringify(postData),
  };

  try {
    const result = await axios(postConfig);
    // console.log(result.data);
    return res.status(200).json(result.data);
    /**
     * kết quả mẫu
      {
        "return_code": 1, // 1 : Thành công, 2 : Thất bại, 3 : Đơn hàng chưa thanh toán hoặc giao dịch đang xử lý
        "return_message": "",
        "sub_return_code": 1,
        "sub_return_message": "",
        "is_processing": false,
        "amount": 50000,
        "zp_trans_id": 240331000000175,
        "server_time": 1711857138483,
        "discount_amount": 0
      }
    */
  } catch (error) {
    console.log("lỗi");
    console.log(error);
  }
};

module.exports = {
  handlePayment: handlePayment,
  handleCallback: handleCallback,
  handleCheckStatusOrder: handleCheckStatusOrder,
};
