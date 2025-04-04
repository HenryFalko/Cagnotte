# Projet Cagnotte Solidaire

## Description
Une plateforme web dynamique permettant de suivre en temps réel l'avancement de cagnottes solidaires. Conçue pour afficher de manière élégante et engageante la progression des dons, cette application offre une interface personnalisable qui s'adapte à diverses causes et collectes de fonds.

![Capture d'écran de la cagnotte](screenshot_placeholder.png)

## Fonctionnalités

- **Affichage en temps réel** des montants collectés
- **Barre de progression visuelle** facilement personnalisable
- **Synchronisation automatique** des données sans rechargement de page
- **Design responsive** adapté à tous les appareils
- **Animations subtiles** pour une expérience utilisateur améliorée
- **Interface personnalisable** adaptable à n'importe quelle cause ou organisation
- **Thèmes visuels** modifiables via CSS

## Fichiers du projet

- `public-display.html` - Structure principale de la page d'affichage public
- `public-display.css` - Styles pour l'affichage public
- `public-display.js` - Logique pour l'affichage public
- `admin.html` - Interface d'administration
- `styles.css` - Styles pour l'interface d'administration
- `script.js` - Logique pour l'interface d'administration

## Structure du projet

```
cagnotte-solidaire/
│
├── public-display.html # Page publique d'affichage de la cagnotte
├── public-display.css  # Styles de l'affichage public
├── public-display.js   # Script de l'affichage public
│
├── index.html          # Interface d'administration
├── styles.css          # Styles de l'interface admin
└── script.js           # Script de l'interface admin
```

## Installation

1. Clonez ce dépôt :
```bash
git clone https://github.com/HenryFalko/Cagnotte.git
```

2. Ouvrez le dossier du projet :
```bash
cd cagnotte-solidaire
```

3. Pour l'affichage public, ouvrez `public-display.html` dans votre navigateur web.
4. Pour l'administration, ouvrez `index.html` dans votre navigateur web.

## Utilisation

### Interface publique
L'interface publique (`public-display.html`) affiche la progression de la cagnotte en temps réel. Elle est conçue pour être partagée avec le public ou intégrée à un site web existant.

### Interface d'administration
L'interface d'administration (`index.html`) permet de :
- Configurer les paramètres de la cagnotte
- Mettre à jour le montant collecté manuellement
- Modifier l'objectif, la date de fin et d'autres informations
- Personnaliser l'apparence visuelle

## Personnalisation

### Thèmes visuels
Vous pouvez facilement modifier les couleurs et l'apparence dans le fichier `public-display.css` pour l'adapter à votre cause ou organisation :

```css
/* Exemple pour modifier les couleurs principales */
:root {
  --primary-color: #votre-couleur;
  --secondary-color: #votre-couleur;
  --background-color: #votre-couleur;
  --text-color: #votre-couleur;
}
```

### Image d'arrière-plan
Pour ajouter une image d'arrière-plan adaptée à votre cause :

```css
body {
  background-image: url('chemin/vers/votre-image.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}
```

## Configuration

Les paramètres de la cagnotte peuvent être modifiés via l'interface d'administration ou directement dans le fichier `script.js` :

```javascript
const cagnotteSettings = {
    currentAmount: 0,
    targetAmount: 10000,
    participantsCount: 0,
    endDate: '2023-12-31',
    causeTitle: 'Notre Cagnotte Solidaire',
    // etc.
};
```

## Intégration avec d'autres services

Le système est conçu pour être facilement adaptable à différentes API de paiement :
- PayPal
- Stripe
- HelloAsso
- Leetchi
- etc.

## Sécurité

L'interface d'administration n'inclut pas d'authentification par défaut. Pour un déploiement en production, il est fortement recommandé d'ajouter une couche d'authentification sécurisée.


## Licence

Ce projet est distribué sous licence MIT. Voir le fichier `LICENSE` pour plus d'informations.

---

*Ce projet a été créé pour faciliter la collecte de fonds pour diverses causes solidaires. Il peut être utilisé librement pour soutenir des projets humanitaires, environnementaux, sociaux, ou toute autre initiative nécessitant de la collecte de fonds.*
