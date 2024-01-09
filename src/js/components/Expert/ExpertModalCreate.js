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
            toast.error("Firstname required.");
            return;
        }
        if (!lastName.trim()) {
            toast.error("Lastname required.");
            return;
        }
        if (!email.trim()) {
            toast.error("Email required.");
            return;
        }
        if (!qualification.trim()) {
            toast.error("Qualification required.");
            return;
        }
        if (!pseudo.trim()) {
            toast.error("Pseudo required.");
            return;
        }
        if (!password || password.length < 8) {
            toast.error("The password must contain at least 8 characters.");
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
                    phone: phone,
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
        <div className={`modal fade ${handleShowModalExpert ? "show" : ""}`} tabIndex="-1" role="dialog" style={{ display: handleShowModalExpert ? "block" : "none", backgroundColor: "rgba(0,0,0,0.5)" }}>
            <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content border-0 shadow">
                    <div className="modal-header" style={{ backgroundColor: "#4B2E83", color: "#FFF" }}>
                        <h5 className="modal-title mx-auto">Create Expert</h5>
                        <button type="button" className="close btn btn-danger" onClick={handleCloseModalExpert}>
                            <span aria-hidden="true" style={{ color: "#FFF" }}>&times;</span>
                        </button>
                        </div>
                    <div className="modal-body" style={{ backgroundColor: "#F2F2F2" }}>
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
                    <div className="modal-footer" style={{ backgroundColor: "#F2F2F2" }}>
                           
                        <button type="button" className="btn " style={{ backgroundColor: "#4B2E83", color: "#FFF" }} onClick={handleCreateUser}>Create</button>
                        <button type="button" className="btn btn-secondary" onClick={handleCloseModalExpert}>Cancel</button>
                        </div>
                    </div>
                </div>
            </div>
        );
        
}

export default ExpertModalCreate;