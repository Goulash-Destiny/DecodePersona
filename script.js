// =========================================================================
// Primeiro copia o que está na variável no html e transfere para uma variável no js:
// Depois cria-se uma variável de memória que inicialmente é vazia:
// =========================================================================





// ELEMENTOS GLOBAIS DO MAPA
const topAddCircleBtn = document.getElementById('topAddCircleBtn'); //const é uma variável que não muda de valor
const clearAllBtn = document.getElementById('clearAllBtn'); // Botão temporário para limpar tudo
const visualPlane = document.getElementById('visual-plane'); //e a area invisivel onde vai ficar o circulo com 
const canvasContainer = document.getElementById('canvas-container'); 

// ELEMENTOS DO POPUP DO CÍRCULO SOCIAL
const circlePopup = document.getElementById('circlePopup'); //janela flutuante
const newCircleNameInput = document.getElementById('newCircleNameInput'); //a caixa do input
const cancelCircleBtn = document.getElementById('cancelCircleBtn'); //botão cancelar
const confirmCircleBtn = document.getElementById('confirmCircleBtn'); //botão cancelar
const viewPerson = document.getElementById('personView');

//Botão menu lateral
const menuLateral = document.getElementById('menuLateral');
const btnAbrir = document.getElementById('btn-menuLateral');
const btnFechar = document.getElementById('btnFechar');


// ELEMENTOS DA SUBTELA GRANDE DE CADA PERFIL
const personModal = document.getElementById('personModal'); //pág de cadastro
const personNameInput = document.getElementById('personName');//guarda o input do nome do perfil
const personColorInput = document.getElementById('personColor'); //guarda a cor do seletor no cadastro
const backPersonBtn = document.getElementById('backPersonBtn'); //voltar
const addPersonBtn = document.getElementById('addPersonBtn'); //adicionar

// NOVAS VARIÁVEIS CADASTRADAS:
const personAgeInput = document.getElementById('personAge'); // guarda o input de idade
const personBirthInput = document.getElementById('personBirth'); // guarda o input de nascimento
const personSocialInput = document.getElementById('personSocial'); // guarda o input da rede social
const personEnderecoInput = document.getElementById('personAddress'); // guarda o input de endereço
const personProfissaoInput = document.getElementById('personProfession'); // guarda o input da profissão
const personQualidadesInput = document.getElementById('personQualidades'); // guarda o input das qualidades
const personDefeitosInput = document.getElementById('personDefeitos'); // guarda o input da defeitos
const personTratamentoInput = document.getElementById('personTratamento'); // guarda o input do tratamento ao proximo
const personSobAtaqueInput = document.getElementById('personSobAtaque'); // guarda o input de sob ataque
const personVulnerabilidadeInput = document.getElementById('personVulnerabilidade'); // guarda o input de vulnerabilidade

const personTraumaInput = document.getElementById('personTraumas'); // guarda o input de trauma
const personInsegurancaInput = document.getElementById('personInseguranca'); // guarda o input de inseguranca
const personMinoriaInput = document.getElementById('personMinoria'); // guarda o input de minoria
const personQuebraInput = document.getElementById('personQuebra'); // guarda o input do ponto de quebra
const personDependenciaInput = document.getElementById('personDependencia'); // guarda o input de dependencia
const personSegredoInput = document.getElementById('personSegredo'); // guarda o input de Segredo
const personObsessaoInput = document.getElementById('personObsessao'); // guarda o input de obsessao

const personStatusInput = document.getElementById('personStatus'); // guarda o seletor de status
const personEmpatiaInput = document.getElementById('personEmpatia'); // guarda seletor empatia
const personInfluenciaInput = document.getElementById('personInfluencia'); // guarda seletor influencia
const personConfiabilidadeInput = document.getElementById('personConfiabilidade'); // guarda seletor confiabilidade
const personPosturaInput = document.getElementById('personPostura'); // guarda seletor postura
const personMotivacaoInput = document.getElementById('personMotivacao'); // guarda seletor empatia



// Busca o que está salvo no navegador. Se não tiver nada, começa vazio.
let dadosDoSistema = JSON.parse(localStorage.getItem('decodePersonaData')) || []; //descongela(parse) tudo na gaveta decodep no localstorage e ponhe no dadosDoSistema, ou (||) a variavel começa vazia
let circuloCriadoNoMomento = null; //comeca nulo pq ainda não foi criado nenhum
let idDoCirculoAtivo = null; // Guarda o ID do círculo onde vamos add a pessoa






