export const users = [
  // --- Clients ---
  {
    id: 'u1', username: 'Client1', email: 'client@loomdaah.com', phone: '670000001',
    role: 'client', password: 'password', city: 'Douala', kycStatus: 'none',
    interests: ['cuisine local', 'randonnée', 'lecture', 'voyages']
  },
  {
    id: 'u3', username: 'Utilisateur1', email: 'utilisateur@loomdaah.com', phone: '670000003',
    role: 'client', password: 'password', city: 'Yaoundé', kycStatus: 'none',
    interests: ['cuisine local', 'voyages', 'musique']
  },

  // --- Hôtes (8 profils variés, KYC validé) ---
  {
    id: 'u2', username: 'Marie_Kribi', email: 'host@loomdaah.com', phone: '670000002',
    role: 'host', password: 'password', city: 'Kribi', kycStatus: 'validated', isHost: true,
    bio: 'Passionnée par le partage et la mer, j\'accueille des voyageurs depuis 5 ans.',
    interests: ['cuisine local', 'lecture', 'voyages', 'photographie'],
    rating: 4.8, reviewsCount: 24
  },
  {
    id: 'u4', username: 'Jean_Yaounde', email: 'host2@loomdaah.com', phone: '670000004',
    role: 'host', password: 'password', city: 'Yaoundé', kycStatus: 'validated', isHost: true,
    bio: 'Artiste et passionné d\'art africain contemporain. Ma maison est une galerie vivante.',
    interests: ['art', 'culture', 'musique', 'voyages'],
    rating: 4.7, reviewsCount: 18
  },
  {
    id: 'u5', username: 'Fatima_Maroua', email: 'host3@loomdaah.com', phone: '670000005',
    role: 'host', password: 'password', city: 'Maroua', kycStatus: 'validated', isHost: true,
    bio: 'Gardienne des traditions du Grand Nord, je partage la culture sahélienne avec mes invités.',
    interests: ['artisanat', 'cuisine local', 'traditions', 'danse'],
    rating: 4.9, reviewsCount: 30
  },
  {
    id: 'u6', username: 'Pierre_Buea', email: 'host4@loomdaah.com', phone: '670000006',
    role: 'host', password: 'password', city: 'Buea', kycStatus: 'validated', isHost: true,
    bio: 'Guide de randonnée et amoureux du Mont Cameroun. Je partage chaque sommet.',
    interests: ['randonnée', 'nature', 'photographie', 'sport'],
    rating: 4.9, reviewsCount: 56
  },
  {
    id: 'u7', username: 'Amina_Douala', email: 'host5@loomdaah.com', phone: '670000007',
    role: 'host', password: 'password', city: 'Douala', kycStatus: 'validated', isHost: true,
    bio: 'Organisatrice de rencontres interculturelles à Douala. Chaque repas est un voyage.',
    interests: ['cuisine', 'échanges', 'voyages', 'lecture'],
    rating: 4.5, reviewsCount: 28
  },
  {
    id: 'u8', username: 'Samuel_Dschang', email: 'host6@loomdaah.com', phone: '670000008',
    role: 'host', password: 'password', city: 'Dschang', kycStatus: 'validated', isHost: true,
    bio: 'Agriculteur bio et défenseur de l\'agroécologie. Je cultive la convivialité.',
    interests: ['agriculture bio', 'cuisine', 'écologie', 'partage'],
    rating: 4.8, reviewsCount: 19
  },
  {
    id: 'u9', username: 'Celine_Bafoussam', email: 'host7@loomdaah.com', phone: '670000009',
    role: 'host', password: 'password', city: 'Bafoussam', kycStatus: 'validated', isHost: true,
    bio: 'Musicienne traditionnelle Bamiléké. Chaque soirée chez moi se termine en musique.',
    interests: ['musique', 'danse', 'cuisine local', 'artisanat'],
    rating: 4.6, reviewsCount: 11
  },
  {
    id: 'u10', username: 'Ibrahim_Garoua', email: 'host8@loomdaah.com', phone: '670000010',
    role: 'host', password: 'password', city: 'Garoua', kycStatus: 'validated', isHost: true,
    bio: 'Pêcheur et guide fluvial sur la Bénoué. Je partage la magie du fleuve.',
    interests: ['pêche', 'nature', 'cuisine', 'traditions'],
    rating: 4.6, reviewsCount: 14
  },

  // --- Admin ---
  { id: 'admin1', username: 'admin', email: 'admin@loomdaah.com', phone: '237600000000', role: 'admin', password: 'admin', city: 'Yaoundé', kycStatus: 'validated' }
];


