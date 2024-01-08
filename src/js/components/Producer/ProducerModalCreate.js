import React, { useEffect, useState } from "react";
import ReactModal from "react-modal";
import { toast } from 'react-toastify';
import { dataService } from "../../services/dataService";



const ProducerModalCreate = ({ handleShowModalProducer, handleCloseModalProducer, userType }) => {
    const [email, setEmail] = useState("");
    const [pseudo, setPseudo] = useState("");
    const [password, setPassword] = useState("");
    const [vat, setVat] = useState("");
    const [numberEmployes, setNumberEmployes] = useState("");
    const [postalcode, setPostalcode] = useState("");
    const [street, setStreet] = useState("");
    const [houseNbr, setHouseNbr] = useState("");
    const [city, setCity] = useState("");
    const [country, setCountry] = useState("");
    const [companyName, setCompanyName] = useState("");
    const [websiteCompany, setWebsiteCompany] = useState("");

    const handleCreateProducer = () => {
     
        const newProducer = {
            address: {
                houseNumber: houseNbr,
                city: city,
                street: street,
                postalCode: postalcode,
                country: {
                    code: "FR",
                    name: country,
                    language: "Français"
                }
            },
            companyName: companyName,
            profiles: [
                {
                    firstName: companyName,
                    lastName: companyName,
                    phone: "+33000000",
                    mobilePhone: "",
                    emailAddress: email,
                    emailNotifications: false,
                    salutation: "Mr",
                    user: {
                        username: email,
                        password: password
                    },
                    metaInfo: {
                        "pseudo": companyName,
                        "userType": "Wine Producer"
                    }
                }
            ],
        };


        dataService.createUser(newProducer).then(res => console.log(res));
        // Réinitialiser les champs et fermer la modale
        setVat("");
        setNumberEmployes("");
        setEmail("");
        setPseudo("");
        setPassword("");
        setPostalcode("");
        setStreet("");
        setHouseNbr("");
        setCity("");
        setCountry("");
        setCompanyName("");
        setWebsiteCompany("");
        handleCloseModalProducer();

    };


    return (
        <div className={`modal ${handleShowModalProducer ? "show" : ""}`} tabIndex="-1" role="dialog" style={{ display: handleShowModalProducer ? "block" : "none" }}>
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Create Producer</h5>
                        <button type="button" className="close" onClick={handleCloseModalProducer}>
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <div className="form-group">
                            <label htmlFor="companyName">Company Name</label>
                            <input type="text" className="form-control" id="companyName" value={companyName} onChange={(e) => setCompanyName(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="vat">Vat</label>
                            <input type="number" className="form-control" id="vat" value={vat} onChange={(e) => setVat(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="numberEmployes">Number employes</label>
                            <input type="number" className="form-control" id="numberEmployes" value={numberEmployes} onChange={(e) => setNumberEmployes(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="postalcode">Postal Code</label>
                            <input type="text" className="form-control" id="postalcode" value={postalcode} onChange={(e) => setPostalcode(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="street">Street</label>
                            <input type="text" className="form-control" id="street" value={street} onChange={(e) => setStreet(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="houseNbr">House Number</label>
                            <input type="number" className="form-control" id="houseNbr" value={houseNbr} onChange={(e) => setHouseNbr(e.target.value)} />
                        </div>

                        <div className="form-group">
                            <label htmlFor="city">City</label>
                            <input type="text" className="form-control" id="city" value={city} onChange={(e) => setCity(e.target.value)} />
                        </div>

                        <div className="form-group">
                            <label htmlFor="country">Country</label>
                            <input type="text" className="form-control" id="country" value={country} onChange={(e) => setCountry(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="emailCompany">Email</label>
                            <input type="email" className="form-control" id="emailCompany" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="websiteCompany">Website Company</label>
                            <input type="text" className="form-control" id="websiteCompany" value={websiteCompany} onChange={(e) => setWebsiteCompany(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="pseudo">Pseudo</label>
                            <input type="text" className="form-control" id="pseudo" value={pseudo} onChange={(e) => setPseudo(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input type="password" className="form-control" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>

                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={handleCloseModalProducer}>
                            Annuler
                        </button>
                        <button type="button" className="btn btn-primary" onClick={handleCreateProducer}>
                            Créer
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProducerModalCreate;