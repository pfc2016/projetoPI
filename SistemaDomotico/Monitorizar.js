/**
 * Closure auxiliar que é usada como contador por outras funcoes, 
 * nomeadamente para a atribuicao de id's aos elementos que sao criados.
 */
var add = (function () {
    var counter = 0;
    return function () {
        return counter += 1;
    }
})();

/**
 * @param  {elemento} elemento ao qual vai ser feito o append do this.visualizacao
 * @member {SistemaDomotico}
 */
SistemaDomotico.prototype.apresentarEquipamento = function (elemento) {
    if (this.visualizacao) {
        this.elemento.appendChild(this.visualizacao);
    }
}

function Tabela(linhas, colunas) {
    SistemaDomotico.call(this, "", "", "table");
    if ((linhas > 0) && (colunas > 0)) {
        var tbody = document.createElement("tbody");
        var tr, td;
        for (var i = 0; i < linhas; i++) {
            tr = document.createElement("tr");
            for (var j = 0; j < colunas; j++) {
                td = document.createElement("td");
                tr.appendChild(td);
            }
            tbody.appendChild(tr);
        }
    } else {
        throw new Error("Dimensões impossíveis na tabela!");
    }
}
Tabela.prototype = Object.create(SistemaDomotico.prototype);
Tabela.prototype.constructor = Tabela;

Tabela.prototype.celula = function (linha, coluna) {
    var linhas = this.visualizacao.rows;
    if ((linha >= 0) && (linha < linhas.length)) {
        var colunas = linhas[linha];
        if ((coluna >= 0) && (coluna < colunas.cells.length)) {
            return colunas.cells[coluna];
        }
    }
};

/**
 * @param  {titulo} titulo que sera dado ao Atuador
 * @extends {Equipamento}
 */
function Atuador(titulo) {
    Equipamento.call(this, titulo);
    this.titulo = titulo;
}
Atuador.prototype = Object.create(Equipamento.prototype);
Atuador.prototype.constructor = Atuador;

/**
 * @param  {titulo} titulo que sera dado ao AtuadorLocal
 * @extends {Atuador}
 */
function AtuadorLocal(titulo) {
    Atuador.call(this, titulo);
    this.titulo = titulo;
}
AtuadorLocal.prototype = Object.create(Atuador.prototype);
AtuadorLocal.prototype.constructor = AtuadorGlobal;

/**
 * @param  {titulo} titulo que sera dado ao AtuadorGlobal
 * @extends {Atuador}
 */
function AtuadorGlobal(titulo) {
    Atuador.call(this, titulo);
    this.titulo = titulo;
}
AtuadorGlobal.prototype = Object.create(Atuador.prototype);
AtuadorGlobal.prototype.constructor = AtuadorGlobal;

/**
 * Construtor do {Termometro}
 * @param  {titulo} titulo que o termometro possui (TM)
 * @param  {imagem} imagem que o termometro tem 
 * @extends {Equipamento}
 * @extends {AtuadorGlobal}
 */
function Termometro(titulo, imagem) {
    titulo = titulo || "TM";
    imagem = imagem || "../images/termometro.png";
    Equipamento.call(this, titulo);
    AtuadorGlobal.call(this, titulo);
    this.imagem = imagem;
}
Termometro.prototype = Object.create(Equipamento.prototype);
Termometro.prototype = Object.create(AtuadorGlobal.prototype);
Termometro.prototype.constructor = Termometro;

/**
 * Funcao que cria um termometro, criando um div que contem um label, para mostrar a temperatura,
 * e a sua imagem respetiva.
 */
Termometro.prototype.adicionarTermometro = function () {
    var div = divEquipamento("divTer", "pTer", "termometro", "25ºC");
    var img = document.createElement("img");
    img.src = this.imagem;
    div.appendChild(img);
    divSistema().appendChild(div);
}

