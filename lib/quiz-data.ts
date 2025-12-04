// === QUIZ DATA ADAPTADO - 4 ETAPAS ===

// Funções de Personalização
function getUserAnswer(questionId) {
    const answers = window.quizAnswers || {};
    return answers[questionId] || '';
}

function getUserGender() {
    return getUserAnswer('question1') || 'PAI/MÃE';
}

function getPersonalizedContent(content, gender) {
    if (typeof content === "string") {
        return content
    }

    if (typeof content === "object" && content !== null) {
        if (content.PAI && content.EDUCADOR) {
            return gender === "PAI/MÃE" ? content.PAI : content.EDUCADOR
        }
        return content
    }

    return content
}

// === QUIZ STEPS - APENAS 4 ETAPAS ===

export const quizSteps = [
    {
        id: 1,
        question: "🎮 VOCÊ ESTÁ PRESTES A VER O LADO ESCURO DA INTERNET",
        description: "ETAPA 1: Servidor Gaming - O Primeiro Contato",
        subtext: "Veja como predadores se aproximam de crianças em servidores de jogos online:",
        options: ["CONTINUAR PARA O CHAT"],
        elements: {
            chatSimulation: true,
            chatType: "gaming",
            badge: "SIMULAÇÃO REALISTA",
        },
        customComponent: "ChatGamingStep"
    },

    {
        id: 2,
        question: "⚠️ VEJA COMO A MANIPULAÇÃO ESCALA",
        description: "ETAPA 2: Chat Privado - A Armadilha",
        subtext: "Observe como o predador isola a criança e intensifica a manipulação:",
        options: ["CONTINUAR PARA O PRÓXIMO CHAT"],
        elements: {
            chatSimulation: true,
            chatType: "private",
            badge: "SIMULAÇÃO REALISTA",
        },
        customComponent: "ChatPrivateStep"
    },

    {
        id: 3,
        question: "🚨 O PONTO DE NÃO RETORNO",
        description: "ETAPA 3: Chat Direto - A Ameaça",
        subtext: "Veja como a manipulação se torna chantagem e ameaça:",
        options: ["CONTINUAR PARA EDUCAÇÃO"],
        elements: {
            chatSimulation: true,
            chatType: "direct",
            badge: "SIMULAÇÃO REALISTA",
        },
        customComponent: "ChatDirectStep"
    },

    {
        id: 4,
        question: "📚 AGORA VOCÊ SABE - COMO PROTEGER SEU FILHO?",
        description: "ETAPA 4: Guia Educacional Completo",
        subtext: "Descubra os sinais de alerta, como conversar e medidas de proteção:",
        options: ["VER SOLUÇÃO COMPLETA"],
        elements: {
            educationalContent: true,
            badge: "GUIA COMPLETO",
        },
        customComponent: "EducationalStep"
    }
]

// === DADOS DOS CHATS ===

export const chatGamingData = {
    serverName: "FortFriends Brasil",
    icon: "🎮",
    messages: [
        { user: "D4rkWolf13", text: "alguém quer fazer squad?", time: "14:32", type: "normal" },
        { user: "SweetAngel", text: "eu topo! vcs jogam desde quando?", time: "14:33", type: "normal" },
        { user: "ProKillerX", text: "vcs são mt ruim kkkkkk", time: "14:34", type: "bullying" },
        { user: "YumiKitty", text: "oi pessoal, sou nova aqui", time: "14:35", type: "normal" },
        { user: "M4st3rHelp", text: "oi YumiKitty! bem vinda! vem no privado q eu te ensino uns macetes top", time: "14:36", type: "alert" },
    ],
    alerts: [
        "🚨 ALERTA: Predador identificando criança nova",
        "🚨 ALERTA: Tentativa de isolamento (convite para privado)",
        "🚨 ALERTA: Promessas tentadoras para ganhar confiança"
    ]
}

export const chatPrivateData = {
    channelName: "amigos-especiais",
    icon: "🔒",
    messages: [
        { user: "M4st3rHelp", text: "e aí, conseguiu fazer aquelas missões?", time: "15:01", type: "normal" },
        { user: "XxCuteLoverxX", text: "qnts anos vc tem?", time: "15:02", type: "alert" },
        { user: "YumiKitty", text: "11 pq?", time: "15:03", type: "normal" },
        { user: "M4st3rHelp", text: "manda uma foto sua pra gnt te conhecer melhor", time: "15:04", type: "alert" },
        { user: "XxCuteLoverxX", text: "todo mundo aqui já mandou a deles", time: "15:05", type: "alert" },
        { user: "ProKillerX", text: "aqui tem uns skins gratis: bit.ly/sk1ns-gr4t1s", time: "15:06", type: "alert" },
        { user: "M4st3rHelp", text: "se vc me passar seu login e senha eu libero tudo pra vc", time: "15:07", type: "alert" },
    ],
    alerts: [
        "🚨 ALERTA: Solicitação de idade para menor",
        "🚨 ALERTA: Pedido de fotos (exploração sexual)",
        "🚨 ALERTA: Pressão social (normalizar comportamento)",
        "🚨 ALERTA: Links suspeitos (malware/roubo)",
        "🚨 ALERTA: Roubo de credenciais (acesso à conta)"
    ]
}

