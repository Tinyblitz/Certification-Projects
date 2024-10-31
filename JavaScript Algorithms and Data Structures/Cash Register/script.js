const userInput = document.getElementById('cash');
const purchaseBtn = document.getElementById('purchase-btn');
const registerTotal = document.getElementById('register-total');
const listOfAllChange = document.querySelectorAll('.change');
const results = document.getElementById('change-due');

let price = 19.55;
price = parseFloat(price.toFixed(2));
// [change-type, change-in-drawer, change-type-value]
let cid = [
  ['PENNY', 1.01],
  ['NICKEL', 2.05],
  ['DIME', 3.1],
  ['QUARTER', 4.25],
  ['ONE', 90],
  ['FIVE', 55],
  ['TEN', 20],
  ['TWENTY', 60],
  ['ONE HUNDRED', 100]
];
let changeTypes = {
  'PENNY': 0.01,
  'NICKEL': 0.05,
  'DIME': 0.1,
  'QUARTER': 0.25,
  'ONE': 1,
  'FIVE': 5,
  'TEN': 10,
  'TWENTY': 20,
  'ONE HUNDRED': 100
};
let cash = 0;

registerTotal.children[0].textContent = `${price}`;
function updateChangeDisplay() {
  listOfAllChange.forEach((el, index) => el.children[0].textContent = `${cid[index][1]}`);
}

window.onload = updateChangeDisplay;

function checkAlerts(cash){
  const regex = /^\d+\.?([0-9][0-9]?)?$/;
  
  if (!regex.test(cash)) {
    alert("Please input proper cash amount to 2 or less decimal places");
    return true;
  }
  
  if (cash < price) {
    alert('Customer does not have enough money to purchase the item');
    return true;
  }
  return false;
};

function calculateChangeInDrawer() {
  return cid.map(change => change[1]).reduce((total, change) => total + change, 0);
};

function countChangeToGive(changeDue) {
  const array = [];

  for (let i = cid.length - 1; i >= 0; i--) {
    const changeTypeValue = changeTypes[cid[i][0]];
    let changeHolder = 0;
    while (changeDue >= changeTypeValue && parseFloat((cid[i][1] - changeHolder).toFixed(2)) !== 0) {
      changeDue = parseFloat((changeDue - changeTypeValue).toFixed(2));
      changeHolder += changeTypeValue;
    }
    if (changeHolder !== 0) {
      array.push({
        'changeType': cid[i][0],
        'value': parseFloat(changeHolder.toFixed(2))
      });
      cid[i][1] = parseFloat((cid[i][1] - changeHolder).toFixed(2));
    }
    if (changeDue === 0) {
      updateChangeDisplay();
      return array;
    }
  }
  return [];
};

function updateResults(changeDue, changeInDrawer) {
  
  if (changeDue === 0){
    results.innerHTML = `<p>No change due - customer paid with exact cash</p>`;
    return;
  }

  const arrayOfChange = changeInDrawer < changeDue ? [] : countChangeToGive(changeDue);
  
  if (arrayOfChange.length === 0) {
    results.innerHTML = `<p>Status: INSUFFICIENT_FUNDS</p>`;
    return;
  }

  if (changeInDrawer == changeDue) results.innerHTML = `<p>Status: CLOSED</p>`;
  else results.innerHTML = `<p>Status: OPEN</p>`;
 
  arrayOfChange.forEach(({changeType, value}) => {
    results.innerHTML += `<p>${changeType}: $${value}</p>`
  });
};

function analyzePurchase() {
  const cash = userInput.value;
  if (checkAlerts(cash)) return;
  const changeDue = parseFloat((cash - price).toFixed(2));
  const changeInDrawer = parseFloat(calculateChangeInDrawer().toFixed(2));
  updateResults(changeDue, changeInDrawer);
}

purchaseBtn.addEventListener('click', analyzePurchase);
userInput.addEventListener('keydown', (e) => {
  if (e.key === "Enter") analyzePurchase();
});
