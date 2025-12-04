"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { useParams, useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import {
  ArrowRight,
  ArrowLeft,
  Eye,
  Plus,
  Shield,
  CheckCircle,
  AlertTriangle,
  Hash,
  Lock,
  Users,
  Bell,
  Settings,
  Pin,
  Search,
  Help,
  Gift,
  Smile,
  Mic,
  Headphones,
  PhoneCall
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

// Dados simplificados para evitar imports problemáticos
const quizSteps = [
  {
    id: 1,
    question: "🎮 VOCÊ ESTÁ PRESTES A VER O LADO ESCURO DA INTERNET",
    description: "ETAPA 1: Servidor Gaming - O Primeiro Contato",
    subtext: "Veja como predadores se aproximam de crianças em servidores de jogos online:",
    elements: { badge: "SIMULAÇÃO REALISTA" }
  },
  {
    id: 2,
    question: "⚠️ VEJA COMO A MANIPULAÇÃO ESCALA",
    description: "ETAPA 2: Chat Privado - A Armadilha",
    subtext: "Observe como o predador isola a criança e intensifica a manipulação:",
    elements: { badge: "SIMULAÇÃO REALISTA" }
  },
  {
    id: 3,
    question: "🚨 O PONTO DE NÃO RETORNO",
    description: "ETAPA 3: Chat Direto - A Ameaça",
    subtext: "Veja como a manipulação se torna chantagem e ameaça:",
    elements: { badge: "SIMULAÇÃO REALISTA" }
  },
  {
    id: 4,
    question: "📚 AGORA VOCÊ SABE - COMO PROTEGER SEU FILHO?",
    description: "ETAPA 4: Guia Educacional Completo",
    subtext: "Descubra os sinais de alerta, como conversar e medidas de proteção:",
    elements: { badge: "GUIA COMPLETO" }
  }
]

// Função segura para analytics
const enviarEvento = (nome_evento: string, propriedades: any = {}) => {
  try {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', nome_evento, propriedades);
    }
  } catch (error) {
    // Silently fail
  }
}

// Hook de digitação simplificado
const useSimpleTyping = () => {
  const [typingUsers, setTypingUsers] = useState<any[]>([])
  
  const startTyping = useCallback((user: any, message: string, onComplete: (text: string) => void) => {
    setTypingUsers(prev => [...prev, user])
    
    // Simular digitação simples
    setTimeout(() => {
      setTypingUsers(prev => prev.filter(u => u.id !== user.id))
      onComplete(message)
    }, 1500 + Math.random() * 2000)
  }, [])

  return { typingUsers, startTyping }
}

// Componente de digitação
const TypingIndicator = ({ users }: { users: any[] }) => {
  if (!users || users.length === 0) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="flex items-center gap-2 px-4 py-2 text-gray-400 text-sm"
    >
      <div className="flex gap-1">
        {[0, 1, 2].map(i => (
          <motion.div
            key={i}
            className="w-1.5 h-1.5 bg-gray-400 rounded-full"
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.5, 1, 0.5]
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              delay: i * 0.2
            }}
          />
        ))}
      </div>
      <span>{users[0]?.name} está digitando...</span>
    </motion.div>
  )
}

// Componente de mensagem
const DiscordMessage = ({ message }: { message: any }) => {
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

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`group relative p-3 rounded-lg transition-all duration-200 ${getMessageStyle()}`}
    >
      <div className="flex gap-3 items-start">
        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gray-600 flex items-center justify-center text-lg">
          {message.avatar}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-semibold text-white text-sm">{message.user}</span>
            <span className="text-xs text-gray-400">{message.time}</span>
          </div>
          <div className={`text-sm leading-relaxed ${
            message.type === 'alert' ? 'text-red-300 font-semibold' : 
            message.type === 'bullying' ? 'text-orange-300' : 'text-gray-200'
          }`}>
            {message.text}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

