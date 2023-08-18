export interface Articles {
  id: number;
  libelle: string;
  prix: number;
  stock: number;
  image: string;
  reference: string;
  categorie_id: number;
  created_at: string;
  updated_at: string;
  deleted_at: any;
  categorie: Categorie;
}

export interface Categorie {
  id: number;
  libelle: string;
  ordre_insertion: number;
}
