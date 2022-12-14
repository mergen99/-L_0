const closeActiveItems = document.getElementById("closeActiveItems");
const closeOutItems = document.getElementById("closeOutItems");

const activeItems = document.getElementById("activeItems");
const outItems = document.getElementById("outItems");

const chooseAllCheckbox = document.getElementById("choose-all");
const checkboxesInActiveItems = document.querySelectorAll(".active");
const openBasket = document.getElementById("openBasket");
const chooseBasket = document.getElementById("basketChoose");
const labelAll = document.getElementById("labelAll");
const counterBlocks = document.querySelectorAll(".basket__item");
const totalNew = document.querySelectorAll("[data-counter]");
const totalOld = document.querySelectorAll("[data-discounter]");
const amountGoods = document.querySelectorAll(".item__counter-block_count");
const diff = document.getElementById("diff");
const price = {
  tshirt: 522,
  case: 354,
  pencils: 494,
};
const newcost = document.querySelectorAll(".item__cost__new-cost");
const oldcost = document.querySelectorAll(".item__cost__old-cost");
const newTshort = document.getElementById("newTshort");
const newCases = document.getElementById("newCases");
const newPencils = document.getElementById("newPencils");
const oldTshort = document.getElementById("oldTshort");
const oldCases = document.getElementById("oldCases");
const oldPencils = document.getElementById("oldPencils");
const fake = document.querySelector(".fake");
const circleCount = document.querySelector(".header__right-circle");
//payment
const deliveryChangeBtn = document.getElementById("deliveryChangeBtn");
const choosepayment = document.getElementById("choose-payment");
//payment total
const deliveryTotalChangeBtn = document.getElementById(
  "deliveryTotalChangeBtn"
);
const modalDeliveryMethod = document.getElementById("deliveryMethod");
const closeModalPayment = document.getElementById("closeModalPayment");
const delivery = document.getElementById('delivery');
const openChangeDelivery = document.getElementById('openChangeDelivery');
const closeChangeDelivery = document.getElementById('closeChangeDelivery');

openChangeDelivery.addEventListener('click', openChangeDeliveryFunction);
closeChangeDelivery.addEventListener('click', closeChangeDeliveryFunction);


//change button text
const deliveryTotalCheckbox = document.getElementById("deliveryTotalCheckbox");
const orderButton = document.getElementById("orderButton");
const basketCost = document.getElementById("basketCost");
const basketDiscount = document.querySelector(".basket__total-discount");
const customInput = document.querySelector(".custom-checkbox");
/* closeActiveItems.addEventListener("click", toggleActiveItems); */
/* closeOutItems.addEventListener("click", toggleOutItems); */
chooseAllCheckbox.addEventListener("change", chooseAllItems);
openBasket.addEventListener("click", changeBasket);
chooseBasket.addEventListener("click", changeChooseBasket);
deliveryChangeBtn.addEventListener("click", openChangePaymentMethod);
deliveryTotalChangeBtn.addEventListener("click", openChangePaymentMethod);
closeModalPayment.addEventListener("click", openChangePaymentMethod);
/* counterBlocks.forEach((element) =>
  element.addEventListener("click", getCountGoods)
); */

const rowName = document.getElementById("rowName");
const inputName = document.getElementById("inputName");
const errorName = document.getElementById("errorName");

const rowSurname = document.getElementById("rowSurname");
const inputSurname = document.getElementById("inputSurname");
const errorSurname = document.getElementById("errorSurname");

const rowPost = document.getElementById("rowPost");
const inputPost = document.getElementById("inputPost");
const errorPost = document.getElementById("errorPost");

const rowPhone = document.getElementById("rowPhone");
const inputPhone = document.getElementById("inputPhone");
const errorPhone = document.getElementById("errorPhone");

const rowInn = document.getElementById("rowInn");
const inputInn = document.getElementById("inputInn");
const errorInn = document.getElementById("errorInn");
const innInfo = document.getElementById("innInfo");
const basketItems = document.querySelector(".basket__items");

//form listeners
inputName.addEventListener("blur", checkInputName);
inputSurname.addEventListener("blur", checkInputSurname);
inputPost.addEventListener("blur", checkInputPost);
inputPhone.addEventListener("blur", checkInputPhone);
inputInn.addEventListener("blur", checkInputInn);

