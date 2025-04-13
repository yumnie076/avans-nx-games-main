export interface Game {
  _id: string;
  title: string;
  releaseDate: string;
  isMultiplayer: boolean;
  description?: string;
  minPlayers?: number;
  maxPlayers?: number;
  genre?: string;
  languageIndependent?: boolean;
}