// ==================== LÓGICA DO POPUP DO CÍRCULO ====================
topAddCircleBtn.addEventListener('click', () => { //click para ativar o popup
    circlePopup.style.display = 'flex';
    newCircleNameInput.focus(); //o focus ponhe o curso do mouse automaticamente no input
});

cancelCircleBtn.addEventListener('click', () => { //click para desativar popup
    circlePopup.style.display = 'none'; //chamo o popup > desativo = none
    newCircleNameInput.value = ""; //o conteúdo (value) na classe (input) e vazio = " " pq cancela o que foi escrito
});

confirmCircleBtn.addEventListener('click', () => {
    const nomeCirculo = newCircleNameInput.value.trim(); //tira o espaco (trim) do nome e ponhe em uma variavel 
    if (nomeCirculo === "") { // se o conteudo estiver vazio?
        alert("Digite o nome do círculo."); // um alerta do navegador
        return; //interrompe o processo, se estiver vazio para tudo.
    }


    const divGrupo = document.createElement('div'); //cria uma div invisivel na memoria e ponhe na variavel 'divgrupo'
    divGrupo.className = 'grupo-container'; //ponhe um estilo (css) nessa div

    const titulo = document.createElement('span'); //cria um espaco para texto(span) na memoria
    titulo.className = 'titulo-circulo';  // ponhe um estilo
    titulo.textContent = nomeCirculo.toUpperCase(); // ponhe o que esta em 'nomeCirculo' em maiusculo na variavel titulo

    const btnMaisNoTopo = document.createElement('button'); //cria um botao na memoria
    btnMaisNoTopo.className = 'btn-add-no-circulo';
    btnMaisNoTopo.textContent = '+'; //atribui o + como nome (texto) do botao

    const divCirculo = document.createElement('div'); //mesma coisa, so que so tem desenho
    divCirculo.className = 'circulo-social'; //atribui um estilo (circulo) a div

    // LÓGICA DE COLMEIA
    const index = dadosDoSistema.length; // Descobre o indice do circulo dentro da array
    const raioCamada = 560; // O espaçamento horizontal ideal entre os centros dos círculos
    const alturaCamada = 500; // O espaçamento vertical 
    

    // Divide os círculos em fileiras de 3 para irem se espalhando ao redor do centro
    const coluna = index % 3;  //descobre em qual coluna o index vai ficar
    const linha = Math.floor(index / 3); //descobre em qual linha o index vai ficar
    
    // O pulo do gato da colmeia: fileiras ímpares são deslocadas para o lado para encaixar nos vãos
    const deslocamentoHorizontal = (linha % 2 === 1) ? raioCamada / 2 : 0;

    const novoCirculo = {
        id: Date.now(), 
        nome: nomeCirculo,
        pessoas: [],
        // Define a posição exata na colmeia para não encavalar
        posX: (coluna * raioCamada) + deslocamentoHorizontal, 
        posY: (linha * alturaCamada) 
    };

    // Criando a ação do clique do botão de adicionar perfil (Mantenha o seu evento do btnMaisNoTopo igual!)
    btnMaisNoTopo.addEventListener('click', () => { 
        circuloCriadoNoMomento = divCirculo; 
        idDoCirculoAtivo = novoCirculo.id; 
        personModal.style.display = 'flex'; 
        personNameInput.focus();
        alert(`Círculo "${nomeCirculo}" selecionado!`);
    });

    // Aplica a posição calculada da colmeia no grupo do círculo
    divGrupo.style.position = 'absolute';
    divGrupo.style.left = `calc(50% + ${novoCirculo.posX}px)`;
    divGrupo.style.top = `calc(50% + ${novoCirculo.posY}px)`;

    divGrupo.style.transform = 'translate(-50%, -50%)'


    dadosDoSistema.push(novoCirculo); //ponhe o circulo que acabei de criar dentro de uma array
    localStorage.setItem('decodePersonaData', JSON.stringify(dadosDoSistema));  //decodeP é a gaveta dentro do localStorage, Json guarda o que está na array dentro do navegador em formato de JSON



    // --- ADICIONE ESTAS LINHAS EXATAMENTE AQUI EMBAIXO ---
    // Encaixa as pecinhas visuais na ordem certa de cima para baixo
    divGrupo.appendChild(titulo); 
    divGrupo.appendChild(btnMaisNoTopo);  
    divGrupo.appendChild(divCirculo); 
    
    // Cola o grupo completo no mapa visível imediatamente sem precisar de F5
    visualPlane.appendChild(divGrupo); 

    
    circlePopup.style.display = 'none'; //fecha o popup
    newCircleNameInput.value = ""; //limpa o input
});
// ==================== MENU LATERAL================================
btnAbrir.addEventListener('click', () => {
    menuLateral.classList.add('aberto');//aqui que aciona o deslize para o lado
});