//listeners

orderButton.addEventListener("click", checkAllFormInputs);

checkboxesInActiveItems.forEach((item) =>
  item.addEventListener("change", changeChooseAll)
);

choosepayment.addEventListener("click", (elem) => {
  const cost = basketCost.innerText;
  target = elem.target;
  if (target.checked) {
    orderButton.textContent = "????????????????" + " " + cost;
  } else {
    orderButton.textContent = "????????????????";
  }
});

counterBlocks.forEach((counter) => {
  counter.addEventListener("click", (e) => {
    const target = e.target;
    if (
      target.closest(".item__counter-block_decrease") ||
      target.closest(".item__counter-block_increase")
    ) {
      let value = parseInt(
        target
          .closest(".item__counter-block")
          .querySelector(".item__counter-block_count").textContent
      );
      if (target.classList.contains("item__counter-block_increase")) {
        value++;
      } else {
        --value;
      }
      if (value <= 1) {
        value = 1;
        target
          .closest(".item__counter-block")
          .querySelector(".item__counter-block_decrease").style.color =
          "rgba(0, 0, 0, 0.2)";
        target
          .closest(".item__counter-block")
          .querySelector(".item__counter-block_increase").style.color = "black";
      } else {
        target
          .closest(".item__counter-block")
          .querySelector(".item__counter-block_decrease").style.color = "black";
        if (
          target
            .closest(".item__counter-block")
            .closest(".item__counter")
            .querySelector(".hide")
        ) {
        } else if (
          target
            .closest(".item__counter-block")
            .closest(".item__counter")
            .querySelector(".item__counter-count")
        ) {
          value = 2;
          target
            .closest(".item__counter-block")
            .querySelector(".item__counter-block_increase").style.color =
            "rgba(0, 0, 0, 0.2)";
        }
      }
      target
        .closest(".item__counter-block")
        .querySelector(".item__counter-block_count").textContent = value;

      if (target.closest(".cnt1")) {
        newTshort.textContent = value * price.tshirt + " " + "??????";
        oldTshort.textContent = value * price.tshirt * 2 + " " + "??????";
      } else if (target.closest(".cnt2")) {
        newCases.textContent = value * price.case + " " + "??????";
        oldCases.textContent = value * price.case * 1.5 + " " + "??????";
      } else if (target.closest(".cnt3")) {
        newPencils.textContent = value * price.pencils + " " + "??????";
        oldPencils.textContent = value * price.pencils * 1.5 + " " + "??????";
      }
      getTotalNew();
      getTotalOld();
      getDifference();
      getCountGoods();
    }
  });
});


function getTotalNew() {
  let arr = [];
  totalNew.forEach((item) => {
    arr.push(parseInt(item.textContent));
  });
  let sum = arr.reduce((acc, num) => acc + num, 0);
  basketCost.textContent = sum + " " + "??????";
}

function getTotalOld() {
  let arr = [];
  totalOld.forEach((item) => {
    arr.push(parseInt(item.textContent));
  });
  let sum = arr.reduce((acc, num) => acc + num, 0);
  basketDiscount.textContent = sum + " " + "??????";
}
function getDifference() {
  let total = parseInt(basketCost.textContent);
  let totalDiscount = parseInt(basketDiscount.textContent);
  diff.textContent = total - totalDiscount;
}

/* function toggleActiveItems() {
  activeItems.classList.toggle("hide");
  closeActiveItems.classList.toggle("rotate-icon");
} */

/* function toggleOutItems() {
  outItems.classList.toggle("hide");
  closeOutItems.classList.toggle("rotate-icon");
} */

function changeChooseAll() {
  let listboolean = [];
  checkboxesInActiveItems.forEach((elem) => {
    listboolean.push(elem.checked);
  });
  if (listboolean.includes(false)) {
    chooseAllCheckbox.checked = false;
  } else {
    chooseAllCheckbox.checked = true;
  }
  let count = listboolean.filter((item) => item).length;
  circleCount.textContent = count;
  listboolean = [];
}

