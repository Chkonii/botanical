const cartNumber = document.getElementById("cart-number");
const iconEyeArr = document.querySelectorAll(".icon-eye");
const iconCartArr = document.querySelectorAll(".icon-cart");
const cartElems = document.querySelectorAll(".featureSec .featureCol");

//  დამატებული პროდუქის აღმნიშვნელი რიცხვი
let cartItemsNumber =
  JSON.parse(window.localStorage.getItem("cart-items-number")) || 0;

//  დამატებული პროდუქქევის მასივი. აქ ინანხევა დამატებული პროდუქტები
let cartItems = JSON.parse(window.localStorage.getItem("cart-items")) || [];

// ის პროდუქტები რომლებიც ლოკალსთორიჯში იყო გვინდა რომ მზავენდ გამოჩნდეს.
cartItems.forEach((elem) => {
  cartElems[elem.index].querySelector(".icon-cart").classList.add("selected");
});

// html სი განაახლებს პროდუქციის რაოდენობის რიცხვს. 
cartNumber.innerText = cartItemsNumber;


iconCartArr.forEach((iconCart) => {
  // ყველა პროდუქტის ქარდს ვანიჭებს დაწკაპების ივენთ ლისენერს. 
  iconCart.addEventListener("click", (e) => {
    const cartElem = e.currentTarget.closest(".featureCol");
    console.log(cartElems);

    // იმ პროდუქტზე რომელზე დაჭერაც მოხდა იმ პროდუქცის შესაბამის ინფოს ვინახავთ ამ ცვალდებში
    let img = cartElem.querySelector(".img-fluid").src;
    let name = cartElem.querySelector(".title a").textContent;
    let price = cartElem.querySelector(".price").textContent;
    price = parseFloat(price);

    let index = Array.from(cartElems).findIndex((elem) => elem == cartElem);


    // ვქმნით ობიექტს რომელშიც ერთად ვინახავთ ზევით შეგროვებულ ინფოს
    const cartItem = {
      price,
      name,
      img,
      index,
      q: 1,
    };

    // თუ ეს პროდუქტი უკვე დამატებულია/მონიშნულუა მაშნ უნდა წავშალო 
    if (e.currentTarget.classList.contains("selected")) {
      // 1. selected კლასისს წაშლა
      e.currentTarget.classList.remove("selected");
      // 2. პროდუქციის რაოდენობის ერთით შემცირება
      cartItemsNumber--;
      // 3. ამ პროდუქციის პროდუქტების მასივიდან წაშლა.
      removeItem(cartItem);
      // თუ დამატებული არაა მაშინ ვამატებთ ამ პროდუქტს 
    } else {
      // 1.
      e.currentTarget.classList.add("selected");
      cartItemsNumber++;
      addItem(cartItem);
    }

    // html სი განაახლებს პროდუქციის რაოდენობის რიცხვს. 
    cartNumber.innerText = cartItemsNumber;

    // ლოკალურ სთორიჯში განაახლებს ინფოს. 
    updateLocalStorage();
  });
});

function removeItem(cartItem) {
  cartItems = cartItems.filter((c) => c.img !== cartItem.img);
}

function addItem(cartItem) {
  cartItems.push(cartItem);
}

function updateLocalStorage() {
  window.localStorage.setItem("cart-items", JSON.stringify(cartItems));
  window.localStorage.setItem("cart-items-number", cartItemsNumber);
}
