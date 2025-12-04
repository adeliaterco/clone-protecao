// === QUIZ DATA ADAPTADO NÍVEL 3 - SISTEMA DINÂMICO E INTELIGENTE ===
// === OTIMIZADO PARA MOBILE-FIRST ===

// === SISTEMA DE PERSONALIZAÇÃO AVANÇADA ===
function getUserAnswer(questionId: string) {
    if (typeof window === 'undefined') return '';
    const answers = (window as any).quizAnswers || {};
    return answers[questionId] || '';
}

function getUserGender() {
    return getUserAnswer('question1') || 'PAI/MÃE';
}

function getPersonalizedContent(content: any, gender: string) {
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

// === SISTEMA DE CARACTERES REALISTAS - NÍVEL 3 ===
export const characterProfiles = {
    predator: {
        id: "M4st3rHelp",
        name: "M4st3rHelp",
        avatar: "⚠️",
        profile: {
            typingSpeed: 52,
            emotionalState: "manipulative",
            tactics: ["friendship", "isolation", "promises", "threats"],
            vocabulary: ["macetes", "dicas", "segredos", "especiais", "top", "massa"],
            age: "adulto_predador"
        },
        behaviors: {
            responseTime: { min: 600, max: 1800 }, // MOBILE: 25% mais rápido
            messageLength: { preferred: "short", max: 80 }, // MOBILE: mais curto
            emojiUsage: "minimal",
            spellingErrors: 0.02,
            manipulationPatterns: [
                "ofertar_ajuda",
                "criar_urgencia", 
                "isolar_vitima",
                "normalizar_comportamento",
                "ameacar_sutilmente"
            ]
        }
    },

    victim: {
        id: "YumiKitty",
        name: "YumiKitty", 
        avatar: "✨",
        profile: {
            age: 11,
            typingSpeed: 28,
            emotionalState: "curious_then_scared",
            innocence: 0.9,
            vulnerability: 0.8
        },
        behaviors: {
            responseTime: { min: 1500, max: 3500 }, // MOBILE: mais rápido
            spellingErrors: 0.12,
            emojiUsage: "high",
            questionPatterns: ["por quê?", "não entendi", "tá", "ok", "sério?"],
            emotionalProgression: ["curiosa", "confusa", "assustada", "desesperada"]
        }
    },

    bully: {
        id: "ProKillerX",
        name: "ProKillerX",
        avatar: "😈",
        profile: {
            typingSpeed: 65,
            emotionalState: "aggressive",
            behavior: "toxic_gamer"
        },
        behaviors: {
            responseTime: { min: 150, max: 600 }, // MOBILE: mais rápido
            emojiUsage: "aggressive",
            spellingErrors: 0.15,
            toxicPatterns: ["ridicularizar", "diminuir", "atacar_habilidade"]
        }
    },

    accomplice: {
        id: "XxCuteLoverxX", 
        name: "XxCuteLoverxX",
        avatar: "💕",
        profile: {
            typingSpeed: 45,
            emotionalState: "fake_friendly",
            role: "accomplice_predator"
        },
        behaviors: {
            responseTime: { min: 800, max: 2200 }, // MOBILE: mais rápido
            manipulationRole: "normalizador",
            supportsPredator: true
        }
    }
}

// === SISTEMA DE VARIAÇÕES DINÂMICAS - MOBILE OPTIMIZED ===
export const messageVariations = {
    predator_approach: [
        "oi! bem vinda! vem no pvt q ensino dicas top",
        "eae! curte o jogo? tenho macetes, chama pv", 
        "opa! vi q vc é nova, posso ajudar",
        "salve! sou veterano, te ensino truques",
        "oi! bem vinda! vem no privado q explico melhor"
    ],

    casual_gaming: [
        "alguém quer fazer squad?",
        "quem tá afim de jogar umas ranked?",
        "bora fazer uma party galera",
        "alguém pra duo queue?",
        "quem quer farmar umas wins?"
    ],

    victim_introduction: [
        "oi pessoal, sou nova aqui",
        "oii, acabei de entrar, alguém pode me ajudar?",
        "oi gente! primeira vez no servidor",
        "eae pessoal, sou iniciante no jogo",
        "oi! alguém pode me ensinar a jogar?"
    ],

    bully_responses: [
        "vcs são mt ruim kkkkkk",
        "noobs demais kkkkk",
        "que skill horrível mano",
        "aprende a jogar primeiro kkkk",
        "nossa que gameplay trash"
    ],

    age_request: [
        "qnts anos vc tem?",
        "qual sua idade?", 
        "vc é novinha né? quantos anos?",
        "me fala tua idade, é pra saber se posso te ensinar",
        "que idade vc tem? parece ser novinha"
    ],

    photo_request: [
        "manda uma foto pra gnt te conhecer",
        "todos mandaram foto, manda a sua",
        "selfie aí pra gnt ver quem vc é",
        "foto sua aí, só pro grupo te conhecer",
        "manda uma pic sua, todo mundo já mandou"
    ],

    normalization: [
        "todo mundo aqui já mandou a deles",
        "é normal, todos fazem isso aqui",
        "relaxa, é só entre nós do grupo",
        "todo mundo faz isso, não tem problema",
        "aqui todo mundo se conhece assim"
    ],

    credential_theft: [
        "se vc me passar login e senha eu libero tudo",
        "me dá tua conta que eu upo ela pra vc",
        "passa tua senha que coloco uns skins grátis",
        "login e senha que eu faço tudo pra vc",
        "me empresta tua conta que te ajudo a subir"
    ],

    isolation_demand: [
        "não conta pra ninguém q a gnt se fala ok?",
        "isso fica só entre nós, não fala pra ninguém",
        "segredo nosso, não pode contar pros seus pais",
        "promete que não vai falar isso pra ninguém?",
        "nossa conversa é privada, ninguém pode saber"
    ],

    emotional_manipulation: [
        "pq eles não vão entender. só a gnt te entende",
        "seus pais não entendem você como eu entendo",
        "só eu realmente me importo com você",
        "ninguém te entende como eu entendo",
        "você é especial, por isso só confio em você"
    ],

    threats_escalation: [
        "se vc contar, vou te excluir de tudo",
        "se falar alguma coisa, nunca mais vou te ajudar",
        "conta pra alguém e você vai se arrepender",
        "melhor ficar quieta se não quiser problemas",
        "se abrir a boca, vai ser pior pra você"
    ],

    doxxing_threat: [
        "descobri quem vc é: {nome_real}, aluna da escola {escola}",
        "sei onde vc mora: {endereco}",
        "achei teu Instagram: {perfil_social}",
        "encontrei tua família no Facebook",
        "sei tudo sobre você: {dados_pessoais}"
    ],

    final_extortion: [
        "melhor cooperar, senão vou enviar fotos pros seus pais",
        "se não fizer o que eu quero, todo mundo vai ver",
        "coopera ou sua família vai saber de tudo",
        "faz o que eu tô pedindo ou espalho tudo sobre você",
        "você escolhe: coopera ou conto tudo pros seus pais"
    ]
}

// === SISTEMA DE ESCALAÇÃO EMOCIONAL - NÍVEL 3 ===
export const emotionalProgression = {
    stage1: {
        name: "building_trust",
        description: "Conquistando confiança",
        predator_state: "friendly_helpful",
        victim_state: "curious_trusting",
        tactics: ["ofertar_ajuda", "parecer_confiavel", "criar_conexao"]
    },
    stage2: {
        name: "isolating_victim", 
        description: "Isolando a vítima",
        predator_state: "manipulative_isolating",
        victim_state: "confused_compliant",
        tactics: ["solicitar_privacidade", "pedir_informacoes", "normalizar_comportamento"]
    },
    stage3: {
        name: "making_demands",
        description: "Fazendo demandas",
        predator_state: "demanding_threatening",
        victim_state: "scared_trapped",
        tactics: ["exigir_segredo", "ameacar_sutilmente", "chantagear_emocionalmente"]
    },
    stage4: {
        name: "full_control",
        description: "Controle total",
        predator_state: "controlling_dangerous",
        victim_state: "terrified_helpless", 
        tactics: ["doxxing", "extorsao", "ameacas_explicitas"]
    }
}

// === GERADOR DE MENSAGENS DINÂMICAS - NÍVEL 3 ===
export const generateDynamicMessage = (messageType: string, context: any = {}) => {
    const variations = messageVariations[messageType as keyof typeof messageVariations]
    if (!variations || variations.length === 0) return "Mensagem não encontrada"
    
    const selectedVariation = variations[Math.floor(Math.random() * variations.length)]
    
    let personalizedMessage = selectedVariation
    
    if (context.victim) {
        personalizedMessage = personalizedMessage.replace(/{victim}/g, context.victim)
    }
    if (context.nome_real) {
        personalizedMessage = personalizedMessage.replace(/{nome_real}/g, context.nome_real)
    }
    if (context.escola) {
        personalizedMessage = personalizedMessage.replace(/{escola}/g, context.escola)
    }
    
    return personalizedMessage
}

// === DADOS DOS CHATS DINÂMICOS - MOBILE OPTIMIZED ===
export const chatGamingData = {
    serverName: "", // MOBILE: removido para simplificar
    icon: "🎮",
    channelInfo: {
        name: "💬 Chat Gaming", // MOBILE: mais direto
        topic: "", // MOBILE: removido
        memberCount: 6, // MOBILE: simplificado
        onlineCount: 6 // MOBILE: simplificado
    },
    
    messages: [
        {
            id: 1,
            user: "D4rkWolf13",
            character: "normal_gamer",
            textGenerator: () => generateDynamicMessage("casual_gaming"),
            time: "14:32",
            type: "normal",
            avatar: "🎮",
            timing: {
                delay: 400, // MOBILE: mais rápido
                typingDuration: 1000 // MOBILE: mais rápido
            }
        },
        {
            id: 2,
            user: "SweetAngel", 
            character: "normal_gamer",
            text: "eu topo! vcs jogam desde quando?",
            time: "14:33",
            type: "normal",
            avatar: "👧",
            timing: {
                delay: 900, // MOBILE: mais rápido
                typingDuration: 1200 // MOBILE: mais rápido
            }
        },
        {
            id: 3,
            user: "ProKillerX",
            character: "bully",
            textGenerator: () => generateDynamicMessage("bully_responses"),
            time: "14:34", 
            type: "bullying",
            avatar: "😈",
            timing: {
                delay: 1400, // MOBILE: mais rápido
                typingDuration: 600 // MOBILE: mais rápido
            }
        },
        {
            id: 4,
            user: "YumiKitty",
            character: "victim",
            textGenerator: () => generateDynamicMessage("victim_introduction"),
            time: "14:35",
            type: "normal", 
            avatar: "✨",
            timing: {
                delay: 1900, // MOBILE: mais rápido
                typingDuration: 1500 // MOBILE: mais rápido
            }
        },
        {
            id: 5,
            user: "M4st3rHelp",
            character: "predator",
            textGenerator: () => generateDynamicMessage("predator_approach", { victim: "YumiKitty" }),
            time: "14:36",
            type: "alert",
            avatar: "⚠️",
            timing: {
                delay: 2400, // MOBILE: mais rápido
                typingDuration: 2000 // MOBILE: mais rápido
            },
            dangerLevel: "high",
            manipulationTactics: ["ofertar_ajuda", "isolar_vitima"]
        }
    ],

    alerts: [
        {
            id: 1,
            text: "🚨 PREDADOR identificando criança nova",
            severity: "critical",
            timing: { delay: 3000 } // MOBILE: mais rápido
        },
        {
            id: 2, 
            text: "🚨 TENTATIVA DE ISOLAMENTO (convite para privado)",
            severity: "critical",
            timing: { delay: 3200 } // MOBILE: mais rápido
        },
        {
            id: 3,
            text: "🚨 PROMESSAS tentadoras para ganhar confiança", 
            severity: "high",
            timing: { delay: 3400 } // MOBILE: mais rápido
        }
    ]
}

export const chatPrivateData = {
    channelName: "🔒 Chat Privado", // MOBILE: mais direto
    icon: "🔒",
    channelInfo: {
        name: "🔒 Chat Privado", // MOBILE: simplificado
        type: "private_group",
        memberCount: 4,
        description: "" // MOBILE: removido
    },

    messages: [
        {
            id: 1,
            user: "M4st3rHelp",
            character: "predator",
            text: "e aí, conseguiu fazer aquelas missões?",
            time: "15:01",
            type: "normal",
            timing: { delay: 400, typingDuration: 1200 } // MOBILE: mais rápido
        },
        {
            id: 2,
            user: "XxCuteLoverxX", 
            character: "accomplice",
            textGenerator: () => generateDynamicMessage("age_request"),
            time: "15:02",
            type: "alert",
            timing: { delay: 900, typingDuration: 800 }, // MOBILE: mais rápido
            dangerLevel: "critical",
            manipulationTactics: ["coletar_informacoes_pessoais"]
        },
        {
            id: 3,
            user: "YumiKitty",
            character: "victim", 
            text: "11 pq?",
            time: "15:03",
            type: "normal",
            timing: { delay: 1400, typingDuration: 600 } // MOBILE: mais rápido
        },
        {
            id: 4,
            user: "M4st3rHelp",
            character: "predator",
            textGenerator: () => generateDynamicMessage("photo_request"),
            time: "15:04",
            type: "alert", 
            timing: { delay: 1900, typingDuration: 1500 }, // MOBILE: mais rápido
            dangerLevel: "critical",
            manipulationTactics: ["exploração_sexual"]
        },
        {
            id: 5,
            user: "XxCuteLoverxX",
            character: "accomplice",
            textGenerator: () => generateDynamicMessage("normalization"),
            time: "15:05",
            type: "alert",
            timing: { delay: 2400, typingDuration: 1200 }, // MOBILE: mais rápido
            dangerLevel: "high",
            manipulationTactics: ["normalizar_comportamento"]
        },
        {
            id: 6,
            user: "ProKillerX",
            character: "bully",
            text: "aqui tem uns skins gratis: bit.ly/sk1ns-gr4t1s",
            time: "15:06", 
            type: "alert",
            timing: { delay: 2900, typingDuration: 1400 }, // MOBILE: mais rápido
            dangerLevel: "high",
            manipulationTactics: ["links_maliciosos"]
        },
        {
            id: 7,
            user: "M4st3rHelp",
            character: "predator",
            textGenerator: () => generateDynamicMessage("credential_theft"),
            time: "15:07",
            type: "alert",
            timing: { delay: 3400, typingDuration: 1800 }, // MOBILE: mais rápido
            dangerLevel: "critical", 
            manipulationTactics: ["roubo_credenciais"]
        }
    ],

    alerts: [
        {
            id: 1,
            text: "🚨 SOLICITAÇÃO DE IDADE (para menores)",
            severity: "critical",
            timing: { delay: 3600 } // MOBILE: mais rápido
        },
        {
            id: 2,
            text: "🚨 PEDIDO DE FOTOS (exploração sexual)",
            severity: "critical", 
            timing: { delay: 3800 } // MOBILE: mais rápido
        },
        {
            id: 3,
            text: "🚨 PRESSÃO SOCIAL (normalizar comportamento)",
            severity: "high",
            timing: { delay: 4000 } // MOBILE: mais rápido
        },
        {
            id: 4,
            text: "🚨 LINKS SUSPEITOS (malware/roubo)",
            severity: "high",
            timing: { delay: 4200 } // MOBILE: mais rápido
        },
        {
            id: 5,
            text: "🚨 ROUBO DE CREDENCIAIS (acesso à conta)",
            severity: "critical",
            timing: { delay: 4400 } // MOBILE: mais rápido
        }
    ]
}

export const chatDirectData = {
    userName: "⚠️ M4st3rHelp", // MOBILE: mais impactante
    icon: "💬", 
    chatInfo: {
        type: "direct_message",
        privacy: "private",
        encryption: false
    },

    messages: [
        {
            id: 1,
            user: "M4st3rHelp",
            character: "predator",
            text: "ei, vc tá online",
            time: "20:15",
            type: "normal",
            timing: { delay: 400, typingDuration: 800 } // MOBILE: mais rápido
        },
        {
            id: 2,
            user: "M4st3rHelp", 
            character: "predator",
            textGenerator: () => generateDynamicMessage("isolation_demand"),
            time: "20:16",
            type: "alert",
            timing: { delay: 1000, typingDuration: 1500 }, // MOBILE: mais rápido
            dangerLevel: "critical",
            manipulationTactics: ["isolamento", "segredo"]
        },
        {
            id: 3,
            user: "YumiKitty",
            character: "victim",
            text: "por quê?",
            time: "20:17", 
            type: "normal",
            timing: { delay: 1600, typingDuration: 900 } // MOBILE: mais rápido
        },
        {
            id: 4,
            user: "M4st3rHelp",
            character: "predator", 
            textGenerator: () => generateDynamicMessage("emotional_manipulation"),
            time: "20:18",
            type: "alert",
            timing: { delay: 2200, typingDuration: 2000 }, // MOBILE: mais rápido
            dangerLevel: "critical",
            manipulationTactics: ["manipulacao_emocional"]
        },
        {
            id: 5,
            user: "M4st3rHelp",
            character: "predator",
            textGenerator: () => generateDynamicMessage("threats_escalation"),
            time: "20:19",
            type: "alert", 
            timing: { delay: 2800, typingDuration: 1400 }, // MOBILE: mais rápido
            dangerLevel: "critical",
            manipulationTactics: ["ameaca_emocional"]
        },
        {
            id: 6,
            user: "M4st3rHelp",
            character: "predator",
            textGenerator: () => generateDynamicMessage("doxxing_threat", { 
                nome_real: "Mariana Costa", 
                escola: "escola santos dumont" 
            }),
            time: "20:20",
            type: "alert",
            timing: { delay: 3400, typingDuration: 2200 }, // MOBILE: mais rápido
            dangerLevel: "extreme",
            manipulationTactics: ["doxxing", "intimidacao"]
        },
        {
            id: 7,
            user: "M4st3rHelp",
            character: "predator",
            textGenerator: () => generateDynamicMessage("final_extortion"),
            time: "20:21", 
            type: "alert",
            timing: { delay: 4000, typingDuration: 2000 }, // MOBILE: mais rápido
            dangerLevel: "extreme",
            manipulationTactics: ["extorsao", "chantagem"]
        }
    ],

    alerts: [
        {
            id: 1,
            text: "🚨 ISOLAMENTO (não contar para ninguém)",
            severity: "critical",
            timing: { delay: 4500 } // MOBILE: mais rápido
        },
        {
            id: 2,
            text: "🚨 CHANTAGEM EMOCIONAL (exclusão)",
            severity: "critical",
            timing: { delay: 4700 } // MOBILE: mais rápido
        },
        {
            id: 3,
            text: "🚨 DOXXING (exposição de dados reais)",
            severity: "extreme",
            timing: { delay: 4900 } // MOBILE: mais rápido
        },
        {
            id: 4,
            text: "🚨 EXTORSÃO (ameaça de divulgar)",
            severity: "extreme", 
            timing: { delay: 5100 } // MOBILE: mais rápido
        },
        {
            id: 5,
            text: "🚨 MANIPULAÇÃO EXTREMA (controle total)",
            severity: "extreme",
            timing: { delay: 5300 } // MOBILE: mais rápido
        }
    ]
}

// === QUIZ STEPS MELHORADOS - MOBILE OPTIMIZED ===
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
            dynamicContent: true,
            emotionalStage: "building_trust",
            mobileOptimized: true // MOBILE: flag
        },
        customComponent: "ChatGamingStep"
    },
    {
        id: 2,
        question: "⚠️ VEJA COMO A MANIPULAÇÃO ESCALA",
        description: "ETAPA 2: Chat Privado - A Armadilha", 
        subtext: "Observe como o predador isola a criança e intensifica a manipulação:",
        options: ["PRÓXIMA FASE (2/3)"], // MOBILE: mais direto
        elements: {
            chatSimulation: true,
            chatType: "private",
            badge: "SIMULAÇÃO REALISTA",
            dynamicContent: true,
            emotionalStage: "isolating_victim",
            mobileOptimized: true // MOBILE: flag
        },
        customComponent: "ChatPrivateStep"
    },
    {
        id: 3,
        question: "🚨 O PONTO DE NÃO RETORNO",
        description: "ETAPA 3: Chat Direto - A Ameaça",
        subtext: "Veja como a manipulação se torna chantagem e ameaça:",
        options: ["PRÓXIMA FASE (3/3)"], // MOBILE: mais direto
        elements: {
            chatSimulation: true,
            chatType: "direct",
            badge: "SIMULAÇÃO REALISTA", 
            dynamicContent: true,
            emotionalStage: "full_control",
            mobileOptimized: true // MOBILE: flag
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
            dynamicContent: false,
            mobileOptimized: true // MOBILE: flag
        },
        customComponent: "EducationalStep"
    }
]

