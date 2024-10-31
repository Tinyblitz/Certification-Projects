const checkButton = document.getElementById('check-btn');
const textField = document.getElementById('text-input');
const resultDiv = document.getElementById('result');

const updateString = str => {

  const regex = /[_\W\s]/g;
  str = str.replace(regex,'');
  return str;
}

const isPalindrome = str => {
  str = updateString(str).toLowerCase();
  console.log(str);
  let firstHalf = str.substring(0,str.length/2);
  let secondHalf = str.substring(str.length/2, str.length);
  
  if (firstHalf.length < secondHalf.length) secondHalf = secondHalf.slice(1);

  secondHalf = secondHalf.split('').reverse().join('');
  console.log(firstHalf + " " + secondHalf);

  return firstHalf === secondHalf;
  
}

const checkInput = () => {

  const textInput = textField.value;
  textField.value = "";

  if (!textInput) {
    alert("Please input a value");
    return;
  }

  let resultStr = `<b>${textInput}</b>`;

  if (isPalindrome(textInput)) resultStr += ` is a Palindrome`;
  else resultStr += ` is not a Palindrome`
  
  resultDiv.innerHTML = resultStr;
  
}

checkButton.addEventListener("click", checkInput);