// Fecha o menu lateral ao clicar no botão "X"
btnFechar.addEventListener('click', () => {
    menuLateral.classList.remove('aberto');
});

// Funções de ação para os botões internos do menu
// Substitua os alertas pelas ações reais do seu projeto
function resetCamera() {

    deslocamentoX = 0; //zera todo o deslocamento que tive
    deslocamentoY = 0;

    visualPlane.style.transform = `translate(calc(-50% + ${deslocamentoX}px), calc(-50% + ${deslocamentoY}px))`;
//-50% o navegador vai para o meio dele, e soma com deslocamento = 0
    
    menuLateral.classList.remove('aberto');
}

function minhaFuncao2() {
    alert("Você clicou na Ação 2!");
    menuLateral.classList.remove('aberto');
}

function minhaFuncao3() {
    alert("Você clicou na Ação 3!");
    menuLateral.classList.remove('aberto');
}
// ==================== LÓGICA DA SUBTELA GRANDE DE PERFIL ====================

backPersonBtn.addEventListener('click', () => { //botao voltar
    personModal.style.display = 'none'; //fecha o popup
    personNameInput.value = ""; // Limpa o campo ao sair
    personAgeInput.value = ""; // Limpa a idade ao sair
    personBirthInput.value = ""; // Limpa o nascimento ao sair
    personStatusInput.value = "Ativo"; // Reseta o status para o padrão
    personQualidadesInput.value = "";
    personDefeitosInput.value = "";
    personTratamentoInput.value = "";
    personSobAtaqueInput.value = "";
    personVulnerabilidadeInput.value = "";
    personEmpatiaInput.value = "5";
    personInfluenciaInput.value = "5";
    personConfiabilidadeInput.value = "5";
    personPosturaInput.value = "Neutro";
    personMotivacaoInput.value = "Controle/Autonomia";
    personTraumaInput.value = "";
    personInsegurancaInput.value = "";
    personMinoriaInput.value = "";
    personQuebraInput.value = "";
    personDependenciaInput.value = "";
    personSegredoInput.value = "";
    personObsessaoInput. value = "";
});
// Botão Salvar Perf
addPersonBtn.addEventListener('click', () => { //botao salvar

    
    const nomePessoa = personNameInput.value.trim(); //atribui o input do nome sem espaco (trim) a variavel
    const radioMarcado = document.querySelector('input[name="statusColor"]:checked'); // pega os inputs que fazem parte das 3 cores, checked so pega o selecionado na checkbox
    const corEscolhida = radioMarcado ? radioMarcado.value : "#22ec3d"; //se o usuario marcou, use a cor, senão (:) use essa > verde

    if (nomePessoa === "") { // se o nome da pessoa for igual a vazio
        alert("Digite o nome da pessoa para salvar."); //alerta do navegador
        return; //para o processo
    }

    const radioPerfilMarcado = document.querySelector('input[name="statusPerfilDuplo"]:checked');
    const perfilDuploEscolhido = radioPerfilMarcado ? radioPerfilMarcado.value : "Sim";

        // Captura as novas informações inseridas nas colunas do formulário
    const idadePessoa = personAgeInput.value.trim();
    const nascimentoPessoa = personBirthInput.value.trim();
    const statusPessoa = personStatusInput.value;
    const socialPessoa = personSocialInput.value.trim(); //guardei o input nessa varivel
    const enderecoPessoa = personEnderecoInput.value.trim();
    const profissaoPessoa = personProfissaoInput.value.trim();
    const qualidadesPessoa = personQualidadesInput.value.trim();
    const defeitosPessoa = personDefeitosInput.value.trim();
    const tratamentoProximoPessoa = personTratamentoInput.value.trim();
    const ataquePessoa = personSobAtaqueInput.value.trim();
    const vulnerabilidadePessoa = personVulnerabilidadeInput.value.trim();
    const empatiaPessoa = personEmpatiaInput.value;
    const influenciaPessoa = personInfluenciaInput.value;
    const confiabilidadePessoa = personConfiabilidadeInput.value;
    const posturaPessoa = personPosturaInput.value;
    const motivacaoPessoa = personMotivacaoInput.value;
    const traumaPessoa = personTraumaInput.value.trim();
    const insegurancaPessoa = personInsegurancaInput.value.trim();
    const minoriaPessoa = personMinoriaInput.value.trim();
    const quebraPessoa = personQuebraInput.value.trim();
    const dependenciaPessoa = personDependenciaInput.value.trim();
    const segredoPessoa = personSegredoInput.value.trim();
    const obsessaoPessoa = personObsessaoInput.value.trim();
    
    



    // Cria a estrutura visual do perfil
    const divPerfil = document.createElement('div'); //cria uma div na memoria 
    divPerfil.className = 'perfil-usuario'; // ponhe um estilo
    divPerfil.style.cursor = 'pointer'; // Faz o mouse virar dedinho para clicar

    const boneco = document.createElement('div'); //cria uma div
    boneco.className = 'boneco'; //ponhe um estilo

    const bandeira = document.createElement('div'); //cria uma div
    bandeira.className = 'bandeira'; //ponhe um estilo
    bandeira.style.backgroundColor = corEscolhida; // atribui a cor da variavel a bandeira
    bandeira.style.borderRadius = "20%"; // Seu toque de estilo!
    
    // Coloca a bandeira dentro do boneco
    boneco.appendChild(bandeira); 

    const nomeSpan = document.createElement('span'); //cria um espaco para texto na memoria
    nomeSpan.className = 'nome-persona';  // add o estilo css variavel de espaco
    nomeSpan.textContent = nomePessoa; // add o texto na variavel de espaco

    divPerfil.addEventListener('click', (ev) => {
    viewPerson.style.display = 'flex';
    ev.stopPropagation(); // 🧙‍♂️ Impede que o clique interfira ou suma com os círculos da tela
    document.getElementById("viewPersonName").innerText = novaPessoa.nome;
    document.getElementById("viewPersonAge").innerText = novaPessoa.idade || "Não informada";
    viewPerson.style.display = 'flex'; 
});


    divPerfil.appendChild(boneco); //guarda o boneco na variavel divPerfil
    divPerfil.appendChild(nomeSpan); //ponhe o nome do perfil na varivael de memoria



    // CRIA O OBJETO PESSOA NA MEMÓRIA (Salva apenas nome e cor que já funcionam)
    const novaPessoa = { //OBJETO
        id: Date.now(),
        nome: nomePessoa, //nome
        idade: idadePessoa,
        nascimento: nascimentoPessoa,
        Endereco: enderecoPessoa,
        RedeSocial: socialPessoa,
        Profissao: profissaoPessoa,
        status: statusPessoa,
        cor: corEscolhida, //cor
        perfilDuplo:perfilDuploEscolhido,
        qualidades: qualidadesPessoa,
        defeitos: defeitosPessoa,
        tratamento: tratamentoProximoPessoa,
        SobAtaque: ataquePessoa,
        vulnerabilidade: vulnerabilidadePessoa,
        empatia: empatiaPessoa,
        influencia: influenciaPessoa,
        confiabilidade: confiabilidadePessoa,
        postura: posturaPessoa,
        motivacao: motivacaoPessoa,
        trauma: traumaPessoa,
        insegurança: insegurancaPessoa,
        minoria: minoriaPessoa,
        PontoQuebra: quebraPessoa,
        Dependência: dependenciaPessoa,
        Segredo: segredoPessoa,
        Obsessão: obsessaoPessoa,
    };

    const radioColorVerde = document.querySelector('input[name="statusColor"][value="#22ec3d"]');
    if (radioColorVerde) radioColorVerde.checked = true;

    const radioPerfilSim = document.querySelector('input[name="statusPerfilDuplo"][value="Sim"]');
    if (radioPerfilSim) radioPerfilSim.checked = true;

    // Procura o círculo ativo no banco de dados e injeta a pessoa lá dentro
    const circuloAlvo = dadosDoSistema.find(c => c.id === idDoCirculoAtivo); //percorre todos os circulos na array até achar o ativo (idcirculoativo)
    if (circuloAlvo) { //se achar o circulo

        // ==================== TRAVA DE TETO MÁXIMO CORRIGIDA ====================
        // Checa se já tem 15 pessoas ANTES de permitir o push
        if (circuloAlvo.pessoas.length >= 15) {
            alert(`O círculo "${circuloAlvo.nome}" já atingiu o limite máximo de 15 perfis!`);
            return; // Interrompe o processo imediatamente e não deixa cadastrar
        }
        // ===================================
        circuloAlvo.pessoas.push(novaPessoa); //insere o objeto (nova pessoa) na array, ele contem a cor e o nome
    }
    

    // Salva a lista inteira atualizada no navegador
    localStorage.setItem('decodePersonaData', JSON.stringify(dadosDoSistema)); //atualização da array

    // Injeta o perfil visual criado na tela
    if (circuloCriadoNoMomento) { 
        circuloCriadoNoMomento.appendChild(divPerfil); 
    }


    // Fecha a subtela grande e limpa o input do nome
    personModal.style.display = 'none'; 

    personNameInput.value = ""; 
    personAgeInput.value = ""; //limpa o input da idade
    personBirthInput.value = ""; //limpa o input do nascimento
    personSocialInput.value = "";
    personProfissaoInput.value = "";
    personEnderecoInput.value = "";
    personQualidadesInput.value = "";
    personDefeitosInput.value = "";
    personTratamentoInput.value = "";
    personSobAtaqueInput.value = "";
    personVulnerabilidadeInput.value = "";
 
    personStatusInput.value = "Ativo"; //reseta o dropdown de status
    personEmpatiaInput.value = "5"; //reseta o dropdown de status
    personInfluenciaInput.value = "5";
    personConfiabilidadeInput.value = "5";
    personPosturaInput.value = "Neutro";
    personMotivacaoInput.value = "Controle/Autonomia";

    personTraumaInput.value = "";
    personInsegurancaInput.value = "";
    personMinoriaInput.value = "";
    personQuebraInput.value = "";
    personDependenciaInput.value = "";
    personSegredoInput.value = "";
    personObsessaoInput.value = "";


}); // FECHA O BOTÃO SALVAR COMPLETO


