
import React from 'react';
import '../../../css/Users/ProducerProfil.css'; 

const ProducerProfil = () => {
  // a remplacer par des props ou un appel API.
  const editions = [
    { id: 1, pic: 'image-source', text: 'Texte', owned: 3000, marketPrice: 30.00, value: 90000.00 },

  ];
  
   // fetch('http://localhost:5000/users')
    //     .then(response => response.json())
    //     .then(data => {
    //         console.log('Data Producer ' + data);
    //     })
    //     .catch(error => {
    //         console.error("Erreur lors de la connexion :", error);
    //         toast.error("Erreur lors de la connexion.");
    //     });

  return (
    <div className="producer-dashboard">
      <div className="profil-view">
        <header>
       
          <h1>Winery: Chateau Laurent</h1>
          <span>Admin: @Marc_Delacroix</span>
        </header>
        <div className="editions-list">
          {editions.map(edition => (
            <div className="edition-item" key={edition.id}>
              <div className="edition-image">
                <img src={edition.pic} alt="Wine edition" />
              </div>
              <div className="edition-details">
                <span>{edition.text}</span>
                <span>{edition.owned} bottles</span>
                <span>€{edition.marketPrice} market price</span>
                <span>€{edition.value} value</span>
              </div>
            </div>
          ))}
        </div>
        <div className="total-value">
          <span>TOTAL VALUE (EUR): 141,984.00</span>
        </div>
        <button className="configure-button">Configure a NEW Limited Edition Emission !</button>
      </div>

    </div>
  );
};

export default ProducerProfil;

