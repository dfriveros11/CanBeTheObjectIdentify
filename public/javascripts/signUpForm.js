function insertUser() {
  const nameValue = document.getElementById("inputUsername").value;
  //const pwdValue = document.getElementById("inputPassword").value;
  const scoreValue = document.getElementById("inputScore").value;
  const data = { nameValue: nameValue, pwdValue: "", score: scoreValue };
  fetch("/signUp", {
    method: "POST", // or 'PUT'
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  }).then(res => res.json());
}

function goBack() {
  console.log("back");
  window.location.href = "index.html";
}
function appearOtherButton() {
  insertUser();
  console.log("appear");
  const backButton = document.getElementById("backButton");
  backButton.removeAttribute("style");
  const subButton = document.getElementById("subButton");
  subButton.setAttribute("style", "visibility:hidden");
}
// function exists(userName) {
//   //const d = { nameValue: nameValue };
//   console.log(userName);
//   const data = { nameValue: userName };
//   fetch("./getUser", {
//     method: "POST", // or 'PUT'
//     headers: {
//       "Content-Type": "application/json"
//     },
//     body: JSON.stringify(data)
//   })
//     .then(res => console.log(res.json()))
//     .catch(err => console.log(err));
// }
// const find = data => {
//   const ans = false;
//   const nameValue = document.getElementById("inputUsername").value;
//   data.forEach(user => {
//     if (user.userName == nameValue) {
//       ans = true;
//     }
//   });
//   return ans;
// };