export const listings = [
  {
    id: 'l1',
    hostId: 'u2',
    title: 'Maison d\'Hôtes Conviviale au bord de l\'Océan',
    description: 'Une véritable maison d\'hôtes pour vivre des moments uniques de partage. Profitez d\'un séjour à Kribi avec vue sur l\'Océan. Dîners familiaux autour du feu de camp sur la plage et contes sous les étoiles organisés par vos hôtes.',
    price: 15000,
    currency: 'XAF',
    rating: 4.8,
    reviewsCount: 24,
    location: 'Kribi, Sud',
    city: 'Kribi',
    quartier: 'Plage de la Grande Baie',
    lat: 2.9436,
    lng: 9.9077,
    type: 'Maison d\'Hôtes',
    status: 'active',
    images: [
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80'
    ],
    amenities: ['Piscine', 'Wifi', 'Climatisation', 'Feu de bois', 'Repas partagés', 'Jeux de société'],
    communityServices: [
      { id: 'cs1', title: 'Soirée contes et grillades sur la plage', description: 'Partagez un repas traditionnel autour du feu de camp avec votre hôte.', category: 'Partage' },
      { id: 'cs2', title: 'Atelier cuisine du poisson frais de Kribi', description: 'Apprenez à griller le poisson façon locale avec vos hôtes.', category: 'Partage' }
    ]
  },
  {
    id: 'l2',
    hostId: 'u4',
    title: 'Chambre d\'Hôte Chaleureuse à Bastos',
    description: 'Une chambre d\'hôtes familiale au coeur de Bastos. Notre famille vous accueille à bras ouverts pour partager le petit-déjeuner traditionnel et des discussions passionnantes sur la culture locale dans notre salon commun.',
    price: 12000,
    currency: 'XAF',
    rating: 4.5,
    reviewsCount: 32,
    location: 'Bastos, Yaoundé',
    city: 'Yaoundé',
    quartier: 'Bastos',
    lat: 3.8824,
    lng: 11.5118,
    type: 'Chambre d\'Hôte',
    status: 'active',
    images: [
      'https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=80'
    ],
    amenities: ['Wifi Fibre', 'Climatisation', 'Salon commun', 'Bibliothèque partagée', 'Thé/Café offert'],
    communityServices: [
      { id: 'cs3', title: 'Balade culturelle guidée par la famille', description: 'Visitez Yaoundé sous le regard historique et bienveillant de votre famille d\'accueil.', category: 'Culture' }
    ]
  },
  {
    id: 'l3',
    hostId: 'u6',
    title: 'Maison d\'Hôtes Montagnarde à Buea',
    description: 'Respirez l\'air frais du Mont Cameroun dans notre gîte d\'étape convivial. Idéal pour les randonneurs voulant échanger, partager des histoires et déguster un repas chaud cuisinier ensemble au feu de bois après l\'ascension.',
    price: 9000,
    currency: 'XAF',
    rating: 4.9,
    reviewsCount: 56,
    location: 'Buea, Sud-Ouest',
    city: 'Buea',
    quartier: 'Molyko',
    lat: 4.1540,
    lng: 9.2428,
    type: 'Maison d\'Hôtes',
    status: 'active',
    images: [
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=800&q=80'
    ],
    amenities: ['Eau Chaude', 'Feu de cheminée', 'Jardin partagé', 'Equipement de randonnée'],
    communityServices: [
      { id: 'cs4', title: 'Ascension conviviale du Mont Cameroun', description: 'Votre hôte vous accompagne et partage son expérience de la montagne.', category: 'Nature' },
      { id: 'cs5', title: 'Dégustation de Achu traditionnel', description: 'Préparez et savourez ce plat typique avec toute la maisonnée.', category: 'Partage' }
    ]
  },
  {
    id: 'l4',
    hostId: 'u9',
    title: 'La Case Conviviale de Foumban',
    description: 'Une maison d\'hôtes traditionnelle au design bamoun. Partagez l\'artisanat local, le thé de bienvenue avec l\'hôte et découvrez l\'histoire du royaume bamoun en vivant au sein d\'une famille d\'artisans.',
    price: 8000,
    currency: 'XAF',
    rating: 4.7,
    reviewsCount: 15,
    location: 'Foumban, Ouest',
    city: 'Foumban',
    quartier: 'Quartier Royal',
    lat: 5.7291,
    lng: 10.9013,
    type: 'Maison d\'Hôtes',
    status: 'active',
    images: ['https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?auto=format&fit=crop&w=800&q=80'],
    amenities: ['Artisanat', 'Jardin', 'Repas communs', 'Thé traditionnel'],
    communityServices: [
      { id: 'cs6', title: 'Atelier de sculpture sur bois et bronze', description: 'Découvrez les secrets de l\'art bamoun avec les artisans de la maison.', category: 'Culture' }
    ]
  },
  {
    id: 'l5',
    hostId: 'u8',
    title: 'Gîte Familial et Agro-écologique de Dschang',
    description: 'Vivez au rythme de notre ferme familiale. Une expérience d\'éco-tourisme et de partage agricole. Les repas sont préparés en commun avec les produits bio cueillis ensemble le matin même dans notre potager.',
    price: 7500,
    currency: 'XAF',
    rating: 4.8,
    reviewsCount: 19,
    location: 'Dschang, Ouest',
    city: 'Dschang',
    quartier: 'Hauts Plateaux / Campéa',
    lat: 5.4437,
    lng: 10.0533,
    type: 'Gîte d\'Hôtes',
    status: 'active',
    images: ['https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80'],
    amenities: ['Potager bio', 'Ferme', 'Cuisine communautaire', 'Eau de source'],
    communityServices: [
      { id: 'cs7', title: 'Cueillette collective et atelier cuisine bio', description: 'Ramassez les légumes et préparez le repas de midi en famille.', category: 'Partage' }
    ]
  },
  {
    id: 'l6',
    hostId: 'u9',
    title: 'Chambre d\'Hôte Partage et Sourires à Bafoussam',
    description: 'Une chambre douillette chez l\'habitant. Notre foyer est idéal pour les invités qui souhaitent échanger sur l\'Afrique, la musique et apprendre à cuisiner le Kondre traditionnel de l\'Ouest Cameroun.',
    price: 8500,
    currency: 'XAF',
    rating: 4.6,
    reviewsCount: 11,
    location: 'Bafoussam, Ouest',
    city: 'Bafoussam',
    quartier: 'Tamdja',
    lat: 5.4777,
    lng: 10.4174,
    type: 'Chambre d\'Hôte',
    status: 'active',
    images: ['https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=800&q=80'],
    amenities: ['Wifi', 'Musique locale', 'Salon de partage', 'Dégustations'],
    communityServices: [
      { id: 'cs8', title: 'Soirée initiation aux instruments locaux', description: 'Découvrez le balafon et les chants traditionnels avec votre hôte musicien.', category: 'Partage' }
    ]
  },
  {
    id: 'l7',
    hostId: 'u6',
    title: 'Maison d\'Hôtes Chaleureuse de Limbe',
    description: 'Séjournez chez une famille de pêcheurs passionnée par l\'accueil. Discutez face au mont et profitez d\'un poisson frais braisé au feu de bois dans la cour avec nos voisins pour une ambiance conviviale inoubliable.',
    price: 11000,
    currency: 'XAF',
    rating: 4.7,
    reviewsCount: 22,
    location: 'Limbe, Sud-Ouest',
    city: 'Limbe',
    quartier: 'Down Beach',
    lat: 4.0192,
    lng: 9.2085,
    type: 'Maison d\'Hôtes',
    status: 'active',
    images: ['https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80'],
    amenities: ['Plage à proximité', 'Barbecue', 'Jardin fleuri', 'Jeux de société'],
    communityServices: [
      { id: 'cs9', title: 'Sortie en mer et initiation à la pêche', description: 'Partez en pirogue traditionnelle avec l\'hôte pour une matinée de pêche.', category: 'Expérience' }
    ]
  },
  {
    id: 'l8',
    hostId: 'u7',
    title: 'La Villa de l\'Amitié à Douala',
    description: 'Une villa spacieuse et chaleureuse pour les rencontres interculturelles. Nous aimons organiser des soirées débats et partager des repas communautaires les week-ends avec nos invités du monde entier.',
    price: 13000,
    currency: 'XAF',
    rating: 4.4,
    reviewsCount: 28,
    location: 'Bonapriso, Douala',
    city: 'Douala',
    quartier: 'Bonapriso',
    lat: 4.0240,
    lng: 9.6920,
    type: 'Maison d\'Hôtes',
    status: 'active',
    images: ['https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80'],
    amenities: ['Wifi Fibre', 'Piscine', 'Espace de discussion', 'Jeux de cartes'],
    communityServices: [
      { id: 'cs10', title: 'Débat et dîner interculturel du samedi', description: 'Un moment d\'échange philosophique et amical autour d\'un grand repas.', category: 'Partage' }
    ]
  },
  {
    id: 'l9',
    hostId: 'u10',
    title: 'Gîte d\'Hôtes de l\'Est à Bertoua',
    description: 'Découvrez la convivialité forestière de l\'Est. Notre gîte vous propose un retour aux sources chaleureux. Soirées feu de camp sous le grand manguier et apprentissage des danses traditionnelles de l\'Est.',
    price: 7000,
    currency: 'XAF',
    rating: 4.8,
    reviewsCount: 9,
    location: 'Bertoua, Est',
    city: 'Bertoua',
    quartier: 'Ngen-Mboa',
    lat: 4.5856,
    lng: 13.6851,
    type: 'Gîte d\'Hôtes',
    status: 'active',
    images: ['https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80'],
    amenities: ['Feu de camp', 'Grand jardin', 'Danses locales', 'Boissons locales'],
    communityServices: [
      { id: 'cs11', title: 'Initiation à la danse traditionnelle Bamiléké/Est', description: 'Votre hôte et sa famille vous apprennent les pas de danse rythmés.', category: 'Partage' }
    ]
  },
  {
    id: 'l10',
    hostId: 'u5',
    title: 'La Case d\'Hôtes Sahélienne de Maroua',
    description: 'Une maison d\'hôtes construite en argile traditionnelle pour conserver la fraîcheur. Notre famille se fera une joie de vous initier à la cérémonie traditionnelle du thé du Nord et de partager notre culture du grand Sahel.',
    price: 9500,
    currency: 'XAF',
    rating: 4.9,
    reviewsCount: 30,
    location: 'Maroua, Extrême-Nord',
    city: 'Maroua',
    quartier: 'Domayo',
    lat: 10.5937,
    lng: 14.3155,
    type: 'Maison d\'Hôtes',
    status: 'active',
    images: ['https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=800&q=80'],
    amenities: ['Ventilation naturelle', 'Théière traditionnelle', 'Cour ombragée', 'Cuisine locale'],
    communityServices: [
      { id: 'cs12', title: 'Cérémonie traditionnelle du thé des trois verres', description: 'Une dégustation rituelle de thé partagée avec notre famille d\'accueil.', category: 'Partage' }
    ]
  },
  {
    id: 'l11',
    hostId: 'u10',
    title: 'Maison d\'Hôtes la Solidarité à Garoua',
    description: 'Havre de paix et d\'échange situé à Garoua. Venez vivre des moments chaleureux de convivialité au bord de la Benoué. Nous cuisinons ensemble le mil et partageons nos savoirs sous le grand hangar.',
    price: 8000,
    currency: 'XAF',
    rating: 4.6,
    reviewsCount: 14,
    location: 'Garoua, Nord',
    city: 'Garoua',
    quartier: 'Béno-Rey',
    lat: 9.2997,
    lng: 13.3952,
    type: 'Maison d\'Hôtes',
    status: 'active',
    images: ['https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=80'],
    amenities: ['Espace ombragé', 'Ventilateurs', 'Jeux de société', 'Repas partagés'],
    communityServices: [
      { id: 'cs13', title: 'Balade guidée en pirogue sur la Bénoué', description: 'Partagez le coucher de soleil sur le fleuve en compagnie de l\'hôte.', category: 'Expérience' }
    ]
  },
  {
    id: 'l12',
    hostId: 'u5',
    title: 'Le Refuge de l\'Adamaoua à Ngaoundéré',
    description: 'Une maison d\'hôtes accueillante au climat tempéré de Ngaoundéré. Découvrez les plateaux de l\'Adamaoua en séjournant chez nous. Les soirées sont animées par des récits de légendes locales contés par le grand-père.',
    price: 9000,
    currency: 'XAF',
    rating: 4.7,
    reviewsCount: 17,
    location: 'Ngaoundéré, Adamaoua',
    city: 'Ngaoundéré',
    quartier: 'Dangéré',
    lat: 7.3263,
    lng: 13.5792,
    type: 'Maison d\'Hôtes',
    status: 'active',
    images: ['https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80'],
    amenities: ['Feu de bois', 'Eau Chaude', 'Grand salon', 'Livres contes'],
    communityServices: [
      { id: 'cs14', title: 'Soirée Légendes sous le Baobab', description: 'Écoutez les contes mythiques du peuple Foulbé avec thé chaud et gâteaux maison.', category: 'Partage' }
    ]
  },
  {
    id: 'l13',
    hostId: 'u2',
    title: 'Chambre d\'Hôtes Nature et Partage à Kribi',
    description: 'Profitez du grand calme tropical de Kribi chez l\'habitant. Nous mettons à disposition des vélos et aimons préparer un barbecue géant de crevettes locales le dimanche avec tous nos hôtes.',
    price: 10000,
    currency: 'XAF',
    rating: 4.8,
    reviewsCount: 25,
    location: 'Kribi, Sud',
    city: 'Kribi',
    quartier: 'Cite des Pêcheurs',
    lat: 2.9400,
    lng: 9.9100,
    type: 'Chambre d\'Hôte',
    status: 'active',
    images: ['https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=800&q=80'],
    amenities: ['Vélos gratuits', 'Jardin tropical', 'Barbecue', 'Wifi'],
    communityServices: [
      { id: 'cs15', title: 'Barbecue géant du dimanche', description: 'Une journée chaleureuse pour griller ensemble les crustacés du port de pêche.', category: 'Partage' }
    ]
  },
  {
    id: 'l14',
    hostId: 'u7',
    title: 'Maison d\'Hôtes l\'Étoile de Douala',
    description: 'Une maison d\'hôtes d\'inspiration associative et solidaire au quartier Logpom. Notre objectif est l\'échange humain et l\'aide aux devoirs des enfants locaux. Venez partager vos compétences et loger au chaud.',
    price: 8500,
    currency: 'XAF',
    rating: 4.5,
    reviewsCount: 13,
    location: 'Logpom, Douala',
    city: 'Douala',
    quartier: 'Logpom',
    lat: 4.0620,
    lng: 9.7710,
    type: 'Maison d\'Hôtes',
    status: 'active',
    images: ['https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&w=800&q=80'],
    amenities: ['Wifi', 'Bureau partagé', 'Bibliothèque enfant', 'Terrasse commune'],
    communityServices: [
      { id: 'cs16', title: 'Participation à l\'atelier écriture et contes', description: 'Participez à notre club de lecture solidaire avec les enfants du quartier.', category: 'Partage' }
    ]
  },
  {
    id: 'l15',
    hostId: 'u8',
    title: 'Gîte d\'Hôtes Chaleureux de Melong',
    description: 'Situé au pied des Monts Manengouba et à proximité des lacs Jumeaux. Notre gîte favorise la convivialité montagnarde. Nous préparons la traditionnelle soupe locale au feu de bois dans une ambiance festive.',
    price: 9000,
    currency: 'XAF',
    rating: 4.9,
    reviewsCount: 42,
    location: 'Melong, Littoral',
    city: 'Melong',
    quartier: 'Centre Melong',
    lat: 5.1221,
    lng: 9.9482,
    type: 'Gîte d\'Hôtes',
    status: 'active',
    images: ['https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=800&q=80'],
    amenities: ['Feu de cheminée', 'Eau Chaude', 'Grand verger', 'Guide de randonnée'],
    communityServices: [
      { id: 'cs17', title: 'Trek guidé vers les Lacs Jumeaux', description: 'Votre hôte vous guide vers ces lacs sacrés à travers des sentiers verdoyants.', category: 'Expérience' }
    ]
  },
  {
    id: 'l16',
    hostId: 'u8',
    title: 'Maison d\'Hôtes la Source de Dschang',
    description: 'Maison d\'hôtes tranquille et conviviale bâtie au milieu de collines et plantations de café. Venez cueillir et griller votre propre café traditionnel avec la famille de notre hôte.',
    price: 8000,
    currency: 'XAF',
    rating: 4.7,
    reviewsCount: 16,
    location: 'Dschang, Ouest',
    city: 'Dschang',
    quartier: 'Foto',
    lat: 5.4415,
    lng: 10.0621,
    type: 'Maison d\'Hôtes',
    status: 'active',
    images: ['https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=800&q=80'],
    amenities: ['Cueillette de café', 'Jardin fleuri', 'Cafetière artisanale', 'Salon partagé'],
    communityServices: [
      { id: 'cs18', title: 'Torréfaction et cueillette traditionnelle de café', description: 'Apprenez à torréfier le café artisanalement sur feu de bois avec vos hôtes.', category: 'Partage' }
    ]
  },
  {
    id: 'l17',
    hostId: 'u4',
    title: 'Gîte d\'Hôtes l\'Espérance de Foumban',
    description: 'Gîte familial à Foumban. Nous mettons l\'accent sur le partage culinaire bamoun. Apprenez à moudre les épices et à cuisiner le mets traditionnel de koki avec les membres de la famille.',
    price: 7500,
    currency: 'XAF',
    rating: 4.6,
    reviewsCount: 10,
    location: 'Foumban, Ouest',
    city: 'Foumban',
    quartier: 'Njifen',
    lat: 5.7245,
    lng: 10.8978,
    type: 'Gîte d\'Hôtes',
    status: 'active',
    images: ['https://images.unsplash.com/photo-1549693578-d683be217e58?auto=format&fit=crop&w=800&q=80'],
    amenities: ['Cuisine de rue', 'Cour bamoun', 'Artisanat local', 'Jeux traditionnels'],
    communityServices: [
      { id: 'cs19', title: 'Cours intensif de cuisine Bamoun', description: 'Une demi-journée conviviale pour préparer des mets locaux traditionnels.', category: 'Partage' }
    ]
  },
  {
    id: 'l18',
    hostId: 'u2',
    title: 'Maison d\'Hôtes les Chutes de la Lobé',
    description: 'Une maison d\'hôtes en pleine nature, tout près des fameuses chutes de la Lobé à Kribi. L\'hôte organise des excursions conviviales en pirogue et des bains de minuit sécurisés pour des moments de joie partagée.',
    price: 14000,
    currency: 'XAF',
    rating: 4.8,
    reviewsCount: 38,
    location: 'Chutes de la Lobé, Kribi',
    city: 'Kribi',
    quartier: 'Lobé Waterfall',
    lat: 2.8992,
    lng: 9.8971,
    type: 'Maison d\'Hôtes',
    status: 'active',
    images: ['https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80'],
    amenities: ['Plage à 2 min', 'Pirogues', 'Barbecue poisson', 'Eau Chaude'],
    communityServices: [
      { id: 'cs20', title: 'Excursion nocturne de partage sur la Lobé', description: 'Traversée en pirogue à la lueur des lampes torches pour écouter les bruits de la jungle.', category: 'Expérience' }
    ]
  },
  {
    id: 'l19',
    hostId: 'u4',
    title: 'Gîte d\'Hôtes Bellevue Yaoundé',
    description: 'Une grande maison d\'hôtes sur les hauteurs de Yaoundé (Mvolyé). Profitez d\'un havre de paix convivial pour partager des parties de Songo (jeu de société traditionnel) et déguster notre vin de palme fait maison.',
    price: 11000,
    currency: 'XAF',
    rating: 4.5,
    reviewsCount: 20,
    location: 'Mvolyé, Yaoundé',
    city: 'Yaoundé',
    quartier: 'Mvolyé',
    lat: 3.8440,
    lng: 11.5030,
    type: 'Gîte d\'Hôtes',
    status: 'active',
    images: ['https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80'],
    amenities: ['Jeu de Songo', 'Vin de palme maison', 'Vue Panoramique', 'Wifi'],
    communityServices: [
      { id: 'cs21', title: 'Tournoi et initiation au jeu de Songo', description: 'Apprenez les stratégies de ce jeu traditionnel africain avec les champions locaux.', category: 'Partage' }
    ]
  },
  {
    id: 'l20',
    hostId: 'u6',
    title: 'Chambre d\'Hôtes l\'Accueil de Bamenda',
    description: 'Retrouvez la chaleur et l\'hospitalité légendaire du Nord-Ouest. Notre foyer vous propose une chambre spacieuse avec cheminée. Nous partageons avec vous notre café frais des montagnes tous les matins.',
    price: 8000,
    currency: 'XAF',
    rating: 4.8,
    reviewsCount: 21,
    location: 'Bamenda, Nord-Ouest',
    city: 'Bamenda',
    quartier: 'Commercial Avenue',
    lat: 5.9631,
    lng: 10.1591,
    type: 'Chambre d\'Hôte',
    status: 'active',
    images: ['https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&w=800&q=80'],
    amenities: ['Feu de cheminée', 'Café maison', 'Bibliothèque', 'Jardin'],
    communityServices: [
      { id: 'cs22', title: 'Atelier traitement du café vert des montagnes', description: 'Découvrez comment extraire et sécher le café vert traditionnel avec l\'hôte.', category: 'Partage' }
    ]
  },
  {
    id: 'l21',
    hostId: 'u9',
    title: 'Gîte de la Solidarité à Bafang',
    description: 'Une maison d\'hôtes rurale à Bafang, au plus près des cascades. Idéal pour partager la vie des planteurs locaux et passer des soirées en musique traditionnelle Bamiléké.',
    price: 8500,
    currency: 'XAF',
    rating: 4.7,
    reviewsCount: 15,
    location: 'Bafang, Ouest',
    city: 'Bafang',
    quartier: 'Marche de Bafang',
    lat: 5.1583,
    lng: 10.1772,
    type: 'Gîte d\'Hôtes',
    status: 'active',
    images: ['https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80'],
    amenities: ['Proximité cascades', 'Musique live', 'Cuisine extérieure', 'Repas partagés'],
    communityServices: [
      { id: 'cs23', title: 'Visite guidée des Cascades de la Mouankeu', description: 'Une randonnée conviviale partagée avec la famille hôte.', category: 'Nature' }
    ]
  },
  {
    id: 'l22',
    hostId: 'u10',
    title: 'La Case Conviviale de Sangmelima',
    description: 'Une maison d\'hôtes typique au Sud du Cameroun. Partagez des moments d\'exception en forêt équatoriale et découvrez le mode de vie traditionnel de nos aînés.',
    price: 7000,
    currency: 'XAF',
    rating: 4.6,
    reviewsCount: 8,
    location: 'Sangmelima, Sud',
    city: 'Sangmelima',
    quartier: 'Centre-ville Sangmelima',
    lat: 2.9302,
    lng: 11.9795,
    type: 'Maison d\'Hôtes',
    status: 'active',
    images: ['https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=800&q=80'],
    amenities: ['Nature brute', 'Soirées contes', 'Cadeau de bienvenue', 'Guide local'],
    communityServices: [
      { id: 'cs24', title: 'Découverte de l\'agroforesterie locale', description: 'Partage de connaissances sur la culture du cacao bio sous forêt.', category: 'Partage' }
    ]
  },
  {
    id: 'l23',
    hostId: 'u7',
    title: 'Gîte d\'Hôtes de l\'Estuaire à Douala',
    description: 'Maison d\'hôtes paisible au bord du Wouri. L\'hôte se propose de cuisiner avec vous de délicieux beignets koki et de partager son amour de la faune aquatique locale.',
    price: 10000,
    currency: 'XAF',
    rating: 4.5,
    reviewsCount: 14,
    location: 'Bonabéri, Douala',
    city: 'Douala',
    quartier: 'Bonabéri',
    lat: 4.0725,
    lng: 9.6644,
    type: 'Gîte d\'Hôtes',
    status: 'active',
    images: ['https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=80'],
    amenities: ['Bord de fleuve', 'Terrasse', 'Atelier cuisine', 'Wifi'],
    communityServices: [
      { id: 'cs25', title: 'Atelier cuisine du Beignet-Koki familial', description: 'Apprenez la recette familiale de ce plat traditionnel.', category: 'Partage' }
    ]
  },
  {
    id: 'l24',
    hostId: 'u6',
    title: 'La Maison d\'Hôtes du Mont Cameroun à Buea',
    description: 'Un magnifique chalet d\'hôtes pour échanger au pied de la montagne. Notre salon commun chaleureux possède une cheminée en pierre et une vue imprenable sur la forêt de nuage.',
    price: 11000,
    currency: 'XAF',
    rating: 4.9,
    reviewsCount: 35,
    location: 'Buea, Sud-Ouest',
    city: 'Buea',
    quartier: 'Great Soppo',
    lat: 4.1502,
    lng: 9.2411,
    type: 'Chalet d\'Hôtes',
    status: 'active',
    images: ['https://images.unsplash.com/photo-1449034446853-66c86144b0ad?auto=format&fit=crop&w=800&q=80'],
    amenities: ['Feu de cheminée', 'Balcon', 'Jeux de société', 'Eau chaude'],
    communityServices: [
      { id: 'cs26', title: 'Soirée chants de montagne et thé chaud', description: 'Une soirée en musique chaleureuse au coin du feu.', category: 'Partage' }
    ]
  },
  {
    id: 'l25',
    hostId: 'u4',
    title: 'Chambre d\'Hôte Art et Partage à Yaoundé',
    description: 'Une chambre d\'hôtes au sein de notre galerie d\'art familiale au quartier Essos. Échangez sur l\'art contemporain africain et participez à nos ateliers de peinture communautaire.',
    price: 9000,
    currency: 'XAF',
    rating: 4.8,
    reviewsCount: 18,
    location: 'Essos, Yaoundé',
    city: 'Yaoundé',
    quartier: 'Essos',
    lat: 3.8732,
    lng: 11.5325,
    type: 'Chambre d\'Hôte',
    status: 'active',
    images: ['https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=800&q=80'],
    amenities: ['Galerie d\'art', 'Atelier créatif', 'Wifi', 'Terrasse'],
    communityServices: [
      { id: 'cs27', title: 'Atelier de fresque murale collective', description: 'Laissez votre trace artistique sur le mur collaboratif de la maison.', category: 'Culture' }
    ]
  }
];

