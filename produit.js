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
            let descriptionContainer = create("div", "class", "Blockdescription");
            let descriptionProduitB1 = create("div", "class", "B1description");
            let descriptionProduitB2 = create("div", "class", "B2description");
            let descriptionProduitNom = create("h2", "class", "Nomdescription");
            let descriptionProduitPrix = create("p", "class", "Prixdescription");
            let descriptionProduitImage = create("img", "src", data.imageUrl);
            let descriptionProduitDescription = create("p", "class", "Descriptionproduit");
            
            /*Attributs suplémentaires*/
            descriptionProduitImage.setAttribute("alt", "Photographie de l'appareil.");
            descriptionProduitImage.setAttribute("class", "Imagedescription");

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
        alert("L'article a bien été ajouté à votre panier.")
        location.reload();
    });
};
ajouterAuPanier();

