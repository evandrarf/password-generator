const formElement = document.querySelector("[data-checklist-container]");
const passResult = document.querySelector("[data-pass-result]");
const copyButton = document.querySelector("[data-copy-clipboard]");
const alertContainer = document.querySelector("[data-alert-container]");

formElement.addEventListener("submit", generatePassword);

copyButton.addEventListener("click", copyToClipboard);

function copyToClipboard() {
  const copyText = passResult.innerText;

  if (copyText.toLowerCase() === "password result") return showAlert("Please generate a password first");
  navigator.clipboard.writeText(copyText).then(() => showAlert("Copied to clipboard"));
}

function showAlert(message) {
  const alert = document.createElement("div");
  alert.classList.add("alert");
  alert.innerText = message;
  alertContainer.prepend(alert);
  setTimeout(() => alert.classList.add("hide"), 2000);
  alert.addEventListener("transitionend", () => alert.remove());
}

function generatePassword(e) {
  e.preventDefault();
  const passwordLength = document.getElementById("pass-length").value;
  const includeUpperCase = document.getElementById("include-uppercase").checked;
  const includeNumbers = document.getElementById("include-numbers").checked;
  const includeSymbols = document.getElementById("include-symbols").checked;

  const password = generatePasswordOptions(passwordLength, includeUpperCase, includeNumbers, includeSymbols);
  passResult.innerText = password;
}

function generatePasswordOptions(length, uppercase, numbers, symbols) {
  let password = "";
  const LOWERCASE = "abcdefghijklmnopqrstuvwxyz";
  const UPPERCASE = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const NUMBERS = "0123456789";
  const SYMBOLS = "!@#$%^&*()";

  const passwordType = LOWERCASE + (uppercase ? UPPERCASE : "") + (numbers ? NUMBERS : "") + (symbols ? SYMBOLS : "");

  for (let i = 0; i < length; i++) {
    password += passwordType.charAt(Math.floor(Math.random() * passwordType.length));
  }

  return password;
}
