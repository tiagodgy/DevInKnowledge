export function criaModal(mensagem, tipo){
    const div = document.querySelector("#modalCard")
    while (div.firstChild) {
        div.removeChild(div.lastChild);
      }
    const tituloModal = document.createElement("h1")
    tituloModal.innerHTML = mensagem
    div.appendChild(tituloModal)
    const modal = document.querySelector(".modal") 

    switch(tipo){
      case "temporario":
        modal.style.display = "block"
        setTimeout(function(){
          modal.style.display = "none"
        }, 3000);
        break
      case "permanente":
        modal.style.display = "block"
        break
      case "limpar":
        modal.style.display = "none"
        break
    }
    
}