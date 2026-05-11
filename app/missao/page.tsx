'use client'

import Navbar from '@/public/components/template]/Navbar'

export default function Missao() {
  return (
    <>
      <Navbar />

      <main
        style={{
          minHeight: '100vh',
          backgroundColor: '#F0EDE4',
          paddingTop: '7rem',
          paddingLeft: '3rem',
          paddingRight: '3rem',
          paddingBottom: '3rem',
        }}
      >
        {/* Título */}
        <h1
          style={{
            fontSize: '7rem',
            fontWeight: 400,
            color: '#000',
            marginBottom: '3rem',
            fontFamily: "'Space Mono', monospace",
          }}
        >
          Missão
        </h1>

        {/* Box Verde */}
        <div
          style={{
            width: '90%',
            backgroundColor: '#1B4332',
            borderRadius: '80px',
            padding: '6rem 4rem',

            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <p
            style={{
              color: '#F0EDE4',
              fontSize: '1.2rem',
              lineHeight: 1.0,
              textAlign: 'center',
              maxWidth: '1200px',
              fontFamily: "'Space Mono', monospace",
            }}
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Donec semper dignissim eros, ac commodo risus. Sed et
            dignissim tellus, a dictum est. Pellentesque non purus
            finibus, vehicula nisl iaculis, hendrerit eros. Curabitur
            pretium tortor et nisl accumsan, ac egestas neque aliquet.
            Duis eu finibus sapien, quis vehicula neque. Vestibulum
            enim erat, placerat sed ornare non, placerat euismod est.
            Nulla luctus magna quis sodales scelerisque. Proin
            hendrerit, odio eget volutpat laoreet, nibh lectus gravida
            arcu, nec lacinia quam nulla sit amet lectus. Suspendisse
            ex turpis, pretium vitae dictum quis, lobortis ut nulla.
            Aenean ac dolor mi. Maecenas sit amet lacinia ex, ut
            condimentum mi. Maecenas cursus velit ipsum, vitae maximus
            sapien cursus vitae. Pellentesque habitant morbi tristique
            senectus et netus et malesuada fames ac turpis egestas.
            Donec ultricies nunc sit amet sem finibus lobortis.
          </p>
        </div>
      </main>
    </>
  )
}