// API


const url = "http://localhost:3000/api/cameras";

/*Appel de l'API*/

/*
var request = new XMLHttpRequest();
request.onreadystatechange = fonction(); {
    if (this.readyState ==  XMLHttpRequest.DONE && this.status == 200){
        resolve(JSON.parse(this.responseText));
        console.log("Connexion réussie")
    }
    else{
        console.log("Erreur de connexion")
    }
};
request.open("GET", "http://localhost:3000/api/cameras");
request.send(); */

const getCams = async function () {
    let response = await fetch(url);
    let data = await response.json ();
    console.log (data);
}

getCams();


/*##########################################################

/*On crée la fonction de la liste des produits proposés qui sera présente sur l'index*/

/*On vient cibler la balise section ayant l'id "Produits"*/

let Produits = document.getElementById("Produits");
