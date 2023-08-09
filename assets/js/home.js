const imagens = ['/assets/image/android.png', '/assets/image/smart-tv.png', '/assets/image/windows.png'];
let indiceImagem = 0;
let soma = 0;
let contagemCliques = 0;
let img = [];
let indiceAtual = 0;
let avaliarBtn = document.querySelectorAll('.avaliar-btn');

function buscarImagens() {
  $.ajax({
    method: 'GET',
    url: 'https://api.pexels.com/v1/search?query=beautiful%20person&per_page=100',
    headers: {
      Authorization: 'ILpgjEXkumbvZkNsfH4ZOKkjHly9FH9K8srqpg12z8xT5tfLFzS8k8z4'
    },
    success: function(data) {
      img = data.photos.map(photo => photo.src.large);
      atualizarImagem();
    },
    error: function(err) {
      console.log('Erro ao buscar imagem', err);
    }
  });
}

function atualizarImagem() {
  if (img.length) {
    indiceAtual = Math.floor(Math.random() * img.length);
    document.getElementById('imagem-div').style.backgroundImage = 'url(' + img[indiceAtual] + ')';
  }
}

function avaliar(positivo) {
  contagemCliques++;

  if (contagemCliques > 15) {
    $('#meuModal').modal('show'); // Exibe o modal
    return; // Saia da função
  }

  let pontuacao = 1 + Math.random();

  if (!positivo) {
    pontuacao = pontuacao;
  }

  soma += pontuacao;


  document.getElementById('pontuacao').textContent = pontuacao.toFixed(2); // Exibe com duas casas decimais
  document.getElementById('soma').textContent = soma.toFixed(2); // Exibe com duas casas decimais


  if (contagemCliques >= 50) {
    $('#meuModal').modal('show'); // Exibe o modal se o botão foi pressionado 10 vezes
  }

  if (img.length) {
    atualizarImagem(); // Atualize a imagem após a avaliação
  }
}

$(document).ready(function() {
  buscarImagens();
  avaliarBtn.forEach((btn) => {
    btn.addEventListener('click', function() {
      const positivo = this.classList.contains('btn-primary');
      avaliar(positivo);
    });
  });
});

const container = document.getElementById('container');
const hammer = new Hammer(container);

hammer.on('swipeleft', function() {
  // Lógica para deslizar para a esquerda
  container.scrollLeft += 2000; // Ajuste conforme necessário
});

hammer.on('swiperight', function() {
  // Lógica para deslizar para a direita
  container.scrollLeft -= 2000; // Ajuste conforme necessário
});



function scrollEsquerda() {

    container.scrollLeft -= 2000; // Ajuste conforme necessário
  }
  


function scrollRight() {

  container.scrollLeft += 2000; // Ajuste conforme necessário
}




$.ajax({
  method: 'GET',
  url: 'https://api.pexels.com/v1/search?query=person&per_page=10',
  headers: {
    Authorization: 'ILpgjEXkumbvZkNsfH4ZOKkjHly9FH9K8srqpg12z8xT5tfLFzS8k8z4'
  },
  success: function(data, textStatus, request) {
    const limiteTotal = request.getResponseHeader('X-Ratelimit-Limit');
    const solicitaçõesRestantes = request.getResponseHeader('X-Ratelimit-Remaining');
    console.log(`Limite total: ${limiteTotal}`);
    console.log(`Solicitações restantes: ${solicitaçõesRestantes}`);
  },
  error: function(err) {
    console.log('Erro ao buscar imagem', err);
  }
});
