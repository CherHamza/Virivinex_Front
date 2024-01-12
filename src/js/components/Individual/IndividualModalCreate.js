import React, { useState } from "react";
import ReactModal from "react-modal";
import { toast } from 'react-toastify';
import { dataService } from "../../services/dataService";

const IndividualModalCreate = ({ handleShowModal, handleCloseModal, userType }) => {
    const [formData, setFormData] = useState({
        email: "",
        pseudo: "",
        password: "",
        firstName: "",
        lastName: "",
        phone: "",
        houseNumber: "",
        city: "",
        street: "",
        postalCode: "",
        countryCode: "",
        countryName: "",
        salutation: ""
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const handleCreateUser = () => {
        // Validation des champs
        let errorMessage = "";

        switch (true) {
            case !formData.firstName.trim():
                errorMessage = "FirstName is required.";
                break;
            case !formData.lastName.trim():
                errorMessage = "LastName is required.";
                break;
            case !formData.email.trim():
                errorMessage = "Email is required.";
                break;
            case !formData.pseudo.trim():
                errorMessage = "Pseudo is required.";
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

        const newUser = {
            address: {
                houseNumber: formData.houseNumber,
                city: formData.city,
                street: formData.street,
                postalCode: formData.postalCode,
                country: {
                    code: formData.countryCode,
                    name: formData.countryName,
                    language: ""
                }
            },
            companyName: formData.firstName + " " + formData.lastName,
            
            profiles: [
                {
                    firstName: formData.firstName,
                    lastName: formData.lastName,
                    phone: formData.phone,
                    mobilePhone: formData.phone,
                    emailAddress: formData.email,
                    emailNotifications: false,
                    salutation: formData.salutation,
                    user: {
                        username: formData.email,
                        password: formData.password
                    },
                    metaInfo: {
                        "pseudo": formData.pseudo,
                        "userType": "Individual"
                    }
                }
            ],
        };
        console.log("newUser to be sent:", newUser);
        dataService.createUser(newUser)
            .then(res => {
                console.log(res);
                toast.success("User successfully created !");
                setFormData({
                    email: "",
                    pseudo: "",
                    password: "",
                    firstName: "",
                    lastName: "",
                    phone: "",
                    houseNumber: "",
                    city: "",
                    street: "",
                    postalCode: "",
                    countryCode: "",
                    countryName: "",
                    salutation: ""
                });
                handleCloseModal();
            })
            .catch(err => {
                console.error(err);
                toast.error("Error during user creation.");
            });
    };

    return (
        <div className={`modal fade ${handleShowModal ? "show" : ""}`} tabIndex="-1" role="dialog" style={{ display: handleShowModal ? "block" : "none", backgroundColor: "rgba(0,0,0,0.5)" }}>
            <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content border-0 shadow">
                    <div className="modal-header" style={{ backgroundColor: "#4B2E83", color: "#FFF" }}>
                        <h5 className="modal-title  mx-auto">Create User</h5>
                        <button type="button" className="close btn btn-danger" onClick={handleCloseModal}>
                            <span aria-hidden="true" style={{ color: "#FFF" }}>&times;</span>
                        </button>
                    </div>
                    <div className="modal-body" style={{ backgroundColor: "#F2F2F2" }}>
                        <div className="form-group">
                            <label htmlFor="firstName">Firstname</label>
                            <input type="text" className="form-control" id="firstName" name="firstName" value={formData.firstName} onChange={handleInputChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="lastName">Lastname</label>
                            <input type="text" className="form-control" id="lastName" name="lastName" value={formData.lastName} onChange={handleInputChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input type="email" className="form-control" id="email" name="email" value={formData.email} onChange={handleInputChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="phone">Phone</label>
                            <input type="text" className="form-control" id="phone" name="phone" value={formData.phone} onChange={handleInputChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="houseNumber">House number</label>
                            <input type="text" className="form-control" id="houseNumber" name="houseNumber" value={formData.houseNumber} onChange={handleInputChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="city">City</label>
                            <input type="text" className="form-control" id="city" name="city" value={formData.city} onChange={handleInputChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="street">Street Name</label>
                            <input type="text" className="form-control" id="street" name="street" value={formData.street} onChange={handleInputChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="postalCode">Postal Code</label>
                            <input type="text" className="form-control" id="postalCode" name="postalCode" value={formData.postalCode} onChange={handleInputChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="countryCode">Country Code</label>
                            <input type="text" className="form-control" id="countryCode" name="countryCode" value={formData.countryCode} onChange={handleInputChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="countryName">Country Name</label>
                            <input type="text" className="form-control" id="countryName" name="countryName" value={formData.countryName} onChange={handleInputChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="salutation">Salutation</label>
                            <select className="form-control" id="salutation" name="salutation" value={formData.salutation} onChange={handleInputChange}>
                                <option value="">Choisir...</option>
                                <option value="Mr">Mr</option>
                                <option value="Mrs">Mrs</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="pseudo">Pseudo</label>
                            <input type="text" className="form-control" id="pseudo" name="pseudo" value={formData.pseudo} onChange={handleInputChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input type="password" className="form-control" id="password" name="password" value={formData.password} onChange={handleInputChange} />
                        </div>
                    </div>
                    <div className="modal-footer" style={{ backgroundColor: "#F2F2F2" }}>
                        <button type="button" className="btn " style={{ backgroundColor: "#4B2E83", color: "#FFF" }} onClick={handleCreateUser}>
                            Create
                        </button>
                        <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default IndividualModalCreate;
