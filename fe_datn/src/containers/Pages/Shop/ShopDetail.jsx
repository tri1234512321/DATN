import React from "react";
// import { useNavigate } from "react-router-dom";
import { Button, Card, Col, Divider, Image, Row, Typography } from "antd";
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
import HomeHeader from "../../../components/HomeHeader/HomeHeader";
import Footer from "../../../components/Footer/Footer";
// import AllFoodItem from "../../../components/AllFoodItem/AllFoodItem";
import AllFoodShop from "../../../components/AllFoodShop/AllFoodShop";

const ShopDetail = () => {
  //   const navigate = useNavigate(); check
  const parts = window.location.href.split("/");
  const idShop = Number(parts[parts.length - 1]);



  return (
    <div style={{ width: "100%" }}>
      <HomeHeader/>
      {/* <div className="h-[400px]">
        <div
          style={{
            position: "relative",
            width: "100%",
            height: "300px",
            backgroundImage: `url(https://arabiancenter.com/wp-content/uploads/sites/7/2023/04/Avatar-Cotton-Candy.jpg)`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
 
          <div
            style={{
              width: "150px",
              height: "150px",
              borderRadius: "50%",
              backgroundImage:
                "url('https://arabiancenter.com/wp-content/uploads/sites/7/2023/04/Avatar-Cotton-Candy.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              border: "2px solid white",
              position: "absolute",
              top: "100%",
              left: "20%",
              transform: "translate(-50%, -50%)",
              zIndex: 2, // Đảm bảo ảnh đại diện không bị chồng lấp
            }}
          ></div>

         
          <div
            style={{
              textAlign: "center",
              top: "300px",
              zIndex: 1,
              position: "relative",
            }}
          >
            <p style={{ fontSize: "24px", fontWeight: "bold" }}>Tên Shop</p>
            <p>Số lượt mua: 5000</p>
            <p>Đánh giá: 4.9/5 (3000 đánh giá)</p>
            <p>Giờ đóng cửa: 21h | giờ mở cửa 9h </p>
          </div>
        </div>
      </div>
      
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          backgroundColor: "#F1F5F9",
          padding: "20px",
        }}
      >
        <div
          style={{
            display: "flex",
            padding: "16px",
            width: "75%",
            backgroundColor: "white",
          }}
        >
          <Image
            alt=""
            preview={false}
            style={{ width: "384px" }}
            src="https://down-vn.img.susercontent.com/vn-11134259-7r98o-lwfsbsxvgogp92@resize_ss576x330"
          />
          <div>Thông tin giới thiệu về quán</div>
        </div>
      </div>
      
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          backgroundColor: "#F1F5F9",
          padding: "20px",
        }}
      >
        <div
          style={{
            display: "flex",
            padding: "16px",
            width: "75%",
            backgroundColor: "white",
          }}
        >
          <Image
            alt=""
            preview={false}
            style={{ width: "384px" }}
            src="https://down-vn.img.susercontent.com/vn-11134259-7r98o-lwfsbsxvgogp92@resize_ss576x330"
          />
          <div style={{ paddingLeft: "20px" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "12px",
              }}
            >
              <CheckCircleOutlined
                style={{
                  fontSize: "25px",
                  paddingRight: "10px",
                  color: "#16A34A",
                }}
              />
              <p style={{ fontSize: "30px", fontWeight: "600" }}>
                Những món bán chạy nhất của quán
              </p>
            </div>

            <Row gutter={[16, 16]}>
              <Col span={12}>
                <div style={{ display: "flex" }}>
                  <TagOutlined style={{ fontSize: "20px", color: "#6B7280" }} />
                  <p style={{ paddingLeft: "8px", color: "#6B7280" }}>
                    Sản phẩm:
                  </p>
                  <p style={{ paddingLeft: "8px", color: "#DC2626" }}>50</p>
                </div>
              </Col>
              <Col span={12}>
                <div style={{ display: "flex" }}>
                  <UsergroupAddOutlined
                    style={{ fontSize: "20px", color: "#6B7280" }}
                  />
                  <p style={{ paddingLeft: "8px", color: "#6B7280" }}>
                    Người theo dõi:
                  </p>
                  <p style={{ paddingLeft: "8px", color: "#DC2626" }}>5000</p>
                </div>
              </Col>
              <Col span={12}>
                <div style={{ display: "flex" }}>
                  <UserOutlined
                    style={{ fontSize: "20px", color: "#6B7280" }}
                  />
                  <p style={{ paddingLeft: "8px", color: "#6B7280" }}>
                    Đang theo dõi:
                  </p>
                  <p style={{ paddingLeft: "8px", color: "#DC2626" }}>950</p>
                </div>
              </Col>
              <Col span={12}>
                <div style={{ display: "flex" }}>
                  <StarOutlined
                    style={{ fontSize: "20px", color: "#6B7280" }}
                  />
                  <p style={{ paddingLeft: "8px", color: "#6B7280" }}>
                    Đánh giá:
                  </p>
                  <p style={{ paddingLeft: "8px", color: "#DC2626" }}>
                    4.9 (37,3k đánh giá)
                  </p>
                </div>
              </Col>
              <Col span={12}>
                <div style={{ display: "flex" }}>
                  <MessageOutlined
                    style={{ fontSize: "20px", color: "#6B7280" }}
                  />
                  <p style={{ paddingLeft: "8px", color: "#6B7280" }}>
                    Tỉ lệ phản hồi chat:
                  </p>
                  <p style={{ paddingLeft: "8px", color: "#DC2626" }}>
                    88% (trong vài giờ)
                  </p>
                </div>
              </Col>
              <Col span={12}>
                <div style={{ display: "flex" }}>
                  <UserAddOutlined
                    style={{ fontSize: "20px", color: "#6B7280" }}
                  />
                  <p style={{ paddingLeft: "8px", color: "#6B7280" }}>
                    Tham gia:
                  </p>
                  <p style={{ paddingLeft: "8px", color: "#DC2626" }}>
                    7 năm trước
                  </p>
                </div>
              </Col>
            </Row>
          </div>
        </div>
      </div> */}
    <div className="bg-[#F1F5F9] pb-[30px]">
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          backgroundColor: "white",
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
              <button className="w-[110px] bg-amber-400">Xem shop</button>
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

      {/* Voucher section */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          backgroundColor: "#F1F5F9",
          padding: "20px",
          marginTop: "40px",
        }}
      >
        <div
          style={{
            padding: "16px",
            width: "1200px",
            height: "100%",
            backgroundColor: "white",
          }}
        >
          <Typography.Title level={4}>Voucher</Typography.Title>

          <div style={{ display: "flex", width: "100%" }}>
            <Card
              style={{
                backgroundColor: "#FFF4F4",
                minWidth: "288px",
                maxWidth: "288px",
                borderColor: "#F87171",
              }}
            >
              <div
                style={{
                  display: "flex",
                  width: "100%",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div>
                  <p
                    style={{
                      color: "#DC2626",
                      fontWeight: "500",
                      fontSize: "18px",
                    }}
                  >
                    Giảm 25k
                  </p>
                  <p style={{ color: "#DC2626" }}>Đơn tối thiểu 250k</p>
                </div>
                <Button type="primary" style={{ backgroundColor: "#D0011B" }}>
                  Nhận
                </Button>
              </div>
            </Card>

            <Card
              style={{
                backgroundColor: "#FFF4F4",
                minWidth: "288px",
                maxWidth: "288px",
                borderColor: "#F87171",
                marginLeft: "16px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  width: "100%",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div>
                  <p
                    style={{
                      color: "#DC2626",
                      fontWeight: "500",
                      fontSize: "18px",
                    }}
                  >
                    Giảm 25k
                  </p>
                  <p style={{ color: "#DC2626" }}>Đơn tối thiểu 250k</p>
                </div>
                <Button type="primary" style={{ backgroundColor: "#D0011B" }}>
                  Nhận
                </Button>
              </div>
            </Card>

            <Card
              style={{
                backgroundColor: "#FFF4F4",
                minWidth: "288px",
                maxWidth: "288px",
                borderColor: "#F87171",
                marginLeft: "16px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  width: "100%",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div>
                  <p
                    style={{
                      color: "#DC2626",
                      fontWeight: "500",
                      fontSize: "18px",
                    }}
                  >
                    Giảm 25k
                  </p>
                  <p style={{ color: "#DC2626" }}>Đơn tối thiểu 250k</p>
                </div>
                <Button type="primary" style={{ backgroundColor: "#D0011B" }}>
                  Nhận
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* Products section */}
      {/* <div
        style={{
          display: "flex",
          justifyContent: "center",
          width: "100%",
          marginTop: "40px",
          marginBottom: "40px",
        }}
      >
        <div
          style={{
            display: "flex",
            width: "75%",
            backgroundColor: "#F1F5F9",
            padding: "20px",
          }}
        >
          <div style={{ padding: "16px", width: "100%", height: "100%" }}>
            <div style={{ display: "flex", alignItems: "baseline" }}>
              <MenuOutlined
                style={{ fontSize: "15px", paddingRight: "10px" }}
              />
              <Typography.Title level={4}>
                Danh mục món ăn của quán
              </Typography.Title>
            </div>

            <Divider />

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "16px",
              }}
            >
              {Array.from({ length: 6 }).map((_, i) => (
                <Card
                  key={i}
                  hoverable
                  cover={
                    <img alt="example" src="https://via.placeholder.com/150" />
                  }
                >
                  <Card.Meta
                    title={`Product ${i + 1}`}
                    description="This is the description"
                  />
                  <div
                    style={{
                      marginTop: "8px",
                      fontSize: "18px",
                      fontWeight: "bold",
                    }}
                  >
                    $10.00
                  </div>
                  <Button type="primary" style={{ marginTop: "8px" }}>
                    Add to Cart
                  </Button>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div> */}
      <AllFoodShop idShop={idShop}/>
    </div>
      {/* <Footer/> */}
    </div>
  );
};

export default ShopDetail;
