/** @format */
import bcrypt from "bcryptjs";
import db from "../models/index";
import { dtb } from "../config/connect";
import JWTAction from "../middleware/JWTAction";
import { driver } from "../config/neo4j";
const salt = bcrypt.genSaltSync(10);

const { Op } = require('sequelize');

const handleUserLogin = (email, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let userData = {};
      let isExist = await checkUserEmail(email);

      if (isExist) {
        let user = await db.User.findOne({
          raw: true,
          attributes: [
            "id",
            "roleId",
            "email",
            "password",
            "firstName",
            "lastName",
            "enable",
            "image"
          ],
          where: { email: email },
        });

        if (user) {
          let check = await bcrypt.compareSync(password, user.password);
          if (check) {
            let payload = {
              email: user.email,
              roleId: user.roleId,
              idUser: user.id,
            };
            const token = JWTAction.createJWT(payload);
            userData.EC = 0;
            userData.EM = "Ok!";
            delete user.password;

            userData.data = {
              user: user,
              access_token: token,
            };
          } else {
            // console.log("wrong password");
            userData.EC = 3;
            userData.EM = "Wrong Password!";
          }
        } else {
          userData.EC = 2;
          userData.EM = `User's not found!`;
        }
        resolve(userData);
      } else {
        // console.log("email not found");
        userData.EC = 1;
        userData.EM = `Your's Email isn't exist in your system. Please try other Email!`;
        resolve(userData);
      }
    } catch (e) {
      reject(e);
    }
  });
};

const checkUserEmail = (email) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { email: email },
      });

      if (user) resolve(true);
      else resolve(false);
    } catch (e) {
      reject(e);
    }
  });
};

const checkUserPhoneNumber = (phoneNumber) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { phoneNumber: phoneNumber },
      });

      if (user) resolve(true);
      else resolve(false);
    } catch (e) {
      reject(e);
    }
  });
};

const hashUserPassword = (password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let hashPassword = await bcrypt.hashSync(password, salt);
      resolve(hashPassword);
    } catch (e) {
      reject(e);
    }
  });
};

