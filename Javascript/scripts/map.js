// Näytä oletuskartta sivun latautuessa
window.onload = function () {
    let defaultAddress = "Yliopistonkatu 36";
    let defaultCity = "Lappeenranta";

    let query = encodeURIComponent(defaultAddress + " " + defaultCity);
    let url = "https://www.google.com/maps?q=" + query + "&output=embed";

    document.getElementById("map-frame").src = url;
};

// Päivitä kartta kun käyttäjä painaa Hae
function updateMap() {
    let address = document.getElementById("addr-field").value;
    let city = document.getElementById("city-field").value;

    let query = encodeURIComponent(address + " " + city);
    let url = "https://www.google.com/maps?q=" + query + "&output=embed";

    document.getElementById("map-frame").src = url;
}
