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
  currentDate.innerHTML = new Intl.DateTimeFormat(navigator.language, {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date());
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

const account1 = {
  owner: "William Smith",
  movements: [200, -100, 500, -1000, 3000, 4000, 5000],
  pin: 1111,
  interestRate: 1.1,
  movementsDates: [
    "2019-11-18T21:31:17.178Z",
    "2019-12-23T07:42:02.383Z",
    "2020-01-28T09:15:04.904Z",
    "2020-04-01T10:17:24.185Z",
    "2020-05-08T14:11:59.604Z",
    "2020-05-27T17:01:17.194Z",
    "2020-07-11T23:36:17.929Z",
    "2020-07-12T10:51:36.790Z",
  ],
};

const account2 = {
  owner: "Marry Jane",
  movements: [420, 111, 660, 213, -222, -200, -400, 4500],
  pin: 2222,
  interestRate: 1.4,
  movementsDates: [
    "2019-11-01T13:15:33.035Z",
    "2019-11-30T09:48:16.867Z",
    "2019-12-25T06:04:23.907Z",
    "2020-01-25T14:18:46.235Z",
    "2020-02-05T16:33:06.386Z",
    "2020-04-10T14:43:26.374Z",
    "2020-06-25T18:49:59.371Z",
    "2020-07-26T12:01:20.894Z",
  ],
};

const account3 = {
  owner: "Jakub Matras",
  movements: [900, 300, -500, -200, 1000, 2500, 9000],
  pin: 7256,
  interestRate: 1.9,
  movementsDates: [
    "2022-03-18T21:31:17.178Z",
    "2022-03-26T07:42:02.383Z",
    "2022-03-25T09:15:04.904Z",
    "2022-03-24T10:17:24.185Z",
    "2020-05-08T14:11:59.604Z",
    "2020-05-27T17:01:17.194Z",
    "2020-07-11T23:36:17.929Z",
    "2020-07-12T10:51:36.790Z",
  ],
};

const account4 = {
  owner: "Natalia Sawa",
  movements: [10000, -400, -2200, -300, -500, -900, 50],
  pin: 0000,
  interestRate: 1.5,
  movementsDates: [
    "2019-11-01T13:15:33.035Z",
    "2019-11-30T09:48:16.867Z",
    "2019-12-25T06:04:23.907Z",
    "2020-01-25T14:18:46.235Z",
    "2020-02-05T16:33:06.386Z",
    "2020-04-10T14:43:26.374Z",
    "2020-06-25T18:49:59.371Z",
    "2020-07-26T12:01:20.894Z",
  ],
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
    const movementDate = new Date(account.movementsDates[index]);
    const year = `${movementDate.getFullYear()}`.padStart(2, 0);
    const month = `${movementDate.getMonth() + 1}`.padStart(2, 0);
    const day = `${movementDate.getDate()}`.padStart(2, 0);

    const hour = `${movementDate.getHours()}`.padStart(2, 0);
    const minutes = `${movementDate.getMinutes()}`.padStart(2, 0);
    const seconds = `${movementDate.getSeconds()}`.padStart(2, 0);

    const daysPassed = (date) =>
      Math.trunc((+new Date() - +new Date(date)) / (1000 * 60 * 60 * 24));
    const daysAgo = +daysPassed(movementDate);
    let date = "";

    if (daysAgo === 0) {
      date = `Today \n ${hour}:${minutes}:${seconds}`;
    } else if (daysAgo === 1) {
      date = `Yesterday \n ${hour}:${minutes}:${seconds}`;
    } else if (daysAgo >= 1 && daysAgo <= 7) {
      date = `${daysAgo} days ago \n ${hour}:${minutes}:${seconds}`;
    } else {
      date = new Intl.DateTimeFormat(navigator.language, {
        day: "2-digit",
        year: "numeric",
        month: "long",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      }).format(movementDate);
    }
    const formatedMov = new Intl.NumberFormat("de-DE", {
      style: "currency",
      currency: "USD",
    }).format(movement);
    const html = `     <div class="movement__row ${
      movement > 0 ? "deposit__type" : "withdrawal__type"
    }">
            <p class="transaction">
              <span class="movement__number">${index} </span
              ><span class="trans__type">${
                movement > 0 ? "DEPOSIT" : "WITHDRAWAL"
              }</span>
            </p>
            <p class="movement__value">${formatedMov}</p>
            <p class="movement__date">${date}</p>
          </div>
    `;
    movementsEl.insertAdjacentHTML("afterbegin", html);
  });
};

const setCurrentBalance = function (account) {
  currentBallanceEl.innerHTML = new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "USD",
  }).format(
    account.movements.reduce((balance, cur) => balance + cur),
    0
  );
};

const setWelcomingLabel = function (account) {
  welcomingLabel.innerHTML = `Welcome back, ${account.owner.split(" ").at(0)}`;
};