/**
 * Construtor do {ArCondicionado}
 * @param  {titulo} titulo que o ar condicionado possui (AC)
 * @param  {imagem} imagem que o ar condicionado tem 
 * @extends {Equipamento}
 * @extends {AtuadorGlobal}
 */
function ArCondicionado(titulo, imagem) {
    titulo = titulo || "AC";
    imagem = imagem || "../images/arCondicionado.png";
    Equipamento.call(this, titulo);
    AtuadorGlobal.call(this, titulo);
    this.imagem = imagem;
}
ArCondicionado.prototype = Object.create(Equipamento.prototype);
ArCondicionado.prototype.constructor = ArCondicionado;
ArCondicionado.prototype = Object.create(AtuadorGlobal.prototype);

/**
 * funcao que cria um ar condicionado 
 */
ArCondicionado.prototype.adicionarArCondicionado = function () {
    var div = divEquipamento("divAr", "");
    var p = document.createElement("p");
    p.id = "pAr" + add();
    p.className = "arCondicionado";
    p.onclick = function () { //evento que é associado ao <p>
        criarinputArCondicionado(this.id, this.className);//sempre que se carrega no <p> este muda para <input> para se poder adicionar a nova temperatura
    }
    var img = document.createElement("img");
    img.src = this.imagem;
    p.appendChild(document.createTextNode("25ºC"));
    div.appendChild(p);
    div.appendChild(img);
    divSistema().appendChild(div);
}

/**
 * funcao que faz replace do <p> do ar condicionado por um <input> para 
 * que o utilizador possa introduzir o novo valor para o ar condicionado
 */
function criarinputArCondicionado(clickedId, clickedClassName) {
    var p = document.getElementById(clickedId);
    var parent = document.getElementById(p.parentNode.id);
    var novoValor = document.createElement("input");
    novoValor.id = clickedId;
    novoValor.type = "text";
    novoValor.className = clickedClassName;
    novoValor.placeholder = p.textContent;
    parent.appendChild(novoValor);
    parent.replaceChild(novoValor, p);
    novoValor.onchange = function () {
        criarPArCondicionado(this.id, this.className);
    }
}

/**
 * funcao para criar um <p> com base no valor que foi introduzido no input criado 
 */
function criarPArCondicionado(clickedId, clickedClassName) {
    var input = document.getElementById(clickedId);
    var novoP = document.createElement("p");
    novoP.id = clickedId;
    novoP.className = clickedClassName;
    novoP.onclick = function () {
        criarinputArCondicionado(clickedId, clickedClassName);
    }
    var parent = document.getElementById(input.parentNode.id);
    var texto = document.createTextNode(input.value);
    novoP.appendChild(texto);
    parent.replaceChild(novoP, input);

    var numero = numeroElementos("arCondicionado");
    if (numero == 1) {
        alterarValorEtiqueta("termometro", novoP.textContent);
    } else {
        var resultado = somaAresCondicionados("arCondicionado") / numeroElementos("arCondicionado");
        alterarValorEtiqueta("termometro", (resultado + "ºC"));
    }
}

/**
 * Construtor do {GeradorDeMovimento}
 * @param  {titulo} titulo que o gerador de movimento possui (GM)
 * @param  {imagem} imagem que o gerador de movimento tem 
 * @extends {Equipamento}
 * @extends {AtuadorGlobal}
 */
function GeradorDeMovimento(titulo, imagem) {
    titulo = titulo || "GM";
    imagem = imagem || "../images/semMovimento.png";
    Equipamento.call(this);
    AtuadorGlobal.call(this);
    this.imagem = imagem;
}
GeradorDeMovimento.prototype = Object.create(Equipamento.prototype);
GeradorDeMovimento.prototype.constructor = GeradorDeMovimento;
GeradorDeMovimento.prototype = Object.create(AtuadorGlobal.prototype);

