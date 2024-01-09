import React, { useEffect, useState } from "react";
import ReactModal from "react-modal";
import { toast } from 'react-toastify';
import { dataService } from "../../services/dataService";



const EmissionModalCreate = ({ handleShowModalProducerEmission, handleCloseModalProducerEmission,}) => {


    const [nameBottle, setNameBottle] = useState("");
    const [category, setCategory] = useState("");
    const [quantity, setQuantity] = useState("");
    const [capacity, setCapacity] = useState("");
    const [unitPrice, setUnitPrice] = useState("");
    const [totalPrice, setTotalPrice] = useState("");
    const [producer, setProducer] = useState("");
    const [profile, setProfile] = useState([]);

    
    useEffect(() => {
        const checkAuthentication = async () => {
            const isAuthenticated = await dataService.isAuthenticated();

            if (isAuthenticated) {
                const userProfile = await dataService.getAuthenticatedProfile();
                setProfile(userProfile)
                // console.log(userProfile)
            }
        };
        checkAuthentication();
    }, []);

    // console.log(profile)

    const handleCreateEmission = () => {

        const newEmission= {
            name : nameBottle,
            category : category,
            quantity : quantity,
            capacity : capacity,
            unitPrice : unitPrice,
            totalPrice: unitPrice * quantity,
            producer: profile.id
        };

       
        console.log('emission ' , newEmission);

        // dataService.createUser(newProducer).then(res => console.log(res));


        // Reset fields and close modal
        setNameBottle("");
        setCategory("");
        setQuantity("");
        setCapacity("");
        setUnitPrice("");
        // setTotalPrice("");
        handleCloseModalProducerEmission();

    };


    return (
        <div className={`modal fade ${handleShowModalProducerEmission ? "show" : ""}`} tabIndex="-1" role="dialog" style={{ display: handleShowModalProducerEmission ? "block" : "none", backgroundColor: "rgba(0,0,0,0.5)" }}>
            <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content border-0 shadow">
                    <div className="modal-header" style={{ backgroundColor: "#4B2E83", color: "#FFF" }}>
                        <h5 className="modal-title mx-auto">Create Emission</h5>
                        <button type="button" className="close btn btn-danger" onClick={handleCloseModalProducerEmission}>
                            <span aria-hidden="true" style={{ color: "#FFF" }}>&times;</span>
                        </button>
                    </div>
                    <div className="modal-body" style={{ backgroundColor: "#F2F2F2" }}>
                        
                        <div className="form-group">
                            <label htmlFor="nameBottle">Name Bottle</label>
                            <input type="text" className="form-control" id="nameBottle" value={nameBottle} onChange={(e) => setNameBottle(e.target.value)} />
                        </div>
                        
                        {/* <div className="form-group">
                            <label htmlFor="category">Category</label>
                            <input type="text" className="form-control" id="category" value={category} onChange={(e) => setCategory(e.target.value)} />
                            
                        </div> */}

                        {/* A remplacer par les bons type of wine */}
                        <div className="form-group">
                            <label htmlFor="category">
                                Select a Category
                                <select name="selectedCategory" defaultValue="" onChange={(e) => setCategory(e.target.value) }>
                                    <option value="red">Red</option>
                                    <option value="white">White</option>
                                    <option value="rose">Rose</option>
                                </select>
                            </label>

                        </div>

                        <div className="form-group">
                            <label htmlFor="quantity">Quantity</label>
                            <input type="text" className="form-control" id="quantity" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
                        </div>

                        <div className="form-group">
                            <label htmlFor="capacity">Capacity</label>
                            <input type="text" className="form-control" id="capacity" value={capacity} onChange={(e) => setCapacity(e.target.value)} />
                        </div>

                        <div className="form-group">
                            <label htmlFor="unitprice">Unit Price </label>
                            <input type="number" className="form-control" id="unitPrice" value={unitPrice} onChange={(e) => setUnitPrice(e.target.value)} />
                        </div>

                        {/* <div className="form-group">
                            <label htmlFor="totalPrice">Total Price</label>

                            <input type="number" className="form-control" id="totalPrice" value={totalPrice} onChange={(e) => setTotalPrice(e.target.value)} />
                        </div> */}

                        

                    </div>
                    <div className="modal-footer" style={{ backgroundColor: "#F2F2F2" }}>

                        
                        <button type="button" className="btn" style={{ backgroundColor: "#4B2E83", color: "#FFF" }} onClick={handleCreateEmission}>
                            Create
                        </button>

                        <button type="button" className="btn btn-secondary" onClick={handleCloseModalProducerEmission}>
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EmissionModalCreate;