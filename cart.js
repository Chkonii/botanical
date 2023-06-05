const body = document.querySelector(".cartHolder tbody");
const cartNumber = document.querySelector(".nav-link  .num");
const allPrice = document.querySelector(".price.fwEbold");

let cartItemsNumber =
  JSON.parse(window.localStorage.getItem("cart-items-number")) || 0;

let cartItems = JSON.parse(window.localStorage.getItem("cart-items")) || [];

renderElems();



function renderElems() {
  body.innerHTML = "";
  cartNumber.innerText = cartItemsNumber;

  cartItems.forEach((cartItem) => {
    const tr = document.createElement("tr");
    tr.classList.add("align-items-center");

    tr.innerHTML = `
      <td class="d-flex align-items-center border-top-0 border-bottom px-0 py-6">
        <div class="imgHolder">
          <img src="${cartItem.img}" alt="image description" class="img-fluid">
        </div>
        <span class="title pl-2"><a href="shop-detail.html">${
          cartItem.name
        }</a></span>
      </td>
        <td class="fwEbold border-top-0 border-bottom px-0 py-6">${
          cartItem.price
        } $</td>


      <td class="border-top-0 border-bottom px-0 py-6">
      <span class="jcf-number" id="jcf-number-2">
        <input type="number" placeholder="1" value="${cartItem.q}">

      </span>
      
      </td>
      <td class="fwEbold border-top-0 border-bottom px-0 py-6">${
        cartItem.q * cartItem.price
      } $ <a href="javascript:void(0);"
          class="fas fa-times float-right"></a></td>
  `;

    body.appendChild(tr);
  });
}

body.addEventListener("click", (e) => {
  const tr = e.target.closest("tr");
  const img = tr.querySelector("img").src;

  console.log(img);

  if (e.target.classList.contains("fa-times")) {
    removeItem(img);
    return;
  }
  if (e.target.classList.contains("jcf-btn-inc")) {
    increaseItem(img);
    return;
  }
  if (e.target.classList.contains("jcf-btn-dec")) {
    decreaseItem(img);
    return;
  }
});

function removeItem(img) {
  cartItems = cartItems.filter((c) => c.img !== img);
  console.log(cartItems);
  cartItemsNumber--;
  updateLocalStorage();
  renderElems();
  window.location.reload();
}

function increaseItem(img) {
  cartItems = cartItems.map((c) => (c.img !== img ? c : { ...c, q: c.q + 1 }));
  updateLocalStorage();
  calculateAllPrice();
  renderElems();
  window.location.reload();
}

function decreaseItem(img) {
  const item = cartItems.find((c) => c.img === img);
  console.log(item.q);
  if (item.q === 1) {
    removeItem(img);
  } else {
    cartItems = cartItems.map((c) =>
      c.img !== img ? c : { ...c, q: c.q - 1 }
    );
    updateLocalStorage();
    calculateAllPrice();
    renderElems();
    window.location.reload();
  }
}

// ----------
function updateLocalStorage() {
  window.localStorage.setItem("cart-items", JSON.stringify(cartItems));
  window.localStorage.setItem("cart-items-number", cartItemsNumber);
}

function calculateAllPrice() {
  let sum = 0;

  cartItems.forEach((item) => {
    sum += item.price * item.q;
  });

  allPrice.innerHTML = sum + "$";
}

calculateAllPrice();