GeradorDeMovimento.prototype.adicionarGeradorMovimento = function () {
    var div = divEquipamento("divGerMov", "pGerMov", "classGerMov", "");
    var img = document.createElement("img");
    img.src = "../images/semMovimento.png";
    img.id = "imgGerMov" + add();
    img.className = "movimentoDesativado";
    img.onclick = function () {
        GeradorDeMovimento.prototype.ativarMovimento.call(this, this.id, this.className);
    }
    div.appendChild(img);
    divSistema().appendChild(div);
}

/**
 * funcao que ativa o movimento de um gerador de movimento
 * @param {idImagem} id da imagem que recebeu o evento
 * @param {classNameImagem} classNam da iamgem que recebeu o evento
 */
GeradorDeMovimento.prototype.ativarMovimento = function (idImagem, classNameImagem) {
    var imagem = document.getElementById(idImagem);
    var parent = document.getElementById(imagem.parentNode.id);
    var novaImagem = document.createElement("img");
    novaImagem.src = "../images/comMovimento.png";
    novaImagem.id = idImagem;
    novaImagem.className = "movimentoAtivado";
    novaImagem.onclick = function () {
        GeradorDeMovimento.prototype.desativarMovimento.call(this, this.id, this.className);
    }
    parent.replaceChild(novaImagem, imagem);
    GeradorDeMovimento.prototype.ligarLampadas.call(this);
}

/**
 * funcao que percorre a lista de lampadas que existem e que as acende a todas
 */
GeradorDeMovimento.prototype.ligarLampadas = function () {
    var lista = document.getElementsByClassName("movimentoAtivado");
    var listaLampadas = document.getElementsByClassName("movimentoOff");
    if (lista.length !== 0) {
        for (var i = 0; i < listaLampadas.length; i++) {
            listaLampadas[i].src = "../images/movimentoOn.png";
        }
    }
}

/**
 * funcao que desativa o movimento de um gerador de movimento
 * @param {idImagem} id da imagem que recebeu o evento
 * @param {classNameImagem} classNam da iamgem que recebeu o evento
 */
GeradorDeMovimento.prototype.desativarMovimento = function (idImagem, classNameImagem) {
    var imagem = document.getElementById(idImagem);
    var parent = document.getElementById(imagem.parentNode.id);
    var novaImagem = document.createElement("img");
    novaImagem.src = "../images/semMovimento.png";
    novaImagem.id = idImagem;
    novaImagem.className = "movimentoDesativado";
    novaImagem.onclick = function () {
        GeradorDeMovimento.prototype.ativarMovimento.call(this, this.id, this.className);
    }
    parent.replaceChild(novaImagem, imagem);
    GeradorDeMovimento.prototype.desligarLampadas.call(this);
}

/**
 * funcao que percorre a lista de lampadas que existem e que as desliga a todas
 */
GeradorDeMovimento.prototype.desligarLampadas = function () {
    var lista = document.getElementsByClassName("movimentoAtivado");
    var listaLampadas = document.getElementsByClassName("movimentoOff");
    if (lista.length === 0) {
        for (var i = 0; i < listaLampadas.length; i++) {
            listaLampadas[i].src = "../images/movimentoOff.png";
        }
    }
}

/**
 * Construtor do {GeradorDeMovimento}
 * @param  {titulo} titulo que o gerador de movimento possui (GM)
 * @param  {imagem} imagem que o gerador de movimento tem 
 * @extends {Equipamento}
 * @extends {AtuadorGlobal}
 */
function DetetorDeMovimento(titulo, imagem) {
    titulo = titulo || "DM";
    imagem = imagem || "../images/movimentoOff.png";
    Equipamento.call(this);
    AtuadorGlobal.call(this);
    this.imagem = imagem;
}
DetetorDeMovimento.prototype = Object.create(Equipamento.prototype);
DetetorDeMovimento.prototype.constructor = DetetorDeMovimento;
DetetorDeMovimento.prototype = Object.create(AtuadorGlobal.prototype);

/**
 * funcao que cria uma lampadas
 * @member {DetetorDeMovimento}
 */