// Nouvelle séparation House / Room (R-A1: maison contient >= 1 chambre)
export const houses = [
  {
    id: 'h1',
    hostId: 'u2',
    title: 'Maison d\'Hôtes Conviviale au bord de l\'Océan (maison complète)',
    description: 'Maison spacieuse avec plusieurs chambres, piscine privée et accès plage. Peut être louée entière ou chambre par chambre.',
    city: 'Kribi',
    location: 'Plage de la Grande Baie, Kribi',
    quartier: 'Plage de la Grande Baie',
    lat: 2.9436,
    lng: 9.9077,
    price: 15000,
    currency: 'XAF',
    images: [
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=80'
    ],
    amenities: ['Piscine', 'Wifi', 'Climatisation', 'Cuisine équipée', 'Vue sur mer'],
    roomsIds: ['r1','r2'],
    status: 'active',
    rules: 'Pas de fêtes après 22h. Animaux non admis.',
    version: 1
  }
];

// R-A2: Chambre = ressource atomique
export const rooms = [
  {
    id: 'r1',
    houseId: 'h1',
    hostId: 'u2',
    title: 'Chambre Master - Vue sur mer',
    type: 'DOUBLE',
    capacity: 2,
    description: 'Grande chambre master avec lit double, salle de bains privative et vue sur le jardin tropical.',
    price: 3000,
    currency: 'XAF',
    surface: 25,
    status: 'active',
    images: ['https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80'],
    amenities: ['Climatisation', 'Salle de bains privée', 'Balcon'],
    version: 1
  },
  {
    id: 'r2',
    houseId: 'h1',
    hostId: 'u2',
    title: 'Chambre Standard - Jardin',
    type: 'SIMPLE',
    capacity: 1,
    description: 'Chambre confortable avec lit double et accès au jardin.',
    price: 2500,
    currency: 'XAF',
    surface: 18,
    status: 'active',
    images: ['https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=80'],
    amenities: ['Eau chaude', 'Accès jardin'],
    version: 1
  }
];

