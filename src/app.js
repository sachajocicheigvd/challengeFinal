import * as convert from "color-convert";
import {Notyf} from "notyf";
import "notyf/notyf.min.css";




let input = document.querySelector("input");





input.addEventListener("keydown", (e) => {

    if (e.key === "Enter") {

        e.preventDefault();

        if(/^#[0-9A-F]{6}$/i.test(input.value)){
            displayColors(convertir(input.value));
        }

        else{

           const  notyf = new Notyf();
            notyf.error("couleur hex pas au normes");

        }


    }


});


class Color{

    #hsl
    #hex
    element;

    constructor(hsl) {
        this.#hsl=hsl;
        this.#hex=convert.hsl.hex(hsl)
        this.element=`<div class="color" data-color="${'#'+this.#hex}" style="background-color: ${'#'+this.#hex}">
                        <p style="color: rgb(255, 255, 255)">${'#'+this.#hex}</p>
                       </div>`

    }


    display(){

        let main = document.querySelector("main");
        main.insertAdjacentHTML("beforeend",this.element)
        return this.#hex

    }

    getHex(){
        return this.#hex

    }


}

function displayColors(palette){
    document.querySelector("main").innerHTML='';
    let tblaubol = [];

    for (let i = 0; i <= 10; i++) {
        tblaubol[i]= new Color(palette[i]);
        tblaubol[i].display();
    }

    document.querySelector("header").classList.add('minimized');
    document.body.style.backgroundSize = `400% 400%`
    document.body.style.setProperty("background", `linear-gradient(45deg, ${'#'+tblaubol[0].getHex()} , ${'#'+tblaubol[4].getHex()}, ${'#'+tblaubol[9].getHex()})`, "important");

    //techniqueModif:rootvariable css document.documentElement.style.setProperty('--shadow-color', '0deg 0% 63%');


}

document.querySelector("main").addEventListener("click",e=>{
    //alert(e.target.closest('div').dataset.color)

    const copyContent = async () => {
        try {
            await navigator.clipboard.writeText(e.target.closest('div').dataset.color);
            console.log('copied');
        } catch (err) {
            console.error('Failed to copy: ', err);
        }
    }

    copyContent();
    const  notyf2 = new Notyf();
    notyf2.success("copé dans press papier");
})




function convertir(hex){
   hex= convert.hex.hsl(hex);
    let tbltt = [];

    for (let i = 0; i <= 10; i++) {

        tbltt.push([hex[0],hex[1],i*10])

    }

    return tbltt

}

//console.log(convertir("#99aa23"))


