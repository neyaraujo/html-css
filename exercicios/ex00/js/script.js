const paginaPrincipal = window.document.querySelector('section.principal')
    const paginaJogadores = window.document.querySelector('section.jogadores')
    
    let retornoE1 = document.getElementById('retorno')
    let jogadorE1 = document.querySelector('#ijogador')
    let numeroJogadoresE1 = document.querySelector('#numero-jogadores')
    let jogador = jogadorE1.value
    let jogadores = []
    reset()
    
    // mostra apenas a secão principal
    paginaPrincipal.style.display = 'block'
    
    // vai para a seção cadastrar
    function adicionar() {
        paginaPrincipal.style.display = 'none'
        paginaJogadores.style.display = 'block'
    }
    
    function save() {
        let jogadorE1 = document.querySelector('#ijogador')
        let jogador = jogadorE1.value
        if(inList(jogadores, jogador)) {
            alert('ja exite esse nome')
        } else {
            jogadores.push(jogador)

        }
        
        retornoE1.innerHTML = jogadores
        reset();
    }

    function inList(l, v) {
        if(l.indexOf(v) != -1) {
            return true
        }else {
            return false
        }
    }
    
    function reset() {
        jogadorE1.value = '';
    }
    
    const tableE1 = document.querySelector('.tab-list')
    function voltar() {
        tableE1.innerHTML = '';
        for(let pos in jogadores){
            
            paginaPrincipal.style.display = 'block';
            paginaJogadores.style.display = 'none';
            let novaLinha = tableE1.insertRow();
            let celula1 = novaLinha.insertCell(0)
            let celula2 = novaLinha.insertCell(1)
            let celula3 = novaLinha.insertCell(2)
            
            celula1.textContent = jogadores[pos]
            celula2.innerHTML = 
            '<i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star"></i>'
            celula3.innerHTML = '<i class="bi bi-check-square-fill"></i>'
        }
        numeroJogadoresE1.innerHTML = jogadores.length
        
}

//SE o nome que foi cadastrado ja existe ENTÃO
//retornar msg ja existe SE NÃO
//continar cadastrando

