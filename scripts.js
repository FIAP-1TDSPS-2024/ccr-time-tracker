function navigate(path) {
  window.location.href = path;
}

const password = document.getElementById("password");
const email = document.getElementById("email");
const button = document.getElementById("loginSubmit");

password.addEventListener("keypress", function (event) {
  if (event.key == "Enter") {
    sendForm();
  }
});

function validateForm() {
  if (email.value !== "") {
    email.classList.remove("invalidLoginInput");
  }

  if (password.value !== "") {
    password.classList.remove("invalidLoginInput");
  }

  if (email.value !== "" && password.value !== "") {
    button.removeAttribute("disabled");
  } else {
    button.setAttribute("disabled", true);
  }
}

const correctPassword = "123456";
const correctEmail = "teste@fiap.com.br";

function sendForm() {
  if (email.value !== correctEmail || password.value !== correctPassword) {
    email.classList.add("invalidLoginInput");
    password.classList.add("invalidLoginInput");
  } else {
    email.classList.remove("invalidLoginInput");
    password.classList.remove("invalidLoginInput");
  }

  if (
    !email.classList.contains("invalidLoginInput") &&
    !password.classList.contains("invalidLoginInput")
  ) {
    navigate("./pesquisa/index.html");
  } else {
    popUp("Email ou senha incorretos. \nCorriga e tente novamente.");
  }
}

function popUp(text) {
  const popUp = document.getElementById("popUp");

  popUp.style.display = "flex";
  popUp.getElementsByTagName("p")[0].innerText = text;
}

function closePopUp() {
  const popUp = document.getElementById("popUp");

  popUp.style.display = "none";
}
