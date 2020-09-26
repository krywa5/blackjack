export const weights = [
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "J",
    "Q",
    "K",
    "A",
];

export const types = ["spades", "hearts", "diamonds", "clubs"];

export class Card {
    mapTextToSign = {
        hearts: "&hearts;",
        spades: "&spades;",
        diamonds: "&diams;",
        clubs: "&clubs;",
    };

    constructor(weight, type) {
        this.weight = weight;
        this.type = type;
    }

    render() {
        const card = document.createElement('div');
        card.classList.add('card');
        card.classList.add(this.type);

        card.innerHTML = `${this.weight} ${this.mapTextToSign[this.type]}`;

        return card;
    }


}

