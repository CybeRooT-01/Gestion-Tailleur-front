import { RestREsponse } from "./RestResponse";

export type Root = category[];
export interface category extends RestREsponse<category> {
  type_categorie: string;
}
