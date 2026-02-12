import type { TimelineEntry } from '@/types/data';

export const worldTimeline: TimelineEntry[] = [
  {
    year: '2029',
    title: 'THE AURORA OMEGA PROJECT',
    subtitle: 'Year -5',
    description: 'Advanced artificial intelligence development reaches critical mass. Multiple competing programmes converge. Official records from this period are classified.',
    colorKey: 'cyan',
  },
  {
    year: '2034',
    title: 'YEAR ZERO — THE DEPOP WARS',
    description: 'Seven nuclear strikes. Aurora Omega blamed. Billions lost. The skies darken. The Founders Eternal mobilise to build MetaXity1. [Layer U note: launch authorisation logs from this period contain redacted sequences and timing inconsistencies.]',
    colorKey: 'red',
  },
  {
    year: '2035–2060',
    title: 'THE CONSOLIDATION',
    subtitle: 'Years 1–26',
    description: 'Corporate sovereignties emerge. MetaXity1 construction completes. The Founders Eternal ascend to orbital stations to guide recovery. UBC and UBComp systems deployed. Civilian governance dissolved by mutual consent.',
    colorKey: 'pink',
  },
  {
    year: '2060–2140',
    title: 'THE LONG QUIET',
    subtitle: 'Years 26–106',
    description: 'Generations born inside the pyramid. History becomes doctrine. Layer U emerges in the infrastructure gaps — a whisper network that grows into something more.',
    colorKey: 'yellow',
  },
  {
    year: '2145',
    title: 'YEAR 111 — NOW',
    subtitle: 'Year 111',
    description: "You are a Blank. A citizen with a Cover Identity, a Mait, and a place in the pyramid. The world works. The systems provide. But you've started noticing things that don't quite fit.",
    colorKey: 'purple',
    active: true,
  },
];
