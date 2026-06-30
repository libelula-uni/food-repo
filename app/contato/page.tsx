'use client'
import InnerPage from '@/public/components/template]/InnerPage'
import { FaInstagram, FaFacebook, FaEnvelope, FaPhone } from 'react-icons/fa'

const contatos = [
  { icon: FaEnvelope, valor: 'contato@foodcycle.com.br' },
  { icon: FaPhone, valor: '(31) 99999-9999' },
  { icon: FaInstagram, valor: '@foodcycle.oficial' },
  { icon: FaFacebook, valor: 'facebook.com/foodcycle' },
]

export default function Contato() {
  return (
    <InnerPage title="Contato">
      <div className="flex flex-col gap-5 sm:gap-6 mt-4">
        {contatos.map(({ icon: Icon, valor }) => (
          <div key={valor} className="flex items-center gap-4">
            <Icon size={28} className="sm:w-9 sm:h-9 text-[#111] flex-shrink-0" />
            <span className="text-lg sm:text-2xl text-[#111] break-all">{valor}</span>
          </div>
        ))}
      </div>
    </InnerPage>
  )
}