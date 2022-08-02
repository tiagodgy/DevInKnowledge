export function validaURL(string) {
    let url;
    
    try {
      url = new URL(string);
    } catch (_) {
      return false;  
    }
  
    return url.protocol === "http:" || url.protocol === "https:";
  }

export function innerHTMLlength(elemento){
    const lvalue = elemento.value;
    const larr = lvalue.split(' ');
    let len = 0;
    for(let i in larr){ 
        len += larr[ i ].length 
    }
    return len
}

export function atulizaContadores(total, frontEnd, backEnd, FullStack, SoftSkill){
  const dTotal = document.querySelector("#contagemTotal")
  dTotal.innerHTML = total
  const cFrontEnd = document.querySelector("#contagemFrontEnd")
  cFrontEnd.innerHTML = frontEnd
  const cBackEnd = document.querySelector("#contagemBackEnd")
  cBackEnd.innerHTML = backEnd
  const cFullStack = document.querySelector("#contagemFullStack")
  cFullStack.innerHTML = FullStack
  const cSoftSkill = document.querySelector("#contagemSoftSkill")
  cSoftSkill.innerHTML = SoftSkill
}

export function youtubeID(url){
  var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
  var match = url.match(regExp);
  return (match&&match[7].length==11)? match[7] : false;
}