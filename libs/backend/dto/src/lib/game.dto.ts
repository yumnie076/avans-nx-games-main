export class CreateGameDto {
  title!: string;
  releaseDate!: Date;
  isMultiplayer!: boolean;
  description?: string;
  minPlayers?: number;
  maxPlayers?: number;
  genre?: string;
  languageIndependent?: boolean;
}

export class UpdateGameDto {
  title?: string;
  releaseDate?: Date;
  isMultiplayer?: boolean;
  description?: string;
  minPlayers?: number;
  maxPlayers?: number;
  genre?: string;
  languageIndependent?: boolean;
}
