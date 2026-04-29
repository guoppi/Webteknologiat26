const mediaData = [
    { src: "https://picsum.photos/id/40/1300/450", title: "Tesla Kissa" },
    { src: "https://picsum.photos/id/237/1300/450", title: "Mustis Koira" },
    { src: "https://picsum.photos/id/93/1300/450", title: "Caroline Sada" },
    { src: "https://picsum.photos/id/0/1300/450", title: "Mac" },
    { src: "https://picsum.photos/id/15/1300/450", title: "Vesiputous" },
    { src: "https://picsum.photos/id/16/1300/450", title: "meri" }
];

let index = 0;
let intervalId = null;

const savedIndex = localStorage.getItem("mediaIndex");
if (savedIndex !== null) {
    index = parseInt(savedIndex);
}

function showItem() {
    const item = mediaData[index];

    // jQuery fade-efekti
    $("#media-img").fadeOut(200, function () {
        $("#media-img").attr("src", item.src).fadeIn(200);
    });

    $("#media-title").text(item.title);

    // Tallenna localStorageen
    localStorage.setItem("mediaIndex", index);
}

function nextItem() {
    index++;
    if (index >= mediaData.length) index = 0;
    showItem();
}

function prevItem() {
    index--;
    if (index < 0) index = mediaData.length - 1;
    showItem();
}

function play() {
    stop(); // varmuuden vuoksi
    intervalId = setInterval(nextItem, 2000);
}

function stop() {
    clearInterval(intervalId);
}

function renderAllImages() {
    const container = document.getElementById("image-container");
    container.innerHTML = "";

    mediaData.forEach(item => {
        const img = document.createElement("img");
        img.src = item.src;
        img.alt = item.title;
        container.appendChild(img);
    });
}


window.onload = function () {
    showItem();

    renderAllImages();

    $("#listBtn").click(function () {
        $("#image-container")
            .removeClass("grid-container")
            .addClass("list-container");
    });

    $("#gridBtn").click(function () {
        $("#image-container")
            .removeClass("list-container")
            .addClass("grid-container");
    });
};

