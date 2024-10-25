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
