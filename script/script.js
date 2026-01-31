// MENU RESPONSIVE
// Gestion de l’ouverture et fermeture du menu mobile

// Récupération des éléments du menu
const bar = document.getElementById('bar');
const nav = document.getElementById('barnav');
const ferm = document.getElementById('fermer');
// Ouverture du menu 
if(bar){
    bar.addEventListener('click',()=>{
        nav.classList.add('active')
    })
}
// Fermeture du menu
if(ferm){
    ferm.addEventListener('click',()=>{
        nav.classList.remove('active')
    })
}

//--------------------------------------------------------------
// FILTRAGE DES PRODUITS

document.addEventListener("DOMContentLoaded", () => {
    // Sélection des boutons de filtre, des conteneurs et des titres
    const buttons = document.querySelectorAll("#filtre button, #filtre .sous-filtre a");    
    const categories = document.querySelectorAll(".prodContainer");
    const titles = document.querySelectorAll(".nomCat");

 // Fonction de filtrage des produits
    function filterProducts(category) {
        categories.forEach(container => {
            if (category === "all" || container.dataset.cat === category) {
                container.style.display = "flex";
            } else {
                container.style.display = "none";
            }
        });

        // Affiche ou masque les titres de catégories
        titles.forEach(title => {
            const nextContainer = title.nextElementSibling;
            if (category === "all" || nextContainer.dataset.cat === category) {
                title.style.display = "block";
            } else {
                title.style.display = "none";
            }
        });
    }
    // Gestion du clic sur les filtres
    buttons.forEach(btn => {
        btn.addEventListener("click", (e) => {
            e.preventDefault();

            const filter = btn.dataset.filter;
            if (!filter) return;
            // Mise à jour du bouton actif
            document.querySelectorAll("#filtre button").forEach(b => b.classList.remove("active"));
            if (btn.tagName === "BUTTON") btn.classList.add("active");

            filterProducts(filter);
        });
    });

});

//----------------------------------------------
/*Détails des programmes*/
// Ouverture/fermeture d’une carte à la fois
document.addEventListener('DOMContentLoaded', function() {
    const boutons = document.querySelectorAll('.descprog');

    boutons.forEach(btn => {
        btn.addEventListener('click', function() {
            const carteActuelle = this.closest('.prog');
            const estDejaActive = carteActuelle.classList.contains('active');

            // 1. On ferme TOUTES les cartes ouvertes
            document.querySelectorAll('.prog').forEach(carte => {
                carte.classList.remove('active');
                // On remet le texte du bouton à l'état initial pour toutes les cartes
                const bouton = carte.querySelector('.descprog');
                if (bouton) bouton.textContent = "EN SAVOIR PLUS";
            });

            // 2. Si la carte cliquée n'était pas déjà ouverte, on l'ouvre
            if (!estDejaActive) {
                carteActuelle.classList.add('active');
                this.textContent = "RÉDUIRE";
            }
            
        });
    });
});

//-----------------------------------------
// LOCAL STORAGE pour le panier


function getCart() {
    let data = localStorage.getItem("cart");
    if (!data) return [];
    return data.split(";").map(item => {
        let p = item.split("|");
        return { name: p[0], price: parseInt(p[1]), image: p[2], qty: parseInt(p[3]) };
    });
}

function saveCart(cart) {
    let data = cart.map(i => `${i.name}|${i.price}|${i.image}|${i.qty}`).join(";");
    localStorage.setItem("cart", data);
}

//----------------------------------------
// AJOUTER AU PANIER


let cart = getCart();

document.querySelectorAll(".pro button").forEach(btn => {
    btn.addEventListener("click", () => {

        let box = btn.closest(".pro");
        let name = box.querySelector("h4").innerText;
        let price = parseInt(box.querySelector("h5").innerText);
        let image = box.querySelector("img").src;

        // Vérifie si le produit existe déjà
        let found = cart.find(p => p.name === name);

        if (found) found.qty++;
        else cart.push({ name, price, image, qty: 1 });

        saveCart(cart);
        alert("Ajouté au panier 🛒");
    });
});

// ----------------------------------
// AFFICHER PANIER

const tbody = document.querySelector("#panier tbody");

if (tbody) refreshCart();

function refreshCart() {
    cart = getCart();
    tbody.innerHTML = "";

    // Génération dynamique des lignes du panier
    cart.forEach((p, i) => {
        let row = `
        <tr>
            <td><a href="#" class="supprimer" data-i="${i}">✖</a></td>
            <td><img src="${p.image}"></td>
            <td>${p.name}</td>
            <td>${p.price} DA</td>
            <td><input type="number" value="${p.qty}" min="1" data-i="${i}"></td>
            <td class="ligne-total">${p.price * p.qty} DA</td>
        </tr>`;
        tbody.innerHTML += row;
    });

    calcTotal();
}

//-----------------------------------
// SUPPRIMER & MODIFIER

// Suppression d’un produit
document.addEventListener("click", e => {
    if (e.target.classList.contains("supprimer")) {
        let i = e.target.dataset.i;
        cart.splice(i, 1);
        saveCart(cart);
        refreshCart();
    }
});
// Modification des quantités
document.addEventListener("input", e => {
    if (e.target.type === "number") {

        let i = e.target.dataset.i;
        let value = parseInt(e.target.value);

        if (isNaN(value) || value < 1) return;

        cart[i].qty = value;
        saveCart(cart);

        //  Mise à jour du sous-total de la ligne
        let row = e.target.closest("tr");
        let ligneTotal = row.querySelector(".ligne-total");
        ligneTotal.innerText = (cart[i].price * value) + " DA";

        //  Mise à jour du total général
        calcTotal();
    }
});

// ---------------------------
// TOTAL Panier


function calcTotal() {
    let total = 0;
    cart.forEach(p => total += p.price * p.qty);

    let t1 = document.querySelector("#sous-total tr:nth-child(1) td:last-child");
    let t2 = document.querySelector("#sous-total tr:nth-child(3) td:last-child");

    if (t1) t1.innerText = total + " DA";
    if (t2) t2.innerText = (total + 600) + " DA";
}
// confirmation de la commande

document.addEventListener("DOMContentLoaded", () => {
    const btn = document.querySelector("#sous-total button");

    if (btn) {
        btn.addEventListener("click", () => {
            const confirmation = confirm("Voulez-vous vraiment valider votre commande ?");

            if (confirmation) {
                alert("✅ Commande validée avec succès !");
            }
        });
    }
})