DetetorDeMovimento.prototype.criarLampada = function () {
    var div = divEquipamento("divMovOff", "DM", "detetorMov", "");
    var img = document.createElement("img");
    img.src = "../images/movimentoOff.png";
    img.className = "movimentoOff";
    div.appendChild(img);
    divSistema().appendChild(div);
}

/**
 * Construtor do {GeradorDeMovimento}
 * @param  {titulo} titulo que o gerador de movimento possui (GM)
 * @param  {imagem} imagem que o gerador de movimento tem 
 * @extends {Equipamento}
 * @extends {AtuadorGlobal}
 */
function TrincoEletrico(titulo, imagem) {
    titulo = titulo || "TE";
    imagem = imagem || "../images/fechoAberto.png";
    Equipamento.call(this);
    AtuadorLocal.call(this);
    this.imagem = imagem;
}
TrincoEletrico.prototype = Object.create(Equipamento.prototype);
TrincoEletrico.prototype.constructor = TrincoEletrico;
TrincoEletrico.prototype = Object.create(AtuadorLocal.prototype);

/**
 * funcao que cria um trinco eletrico
 * @member {TrincoEletrico}
 */
TrincoEletrico.prototype.criarTrincoEletrico = function () {
    var div = divEquipamento("divTriEle", "");
    var p = document.createElement("p");
    p.id = "pTriEle" + add();
    p.className = "trincoEletrico";
    var imagem = document.createElement("img");
    imagem.id = "imgTriEle" + add();
    imagem.src = "../images/fechoAberto.png";
    imagem.className = "trincoLigado";
    imagem.onclick = function () {
        TrincoEletrico.prototype.alterarTrincoEletricoAberto.call(this, this.id);
    }
    p.appendChild(document.createTextNode(p.id));
    p.onclick = function () {
        TrincoEletrico.prototype.criarDropdownTrincoEletrico.call(this, this.id);
    }
    div.appendChild(p);
    div.appendChild(imagem);
    sistema.appendChild(div);
}

/**
 * funcao que percorre todos os equipamentos de fecho (porta) que estejam "abertos" e que para cada um 
 * cria um <select> de uma <dropdown>  
 * @param {pClickedId}
 * @member {trincoEletrico}
 */
TrincoEletrico.prototype.criarDropdownTrincoEletrico = function (pClickedId) {
    var p = document.getElementById(pClickedId);
    var parent = document.getElementById(p.parentNode.id);
    var select = document.createElement("select");
    select.id = "select" + add();
    var lista = document.getElementsByClassName("equipamentoFechoAberto");
    var option;
    for (var i = 0; i < lista.length; i++) {
        option = document.createElement("option");
        option.className = "dropdown";
        option.id = "option" + i;
        option.text = lista[i].id;
        select.appendChild(option);
        parent.appendChild(select);
    }
    select.onblur = function () {
        criarParagrafoTrincoEletrico(this.id, this.options[select.selectedIndex].value);
    }
    parent.replaceChild(select, p);
}

/**
 * funcao que uma vez escolhido uma opcao da <dropdown> pega nesse valor e cria um <p> 
 * @param {clickedId} id do <select> escolhido da <dropdown>
 * @param {clickedValue} valor que foi escolhido pelo utilizador no <select>
 */
function criarParagrafoTrincoEletrico(clickedId, clickedValue) {
    var select = document.getElementById(clickedId);
    var parent = document.getElementById(select.parentNode.id);
    var novoP = document.createElement("p");
    novoP.id = clickedId;
    novoP.textContent = clickedValue;
    novoP.onclick = function () {
        TrincoEletrico.prototype.criarDropdownTrincoEletrico.call(this, this.id);
    }
    parent.replaceChild(novoP, select);
}

/**
 * funcao altera o valor do trinco eletrico para aberto 
 * @param {clickedId} id do trinco que foi "clickado"
 */
