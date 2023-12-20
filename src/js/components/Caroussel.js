import React, { useState } from 'react';
import Image1 from "../../../assets/images/bottle1.jpg";
import Image2 from "../../../assets/images/bottle2.jpg";


const slidesData = [
  {
    imageSrc: Image1,
    text: "Notre première édition limitée",
  },
  {
    imageSrc: Image2,
    text: "Notre deuxième édition limitée",
  },
  // Ajouts d'autres diapositives..
];

const Caroussel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slidesData.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slidesData.length) % slidesData.length);

  const { imageSrc, text } = slidesData[currentSlide];

  return (
    <div className="carousel-container">
      <button onClick={prevSlide}>&lt;</button>
      <div className="carousel-slide">
        <img src={imageSrc} alt="Featured Wine" />
        <p>{text}</p>
      </div>
      <button className="carousel-button-next" onClick={nextSlide}>&gt;</button>
    </div>
  );
};

export default Caroussel;
