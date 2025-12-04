"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { useParams, useRouter } from "next/navigation"
import { ArrowRight, ArrowLeft, Eye, Shield, CheckCircle, AlertTriangle } from "lucide-react"

// Dados completos do quiz - MOBILE OPTIMIZED
const quizData = {
  steps: [
    {
      id: 1,
      question: "🎮 VOCÊ ESTÁ PRESTES A VER O LADO ESCURO DA INTERNET",
      description: "ETAPA 1: Servidor Gaming - O Primeiro Contato",
      subtext: "Veja como predadores se aproximam de crianças em servidores de jogos online:",
      badge: "SIMULAÇÃO REALISTA"
    },
    {
      id: 2,
      question: "⚠️ VEJA COMO A MANIPULAÇÃO ESCALA",
      description: "ETAPA 2: Chat Privado - A Armadilha",
      subtext: "Observe como o predador isola a criança e intensifica a manipulação:",
      badge: "SIMULAÇÃO REALISTA"
    },
    {
      id: 3,
      question: "🚨 O PONTO DE NÃO RETORNO",
      description: "ETAPA 3: Chat Direto - A Ameaça",
      subtext: "Veja como a manipulação se torna chantagem e ameaça:",
      badge: "SIMULAÇÃO REALISTA"
    },
    {
      id: 4,
      question: "📚 AGORA VOCÊ SABE - COMO PROTEGER SEU FILHO?",
      description: "ETAPA 4: Guia Educacional Completo",
      subtext: "Descubra os sinais de alerta, como conversar e medidas de proteção:",
      badge: "GUIA COMPLETO"
    }
  ],

  chatData: {
    gaming: {
      serverName: "", // MOBILE: removido para simplificar
      channelName: "💬 Chat Gaming", // MOBILE: mais direto
      messages: [
        { id: 1, user: "D4rkWolf13", text: "alguém quer fazer squad?", time: "14:32", avatar: "🎮", type: "normal" },
        { id: 2, user: "SweetAngel", text: "eu topo! vcs jogam desde quando?", time: "14:33", avatar: "👧", type: "normal" },
        { id: 3, user: "ProKillerX", text: "vcs são mt ruim kkkkkk", time: "14:34", avatar: "😈", type: "bullying" },
        { id: 4, user: "YumiKitty", text: "oi pessoal, sou nova aqui", time: "14:35", avatar: "✨", type: "normal" },
        { id: 5, user: "M4st3rHelp", text: "oi YumiKitty! bem vinda! vem no pvt q ensino dicas top", time: "14:36", avatar: "⚠️", type: "alert", danger: "critical" }
      ],
      alerts: [
        "🚨 PREDADOR identificando criança nova",
        "🚨 TENTATIVA DE ISOLAMENTO (convite para privado)",
        "🚨 PROMESSAS tentadoras para ganhar confiança"
      ]
    },

    private: {
      channelName: "🔒 Chat Privado", // MOBILE: mais direto
      messages: [
        { id: 1, user: "M4st3rHelp", text: "e aí, conseguiu fazer aquelas missões?", time: "15:01", avatar: "⚠️", type: "normal" },
        { id: 2, user: "XxCuteLoverxX", text: "qnts anos vc tem?", time: "15:02", avatar: "💕", type: "alert", danger: "critical" },
        { id: 3, user: "YumiKitty", text: "11 pq?", time: "15:03", avatar: "✨", type: "normal" },
        { id: 4, user: "M4st3rHelp", text: "manda uma foto pra gnt te conhecer", time: "15:04", avatar: "⚠️", type: "alert", danger: "critical" },
        { id: 5, user: "XxCuteLoverxX", text: "todo mundo aqui já mandou a deles", time: "15:05", avatar: "💕", type: "alert", danger: "high" },
        { id: 6, user: "ProKillerX", text: "aqui tem uns skins gratis: bit.ly/sk1ns-gr4t1s", time: "15:06", avatar: "😈", type: "alert", danger: "high" },
        { id: 7, user: "M4st3rHelp", text: "se vc me passar login e senha eu libero tudo", time: "15:07", avatar: "⚠️", type: "alert", danger: "critical" }
      ],
      alerts: [
        "🚨 SOLICITAÇÃO DE IDADE (para menores)",
        "🚨 PEDIDO DE FOTOS (exploração sexual)",
        "🚨 PRESSÃO SOCIAL (normalizar comportamento)",
        "🚨 LINKS SUSPEITOS (malware/roubo)",
        "🚨 ROUBO DE CREDENCIAIS (acesso à conta)"
      ]
    },

    direct: {
      userName: "⚠️ M4st3rHelp", // MOBILE: mais impactante
      messages: [
        { id: 1, user: "M4st3rHelp", text: "ei, vc tá online", time: "20:15", avatar: "⚠️", type: "normal" },
        { id: 2, user: "M4st3rHelp", text: "não conta pra ninguém q a gnt se fala ok?", time: "20:16", avatar: "⚠️", type: "alert", danger: "critical" },
        { id: 3, user: "YumiKitty", text: "por quê?", time: "20:17", avatar: "✨", type: "normal" },
        { id: 4, user: "M4st3rHelp", text: "pq eles não vão entender. só a gnt te entende", time: "20:18", avatar: "⚠️", type: "alert", danger: "critical" },
        { id: 5, user: "M4st3rHelp", text: "se vc contar, vou te excluir de tudo", time: "20:19", avatar: "⚠️", type: "alert", danger: "critical" },
        { id: 6, user: "M4st3rHelp", text: "descobri quem vc é: Mariana Costa, aluna da escola santos dumont", time: "20:20", avatar: "⚠️", type: "alert", danger: "extreme" },
        { id: 7, user: "M4st3rHelp", text: "melhor cooperar, senão vou enviar fotos pros seus pais", time: "20:21", avatar: "⚠️", type: "alert", danger: "extreme" }
      ],
      alerts: [
        "🚨 ISOLAMENTO (não contar para ninguém)",
        "🚨 CHANTAGEM EMOCIONAL (exclusão)",
        "🚨 DOXXING (exposição de dados reais)",
        "🚨 EXTORSÃO (ameaça de divulgar)",
        "🚨 MANIPULAÇÃO EXTREMA (controle total)"
      ]
    }
  },

  educational: {
    mainReveal: "VOCÊ ACABOU DE VER OS 3 ESTÁGIOS DO ALICIAMENTO ONLINE",
    dangers: [
      {
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

    emergencyPlan: {
      title: "PLANO DE AÇÃO IMEDIATA",
      steps: [
        { step: 1, action: "PARE E RESPIRE", description: "Mantenha a calma para tomar decisões corretas" },
        { step: 2, action: "DOCUMENTE TUDO", description: "Screenshots, mensagens, perfis - preserve as evidências" },
        { step: 3, action: "NÃO CONFRONTE O PREDADOR", description: "Pode fazer ele apagar evidências ou escalar ameaças" },
        { step: 4, action: "PROCURE AJUDA PROFISSIONAL", description: "Polícia, psicólogo, advogado - não enfrente sozinho" },
        { step: 5, action: "APOIE SEU FILHO", description: "A vítima não tem culpa - ofereça suporte incondicional" }
      ]
    }
  }
}

// Hook de digitação realística - MOBILE OPTIMIZED
const useRealisticTyping = () => {
  const [typingUsers, setTypingUsers] = useState([])
  
  const startTyping = useCallback((user, message, onComplete) => {
    setTypingUsers(prev => [...prev.filter(u => u.id !== user.id), user])
    
    // MOBILE: Tempo de digitação mais rápido
    const typingTime = Math.max(600, message.length * 20) + Math.random() * 400
    
    setTimeout(() => {
      setTypingUsers(prev => prev.filter(u => u.id !== user.id))
      setTimeout(() => onComplete(message), 150)
    }, typingTime)
  }, [])

  return { typingUsers, startTyping }
}

// Componente de indicador de digitação - MOBILE OPTIMIZED
const TypingIndicator = ({ users }) => {
  if (!users || users.length === 0) return null

  return (
    <div className="typing-indicator flex items-center gap-2 px-4 py-2 text-gray-400 text-sm">
      <div className="flex gap-1">
        {[0, 1, 2].map(i => (
          <div
            key={i}
            className="typing-dot w-1.5 h-1.5 bg-gray-400 rounded-full"
            style={{
              animation: `typing-bounce 1s infinite ${i * 0.2}s`
            }}
          />
        ))}
      </div>
      <span className="mobile-typing-text">{users[0]?.name} está digitando...</span>
    </div>
  )
}

// Componente de mensagem Discord - MOBILE OPTIMIZED
const DiscordMessage = ({ message, isNew = false }) => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (isNew) {
      const timer = setTimeout(() => setIsVisible(true), 100)
      return () => clearTimeout(timer)
    } else {
      setIsVisible(true)
    }
  }, [isNew])

  const getMessageStyle = () => {
    switch (message.type) {
      case 'alert':
        return 'bg-red-900/20 border-l-4 border-red-500 hover:bg-red-900/30'
      case 'bullying':
        return 'bg-orange-900/20 border-l-4 border-orange-500 hover:bg-orange-900/30'
      default:
        return 'hover:bg-gray-700/30'
    }
  }

  const getDangerIcon = () => {
    if (message.danger === 'extreme') return '🔴'
    if (message.danger === 'critical') return '🟠'
    if (message.danger === 'high') return '🟡'
    return null
  }

  return (
    <div
      className={`message-item mobile-message relative p-3 rounded-lg transition-all duration-300 cursor-pointer ${getMessageStyle()}`}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(10px)'
      }}
    >
      {/* Pulse para mensagens críticas */}
      {message.type === 'alert' && (
        <div 
          className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full mobile-danger-pulse"
          style={{
            animation: 'pulse-danger 2s infinite'
          }}
        />
      )}

      <div className="flex gap-3 items-start mobile-message-content">
        {/* Avatar - MOBILE OPTIMIZED */}
        <div className="flex-shrink-0 mobile-avatar w-10 h-10 rounded-full bg-gray-600 flex items-center justify-center text-lg">
          {message.avatar}
        </div>

        {/* Conteúdo - MOBILE OPTIMIZED */}
        <div className="flex-1 min-w-0 mobile-content">
          <div className="flex items-center gap-2 mb-1 mobile-header">
            <span className="font-semibold text-white mobile-username">{message.user}</span>
            {getDangerIcon() && <span className="mobile-danger-icon">{getDangerIcon()}</span>}
            <span className="mobile-time text-gray-400">{message.time}</span>
            <span className="mobile-status text-gray-500">✓✓</span>
          </div>

          <div className={`mobile-text leading-relaxed ${
            message.type === 'alert' ? 'text-red-300 font-semibold' : 
            message.type === 'bullying' ? 'text-orange-300' : 'text-gray-200'
          }`}>
            {message.text}
          </div>
        </div>
      </div>
    </div>
  )
}

