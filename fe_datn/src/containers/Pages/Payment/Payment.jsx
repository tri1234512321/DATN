import HomeHeader from "../../../components/HomeHeader/HomeHeader";
import "./Payment.scss"

const Payment = () => {


  return (
    <div>
      <HomeHeader />
      <div className="flex min-h-[90vh]">
        <div className="w-[50%] my-auto">
          <div className="w-[70%] mx-auto">
            <p className="font-semibold text-2xl mb-[30px]">Thông tin đặt hàng</p>

            <form>
              <div className="grid grid-cols-2">
                <div className="w-[90%]">
                  <label>Tên</label>
                  <input
                    className="w-[100%]"
                    type="text"
                    value={"texts.name"}
                    name="name"
                    // onChange={handleChange}
                  />
                </div>
                <div className="justify-self-end w-[90%]">
                  <label>Họ và tên đệm</label>
                  <input
                    className="w-[100%]"
                    type="text"
                    value={"texts.name"}
                    name="name"
                    // onChange={handleChange}
                  />
                </div>
              </div>
              <label>Email</label>
              <input
                type="text"
                value={"texts.email"}
                name="email"
                // onChange={handleChange}
              />
              <label>Số điện thoại</label>
              <input
                type="text"
                value={"texts.password"}
                name="password"
                // onChange={handleChange}
              />
              <label>Địa điểm giao</label>
              <input
                type="text"
                name="city"
                value={"texts.city"}
                // onChange={handleChange}
              />
              <label>Thời gian nhận hàng</label>
              <input
                type="text"
                name="city"
                value={"texts.city"}
                // onChange={handleChange}
              />
            </form>
          </div>
        </div>
        <div className="w-[50%] my-auto">
          <div className="w-[70%] mx-auto">
            <p className="font-semibold text-2xl mb-[30px]">Thông tin giỏ hàng</p>

            <button >PROCEED TO PAYMENT</button>
          </div>
        </div>
      </div>
    </div>
  )
};

export default Payment;