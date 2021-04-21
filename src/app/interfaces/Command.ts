export interface Command {
  _id: string;
  libelle: string;
  status: string;
  archive: boolean;
  products: CommandEntry[];
  user: string;
}

export interface CommandEntry {
  ref: string;
  quantity: number;
}
