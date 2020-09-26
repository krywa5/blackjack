import { Deck } from './Deck.js';
import { Player } from './Player.js';
import { Table } from './Table.js';
import { messages } from './messages.js';
import { Message } from './Message.js';

class Game {
    constructor({ player, playerPoints, dealerPoints, table, hitButton, stopButton, messageBox }) { // przekazanie argumentów w obiekcie pozwala na niezachowywanie kolejności argumentów
        this.hitButton = hitButton;
        this.stopButton = stopButton;

        this.playerPoints = playerPoints;
        this.dealerPoints = dealerPoints;

        this.player = player;
        this.dealer = new Player('Krupier');

        this.table = table;

        this.messageBox = messageBox;

        this.deck = new Deck();
        this.deck.shuffle();
    }

    run() {
        this.hitButton.addEventListener('click', (event) => this.hitCard());
        this.stopButton.addEventListener('click', (event) => this.dealerPlays());
        this.dealCards();
    }

    dealCards() {
        for (let n = 0; n < 2; n++) {
            let card1 = this.deck.pickOneCard();
            this.player.hand.addCard(card1);
            this.table.showPlayerCards(card1);

            let card2 = this.deck.pickOneCard();
            this.dealer.hand.addCard(card2);
            this.table.showDealerCards(card2);
        }

        this.playerPoints.innerHTML = this.player.calculatePoints();
        this.dealerPoints.innerHTML = this.dealer.calculatePoints();
    }

    hitCard() {
        const card = this.deck.pickOneCard();
        this.player.hand.addCard(card);
        this.table.showPlayerCards(card);
        this.playerPoints.innerHTML = this.player.calculatePoints();

        if (this.player.points > 21) {
            this.disableButtons();
            this.messageBox.setText(messages.loss).show();
            return;
        }
    }

    dealerPlays() {
        while (this.dealer.points <= this.player.points && this.dealer.points <= 21 && this.player.points <= 21) {
            const card = this.deck.pickOneCard();
            this.dealer.hand.addCard(card);
            this.table.showDealerCards(card);
            this.dealerPoints.innerHTML = this.dealer.calculatePoints();
        }

        this.endTheGame();
    }

    disableButtons() {
        this.hitButton.setAttribute('disabled', true);
        this.stopButton.setAttribute('disabled', true);
    }

    endTheGame() {

        if (this.player.points < 21 && this.player.points === this.dealer.points) {
            this.messageBox.setText(messages.draw).show();
            return
        }

        if (this.dealer.points > 21) {
            this.messageBox.setText(messages.win).show();
            return;
        }

        if (this.player.points < this.dealer.points) {
            this.messageBox.setText(messages.loss).show();
            return;
        }

        this.disableButtons();
    }
}

const table = new Table(
    document.getElementById('dealerCards'),
    document.getElementById('playerCards'),
);
const messageBox = new Message(document.getElementById('message'));

const player = new Player('Krystian');

const game = new Game({
    hitButton: document.getElementById('hit'),
    stopButton: document.getElementById('stop'),
    dealerPoints: document.getElementById('dealerPoints'),
    playerPoints: document.getElementById('playerPoints'),
    player,
    table,
    messageBox,
});

game.run();