import Dica from "./Dica.js"
import { criaCartao } from "./criaCartao.js"
import { validaURL } from "./funcionalidades.js"
import { innerHTMLlength } from "./funcionalidades.js"
import { atulizaContadores } from "./funcionalidades.js"
import { criaModal } from "./criaModal.js"

//Localizando botões do menu
const btnLimpar = document.querySelector("#btnLimpar")
const btnSalvar = document.querySelector("#btnSalvar")
btnLimpar.addEventListener("click", limpar)
btnSalvar.addEventListener("click", alteraSalvar)

export let listaObj = []
let contagemTotal = 0
let contagemFrontEnd = 0
let contagemBackEnd = 0
let contagemFullStack= 0
let contagemSoftSkill = 0
let salvar = 0
let identificador = null

// Procura no local Storage se existem dados salvos
if (JSON.parse(localStorage.getItem("cards"))){
    listaObj = JSON.parse(localStorage.getItem("cards"))
}
criaCartao(listaObj)

// Buscando os contadores no local storage
if (JSON.parse(localStorage.getItem("contagemTotal"))){
    contagemTotal = JSON.parse(localStorage.getItem("contagemTotal"))
}
if (JSON.parse(localStorage.getItem("contagemFrontEnd"))){
    contagemFrontEnd = JSON.parse(localStorage.getItem("contagemFrontEnd"))
}
if (JSON.parse(localStorage.getItem("contagemBackEnd"))){
    contagemBackEnd = JSON.parse(localStorage.getItem("contagemBackEnd"))
}
if (JSON.parse(localStorage.getItem("contagemFullStack"))){
    contagemFullStack = JSON.parse(localStorage.getItem("contagemFullStack"))
}
if (JSON.parse(localStorage.getItem("contagemSoftSkill"))){
    contagemSoftSkill= JSON.parse(localStorage.getItem("contagemSoftSkill"))
}
atulizaContadores(contagemTotal, contagemFrontEnd, contagemBackEnd, contagemFullStack, contagemSoftSkill)





function criaObjeto(){
    const titulo = document.querySelector("#titulo")
    const linguagem = document.querySelector("#linguagem")
    const categoria = document.querySelector("#categoria").value
    const descricao = document.querySelector("#descricao")
    const video = document.querySelector("#video")
    const erro = document.querySelector("#mostraErro")

    if((innerHTMLlength(titulo) < 4) || (innerHTMLlength(titulo) > 64)){
        erro.innerHTML = "O Título deve ter entre 8 e 64 caracteres."
    }
    else if((innerHTMLlength(linguagem) < 8) || (innerHTMLlength(linguagem) >32)){
        erro.innerHTML = "O Linguagem/Skill deve ter entre 8 e 32 caracteres."
    }
    else if((innerHTMLlength(descricao) < 16) || (innerHTMLlength(descricao) >1024)){
        erro.innerHTML = "A Descrição deve ter entre 16 e 1024 caracteres."
    }
    else if((innerHTMLlength(video)> 0) && (!validaURL(video.value))){
        erro.innerHTML = "A URL do vídeo não é válida."
    }
    else{
        const dica = new Dica(titulo.value, linguagem.value, categoria, descricao.value, video.value)
        listaObj.push(dica)
        localStorage.setItem("cards", JSON.stringify(listaObj))
        criaCartao(listaObj)
        adicionaContador(categoria)
        criaModal("Sua dica foi adicionada com sucesso!", "temporario")
        limpar()
    }
}

function limpar(){
    document.querySelector("#titulo").value = ""
    document.querySelector("#linguagem").value = ""
    document.querySelector("#categoria").value = "FrontEnd"
    document.querySelector("#descricao").value = ""
    document.querySelector("#video").value = ""
    document.querySelector("#mostraErro").innerHTML = ""
    salvar = 0
    criaModal("Terminal limpo com sucesso!", "limpar")
}

//Sistema de contagem de tarefas 
function adicionaContador(valor){
    contagemTotal = contagemTotal + 1
    localStorage.setItem("contagemTotal", JSON.stringify(contagemTotal))
    switch(valor){
        case "FrontEnd":
            contagemFrontEnd = contagemFrontEnd + 1
            localStorage.setItem("contagemFrontEnd", JSON.stringify(contagemFrontEnd))
            break
        case "BackEnd":
            contagemBackEnd = contagemBackEnd + 1
            localStorage.setItem("contagemBackEnd", JSON.stringify(contagemBackEnd))
            break
        case "FullStack":
            contagemFullStack = contagemFullStack + 1
            localStorage.setItem("contagemFullStack", JSON.stringify(contagemFullStack))
            break
        case "Comportamental/Soft":
            contagemSoftSkill = contagemSoftSkill + 1
            localStorage.setItem("contagemSoftSkill", JSON.stringify(contagemSoftSkill))
            break
    }
    atulizaContadores(contagemTotal, contagemFrontEnd, contagemBackEnd, contagemFullStack, contagemSoftSkill)
}

