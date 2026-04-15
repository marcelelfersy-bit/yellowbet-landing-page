/**
 * Yellowbet Market Data
 * Each market contains brand info, URLs, bonuses, and tracking parameters.
 * Update welcome bonus values with real offers before deployment.
 */
const MARKETS = [
  {
    country: "Cameroon",
    countryCode: "CM",
    brand: "Yellowbet",
    brandFamily: true,
    url: "https://yellowbet.cm/fr/sportsbook/upcoming",
    tracking: "cxd=cxd_39569_0",
    language: "fr",
    welcomeBonus: "Bonus de 100%",
    flag: "🇨🇲",
    currency: "XAF"
  },
  {
    country: "Congo",
    countryCode: "CG",
    brand: "Yellowbet",
    brandFamily: true,
    url: "https://yellowbet.cg/fr/sportsbook/upcoming",
    tracking: "cxd=cxd_39569_536622",
    language: "fr",
    welcomeBonus: "Bonus de 100%",
    flag: "🇨🇬",
    currency: "XAF"
  },
  {
    country: "Guinea",
    countryCode: "GN",
    brand: "Yellowbet",
    brandFamily: true,
    url: "https://yellowbet.com.gn/fr/sportsbook/upcoming",
    tracking: "cxd=cxd_39569_536624",
    language: "fr",
    welcomeBonus: "Bonus de 100%",
    flag: "🇬🇳",
    currency: "GNF"
  },
  {
    country: "Kenya",
    countryCode: "KE",
    brand: "Yellowbet",
    brandFamily: true,
    url: "https://yellowbet.ke/en/sportsbook/upcoming",
    tracking: "cxd=cxd_39569_536623",
    language: "en",
    welcomeBonus: "100% Welcome Bonus",
    flag: "🇰🇪",
    currency: "KES"
  },
  {
    country: "Liberia",
    countryCode: "LR",
    brand: "Starbet",
    brandFamily: false,
    url: "https://starbet.com.lr/sportsbook/upcoming",
    tracking: "cxd=cxd_39569_536625",
    language: "en",
    welcomeBonus: "100% Welcome Bonus",
    flag: "🇱🇷",
    currency: "LRD"
  },
  {
    country: "Mozambique",
    countryCode: "MZ",
    brand: "Winner",
    brandFamily: false,
    url: "https://winner.co.mz/pt/sportsbook/upcoming",
    tracking: "cxd=cxd_39569_536626",
    language: "pt",
    welcomeBonus: "Bónus de Boas-Vindas de 100%",
    flag: "🇲🇿",
    currency: "MZN"
  },
  {
    country: "Rwanda",
    countryCode: "RW",
    brand: "Winner",
    brandFamily: false,
    url: "https://winner.rw/en/sportsbook/upcoming",
    tracking: "cxd=cxd_39569_536627",
    language: "en",
    welcomeBonus: "100% Welcome Bonus",
    flag: "🇷🇼",
    currency: "RWF"
  },
  {
    country: "Tanzania",
    countryCode: "TZ",
    brand: "GSB",
    brandFamily: false,
    url: "https://gsb.co.tz/sw/sportsbook/upcoming",
    tracking: "cxd=cxd_39569_536628",
    language: "sw",
    welcomeBonus: "100% Welcome Bonus",
    flag: "🇹🇿",
    currency: "TZS"
  },
  {
    country: "Uganda",
    countryCode: "UG",
    brand: "GSB",
    brandFamily: false,
    url: "https://gsb.ug/sportsbook/upcoming",
    tracking: "cxd=cxd_39569_536629",
    language: "en",
    welcomeBonus: "100% Welcome Bonus",
    flag: "🇺🇬",
    currency: "UGX"
  },
  {
    country: "Zambia",
    countryCode: "ZM",
    brand: "GSB",
    brandFamily: false,
    url: "https://gsb.co.zm/sportsbook/upcoming",
    tracking: "cxd=cxd_39569_536630",
    language: "en",
    welcomeBonus: "100% Welcome Bonus",
    flag: "🇿🇲",
    currency: "ZMW"
  }
];

/**
 * Localization strings
 */
