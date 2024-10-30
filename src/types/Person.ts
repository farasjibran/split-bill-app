export interface Person {
  name: string;
  amount: number;
}

export interface PersonWithShare extends Person {
  share: number;
}
