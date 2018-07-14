window.onload = function () {
  let hand = [];
  let table = document.getElementById('table');
  let deck = document.getElementById('deck');

  deck.onclick = () => {
    hand.length = 0;
    for (let i = 0; i < 5; i++) {
      let card = {
        suit : Math.floor((Math.random() * 4) + 1),
        num : Math.floor((Math.random() * 13) + 1)
      }
      hand.push(card);
    }
    table.innerHTML = JSON.stringify(hand);
    check();
  }

  function check() {
    let suits = hand.map(x => x.suit);
    let flush = suits.every(
      (value, _, array) => {
        return array[0] === value;
      }
    );
    if (flush == true) {
      console.log('It is a Flush!');
    } else {
      console.log('You win nothing.');
    }
  }
};
