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

let rawLines = [
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
            "GRA",
            "JDI",
            "SMA",
            "SCR",
            "JUR",
            "AUT",
            "PIN",
            "GRA",
            "MVN"
        ]
    }
]

function renderLines(lines) {
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

    renderStations(lines)
}

function renderStations(lines) {
    const stationsElement = document.getElementById("stations");

    while (stationsElement.firstChild) {
        stationsElement.removeChild(stationsElement.firstChild)
    }

    for (const line of lines) {
        if (!line.selected) {
            continue
        }

        for (let index = 0; index < line.stations.length; index++) {
            const station = line.stations[index]
            const stationElement = document.createElement("div");
            stationElement.className = "station"
            if (index == 0) {
                stationElement.className = "station firstStation"
            }
            if (index == (line.stations.length - 1)) {
                stationElement.className = "station lastStation"
            }

            stationElement.innerHTML = `
                <input type="checkbox" id="${station.toLocaleLowerCase()}" value="${station}" />
                <label for="${station.toLocaleLowerCase()}">${station}</label>
            `

            stationsElement.appendChild(stationElement);
        }
    }
}

function reload() {
    navigate(".")
}

renderLines(rawLines)
renderStations(rawLines)