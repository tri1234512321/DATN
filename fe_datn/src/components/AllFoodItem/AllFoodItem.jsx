import React, { Component } from "react";
import { Buffer } from "buffer";
import { Fragment } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";
import { faDollarSign, faStar } from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import * as actions from "../../store/actions";
import "./AllFoodItem.scss";
import Slider from "rc-slider"; // Import Slider
import "rc-slider/assets/index.css"; // Import CSS cho slider
import StarRating from "./StarRating";

class AllFoodItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      previewImage: "",
      minPrice: 10000, // Thiết lập giá trị mặc định
      maxPrice: 100000, // Thiết lập giá trị mặc định
      minRate: 1,
      maxRate: 5,
      searchQuery: "",
      isImageModalOpen: false,
      selectedImage: "",
    };
  }

  async componentDidMount() {
    await this.props.getAllProductByBuyer();
  }

  openPreview = (imageUrl) => {
    if (imageUrl) {
      this.setState({
        isImageModalOpen: true,
        selectedImage: imageUrl,
      });
    }
  };

  handleAddFoodToCart = async (product) => {
    const currentdate = new Date();
    const datetime = `Last Sync: ${currentdate.getDate()}/${
      currentdate.getMonth() + 1
    }/${currentdate.getFullYear()} @ ${currentdate.getHours()}:${currentdate.getMinutes()}:${currentdate.getSeconds()}`;
    const amountFood = 1;
    const access_token = this.props.userInfo.data.access_token;
    const data = {
      idFood: product.id,
      idShop: product.idShop,
      amountFood: amountFood,
      timeAt: datetime,
      access_token: access_token,
    };
    await this.props.addFoodToCart(data);
  };

  handleSearchChange = (e) => {
    this.setState({ searchQuery: e.target.value });
  };

  handleSliderChangePrice = (value) => {
    // Cập nhật state khi thanh kéo thay đổi
    this.setState({
      minPrice: value[0],
      maxPrice: value[1],
    });
  };

  handleSliderChangeRating = (value) => {
    // Cập nhật state khi thanh kéo thay đổi
    this.setState({
      minRate: value[0],
      maxRate: value[1],
    });
  };

  applyFilter = () => {
    this.setState({ filterApplied: true });
  };

  normalizeString = (str) => {
    return str
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "") // Loại bỏ dấu tiếng Việt
      .replace(/\s+/g, "") // Loại bỏ khoảng trắng
      .toLowerCase(); // Chuyển về chữ thường
  };

  generateVariations = (str) => {
    const variations = [];
    const words = str.split(/\s+/);

    // Thay thế các ký tự có dấu bằng không dấu
    const replaceDiacritics = (word) => {
      return word
        .replace(/á|à|ả|ã|ạ/g, "a")
        .replace(/é|è|ẻ|ẽ|ẹ/g, "e")
        .replace(/í|ì|ỉ|ĩ|ị/g, "i")
        .replace(/ó|ò|ỏ|õ|ọ/g, "o")
        .replace(/ú|ù|ủ|ũ|ụ/g, "u")
        .replace(/ý|ỳ|ỷ|ỹ|ỵ/g, "y");
    };

    // Tạo các biến thể cho từ khóa
    words.forEach((word) => {
      const normalizedWord = replaceDiacritics(word).toLowerCase();

      // Biến thể cơ bản
      variations.push(word);
      variations.push(normalizedWord);

      // Biến thể không có dấu
      variations.push(replaceDiacritics(word));

      // Biến thể ghép từ con
      variations.push(normalizedWord.replace(/\s+/g, ""));
    });

    // Biến thể không có dấu và ghép từ
    const combinedWord = words.join("");
    variations.push(replaceDiacritics(combinedWord));

    return [...new Set(variations)]; // Loại bỏ các giá trị trùng lặp
  };

  filterProducts = (products) => {
    console.log("dataProduct: ", this.props.dataProduct);

    const { searchQuery, minPrice, maxPrice } = this.state;
    const normalizedSearchQuery = this.normalizeString(searchQuery);

    // Tạo các biến thể tìm kiếm
    const searchVariations = this.generateVariations(normalizedSearchQuery);

    return products
      .filter(
        (product) =>
          parseFloat(product.price) >= (parseFloat(minPrice) || 0) &&
          parseFloat(product.price) <= (parseFloat(maxPrice) || Infinity)
      )
      .filter((product) => {
        const normalizedFoodName = this.normalizeString(product.foodName);
        const normalizedDescFood = this.normalizeString(product.descFood);

        // Kết hợp toàn bộ tên và mô tả sản phẩm thành một chuỗi duy nhất
        const combinedProductContent =
          normalizedFoodName + " " + normalizedDescFood;

        // Kiểm tra xem bất kỳ biến thể tìm kiếm nào có xuất hiện trong combinedProductContent không
        return searchVariations.some((variation) =>
          combinedProductContent.includes(variation)
        );
      });
  };

  redirectDetail = (id) => {
    this.props.navigate(`/food/${id}`);
  };

  render() {
    const { dataProduct } = this.props;
    const filteredProducts = this.filterProducts(dataProduct);
    const { minPrice, maxPrice, minRate, maxRate } = this.state;

    return (
      <Fragment>
    <div className="flex justify-center">
      <div className="max-w-[1200px] bg-white px-[15px] py-[20px]">
        <div
          className='primary-text'
          style={{
            fontWeight: 600,
            fontSize: "32px",
            lineHeight: 1.4,
            marginBottom: "12px",
          }}
        >
          Lưa chọn nhanh
        </div>
        {this.state.isImageModalOpen && (
          <div
            className="image-modal"
            onClick={() => this.setState({ isImageModalOpen: false })}
          >
            <div className="image-modal-content">
              <img src={this.state.selectedImage} alt="Preview" />
            </div>
          </div>
        )}
        <div className="wrap-product">
          <div className="search-bar">
            <input
              type="text"
              placeholder="Tìm kiếm sản phẩm..."
              value={this.state.searchQuery}
              onChange={this.handleSearchChange}
              className="search-input"
            />
            <button onClick={this.handleSearchSubmit} className="search-button">
              Tìm kiếm
            </button>
          </div>
          <div className="container-product">
            <div className="row">
              <div className="filter-column">
                <div className="pb-4 mb-4 border-b border-black">
                  <h2 className="mb-4 flex items-center">
                    <FontAwesomeIcon icon={faDollarSign} className="mr-2" />
                    Filter by Price
                  </h2>
                  <Slider
                    range
                    min={10000}
                    max={100000}
                    value={[minPrice, maxPrice]}
                    onChange={this.handleSliderChangePrice}
                    step={1000} // Bước nhảy của slider
                  />
                  <div className="price-labels flex justify-between">
                    <span>{minPrice.toLocaleString()}₫</span>
                    <span>{maxPrice.toLocaleString()}₫</span>
                  </div>
                </div>

                <div className="pb-4 mb-4 border-b border-black">
                  <h2 className="mb-4 flex items-center">
                    <FontAwesomeIcon
                      icon={faStar}
                      className="mr-2 text-yellow-500"
                    />
                    Filter by rating
                  </h2>
                  <Slider
                    range
                    min={1}
                    max={5}
                    value={[minRate, maxRate]}
                    onChange={this.handleSliderChangeRating}
                    step={1} // Bước nhảy của slider
                  />
                  <div className="price-labels flex justify-between">
                    <span>
                      1{" "}
                      <FontAwesomeIcon
                        icon={faStar}
                        className="mr-2 text-yellow-500"
                      />
                    </span>
                    <span>
                      5{" "}
                      <FontAwesomeIcon
                        icon={faStar}
                        className="mr-2 text-yellow-500"
                      />
                    </span>
                  </div>
                </div>
              </div>

              <div className="product-list">
                <div className="row-foods">
                  {filteredProducts && filteredProducts.length > 0 ? (
                    filteredProducts.map((product) => {
                      let imageBase64 = "";
                      if (product.primaryImage) {
                        imageBase64 = Buffer.from(
                          product.primaryImage,
                          "base64"
                        ).toString("binary");
                      }
                      return (
                        <div className="col-food" key={product.id}>
                          <div
                            className="image-description"
                            style={{ backgroundImage: `url('${imageBase64}')` }}
                            onClick={() => this.redirectDetail(product.id)}
                            // onClick={() => this.openPreview(imageBase64)}
                          >
                            {/* <div className="overlay">
                              <FontAwesomeIcon
                                icon={icon({ name: "expand" })}
                                className="expand-icon"
                              />
                            </div> */}
                          </div>
                          <div className="descFood">
                            <p>
                              <strong>{product.foodName}</strong>
                              {/* |{" "}{product.descFood} */}
                            </p>
                          </div>
                          <div className="ratings">
                            <StarRating
                              rating={Number(product?.rate?.rateAverage)}
                            />
                            <span>
                              {product?.rate?.volumnAns
                                ? "Rates: " + product?.rate?.volumnAns
                                : "Rates: 0"}
                            </span>
                            
                          </div>
                          <div className="price-info">
                            <span className="text-red-400 text-xl">{product.price} <sup>₫</sup></span>
                            <span>Đã bán: 123</span>
                            {/* <span
                              className="view-details"
                              
                            >
                              xem chi tiết
                            </span> */}
                          </div>
                          <div className="btn-add-buy">
                            <button
                              className="btn-add"
                              onClick={() => this.handleAddFoodToCart(product)}
                            >
                              Thêm vào giỏ
                            </button>
                            <button
                              className="btn-buy-now"
                              onClick={() =>
                                this.toggleUpdateItemProduct(product.id)
                              }
                            >
                              Mua
                            </button>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <p>Không có sản phẩm nào phù hợp với bộ lọc.</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  isLoggedIn: state.user.isLoggedIn,
  lang: state.app.language,
  userInfo: state.user.userInfo,
  dataProduct: state.buyer.dataProduct,
  allCart: state.buyer.allCart,
});

const mapDispatchToProps = (dispatch) => ({
  getAllProductByBuyer: () =>
    dispatch(actions.fetchAllItemProductByBuyerStart("All")),
  addFoodToCart: (data) => dispatch(actions.fetchAddFoodToCartStart(data)),
  navigate: (path) => dispatch(push(path)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AllFoodItem);
