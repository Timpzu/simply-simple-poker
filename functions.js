window.onload = () => {
  let shuffle = [];
  const deck = document.getElementById('deck');
  const deal = document.getElementById('deal');
  const cardTemplate = document.getElementsByTagName('template')[0];
  const cardItem = cardTemplate.content.querySelector('span');

  deck.onclick = () => {
    shuffle.length = 0;
    deal.innerHTML = "";
    let a, i;
    for (let i = 0; i < 5; i++) {
      let card = {
        suit : String.fromCharCode(Math.floor(Math.random() * 4) + 97),
        num : Math.floor((Math.random() * 13) + 1)
      }
      a = document.importNode(cardItem, true);
      a.style.backgroundImage = "url('img/cards/" + card.suit + "/" + card.num + ".png')";
      deal.appendChild(a);
      shuffle.push(card);
    }
    check();
  }

  const check = () => {
    let flush, straight, hand;
    let suits = shuffle.map(x => x.suit);
    let nums = shuffle.map(x => x.num).sort((a,b) => {return a - b});

    const checkFlush = (value, i, array) => {
      return array[0] === value;
    }
    flush = suits.every(checkFlush);

    const checkStraight = (value, i, array) => {
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
