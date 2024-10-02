/** @format */

import bcrypt from "bcryptjs";
import db from "../models/index";
import userService from "./userService";
import { getAllUsers } from "./adminService";
import { driver } from "../config/neo4j";
import { orderBy } from "lodash";

const Sequelize = require("sequelize");
const Op = Sequelize.Op;

const getVolumnRateByIdFood = async (idFood) => {
  try {
    const rates = await db.Rate.findAll({
      where: {
        idFood: idFood,
      },
      attributes: ["rate"],
    });
    if (rates.length > 0) {
      let length = rates.length;
      let rateAverage = (
        rates.reduce((acc, rate) => acc + rate.rate, 0) / length
      ).toFixed(1);
      return { rateAverage: rateAverage, volumnAns: length };
    } else {
      return {};
    }
  } catch (e) {
    console.error(e);
    return {
      EC: 5,
      EM: "Internal server error",
    };
  }
};

const getAllProduct = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let products;
      if (id === "All") {
        products = await db.FoodItem.findAll({
          where: { available: 1 },
        });
      } else {
        products = await db.FoodItem.findAll({
          where: { idShop:id,available: 1 },
        });
      }
      // console.log(products);
      console.log("c1: ", products);

      let promiseProducts = products.map(async (product) => {
        let item = await getVolumnRateByIdFood(product.id);
        product.rate = item;
        return product;
      });
      let updatedProducts = await Promise.all(promiseProducts);

      resolve(updatedProducts);
    } catch (e) {
      reject(e);
    }
  });
};

const getCartBuyer = (idBuyer, idShop) => {
  return new Promise(async (resolve, reject) => {
    try {
      // console.log("idBuyer", idBuyer, "shop", idShop);
      let idCart = await db.Cart.findOne({
        where: { idBuyer: idBuyer, idShop: idShop },
      });
      // console.log("idCart: ", idCart);
      if (idCart) {
        resolve(idCart);
      } else {
        resolve("null");
      }
    } catch (e) {
      reject(e);
    }
  });
};

const createNewCart = (idBuyer, idShop) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!idBuyer || !idShop) {
        resolve("Missing parameters: idBuyer or idShop");
      }
      // console.log("create new cart");
      await db.Cart.create({
        idBuyer: idBuyer,
        idShop: idShop,
      });
      let idCart = await getCartBuyer(idBuyer, idShop);
      resolve(idCart);
    } catch (e) {
      reject(e);
    }
  });
};
const getAllCart = (idBuyer) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!idBuyer) {
        resolve("Missing parameter idBuyer!");
      }
      let allCart = await db.Cart.findAll({ where: { idBuyer: idBuyer } });

      // check cart have, but item deleted and null all
      resolve(allCart);
    } catch (e) {
      reject(e);
    }
  });
};
const addFoodToCartItem = async (idCart, idFood, amountFood, timeAt) => {
  try {
    if (!idCart || !idFood || !amountFood || !timeAt) {
      return {
        EC: 1,
        EM: "Missing parameters!",
      };
    }

    let foodExist = await db.CartItem.findOne({
      where: { idFood, idCart },
      raw: false,
    });

    if (!foodExist) {
      await db.CartItem.create({
        idCart,
        idFood,
        amountFood,
        status: 1,
        timeAt,
      });
    } else {
      if (foodExist.status === 0) {
        foodExist.status = 1;
        foodExist.amountFood = 0; // Reset amount if the item was previously removed
      }
      foodExist.amountFood += amountFood; // Increment by the given amount
      await foodExist.save();
    }

    return {
      EC: 0,
      EM: "Add food to cart successfully!",
    };
  } catch (error) {
    throw error;
  }
};

const updateCartItem = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log("data: ", data);
      let cartItem = await db.CartItem.findOne({
        where: {
          id: data.id,
        },
        raw: false,
      });
      if (cartItem) {
        cartItem.amountFood = data.amountFood;

        await cartItem.save();

        let dataCurrent = db.CartItem.findOne({
          where: {
            id: data.id,
          },
        });
        resolve({
          EC: 0,
          EM: "Update cart item successfully!",
          data: dataCurrent,
        });
      } else {
        resolve({
          EC: 1,
          EM: "Update cart item failed!",
          data: null,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

const getAllCartItemByCart = async (allCart) => {
  let arrAllFood = [];
  let arrItems = []; // chứa mảng chứa id food có status === 1
  for (let i = 0; i < allCart.length; i++) {
    // call cartItem
    let arrCartItem = await getAllCartItem(allCart[i].id);
    for (let j = 0; j < arrCartItem.length; j++) {
      if (arrCartItem[j].status === 1) {
        arrItems.push(arrCartItem[j]);
      }
    }
  }
  if (arrItems.length > 0) {
    for (let i = 0; i < arrItems.length; i++) {
      let food = await db.FoodItem.findOne({
        where: { id: arrItems[i].idFood },
        attributes: { exclude: ["primaryImage", "descFood"] },
      });
      if (food) {
        arrAllFood.push(food);
      }
    }
  }

  return arrAllFood;
};

const getAllCartItem = (idCart) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!idCart) {
        resolve("Missing parameter!");
      }
      let allCartItems = await db.CartItem.findAll({
        where: { idCart: idCart },
      });
      resolve(allCartItems);
    } catch (e) {
      reject(e);
    }
  });
};

