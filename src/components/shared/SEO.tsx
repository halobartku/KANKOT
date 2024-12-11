import { Helmet } from 'react-helmet-async'
import { siteMetadata } from '../../config/metadata'

interface SEOProps {
  title?: string
  description?: string
  canonical?: string
  ogImage?: string
  noIndex?: boolean
}

export function SEO({
  title = siteMetadata.title,
  description = siteMetadata.description,
  canonical = siteMetadata.siteUrl,
  ogImage,
  noIndex = false
}: SEOProps) {
  const ogImageUrl = ogImage || siteMetadata.openGraph.images[0].url

  return (
    <Helmet>
      {/* Basic metadata */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={siteMetadata.keywords.join(', ')} />
      <link rel="canonical" href={canonical} />
      <meta name="robots" content={noIndex ? 'noindex, nofollow' : 'index, follow'} />
      <meta name="language" content={siteMetadata.language} />

      {/* Open Graph */}
      <meta property="og:type" content={siteMetadata.type} />
      <meta property="og:site_name" content={siteMetadata.title} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImageUrl} />
      <meta property="og:url" content={canonical} />
      <meta property="og:locale" content={siteMetadata.locale} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImageUrl} />

      {/* Additional metadata */}
      <meta name="geo.region" content="PL" />
      <meta name="geo.placename" content="Elbląg" />
      <meta name="author" content={siteMetadata.company.name} />
      
      {/* Structured Data / JSON-LD */}
      <script type="application/ld+json">
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Organization',
          name: siteMetadata.company.name,
          description: siteMetadata.description,
          url: siteMetadata.siteUrl,
          logo: `${siteMetadata.siteUrl}/logo.png`,
          address: {
            '@type': 'PostalAddress',
            streetAddress: 'Aleja Grunwaldzka 2',
            addressLocality: 'Elbląg',
            postalCode: '82-300',
            addressCountry: 'PL'
          },
          contactPoint: {
            '@type': 'ContactPoint',
            email: siteMetadata.company.email,
            contactType: 'customer service'
          }
        })}
      </script>
    </Helmet>
  )
}
