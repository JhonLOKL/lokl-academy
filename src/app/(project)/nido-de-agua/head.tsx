export default function Head() {
  const title = 'Nido de Agua | LOKL';
  const description =
    'Descubre Nido de Agua, el proyecto exclusivo de inversión inmobiliaria de LOKL. Conoce sus beneficios, cronograma, equipo y oportunidades.';
  const canonicalUrl = 'https://lokl.life/nido-de-agua';

  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
    </>
  );
}

