import React, { useEffect, useState } from "react";
import ReactModal from "react-modal";
import { toast } from 'react-toastify';
import { dataService } from "../../services/dataService";



const ExpertModalCreate = ({ handleShowModalExpert, handleCloseModalExpert, userType }) => {
    const [email, setEmail] = useState("");
    const [pseudo, setPseudo] = useState("");
    const [qualification, setQualification] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phone, setPhone] = useState("");
    const [houseNumber, setHouseNumber] = useState("");
    const [city, setCity] = useState("");
    const [street, setStreet] = useState("");
    const [postalCode, setPostalCode] = useState("");
    const [countryCode, setCountryCode] = useState("");
    const [countryName, setCountryName] = useState("");
    const [salutation, setSalutation] = useState("");


    const handleCreateUser = () => {

        if (!firstName.trim()) {
            toast.error("Le prénom est requis.");
            return;
        }
        if (!lastName.trim()) {
            toast.error("Le nom de famille est requis.");
            return;
        }
        if (!email.trim()) {
            toast.error("L'email est requis.");
            return;
        }
        if (!qualification.trim()) {
            toast.error("La qualification est requise.");
            return;
        }
        if (!pseudo.trim()) {
            toast.error("Le pseudo est requis.");
            return;
        }
        if (!password || password.length < 8) {
            toast.error("Le mot de passe doit contenir au moins 8 caractères.");
            return;
        }
    

        const newUser = {
            address: {
                houseNumber,
                city,
                street,
                postalCode,
                country: {
                    code: countryCode,
                    name: countryName,
                    language: "" 
                }
            },
            companyName,
            profiles: [
                {
                    firstName: firstName,
                    lastName: lastName,
                    phone: "+3312345678",
                    mobilePhone: "",
                    emailAddress: email,
                    emailNotifications: false,
                    salutation: "",
                    user: {
                        username: email,
                        password: password
                    },
                    metaInfo: {
                        "qualification": qualification,
                        "pseudo": pseudo,
                        "userType": "Wine Expert"
                    }
                }
            ],
        };


        dataService.createUser(newUser)
        .then(res => {
            console.log(res);
            toast.success("Utilisateur créé avec succès !");
            // Réinitialiser les champs et fermer la modale
            setFirstName("");
            setLastName("");
            setEmail("");
            setPseudo("");
            setQualification("");
            setPassword("");
            setPhone("");
            setHouseNumber("");
            setCity("");
            setStreet("");
            setPostalCode("");
            setCountryCode("");
            setCountryName("");
            setSalutation("");
            handleCloseModalExpert();
        })
        .catch(err => {
            console.error(err);
            toast.error("Erreur lors de la création de l'utilisateur.");
        });

    };
      




    return (
            <div className={`modal ${handleShowModalExpert ? "show" : ""}`} tabIndex="-1" role="dialog" style={{ display: handleShowModalExpert ? "block" : "none" }}>
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Create Expert</h5>
                            <button type="button" className="close" onClick={handleCloseModalExpert}>
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="form-group">
                                <label htmlFor="firstName">Firstname</label>
                                <input type="text" className="form-control" id="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="lastName">Lastname</label>
                                <input type="text" className="form-control" id="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input type="email" className="form-control" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="qualification">Qualification</label>
                                <input type="text" className="form-control" id="qualification" value={qualification} onChange={(e) => setQualification(e.target.value)} required />
                            </div>
                            <div className="form-group">
                            <label htmlFor="phone">Phone</label>
                            <input type="text" className="form-control" id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="houseNumber">House Number</label>
                            <input type="text" className="form-control" id="houseNumber" value={houseNumber} onChange={(e) => setHouseNumber(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="city">City</label>
                            <input type="text" className="form-control" id="city" value={city} onChange={(e) => setCity(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="street">Street Name</label>
                            <input type="text" className="form-control" id="street" value={street} onChange={(e) => setStreet(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="postalCode">Postal Code</label>
                            <input type="text" className="form-control" id="postalCode" value={postalCode} onChange={(e) => setPostalCode(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="countryCode">Country Code</label>
                            <input type="text" className="form-control" id="countryCode" value={countryCode} onChange={(e) => setCountryCode(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="countryName">Country Name</label>
                            <input type="text" className="form-control" id="countryName" value={countryName} onChange={(e) => setCountryName(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="salutation">Salutation</label>
                            <select className="form-control" id="salutation" value={salutation} onChange={(e) => setSalutation(e.target.value)}>
                                <option value="">Choisir...</option>
                                <option value="Mr">Monsieur</option>
                                <option value="Ms">Madame</option>
                            </select>
                        </div>
                            <div className="form-group">
                                <label htmlFor="pseudo">Pseudo</label>
                                <input type="text" className="form-control" id="pseudo" value={pseudo} onChange={(e) => setPseudo(e.target.value)} required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <input type="password" className="form-control" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required minLength="8" />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={handleCloseModalExpert}>Annuler</button>
                            <button type="button" className="btn btn-primary" onClick={handleCreateUser}>Créer</button>
                        </div>
                    </div>
                </div>
            </div>
        );
        
}

export default ExpertModalCreate;