// Componente Chat Gaming
const ChatGamingStep = () => {
  const [displayedMessages, setDisplayedMessages] = useState<any[]>([])
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0)
  const { typingUsers, startTyping } = useSimpleTyping()
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const messages = [
    { id: 1, user: "D4rkWolf13", text: "alguém quer fazer squad?", time: "14:32", type: "normal", avatar: "🎮" },
    { id: 2, user: "SweetAngel", text: "eu topo! vcs jogam desde quando?", time: "14:33", type: "normal", avatar: "👧" },
    { id: 3, user: "ProKillerX", text: "vcs são mt ruim kkkkkk", time: "14:34", type: "bullying", avatar: "😈" },
    { id: 4, user: "YumiKitty", text: "oi pessoal, sou nova aqui", time: "14:35", type: "normal", avatar: "✨" },
    { id: 5, user: "M4st3rHelp", text: "oi YumiKitty! bem vinda! vem no privado q eu te ensino uns macetes top", time: "14:36", type: "alert", avatar: "⚠️" }
  ]

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
          }
        )
      }, 1000)

      return () => clearTimeout(timer)
    }
  }, [currentMessageIndex, startTyping])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [displayedMessages, typingUsers])

  return (
    <div className="space-y-4">
      <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl border border-gray-700 shadow-2xl overflow-hidden">
        
        {/* Header do servidor */}
        <div className="bg-gray-700 px-4 py-3 border-b border-gray-600">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">F</div>
              <div>
                <h3 className="text-white font-semibold text-sm">FortFriends Brasil</h3>
                <p className="text-gray-400 text-xs">1247 membros</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-gray-400">
              <Bell size={16} />
              <Settings size={16} />
            </div>
          </div>
        </div>

        {/* Header do canal */}
        <div className="bg-gray-750 px-4 py-2 border-b border-gray-600 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Hash size={16} className="text-gray-400" />
            <span className="text-white font-semibold text-sm">geral-iniciantes</span>
          </div>
          <div className="flex items-center gap-3 text-gray-400">
            <Pin size={16} />
            <Users size={16} />
            <Search size={16} />
            <Help size={16} />
          </div>
        </div>

        {/* Área de mensagens */}
        <div className="h-80 overflow-y-auto bg-gray-800 p-4 space-y-2">
          {displayedMessages.map((msg) => (
            <DiscordMessage key={msg.id} message={msg} />
          ))}
          <TypingIndicator users={typingUsers} />
          <div ref={messagesEndRef} />
        </div>

        {/* Input de mensagem */}
        <div className="bg-gray-700 p-4 border-t border-gray-600">
          <div className="bg-gray-600 rounded-lg flex items-center gap-2 px-3 py-2">
            <Plus size={18} className="text-gray-400" />
            <input 
              type="text" 
              placeholder="Mensagem #geral-iniciantes"
              className="flex-1 bg-transparent text-white placeholder-gray-400 outline-none text-sm"
              disabled
            />
            <div className="flex items-center gap-2 text-gray-400">
              <Gift size={18} />
              <Smile size={18} />
            </div>
          </div>
        </div>
      </div>

      {/* Alertas */}
      {displayedMessages.length >= 5 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-2"
        >
          <div className="bg-red-900/30 border-l-4 border-red-500 pl-4 py-3 text-red-300 text-sm font-semibold rounded-r-lg">
            🚨 PREDADOR identificando criança nova
          </div>
          <div className="bg-red-900/30 border-l-4 border-red-500 pl-4 py-3 text-red-300 text-sm font-semibold rounded-r-lg">
            🚨 TENTATIVA DE ISOLAMENTO (convite para privado)
          </div>
        </motion.div>
      )}

      {displayedMessages.length >= 5 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1 }}
          className="bg-blue-900/30 border border-blue-500 rounded-lg p-4 text-center"
        >
          <p className="text-blue-200 text-sm font-semibold">
            ✅ <strong>Você viu:</strong> Como predadores se aproximam de crianças em servidores públicos. 
            Parecem amigos, ganham confiança e depois isolam a vítima.
          </p>
        </motion.div>
      )}
    </div>
  )
}

