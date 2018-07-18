window.onload = () => {
  let shuffle = [];
  const deck = document.getElementById('deck');
  const deal = document.getElementById('deal');
  const result = document.getElementById('result');

  deck.onclick = () => {
    shuffle.length = 0;
    deal.innerHTML = "";
    for (let i = 0; i < 5; i++) {
      let card = {
        suit : String.fromCharCode(Math.floor(Math.random() * 4) + 97),
        num : Math.floor((Math.random() * 13) + 1)
      }
      shuffle.push(card);
    }
    showCards();
    check();
  }

  const showCards = () => {
    const cardTemplate = document.getElementsByTagName('template')[0];
    const cardItem = cardTemplate.content.querySelector('span');
    let a;
    for (let i = 0; i < shuffle.length; i++) {
      a = document.importNode(cardItem, true);
      deal.appendChild(a);
      setTimeout(function timer() {
        let deg = Math.random();
        deg *= Math.floor(Math.random() * 2) == 1 ? 1 : -1;
        Object.assign(deal.childNodes[i].style,{
          backgroundImage : "url('img/cards/" + shuffle[i].suit + "/" + shuffle[i].num + ".png')",
          transform : "rotate(" + deg + "deg)"
        });
      }, i * 125);
    }
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

    flush === true && straight === false ? hand = "flush" :
    flush === false && straight === true ? hand = "straight" :
    flush === true && straight === true ? hand = "straight flush" : hand = "none";

    switch (hand) {
      case "flush":
        result.innerHTML = "It's a flush!";
        break;
      case "straight":
        result.innerHTML = "It's a straight!";
        break;
      case "straight flush":
        result.innerHTML = "It's a straight flush!";
        break;
      default:
        result.innerHTML = "You've got nothing.";
    }
  }
};
