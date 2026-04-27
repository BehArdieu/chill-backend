import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

const seedUser = {
  email: 'seed.events@chill.app',
  username: 'chill_events',
  first_name: 'Chill',
  last_name: 'Events',
  password: 'seed-password-change-me',
  interests: ['Art', 'Musique', 'Sport', 'Tech', 'Cuisine', 'Bien-être'],
};

const categories = [
  {
    id: 'seed-community-artistes-parisiens',
    name: 'Artistes Parisiens',
    description: 'Sorties expo, ateliers créatifs et rencontres autour de la scène artistique parisienne.',
    category: 'Art',
  },
  {
    id: 'seed-community-running-lyon',
    name: 'Running Lyon',
    description: 'Sessions running, préparation de courses et sorties sportives accessibles à Lyon.',
    category: 'Sport',
  },
  {
    id: 'seed-community-tech-product-nantes',
    name: 'Tech & Product Nantes',
    description: 'Meetups tech, produit et design pour construire et apprendre ensemble.',
    category: 'Tech',
  },
  {
    id: 'seed-community-food-lovers-marseille',
    name: 'Food Lovers Marseille',
    description: 'Découvertes culinaires, marchés, ateliers cuisine et bonnes adresses locales.',
    category: 'Cuisine',
  },
];

const events = [
  {
    key: 'vernissage-jeunes-artistes-paris',
    title: 'Vernissage jeunes artistes',
    description: 'Une soirée pour découvrir des artistes émergents, discuter avec eux et partager un verre.',
    category: 'Art',
    address: 'Galerie du Marais, 75004 Paris',
    max_participants: 80,
    community: 'Artistes Parisiens',
    startsInDays: 7,
    durationHours: 3,
  },
  {
    key: 'atelier-croquis-cafe',
    title: 'Atelier croquis au café',
    description: 'Session détendue de dessin sur modèle vivant, ouverte aux débutants comme aux confirmés.',
    category: 'Art',
    address: 'Café Créatif, 75011 Paris',
    max_participants: 18,
    community: 'Artistes Parisiens',
    startsInDays: 15,
    durationHours: 2,
  },
  {
    key: 'run-afterwork-parc-tete-or',
    title: 'Run afterwork au parc',
    description: 'Boucle de 7 km à allure conviviale, suivie d’un moment récupération entre participants.',
    category: 'Sport',
    address: "Parc de la Tête d'Or, 69006 Lyon",
    max_participants: 35,
    community: 'Running Lyon',
    startsInDays: 5,
    durationHours: 1,
  },
  {
    key: 'sortie-longue-quais-saone',
    title: 'Sortie longue quais de Saône',
    description: 'Préparation semi-marathon avec un parcours progressif de 14 km le long des quais.',
    category: 'Sport',
    address: 'Quais de Saône, 69002 Lyon',
    max_participants: 25,
    community: 'Running Lyon',
    startsInDays: 18,
    durationHours: 2,
  },
  {
    key: 'meetup-ia-produit',
    title: 'Meetup IA & produit',
    description: 'Retours d’expérience concrets sur l’usage de l’IA dans les équipes produit.',
    category: 'Tech',
    address: 'La Cantine Numérique, 44000 Nantes',
    max_participants: 60,
    community: 'Tech & Product Nantes',
    startsInDays: 10,
    durationHours: 2,
  },
  {
    key: 'workshop-design-system',
    title: 'Workshop design system',
    description: 'Atelier pratique pour structurer des composants, tokens et règles de contribution.',
    category: 'Tech',
    address: 'Maison de la Tech, 44200 Nantes',
    max_participants: 24,
    community: 'Tech & Product Nantes',
    startsInDays: 22,
    durationHours: 4,
  },
  {
    key: 'balade-gourmande-panier',
    title: 'Balade gourmande au Panier',
    description: 'Parcours de dégustation entre artisans, épiceries fines et adresses historiques.',
    category: 'Cuisine',
    address: 'Quartier du Panier, 13002 Marseille',
    max_participants: 20,
    community: 'Food Lovers Marseille',
    startsInDays: 12,
    durationHours: 3,
  },
  {
    key: 'atelier-pates-fraiches',
    title: 'Atelier pâtes fraîches',
    description: 'Apprendre à préparer tagliatelles et raviolis maison avec une cheffe locale.',
    category: 'Cuisine',
    address: 'Atelier des Saveurs, 13006 Marseille',
    max_participants: 16,
    community: 'Food Lovers Marseille',
    startsInDays: 27,
    durationHours: 3,
  },
  {
    key: 'yoga-sunrise-bordeaux',
    title: 'Yoga sunrise sur les quais',
    description: 'Séance matinale tous niveaux pour démarrer la journée avec respiration et mobilité.',
    category: 'Bien-être',
    address: 'Quai des Chartrons, 33000 Bordeaux',
    max_participants: 30,
    community: null,
    startsInDays: 6,
    durationHours: 1,
  },
  {
    key: 'jam-acoustique-lille',
    title: 'Jam acoustique',
    description: 'Rencontre musicale ouverte aux chanteurs, guitaristes et curieux qui veulent écouter.',
    category: 'Musique',
    address: 'Café Culturel, 59000 Lille',
    max_participants: 45,
    community: null,
    startsInDays: 20,
    durationHours: 3,
  },
];

function eventDates(startsInDays: number, durationHours: number) {
  const start = new Date();
  start.setUTCDate(start.getUTCDate() + startsInDays);
  start.setUTCHours(18, 0, 0, 0);

  const end = new Date(start);
  end.setUTCHours(end.getUTCHours() + durationHours);

  return { start, end };
}

async function main() {
  const password = await bcrypt.hash(seedUser.password, 12);

  const user = await prisma.user.upsert({
    where: { email: seedUser.email },
    update: {
      username: seedUser.username,
      first_name: seedUser.first_name,
      last_name: seedUser.last_name,
      interests: seedUser.interests,
    },
    create: {
      ...seedUser,
      password,
    },
  });

  const communities = new Map<string, string>();

  for (const communitySeed of categories) {
    const { id, ...communityData } = communitySeed;
    const community = await prisma.community.upsert({
      where: { id },
      update: {
        ...communityData,
        is_public: true,
        is_active: true,
      },
      create: {
        id,
        ...communityData,
        created_by: user.id,
      },
    });

    communities.set(community.name, community.id);

    await prisma.communityMember.upsert({
      where: {
        community_id_user_id: {
          community_id: community.id,
          user_id: user.id,
        },
      },
      update: { role: 'admin' },
      create: {
        community_id: community.id,
        user_id: user.id,
        role: 'admin',
      },
    });
  }

  for (const eventSeed of events) {
    const { key, community, startsInDays, durationHours, ...data } = eventSeed;
    const { start, end } = eventDates(startsInDays, durationHours);

    await prisma.event.upsert({
      where: { id: key },
      update: {
        ...data,
        start_date: start,
        end_date: end,
        is_public: true,
        is_active: true,
        community_id: community ? communities.get(community) : null,
      },
      create: {
        id: key,
        ...data,
        start_date: start,
        end_date: end,
        is_public: true,
        created_by: user.id,
        community_id: community ? communities.get(community) : null,
      },
    });
  }

  console.log(`Seed terminé: ${events.length} événements, ${categories.length} communautés, 1 utilisateur.`);
}

main()
  .catch((error) => {
    console.error('Erreur pendant le seed:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
