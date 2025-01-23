export type Hero = {
  name: string;
  id: string;
  portraits: portrait;
};

type portrait = {
  default: string;
  prestige: string;
};

export const heroes: Hero[] = [
  {
    name: "Black Panther",
    id: "black-panther",
    portraits: {
      default: "../../heroes/portraits/default/black-panther.png",
      prestige: "../../heroes/portraits/prestige/black-panther.png",
    },
  },
];
