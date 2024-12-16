# 🗂️ Tâches - Sprint 2

## 📋 **Tâches par User Story**

---

### **US-23 : Sélection d'un Projet Actif** (Priorité : Haute)

#### Backend
1. **API pour filtrer les données en fonction du `project_id`**  
   - **Type** : Fonctionnalité  
   - **Priorité** : Haute  
   - **Estimation** : 2H  

#### Frontend
1. **Ajouter une fonctionnalité pour sélectionner le projet actif**  
   - **Type** : Fonctionnalité  
   - **Priorité** : Haute  
   - **Estimation** : 1.5H  

2. **Adapter les vues pour afficher les données en fonction du projet sélectionné**  
   - **Type** : Fonctionnalité  
   - **Priorité** : Haute  
   - **Estimation** : 2H  

#### Testeur
1. **Tester la sélection du projet actif et la cohérence des données affichées**  
   - **Type** : Test  
   - **Priorité** : Haute  
   - **Estimation** : 1H  

---

### **US-24 : Basculement entre Projets** (Priorité : Moyenne)

#### Frontend
1. **Implémenter une interface utilisateur permettant de basculer facilement entre les projets**  
   - **Type** : Fonctionnalité  
   - **Priorité** : Moyenne  
   - **Estimation** : 1H  

2. **Assurer que le contexte du projet est maintenu lors de la navigation**  
   - **Type** : Fonctionnalité  
   - **Priorité** : Moyenne  
   - **Estimation** : 1H  

#### QA
1. **Tester le basculement entre les projets et vérifier la mise à jour correcte des données affichées**  
   - **Type** : Test  
   - **Priorité** : Moyenne  
   - **Estimation** : 1H  

---

### **US-04 & US-08 : Assignation des Issues et Tâches** (Priorité : Haute)

#### Backend
1. **Modifier les modèles `issues` et `tasks` pour inclure le champ `assigned_to`**  
   - **Type** : Fonctionnalité  
   - **Priorité** : Haute  
   - **Estimation** : 1H  

2. **Implémenter les API pour assigner un utilisateur à une issue ou une tâche**  
   - **Type** : Fonctionnalité  
   - **Priorité** : Haute  
   - **Estimation** : 1.5H  

3. **Gérer les permissions pour l'assignation (qui peut assigner qui)**  
   - **Type** : Fonctionnalité  
   - **Priorité** : Moyenne  
   - **Estimation** : 1H  

#### Frontend
1. **Ajouter une fonctionnalité pour assigner des issues et des tâches depuis l'interface**  
   - **Type** : Fonctionnalité  
   - **Priorité** : Haute  
   - **Estimation** : 2H  

2. **Afficher le nom de l'utilisateur assigné sur les vues correspondantes**  
   - **Type** : Fonctionnalité  
   - **Priorité** : Moyenne  
   - **Estimation** : 1H  

3. **Mettre à jour en temps réel après l'assignation**  
   - **Type** : Fonctionnalité  
   - **Priorité** : Moyenne  
   - **Estimation** : 0.5H  

#### Testeur
1. **Rédiger des cas de test pour l'assignation**  
   - **Type** : Test  
   - **Priorité** : Haute  
   - **Estimation** : 1H  

2. **Vérifier que l'assignation est correctement enregistrée et affichée**  
   - **Type** : Test  
   - **Priorité** : Haute  
   - **Estimation** : 1H  

3. **Tester les restrictions de permissions**  
   - **Type** : Test  
   - **Priorité** : Moyenne  
   - **Estimation** : 0.5H  

---

### **US-05 : Ajout de Commentaires** (Priorité : Moyenne)

#### Backend
1. **Concevoir le modèle de données pour les commentaires**  
   - **Type** : Fonctionnalité  
   - **Priorité** : Moyenne  
   - **Estimation** : 1H  

2. **Implémenter l'API pour ajouter et récupérer des commentaires**  
   - **Type** : Fonctionnalité  
   - **Priorité** : Moyenne  
   - **Estimation** : 1H  

#### Frontend
1. **Créer l'interface pour afficher les commentaires d'une issue**  
   - **Type** : Fonctionnalité  
   - **Priorité** : Moyenne  
   - **Estimation** : 1H  

2. **Implémenter le formulaire pour ajouter un nouveau commentaire**  
   - **Type** : Fonctionnalité  
   - **Priorité** : Moyenne  
   - **Estimation** : 1H  

3. **Gérer l'affichage en temps réel des nouveaux commentaires**  
   - **Type** : Fonctionnalité  
   - **Priorité** : Moyenne  
   - **Estimation** : 0.5H  