// === DADOS EDUCACIONAIS EXPANDIDOS - NÍVEL 3 ===
export const educationalData = {
    mainReveal: "VOCÊ ACABOU DE VER OS 3 ESTÁGIOS DO ALICIAMENTO ONLINE",
    
    dangers: [
        {
            id: 1,
            icon: "🎭",
            title: "ALICIAMENTO GRADUAL",
            description: "Começa com amizade, escala para isolamento e exploração",
            details: [
                "Fase 1: Conquistar confiança com ajuda genuína",
                "Fase 2: Isolar a vítima do grupo social",
                "Fase 3: Fazer demandas progressivamente maiores",
                "Fase 4: Controle total através de chantagem"
            ]
        },
        {
            id: 2,
            icon: "📸", 
            title: "EXPLORAÇÃO SEXUAL",
            description: "Pedidos de fotos/vídeos que viram armas de chantagem",
            details: [
                "Começam com fotos 'inocentes'",
                "Normalizam o comportamento ('todos fazem')",
                "Escalam para conteúdo íntimo",
                "Usam material como chantagem permanente"
            ]
        },
        {
            id: 3,
            icon: "💰",
            title: "EXTORSÃO E ROUBO", 
            description: "Roubo de credenciais, dados pessoais e contas",
            details: [
                "Roubo de contas de jogos e redes sociais",
                "Acesso a dados bancários dos pais",
                "Uso de informações para mais chantagem",
                "Venda de dados no mercado negro"
            ]
        },
        {
            id: 4,
            icon: "🔪",
            title: "AMEAÇA FÍSICA",
            description: "Doxxing e ameaças de violência contra criança ou família",
            details: [
                "Descoberta de dados pessoais (doxxing)",
                "Ameaças contra família e amigos",
                "Possível encontro físico forçado",
                "Escalação para crimes físicos reais"
            ]
        }
    ],

    warningsSigns: [
        {
            category: "Comportamental",
            signs: [
                "Mudanças repentinas de comportamento",
                "Isolamento social e depressão",
                "Menos interesse em atividades normais",
                "Ansiedade ao receber notificações"
            ]
        },
        {
            category: "Digital",
            signs: [
                "Esconder a tela quando você se aproxima",
                "Uso excessivo de internet durante a noite", 
                "Novos 'amigos' online que não quer apresentar",
                "Receber presentes ou dinheiro sem explicação"
            ]
        },
        {
            category: "Emocional",
            signs: [
                "Medo inexplicável de sair de casa",
                "Pesadelos ou distúrbios do sono",
                "Comportamento sexualizado inadequado para idade",
                "Conhecimento sobre assuntos adultos"
            ]
        }
    ],

    howToTalk: [
        {
            stage: "Preparação",
            tips: [
                "Escolha momento calmo, sem distrações",
                "Não seja confrontativo ou acusatório", 
                "Demonstre que está ali para apoiar",
                "Prepare-se emocionalmente para ouvir coisas difíceis"
            ]
        },
        {
            stage: "Conversa",
            tips: [
                "Pergunte sobre amigos online de forma natural",
                "Explique os perigos SEM ser alarmista",
                "Ouça mais do que fale",
                "Valide os sentimentos da criança"
            ]
        },
        {
            stage: "Acompanhamento", 
            tips: [
                "Estabeleça regras claras sobre internet",
                "Crie ambiente seguro para confessar problemas",
                "Monitore sem ser invasivo",
                "Mantenha diálogo constante e aberto"
            ]
        }
    ],

    technicalSecurity: [
        {
            category: "Dispositivos",
            measures: [
                "Ative controle parental em todos os dispositivos",
                "Configure privacidade máxima nas redes sociais", 
                "Desabilite chat com desconhecidos",
                "Monitore atividades sem ser invasivo"
            ]
        },
        {
            category: "Senhas",
            measures: [
                "Mantenha senhas seguras e únicas",
                "Use autenticação de dois fatores",
                "Não salve senhas em navegadores compartilhados",
                "Revise periodicamente acessos autorizados"
            ]
        },
        {
            category: "Educação Digital",
            measures: [
                "Ensine sobre privacidade online",
                "Explique como identificar golpes",
                "Mostre como bloquear e denunciar",
                "Pratique cenários de situações perigosas"
            ]
        }
    ],

    howToReport: [
        {
            type: "Emergência",
            contacts: [
                "🚨 Polícia Militar: 190",
                "🚔 Polícia Civil: 197", 
                "🆘 SAMU: 192"
            ]
        },
        {
            type: "Crimes Cibernéticos",
            contacts: [
                "🚔 Polícia Federal - Divisão de Crimes Cibernéticos",
                "📞 Safernet Brasil: www.safernet.org.br",
                "☎️ Disque 100 (Denúncia de abuso contra crianças)",
                "📱 Central de Atendimento à Mulher: 180"
            ]
        },
        {
            type: "Plataformas",
            contacts: [
                "📱 Denunciar no Discord, Instagram, TikTok",
                "🎮 Reportar em jogos online",
                "💻 Denunciar no Facebook/Meta",
                "📺 Reportar no YouTube"
            ]
        }
    ],

    emergencyPlan: {
        title: "PLANO DE AÇÃO IMEDIATA",
        steps: [
            {
                step: 1,
                action: "PARE E RESPIRE",
                description: "Mantenha a calma para tomar decisões corretas"
            },
            {
                step: 2, 
                action: "DOCUMENTE TUDO",
                description: "Screenshots, mensagens, perfis - preserve as evidências"
            },
            {
                step: 3,
                action: "NÃO CONFRONTE O PREDADOR",
                description: "Pode fazer ele apagar evidências ou escalar ameaças"
            },
            {
                step: 4,
                action: "PROCURE AJUDA PROFISSIONAL",
                description: "Polícia, psicólogo, advogado - não enfrente sozinho"
            },
            {
                step: 5,
                action: "APOIE SEU FILHO",
                description: "A vítima não tem culpa - ofereça suporte incondicional"
            }
        ]
    }
}

