/** @format */
import bcrypt from "bcryptjs";
import db from "../models/index";
import JWTAction from "../middleware/JWTAction";
const salt = bcrypt.genSaltSync(10);

const handleUserLogin = (email, password) => {
      return new Promise(async (resolve, reject) => {
            try {
                  let userData = {};
                  let isExist = await checkUserEmail(email);
                  if (isExist) {
                        let user = await db.User.findOne({
                              raw: true,
                              attributes: ["id", "roleId", "email", "password", "firstName", "lastName"],
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
                                    userData.EC = 3;
                                    userData.EM = "Wrong Password!";
                              }
                        } else {
                              userData.EC = 2;
                              userData.EM = `User's not found!`;
                        }
                        resolve(userData);
                  } else {
                        userData.EC = 1;
                        userData.EM = `Your's Email isn't exist in your system. Plz try other Email!`;
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
                  console.log(data);
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
                              console.log(data);
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

const handleGetAllProducts = () => {
      return new Promise(async (resolve, reject) => {
            try {
                  let allProducts = await db.FoodItem.findAll();
                  resolve(allProducts);
            } catch (e) {
                  reject(e);
            }
      });
}

module.exports = {
      handleUserLogin: handleUserLogin,
      checkUserEmail: checkUserEmail,
      checkUserPhoneNumber: checkUserPhoneNumber,
      hashUserPassword: hashUserPassword,
      changePassword: changePassword,
      updateUserData: updateUserData,
      forgotPassword: forgotPassword,
      handleGetAllProducts: handleGetAllProducts,
};
