function cadastrar() {
    const paginaPrincipal = window.document.querySelector('section.principal')
    const paginaJogadores = window.document.querySelector('section.jogadores')
    paginaPrincipal.style.display = 'none'
    paginaJogadores.style.display = 'block'
}