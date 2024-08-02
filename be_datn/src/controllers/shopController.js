/** @format */

import shopService from "../services/shopService";

const handleCreateNewItemProduct = async (req, res) => {
      const data = req.body;
      let message = await shopService.createNewItemProduct(data);
      console.log(message);
      return res.status(200).json(message);
};

const handleGetAllProduct = async (req, res) => {
      let id = req.query.id;
      let access_token = req.query.access_token;
      if (!id) {
            return res.status(200).json({
                  EC: 1,
                  EM: "Missing parameter",
                  products: [],
            });
      }
      let products = await shopService.getAllProduct(id, access_token);
      // console.log(products);
      return res.status(200).json({
            EC: 0,
            EM: "Ok",
            products: products,
      });
};

const handleGetItemProduct = async (req, res) => {
      let id = req.query.id;
      if (!id) {
            return res.status(200).json({
                  EC: 1,
                  EM: "Missing parameter",
                  item: [],
            });
      }
      let item = await shopService.getItemProduct(id);
      // console.log(products);
      return res.status(200).json({
            EC: 0,
            EM: "Ok",
            item: item,
      });
};

const handleDeleteItemProduct = async (req, res) => {
      let id = req.query.id;
      console.log(req.query.id);
      if (!id) {
            return res.status(200).json({
                  EC: 1,
                  EM: "Missing parameter",
            });
      }
      let message = await shopService.deleteItemProduct(id);
      return res.status(200).json(message);
};

const handleUpdateItemProduct = async (req, res) => {
      const data = req.body;
      let message = await shopService.updateItemProduct(data);
      console.log(message);
      return res.status(200).json(message);
};

module.exports = {
      handleCreateNewItemProduct: handleCreateNewItemProduct,
      handleGetAllProduct: handleGetAllProduct,
      handleGetItemProduct: handleGetItemProduct,
      handleDeleteItemProduct: handleDeleteItemProduct,
      handleUpdateItemProduct: handleUpdateItemProduct,
};
