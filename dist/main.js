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
function msg() {
    const section = document.querySelector("#message");
    section.innerHTML = `
        <p class="msg">
            Válassza ki a kilistázni kivánt kontinenst!
        </p>`;
}
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
////////////////////////////////////////////////////////////////////////////////////
/* function clearMsg() {
    const section = document.querySelector("#message") as HTMLDivElement;
    const buttons = document.querySelectorAll(".nav-item");
    buttons.forEach( btn => {
        btn.addEventListener("click", () => {
            section.innerHTML = ``;
        }
    )});
}  */
//clearMsg();
////////////////////////////////////////////////////////////////////////////////////
function renderCountries(cData) {
    const cards = document.querySelector(".cards");
    cards.innerHTML = cData.map(c => `
        <li class="card">${c.translations.hun.common}<br>${getTime}</li>
        ` // a timezones-t át kell írni a számoló function nevére, ha kész lesz, hogy a pontos időt mutassa, ne csak a zónát c.timezones.at(0)
    ).join();
}
function getTime(offset) {
    // pl: "UTC+01:00", "UTC-03:30"
    const match = offset.match(/^UTC([+-])(\d{2}):(\d{2})$/);
    if (!match) {
        throw new Error("Hibás formátum: " + offset);
    }
    const sign = match[1]; // + vagy -
    const hours = Number(match[2]);
    const minutes = Number(match[3]);
    const totalMinutes = hours * 60 + minutes;
    const signedMinutes = sign === "+" ? totalMinutes : -totalMinutes;
    const now = new Date();
    // aktuális UTC idő ms-ben
    const utcMs = now.getTime() +
        now.getTimezoneOffset() * 60_000;
    return new Date(utcMs + signedMinutes * 60_000);
}
document.addEventListener("DOMContentLoaded", () => {
    msg();
});
export {};
//# sourceMappingURL=main.js.map