#### Testeur
1. **Tester l'ajout et l'affichage des commentaires**  
   - **Type** : Test  
   - **Priorité** : Moyenne  
   - **Estimation** : 1H  

2. **Vérifier les permissions (seuls les utilisateurs connectés peuvent commenter)**  
   - **Type** : Test  
   - **Priorité** : Moyenne  
   - **Estimation** : 0.5H  

3. **Tester la sécurité (protection contre les injections, XSS)**  
   - **Type** : Test  
   - **Priorité** : Moyenne  
   - **Estimation** : 1H  

---

### **US-07 : Mise à Jour du Statut des Tâches** (Priorité : Moyenne)

#### Backend
1. **Implémenter l'API pour mettre à jour le statut d'une tâche**  
   - **Type** : Fonctionnalité  
   - **Priorité** : Moyenne  
   - **Estimation** : 1H  

2. **Valider les transitions de statut**  
   - **Type** : Fonctionnalité  
   - **Priorité** : Moyenne  
   - **Estimation** : 0.5H  

#### Frontend
1. **Ajouter la possibilité de changer le statut d'une tâche depuis l'interface**  
   - **Type** : Fonctionnalité  
   - **Priorité** : Moyenne  
   - **Estimation** : 1H  

2. **Mettre à jour l'affichage du statut en temps réel**  
   - **Type** : Fonctionnalité  
   - **Priorité** : Moyenne  
   - **Estimation** : 0.5H  

#### Testeur
1. **Rédiger des cas de test pour les changements de statut**  
   - **Type** : Test  
   - **Priorité** : Moyenne  
   - **Estimation** : 0.5H  

2. **Vérifier que seuls les utilisateurs autorisés peuvent modifier le statut**  
   - **Type** : Test  
   - **Priorité** : Moyenne  
   - **Estimation** : 0.5H  

---

### **US-10 : Création de Releases** (Priorité : Moyenne)

#### Backend
1. **Concevoir le modèle de données pour les releases**  
   - **Type** : Fonctionnalité  
   - **Priorité** : Moyenne  
   - **Estimation** : 1H  

2. **Implémenter l'API pour créer des releases**  
   - **Type** : Fonctionnalité  
   - **Priorité** : Moyenne  
   - **Estimation** : 1H  

#### Frontend
1. **Créer le formulaire pour ajouter une nouvelle release**  
   - **Type** : Fonctionnalité  
   - **Priorité** : Moyenne  
   - **Estimation** : 1H  

2. **Afficher la liste des releases existantes**  
   - **Type** : Fonctionnalité  
   - **Priorité** : Moyenne  
   - **Estimation** : 0.5H  

#### Testeur | Data
1. **Créer la table `releases` dans la base de données**  
   - **Type** : Fonctionnalité  
   - **Priorité** : Moyenne  
   - **Estimation** : 1H  

2. **Tester la création de releases**  
   - **Type** : Test  
   - **Priorité** : Moyenne  
   - **Estimation** : 0.5H  

3. **Vérifier les validations**  
   - **Type** : Test  
   - **Priorité** : Moyenne  
   - **Estimation** : 0.5H  

---

### **US-21 : Ajout de Priorités aux Tâches** (Priorité : Moyenne)

#### Backend
1. **Ajouter le champ `priority` aux modèles `tasks` et `issues`**  
   - **Type** : Fonctionnalité  
   -

 **Priorité** : Moyenne  
   - **Estimation** : 0.5H  

2. **Gérer la validation des valeurs de priorité**  
   - **Type** : Fonctionnalité  
   - **Priorité** : Moyenne  
   - **Estimation** : 0.5H  

#### Frontend
1. **Ajouter la possibilité de définir la priorité lors de la création ou la modification d'une tâche**  
   - **Type** : Fonctionnalité  
   - **Priorité** : Moyenne  
   - **Estimation** : 1.5H  

2. **Afficher la priorité sur les listes et les détails des tâches**  
   - **Type** : Fonctionnalité  
   - **Priorité** : Moyenne  
   - **Estimation** : 0.5H  

3. **Permettre le tri et le filtrage par priorité**  
   - **Type** : Fonctionnalité  
   - **Priorité** : Moyenne  
   - **Estimation** : 0.5H  

#### Testeur
1. **Tester la création et la modification des priorités**  
   - **Type** : Test  
   - **Priorité** : Moyenne  
   - **Estimation** : 0.5H  

2. **Vérifier le tri et le filtrage par priorité**  
   - **Type** : Test  
   - **Priorité** : Moyenne  
   - **Estimation** : 0.5H  
