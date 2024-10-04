import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import img1 from "../assets/carosalImage/img1.jpg";
import img2 from "../assets/carosalImage/img2.jpg";
import img3 from "../assets/carosalImage/img3.jpg";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

const CarouselCustom = () => {
  return (
    <div className="w-full flex justify-center items-center">
      <Carousel
        responsive={responsive}
        arrows
        autoPlaySpeed={1000}
        infinite
        showDots
        swipeable
        className="w-full"
      >
        {[img1, img2, img3].map((src, index) => (
          <div key={index} className="flex justify-center items-center">
            <img
              src={src}
              alt={`Slide ${index + 1}`}
              className="w-[1024px] h-96 object-cover rounded-lg"
            />
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default CarouselCustom;
