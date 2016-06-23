function obterFicheiroJson() {
    var xhr;
    var div = "monitorizar";
    if (window.XMLHttpRequest) {
        //IE7+, Firefox, Chrome, Opera, Safari
        xhr = new XMLHttpRequest();
        var url = "EquipamentoHttphandler.aspx"

    } else { //IE5, IE6
        xhr = new ActiveXObject("Microsoft.XMLHTTP");
    } if (xhr) {
        xhr.open("GET", url, true);
        xhr.onreadystatechange = function () {
            if ((this.readyState === 4) && (this.status === 200)) {
                var resultado = xhr.responseText;
                document.getElementById(div).innerHTML = resultado + "<hr/>" + resultado;
            }
        }; xhr.send();
    }
}
//function processarJson(json) {
    
//    function descrever(objeto) {
//        var resultado = "";
//        for (propriedade in objeto) {
//            resultado += propriedade + ": " + objeto[propriedade] + "<br/>";
//        } return resultado;
//    }
//    var objetos1 = JSON.stringify(json)
//   var objetos = JSON.parse(objetos1);//eval('(' + json+ ')');
   
//    var resultado = "";
//    for (var i = 0, quantos = objetos.length; i < quantos; i++) {
//        resultado += descrever(objetos[i]);
//    }
//}
