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

//Création de l'objet à envoyer, regroupant le formulaire et les articles
const commandeUser = {
    contact: {},
    products: [],
}

document.getElementById("formulaire").addEventListener("submit", function (envoi){
    
    envoi.preventDefault();

    //Avant d'envoyer un formulaire, vérification que le panier n'est pas vide.
    if (panier.length == 0){
        alert("Attention, votre panier est vide.");
    }
    else {
        //Récupération des champs
        let nomForm = document.getElementById("Nomform").value;
        let prenomForm = document.getElementById("Prénom").value;
        let emailForm = document.getElementById("Email").value;
        let adresseForm = document.getElementById("Adresse").value;
        let villeForm = document.getElementById("Ville").value;
        let codePostalForm = document.getElementById("Codepostal").value;

        //Création de l'objet formulaireObjet
        commandeUser.contact = {
            firstName: prenomForm,
            lastName: nomForm,  
            address: adresseForm,
            city: villeForm,
            email: emailForm,
        }    
        
        //Création du tableau des articles
        
        panier.forEach(articlePanier =>
            commandeUser.products.push(articlePanier._id)
        )

        //Création de l'objet à envoyer, regroupant le formulaire et les articles
  
        console.log(commandeUser);

        //Envoi des données récupérées
        const optionsFetch = {
            headers:{
                'Content-Type': 'application/json',
            },
            method:"POST",
            body: JSON.stringify(commandeUser),         
        }

        fetch(urlOrder, optionsFetch).then(function(response){
            response.json().then(console.log(response))
            
        });
    }
})

//fetch(url).then(function(response) {   response.text().then(function(text) {     poemDisplay.textContent = text;   }); });


/*fetch('./api/some.json')   .then(     function(response) {       if (response.status !== 200) {         console.log('Looks like there was a problem. Status Code: ' +           response.status);         return;       }        // Examine the text in the response       response.json().then(function(data) {         console.log(data);       });     }   )   .catch(function(err) {     console.log('Fetch Error :-S', err);   });*/

