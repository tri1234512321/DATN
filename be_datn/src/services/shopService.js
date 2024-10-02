/** @format */

import db from "../models/index";
import { dtb } from "../config/connect";
import userService from "./userService";
import JWTAction from "../middleware/JWTAction";
import secondImageFood from "../models/secondImageFood";

const createNewItemProduct = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let access_token = data.access_token;
      let decode = JWTAction.verifyToken(access_token);
      let idShop = Number(decode.idUser);
      let food = await db.FoodItem.create({
        idShop: idShop,
        primaryImage: data.imageItem,
        price: data.priceItem,
        foodName: data.foodName,
        descFood: data.descItem,
        available: 1,
      });

      for (let i = 0; i < data.secondImageFood.length; i++) {
        await db.SecondImageFood.create({
          idFood: food.id,
          secondImageFood: data.secondImageFood[i],
        });
      }
      resolve({
        EC: 0,
        EM: "OK",
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getAllProduct = (id, access_token) => {
  return new Promise(async (resolve, reject) => {
    try {
      let products = "";
      const decode = JWTAction.verifyToken(access_token);
      const idUser = Number(decode.idUser);
      if (id === "All") {
        // console.log("getAllproduct");
        products = await db.FoodItem.findAll({
          where: {
            idShop: idUser,
          },
        });
        // console.log(products);
      }
      resolve(products);
    } catch (e) {
      reject(e);
    }
  });
};
const getItemProduct = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let item = {};
      if (id) {
        // console.log("getAllproduct");
        item = await db.FoodItem.findOne({
          where: {
            id: id,
          },
        });
        let secondImageFood = await db.SecondImageFood.findAll({
          where: {
            idFood: id,
          },
        });

        item.secondImageFood = secondImageFood;
      }
      resolve(item);
    } catch (e) {
      reject(e);
    }
  });
};
const deleteItemProduct = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let item = await db.FoodItem.findOne({
        where: { id: id },
      });
      if (!item) {
        resolve({
          EC: 2,
          message: "Item not found!",
        });
      }
      await db.FoodItem.destroy({
        where: { id: id },
      });
      resolve({
        EC: 0,
        message: `Food with ${id} deleted successfully!`,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const updateItemProduct = async (data) => {
  try {
    if (!data.id) {
      return {
        EC: 2,
        EM: "Missing id!",
      };
    }
    // console.log("data: ", data);

    const item = await db.FoodItem.findOne({
      where: { id: data.id },
      raw: false,
    });

    if (!item) {
      return {
        EC: 1,
        EM: "Item not found!",
      };
    }

    const fieldsToUpdate = [
      "price",
      "foodName",
      "descFood",
      "primaryImage",
      "available",
    ];

    fieldsToUpdate.forEach((field) => {
      if (data[field] !== undefined) {
        item[field.replace("Item", "")] = data[field];
      }
    });
    // console.log("check: ", item);

    await item.save();

    return {
      EC: 0,
      message: "Item updated!",
    };
  } catch (e) {
    throw e;
  }
};

const getIntroduce = async (idShop) => {
  try {
    let dataIntroduce = await db.Shop.findOne({
      where: {
        idShop: idShop,
      },
    });
    // console.log("datashop: ", dataIntroduce);
    if (dataIntroduce) {
      return {
        EC: 0,
        EM: "Thông tin giới thiệu cửa hàng!",
        data: dataIntroduce,
      };
    } else {
      return {
        EC: 1,
        EM: "Thông tin giới thiệu cửa hàng chưa có!",
      };
    }
  } catch (e) {
    console.error(e);
    throw e;
  }
};

const getIntroduceExtra = async (id, idShop) => {
  try {
    if (id === "all") {
      if (!idShop) {
        return {
          EC: 1,
          EM: "Missing parameter!",
        };
      }
      let data = await db.SecondImageFood.findAll({
        where: {
          idShop: idShop,
        },
      });
      if (data) {
        return {
          EC: 0,
          EM: `Thông tin thêm của cửa hàng ${id}`,
          data: data,
        };
      } else {
        return {
          EC: 1,
          EM: `Không tìm thấy thông tin thêm của ${id}`,
        };
      }
    } else {
      let data = await db.SecondImageFood.findOne({
        where: {
          id: id,
        },
      });
      if (data) {
        return {
          EC: 0,
          EM: `Thông tin thêm của cửa hàng ${id}`,
          data: data,
        };
      } else {
        return {
          EC: 1,
          EM: `Không tìm thấy thông tin thêm của ${id}`,
        };
      }
    }
  } catch (e) {
    console.error(e);
    throw e;
  }
};

const verifyUser = (access_token) => {
  let decode = JWTAction.verifyToken(access_token);
  let idShop = Number(decode.idUser);
  return idShop;
};

const createIntroduceExtra = async (data) => {
  try {
    let access_token = data.access_token;
    let decode = JWTAction.verifyToken(access_token);
    let idShop = Number(decode.idUser);
    // check shop have introduce extra, if id exist => update
    if (data.id) {
      const isExist = await db.SecondImageFood.findOne({
        where: {
          id: data.id,
          idShop: idShop,
        },
        raw: false,
      });
      if (isExist) {
        isExist.secondImageFood = data.secondImageFood;
        isExist.desc = data.desc;
        await isExist.save();
        return {
          EC: 0,
          EM: `Cập nhật thông tin thêm cửa hàng thành công (id ${data.id}) !`,
        };
      } else {
        return {
          EC: 1,
          EM: `Không tìm thấy thông tin để cập nhật!`,
        };
      }
    } else {
      await db.SecondImageFood.create({
        idShop: idShop,
        secondImageFood: data.secondImageFood,
        desc: data.desc,
      });
      return {
        EC: 0,
        EM: "Tạo thông tin cửa hàng thành công!",
      };
    }
    return {
      EM: 1,
      EM: "Lỗi cập nhật/khởi tạo thông tin shop! Vui lòng kiểm tra lại!",
    };
  } catch (e) {
    console.error(e);
    return {
      EM: 1,
      EM: "Lỗi cập nhật/khởi tạo thông tin shop! Vui lòng kiểm tra lại!",
    };
  }
};

const deleteIntroduceExtra = async (data) => {
  try {
    let { id, access_token } = data;
    let idShop = verifyUser(access_token);
    if (idShop && id) {
      let introExtra = await db.SecondImageFood.findOne({
        where: {
          id: id,
          idShop: idShop,
        },
        raw: false,
      });
      console.log("intro: ", introExtra);
      if (introExtra) {
        await introExtra.destroy();
        return {
          EC: 0,
          EM: "Xoá thông tin thành công!",
        };
      } else {
        return {
          EC: 1,
          EM: "Xoá thông tin thất bại do không tìm thấy.",
        };
      }
    } else {
      return {
        EC: 1,
        EM: "Thiếu tham số!",
      };
    }
  } catch (e) {
    console.error(e);
    throw e;
  }
};

const createIntroductionShop = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let access_token = data.access_token;
      let decode = JWTAction.verifyToken(access_token);
      let idShop = Number(decode.idUser);
      // check shop have introduce, if id exist => update
      const isExist = await db.Shop.findOne({
        where: {
          idShop: idShop,
        },
        raw: false,
      });
      if (isExist) {
        isExist.imageShop = data.imageShop;
        (isExist.introduction = data.introduction),
          (isExist.endTime = data.endTime),
          (isExist.startTime = data.startTime);

        await isExist.save();
        resolve({
          EC: 0,
          EM: "Cập nhật thông tin cửa hàng thành công!",
        });
      } else {
        await db.Shop.create({
          idShop: idShop,
          imageShop: data.imageShop,
          introduction: data.introduction,
          startTime: data.startTime,
          endTime: data.endTime,
        });
        resolve({
          EC: 0,
          EM: "Tạo thông tin cửa hàng thành công!",
        });
      }
      resolve({
        EM: 1,
        EM: "Lỗi cập nhật/khởi tạo thông tin shop! Vui lòng kiểm tra lại!",
      });
    } catch (e) {
      reject(e);
    }
  });
};

