function navigate(path) {
    window.location.href = path;
}

const logged = localStorage.getItem('logged');

if (logged !== 'true') {
    navigate("../index.html")
}

function back() {
    navigate("../pesquisa/index.html")
}

const linesKey = "all-lines";

function getLines() {
    return JSON.parse(localStorage.getItem(linesKey));
}

function saveLines(lines) {
    return localStorage.setItem(linesKey, JSON.stringify(lines));
}

function validateLocalStorage() {
    const linesItem = localStorage.getItem(linesKey);

    if (linesItem) {
        return;
    }

    const lines = [
        {
            lineNumber: "8",
            selected: false,
            stations: [
                "AMB",
                "AMT",
                "SAR",
                "ITA",
                "ECA",
                "SCO",
                "JAN",
                "JBE",
                "BAR",
                "AJO",
                "STA",
                "CAR",
                "GMC",
                "QUI",
                "CSA",
                "OSA",
                "PRA",
                "ILE",
                "DDM",
                "LAP",
                "AGB",
                "PBF",
                "JPR"
            ]
        },
        {
            lineNumber: "9",
            selected: true,
            stations: [
                "OSA",
                "PRA",
                "CEA",
                "VLJ",
                "CIU",
                "PIN",
                "HER",
                "CIJ",
                "VOL",
                "BER",
                "MOR",
                "GRJ",
                "JDI",
                "SMA",
                "SCR",
                "JUR",
                "AUT",
                "PRN",
                "GRA",
                "MVN"
            ]
        }
    ]

    saveLines(lines)
}

function renderLines() {
    const lines = getLines()

    const linesInputs = document.getElementById("linesInputs")

    for (const line of lines) {
        const lineInput = document.createElement("input")
        lineInput.type = "radio";
        lineInput.id = `linha${line.lineNumber}`
        lineInput.name = "linhas"
        lineInput.value = line.lineNumber

        if (line.selected) {
            lineInput.focus();
            lineInput.checked = true
        }

        const lineLabel = document.createElement("label")
        lineLabel.innerText = line.lineNumber
        lineLabel.htmlFor = `linha${line.lineNumber}`
        lineLabel.id = `linha${line.lineNumber}Label`
        lineLabel.className = "shadow"
        lineLabel.onclick = function () {
            changeStation(line.lineNumber)
        }
        linesInputs.appendChild(lineInput)
        linesInputs.appendChild(lineLabel)
    }
}

function changeStation(lineNumber) {
    const rawLines = getLines()
    const lines = [];

    for (let index = 0; index < rawLines.length; index++) {
        const line = rawLines[index];

        if (line.lineNumber == lineNumber) {
            line.selected = true
        } else {
            line.selected = false
        }

        lines.push(line)
    }

    saveLines(lines)
    renderStations()
    selectAllStations()
}

function renderStations() {
    const lines = getLines()
    const stationsElement = document.getElementById("stations");

    // Remove all items from stations - refresh
    while (stationsElement.firstChild) {
        stationsElement.removeChild(stationsElement.firstChild)
    }

    const selectedLine = lines.find((line) => line.selected)

    for (let index = 0; index < selectedLine.stations.length; index++) {
        const station = selectedLine.stations[index]
        const stationElement = document.createElement("div");
        stationElement.className = "station"
        if (index == 0) {
            stationElement.className = "station firstStation"
        }
        if (index == (selectedLine.stations.length - 1)) {
            stationElement.className = "station lastStation"
        }

        stationElement.innerHTML = `
                <input type="checkbox" id="${station}" value="${station}" />
                <label id="${station}-label" onclick="selectStation(this.id)" for="${station}">${station}</label>
            `

        stationsElement.appendChild(stationElement);
    }

}

function selectStation(id) {
    const selectAllStationsElement = document.getElementById("selectAllStations")
    selectAllStationsElement.checked = false

    const clickedStation = id.split("-label")[0]

    unselectStationsBeforeClicked(clickedStation)
    selectClickedStation(clickedStation)
}

function unselectStationsBeforeClicked(clickedStation) {
    const lines = getLines()

    const selectedLine = lines.find((line) => line.selected)

    const stations = selectedLine.stations

    const stationsBeforeClickedStation = []
    for (let index = 0; index < stations.length; index++) {
        const currentStation = stations[index]

        if (currentStation === clickedStation) {
            break
        }

        stationsBeforeClickedStation.push(currentStation)
    }

    stationsBeforeClickedStation.forEach((station) => {
        const stationElement = document.getElementById(station)

        stationElement.checked = false
    })
}

function selectClickedStation(clickedStation) {
    const stationElement = document.getElementById(clickedStation)

    stationElement.checked = false
}

function selectAllStations() {
    const selectAllStationsElement = document.getElementById("selectAllStations")
    selectAllStationsElement.checked = true

    const lines = getLines()

    const selectedLine = lines.find((line) => line.selected)

    const stations = selectedLine.stations

    for (let index = 0; index < stations.length; index++) {
        const station = stations[index]

        const stationElement = document.getElementById(station)

        stationElement.checked = true
    }
}

function reload() {
    navigate(".")
}

function toDateInputValue(dateObject) {
    const local = new Date(dateObject);
    local.setMinutes(dateObject.getMinutes() - dateObject.getTimezoneOffset());
    return local.toJSON().slice(0, 10);
};

function setDefaultDate() {
    document.getElementById('dateInput').value = toDateInputValue(new Date());
}

setDefaultDate()
validateLocalStorage()
renderLines()
renderStations()
selectAllStations()
