/////////////// SAJÁT TÍPUS + ASYNC ///////////////////

interface RespType{
    translations: {
        hun: {
            common: string;
        }
    }
    continents: string;
    timezones: string[];
    flags: {
        png: string;
    }
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

/////////// KEZDŐ ÜZENET ///////////////

function msg(): void{
    const section = document.querySelector("#message") as HTMLDivElement;
    section.innerHTML = `
        <p class="msg">
            Válassza ki a kilistázni kivánt kontinenst!
        </p>`;
}

/////////// VÁLASZTOTT KONTINENS RENDERELÉSE, KEZDŐ ÜZENET TÖRLÉSE ///////////

const buttons = document.querySelectorAll("li a") as NodeListOf<HTMLAnchorElement>;
buttons.forEach(button => {
    button.addEventListener("click", async () => {
        const region = button.getAttribute("value");
        const url = `https://restcountries.com/v3.1/region/${region}`;
        const data = await getAll(url);
        renderCountries(data);

        const section = document.querySelector("#message") as HTMLDivElement;
        section.innerHTML = ``;

        console.log(url);
        console.log(data);
    });
});

////////// API VÁLASZÁNAK MEGJELENÍTÉSE /////////////////////

function renderCountries(data: RespType[]) {
    const cards = document.querySelector(".cards") as HTMLUListElement;

    cards.innerHTML = data.map(c => `
        <li class="card">
            <h4>${c.translations.hun.common}</h4> 
            <p> <img src="${c.flags.png}" </p> <br> 
            <p>idő: ${getTime(c.timezones.at(0) ?? "UTC")}</p>
        </li>
    `).join("");
}

/////////// A KAPOTT UTC OFFSET ÁTSZÁMOLÁSA AKTUÁLIS IDŐBE (PL. "UTC+01:00" )////////////////

function getTime(offset: string): string {
    const match = offset.match(/UTC([+-])(\d{2}):(\d{2})/); //megnézem, hogy a kapott timezone megfelelő formátumú pl.: UTC+02:30

    if (!match) return "Ismeretlen idő"; //ha valamiért nem megfelelő a formátuma

    // Destrukturáljuk a csoportokat: az első elem a teljes egyezés, azt kihagyjuk (_)
    const [, signChar, hoursStr, minutesStr] = match; //a const match-ben szétszedem a string-et elemekre

    const sign = signChar === "+" ? 1 : -1; //ha a kiadott string előjele "+" akkor 1-es szorzom, ha "-" akkor -1-el
    const hours = parseInt(match[2] ?? "0");//a szétszedett match elemeinek indexére hivatkozok, itt átalakítom a string-et number-ré és, ha valamiért nem felel meg a formátumnak akkor null-t vagy undefined-et dob
    const minutes = parseInt(match[3] ?? "0");
    const totalMinutes = sign * (hours * 60 + minutes); //az órát és a percet átváltjuk egy darab percre, majd rátesszük a helyes előjelet.

    const now = new Date(); //aktuális idő MAO-n
    const utc = now.getTime() + (now.getTimezoneOffset() * 60000); //now.getTime() -> átváltja a mostani időt miliszekundumba, now.getTimezoneOffset() -> megkapjuk vele az eltérést percben és * 60.000 -> átváltjuk miliszekundumba
    const targetTime = new Date(utc + totalMinutes * 60000); //Az UTC időhöz hozzáadjuk az előbb kiszámolt eltolást (miliszekundumba átváltva) így kapjuk meg a cél időpontot.

    return targetTime.toLocaleTimeString("hu-HU", {         //Az időpontot string-gé alakítjuk(csak az órát és a percet kérjük)
        hour: "2-digit",
        minute: "2-digit"
    });
}




document.addEventListener("DOMContentLoaded", () => {
    msg()
    
});



