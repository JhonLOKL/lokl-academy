export default function Head() {
  const title = 'Indie Universe | LOKL';
  const description =
    'Explora Indie Universe, el proyecto de inversión inmobiliaria de LOKL con beneficios, cronograma y oportunidades exclusivas para inversionistas.';
  const canonicalUrl = 'https://lokl.life/indie-universe';

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

