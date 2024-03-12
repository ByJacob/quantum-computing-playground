export const MagnesiumName = {
  A1: 'A1',
  B1: 'B1',
  B2: 'B2',
  C1: 'C1',
  C2: 'C2',
  C3: 'C3',
  C4: 'C4',
} as const;

export type MagnesiumName = typeof MagnesiumName[keyof typeof MagnesiumName];

export type ControlsStates = {
  [K in MagnesiumName]: {
    enable: boolean;
    name: string
    rotateRad: number;
  };
};
