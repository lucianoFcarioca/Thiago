const SENHA = "THIAGO_PADRINHO_LAURA";

let dados = {
  partidas: [],
  jogadores: []
};

let adminPartida = false;
let adminJogador = false;

function salvar() {
  localStorage.setItem("cecDados", JSON.stringify(dados));
}

function carregar() {
  const salvo = localStorage.getItem("cecDados");
  if (salvo) dados = JSON.parse(salvo);
  renderizar();
}

/* ===== NAVEGAÇÃO ===== */

window.mostrarTime = function () {
  homeScreen.classList.add("hidden");
  timeScreen.classList.remove("hidden");
  esconderFormPartida();
};

window.mostrarJogadores = function () {
  homeScreen.classList.add("hidden");
  jogadorScreen.classList.remove("hidden");
  esconderFormJogador();
};

window.voltar = function () {
  homeScreen.classList.remove("hidden");
  timeScreen.classList.add("hidden");
  jogadorScreen.classList.add("hidden");
};

/* ===== SENHA ===== */

window.validarSenha = function () {
  if (senhaInput.value === SENHA) {
    adminPartida = true;
    senhaInput.parentElement.classList.add("hidden");
    btnAddPartida.classList.remove("hidden");
  } else {
    alert("Senha incorreta");
  }
};

window.validarSenhaJogador = function () {
  if (senhaJogador.value === SENHA) {
    adminJogador = true;
    senhaJogador.parentElement.classList.add("hidden");
    btnAddJogador.classList.remove("hidden");
  } else {
    alert("Senha incorreta");
  }
};

/* ===== MOSTRAR / ESCONDER FORM ===== */

window.mostrarFormPartida = function () {
  formPartida.classList.remove("hidden");
};

function esconderFormPartida() {
  formPartida.classList.add("hidden");
}

window.mostrarFormJogador = function () {
  formJogador.classList.remove("hidden");
};

function esconderFormJogador() {
  formJogador.classList.add("hidden");
}

/* ===== ADICIONAR ===== */

window.adicionarPartida = function () {
  dados.partidas.push({
    data: data.value,
    adversario: adversario.value,
    golsTime: golsTime.value,
    golsAdversario: golsAdversario.value,
    resultado: resultado.value
  });

  salvar();
  esconderFormPartida();
  renderizar();
};

window.adicionarJogador = function () {
  dados.jogadores.push({
    nome: nome.value,
    gols: parseInt(gols.value) || 0,
    assist: parseInt(assist.value) || 0
  });

  salvar();
  esconderFormJogador();
  renderizar();
};

/* ===== RENDER ===== */

function renderizar() {

  /* PARTIDAS */
  listaPartidas.innerHTML = "";

  dados.partidas.forEach((p, i) => {
    listaPartidas.innerHTML += `
      <li>
        📅 ${p.data}<br>
        ⚽ C.E.C ${p.golsTime} x ${p.golsAdversario} ${p.adversario}<br>
        ${p.resultado}
        ${adminPartida ? `<button onclick="removerPartida(${i})">❌</button>` : ""}
      </li>`;
  });

  /* JOGADORES */
  listaJogadores.innerHTML = "";

  dados.jogadores.forEach((j, i) => {
    listaJogadores.innerHTML += `
      <li>
        👟 ${j.nome}<br>
        ⚽ ${j.gols} | 🎯 ${j.assist}<br>
        ${adminJogador ? `
          <button onclick="incrementarGol(${i})">+⚽</button>
          <button onclick="incrementarAssist(${i})">+🎯</button>
          <button onclick="removerJogador(${i})">❌</button>
        ` : ""}
      </li>`;
  });

  if (dados.jogadores.length) {
    const topG = dados.jogadores.reduce((a,b)=>a.gols>b.gols?a:b);
    const topA = dados.jogadores.reduce((a,b)=>a.assist>b.assist?a:b);

    topGols.innerHTML = `🔥 ${topG.nome} (${topG.gols} gols)`;
    topAssist.innerHTML = `🎯 ${topA.nome} (${topA.assist} assistências)`;
  }
}

/* ===== INCREMENTOS ===== */

window.incrementarGol = function(i){
  dados.jogadores[i].gols++;
  salvar();
  renderizar();
}

window.incrementarAssist = function(i){
  dados.jogadores[i].assist++;
  salvar();
  renderizar();
}

window.removerPartida = function(i){
  dados.partidas.splice(i,1);
  salvar();
  renderizar();
}

window.removerJogador = function(i){
  dados.jogadores.splice(i,1);
  salvar();
  renderizar();
}

carregar();