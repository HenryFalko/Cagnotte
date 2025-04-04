// Module de gestion des données
const DB = {
    data: {
        currentAmount: 450,
        targetAmount: 1000,
        participantsCount: 25,
        endDate: '15 décembre 2023',
        transactions: []
    },
    
    init() {
        // Initialiser avec des données par défaut s'il n'y a pas de données sauvegardées
        if (!localStorage.getItem('cagnotteData')) {
            this.save();
        }
    },
    
    save() {
        localStorage.setItem('cagnotteData', JSON.stringify(this.data));
        // Déclencher un événement pour signaler la mise à jour
        localStorage.setItem('lastUpdate', Date.now().toString());
    },
    
    load() {
        const savedData = localStorage.getItem('cagnotteData');
        if (savedData) {
            this.data = JSON.parse(savedData);
        }
    },
    
    addTransaction(amount, participant, type) {
        amount = parseInt(amount);
        
        const transaction = {
            id: Date.now().toString(),
            amount: amount,
            participant: participant || 'Anonyme',
            type: type,
            timestamp: Date.now()
        };
        
        // Mise à jour du montant et du nombre de participants
        if (type === 'add') {
            this.data.currentAmount += amount;
            if (participant && !this.isExistingParticipant(participant)) {
                this.data.participantsCount++;
            }
        } else if (type === 'remove') {
            this.data.currentAmount = Math.max(0, this.data.currentAmount - amount);
        }
        
        this.data.transactions.push(transaction);
        this.save();
    },
    
    removeTransaction(id) {
        const tx = this.data.transactions.find(t => t.id === id);
        if (tx) {
            // Inverser l'effet de la transaction
            if (tx.type === 'add') {
                this.data.currentAmount = Math.max(0, this.data.currentAmount - tx.amount);
                // Gérer le compte de participants (plus complexe en réalité, simplifié ici)
            } else if (tx.type === 'remove') {
                this.data.currentAmount += tx.amount;
            }
            
            this.data.transactions = this.data.transactions.filter(t => t.id !== id);
            this.save();
        }
    },
    
    isExistingParticipant(name) {
        return this.data.transactions.some(tx => 
            tx.type === 'add' && tx.participant.toLowerCase() === name.toLowerCase()
        );
    }
};

// Éléments DOM
const progressBar = document.getElementById('progress-bar');
const percentageDisplay = document.getElementById('percentage');
const currentAmountDisplay = document.getElementById('current-amount');
const targetAmountDisplay = document.getElementById('target-amount');
const participantsCountDisplay = document.getElementById('participants-count');
const endDateDisplay = document.getElementById('end-date');
const transactionList = document.getElementById('transaction-list');
const addBtn = document.getElementById('add-btn');
const removeBtn = document.getElementById('remove-btn');
const amountInput = document.getElementById('amount');
const participantInput = document.getElementById('participant');
const targetInput = document.getElementById('target');
const updateTargetBtn = document.getElementById('update-target-btn');

// Mise à jour de l'affichage de la barre de progression
function updateProgressBar() {
    const { currentAmount, targetAmount } = DB.data;
    
    // Calcul du pourcentage avec limite à 100%
    const percentage = Math.min(100, Math.round((currentAmount / targetAmount) * 100));
    
    // Mise à jour des éléments visuels
    progressBar.style.width = `${percentage}%`;
    percentageDisplay.textContent = `${percentage}%`;
    currentAmountDisplay.textContent = `${currentAmount}€`;
    targetAmountDisplay.textContent = `Objectif: ${targetAmount}€`;
    participantsCountDisplay.textContent = DB.data.participantsCount;
    endDateDisplay.textContent = DB.data.endDate;
}

// Afficher l'historique des transactions
function renderTransactions() {
    transactionList.innerHTML = '';
    
    // Trier par date (plus récent en premier)
    const sortedTransactions = [...DB.data.transactions].sort((a, b) => b.timestamp - a.timestamp);
    
    sortedTransactions.forEach(tx => {
        const txElement = document.createElement('div');
        txElement.className = `transaction-item ${tx.type}`;
        
        const dateFormatted = new Date(tx.timestamp).toLocaleString();
        
        txElement.innerHTML = `
            <div class="transaction-info">
                <span class="transaction-amount">${tx.type === 'add' ? '+' : '-'}${tx.amount}€</span>
                <span class="transaction-participant">${tx.participant}</span>
                <span class="transaction-date">${dateFormatted}</span>
            </div>
            <button class="delete-tx-btn" data-id="${tx.id}">×</button>
        `;
        
        transactionList.appendChild(txElement);
    });
    
    // Ajouter des écouteurs pour les boutons de suppression
    document.querySelectorAll('.delete-tx-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const id = this.getAttribute('data-id');
            DB.removeTransaction(id);
            updateProgressBar();
            renderTransactions();
        });
    });
}

// Gestionnaires d'événements
addBtn.addEventListener('click', function() {
    const amount = parseInt(amountInput.value);
    const participant = participantInput.value.trim();
    
    if (isNaN(amount) || amount <= 0) {
        alert('Veuillez entrer un montant valide');
        return;
    }
    
    DB.addTransaction(amount, participant, 'add');
    updateProgressBar();
    renderTransactions();
    
    // Réinitialiser le formulaire
    amountInput.value = '';
    participantInput.value = '';
});

removeBtn.addEventListener('click', function() {
    const amount = parseInt(amountInput.value);
    const participant = participantInput.value.trim() || 'Administration';
    
    if (isNaN(amount) || amount <= 0) {
        alert('Veuillez entrer un montant valide');
        return;
    }
    
    DB.addTransaction(amount, participant, 'remove');
    updateProgressBar();
    renderTransactions();
    
    // Réinitialiser le formulaire
    amountInput.value = '';
    participantInput.value = '';
});

updateTargetBtn.addEventListener('click', function() {
    const newTarget = parseInt(targetInput.value);
    
    if (isNaN(newTarget) || newTarget <= 0) {
        alert('Veuillez entrer un objectif valide');
        return;
    }
    
    DB.data.targetAmount = newTarget;
    DB.save();
    updateProgressBar();
    targetInput.value = '';
});

// Initialisation
document.addEventListener('DOMContentLoaded', function() {
    DB.init(); // Initialiser avec des valeurs par défaut si nécessaire
    DB.load(); // Charger les données sauvegardées
    updateProgressBar();
    renderTransactions();
});