// ==================== CONTROLE DE MOVIMENTO DO CAMPO ====================
let arrastando = false; //a variavel comeca como falso
let inicioX, inicioY; // uma variavel vazia
let deslocamentoX = 0; //atribui o valor 0 como ponto de partida pq ainda nao houve interacao com a tela
let deslocamentoY = 0;
let escala = 1; // 1 significa 100% (tamanho normal). 


function atualizarPosicaoEMapa() {
    visualPlane.style.transform = `translate(calc(-50% + ${deslocamentoX}px), calc(-50% + ${deslocamentoY}px)) scale(${escala})`;
}

canvasContainer.addEventListener('mousedown', (e) => { //quando o mouse e pressionado
    if (e.target === canvasContainer || e.target === visualPlane) { //e.target = alvo do clique
        arrastando = true; // se torna true
        inicioX = e.clientX - deslocamentoX; 
        inicioY = e.clientY - deslocamentoY;
    }
});

window.addEventListener('mousemove', (e) => {
    if (!arrastando) return;
    deslocamentoX = e.clientX - inicioX;
    deslocamentoY = e.clientY - inicioY;
    atualizarPosicaoEMapa(); // Chama a função que une movimento e zoom
});

window.addEventListener('mouseup', () => {
    arrastando = false;
});
// --- ADICIONE ESTE BLOCO ABAIXO DO MOUSEUP DO CAMPO ---
// Lógica para mover o campo usando as SETAS DO TECLADO
window.addEventListener('keydown', (e) => {
    // Se você estiver digitando em algum input do cadastro, ignora as setas para não mover o mapa junto
    if (document.activeElement.tagName === 'INPUT' || document.activeElement.tagName === 'SELECT') return;

    const velocidade = 20; // Quantos pixels o mapa anda a cada clique na seta

    if (e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W') {
        deslocamentoY += velocidade; // Move para cima
    } else if (e.key === 'ArrowDown' || e.key === 's' || e.key === 'S') {
        deslocamentoY -= velocidade; // Move para baixo
    } else if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
        deslocamentoX += velocidade; // Move para esquerda
    } else if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
        deslocamentoX -= velocidade; // Move para direita
    }

     // === CONTROLE DE ZOOM (TECLAS + E -) ===
    if (e.key === '+' || e.key === '=') {
        escala += 0.05; // Aumenta o zoom de 5% em 5%
    } else if (e.key === '-' || e.key === '_') {
        escala -= 0.05; // Diminui o zoom de 5% em 5%
    }

    // Trava o zoom para não sumir da tela (mínimo 20% e máximo 200%)
    escala = Math.max(0.2, Math.min(2, escala));

    // Aplica o movimento fisicamente no campo usando os mesmos cálculos do mouse
    atualizarPosicaoEMapa(); // Aplica fisicamente no mapa
});



