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

- `index.html` - Structure principale de la page
- `public-display.css` - Styles et thèmes visuels
- `public-display.js` - Logique de synchronisation et d'affichage dynamique

## Installation

1. Clonez ce dépôt :
```bash
git clone https://github.com/votre-nom/cagnotte-solidaire.git
```

2. Ouvrez le dossier du projet :
```bash
cd cagnotte-solidaire
```

3. Lancez l'application en ouvrant `index.html` dans votre navigateur web.

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

Pour modifier les paramètres de la cagnotte (objectif, date de fin, titre, etc.), modifiez les valeurs initiales dans le module `DBSync` du fichier `public-display.js` :

```javascript
const DBSync = {
    data: {
        currentAmount: 0,
        targetAmount: 0,
        participantsCount: 0,
        endDate: '',
        causeTitle: 'Notre Cagnotte', // Personnalisez le titre ici
        // etc.
    },
    // ...
}
```

## Intégration avec d'autres services

Le système est conçu pour être facilement adaptable à différentes API de paiement :
- PayPal
- Stripe
- HelloAsso
- Leetchi
- etc.

## Contribution

Les contributions sont les bienvenues ! N'hésitez pas à soumettre des pull requests ou à signaler des problèmes via les issues GitHub.

1. Forkez le projet
2. Créez une branche pour votre fonctionnalité (`git checkout -b feature/amazing-feature`)
3. Committez vos changements (`git commit -m 'Ajout d'une fonctionnalité'`)
4. Poussez vers la branche (`git push origin feature/amazing-feature`)
5. Ouvrez une Pull Request

## Licence

Ce projet est distribué sous licence MIT. Voir le fichier `LICENSE` pour plus d'informations.

---

*Ce projet a été créé pour faciliter la collecte de fonds pour diverses causes solidaires. Il peut être utilisé librement pour soutenir des projets humanitaires, environnementaux, sociaux, ou toute autre initiative nécessitant de la collecte de fonds.*
