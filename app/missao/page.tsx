'use client'
import Navbar from '@/public/components/template]/Navbar'

export default function Missao() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#F0EDE4] pt-28 sm:pt-32 px-5 sm:px-10 md:px-16 pb-16">
        <h1 className="font-mono text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-normal text-black mb-10 sm:mb-12">
          Missão
        </h1>

        <div className="w-full bg-[#1B4332] rounded-[40px] sm:rounded-[60px] md:rounded-[80px] px-6 py-10 sm:px-12 sm:py-16 md:px-16 md:py-20 flex justify-center items-center">
          <p className="text-[#F0EDE4] text-base sm:text-lg md:text-xl leading-relaxed text-center max-w-3xl font-mono">
            Trabalhamos para que nenhum alimento ainda próprio para consumo
            seja jogado fora enquanto existe quem precisa dele. Acreditamos
            em tecnologia simples a serviço de causas reais: menos
            desperdício nas prateleiras, mais comida na mesa de quem precisa.
          </p>
        </div>
      </main>
    </>
  )
}