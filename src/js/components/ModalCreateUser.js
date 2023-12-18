import React, { useEffect, useState } from "react";
import ReactModal from "react-modal";



const ModalCreateUser = ({ handleShowModal, handleCloseModal, userType }) => {
    const [email, setEmail] = useState("");
    const [pseudo, setPseudo] = useState("");
    const [password, setPassword] = useState("");

    const handleCreateUser = () => {
        const newUser = {
            email: email,
            pseudo: pseudo,
            password: password,
            userType: userType
          };
        
          console.log("Création de l'utilisateur :", newUser);
        
        // Ajoutez ici la logique pour créer un utilisateur
        // Utilisez les valeurs de email, pseudo, password
        console.log("Création de l'utilisateur :", { email, pseudo, password });

        // Réinitialisez les champs après la création
        setEmail("");
        setPseudo("");
        setPassword("");

        // Fermez la modal après la création
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
                            <label htmlFor="email">Email</label>
                            <input type="email" className="form-control" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="pseudo">Pseudo</label>
                            <input type="text" className="form-control" id="pseudo" value={pseudo} onChange={(e) => setPseudo(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input type="password" className="form-control" id="password"  value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        {/* <div className="form-group">
                            <label htmlFor="term">Terme :</label>
                            <select className="form-control" id="term" value={selectedTerm} onChange={handleTermChange}>
                                <option value="">Sélectionnez un terme</option>
                                {terms.map((term) => (
                                    <option key={term.id} value={term.id}>
                                        {term.name}
                                    </option>
                                ))}
                            </select>
                        </div> */}
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

export default ModalCreateUser;