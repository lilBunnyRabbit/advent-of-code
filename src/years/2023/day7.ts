import { Day, Flag } from "../../core";
import input from "./day7.txt?raw";

const day = new Day(7, input, Flag.AUTO_START);

day.addPart((parser) => {
  const labels: Record<string, number> = {
    "2": 2,
    "3": 3,
    "4": 4,
    "5": 5,
    "6": 6,
    "7": 7,
    "8": 8,
    "9": 9,
    T: 10,
    J: 11,
    Q: 12,
    K: 13,
    A: 14,
  };

  enum Strengths {
    HIGH_CARD,
    ONE_PAIR,
    TWO_PAIR,
    THREE_OF_KIND,
    FULL_HOUSE,
    FOUR_OF_KIND,
    FIVE_OF_KIND,
  }

  const getStrength = (cards: number[]): Strengths => {
    const matches: Map<number, number> = new Map();

    for (const card of cards) {
      let count = 1;

      if (!matches.has(card)) matches.set(card, count);
      else {
        count = matches.get(card)!;
        if (count >= 4) {
          return Strengths.FIVE_OF_KIND;
        }
        matches.set(card, count + 1);
      }
    }

    const counts = new Uint8Array(6);

    for (let [_, value] of matches) {
      counts[value]++;

      switch (value) {
        case 4:
          return Strengths.FOUR_OF_KIND;

        case 3:
        case 2: {
          if (counts[3] && counts[2]) return Strengths.FULL_HOUSE;
          if (counts[2] >= 2) return Strengths.TWO_PAIR;
          break;
        }

        default:
          break;
      }
    }

    if (counts[3]) return Strengths.THREE_OF_KIND;
    if (counts[2] === 1) return Strengths.ONE_PAIR;

    return Strengths.HIGH_CARD;
  };

  const hands = parser.input().map((row) => {
    const [iCards, iBid] = row.split(/\s+/);

    const cards = iCards.split("").map((v) => labels[v] ?? Number.parseInt(v));
    const bid = Number.parseInt(iBid);

    return { cards, bid, strength: getStrength(cards) };
  });

  return hands
    .sort((a, b) => {
      if (a.strength > b.strength) return 1;
      if (a.strength < b.strength) return -1;

      for (let i = 0; i < a.cards.length; i++) {
        if (a.cards[i] > b.cards[i]) return 1;
        if (a.cards[i] < b.cards[i]) return -1;
      }

      return 0;
    })
    .reduce((total, { bid }, i) => total + bid * (i + 1), 0);
});

export default day;
