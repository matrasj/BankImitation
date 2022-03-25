const movementsEl = document.querySelector(".movements");
const currentBallanceEl = document.querySelector(".curent__balance");
const usernameInputField = document.querySelector(".username__login__input");
const pinInputField = document.querySelector(".pin__login__input");
const loginButton = document.querySelector(".login__button");
const appEl = document.querySelector(".app");
const welcomingLabel = document.querySelector(".current__user_label");
const transferButtonEl = document.querySelector(".transfer__button");
const transferAmountEl = document.querySelector(".transfer__amount");
const transferToEl = document.querySelector(".transfer__to");
const transMessage = document.querySelector(".tr_mes");
const allDepositsLabel = document.querySelector(".deposit__amount_label");
const allWithdrawalsLabel = document.querySelector(".withdrawal__amount_label");
const loanButtonEl = document.querySelector(".loan__button");
const inputButtonEl = document.querySelector(".input__button");
const loanValueEl = document.querySelector(".loan__input");
const withdrawalValueEl = document.querySelector(".withdrawal__input");
const loanMessage = document.querySelector(".loan_message");
const inputMessage = document.querySelector(".input_message");
const currentDate = document.querySelector(".current__date");
const logOutButton = document.querySelector(".log__out");
const depositButtonEl = document.querySelector(".deposit__button");
const depositValueEl = document.querySelector(".deposit__input");
const depositMessage = document.querySelector(".deposit_message");
const sortAsc = document.querySelector(".asc");
const sortDesc = document.querySelector(".desc");
const sessionTime = document.querySelector(".time__end__session");
const interestsAmount = document.querySelector(".interests__amount_label");

function currentTime() {
  let date = new Date();
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let seconds = date.getSeconds();

  hours = hours < 10 ? "0" + hours : hours;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;

  currentDate.innerHTML = `${hours}:${minutes}:${seconds}`;
  setTimeout(currentTime, 1000);
}

currentTime();
let minutes = 5;
let time = minutes * 60;
function countDown() {
  if (time >= 0) {
    const minutes = Math.floor(time / 60);
    let seconds = time % 60;
    sessionTime.innerHTML = `0${minutes}:${
      seconds < 10 ? "0" + seconds : seconds
    }`;
    time--;
  } else {
    appEl.style.opacity = "0";
  }

  setTimeout(countDown, 1000);
}

countDown();
const account1 = {
  owner: "William Smith",
  movements: [200, -100, 500, -1000, 3000, 4000, 5000],
  pin: 1111,
  interestRate: 1.1,
};

const account2 = {
  owner: "Marry Jane",
  movements: [420, 111, 660, 213, -222, -200, -400, 4500],
  pin: 2222,
  interestRate: 1.4,
};

const account3 = {
  owner: "Jakub Matras",
  movements: [900, 300, -500, -200, 1000, 2500, 9000],
  pin: 7256,
  interestRate: 1.9,
};

const account4 = {
  owner: "Natalia Sawa",
  movements: [10000, -400, -2200, -300, -500, -900, 50],
  pin: 0000,
  interestRate: 1.5,
};

const accounts = [account1, account2, account3, account4];

let currentAccount = "";

const createUsernames = function (accounts) {
  accounts.forEach((account) => {
    account.userName = account.owner
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0))
      .join("");
  });
};

createUsernames(accounts);

const displayMovements = function (account) {
  movementsEl.innerHTML = "";
  account.movements.forEach((movement, index) => {
    const html = `     <div class="movement__row ${
      movement > 0 ? "deposit__type" : "withdrawal__type"
    }">
            <p class="transaction">
              <span class="movement__number">${index} </span
              ><span class="trans__type">${
                movement > 0 ? "DEPOSIT" : "WITHDRAWAL"
              }</span>
            </p>
            <p class="movement__value">${movement}$</p>
          </div>
    `;
    movementsEl.insertAdjacentHTML("afterbegin", html);
  });
};

const setCurrentBalance = function (account) {
  currentBallanceEl.innerHTML =
    "BAL " + account.movements.reduce((sum, cur) => sum + cur) + "$";
};

const setWelcomingLabel = function (account) {
  welcomingLabel.innerHTML = `Welcome back, ${account.owner.split(" ").at(0)}`;
};

