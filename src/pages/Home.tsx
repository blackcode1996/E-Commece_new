import { useContext } from "react";
import CarouselCustom from "../components/Carousel";
import { productContext, ProductContextType } from "../context/productContext";
import ProductCard from "../components/ProductCard";

const Home = () => {
  const data = useContext<ProductContextType | null>(productContext);
  const products = Array.isArray(data?.products) ? data.products : [];

  return (
    <div>
      <CarouselCustom />
      <div className="flex flex-wrap justify-center align-middle mt-2">
        {products.map((el: any) => (
          <div key={el.id}>
            <ProductCard
              productId={el.id}
              productImage={el.image}
              productPrice={el.price}
              productTitle={el.title}
              productRating={el.rating.rate}
              productActualPrice={Number((el.price + (0.2*el.price)).toFixed(1))}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
