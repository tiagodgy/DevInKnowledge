import { youtubeID } from "./funcionalidades.js";

export function maisInfo(objeto){
    const div0 = document.querySelector(".maisInfo")
    const div = document.querySelector("#infoCard")
    while (div.firstChild) {
        div.removeChild(div.lastChild);
      }
    const div1 = document.createElement("div")
    const titulo = document.createElement("h1")
    const linguagem = document.createElement("h2")
    const categoria = document.createElement("h2")
    const descricao = document.createElement("p")
    const video = document.createElement("iframe")
    const btnFechar = document.createElement("button")

    btnFechar.addEventListener("click", function(){div0.style.display = "none"})

    titulo.innerHTML = "Título: " + objeto.titulo
    linguagem.innerHTML ="Linguagem: " + objeto.linguagem
    categoria.innerHTML ="Categoria: " + objeto.categoria
    descricao.innerHTML ="Descrição: " + objeto.descricao
    video.src = "https://www.youtube.com/embed/" + youtubeID(objeto.video) 
    btnFechar.innerHTML = "&#x274C"

    div1.id = "tituloMaisInfo"
    

    div1.appendChild(titulo)
    div.appendChild(div1)
    div1.appendChild(btnFechar)
    div.appendChild(linguagem)
    div.appendChild(categoria)
    div.appendChild(descricao)
    if(objeto.video){
        div.appendChild(video)
    }

    div0.style.display = "block"

}