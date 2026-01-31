//------------------------------------
// Gestion des formulaires de connexion et d’inscription
document.addEventListener('DOMContentLoaded', () => {
    // Récupération des formulaires
    const loginForm = document.getElementById('loginForm');
    const inscriptionForm = document.getElementById('InscriptionForm');
    // Soumission du formulaire de connexion
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            window.location.href = "../content/profile.html";
        });
    }
    // Soumission du formulaire d’inscription
    if (inscriptionForm) {
        inscriptionForm.addEventListener('submit', (e) => {
            e.preventDefault();
            window.location.href = "../content/profile.html";
        });
    }
});