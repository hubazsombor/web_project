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
    const cards = document.querySelector("#cards");
    cards.innerHTML = cData.map(c => `
        <li id="card">${c.translations.hun.common}<br>${c.timezones.at(0)}</li>
        `).join();
}
document.addEventListener("DOMContentLoaded", () => {
    msg();
});
export {};
//# sourceMappingURL=main.js.map