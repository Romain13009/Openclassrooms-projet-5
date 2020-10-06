
/*Appel de l'API*/

const getCams = async function () {
    const response = await fetch(url);
    return await response.json();
}

getCams();

/*##########################################################*/

/*LISTE INDEX*/

async function listeCams() {
    const cams = await getCams();

    /*On vient cibler la balise section ayant l'id "Produits"*/

    let produits = document.getElementById("Produits");

    /*On crée l'affichage de la liste des produits proposés qui sera présente sur l'index*/

    cams.forEach((cameras) => {
        let produitContainer = document.createElement("div");
        let produitB1 = document.createElement("div");
        let produitB2 = document.createElement("div");
        let produitNom = document.createElement("h2");
        let produitLien = document.createElement("a");
        let produitPrix = document.createElement("p");
        let produitImage = document.createElement("img");

    /*Modification des attributs de chaque élément crée*/

        produitContainer.setAttribute("class", "Block");
        produitB1.setAttribute("class", "B1");
        produitB2.setAttribute("class", "B2");
        produitNom.setAttribute("class", "Nomproduits");
        produitLien.setAttribute("href", "produit.html?id=" + cameras._id);
        produitPrix.setAttribute("class", "Prixproduit");
        produitImage.setAttribute("src", cameras.imageUrl);
        produitImage.setAttribute("alt", "image du produit");
        produitImage.setAttribute("class", "Imageproduit");
        
    /*Hiérarchisation des élements crées*/
        
        produits.appendChild(produitContainer);
        produitContainer.appendChild(produitB1);
        produitContainer.appendChild(produitB2);
        produitB1.appendChild(produitImage);
        produitB2.appendChild(produitNom);
        produitB2.appendChild(produitPrix);
        produitB2.appendChild(produitLien);

    /*Attribution des données aux élements créees*/

        produitNom.textContent = cameras.name;
        produitPrix.textContent = cameras.price / 100 + " " + "euros";
        produitLien.textContent = "Voir la description du produit.";

    });
};

listeCams();

