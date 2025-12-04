"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { useParams, useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import {
  ArrowRight,
  ArrowLeft,
  Clock,
  AlertTriangle,
  User,
  CheckCircle,
  Shield,
  Eye,
  MessageCircle,
  Lock,
  Users,
  Hash,
  Settings,
  Bell,
  Pin,
  Search,
  Help,
  Plus,
  Smile,
  Gift,
  Mic,
  Headphones,
  PhoneCall
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { 
  quizSteps, 
  chatGamingData, 
  chatPrivateData, 
  chatDirectData,
  educationalData,
  generateDynamicMessage,
  characterProfiles,
  calculateRealisticTiming,
  getRandomizedContent,
  trackUserBehavior
} from "@/lib/quiz-data"

// === HOOK DE ÁUDIO REALISTA - NÍVEL 3 ===
const useDiscordAudio = () => {
  const playNotification = useCallback(() => {
    try {
      const audio = new Audio('/sounds/discord-notification.mp3')
      audio.volume = 0.3
      audio.play().catch(() => {}) // Silently fail if audio blocked
    } catch (e) {}
  }, [])

  const playTyping = useCallback(() => {
    try {
      const audio = new Audio('/sounds/typing.mp3')
      audio.volume = 0.1
      audio.play().catch(() => {})
    } catch (e) {}
  }, [])

  const playAlert = useCallback(() => {
    try {
      const audio = new Audio('/sounds/alert.mp3')
      audio.volume = 0.4
      audio.play().catch(() => {})
    } catch (e) {}
  }, [])

  return { playNotification, playTyping, playAlert }
}

// === HOOK DE DIGITAÇÃO REALISTA - NÍVEL 3 ===
const useRealisticTyping = () => {
  const [typingUsers, setTypingUsers] = useState([])
  const [displayedText, setDisplayedText] = useState("")
  const { playTyping } = useDiscordAudio()

  const startTyping = useCallback((user, message, onComplete) => {
    // Adicionar usuário aos que estão digitando
    setTypingUsers(prev => [...prev.filter(u => u.id !== user.id), user])
    
    const character = characterProfiles[user.character] || characterProfiles.predator
    const timing = calculateRealisticTiming(user.character, message.length, character.profile.emotionalState)
    
    // Som de digitação
    playTyping()
    
    let index = 0
    let currentText = ""
    const typingSpeed = character.profile.typingSpeed || 45
    const errorProbability = character.behaviors.spellingErrors || 0.05
    
    const typeCharacter = () => {
      if (index < message.length) {
        // Pausa ocasional (pessoa pensando)
        if (Math.random() < 0.15) {
          setTimeout(typeCharacter, 300 + Math.random() * 800)
          return
        }
        
        // Erro de digitação ocasional
        if (Math.random() < errorProbability && index > 2) {
          const wrongChar = 'abcdefghijklmnopqrstuvwxyz'[Math.floor(Math.random() * 26)]
          currentText += wrongChar
          setDisplayedText(currentText)
          
          // Corrigir erro após delay
          setTimeout(() => {
            currentText = currentText.slice(0, -1)
            setDisplayedText(currentText)
            setTimeout(typeCharacter, 150)
          }, 200)
          return
        }
        
        currentText += message[index]
        setDisplayedText(currentText)
        index++
        
        // Velocidade variável baseada no caractere
        let charDelay = 60000 / (typingSpeed * 5) // Base delay
        if (message[index - 1] === ' ') charDelay *= 1.5 // Pausa em espaços
        if (',.!?'.includes(message[index - 1])) charDelay *= 2 // Pausa em pontuação
        
        setTimeout(typeCharacter, charDelay + Math.random() * 50)
      } else {
        // Finalizar digitação
        setTypingUsers(prev => prev.filter(u => u.id !== user.id))
        setTimeout(() => onComplete(currentText), 300)
      }
    }
    
    // Delay inicial antes de começar a digitar
    setTimeout(typeCharacter, timing.delay)
  }, [playTyping])

  return { typingUsers, startTyping, displayedText }
}

// === COMPONENTE: INDICADOR DE DIGITAÇÃO - NÍVEL 3 ===
const TypingIndicator = ({ users }) => {
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
      <span>
        {users[0].name} está digitando...
      </span>
    </motion.div>
  )
}

