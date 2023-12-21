import React, { useEffect, useState } from "react";
import ReactModal from "react-modal";
import { toast } from 'react-toastify';



const IndividualModalCreate = ({ handleShowModal, handleCloseModal, userType }) => {
    const [email, setEmail] = useState("");
    const [pseudo, setPseudo] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");

    const handleCreateUser = () => {
        const newUser = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            pseudo: pseudo,
            password: password,
            userType: userType
        };
        fetch('http://localhost:5000/users', {
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
            });

        // Réinitialiser les champs et fermer la modale
        setFirstName("");
        setLastName("");
        setEmail("");
        setPseudo("");
        setPassword("");
        handleCloseModal();
    };


    return (
        <div className={`modal ${handleShowModal ? "show" : ""}`} tabIndex="-1" role="dialog" style={{ display: handleShowModal ? "block" : "none" }}>
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Create User</h5>
                        <button type="button" className="close" onClick={handleCloseModal}>
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <div className="form-group">
                            <label htmlFor="firstName">Firstname</label>
                            <input type="firstName" className="form-control" id="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="lastName">Lastname</label>
                            <input type="lastName" className="form-control" id="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input type="email" className="form-control" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
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
                        <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>
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

export default IndividualModalCreate;