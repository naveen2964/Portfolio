const input = document.getElementById("terminal-input");
const output = document.getElementById("terminal-output");
const cursor = document.getElementById("cursor");
const terminalWrapper = document.getElementById("terminal-wrapper");
const photoPanel = document.getElementById("photo-panel");
const zsPanel = document.getElementById("zs-panel");

const typingSound = new Audio("src/Audio/typing.mp3");
typingSound.volume = 0.4;
typingSound.loop = true;

const bgMusic = new Audio("src/Audio/among-us.mp3");
bgMusic.volume = 0.5;
bgMusic.loop = true;

let isMusicPlaying = false;
let idleTimer;
let commandHistory = [];
let historyIndex = -1;
let isTyping = false;
let typingInterval = null;

const shortcuts = {
  1: "profile",
  2: "skills",
  3: "projects",
  4: "education",
  5: "experience",
  6: "location",
  7: "contact",
  8: "resume",
};

const commandCorrections = {
  profle: "profile",
  resum: "resume",
  helo: "help",
  contat: "contact",
  loction: "location",
  educaton: "education",
  experince: "experience",
};

window.addEventListener(
  "click",
  () => {
    if (isMusicPlaying) {
      bgMusic.play().catch(() => {});
    }
  },
  { once: true }
);

const musicToggle = document.createElement("button");
musicToggle.textContent = "🔇 Music Off";
musicToggle.id = "music-toggle";
document.body.appendChild(musicToggle);

musicToggle.addEventListener("click", () => {
  if (isMusicPlaying) {
    bgMusic.pause();
    musicToggle.textContent = "🔇 Music Off";
  } else {
    bgMusic.play();
    musicToggle.textContent = "🔊 Music On";
  }
  isMusicPlaying = !isMusicPlaying;
});

const commands = {
  help: `Available commands:\n  1. profile\n  2. skills\n  3. projects\n  4. education\n  5. experience\n  6. location\n  7. contact\n  8. resume\n  - clear\n  - sus\n  - whoami\n  - ls\n  - cat readme.txt`,
  whoami: `You are an awesome visitor exploring Naveen's portfolio 👨‍🚀`,
  ls: `Documents  Projects  readme.txt  crewmates.md`,
  "cat readme.txt": `Welcome to my interactive terminal portfolio.\nType 'help' to see available commands.`,
};

function formatLoginTime() {
  const date = new Date();
  return `Last login: ${date.toDateString().replace(/\s+/g, " ")} ${
    date.toTimeString().split(" ")[0]
  } on console`;
}

function getTemplateText(id) {
  const template = document.getElementById(`${id}-template`);
  return (
    template?.content?.textContent.trim() ||
    `Error: No data found for command '${id}'.`
  );
}

function typeOutput(text, callback, { silent = false } = {}) {
  let i = 0;
  isTyping = true;
  const len = text.length;
  let delay =
    len > 800 ? 3 : len > 600 ? 6 : len > 400 ? 12 : len > 200 ? 20 : 40;

  if (!silent) {
    typingSound.currentTime = 0;
    typingSound.play();
  }

  clearInterval(typingInterval);
  typingInterval = setInterval(() => {
    if (i < text.length) {
      output.innerHTML += text.charAt(i);
      output.scrollTop = output.scrollHeight;
      i++;
    } else {
      clearInterval(typingInterval);
      isTyping = false;
      typingSound.pause();
      typingSound.currentTime = 0;
      callback?.();
    }
  }, delay);
}

function skipTyping() {
  if (isTyping) {
    clearInterval(typingInterval);
    typingSound.pause();
    typingSound.currentTime = 0;
    isTyping = false;
  }
}

function updatePrompt() {
  const promptSpan = document.querySelector(".prompt");
  promptSpan.innerHTML = "(base) naveen@Naveens-MacBook-Air ~ %";
}

function resetIdleTimer() {
  clearTimeout(idleTimer);
  idleTimer = setTimeout(() => {
    typeOutput(
      "\n[Idle] Type 'help' to get started or explore with 'ls'.\n",
      null,
      { silent: true }
    );
  }, 30000);
}

let isDragging = false;
let dragOffset = { x: 0, y: 0 };