export const reviews = [
  { id: 'rv1',  targetId: 'l1',  targetType: 'listing', authorId: 'u1',  authorName: 'Alice M.',     rating: 5,   comment: 'La maison d\'hôtes de Marie est conviviale, le poisson braisé était incroyable !', date: '2026-03-15' },
  { id: 'rv2',  targetId: 'l2',  targetType: 'listing', authorId: 'u3',  authorName: 'Marc T.',      rating: 4,   comment: 'Accueil chaleureux de Jean, de formidables discussions sur l\'art africain.', date: '2026-03-20' },
  { id: 'rv3',  targetId: 'l3',  targetType: 'listing', authorId: 'u1',  authorName: 'Sophie K.',    rating: 5,   comment: 'Pierre est un guide exceptionnel. La vue depuis le Mont Cameroun vaut tout !', date: '2026-03-28' },
  { id: 'rv4',  targetId: 'l5',  targetType: 'listing', authorId: 'u3',  authorName: 'David N.',     rating: 5,   comment: 'Samuel nous a appris à cuisiner avec les produits du jardin. Expérience unique.', date: '2026-04-02' },
  { id: 'rv5',  targetId: 'l6',  targetType: 'listing', authorId: 'u1',  authorName: 'Lucie P.',     rating: 4,   comment: 'Céline joue du balafon magnifiquement. La soirée musicale était inoubliable.', date: '2026-04-05' },
  { id: 'rv6',  targetId: 'l8',  targetType: 'listing', authorId: 'u3',  authorName: 'Paul A.',      rating: 4,   comment: 'Amina organise des dîners incroyables. Belle rencontre avec des voyageurs du monde.', date: '2026-04-10' },
  { id: 'rv7',  targetId: 'l10', targetType: 'listing', authorId: 'u1',  authorName: 'Ines F.',      rating: 5,   comment: 'Fatima nous a initié à la cérémonie du thé. Moment de partage extraordinaire.', date: '2026-04-12' },
  { id: 'rv8',  targetId: 'l11', targetType: 'listing', authorId: 'u3',  authorName: 'René B.',      rating: 4,   comment: 'Ibrahim connaît chaque méandre de la Bénoué. Balade en pirogue magique.', date: '2026-04-18' },
  { id: 'rv9',  targetId: 'l13', targetType: 'listing', authorId: 'u1',  authorName: 'Claire V.',    rating: 5,   comment: 'Le barbecue de crevettes du dimanche chez Marie est un rituel à ne pas manquer !', date: '2026-04-22' },
  { id: 'rv10', targetId: 'l14', targetType: 'listing', authorId: 'u3',  authorName: 'Thierry L.',   rating: 4,   comment: 'L\'atelier lecture avec les enfants du quartier chez Amina nous a tous touchés.', date: '2026-04-25' },
  { id: 'rv11', targetId: 'l15', targetType: 'listing', authorId: 'u1',  authorName: 'Hélène M.',    rating: 5,   comment: 'Le trek vers les Lacs Jumeaux avec Samuel comme guide est une aventure inédite.', date: '2026-05-01' },
  { id: 'rv12', targetId: 'l16', targetType: 'listing', authorId: 'u3',  authorName: 'Omar D.',      rating: 5,   comment: 'Torréfier le café en famille chez Samuel : une expérience sensorielle magique.', date: '2026-05-05' },
  { id: 'rv13', targetId: 'l17', targetType: 'listing', authorId: 'u1',  authorName: 'Nadia B.',     rating: 4,   comment: 'Jean est un hôte passionné. L\'atelier de cuisine bamoun était riche en saveurs.', date: '2026-05-08' },
  { id: 'rv14', targetId: 'l18', targetType: 'listing', authorId: 'u3',  authorName: 'Sylvain C.',   rating: 5,   comment: 'Marie organise des excursions en pirogue nocturne sur la Lobé. Frissons garantis.', date: '2026-05-12' },
  { id: 'rv15', targetId: 'l19', targetType: 'listing', authorId: 'u1',  authorName: 'Martine F.',   rating: 4,   comment: 'Jean nous a appris à jouer au Songo. Un jeu fascinant, une hospitalité rare.', date: '2026-05-15' },
  { id: 'rv16', targetId: 'l20', targetType: 'listing', authorId: 'u3',  authorName: 'Alexis N.',    rating: 5,   comment: 'Pierre à Bamenda sert le meilleur café de montagne. L\'accueil est royal.', date: '2026-05-18' },
  { id: 'rv17', targetId: 'l21', targetType: 'listing', authorId: 'u1',  authorName: 'Estelle P.',   rating: 5,   comment: 'Céline à Bafang est une hôtesse de cœur. La musique live en soirée est splendide.', date: '2026-05-22' },
  { id: 'rv18', targetId: 'l23', targetType: 'listing', authorId: 'u3',  authorName: 'François K.',  rating: 4,   comment: 'Amina prépare le meilleur beignet-koki que j\'aie jamais goûté. Je reviendrai.', date: '2026-05-25' },
  { id: 'rv19', targetId: 'l24', targetType: 'listing', authorId: 'u1',  authorName: 'Isabelle T.',  rating: 5,   comment: 'Pierre à Buea propose un chalet de montagne incroyable. Vue sur forêt de nuage.', date: '2026-05-28' },
  { id: 'rv20', targetId: 'l25', targetType: 'listing', authorId: 'u3',  authorName: 'Nicolas R.',   rating: 5,   comment: 'Jean à Yaoundé a une galerie d\'art magnifique. L\'atelier fresque collective était fun.', date: '2026-06-01' },
];