const calcAllDeposits = function (account) {
  allDepositsLabel.innerHTML = `Total deposits ${account.movements
    .filter((income) => income > 0)
    .reduce((sum, cur) => sum + cur)}$`;
};

const calcAllWithdrawals = function (account) {
  allWithdrawalsLabel.innerHTML = `Total withdrawals ${account.movements
    .filter((withdrawal) => withdrawal < 0)
    .reduce((sum, cur) => sum + cur)}$`;
};

const calcInterests = function (account) {
  interestsAmount.innerHTML = `Interests: ${account.movements
    .filter((movement) => movement > 0)
    .map((movement) => (movement * 1.2) / 100)
    .reduce((ac, cur) => ac + cur)}$`;
};

const updateAccount = function (account) {
  displayMovements(account);
  setCurrentBalance(account);
  setWelcomingLabel(account);
  calcAllDeposits(account);
  calcAllWithdrawals(account);
  calcInterests(account);
};

loginButton.addEventListener("click", function (e) {
  e.preventDefault();
  if (usernameInputField.value !== "" && pinInputField.value !== "") {
    currentAccount = accounts.find(
      (account) => account.userName === usernameInputField.value
    );
    if (typeof createUsernames !== undefined) {
      if (Number(pinInputField.value) === currentAccount.pin) {
        pinInputField.value = "";
        usernameInputField.value = "";
        updateAccount(currentAccount);
        appEl.style.opacity = "1";
        minutes = 5;
      }
    }
  }
});

transferButtonEl.addEventListener("click", function () {
  const targetAccountName = transferToEl.value;
  const moneyAmount = Number(transferAmountEl.value);
  if (transferToEl.value === "" || transferAmountEl.value === "") {
    transMessage.innerHTML = "Please enter fields";
  }
  if (moneyAmount > 0) {
    const targetAccount = accounts.find(
      (account) => (account.userName || account.owner) === transferToEl.value
    );
    if (targetAccount !== undefined) {
      targetAccount.movements.push(moneyAmount);
      currentAccount.movements.push(-moneyAmount);
      transMessage.innerHTML = `Sent ${moneyAmount} to ${targetAccount.owner} :)`;
      updateAccount(currentAccount);
      transferAmountEl.value = "";
      transferToEl.value = "";
    } else {
      transMessage.innerHTML = `Did not found: ${transferToEl.value}`;
    }
  } else if (moneyAmount < 0) {
    transMessage.innerHTML = "INVALID NEGATIVE VALUE";
  }
});

loanButtonEl.addEventListener("click", function () {
  const loanValue = Number(loanValueEl.value);
  if (loanValueEl.innerHTML === "") {
    loanMessage.innerHTML = "Please, enter data first";
  }
  if (loanValue > 0) {
    loanValueEl.value = "";
    currentAccount.movements.push(-loanValue);
    updateAccount(currentAccount);
    loanMessage.innerHTML = `Loaned ${loanValue}`;
  } else if (loanValue < 0) {
    loanMessage.innerHTML = "INVALID NEGATIVE VALUE";
  }
});
logOutButton.addEventListener("click", function () {
  appEl.style.opacity = "0";
  welcomingLabel.innerHTML = "Please, enter your data";
  transMessage.innerHTML = "";
  loanMessage.innerHTML = "";
  depositMessage.innerHTML = "";
});

depositButtonEl.addEventListener("click", function () {
  if (depositValueEl.value !== "") {
    const depositValue = Number(depositValueEl.value);
    if (depositValue > 0) {
      currentAccount.movements.push(depositValue);
      depositValueEl.value = "";
      updateAccount(currentAccount);
      depositMessage.innerHTML = `Deposit for ${depositValue}$ made`;
    } else {
      depositMessage.innerHTML = "INVALID NEGATIVE VALUE";
    }
  } else {
    depositMessage.innerHTML = "Please, enter data first";
  }
});

sortAsc.addEventListener("click", function () {
  currentAccount.movements.sort((a, b) => a - b);
  updateAccount(currentAccount);
});

sortDesc.addEventListener("click", function () {
  currentAccount.movements.sort((a, b) => b - a);
  updateAccount(currentAccount);
});
