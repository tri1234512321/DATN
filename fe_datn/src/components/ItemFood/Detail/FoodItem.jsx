import React, {
  useState,
  useRef,
  useMemo,
  useCallback,
  useEffect,
  Fragment,
} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";
import { Buffer } from "buffer";
import StarRating from "../../AllFoodItem/StarRating";

import {
  Button,
  Rate,
  InputNumber,
  Card,
  Collapse,
  Input,
  List,
  Carousel,
  Tabs,
  Modal,
  Upload,
} from "antd";
// import "antd/dist/reset.css";
import {
  LeftOutlined,
  RightOutlined,
  CloseOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import "./FoodItem.css";

import {
  createRating,
  getRating,
  createAnsRate,
  buyerGetDetailFoodById,
} from "../../../services/buyerService";
import { text } from "@fortawesome/fontawesome-svg-core";

import { useQuery } from "@tanstack/react-query";
import {makeRequest} from "../../Social/axios";
import ItemProduct from "../../ItemProduct/ItemProduct";
import HomeHeader from "../../HomeHeader/HomeHeader";
import Footer from "../../Footer/Footer";
import { Col, Divider, Image, Row, Typography } from "antd";
import {
  CheckCircleOutlined,
  MenuOutlined,
  MessageOutlined,
  StarOutlined,
  TagOutlined,
  UserAddOutlined,
  UsergroupAddOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useHistory } from "react-router-dom/cjs/react-router-dom";

const { TabPane } = Tabs;
const { Panel } = Collapse;
const { TextArea } = Input;

const FoodItem = () => {
  // const description =
  //   "Cơm tấm sườn bì chả là món ăn đặc sản của miền Nam, bao gồm cơm tấm, sườn nướng, bì và chả trứng.";
  // const ingredients = [
  //   { name: "Cơm tấm", value: "100g" },
  //   { name: "Sườn nướng", value: "1 miếng" },
  //   { name: "Bì", value: "50g" },
  //   { name: "Chả trứng", value: "1 miếng" },
  // ];

  const history = useHistory(); // Sử dụng useHistory để chuyển hướng

  const redirectShopProfile = (id) => {
    console.log("id: ", id);
    history.push(`/shop-details/${id}`); // Chuyển hướng đến trang chi tiết của shop
  };

  const openPreview = (imageUrl) => {
    if (imageUrl) {
      setIsImageModalOpen(true);
      setSelectedImage(imageUrl);
    }
  };

  // const relatedDishes = [
  //   {
  //     id: 1,
  //     name: "Cơm Tấm Chả Cá",
  //     image:
  //       "https://static.vinwonders.com/production/com-tam-sai-gon-thumb.jpg",

  //     price: "55,000",
  //   },
  //   {
  //     id: 2,
  //     name: "Cơm Tấm Sườn Cốt Lết",
  //     image:
  //       "https://static.vinwonders.com/production/com-tam-sai-gon-thumb.jpg",
  //     price: "60,000",
  //   },
  // ];

  const questions = [
    {
      question: "Món này có cay không?",
      answers: [
        "Không, món này không cay, nhưng bạn có thể thêm ớt nếu thích.",
      ],
    },
    {
      question: "Có thể yêu cầu thêm chả không?",
      answers: ["Có, bạn có thể yêu cầu thêm chả với giá 10,000 VND/phần."],
    },
  ];

  const textReview = useRef(null);
  const textAnswer = useRef(null);
  const carouselRef = useRef(null);
  const access_token = localStorage.getItem("access_token");
  const parts = window.location.href.split("/");
  const idFood = Number(parts[parts.length - 1]);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [questionInput, setQuestionInput] = useState("");
  const [qaList, setQaList] = useState(questions);
  const [rating, setRating] = useState(0);
  const [food, setFood] = useState({});
  const [images, setImages] = useState([]); // Để lưu trữ ảnh đã chọn
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const [reviews, setReviews] = useState([]);
  const [fileList, setFileList] = useState([]);
  const [replyImages, setReplyImages] = useState([]);
  const [replyFileList, setReplyFileList] = useState([]);
  const [selectedReviewIndex, setSelectedReviewIndex] = useState(null);
  const [isFetchData, setIsFetchData] = useState(false);

  useEffect(() => {
    const fetchDataRates = async () => {
      try {
        const response = await getRating({ access_token, idFood });
        setReviews(response.data);
        // console.log("res: ", response);
      } catch (error) {
        // console.error(error);
      }
    };

    fetchDataRates();
  }, [access_token, idFood, isFetchData]); // Thêm dependencies để tránh chạy lại khi không cần thiết

  const { isLoading:isLoading1, error:error1, data:data1 =[]} = useQuery(['popular',idFood], async () => {
    const res = await makeRequest.get("/get-most-popular-food");
    return res.data.recommentedFood || [];
    }
  );

  const { isLoading:isLoading2, error:error2, data:data2=[] } = useQuery(['related',idFood], async () => {
    const res = await makeRequest.get("/get-most-regular-food-ordered-with?idFood="+idFood);
    return res.data.recommentedFood || [];
  }
  );

  // const {
  //   isLoading: loadingLike,
  //   error: errorLike,
  //   data: dataLike = [],
  // } = useQuery(["likes", idFood], () =>
  //   makeRequest.get("/get-most-popular-food").then((res) => {
  //     return res.data.recommentedFood || [];
  //   })
  // );

  // const {
  //   isLoading: loadingUnLike,
  //   error: errorUnLike,
  //   data: dataUnLike = [],
  // } = useQuery(["unlikes", idFood], () =>
  //   makeRequest.get("/get-most-regular-food-ordered-with?idFood="+idFood).then((res) => {
  //     return res.data.recommentedFood || [];
  //   })
  // );
  
  // console.log("allRecommentFood: ",idFood,data1,data2);

  useEffect(() => {
    const fetchDataFood = async () => {
      try {
        const dataFood = await buyerGetDetailFoodById({ idFood, access_token });
        console.log("dataFood.data: ", dataFood);
        setFood(dataFood.data);
        console.log("food: ", food);
      } catch (error) {
        console.error(error);
      }
    };
    fetchDataFood();
  }, [access_token, idFood]);

  // const foodItem = {
  //   name: "Cơm Tấm Sườn Bì Chả",
  //   images: [
  //     "https://4.bp.blogspot.com/-rI7R48Jz0ww/VpUm0U5PKhI/AAAAAAAAK2E/6p0ghdDrGgc/s640/com%2Btam%2Bvoi%2Bsuon.jpg",
  //     "https://4.bp.blogspot.com/-rI7R48Jz0ww/VpUm0U5PKhI/AAAAAAAAK2E/6p0ghdDrGgc/s640/com%2Btam%2Bvoi%2Bsuon.jpg",
  //     "https://4.bp.blogspot.com/-rI7R48Jz0ww/VpUm0U5PKhI/AAAAAAAAK2E/6p0ghdDrGgc/s640/com%2Btam%2Bvoi%2Bsuon.jpg",
  //   ],
  //   rating: 4.8,
  //   price: "50,000",
  // };

  const handleAddQuestion = useCallback(() => {
    // console.log("check 1");
    if (questionInput.trim()) {
      setQaList([...qaList, { question: questionInput, answers: [] }]);
      setQuestionInput("");
    }
  }, [questionInput, qaList]);

  const fileToBase64 = (file) => {
    // console.log("check 1");

    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleSubmitReview = async () => {
    // console.log("check 1");

    let reviewInput = textReview.current.resizableTextArea.textArea.value;

    // console.log("reviewInput: ", reviewInput);
    if (rating < 1) {
      setErrorMessage("Vui lòng chọn ít nhất 1 sao.");
      return;
    }
    setErrorMessage("");

    const formData = new FormData();
    formData.append("access_token", access_token);
    formData.append("idFood", idFood);
    formData.append("rate", rating);
    formData.append("content", reviewInput);

    try {
      const base64Images = await Promise.all(images.map(fileToBase64));
      const imagesJSON = JSON.stringify(base64Images);
      // Thêm chuỗi JSON vào FormData
      formData.append("images", imagesJSON);

      setImages([]);
      setFileList([]);
      // Gọi API để gửi đánh giá
      const response = await createRating(formData);
      // Xử lý phản hồi từ API
      if (response.EC === 0) {
        setIsFetchData(!isFetchData);
        textReview.current.resizableTextArea.textArea.value = "";
        setRating(0);
      } else {
        setErrorMessage("Đã xảy ra lỗi khi gửi đánh giá.");
      }
    } catch (error) {
      console.error("Lỗi khi gửi đánh giá:", error);
      setErrorMessage("Đã xảy ra lỗi khi gửi đánh giá.");
    }
  };

  const handleReply = (index) => {
    // console.log("check 1");

    if (selectedReviewIndex === index) {
      // Nếu đang trả lời đánh giá hiện tại, hủy trả lời
      setSelectedReviewIndex(null);
      textAnswer.current.resizableTextArea.textArea.value = "";
    } else {
      // Nếu không, chọn đánh giá để trả lời
      setSelectedReviewIndex(index);
    }
  };

  const handleCancelReply = () => {
    // console.log("check 1");

    setSelectedReviewIndex(null);
    textAnswer.current.resizableTextArea.textArea.value = "";
  };

  const handleReplyImageChange = ({ fileList: newFileList }) => {
    // console.log("check 1");

    setReplyFileList(newFileList);
    setReplyImages(newFileList.map((file) => file.originFileObj));
  };
  const handleSubmitReply = async (index) => {
    // console.log("check 1");

    // console.log("index: ", index);
    // console.log("selectedReviewIndex: ", selectedReviewIndex);
    let replyInput = textAnswer.current.resizableTextArea.textArea.value;
    if (replyInput.trim() === "" || selectedReviewIndex === null) {
      return;
    }
    const formData = new FormData();
    formData.append("access_token", access_token);
    formData.append("rateId", index);
    formData.append("content", replyInput);

    let newReviews = [...reviews];
    let indexAns = 0;
    for (let i = 0; i < newReviews.length; i++) {
      if (newReviews[i].id === selectedReviewIndex && !newReviews[i].replies) {
        newReviews[i].replies = [];
        indexAns = i;
      }
    }
    let reply = {};
    try {
      const base64Images = await Promise.all(replyImages.map(fileToBase64));
      const imageJSON = JSON.stringify(base64Images);
      formData.append("images", imageJSON);
      // call api reply
      const response = await createAnsRate(formData);
      if (response.EC === 0) {
        // console.log(response.data);
        setIsFetchData(!isFetchData);
        // reply = { content: replyInput, images: base64Images };
        // newReviews[indexAns].replies.push(reply);
        // setReviews(newReviews);
        setSelectedReviewIndex(null);
        textAnswer.current.resizableTextArea.textArea.value = "";
        setReplyImages([]);
        setReplyFileList([]);
      } else {
        console.error("Error from server!");
      }
    } catch (error) {
      console.error("Lỗi khi thêm ảnh vào trả lời:", error);
    }
    // access_token, content, images, idRate

    // Gọi API để lưu trữ trả lời nếu cần thiết
  };

  const showModal = (index) => {
    // console.log("check model");

    setCurrentImage(index);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    // console.log("check 1");

    setIsModalVisible(false);
  };

  const goToPrevious = () => {
    // console.log("check 1");

    setCurrentImage((prev) => {
      const previousImage = prev - 1 < 0 ? food?.images?.length - 1 : prev - 1;
      carouselRef.current.goTo(previousImage);
      return previousImage;
    });
  };

  const goToNext = () => {
    // console.log("check 1");

    setCurrentImage((prev) => {
      const nextImage = prev + 1 >= food?.images?.length ? 0 : prev + 1;
      carouselRef.current.goTo(nextImage);
      return nextImage;
    });
    // console.log("check: ");
  };

  const handleImageChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
    setImages(newFileList.map((file) => file.originFileObj));
  };
  // console.log("render: ");
  // console.log("currentImage: ", currentImage);
  return (
    <Fragment>
      <HomeHeader/>
      {isImageModalOpen && (
        <div className="image-modal" onClick={() => setIsImageModalOpen(false)}>
          <div className="image-modal-content">
            <img src={selectedImage} alt="Preview" />
          </div>
        </div>
      )}
      <div className="container p-4 bg-[#F1F5F9] pb-[50px]">
        {/* Phần chi tiết sản phẩm */}
        <div className="flex max-w-[1200px] mx-auto bg-white">
          <div className="w-1/2 p-4">
            <Carousel
              beforeChange={(from, to) => setCurrentImage(to)}
              initialSlide={currentImage}
            >
              {food?.images?.map((image, indexImg) => {
                let imageBase64 = "";
                if (image) {
                  imageBase64 = Buffer.from(image, "base64").toString("binary");
                }
                return (
                  <div
                    key={indexImg}
                    onClick={() => showModal(indexImg)}
                    className="relative group cursor-pointer"
                  >
                    <div
                      key={indexImg}
                      style={{
                        backgroundImage: `url('${imageBase64}')`,
                      }}
                      alt={`image-${indexImg}`}
                      className="carousel-image w-full h-full bg-center bg-cover transition-transform duration-300 p-[2px] rounded-[8px] border-2 border-[#ddd]"
                    ></div>
                    {/* <img
                      src={image}
                      alt={`${food?.foodName} ${index + 1}`}
                      className="carousel-image w-full h-full object-cover transition-transform duration-300"
                    /> */}
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 hover:rounded-[8px] transition-opacity duration-300 flex items-center justify-center">
                      <span className="text-white text-lg font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        Click to view
                      </span>
                    </div>
                  </div>
                );
              })}
            </Carousel>
          </div>

          <div className="w-1/2 p-4 ml-[20px]">
            <h1 className="text-3xl font-bold mb-4">{food?.foodName}</h1>
            <div className="flex">
              <span className="text-xl text-red-500 content-center">4.8</span>
              <StarRating rating={Number(food?.rates?.rateAverage)} />
            </div>
            <p className="text-2xl font-semibold mb-4 text-red-500 ml-[10px] mt-[10px]">
              {food?.price} VND
            </p>
            <div className="mb-4 ml-[10px]">
              <span className="text-gray-700">Số lượng: </span>
              <InputNumber min={1} max={10} defaultValue={1} className="ml-2" />
            </div>
            <div className="btn-add-buy">
              <button
                className="btn-add mr-[30px] px-[20px]"
                // onClick={() => this.handleAddFoodToCart(product)}
              >
                Thêm vào giỏ
              </button>
              <button
                className="btn-buy-now px-[20px]"
                // onClick={() => this.toggleUpdateItemProduct(product.id)}
              >
                Mua ngay
              </button>
            </div>
          </div>
        </div>

        {/* Phần thông tin bổ sung */}
        {/* <div className="container mx-auto p-4">
          <h2 className="text-2xl font-bold mb-4">Thông Tin Bổ Sung</h2>
          <div className="mb-4">
            <h3 className="text-xl font-semibold">Mô tả món ăn:</h3>
            <p className="text-gray-700">{description}</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">Thành phần:</h3>
            <table className="table-auto w-full text-left">
              <tbody>
                {ingredients.map((ingredient, index) => (
                  <tr key={index} className="border-t">
                    <td className="py-2">{ingredient.name}</td>
                    <td className="py-2">{ingredient.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div> */}

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            backgroundColor: "#F1F5F9",
            paddingTop: "20px",
            paddingBottom: "20px",
          }}
        >
          <div
            style={{
              display: "flex",
              padding: "16px",
              width: "1200px",
              backgroundColor: "white",
            }}
          >
            <img
              alt=""
              preview={false}
              className="w-[100px] h-[100px] rounded-full self-center"
              src="https://down-vn.img.susercontent.com/vn-11134259-7r98o-lwfsbsxvgogp92@resize_ss576x330"
            />
            <div className="pl-[30px] w-[270px]">
              <p className="text-xl font-semibold mb-[10px]">Quán cơm Kim Chi</p>
              <div>
                <button className="mb-[10px] w-[110px]">Chat ngay</button>
                <button onClick={()=>redirectShopProfile(5)} className="w-[110px] bg-amber-400">Xem shop</button>
              </div>
            </div>
            <div style={{ paddingLeft: "20px" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "12px",
                }}
              >
                {/* <CheckCircleOutlined
                  style={{
                    fontSize: "25px",
                    paddingRight: "10px",
                    color: "#16A34A",
                  }}
                />
                <p style={{ fontSize: "30px", fontWeight: "600" }}>
                  Những món bán chạy nhất của quán
                </p> */}
              </div>

              <Row gutter={[16, 16]}>
                <Col span={12}>
                  <div style={{ display: "flex" }}>
                    <TagOutlined style={{ fontSize: "20px", color: "#6B7280" }} />
                    <p style={{ paddingLeft: "8px",margin:"0px", color: "#6B7280" }}>
                      Sản phẩm:
                    </p>
                    <p style={{ paddingLeft: "8px",margin:"0px", color: "#DC2626" }}>4</p>
                  </div>
                </Col>
                <Col span={12}>
                  <div style={{ display: "flex" }}>
                    <UsergroupAddOutlined
                      style={{ fontSize: "20px", color: "#6B7280" }}
                    />
                    <p style={{ paddingLeft: "8px",margin:"0px", color: "#6B7280" }}>
                      Người theo dõi:
                    </p>
                    <p style={{ paddingLeft: "8px",margin:"0px", color: "#DC2626" }}>2</p>
                  </div>
                </Col>
                <Col span={12}>
                  <div style={{ display: "flex" }}>
                    <UserOutlined
                      style={{ fontSize: "20px", color: "#6B7280" }}
                    />
                    <p style={{ paddingLeft: "8px",margin:"0px", color: "#6B7280" }}>
                      Đang theo dõi:
                    </p>
                    <p style={{ paddingLeft: "8px",margin:"0px", color: "#DC2626" }}>1</p>
                  </div>
                </Col>
                <Col span={12}>
                  <div style={{ display: "flex" }}>
                    <StarOutlined
                      style={{ fontSize: "20px", color: "#6B7280" }}
                    />
                    <p style={{ paddingLeft: "8px",margin:"0px", color: "#6B7280" }}>
                      Đánh giá:
                    </p>
                    <p style={{ paddingLeft: "8px",margin:"0px", color: "#DC2626" }}>
                      5 (1 đánh giá)
                    </p>
                  </div>
                </Col>
                <Col span={12}>
                  <div style={{ display: "flex" }}>
                    <MessageOutlined
                      style={{ fontSize: "20px", color: "#6B7280" }}
                    />
                    <p style={{ paddingLeft: "8px",margin:"0px", color: "#6B7280" }}>
                      Tỉ lệ phản hồi chat:
                    </p>
                    <p style={{ paddingLeft: "8px",margin:"0px", color: "#DC2626" }}>
                      0% (trong vài giờ)
                    </p>
                  </div>
                </Col>
                <Col span={12}>
                  <div style={{ display: "flex" }}>
                    <UserAddOutlined
                      style={{ fontSize: "20px", color: "#6B7280" }}
                    />
                    <p style={{ paddingLeft: "8px",margin:"0px", color: "#6B7280" }}>
                      Tham gia:
                    </p>
                    <p style={{ paddingLeft: "8px",margin:"0px", color: "#DC2626" }}>
                      7 giờ trước
                    </p>
                  </div>
                </Col>
              </Row>
            </div>
          </div>
        </div>

        {/* Phần Câu hỏi & Trả lời */}
        <div className="container mx-auto p-4 w-[1200px] bg-white">
          <Tabs defaultActiveKey="1">
            <TabPane tab="Đặt câu hỏi của bạn" key="1">
              <Collapse accordion>
                {qaList.map((qa, index) => (
                  <Panel header={qa.question} key={index}>
                    <List
                      dataSource={qa.answers}
                      renderItem={(item) => <List.Item>{item}</List.Item>}
                    />
                  </Panel>
                ))}
              </Collapse>
              <Input
                value={questionInput}
                onChange={(e) => setQuestionInput(e.target.value)}
                placeholder="Nhập câu hỏi của bạn"
                className="mb-2"
              />
              <Button onClick={handleAddQuestion} type="primary">
                Thêm câu hỏi
              </Button>
            </TabPane>
            <TabPane tab="Đánh giá sản phẩm" key="2">
              <Rate
                allowHalf
                value={rating}
                onChange={(value) => setRating(value)}
                className="mb-2"
              />
              <TextArea
                key={reviews?.length}
                ref={textReview}
                rows={4}
                placeholder="Viết đánh giá của bạn..."
                className="mb-2"
              />

              <Upload
                listType="picture"
                showUploadList={true}
                fileList={fileList}
                onChange={handleImageChange}
                beforeUpload={() => false}
              >
                <Button icon={<UploadOutlined />}>Chọn ảnh</Button>
              </Upload>
              {images.length > 0 && (
                <div className="mt-2">
                  <h4 className="text-lg font-semibold mb-1">Ảnh đã chọn:</h4>
                  <div className="flex">
                    {images.map((file, index) => (
                      <img
                        key={index}
                        src={URL.createObjectURL(file)}
                        alt={`ảnh-${index}`}
                        className="w-20 h-20 object-cover mr-2"
                      />
                    ))}
                  </div>
                </div>
              )}
              {errorMessage && (
                <p className="text-red-500 mt-2">{errorMessage}</p>
              )}
              <Button
                onClick={handleSubmitReview}
                type="primary"
                className="mt-2"
              >
                Gửi đánh giá
              </Button>
              {reviews.length > 0 && (
                <div className="mt-4">
                  <h2 className="text-2xl font-bold mb-4">Tất cả đánh giá:</h2>
                  <List
                    dataSource={reviews}
                    renderItem={(review, _index) => (
                      <List.Item key={review.id}>
                        <div>
                          <Rate
                            allowHalf
                            value={review.rate}
                            disabled
                            className="mb-2"
                          />
                          <p>
                            <strong>
                              {review?.infoUser?.firstName + " " +
                                review?.infoUser?.lastName}
                            </strong>
                          </p>
                          <p>{review?.content}</p>
                          {review.images.length > 0 && (
                            <div className="flex mt-2">
                              {review.images.map((image, indexImg) => {
                                let imageBase64 = "";
                                if (image.image) {
                                  imageBase64 = Buffer.from(
                                    image.image,
                                    "base64"
                                  ).toString("binary");
                                }
                                return (
                                  <div
                                    key={indexImg}
                                    onClick={() => openPreview(imageBase64)}
                                    style={{
                                      backgroundImage: `url('${imageBase64}')`,
                                    }}
                                    alt={`image-${indexImg}`}
                                    className="image-previews p-[2px] rounded-[8px] border-2 border-[#ddd]"
                                  >
                                    <div className="overlay">
                                      <FontAwesomeIcon
                                        icon={icon({ name: "expand" })}
                                        className="expand-icon"
                                      />
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          )}
                          {/* Các câu trả lời cho đánh giá */}
                          <div className="border-l border-solid ml-12 my-4 mr-4">
                            {review.replies &&
                              review.replies.map((reply, replyIndex) => (
                                <div
                                  key={replyIndex}
                                  style={{
                                    marginLeft: "20px",
                                    marginTop: "10px",
                                  }}
                                >
                                  <p>
                                    <strong>
                                      {reply?.infoUser?.firstName +
                                        review?.infoUser?.lastName}
                                    </strong>
                                  </p>
                                  <p>{reply.content}</p>
                                  {reply.images && reply.images.length > 0 && (
                                    <div className="flex mt-2">
                                      {reply.images.map((image, indexImg) => {
                                        let imageBase64 = "";
                                        if (image.image) {
                                          imageBase64 = Buffer.from(
                                            image.image,
                                            "base64"
                                          ).toString("binary");
                                        }
                                        return (
                                          <div
                                            key={indexImg}
                                            onClick={() =>
                                              openPreview(imageBase64)
                                            }
                                            style={{
                                              backgroundImage: `url('${imageBase64}')`,
                                            }}
                                            alt={`image-${indexImg}`}
                                            className="image-previews p-[2px] rounded-[8px] border-2 border-[#ddd]"
                                          >
                                            <div className="overlay">
                                              <FontAwesomeIcon
                                                icon={icon({ name: "expand" })}
                                                className="expand-icon"
                                              />
                                            </div>
                                          </div>
                                        );
                                      })}
                                    </div>
                                    // <div>
                                    //   {reply.images.map((image, imgIndex) => (
                                    //     <img
                                    //       key={imgIndex}
                                    //       src={image.image}
                                    //       alt={`Reply image ${imgIndex}`}
                                    //       style={{
                                    //         width: "100px",
                                    //         marginRight: "10px",
                                    //       }}
                                    //     />
                                    //   ))}
                                    // </div>
                                  )}
                                </div>
                              ))}
                          </div>

                          {/* Khu vực nhập trả lời */}
                          <div className="mt-4">
                            <Button
                              onClick={() => handleReply(review.id)}
                              className="mr-2"
                            >
                              Trả lời
                            </Button>
                            {selectedReviewIndex === review.id && (
                              <div className="ml-6 mt-4">
                                <TextArea
                                  key={review.id}
                                  ref={textAnswer}
                                  rows={2}
                                  placeholder="Viết câu trả lời của bạn..."
                                  className="mb-2"
                                />
                                <Upload
                                  listType="picture"
                                  showUploadList={true}
                                  fileList={replyFileList}
                                  onChange={handleReplyImageChange}
                                  beforeUpload={() => false}
                                >
                                  <Button icon={<UploadOutlined />}>
                                    Chọn ảnh
                                  </Button>
                                </Upload>
                                <Button
                                  onClick={() => handleSubmitReply(review.id)}
                                  type="primary"
                                  className="mr-2"
                                >
                                  Gửi
                                </Button>
                                <Button onClick={handleCancelReply}>Hủy</Button>
                              </div>
                            )}
                          </div>
                        </div>
                      </List.Item>
                    )}
                  />
                </div>
              )}
            </TabPane>
          </Tabs>
        </div>

        <div className="container mx-auto mt-[30px] w-[1200px] ">
          <h2 className="text-2xl font-bold mb-4">Món ăn nổi bật</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">    
            {error1
              ? "Something went wrong!"
              : isLoading1
              ? "loading"
              : data1.map((product) => <ItemProduct product={product}/>)}
          </div>
        </div>

        <div className="container mx-auto mt-[30px] w-[1200px] ">
          <h2 className="text-2xl font-bold mb-4">Người dùng cũng thường mua</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {error2
              ? "Something went wrong!"
              : isLoading2
              ? "loading"
              : data2.map((product) => <ItemProduct product={product}/>)}
          </div>
        </div>

        

        {/* Modal để xem ảnh */}
        <Modal
          visible={isModalVisible}
          footer={null}
          onCancel={handleCancel}
          className="modal-carousel max-w-4xl mx-auto"
          style={{ width: "720px" }}
        >
          <div className="relative">
            {food?.images?.length > 1 && (
              <LeftOutlined
                className="z-10 absolute left-[-34px] top-1/2 transform -translate-y-1/2 cursor-pointer rounded-full bg-white p-2 border border-solid border-gray-800 hover:bg-gray-100"
                onClick={goToPrevious}
              />
            )}
            {food?.images?.length > 1 && (
              <RightOutlined
                className="z-10 absolute right-[-34px] top-1/2 transform -translate-y-1/2 cursor-pointer rounded-full bg-white p-2 border border-solid border-gray-800 hover:bg-gray-100"
                onClick={goToNext}
              />
            )}
            <Carousel
              ref={carouselRef}
              dots={false}
              initialSlide={currentImage}
              className="rounded-lg"
            >
              {food?.images?.map((image, indexImg) => {
                let imageBase64 = "";
                if (image) {
                  imageBase64 = Buffer.from(image, "base64").toString("binary");
                }
                return (
                  <div
                    key={indexImg}
                    className="w-full h-80 overflow-hidden flex items-center justify-center bg-gray-200 rounded-lg"
                  >
                    <div
                      key={indexImg}
                      style={{
                        backgroundImage: `url('${imageBase64}')`,
                      }}
                      alt={`image-${indexImg}`}
                      className="carousel-image w-full bg-center bg-cover transition-transform duration-300 p-[2px] rounded-[8px] border-2 border-[#ddd]"
                    ></div>
                  </div>
                );
              })}
            </Carousel>
          </div>
        </Modal>
      </div>
      {/* <Footer/> */}
    </Fragment>
  );
};

export default FoodItem;
