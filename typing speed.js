let data_level,
  default_level = "Choose Level",
  default_seconds = 0,
  counter = 1;

document.querySelector(".start").onclick = function () {
  document.querySelector(".start").style.display = "none";
  data_level = prompt("Choose Level For Test Easy , Normal Or Hard ?").trim();
  default_level = data_level.toLowerCase();
  default_seconds = levels[default_level];
  input.focus();
  generate_words();
  play();
};

let input = document.querySelector(".input-field input");
input.onpaste = function () {
  return false;
};

const words = [
  "Hello",
  "Programming",
  "Code",
  "Javascript",
  "Town",
  "Country",
  "Testing",
  "Youtube",
  "Linkedin",
  "Twitter",
  "Github",
  "Leetcode",
  "Internet",
  "Python",
  "Scala",
  "Destructuring",
  "Paradigm",
  "Styling",
  "Cascade",
  "Documentation",
  "Coding",
  "Funny",
  "Working",
  "Dependencies",
  "Task",
  "Runner",
  "Roles",
  "Test",
  "Rust",
  "Playing",
];

let levels = {
  easy: 5,
  normal: 3,
  hard: 2,
};

let level = document.querySelector(".level p");
level.innerHTML = `Your are playing on <span>[${default_level}]</span> level & you have
          <span>[${default_seconds}]</span> seconds to type the word`;

let word = document.querySelector(".words");
let timer = document.querySelector("footer .timer");
let word_written = document.querySelector(".word-written");
timer.innerHTML = `Time Left : <span>${default_seconds}</span> seconds`;

function generate_words() {
  let index_random_word = Math.floor(Math.random() * words.length);

  word_written.style.display = "block";
  let paragrarh = document.createElement("p");
  let random_word = document.createTextNode(words[index_random_word]);
  paragrarh.appendChild(random_word);
  word_written.appendChild(paragrarh);

  word.innerHTML = "";

  words.forEach(function (element) {
    let spans = document.createElement("span");
    spans.appendChild(document.createTextNode(element));
    word.appendChild(spans);
  });

  words.splice(index_random_word, 1);
}

function play() {
  let score = document.querySelector("footer .score");

  let timer_left = setInterval(function () {
    if (default_seconds === 0) {
      default_seconds = levels[default_level];
      timer.innerHTML = `Time Left : <span>${default_seconds}</span> seconds`;
      clearInterval(timer_left);

      if (
        word_written.textContent.toLowerCase() !== input.value.toLowerCase() ||
        input.value.toLowerCase() === ""
      ) {
        document.querySelector(".fail").style.display = "block";
      } else {
        score.innerHTML = `Score : <span>${counter++}</span> from <span> 30 </span>`;
        if (words.length > 0) {
          word_written.innerHTML = "";
          generate_words();
          play();
        } else {
          document.querySelector(".good").style.display = "block";
        }
      }
      input.value = "";
    } else {
      timer.innerHTML = `Time Left : <span>${default_seconds--}</span> seconds`;
    }
  }, 1000);
}
