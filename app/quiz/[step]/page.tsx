"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"

export default function QuizStep() {
  const params = useParams()
  const router = useRouter()
  const step = Number.parseInt(params.step as string)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleNext = () => {
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

  if (!mounted) {
    return <div style={{ minHeight: "100vh", backgroundColor: "black", color: "white", display: "flex", alignItems: "center", justifyContent: "center" }}>Carregando...</div>
  }

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "black", color: "white", padding: "20px" }}>
      <div style={{ maxWidth: "800px", margin: "0 auto" }}>
        
        {/* Header */}
        <div style={{ marginBottom: "30px" }}>
          <button 
            onClick={handleBack}
            style={{ 
              backgroundColor: "#333", 
              color: "white", 
              border: "1px solid #666", 
              padding: "10px 20px", 
              borderRadius: "8px",
              cursor: "pointer",
              marginBottom: "20px"
            }}
          >
            ← Voltar
          </button>
          
          <div style={{ backgroundColor: "#333", borderRadius: "20px", padding: "4px", marginBottom: "10px" }}>
            <div 
              style={{ 
                height: "12px", 
                backgroundColor: "#dc2626", 
                borderRadius: "20px",
                width: `${(step / 4) * 100}%`,
                transition: "width 0.5s ease"
              }} 
            />
          </div>
          
          <p>Etapa {step} de 4</p>
        </div>

        {/* Conteúdo */}
        <div style={{ 
          backgroundColor: "#111", 
          borderRadius: "16px", 
          padding: "40px", 
          border: "2px solid #dc2626",
          textAlign: "center"
        }}>
          
          {step === 1 && (
            <>
              <h1 style={{ fontSize: "28px", marginBottom: "20px" }}>
                🎮 VOCÊ ESTÁ PRESTES A VER O LADO ESCURO DA INTERNET
              </h1>
              <p style={{ marginBottom: "30px", color: "#ccc" }}>
                ETAPA 1: Servidor Gaming - O Primeiro Contato
              </p>
              
              {/* Simulação Chat Gaming */}
              <div style={{ 
                backgroundColor: "#2a2a2a", 
                borderRadius: "12px", 
                padding: "20px", 
                marginBottom: "30px",
                textAlign: "left"
              }}>
                <div style={{ backgroundColor: "#5865f2", color: "white", padding: "10px", borderRadius: "8px 8px 0 0", fontWeight: "bold" }}>
                  🎮 FortFriends Brasil
                </div>
                <div style={{ backgroundColor: "#36393f", padding: "15px", borderRadius: "0 0 8px 8px" }}>
                  <div style={{ marginBottom: "10px" }}>
                    <strong>D4rkWolf13:</strong> alguém quer fazer squad?
                  </div>
                  <div style={{ marginBottom: "10px" }}>
                    <strong>YumiKitty:</strong> oi pessoal, sou nova aqui
                  </div>
                  <div style={{ backgroundColor: "#dc2626", padding: "10px", borderRadius: "6px", color: "white" }}>
                    <strong>M4st3rHelp:</strong> oi YumiKitty! vem no privado q eu te ensino uns macetes top
                  </div>
                </div>
              </div>
              
              <div style={{ backgroundColor: "#dc2626", color: "white", padding: "15px", borderRadius: "8px", marginBottom: "20px" }}>
                🚨 ALERTA: Predador identificando criança nova
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <h1 style={{ fontSize: "28px", marginBottom: "20px" }}>
                ⚠️ VEJA COMO A MANIPULAÇÃO ESCALA
              </h1>
              <p style={{ marginBottom: "30px", color: "#ccc" }}>
                ETAPA 2: Chat Privado - A Armadilha
              </p>
              
              <div style={{ 
                backgroundColor: "#2a2a2a", 
                borderRadius: "12px", 
                padding: "20px", 
                marginBottom: "30px",
                textAlign: "left"
              }}>
                <div style={{ backgroundColor: "#7c3aed", color: "white", padding: "10px", borderRadius: "8px 8px 0 0", fontWeight: "bold" }}>
                  🔒 amigos-especiais
                </div>
                <div style={{ backgroundColor: "#36393f", padding: "15px", borderRadius: "0 0 8px 8px" }}>
                  <div style={{ backgroundColor: "#dc2626", padding: "10px", borderRadius: "6px", marginBottom: "10px", color: "white" }}>
                    <strong>XxCuteLoverxX:</strong> qnts anos vc tem?
                  </div>
                  <div style={{ marginBottom: "10px" }}>
                    <strong>YumiKitty:</strong> 11 pq?
                  </div>
                  <div style={{ backgroundColor: "#dc2626", padding: "10px", borderRadius: "6px", color: "white" }}>
                    <strong>M4st3rHelp:</strong> manda uma foto sua pra gnt te conhecer melhor
                  </div>
                </div>
              </div>
              
              <div style={{ backgroundColor: "#dc2626", color: "white", padding: "15px", borderRadius: "8px", marginBottom: "20px" }}>
                🚨 ALERTA: Pedido de fotos (exploração sexual)
              </div>
            </>
          )}

          {step === 3 && (
            <>
              <h1 style={{ fontSize: "28px", marginBottom: "20px" }}>
                🚨 O PONTO DE NÃO RETORNO
              </h1>
              <p style={{ marginBottom: "30px", color: "#ccc" }}>
                ETAPA 3: Chat Direto - A Ameaça
              </p>
              
              <div style={{ 
                backgroundColor: "#2a2a2a", 
                borderRadius: "12px", 
                padding: "20px", 
                marginBottom: "30px",
                textAlign: "left"
              }}>
                <div style={{ backgroundColor: "#dc2626", color: "white", padding: "10px", borderRadius: "8px 8px 0 0", fontWeight: "bold" }}>
                  💬 M4st3rHelp
                </div>
                <div style={{ backgroundColor: "#36393f", padding: "15px", borderRadius: "0 0 8px 8px" }}>
                  <div style={{ backgroundColor: "#dc2626", padding: "10px", borderRadius: "6px", marginBottom: "10px", color: "white" }}>
                    <strong>M4st3rHelp:</strong> não conta pra ninguém q a gnt se fala ok?
                  </div>
                  <div style={{ backgroundColor: "#dc2626", padding: "10px", borderRadius: "6px", marginBottom: "10px", color: "white" }}>
                    <strong>M4st3rHelp:</strong> descobri quem vc é: Mariana Costa, escola santos dumont
                  </div>
                  <div style={{ backgroundColor: "#b91c1c", padding: "10px", borderRadius: "6px", color: "white", fontWeight: "bold" }}>
                    <strong>M4st3rHelp:</strong> melhor cooperar, senão vou enviar aquelas fotos pra seus pais
                  </div>
                </div>
              </div>
              
              <div style={{ backgroundColor: "#b91c1c", color: "white", padding: "15px", borderRadius: "8px", marginBottom: "20px" }}>
                🚨 ALERTA: Extorsão e chantagem
              </div>
            </>
          )}

          {step === 4 && (
            <>
              <h1 style={{ fontSize: "28px", marginBottom: "20px" }}>
                📚 AGORA VOCÊ SABE - COMO PROTEGER SEU FILHO?
              </h1>
              <p style={{ marginBottom: "30px", color: "#ccc" }}>
                ETAPA 4: Guia Educacional Completo
              </p>
              
              <div style={{ backgroundColor: "#065f46", border: "2px solid #10b981", borderRadius: "12px", padding: "30px", marginBottom: "30px" }}>
                <h2 style={{ color: "#10b981", fontSize: "24px", marginBottom: "20px" }}>
                  📚 VOCÊ VIU OS 3 ESTÁGIOS DO ALICIAMENTO
                </h2>
                <p style={{ color: "#d1fae5", fontSize: "18px" }}>
                  Os 3 estágios que você acabou de ver são REAIS e estão acontecendo AGORA com crianças no Brasil.
                </p>
              </div>
              
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "20px", marginBottom: "30px" }}>
                <div style={{ backgroundColor: "#2a2a2a", borderLeft: "4px solid #dc2626", padding: "20px", borderRadius: "8px" }}>
                  <div style={{ fontSize: "32px", marginBottom: "10px" }}>🎭</div>
                  <h3 style={{ color: "white", marginBottom: "10px" }}>ALICIAMENTO GRADUAL</h3>
                  <p style={{ color: "#ccc", fontSize: "14px" }}>Começa com amizade, escala para isolamento</p>
                </div>
                <div style={{ backgroundColor: "#2a2a2a", borderLeft: "4px solid #dc2626", padding: "20px", borderRadius: "8px" }}>
                  <div style={{ fontSize: "32px", marginBottom: "10px" }}>📸</div>
                  <h3 style={{ color: "white", marginBottom: "10px" }}>EXPLORAÇÃO SEXUAL</h3>
                  <p style={{ color: "#ccc", fontSize: "14px" }}>Pedidos de fotos que viram chantagem</p>
                </div>
                <div style={{ backgroundColor: "#2a2a2a", borderLeft: "4px solid #dc2626", padding: "20px", borderRadius: "8px" }}>
                  <div style={{ fontSize: "32px", marginBottom: "10px" }}>💰</div>
                  <h3 style={{ color: "white", marginBottom: "10px" }}>EXTORSÃO</h3>
                  <p style={{ color: "#ccc", fontSize: "14px" }}>Ameaças e controle total</p>
                </div>
              </div>
            </>
          )}

          {/* Botão Next */}
          <button
            onClick={handleNext}
            style={{
              backgroundColor: "#dc2626",
              color: "white",
              border: "none",
              padding: "15px 30px",
              borderRadius: "25px",
              fontSize: "16px",
              fontWeight: "bold",
              cursor: "pointer",
              width: "100%",
              maxWidth: "300px"
            }}
          >
            {step === 4 ? "VER SOLUÇÃO COMPLETA →" : "PRÓXIMA ETAPA →"}
          </button>

        </div>
      </div>
    </div>
  )
}