const paginaPrincipal = window.document.querySelector('section.principal')
    const paginaJogadores = window.document.querySelector('section.jogadores')
    
    let retornoE1 = document.getElementById('retorno')
    let jogadorE1 = document.querySelector('#ijogador')

    reset()
    
    
    paginaPrincipal.style.display = 'block'
    
    function cadastrar() {
        paginaPrincipal.style.display = 'none'
        paginaJogadores.style.display = 'block'
    }
    
    let jogadores = []
    function save() {
        
        let jogador = jogadorE1.value
        jogadores.push(jogador)
        retornoE1.innerHTML = jogadores
        reset();
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
}