export interface Favorite {
  _id: string;
  user: string;
  game: {
    _id: string;
    title: string;
    releaseDate: string;
    description?: string;
    isMultiplayer?: boolean;
    minPlayers?: number;
    maxPlayers?: number;
    genre?: string;
    languageIndependent?: boolean;
  };
  createdAt?: string;
  updatedAt?: string;
}
