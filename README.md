# Clean My Web 🎪🧹

**Extension Chrome pour le Défi Platon Formation - Nuit de l'Info**

> *"Nettoyez le web comme VOUS l'entendez !"*

Cette extension permet de nettoyer n'importe quel site web en masquant les éléments gênants (publicités, bannières, sidebars, popups...). Vos préférences sont sauvegardées automatiquement pour chaque site.

## 🎯 Le Défi

Platon Formation propose des formations informatiques sur mesure et des services de développement web. Ce défi vise à créer une extension qui permet à l'utilisateur de "réorganiser le web" selon ses besoins, et de mémoriser ses choix.

**Problème** : Trop de bannières, pop-ups, encarts inutiles sur nos sites préférés !  
**Solution** : Une extension qui permet de nettoyer définitivement ces éléments gênants.

## ✅ Fonctionnalités Implémentées

### Fonctionnalités Minimum (Toutes ✅)

- **✅ Sélection d'éléments sur la page**
  - Mode "édition" activable depuis l'extension
  - Survol des éléments avec effet visuel (rouge pulsant)
  - Clic pour masquer définitivement un élément

- **✅ Nettoyage persistant par site**
  - Les éléments masqués restent cachés à chaque visite
  - Sauvegarde automatique par domaine
  - Chargement instantané au démarrage de la page (pas de flash)

- **✅ Gestion / Reset**
  - Panneau de gestion complet (page Options)
  - Liste de tous les sites nettoyés
  - Réinitialisation par site
  - Reset global de toutes les données

### Bonus Implémentés (Tous ✅)

- **✅ Interface utilisateur soignée et agréable**
  - Thème Cirque coloré et ludique (rouge, jaune, bleu)
  - Animations amusantes (bounce, wiggle, poof)
  - Design moderne avec Comic Sans MS

- **✅ Possibilité d'agrandir des blocs**
  - Mode "Agrandir" interactif
  - Déplacez la souris ↑↓ pour choisir la taille (50% à 300%)
  - Confirmation visuelle en temps réel

- **✅ Désactiver temporairement le nettoyage**
  - Bouton "Voir éléments masqués"
  - Les éléments cachés apparaissent avec bordure rouge et label "MASQUÉ"

- **✅ Indicateur visuel des zones masquées**
  - Overlay semi-transparent rouge
  - Label "MASQUÉ" sur chaque élément caché

- **✅ Mode "avant / après"**
  - Comparaison automatique toutes les 2 secondes
  - Label géant "AVANT" (rouge) / "APRÈS" (vert)
  - Bouton pour arrêter la comparaison

## 📦 Installation

1. Téléchargez ou clonez ce dossier sur votre ordinateur
2. Ouvrez Google Chrome et allez sur `chrome://extensions`
3. Activez le **Mode développeur** (en haut à droite)
4. Cliquez sur **"Charger l'extension non empaquetée"**
5. Sélectionnez le dossier `nuitv2` (ce dossier)

## 📖 Guide d'Utilisation

### 1. Masquer des éléments
1. Cliquez sur l'icône de l'extension
2. Cliquez sur **"✏️ Mode Édition"**
3. Survolez la page : les éléments deviennent rouges avec animation pulsante
4. **Cliquez** pour masquer un élément (effet "poof" !)
5. Répétez pour d'autres éléments
6. Cliquez sur **"Terminer"** dans le panneau flottant en bas à droite

### 2. Agrandir du contenu (Bonus)
1. En mode édition, cliquez sur **"Agrandir"** (bouton bleu)
2. Cliquez sur un élément
3. Un overlay bleu apparaît : **déplacez la souris vers le haut** pour agrandir, **vers le bas** pour réduire
4. Le pourcentage s'affiche en temps réel (ex: 150%, 200%)
5. Cliquez pour confirmer la taille

### 3. Voir ce qui est masqué
1. Ouvrez l'extension
2. Cliquez sur **"👁️ Voir éléments masqués"**
3. Les éléments cachés réapparaissent en semi-transparence avec bordure rouge pointillée et label "MASQUÉ"

### 4. Mode Avant/Après (Bonus)
1. Ouvrez l'extension
2. Cliquez sur **"🔄 Mode Avant/Après"**
3. La page alterne automatiquement entre :
   - **AVANT** (label rouge) : page originale
   - **APRÈS** (label vert) : page nettoyée
4. Cliquez sur **"Arrêter la comparaison"** pour terminer

### 5. Gérer les sites
1. Ouvrez l'extension
2. Cliquez sur **"⚙️ Gérer tous les sites"**
3. Vous verrez la liste complète de tous les domaines nettoyés
4. Nombre d'éléments masqués par site
5. Bouton **"Réinitialiser"** pour chaque site
6. Bouton **"Tout Réinitialiser"** pour un reset global

## 🛠️ Technologies

- **HTML/CSS/JS** : Vanilla (pas de framework)
- **Chrome Storage API** : Sauvegarde locale des préférences
- **Manifest V3** : Standards de sécurité Chrome
- **Design** : Thème Cirque avec animations CSS

## 🎨 Thème Cirque

L'extension utilise un design coloré et ludique inspiré du cirque :
- **Couleurs** : Rouge (#ff0000), Jaune (#ffd700), Bleu (#0000ff)
- **Police** : Comic Sans MS pour un aspect joueur
- **Animations** : Bounce, wiggle, poof, pulse
- **Fond** : Rayures style chapiteau de cirque

## 📁 Structure du Projet

```
nuitv2/
├── manifest.json          # Configuration de l'extension
├── popup.html/js/css      # Interface popup
├── options.html/js/css    # Page de gestion
├── content.js/css         # Script injecté dans les pages
├── background.js          # Service worker
├── icon128.png            # Icône de l'extension
└── README.md              # Ce fichier
```

## 🎉 Développé pour Platon Formation

Extension créée dans le cadre du défi "Nettoyez le web comme VOUS l'entendez !" de la Nuit de l'Info.

**Platon Formation** : Formations informatiques sur mesure, assistance logiciel, développement web/applications métier à Annonay et à distance.

---

*"Avec les bons outils, le numérique peut vraiment s'adapter à l'utilisateur… et pas l'inverse !"*