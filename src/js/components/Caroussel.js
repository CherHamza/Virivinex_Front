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
          console.log('emissionsCMS :', formattedEmissions)

        const emissionsSot = await apiService.getSotEmissionAll();
        const formattedEmissionSot = emissionsSot.map(em => ({
          id: em.emissionUnique_id.split('_')[0],

        }))

        console.log('emissionSotId : ', formattedEmissionSot)
        setEmissions(formattedEmissions);
        setCurrentSlide(Math.floor(Math.random() * formattedEmissions.length));

      } catch (error) {
        console.error('Erreur lors de la récupération des émissions :', error);
      }
    };

    fetchEmissions();
  }, []);

//   useEffect(() => {
//     const fetchEmissions = async () => {
//       try {
//         const [cmsEmissions, sotEmissions] = await Promise.all([
//           emissionService.getAllEmissions(),
//           apiService.getSotEmissionAll()
//         ]);
// // console.log('sotEmission , ', sotEmissions)
//         const formattedCmsEmissions = cmsEmissions
//           .filter(emission => emission.publishedForSale === true)
//           .map(emission => ({
//             id: emission.id,
//             name: emission.embeddedSku.name,
//             producer: emission.embeddedSeller.name,
//             img: emission.imageURLs.length > 0 ? emission.imageURLs[0] : DefaultImageSrc
//           }));
//         setEmissions(formattedCmsEmissions);
//         setCurrentSlide(Math.floor(Math.random() * formattedCmsEmissions.length));

//         const formattedSotEmissions = sotEmissions.map(em => ({
//           id: em.emissionUnique_id.split('_')[0],
//           year: em.yearOfBottling,
//           type: em.typeOfWine,
//           area: em.areaOfProduction,
//           region: em.wineMacroRegion.split('_')[0],
//           country: em.country.split('_')[0],
//         }));

//         // Build object
//         const mergedEmissions = {};

//         // Add émissions CMS
//         formattedCmsEmissions.forEach(emission => {
//           mergedEmissions[emission.id] = {
//             cms: emission,
//             sot: null // Initialiser à null, sera rempli plus tard si une correspondance est trouvée
//           };
//         });

//         // If id egal add emission sot
//         formattedSotEmissions.forEach(emission => {
//           if (mergedEmissions.hasOwnProperty(emission.id)) {
//             // Si une correspondance est trouvée, mettez à jour l'objet mergedEmissions
//             mergedEmissions[emission.id].sot = emission;
//           } else {
//             // Si aucune correspondance n'est trouvée, créez une nouvelle entrée dans mergedEmissions
//             mergedEmissions[emission.id] = {
//               cms: null, // Initialiser à null car il n'y a pas d'émission correspondante dans le CMS
//               sot: emission
//             };
//           }
//         });

//         // console.log('Merged Emissions:', mergedEmissions);
//         setEmissions(mergedEmissions);
//         setCurrentSlide(Math.floor(Math.random() * mergedEmissions.length));

//       } catch (error) {
//         console.error('Erreur lors de la récupération des émissions :', error);
//       }
//     };

//     fetchEmissions();
//   }, []);


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
        {/* <img src={currentEmission.img} alt={`Image ${currentEmission.name }`} /> */}
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