TrincoEletrico.prototype.alterarTrincoEletricoAberto = function (clickedId) {
    abrirFecharPorta(clickedId, "../images/portaFechada.png");
    var imagem = document.getElementById(clickedId);
    imagem.src = "../images/fechoFechado.png";
    imagem.onclick = function () {
        TrincoEletrico.prototype.alterarTrincoEletricoFechado.call(this, this.id);
    }
}

/**
 * funcao altera o valor do trinco eletrico para fechado 
 * @param {clickedId} id do trinco que foi "clickado"
 * @member {TrincoEletrico}
 */
TrincoEletrico.prototype.alterarTrincoEletricoFechado = function (clickedId) {
    abrirFecharPorta(clickedId, "../images/portaAberta.png");
    var imagem = document.getElementById(clickedId);
    imagem.src = "../images/fechoAberto.png";
    imagem.onclick = function () {
        TrincoEletrico.prototype.alterarTrincoEletricoAberto.call(this, this.id);
    }
}

/**
 * funcao auxiliar utilizada por {TrincoEletrico.prototype.alterarTrincoEletricoAberto} e
 *  {TrincoEletrico.prototype.alterarTrincoEletricoFechado}
 */
function abrirFecharPorta(clickedId, source) {
    var imagem = document.getElementById(clickedId);
    var parent = document.getElementById(imagem.parentNode.id);
    var listaFilhosParent = parent.childNodes;
    var p = listaFilhosParent[0].textContent;
    var imagemPorta = document.getElementById(p);
    imagemPorta.src = source;
}

/**
 * Construtor do {GeradorDeMovimento}
 * @param  {titulo} titulo que o gerador de movimento possui (GM)
 * @param  {imagem} imagem que o gerador de movimento tem 
 * @extends {Equipamento}
 * @extends {AtuadorGlobal}
 */
function DetetorFecho(titulo, imagem) {
    titulo = titulo || "DF";
    imagem = imagem || "../images/portaAberta.png";
    Equipamento.call(this);
    AtuadorLocal.call(this);
    this.imagem = imagem;
}
DetetorFecho.prototype = Object.create(Equipamento.prototype);
DetetorFecho.prototype.constructor = DetetorFecho;
DetetorFecho.prototype = Object.create(AtuadorLocal.prototype);

/**
 * funcao que cria um detetor de fecho (portas)
 * @member {DetetorFecho}
 */
DetetorFecho.prototype.criarDetetorFechoAberto = function () {
    var div = divEquipamento("divDetFec", "pDetFec", "classDetFec", "");
    var img = document.createElement("img");
    img.src = "../images/portaAberta.png";
    img.id = "imgDetFec" + add();
    img.className = "equipamentoFechoAberto";
    div.appendChild(img);
    divSistema().appendChild(div);
}

/**
 * Construtor do {GeradorDeMovimento}
 * @param  {titulo} titulo que o gerador de movimento possui (GM)
 * @param  {imagem} imagem que o gerador de movimento tem 
 * @extends {Equipamento}
 * @extends {AtuadorGlobal}
 */
function DetetorPosicaoEstoreEletrico(titulo, imagem) {
    titulo = titulo || "EE";
    imagem = imagem || "../images/start.png";
    Equipamento.call(this, titulo);
    AtuadorLocal.call(this, titulo);
    this.imagem = imagem;
}
DetetorPosicaoEstoreEletrico.prototype = Object.create(Equipamento.prototype);
DetetorPosicaoEstoreEletrico.prototype.constructor = DetetorPosicaoEstoreEletrico;
DetetorPosicaoEstoreEletrico.prototype = Object.create(AtuadorLocal.prototype);

/**
 * funcao auxiliar que devolve o elemento com id "sistema"
 */
function divSistema() {
    return document.getElementById("sistema");
};

/**
 * funcao auxiliar que cria um <div> com um id, um <p> com um id e uma className e um texto.
 * @return {div} o proprio div que é criado
 */