//voucher
const createVoucher = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      //status, idCreate, idFoodused, code, typeVoucher, discount, startTime, endTime
      let access_token = data.access_token;
      let decode = JWTAction.verifyToken(access_token);
      let idCreate = Number(decode.idUser);

      let { idFoodused, code, typeVoucher, discount, startTime, endTime } =
        data;
      if (
        [idFoodused, code, typeVoucher, discount, startTime, endTime].some(
          (value) => value == null || value === ""
        )
      ) {
        resolve({
          EC: 1,
          EM: "Missing parameter!",
          data: null,
        });
      }
      let status = "TRUE"; // default voucher have status = "TRUE", when "FALSE", vourcher was used
      let result;
      for (let i = 0; i < code.length; i++) {
        result = await db.Voucher.create({
          status: status,
          idCreate: idCreate,
          idFoodused: idFoodused,
          code: code[i],
          typeVoucher: typeVoucher,
          discount: discount,
          startTime: startTime,
          endTime: endTime,
        });
      }
      if (result) {
        resolve({
          EC: 0,
          EM: "Create voucher successfully!",
        });
      } else {
        resolve({
          EC: 5,
          EM: "ERR server!",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

const getAllVoucher = (idShop) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (idShop) {
        let allVoucher = await db.Voucher.findAll({
          where: {
            idCreate: idShop,
          },
        });
        if (allVoucher) {
          resolve({
            EC: 0,
            EM: `All voucher by shop id ${idShop}`,
            data: allVoucher,
          });
        } else {
          resolve({
            EC: 1,
            EM: "Voucher is not exist!",
          });
        }
      } else {
        resolve({
          EC: 2,
          EM: "Missing idCreate!",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

const deleteVoucher = async (data) => {
  return new Promise((resolve, reject) => {
    try {
    } catch (e) {
      reject(e);
    }
  });
};

const updateVoucher = async (data) => {
  return new Promise((resolve, reject) => {
    try {
      // idFoodused: idFoodused,
      // code: code[i],
      // typeVoucher: typeVoucher,
      // discount: discount,
      // startTime: startTime,
      // endTime: endTime,
    } catch (e) {
      reject(e);
    }
  });
};

const addMoreImageItemProduct = async (imageItem) => {};

module.exports = {
  createNewItemProduct: createNewItemProduct,
  getAllProduct: getAllProduct,
  deleteItemProduct: deleteItemProduct,
  getItemProduct: getItemProduct,
  updateItemProduct: updateItemProduct,

  //introduce shop
  getIntroduceExtra: getIntroduceExtra,
  createIntroduceExtra: createIntroduceExtra,
  deleteIntroduceExtra: deleteIntroduceExtra,
  getIntroduce: getIntroduce,
  createIntroductionShop: createIntroductionShop,

  //voucher
  createVoucher: createVoucher,
  getAllVoucher: getAllVoucher,
  deleteVoucher: deleteVoucher,
  updateVoucher: updateVoucher,

};
