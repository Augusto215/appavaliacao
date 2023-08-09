let indiceImagem = 0;
let soma = 0;
let contagemCliques = 0;
let img = [];
let indiceAtual = 0;
let avaliarBtn = document.querySelectorAll('.avaliar-btn');
let podeClicar = true;

function buscarImagens(page = 1) {
  const perPage = 100;
  $.ajax({
    method: 'GET',
    url: `https://api.pexels.com/v1/search?query=outfit&per_page=${perPage}&page=${page}`,
    headers: {
      Authorization: 'ILpgjEXkumbvZkNsfH4ZOKkjHly9FH9K8srqpg12z8xT5tfLFzS8k8z4'
    },
    success: function(data) {
      img = img.concat(data.photos.map(photo => photo.src.large));
      if (data.next_page) {
        buscarImagens(page + 1);
      }
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
  if (!podeClicar) return;

  podeClicar = false;
  setTimeout(() => {
    podeClicar = true;
  }, 1350); // Atraso de 1 segundo entre os cliques

  contagemCliques++;

  if (contagemCliques > 50) {
    $('#meuModal').modal('show');
    return;
  }

  let pontuacao = 1 + Math.random();
  soma += pontuacao;
  document.getElementById('pontuacao').textContent = pontuacao.toFixed(2);
  document.getElementById('soma').textContent = soma.toFixed(2);

  if (contagemCliques >= 50) {
    $('#meuModal').modal('show');
  }

  if (img.length) {
    atualizarImagem();
  }
}

$(document).ready(function() {
  buscarImagens(1);
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
  container.scrollLeft += 2000;
});

hammer.on('swiperight', function() {
  container.scrollLeft -= 2000;
});

function scrollEsquerda() {
  container.scrollLeft -= 2000;
}

function scrollRight() {
  container.scrollLeft += 2000;
}