function divEquipamento(siglaEquipamentoD, siglaEquipamentoP, className, textoP) {
    var div = document.createElement("div");
    div.id = siglaEquipamentoD + add();
    if (arguments.length === 4) {
        var p = document.createElement("p");
        p.id = siglaEquipamentoP + add();
        p.className = className;
        div.appendChild(p);
        p.appendChild(document.createTextNode(textoP));
    }
    return div;
}

/**
 * funcao que cria um detetor de posicao de estores eletricos 
 * @member {DetetorPosicaoEstoreEletrico}
 */
DetetorPosicaoEstoreEletrico.prototype.criarDetetorPosicaoEstoreEletrico = function () {
    var div = divEquipamento("divDetPosEle", "");
    var p1 = document.createElement("p");
    p1.id = "pDetPosEst" + add();
    p1.textContent = p1.id;
    var texto = document.createTextNode(p1.id);
    var p2 = document.createElement("p");
    p2.id = "pDetPosEst" + add();
    p2.textContent = "Aberto";
    var img = document.createElement("img");
    img.src = this.imagem;
    img.id = "start" + add();
    img.className = "start";
    div.appendChild(p1);
    div.appendChild(p2);
    div.appendChild(img);
    divSistema().appendChild(div);
    p1.onclick = function () {
        criarDropdownJanelas(this.id);
    }
    p2.onclick = function () {
        criarDropdownJanelasOpcoes(this.id);
    }
    img.onclick = function () {
        alterarJanela(this.id);
    }
}

/**
 * funcao auxiliar que cria uma <dropdown> com todos os elementos que possuem a class "janela"
 * @param {pClickedId} id do elemento que sofreu o evento 
 */
function criarDropdownJanelas(pClickedId) {
    var p = document.getElementById(pClickedId);
    var parent = document.getElementById(p.parentNode.id);
    var select = document.createElement("select");
    select.id = "select" + add();
    var lista = document.getElementsByClassName("janela");
    var option;
    for (var i = 0; i < lista.length; i++) {
        option = document.createElement("option");
        option.className = "dropdown";
        option.id = "option" + i;
        option.text = lista[i].id;
        select.appendChild(option);
        parent.appendChild(select);
    }
    select.onblur = function () {
        criarParagrafoJanelas(this.id, this.options[select.selectedIndex].value);
    }
    parent.replaceChild(select, p);
}

/**
 * funcao auxiliar que cria um <p> com base no valor escolhido da <dropdown>
 * @param {clickedId} id do elemento que teve o evento 
 * @param {clickedValue} valor do elemento que teve o evento 
 */
function criarParagrafoJanelas(clickedId, clickedValue) {
    var select = document.getElementById(clickedId);
    var parent = document.getElementById(select.parentNode.id);
    var novoP = document.createElement("p");
    novoP.id = clickedId;
    novoP.textContent = clickedValue;
    novoP.onclick = function () {
        criarDropdownJanelas(this.id);
    }
    parent.replaceChild(novoP, select);
}

/**
 * funcao auxiliar que cria uma <dropdown> com base nos valores que uma janela pode ter  
 * @param {pClickedId} id do elemento que teve o evento 
 */
function criarDropdownJanelasOpcoes(pClickedId) {
    var p = document.getElementById(pClickedId);
    var parent = document.getElementById(p.parentNode.id);
    var select = document.createElement("select");
    select.id = "select" + add();
    var listaOpcoes = ["Aberto", "A dois terços", "Meio Aberto", "A um terço", "Fechado"];
    var option;
    for (var i = 0; i < listaOpcoes.length; i++) {
        option = document.createElement("option");
        option.className = "dropdown";
        option.id = "option" + i;
        option.text = listaOpcoes[i];
        select.appendChild(option);
        parent.appendChild(select);
    }
    select.onblur = function () {
        criarParagrafoJanelasOpcoes(this.id, this.options[select.selectedIndex].value);
    }
    parent.replaceChild(select, p);
}

