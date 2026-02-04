function msg(): void{
    const section = document.querySelector("#message") as HTMLDivElement;
    section.innerHTML = `
        <p class="msg">
            Válassza ki a kilistázni kivánt kontinenst!
        </p>`;
}

document.addEventListener("DOMContentLoaded", () => {
    msg()
});

function clearMsg() {
    const section = document.querySelector("#message") as HTMLDivElement;
    const buttons = document.querySelectorAll(".nav-item");
    buttons.forEach( btn => {
        btn.addEventListener("click", () => {
            section.innerHTML = ``;
        }
    )});
} 











clearMsg();
























