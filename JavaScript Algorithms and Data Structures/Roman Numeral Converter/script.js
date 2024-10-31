const convertButton = document.getElementById('convert-btn');
const numberInput = document.getElementById('number');
const outputContainer = document.getElementById('output');

let errorMsg;

const arabicBase = [
  {
    arabic: 1000,
    roman: "M"
  },
  {
    arabic: 900,
    roman: "CM"
  },
  {
    arabic: 500,
    roman: "D"
  },
  {
    arabic: 400,
    roman: "CD"
  },
  {
    arabic: 100,
    roman: "C"
  },
  {
    arabic: 90,
    roman: "XC"
  },
  {
    arabic: 50,
    roman: "L"
  },
  {
    arabic: 40,
    roman: "XL"
  },
  {
    arabic: 10,
    roman: "X"
  },
  {
    arabic: 9,
    roman: "IX"
  },
  {
    arabic: 5,
    roman: "V"
  },
  {
    arabic: 4,
    roman: "IV"
  },
  {
    arabic: 1,
    roman: "I"
  }
];

function checkIfValid(num){
  if (isNaN(num)) {
    errorMsg = `<p>Please enter a valid number.</p>`;
  }
  else if (num < 1){
    errorMsg = `<p>Please enter a number greater than or equal to 1.</p>`;
  }
  else if (num > 3999) {
    errorMsg = `<p>Please enter a number less than or equal to 3999.</p>`;
  }
  else if (num !== Math.floor(num)) {
    errorMsg = `<p>Please enter a whole number.</p>`;
  }
  else {
    return true;
  }
  return false;
};

function convertToRoman(num) {
  
  if (num === 0) return ``;
  
  let roman = ``;

  for (const v of arabicBase) {
    if (num >= v.arabic) {
      num -= v.arabic;
      roman = v.roman;
      break;
    }
  }

  return roman + convertToRoman(num);
};

function obtainOutput(num) {

  if (!checkIfValid(num)) {
    outputContainer.classList.add('invalid');
    return errorMsg;
  }
  
  let str = ``;
  outputContainer.classList.remove('invalid');

  return `<p>${convertToRoman(num)}</p>`;
  
};

const convertNumber = () => {
  const inputNum = parseFloat(numberInput.value);

  let outputStr = obtainOutput(inputNum);
  
  outputContainer.innerHTML = outputStr;
  outputContainer.classList.remove('hidden');
  numberInput.value = "";
};

convertButton.addEventListener("click", convertNumber);
numberInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") convertNumber();
});