/**
 * funcao auxiliar que consoante o valor que foi escolhido da <dropdown> cria um <p> com esse mesmo valor 
 * @param {clickedId} id do <select> da <dropdown> que foi escolhido
 * @param {clickedValue} <select> escolhido da <dropdown>
 */
function criarParagrafoJanelasOpcoes(clickedId, clickedValue) {
    var select = document.getElementById(clickedId);
    var parent = document.getElementById(select.parentNode.id);
    var novoP = document.createElement("p");
    novoP.id = clickedId;
    novoP.textContent = clickedValue;
    novoP.onclick = function () {
        criarDropdownJanelasOpcoes(this.id);
    }
    parent.replaceChild(novoP, select);
}

/**
 * funcao que altera o valor da janela consoante o <select> que se escolheu da <dropdown> de valores para a janela
 * @param {idBotao} 
 * @returns imagem
 */
function alterarJanela(idBotao) {
    var var1 = valor1(idBotao);
    var imagem = document.getElementById(var1);
    var var2 = valor2(idBotao);
    switch (var2) {
        case "Aberto":
            imagem.src = "../images/aberto.png";
            break;
        case "A dois terços":
            imagem.src = "../images/doisTercos.png";
            break;
        case "Meio Aberto":
            imagem.src = "../images/meioAberto.png";
            break;
        case "A um terço":
            imagem.src = "../images/umTerco.png";
            break;
        case "Fechado":
            imagem.src = "../images/fechado.png";
            break;
    }
}

/**
 * funcao auxiliar que vai buscar o valor do primeiro <p> que aparece no div que contem um 
 * detetor de posicao dos estores eletrico 
 * @param  {idImagem} id da imagem que sofreu o evento 
 */
function valor1(idImagem) {
    var imagem = document.getElementById(idImagem);
    var parent = document.getElementById(imagem.parentNode.id);
    var listaFilhos = parent.childNodes;
    var imagemAlterar = listaFilhos[0];
    return imagemAlterar.textContent;
}

/**
 * funcao auxiliar que vai buscar o valor do segundo <p> que aparece no div que contem um 
 * detetor de posicao dos estores eletrico 
 * @param {idImagem} id da imagem que sofreu o evento 
 */
function valor2(idImagem) {
    var imagem = document.getElementById(idImagem);
    var parent = document.getElementById(imagem.parentNode.id);
    var listaFilhos = parent.childNodes;
    var janela = listaFilhos[1];
    return janela.textContent;
}

/**
 * Construtor do {GeradorDeMovimento}
 * @param  {titulo} titulo que o gerador de movimento possui (GM)
 * @param  {imagem} imagem que o gerador de movimento tem 
 * @extends {Equipamento}
 * @extends {AtuadorGlobal}
 */
function MotorEletricoEstore(titulo, imagem) {
    titulo = titulo || "ME";
    imagem = imagem || "../images/aberto.png";
    Equipamento.call(this);
    AtuadorLocal.call(this);
    this.imagem = imagem;
}
MotorEletricoEstore.prototype = Object.create(Equipamento.prototype);
MotorEletricoEstore.prototype.constructor = MotorEletricoEstore;
MotorEletricoEstore.prototype = Object.create(AtuadorLocal.prototype);

MotorEletricoEstore.prototype.criarMotorEletricoEstore = function () {
    var div = divEquipamento("divMotEleEst", "pMotEleEst", "classMotEleEst", "");
    var img = document.createElement("img");
    img.src = this.imagem;
    img.id = "imgMotEleEst" + add();
    img.className = "janela";
    div.appendChild(img);
    divSistema().appendChild(div);
}

/**
 * funcao auxiliar que soma os valores dos aresCondicionados para que se coloque 
 * o seu valor nos termometros
 * @param  {etiqueta} etiqueta passada como parametro para se fazer a soma das temperaturas 
 * que estao nos ares condicionados
 * @return {soma} soma das temperaturas dos ares condicionados 
 */
function somaAresCondicionados(etiqueta) {
    var soma = 0;
    var lista = document.getElementsByClassName(etiqueta);
    for (var i = 0; i < lista.length; i++) {
        soma += parseInt(lista[i].textContent);
    }
    return soma;
}

