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