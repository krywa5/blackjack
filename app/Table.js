export class Table {
    constructor(dealerCards, playerCards) {
        this.dealerCards = dealerCards;
        this.playerCards = playerCards;
    }

    showPlayerCards(card) {
        this.playerCards.appendChild(card.render());
    }

    showDealerCards(card) {
        this.dealerCards.appendChild(card.render());
    }
}