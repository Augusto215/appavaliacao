const imagens = ['/assets/image/android.png', '/assets/image/smart-tv.png', '/assets/image/windows.png']; // Adicione seus nomes de arquivos de imagem aqui
let indiceImagem = 0;
let soma = 0;
let contagemCliques = 0;

function avaliar(positivo) {
    contagemCliques++;

    let pontuacao = Math.floor(Math.random() * 10) + 1; // Gera uma pontuação aleatória entre 1 e 10

    if (!positivo) {
        pontuacao = -pontuacao;
    }

    soma += pontuacao; // Adiciona a pontuação à soma

    // Atualiza a pontuação e a soma na página
    document.getElementById('pontuacao').textContent = pontuacao;
    document.getElementById('soma').textContent = soma;

    // Busca uma imagem aleatória de pessoa
    $.ajax({
        url: 'https://randomuser.me/api/',
        dataType: 'json',
        success: function(data) {
            document.getElementById('imagem').src = data.results[0].picture.large;
        }
    });

    if (contagemCliques >= 50) {
        $('#meuModal').modal('show'); // Exibe o modal se o botão foi pressionado 10 vezes
    }
}




$(document).ready(function() {
    $.ajax({
        url: 'https://randomuser.me/api/',
        dataType: 'json',
        success: function(data) {
            document.getElementById('imagem').src = data.results[0].picture.large;
        }
    });
});


$(function() {
    let container = $('#container');

    container.swipe({
        swipeLeft: function() {
            // Swipe para a esquerda: mover para a próxima seção
            container.animate({ scrollLeft: '+=100vw' }, 900);
        },
        swipeRight: function() {
            // Swipe para a direita: mover para a seção anterior
            container.animate({ scrollLeft: '-=100vw' }, 900);
        }
    });
});