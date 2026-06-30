'use client'
import Image from 'next/image'
import InnerPage from '@/public/components/template]/InnerPage'

export default function Sobre() {
  return (
    <InnerPage title="Sobre">
      <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16 mt-4">
        <div className="flex-1 max-w-xl">
          <p className="text-base sm:text-lg leading-relaxed text-[#111]">
            O FoodCycle nasceu para reduzir o desperdício de alimentos em
            estabelecimentos comerciais. Restaurantes, mercados e padarias
            cadastram excedentes próximos da validade, e organizações que
            atendem comunidades em vulnerabilidade conseguem reservá-los antes
            que sejam descartados. Conectamos quem tem excesso a quem
            precisa, de forma simples e rápida.
          </p>
        </div>

        <div className="bg-[#1B4332] rounded-[40px] sm:rounded-[60px] p-6 sm:p-10 flex justify-center items-center w-full lg:w-auto">
          <Image
            src="/images/comida.png"
            alt="Cesta de alimentos frescos prontos para doação"
            width={530}
            height={400}
            className="rounded-3xl object-cover w-full max-w-md h-auto"
          />
        </div>
      </div>
    </InnerPage>
  )
}