// Seleciona todos os botões e personagens
const botoes = document.querySelectorAll('.botao');
const personagens = document.querySelectorAll('.personagem');

/**
 * Remove a classe "selecionado" do botão atualmente selecionado
 */
function desmarcarBotaoSelecionado() {
    const botaoSelecionado = document.querySelector('.botao.selecionado');
    if (botaoSelecionado) {
        botaoSelecionado.classList.remove('selecionado');
    }
}

/**
 * Adiciona a classe "selecionado" ao botão clicado
 * @param {HTMLElement} botao - O botão que foi clicado
 */
function marcarBotaoComoSelecionado(botao) {
    botao.classList.add('selecionado');
}

/**
 * Remove a classe "selecionado" do personagem atualmente visível
 */
function esconderPersonagemSelecionado() {
    const personagemSelecionado = document.querySelector('.personagem.selecionado');
    if (personagemSelecionado) {
        personagemSelecionado.classList.remove('selecionado');
    }
}

/**
 * Mostra o personagem correspondente ao botão clicado
 * @param {number} indice - O índice do botão clicado
 */
function mostrarPersonagem(indice) {
    personagens[indice].classList.add('selecionado');
}

/**
 * Função que lida com o clique no botão
 * @param {HTMLElement} botao - O botão clicado
 * @param {number} indice - O índice do botão clicado
 */
function aoClicarNoBotao(botao, indice) {
    desmarcarBotaoSelecionado();
    marcarBotaoComoSelecionado(botao);
    esconderPersonagemSelecionado();
    mostrarPersonagem(indice);
}

// Adiciona o evento de clique a cada botão da lista
botoes.forEach((botao, indice) => {
    botao.addEventListener("click", () => aoClicarNoBotao(botao, indice));
});

// Espera o carregamento total da página
window.onload = () => {
    const popup = document.getElementById('popup');
    const startBtn = document.getElementById('startBtn');
    const audio = document.getElementById('somAlarme');
    const contador = document.getElementById('contador');

    let tempoInicial = 90; // 1 minuto e 30 segundos
let tempoBateria = 300; // 5 minutos
let intervalo = null;

function formatarTempo(segundos) {
    const min = String(Math.floor(segundos / 60)).padStart(2, '0');
    const seg = String(segundos % 60).padStart(2, '0');
    return `${min}:${seg}`;
}

function iniciarContagem(tempo, callbackFinal) {
    let tempoRestante = tempo;
    const contador = document.getElementById('contador');
    contador.style.display = 'block';
    contador.textContent = formatarTempo(tempoRestante);

    intervalo = setInterval(() => {
        tempoRestante--;
        contador.textContent = formatarTempo(tempoRestante);

        if (tempoRestante <= 0) {
            clearInterval(intervalo);
            callbackFinal();
        }
    }, 1000);
}

// Quando clica no botão "OK" do pop-up inicial
document.getElementById('startBtn').addEventListener('click', () => {
    document.getElementById('popup').style.display = 'none';
    document.getElementById('somAlarme').play();
    iniciarContagem(tempoInicial, mostrarAlertaUmbilical);
});

function mostrarAlertaUmbilical() {
    setTimeout(() => {
        const alerta = document.createElement('div');
        alerta.classList.add('popup');
        alerta.innerHTML = `
            <div class="popup-content">
                <h1>🚨 Umbilical Cable rompido!</h1>
                <p>A unidade EVA só tem 5 minutos de bateria.</p>
                <button id="okBateria">OK</button>
            </div>
        `;
        document.body.appendChild(alerta);

        document.getElementById('okBateria').addEventListener('click', () => {
            alerta.remove();

            const novoAudio = new Audio('./src/audio/NeonGenesisEvangelionBattle.mp3');
            novoAudio.play();
           let acertos = 0;

function mostrarPergunta(titulo, pergunta, opcoes, respostaCorreta, tempoExibicaoMs) {
    setTimeout(() => {
        const popup = document.createElement('div');
        popup.classList.add('popup');
        popup.innerHTML = `
            <div class="popup-content">
                <h1>${titulo}</h1>
                <p>${pergunta}</p>
                ${opcoes.map((opcao, index) => `<button class="opcao" data-index="${index}">${opcao}</button>`).join('')}
            </div>
        `;
        document.body.appendChild(popup);

        popup.querySelectorAll('.opcao').forEach(btn => {
            btn.addEventListener('click', () => {
                const escolha = btn.textContent.trim();
                if (escolha === respostaCorreta) {
                    acertos++;
                    alert("✅ Sincronia aumentada com o Eva!");
                } else {
                    alert("❌ Sincronia diminuída...");
                }
                popup.remove();
            });
        });
    }, tempoExibicaoMs);
}

mostrarPergunta("🧠 Teste de Sincronia 1", "Quem é o piloto da Unidade 00?", ["Rei", "Asuka", "Shinji"], "Rei", 60_000); // aos 4min
mostrarPergunta("🧠 Teste de Sincronia 2", "Quem é o piloto da Unidade 01?", ["Shinji", "Kaworu", "Misato"], "Shinji", 120_000); // aos 3min
mostrarPergunta("🧠 Teste de Sincronia 3", "Quem é o piloto da Unidade 02?", ["Asuka", "Rei", "Mari"], "Asuka", 180_000); // aos 2min

setTimeout(() => {
    const popupFinal = document.createElement('div');
    popupFinal.classList.add('popup');
    popupFinal.innerHTML = `
        <div class="popup-content">
            <h1>${acertos === 3 ? "💥 Modo Berserk Ativado!" : "⚠️ Batalha complicada!"}</h1>
            <p>${
                acertos === 3
                    ? "O Eva entrou em modo Berserk e rompeu o Campo AT do Anjo!"
                    : "A sincronia está baixa e só resta 1 minuto de bateria..."
            }</p>
            <button id="okFinalParcial">OK</button>
        </div>
    `;
    document.body.appendChild(popupFinal);
    document.getElementById('okFinalParcial').addEventListener('click', () => {
        popupFinal.remove();
    });
}, 240_000); // aos 4min (1 min restante)

iniciarContagem(tempoBateria, () => {
    const popupFim = document.createElement('div');
    popupFim.classList.add('popup');
    popupFim.innerHTML = `
        <div class="popup-content">
            <h1>${acertos === 3 ? "✅ Vitória!" : "🛑 Derrota"}</h1>
            <p>${
                acertos === 3
                    ? "O modo Berserk destruiu o anjo com sucesso. Parabéns, piloto!"
                    : "A bateria do Eva se esgotou. Você foi resgatado por outra unidade. Prepare-se e tente novamente."
            }</p>
            <button id="fimBtn">OK</button>
        </div>
    `;
    document.body.appendChild(popupFim);
    document.getElementById('fimBtn').addEventListener('click', () => {
        popupFim.remove();
        if (acertos === 3) {
            const musicaFinal = new Audio('./src/audio/NeonGenesisEvangelionEnding.mp3');
            musicaFinal.play();
        } else {
            location.reload(); // reinicia a página
        }
    });
});
        });
    }, 500); // delay para garantir que não dê conflito visual
}

    // Ação ao clicar no botão do pop-up
    startBtn.addEventListener('click', iniciarAlerta);

   
};