const calcAllDeposits = function (account) {
  allDepositsLabel.innerHTML = `Deposits ${new Intl.NumberFormat("de-De", {
    style: "currency",
    currency: "USD",
  }).format(
    account.movements.reduce((deposits, cur) =>
      cur > 0 ? deposits + cur : deposits
    ),
    0
  )}`;
};

const calcAllWithdrawals = function (account) {
  allWithdrawalsLabel.innerHTML = `Withdrawals ${new Intl.NumberFormat(
    "de-DE",
    {
      style: "currency",
      currency: "USD",
    }
  ).format(
    account.movements.reduce((withdrawals, cur) =>
      cur < 0 ? withdrawals + cur : withdrawals
    ),
    0
  )}`;
};

const calcInterests = function (account) {
  interestsAmount.innerHTML = `Interests ${new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "USD",
  }).format(
    account.movements
      .filter((mov) => mov > 0)
      .map((mov) => (mov * 1.2) / 100)
      .reduce((total, cur) => total + cur)
  )}`;
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
        countDown();

        // P R A C T I S E

        const totalMov = Array.from(
          document.querySelectorAll(".movement__value")
        );

        console.log(
          totalMov
            .map((el) => el.textContent.replace("$", ""))
            .map((el) => Number(el))
            .reduce((sum, cur) => sum + cur)
        );

        const totalDepo = Array.from(
          document.querySelectorAll(".movement__value")
        );
        console.log(
          totalDepo
            .map((deposit) => Number(deposit.textContent.replace("$", "")))
            .filter((deposit) => deposit > 0)
            .reduce((totalDeposit, deposit) => totalDeposit + deposit)
        );

        const totalWithdrawals = Array.from(
          document.querySelectorAll(".movement__value")
        );
        console.log(
          totalWithdrawals
            .map((withdrawal) =>
              Number(withdrawal.textContent.replace("$", ""))
            )
            .filter((withdrawal) => withdrawal < 0)
            .reduce((total, withdrawal) => total + withdrawal)
        );
        // P R A C T I S E
      }
    }
  }
});

transferButtonEl.addEventListener("click", function () {
  const targetAccountName = transferToEl.value;
  const moneyAmount = Number(transferAmountEl.value);
  transMessage.innerHTML = "Conecting...";
  setTimeout(function () {
    if (transferToEl.value === "" || transferAmountEl.value === "") {
      transMessage.innerHTML = "Please enter fields";
    }
    if (moneyAmount > 0) {
      const targetAccount = accounts.find(
        (account) => (account.userName || account.owner) === transferToEl.value
      );
      if (targetAccount !== undefined) {
        targetAccount.movements.push(moneyAmount);
        targetAccount.movementsDates.push(new Date());
        currentAccount.movements.push(-moneyAmount);
        currentAccount.movementsDates.push(new Date());
        transMessage.innerHTML = `Sent ${moneyAmount.toFixed(2)}$ to ${
          targetAccount.owner
        } :)`;
        updateAccount(currentAccount);
        transferAmountEl.value = "";
        transferToEl.value = "";
      } else {
        transMessage.innerHTML = `Did not found: ${transferToEl.value}`;
      }
    } else if (moneyAmount < 0) {
      transMessage.innerHTML = "INVALID NEGATIVE VALUE";
    }
  }, 2500);
});

