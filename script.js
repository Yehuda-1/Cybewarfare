// THEME
function toggleTheme() {
  document.body.classList.toggle("light-mode");

  localStorage.setItem(
    "theme",
    document.body.classList.contains("light-mode") ? "light" : "dark"
  );
}

if (localStorage.getItem("theme") === "light") {
  document.body.classList.add("light-mode");
}

// CHAPTER LOAD
const params = new URLSearchParams(window.location.search);
const ch = params.get("ch");

// BOOKMARK
function bookmarkChapter() {
  localStorage.setItem("lastChapter", ch);
  document.getElementById("bookmarkStatus").innerText = "Disimpan!";
}

// KOMENTAR
function addComment() {
  const input = document.getElementById("commentInput");
  if (!input.value) return;

  let comments = JSON.parse(localStorage.getItem("comments_" + ch)) || [];

  comments.push(input.value);

  localStorage.setItem("comments_" + ch, JSON.stringify(comments));

  input.value = "";
  displayComments();
}

function displayComments() {
  const list = document.getElementById("commentList");
  if (!list) return;

  list.innerHTML = "";

  let comments = JSON.parse(localStorage.getItem("comments_" + ch)) || [];

  comments.forEach(c => {
    const div = document.createElement("div");
    div.className = "comment-item";
    div.innerText = c;
    list.appendChild(div);
  });
}

displayComments();

const last = localStorage.getItem("lastChapter");

if (last && document.getElementById("resume")) {
  document.getElementById("resume").innerHTML =
    `<a href="chapter.html?ch=${last}">Lanjut Baca Chapter ${last}</a>`;
}

