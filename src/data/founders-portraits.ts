export interface FoundersPortrait {
  src: string;
  tier: string;
  id: number;
}

export const foundersPortraits: Record<string, FoundersPortrait[]> = {
  COMMON: [
    { src: '/images/founders/FP_COMMON_187.png', tier: 'COMMON', id: 187 },
    { src: '/images/founders/FP_COMMON_304.png', tier: 'COMMON', id: 304 },
    { src: '/images/founders/FP_COMMON_367.png', tier: 'COMMON', id: 367 },
    { src: '/images/founders/FP_COMMON_496.png', tier: 'COMMON', id: 496 },
  ],
  RARE: [
    { src: '/images/founders/FP_RARE_151.png', tier: 'RARE', id: 151 },
    { src: '/images/founders/FP_RARE_250.png', tier: 'RARE', id: 250 },
    { src: '/images/founders/FP_RARE_257.png', tier: 'RARE', id: 257 },
    { src: '/images/founders/FP_RARE_274.png', tier: 'RARE', id: 274 },
    { src: '/images/founders/FP_RARE_327.png', tier: 'RARE', id: 327 },
    { src: '/images/founders/FP_RARE_387.png', tier: 'RARE', id: 387 },
  ],
  LEGENDARY: [
    { src: '/images/founders/FP_LEGENDARY_165.png', tier: 'LEGENDARY', id: 165 },
    { src: '/images/founders/FP_LEGENDARY_195.png', tier: 'LEGENDARY', id: 195 },
    { src: '/images/founders/FP_LEGENDARY_292.png', tier: 'LEGENDARY', id: 292 },
  ],
  EXTRAORDINARY: [],
};
