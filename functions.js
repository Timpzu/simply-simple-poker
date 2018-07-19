window.onload = () => {
  let shuffle = [];
  const deck = document.getElementById('deck');
  const deal = document.getElementById('deal');
  const result = document.getElementById('result');

  deck.onclick = () => {
    shuffle.length = 0;
    deal.innerHTML = "";

    for (let i = 0; shuffle.length < 5; i++) {
      let card = {
        suit : String.fromCharCode(Math.floor(Math.random() * 4) + 97),
        num : Math.floor((Math.random() * 13) + 1)
      };
      // Checking for duplicate cards
      shuffle.length == 0 ? shuffle.push(card) :
      shuffle.some((value, y, array) => array[y].num != card.num && array[y].suit != card.suit) ? shuffle.push(card) : console.log('Duplicate found. Starting over...');

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
        let deg = Math.random() * 1.5;
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
    let sameOfKind = 0;
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

    const checkSameOfKind = (array) => {
      let ofKinds = [];
      let x = 1;
      while (x < 14) {
        let count = 0;
        for (let i = 0; i < array.length; i++) {
          array[i] == x ? count++ : count = count;
        }
        if (count >= 2) {
          let kind = { num: x, count: count }
          ofKinds.push(kind);
        }
        x++;
      }
      ofKinds.forEach((element) => { sameOfKind += element.count * ofKinds.length; });
    }
    checkSameOfKind(nums);

    flush === true && straight === true ? hand = "straight flush" :
    sameOfKind == 4 ? hand = "four of a kind" :
    sameOfKind == 10 ? hand = "full house" :
    flush === true && straight === false ? hand = "flush" :
    flush === false && straight === true ? hand = "straight" :
    sameOfKind == 3 ? hand = "three of a kind" :
    sameOfKind == 8 ? hand = "two pairs" :
    sameOfKind == 2 ? hand = "one pair" : hand = "none";

    switch (hand) {
      case "straight flush":
        result.innerHTML = "It's a straight flush!";
        break;
      case "four of a kind":
        result.innerHTML = "It's a four of a kind!";
        break
      case "full house":
        result.innerHTML = "It's a full house!";
        break
      case "flush":
        result.innerHTML = "It's a flush!";
        break;
      case "straight":
        result.innerHTML = "It's a straight!";
        break;
      case "three of a kind":
        result.innerHTML = "It's a three of a kind!";
        break;
      case "two pairs":
        result.innerHTML = "It's two pairs";
        break;
      case "one pair":
        result.innerHTML = "It's a pair!";
        break;
      default:
        result.innerHTML = "You've got nothing.";
    }
  }
};