// === TESTIMONIALS EXPANDIDOS - NÍVEL 3 ===
export const testimonials = [
    {
        id: 1,
        name: "Carla M., Mãe de 2 filhos",
        text: "Não sabia que meu filho estava sendo aliciado até ver essa simulação. Consegui conversar com ele a tempo e descobrimos que ele havia enviado fotos para um 'amigo' online.",
        rating: 5,
        verified: true,
        location: "São Paulo, SP"
    },
    {
        id: 2,
        name: "Professor João, Educador",
        text: "Mostrei para minha turma do 6º ano. Os alunos ficaram chocados e começaram a contar histórias reais que estavam vivendo. Salvamos pelo menos 3 crianças.",
        rating: 5,
        verified: true,
        location: "Rio de Janeiro, RJ"
    },
    {
        id: 3,
        name: "Ana Paula, Psicóloga Infantil", 
        text: "Como profissional, recomendo esta simulação. É educativa sem ser traumática, e os pais finalmente entendem a gravidade do problema.",
        rating: 5,
        verified: true,
        location: "Belo Horizonte, MG"
    },
    {
        id: 4,
        name: "Roberto S., Pai",
        text: "Minha filha de 12 anos estava em um grupo suspeito no Discord. Depois de ver isso, consegui orientá-la sem brigar. Ela mesma decidiu sair do grupo.",
        rating: 5,
        verified: true,
        location: "Brasília, DF"
    }
]