const updateUserData = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id) {
        resolve({
          EC: 2,
          EM: "Missing id!",
        });
      }
      let user = await db.User.findOne({
        where: { id: data.id },
        raw: false,
      });
      if (user) {
        user.firstName = data.firstName;
        user.lastName = data.lastName;
        user.address = data.address;
        user.phoneNumber = data.phoneNumber;
        await user.save();
        resolve({
          EC: 0,
          message: "User updated!",
        });
      } else {
        resolve({
          EC: 1,
          EM: "User not found!",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

const changePassword = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id) {
        resolve({
          EC: 2,
          EM: "Missing parameters!",
        });
      }
      let user = await db.User.findOne({
        where: { id: data.id },
        raw: false,
      });
      if (!user) {
        resolve({
          EC: 2,
          EM: "Id does not exist!",
        });
      }
      let { password, newPassword, confirmPassword } = data;
      let checkPw = await bcrypt.compareSync(password, user.password);
      let checkNpw = await bcrypt.compareSync(newPassword, user.password);
      if (checkPw === false) {
        resolve({
          EC: 3,
          message: "Wrong password, please try again!",
        });
      } else if (checkNpw) {
        resolve({
          EC: 4,
          message: "New password must be the old password, please try again!",
        });
      } else if (newPassword !== confirmPassword) {
        resolve({
          EC: 5,
          message: "Confirm password failed! Please try again",
        });
      } else {
        if (user) {
          user.password = await hashUserPassword(newPassword);
          await user.save();
        }
        resolve({
          EC: 0,
          message: "User update new password successfully!",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

const forgotPassword = (email) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { email: email },
        raw: false,
      });
      if (!user) {
        resolve({
          EC: 2,
          message: "Email does not exist! Please try again.",
        });
      } else {
        const resetPassword = "123456";
        const hashPw = await hashUserPassword(resetPassword);
        user.password = hashPw;
        await user.save();
        await emailService.sendEmailForgotPassword({
          reciverEmail: user.email,
          firstName: user.firstName,
          resetPassword: resetPassword,
          // time: data.timeString,
          // redirecLink: buildUrlEmail(data.doctorId, token),
        });
        resolve({
          EC: 0,
          message: "Please check your email to received new password!",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

const createNewUser = async (data) => {
  try {
    // Validate input
    const requiredFields = ['firstName', 'lastName', 'roleId', 'email', 'password', 'phoneNumber'];
    for (const field of requiredFields) {
      if (!data[field]) {
        return {
          EC: 1,
          EM: "You have not filled in enough information!",
        };
      }
    }

    console.log(data);

    // Check for existing email or phone number
    const [checkEmail, checkPhoneNumber] = await Promise.all([
      checkUserEmail(data.email),
      checkUserPhoneNumber(data.phoneNumber)
    ]);

    if (checkEmail || checkPhoneNumber) {
      return {
        EC: 1,
        EM: "Email or phone number already exists!",
      };
    }

    console.log("check data: ", data);

    // Hash the password
    const hashPassword = await hashUserPassword(data.password);
    const status = data.roleId === "BUYER" ? "TRUE" : "FALSE";

    // Create user in the database
    const result = await db.User.create({
      firstName: data.firstName,
      lastName: data.lastName,
      roleId: data.roleId,
      email: data.email,
      password: hashPassword,
      phoneNumber: data.phoneNumber,
      enable: status,
    });

    // Create a user node in Neo4j
    const session = driver.session();
    await session.run('MERGE (u:User {userName: $userName})', { userName: result.email });
    session.close();

    return {
      EC: 0,
      EM: "OK",
    };
  } catch (e) {
    console.error(e);
    throw e; // You can choose to reject with an error or handle it differently
  }
};

// const handleGetAllProducts = () => {
//   return new Promise(async (resolve, reject) => {
//     try {
//       let allProducts = await db.FoodItem.findAll();
//       resolve(allProducts);
//     } catch (e) {
//       reject(e);
//     }
//   });
// };

const getRate = async (data) => {
  try {
    const { idFood } = data; // Lấy idFood từ data
    const rates = await db.Rate.findAll({
      where: {
        idFood: idFood, // Lọc các bản ghi có idFood === idFood
      },
    });
    const ratesReply = rates.map(async (rate) => {
      const replies = await db.Comment.findAll({
        where: {
          rateId: rate.id,
        },
      });
      const imagesRely = replies.map(async (reply) => {
        const images = await db.ExtraCommentImage.findAll({
          where: {
            commentId: reply.id,
          },
        });
        reply.images = images;
        const infoUser = await db.User.findOne({
          where: {
            id: reply.idUserSend,
          },
        });
        reply.infoUser = infoUser;
        return reply;
      });
      await Promise.all(imagesRely);
      rate.replies = replies;
      return rate;
    });
    await Promise.all(ratesReply);
    // tạo một promise lấy all name user trong User cho từng rate
    const infoUser = rates.map(async (rate) => {
      const user = await db.User.findOne({
        where: { id: rate.idUser },
      });
      rate.infoUser = user;
      return rate;
    });
    await Promise.all(infoUser);

    // Tạo một promise để lấy tất cả các hàng trong ExtraRateImage cho từng rate
    const ratesWithImagesPromises = rates.map(async (rate) => {
      const images = await db.ExtraRateImage.findAll({
        where: {
          rateId: rate.id, // Lọc các bản ghi có rateId === id của rate
        },
      });
      // Thêm mảng images vào mỗi phần tử của rates
      rate.images = images;
      return rate;
    });

    // Chờ tất cả các promises image reviews được xử lý
    const ratesWithImages = await Promise.all(ratesWithImagesPromises);
    // get replies and image's

    ratesWithImages.reverse();
    return {
      EC: 0,
      EM: "Rates fetched successfully!",
      data: ratesWithImages,
    };
  } catch (error) {
    console.error("Error fetching rates:", error);
    return {
      EC: 1,
      EM: "Error fetching rates",
    };
  }
};

//Notification
const createNewNotification = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let access_token = data.access_token;
      let decode = JWTAction.verifyToken(access_token);
      // console.log(decode.idUser);
      let idUser = Number(decode.idUser);
      await db.Notification.create({
        idSendedUser: idUser,
        idReceivedUser: data.idReceivedUser,
        content: data.content,
        seen: 0,
      });
      resolve({
        EC: 0,
        EM: "OK",
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getNotification = (idReceivedUser) => {
  return new Promise(async (resolve, reject) => {
    try {
      
      // let item = "";
      if (idReceivedUser) {
        const q = `SELECT n.*, image, firstName FROM notifications AS n JOIN users AS u ON (n.idSendedUser = u.id AND n.idReceivedUser = ?) ORDER BY n.createdAt DESC`;
        const values = [idReceivedUser];

        dtb.query(q, values, (err, data) => {
          resolve(data);
        });
      }
      else {
        console.log("Unrecognize receiver!");
      }
      // resolve(item);
    } catch (e) {
      reject(e);
    }
  });
};

const deleteNotification = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let item = await db.Notification.findOne({
        where: { id: id },
      });
      if (!item) {
        resolve({
          EC: 2,
          message: "Item not found!",
        });
      }
      await db.Notification.destroy({
        where: { id: id },
      });
      resolve({
        EC: 0,
        message: `Notification with ${id} deleted successfully!`,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const updateNotification = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id) {
        resolve({
          EC: 2,
          EM: "Missing id!",
        });
      }
      let item = await db.Notification.findOne({
        where: { id: data.id },
        raw: false,
      });
      if (item) {
        item.seen = 1;
        await item.save();
        resolve({
          EC: 0,
          message: "Item updated!",
        });
      } else {
        resolve({
          EC: 1,
          EM: "Item not found!",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

//findUser

const getUser = (name,access_token) => {
  return new Promise(async (resolve, reject) => {
    let item = "";
    try {
      if (name&&access_token) {
        // console.log("getAllproduct");
        let decode = JWTAction.verifyToken(access_token);
        // console.log(decode.idUser);
        let idUser = Number(decode.idUser);
        item = await db.User.findAll({
          where: {
            firstName: name,
            id: {[Op.ne] : idUser}
          },
        });
      }
      else {
        console.log("Missing params!");
      }
      resolve(item);
    } catch (e) {
      reject(e);
    }
  });
};

const getRelation = (idUser,idRelationUser) => {
  // console.log(idUser,idRelationUser);
  return new Promise(async (resolve, reject) => {
    try {
      let isFriend = false;
      let idFriend = 0;
      let isFollow = false;
      let idFollow = 0;
      if (idUser && idRelationUser) {
        // console.log("getAllproduct");
        let item = await db.Friend.findAll({
          where: {
            [Op.or]: [
              {
                idUser:idUser,
                idFriendUser:idRelationUser
              },
              {
                idUser:idRelationUser,
                idFriendUser:idUser
              }
            ]
          },
        });
        if (Array.isArray(item) && item.length > 0) {
          isFriend = true; 
          idFriend = item[0].id;
        }
        let item1 = await db.Follow.findAll({
          where: {
            idFollowerUser:idUser,
            idFollowedUser:idRelationUser
          },
        });
        // console.log(item1);
        if (Array.isArray(item1) && item1.length > 0) {
          isFollow = true; 
          idFollow = item1[0].id;
        }
      }
      else {
        console.log("Missing params!");
      }
      resolve({isFriend,isFollow,idFriend,idFollow});
    } catch (e) {
      reject(e);
    }
  });
};

//parcel
const getParcelByIdOrder = async (access_token, idOrder) => {
  if (!access_token || !idOrder) {
    return {
      EC: 1,
      EM: "Missing params!"
    };
  }

  try {
    const decode = JWTAction.verifyToken(access_token);
    // console.log(decode);

    let item = await db.Parcel.findAll({
        where: {
          idOrder:idOrder
        },
      });
    

    return {
      EC: 0,
      EM: "Ok",
      item: item
    };
  } catch (e) {
    // Log the error and return a failure response
    console.error("Error getting parcels:", e);
    return {
      EC: 2,
      EM: "An error occurred while getting parcels.",
    };
  }
};

const getParcelByStatus = async (access_token, status) => {
  if (!access_token || !status) {
    return {
      EC: 1,
      EM: "Missing params!"
    };
  }

  try {
    const decode = JWTAction.verifyToken(access_token);
    // console.log(decode);
    const idUser = Number(decode.idUser);

    let item;
    if(decode.roleId==='SHIPPER') {
      item = await db.Parcel.findAll({
        where: {
          status: status
        },
      });
    } else {
      if(status==='SHIPPING') {
        item = await db.Parcel.findAll({
          where: {
            idShop: idUser,
            status: {
              [Op.in]: ['WAITING', 'DELIVERING', 'TRANSFERING'] 
            }
          }
        });
      } else {
        item = await db.Parcel.findAll({
          where: {
            idShop: idUser,
            status: status
          },
        });
      }
    }

    return {
      EC: 0,
      EM: "Ok",
      item: item
    };
  } catch (e) {
    // Log the error and return a failure response
    console.error("Error getting parcels:", e);
    return {
      EC: 2,
      EM: "An error occurred while getting parcels.",
    };
  }
};

const updateParcel = async (access_token, idParcel, status) => {
  try {
    // Validate input parameters
    if (!access_token || !idParcel || !status) {
      return {
        EC: 1,
        EM: "Missing params!",
      };
    }

    // Find the parcel item in the database
    const item = await db.Parcel.findOne({ where: { id: idParcel } ,raw: false,});

    // Check if the item was found
    if (!item) {
      return {
        EC: 1,
        EM: "Item not found!",
      };
    }

    // Update the item's status
    item["status"] = status;
    // console.log(item);
    await item.save();

    return {
      EC: 0,
      message: "Item updated!",
    };
  } catch (e) {
    // Log the error and return a failure response
    console.error("Error updating parcel:", e);
    return {
      EC: 2,
      EM: "An error occurred while updating the item.",
    };
  }
};

//get parcel item
const getParcelItem = async (access_token, idParcel) => {
  if (!access_token || !idParcel) {
    return {
      EC: 1,
      EM: "Missing params!"
    };
  }

  try {
    // console.log(access_token, typeof idParcel);

    const q = `SELECT f.*, pi.id as idPI, pi.price as pricePI, amount 
               FROM parcelitems AS pi 
               JOIN fooditems AS f ON (pi.idFood = f.id) 
               WHERE (pi.idParcel=?) 
               ORDER BY pi.createdAt`;
    const values = [idParcel];

    // Assuming dtb.query returns a promise-based API, if not, use a promisify function
    const data = await new Promise((resolve, reject) => {
      dtb.query(q, values, (err, results) => {
        if (err) {
          return reject(err);
        }
        resolve(results);
      });
    });

    return {
      EC: 0,
      EM: "Ok",
      item: data
    };
  } catch (e) {
    return {
      EC: 2,
      EM: "Error occurred",
      details: e.message
    };
  }
};

//get order by status
const getOrderByStatus = async (access_token, status) => {
  if (!access_token || !status) {
    return {
      EC: 1,
      EM: "Missing params!",
    };
  }

  try {
    const decode = JWTAction.verifyToken(access_token);
    const idUser = Number(decode.idUser);

    const whereClause = status === 'ORDER_SUCCESS'
      ? {
          status: {
            [Op.in]: ['ORDER_SUCCESS', 'TRANSFERING'],
          },
        }
      : { status };

    const orders = await db.Order.findAll({ where: whereClause });

    if (!orders || orders.length === 0) {
      return {
        EC: 0,
        EM: "Ok",
        item: [],
      };
    }

    // Fetch users concurrently
    const ordersWithUsers = await Promise.all(
      orders.map(async (order) => {
        const user = await db.User.findOne({
          where: {
            id: order.idBuyer,
          },
        });
        return {
          ...order, // Convert to a plain object
          user,
        };
      })
    );

    return {
      EC: 0,
      EM: "Ok",
      item: ordersWithUsers,
    };
  } catch (e) {
    console.error("Error getting Orders:", e);
    return {
      EC: 2,
      EM: "An error occurred while getting Orders.",
    };
  }
};

const updateOrder = async (access_token, idOrder, status) => {
  try {
    // Validate input parameters
    if (!access_token || !idOrder || !status) {
      return {
        EC: 1,
        EM: "Missing params!",
      };
    }

    // Find the order item in the database
    const item = await db.Order.findOne({ where: { id: idOrder } ,raw: false,});

    // Check if the item was found
    if (!item) {
      return {
        EC: 1,
        EM: "Item not found!",
      };
    }

    let parcels = await db.Parcel.findAll({where: {idOrder:idOrder},raw: false,});

    if (!parcels) {
      return {
        EC: 1,
        EM: "Order have not any parcel not found!",
      };
    }

    parcels.forEach(async parcel => {
      parcel["status"] = status;
      await parcel.save();
    });

    // Update the item's status
    item["status"] = status;
    // console.log(item);
    await item.save();

    return {
      EC: 0,
      message: "Item updated!",
    };
  } catch (e) {
    // Log the error and return a failure response
    console.error("Error updating parcel:", e);
    return {
      EC: 2,
      EM: "An error occurred while updating the item.",
    };
  }
};
  
module.exports = {
  handleUserLogin: handleUserLogin,
  checkUserEmail: checkUserEmail,
  checkUserPhoneNumber: checkUserPhoneNumber,
  hashUserPassword: hashUserPassword,
  changePassword: changePassword,
  updateUserData: updateUserData,
  forgotPassword: forgotPassword,
  createNewUser,
  // handleGetAllProducts: handleGetAllProducts,
  getRate: getRate,
  createNewNotification: createNewNotification,
  getNotification: getNotification,
  updateNotification: updateNotification,
  deleteNotification: deleteNotification,
  getUser:getUser,
  getRelation:getRelation,

  
  //parcel
  getParcelByStatus:getParcelByStatus,
  getParcelByIdOrder,
  updateParcel:updateParcel,
  getParcelItem:getParcelItem,

  //order
  getOrderByStatus:getOrderByStatus,
  updateOrder,
};
