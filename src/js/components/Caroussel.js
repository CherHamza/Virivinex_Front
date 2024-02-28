import React, { useState, useEffect } from 'react';
import { EmissionService } from '../services/emissionService';
import DefaultImageSrc  from '../../../assets/images/bottle1.jpg';

const Caroussel = () => {
  const [emissions, setEmissions] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const emissionService = EmissionService.getInstance();

  useEffect(() => {
    const fetchEmissions = async () => {
      try {
        const allEmissions = await emissionService.getAllEmissions();
        
        const formattedEmissions = allEmissions
          .filter(emission => emission.publishedForSale === true)
          .map(emission => ({
            name: emission.embeddedSku.name,
            producer: emission.embeddedSeller.name,
            img: emission.imageURLs.length > 0 ? emission.imageURLs[0] : DefaultImageSrc,          
          }));

        setEmissions(formattedEmissions);
        setCurrentSlide(Math.floor(Math.random() * formattedEmissions.length));

      } catch (error) {
        console.error('Erreur lors de la récupération des émissions :', error);
      }
    };

    fetchEmissions();
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % emissions.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + emissions.length) % emissions.length);

  const currentEmission = emissions[currentSlide] || {};

  return (
    <div className="carousel-container">
      <button onClick={prevSlide}>&lt;</button>
      <div className="carousel-slide">
        <img src={currentEmission.img} alt={`Image ${currentEmission.name }`} />
        <p>{currentEmission.producer}</p>
        <p>{currentEmission.name}</p>
      </div>
      <button className="carousel-button-next" onClick={nextSlide}>&gt;</button>
    </div>
  );
};

export default Caroussel;
