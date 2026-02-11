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
const buttons = document.querySelectorAll("li a");
buttons.forEach(button => {
    button.addEventListener("click", async () => {
        const region = button.getAttribute("value");
        const url = `https://restcountries.com/v3.1/region/${region}`;
        const data = await getAll(url);
        console.log(url);
        console.log(data);
    });
});
function msg() {
    const section = document.querySelector("#message");
    section.innerHTML = `
        <p class="msg">
            Válassza ki a kilistázni kivánt kontinenst!
        </p>`;
}
document.addEventListener("DOMContentLoaded", () => {
    msg();
});
function clearMsg() {
    const section = document.querySelector("#message");
    const buttons = document.querySelectorAll(".nav-item");
    buttons.forEach(btn => {
        btn.addEventListener("click", () => {
            section.innerHTML = ``;
        });
    });
}
clearMsg();
export {};
//# sourceMappingURL=main.js.map