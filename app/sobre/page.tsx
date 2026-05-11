'use client'

import Image from 'next/image'
import InnerPage from '@/public/components/template]/InnerPage'

export default function Sobre() {
  return (
    <InnerPage >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '40rem',
          marginTop: '1rem',

        }}
      >
        {/* Texto */}
        <div
          style={{
            flex: 1,
            minWidth: '500px',
            marginBottom: '20rem',
          }}
        >
          <h1
            style={{
              fontSize: '7rem',
              marginBottom: '1rem',
              color: '#000',
              fontWeight: 400,
            }}
          >
            Sobre
          </h1>

          <p
            style={{
              fontSize: '1.3rem',
              lineHeight: 1.3,
              maxWidth: '650px',
              color: '#111',
            }}
          >
            Lorem ipsum dolor sit amet,
            consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Ut enim ad minim
            veniam, quis nostrud exercitation
            ullamco laboris nisi ut aliquip ex ea
            commodo consequat.
          </p>
        </div>

        {/* Card da imagem */}
        <div
          style={{
            backgroundColor: '#1B4332',
            borderRadius: '80px',
            padding: '3rem',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minWidth: '500px',
          }}
        >
          <Image
            src="/images/comida.jpg"
            alt=""
            width={530}
            height={300}
            style={{
              borderRadius: '50px',
              objectFit: 'cover',
            }}
          />
        </div>
      </div>
    </InnerPage>
  )
}