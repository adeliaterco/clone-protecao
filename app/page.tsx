"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function HomePage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const handleStart = () => {
    setIsLoading(true)
    // Redirecionar para uma página de resultado simples
    setTimeout(() => {
      router.push("/resultado") 
    }, 1000)
  }

  return (
    <div style={{ 
      backgroundColor: "#000", 
      minHeight: "100vh", 
      display: "flex", 
      alignItems: "center", 
      justifyContent: "center",
      padding: "20px"
    }}>
      <div style={{
        backgroundColor: "#111",
        padding: "40px",
        borderRadius: "20px",
        textAlign: "center",
        maxWidth: "500px"
      }}>
        <h1 style={{ 
          color: "#dc2626", 
          fontSize: "24px", 
          marginBottom: "20px",
          fontWeight: "bold"
        }}>
          🚨 TESTE TEMPORÁRIO
        </h1>
        
        <p style={{ 
          color: "white", 
          marginBottom: "30px",
          fontSize: "16px"
        }}>
          Versão simplificada para identificar o erro.
        </p>
        
        <button 
          onClick={handleStart}
          disabled={isLoading}
          style={{
            backgroundColor: "#dc2626",
            color: "white",
            padding: "15px 30px",
            borderRadius: "25px",
            border: "none",
            fontSize: "16px",
            fontWeight: "bold",
            cursor: isLoading ? "not-allowed" : "pointer",
            opacity: isLoading ? 0.7 : 1
          }}
        >
          {isLoading ? "CARREGANDO..." : "TESTAR"}
        </button>
      </div>
    </div>
  )
}