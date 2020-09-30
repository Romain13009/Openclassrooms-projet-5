
/*Création du panier utilisateur si besoin*/

if (localStorage.getItem("monPanier")){
    console.log("Panier OK");
}else{
    console.log("Création du panier");
    let init = [];
    localStorage.setItem("monPanier", (JSON.stringify(init)));
}


let panier = JSON.parse(localStorage.getItem("monPanier")); //On stock le panier dans cette variable


/*Fonction affichant le nombre d'article dans le panier dans le nav*/

function nombreArticle (){
    let numberArticle = document.getElementById("Numberarticle");
    numberArticle.textContent = panier.length;
}

nombreArticle();