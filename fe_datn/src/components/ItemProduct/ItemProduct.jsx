import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";
import { Buffer } from "buffer";
import StarRating from "../AllFoodItem/StarRating";
import "./ItemProduct.scss";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { FaRegEye, FaRegHeart, FaHeart } from "react-icons/fa";
import { makeRequest } from "../Social/axios";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import { useDispatch } from 'react-redux';
import { fetchAddFoodToCartStart } from "../../store/actions/buyerAction";

const ItemProduct = ({product}) => {
  const { currentUser } = useContext(AuthContext);
  const history = useHistory(); // Sử dụng useHistory để chuyển hướng
  const queryClient = useQueryClient();

  const dispatch = useDispatch();
  const addFoodToCart = (data) => {
    dispatch(fetchAddFoodToCartStart(data));
  };

  // const navigate = useNavigate();
  // console.log(product.id);
  let imageBase64 = "";
  if (product.primaryImage) {
    imageBase64 = Buffer.from(
      product.primaryImage,
      "base64"
    ).toString("binary");
  }

  const { isLoading, error, data: favorite } = useQuery(
    ["favorite", product.id], // Add `filters` to the query key
    () =>
      makeRequest.get("/favorite", {
        params: {
          access_token: currentUser.access_token,
          idFoodItem: product.id
        },
      }).then((res) => res.data.item),
    {
      refetchOnWindowFocus: false, // Optional: Prevents refetching on window focus if not needed
    }
  );

  const createMutation = useMutation(
    () => {
      return makeRequest.post("/favorite", {
        access_token: currentUser.access_token,
        idFoodItem: product.id
      });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["favorite", product.id]);
      },
    }
  );

  const deleteMutation = useMutation(
    () => {
      return makeRequest.delete("/favorite", {
        params: {
          access_token: currentUser.access_token,
          idFoodItem: product.id
        },
      });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["favorite", product.id]);
      },
    }
  );

  const handleFavorite = async(e) => {
    e.preventDefault();
    if(favorite && favorite.length===1) {
      await deleteMutation.mutate();
    } else {
      await createMutation.mutate();
    }
  }

  const handleAddFoodToCart = async () => {
    console.log("add");
    const currentdate = new Date();
    const datetime = `Last Sync: ${currentdate.getDate()}/${
      currentdate.getMonth() + 1
    }/${currentdate.getFullYear()} @ ${currentdate.getHours()}:${currentdate.getMinutes()}:${currentdate.getSeconds()}`;
    const amountFood = 1;
    const access_token = currentUser.access_token;
    const data = {
      idFood: product.id,
      idShop: product.idShop,
      amountFood: amountFood,
      timeAt: datetime,
      access_token: access_token,
    };
    await addFoodToCart(data);
  };

  const VND = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  });

  const redirect = (id) => {
    console.log("id: ", id);
    history.push(`/food/${id}`); // Chuyển hướng đến trang chi tiết của shop
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
  });
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-1 overflow-hidden hover:border-black duration-200 cursor-pointer">
      <div className="w-full h-60 relative p-2 pb-3 group">
        {product.discount!==0
          ? <span
              // onClick={open}
              className="bg-yellow-300 text-red-600 absolute left-0 top-0 w-16 text-xs text-center py-1 rounded-md font-semibold inline-block z-10"
            >
              save {(product.price / product.discount).toFixed(0)}%
            </span>
          : null
          }
        <img
          // onClick={handleProduct}
          src={imageBase64}
          alt="productImage"
          className="w-full h-full rounded-md object-cover group-hover:scale-x-[1.06] group-hover:scale-y-[1.085] duration-300"
        />
        {/* <ProductCardSideNav product={item} /> */}
        <div className="absolute rounded-full right-1 top-1 flex flex-col gap-1 transition translate-x-12 group-hover:translate-x-0 duration-300">
          <span
            onClick={handleFavorite}
            className="w-11 h-11 inline-flex bg-white text-black text-lg items-center justify-center rounded-full hover:text-white hover:bg-yellow-100 duration-200"
          >
            {favorite && favorite.length===1 ? <FaHeart style={{ color: 'red' }}/> : <FaRegHeart style={{ color: 'red' }}/>}
          </span>
          {/* <span className="w-11 h-11 inline-flex text-black text-lg items-center justify-center rounded-full hover:text-white hover:bg-black duration-200">
            <LuArrowLeftRight />
          </span> */}
          <span  onClick={()=>redirect(product.id)} className="w-11 h-11 inline-flex bg-white text-black text-lg items-center justify-center rounded-full hover:bg-yellow-100 duration-200">
            <FaRegEye />
          </span>
        </div>
      </div>
      <div className="flex flex-col gap-2 px-2 pb-2">
        <h2 className="text-lg font-bold line-clamp-2 truncate  ...">{product?.foodName}</h2>
        <h3 className="text-xs uppercase font-semibold text-lightText  text-gray-500">
          {product?.category}
        </h3>
        <div className="text-base text-lightText flex items-center">
            <p className="text-red-500">{product?.rate?.rateAverage}</p>
            <StarRating
              rating={Number(product?.rate?.rateAverage)}
            />
            {/* <p className="px-auto w-full text-center"> Đã bán {11+ " k"}</p> */}
        </div>
        {/* <AddToCartBtn product={item} /> */}
        <div className="flex"> 
          <div className="flex items-center gap-2">
            <p className="font-bold text-red-500 text-[700] text-[20px]">
              {VND.format(product.price - product.discount)}
            </p>
            {product.discount !== 0
              ? <p className="line-through text-gray-500 font-medium">
                  {VND.format(product.price)}
                </p>
              : null
            }
          </div>
          {/* <p className="px-auto w-full text-center self-center justify-self-end"> Đã bán {11+ "k"}</p> */}
        </div>
      </div>
      <div className="flex items-center justify-between px-2 pb-2">
        <button onClick={handleAddFoodToCart} type="button" className="w-full text-white bg-yellow-400 hover:bg-yellow-500 focus:none font-medium rounded-lg text-[14px] px-5 py-2.5">
          Thêm vào giỏ
        </button>
      </div>
    </div>
  )
}

export default ItemProduct;