document
  .querySelector(".terminal-header")
  .addEventListener("mousedown", (e) => {
    isDragging = true;
    dragOffset.x = e.clientX - terminalWrapper.offsetLeft;
    dragOffset.y = e.clientY - terminalWrapper.offsetTop;
  });

window.addEventListener("mousemove", (e) => {
  if (!isDragging) return;
  terminalWrapper.style.left = `${e.clientX - dragOffset.x}px`;
  terminalWrapper.style.top = `${e.clientY - dragOffset.y}px`;
});

window.addEventListener("mouseup", () => {
  isDragging = false;
});

window.addEventListener("DOMContentLoaded", () => {
  output.innerHTML = `${formatLoginTime()}\n\nType 'help' to get started.\n`;
  updatePrompt();
  resetIdleTimer();

  // ✅ Mobile-specific enhancements
  input.addEventListener("click", () => input.focus());
  input.addEventListener("focus", () => {
    setTimeout(() => {
      input.scrollIntoView({ behavior: "smooth", block: "end" });
    }, 100);
  });
});

input.addEventListener("keydown", function (e) {
  resetIdleTimer();
  if (isTyping) skipTyping();

  if (e.key === "ArrowUp") {
    if (historyIndex > 0) input.innerText = commandHistory[--historyIndex];
    return;
  }

  if (e.key === "ArrowDown") {
    if (historyIndex < commandHistory.length - 1) {
      input.innerText = commandHistory[++historyIndex];
    } else {
      input.innerText = "";
    }
    return;
  }

  if (e.key === "Enter") {
    e.preventDefault();
    let command = input.innerText.trim();
    if (!command) return;

    if (shortcuts[command]) command = shortcuts[command];
    if (commandCorrections[command]) {
      const original = command;
      command = commandCorrections[command];
      output.innerHTML += `\n[!] Did you mean '${command}' instead of '${original}'? Proceeding...\n`;
    }

    commandHistory.push(command);
    historyIndex = commandHistory.length;
    output.innerHTML += `\n<span class="prompt">(base) naveen@Naveens-MacBook-Air ~ %</span> ${command}\n`;

    if (command === "clear") {
      output.innerHTML = `${formatLoginTime()}\n\nType 'help' to get started.\n`;
    } else if (command === "resume") {
      output.innerHTML += `<div class='cmd-link'><a href='src/resume.pdf' download>📄 Click here to download my resume</a></div>\n`;
    } else if (command === "contact") {
      const info = `Contact Info:\n  📧 Email   : vanganveenkumarreddy@gmail.com\n  📞 Phone   : +91 9347088155\n\nSocials:\n  🔗 LinkedIn : linkedin.com/in/naveenvanga\n  🐦 Twitter  : x.com/Naveen_foreal\n  📸 Instagram: instagram.com/naveen_foreal\n`;
      typeOutput(info, () => {
        const links = document.createElement("div");
        links.className = "cmd-link";
        links.innerHTML = `
          🔗 <a href='https://www.linkedin.com/in/naveenvanga/' target='_blank'>LinkedIn</a><br>
          🐦 <a href='https://x.com/Naveen_foreal' target='_blank'>Twitter</a><br>
          📸 <a href='https://www.instagram.com/naveen_foreal/' target='_blank'>Instagram</a>
        `;
        output.appendChild(links);
        output.scrollTop = output.scrollHeight;
      });
    } else if (commands[command]) {
      typeOutput(commands[command] + "\n");
    } else if (
      [
        "profile",
        "location",
        "skills",
        "projects",
        "experience",
        "education",
      ].includes(command)
    ) {
      if (command === "profile" && photoPanel) {
        photoPanel.classList.add("show");
        setTimeout(() => photoPanel.classList.remove("show"), 5000);
      }
      if (command === "experience" && zsPanel) {
        zsPanel.classList.add("show");
        setTimeout(() => zsPanel.classList.remove("show"), 5000);
      }
      typeOutput(getTemplateText(command) + "\n");
    } else {
      typeOutput(
        `Command not found: ${command}\nType "help" to see a list of valid commands.\n`
      );
    }

    input.innerText = "";
  }
});
