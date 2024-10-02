import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";
import { Buffer } from "buffer";
import StarRating from "../AllFoodItem/StarRating";
import "./ItemProduct.scss";
import { Link } from "react-router-dom";

const ItemProduct = ({product}) => {
  // console.log(product.id);
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
        onClick={() => this.openPreview(imageBase64)}
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
          <strong>{product.foodName}</strong>|{" "}
          {product.descFood}
        </p>
      </div>
      <div className="ratings">
        <StarRating
          rating={Number(product?.rate?.rateAverage)}
        />
        <span>
          {product?.rate?.volumnAns
            ? "Đánh giá: " + product?.rate?.volumnAns
            : "Đánh giá: 0"}
        </span>
      </div>
      <div className="price-info">
      <span className="text-red-400 text-xl">{product.price} <sup>₫</sup></span>
        <span>Đã bán: 123</span>
        {/* <Link to={"/food/"+product.id}>
        <span
          className="view-details"
          // onClick={() => this.redirectDetail(product.id)}
        >
          xem chi tiết
        </span>
        </Link> */}
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
  )
}

export default ItemProduct;