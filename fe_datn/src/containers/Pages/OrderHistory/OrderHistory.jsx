import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import accImg from "../../assets/account.jpg";
// import Address from "@/components/shopping-view/address";
import Order from "@/components/Shop/Order/Order";
import HomeHeader from "../../../components/HomeHeader/HomeHeader";

function HistoryOrder() {
  return (
    <>
    <HomeHeader/>
    <div className="flex flex-col bg-[#f7f7f7] min-h-[calc(100vh-60px)]">
      {/* <div className="relative h-[300px] w-full overflow-hidden">
        <img
          src={accImg}
          className="h-full w-full object-cover object-center"
        />
      </div> */}
      <div className="container mx-auto grid grid-cols-1 gap-8 py-8 max-w-[1200px] ">
        <div className="flex flex-col rounded-lg border bg-background p-6 shadow-sm bg-white">
          <Tabs defaultValue="orders">
            <TabsList>
              <TabsTrigger value="orders">Orders</TabsTrigger>
              <TabsTrigger value="address">Address</TabsTrigger>
            </TabsList>
            <TabsContent value="orders">
              <Order />
            </TabsContent>
            <TabsContent value="address">
              {/* <Address /> */}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
    </>
  );
}

export default HistoryOrder;