function chooseAllItems() {
  checkboxesInActiveItems.forEach((item) => {
    if (chooseAllCheckbox.checked) {
      item.checked = true;
    }
  });
}

function openChangePaymentMethod() {
  modalDeliveryMethod.classList.toggle("open");
}

function openChangeDeliveryFunction() {
  delivery.classList.toggle("open");
}

function closeChangeDeliveryFunction() {
  delivery.classList.toggle("open");
}

function changeBasket() {
  activeItems.classList.toggle("close");
  if (activeItems.classList.contains("close")) {
    closeActiveItems.classList.remove("rotate-icon");
    labelAll.style.display = "none";
    fake.style.display = "block";
  } else {
    closeActiveItems.classList.add("rotate-icon");
    labelAll.style.display = "inline-flex";
    fake.style.display = "none";
  }
}
function getCountGoods() {
  let amount = 0;
  let arr = [];
  for (let i = 0; i < amountGoods.length; i++) {
    arr.push(parseInt(amountGoods[i].textContent));
  }
  amount = arr.reduce((acc, num) => acc + num, 0);
     fake.textContent = amount + " " + "????????????????" + basketCost.textContent;
}

function changeChooseBasket() {
  outItems.classList.toggle("close");
}

//form functions
function checkInputName() {
  const isValid = /[a-zA-Z]/.test(inputName.value);
  if (isValid) {
    rowName.classList.add("error");
    errorName.classList.add("common__error");
    errorName.innerText = "?????????????? ?????????????? ??????????";
  } else {
    rowName.classList.remove("error");
    errorName.classList.remove("common__error");
  }
}

function checkInputSurname() {
  const isValid = /[a-zA-Z]/.test(inputSurname.value);
  if (isValid) {
    rowSurname.classList.add("error");
    errorSurname.classList.add("common__error");
    errorSurname.innerText = "?????????????? ?????????????? ??????????";
  } else {
    rowSurname.classList.remove("error");
    errorSurname.classList.remove("common__error");
  }
}

function checkInputPost() {
  const reg = /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/;
  const isValid = reg.test(inputPost.value);

  if (!isValid) {
    rowPost.classList.add("error");
    errorPost.classList.add("common__error");
    errorPost.innerText = "?????????????????? ?????????? ?????????????????????? ??????????";
  } else {
    rowPost.classList.remove("error");
    errorPost.classList.remove("common__error");
  }
}

function checkInputPhone() {
  const reg = /\+7\ \d{3}\ \d{3}\ \d{2}\ \d{2}/;
  const isValid = reg.test(inputPhone.value);

  if (!isValid) {
    rowPhone.classList.add("error");
    errorPhone.classList.add("common__error");
    errorPhone.innerText = "????????????: +9 999 999 99 99";
  } else {
    rowPhone.classList.remove("error");
    errorPhone.classList.remove("common__error");
  }
}

function checkInputInn() {
  const reg = /[a-z??-????]/i;
  const isValid = reg.test(inputInn.value);

  if (isValid || inputInn.value.length > 12) {
    rowInn.classList.add("error");
    innInfo.classList.add("hide");
    errorInn.classList.add("common__error");
    errorInn.innerText = "????????????: 1234567890";
  } else {
    innInfo.classList.remove("hide");
    rowInn.classList.remove("error");
    errorInn.classList.remove("common__error");
  }
}

function checkAllFormInputs() {
  const inputs = [
    {
      name: inputName,
      row: rowName,
      error: errorName,
      fn: checkInputName,
    },
    {
      name: inputSurname,
      row: rowSurname,
      error: errorSurname,
      fn: checkInputSurname,
    },
    {
      name: inputPost,
      row: rowPost,
      error: errorPost,
      fn: checkInputPost,
    },
    {
      name: inputPhone,
      row: rowPhone,
      error: errorPhone,
      fn: checkInputPhone,
    },
    {
      name: inputInn,
      row: rowInn,
      error: errorInn,
      fn: checkInputInn,
    },
  ];

  inputs.forEach(input => {
    if (input.name.value.length) {
      input.fn()
    } else {
      input.name.classList.add("error");
      input.error.classList.add("common__error");
      if (input.name === inputInn) {
        innInfo.classList.add("hide");
      }
    }
  })
}

