import React, { useState } from "react";
import ReactModal from "react-modal";
import { toast } from 'react-toastify';
import { dataService } from "../../services/dataService";

const ProducerModalCreate = ({ handleShowModalProducer, handleCloseModalProducer, userType }) => {
    const [formData, setFormData] = useState({
        email: "",
        pseudo: "",
        password: "",
        vat: "",
        numberEmployes: "",
        postalcode: "",
        street: "",
        houseNbr: "",
        city: "",
        phone: "",
        salutation: "",
        firstName: "",
        lastName: "",
        countryName: "",
        countryCode: "",
        companyName: "",
        websiteCompany: ""
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const handleCreateProducer = () => {
        let errorMessage = "";

        switch (true) {
            case !formData.email.trim():
                errorMessage = "Email is required.";
                break;
            case !formData.pseudo.trim():
                errorMessage = "Pseudo is required.";
                break;
            case !formData.companyName.trim():
                errorMessage = "Company Name is required.";
                break;
            case !formData.password || formData.password.length < 8:
                errorMessage = "The password must contain at least 8 characters.";
                break;
            
            default:
                break;
        }

        if (errorMessage) {
            toast.error(errorMessage);
            return;
        }

        const newProducer = {
            address: {
                houseNumber: formData.houseNbr,
                city: formData.city,
                street: formData.street,
                postalCode: formData.postalcode,
                country: {
                    code: formData.countryCode,
                    name: formData.countryName,
                    language: ""
                }
            },
            companyName: formData.companyName,
            companyEmailAddress: formData.email,
            numberOfEmployees: formData.numberEmployes,
            companyWebSite: formData.websiteCompany,
            vatNumber: formData.vat,
            companyPhone: formData.phone,
            sellerType: "VENDOR",
            profiles: [
                {
                    firstName: formData.firstName,
                    lastName: formData.lastName,
                    salutation: formData.salutation,
                    phone: formData.phone,
                    mobilePhone: formData.phone,
                    emailAddress: formData.email,
                    emailNotifications: false,
                    user: {
                        username: formData.email,
                        password: formData.password
                    },
                    metaInfo: {
                        "pseudo": formData.pseudo,
                        "userType": "Wine Producer",
                    }
                }
            ],
        };

        dataService.createUser(newProducer)
            .then(res => {
                toast.success("Successfully created - Please go to your e-mail to confirm !");
                setFormData({
                    email: "",
                    pseudo: "",
                    password: "",
                    vat: "",
                    numberEmployes: "",
                    postalcode: "",
                    street: "",
                    houseNbr: "",
                    city: "",
                    phone: "",
                    firstName:"",
                    lastName: "",
                    salutation: "",
                    countryName: "",
                    countryCode: "",
                    companyName: "",
                    websiteCompany: ""
                });
                handleCloseModalProducer();
            })
            
            .catch(err => {
                console.error(err);
                toast.error("Error during user creation.");
            });
    };




    return (
        <div className={`modal fade ${handleShowModalProducer ? "show" : ""}`} tabIndex="-1" role="dialog" style={{ display: handleShowModalProducer ? "block" : "none", backgroundColor: "rgba(0,0,0,0.5)" }}>
            <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content border-0 shadow">
                    <div className="modal-header" style={{ backgroundColor: "#4B2E83", color: "#FFF" }}>
                        <h5 className="modal-title mx-auto">Create Producer</h5>
                        <button type="button" className="close btn btn-danger" onClick={handleCloseModalProducer}>
                            <span aria-hidden="true" style={{ color: "#FFF" }}>&times;</span>
                        </button>
                    </div>
                    <div className="modal-body" style={{ backgroundColor: "#F2F2F2" }}>
                        <div className="form-group">
                            <label htmlFor="companyName">Company Name</label>
                            <input type="text" className="form-control" id="companyName" name="companyName" value={formData.companyName} onChange={handleInputChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="vat">Vat</label>
                            <input type="number" className="form-control" id="vat" name="vat" value={formData.vat} onChange={handleInputChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="numberEmployes">Number employes</label>
                            <input type="number" className="form-control" id="numberEmployes" name="numberEmployes" value={formData.numberEmployes} onChange={handleInputChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="postalcode">Postal Code</label>
                            <input type="text" className="form-control" id="postalcode" name="postalcode" value={formData.postalcode} onChange={handleInputChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="street">Street</label>
                            <input type="text" className="form-control" id="street" name="street" value={formData.street} onChange={handleInputChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="houseNbr">House Number</label>
                            <input type="number" className="form-control" id="houseNbr" name="houseNbr" value={formData.houseNbr} onChange={handleInputChange} />
                        </div>

                        <div className="form-group">
                            <label htmlFor="city">City</label>
                            <input type="text" className="form-control" id="city" name="city" value={formData.city} onChange={handleInputChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="phone">Phone</label>
                            <input type="text" className="form-control" id="phone" name="phone" value={formData.phone} onChange={handleInputChange} />
                        </div>

                        <div className="form-group">
                            <label htmlFor="countryName">Country</label>
                            <input type="text" className="form-control" id="countryName" name="countryName" value={formData.countryName} onChange={handleInputChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="countryCode">Country Code</label>
                            <input type="text" className="form-control" id="countryCode" name="countryCode" value={formData.countryCode} onChange={handleInputChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input type="email" className="form-control" id="email" name="email" value={formData.email} onChange={handleInputChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="websiteCompany">Website Company</label>
                            <input type="text" className="form-control" id="websiteCompany" name="websiteCompany" value={formData.websiteCompany} onChange={handleInputChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="pseudo">Pseudo</label>
                            <input type="text" className="form-control" id="pseudo" name="pseudo" value={formData.pseudo} onChange={handleInputChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="firstName">Firstname</label>
                            <input type="text" className="form-control" id="firstName" name="firstName" value={formData.firstName} onChange={handleInputChange} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="lastName">Lastname</label>
                            <input type="text" className="form-control" id="lastName" name="lastName" value={formData.lastName} onChange={handleInputChange} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="salutation">Salutation</label>
                            <select className="form-control" id="salutation" name="salutation" onChange={handleInputChange}>
                                <option value="">Choisir...</option>
                                <option value="Mr">Mr</option>
                                <option value="Mrs">Mrs</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input type="password" className="form-control" id="password" name="password" value={formData.password} onChange={handleInputChange} />
                        </div>
                    </div>
                    <div className="modal-footer" style={{ backgroundColor: "#F2F2F2" }}>
                        <button type="button" className="btn btn-primary" style={{ backgroundColor: "#4B2E83", color: "#FFF" }} onClick={handleCreateProducer}>
                            Create
                        </button>
                        <button type="button" className="btn btn-secondary" onClick={handleCloseModalProducer}>
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
    }

export default ProducerModalCreate;