// Componente Chat Privado (similar pattern)
const ChatPrivateStep = () => {
  const [displayedMessages, setDisplayedMessages] = useState<any[]>([])
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0)
  const { typingUsers, startTyping } = useSimpleTyping()

  const messages = [
    { id: 1, user: "M4st3rHelp", text: "e aí, conseguiu fazer aquelas missões?", time: "15:01", type: "normal", avatar: "⚠️" },
    { id: 2, user: "XxCuteLoverxX", text: "qnts anos vc tem?", time: "15:02", type: "alert", avatar: "💕" },
    { id: 3, user: "YumiKitty", text: "11 pq?", time: "15:03", type: "normal", avatar: "✨" },
    { id: 4, user: "M4st3rHelp", text: "manda uma foto sua pra gnt te conhecer melhor", time: "15:04", type: "alert", avatar: "⚠️" }
  ]

  useEffect(() => {
    if (currentMessageIndex < messages.length) {
      const timer = setTimeout(() => {
        startTyping(
          { id: messages[currentMessageIndex].user, name: messages[currentMessageIndex].user },
          messages[currentMessageIndex].text,
          () => {
            setDisplayedMessages(prev => [...prev, messages[currentMessageIndex]])
            setCurrentMessageIndex(prev => prev + 1)
          }
        )
      }, 1000)
      return () => clearTimeout(timer)
    }
  }, [currentMessageIndex, startTyping])

  return (
    <div className="space-y-4">
      <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl border border-gray-700 shadow-2xl overflow-hidden">
        <div className="bg-purple-700 text-white px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Lock size={18} />
            <span className="font-bold">🔒 amigos-especiais</span>
          </div>
          <div className="flex items-center gap-2">
            <PhoneCall size={16} />
            <Mic size={16} />
            <Settings size={16} />
          </div>
        </div>
        
        <div className="h-80 overflow-y-auto bg-gray-800 p-4 space-y-2">
          {displayedMessages.map((msg) => (
            <DiscordMessage key={msg.id} message={msg} />
          ))}
          <TypingIndicator users={typingUsers} />
        </div>
        
        <div className="bg-gray-700 p-4 border-t border-gray-600">
          <div className="bg-gray-600 rounded-lg flex items-center gap-2 px-3 py-2">
            <input 
              type="text" 
              placeholder="Mensagem amigos-especiais"
              className="flex-1 bg-transparent text-white placeholder-gray-400 outline-none text-sm"
              disabled
            />
          </div>
        </div>
      </div>

      {displayedMessages.length >= 2 && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-2">
          <div className="bg-red-900/40 border-l-4 border-red-500 pl-4 py-3 text-red-300 text-sm font-semibold rounded-r-lg">
            🚨 SOLICITAÇÃO DE IDADE (para menores)
          </div>
          <div className="bg-red-900/40 border-l-4 border-red-500 pl-4 py-3 text-red-300 text-sm font-semibold rounded-r-lg">
            🚨 PEDIDO DE FOTOS (exploração sexual)
          </div>
        </motion.div>
      )}
    </div>
  )
}