const getFoodDetailById = async (idFood) => {
  try {
    let dataFood = await db.FoodItem.findOne({
      where: {
        id: idFood,
      },
    });
    let rates = await getVolumnRateByIdFood(idFood);
    let images = [];
    images.push(dataFood.primaryImage);
    //find all secondImage
    let dataSecondImage = await db.SecondImageFood.findAll({
      where: {
        idFood: idFood,
      },
      attributes: ["idFood", "secondImageFood"],
    });
    console.log("dataImAGE: ", dataSecondImage);
    for (let i = 0; i < dataSecondImage.length; i++) {
      if (dataSecondImage[i].secondImageFood) {
        images.push(dataSecondImage[i].secondImageFood);
      }
    }
    dataFood.images = images;
    dataFood.rates = rates;
    return {
      EC: 1,
      EM: `Detail food id ${idFood}`,
      data: dataFood,
    };
  } catch (error) {
    throw error;
  }
};

const getFoodById = (idFood) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!idFood) {
        resolve("Missing parameter!");
      }
      let food = await db.FoodItem.findOne({
        where: { id: idFood },
      });
      if (!food) {
        resolve("Id food does not exist: ", idFood);
      }
      resolve(food);
    } catch (e) {
      reject(e);
    }
  });
};
const deleteCartItem = async (id, idCart) => {
  try {
    const item = await db.CartItem.findOne({
      where: { idFood: id, idCart },
      raw: false,
    });

    if (!item) {
      throw new Error("Delete item cart failed!");
    }

    item.status = 0;
    item.amountFood = 0;
    await item.save();

    return item;
  } catch (error) {
    throw error;
  }
};

//create order
const paymentAll = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let { idBuyer, totalMoney, allFood, timeOrder, code } = data;
      let totalAmount = allFood.reduce(
        (amount, item) => amount + item.amountFood,
        0
      );
      let resOrder = await db.Order.create({
        idBuyer: idBuyer,
        timeOrder: timeOrder,
        timeDelivery: "haven't",
        realTimeDelivery: "haven't",
        addressDelivery: "ky tuc xa khu A",
        totalAmount: totalAmount,
        totalMoney: totalMoney,
        status: "ORDER_SUCCESS",
        code: code,
      });

      const session = driver.session();
      let idOrder4j = resOrder.id;
      await session
        .run("MERGE (o: Order {id: $idOrder})", { idOrder: idOrder4j })
        .catch((error) => {
          console.log(error);
        });

      // get userName creator
      let buyer = await getAllUsers(idBuyer);

      let userName4j = buyer.email;
      await session
        .run(
          "MATCH (u: User {userName: $userName}) MATCH (o: Order {id: $idOrder}) MERGE (u) - [:MADE] -> (o)",
          { userName: userName4j, idOrder: idOrder4j }
        )
        .catch((error) => {
          console.log(error);
        });

      const idOrder = resOrder.dataValues.id;

      const groupedFood = allFood.reduce((acc, item) => {
        if (!acc[item.idShop]) {
          acc[item.idShop] = [];
        }
        acc[item.idShop].push(item);
        return acc;
      }, {});
      const groupedFoodArray = Object.values(groupedFood);

      // console.log(groupedFoodArray);
      // groupedFoodArray  <=> [[{}, {}], [],...], create parcel
      let arrParcel = [];

      for (let i = 0; i < groupedFoodArray.length; i++) {
        let idShop = groupedFoodArray[i][0].idShop;
        let amountFoods = 0;
        let totalPrice = 0;
        for (let j = 0; j < groupedFoodArray[i].length; j++) {
          amountFoods += groupedFoodArray[i][j].amountFood;
          totalPrice +=
            Number(groupedFoodArray[i][j].price) *
            groupedFoodArray[i][j].amountFood;
        }
        let resParcel = await db.Parcel.create({
          idOrder: idOrder,
          idShop: idShop,
          pickUpTime: timeOrder,
          totalMoney: totalPrice,
          status: "ORDERING",
          totalAmount: amountFoods,
        });
        arrParcel.push(resParcel.dataValues);
        // console.log("resParcel: ", resParcel);
      }

      // create parcelItems, mỗi parcel là của 1 shop
      // trên allFood, lấy ra [{idFood, idShop, price, amountFood}], từ idShop tìm idShop trong parcel lấy ra idParcel
      for (let i = 0; i < allFood.length; i++) {
        let idShop = allFood[i].idShop;
        let findIdParcel;
        for (let j = 0; j < arrParcel.length; j++) {
          if (arrParcel[j].idShop === idShop) {
            findIdParcel = arrParcel[j].id;
            break;
          }
        }
        let priceFood = allFood[i].price;
        let amount = allFood[i].amountFood;
        let id = allFood[i].id;
        let resParcelItem = await db.ParcelItem.create({
          idParcel: findIdParcel,
          idFood: id,
          price: priceFood,
          amount: amount,
        });
        let idFood4j = resParcelItem.idFood;
        await session
          .run("MERGE (f: Food {id: $idFood})", { idFood: idFood4j })
          .catch((error) => {
            console.log(error);
          });

        // idOrder4j
        // idFood4j
        let amount4j = resParcelItem.amount;
        await session
          .run(
            "MATCH (o: Order {id: $idOrder}) MATCH (f: Food {id: $idFood}) MERGE (o) - [:HAD {amount: $amount}] -> (f)",
            { idOrder: idOrder4j, idFood: idFood4j, amount: amount4j }
          )
          .catch((error) => {
            console.log(error);
          });
        // console.log("resParcelItem: ", resParcelItem);
      }

      for (let i = 0; i < allFood.length; i++) {
        for (let j = i + 1; j < allFood.length; j++) {
          let idFood1 = allFood[i].id;
          let idFood2 = allFood[j].id;
          await session
            .run(
              "MATCH (f1: Food {id: $idFood1}) MATCH (f2: Food {id: $idFood2}) MERGE (f1)-[bw:BOUGHT_WITH]-(f2) ON CREATE SET bw.times = 1 ON MATCH SET bw.times = bw.times + 1",
              { idFood1: idFood1, idFood2: idFood2 }
            )
            .catch((error) => {
              console.log(error);
            });
        }
      }
      session.close();
      resolve({
        EC: 0,
        EM: "Payment success!",
      });
    } catch (e) {
      reject(e);
    }
  });
};

