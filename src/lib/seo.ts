import type { Metadata } from 'next';

export const SITE_URL = 'https://strandsnation.xyz';
export const SITE_NAME = 'StrandsNation';
export const DEFAULT_OG_IMAGE = '/icon-512.png';

export type SeoRoute = {
  path: string;
  title: string;
  description: string;
  priority: number;
  changeFrequency: 'weekly' | 'monthly';
};

export const seoRoutes: SeoRoute[] = [
  {
    path: '/',
    title: 'StrandsNation: Ready Player You',
    description:
      'A post-capitalist MMORPG and living-world canon where persistent-memory NPCs, factions, music, lore, and community systems converge.',
    priority: 1,
    changeFrequency: 'weekly',
  },
  {
    path: '/whitepaper',
    title: 'Strands Whitepaper',
    description:
      'The technical and economic thesis behind Strands: AI memory, consent-based attention, Telegram onboarding, Layer U, and the route to a player-owned network.',
    priority: 0.9,
    changeFrequency: 'weekly',
  },
  {
    path: '/game',
    title: 'Strands: The Game',
    description:
      'The playable entry point into MetaXity1: a Telegram-first MMORPG about Blanks, factions, SIGOPS, and a civilisation that remembers player choices.',
    priority: 0.85,
    changeFrequency: 'weekly',
  },
  {
    path: '/everywear',
    title: 'EveryWear in the Strands Ecosystem',
    description:
      'How the EveryWear runtime connects Strands products through one identity, one memory graph, applet manifests, and local-first agentic tooling.',
    priority: 0.8,
    changeFrequency: 'monthly',
  },
  {
    path: '/s3',
    title: 'S3 Strands Sound Studio in StrandsNation',
    description:
      'The Strands-side explanation of S3: local AI music, creator tooling, style patches, and why the studio ships before the game as the first utility wedge.',
    priority: 0.8,
    changeFrequency: 'monthly',
  },
  {
    path: '/philosophy',
    title: 'Strands Philosophy',
    description:
      'The political and cultural frame for Strands: intelligence as commons, post-labour economics, memory sovereignty, and player agency.',
    priority: 0.75,
    changeFrequency: 'monthly',
  },
  {
    path: '/codex',
    title: 'Strands Codex',
    description:
      'A structured guide to Strands factions, skills, economy, seasons, EveryWear systems, and the playable rules of the world.',
    priority: 0.75,
    changeFrequency: 'monthly',
  },
  {
    path: '/network',
    title: 'Strands Network',
    description:
      'The ecosystem map for Strands: community, products, identity, creative tools, and network layers that connect the game to the wider stack.',
    priority: 0.7,
    changeFrequency: 'monthly',
  },
];

export const ecosystemSurfaces = [
  {
    name: 'Metafintek',
    url: 'https://metafintek.xyz',
    role: 'Operating company and senior advisory practice behind the research, strategy, and build discipline.',
  },
  {
    name: 'S3 Studio',
    url: 'https://s3studio.xyz',
    role: 'Standalone creator product for local AI music and production workflows, aimed at musicians and producers.',
  },
  {
    name: 'EveryWear',
    url: 'https://everywear.id',
    role: 'Identity and runtime layer for applets, memory, accounts, and cross-product continuity.',
  },
  {
    name: 'Layer U',
    url: 'https://layeru.xyz',
    role: 'Planned spatial and network intelligence surface for OSINT, A.R.E., and later XR overlays.',
  },
  {
    name: 'Strands Community',
    url: 'https://community.strandsnation.xyz',
    role: 'Discourse forum for support, showcases, product feedback, lore discussion, and governance conversation.',
  },
  {
    name: 'Somo Kasane',
    url: 'https://somokasane.com',
    role: 'Venture-studio and mythic parent brand for layered AI, game, and spatial projects.',
  },
];

export function absoluteUrl(path = '/') {
  return new URL(path, SITE_URL).toString();
}

export function routeFor(path: string) {
  return seoRoutes.find((route) => route.path === path) ?? seoRoutes[0];
}

export function buildMetadata(path: string): Metadata {
  const route = routeFor(path);
  const url = absoluteUrl(route.path);

  return {
    title: route.title,
    description: route.description,
    alternates: { canonical: url },
    openGraph: {
      title: route.title,
      description: route.description,
      siteName: SITE_NAME,
      type: 'website',
      url,
      images: [{ url: DEFAULT_OG_IMAGE, width: 512, height: 512, alt: 'StrandsNation mark' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: route.title,
      description: route.description,
      images: [DEFAULT_OG_IMAGE],
    },
  };
}

export function organizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'StrandsNation',
    url: SITE_URL,
    logo: absoluteUrl('/icon-512.png'),
    sameAs: ecosystemSurfaces.map((surface) => surface.url),
    description: routeFor('/').description,
  };
}

export function websiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: SITE_URL,
    description: routeFor('/').description,
  };
}

export function videoGameJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'VideoGame',
    name: 'Strands',
    url: absoluteUrl('/game'),
    gamePlatform: ['Telegram Mini App', 'Web'],
    genre: ['MMORPG', 'Alternate reality game', 'AI-native game'],
    description: routeFor('/game').description,
    publisher: {
      '@type': 'Organization',
      name: 'PT Metafintek AI Studios',
      url: 'https://metafintek.xyz',
    },
  };
}
