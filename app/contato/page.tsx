'use client'

import InnerPage from '@/public/components/template]/InnerPage'

import {
  FaInstagram,
  FaFacebook,
  FaEnvelope,
  FaPhone,
} from 'react-icons/fa'

export default function Contato() {
  return (
    <InnerPage title="Contato">
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1.5rem',
          marginTop: '2rem',
        }}
      >
        {/* Email */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
          }}
        >
          <FaEnvelope size={36} color="#111" />

          <span
            style={{
              fontSize: '2rem',
              color: '#111',
            }}
          >
            abcdefg@email.com
          </span>
        </div>

        {/* Telefone */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
          }}
        >
          <FaPhone size={36} color="#111" />

          <span
            style={{
              fontSize: '2rem',
              color: '#111',
            }}
          >
            (31) 99999-9999
          </span>
        </div>

        {/* Instagram */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
          }}
        >
          <FaInstagram size={36} color="#111" />

          <span
            style={{
              fontSize: '2rem',
              color: '#111',
            }}
          >
            @insta_instagram
          </span>
        </div>

        {/* Facebook */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
          }}
        >
          <FaFacebook size={36} color="#111" />

          <span
            style={{
              fontSize: '2rem',
              color: '#111',
            }}
          >
            face_facebook
          </span>
        </div>
      </div>
    </InnerPage>
  )
}