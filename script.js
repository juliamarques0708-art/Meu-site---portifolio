// Ao carregar a página, verifica se já existe um último sorteado salvo no localStorage
window.onload = function () {
    const ultimo = localStorage.getItem("ultimoSorteadoJulia");
    if (ultimo) {
        document.getElementById("ultimo-salvo").innerText = "Último nome sorteado (salvo): " + ultimo;
    }
};

// DEGRAU MÍNIMO: Botão que muda a página usando if/else (esconder/mostrar ferramentas)
function alternarFerramenta(escolha) {
    const secSorteador = document.getElementById("sec-sorteador");
    const secDesconto = document.getElementById("sec-desconto");

    if (escolha === "sorteador") {
        // Se estava escondido, mostra; se já estava visível, esconde (toggle)
        if (secSorteador.classList.contains("oculto")) {
            secSorteador.classList.remove("oculto");
            secDesconto.classList.add("oculto");
        } else {
            secSorteador.classList.add("oculto");
        }
    } else if (escolha === "desconto") {
        if (secDesconto.classList.contains("oculto")) {
            secDesconto.classList.remove("oculto");
            secSorteador.classList.add("oculto");
        } else {
            secDesconto.classList.add("oculto");
        }
    }
}

// FERRAMENTA 1: SORTEADOR DE NOMES
function sortearNome() {
    const campoTexto = document.getElementById("input-nomes").value;
    const msgErro = document.getElementById("erro-sorteio");
    const boxResultado = document.getElementById("box-resultado");
    const areaLista = document.getElementById("area-lista");

    // Limpa mensagens anteriores
    msgErro.innerText = "";

    // DEGRAU INTERMEDIÁRIO: Validação de campo vazio
    if (campoTexto.trim() === "") {
        msgErro.innerText = "⚠️ Por favor, digite pelo menos dois nomes antes de sortear.";
        boxResultado.classList.add("oculto");
        return;
    }

    // Transforma o texto digitado em uma lista (Array), separando por vírgula ou quebra de linha
    const listaBruta = campoTexto.split(/[\n,]+/);
    const nomesValidos = [];

    // DEGRAU COMPLETO: Uso de Array com laço (for) para limpar espaços e validar itens
    for (let i = 0; i < listaBruta.length; i++) {
        const nomeLimpo = listaBruta[i].trim();
        if (nomeLimpo !== "") {
            // Valida se a pessoa digitou apenas números no lugar de um nome
            if (!isNaN(nomeLimpo)) {
                msgErro.innerText = "⚠️ Digite nomes válidos, não apenas números (" + nomeLimpo + ").";
                return;
            }
            nomesValidos.push(nomeLimpo);
        }
    }

    // Valida se há pelo menos 2 participantes
    if (nomesValidos.length < 2) {
        msgErro.innerText = "⚠️ Insira pelo menos 2 nomes diferentes para fazer o sorteio.";
        boxResultado.classList.add("oculto");
        return;
    }

    // Sorteia um índice aleatório dentro do tamanho do array
    const indiceSorteado = Math.floor(Math.random() * nomesValidos.length);
    const vencedor = nomesValidos[indiceSorteado];

    // Exibe o resultado na tela
    document.getElementById("nome-sorteado").innerText = vencedor;
    boxResultado.classList.remove("oculto");

    // DEGRAU COMPLETO: Guarda o resultado no localStorage
    localStorage.setItem("ultimoSorteadoJulia", vencedor);
    document.getElementById("ultimo-salvo").innerText = "Último nome sorteado (salvo): " + vencedor;

    // Mostra todos os participantes na tela usando um laço (for)
    const ulParticipantes = document.getElementById("ul-participantes");
    ulParticipantes.innerHTML = "";
    for (let i = 0; i < nomesValidos.length; i++) {
        const li = document.createElement("li");
        li.innerText = nomesValidos[i];
        ulParticipantes.appendChild(li);
    }
    areaLista.classList.remove("oculto");
}

function limparSorteio() {
    document.getElementById("input-nomes").value = "";
    document.getElementById("erro-sorteio").innerText = "";
    document.getElementById("box-resultado").classList.add("oculto");
    document.getElementById("area-lista").classList.add("oculto");
}

// FERRAMENTA 2: CALCULADORA DE DESCONTO (Validação numérica extra)
function calcularDesconto() {
    const valorTexto = document.getElementById("valor-original").value.replace(",", ".");
    const descTexto = document.getElementById("porcentagem-desconto").value.replace(",", ".");
    const msgErro = document.getElementById("erro-desconto");
    const boxResultado = document.getElementById("resultado-desconto");

    msgErro.innerText = "";

    // Validação: campo vazio ou letra no lugar de número
    if (valorTexto.trim() === "" || descTexto.trim() === "") {
        msgErro.innerText = "⚠️ Preencha os dois campos antes de calcular.";
        boxResultado.classList.add("oculto");
        return;
    }

    const valor = Number(valorTexto);
    const desconto = Number(descTexto);

    if (isNaN(valor) || isNaN(desconto) || valor <= 0 || desconto < 0 || desconto > 100) {
        msgErro.innerText = "⚠️ Digite números válidos (desconto entre 0% e 100%).";
        boxResultado.classList.add("oculto");
        return;
    }

    const valorFinal = valor - (valor * (desconto / 100));
    document.getElementById("preco-final").innerText = "R$ " + valorFinal.toFixed(2).replace(".", ",");
    boxResultado.classList.remove("oculto");
}