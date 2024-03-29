import React, { useState, useEffect } from 'react';
import { EmissionService } from '../services/emissionService';
import { ApiService } from '../services/apiService';
import DefaultImageSrc  from '../../../assets/images/bottle1.jpg';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Caroussel = () => {
  const [emissions, setEmissions] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const emissionService = EmissionService.getInstance();
  const apiService = ApiService.getInstance();

  useEffect(() => {
    const fetchEmissions = async () => {
      try {
        const allEmissions = await emissionService.getAllEmissions();
        
        const formattedEmissions = allEmissions
          .filter(emission => emission.publishedForSale === true)
          .map(emission => ({
            id: emission.id,
            name: emission.embeddedSku.name,
            producer: emission.embeddedSeller.name,
            img: emission.imageURLs.length > 0 ? emission.imageURLs[0] : DefaultImageSrc,          
          }));

        const emissionsSot = await apiService.getSotEmissionAll();
        const formattedEmissionSot = emissionsSot.map(em => ({
          id: em.emissionUnique_id.split('_')[0],

        }))

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

  
    const navigate = useNavigate();

    const handleClick = () => {
      // Rediriger vers la page de destination souhaitée
      navigate("/app/sot/emissions/:name/:id/detail.html");
      //http://localhost:5001/app/sot/emissions/000002@Malbec-Vielles-Vignes-2020-Limited-Edition/sellerSku10/detail.html
    };

  return (
    <>
      <div className="carousel-container">

      <button onClick={prevSlide}>&lt;</button>
      <Link to={`/app/sot/emissions/${currentEmission.name}/${currentEmission.id}/detail.html`}>
      <div onClick={handleClick}>
        <div className="carousel-slide">
          <img
            src={currentEmission.img}
            className="card-img-top"
            alt={currentEmission.name}
            title={currentEmission.name}
            onError={(e) => {
              e.target.src = DefaultImageSrc;
            }}
          />
          <p>{currentEmission.producer}</p>
          <p>{currentEmission.name}</p>
        </div>
      </div>
      </Link>
      <button className="carousel-button-next" onClick={nextSlide}>&gt;</button>
      </div>
    </>
  );
};

export default Caroussel;
