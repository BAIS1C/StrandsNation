import './globals.css'; // Assuming globals.css is in the same /app directory as layout.js
// In src/app/layout.js

export const metadata = {
  title: 'StrandsNation – Protocols for a Participatory Economy',
  description: 'Join StrandsNation: claim your passport, meet your AI companion, and participate in a decentralised intelligence system.',
  keywords: 'StrandsNation, Strands, MyMaits, AI, AI Companions, Web3, NFT, dNFT, Crypto, AR, Augmented Reality, Spatial Advertising, XR, Extended Reality, decentralised intelligence, digital civilisation, Founders Access Pass', // Added target regions to keywords
  authors: [{ name: 'Sean Uddin', url: 'https://strandsnation.xyz' }],
  creator: 'Sean Uddin',
  openGraph: {
    title: 'StrandsNation',
    description: 'Protocols for a Participatory Economy. Citizenship through Participation, not Wealth.',
    url: 'https://strandsnation.xyz', // Your canonical URL
    siteName: 'StrandsNation',
    images: [
      {
        url: '/cards/signal-from-noise.png', // Make sure this image is in public/cards/
        width: 1200,
        height: 630,
        alt: 'StrandsNation Banner',
      },
    ],
    // For OG locale with English content targeting these regions, 'en_AU' or 'en_SG' are good choices.
    // 'en' is also perfectly acceptable if you want to be more general.
    // Let's use 'en_AU' as it covers a significant English-speaking population in your target list.
    locale: 'en_AU',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'StrandsNation – Protocols for a Participatory Economy',
    description: 'Join StrandsNation and explore a new model of digital citizenship and decentralised intelligence.',
    // site: '@yourXusername', // Optional: Your site's X username if it has one
    // creator: '@yourpersonalXusername', // Optional: Your personal/creator X username
    images: ['/cards/signal-from-noise.png'], // URL for Twitter card image
  },
  alternates: {
    canonical: 'https://strandsnation.xyz/', // The primary URL for your English content
    languages: {
      // Since the content is identical and in English for all these regions,
      // all hreflang tags will point to your canonical English URL.
      // This tells search engines that THIS English version is relevant for users in these regions.
      'en': 'https://strandsnation.xyz/',          // General English
      'en-SG': 'https://strandsnation.xyz/',     // English for Singapore
      'en-MY': 'https://strandsnation.xyz/',     // English for Malaysia
      'en-ID': 'https://strandsnation.xyz/',     // English for Indonesia (for English speakers there)
      'en-AU': 'https://strandsnation.xyz/',     // English for Australia
      'en-NZ': 'https://strandsnation.xyz/',     // English for New Zealand
	  'en-HK': 'https://strandsnation.xyz/',     // English for HongKong
      'x-default': 'https://strandsnation.xyz/', // Default version for users from other regions
    },
  },
  // Consider adding favicons and app icons:
  // icons: {
  //   icon: '/favicon.ico', // Path in your /public folder
  //   shortcut: '/favicon-16x16.png',
  //   apple: '/apple-touch-icon.png',
  //   // other: [
  //   //   { rel: 'android-chrome-192x192', url: '/android-chrome-192x192.png' },
  //   //   { rel: 'android-chrome-512x512', url: '/android-chrome-512x512.png' },
  //   // ],
  // },
};

export default function RootLayout({ children }) {
  return (
    // The lang attribute should reflect the language of the content on the page.
    // Since your site is in English for all these target regions:
    <html lang="en">
      <body className="font-exo2 bg-black text-white antialiased"> {/* Your existing body classes */}
        {children}
      </body>
    </html>
  );
}