let indiceImagem = 0;
let soma = parseFloat(localStorage.getItem('soma')) || 0;
let contagemCliques = parseInt(localStorage.getItem('contagemCliques')) || 0;
let img = [
  "img1.jpg",
  "img2.jpg",
  "img3.jpg",
  "img4.jpg",
  "img5.jpg",
  "img6.jpg",
  "img7.jpg",
  "img8.jpg",
  "img9.jpg",
  "img10.jpg",
  "img11.jpg",
  "img12.jpg",
  "img13.jpg",
  "img14.jpg",
  "img15.jpg",
  "img16.jpg",
  "img17.jpg",
  "img18.jpg",
  "img19.jpg",
  "img20.jpg",
  "img21.jpg",
  "img22.jpg",
  "img23.jpg",
  "img24.jpg",
  "img25.jpg",
  "img26.jpg",
  "img27.jpg",
  "img28.jpg",
  "img29.jpg",
  "img30.jpg",
  "img31.jpg",
  "img32.jpg",
  "img33.jpg",
  "img34.jpg",
  "img35.jpg",
  "img36.jpg",
  "img37.jpg",
  "img38.jpg",
  "img39.jpg",
  "img40.jpg",
  "img41.jpg",
  "img42.jpg",
  "img43.jpg",
  "img44.jpg",
  "img45.jpg",
  "img46.jpg",
  "img47.jpg",
  "img48.jpg",
  "img49.jpg",
  "img50.jpg"
];

let indiceAtual = 0;
let pontuacaoSalva = parseFloat(localStorage.getItem('pontuacao')) || 0;

document.getElementById('pontuacao').textContent = pontuacaoSalva.toFixed(2);
document.getElementById('soma').textContent = soma.toFixed(2);

let avaliarBtn = document.querySelectorAll('.avaliar-btn');
let podeClicar = true;

function atualizarImagem() {
  if (img.length) {
    document.getElementById('imagem-div').style.backgroundImage = 'url(' + img[indiceAtual] + ')';
    indiceAtual++;
    if (indiceAtual >= img.length) {
      indiceAtual = 0; // Reset para o início do array
    }
  }
}

function avaliar(positivo) {
  if (!podeClicar) return;
  podeClicar = false;

  setTimeout(() => {
    podeClicar = true;
  }, 1350);

  contagemCliques++;
  localStorage.setItem('contagemCliques', contagemCliques);

  if (contagemCliques > 50) {
    $('#meuModal').modal('show');
    return;
  }

  let pontuacao = 1 + Math.random();
  soma += pontuacao;

  localStorage.setItem('soma', soma);
  localStorage.setItem('pontuacao', pontuacao);

  document.getElementById('pontuacao').textContent = pontuacao.toFixed(2);
  document.getElementById('soma').textContent = soma.toFixed(2);

  if (contagemCliques >= 50) {
    $('#meuModal').modal('show');
  }

  atualizarImagem();
}

document.addEventListener('DOMContentLoaded', () => {
  avaliarBtn.forEach((btn) => {
    btn.addEventListener('click', function() {
      const positivo = this.classList.contains('btn-primary');
      avaliar(positivo);
    });
  });

  document.getElementById('soma').textContent = soma.toFixed(2);

  if (contagemCliques >= 50) {
    $('#meuModal').modal('show');
  }

  atualizarImagem();
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
