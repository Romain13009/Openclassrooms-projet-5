/*Affichage du panier utilisateur dans la page "panier"*/

function affichagePanier (){
    if (panier.length > 0){
        document.getElementById("panierVide").remove();

        /*Nous allons présenter le panier à l'utilisateut sous forme de tableau que nous plaçons dans la section "Sectionpanier"*/

        let tableauSection = document.getElementById("Sectionpanier");

        //Création du tableau

        let tableauPanier = document.createElement("table");
        let tableauHeaderLigne = document.createElement("tr");
        let tableauHeaderImage = document.createElement("th");
        let tableauHeaderNom = document.createElement("th");
        let tableauHeaderPrix = document.createElement("th");
        let tableauHeaderAction = document.createElement("th");
        let tableauFooterLigne = document.createElement("tr");
        let tableauFooterPrixTotal = document.createElement("th");

        /*Modification des attributs de chaque élément crée*/

        tableauPanier.setAttribute("class", "tableauPanier");
        tableauHeaderLigne.setAttribute("class", "tableauHeaderLigne");
        tableauFooterLigne.setAttribute("class", "tableauFooterLigne");
        tableauFooterPrixTotal.setAttribute("class", "tableauFooterPrixTotal");
        tableauFooterPrixTotal.setAttribute("colspan", "4");

        /*Hiérarchisation des élements crées*/

        tableauSection.appendChild(tableauPanier);
        tableauPanier.appendChild(tableauHeaderLigne);
        tableauHeaderLigne.appendChild(tableauHeaderImage);
        tableauHeaderLigne.appendChild(tableauHeaderNom);
        tableauHeaderLigne.appendChild(tableauHeaderPrix);
        tableauHeaderLigne.appendChild(tableauHeaderAction);

        /*Attribution des données aux élements créees*/

        tableauHeaderImage.textContent = "Article(s)";
        tableauHeaderNom.textContent = "Nom(s)";
        tableauHeaderPrix.textContent = "Prix";
        tableauHeaderAction.textContent = "Action";

        /*Création d'une ligne dans le tableau pour chaque produit composant le panier*/

        

        JSON.parse(localStorage.getItem("monPanier")).forEach((article, index) => {

            let articleLigne = document.createElement("tr");
            let articleImage = document.createElement("img");
            let articleNom = document.createElement("td");
            let articlePrix = document.createElement("td");
            let articleAction = document.createElement("i");

            /*Modification des attributs de chaque élément crée*/

            articleLigne.setAttribute("id", "articleLigne");
            articleImage.setAttribute("id", "articleImage");
            articleImage.setAttribute("src", article.imageUrl);
            articleNom.setAttribute("id", "articleNom");
            articlePrix.setAttribute("id", "articlePrix");
            articleAction.setAttribute("id", index);
            articleAction.setAttribute("alt", "Retirer l'article du panier.");
            articleAction.setAttribute("class", "fas fa-trash-alt"); //Logo poubelle pour supprimer l'article du panier.
            
            
            
            articleAction.addEventListener("click", function(event){
                console.log(event.target.id);
                
                suppressionArticle(event.target.id);
                
            });
            
            //console.log(i);
            

            /*Hiérarchisation des élements crées*/

            tableauPanier.appendChild(articleLigne);
            articleLigne.appendChild(articleImage);
            articleLigne.appendChild(articleNom);
            articleLigne.appendChild(articlePrix);
            articleLigne.appendChild(articleAction);

            /*Attribution des données aux élements créees*/

            articleNom.textContent = article.name;
            articlePrix.textContent = article.price / 100 + " " + "euros";
        });

        /*Création de la ligne du bas du tableau affichant le prix total de la commande*/

        tableauPanier.appendChild(tableauFooterLigne);
        tableauFooterLigne.appendChild(tableauFooterPrixTotal);
        
        let total = 0; //On stock le prix total dans cette variable afin de l'afficher dans le tableau
        JSON.parse(localStorage.getItem("monPanier")).forEach(priceArticle => {
            total += priceArticle.price / 100;
        });

        tableauFooterPrixTotal.textContent = "Prix total: " + total + " euros";        
    }
}

affichagePanier ();


/*Fonction de suppression d'article du panier*/


function suppressionArticle (i){
    console.log("suppression article i :", i);
    panier.splice(i, 1); //suppression de l'element i du tableau;  
    localStorage.clear(); //on vide le storage avant de le mettre à jour;
    localStorage.setItem("monPanier", JSON.stringify(panier)); //maj du panier sans l'élément i;
    window.location.reload();
}



/*FORMULAIRE*/

/*Validation de formulaire*/

document.getElementById("formulaire").addEventListener("submit", function (envoi){
    
    //Création d'une variable Erreur
    let erreurForm;

    //Récupération des champs
    let nomForm = getElementById("Nom");
    let prenomForm = getElementById("Prénom");
    let emailForm = getElementById("Email");
    let adresseForm = getElementById("Adresse");
    let villeForm = getElementById("Ville");
    let codePostalForm = getElementById("Codepostal");
    let numCarteForm = getElementById("Numérocarte");
    let pictoCarteForm = getElementById("Pictogramme");
    let expiCarteForm = getElementById("Expiration");

    //Affichage de l'erreur selon l'erreur
    if (nomForm.value == ""){
        erreurForm = "Veuillez indiquer votre nom."
    }
    if (prenomForm.value == ""){
        erreurForm = "Veuillez indiquer votre prénom."
    }
    if (emailForm.value == ""){
        erreurForm = "Veuillez indiquer votre email."
    }
    if (adresseForm.value == ""){
        erreurForm = "Veuillez indiquer votre adresse."
    }
    if (villeForm.value == ""){
        erreurForm = "Veuillez indiquer votre ville."
    }
    if (codePostalForm.value == ""){
        erreurForm = "Veuillez indiquer votre code postal."
    }
    if (numCarteForm.value == ""){
        erreurForm = "Veuillez indiquer le numéro de votre carte."
    }
    if (pictoCarteForm.value == ""){
        erreurForm = "Veuillez indiquer le pictogramme de votre carte."
    }
    if (expiCarteForm.value == ""){
        erreurForm = "Veuillez indiquer la date d'expiration de votre carte."
    }

    if (erreurForm){
        envoi.preventDefault();
        
    }

    
})