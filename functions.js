window.onload = function () {
  let shuffle = [];
  let table = document.getElementById('table');
  let deck = document.getElementById('deck');

  deck.onclick = () => {
    shuffle.length = 0;
    for (let i = 0; i < 5; i++) {
      let card = {
        suit : Math.floor((Math.random() * 4) + 1),
        num : Math.floor((Math.random() * 13) + 1)
      }
      shuffle.push(card);
    }
    table.innerHTML = JSON.stringify(shuffle);
    check();
  }

  function check() {
    let flush, straight, hand = "";
    let suits = shuffle.map(x => x.suit);
    let nums = shuffle.map(x => x.num).sort((a,b) => {return a - b});

    function checkFlush(value, i, array) {
      return array[0] === value;
    }
    flush = suits.every(checkFlush);

    function checkStraight(value, i, array) {
      if (array[i] == array[i + 1] - 1 || array[i + 1] == null) {
        return true;
      } else {
        return false;
      }
    }
    straight = nums.every(checkStraight);

    if (flush === true && straight === false) {
      hand = "flush";
    } else if (flush === false && straight === true) {
      hand = "straight";
    } else if (flush === true && straight === true) {
      hand = "straight flush";
    }

    switch (hand) {
      case "flush":
        console.log("It's a flush!");
        break;
      case "straight":
        console.log("It's a straight!");
        break;
      case "straight flush":
        console.log("It's a straight flush!");
        break;
      default:
        console.log('You have nothing.');
    }
  }
};