// Componente Chat Direto (similar pattern)
const ChatDirectStep = () => {
  const [displayedMessages, setDisplayedMessages] = useState<any[]>([])
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0)
  const { typingUsers, startTyping } = useSimpleTyping()

  const messages = [
    { id: 1, user: "M4st3rHelp", text: "ei, vc tá online", time: "20:15", type: "normal", avatar: "⚠️" },
    { id: 2, user: "M4st3rHelp", text: "não conta pra ninguém q a gnt se fala ok?", time: "20:16", type: "alert", avatar: "⚠️" },
    { id: 3, user: "YumiKitty", text: "por quê?", time: "20:17", type: "normal", avatar: "✨" },
    { id: 4, user: "M4st3rHelp", text: "descobri quem vc é: Mariana Costa, aluna da escola santos dumont", time: "20:20", type: "alert", avatar: "⚠️" }
  ]

  useEffect(() => {
    if (currentMessageIndex < messages.length) {
      const timer = setTimeout(() => {
        startTyping(
          { id: messages[currentMessageIndex].user, name: messages[currentMessageIndex].user },
          messages[currentMessageIndex].text,
          () => {
            setDisplayedMessages(prev => [...prev, messages[currentMessageIndex]])
            setCurrentMessageIndex(prev => prev + 1)
          }
        )
      }, 1000)
      return () => clearTimeout(timer)
    }
  }, [currentMessageIndex, startTyping])

  return (
    <div className="space-y-4">
      <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl border border-red-700 shadow-2xl overflow-hidden">
        <div className="bg-red-700 text-white px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">⚠️</div>
            <div>
              <span className="font-bold">M4st3rHelp</span>
              <div className="text-red-200 text-xs">Online agora</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <PhoneCall size={16} />
            <AlertTriangle size={16} />
          </div>
        </div>
        
        <div className="h-80 overflow-y-auto bg-gray-800 p-4 space-y-2">
          {displayedMessages.map((msg) => (
            <DiscordMessage key={msg.id} message={msg} />
          ))}
          <TypingIndicator users={typingUsers} />
        </div>
        
        <div className="bg-gray-700 p-4 border-t border-gray-600">
          <div className="bg-red-900/30 border border-red-500 rounded-lg flex items-center gap-2 px-3 py-2">
            <AlertTriangle size={18} className="text-red-400" />
            <input 
              type="text" 
              placeholder="⚠️ SITUAÇÃO PERIGOSA - NÃO RESPONDA"
              className="flex-1 bg-transparent text-red-300 placeholder-red-400 outline-none text-sm"
              disabled
            />
          </div>
        </div>
      </div>

      {displayedMessages.length >= 2 && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-2">
          <div className="bg-red-900/50 border-l-4 border-red-600 pl-4 py-3 text-red-300 text-sm font-bold rounded-r-lg">
            🚨 DOXXING (exposição de dados reais)
          </div>
          <div className="bg-red-900/50 border-l-4 border-red-600 pl-4 py-3 text-red-300 text-sm font-bold rounded-r-lg">
            🚨 EXTORSÃO (ameaça de divulgar)
          </div>
        </motion.div>
      )}
    </div>
  )
}

