import { excluirCard } from "./app.js";
import { editarCard } from "./app.js";
import { maisInfo } from "./maisInfo.js";
import { listaObj } from "./app.js";

export function criaCartao(lista){
    const listaEsquerda = document.querySelector("#listaEsquerda")
    const listaDireita = document.querySelector("#listaDireita")
    while (listaEsquerda.firstChild) {
        listaEsquerda.removeChild(listaEsquerda.lastChild);
      }
    while (listaDireita.firstChild) {
        listaDireita.removeChild(listaDireita.lastChild);
      }
    lista.forEach((element, index) => {
        if (element == null){
            return
        }
        else if (listaEsquerda.childElementCount > listaDireita.childElementCount){
            geraCartao(element.titulo, element.linguagem, element.categoria, element.descricao, element.video, listaDireita, index)
        }
        else{
            geraCartao(element.titulo, element.linguagem, element.categoria, element.descricao, element.video, listaEsquerda, index)   
        }
    });
   
}

function geraCartao(titulo, linguagem, categoria, descricao, video, lista, index){

    const cartao = document.createElement("div")
    cartao.className = "cartao"

    const titulo1 = document.createElement("h1")
    titulo1.innerText = titulo
    cartao.append(titulo1)

    const linguagem2 = document.createElement("h3")
    const spanStyleCard1 = document.createElement("span")
    spanStyleCard1.innerHTML = linguagem
    linguagem2.innerHTML = "Linguagem/Skill: " 
    spanStyleCard1.className ="spanStyleCard"
    cartao.append(linguagem2)
    linguagem2.append(spanStyleCard1)
    

    const categoria2 = document.createElement("h3")
    const spanStyleCard2 = document.createElement("span")
    spanStyleCard2.innerHTML = categoria
    categoria2.innerHTML = "Categoria: " 
    spanStyleCard2.className ="spanStyleCard"
    cartao.append(categoria2)
    categoria2.append(spanStyleCard2)

    if(descricao.length <100){
        const descricao2 = document.createElement("p")
        descricao2.textContent = descricao
        cartao.append(descricao2) 
    } else{
        const descricao2 = document.createElement("p")
        descricao2.textContent = descricao.substring(0,100) +"...";
        cartao.append(descricao2)   
    }
    

    const btns = document.createElement("div")
    btns.className = "btnsCartao"

    const btnVideo = document.createElement("button")
    const btnEditar = document.createElement("button")
    const btnExcluir = document.createElement("button")
    const btnMais = document.createElement("button")
    const linkVideo = document.createElement("a")
    btnExcluir.addEventListener("click", function(){excluirCard(index, categoria)}, false)
    btnEditar.addEventListener("click", function(){editarCard(index)}, false )
    btnMais.addEventListener("click", function(){maisInfo(listaObj[index])})

    btnVideo.innerHTML = "📷"
    btnEditar.innerHTML = "✏️"
    btnExcluir.innerHTML = "&#x274C;"
    btnMais.innerHTML = "❔"
    linkVideo.href = video
    linkVideo.target = "_blank"
    if(video){
        btns.appendChild(linkVideo)
        linkVideo.appendChild(btnVideo)
    }
    btns.appendChild(btnMais)
    btns.appendChild(btnEditar)
    btns.appendChild(btnExcluir)
    

    cartao.appendChild(btns)
    lista.append(cartao)
}

