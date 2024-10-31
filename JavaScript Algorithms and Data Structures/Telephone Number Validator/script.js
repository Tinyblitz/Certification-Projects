const userInput = document.getElementById('user-input');
const results = document.getElementById('results-div');
const checkBtn = document.getElementById('check-btn');
const clearBtn = document.getElementById('clear-btn');


function checkValid() {
  const value = userInput.value;
  userInput.value = "";

  const blankRegex = /^\s*$/;
  if (blankRegex.test(value)) {
    alert("Please provide a phone number");
    return;
  }

  const regex = /^\s*1?\s*(\(\d{3}\)|\d{3})[\s-]?\d{3}[\s-]?\d{4}\s*$/;

  results.innerHTML += regex.test(value) ? `<p display="block">Valid US number: ${value}</p>` : `<p display="block">Invalid US number: ${value}</p>`
}

function clearInput() {
  results.innerHTML = ``;
}

checkBtn.addEventListener('click', checkValid);
clearBtn.addEventListener('click', clearInput);