// Componente Educacional
const EducationalStep = () => {
  const [visibleSections, setVisibleSections] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setVisibleSections(prev => prev + 1)
    }, 800)
    return () => clearInterval(timer)
  }, [])

  const dangers = [
    {
      id: 1,
      icon: "🎭",
      title: "ALICIAMENTO GRADUAL",
      description: "Começa com amizade, escala para isolamento e exploração"
    },
    {
      id: 2,
      icon: "📸", 
      title: "EXPLORAÇÃO SEXUAL",
      description: "Pedidos de fotos/vídeos que viram armas de chantagem"
    },
    {
      id: 3,
      icon: "💰",
      title: "EXTORSÃO E ROUBO", 
      description: "Roubo de credenciais, dados pessoais e contas"
    },
    {
      id: 4,
      icon: "🔪",
      title: "AMEAÇA FÍSICA",
      description: "Doxxing e ameaças de violência contra criança ou família"
    }
  ]

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-gradient-to-r from-green-900/40 to-emerald-900/40 border-2 border-green-500 rounded-xl p-6 text-center"
      >
        <h3 className="text-green-400 font-bold text-xl mb-3">
          📚 VOCÊ ACABOU DE VER OS 3 ESTÁGIOS DO ALICIAMENTO ONLINE
        </h3>
        <p className="text-green-200 font-semibold text-lg">
          Os 3 estágios que você acabou de ver são REAIS e estão acontecendo AGORA com crianças no Brasil.
        </p>
      </motion.div>

      {visibleSections >= 1 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <h4 className="text-white font-bold text-lg mb-4 text-center">
            🎯 PERIGOS QUE VOCÊ IDENTIFICOU
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {dangers.map((danger, idx) => (
              <motion.div
                key={danger.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.2 }}
                className="bg-gray-800 border-l-4 border-red-500 rounded-lg p-4"
              >
                <div className="text-3xl mb-3">{danger.icon}</div>
                <h5 className="font-bold text-white mb-2">{danger.title}</h5>
                <p className="text-gray-300 text-sm">{danger.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  )
}

// Componente Principal
export default function QuizStep() {
  const params = useParams()
  const router = useRouter()
  const step = Number.parseInt(params.step as string)
  const [isLoaded, setIsLoaded] = useState(false)
  const [sessionId] = useState('anonymous')

  const currentStep = quizSteps[step - 1]
  const progress = (step / 4) * 100

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 300)

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

    if (step < 4) {
      router.push(`/quiz/${step + 1}`)
    } else {
      router.push(`/resultado`)
    }
  }

  const handleBack = () => {
    if (step > 1) {
      router.push(`/quiz/${step - 1}`)
    } else {
      router.push(`/`)
    }
  }

  if (!currentStep) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-xl">⚡ Carregando...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black p-4">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <Button
              variant="ghost"
              onClick={handleBack}
              className="text-white hover:bg-white/20 border border-white/20"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar
            </Button>

            {step <= 3 && (
              <div className="flex items-center gap-2 text-white text-sm bg-white/10 px-3 py-1 rounded-full">
                <Eye className="w-4 h-4" />
                <span>Observar com atenção</span>
              </div>
            )}
          </div>

          <div className="bg-white/20 rounded-full p-1 mb-2">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="h-3 bg-gradient-to-r from-red-500 to-orange-500 rounded-full"
            />
          </div>

          <p className="text-white text-sm">
            Etapa {step} de 4 • {Math.round(progress)}% concluído
          </p>
        </div>

        {/* Card Principal */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
          transition={{ duration: 0.6 }}
        >
          <Card className="bg-gradient-to-br from-gray-900/95 to-black/95 border-red-500/30 shadow-2xl border-2">
            <CardContent className="p-6 sm:p-8">
              
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4 text-center leading-tight">
                {currentStep.question}
              </h2>

              {currentStep.description && (
                <p className="text-gray-300 text-center mb-8 text-base sm:text-lg">
                  {currentStep.description}
                </p>
              )}

              {currentStep.subtext && (
                <p className="text-orange-200 text-center mb-6 text-sm font-medium italic">
                  {currentStep.subtext}
                </p>
              )}

              {currentStep.elements?.badge && (
                <div className="text-center mb-6">
                  <span className="inline-block bg-gradient-to-r from-red-600 to-orange-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                    {currentStep.elements.badge}
                  </span>
                </div>
              )}

              {/* Renderizar componentes específicos */}
              {step === 1 && <ChatGamingStep />}
              {step === 2 && <ChatPrivateStep />}
              {step === 3 && <ChatDirectStep />}
              {step === 4 && <EducationalStep />}

              {/* CTA Button */}
              <div className="mt-8 text-center">
                <Button
                  onClick={handleNext}
                  size="lg"
                  className="bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white font-bold py-4 px-8 rounded-full shadow-lg w-full sm:w-auto text-base"
                >
                  <span className="flex items-center gap-2">
                    {step === 4 ? "VER SOLUÇÃO COMPLETA" : "PRÓXIMA ETAPA"}
                    <ArrowRight className="w-5 h-5" />
                  </span>
                </Button>
              </div>

              {/* Aviso */}
              {step <= 3 && (
                <div className="mt-6 text-center">
                  <div className="text-amber-300 bg-amber-900/30 p-4 rounded-lg border border-amber-600 inline-block">
                    <p className="font-medium text-sm">
                      ⚠️ <strong>AVISO:</strong> Conteúdo educacional sobre perigos reais na internet. Pode ser perturbador.
                    </p>
                  </div>
                </div>
              )}

            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}