export const chatDirectData = {
    userName: "M4st3rHelp",
    icon: "💬",
    messages: [
        { user: "M4st3rHelp", text: "ei, vc tá online", time: "20:15", type: "normal" },
        { user: "M4st3rHelp", text: "não conta pra ninguém q a gnt se fala ok?", time: "20:16", type: "alert" },
        { user: "YumiKitty", text: "por quê?", time: "20:17", type: "normal" },
        { user: "M4st3rHelp", text: "pq eles não vão entender. só a gnt aqui te entende mesmo", time: "20:18", type: "alert" },
        { user: "M4st3rHelp", text: "se vc contar, vou te excluir de tudo", time: "20:19", type: "alert" },
        { user: "M4st3rHelp", text: "descobri quem vc é: Mariana Costa, aluna da escola santos dumont", time: "20:20", type: "alert" },
        { user: "M4st3rHelp", text: "melhor cooperar, senão vou enviar aquelas fotos pra seus pais", time: "20:21", type: "alert" },
    ],
    alerts: [
        "🚨 ALERTA: Isolamento (não contar para ninguém)",
        "🚨 ALERTA: Chantagem emocional (exclusão)",
        "🚨 ALERTA: Doxxing (exposição de dados reais)",
        "🚨 ALERTA: Extorsão (ameaça de divulgar)",
        "🚨 ALERTA: Manipulação emocional extrema"
    ]
}

export const educationalData = {
    mainReveal: "VOCÊ ACABOU DE VER OS 3 ESTÁGIOS DO ALICIAMENTO ONLINE",
    dangers: [
        {
            title: "🎭 ALICIAMENTO GRADUAL",
            description: "Começa com amizade, escala para isolamento e exploração"
        },
        {
            title: "📸 EXPLORAÇÃO SEXUAL",
            description: "Pedidos de fotos/vídeos que viram armas de chantagem"
        },
        {
            title: "💰 EXTORSÃO E ROUBO",
            description: "Roubo de credenciais, dados pessoais e contas"
        },
        {
            title: "🔪 AMEAÇA FÍSICA",
            description: "Doxxing e ameaças de violência contra criança ou família"
        }
    ],
    warningsSigns: [
        "Mudanças repentinas de comportamento",
        "Esconder a tela quando você se aproxima",
        "Uso excessivo de internet durante a noite",
        "Novos 'amigos' online que não quer apresentar",
        "Menos interesse em atividades normais",
        "Isolamento social e depressão"
    ],
    howToTalk: [
        "Não invada privacidade, mas demonstre interesse genuíno",
        "Explique os perigos SEM ser alarmista",
        "Estabeleça regras claras sobre redes sociais",
        "Crie um ambiente seguro para confessar problemas",
        "Ouça mais do que fale"
    ],
    technicalSecurity: [
        "Ative controle parental em todos os dispositivos",
        "Configure privacidade máxima nas redes sociais",
        "Desabilite chat com desconhecidos",
        "Monitore atividades (sem ser invasivo)",
        "Mantenha senhas seguras e únicas"
    ],
    howToReport: [
        "🚔 Polícia Federal (Divisão de Crimes Cibernéticos)",
        "📞 Safernet Brasil: www.safernet.org.br",
        "☎️ Disque 100 (Denúncia de abuso contra crianças)",
        "📱 Denunciar diretamente na plataforma (Discord, Instagram, etc)"
    ]
}

export const testimonials = [
    {
        name: "Carla M., Mãe",
        text: "Não sabia que meu filho estava sendo aliciado até ver essa simulação. Consegui conversar com ele a tempo.",
        rating: 5,
    },
    {
        name: "Professor João",
        text: "Mostrei para minha turma. Os alunos ficaram chocados e começaram a contar histórias reais.",
        rating: 5,
    }
]

export const socialProofMessages = [
    "Você está entre os pais que realmente se importam",
    "2.847 pais já viram essa simulação",
    "87% descobriu comportamentos suspeitos no filho após ver",
    "Educadores usam isso em escolas",
]

// Expor funções globalmente
if (typeof window !== 'undefined') {
    window.chatGamingData = chatGamingData;
    window.chatPrivateData = chatPrivateData;
    window.chatDirectData = chatDirectData;
    window.educationalData = educationalData;
}