const addBtn = document.querySelector(".add-btn");
const inputtext = document.querySelector(".input");
const list = document.querySelector(".list");
const singlelist = document.querySelector(".lis");
const allList = document.querySelector(".lists");
const trashbtn = document.querySelector(".btn-trash");
const check = document.querySelector(".btn-check");
let tasks = [];
let chtask = [];
const tform = document.querySelector(".myform");

(function () {
  // console.log(JSON.parse(window.localStorage.getItem("tasks")));
  if (!window.localStorage.getItem("tasks")) return;
  JSON.parse(window.localStorage.getItem("tasks")).forEach((element) => {
    tasks.push(element);
  });
  if (window.localStorage.getItem("done")) {
    JSON.parse(window.localStorage.getItem("done")).forEach((ele) =>
      chtask.push(ele)
    );
  }

  tasks.forEach((element) => {
    //console.log(element);
    if (window.localStorage.getItem("done").includes(element)) {
      allList.insertAdjacentHTML(
        "afterbegin",
        `  <li class="lis">
      <p class="para  para-line">${element}</p>
      <button class="btn btn-trash">
      ✗
      </button>
      <button class="btn btn-check">
      🗸
      </button>
    </li>`
      );
    } else {
      allList.insertAdjacentHTML(
        "afterbegin",
        `  <li class="lis">
    <p class="para">${element}</p>
    <button class="btn btn-trash">
    ✗
    </button>
    <button class="btn btn-check">
    🗸
    </button>
  </li>`
      );
    }
  });
  // console.log(tasks);
})();

tform.addEventListener("submit", function (e) {
  e.preventDefault();
  //console.log(inputtext.value);
  if (!inputtext.value) return alert("please enter some task");
  allList.insertAdjacentHTML(
    "afterbegin",
    `  <li class="lis">
    <p class="para">${inputtext.value}</p>
    <button class="btn btn-trash">
    ✗
    </button>
    <button class="btn btn-check">
    🗸
    </button>
  </li>`
  );
  // tasks.unshift(inputtext.value);
  tasks.push(inputtext.value);
  // console.log(tasks);
  inputtext.value = "";
  window.localStorage.setItem("tasks", JSON.stringify(tasks));
  // console.log(tasks);
  // console.log(window.localStorage.setItem("tasks", JSON.stringify(tasks)));
});

list.addEventListener("click", function (e) {
  if (e.target.classList.contains("btn-trash")) {
    e.target.closest(".lis").classList.add("hide-list");
    // console.log(e);
    const textin = e.target.closest(".lis").querySelector(".para").textContent;
    // console.log(textin);
    // console.log(tasks);
    const indextxt = tasks.indexOf(textin);
    //console.log(indextxt);
    if (indextxt !== -1) tasks.splice(indextxt, 1);
    //console.log(tasks);
    window.localStorage.setItem("tasks", JSON.stringify(tasks));
  }
});

list.addEventListener("click", function (e) {
  if (e.target.classList.contains("btn-check")) {
    e.target.closest(".lis").querySelector(".para").classList.add("para-line");

    if (
      e.target
        .closest(".lis")
        .querySelector(".para")
        .classList.contains("para-line")
    ) {
      const ch = tasks.indexOf(
        e.target.closest(".lis").querySelector(".para").textContent
      );
      // console.log(ch);
      chtask.push(tasks[ch]);
      // console.log(chtask);
      // console.log(tasks);

      window.localStorage.setItem("done", JSON.stringify(chtask));
    }
  }
});
// console.log(tasks);

document.querySelector(".clear").addEventListener("click", () => {
  localStorage.clear();
  tasks = [];
  allList.innerHTML = " ";
});