const LOCALE = {
  en: {
    heroTitle: "Your Ultimate Betting Destination in Africa",
    heroSub: "Licensed & regulated in 10+ countries. Join millions of bettors across the continent.",
    geoDetected: "Looks like you're in",
    geoStart: "Start Betting Now",
    geoPowered: "Part of the Yellowbet Family",
    geoNotHere: "Not in {country}? See all markets below",
    marketsTitle: "Choose Your Market",
    betNow: "Bet Now",
    poweredBy: "Powered by Yellowbet",
    trustTitle: "The Yellowbet Family of Brands",
    trustDesc: "Yellowbet powers licensed sports betting and casino brands across Sub-Saharan Africa. Whether you know us as Yellowbet, GSB, Winner, or Starbet — you're backed by the same trusted platform, technology, and commitment to fair play.",
    statsCountries: "Licensed Markets",
    statsUsers: "Active Bettors",
    statsRegulated: "Fully Regulated",
    footerResponsible: "Gambling can be addictive. Play responsibly. 18+ only.",
    footerAbout: "About",
    footerContact: "Contact",
    footerTerms: "Terms & Conditions",
    footerPrivacy: "Privacy Policy",
    ageTitle: "Age Verification",
    ageMessage: "You must be 18 years or older to access this site. By continuing, you confirm you meet the minimum age requirement.",
    ageConfirm: "I am 18+",
    ageDecline: "I am under 18",
    searchPlaceholder: "Search for your country..."
  },
  fr: {
    heroTitle: "Votre Destination de Paris Ultime en Afrique",
    heroSub: "Licencié et réglementé dans plus de 10 pays. Rejoignez des millions de parieurs à travers le continent.",
    geoDetected: "On dirait que vous êtes au/en",
    geoStart: "Commencez à Parier",
    geoPowered: "Membre de la Famille Yellowbet",
    geoNotHere: "Pas au/en {country} ? Voir tous les marchés ci-dessous",
    marketsTitle: "Choisissez Votre Marché",
    betNow: "Parier",
    poweredBy: "Propulsé par Yellowbet",
    trustTitle: "La Famille de Marques Yellowbet",
    trustDesc: "Yellowbet propulse des marques de paris sportifs et de casino licenciées à travers l'Afrique subsaharienne. Que vous nous connaissiez sous le nom de Yellowbet, GSB, Winner ou Starbet — vous bénéficiez de la même plateforme fiable.",
    statsCountries: "Marchés Licenciés",
    statsUsers: "Parieurs Actifs",
    statsRegulated: "Entièrement Réglementé",
    footerResponsible: "Le jeu peut créer une dépendance. Jouez de manière responsable. 18+ uniquement.",
    footerAbout: "À Propos",
    footerContact: "Contact",
    footerTerms: "Conditions Générales",
    footerPrivacy: "Politique de Confidentialité",
    ageTitle: "Vérification de l'Âge",
    ageMessage: "Vous devez avoir 18 ans ou plus pour accéder à ce site. En continuant, vous confirmez que vous remplissez la condition d'âge minimum.",
    ageConfirm: "J'ai 18 ans ou plus",
    ageDecline: "J'ai moins de 18 ans",
    searchPlaceholder: "Rechercher votre pays..."
  },
  pt: {
    heroTitle: "O Seu Destino de Apostas Definitivo em África",
    heroSub: "Licenciado e regulado em mais de 10 países. Junte-se a milhões de apostadores em todo o continente.",
    geoDetected: "Parece que você está em",
    geoStart: "Comece a Apostar Agora",
    geoPowered: "Parte da Família Yellowbet",
    geoNotHere: "Não está em {country}? Veja todos os mercados abaixo",
    marketsTitle: "Escolha o Seu Mercado",
    betNow: "Apostar",
    poweredBy: "Desenvolvido por Yellowbet",
    trustTitle: "A Família de Marcas Yellowbet",
    trustDesc: "Yellowbet alimenta marcas licenciadas de apostas desportivas e casino em toda a África Subsaariana. Quer nos conheça como Yellowbet, GSB, Winner ou Starbet — tem o apoio da mesma plataforma confiável.",
    statsCountries: "Mercados Licenciados",
    statsUsers: "Apostadores Ativos",
    statsRegulated: "Totalmente Regulado",
    footerResponsible: "O jogo pode ser viciante. Jogue com responsabilidade. Apenas 18+.",
    footerAbout: "Sobre",
    footerContact: "Contacto",
    footerTerms: "Termos e Condições",
    footerPrivacy: "Política de Privacidade",
    ageTitle: "Verificação de Idade",
    ageMessage: "Deve ter 18 anos ou mais para aceder a este site. Ao continuar, confirma que cumpre o requisito mínimo de idade.",
    ageConfirm: "Tenho 18+",
    ageDecline: "Tenho menos de 18 anos",
    searchPlaceholder: "Pesquisar o seu país..."
  }
};

// Country name translations
const COUNTRY_NAMES = {
  en: {
    CM: "Cameroon", CG: "Congo", GN: "Guinea", KE: "Kenya",
    LR: "Liberia", MZ: "Mozambique", RW: "Rwanda", TZ: "Tanzania",
    UG: "Uganda", ZM: "Zambia"
  },
  fr: {
    CM: "Cameroun", CG: "Congo", GN: "Guinée", KE: "Kenya",
    LR: "Libéria", MZ: "Mozambique", RW: "Rwanda", TZ: "Tanzanie",
    UG: "Ouganda", ZM: "Zambie"
  },
  pt: {
    CM: "Camarões", CG: "Congo", GN: "Guiné", KE: "Quénia",
    LR: "Libéria", MZ: "Moçambique", RW: "Ruanda", TZ: "Tanzânia",
    UG: "Uganda", ZM: "Zâmbia"
  }
};
