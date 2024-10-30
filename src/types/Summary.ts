import { PersonWithShare } from "./Person";

export interface Summary {
  finalAmount: string;
  breakdown: PersonWithShare[];
}