function removeContador(valor){
    contagemTotal = contagemTotal - 1
    localStorage.setItem("contagemTotal", JSON.stringify(contagemTotal))
    switch(valor){
        case "FrontEnd":
            contagemFrontEnd = contagemFrontEnd - 1
            localStorage.setItem("contagemFrontEnd", JSON.stringify(contagemFrontEnd))
            break
        case "BackEnd":
            contagemBackEnd = contagemBackEnd - 1
            localStorage.setItem("contagemBackEnd", JSON.stringify(contagemBackEnd))
            break
        case "FullStack":
            contagemFullStack = contagemFullStack - 1
            localStorage.setItem("contagemFullStack", JSON.stringify(contagemFullStack))
            break
        case "Comportamental/Soft":
            contagemSoftSkill = contagemSoftSkill - 1
            localStorage.setItem("contagemSoftSkill", JSON.stringify(contagemSoftSkill))
            break
    }
    atulizaContadores(contagemTotal, contagemFrontEnd, contagemBackEnd, contagemFullStack, contagemSoftSkill)
}

//Mecanismo de pesquisa
const inputPesquisa = document.querySelector("#inputPesquisa")
const btnLimpaPesquisa = document.querySelector("#btnLimpaPesquisa")
inputPesquisa.addEventListener("keyup", pesquisa)
btnLimpaPesquisa.addEventListener("click", limpaFiltro)

function pesquisa(){
    const pesquisaItem = document.querySelector("#inputPesquisa").value
    const listaFiltro = listaObj.filter((el) => el.titulo.toLowerCase().indexOf(pesquisaItem.toLowerCase()) > -1)
    criaCartao(listaFiltro)
}

function limpaFiltro(){
    inputPesquisa.value = ""
    criaCartao(listaObj)
}

//Exclusão dos cards
export function excluirCard(index, categoria){
    if(confirm(`Você deseja deletar da dica ${listaObj[index].titulo}?`)){
        listaObj.splice(index, 1)
        localStorage.setItem("cards", JSON.stringify(listaObj))
        criaCartao(listaObj)
        removeContador(categoria)
        criaModal("Sua dica foi deletada.", "temporario")
    }
}
    

//Edição dos cards
export function editarCard(index){
    document.querySelector("#titulo").value = listaObj[index].titulo
    document.querySelector("#linguagem").value = listaObj[index].linguagem
    document.querySelector("#categoria").value = listaObj[index].categoria
    document.querySelector("#descricao").value = listaObj[index].descricao
    document.querySelector("#video").value = listaObj[index].video
    identificador = index
    salvar = 1
    criaModal("Você está editando uma dica", "permanente")
}

function salvarCardEdit(){
    const titulo = document.querySelector("#titulo")
    const linguagem = document.querySelector("#linguagem")
    const categoria = document.querySelector("#categoria").value
    const descricao = document.querySelector("#descricao")
    const video = document.querySelector("#video")
    const erro = document.querySelector("#mostraErro")

    if((innerHTMLlength(titulo) < 4) || (innerHTMLlength(titulo) > 64)){
        erro.innerHTML = "O Título deve ter entre 8 e 64 caracteres."
    }
    else if((innerHTMLlength(linguagem) < 8) || (innerHTMLlength(linguagem) >32)){
        erro.innerHTML = "O Linguagem/Skill deve ter entre 8 e 32 caracteres."
    }
    else if((innerHTMLlength(descricao) < 16) || (innerHTMLlength(descricao) >1024)){
        erro.innerHTML = "A Descrição deve ter entre 16 e 1024 caracteres."
    }
    else if((innerHTMLlength(video)> 0) && (!validaURL(video.value))){
        erro.innerHTML = "A URL do vídeo não é válida."
    }
    else{
        removeContador(listaObj[identificador].categoria)
        listaObj[identificador].titulo = titulo.value
        listaObj[identificador].linguagem = linguagem.value
        listaObj[identificador].categoria = categoria
        listaObj[identificador].descricao = descricao.value
        listaObj[identificador].video = video.value
        adicionaContador(categoria)
        criaCartao(listaObj)
        localStorage.setItem("cards", JSON.stringify(listaObj))
        limpar()
        criaModal("Sua dica foi editada com sucesso!", "temporario")
    }
}

//Altera a funcionalidade do botão salvar
function alteraSalvar(){
    if(salvar == 0){
        criaObjeto()
    }
    else if(salvar == 1){
        salvarCardEdit()
    }
}