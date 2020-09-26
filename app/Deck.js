import { Card, types, weights } from './Card.js';

export class Deck {
    cards = []; // init empty deck

    constructor() {
        types.forEach(
            type => weights.forEach(
                weight => this.cards.push(new Card(weight, type))
            )
        );
    }


    shuffle() {
        for (let i = this.cards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * i);
            const temp = this.cards[i];
            this.cards[i] = this.cards[j];
            this.cards[j] = temp;
        }

        return this.cards;
    }

    pickOneCard() {
        return this.cards.pop();
    }

}