const updateOrder = (code = "no") => {
  return new Promise(async (resolve, reject) => {
    try {
      await db.Order.update(
        { onlinePayed: "yes" },
        {
          where: {
            code: code,
          },
        }
      );
      resolve({
        EC: 0,
        EM: "Cart items updated successfully!",
      });
    } catch (e) {
      reject(e);
    }
  });
};

const clearCart = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      for (let i = 0; i < data.length; i++) {
        const { id } = data[i];
        await db.CartItem.update(
          { status: 0 },
          {
            where: {
              idCart: id,
              status: 1,
            },
          }
        );
      }
      resolve({
        EC: 0,
        EM: "Cart items updated successfully!",
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getMostPopuparFood = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      let rc = [];
      const session = driver.session();
      await session
        .run(
          "MATCH (o:Order)-[h:HAD]->(f:Food) WITH f.id AS rcmFood, sum(h.acount) AS strength ORDER BY strength DESC LIMIT 4 RETURN rcmFood, strength"
        )
        .then((result) => {
          session.close();
          result.records.forEach((record) => {
            rc.push(record.get("rcmFood"));
          });
        })
        .catch((error) => {
          console.log(error);
        });

        if(rc.length===0) {
          resolve([]);
        }
      let products = await db.FoodItem.findAll({
        where: {
          id: {
            [Op.or]: rc,
          },
        },
      });
      resolve(products);
    } catch (e) {
      reject(e);
    }
  });
};

const getMostRegularFoodOrderedWith = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let idFood = Number(data);
      // console.log(typeof(data));
      let rc = [];
      const session = driver.session();
      await session
        .run(
          "MATCH (f:Food{id:$idFood}) MATCH (f) - [bw:BOUGHT_WITH] - (rcm:Food) WITH rcm.id as rcmFood, bw.times as strength ORDER BY strength DESC LIMIT 4 RETURN rcmFood, strength",
          { idFood: idFood }
        )
        .then((result) => {
          session.close();
          result.records.forEach((record) => {
            rc.push(record.get("rcmFood"));
          });
        })
        .catch((error) => {
          console.log(error);
        });

        if(rc.length===0) {
          resolve([]);
        }
      let products = await db.FoodItem.findAll({
        where: {
          id: {
            [Op.or]: rc,
          },
        },
      });
      resolve(products);
    } catch (e) {
      reject(e);
    }
  });
};

