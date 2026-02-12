import type { SkillPath } from '@/types/data';

export const skillPaths: SkillPath[] = [
  {
    title: 'Operator Paths — Combat',
    colorKey: 'red',
    columns: 2,
    skills: [
      { title: 'AssaultOps', body: 'Vertical mobility. Overwhelming firepower.',          colorKey: 'red' },
      { title: 'TechOps',    body: 'System infiltration. Surveillance hacking.',           colorKey: 'cyan' },
      { title: 'InfilOps',   body: 'Shadow movement. Restricted sectors.',                 colorKey: 'purple' },
      { title: 'SigInt',     body: 'Information warfare. Data interception.',              colorKey: 'green' },
    ],
  },
  {
    title: 'Weaver Paths — Data',
    colorKey: 'cyan',
    columns: 3,
    skills: [
      { title: 'Cryptographer',    body: 'Encryption. Secure comms. Data integrity.',                        colorKey: 'cyan' },
      { title: 'Mait-Binder',      body: 'AI companion creation and advanced interaction.',                  colorKey: 'pink' },
      { title: 'SimSoul Hunter',   body: 'Consciousness fragment tracking. Simulation archaeology.',         colorKey: 'yellow' },
    ],
  },
  {
    title: 'Cover Identity — Your Day Job',
    colorKey: 'yellow',
    description: "Every Blank needs a public face. Neglect it and corporate scrutiny increases. Over-invest and you become what you're pretending to be.",
    columns: 3,
    skills: [
      { title: 'Augmenter',        body: 'Cybernetic mods, sensory implants',                    colorKey: 'yellow' },
      { title: 'Neurogenitor',     body: 'Neural pathway prep for Trait Shards',                 colorKey: 'yellow' },
      { title: 'Shardsmith',       body: 'Tuning Shard creation',                                colorKey: 'yellow' },
      { title: 'DataSmith',        body: 'Tuning Shard application',                             colorKey: 'yellow' },
      { title: 'Meme-Weaver',      body: 'AR propaganda art, buffs/debuffs',                     colorKey: 'purple' },
      { title: 'Resonance Tuner',  body: 'Music emitters, healing, safe houses',                 colorKey: 'purple' },
    ],
  },
];
