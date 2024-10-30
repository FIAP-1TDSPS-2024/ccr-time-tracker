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

const lines = [
    {
        lineNumber: "8",
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
            "MOR"
        ]
    }
]

function renderLines() {
    const linesInputs = document.getElementById("linesInputs")

    for (const line of lines) {
        const lineInput = document.createElement("input")
        lineInput.type = "radio";
        lineInput.id = `linha${line.lineNumber}`
        lineInput.name = "linhas"
        lineInput.value = line.lineNumber

        const lineLabel = document.createElement("label")
        lineLabel.innerText = line.lineNumber
        lineLabel.htmlFor = `linha${line.lineNumber}`
        lineLabel.id = `linha${line.lineNumber}Label`
        lineLabel.className = "shadow"

        linesInputs.appendChild(lineInput)
        linesInputs.appendChild(lineLabel)
    }
}

renderLines()