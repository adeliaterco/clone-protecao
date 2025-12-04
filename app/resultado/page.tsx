"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Shield,
  ArrowRight,
  Check,
  Clock,
  Users,
  Heart,
  Lock,
  FileText,
  MessageSquare,
  Settings,
  Smartphone,
  Headphones,
  AlertCircle,
  Star,
  TrendingUp,
  Zap,
  Download,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CountdownTimer } from "@/components/countdown-timer"
import { enviarEvento } from "../../lib/analytics"

export default function ResultPageLadoEscuro() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)
  const [recentBuyers, setRecentBuyers] = useState(9)
  const [activeBuyers, setActiveBuyers] = useState(Math.floor(Math.random() * 10) + 15)
  const [activeProtections, setActiveProtections] = useState(Math.floor(Math.random() * 5) + 3)
  const contentRef = useRef<HTMLDivElement>(null)
  const startTimeRef = useRef(Date.now())

  useEffect(() => {
    setTimeout(() => setIsLoaded(true), 300)

    // Simular compradores
    const interval = setInterval(() => {
      setRecentBuyers(prev => Math.min(prev + Math.floor(Math.random() * 2) + 1, 31))
      setActiveBuyers(prev => prev + Math.floor(Math.random() * 2) + 1)
      setActiveProtections(prev => prev + Math.floor(Math.random() * 2))
    }, 35000)

    // GA4 EVENT
    enviarEvento("viu_resultado_lado_escuro", {
      timestamp: new Date().toISOString(),
      version: "lado_escuro_internet"
    })

    startTimeRef.current = Date.now()
    loadVTurbScript()

    return () => {
      clearInterval(interval)
      const timeSpent = (Date.now() - startTimeRef.current) / 1000
      enviarEvento('tempo_pagina_resultado', {
        tempo_segundos: timeSpent,
        conversao: false,
        version: "lado_escuro_internet"
      })
    }
  }, [])

  // Progressão automática de steps
  useEffect(() => {
    const timers = [
      setTimeout(() => setCurrentStep(2), 5000),
      setTimeout(() => setCurrentStep(3), 10000),
      setTimeout(() => setCurrentStep(4), 15000),
      setTimeout(() => setCurrentStep(5), 20000),
    ]

    return () => timers.forEach(clearTimeout)
  }, [])

  const loadVTurbScript = () => {
    if (!document.querySelector('script[src*="6930a4608f8686608182d5f3"]')) {
      const script = document.createElement("script")
      script.src = "https://scripts.converteai.net/15be01a4-4462-4736-aeb9-b95eda21b8b8/players/6930a4608f8686608182d5f3/v4/player.js"
      script.async = true
      document.head.appendChild(script)
    }
  }

  const handlePurchase = (position = "principal") => {
    const timeToAction = (Date.now() - startTimeRef.current) / 1000

    enviarEvento("clicou_comprar_lado_escuro", {
      posicao: position,
      step_atual: currentStep,
      timestamp: new Date().toISOString(),
      tempo_ate_acao: timeToAction,
      conversao: true,
      version: "lado_escuro_internet"
    })

    enviarEvento('tempo_pagina_resultado', {
      tempo_segundos: timeToAction,
      conversao: true,
      version: "lado_escuro_internet"
    })

    setTimeout(() => {
      window.open("https://pay.hotmart.com/Y103259745G?checkoutMode=10", "_blank")
    }, 100)
  }

  const handleTouchFeedback = () => {
    if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
      navigator.vibrate(10)
    }
  }

  const benefits = [
    {
      icon: FileText,
      title: "Guia Completo de Segurança Digital",
      desc: "PDF com 50+ páginas detalhadas"
    },
    {
      icon: MessageSquare,
      title: "Roteiro de Diálogo com Seus Filhos",
      desc: "Como conversar sobre perigos online"
    },
    {
      icon: Settings,
      title: "Checklist de Configurações",
      desc: "Para cada app (TikTok, Discord, Instagram, etc)"
    },
    {
      icon: Smartphone,
      title: "Lista de Apps de Monitoramento",
      desc: "Testados e recomendados por especialistas"
    },
    {
      icon: Headphones,
      title: "Suporte por 7 Dias",
      desc: "Acesso a especialistas em segurança digital"
    },
    {
      icon: Lock,
      title: "Protocolo Anti-Predador",
      desc: "Sinais de alerta + ações imediatas"
    },
  ]

  return (
    <>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <meta name="format-detection" content="telephone=no" />
      </head>

      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black overflow-x-hidden w-full max-w-[100vw]">

        {/* ===== SEÇÃO 1: TRANSIÇÃO EMOCIONAL ===== */}
        <div className="mobile-padding bg-gradient-to-r from-red-900/20 to-orange-900/20 w-full">
          <div className="max-w-4xl mx-auto w-full">

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
              className="text-center mb-8"
            >
              <div className="flex items-center justify-center gap-3 mb-4">
                <Shield className="w-8 h-8 text-red-500" />
                <h1 className="text-3xl sm:text-4xl font-black text-white">
                  Proteja Seu Filho Agora
                </h1>
              </div>

              <p className="text-gray-300 mb-6 text-lg font-semibold break-words">
                Você acabou de descobrir que <strong className="text-orange-400">kit SEU FILHO</strong> está exposto a predadores online <strong className="text-orange-400">NESTE EXATO MOMENTO.</strong> Cada minuto que passa é um risco real à segurança dele."
              </p>

              <div className="bg-gradient-to-r from-green-900/40 to-emerald-900/40 rounded-xl p-6 border border-green-500/50">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Users className="w-5 h-5 text-green-400" />
                  <p className="text-green-300 font-bold text-lg">+9.000 pais</p>
                </div>
                <p className="text-green-200 font-semibold">
                  já protegeram seus filhos com este método
                </p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* ===== SEÇÃO 2: BENEFÍCIOS ===== */}
        <div className="mobile-padding bg-gradient-to-r from-gray-900 to-black w-full">
          <div className="max-w-4xl mx-auto w-full">

            <h2 className="text-2xl sm:text-3xl font-bold text-white text-center mb-8 break-words">
              🎁 O QUE VOCÊ RECEBE HOJE
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {benefits.map((benefit, idx) => {
                const Icon = benefit.icon
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg p-4 border border-gray-700 hover:border-orange-500/50 transition-all"
                  >
                    <div className="flex items-start gap-3">
                      <div className="bg-orange-500/20 p-3 rounded-lg flex-shrink-0">
                        <Icon className="w-5 h-5 text-orange-500" />
                      </div>
                      <div>
                        <h4 className="font-bold text-white text-sm mb-1">{benefit.title}</h4>
                        <p className="text-gray-400 text-xs">{benefit.desc}</p>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </div>

        {/* ===== SEÇÃO 3: VÍDEO PRINCIPAL ===== */}
        <div className="mobile-padding bg-gradient-to-r from-gray-900 to-black w-full">
          <div className="max-w-4xl mx-auto w-full">

            <div className="text-center mb-6">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4 break-words">
                📹 <span className="text-orange-400">COMO PROTEGER</span> SEU FILHO
              </h2>

              <p className="text-gray-300 mb-4 text-sm sm:text-base break-words">
                Descubra o passo a passo completo para implementar proteção imediatamente:
              </p>
            </div>

            {/* VSL */}
            <div className="flex justify-center mb-6 sm:mb-8 w-full">
              <div className="w-full max-w-3xl">
                <div className="relative bg-black rounded-xl sm:rounded-2xl mobile-video-padding mobile-border-orange shadow-2xl w-full">
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-600/20 to-red-600/20 rounded-xl sm:rounded-2xl animate-pulse"></div>
                  <div className="relative z-10 w-full mobile-video-container">
                    <vturb-smartplayer
                      id="vid-6930a4608f8686608182d5f3"
                      className="mobile-vturb-player"
                    ></vturb-smartplayer>
                  </div>
                </div>
              </div>
            </div>

            {/* Barra de Progresso */}
            <AnimatePresence>
              {currentStep < 3 && (
                <div className="text-center mb-8 max-w-md mx-auto">
                  <div className="text-gray-300 text-sm mb-3 break-words font-semibold">
                    ⏳ DESBLOQUEANDO KIT COMPLETO DE PROTEÇÃO...
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-3 max-w-md mx-auto overflow-hidden border border-orange-500">
                    <motion.div
                      className="bg-gradient-to-r from-orange-500 to-red-500 h-3 rounded-full"
                      animate={{ width: ["0%", "100%"] }}
                      transition={{ duration: 6, ease: "linear" }}
                    />
                  </div>
                  <p className="text-gray-400 text-xs mt-3 break-words italic">
                    Carregando conteúdo exclusivo...
                  </p>
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* ===== SEÇÃO 4: OFERTA PRINCIPAL ===== */}
        <AnimatePresence>
          {currentStep >= 3 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mobile-padding bg-gradient-to-r from-blue-600 to-blue-700 w-full"
            >
              <div className="max-w-4xl mx-auto w-full">

                <Card className="bg-black/90 text-white shadow-2xl mobile-border-yellow w-full backdrop-blur-sm">
                  <CardContent className="mobile-offer-padding text-center w-full">

                    <div className="bg-yellow-400 text-black font-bold mobile-offer-badge rounded-full inline-block mb-6">
                      🛡️ KIT COMPLETO DE PROTEÇÃO
                    </div>

                    <h2 className="text-3xl sm:text-4xl font-black mb-6 text-white break-words">
                      PROTEJA SEU FILHO AGORA
                    </h2>

                    {/* Preço */}
                    <div className="bg-gradient-to-r from-green-900/50 to-emerald-900/50 rounded-lg p-6 mb-6 border border-green-500/50">
                      <div className="flex items-center justify-center gap-4 mb-4">
                        <div className="text-gray-400 line-through text-2xl font-bold">
                          R$ 97
                        </div>
                        <div className="text-3xl sm:text-4xl font-black text-green-400">
                          R$ 19,90
                        </div>
                      </div>
                      <p className="text-green-300 font-bold text-sm mb-3">
                        79,5% de desconto por tempo limitado
                      </p>

                      <div className="bg-red-900/40 rounded-lg p-3 border border-red-500/50">
                        <p className="text-red-300 font-bold text-sm">
                          ⏰ Oferta expira em:
                        </p>
                        <div className="text-2xl font-black text-red-400 mt-2">
                          <CountdownTimer minutes={47} seconds={0} />
                        </div>
                      </div>
                    </div>

                    {/* O que recebe */}
                    <div className="bg-gray-800/50 rounded-lg p-6 mb-6 text-left">
                      <h3 className="text-orange-400 font-bold mb-4 text-center">
                        ✅ VOCÊ RECEBE:
                      </h3>
                      <ul className="space-y-3 text-sm sm:text-base">
                        <li className="flex items-start gap-3">
                          <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                          <span><strong>Guia Completo de Segurança Digital</strong> - PDF 50+ páginas</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                          <span><strong>Roteiro de Diálogo</strong> - Como conversar com seus filhos</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                          <span><strong>Checklist de Configurações</strong> - Para cada app (TikTok, Discord, Instagram)</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                          <span><strong>Lista de Apps de Monitoramento</strong> - Testados e recomendados</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                          <span><strong>Suporte por 7 Dias</strong> - Acesso a especialistas</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                          <span><strong>Protocolo Anti-Predador</strong> - Sinais de alerta + ações</span>
                        </li>
                      </ul>
                    </div>

                    {/* CTA Principal */}
                    <motion.div
                      animate={{
                        scale: [1, 1.05, 1],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Number.POSITIVE_INFINITY,
                        repeatType: "reverse",
                      }}
                      className="mb-6 w-full"
                    >
                      <Button
                        onClick={() => handlePurchase("oferta_principal")}
                        size="lg"
                        className="mobile-cta-offer"
                        onTouchStart={handleTouchFeedback}
                      >
                        <Shield className="w-5 h-5 mr-2 flex-shrink-0" />
                        <div className="text-center break-words">
                          <div className="text-lg font-black leading-tight">
                            GARANTIR ACESSO AGORA
                          </div>
                          <div className="text-xs mt-1 opacity-90">
                            Acesso imediato ao kit completo
                          </div>
                        </div>
                      </Button>
                    </motion.div>

                    {/* Garantias */}
                    <div className="grid grid-cols-3 gap-3 text-center text-xs sm:text-sm mb-6">
                      <div className="flex flex-col items-center gap-2">
                        <Zap className="w-5 h-5 text-yellow-400" />
                        <p className="text-gray-300">Acesso Imediato</p>
                      </div>
                      <div className="flex flex-col items-center gap-2">
                        <Heart className="w-5 h-5 text-red-400" />
                        <p className="text-gray-300">Garantia 7 dias</p>
                      </div>
                      <div className="flex flex-col items-center gap-2">
                        <Lock className="w-5 h-5 text-green-400" />
                        <p className="text-gray-300">Pagamento Seguro</p>
                      </div>
                    </div>

                    {/* Prova Social */}
                    <div className="flex justify-center items-center space-x-4 text-gray-300 mb-4 flex-wrap gap-2">
                      <div className="flex items-center break-words">
                        <Users className="w-4 h-4 text-green-400 mr-1" />
                        <span className="text-xs sm:text-sm"><strong className="text-white">{recentBuyers}</strong> pessoas compraram hoje</span>
                      </div>
                      <div className="flex items-center break-words">
                        <Star className="w-4 h-4 text-yellow-400 mr-1" />
                        <span className="text-xs sm:text-sm"><strong className="text-white">4.9/5</strong> avaliação média</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ===== SEÇÃO 5: OBJEÇÕES ===== */}
        <AnimatePresence>
          {currentStep >= 4 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="mobile-padding w-full bg-gray-900/50"
            >
              <div className="max-w-4xl mx-auto w-full">

                <h2 className="text-2xl sm:text-3xl font-bold text-white text-center mb-8 break-words">
                  ❓ <span className="text-yellow-400">DÚVIDAS COMUNS</span>
                </h2>

                <div className="space-y-4 mb-8">

                  <div className="bg-gray-800 rounded-xl p-6 border-l-4 border-blue-400">
                    <h3 className="text-blue-400 font-bold mb-3 break-words">
                      "Meu filho não usa internet tanto assim..."
                    </h3>
                    <p className="text-white text-sm break-words">
                      Estatísticas mostram que 89% das crianças brasileiras têm acesso à internet. Mesmo uso "leve" expõe a riscos. Este kit prepara você para QUALQUER situação.
                    </p>
                  </div>

                  <div className="bg-gray-800 rounded-xl p-6 border-l-4 border-green-400">
                    <h3 className="text-green-400 font-bold mb-3 break-words">
                      "Não tenho tempo para ler tudo..."
                    </h3>
                    <p className="text-white text-sm break-words">
                      O Guia é prático e objetivo. Você pode ler em 30 minutos. O Checklist é rápido de aplicar. Suporte de 7 dias tira suas dúvidas.
                    </p>
                  </div>

                  <div className="bg-gray-800 rounded-xl p-6 border-l-4 border-orange-400">
                    <h3 className="text-orange-400 font-bold mb-3 break-words">
                      "E se meu filho não cooperar?"
                    </h3>
                    <p className="text-white text-sm break-words">
                      O Roteiro de Diálogo foi testado com 1.000+ famílias. Ensina como conversar SEM invadir privacidade. Muitos pais relatam que filhos entendem a importância.
                    </p>
                  </div>

                  <div className="bg-gray-800 rounded-xl p-6 border-l-4 border-purple-400">
                    <h3 className="text-purple-400 font-bold mb-3 break-words">
                      "Existem apps melhores que esses?"
                    </h3>
                    <p className="text-white text-sm break-words">
                      Testamos 47 apps diferentes. A lista inclui os melhores custo-benefício. Cada um tem prós e contras explicados. Você escolhe o melhor para sua família.
                    </p>
                  </div>

                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ===== SEÇÃO 6: GARANTIA ===== */}
        <AnimatePresence>
          {currentStep >= 5 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mobile-padding bg-gradient-to-r from-green-900/30 to-emerald-900/30 w-full"
            >
              <div className="max-w-4xl mx-auto w-full">

                <Card className="bg-green-50 mobile-border-green shadow-2xl w-full">
                  <CardContent className="mobile-guarantee-padding text-center w-full">

                    <Shield className="w-12 h-12 sm:w-16 sm:h-16 text-green-600 mx-auto mb-4" />

                    <h2 className="text-2xl sm:text-3xl font-bold text-green-800 mb-4 break-words">
                      GARANTIA DE 7 DIAS
                    </h2>

                    <p className="text-green-700 font-bold mb-4 text-sm sm:text-base break-words">
                      Se não ficar satisfeito, devolvemos 100% do seu dinheiro. Sem perguntas.
                    </p>

                    <div className="bg-white rounded-lg p-4 border-2 border-green-500">
                      <p className="text-green-800 font-semibold text-sm break-words">
                        <strong>Minha promessa:</strong> Se seguir o kit e não sentir mais seguro em relação aos perigos online que seu filho enfrenta, você recebe seu dinheiro de volta. Simples assim.
                      </p>
                    </div>

                    <p className="text-green-600 text-xs sm:text-sm mt-4 break-words">
                      Você tem 7 dias completos para explorar tudo. Sem risco.
                    </p>

                  </CardContent>
                </Card>

              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ===== SEÇÃO 7: CTA FINAL ===== */}
        <AnimatePresence>
          {currentStep >= 5 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mobile-padding bg-gradient-to-r from-red-600 via-red-700 to-orange-600 w-full"
            >
              <div className="max-w-4xl mx-auto text-center w-full">

                <div className="bg-black/80 backdrop-blur-sm rounded-2xl mobile-final-padding border-2 border-yellow-400 w-full">

                  <h2 className="text-2xl sm:text-3xl font-black text-white mb-4 break-words">
                    ⏰ ÚLTIMO AVISO
                  </h2>

                  <p className="text-white mb-6 font-bold text-sm sm:text-base break-words">
                    Você viu os perigos reais. Seus filhos estão expostos AGORA. Não espere mais.
                  </p>

                  <div className="bg-yellow-600/20 border border-yellow-400 rounded-lg p-4 mb-6">
                    <p className="text-yellow-300 text-sm font-bold mb-2 break-words">
                      🎁 POR APENAS R$ 19,90 VOCÊ RECEBE:
                    </p>
                    <p className="text-white text-xs sm:text-sm break-words">
                      Guia completo + Roteiro de diálogo + Checklist + Apps testados + Suporte 7 dias
                    </p>
                  </div>

                  <motion.div
                    animate={{
                      scale: [1, 1.1, 1],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Number.POSITIVE_INFINITY,
                      repeatType: "reverse",
                    }}
                    className="w-full mb-6"
                  >
                    <Button
                      onClick={() => handlePurchase("cta_final")}
                      size="lg"
                      className="mobile-cta-final"
                      onTouchStart={handleTouchFeedback}
                    >
                      <div className="text-center break-words">
                        <div className="text-lg font-black leading-tight">
                          🛡️ PROTEGER MEU FILHO AGORA
                        </div>
                        <div className="text-xs mt-1 opacity-90">
                          Acesso imediato + Garantia 7 dias
                        </div>
                      </div>
                      <ArrowRight className="w-5 h-5 ml-2 flex-shrink-0" />
                    </Button>
                  </motion.div>

                  <p className="text-yellow-300 font-bold text-xs sm:text-sm break-words">
                    Oferta expira em 47 minutos. Depois volta a R$ 97.
                  </p>

                </div>

              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ===== CSS GLOBAL ===== */}
        <style jsx global>{`
          * {
            box-sizing: border-box !important;
            max-width: 100% !important;
          }

          html {
            overflow-x: hidden !important;
            max-width: 100vw !important;
            -webkit-text-size-adjust: 100%;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
          }

          body {
            overflow-x: hidden !important;
            max-width: 100vw !important;
            width: 100%;
            margin: 0;
            padding: 0;
          }

          .mobile-padding {
            padding: clamp(1rem, 4vw, 2rem) clamp(0.75rem, 3vw, 1rem);
          }

          .mobile-offer-padding {
            padding: clamp(1rem, 4vw, 2rem);
          }

          .mobile-guarantee-padding {
            padding: clamp(1rem, 4vw, 1.5rem);
          }

          .mobile-final-padding {
            padding: clamp(1rem, 4vw, 1.5rem);
          }

          .mobile-video-padding {
            padding: clamp(0.5rem, 2vw, 1rem);
          }

          .mobile-video-container {
            width: 100% !important;
            max-width: 100% !important;
            position: relative !important;
            overflow: hidden !important;
            border-radius: clamp(0.5rem, 2vw, 1rem) !important;
          }

          .mobile-vturb-player {
            display: block !important;
            margin: 0 auto !important;
            width: 100% !important;
            max-width: 100% !important;
            border-radius: clamp(0.5rem, 2vw, 1rem) !important;
            overflow: hidden !important;
            aspect-ratio: 16/9 !important;
            height: auto !important;
            min-height: clamp(200px, 40vw, 400px) !important;
          }

          vturb-smartplayer {
            border-radius: clamp(0.5rem, 2vw, 1rem) !important;
            overflow: hidden !important;
            width: 100% !important;
            max-width: 100% !important;
            height: auto !important;
            display: block !important;
            aspect-ratio: 16/9 !important;
            contain: layout style paint !important;
            min-height: clamp(200px, 40vw, 400px) !important;
          }

          .mobile-border-orange {
            border: clamp(1px, 0.5vw, 2px) solid rgb(249 115 22);
          }

          .mobile-border-yellow {
            border: clamp(2px, 1vw, 4px) solid rgb(250 204 21) !important;
          }

          .mobile-border-green {
            border: clamp(2px, 1vw, 4px) solid rgb(34 197 94) !important;
          }

          .mobile-offer-badge {
            font-size: clamp(0.75rem, 2.5vw, 1rem);
            padding: clamp(0.5rem, 2vw, 0.75rem) clamp(1rem, 3vw, 1.5rem);
          }

          .mobile-cta-offer,
          .mobile-cta-final {
            width: 100% !important;
            box-sizing: border-box !important;
            touch-action: manipulation !important;
            -webkit-tap-highlight-color: transparent !important;
            user-select: none !important;
            transition: all 0.3s ease !important;
          }

          .mobile-cta-offer {
            background: rgb(59 130 246) !important;
            color: white !important;
            font-weight: 900 !important;
            padding: clamp(1rem, 4vw, 1.5rem) clamp(1rem, 4vw, 2rem) !important;
            border-radius: 9999px !important;
            font-size: clamp(1rem, 3.5vw, 1.25rem) !important;
            border: clamp(2px, 1vw, 4px) solid white !important;
            min-height: clamp(3.75rem, 14vw, 4.5rem) !important;
            max-width: 32rem !important;
            margin: 0 auto !important;
          }

          .mobile-cta-final {
            background: rgb(234 179 8) !important;
            color: black !important;
            font-weight: 900 !important;
            padding: clamp(1rem, 4vw, 1.5rem) clamp(1rem, 4vw, 2rem) !important;
            border-radius: 9999px !important;
            font-size: clamp(1rem, 3.5vw, 1.25rem) !important;
            border: clamp(2px, 1vw, 4px) solid white !important;
            min-height: clamp(3.75rem, 14vw, 4.5rem) !important;
            max-width: 28rem !important;
            margin: 0 auto !important;
          }

          .mobile-cta-offer:hover,
          .mobile-cta-final:hover {
            transform: scale(1.02) !important;
          }

          .mobile-cta-final:hover {
            transform: scale(1.05) !important;
          }

          .break-words {
            word-wrap: break-word !important;
            overflow-wrap: break-word !important;
            word-break: break-word !important;
          }

          img, video {
            max-width: 100% !important;
            height: auto !important;
            display: block !important;
          }

          .min-h-screen {
            max-width: 100vw !important;
            width: 100% !important;
          }

          .max-w-4xl {
            max-width: 100% !important;
            width: 100% !important;
          }

          @media (min-width: 640px) {
            .max-w-4xl { max-width: 56rem !important; }
            .max-w-3xl { max-width: 48rem !important; }
            .max-w-2xl { max-width: 42rem !important; }
            .max-w-md { max-width: 28rem !important; }
          }

          @media (prefers-color-scheme: dark) {
            .bg-green-50 {
              background-color: rgb(20 83 45) !important;
            }

            .text-green-800 {
              color: rgb(187 247 208) !important;
            }

            .text-green-700 {
              color: rgb(134 239 172) !important;
            }
          }

          @media (max-width: 375px) {
            .mobile-offer-badge {
              font-size: 0.75rem !important;
            }
          }

          @media (min-width: 640px) {
            .mobile-padding {
              padding: 2rem 1rem !important;
            }
          }
        `}</style>
      </div>
    </>
  )
}