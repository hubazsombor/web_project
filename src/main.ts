
interface RespType{
    translations: {
        hun: {
            common: string;
        }
    }
    continents: string;
    timezones: string;
}

async function getAll(path: string): Promise<RespType[]> {
    try{
        const response = await fetch(path);
        if (!response.ok) throw new Error("Request error.");

        return await response.json();
    } catch(error) {
        console.error(`Error: ${error}`);
        return [];
    }
}

const buttons = document.querySelectorAll("li a") as NodeListOf<HTMLAnchorElement>;

buttons.forEach(button => {
    button.addEventListener("click", async () => {
        const region = button.getAttribute("value");

        const url = `https://restcountries.com/v3.1/region/${region}`;
        const data = await getAll(url);
        console.log(url);
        console.log(data);
    });
});

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
