export const messages = [];

// Réservations / contrats historiques (à titre informatif — pas de gestion financière)
export const contracts = [
  { id: 'c1',  clientId: 'u1', providerId: 'u2',  entityId: 'l1',  entityType: 'Logement', date: '2026-04-12', status: 'Completed' },
  { id: 'c2',  clientId: 'u3', providerId: 'u4',  entityId: 'l2',  entityType: 'Logement', date: '2026-04-18', status: 'Active' },
  { id: 'c3',  clientId: 'u1', providerId: 'u6',  entityId: 'l3',  entityType: 'Logement', date: '2026-04-25', status: 'Completed' },
  { id: 'c4',  clientId: 'u3', providerId: 'u8',  entityId: 'l5',  entityType: 'Logement', date: '2026-05-02', status: 'Completed' },
  { id: 'c5',  clientId: 'u1', providerId: 'u5',  entityId: 'l10', entityType: 'Logement', date: '2026-05-10', status: 'Completed' },
  { id: 'c6',  clientId: 'u3', providerId: 'u10', entityId: 'l11', entityType: 'Logement', date: '2026-05-18', status: 'Active' },
  { id: 'c7',  clientId: 'u1', providerId: 'u9',  entityId: 'l21', entityType: 'Logement', date: '2026-05-24', status: 'Completed' },
  { id: 'c8',  clientId: 'u3', providerId: 'u7',  entityId: 'l8',  entityType: 'Logement', date: '2026-06-01', status: 'Active' },
];

