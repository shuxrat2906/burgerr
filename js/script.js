const product = {
  plainBurger: {
    nomi: "GAMBURGER",
    narxi: 10000,
    kaloriyasi: 250,
    soni: 0,
    summasi: function () {
      return this.narxi * this.soni;
    },
    kal: function () {
      return this.kaloriyasi * this.soni;
    },
  },
  freshBurger: {
    nomi: "GAMBURGER FRESH",
    narxi: 20500,
    kaloriyasi: 350,
    soni: 0,
    summasi: function () {
      return this.narxi * this.soni;
    },
    kal: function () {
      return this.kaloriyasi * this.soni;
    },
  },
  freshCombo: {
    nomi: "FRESH COMBO",
    narxi: 31900,
    kaloriyasi: 450,
    soni: 0,
    summasi: function () {
      return this.narxi * this.soni;
    },
    kal: function () {
      return this.kaloriyasi * this.soni;
    },
  },
};

const mainProductBtn = document.querySelectorAll(".main__product-btn");
mainProductBtn.forEach((el, i) => {
  el.addEventListener("click", (e) => {
    const parent = el.closest(".main__product");
    const parentID = parent.getAttribute("id");
    const mainProductNum = parent.querySelector(".main__product-num");
    const pOm = el.getAttribute("data-symbol");
    const mainProductPrice = parent.querySelector('.main__product-price span')
    const mainProductKcall = parent.querySelector('.main__product-kcall span')

    if (pOm === "+") {
      if (mainProductNum.innerHTML < 15) {
        product[parentID].soni++;
      }
    } else {
      if (mainProductNum.innerHTML > 0) {
        product[parentID].soni--;
      }
    }
    mainProductNum.innerHTML = product[parentID].soni;
    mainProductPrice.innerHTML = product[parentID].summasi()
    mainProductKcall.innerHTML = product[parentID].kal()
  });
});

const headerTimerExtra = document.querySelector('.header__timer-extra');
let time = 50
let i = 0

function loading() {
  switch (i) {
    case 50: time = 70; break;
    case 70: time = 100; break;
    case 90: time = 180; break;
    case 95: time = 250; break;
    case 97: time = 1000; break;
    case 100: return
  }
  i++
  headerTimerExtra.innerHTML = i
  setTimeout(() => {
    loading()
  }, time);
}

loading()

const mainProductInfo = document.querySelectorAll('.main__product-info');
const view = document.querySelector('.view');
const viewClose = document.querySelector('.view__close');

mainProductInfo.forEach((el, i) => {
  el.addEventListener('dblclick', (e) => {
    let img = el.querySelector('img').getAttribute('src')
    view.querySelector('img').setAttribute('src', img)
    view.classList.add('active')
  })
})

viewClose.addEventListener('click', () => [
  view.classList.remove('active')
])
const addCart = document.querySelector('.addCart');
const receipt = document.querySelector('.receipt')
const ReceiptWindow = document.querySelector('.receipt__window');
const receiptWindowOut = document.querySelector('.receipt__window-out');
const receiptWindowBtn = document.querySelector('.receipt__window-btn');

addCart.addEventListener('click', ()=>{
  receipt.style.display = 'flex'
  setTimeout(() => {
    receipt.style.opacity = 1
    ReceiptWindow.style.top = '10%'
  }, 10);
  check()
})

function check() {
  let productName = ''
  let summasi = caloriyasi = 0
  for (const key in product) {
    if (product[key].soni > 0) {
      productName += `\n${product[key].nomi} soni ${product[key].soni}\n`
      summasi += product[key].summasi()
      caloriyasi += product[key].kal()
    }
  }
  receiptWindowOut.innerHTML = `Sotib olindi:\n${productName}\nNarxi:${summasi}sum\nKaloriyasi:${caloriyasi}`
}

receiptWindowBtn.addEventListener('click', ()=>location.reload())

