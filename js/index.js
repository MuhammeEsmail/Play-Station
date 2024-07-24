const playstations = JSON.parse(localStorage.getItem('playstations')) || [
  {
    id: 1,
    name: "PlayStation 1",
    isOccupied: false,
    startTime: null,
    endTime: null,
  },
  {
    id: 2,
    name: "PlayStation 2",
    isOccupied: false,
    startTime: null,
    endTime: null,
  },
  {
    id: 3,
    name: "PlayStation 3",
    isOccupied: false,
    startTime: null,
    endTime: null,
  },
  {
    id: 4,
    name: "PlayStation 4",
    isOccupied: false,
    startTime: null,
    endTime: null,
  },
  {
    id: 5,
    name: "PlayStation 5",
    isOccupied: false,
    startTime: null,
    endTime: null,
  },
  {
    id: 6,
    name: "PlayStation 6",
    isOccupied: false,
    startTime: null,
    endTime: null,
  },
  {
    id: 7,
    name: "PlayStation 7",
    isOccupied: false,
    startTime: null,
    endTime: null,
  },
  {
    id: 8,
    name: "PlayStation 8",
    isOccupied: false,
    startTime: null,
    endTime: null,
  },
];

const playstationsContainer = document.querySelector(".playstations-container");

function renderPlaystations() {
  playstationsContainer.innerHTML = "";
  playstations.forEach((playstation) => {
    const playstationElement = document.createElement("div");
    playstationElement.classList.add("playstation", "col-md-5", "shadow");

    const h3 = document.createElement("h3");
    h3.textContent = playstation.name;
    playstationElement.appendChild(h3);

    const statusElement = document.createElement("div");
    statusElement.classList.add("status");

    if (playstation.isOccupied) {
      const startTime = new Date(playstation.startTime);
      const endTime = playstation.endTime ? new Date(playstation.endTime) : null;
      const startTimeStr = startTime.toLocaleString();
      const endTimeStr = endTime ? endTime.toLocaleString() : "-";
      const duration = endTime ? endTime.getTime() - startTime.getTime() : new Date().getTime() - startTime.getTime();

      const startTimeElement = document.createElement("p");
      startTimeElement.textContent = `بدء اللعب: ${startTimeStr}`;
      statusElement.appendChild(startTimeElement);

      const endTimeElement = document.createElement("p");
      endTimeElement.textContent = `انتهاء اللعب: ${endTimeStr}`;
      statusElement.appendChild(endTimeElement);

      const durationElement = document.createElement("p");
      durationElement.textContent = `مدة اللعب: ${(duration / 1000 / 60).toFixed(2)} دقيقة`;
      statusElement.appendChild(durationElement);
    } else {
      const notOccupiedElement = document.createElement("p");
      notOccupiedElement.textContent = "غير مشغول";
      statusElement.appendChild(notOccupiedElement);
    }
    playstationElement.appendChild(statusElement);

    const controlsDiv = document.createElement("div");
    controlsDiv.classList.add("controls");

    const startSessionButton = document.createElement("button");
    startSessionButton.textContent = "بدء جلسة";
    startSessionButton.addEventListener("click", () => startSession(playstation));
    if (playstation.isOccupied) {
      startSessionButton.disabled = true;
    }
    controlsDiv.appendChild(startSessionButton);

    const endSessionButton = document.createElement("button");
    endSessionButton.textContent = "إنهاء جلسة";
    endSessionButton.addEventListener("click", () => endSession(playstation));
    if (!playstation.isOccupied) {
      endSessionButton.disabled = true;
    }
    controlsDiv.appendChild(endSessionButton);

    const resetButton = document.createElement("button");
    resetButton.textContent = "إعادة تعيين";
    resetButton.addEventListener("click", () => reset(playstation));
    controlsDiv.appendChild(resetButton);

    playstationElement.appendChild(controlsDiv);

    playstationsContainer.appendChild(playstationElement);
    $(".controls button").addClass("btn btn-primary");
    $(".playstation").addClass("rounded-3");
  });
}

function saveToLocalStorage() {
  localStorage.setItem('playstations', JSON.stringify(playstations));
}

function startSession(playstation) {
  if (!playstation.isOccupied) {
    playstation.isOccupied = true;
    playstation.startTime = new Date().toISOString();
    saveToLocalStorage();
    renderPlaystations();
  } else {
    alert("جهاز البلايستيشن مشغول حاليًا");
  }
}

function endSession(playstation) {
  if (playstation.isOccupied) {
    playstation.endTime = new Date().toISOString();
    saveToLocalStorage();
    renderPlaystations();
  } else {
    alert("جهاز البلايستيشن غير مشغول حاليًا");
  }
}

function reset(playstation) {
  playstation.isOccupied = false;
  playstation.startTime = null;
  playstation.endTime = null;
  saveToLocalStorage();
  renderPlaystations();
}

renderPlaystations();
