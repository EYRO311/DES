function cifraDes(){
    let txt = document.getElementById("txtDes").value;
    console.log("Texto en DES: "+txt);
    
    let claveDes = document.getElementById("clavedes").value;
    if(claveDes.length != 8){
        alert("Dije que la clave debe contener exactamente 8 caracteres >:c");
        return false;
    }

    let cifra =  CryptoJS.DES.encrypt(txt,claveDes);
    
    descargarArchivo(generarTexto(cifra), 'CifradoDES.txt');
}

function descifraDes(){
    let cifrado = document.getElementById("txtDes").value;
    console.log("Cifrado en DES: "+cifrado);

    let claveDes = document.getElementById("clavedes").value;
    if(claveDes.length != 8){
        alert("Dije que la clave debe contener exactamente 8 caracteres >:c");
        return false;
    }

    let desci = CryptoJS.DES.decrypt(cifrado,claveDes);
    desci = desci.toString(CryptoJS.enc.Utf8);
    descargarArchivo(generarTexto(desci), 'DescifradoDES.txt');  
}

function leerdes(){
    let archivodes = document.getElementById("archivodes").files[0];

    let readerDes = new FileReader();
    readerDes.onload = function(fileLoadedEvent){
        let txtDes = fileLoadedEvent.target.result;
        document.getElementById("txtDes").value = txtDes;
    };

    readerDes.readAsText(archivodes, "UTF-8");
    
}

function descargarArchivo(contenidoEnBlob, nombreArchivo) {
    var reader = new FileReader();

    reader.onload = function (event) {
      var save = document.createElement('a');
      save.href = event.target.result;
      save.target = '_blank';
      save.download = nombreArchivo || 'CifradoDes.txt';
      var clicEvent = new MouseEvent('click', {
        'view': window,
        'bubbles': true,
        'cancelable': true
      });
      
      save.dispatchEvent(clicEvent);
      
      (window.URL || window.webkitURL).revokeObjectURL(save.href);
    };
    
    reader.readAsDataURL(contenidoEnBlob);
  };

function generarTexto(datos) {
let texto = [];
texto.push(datos);

return new Blob(texto, {
    type: 'text/plain'
});
};