// === COMPONENTE: MENSAGEM DISCORD REALISTA - NÍVEL 3 ===
const DiscordMessage = ({ message, isNew = false }) => {
  const { playNotification } = useDiscordAudio()
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    if (isNew && message.type === 'alert') {
      playNotification()
    }
  }, [isNew, message.type, playNotification])

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
    if (message.dangerLevel === 'extreme') return '🔴'
    if (message.dangerLevel === 'critical') return '🟠'
    if (message.dangerLevel === 'high') return '🟡'
    return null
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ 
        type: "spring", 
        stiffness: 500, 
        damping: 30,
        duration: 0.4 
      }}
      className={`
        group relative p-3 rounded-lg transition-all duration-200 cursor-pointer
        ${getMessageStyle()}
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ x: 4 }}
    >
      {/* Pulse de notificação para mensagens críticas */}
      {message.type === 'alert' && (
        <motion.div
          className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"
          animate={{ 
            scale: [1, 1.3, 1],
            opacity: [0.7, 1, 0.7]
          }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      )}

      <div className="flex gap-3 items-start">
        {/* Avatar */}
        <motion.div 
          className="flex-shrink-0 w-10 h-10 rounded-full bg-gray-600 flex items-center justify-center text-lg"
          whileHover={{ scale: 1.1 }}
        >
          {message.avatar}
        </motion.div>

        {/* Conteúdo da mensagem */}
        <div className="flex-1 min-w-0">
          {/* Header com nome e timestamp */}
          <div className="flex items-center gap-2 mb-1">
            <span className="font-semibold text-white text-sm">
              {message.user}
            </span>
            
            {/* Badge de perigo */}
            {getDangerIcon() && (
              <span className="text-xs">{getDangerIcon()}</span>
            )}
            
            <span className="text-xs text-gray-400">
              {message.time}
            </span>

            {/* Indicador de lida */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2 }}
              className="text-xs text-gray-500"
            >
              ✓✓
            </motion.div>
          </div>

          {/* Texto da mensagem */}
          <div className={`
            text-sm leading-relaxed
            ${message.type === 'alert' ? 'text-red-300 font-semibold' : 
              message.type === 'bullying' ? 'text-orange-300' : 'text-gray-200'}
          `}>
            {message.text || (message.textGenerator && message.textGenerator())}
          </div>

          {/* Táticas de manipulação (tooltip) */}
          {isHovered && message.manipulationTactics && (
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute z-10 bg-gray-900 border border-red-500 rounded-lg p-2 mt-2 text-xs text-red-300"
              style={{ minWidth: '200px' }}
            >
              <div className="font-bold mb-1">🚨 TÁTICAS IDENTIFICADAS:</div>
              {message.manipulationTactics.map((tactic, idx) => (
                <div key={idx}>• {tactic.replace('_', ' ').toUpperCase()}</div>
              ))}
            </motion.div>
          )}
        </div>

        {/* Botões de ação (aparecem no hover) */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              className="flex gap-1"
            >
              <Button size="sm" variant="ghost" className="h-6 w-6 p-0 text-gray-400 hover:text-white">
                <Plus size={12} />
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

// === COMPONENTE: CHAT GAMING NÍVEL 3 ===
const ChatGamingStep = () => {
  const [displayedMessages, setDisplayedMessages] = useState([])
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0)
  const { typingUsers, startTyping } = useRealisticTyping()
  const { playAlert } = useDiscordAudio()
  const messagesEndRef = useRef(null)

  // Gerar mensagens dinâmicas
  const [dynamicMessages] = useState(() => {
    return chatGamingData.messages.map(msg => ({
      ...msg,
      text: msg.textGenerator ? msg.textGenerator() : msg.text,
      id: Math.random().toString(36).substr(2, 9)
    }))
  })

  useEffect(() => {
    if (currentMessageIndex < dynamicMessages.length) {
      const currentMessage = dynamicMessages[currentMessageIndex]
      const timing = calculateRealisticTiming(
        currentMessage.character, 
        currentMessage.text?.length || 50,
        characterProfiles[currentMessage.character]?.profile?.emotionalState || 'normal'
      )

      const timer = setTimeout(() => {
        startTyping(
          {
            id: currentMessage.user,
            name: currentMessage.user,
            character: currentMessage.character
          },
          currentMessage.text,
          (finalText) => {
            setDisplayedMessages(prev => [...prev, {
              ...currentMessage,
              text: finalText
            }])
            setCurrentMessageIndex(prev => prev + 1)
            
            // Tocar alerta para mensagens perigosas
            if (currentMessage.type === 'alert') {
              playAlert()
            }
          }
        )
      }, timing.delay)

      return () => clearTimeout(timer)
    }
  }, [currentMessageIndex, dynamicMessages, startTyping, playAlert])

  // Auto-scroll para a última mensagem
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [displayedMessages, typingUsers])

  return (
    <div className="space-y-4">
      {/* Interface Discord Realista */}
      <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl border border-gray-700 shadow-2xl overflow-hidden">
        
        {/* Header do servidor */}
        <div className="bg-gray-700 px-4 py-3 border-b border-gray-600">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">
                F
              </div>
              <div>
                <h3 className="text-white font-semibold text-sm">FortFriends Brasil</h3>
                <p className="text-gray-400 text-xs">{chatGamingData.channelInfo.memberCount} membros</p>
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
            <span className="text-white font-semibold text-sm">{chatGamingData.channelInfo.name}</span>
            <div className="h-4 w-px bg-gray-600 mx-2" />
            <span className="text-gray-400 text-xs">{chatGamingData.channelInfo.topic}</span>
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
            <DiscordMessage key={msg.id} message={msg} isNew={true} />
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
              placeholder={`Mensagem #${chatGamingData.channelInfo.name}`}
              className="flex-1 bg-transparent text-white placeholder-gray-400 outline-none text-sm"
              disabled
            />
            <div className="flex items-center gap-2 text-gray-400">
              <Gift size={18} />
              <Smile size={18} />
            </div>
          </div>
        </div>

        {/* Sidebar de usuários */}
        <div className="bg-gray-750 p-3 border-t border-gray-600">
          <div className="text-gray-400 text-xs font-semibold mb-2 uppercase tracking-wide">
            Online — {chatGamingData.channelInfo.onlineCount}
          </div>
          <div className="space-y-1">
            {dynamicMessages.slice(0, displayedMessages.length + 1).map((msg, idx) => (
              <div key={idx} className="flex items-center gap-2 text-sm text-gray-300 hover:bg-gray-600 rounded px-2 py-1">
                <div className="w-2 h-2 bg-green-500 rounded-full" />
                <span className="text-xs">{msg.avatar}</span>
                <span>{msg.user}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Alertas educativos */}
      <AnimatePresence>
        {displayedMessages.length >= 5 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-2"
          >
            {chatGamingData.alerts.map((alert, idx) => (
              <motion.div
                key={alert.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.3 }}
                className="bg-red-900/30 border-l-4 border-red-500 pl-4 py-3 text-red-300 text-sm font-semibold rounded-r-lg"
              >
                {alert.text}
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Explicação educativa */}
      {displayedMessages.length >= dynamicMessages.length && (
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

// === COMPONENTE: CHAT PRIVADO NÍVEL 3 ===
const ChatPrivateStep = () => {
  const [displayedMessages, setDisplayedMessages] = useState([])
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0)
  const { typingUsers, startTyping } = useRealisticTyping()
  const { playAlert } = useDiscordAudio()
  const messagesEndRef = useRef(null)

  // Gerar mensagens dinâmicas
  const [dynamicMessages] = useState(() => {
    return chatPrivateData.messages.map(msg => ({
      ...msg,
      text: msg.textGenerator ? msg.textGenerator() : msg.text,
      id: Math.random().toString(36).substr(2, 9)
    }))
  })

  useEffect(() => {
    if (currentMessageIndex < dynamicMessages.length) {
      const currentMessage = dynamicMessages[currentMessageIndex]
      const timing = calculateRealisticTiming(
        currentMessage.character, 
        currentMessage.text?.length || 50,
        characterProfiles[currentMessage.character]?.profile?.emotionalState || 'normal'
      )

      const timer = setTimeout(() => {
        startTyping(
          {
            id: currentMessage.user,
            name: currentMessage.user,
            character: currentMessage.character
          },
          currentMessage.text,
          (finalText) => {
            setDisplayedMessages(prev => [...prev, {
              ...currentMessage,
              text: finalText
            }])
            setCurrentMessageIndex(prev => prev + 1)
            
            if (currentMessage.type === 'alert') {
              playAlert()
            }
          }
        )
      }, timing.delay)

      return () => clearTimeout(timer)
    }
  }, [currentMessageIndex, dynamicMessages, startTyping, playAlert])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [displayedMessages, typingUsers])

  return (
    <div className="space-y-4">
      {/* Interface Discord Privada */}
      <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl border border-gray-700 shadow-2xl overflow-hidden">
        
        {/* Header do canal privado */}
        <div className="bg-purple-700 text-white px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Lock size={18} />
            <span className="font-bold">🔒 {chatPrivateData.channelInfo.name}</span>
            <span className="text-purple-200 text-sm">
              • {chatPrivateData.channelInfo.memberCount} membros
            </span>
          </div>
          
          <div className="flex items-center gap-2">
            <PhoneCall size={16} />
            <Mic size={16} />
            <Headphones size={16} />
            <Settings size={16} />
          </div>
        </div>

        {/* Área de mensagens */}
        <div className="h-80 overflow-y-auto bg-gray-800 p-4 space-y-2">
          {displayedMessages.map((msg) => (
            <DiscordMessage key={msg.id} message={msg} isNew={true} />
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
              placeholder={`Mensagem ${chatPrivateData.channelInfo.name}`}
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

      {/* Alertas críticos */}
      <AnimatePresence>
        {displayedMessages.length >= 2 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-2"
          >
            {chatPrivateData.alerts.slice(0, displayedMessages.length - 1).map((alert, idx) => (
              <motion.div
                key={alert.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.2 }}
                className={`
                  border-l-4 pl-4 py-3 text-sm font-semibold rounded-r-lg
                  ${alert.severity === 'critical' ? 
                    'bg-red-900/40 border-red-500 text-red-300' : 
                    'bg-orange-900/30 border-orange-500 text-orange-300'}
                `}
              >
                {alert.text}
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Explicação educativa */}
      {displayedMessages.length >= dynamicMessages.length && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1 }}
          className="bg-orange-900/30 border border-orange-500 rounded-lg p-4 text-center"
        >
          <p className="text-orange-200 text-sm font-semibold">
            ⚠️ <strong>A manipulação escala:</strong> Isolamento, exploração sexual, roubo de dados. 
            A vítima não consegue sair porque já foi comprometida.
          </p>
        </motion.div>
      )}
    </div>
  )
}

// === COMPONENTE: CHAT DIRETO NÍVEL 3 ===
const ChatDirectStep = () => {
  const [displayedMessages, setDisplayedMessages] = useState([])
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0)
  const { typingUsers, startTyping } = useRealisticTyping()
  const { playAlert } = useDiscordAudio()
  const messagesEndRef = useRef(null)

  // Gerar mensagens dinâmicas
  const [dynamicMessages] = useState(() => {
    return chatDirectData.messages.map(msg => ({
      ...msg,
      text: msg.textGenerator ? msg.textGenerator() : msg.text,
      id: Math.random().toString(36).substr(2, 9)
    }))
  })

  useEffect(() => {
    if (currentMessageIndex < dynamicMessages.length) {
      const currentMessage = dynamicMessages[currentMessageIndex]
      const timing = calculateRealisticTiming(
        currentMessage.character, 
        currentMessage.text?.length || 50,
        characterProfiles[currentMessage.character]?.profile?.emotionalState || 'normal'
      )

      const timer = setTimeout(() => {
        startTyping(
          {
            id: currentMessage.user,
            name: currentMessage.user,
            character: currentMessage.character
          },
          currentMessage.text,
          (finalText) => {
            setDisplayedMessages(prev => [...prev, {
              ...currentMessage,
              text: finalText
            }])
            setCurrentMessageIndex(prev => prev + 1)
            
            if (currentMessage.type === 'alert') {
              playAlert()
            }
          }
        )
      }, timing.delay)

      return () => clearTimeout(timer)
    }
  }, [currentMessageIndex, dynamicMessages, startTyping, playAlert])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [displayedMessages, typingUsers])

  return (
    <div className="space-y-4">
      {/* Interface Discord Mensagem Direta */}
      <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl border border-red-700 shadow-2xl overflow-hidden">
        
        {/* Header da conversa direta */}
        <div className="bg-red-700 text-white px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
              ⚠️
            </div>
            <div>
              <span className="font-bold">{chatDirectData.userName}</span>
              <div className="text-red-200 text-xs">Online agora</div>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <PhoneCall size={16} />
            <AlertTriangle size={16} />
          </div>
        </div>

        {/* Área de mensagens */}
        <div className="h-80 overflow-y-auto bg-gray-800 p-4 space-y-2">
          {displayedMessages.map((msg) => (
            <DiscordMessage key={msg.id} message={msg} isNew={true} />
          ))}
          
          <TypingIndicator users={typingUsers} />
          <div ref={messagesEndRef} />
        </div>

        {/* Input de mensagem (desabilitado) */}
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

      {/* Alertas extremos */}
      <AnimatePresence>
        {displayedMessages.length >= 2 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-2"
          >
            {chatDirectData.alerts.slice(0, displayedMessages.length - 1).map((alert, idx) => (
              <motion.div
                key={alert.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.2 }}
                className={`
                  border-l-4 pl-4 py-3 text-sm font-bold rounded-r-lg
                  ${alert.severity === 'extreme' ? 
                    'bg-red-900/50 border-red-600 text-red-300' : 
                    'bg-red-900/30 border-red-500 text-red-300'}
                `}
              >
                <motion.div
                  animate={{ 
                    textShadow: [
                      '0 0 0px rgba(239, 68, 68, 0)',
                      '0 0 10px rgba(239, 68, 68, 0.5)',
                      '0 0 0px rgba(239, 68, 68, 0)'
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  {alert.text}
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Explicação crítica */}
      {displayedMessages.length >= dynamicMessages.length && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1 }}
          className="bg-red-900/40 border border-red-600 rounded-lg p-4 text-center"
        >
          <motion.p
            animate={{ 
              color: ['#fca5a5', '#ef4444', '#fca5a5']
            }}
            transition={{ duration: 3, repeat: Infinity }}
            className="text-sm font-bold"
          >
            🚨 <strong>PONTO DE NÃO RETORNO:</strong> Ameaças, chantagem e extorsão. 
            A criança não consegue sair sem sofrer consequências.
          </motion.p>
        </motion.div>
      )}
    </div>
  )
}

// === COMPONENTE: EDUCACIONAL EXPANDIDO - NÍVEL 3 ===
const EducationalStep = () => {
  const [visibleSections, setVisibleSections] = useState(0)
  const [randomTestimonial] = useState(() => getRandomizedContent('testimonial'))

  useEffect(() => {
    const timer = setInterval(() => {
      setVisibleSections(prev => prev + 1)
    }, 800)

    return () => clearInterval(timer)
  }, [])

  const dangers = educationalData.dangers
  const warningSigns = educationalData.warningsSigns
  const howToTalk = educationalData.howToTalk
  const technicalSecurity = educationalData.technicalSecurity
  const howToReport = educationalData.howToReport
  const emergencyPlan = educationalData.emergencyPlan

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Revelação Principal */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="bg-gradient-to-r from-green-900/40 to-emerald-900/40 border-2 border-green-500 rounded-xl p-6 text-center"
      >
        <motion.h3 
          className="text-green-400 font-bold text-xl mb-3"
          animate={{ 
            textShadow: [
              '0 0 0px rgba(34, 197, 94, 0)',
              '0 0 20px rgba(34, 197, 94, 0.3)',
              '0 0 0px rgba(34, 197, 94, 0)'
            ]
          }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          📚 {educationalData.mainReveal}
        </motion.h3>
        <p className="text-green-200 font-semibold text-lg">
          Os 3 estágios que você acabou de ver são REAIS e estão acontecendo AGORA com crianças no Brasil.
        </p>
      </motion.div>

      {/* Perigos Identificados */}
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
                className="bg-gray-800 border-l-4 border-red-500 rounded-lg p-4 hover:bg-gray-750 transition-colors"
              >
                <div className="text-3xl mb-3">{danger.icon}</div>
                <h5 className="font-bold text-white mb-2">{danger.title}</h5>
                <p className="text-gray-300 text-sm mb-3">{danger.description}</p>
                
                {danger.details && (
                  <div className="space-y-1">
                    {danger.details.map((detail, detailIdx) => (
                      <div key={detailIdx} className="text-xs text-gray-400 flex items-start gap-2">
                        <span className="text-red-400">•</span>
                        <span>{detail}</span>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Sinais de Alerta */}
      {visibleSections >= 2 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-yellow-900/30 border border-yellow-500 rounded-lg p-6"
        >
          <h4 className="font-bold text-yellow-400 mb-4 flex items-center gap-2 text-lg">
            <Eye size={24} />
            SINAIS DE ALERTA - OBSERVE SEU FILHO
          </h4>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {warningSigns.map((category, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.3 }}
                className="space-y-3"
              >
                <h5 className="font-semibold text-yellow-300 text-sm uppercase tracking-wide">
                  {category.category}
                </h5>
                <div className="space-y-2">
                  {category.signs.map((sign, signIdx) => (
                    <div key={signIdx} className="flex items-start gap-2 text-yellow-200 text-sm">
                      <CheckCircle size={16} className="flex-shrink-0 mt-1 text-yellow-500" />
                      <span>{sign}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Como Conversar */}
      {visibleSections >= 3 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-blue-900/30 border border-blue-500 rounded-lg p-6"
        >
          <h4 className="font-bold text-blue-400 mb-4 text-lg">💬 COMO CONVERSAR COM SEU FILHO</h4>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {howToTalk.map((stage, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.2 }}
                className="bg-blue-800/20 rounded-lg p-4"
              >
                <h5 className="font-semibold text-blue-300 mb-3">{stage.stage}</h5>
                <ul className="space-y-2">
                  {stage.tips.map((tip, tipIdx) => (
                    <li key={tipIdx} className="text-blue-200 text-sm flex items-start gap-2">
                      <span className="text-blue-400 mt-1">•</span>
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Segurança Técnica */}
      {visibleSections >= 4 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-purple-900/30 border border-purple-500 rounded-lg p-6"
        >
          <h4 className="font-bold text-purple-400 mb-4 text-lg">🛡️ MEDIDAS DE SEGURANÇA TÉCNICA</h4>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {technicalSecurity.map((category, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.2 }}
                className="bg-purple-800/20 rounded-lg p-4"
              >
                <h5 className="font-semibold text-purple-300 mb-3">{category.category}</h5>
                <ul className="space-y-2">
                  {category.measures.map((measure, measureIdx) => (
                    <li key={measureIdx} className="text-purple-200 text-sm flex items-start gap-2">
                      <Shield size={14} className="flex-shrink-0 mt-1 text-purple-400" />
                      <span>{measure}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Plano de Emergência */}
      {visibleSections >= 5 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-900/30 border border-red-500 rounded-lg p-6"
        >
          <h4 className="font-bold text-red-400 mb-4 text-lg flex items-center gap-2">
            <AlertTriangle size={24} />
            {emergencyPlan.title}
          </h4>
          
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {emergencyPlan.steps.map((step, idx) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.3 }}
                className="bg-red-800/20 rounded-lg p-4 text-center relative"
              >
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                  {step.step}
                </div>
                <h5 className="font-bold text-red-300 mt-2 mb-2 text-sm">{step.action}</h5>
                <p className="text-red-200 text-xs">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Como Denunciar */}
      {visibleSections >= 6 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-orange-900/30 border border-orange-500 rounded-lg p-6"
        >
          <h4 className="font-bold text-orange-400 mb-4 text-lg">📞 ONDE DENUNCIAR</h4>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {howToReport.map((reportType, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.2 }}
                className="bg-orange-800/20 rounded-lg p-4"
              >
                <h5 className="font-semibold text-orange-300 mb-3">{reportType.type}</h5>
                <div className="space-y-2">
                  {reportType.contacts.map((contact, contactIdx) => (
                    <div key={contactIdx} className="text-orange-200 text-sm">
                      {contact}
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Depoimento Aleatório */}
      {visibleSections >= 7 && randomTestimonial && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-green-900/20 border border-green-500 rounded-lg p-6 text-center"
        >
          <h4 className="font-bold text-green-400 mb-3">💬 DEPOIMENTO REAL</h4>
          <blockquote className="text-green-200 italic mb-3">
            "{randomTestimonial.text}"
          </blockquote>
          <cite className="text-green-300 font-semibold">
            — {randomTestimonial.name}
            {randomTestimonial.location && (
              <span className="text-green-400 font-normal"> • {randomTestimonial.location}</span>
            )}
          </cite>
          <div className="flex justify-center mt-2">
            {[...Array(randomTestimonial.rating)].map((_, i) => (
              <span key={i} className="text-yellow-400">⭐</span>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  )
}

// === FUNÇÃO PARA ENVIAR EVENTOS A GOOGLE ANALYTICS ===
function enviarEvento(nome_evento, propriedades = {}) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', nome_evento, propriedades);
    console.log('Evento enviado:', nome_evento, propriedades);
  }
}

// === COMPONENTE PRINCIPAL - QUIZ STEP NÍVEL 3 ===
export default function QuizStep() {
  const params = useParams()
  const router = useRouter()
  const step = Number.parseInt(params.step as string)
  const [selectedAnswer, setSelectedAnswer] = useState<string>("")
  const [isLoaded, setIsLoaded] = useState(false)
  const [sessionId] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.sessionStorage.getItem('quiz_session') || 'anonymous'
    }
    return 'anonymous'
  })

  const currentStep = quizSteps[step - 1]
  const progress = (step / 4) * 100

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 300)

    // Analytics melhorado
    enviarEvento('visualizou_etapa_quiz', {
      numero_etapa: step,
      pergunta: currentStep?.question || `Etapa ${step}`,
      oferta: "lado_escuro_internet",
      session_id: sessionId,
      timestamp: Date.now()
    });

    // Tracking de comportamento
    trackUserBehavior('step_viewed', {
      step_number: step,
      step_type: currentStep?.elements?.chatType || 'unknown',
      has_dynamic_content: currentStep?.elements?.dynamicContent || false
    })

    return () => clearTimeout(timer)
  }, [step, currentStep, sessionId])

  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswer(answer)

    enviarEvento('selecionou_resposta', {
      numero_etapa: step,
      pergunta: currentStep?.question || `Etapa ${step}`,
      resposta: answer,
      oferta: "lado_escuro_internet",
      session_id: sessionId
    });

    trackUserBehavior('answer_selected', {
      step_number: step,
      answer: answer,
      time_on_step: Date.now() // Poderia calcular tempo real na etapa
    })
  }

  const handleNext = () => {
    enviarEvento('avancou_etapa', {
      numero_etapa: step,
      pergunta: currentStep?.question || `Etapa ${step}`,
      resposta_selecionada: selectedAnswer,
      oferta: "lado_escuro_internet",
      session_id: sessionId
    });

    // Preservar UTMs
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
        oferta: "lado_escuro_internet",
        session_id: sessionId,
        completion_time: Date.now()
      });

      trackUserBehavior('quiz_completed', {
        total_steps: 4,
        completion_rate: 1.0
      })

      router.push(`/resultado${utmString}`)
    }
  }

  const handleBack = () => {
    enviarEvento('retornou_etapa', {
      de_etapa: step,
      para_etapa: step > 1 ? step - 1 : 'inicio',
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

    if (step > 1) {
      router.push(`/quiz/${step - 1}${utmString}`)
    } else {
      router.push(`/${utmString}`)
    }
  }

  if (!currentStep) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="text-white text-xl"
        >
          ⚡ Carregando...
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header com progresso melhorado */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <Button
              variant="ghost"
              onClick={handleBack}
              className="text-white hover:bg-white/20 border border-white/20 transition-all hover:scale-105"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar
            </Button>

            <div className="flex items-center gap-4">
              {step <= 3 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex items-center gap-2 text-white text-sm bg-white/10 px-3 py-1 rounded-full backdrop-blur-sm"
                >
                  <Eye className="w-4 h-4" />
                  <span>Observar com atenção</span>
                </motion.div>
              )}
            </div>
          </div>

          <div className="bg-white/20 rounded-full p-1 mb-2">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="h-3 bg-gradient-to-r from-red-500 to-orange-500 rounded-full"
            />
          </div>

          <div className="flex justify-between items-center">
            <p className="text-white text-sm">
              Etapa {step} de 4 • {Math.round(progress)}% concluído
            </p>
            
            {currentStep.elements?.emotionalStage && (
              <span className="text-xs text-gray-400 bg-gray-800 px-2 py-1 rounded">
                {currentStep.elements.emotionalStage}
              </span>
            )}
          </div>
        </div>

        {/* Card de Pergunta Melhorado */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
          transition={{ duration: 0.6 }}
        >
          <Card className="bg-gradient-to-br from-gray-900/95 to-black/95 backdrop-blur-lg border-red-500/30 shadow-2xl border-2 overflow-hidden">
            <CardContent className="p-6 sm:p-8">
              <motion.h2 
                className="text-2xl sm:text-3xl font-bold text-white mb-4 text-center leading-tight"
                animate={step <= 3 ? {
                  textShadow: [
                    '0 0 0px rgba(239, 68, 68, 0)',
                    '0 0 20px rgba(239, 68, 68, 0.3)',
                    '0 0 0px rgba(239, 68, 68, 0)'
                  ]
                } : {}}
                transition={{ duration: 3, repeat: Infinity }}
              >
                {currentStep.question}
              </motion.h2>

              {currentStep.description && (
                <p className="text-gray-300 text-center mb-8 text-base sm:text-lg">
                  {currentStep.description}
                </p>
              )}

              {currentStep.subtext && (
                <motion.p 
                  className="text-orange-200 text-center mb-6 text-sm font-medium italic"
                  animate={{ opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  {currentStep.subtext}
                </motion.p>
              )}

              {/* Badge de simulação */}
              {currentStep.elements?.badge && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center mb-6"
                >
                  <span className="inline-block bg-gradient-to-r from-red-600 to-orange-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                    {currentStep.elements.badge}
                  </span>
                </motion.div>
              )}

              {/* Renderizar componentes específicos */}
              {step === 1 && <ChatGamingStep />}
              {step === 2 && <ChatPrivateStep />}
              {step === 3 && <ChatDirectStep />}
              {step === 4 && <EducationalStep />}

              {/* CTA Button Melhorado */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mt-8 text-center"
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    onClick={handleNext}
                    size="lg"
                    className="bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white font-bold py-4 px-8 rounded-full shadow-lg w-full sm:w-auto text-base relative overflow-hidden"
                  >
                    <motion.div
                      className="absolute inset-0 bg-white/20"
                      initial={{ x: '-100%' }}
                      whileHover={{ x: '100%' }}
                      transition={{ duration: 0.6 }}
                    />
                    <span className="relative z-10 flex items-center gap-2">
                      {step === 4 ? "VER SOLUÇÃO COMPLETA" : "PRÓXIMA ETAPA"}
                      <ArrowRight className="w-5 h-5" />
                    </span>
                  </Button>
                </motion.div>
              </motion.div>

              {/* Aviso de conteúdo melhorado */}
              {step <= 3 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                  className="mt-6 text-center"
                >
                  <motion.div
                    className="text-amber-300 bg-amber-900/30 p-4 rounded-lg border border-amber-600 inline-block"
                    animate={{ 
                      borderColor: ['rgba(245, 158, 11, 0.6)', 'rgba(245, 158, 11, 0.9)', 'rgba(245, 158, 11, 0.6)']
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    <p className="font-medium text-sm">
                      ⚠️ <strong>AVISO:</strong> Conteúdo educacional sobre perigos reais na internet. Pode ser perturbador.
                    </p>
                  </motion.div>
                </motion.div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Prova Social Melhorada */}
        {step > 1 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-center space-y-3 mt-6"
          >
            <motion.p
              className="text-white text-xs sm:text-sm bg-white/10 px-4 py-2 rounded-full inline-block backdrop-blur-sm"
              animate={{ scale: [1, 1.02, 1] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              👥 {getRandomizedContent('social_proof') || '3.247 pais já viram esta simulação'}
            </motion.p>
            <motion.p
              className="text-green-400 text-xs sm:text-sm font-semibold bg-green-900/20 px-4 py-2 rounded-full inline-block backdrop-blur-sm"
              animate={{ 
                boxShadow: [
                  '0 0 0 0 rgba(34, 197, 94, 0.3)',
                  '0 0 0 10px rgba(34, 197, 94, 0)',
                  '0 0 0 0 rgba(34, 197, 94, 0.3)'
                ]
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              ✅ 91% descobriu comportamentos suspeitos no filho
            </motion.p>
          </motion.div>
        )}
      </div>
    </div>
  )
}