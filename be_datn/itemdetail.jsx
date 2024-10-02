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
import { debounce } from "lodash";

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
import "antd/dist/reset.css";
import {
  LeftOutlined,
  RightOutlined,
  CloseOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import "./FoodItem.css";

import { createRating, getRating } from "../../../services/buyerService";

const { TabPane } = Tabs;
const { Panel } = Collapse;
const { TextArea } = Input;

const FoodItem = () => {
  const access_token = localStorage.getItem("access_token");
  const parts = window.location.href.split("/");
  const idFood = Number(parts[parts.length - 1]);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getRating({ access_token, idFood });
        setReviews(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [access_token, idFood]); // Thêm dependencies để tránh chạy lại khi không cần thiết

  const foodItem = useMemo(
    () => ({
      name: "Cơm Tấm Sườn Bì Chả",
      images: [
        "https://static.vinwonders.com/production/com-tam-sai-gon-thumb.jpg",
      ],
      rating: 4.8,
      price: "50,000",
    }),
    []
  );

  const description =
    "Cơm tấm sườn bì chả là món ăn đặc sản của miền Nam, bao gồm cơm tấm, sườn nướng, bì và chả trứng.";
  const ingredients = [
    { name: "Cơm tấm", value: "100g" },
    { name: "Sườn nướng", value: "1 miếng" },
    { name: "Bì", value: "50g" },
    { name: "Chả trứng", value: "1 miếng" },
  ];

  const openPreview = (imageUrl) => {
    if (imageUrl) {
      setIsImageModalOpen(true);
      setSelectedImage(imageUrl);
    }
  };

  const relatedDishes = [
    {
      id: 1,
      name: "Cơm Tấm Chả Cá",
      image:
        "https://static.vinwonders.com/production/com-tam-sai-gon-thumb.jpg",
      price: "55,000",
    },
    {
      id: 2,
      name: "Cơm Tấm Sườn Cốt Lết",
      image:
        "https://static.vinwonders.com/production/com-tam-sai-gon-thumb.jpg",
      price: "60,000",
    },
  ];

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

  const [questionInput, setQuestionInput] = useState("");
  const [qaList, setQaList] = useState(questions);
  const [rating, setRating] = useState(0);
  const [reviewInput, setReviewInput] = useState("");
  const [images, setImages] = useState([]); // Để lưu trữ ảnh đã chọn
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const [reviews, setReviews] = useState([]);
  const [fileList, setFileList] = useState([]);
  const [replyInput, setReplyInput] = useState(""); // Trạng thái để lưu trữ câu trả lời
  const [selectedReviewIndex, setSelectedReviewIndex] = useState(null);

  const handleAddQuestion = useCallback(() => {
    if (questionInput.trim()) {
      setQaList([...qaList, { question: questionInput, answers: [] }]);
      setQuestionInput("");
    }
  }, [questionInput, qaList]);

  const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleSubmitReview = async () => {
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
        setReviews([
          ...reviews,
          {
            rating,
            review: reviewInput,
            images,
            replies: [], // Khởi tạo mảng phản hồi
          },
        ]);
        setRating(0);
        setReviewInput("");
      } else {
        setErrorMessage("Đã xảy ra lỗi khi gửi đánh giá.");
      }
    } catch (error) {
      console.error("Lỗi khi gửi đánh giá:", error);
      setErrorMessage("Đã xảy ra lỗi khi gửi đánh giá.");
    }
  };

  const handleReply = (index) => {
    if (selectedReviewIndex === index) {
      // Nếu đang trả lời đánh giá hiện tại, hủy trả lời
      setSelectedReviewIndex(null);
      setReplyInput(""); // Xóa nội dung trả lời
    } else {
      // Nếu không, chọn đánh giá để trả lời
      setSelectedReviewIndex(index);
    }
  };

  const handleCancelReply = () => {
    setSelectedReviewIndex(null);
    setReplyInput(""); // Xóa nội dung trả lời khi hủy
  };
  const handleInputChange = useCallback((e) => {
    setReviewInput(e.target.value);
  }, []);

  const handleSubmitReply = () => {
    if (replyInput.trim() === "" || selectedReviewIndex === null) {
      return;
    }

    const newReviews = [...reviews];
    newReviews[selectedReviewIndex].replies.push(replyInput);
    setReviews(newReviews);
    setReplyInput("");
    setSelectedReviewIndex(null);
  };

  const showModal = (index) => {
    setCurrentImage(index);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  // Xử lý khi ảnh được thay đổi trong Carousel
  const handleCarouselChange = (currentSlide) => {
    setCurrentImage(currentSlide);
  };

  const goToPrevious = () => {
    setCurrentImage((prev) =>
      prev === 0 ? foodItem.images.length - 1 : prev - 1
    );
  };

  const goToNext = () => {
    setCurrentImage((prev) =>
      prev === foodItem.images.length - 1 ? 0 : prev + 1
    );
  };

  const handleImageChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
    setImages(newFileList.map((file) => file.originFileObj));
  };
  console.log("render");
  return (
    <Fragment>
      {isImageModalOpen && (
        <div className="image-modal" onClick={() => setIsImageModalOpen(false)}>
          <div className="image-modal-content">
            <img src={selectedImage} alt="Preview" />
          </div>
        </div>
      )}
      <div className="container mx-auto p-4">
        {/* Phần chi tiết sản phẩm */}
        <div className="flex">
          <div className="w-1/2 p-4">
            <Carousel
              autoplay
              beforeChange={(from, to) => setCurrentImage(to)}
              afterChange={handleCarouselChange}
              initialSlide={currentImage}
            >
              {foodItem.images.map((image, index) => (
                <div key={index} onClick={() => showModal(index)}>
                  <img
                    src={image}
                    alt={`${foodItem.name} ${index + 1}`}
                    className="carousel-image cursor-pointer"
                  />
                </div>
              ))}
            </Carousel>
          </div>
          <div className="w-1/2 p-4">
            <h1 className="text-3xl font-bold mb-4">{foodItem.name}</h1>
            <Rate allowHalf value={foodItem.rating} disabled className="mb-2" />
            <p className="text-xl font-semibold mb-4 text-red-500">
              {foodItem.price} VND
            </p>
            <div className="mb-4">
              <span className="text-gray-700">Số lượng: </span>
              <InputNumber min={1} max={10} defaultValue={1} className="ml-2" />
            </div>
            <div className="btn-add-buy">
              <button
                className="btn-add"
                // onClick={() => this.handleAddFoodToCart(product)}
              >
                Thêm vào giỏ
              </button>
              <button
                className="btn-buy-now"
                // onClick={() => this.toggleUpdateItemProduct(product.id)}
              >
                Mua ngay
              </button>
            </div>
          </div>
        </div>

        {/* Phần thông tin bổ sung */}
        <div className="container mx-auto p-4">
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
        </div>

        {/* Phần gợi ý món ăn liên quan */}
        <div className="container mx-auto p-4">
          <h2 className="text-2xl font-bold mb-4">Món ăn liên quan</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {relatedDishes.map((dish) => (
              <Card
                key={dish.id}
                hoverable
                cover={<img alt={dish.name} src={dish.image} />}
              >
                <Card.Meta
                  title={dish.name}
                  description={`${dish.price} VND`}
                />
              </Card>
            ))}
          </div>
        </div>

        {/* Phần Câu hỏi & Trả lời */}
        <div className="container mx-auto p-4">
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
                value={reviewInput}
                onChange={handleInputChange}
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
                    renderItem={(review) => (
                      <List.Item key={review.id}>
                        <div>
                          <Rate
                            allowHalf
                            value={review.rate}
                            disabled
                            className="mb-2"
                          />
                          <p>{review.content}</p>
                          {review.images.length > 0 && (
                            <div className="flex mt-2">
                              {review.images.map((image, index) => {
                                let imageBase64 = "";
                                if (image.image) {
                                  imageBase64 = Buffer.from(
                                    image.image,
                                    "base64"
                                  ).toString("binary");
                                }
                                return (
                                  <div
                                    key={index}
                                    onClick={() => openPreview(imageBase64)}
                                    style={{
                                      backgroundImage: `url('${imageBase64}')`,
                                    }}
                                    alt={`image-${index}`}
                                    className="image-previews"
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
                        </div>
                      </List.Item>
                    )}
                  />
                </div>
              )}
            </TabPane>
          </Tabs>
        </div>

        {/* Modal để xem ảnh */}
        <Modal
          visible={isModalVisible}
          footer={null}
          onCancel={handleCancel}
          className="modal-carousel"
        >
          <div className="relative">
            <LeftOutlined
              className="absolute left-2 top-1/2 transform -translate-y-1/2 cursor-pointer"
              onClick={goToPrevious}
            />
            <RightOutlined
              className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer"
              onClick={goToNext}
            />
            <Carousel
              dots={false}
              afterChange={handleCarouselChange}
              initialSlide={currentImage}
            >
              {foodItem.images.map((image, index) => (
                <div key={index}>
                  <img
                    src={image}
                    alt={`ảnh-${index}`}
                    className="w-full h-auto"
                  />
                </div>
              ))}
            </Carousel>
          </div>
        </Modal>
      </div>
    </Fragment>
  );
};

export default FoodItem;
