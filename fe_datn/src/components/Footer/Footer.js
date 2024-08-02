/** @format */
import { connect } from "react-redux";
import * as actions from "../../store/actions";
import { push } from "connected-react-router";
import React, { Component } from "react";
import "./footer.scss";

import LogoFood from "../../assets/images/logo.png";
import LogoFb from "../../assets/facebook.png";
import LogoIst from "../../assets/instagram.png";
import LogoLinked from "../../assets/linked.png";

class Footer extends Component {
      render() {
            return (
                  <React.Fragment>
                        <div className='footer'>
                        <hr />
                              <div className="footer-row1">
                                    <div className="wrap-content">
                                          
                                          <p className="headline-col">FFOOD - ĐẶT ĐỒ ĂN LÀNG ĐẠI HỌC NHANH CHÓNG, TIỆN LỢI</p>
                                          <p>FFood là một trong những ứng dụng đặt đồ ăn có sức ảnh hưởng và thu hút sự chú ý của nhiều người dùng với loạt ưu điểm sáng giá
                                          , như chỉ cần vài cú click đơn giản là bạn có thể dễ dàng lựa chọn những món ăn đảm bảo an toàn thực phẩm dù đang ở nơi đâu trong làng đại học
                                          . Tiết kiệm thời gian, hàng lọat deal giảm giá, không chen chúc mua đồ và xếp hàng thanh toán.</p>

                                          <p className="headline-col">Tại sao lại lựa chọn FFood? </p>
                                          <p>Là Website đầu tiên tại làng đại học, FFood đã mang lại nhiều ưu thế và tiện lợi so với đặt hàng qua các trang mạng xã hội.</p>

                                          <p>Danh sách cửa hàng được cập nhật thường xuyên liên tục về địa điểm, giá cả và thời gian; giúp việc mua đồ ăn trực tuyến trở nên dễ dàng.</p>
                                          
                                          <p>Giao diện FFood được tối ưu với các đề mục cụ thể, đồng thời phân chia rõ thành các bộ sưu tập khác nhau trên ứng dụng giúp cho việc đặt hàng online trở nên dễ dàng hơn. </p>

                                          <p>Website đặt đồ ăn bên cạnh hình thức trả tiền mặt khi nhận hàng, người dùng FFood còn có thể thanh toán qua ví điện tử ShopeePay với nhiều ưu đãi hấp dẫn, thẻ tín dụng (Visa/Mastercard), thẻ ATM hoặc tài khoản ngân hàng online (iBanking).</p>
                                    </div>
                              </div>
                              <div className="footer-row2">
                                    <div className="wrap-col">
                                          {/* <hr /> */}
                                          <div className="col-footer">
                                                <p className="headline-col">VỀ FFOOD</p>
                                                <a href="/">Giới Thiệu Về FFood</a>
                                                <a href="/">Tuyển Dụng</a>
                                                <a href="/">Điều Khoản FFood</a>
                                                <a href="/">Chính Sách Bảo Mật</a>
                                                <a href="/">Chính Hãng</a>
                                                <a href="/">Liên Hệ Với Truyền Thông</a>
                                          </div>
                                          <div className="col-footer">
                                                <p className="headline-col">CHĂM SÓC KHÁCH HÀNG</p>
                                                <a href="/">Hướng Dẫn Mua Hàng</a>
                                                <a href="/">Hướng Dẫn Giao Hàng</a>
                                                <a href="/">Thanh Toán</a>
                                                <a href="/">Trả Hàng & Hoàn Tiền</a>
                                                <a href="/">Chăm Sóc Khách Hàng</a>
                                                <a href="/">Chính Sách Bảo Hành</a>
                                          </div>
                                          <div className="col-footer">
                                                <p className="headline-col">THEO DÕI CHÚNG TÔI</p>
                                                <img src={LogoFood} alt='Logo Food' className='img-logo-food'></img>
                                                <a href="/"><img src={LogoFb} alt='Logo Food' className='img-logo'></img> Facebook</a>
                                                <a href="/"><img src={LogoIst} alt='Logo Food' className='img-logo'></img> Instagram</a>
                                                <a href="/"><img src={LogoLinked} alt='Logo Food' className='img-logo'></img> LinkedIn</a>
                                          </div>
                                    </div>
                              </div>
                        </div>
                  </React.Fragment>
            );
      }
}

const mapStateToProps = (state) => {
      return {
            isLoggedIn: state.user.isLoggedIn,
            lang: state.app.language,
            userInfo: state.user.userInfo,
      };
};

const mapDispatchToProps = (dispatch) => {
      return {
            navigate: (path) => dispatch(push(path)),
            processLogout: () => dispatch(actions.processLogout()),
      };
};

export default connect(mapStateToProps, mapDispatchToProps)(Footer);
