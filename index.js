const mainWrapper = document.body.appendChild(document.createElement("div"));
const wrapper = document.body.appendChild(document.createElement("div"));
mainWrapper.setAttribute('id', 'mainWrapper')
mainWrapper.appendChild(wrapper)

const template = `
<button id= "signIn">signIn</button>
  <div id = 'form'>

    <input type="text" id = "log" placeholder = "enter you name">
    <input type="password" id = "password" placeholder = "enter you password">
    <button id ="button">Sent </button>
  </div>
`;
wrapper.setAttribute("class", "wrapper");
wrapper.innerHTML = template;

const modal = document.body.appendChild(document.createElement("div"));
modal.classList.add("modalWrapper");
const template2 = `
  <div class="modal">
  <p id="p"></p>
  <button id="modalClose">X</button>
  </div>
`;
modal.innerHTML = template2;
const modalClose = document.getElementById("modalClose");
modalClose.onclick = function (event) {
  modal.style.visibility = "hidden";
  clean()
};

const obj = {};
[
  "signIn",
  "form",
  "log",
  "password",
  "button",
  "p",
  "overlay",
  "text",
  "close",
].forEach((item) =>
  Object.assign(obj, { [item]: document.getElementById(item) })
);
console.log(obj)

obj.signIn.onclick = function (event) {
  obj.form.style.opacity = obj.form.style.opacity === "0" ? "1" : "0";
  obj.signIn.style.display =
    obj.signIn.style.display === "block" ? "none" : "block";
};

async function getUserPasword() {
  const [{ password }] = await (
    await fetch(`http://localhost:3000/user/?login=${obj.log.value}`)
  ).json();
  return password;
}
//получение пароля, ( деструкторизации). поиск  по сёч кваири  по логину, полученнй прмис от фетча
async function check() {
  return (
    await (
      await fetch(`http://localhost:3000/user/?login=${obj.log.value}`)
    ).json()
  ).length;
}
//получение пароля, ( деструкторизации)
obj.button.onclick = async function (event) {
  (await check())
    ? getUserPasword().then((resp) => {
        obj.password.value === resp
          ? result("you are in the system")
          : result("sorry, but the password is not correct!");
      })
    : result("this user is absent, please register, or check your login");
};

function result(mes) {
  modal.style.visibility = "visible";
  obj.p.innerText = mes;
}
function clean(){
  document.querySelectorAll('input').forEach(item => Object.assign(item, { value:''}))
}