loanButtonEl.addEventListener("click", function () {
  const loanValue = Math.floor(loanValueEl.value);
  loanMessage.innerHTML = "Conecting...";
  setTimeout(function () {
    if (loanValueEl.innerHTML === "") {
      loanMessage.innerHTML = "Please, enter data first";
    }
  }, 2500);
  if (
    loanValue > 0 &&
    currentAccount.movements.some((movement) => movement >= 0.1 * loanValue) &&
    loanValue <= +currentBallanceEl.innerHTML
  ) {
    loanValueEl.value = "";
    setTimeout(function () {
      currentAccount.movements.push(-loanValue);
      currentAccount.movementsDates.push(new Date());
      updateAccount(currentAccount);
      loanMessage.innerHTML = `Loaned ${loanValue.toFixed(2)}`;
    }, 2500);
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

const accountsDeposits = accounts
  .map((account) => account.movements)
  .flat()
  .filter((mov) => mov > 0)
  .reduce((total, cur) => total + cur);
console.log("Deposits -->", accountsDeposits);
const accountsWithdrawals = accounts
  .map((account) => account.movements)
  .flat()
  .filter((mov) => mov < 0)
  .reduce((total, cur) => total + cur);
console.log("Withdrawals -->", accountsWithdrawals);
const allMovements = accounts
  .map((account) => account.movements)
  .flat()
  .reduce((total, cur) => total + cur);
console.log("All movements -->", allMovements);

depositButtonEl.addEventListener("click", function () {
  depositMessage.innerHTML = "Conecting...";
  setTimeout(function () {
    if (depositValueEl.value !== "") {
      const depositValue = Number(depositValueEl.value);
      if (depositValue > 0) {
        currentAccount.movements.push(depositValue);
        currentAccount.movementsDates.push(new Date());
        depositValueEl.value = "";
        updateAccount(currentAccount);
        depositMessage.innerHTML = `Deposit for ${depositValue.toFixed(
          2
        )}$ made`;
      } else {
        depositMessage.innerHTML = "INVALID NEGATIVE VALUE";
      }
    } else {
      depositMessage.innerHTML = "Please, enter data first";
    }
  }, 2500);
});

sortAsc.addEventListener("click", function () {
  currentAccount.movementsDates.sort(
    (date1, date2) => +new Date(date1) - +new Date(date2)
  );
  updateAccount(currentAccount);
});

sortDesc.addEventListener("click", function () {
  currentAccount.movementsDates.sort(
    (date1, date2) => +new Date(date2) - +new Date(date1)
  );
  updateAccount(currentAccount);
});

const bankInfo = accounts
  .flatMap((account) => account.movements)
  .reduce(
    (acumulator, cur) => {
      acumulator[cur > 0 ? "deposits" : "withdrawals"] += cur;
      acumulator["movements"] += cur;
      return acumulator;
    },
    { deposits: 0, withdrawals: 0, movements: 0 }
  );

console.log(bankInfo);

const converToUpper = function (word) {
  const exceptions = ["a", "an", "the", "but", "or", "on", "in", "with"];
  return word
    .toLowerCase()
    .split(" ")
    .map((part) =>
      exceptions.includes(part)
        ? part
        : part.charAt(0).toUpperCase() + part.slice(1)
    )
    .join(" ");
};

console.log(converToUpper("this is a nice test"));

const dogs = [
  { weight: 22, curFood: 250, owners: ["Alice", "Bob"] },
  { weight: 8, curFood: 200, owners: ["Matilda"] },
  { weight: 13, curFood: 275, owners: ["Sarah", "John"] },
  { weight: 32, curFood: 340, owners: ["Michael"] },
];

dogs.forEach(
  (dog) => (dog.recomendedFood = Math.floor(dog.weight ** 0.75 * 28))
);

const checkFood = function (ownerName, dogs) {
  const lookingDog = dogs.find((dog) =>
    dog.owners.find((owner) => owner === ownerName)
  );
  console.log(lookingDog);
  if (
    lookingDog.curFood >= 0.9 * lookingDog.recomendedFood &&
    lookingDog.curFood <= 1.1 * lookingDog.recomendedFood
  ) {
    console.log(`${ownerName}'s dog eats properly`);
  } else if (lookingDog.curFood < 0.9 * lookingDog.recomendedFood) {
    console.log(`${ownerName}'s dog eats too little`);
  } else {
    console.log(`${ownerName}'s dog eats too much`);
  }
};

checkFood("Sarah", dogs);

const ownersArrayToLittle = dogs
  .filter((dog) => dog.curFood < 0.9 * dog.recomendedFood)
  .map((dog) => dog.owners)
  .flat();
console.log(ownersArrayToLittle);

const ownersArrayToMuch = dogs
  .filter((dog) => dog.curFood > 1.1 * dog.recomendedFood)
  .flatMap((dog) => dog.owners);
console.log(ownersArrayToMuch);

console.log(`${ownersArrayToLittle.join(" and ")}'s dogs eat too little`);
console.log(`${ownersArrayToMuch.join(" and ")}'s dogs eat too much`);

console.log(dogs.some((dog) => dog.recomendedFood === dog.curFood));
console.log(
  dogs.some(
    (dog) =>
      dog.curFood >= 0.9 * dog.recomendedFood &&
      dog.curFood <= 1.1 * dog.recomendedFood
  )
);

const dogsEatProperly = dogs.filter(
  (dog) =>
    dog.curFood >= 0.9 * dog.recomendedFood &&
    dog.curFood <= 1.1 * dog.recomendedFood
);
console.log(dogsEatProperly);

const sortedDogsOnPortions = dogs.sort(
  (dog1, dog2) => dog1.recomendedFood - dog2.recomendedFood
);
console.log(sortedDogsOnPortions);
console.log(dogs);

console.log(Number.parseFloat("30.5$", 10));
console.log(Number.isNaN(Number("e")));

console.log(Number.isFinite(20 / 3 / 0));
console.log(Math.PI * Number.parseFloat("15.2px") ** 2);

const randomInt = (min, max) => {
  return Math.trunc(Math.random() * (max - min + 1) + min);
};

const number = 2321341232424.2134124;

console.log(new Intl.NumberFormat("de-DE").format(number));

console.log(
  new Intl.NumberFormat("de-DE", {
    style: "unit",
    unit: "mile-per-hour",
  }).format(number)
);

console.log(
  new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
  }).format(number)
);

let numb = 10;
setInterval(function () {
  console.log(numb);
  numb--;
  if (numb === 0) {
    numb = 10;
  }
}, 2000);
