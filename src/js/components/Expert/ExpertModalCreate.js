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

    const handleCreateUser = () => {
        /*const newUser = {
          firstName: firstName,
          lastName: lastName,
          email: email,
          qualification: qualification,
          pseudo: pseudo,
          password: password,
          userType: userType
        };*/


        const newUser = {
            address: {
                houseNumber: "12",
                city: "Paris",
                street: "Champs-Élysées",
                postalCode: "75008",
                country: {
                    code: "FR",
                    name: "France",
                    language: "Français"
                }
            },
            companyName: firstName + " " + lastName,
            profiles: [
                {
                    firstName: firstName,
                    lastName: lastName,
                    phone: "+3312345678",
                    mobilePhone: "",
                    emailAddress: email,
                    emailNotifications: false,
                    salutation: "Mr",
                    user: {
                        username: email,
                        password: password
                    },
                    metaInfo: {
                        "qualification" : qualification,
                        "pseudo": pseudo,
                        "userType": userType
                    }
                }
            ],
        };


        dataService.createUser(newUser).then(res => console.log(res));
      
        /*fetch('http://localhost:5000/users', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(newUser)
        })
        .then(response => response.json())
        .then(data => {
          console.log('Nouvel utilisateur créé:', data);
          toast.success("Compte créé avec succès !");
        })
        .catch(error => {
          toast.error("Identifiants incorrects.");
          console.error("Erreur lors de la création de l'utilisateur:", error);
        });*/
      
        // Réinitialiser les champs et fermer la modale
        setFirstName("");
        setLastName("");
        setEmail("");
        setPseudo("");
        setQualification("");
        setPassword("");
        handleCloseModalExpert();
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
                            <input type="text" className="form-control" id="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="lastName">Lastname</label>
                            <input type="text" className="form-control" id="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input type="email" className="form-control" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="qualification">Qualification</label>
                            <input type="text" className="form-control" id="qualification" value={qualification} onChange={(e) => setQualification(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="pseudo">Pseudo</label>
                            <input type="text" className="form-control" id="pseudo" value={pseudo} onChange={(e) => setPseudo(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input type="password" className="form-control" id="password"  value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>
                    
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={handleCloseModalExpert}>
                            Annuler
                        </button>
                        <button type="button" className="btn btn-primary" onClick={handleCreateUser}>
                            Créer
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ExpertModalCreate;