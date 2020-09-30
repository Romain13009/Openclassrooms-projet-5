// API

//const { json } = require("body-parser");

const url = "http://localhost:3000/api/cameras";


/*##########################################################*/


/*PRODUIT SELECTIONNE INDEX*/

/*Création de la variable contenant l'id*/

const params = new URLSearchParams(window.location.search);
let camId = params.get("id");


/*Appel du produit séléctionné*/

let mesVariables; //On stock les données du produit dans cette variable.

async function selectionProduit() {

    fetch(url + "/" + camId).then(function(response){
        response.json().then(function(data){
            mesVariables = data;

            /*On vient cibler la balise div ayant pour id Descriptionproduit*/

            let descriptionProduit = document.getElementById("Descriptionproduit");

            /*On crée l'affichage de la description du produit séléctionné par l'utilisateur*/

            let descriptionContainer = document.createElement("div");
            let descriptionProduitB1 = document.createElement("div");
            let descriptionProduitB2 = document.createElement("div");
            let descriptionProduitNom = document.createElement("h2");
            let descriptionProduitPrix = document.createElement("p");
            let descriptionProduitImage = document.createElement("img");
            let descriptionProduitDescription = document.createElement("p");

            /*Modification des attributs de chaque élément crée*/

            descriptionContainer.setAttribute("class", "Blockdescription");
            descriptionProduitB1.setAttribute("class", "B1description");
            descriptionProduitB2.setAttribute("class", "B2description");
            descriptionProduitNom.setAttribute("class", "Nomdescription");
            descriptionProduitPrix.setAttribute("class", "Prixdescription");
            descriptionProduitImage.setAttribute("src", data.imageUrl);
            descriptionProduitImage.setAttribute("alt", "Photographie de l'appareil.");
            descriptionProduitImage.setAttribute("class", "Imagedescription");
            descriptionProduitDescription.setAttribute("class", "Descriptionproduit");

            /*Hiérarchisation des élements crées*/

            descriptionProduit.appendChild(descriptionContainer);
            descriptionContainer.appendChild(descriptionProduitB1);
            descriptionContainer.appendChild(descriptionProduitB2);
            descriptionProduitB1.appendChild(descriptionProduitImage);
            descriptionProduitB2.appendChild(descriptionProduitNom);
            descriptionProduitB2.appendChild(descriptionProduitPrix);
            descriptionProduitB2.appendChild(descriptionProduitDescription);

            /*Attribution des données aux élements créees*/
            
            descriptionProduitNom.textContent = data.name;
            descriptionProduitPrix.textContent = data.price / 100 + " " + "euros";
            descriptionProduitDescription.textContent = data.description;

            
            let selectLentille = document.getElementById("lentille");

            data.lenses.forEach(lentilles => {
                let option = document.createElement("option");

                selectLentille.appendChild(option);

                option.setAttribute("value", "Type de lentille");
                option.textContent = lentilles;
            });
        })
    })
}

selectionProduit();


/*Ajouter un article au panier*/

function ajouterAuPanier(){
    const bouton = document.getElementById("Boutonpanier");
    bouton.addEventListener("click", async function(){
        
        panier.push(mesVariables);
        localStorage.setItem("monPanier", JSON.stringify(panier));
        location.reload();
    });
};

ajouterAuPanier();

