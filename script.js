const container = document.getElementById("typewriter-container");

let memes = [
  "your",
  "memes",
  "go",
  "here",
  "🧢🧢🧢"
];

const text = memes[Math.floor(Math.random() * memes.length)];

// random typing speed between 35 and 80ms
const typingSpeed = Math.floor(Math.random() * 35) + 35; 

function* iterateChars(str) {
  for (let i = 0; i < str.length; i++) {
    const char = str[i];

    if (char.match(/[\uD800-\uDBFF]/) && str[i + 1]) {
      const surrogatePair = char + str[++i];
      yield surrogatePair;
    } else {
      yield char;
    }
  }
}

const typeWriter = (text, container, iterator) => {
  const { value, done } = iterator.next();

  if (!done) {
    container.innerHTML += value;
    container.setAttribute("data-content", container.innerHTML);
    setTimeout(() => typeWriter(text, container, iterator), typingSpeed);
  } else {
    addCursor(container);
  }
};

const addCursor = (container) => {
  const span = document.createElement("span");
  span.classList.add("cursor", "blurred-text");
  span.innerHTML = "|";
  span.setAttribute("data-content", span.innerHTML);
  container.appendChild(span);
};

const iterator = iterateChars(text);
typeWriter(text, container, iterator);