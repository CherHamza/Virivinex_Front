




const ProducerProfil = () => {


    fetch('http://localhost:5000/users')
        .then(response => response.json())
        .then(data => {
            console.log('Data Producer ' + data);
        })
        .catch(error => {
            console.error("Erreur lors de la connexion :", error);
            toast.error("Erreur lors de la connexion.");
        });
    return (
        <>
<h1>Producer</h1>

        
        </>
    );
}

export default ProducerProfil;