// ==================== FUNÇÃO QUE RECUPERA OS DADOS AO DAR F5 ====================
function carregarDadosSalvos() {
    dadosDoSistema.forEach(circulo => { //percorre a array e nomeia cada item de 'cirulo'
        const divGrupo = document.createElement('div'); //cria uma div na memoria
        divGrupo.className = 'grupo-container'; //atribui um estilo css a essa div

        // 1. PRIMEIRA CORREÇÃO: Resgata a posição da colmeia guardada na memória do navegador
        divGrupo.style.position = 'absolute';
        divGrupo.style.left = `calc(50% + ${circulo.posX || 0}px)`;
        divGrupo.style.top = `calc(50% + ${circulo.posY || 0}px)`;
        divGrupo.style.transform = 'translate(-50%, -50%)'

        const titulo = document.createElement('span'); //tag é para textos
        titulo.className = 'titulo-circulo';
        titulo.textContent = circulo.nome.toUpperCase(); //pega cada circulo na array e seu respectivo nome e ponhe na tag, tudo maiusculo

        const btnMaisNoTopo = document.createElement('button'); // cria um botao na memoria
        btnMaisNoTopo.className = 'btn-add-no-circulo'; //atribui um estilo
        btnMaisNoTopo.textContent = '+'; //atribui uma string +

        const divCirculo = document.createElement('div');
        divCirculo.className = 'circulo-social';

        // Evento do botão de adicionar perfil ao recarregar a página
        btnMaisNoTopo.addEventListener('click', () => {
            circuloCriadoNoMomento = divCirculo;
            idDoCirculoAtivo = circulo.id;
            personModal.style.display = 'flex';
            personNameInput.focus();
        });

        circulo.pessoas.forEach(pessoa => { //vai passar por cada perfil do circulo, nomeando cada elemento como 'pessoa'
            const divPerfil = document.createElement('div'); //div na memoria
            divPerfil.className = 'perfil-usuario'; //atribui estilo

            divPerfil.style.cursor = 'pointer';

            const boneco = document.createElement('div'); //div na memória
            boneco.className = 'boneco'; //atribui estilo

            const bandeira = document.createElement('div'); //pessoa é um objeto não uma variavel
            bandeira.className = 'bandeira'; //estilo
            bandeira.style.backgroundColor = !pessoa.cor ? '#22ec3d' : pessoa.cor; //pega a cor da pessoa, se  não tiver usa uma padrão (verde)
            bandeira.style.borderRadius = "20%"; 

            const nomeSpan = document.createElement('span'); //tag é para string
            nomeSpan.className = 'nome-persona'; //estilo
            nomeSpan.textContent = pessoa.nome; // pega o nome da pessoa e ponhe na tag

            divPerfil.addEventListener('click', (ev) => {
            ev.stopPropagation(); // Impede de sumir com os círculos da tela
            
        
        // Injeta o nome no seu span e mostra a barra de 30% embaixo
            document.getElementById("viewPersonName").innerText = pessoa.nome;
            document.getElementById("viewPersonAge").innerText = pessoa.idade || "Não informada";
            viewPerson.style.display = 'flex'; 
            });


            boneco.appendChild(bandeira); //ponhe a bandeira no boneco
            divPerfil.appendChild(boneco); //ponhe o boneco na div perfil
            divPerfil.appendChild(nomeSpan); //ponhe o nome também
            divCirculo.appendChild(divPerfil);// ponhe o perfil (boneco+nome) no circulo
        });

        
        // 2. SEGUNDA CORREÇÃO: Encaixa as constantes do grupo na ordem certa de cima para baixo
        divGrupo.appendChild(titulo);
        divGrupo.appendChild(btnMaisNoTopo); 
        divGrupo.appendChild(divCirculo);

        visualPlane.appendChild(divGrupo);
    });
}

// ==================== LÓGICA TEMPORÁRIA PARA LIMPAR O MAPA ====================
clearAllBtn.addEventListener('click', () => {
    // Pergunta se o usuário tem certeza antes de apagar
    if (confirm("Deseja deletar TODOS os círculos e perfis de teste do mapa?")) {
        localStorage.removeItem('decodePersonaData'); // Apaga o banco de dados do navegador
        location.reload(); // Recarrega a página automaticamente (F5) para limpar a tela
    }
});


// Inicializa o mapa trazendo tudo do localStorage
carregarDadosSalvos(); //ativa a função
