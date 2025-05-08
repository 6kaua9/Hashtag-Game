const mesa = document.getElementById('mesa');

let players = {
    p1: null,
    p2: null
}
let placarX = 0, placarO = 0;

mesa.addEventListener('click', function(e){
    const casa = e.target;
    if(players.p1 === 'x' && casa.innerHTML === ''){
        casa.innerHTML = "X";
        players = {
            p1: 'o',
            p2: 'x'
        }
    } 
    else if(players.p1 === 'o' && casa.innerHTML === ''){
        casa.innerHTML = 'O';
        players = {
            p1: 'x',
            p2: 'o'
        }
    }
    else{
        alert('selecione X ou O');
    }
   
      // Verifica a vitória após cada jogada
      const resultado = verificarVitoria();
      
        if (resultado === 'X' || resultado === 'O') {
            if (resultado === 'X') {
                casa.innerHTML = "X";
                placarX++;
            } else {
                casa.innerHTML = 'O';
                placarO++;
            }
            placar.innerHTML = `
                <span id="placarX" class="placarX">❌ = ${placarX}</span> | <span id="placarO" class="placarO">⭕️ = ${placarO}</span>
            `;
            setTimeout(() => {
                alert(`O jogador ${resultado} venceu!`);
                limparMesa();
            }, 1000); 
        } else if (resultado === 'empate') {
            animarEmpate();
            setTimeout(() => {
                alert('Deu velha! O jogo empatou!');
                limparMesa();
            }, 1000); 
        }
      

})

function animarEmpate(){
 const mesa = document.getElementById('mesa');
 mesa.classList.add('animar-empate');

 setTimeout(()=>{
    mesa.classList.remove('animar-empate');
 }, 1000);
}

const placar = document.getElementById('placar');
placar.addEventListener('click', players = function(e){
    const enunciado = document.getElementById('enunciado');
    if(enunciado.style.display === "none"){
        return;
    }
    enunciado.style.display = "none";
    const opcao = e.target;
    
     placar.innerHTML = `
    <span id="placarX" class="placarX">❌ = 0</span> | <span id="placarO" class="placarO">⭕️ = 0</span>
    `
    if(opcao.id === 'placarX'){
        players = {
            p1: 'x',
            p2: 'o'
        }
        return players;
    }else{
        players = {
            p1: 'o',
            p2: 'x'
        }
        return players;
    }
});

function limparMesa(){
    const casa = document.getElementsByClassName('casa');
    for(let i = 0; i < casa.length; i++){
        casa[i].innerHTML = '';
        casa[i].classList.remove('vitoria');
    }
}
function reiniciar(){
    if (confirm("Deseja mesmo reiniciar o jogo?")) {
        limparMesa();
        placar.innerHTML = `
        <span id="placarX" class="placarX">❌ = 0</span> | <span id="placarO" class="placarO">⭕️ = 0</span>
        `
        alert("Jogo reiniciado")
    }
}

function verificarVitoria() {
    const c1 = document.getElementById('c1');
    const c2 = document.getElementById('c2');
    const c3 = document.getElementById('c3');
    const c4 = document.getElementById('c4');
    const c5 = document.getElementById('c5');
    const c6 = document.getElementById('c6');
    const c7 = document.getElementById('c7');
    const c8 = document.getElementById('c8');
    const c9 = document.getElementById('c9');

    // Define as combinações vencedoras
    const linhasVencedoras = [
        [c1, c2, c3], [c4, c5, c6], [c7, c8, c9], // Linhas
        [c1, c4, c7], [c2, c5, c8], [c3, c6, c9], // Colunas
        [c1, c5, c9], [c3, c5, c7]                // Diagonais
    ];

    // Verifica as combinações vencedoras
    for (const linha of linhasVencedoras) {
        if (linha[0].innerHTML && linha[0].innerHTML === linha[1].innerHTML && linha[0].innerHTML === linha[2].innerHTML) {
            // Adiciona a classe 'riscar' às casas vencedoras
            linha.forEach(casa => casa.classList.add('vitoria'));
            return linha[0].innerHTML; // Retorna 'X' ou 'O' se houver um vencedor
        }
    }

    if (c1.innerHTML && c2.innerHTML && c3.innerHTML && c4.innerHTML && c5.innerHTML && c6.innerHTML && c7.innerHTML && c8.innerHTML && c9.innerHTML) {
        return 'empate'; 
    }

    return null; // Retorna null se o jogo ainda estiver em andamento
}
