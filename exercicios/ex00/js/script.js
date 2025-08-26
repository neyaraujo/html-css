const paginaPrincipal = document.querySelector('section.principal');
const paginaJogadores = document.querySelector('section.jogadores');
const paginaSorteados = document.querySelector('section.sortear');
const paginaEdition = document.querySelector('section.edition');
const retornoE1 = document.getElementById('retorno');
const jogadorE1 = document.querySelector('#ijogador');
const numeroJogadoresE1 = document.querySelector('#numero-jogadores');
const tableE1 = document.querySelector('.tab-list');
const resultadoSorteado = document.querySelector('#resultado-sorteado');
const editionName = document.querySelector('#edition-nome')

const headerPrincipal = document.documentElement.querySelector('header')

let jogadores = [];

// mostra apenas a seção principal
paginaPrincipal.style.display = 'block';

function adicionar() {

    paginaPrincipal.style.order = 1;
    paginaJogadores.style.order = 2;
    paginaSorteados.style.order = 3;
    paginaEdition.style.order = 4;

    paginaPrincipal.style.display = 'none';
    paginaJogadores.style.display = 'block';
    paginaSorteados.style.display = 'none'
    paginaEdition.style.display = 'none'
}

function save() {
    let nome = jogadorE1.value.trim();
    if (!nome) {
        retornoE1.textContent = "Digite um nome válido";
        retornoE1.className = "erro";
        return;
    }
    if (jogadores.includes(nome)) {
        retornoE1.textContent = "Esse nome já existe!";
        retornoE1.className = "erro";
        return;
    }
    jogadores.push(nome);
    retornoE1.textContent = `Total de Jogadores: ${jogadores.length}`;
    retornoE1.className = "sucesso";
    reset(jogadorE1);
}

function reset(input) {
    input.value = '';
    input.focus();
}

//VOLTAR

function voltar() {
    tableE1.innerHTML = '';
    paginaPrincipal.style.display = 'block';
    paginaJogadores.style.display = 'none';
    paginaSorteados.style.display = 'none';
    paginaEdition.style.display = "none"

    jogadores.forEach(jogador => {
        let novaLinha = tableE1.insertRow();
        novaLinha.insertCell(0).textContent = jogador;
        novaLinha.insertCell(1).innerHTML = '<i class="bi bi-star"></i>'.repeat(5);
        novaLinha.insertCell(2).innerHTML = '<i class="bi bi-check-square-fill"></i>';
    });

    numeroJogadoresE1.textContent = jogadores.length;
}

function sortear() {
    const selectGrupo = document.querySelector('#igrupos');
    let jogadoresPorGrupo = Number(selectGrupo.value);

    if (jogadoresPorGrupo <= 0 || jogadores.length === 0) {
        resultadoSorteado.textContent = "Adicione jogadores e selecione um número válido de jogadores por grupo!";
        return;
    }

    // embaralhar jogadores
    const sorteados = [...jogadores].sort(() => Math.random() - 0.5);

    const grupos = [];
    for (let i = 0; i < sorteados.length; i += jogadoresPorGrupo) {
        grupos.push(sorteados.slice(i, i + jogadoresPorGrupo));
    }

    // mostrar resultado
    resultadoSorteado.innerHTML = grupos.map((grupo, idx) => `
        <h2>Grupo ${idx + 1}</h2>
        <p>${grupo.join("<br>")}</p>
    `).join("");

    // mostrar seção de sorteio
    paginaPrincipal.style.display = 'none';
    paginaJogadores.style.display = 'none';
    document.querySelector('section.sortear').style.display = 'block';
}

function sectionSortear() {
    paginaPrincipal.style.display = 'none';
    paginaJogadores.style.display = 'none';
    paginaSorteados.style.display = 'block';
}

let celulaEmEdicao = null;
let jogadorOriginal = ""; // guardar valor antes da edição

tableE1.addEventListener("click", function(e) {
    if (e.target.tagName === "TD" && jogadores.includes(e.target.textContent)) {
        celulaEmEdicao = e.target;
        jogadorOriginal = e.target.textContent; // salva valor antigo

        // troca de telas
        paginaPrincipal.style.display = "none";
        paginaJogadores.style.display = "none";
        paginaSorteados.style.display = "none";
        paginaEdition.style.display = "block";

        editionName.value = e.target.textContent;
    }
});

function editionSave() {
    if (celulaEmEdicao) {
        const novoNome = editionName.value.trim();
        if (!novoNome) {
            alert("Digite um nome válido!");
            return;
        }
        if (jogadores.includes(novoNome) && novoNome !== jogadorOriginal) {
            alert("Esse nome já existe!");
            return;
        }

        // atualiza célula
        celulaEmEdicao.textContent = novoNome;

        // atualiza no array (com base no valor antigo)
        let idx = jogadores.indexOf(jogadorOriginal);
        if (idx !== -1) {
            jogadores[idx] = novoNome;
        }
        editionName.style.color = "#ccc"
        // volta para jogadores
        // paginaEdition.style.display = "none";
        // paginaJogadores.style.display = "block";
    }
}

// BLOQUEAR REFRESH

let lastY = 0;

document.addEventListener("touchstart", function(e) {
    lastY = e.touches[0].clientY;
});

document.addEventListener("touchmove", function (e){
    let currentY = e.touches[0].clientY;

    // se o ousuário tentar puxar para baixo no topo da página
    if (window.scrollY === 0 && currentY > lastY) {
        e.preventDefault();
    }
    }, {passive: false});
