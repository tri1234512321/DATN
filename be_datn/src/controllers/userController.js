/** @format */

import userService from "../services/userService";

const handleLogin = async (req, res) => {
      try {
            let email = req.body.email;
            let password = req.body.password;
            if (!email || !password) {
                  return res.status(500).json({
                        EC: 1,
                        message: "Missing enter email or password",
                  });
            }
            let userData = await userService.handleUserLogin(email, password);
            res.cookie("jwt", userData.data.access_token, { httpOnly: true });
            return res.status(200).json({
                  EC: userData.EC,
                  EM: userData.EM,
                  data: userData.data ? userData.data : {},
            });
      } catch (error) {
            console.log(error);
            return res.status(500).json({
                  EC: "-1",
                  EM: "Error from server!",
                  DT: "",
            });
      }
};

const changePassword = async (req, res) => {
      let data = req.body;
      let message = await userService.changePassword(data);
      return res.status(200).json(message);
};

const forgotPassword = async (req, res) => {
      let email = req.body.email;
      let message = await userService.forgotPassword(email);
      return res.status(200).json(message);
};

const handleEditNewUser = async (req, res) => {
      let data = req.body;
      let message = await userService.updateUserData(data);
      return res.status(200).json(message);
};

module.exports = {
      handleLogin: handleLogin,
      handleEditNewUser: handleEditNewUser,
      changePassword: changePassword,
      forgotPassword: forgotPassword,
};
