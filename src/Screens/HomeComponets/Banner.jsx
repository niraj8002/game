import React, { useEffect, useState } from "react";
import bnner1 from "../../assets/banner.png";
import bnner2 from "../../assets/banner2.png"; // 👈 add more banners
import bnner3 from "../../assets/banner3.png"; // 👈 add more banners

const Banner = () => {
  const images = [bnner1, bnner2, bnner3]; // 👈 Add banners here
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 2000); // 👈 Auto-slide every 2 sec

    return () => clearInterval(interval); // cleanup
  }, [images.length]);

  return (
    <div className="relative overflow-hidden mx-2 rounded-md bg-gradient-to-r from-yellow-600 via-yellow-500 to-yellow-600">
      {/* Background overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-20"></div>

      {/* Slider container */}
      <div className="relative w-full h-40 flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`banner-${index}`}
            className="w-full object-cover flex-shrink-0"
          />
        ))}
      </div>
    </div>
  );
};

export default Banner;