/**
 * funcao que muda todos os valores dos elementos com certa className
 * @param {className} className do elemento ao qual se pretende fazer a alteracao 
 * @param {texto} texto que se pretende colocar nos elementos que contêm a className 
 * passada tambem por parametro da funcao 
 * @return {lista} lista dos elemento que têm certa className
 */
function alterarValorEtiqueta(className, texto) {
    var lista = document.getElementsByClassName(className);
    for (var i = 0; i < lista.length; i++) {
        lista[i].textContent = texto;
    }
    return lista;
}

/**
 * devolve  o numero de elementos que existem com certa className
 * @param {className} className pela qual se vai procurar o numero de elementos que existem
 * @return {lista.length} numero de elementos que existem com a className
 */
function numeroElementos(className) {
    var lista = document.getElementsByClassName(className);
    return lista.length;
}

function Painel(linhas, colunas) {
    Tabela.call(this, linhas, colunas);
    this.linhas = linhas;
    this.colunas = colunas;
    this.equipamentos = [];
    for (var i = 0; i < linhas; i++) {
        this.equipamentos[i] = [];
    }
}
Painel.prototype = Object.create(Tabela.prototype);
Painel.prototype.constructor = Painel;

Painel.prototype.colocar = function (linha, coluna, equipamento) {
    if ((linha >= 0) && (linha < this.linhas)
        && (coluna >= 0) && (coluna < this.colunas)
        && ((equipamento === void 0) || (equipamento instanceof Equipamento))) {
        this.equipamentos[linha][coluna] = equipamento;
        if (equipamento) {
            equipamento.prototype.apresentarEquipamento(this.celula(linha, coluna));
        } else {
            (this.apresentarEquipamento(this.celula(linha, coluna)));
        }
    }
    return this;
}

/**
 * apresentar todos os equipamentos que existem no array de equipamentos do compartimento
 * @param {arrayEquipamentos} array de equipamentos que contem todos os elementos que estao 
 * em certo compartimento
 */
function apresentarEquipamentos(arrayEquipamentos) {
    var painel = new Painel(4, 4);
    monitorizarEquipamentos();

    function monitorizarEquipamentos() {
        var div = "sistema";
        var str = "((painel";
        for (var i = 0; i < arrayEquipamentos.length; i++) {
            if (arrayEquipamentos[i].titulo.substring(0, 2) === "TM") {
                str += ".colocar(new Termometro().adicionarTermometro())";
            } else if (arrayEquipamentos[i].titulo.substring(0, 2) === "AC") {
                str += ".colocar(new ArCondicionado().adicionarArCondicionado())";
            } else if (arrayEquipamentos[i].titulo.substring(0, 2) === "DM") {
                str += ".colocar(new DetetorDeMovimento().criarLampada())";
            } else if (arrayEquipamentos[i].titulo.substring(0, 2) === "GM") {
                str += ".colocar(new GeradorDeMovimento().adicionarGeradorMovimento())";
            } else if (arrayEquipamentos[i].titulo.substring(0, 2) === "DF") {
                str += ".colocar(new DetetorFecho().criarDetetorFechoAberto())";
            } else if (arrayEquipamentos[i].titulo.substring(0, 2) === "TE") {
                str += ".colocar(new TrincoEletrico().criarTrincoEletrico())";
            } else if (arrayEquipamentos[i].titulo.substring(0, 2) === "EE") {
                str += ".colocar(new DetetorPosicaoEstoreEletrico().criarDetetorPosicaoEstoreEletrico())";
            } else if (arrayEquipamentos[i].titulo.substring(0, 2) === "ME") {
                str += ".colocar(new MotorEletricoEstore().criarMotorEletricoEstore())";
            }
        }
        str += ").apresentarEquipamento(document.getElementById(div)));";
        alert(str);
        return (eval(str));
    }
}
