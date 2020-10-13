// API
const url = "http://localhost:3000/api/cameras";
const urlOrder = "http://localhost:3000/api/cameras/order";

/*fonction création éléments, attribution*/
function create(type, Qualified, nomType){
    let nomVariable = document.createElement(type);
    nomVariable.setAttribute(Qualified, nomType);
    return nomVariable;
}

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

/*Fonction de suppression d'article du panier*/
function suppressionArticle (i){
    console.log("suppression article i :", i);
    panier.splice(i, 1); //suppression de l'element i du tableau;  
    localStorage.clear(); //on vide le storage avant de le mettre à jour;
    localStorage.setItem("monPanier", JSON.stringify(panier)); //maj du panier sans l'élément i;
    window.location.reload();
}
