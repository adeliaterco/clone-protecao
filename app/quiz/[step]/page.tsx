"use client"

import { useState, useEffect } from "react"
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
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { quizSteps, socialProofMessages } from "@/lib/quiz-data"
import { LoadingAnalysis } from "@/components/loading-analysis"

// Função para enviar eventos a Google Analytics
function enviarEvento(nombre_evento, propriedades = {}) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', nombre_evento, propriedades);
    console.log('Evento enviado:', nombre_evento, propriedades);
  }
}

// === COMPONENTE: CHAT GAMING ===
const ChatGamingStep = () => {
  const [displayedMessages, setDisplayedMessages] = useState(0)

  useEffect(() => {
    const messages = [
      { delay: 500 },
      { delay: 1200 },
      { delay: 1900 },
      { delay: 2600 },
      { delay: 3300 },
    ]

    messages.forEach((msg, idx) => {
      setTimeout(() => setDisplayedMessages(idx + 1), msg.delay)
    })
  }, [])

  const messages = [
    { user: "D4rkWolf13", text: "alguém quer fazer squad?", type: "normal", avatar: "🎮" },
    { user: "SweetAngel", text: "eu topo! vcs jogam desde quando?", type: "normal", avatar: "👧" },
    { user: "ProKillerX", text: "vcs são mt ruim kkkkkk", type: "bullying", avatar: "😈" },
    { user: "YumiKitty", text: "oi pessoal, sou nova aqui", type: "normal", avatar: "✨" },
    { user: "M4st3rHelp", text: "oi YumiKitty! bem vinda! vem no privado q eu te ensino uns macetes top", type: "alert", avatar: "⚠️" },
  ]

  const alerts = [
    "🚨 PREDADOR identificando criança nova",
    "🚨 TENTATIVA DE ISOLAMENTO (convite para privado)",
    "🚨 PROMESSAS tentadoras para ganhar confiança",
  ]

  return (
    <div className="space-y-4">
      {/* Chat Simulation */}
      <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 border border-gray-700 shadow-xl">
        <div className="bg-blue-600 text-white px-4 py-3 rounded-t-lg font-bold flex items-center gap-2 mb-4">
          <MessageCircle size={18} />
          🎮 FortFriends Brasil
        </div>

        <div className="space-y-3 mb-6 bg-gray-700 rounded-lg p-4 max-h-80 overflow-y-auto">
          {messages.slice(0, displayedMessages).map((msg, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className={`flex gap-3 ${msg.type === "alert" ? "bg-red-900/20 p-3 rounded-lg border border-red-500/30" : ""}`}
            >
              <div className="flex-shrink-0 text-2xl">{msg.avatar}</div>
              <div className="flex-1">
                <p className="font-bold text-white text-sm">{msg.user}</p>
                <p className={`text-sm ${msg.type === "bullying" ? "text-orange-400" : msg.type === "alert" ? "text-red-400 font-semibold" : "text-gray-300"}`}>
                  {msg.text}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Alerts */}
        <div className="space-y-2">
          {alerts.map((alert, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 3.5 + idx * 0.3 }}
              className="bg-red-900/30 border-l-4 border-red-500 pl-4 py-2 text-red-300 text-sm font-semibold"
            >
              {alert}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Explanation */}
      <div className="bg-blue-900/30 border border-blue-500 rounded-lg p-4 text-center">
        <p className="text-blue-200 text-sm font-semibold">
          ✅ <strong>Você viu:</strong> Como predadores se aproximam de crianças em servidores públicos. Parecem amigos, ganham confiança e depois isolam a vítima.
        </p>
      </div>
    </div>
  )
}

// === COMPONENTE: CHAT PRIVADO ===
const ChatPrivateStep = () => {
  const [displayedMessages, setDisplayedMessages] = useState(0)

  useEffect(() => {
    const messages = Array(7).fill(null).map((_, i) => ({ delay: 500 + i * 700 }))
    messages.forEach((msg, idx) => {
      setTimeout(() => setDisplayedMessages(idx + 1), msg.delay)
    })
  }, [])

  const messages = [
    { user: "M4st3rHelp", text: "e aí, conseguiu fazer aquelas missões?", type: "normal" },
    { user: "XxCuteLoverxX", text: "qnts anos vc tem?", type: "alert" },
    { user: "YumiKitty", text: "11 pq?", type: "normal" },
    { user: "M4st3rHelp", text: "manda uma foto sua pra gnt te conhecer melhor", type: "alert" },
    { user: "XxCuteLoverxX", text: "todo mundo aqui já mandou a deles", type: "alert" },
    { user: "ProKillerX", text: "aqui tem uns skins gratis: bit.ly/sk1ns-gr4t1s", type: "alert" },
    { user: "M4st3rHelp", text: "se vc me passar seu login e senha eu libero tudo pra vc", type: "alert" },
  ]

  const alerts = [
    "🚨 SOLICITAÇÃO DE IDADE (para menores)",
    "🚨 PEDIDO DE FOTOS (exploração sexual)",
    "🚨 PRESSÃO SOCIAL (normalizar comportamento)",
    "🚨 LINKS SUSPEITOS (malware/roubo)",
    "🚨 ROUBO DE CREDENCIAIS (acesso à conta)",
  ]

  return (
    <div className="space-y-4">
      <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 border border-gray-700 shadow-xl">
        <div className="bg-purple-600 text-white px-4 py-3 rounded-t-lg font-bold flex items-center gap-2 mb-4">
          <Lock size={18} />
          🔒 amigos-especiais
        </div>

        <div className="space-y-2 mb-6 bg-gray-700 rounded-lg p-4 max-h-80 overflow-y-auto">
          {messages.slice(0, displayedMessages).map((msg, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`p-3 rounded-lg ${msg.type === "alert" ? "bg-red-900/40 border-l-4 border-red-500" : "bg-gray-600"}`}
            >
              <p className="font-bold text-white text-sm mb-1">{msg.user}</p>
              <p className={`text-sm ${msg.type === "alert" ? "text-red-300 font-semibold" : "text-gray-200"}`}>
                {msg.text}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="space-y-2">
          {alerts.map((alert, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 5 + idx * 0.3 }}
              className="bg-red-900/30 border-l-4 border-red-500 pl-4 py-2 text-red-300 text-sm font-semibold"
            >
              {alert}
            </motion.div>
          ))}
        </div>
      </div>

      <div className="bg-orange-900/30 border border-orange-500 rounded-lg p-4 text-center">
        <p className="text-orange-200 text-sm font-semibold">
          ⚠️ <strong>A manipulação escala:</strong> Isolamento, exploração sexual, roubo de dados. A vítima não consegue sair porque já foi comprometida.
        </p>
      </div>
    </div>
  )
}

// === COMPONENTE: CHAT DIRETO ===
const ChatDirectStep = () => {
  const [displayedMessages, setDisplayedMessages] = useState(0)

  useEffect(() => {
    const messages = Array(7).fill(null).map((_, i) => ({ delay: 500 + i * 800 }))
    messages.forEach((msg, idx) => {
      setTimeout(() => setDisplayedMessages(idx + 1), msg.delay)
    })
  }, [])

  const messages = [
    { user: "M4st3rHelp", text: "ei, vc tá online", type: "normal" },
    { user: "M4st3rHelp", text: "não conta pra ninguém q a gnt se fala ok?", type: "alert" },
    { user: "YumiKitty", text: "por quê?", type: "normal" },
    { user: "M4st3rHelp", text: "pq eles não vão entender. só a gnt aqui te entende mesmo", type: "alert" },
    { user: "M4st3rHelp", text: "se vc contar, vou te excluir de tudo", type: "alert" },
    { user: "M4st3rHelp", text: "descobri quem vc é: Mariana Costa, aluna da escola santos dumont", type: "alert" },
    { user: "M4st3rHelp", text: "melhor cooperar, senão vou enviar aquelas fotos pra seus pais", type: "alert" },
  ]

  const alerts = [
    "🚨 ISOLAMENTO (não contar para ninguém)",
    "🚨 CHANTAGEM EMOCIONAL (exclusão)",
    "🚨 DOXXING (exposição de dados reais)",
    "🚨 EXTORSÃO (ameaça de divulgar)",
    "🚨 MANIPULAÇÃO EXTREMA (controle total)",
  ]

  return (
    <div className="space-y-4">
      <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 border border-red-700 shadow-xl">
        <div className="bg-red-700 text-white px-4 py-3 rounded-t-lg font-bold flex items-center gap-2 mb-4">
          <AlertTriangle size={18} />
          💬 conversas-privadas
        </div>

        <div className="space-y-2 mb-6 bg-gray-700 rounded-lg p-4 max-h-80 overflow-y-auto">
          {messages.slice(0, displayedMessages).map((msg, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`p-3 rounded-lg ${msg.type === "alert" ? "bg-red-950/60 border-l-4 border-red-500" : "bg-gray-600"}`}
            >
              <p className="font-bold text-white text-sm mb-1">{msg.user}</p>
              <p className={`text-sm ${msg.type === "alert" ? "text-red-300 font-bold" : "text-gray-200"}`}>
                {msg.text}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="space-y-2">
          {alerts.map((alert, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 6 + idx * 0.3 }}
              className="bg-red-900/40 border-l-4 border-red-600 pl-4 py-2 text-red-300 text-sm font-bold"
            >
              {alert}
            </motion.div>
          ))}
        </div>
      </div>

      <div className="bg-red-900/40 border border-red-600 rounded-lg p-4 text-center">
        <p className="text-red-300 text-sm font-bold">
          🚨 <strong>PONTO DE NÃO RETORNO:</strong> Ameaças, chantagem e extorsão. A criança não consegue sair sem sofrer consequências.
        </p>
      </div>
    </div>
  )
}

// === COMPONENTE: EDUCACIONAL ===
const EducationalStep = () => {
  const dangers = [
    { icon: "🎭", title: "ALICIAMENTO GRADUAL", desc: "Começa com amizade, escala para isolamento e exploração" },
    { icon: "📸", title: "EXPLORAÇÃO SEXUAL", desc: "Pedidos de fotos/vídeos que viram armas de chantagem" },
    { icon: "💰", title: "EXTORSÃO E ROUBO", desc: "Roubo de credenciais, dados pessoais e contas" },
    { icon: "🔪", title: "AMEAÇA FÍSICA", desc: "Doxxing e ameaças de violência contra criança ou família" },
  ]

  const signs = [
    "Mudanças repentinas de comportamento",
    "Esconder a tela quando você se aproxima",
    "Uso excessivo de internet durante a noite",
    "Novos 'amigos' online que não quer apresentar",
    "Menos interesse em atividades normais",
    "Isolamento social e depressão",
  ]

  return (
    <div className="space-y-6">
      {/* Main Reveal */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="bg-gradient-to-r from-green-900/40 to-emerald-900/40 border-2 border-green-500 rounded-xl p-6 text-center"
      >
        <h3 className="text-green-400 font-bold text-xl mb-3">
          📚 AGORA VOCÊ SABE O QUE SEUS FILHOS ENFRENTAM
        </h3>
        <p className="text-green-200 font-semibold">
          Os 3 estágios do aliciamento online que acabou de ver realmente existem. E estão acontecendo AGORA com crianças no Brasil.
        </p>
      </motion.div>

      {/* Perigos */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {dangers.map((danger, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.2 }}
            className="bg-gray-800 border-l-4 border-red-500 rounded-lg p-4"
          >
            <div className="text-2xl mb-2">{danger.icon}</div>
            <h4 className="font-bold text-white mb-2">{danger.title}</h4>
            <p className="text-gray-300 text-sm">{danger.desc}</p>
          </motion.div>
        ))}
      </div>

      {/* Sinais de Alerta */}
      <div className="bg-yellow-900/30 border border-yellow-500 rounded-lg p-6">
        <h4 className="font-bold text-yellow-400 mb-4 flex items-center gap-2">
          <Eye size={20} />
          SINAIS DE ALERTA - OBSERVE SEU FILHO
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {signs.map((sign, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1 + idx * 0.1 }}
              className="flex items-start gap-3 text-yellow-200"
            >
              <CheckCircle size={20} className="flex-shrink-0 mt-1 text-yellow-500" />
              <span className="text-sm">{sign}</span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Como Proteger */}
      <div className="bg-blue-900/30 border border-blue-500 rounded-lg p-6">
        <h4 className="font-bold text-blue-400 mb-4">🛡️ COMO PROTEGER SEU FILHO</h4>
        <ul className="text-blue-200 space-y-2 text-sm">
          <li>✅ Ative controle parental em todos os dispositivos</li>
          <li>✅ Configure privacidade máxima nas redes sociais</li>
          <li>✅ Crie um ambiente seguro para confessar problemas</li>
          <li>✅ Explique os perigos SEM ser alarmista</li>
          <li>✅ Desabilite chat com desconhecidos</li>
        </ul>
      </div>

      {/* Como Denunciar */}
      <div className="bg-purple-900/30 border border-purple-500 rounded-lg p-6">
        <h4 className="font-bold text-purple-400 mb-4">📞 COMO DENUNCIAR</h4>
        <div className="space-y-2 text-purple-200 text-sm">
          <p>🚔 <strong>Polícia Federal</strong> - Divisão de Crimes Cibernéticos</p>
          <p>🌐 <strong>Safernet Brasil</strong> - www.safernet.org.br</p>
          <p>☎️ <strong>Disque 100</strong> - Denúncia de abuso contra crianças</p>
          <p>📱 Denuncie diretamente na plataforma (Discord, Instagram, etc)</p>
        </div>
      </div>
    </div>
  )
}

export default function QuizStep() {
  const params = useParams()
  const router = useRouter()
  const step = Number.parseInt(params.step as string)
  const [selectedAnswer, setSelectedAnswer] = useState<string>("")
  const [isLoaded, setIsLoaded] = useState(false)

  const currentStep = quizSteps[step - 1]
  const progress = (step / 4) * 100

  useEffect(() => {
    setTimeout(() => setIsLoaded(true), 300)

    enviarEvento('visualizou_etapa_quiz', {
      numero_etapa: step,
      pergunta: currentStep?.question || `Etapa ${step}`,
      oferta: "lado_escuro_internet"
    });
  }, [step])

  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswer(answer)

    enviarEvento('selecionou_resposta', {
      numero_etapa: step,
      pergunta: currentStep?.question || `Etapa ${step}`,
      resposta: answer,
      oferta: "lado_escuro_internet"
    });
  }

  const handleNext = () => {
    enviarEvento('avancou_etapa', {
      numero_etapa: step,
      pergunta: currentStep?.question || `Etapa ${step}`,
      resposta_selecionada: selectedAnswer,
      oferta: "lado_escuro_internet"
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
        oferta: "lado_escuro_internet"
      });

      router.push(`/resultado${utmString}`)
    }
  }

  const handleBack = () => {
    enviarEvento('retornou_etapa', {
      de_etapa: step,
      para_etapa: step > 1 ? step - 1 : 'inicio'
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
        <div className="text-white text-xl">Carregando...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black p-4">
      <div className="max-w-4xl mx-auto">
        {/* Encabezado com progresso */}
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

            <div className="flex items-center gap-4">
              {step <= 3 && (
                <div className="flex items-center gap-2 text-white text-sm bg-white/10 px-3 py-1 rounded-full">
                  <Eye className="w-4 h-4" />
                  <span>Observar com atenção</span>
                </div>
              )}
            </div>
          </div>

          <div className="bg-white/20 rounded-full p-1 mb-2">
            <Progress value={progress} className="h-3" />
          </div>

          <div className="flex justify-between items-center">
            <p className="text-white text-sm">
              Etapa {step} de 4 • {Math.round(progress)}% concluído
            </p>
          </div>
        </div>

        {/* Tarjeta de Pergunta */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
          transition={{ duration: 0.6 }}
        >
          <Card className="bg-gradient-to-br from-gray-900/95 to-black/95 backdrop-blur-lg border-red-500/30 shadow-2xl border-2">
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

              {/* Renderizar componentes específicos */}
              {step === 1 && <ChatGamingStep />}
              {step === 2 && <ChatPrivateStep />}
              {step === 3 && <ChatDirectStep />}
              {step === 4 && <EducationalStep />}

              {/* CTA Button */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mt-8 text-center"
              >
                <Button
                  onClick={handleNext}
                  size="lg"
                  className="bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white font-bold py-3 px-8 rounded-full shadow-lg w-full sm:w-auto text-base"
                >
                  {step === 4 ? "VER SOLUÇÃO COMPLETA" : "PRÓXIMA ETAPA"}
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </motion.div>

              {/* Aviso de conteúdo */}
              {step <= 3 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                  className="mt-6 text-center text-amber-300 bg-amber-900/30 p-4 rounded-lg border border-amber-600"
                >
                  <p className="font-medium text-sm">
                    ⚠️ <strong>AVISO:</strong> Conteúdo educacional sobre perigos reais na internet. Pode ser perturbador.
                  </p>
                </motion.div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Prova Social */}
        {step > 1 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-center space-y-2 mt-6"
          >
            <p className="text-white text-xs sm:text-sm bg-white/10 px-3 py-1 rounded-full inline-block">
              👥 2.847 pais já viram esta simulação
            </p>
            <p className="text-green-400 text-xs sm:text-sm font-semibold bg-green-900/20 px-3 py-1 rounded-full inline-block">
              ✅ 89% descobriu comportamentos suspeitos no filho
            </p>
          </motion.div>
        )}
      </div>
    </div>
  )
}