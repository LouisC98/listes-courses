// Dictionnaire de synonymes pour enrichir la recherche d'émojis
// Clé = L'émoji générique
// Valeur = Liste de noms spécifiques (variantes)
//
// Rôle des synonymes :
//   1. Termes non couverts par emojibase (lardons, thon, yaourt, farine…)
//   2. Pluriels importants ("Oeufs" car emojibase a "œuf" non décomposable en NFD)
//   3. Produits maison/hygiène absents de emojibase groupe 4
//   4. Variantes françaises spécifiques (marques, régionalismes)
export const EMOJI_SYNONYMS: Record<string, string[]> = {
  // --- VIANDES ---
  '🥩': ['Boeuf', 'Steak', 'Bavette', 'Entrecôte', 'Faux-filet', 'Viande rouge', 'Viande hachée', 'Rumsteck', 'Veau', 'Blanquette', 'Osso-buco', 'Jarret', 'Tartare'],
  '🍗': ['Poulet', 'Cuisse de poulet', 'Blanc de poulet', 'Dinde', 'Escalope', 'Nuggets', 'Ailerons', 'Rôti', 'Lapin', 'Canard', 'Volaille', 'Pintade'],
  '🐖': ['Porc', 'Côtelette', 'Lardons', 'Filet mignon', 'Chair à saucisse', 'Boudin', 'Jambon', 'Jambon blanc', 'Jambon cru', 'Jambon de pays', 'Saucisson', 'Rillettes', 'Pâté'],
  '🥓': ['Bacon', 'Lard', 'Poitrine fumée', 'Lard fumé'],
  '🍖': ['Viande', 'Os à moelle', 'Gigot', 'Agneau', 'Mouton'],
  '🌭': ['Saucisse', 'Merguez', 'Chipolatas', 'Hot-dog', 'Francfort', 'Knacks', 'Andouille', 'Andouillette', 'Chorizo', 'Cervelas'],

  // --- POISSONS & MER ---
  '🐟': ['Poisson', 'Saumon', 'Thon', 'Cabillaud', 'Colin', 'Merlu', 'Sardines', 'Maquereau', 'Truite', 'Sole', 'Bar', 'Daurade', 'Rouget', 'Anchois', 'Hareng', 'Aiglefin', 'Lieu noir'],
  '🍤': ['Crevettes', 'Gambas', 'Langoustines', 'Scampi', 'Calamars', 'Seiche', 'Encornets'],
  '🦀': ['Crabe', 'Tourteau', 'Surimi', 'Homard', 'Langouste'],
  '🦪': ['Huîtres', 'Moules', 'Coquilles Saint-Jacques', 'Palourdes', 'Coques'],

  // --- FROMAGES & LAITAGE ---
  '🧀': ['Fromage', 'Comté', 'Emmental', 'Gruyère', 'Camembert', 'Brie', 'Roquefort', 'Chèvre', 'Mozzarella', 'Parmesan', 'Raclette', 'Reblochon', 'Feta', 'Gouda', 'Cheddar', 'Mimolette', 'Munster', 'Saint-Nectaire', 'Ricotta', 'Mascarpone'],
  '🥛': ['Lait', 'Lait entier', 'Lait demi-écrémé', 'Crème fraîche', 'Crème liquide', 'Yaourt', 'Kéfir', 'Fromage blanc', 'Faisselle', 'Crème épaisse', 'Lait de soja', "Lait d'amande", 'Lait de riz', 'Lait de coco'],
  '🧈': ['Beurre', 'Beurre doux', 'Beurre salé', 'Margarine'],
  '🥚': ['Oeufs', 'Oeufs bio', 'Oeufs plein air', "Blancs d'oeufs"],

  // --- FRUITS & LÉGUMES ---
  '🥔': ['Pommes de terre', 'Patates', 'Purée', 'Pommes de terre nouvelles'],
  '🍠': ['Patate douce', 'Patates douces', 'Igname', 'Yam'],
  '🍅': ['Tomates', 'Tomates cerises', 'Sauce tomate', 'Coulis', 'Tomates pelées'],
  '🥬': ['Salade', 'Laitue', 'Mâche', 'Roquette', 'Epinards', 'Endives', 'Blettes', 'Cresson'],
  '🥦': ['Brocoli', 'Chou-fleur', 'Romanesco', 'Chou de Bruxelles', 'Chou', 'Chou vert', 'Chou rouge', 'Choucroute'],
  '🥕': ['Carottes', 'Carottes rapées'],
  '🧅': ['Oignons', 'Oignons rouges', 'Echalotes', 'Poireaux', 'Cébettes'],
  '🧄': ['Ail'],
  '🍄': ['Champignons', 'Champignons de Paris', 'Champignons portobello', 'Girolles', 'Cèpes', 'Shiitake', 'Pleurotes'],
  '🥒': ['Concombre', 'Cornichons', 'Courgette', 'Courgettes'],
  '🍆': ['Aubergine'],
  '🥑': ['Avocat', 'Guacamole'],
  '🫑': ['Poivron', 'Poivron rouge', 'Poivron vert', 'Poivron jaune', 'Piment', 'Piments'],
  '🥜': ['Cacahuètes', 'Amandes', 'Noix', 'Noisettes', 'Pistaches', 'Noix de cajou', 'Fruits secs', 'Mix de fruits secs', 'Noix de pécan', 'Beurre de cacahuète'],
  '🌰': ['Châtaignes', 'Marrons', 'Marrons glacés'],
  '🍇': ['Raisin', 'Raisin blanc', 'Raisin noir', 'Raisins secs'],
  '🍎': ['Pommes', 'Pommes rouges', 'Compote', 'Pommes golden', 'Pommes granny'],
  '🍌': ['Bananes'],
  '🍋': ['Citron', 'Citron jaune', 'Jus de citron', 'Citron vert', 'Lime'],
  '🍊': ['Orange', 'Clémentine', 'Mandarine', 'Pamplemousse'],
  '🍓': ['Fraises', 'Framboises', 'Groseilles'],
  '🫐': ['Myrtilles', 'Cassis', 'Mûres', 'Baies'],
  '🍑': ['Pêche', 'Nectarine', 'Abricot', 'Abricots', 'Prune', 'Quetsches', 'Mirabelles'],

  // --- BOULANGERIE ---
  '🥖': ['Pain', 'Baguette', 'Pain de mie', 'Pain complet', 'Pain burger', 'Pain de campagne', 'Pain aux céréales', 'Pain pita', 'Naan'],
  '🥐': ['Croissant', 'Viennoiserie', 'Brioche', 'Pain au chocolat', 'Chausson aux pommes', 'Pain aux raisins'],
  '🥞': ['Crêpes', 'Galettes', 'Pancakes'],
  '🍪': ['Gâteaux', 'Biscuits', 'Cookies', 'Sablés', 'Madeleines', 'Financiers', 'Speculoos'],

  // --- ÉPICERIE ---
  '🍝': ['Pâtes', 'Spaghetti', 'Coquillettes', 'Penne', 'Fusilli', 'Nouilles', 'Lasagnes', 'Tagliatelles', 'Raviolis', 'Farfalle', 'Macaroni', 'Orzo'],
  '🍚': ['Riz', 'Riz basmati', 'Riz rond', 'Riz complet', 'Quinoa', 'Boulgour', 'Semoule', 'Polenta', 'Millet'],
  '🥫': ['Conserve', 'Boîte', 'Petit pois', 'Haricots verts', 'Lentilles', 'Lentilles vertes', 'Lentilles corail', 'Pois chiches', 'Haricots blancs', 'Haricots rouges', 'Maïs', 'Flageolets', 'Cassoulet'],
  '🥣': ['Céréales', 'Muesli', 'Avoine', 'Soupe', 'Granola', 'Corn flakes', "Flocons d'avoine", 'Porridge'],
  '🍫': ['Chocolat', 'Chocolat noir', 'Chocolat au lait', 'Cacao', 'Cacao en poudre'],
  '🧂': ['Sel', 'Poivre', 'Épices', 'Herbes', 'Curry', 'Paprika', 'Cumin', 'Cannelle', 'Curcuma', 'Piment en poudre', 'Muscade', 'Thym', 'Basilic', 'Origan', 'Romarin', 'Persil', 'Ciboulette', 'Laurier', 'Gingembre'],
  '🍯': ['Miel', 'Confiture', 'Pâte à tartiner', 'Nutella', "Sirop d'érable", "Sirop d'agave", 'Caramel'],
  '🫙': ["Huile d'olive", 'Huile de tournesol', 'Huile de coco', 'Vinaigre', 'Vinaigre balsamique', 'Vinaigre de cidre', 'Moutarde', 'Ketchup', 'Mayonnaise', 'Sauce soja', 'Tabasco', 'Bocaux'],
  '🌾': ['Farine', 'Farine de blé', 'Farine T55', 'Farine complète', 'Maïzena', 'Fécule de pomme de terre', 'Levure'],
  '🍬': ['Sucre', 'Sucre en poudre', 'Sucre glace', 'Cassonade', 'Sucre roux', 'Sucre vanillé', 'Bonbons', 'Confiseries'],
  '☕': ['Café', 'Café moulu', 'Capsules', 'Dosettes', 'Café soluble', 'Espresso'],
  '🫖': ['Thé', 'Infusion', 'Tisane', 'Thé vert', 'Thé noir', 'Camomille', 'Verveine'],
  '🧃': ['Jus', "Jus d'orange", 'Sirop', 'Nectar', 'Smoothie'],
  '🥤': ['Soda', 'Coca', 'Ice Tea', 'Limonade', 'Pepsi', 'Sprite', 'Fanta'],
  '💧': ['Eau', 'Eau plate', 'Eau gazeuse', 'Eau minérale', 'Perrier', 'Evian', 'Cristalline'],
  '🍺': ['Bière', 'Pack de bière', 'Bière blonde', 'Bière brune', 'Bière sans alcool'],
  '🍷': ['Vin', 'Vin rouge', 'Vin blanc', 'Rosé', 'Champagne', 'Cidre'],

  // --- MAISON & HYGIÈNE ---
  '🧻': ['Papier toilette', 'PQ', 'Essuie-tout', 'Sopalin', 'Mouchoirs', "Papier d'aluminium", 'Film alimentaire', 'Papier sulfurisé', 'Sacs de congélation'],
  '🧼': ['Savon', 'Gel douche', 'Shampoing', 'Après-shampoing', 'Déodorant', 'Savon liquide'],
  '🪥': ['Brosse à dents', 'Dentifrice', 'Fil dentaire', 'Bain de bouche'],
  '🧹': ['Ménage', 'Éponge', 'Liquide vaisselle', 'Lessive', 'Adoucissant', 'Nettoyant sol', 'Javel', 'Produit WC', 'Désinfectant', 'Serpillière'],
  '🗑️': ['Sacs poubelle'],
  '🪒': ['Rasoir', 'Lames de rasoir', 'Rasoir jetable', 'Crème à raser'],
  '🧴': ['Crème hydratante', 'Lotion', 'Crème solaire', 'Après-soleil', 'Démaquillant', 'Coton-tiges', 'Cotons'],
  '💊': ['Médicaments', 'Paracétamol', 'Ibuprofène', 'Doliprane', 'Vitamines', 'Compléments alimentaires', 'Aspirine'],
  '🩹': ['Pansements', 'Sparadrap', 'Compresses', 'Désinfectant cutané', 'Bétadine'],
  '👶': ['Couches', 'Lingettes', 'Petit pot', 'Lait maternisé', 'Crème bébé', 'Couches culottes'],
  '🐱': ['Croquettes chat', 'Pâtée chat', 'Litière'],
  '🐶': ['Croquettes chien', 'Pâtée chien'],
};