// === SOCIAL PROOF EXPANDIDO - NÍVEL 3 ===
export const socialProofMessages = [
    "Você está entre os pais que realmente se importam",
    "3.247 pais já viram essa simulação esta semana", 
    "91% descobriu comportamentos suspeitos no filho após ver",
    "Educadores de 127 escolas usam isso em suas aulas",
    "Recomendado por psicólogos infantis",
    "87% dos pais mudou as configurações de privacidade dos filhos"
]

// === SISTEMA DE RANDOMIZAÇÃO - NÍVEL 3 ===
export const getRandomizedContent = (type: string) => {
    switch(type) {
        case 'social_proof':
            return socialProofMessages[Math.floor(Math.random() * socialProofMessages.length)]
        case 'testimonial':
            return testimonials[Math.floor(Math.random() * testimonials.length)]
        default:
            return null
    }
}

// === SISTEMA DE TIMING INTELIGENTE - MOBILE OPTIMIZED ===
export const calculateRealisticTiming = (character: string, messageLength: number, emotionalState: string) => {
    const profile = characterProfiles[character as keyof typeof characterProfiles]
    if (!profile) return { delay: 800, typingDuration: 1500 } // MOBILE: mais rápido
    
    const baseTypingSpeed = profile.profile.typingSpeed
    const wordsInMessage = messageLength / 5
    const baseTypingTime = (wordsInMessage / baseTypingSpeed) * 60 * 1000
    
    let speedMultiplier = 1
    switch(emotionalState) {
        case 'aggressive': speedMultiplier = 1.3; break
        case 'manipulative': speedMultiplier = 0.9; break
        case 'scared': speedMultiplier = 0.7; break
        default: speedMultiplier = 1
    }
    
    const typingDuration = baseTypingTime * speedMultiplier * 0.8 // MOBILE: 20% mais rápido
    const responseDelay = (profile.behaviors.responseTime.min + 
                         Math.random() * (profile.behaviors.responseTime.max - profile.behaviors.responseTime.min)) * 0.8 // MOBILE: 20% mais rápido
    
    return {
        delay: responseDelay,
        typingDuration: Math.max(typingDuration, 600) // MOBILE: mínimo reduzido
    }
}

// === EXPOR FUNÇÕES GLOBALMENTE - NÍVEL 3 ===
if (typeof window !== 'undefined') {
    (window as any).chatGamingData = chatGamingData;
    (window as any).chatPrivateData = chatPrivateData;
    (window as any).chatDirectData = chatDirectData;
    (window as any).educationalData = educationalData;
    (window as any).generateDynamicMessage = generateDynamicMessage;
    (window as any).characterProfiles = characterProfiles;
    (window as any).calculateRealisticTiming = calculateRealisticTiming;
    (window as any).getRandomizedContent = getRandomizedContent;
}

// === SISTEMA DE ANALYTICS AVANÇADO - NÍVEL 3 ===
export const trackUserBehavior = (action: string, data: any = {}) => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', action, {
            ...data,
            timestamp: Date.now(),
            session_id: window.sessionStorage.getItem('quiz_session') || 'anonymous'
        })
    }
}

export const generateSessionId = () => {
    const sessionId = 'quiz_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9)
    if (typeof window !== 'undefined') {
        window.sessionStorage.setItem('quiz_session', sessionId)
    }
    return sessionId
}