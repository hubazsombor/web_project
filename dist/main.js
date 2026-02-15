/////////////// SAJÁT TÍPUS + ASYNC ///////////////////
async function getAll(path) {
    try {
        const response = await fetch(path);
        if (!response.ok)
            throw new Error("Request error.");
        return await response.json();
    }
    catch (error) {
        console.error(`Error: ${error}`);
        return [];
    }
}
/////////// KEZDŐ ÜZENET ///////////////
function msg() {
    const section = document.querySelector("#message");
    section.innerHTML = `
        <p class="msg">
            Válassza ki a kilistázni kivánt kontinenst!
        </p>`;
}
/////////// VÁLASZTOTT KONTINENS RENDERELÉSE, KEZDŐ ÜZENET TÖRLÉSE ///////////
const buttons = document.querySelectorAll("li a");
buttons.forEach(button => {
    button.addEventListener("click", async () => {
        const region = button.getAttribute("value");
        const url = `https://restcountries.com/v3.1/region/${region}`;
        const data = await getAll(url);
        renderCountries(data);
        const section = document.querySelector("#message");
        section.innerHTML = ``;
        console.log(url);
        console.log(data);
    });
});
////////// API VÁLASZÁNAK MEGJELENÍTÉSE /////////////////////
function renderCountries(data) {
    const cards = document.querySelector(".cards");
    cards.innerHTML = data.map(c => `
        <li class="card">
            <h4>${c.translations.hun.common}</h4> 
            <p> <img src="${c.flags.png}" </p> <br> 
            <p>idő: ${getTime(c.timezones.at(0) ?? "UTC")}</p>
        </li>
    `).join("");
}
/////////// A KAPOTT UTC OFFSET ÁTSZÁMOLÁSA AKTUÁLIS IDŐBE (PL. "UTC+01:00" )////////////////
function getTime(offset) {
    const match = offset.match(/UTC([+-])(\d{2}):(\d{2})/);
    if (!match)
        return "Ismeretlen idő";
    // Destrukturáljuk a csoportokat: az első elem a teljes egyezés, azt kihagyjuk (_)
    const [, signChar, hoursStr, minutesStr] = match;
    const sign = signChar === "+" ? 1 : -1;
    const hours = parseInt(match[2] ?? "0");
    const minutes = parseInt(match[3] ?? "0");
    const totalMinutes = sign * (hours * 60 + minutes);
    const now = new Date();
    const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
    const targetTime = new Date(utc + totalMinutes * 60000);
    return targetTime.toLocaleTimeString("hu-HU", {
        hour: "2-digit",
        minute: "2-digit"
    });
}
document.addEventListener("DOMContentLoaded", () => {
    msg();
});
export {};
//# sourceMappingURL=main.js.map