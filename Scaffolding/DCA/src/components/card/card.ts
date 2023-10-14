import { catType } from "../../types/catType";
import { getDatCat, getDatFact } from "../services/dataCat";

export enum AttributesCard{
    "img" = "img",
    "fact" = "fact"
}

export default class card extends HTMLElement{
    img?: string;
    fact?: string;

    constructor(){
        super();
        this.attachShadow({mode:"open"});
    }

    async connectedCallback(){
        const allData = await getDatCat();
        const factData = await getDatFact();
        this.render(allData, factData);
    }

    static get observedAttributes(){
        const attrs: Record<AttributesCard, null> = {
            img: null,
            fact: null,
        }
        return Object.keys(attrs)
    }

    attributeChangedCallback(propName: AttributesCard, oldValue: unknown, newValue: string){
        switch (propName) {
            default: this[propName] = newValue
                break;
        }
    }

    render(allData?: any, factData?: any){
        if(this.shadowRoot){
            this.shadowRoot.innerHTML = `
            <div>
            <h1>Cat Facts</h1>
            <img src="${this.img}">
            <p>${this.fact}</p>
            </div>`

            const btn = this.ownerDocument.createElement("button");
            btn.innerText="Get New Fact"
            btn.classList.add("cuteButton")
            btn.addEventListener("click", () => {
                allData.forEach((el: catType) => {
                    this.setAttribute(AttributesCard.img, el.img)
                });
            })
            this.shadowRoot?.appendChild(btn);
        }
    }
}

customElements.define("app-card", card)