# 🗂️ Tâches - Sprint 1

## 📋 **Tâches par User Story**

---

### **US-22 : Création de Projets**

#### Backend
1. **Concevoir le modèle de données pour les projets**  
   - **Type** : Fonctionnalité  
   - **Priorité** : Haute  
   - **Estimation** : 1H  

2. **Implémenter l'API pour créer, lire, mettre à jour et supprimer des projets**  
   - **Type** : Fonctionnalité  
   - **Priorité** : Haute  
   - **Estimation** : 2H  

#### Frontend
1. **Créer l'interface pour la création et la gestion des projets**  
   - **Type** : Fonctionnalité  
   - **Priorité** : Haute  
   - **Estimation** : 2H  

2. **Implémenter les appels API pour les opérations CRUD sur les projets**  
   - **Type** : Fonctionnalité  
   - **Priorité** : Haute  
   - **Estimation** : 1H  

#### Data | QA
1. **Créer la table `projects` dans la base de données**  
   - **Type** : Fonctionnalité  
   - **Priorité** : Haute  
   - **Estimation** : 0.5H  

2. **Mettre à jour les modèles existants (`issues`, `tasks`, etc.) pour inclure une référence au `project_id`**  
   - **Type** : Fonctionnalité  
   - **Priorité** : Haute  
   - **Estimation** : 1H  

3. **Rédiger des cas de test pour la création et la gestion des projets**  
   - **Type** : Test  
   - **Priorité** : Haute  
   - **Estimation** : 1H  

4. **Vérifier l'intégration des projets avec les `issues` et les `tasks`**  
   - **Type** : Test  
   - **Priorité** : Haute  
   - **Estimation** : 1H  

---

### **US-01 : Création des nouvelles issues**

#### Backend
1. **Concevoir le modèle de données pour les issues**  
   - **Type** : Fonctionnalité  
   - **Priorité** : Haute  
   - **Estimation** : 1H  

2. **Implémenter l’API pour la création d’issues**  
   - **Type** : Fonctionnalité  
   - **Priorité** : Haute  
   - **Estimation** : 2H  

3. **Gérer la validation des données côté serveur**  
   - **Type** : Fonctionnalité  
   - **Priorité** : Haute  
   - **Estimation** : 1H  

#### Frontend
1. **Créer le formulaire de création d’une issue avec validation côté client**  
   - **Type** : Fonctionnalité  
   - **Priorité** : Haute  
   - **Estimation** : 2H  

2. **Implémenter l’appel API pour soumettre une nouvelle issue**  
   - **Type** : Fonctionnalité  
   - **Priorité** : Haute  
   - **Estimation** : 1H  

3. **Afficher des messages de confirmation ou d’erreur à l’utilisateur**  
   - **Type** : Fonctionnalité  
   - **Priorité** : Moyenne  
   - **Estimation** : 0.5H  

#### Data | QA
1. **Créer la table `issues` dans la base de données**  
   - **Type** : Fonctionnalité  
   - **Priorité** : Haute  
   - **Estimation** : 1H  

2. **Mettre en place les relations avec la table `users`**  
   - **Type** : Fonctionnalité  
   - **Priorité** : Haute  
   - **Estimation** : 0.5H  

3. **Rédiger des cas de test pour la création d’issues**  
   - **Type** : Test  
   - **Priorité** : Haute  
   - **Estimation** : 1H  

4. **Tester la validation des données côté client et serveur**  
   - **Type** : Test  
   - **Priorité** : Moyenne  
   - **Estimation** : 1H  

5. **Vérifier le comportement en cas d’erreurs**  
   - **Type** : Test  
   - **Priorité** : Moyenne  
   - **Estimation** : 0.5H  

---

### **US-02 : Visualisation de la liste des issues**

#### Backend
1. **Implémenter l’API pour récupérer la liste des issues**  
   - **Type** : Fonctionnalité  
   - **Priorité** : Haute  
   - **Estimation** : 1H  

2. **Ajouter la pagination, le tri et les filtres**  
   - **Type** : Fonctionnalité  
   - **Priorité** : Moyenne  
   - **Estimation** : 1.5H  

#### Frontend
1. **Créer la page pour afficher la liste des issues**  
   - **Type** : Fonctionnalité  
   - **Priorité** : Haute  
   - **Estimation** : 1.5H  

2. **Implémenter la pagination et le tri côté interface**  
   - **Type** : Fonctionnalité  
   - **Priorité** : Moyenne  
   - **Estimation** : 1H  

3. **Gérer le chargement des données via l’API**  
   - **Type** : Fonctionnalité  
   - **Priorité** : Haute  
   - **Estimation** : 0.5H  

4. **Afficher des messages de confirmation ou d’erreur à l’utilisateur**  
   - **Type** : Fonctionnalité  
   - **Priorité** : Basse  
   - **Estimation** : 0.5H  

#### Data | QA
1. **Vérifier que la liste des issues s’affiche correctement**  
   - **Type** : Test  
   - **Priorité** : Haute  
   - **Estimation** : 1H  

2. **Tester la pagination, le tri et les filtres**  
   - **Type** : Test  
   - **Priorité** : Moyenne  
   - **Estimation** : 1H  

3. **Vérifier les performances lors du chargement de grandes listes**  
   - **Type** : Test  
   - **Priorité** : Basse  
   - **Estimation** : 1H  

---

### **US-03 : Mise à jour du statut d’une issue**

#### Backend
1. **Implémenter l’API pour mettre à jour le statut d’une issue**  
   - **Type** : Fonctionnalité  
   - **Priorité** : Haute  
   - **Estimation** : 1H  

2. **Gérer les permissions d’accès**  
   - **Type** : Fonctionnalité  
   - **Priorité** : Haute  
   - **Estimation** : 1H  

3. **Valider les nouveaux statuts**  
   - **Type** : Fonctionnalité  
   - **Priorité** : Moyenne  
   - **Estimation** : 0.5H  

#### Frontend
1. **Ajouter une fonctionnalité pour changer le statut d’une issue**  
   - **Type** : Fonctionnalité  
   - **Priorité** : Haute  
   - **Estimation** : 1H  

2. **Implémenter l’appel API pour mettre à jour le statut**  
   - **Type** : Fonctionnalité  
   - **Priorité** : Haute  
   - **Estimation** : 0.5H  

3. **Mettre à jour l’affichage en temps réel après modification**  
   - **Type** : Fonctionnalité  
   - **Priorité** : Moyenne  
   - **Estimation** : 0.5H  

#### Data | QA
1. **Rédiger des cas de test pour la mise à jour du statut**  
   - **Type** : Test  
   - **Priorité** : Haute  
   - **Estimation** : 0.5H  

2. **Vérifier les permissions d’accès**  
   - **Type** : Test  
   - **Priorité** : Haute  
   - **Estimation** : 0.5H  

3. **Tester les transitions de statut**  
   - **Type** : Test  
   - **Priorité** : Moyenne  
   - **Estimation** : 0.5H  

---

✨ _Toutes les tâches backend non terminées seront priorisées dans le Sprint 2._ ✨
