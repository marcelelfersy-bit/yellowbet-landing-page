/**
 * Yellowbet Market Data
 * Each market contains brand info, URLs, bonuses, and tracking parameters.
 * Update welcome bonus values with real offers before deployment.
 */
const MARKETS = [
  {
    country: "Cameroon",
    countryCode: "CM",
    brand: "YellowBet",
    brandFamily: true,
    logoUrl: "assets/logos/yellowbet_logo_header.png",
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
    brand: "YellowBet",
    brandFamily: true,
    logoUrl: "assets/logos/yellowbet_logo_header.png",
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
    brand: "YellowBet",
    brandFamily: true,
    logoUrl: "assets/logos/yellowbet_logo_header.png",
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
    brand: "YellowBet",
    brandFamily: true,
    logoUrl: "assets/logos/yellowbet_logo_header.png",
    url: "https://yellowbet.ke/en/sportsbook/upcoming",
    tracking: "cxd=cxd_39569_536623",
    language: "en",
    welcomeBonus: "100% Welcome Bonus",
    flag: "🇰🇪",
    currency: "KES"
  }
];

/**
 * Localization strings
 */
const LOCALE = {
  en: {
    heroTitle: "Africa's Brightest Bet",
    heroSub: "Licensed across multiple African markets — join millions who play with confidence.",
    geoDetected: "Looks like you're in",
    geoStart: "PLAY NOW",
    geoPowered: "Part of the YellowBet Family",
    geoNotHere: "Not in {country}? See all markets below",
    marketsTitle: "Choose Your Market",
    betNow: "PLAY NOW",
    poweredBy: "Powered by YellowBet",
    trustTitle: "The YellowBet Family",
    trustDesc: "YellowBet powers licensed sports betting across Sub-Saharan Africa. Backed by a trusted platform, fair play, and a brighter way to bet.",
    statsCountries: "Licensed Markets",
    statsUsers: "Active Players",
    statsRegulated: "Fair & Regulated",
    footerResponsible: "Gambling can be addictive. Play responsibly. 18+ only.",
    footerAbout: "About",
    footerContact: "Contact",
    footerTerms: "Terms & Conditions",
    footerPrivacy: "Privacy Policy",
    ageTitle: "Age Verification",
    ageMessage: "You must be 18 years or older to access this site. By continuing, you confirm you meet the minimum age requirement.",
    ageConfirm: "I AM 18+",
    ageDecline: "I AM UNDER 18",
    searchPlaceholder: "Search for your country..."
  },
  fr: {
    heroTitle: "Le Pari Le Plus Brillant d'Afrique",
    heroSub: "Licencié dans plusieurs marchés africains — jouez en toute confiance.",
    geoDetected: "On dirait que vous êtes au/en",
    geoStart: "JOUER MAINTENANT",
    geoPowered: "Membre de la Famille YellowBet",
    geoNotHere: "Pas au/en {country} ? Voir tous les marchés ci-dessous",
    marketsTitle: "Choisissez Votre Marché",
    betNow: "JOUER",
    poweredBy: "Propulsé par YellowBet",
    trustTitle: "La Famille YellowBet",
    trustDesc: "YellowBet propulse des paris sportifs licenciés à travers l'Afrique subsaharienne. Une plateforme fiable, équitable, et une meilleure façon de parier.",
    statsCountries: "Marchés Licenciés",
    statsUsers: "Joueurs Actifs",
    statsRegulated: "Équitable & Réglementé",
    footerResponsible: "Le jeu peut créer une dépendance. Jouez de manière responsable. 18+ uniquement.",
    footerAbout: "À Propos",
    footerContact: "Contact",
    footerTerms: "Conditions Générales",
    footerPrivacy: "Politique de Confidentialité",
    ageTitle: "Vérification de l'Âge",
    ageMessage: "Vous devez avoir 18 ans ou plus pour accéder à ce site. En continuant, vous confirmez que vous remplissez la condition d'âge minimum.",
    ageConfirm: "J'AI 18 ANS OU PLUS",
    ageDecline: "J'AI MOINS DE 18 ANS",
    searchPlaceholder: "Rechercher votre pays..."
  },
  pt: {
    heroTitle: "A Aposta Mais Brilhante de África",
    heroSub: "Licenciado em vários mercados africanos — jogue com confiança.",
    geoDetected: "Parece que você está em",
    geoStart: "JOGAR AGORA",
    geoPowered: "Parte da Família YellowBet",
    geoNotHere: "Não está em {country}? Veja todos os mercados abaixo",
    marketsTitle: "Escolha o Seu Mercado",
    betNow: "JOGAR",
    poweredBy: "Desenvolvido por YellowBet",
    trustTitle: "A Família YellowBet",
    trustDesc: "YellowBet alimenta apostas desportivas licenciadas em toda a África Subsaariana. Uma plataforma confiável, justa e uma melhor forma de apostar.",
    statsCountries: "Mercados Licenciados",
    statsUsers: "Jogadores Ativos",
    statsRegulated: "Justo & Regulado",
    footerResponsible: "O jogo pode ser viciante. Jogue com responsabilidade. Apenas 18+.",
    footerAbout: "Sobre",
    footerContact: "Contacto",
    footerTerms: "Termos e Condições",
    footerPrivacy: "Política de Privacidade",
    ageTitle: "Verificação de Idade",
    ageMessage: "Deve ter 18 anos ou mais para aceder a este site. Ao continuar, confirma que cumpre o requisito mínimo de idade.",
    ageConfirm: "TENHO 18+",
    ageDecline: "TENHO MENOS DE 18 ANOS",
    searchPlaceholder: "Pesquisar o seu país..."
  }
};

// Country name translations
const COUNTRY_NAMES = {
  en: {
    CM: "Cameroon", CG: "Congo", GN: "Guinea", KE: "Kenya"
  },
  fr: {
    CM: "Cameroun", CG: "Congo", GN: "Guinée", KE: "Kenya"
  },
  pt: {
    CM: "Camarões", CG: "Congo", GN: "Guiné", KE: "Quénia"
  }
};
