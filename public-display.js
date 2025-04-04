// Module de synchronisation
const DBSync = {
    data: {
        currentAmount: 0,
        targetAmount: 0,
        participantsCount: 0,
        endDate: '',
        transactions: []
    },
    
    lastUpdateTimestamp: 0,
    
    load() {
        const savedData = localStorage.getItem('cagnotteData');
        if (savedData) {
            this.data = JSON.parse(savedData);
        }
        this.lastUpdateTimestamp = parseInt(localStorage.getItem('lastUpdate') || '0');
    },
    
    checkForUpdates() {
        const currentUpdateTime = parseInt(localStorage.getItem('lastUpdate') || '0');
        if (currentUpdateTime > this.lastUpdateTimestamp) {
            this.load();
            updateDisplay();
            this.lastUpdateTimestamp = currentUpdateTime;
            return true;
        }
        return false;
    },
    
    startSyncInterval() {
        setInterval(() => this.checkForUpdates(), 1000); // Vérifier toutes les secondes
    }
};

// Éléments DOM
const progressBar = document.getElementById('progress-bar');
const percentageDisplay = document.getElementById('percentage');
const currentAmountDisplay = document.getElementById('current-amount');
const targetAmountDisplay = document.getElementById('target-amount');
const participantsCountDisplay = document.getElementById('participants-count');
const endDateDisplay = document.getElementById('end-date');
const donationsList = document.getElementById('donations-list');

// Mise à jour de l'affichage
function updateDisplay() {
    const { currentAmount, targetAmount, participantsCount, endDate } = DBSync.data;
    
    // Calcul du pourcentage avec limite à 100%
    const percentage = Math.min(100, Math.round((currentAmount / targetAmount) * 100) || 0);
    
    // Animation de la transition
    progressBar.style.width = `${percentage}%`;
    
    // Mise à jour des textes
    percentageDisplay.textContent = `${percentage}%`;
    currentAmountDisplay.textContent = `${currentAmount}€`;
    targetAmountDisplay.textContent = `Objectif: ${targetAmount}€`;
    participantsCountDisplay.textContent = participantsCount;
    endDateDisplay.textContent = endDate;
    
    // Effet visuel pour montrer la mise à jour
    progressBar.classList.add('updating');
    setTimeout(() => {
        progressBar.classList.remove('updating');
    }, 500);
    
    // Mettre à jour les 5 dernières transactions (dons uniquement)
    renderRecentDonations();
}

// Afficher les derniers dons
function renderRecentDonations() {
    donationsList.innerHTML = '';
    
    // Filtrer uniquement les ajouts (dons) et prendre les 5 derniers
    const recentDonations = DBSync.data.transactions
        .filter(t => t.type === 'add')
        .sort((a, b) => b.timestamp - a.timestamp)
        .slice(0, 5);
    
    // Créer les éléments pour chaque don
    recentDonations.forEach(donation => {
        const donationEl = document.createElement('div');
        donationEl.className = 'donation-item';
        donationEl.innerHTML = `
            <div class="donation-name">${donation.participant}</div>
            <div class="donation-amount">+${donation.amount}€</div>
        `;
        donationsList.appendChild(donationEl);
    });
    
    // Afficher un message si aucun don n'a été fait
    if (recentDonations.length === 0) {
        const emptyMessage = document.createElement('p');
        emptyMessage.textContent = "Aucun don pour le moment";
        emptyMessage.style.textAlign = "center";
        emptyMessage.style.color = "#aaa";
        donationsList.appendChild(emptyMessage);
    }
}

// Initialisation
document.addEventListener('DOMContentLoaded', function() {
    // Charger les données au démarrage
    DBSync.load();
    updateDisplay();
    
    // Démarrer la synchronisation périodique
    DBSync.startSyncInterval();
    
    // Effet visuel pour montrer que la page est active
    setInterval(() => {
        progressBar.style.boxShadow = "0 0 10px rgba(78, 204, 163, 0.7)";
        setTimeout(() => {
            progressBar.style.boxShadow = "0 2px 5px rgba(0, 0, 0, 0.2)";
        }, 500);
    }, 10000);
});

// Écouter les changements de localStorage (détecte les changements dans les autres onglets/fenêtres)
window.addEventListener('storage', function(event) {
    if (event.key === 'cagnotteData') {
        console.log("Mise à jour détectée dans un autre onglet");
        DBSync.load();
        updateDisplay();
    }
});
