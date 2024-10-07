import ProductFilter from "@/components/shopping-view/filter";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/components/ui/use-toast";
import { sortOptions } from "@/config/index.js";
import { ArrowUpDownIcon, ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";
import StarRating from "@/components/AllFoodItem/StarRating";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "../../../components/Social/axios";
import { Buffer } from "buffer";
import { AuthContext } from "@/context/authContext";
import HomeHeader from "../../../components/HomeHeader/HomeHeader";
import { FaRegEye, FaRegHeart, FaHeart } from "react-icons/fa";
import { LuArrowLeftRight } from "react-icons/lu";
import ItemProduct from "../../../components/ItemProduct/ItemProduct";
import im from "../../../assets/images/banner.webp";
import Banner from "../../../components/Banner/Banner";

function ListProduct() {
  const { currentUser } = useContext(AuthContext);

  const [filters, setFilters] = useState([]);
  const [sort, setSort] = useState("newest");
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const { toast } = useToast();

  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage  = 8;
  const [lastIndex,setLastIndex] = useState(currentPage * recordsPerPage);
  const [firstIndex, setFirstIndex] = useState((currentPage - 1) * recordsPerPage);
  const [records, setRecords] = useState([]);
  const [npage, setNpage] = useState(0);
  const [numbers, setNumbers] = useState([]);

  const [currentSlide, setCurrentSlide] = useState(0);

  const featureImageList = [{image:im}];

  const { isLoading, error, data } = useQuery(
  ["allProducts", currentUser?.user.id, filters, sort], // Add `filters` to the query key
  () =>
    makeRequest.get("/buyer-get-all-product", {
      params: {
        access_token: currentUser.access_token,
        id: "All",
        category: filters,
        sort: sort
      },
    }).then((res) => res.data.products),
  {
    enabled: !!currentUser?.access_token && !!filters, // Ensure that the query runs only if these are available
    refetchOnWindowFocus: false, // Optional: Prevents refetching on window focus if not needed
  }
);

  function handleSort(value) {
    setSort(value);
  }

  function handleFilter(sa,getCurrentOption) {
    const newFilter = filters.includes(getCurrentOption)
      ? filters.filter(option => option !== getCurrentOption) // Remove the option if it exists
      : [...filters, getCurrentOption]; // Add the option if it doesn't exist
  
    setFilters(newFilter);
    console.log(newFilter);
  }

  useEffect(() => {
    setLastIndex(currentPage * recordsPerPage);
    setFirstIndex((currentPage - 1) * recordsPerPage);
    setRecords(data?.slice((currentPage - 1) * recordsPerPage, currentPage * recordsPerPage)||[]);
    setNpage(Math.ceil(data?.length/recordsPerPage)||1);
    setNumbers([...Array(npage + 1).keys()].slice(1));
  }, [currentPage,data,npage]);

  function prePage() {
    if(currentPage !== firstIndex) {
      setCurrentPage(currentPage - 1);
    }
  }
  
  function changeCPage(id) {
    setCurrentPage(id);
  }
  
  function nextPage() {
    if(currentPage !== lastIndex) {
      setCurrentPage(currentPage + 1);
    }
  }

  return (
    <div className="min-h-[100vh]">
      <HomeHeader/>
      
      <div className="  bg-[#f7f7f7] min-h-[calc(100vh-60px)">
        <div className="relative top-[30px] mb-[40px] w-full h-[350px] overflow-hidden max-w-[1200px] mx-auto">
          {featureImageList && featureImageList.length > 0
            ? featureImageList.map((slide, index) => (
              <div>
                <img
                  src={slide?.image}
                  alt=""
                  key={index}
                  className={`${
                    index === currentSlide ? "opacity-100" : "opacity-0"
                  } absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000`}
                />
                <Banner />
              </div>
              ))
            : null}
          <Button
            variant="outline"
            size="icon"
            onClick={() =>
              setCurrentSlide(
                (prevSlide) =>
                  (prevSlide - 1 + featureImageList.length) %
                  featureImageList.length
              )
            }
            className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/80"
          >
            <ChevronLeftIcon className="w-4 h-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() =>
              setCurrentSlide(
                (prevSlide) => (prevSlide + 1) % featureImageList.length
              )
            }
            className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/80"
          >
            <ChevronRightIcon className="w-4 h-4" />
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6 py-4 max-w-[1200px] mx-auto">
          <ProductFilter filters={filters} handleFilter={handleFilter} />
          <div className="bg-background w-full rounded-lg shadow-sm">
            <div className="p-4 border-b flex items-center justify-between">
              <h2 className="text-2xl font-extrabold">Tất cả sản phẩm</h2>
              <div className="flex items-center gap-3">
                <span className="text-muted-foreground">
                  {data?.length} Sản phẩm
                </span>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-1"
                    >
                      <ArrowUpDownIcon className="h-4 w-4" />
                      <span>Sắp xếp theo</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-[200px]">
                    <DropdownMenuRadioGroup value={sort} onValueChange={handleSort}>
                      {sortOptions.map((sortItem) => (
                        <DropdownMenuRadioItem
                          value={sortItem.id}
                          key={sortItem.id}
                        >
                          {sortItem.label}
                        </DropdownMenuRadioItem>
                      ))}
                    </DropdownMenuRadioGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
              {records && records.length > 0
                ? records.map((product) => <ItemProduct product={product}/>)
              : null}
            </div>
            <nav aria-label="Page navigation example" className="flex justify-center mb-[30px] w-full">
              <ul className="flex items-center -space-x-px h-10 text-base gap-[10px]">
                <li onClick={prePage}>
                  <span  className="flex items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                    <span className="sr-only">Previous</span>
                    <svg className="w-3 h-3 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                      <path stroke="currentColor" stroke-linecap="round" strokeLinejoin="round" stroke-width="2" d="M5 1 1 5l4 4"/>
                    </svg>
                  </span>
                </li>
                {
                  numbers.map((n,i)=> (
                    currentPage === n
                      ? <li key={i} onClick={()=>changeCPage(n)}>
                          <span className="flex items-center justify-center px-4 h-10 text-blue-700 border border-gray-300 bg-blue-200 hover:bg-blue-300 hover:text-blue-800 dark:border-gray-700 dark:bg-gray-700 dark:text-white">{n}</span>
                        </li>
                      : <li key={i} onClick={()=>changeCPage(n)}>
                          <span  className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">{n}</span>
                        </li>
                  ))
                }
                <li onClick={nextPage}>
                  <span  className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                    <span className="sr-only">Next</span>
                    <svg className="w-3 h-3 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                      <path stroke="currentColor" stroke-linecap="round" strokeLinejoin="round" stroke-width="2" d="m1 9 4-4-4-4"/>
                    </svg>
                  </span>
                </li>
              </ul>
            </nav>
          </div>
          {/* <ProductDetailsDialog
            open={openDetailsDialog}
            setOpen={setOpenDetailsDialog}
            productDetails={productDetails}
          /> */}
          
        </div>
      </div>
    </div>
  );
}

export default ListProduct;
