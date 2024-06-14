export enum GameOutcome {
  Win = 'win',
  Loss = 'loss',
  Tie = 'tie',
}

export enum BattleType {
  People = 'people',
  Starship = 'starship',
}

export interface WinType {
  opponent: string;
  result: GameOutcome;
}