const getPersonalizedFoodOrderedWith = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let userName = data.userName;
      let idFood = data.idFood;
      let rc = [];
      const session = driver.session();
      await session
        .run(
          "MATCH (u:User{userName:$userName}) MATCH (f:Food{id:$idFood}) MATCH (u) - [:MADE] -> (o:Order) - [:HAD] -> (f) WITH o MATCH (o) - [:HAD] -> (rcm:Food) WHERE NOT rcm.id = $idFood WITH rcm.id AS rcmFood, count(*) AS strength ORDER BY strength DESC LIMIT 3  RETURN rcmFood, strength",
          { userName: userName, idFood: idFood }
        )
        .then((result) => {
          session.close();
          result.records.forEach((record) => {
            rc.push(record.get("rcmFood"));
          });
        })
        .catch((error) => {
          console.log(error);
        });

        if(rc.length===0) {
          resolve([]);
        }

      let products = await db.FoodItem.findAll({
        where: {
          id: {
            [Op.or]: rc,
          },
        },
      });
      resolve(products);
    } catch (e) {
      reject(e);
    }
  });
};

const createRate = async (data) => {
  const { idUser, idFood, rate, content, images } = data;
  try {
    // Tạo đánh giá
    console.log("check rating");
    let newRate = await db.Rate.create({ idUser, idFood, rate, content });
    // Xử lý hình ảnh nếu có, ảnh có 1 || nhiều || 0
    const imagesJSON = JSON.parse(images);
    let dataImages = [];
    if (imagesJSON && imagesJSON.length > 0) {
      const imagePromises = imagesJSON.map(async (image) => {
        let dataImage = await db.ExtraRateImage.create({
          rateId: newRate.id,
          image,
        });
        dataImages.push(dataImage.dataValues);
        return dataImage;
      });
      await Promise.all(imagePromises);
    }
    let outputRate = newRate.dataValues;
    outputRate.images = dataImages;
    return {
      EC: 0,
      EM: "Rating added successfully!",
      rate: outputRate,
    };
  } catch (error) {
    console.error("Error adding rating:", error);
    return { EC: 5, EM: "Internal server error" };
  }
};

const deleteRate = async (idRate, idUser) => {
  try {
    let getRate = await db.Rate.findOne({
      id: idRate,
    });

    let checkUser = getRate.dataValues.IdUser === idUser;
    if (checkUser) {
      db.Rate.destroy({
        where: { id: idRate },
      });
    } else {
      return {
        EC: 5,
        EM: "Internal server error",
      };
    }
  } catch (error) {
    console.error("Error delete rating!");
    return {
      EC: 5,
      EM: "Internal server error",
    };
  }
};

const updateRate = async (data) => {};

// answer rate
const createAnsRate = async (data) => {
  try {
    let { idUserSend, rateId, content, images } = data;
    rateId = Number(rateId);

    const newAnswer = await db.Comment.create({
      idUserSend,
      rateId,
      content,
    });

    const imageJson = JSON.parse(images || "[]");
    const dataImages = await Promise.all(
      imageJson.map(async (image) => {
        const dataImage = await db.ExtraCommentImage.create({
          commentId: newAnswer.dataValues.id,
          idUserSend: idUserSend,
          image,
        });
        return dataImage.dataValues;
      })
    );

    return {
      EC: 0,
      EM: "Reply success!",
      data: {
        ...newAnswer.dataValues,
        images: dataImages,
      },
    };
  } catch (error) {
    console.error("Error internal server:", error);
    return {
      EC: 5,
      EM: "Error internal server",
    };
  }
};

const deleteAnsRate = async (idRate, idUser) => {};

const updateAnsRate = async (data) => {};

module.exports = {
  getAllProduct: getAllProduct,
  getCartBuyer: getCartBuyer,
  createNewCart: createNewCart,
  getAllCart: getAllCart,
  addFoodToCartItem: addFoodToCartItem,
  updateCartItem: updateCartItem,
  getAllCartItem: getAllCartItem,

  getFoodDetailById: getFoodDetailById,
  getFoodById: getFoodById,
  deleteCartItem: deleteCartItem,
  getAllCartItemByCart: getAllCartItemByCart,
  paymentAll: paymentAll,
  clearCart: clearCart,
  getMostPopuparFood: getMostPopuparFood,
  getMostRegularFoodOrderedWith: getMostRegularFoodOrderedWith,
  getPersonalizedFoodOrderedWith: getPersonalizedFoodOrderedWith,
  updateOrder: updateOrder,
  //rate
  createRate: createRate,
  deleteRate: deleteRate,
  //answer
  createAnsRate: createAnsRate,
};
