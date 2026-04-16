import type { SkillPath } from '@/types/data';

export const skillPaths: SkillPath[] = [
  {
    title: 'Operator Paths: Combat',
    colorKey: 'red',
    columns: 2,
    description: 'Field specialisation. Four combat disciplines define how you engage the pyramid. Each scales independently; cross-training dilutes focus but broadens options.',
    skills: [
      { title: 'AssaultOps', body: 'Breach specialists. Overwhelming close-range dominance and corridor control.', colorKey: 'red' },
      { title: 'TechOps',    body: 'Drone and hacking operators. Battlefield electronic warfare and system disruption.', colorKey: 'cyan' },
      { title: 'InfilOps',   body: 'Stealth and precision. Shadow movement through restricted sectors, silent elimination.', colorKey: 'purple' },
      { title: 'SigInt',     body: 'Signal intelligence. Target marking, reconnaissance, information warfare.', colorKey: 'green' },
    ],
  },
  {
    title: 'Weaver Paths: Data and Support',
    colorKey: 'cyan',
    columns: 3,
    description: 'Data mastery, companion binding, and hybrid creation. Weavers forge new armour hybrids, new weapon classes, and maintain the digital infrastructure the resistance depends on.',
    skills: [
      { title: 'Cryptographer',    body: 'Encryption, forensics, signal hardening. The security layer of every operation.',  colorKey: 'cyan' },
      { title: 'Mait-Binder',      body: 'Companion specialists. Healing, combat medics, tank support, digital symbiosis.', colorKey: 'pink' },
      { title: 'SimSoul Hunter',   body: 'Consciousness fragment tracking. Mark-and-hunt predation across the network.',    colorKey: 'yellow' },
    ],
  },
  {
    title: 'Cover Identity: Your Public Face',
    colorKey: 'yellow',
    description: 'Every Blank needs a corporate role. Neglect it and scrutiny increases. Over-invest and you become what you are pretending to be. Sync allocation here is mandatory; Cover is a full third of your progression.',
    columns: 3,
    skills: [
      { title: 'Augmenter',        body: 'Physical body modification: limbs, implants, sensory upgrades.',                   colorKey: 'yellow' },
      { title: 'Neurogenitor',     body: 'Neural pathway preparation for Ability Shards and cognitive enhancement.',          colorKey: 'yellow' },
      { title: 'Shardsmith',       body: 'Tuning Shard creation for weapons and armour. The forge of the resistance.',        colorKey: 'yellow' },
      { title: 'DataSmith',        body: 'ROM calibration, Shard application, resync services for field operatives.',        colorKey: 'yellow' },
      { title: 'Meme-Weaver',      body: 'AR propaganda art, morale influence, perception manipulation and deception.',       colorKey: 'purple' },
      { title: 'Resonance Tuner',  body: 'Music emitters, cognitive healing, safe house acoustics and sonic warfare.',        colorKey: 'purple' },
    ],
  },
];