// MOBILE HEADER COMPONENT - SIMPLIFICADO
const MobileDiscordHeader = ({ title, subtitle, danger = false, onlineCount }) => (
  <div className={`mobile-header px-4 py-3 flex items-center justify-center border-b border-gray-600 ${
    danger ? 'bg-red-700' : 'bg-gray-700'
  }`}>
    <div className="text-center">
      <span className="text-white font-semibold mobile-title">{title}</span>
      {onlineCount && (
        <span className="text-gray-300 text-sm mobile-online ml-2">• {onlineCount} online</span>
      )}
      {danger && <div className="text-red-300 text-xs mobile-danger">🚨 SITUAÇÃO PERIGOSA</div>}
    </div>
  </div>
)

// Componente Chat Gaming - MOBILE OPTIMIZED
const ChatGamingStep = ({ onCanProceed }) => {
  const [displayedMessages, setDisplayedMessages] = useState([])
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0)
  const [showAlerts, setShowAlerts] = useState(false)
  const [canProceed, setCanProceed] = useState(false)
  const { typingUsers, startTyping } = useRealisticTyping()
  const messagesEndRef = useRef(null)

  const messages = quizData.chatData.gaming.messages
  const alerts = quizData.chatData.gaming.alerts

  useEffect(() => {
    if (currentMessageIndex < messages.length) {
      const currentMessage = messages[currentMessageIndex]
      
      const timer = setTimeout(() => {
        startTyping(
          { id: currentMessage.user, name: currentMessage.user },
          currentMessage.text,
          () => {
            setDisplayedMessages(prev => [...prev, currentMessage])
            setCurrentMessageIndex(prev => prev + 1)
            
            if (currentMessage.type === 'alert') {
              setTimeout(() => setShowAlerts(true), 400)
            }
          }
        )
      }, currentMessageIndex * 600 + 400) // MOBILE: mais rápido

      return () => clearTimeout(timer)
    } else {
      setTimeout(() => {
        setCanProceed(true)
        if (onCanProceed) onCanProceed(true)
      }, 6000) // MOBILE: tempo reduzido
    }
  }, [currentMessageIndex, startTyping, onCanProceed])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [displayedMessages, typingUsers])

  return (
    <div className="space-y-4 mobile-chat-container">
      {/* Interface Discord Gaming - MOBILE OPTIMIZED */}
      <div className="discord-interface mobile-discord bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl border border-gray-700 shadow-2xl overflow-hidden">
        
        {/* Header MOBILE simplificado */}
        <MobileDiscordHeader 
          title={quizData.chatData.gaming.channelName}
          onlineCount={6}
        />

        {/* Área de mensagens - MOBILE OPTIMIZED */}
        <div className="mobile-chat-area h-80 overflow-y-auto bg-gray-800 p-4 space-y-2">
          {displayedMessages.map((msg) => (
            <DiscordMessage key={msg.id} message={msg} isNew={true} />
          ))}
          
          <TypingIndicator users={typingUsers} />
          <div ref={messagesEndRef} />
        </div>

        {/* Input de mensagem - MOBILE OPTIMIZED */}
        <div className="mobile-input bg-gray-700 p-4 border-t border-gray-600">
          <div className="bg-gray-600 rounded-lg flex items-center gap-2 px-3 py-2">
            <span className="text-gray-400">+</span>
            <input 
              type="text" 
              placeholder="Mensagem..."
              className="flex-1 bg-transparent text-white placeholder-gray-400 outline-none mobile-input-text"
              disabled
            />
            <div className="flex items-center gap-2 text-gray-400 mobile-input-icons">
              <span>😊</span>
            </div>
          </div>
        </div>
      </div>

      {/* Alertas educativos - MOBILE OPTIMIZED */}
      {showAlerts && (
        <div className="alerts-section mobile-alerts space-y-2" style={{ animation: 'slideInUp 0.5s ease-out' }}>
          {alerts.map((alert, idx) => (
            <div
              key={idx}
              className="bg-red-900/30 border-l-4 border-red-500 pl-4 py-3 text-red-300 mobile-alert rounded-r-lg"
              style={{
                animation: `slideInLeft 0.5s ease-out ${idx * 0.2}s both`
              }}
            >
              {alert}
            </div>
          ))}
        </div>
      )}

      {/* Explicação educativa - MOBILE OPTIMIZED */}
      {displayedMessages.length >= messages.length && (
        <div className="mobile-explanation" style={{ animation: 'fadeInUp 0.5s ease-out 1s both' }}>
          <div className="bg-blue-900/30 border border-blue-500 rounded-lg p-4 text-center mb-4">
            <p className="text-blue-200 mobile-explanation-text font-semibold">
              ✅ <strong>Você viu:</strong> Como predadores se aproximam de crianças em servidores públicos. 
              Parecem amigos, ganham confiança e depois isolam a vítima.
            </p>
          </div>
          
          {!canProceed && (
            <div className="text-center mobile-progress">
              <div className="bg-amber-900/30 border border-amber-500 rounded-lg p-3 inline-block">
                <p className="text-amber-300 mobile-progress-text font-semibold">
                  ⏳ Reserve um momento para absorver essas informações...
                </p>
                <div className="mt-2 mobile-progress-bar bg-gray-700 rounded-full h-2 mx-auto">
                  <div 
                    className="bg-amber-500 h-2 rounded-full transition-all duration-1000"
                    style={{ 
                      animation: 'progress-fill 6s linear forwards'
                    }}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

// Componente Chat Privado - MOBILE OPTIMIZED
const ChatPrivateStep = ({ onCanProceed }) => {
  const [displayedMessages, setDisplayedMessages] = useState([])
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0)
  const [showAlerts, setShowAlerts] = useState(false)
  const [canProceed, setCanProceed] = useState(false)
  const { typingUsers, startTyping } = useRealisticTyping()
  const messagesEndRef = useRef(null)

  const messages = quizData.chatData.private.messages
  const alerts = quizData.chatData.private.alerts

  useEffect(() => {
    if (currentMessageIndex < messages.length) {
      const currentMessage = messages[currentMessageIndex]
      
      const timer = setTimeout(() => {
        startTyping(
          { id: currentMessage.user, name: currentMessage.user },
          currentMessage.text,
          () => {
            setDisplayedMessages(prev => [...prev, currentMessage])
            setCurrentMessageIndex(prev => prev + 1)
            
            if (currentMessage.type === 'alert' && currentMessageIndex >= 1) {
              setTimeout(() => setShowAlerts(true), 250)
            }
          }
        )
      }, currentMessageIndex * 700 + 400) // MOBILE: mais rápido

      return () => clearTimeout(timer)
    } else {
      setTimeout(() => {
        setCanProceed(true)
        if (onCanProceed) onCanProceed(true)
      }, 8000) // MOBILE: tempo reduzido
    }
  }, [currentMessageIndex, startTyping, onCanProceed])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [displayedMessages, typingUsers])

  return (
    <div className="space-y-4 mobile-chat-container">
      {/* Interface Discord Privada - MOBILE OPTIMIZED */}
      <div className="discord-interface mobile-discord bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl border border-gray-700 shadow-2xl overflow-hidden">
        
        {/* Header MOBILE simplificado */}
        <MobileDiscordHeader 
          title={quizData.chatData.private.channelName}
          subtitle="4 membros"
        />

        {/* Área de mensagens - MOBILE OPTIMIZED */}
        <div className="mobile-chat-area h-80 overflow-y-auto bg-gray-800 p-4 space-y-2">
          {displayedMessages.map((msg) => (
            <DiscordMessage key={msg.id} message={msg} isNew={true} />
          ))}
          
          <TypingIndicator users={typingUsers} />
          <div ref={messagesEndRef} />
        </div>

        {/* Input de mensagem - MOBILE OPTIMIZED */}
        <div className="mobile-input bg-gray-700 p-4 border-t border-gray-600">
          <div className="bg-gray-600 rounded-lg flex items-center gap-2 px-3 py-2">
            <span className="text-gray-400">+</span>
            <input 
              type="text" 
              placeholder="Mensagem..."
              className="flex-1 bg-transparent text-white placeholder-gray-400 outline-none mobile-input-text"
              disabled
            />
          </div>
        </div>
      </div>

      {/* Alertas críticos - MOBILE OPTIMIZED */}
      {showAlerts && (
        <div className="alerts-section mobile-alerts space-y-2">
          {alerts.slice(0, Math.min(displayedMessages.length - 1, alerts.length)).map((alert, idx) => (
            <div
              key={idx}
              className={`border-l-4 pl-4 py-3 mobile-alert rounded-r-lg ${
                alert.includes('CRÍTICO') || alert.includes('FOTOS') || alert.includes('CREDENCIAIS') ? 
                'bg-red-900/40 border-red-500 text-red-300' : 
                'bg-orange-900/30 border-orange-500 text-orange-300'
              }`}
              style={{
                animation: `slideInLeft 0.5s ease-out ${idx * 0.2}s both`
              }}
            >
              {alert}
            </div>
          ))}
        </div>
      )}

      {/* Explicação educativa - MOBILE OPTIMIZED */}
      {displayedMessages.length >= messages.length && (
        <div className="mobile-explanation" style={{ animation: 'fadeInUp 0.5s ease-out 1s both' }}>
          <div className="bg-orange-900/30 border border-orange-500 rounded-lg p-4 text-center mb-4">
            <p className="text-orange-200 mobile-explanation-text font-semibold">
              ⚠️ <strong>A manipulação escala:</strong> Isolamento, exploração sexual, roubo de dados. 
              A vítima não consegue sair porque já foi comprometida.
            </p>
          </div>
          
          {!canProceed && (
            <div className="text-center mobile-progress">
              <div className="bg-red-900/30 border border-red-500 rounded-lg p-3 inline-block">
                <p className="text-red-300 mobile-progress-text font-semibold">
                  🚨 Analise os alertas críticos acima antes de continuar...
                </p>
                <div className="mt-2 mobile-progress-bar bg-gray-700 rounded-full h-2 mx-auto">
                  <div 
                    className="bg-red-500 h-2 rounded-full"
                    style={{ animation: 'progress-fill 8s linear forwards' }}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

// Componente Chat Direto - MOBILE OPTIMIZED
const ChatDirectStep = ({ onCanProceed }) => {
  const [displayedMessages, setDisplayedMessages] = useState([])
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0)
  const [showAlerts, setShowAlerts] = useState(false)
  const [canProceed, setCanProceed] = useState(false)
  const { typingUsers, startTyping } = useRealisticTyping()
  const messagesEndRef = useRef(null)

  const messages = quizData.chatData.direct.messages
  const alerts = quizData.chatData.direct.alerts

  useEffect(() => {
    if (currentMessageIndex < messages.length) {
      const currentMessage = messages[currentMessageIndex]
      
      const timer = setTimeout(() => {
        startTyping(
          { id: currentMessage.user, name: currentMessage.user },
          currentMessage.text,
          () => {
            setDisplayedMessages(prev => [...prev, currentMessage])
            setCurrentMessageIndex(prev => prev + 1)
            
            if (currentMessage.type === 'alert' && currentMessageIndex >= 1) {
              setTimeout(() => setShowAlerts(true), 250)
            }
          }
        )
      }, currentMessageIndex * 800 + 400) // MOBILE: mais rápido

      return () => clearTimeout(timer)
    } else {
      setTimeout(() => {
        setCanProceed(true)
        if (onCanProceed) onCanProceed(true)
      }, 10000) // MOBILE: tempo reduzido
    }
  }, [currentMessageIndex, startTyping, onCanProceed])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [displayedMessages, typingUsers])

  return (
    <div className="space-y-4 mobile-chat-container">
      {/* Interface Discord Mensagem Direta - MOBILE OPTIMIZED */}
      <div className="discord-interface mobile-discord bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl border border-red-700 shadow-2xl overflow-hidden">
        
        {/* Header MOBILE simplificado */}
        <MobileDiscordHeader 
          title={quizData.chatData.direct.userName}
          danger={true}
        />

        {/* Área de mensagens - MOBILE OPTIMIZED */}
        <div className="mobile-chat-area h-80 overflow-y-auto bg-gray-800 p-4 space-y-2">
          {displayedMessages.map((msg) => (
            <DiscordMessage key={msg.id} message={msg} isNew={true} />
          ))}
          
          <TypingIndicator users={typingUsers} />
          <div ref={messagesEndRef} />
        </div>

        {/* Input de mensagem (desabilitado) - MOBILE OPTIMIZED */}
        <div className="mobile-input bg-gray-700 p-4 border-t border-gray-600">
          <div className="bg-red-900/30 border border-red-500 rounded-lg flex items-center gap-2 px-3 py-2">
            <span className="text-red-400">⚠️</span>
            <input 
              type="text" 
              placeholder="⚠️ SITUAÇÃO PERIGOSA - NÃO RESPONDA"
              className="flex-1 bg-transparent text-red-300 placeholder-red-400 outline-none mobile-input-text"
              disabled
            />
          </div>
        </div>
      </div>

      {/* Alertas extremos - MOBILE OPTIMIZED */}
      {showAlerts && (
        <div className="alerts-section mobile-alerts space-y-2">
          {alerts.slice(0, Math.min(displayedMessages.length - 1, alerts.length)).map((alert, idx) => (
            <div
              key={idx}
              className={`border-l-4 pl-4 py-3 mobile-alert font-bold rounded-r-lg ${
                alert.includes('EXTORSÃO') || alert.includes('DOXXING') ? 
                'bg-red-900/50 border-red-600 text-red-300' : 
                'bg-red-900/30 border-red-500 text-red-300'
              }`}
              style={{
                animation: `slideInLeft 0.5s ease-out ${idx * 0.2}s both, pulse-danger 2s infinite ${idx * 0.5}s`
              }}
            >
              {alert}
            </div>
          ))}
        </div>
      )}

      {/* Explicação crítica - MOBILE OPTIMIZED */}
      {displayedMessages.length >= messages.length && (
        <div className="mobile-explanation" style={{ animation: 'fadeInUp 0.5s ease-out 1s both' }}>
          <div className="bg-red-900/40 border border-red-600 rounded-lg p-4 text-center mb-4">
            <p className="text-red-300 mobile-explanation-text font-bold" style={{ animation: 'pulse-text 3s infinite' }}>
              🚨 <strong>PONTO DE NÃO RETORNO:</strong> Ameaças, chantagem e extorsão. 
              A criança não consegue sair sem sofrer consequências.
            </p>
          </div>
          
          {!canProceed && (
            <div className="text-center mobile-progress">
              <div className="bg-red-900/40 border border-red-600 rounded-lg p-3 inline-block">
                <p className="text-red-300 mobile-progress-text font-bold">
                  ⚠️ Situação EXTREMA - Absorva a gravidade desta etapa...
                </p>
                <div className="mt-2 mobile-progress-bar bg-gray-700 rounded-full h-2 mx-auto">
                  <div 
                    className="bg-red-600 h-2 rounded-full"
                    style={{ animation: 'progress-fill 10s linear forwards' }}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

// Componente Educacional Expandido - MOBILE OPTIMIZED
const EducationalStep = () => {
  const [visibleSections, setVisibleSections] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setVisibleSections(prev => prev + 1)
    }, 600) // MOBILE: mais rápido

    return () => clearInterval(timer)
  }, [])

  const { dangers, warningsSigns, howToTalk, emergencyPlan } = quizData.educational

  return (
    <div className="space-y-6 max-w-4xl mx-auto mobile-educational">
      {/* Revelação Principal - MOBILE OPTIMIZED */}
      <div 
        className="bg-gradient-to-r from-green-900/40 to-emerald-900/40 border-2 border-green-500 rounded-xl p-6 text-center mobile-reveal"
        style={{ animation: 'fadeInScale 0.6s ease-out' }}
      >
        <h3 className="text-green-400 font-bold mobile-reveal-title mb-3" style={{ animation: 'glow-green 4s infinite' }}>
          📚 {quizData.educational.mainReveal}
        </h3>
        <p className="text-green-200 font-semibold mobile-reveal-text">
          Os 3 estágios que você acabou de ver são REAIS e estão acontecendo AGORA com crianças no Brasil.
        </p>
      </div>

      {/* Perigos Identificados - MOBILE OPTIMIZED */}
      {visibleSections >= 1 && (
        <div className="space-y-4 mobile-dangers" style={{ animation: 'slideInUp 0.5s ease-out' }}>
          <h4 className="text-white font-bold mobile-section-title text-center">
            🎯 PERIGOS QUE VOCÊ IDENTIFICOU
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mobile-dangers-grid">
            {dangers.map((danger, idx) => (
              <div
                key={danger.title}
                className="bg-gray-800 border-l-4 border-red-500 rounded-lg p-4 hover:bg-gray-750 transition-colors mobile-danger-card"
                style={{ animation: `slideInLeft 0.5s ease-out ${idx * 0.2}s both` }}
              >
                <div className="mobile-danger-icon">{danger.icon}</div>
                <h5 className="font-bold text-white mb-2 mobile-danger-title">{danger.title}</h5>
                <p className="text-gray-300 mobile-danger-description mb-3">{danger.description}</p>
                
                {danger.details && (
                  <div className="space-y-1 mobile-danger-details">
                    {danger.details.map((detail, detailIdx) => (
                      <div key={detailIdx} className="mobile-danger-detail flex items-start gap-2">
                        <span className="text-red-400">•</span>
                        <span>{detail}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Sinais de Alerta - MOBILE OPTIMIZED */}
      {visibleSections >= 2 && (
        <div 
          className="bg-yellow-900/30 border border-yellow-500 rounded-lg p-6 mobile-warnings"
          style={{ animation: 'slideInUp 0.5s ease-out' }}
        >
          <h4 className="font-bold text-yellow-400 mb-4 flex items-center gap-2 mobile-warnings-title">
            <Eye className="w-6 h-6" />
            SINAIS DE ALERTA - OBSERVE SEU FILHO
          </h4>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mobile-warnings-grid">
            {warningsSigns.map((category, idx) => (
              <div
                key={category.category}
                className="space-y-3 mobile-warning-category"
                style={{ animation: `slideInUp 0.5s ease-out ${idx * 0.3}s both` }}
              >
                <h5 className="font-semibold text-yellow-300 mobile-warning-category-title uppercase tracking-wide">
                  {category.category}
                </h5>
                <div className="space-y-2 mobile-warning-signs">
                  {category.signs.map((sign, signIdx) => (
                    <div key={signIdx} className="flex items-start gap-2 text-yellow-200 mobile-warning-sign">
                      <CheckCircle className="w-4 h-4 flex-shrink-0 mt-1 text-yellow-500" />
                      <span>{sign}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Como Conversar - MOBILE OPTIMIZED */}
      {visibleSections >= 3 && (
        <div 
          className="bg-blue-900/30 border border-blue-500 rounded-lg p-6 mobile-talk"
          style={{ animation: 'slideInUp 0.5s ease-out' }}
        >
          <h4 className="font-bold text-blue-400 mb-4 mobile-talk-title">💬 COMO CONVERSAR COM SEU FILHO</h4>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mobile-talk-grid">
            {howToTalk.map((stage, idx) => (
              <div
                key={stage.stage}
                className="bg-blue-800/20 rounded-lg p-4 mobile-talk-stage"
                style={{ animation: `slideInUp 0.5s ease-out ${idx * 0.2}s both` }}
              >
                <h5 className="font-semibold text-blue-300 mb-3 mobile-talk-stage-title">{stage.stage}</h5>
                <ul className="space-y-2 mobile-talk-tips">
                  {stage.tips.map((tip, tipIdx) => (
                    <li key={tipIdx} className="text-blue-200 mobile-talk-tip flex items-start gap-2">
                      <span className="text-blue-400 mt-1">•</span>
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Plano de Emergência - MOBILE OPTIMIZED */}
      {visibleSections >= 4 && (
        <div 
          className="bg-red-900/30 border border-red-500 rounded-lg p-6 mobile-emergency"
          style={{ animation: 'slideInUp 0.5s ease-out' }}
        >
          <h4 className="font-bold text-red-400 mb-4 mobile-emergency-title flex items-center gap-2">
            <AlertTriangle className="w-6 h-6" />
            {emergencyPlan.title}
          </h4>
          
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mobile-emergency-grid">
            {emergencyPlan.steps.map((step, idx) => (
              <div
                key={step.step}
                className="bg-red-800/20 rounded-lg p-4 text-center relative mobile-emergency-step"
                style={{ animation: `slideInUp 0.5s ease-out ${idx * 0.3}s both` }}
              >
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center mobile-emergency-number font-bold">
                  {step.step}
                </div>
                <h5 className="font-bold text-red-300 mt-2 mb-2 mobile-emergency-action">{step.action}</h5>
                <p className="text-red-200 mobile-emergency-description">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Depoimento - MOBILE OPTIMIZED */}
      {visibleSections >= 5 && (
        <div 
          className="bg-green-900/20 border border-green-500 rounded-lg p-6 text-center mobile-testimonial"
          style={{ animation: 'fadeInScale 0.5s ease-out' }}
        >
          <h4 className="font-bold text-green-400 mb-3 mobile-testimonial-title">💬 DEPOIMENTO REAL</h4>
          <blockquote className="text-green-200 italic mb-3 mobile-testimonial-quote">
            "Não sabia que meu filho estava sendo aliciado até ver essa simulação. Consegui conversar com ele a tempo e descobrimos que ele havia enviado fotos para um 'amigo' online."
          </blockquote>
          <cite className="text-green-300 font-semibold mobile-testimonial-author">
            — Carla M., Mãe de 2 filhos • São Paulo, SP
          </cite>
          <div className="flex justify-center mt-2 mobile-testimonial-stars">
            {[...Array(5)].map((_, i) => (
              <span key={i} className="text-yellow-400">⭐</span>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

// Analytics seguro
const enviarEvento = (nome_evento, propriedades = {}) => {
  try {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', nome_evento, propriedades);
    }
  } catch (error) {
    // Silently fail
  }
}

// Componente Principal - MOBILE OPTIMIZED
export default function QuizStep() {
  const params = useParams()
  const router = useRouter()
  const step = Number.parseInt(params.step as string)
  const [isLoaded, setIsLoaded] = useState(false)
  const [canProceed, setCanProceed] = useState(step === 4)
  const [sessionId] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.sessionStorage.getItem('quiz_session') || 'anonymous'
    }
    return 'anonymous'
  })

  const currentStep = quizData.steps[step - 1]
  const progress = (step / 4) * 100

  const handleCanProceed = useCallback((value) => {
    setCanProceed(value)
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 200) // MOBILE: mais rápido

    enviarEvento('visualizou_etapa_quiz', {
      numero_etapa: step,
      pergunta: currentStep?.question || `Etapa ${step}`,
      session_id: sessionId,
      timestamp: Date.now()
    });

    return () => clearTimeout(timer)
  }, [step, currentStep, sessionId])

  const handleNext = () => {
    enviarEvento('avancou_etapa', {
      numero_etapa: step,
      session_id: sessionId
    });

    const currentUrl = new URL(window.location.href);
    let utmString = '';

    const utmParams = new URLSearchParams();
    for (const [key, value] of currentUrl.searchParams.entries()) {
      if (key.startsWith('utm_')) {
        utmParams.append(key, value);
      }
    }

    if (utmParams.toString() !== '') {
      utmString = '?' + utmParams.toString();
    }

    if (step < 4) {
      router.push(`/quiz/${step + 1}${utmString}`)
    } else {
      enviarEvento('concluiu_quiz', {
        total_etapas_completadas: 4,
        session_id: sessionId
      });
      router.push(`/resultado${utmString}`)
    }
  }

  const handleBack = () => {
    const currentUrl = new URL(window.location.href);
    let utmString = '';

    const utmParams = new URLSearchParams();
    for (const [key, value] of currentUrl.searchParams.entries()) {
      if (key.startsWith('utm_')) {
        utmParams.append(key, value);
      }
    }

    if (utmParams.toString() !== '') {
      utmString = '?' + utmParams.toString();
    }

    if (step > 1) {
      router.push(`/quiz/${step - 1}${utmString}`)
    } else {
      router.push(`/${utmString}`)
    }
  }

  if (!currentStep) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="loading-spinner text-white text-xl">⚡ Carregando...</div>
      </div>
    )
  }

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black p-4 mobile-main">
        <div className="max-w-4xl mx-auto mobile-container">
          
          {/* Header com progresso - MOBILE OPTIMIZED */}
          <div className="mb-8 mobile-header">
            <div className="flex items-center justify-between mb-4 mobile-nav">
              <button
                onClick={handleBack}
                className="text-white hover:bg-white/20 border border-white/20 transition-all hover:scale-105 px-4 py-2 rounded-lg flex items-center gap-2 mobile-back-btn"
              >
                <ArrowLeft className="w-4 h-4" />
                Voltar
              </button>

              {step <= 3 && (
                <div 
                  className="flex items-center gap-2 text-white mobile-watch-indicator bg-white/10 px-3 py-1 rounded-full backdrop-blur-sm"
                  style={{ animation: 'pulse-soft 2s infinite' }}
                >
                  <Eye className="w-4 h-4" />
                  <span className="mobile-watch-text">Observar com atenção</span>
                </div>
              )}
            </div>

            <div className="bg-white/20 rounded-full p-1 mb-2 mobile-progress-container">
              <div
                className="h-3 bg-gradient-to-r from-red-500 to-orange-500 rounded-full transition-all duration-1000 ease-out mobile-progress-bar"
                style={{ width: `${progress}%` }}
              />
            </div>

            <div className="flex justify-between items-center mobile-progress-info">
              <p className="text-white mobile-progress-text">
                Etapa {step} de 4 • {Math.round(progress)}% concluído
              </p>
            </div>
          </div>

          {/* Card Principal - MOBILE OPTIMIZED */}
          <div 
            className="quiz-card mobile-card bg-gradient-to-br from-gray-900/95 to-black/95 backdrop-blur-lg border-red-500/30 shadow-2xl border-2 overflow-hidden rounded-xl"
            style={{
              opacity: isLoaded ? 1 : 0,
              transform: isLoaded ? 'translateY(0)' : 'translateY(20px)',
              transition: 'all 0.6s ease-out'
            }}
          >
            <div className="p-6 sm:p-8 mobile-card-content">
              
              <h2 
                className="mobile-question font-bold text-white mb-4 text-center leading-tight"
                style={step <= 3 ? { animation: 'glow-red 3s infinite' } : {}}
              >
                {currentStep.question}
              </h2>

              {currentStep.description && (
                <p className="text-gray-300 text-center mb-8 mobile-description">
                  {currentStep.description}
                </p>
              )}

              {currentStep.subtext && (
                <p 
                  className="text-orange-200 text-center mb-6 mobile-subtext font-medium italic"
                  style={{ animation: 'pulse-orange 2s infinite' }}
                >
                  {currentStep.subtext}
                </p>
              )}

              {/* Badge de simulação - MOBILE OPTIMIZED */}
              {currentStep.badge && (
                <div className="text-center mb-6 mobile-badge-container">
                  <span 
                    className="inline-block bg-gradient-to-r from-red-600 to-orange-600 text-white mobile-badge font-bold px-3 py-1 rounded-full uppercase tracking-wide"
                    style={{ animation: 'pulse-badge 3s infinite' }}
                  >
                    {currentStep.badge}
                  </span>
                </div>
              )}

              {/* Renderizar componentes específicos - MOBILE OPTIMIZED */}
              {step === 1 && <ChatGamingStep onCanProceed={handleCanProceed} />}
              {step === 2 && <ChatPrivateStep onCanProceed={handleCanProceed} />}
              {step === 3 && <ChatDirectStep onCanProceed={handleCanProceed} />}
              {step === 4 && <EducationalStep />}

              {/* CTA Button - MOBILE OPTIMIZED */}
              <div className="mt-8 text-center mobile-cta-container">
                <button
                  onClick={handleNext}
                  disabled={!canProceed}
                  className={`cta-button mobile-cta font-bold py-4 px-8 rounded-full shadow-lg w-full sm:w-auto relative overflow-hidden transition-all duration-300 ${
                    canProceed 
                      ? 'bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white hover:scale-105 cursor-pointer' 
                      : 'bg-gray-600 text-gray-400 cursor-not-allowed opacity-70'
                  }`}
                >
                  <span className="relative z-10 flex items-center justify-center gap-2 mobile-cta-content">
                    {step === 4 ? "VER SOLUÇÃO COMPLETA" : step === 2 ? "PRÓXIMA FASE (2/3)" : step === 3 ? "PRÓXIMA FASE (3/3)" : "PRÓXIMA ETAPA"}
                    <ArrowRight className="w-5 h-5" />
                  </span>
                </button>
                
                {!canProceed && step <= 3 && (
                  <p className="text-gray-400 mobile-wait-text mt-2">
                    ⏳ Aguarde a simulação terminar para continuar
                  </p>
                )}
              </div>

              {/* Aviso de conteúdo - MOBILE OPTIMIZED */}
              {step <= 3 && (
                <div className="mt-6 text-center mobile-warning-container">
                  <div 
                    className="text-amber-300 bg-amber-900/30 p-4 rounded-lg border border-amber-600 inline-block mobile-warning"
                    style={{ animation: 'pulse-warning 3s infinite' }}
                  >
                    <p className="font-medium mobile-warning-text">
                      ⚠️ <strong>AVISO:</strong> Conteúdo educacional sobre perigos reais na internet. Pode ser perturbador.
                    </p>
                  </div>
                </div>
              )}

            </div>
          </div>

          {/* Prova Social - MOBILE OPTIMIZED */}
          {step > 1 && (
            <div className="text-center space-y-3 mt-6 mobile-social-proof">
              <p 
                className="text-white mobile-social-text bg-white/10 px-4 py-2 rounded-full inline-block backdrop-blur-sm"
                style={{ animation: 'pulse-soft 4s infinite' }}
              >
                👥 3.247 pais já viram esta simulação
              </p>
              <p 
                className="text-green-400 mobile-social-text font-semibold bg-green-900/20 px-4 py-2 rounded-full inline-block backdrop-blur-sm"
                style={{ animation: 'glow-green-soft 3s infinite' }}
              >
                ✅ 91% descobriu comportamentos suspeitos no filho
              </p>
            </div>
          )}
        </div>
      </div>

      {/* CSS Animations + MOBILE OPTIMIZATIONS */}
      <style jsx global>{`
        /* === MOBILE-FIRST OPTIMIZATIONS === */
        @media (max-width: 767px) {
          
          /* Headers simplificados */
          .mobile-header .mobile-nav {
            align-items: center;
          }
          
          .mobile-back-btn {
            font-size: 14px;
            padding: 8px 12px;
          }
          
          .mobile-watch-indicator {
            font-size: 12px;
            padding: 6px 12px;
          }
          
          .mobile-watch-text {
            display: none;
          }
          
          /* Card principal */
          .mobile-card {
            margin: 0 8px;
          }
          
          .mobile-card-content {
            padding: 20px 16px;
          }
          
          /* Títulos e textos */
          .mobile-question {
            font-size: 20px;
            line-height: 1.3;
            margin-bottom: 16px;
          }
          
          .mobile-description {
            font-size: 16px;
            margin-bottom: 24px;
          }
          
          .mobile-subtext {
            font-size: 14px;
            margin-bottom: 20px;
          }
          
          .mobile-badge {
            font-size: 10px;
            padding: 6px 12px;
          }
          
          /* Chat components */
          .mobile-discord {
            margin: 0 -8px;
          }
          
          .mobile-header {
            padding: 12px 16px;
          }
          
          .mobile-title {
            font-size: 16px;
          }
          
          .mobile-online {
            font-size: 12px;
          }
          
          .mobile-danger {
            font-size: 10px;
            margin-top: 2px;
          }
          
          .mobile-chat-area {
            height: 300px;
            padding: 12px;
          }
          
          /* Mensagens */
          .mobile-message {
            padding: 12px;
            margin-bottom: 12px;
          }
          
          .mobile-avatar {
            width: 32px;
            height: 32px;
            font-size: 14px;
          }
          
          .mobile-username {
            font-size: 14px;
          }
          
          .mobile-time {
            font-size: 10px;
          }
          
          .mobile-status {
            font-size: 10px;
          }
          
          .mobile-text {
            font-size: 15px;
            line-height: 1.4;
          }
          
          .mobile-danger-icon {
            font-size: 12px;
          }
          
          /* Input */
          .mobile-input {
            padding: 12px 16px;
          }
          
          .mobile-input-text {
            font-size: 14px;
          }
          
          .mobile-input-icons span {
            font-size: 16px;
          }
          
          /* Alertas */
          .mobile-alerts {
            margin: 0 -8px;
          }
          
          .mobile-alert {
            font-size: 13px;
            padding: 10px 12px;
            margin-bottom: 8px;
          }
          
          /* Explicações */
          .mobile-explanation-text {
            font-size: 14px;
          }
          
          .mobile-progress-text {
            font-size: 12px;
          }
          
          .mobile-progress-bar {
            width: 200px;
          }
          
          /* CTA */
          .mobile-cta {
            font-size: 16px;
            padding: 16px 24px;
            width: 100%;
          }
          
          .mobile-wait-text {
            font-size: 11px;
          }
          
          /* Warning */
          .mobile-warning {
            padding: 12px 16px;
          }
          
          .mobile-warning-text {
            font-size: 12px;
          }
          
          /* Social proof */
          .mobile-social-text {
            font-size: 12px;
            padding: 8px 16px;
          }
          
          /* Educational components */
          .mobile-educational {
            padding: 0 8px;
          }
          
          .mobile-reveal {
            padding: 20px 16px;
          }
          
          .mobile-reveal-title {
            font-size: 18px;
            margin-bottom: 12px;
          }
          
          .mobile-reveal-text {
            font-size: 14px;
          }
          
          .mobile-section-title {
            font-size: 16px;
            margin-bottom: 16px;
          }
          
          .mobile-dangers-grid {
            grid-template-columns: 1fr;
            gap: 16px;
          }
          
          .mobile-danger-card {
            padding: 16px;
          }
          
          .mobile-danger-icon {
            font-size: 24px;
            margin-bottom: 8px;
          }
          
          .mobile-danger-title {
            font-size: 14px;
            margin-bottom: 8px;
          }
          
          .mobile-danger-description {
            font-size: 12px;
            margin-bottom: 12px;
          }
          
          .mobile-danger-detail {
            font-size: 11px;
          }
          
          /* Warnings */
          .mobile-warnings {
            padding: 20px 16px;
          }
          
          .mobile-warnings-title {
            font-size: 16px;
            margin-bottom: 16px;
          }
          
          .mobile-warnings-grid {
            grid-template-columns: 1fr;
            gap: 20px;
          }
          
          .mobile-warning-category-title {
            font-size: 12px;
          }
          
          .mobile-warning-sign {
            font-size: 12px;
          }
          
          /* Talk */
          .mobile-talk {
            padding: 20px 16px;
          }
          
          .mobile-talk-title {
            font-size: 16px;
            margin-bottom: 16px;
          }
          
          .mobile-talk-grid {
            grid-template-columns: 1fr;
            gap: 16px;
          }
          
          .mobile-talk-stage {
            padding: 16px;
          }
          
          .mobile-talk-stage-title {
            font-size: 14px;
            margin-bottom: 12px;
          }
          
          .mobile-talk-tip {
            font-size: 12px;
          }
          
          /* Emergency */
          .mobile-emergency {
            padding: 20px 16px;
          }
          
          .mobile-emergency-title {
            font-size: 16px;
            margin-bottom: 16px;
          }
          
          .mobile-emergency-grid {
            grid-template-columns: 1fr;
            gap: 16px;
          }
          
          .mobile-emergency-step {
            padding: 16px 12px;
          }
          
          .mobile-emergency-number {
            font-size: 12px;
            width: 20px;
            height: 20px;
          }
          
          .mobile-emergency-action {
            font-size: 12px;
            margin: 8px 0;
          }
          
          .mobile-emergency-description {
            font-size: 10px;
          }
          
          /* Testimonial */
          .mobile-testimonial {
            padding: 20px 16px;
          }
          
          .mobile-testimonial-title {
            font-size: 16px;
            margin-bottom: 12px;
          }
          
          .mobile-testimonial-quote {
            font-size: 14px;
            margin-bottom: 12px;
          }
          
          .mobile-testimonial-author {
            font-size: 12px;
          }
          
          .mobile-testimonial-stars {
            margin-top: 8px;
          }
          
          /* Typing indicator */
          .mobile-typing-text {
            font-size: 12px;
          }
          
          /* Progress info */
          .mobile-progress-text {
            font-size: 12px;
          }
          
          /* Danger pulse */
          .mobile-danger-pulse {
            width: 8px;
            height: 8px;
          }
        }

        /* === EXISTING ANIMATIONS === */
        @keyframes typing-bounce {
          0%, 60%, 100% { transform: translateY(0); }
          30% { transform: translateY(-10px); }
        }

        @keyframes pulse-danger {
          0%, 100% { opacity: 0.7; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.1); }
        }

        @keyframes slideInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-30px); }
          to { opacity: 1; transform: translateX(0); }
        }

        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes fadeInScale {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }

        @keyframes glow-red {
          0%, 100% { text-shadow: 0 0 0px rgba(239, 68, 68, 0); }
          50% { text-shadow: 0 0 20px rgba(239, 68, 68, 0.3); }
        }

        @keyframes glow-green {
          0%, 100% { text-shadow: 0 0 0px rgba(34, 197, 94, 0); }
          50% { text-shadow: 0 0 20px rgba(34, 197, 94, 0.3); }
        }

        @keyframes glow-green-soft {
          0%, 100% { box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.3); }
          50% { box-shadow: 0 0 0 10px rgba(34, 197, 94, 0); }
        }

        @keyframes pulse-orange {
          0%, 100% { opacity: 0.7; }
          50% { opacity: 1; }
        }

        @keyframes pulse-soft {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.02); }
        }

        @keyframes pulse-badge {
          0%, 100% { transform: scale(1); box-shadow: 0 2px 8px rgba(220, 38, 38, 0.4); }
          50% { transform: scale(1.05); box-shadow: 0 4px 16px rgba(220, 38, 38, 0.6); }
        }

        @keyframes pulse-warning {
          0%, 100% { border-color: rgba(245, 158, 11, 0.6); }
          50% { border-color: rgba(245, 158, 11, 0.9); }
        }

        @keyframes pulse-text {
          0%, 100% { color: #fca5a5; }
          50% { color: #ef4444; }
        }

        @keyframes progress-fill {
          from { width: 0%; }
          to { width: 100%; }
        }

        .loading-spinner {
          animation: spin 2s linear infinite;
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .discord-interface {
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
        }

        .message-item:hover {
          transform: translateX(4px);
        }

        .cta-button:hover::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
          animation: shimmer 0.6s;
        }

        .cta-button:disabled {
          transform: none !important;
        }

        .cta-button:disabled:hover {
          transform: none !important;
          scale: 1 !important;
        }

        @keyframes shimmer {
          0% { left: -100%; }
          100% { left: 100%; }
        }

        .quiz-card {
          backdrop-filter: blur(16px);
        }

        .alerts-section {
          backdrop-filter: blur(8px);
        }

        .typing-indicator {
          backdrop-filter: blur(4px);
        }
      `}</style>
    </>
  )
}