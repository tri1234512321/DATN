/** @format */

import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions";
import { push } from "connected-react-router";
import './Product.scss';  
import HomeHeader from "../HomeHeader/HomeHeader";

class Product extends Component {
      handleAddToCart = () => {
        this.props.navigate('/ShoppingCart');
      };
      state = {
        products: [
          {
            "_id": "1",
            "title": "Cơm Ba Ghiền - Nguyễn Văn Trỗi",
            "src": [
              "https://images.foody.vn/res/g116/1155652/prof/s640x400/foody-upload-api-foody-mobile-im-6522b18f-221112225428.jpeg",
              "https://cdn.tgdd.vn/2021/01/CookRecipe/Avatar/com-chien-ga-xoi-mo-thumbnail.jpg",
              "https://images.foody.vn/res/g112/1110463/prof/s/foody-upload-api-foody-mobile-co-572acce3-211011184429.jpeg",
              "https://cdn.tgdd.vn/Files/2021/02/05/1325804/4-mon-an-kem-voi-thit-kho-tau-chong-ngan-hieu-qua-202102051013091497.jpg"
            ],
            "description": "146/3 Nguyễn Văn Trỗi, P. 8, Phú Nhuận, TP. HCM",
            "content": "Mở cửa: 00:00 - 23:59",
            "price": "40.000 - 120.000",
            "totalStars": 5,
            "filledStars": 4,
            "count": 1
          }
        ],
        index: 0,
      };
      renderFoodList = () => {
        const foodCategories = [
          {
            category: "MÓN ĐANG GIẢM",
            items: [
              // Danh sách các món đang giảm giá
               { id: 1, name: "Trà tắc", image: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjvcSo_vdZHvkYnTpJD65o19dnT5V0OZG8ZJf6yuvCDwMSkNpY4dHOD7bj4O-NYB6Ehnr-2d7bd_R8gJtRlRt8RvZbCZDK85OKytkOQNsGAx4Agc5P0nijs0swIlPjG_NyjNM5EhrwptpXRPQIRAf-ADb-Q7oNJkmC5zbr2gNVnrO5EhkvJWCILYd1_TQ/w640-h360/tra%20tac%20thao%20moc%20kinh%20doanh.jpg", price: "1,000"},
            ],
          },
          {
            category: "MÓN CHÍNH🔥",
            items: [
              // Danh sách các món chính
              { id: 1, name: "Cơm sườn ốp la", image: "https://images.foody.vn/res/g115/1146359/prof/s1242x600/foody-upload-api-foody-mobile-su-2ccf1ae0-220729163908.jpg", price: "69,000" },
              { id: 2, name: "Cơm sườn đặc biệt", image: "https://cafebiz.cafebizcdn.vn/162123310254002176/2022/12/7/com-tam-suon-bi-cha-trung-anh-hoa-quynh-nguyen-1670317945936565526419-1670385940206-16703859407121546487016-1670395722685-16703957227611562343004.jpg", price: "109,000" },
              { id: 3, name: "Cơm sườn", image: "https://www.disneycooking.com/wp-content/uploads/2019/11/com-tam-suon-nuong.jpg", price: "59,000" },
              { id: 4, name: "Cơm sườn chả", image: "https://comtambason.com/wp-content/uploads/2020/12/Suon-cha.png", price: "69,000" },
              { id: 5, name: "Cơm ba rọi nướng", image: "https://assets.grab.com/wp-content/uploads/sites/11/2019/10/13212942/chanlovefoods_60976102_2184740201561405_1404067150002914037_n.jpg", price: "59,000" },
              { id: 6, name: "Cơm sườn bì", image: "https://product.hstatic.net/200000523823/product/com_tam_suon_bi_de3b6fc92e0d4edcbe6c2ec95c3f9f70_1024x1024.jpg", price: "69,000" },
              { id: 7, name: "Cơm bì chả ốp la", image: "https://comtambason.com/wp-content/uploads/2020/12/Bi-cha-op-la.png", price: "49,000" },
              { id: 8, name: "Cơm sườn trứng kho", image: "https://product.hstatic.net/200000523823/product/com_tam_suon_trung_kho_4c5cd7b33227475ea395dee55832a568_master.jpg", price: "69,000" },
              { id: 9, name: "Cơm ba rọi ốp la", image: "https://assets.grab.com/wp-content/uploads/sites/11/2019/10/13213001/damanfood_61711954_620495321758605_80216741110418840_n.jpg", price: "69,000" },
              { id: 10, name: "Cơm thịt kho trứng", image: "https://comtamanhtu.com/images/uploads/2015/07/20/0-B2.jpg", price: "49,000" },
            ],
          },
          {
            category: "MÓN THÊM❤️‍🔥",
            items: [
             
              { id: 1, name: "Cơm thêm", image: "https://image-us.eva.vn/upload/3-2019/images/2019-07-21/khi-nau-com-chi-can-them-2-thu-nay-dam-bao-com-ngon-deo-ma-khong-bi-dinh-4c73c54d59094ac99f26ab4fe8160fb0-1563706761-958-width620height451.jpeg", price: "10,000" },
              { id: 2, name: "Chả thêm", image: "https://cdn.tgdd.vn/Files/2020/04/13/1248805/cach-lam-cha-trung-ngon-nhu-ngoai-hang-com-tam.jpg", price: "15,000" },
              { id: 3, name: "Bì thêm", image: "https://www.hoidaubepaau.com/wp-content/uploads/2018/07/bi-heo-tron-thinh.jpg", price: "15,000" },
              { id: 4, name: "Trứng thêm", image: "https://media.dolenglish.vn/PUBLIC/MEDIA/ece3faa2-6a64-4926-8c07-6055cf2bbbc9.jpg", price: "12,000" },
              { id: 5, name: "Lạp xưởng thêm", image: "https://pos.nvncdn.net/27f850-32865/ps/20181106_qAan3Oi6pXGNj5Vwk2U71yYo.jpg", price: "29,000" },
              { id: 6, name: "Thịt kho trứng thêm", image: "https://cdn.tgdd.vn/Files/2017/03/28/965845/cach-lam-thit-kho-trung-5_760x450.jpg", price: "45,000" },
              { id: 7, name: "Sườn thêm", image: "https://media.loveitopcdn.com/19212/cach-lam-com-tam-suon-nuong-ngon-tot-cho-suc-khoe-1.jpg", price: "45,000" },
              { id: 8, name: "Ba rọi thêm", image: "https://img-global.cpcdn.com/recipes/03cf0451546675ac/680x482cq70/th%E1%BB%8Bt-ba-r%E1%BB%8Di-n%C6%B0%E1%BB%9Bng-recipe-main-photo.jpg", price: "45,000" },
              { id: 9, name: "Gà thêm", image: "https://product.hstatic.net/200000407109/product/img_3444_1bbe5212d1da4e82885fd736f881a905_1024x1024.jpg", price: "45,000" },
            ],
          },
          {
            category: "ĐỒ UỐNG🥤",
            items: [
              // Danh sách các món đang giảm giá
               { id: 1, name: "Trà tắc", image: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjvcSo_vdZHvkYnTpJD65o19dnT5V0OZG8ZJf6yuvCDwMSkNpY4dHOD7bj4O-NYB6Ehnr-2d7bd_R8gJtRlRt8RvZbCZDK85OKytkOQNsGAx4Agc5P0nijs0swIlPjG_NyjNM5EhrwptpXRPQIRAf-ADb-Q7oNJkmC5zbr2gNVnrO5EhkvJWCILYd1_TQ/w640-h360/tra%20tac%20thao%20moc%20kinh%20doanh.jpg", price: "15,000" },
               { id: 2, name: "Cafe sữa", image: "https://product.hstatic.net/1000287491/product/4._ca_phe_sua_da.jpg", price: "20,000" },
               { id: 3, name: "Coca + tẩy đá", image: "https://songseafoodgrill.vn/wp-content/uploads/2022/03/Coca-2.png", price: "20,000" },
               { id: 4, name: "Nước suối + tẩy đá", image: "https://cdn.tgdd.vn/Products/Images/2563/79249/nuoc-tinh-khiet-dasani-500ml-thumb-600x600.jpg", price: "10,000" },
               { id: 5, name: "Cafe đen", image: "https://cafebuivan.com.vn/thumbs/500x470x2/upload/product/ca-phe-den-da-1362.png", price: "15,000" },
            ],
          },
         
        ];
        return foodCategories.map((category) => (
          <div className="food-category" key={category.category}>
            <h2>{category.category}</h2>
            <div className="food-list">
              {category.items.map((item) => (
                <div className="food-item" key={item.id}>
                  <img src={item.image} alt={item.name} />
                  <p>{item.name}</p>
                  <p>${item.price}</p>
                  <button>+</button>
                </div>
              ))}
            </div>
          </div>
        ));
      };
    
      myRef = React.createRef();
    
      handleTab = index => {
        this.setState({ index: index });
        const images = this.myRef.current.children;
        for (let i = 0; i < images.length; i++) {
          images[i].className = images[i].className.replace("active", "");
        }
        images[index].className = "active";
      };
    
      componentDidMount() {
        const { index } = this.state;
        this.myRef.current.children[index].className = "active";
      }
    
      render() {
        const { products, index } = this.state;
        return (
          <div className="app">
            <HomeHeader/>
            {products.map(item => (
              <React.Fragment key={item._id}>
              <div className="details">
                <div className="big-img">
                  <img src={item.src[index]} alt="" />
                </div>
    
                <div className="box">
                  <div className="row">
                    <h2>{item.title}</h2>
                    <span>${item.price}</span>
                  </div>
                  <Stars totalStars={item.totalStars} filledStars={item.filledStars} />
                  <p>{item.description}</p>
                  <p>{item.content}</p>
    
                  <DetailsThumb images={item.src} tab={this.handleTab} myRef={this.myRef} />
                  <button className="cart" onClick={this.handleAddToCart}>Add to cart</button>             
                </div>
             
              </div>
              <div className="divider" />
              <div className="food-section-container"></div>
            <div className="food-section">  
               {this.renderFoodList()}
              </div>
              </React.Fragment> 
              ))} 
          </div>
        );
      }
    }
    
    class Stars extends Component {
      render() {
        const { totalStars, filledStars } = this.props;
        return (
          <div className="stars">
            {[...Array(totalStars)].map((_, index) => (
              <span
                key={index + 1}
                style={{ color: index < filledStars ? 'gold' : 'gray' }}
              >
                ★
              </span>
            ))}
          </div>
        );
      }
    }
    
    class DetailsThumb extends Component {
      render() {
          const {images, tab, myRef} = this.props;
          return (
              <div className="thumb" ref={myRef}>
                  {
                  images.map((img, index) =>(
                      <img src={img} alt="" key={index} 
                      onClick={() => tab(index)}
                      />
                  ))
                  }
              </div>
          )
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

export default connect(mapStateToProps, mapDispatchToProps)(Product);
export { Stars, DetailsThumb };
