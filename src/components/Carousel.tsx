import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

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
        autoPlaySpeed={3000}
        infinite
        showDots
        swipeable
        className="w-full"
      >
        {[
          "https://images.unsplash.com/photo-1549989476-69a92fa57c36?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=60",
          "https://images.unsplash.com/photo-1549396535-c11d5c55b9df?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
          "https://images.unsplash.com/photo-1550133730-695473e544be?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
          "https://images.unsplash.com/photo-1550167164-1b67c2be3973?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
          "https://images.unsplash.com/photo-1550338861-b7cfeaf8ffd8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
        ].map((src, index) => (
          <div key={index} className="flex justify-center items-center">
            <img
              src={src}
              alt={`Slide ${index + 1}`}
              className="w-full h-96 object-cover rounded-lg"
            />
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default CarouselCustom;
