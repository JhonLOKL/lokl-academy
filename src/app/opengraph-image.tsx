import { ImageResponse } from 'next/og';
 
export const runtime = 'edge';
 
export const alt = 'LOKL Academy - Inversiones Inmobiliarias';
export const size = {
  width: 1200,
  height: 630,
};
 
export const contentType = 'image/png';
 
export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 48,
          background: 'linear-gradient(to bottom, #FFFFFF, #F7F7FB)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 48,
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: 24,
          }}
        >
          <span style={{ fontWeight: 'bold' }}>LOKL</span>
          <span style={{ fontWeight: 'bold', color: '#5352F6', marginLeft: 8 }}>Academy</span>
        </div>
        <div
          style={{
            fontSize: 36,
            textAlign: 'center',
            maxWidth: '80%',
            marginBottom: 24,
          }}
        >
          Domina el mundo de las inversiones inmobiliarias
        </div>
        <div
          style={{
            fontSize: 24,
            color: '#6D6C6C',
            textAlign: 'center',
            maxWidth: '70%',
          }}
        >
          Cursos, blogs, podcasts y recursos premium para inversores
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
