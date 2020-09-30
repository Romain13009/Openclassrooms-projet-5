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

        JSON.parse(localStorage.getItem("monPanier")).forEach(article => {
            
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
            articleAction.setAttribute("id", "articleAction");
            articleAction.setAttribute("alt", "Retirer l'article du panier.");
            articleAction.setAttribute("class", "fas fa-trash-alt"); //Logo poubelle pour supprimer l'article du panier.

            /*Hiérarchisation des élements crées*/

            tableauPanier.appendChild(articleLigne);
            articleLigne.appendChild(articleImage);
            articleLigne.appendChild(articleNom);
            articleLigne.appendChild(articlePrix);
            articleLigne.appendChild(articleAction);

            /*Attribution des données aux élements créees*/

            articleNom.textContent = article.name;
            articlePrix.textContent = article.price / 100 + " " + "euros";

            /*Suppression des articles*/

            //articleAction.addEventListener("click",)////////////////////////////////////////////////////////////////////////////////////////

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