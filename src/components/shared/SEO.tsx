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
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      <meta name="description" content={description} />
      <meta name="theme-color" content="#000000" />
      <meta name="keywords" content={siteMetadata.keywords.join(', ')} />
      <link rel="canonical" href={canonical} />
      <meta name="robots" content={noIndex ? 'noindex, nofollow' : 'index, follow'} />
      <meta name="language" content={siteMetadata.language} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={siteMetadata.openGraph.type} />
      <meta property="og:site_name" content={siteMetadata.openGraph.siteName} />
      <meta property="og:locale" content={siteMetadata.openGraph.locale} />
      <meta property="og:url" content={canonical} />
      <meta property="og:title" content={siteMetadata.openGraph.title} />
      <meta property="og:description" content={siteMetadata.openGraph.description} />
      <meta property="og:image" content={`${canonical}${ogImageUrl}`} />
      <meta property="og:image:secure_url" content={`${canonical}${ogImageUrl}`} />
      <meta property="og:image:type" content="image/webp" />
      <meta property="og:image:width" content={String(siteMetadata.openGraph.images[0].width)} />
      <meta property="og:image:height" content={String(siteMetadata.openGraph.images[0].height)} />
      <meta property="og:image:type" content={siteMetadata.openGraph.images[0].type} />
      <meta property="og:image:alt" content={siteMetadata.openGraph.images[0].alt} />
      {siteMetadata.facebook.appId && (
        <meta property="fb:app_id" content={siteMetadata.facebook.appId} />
      )}

      {/* Twitter */}
      <meta name="twitter:card" content={siteMetadata.twitter.card} />
      <meta name="twitter:site" content={siteMetadata.twitter.site} />
      <meta name="twitter:creator" content={siteMetadata.twitter.creator} />
      <meta name="twitter:title" content={siteMetadata.openGraph.title} />
      <meta name="twitter:description" content={siteMetadata.openGraph.description} />
      <meta name="twitter:image" content={`${siteMetadata.siteUrl}${ogImageUrl}`} />
      <meta name="twitter:image:alt" content={siteMetadata.openGraph.images[0].alt} />

      {/* Additional metadata */}
      <meta name="geo.region" content="PL" />
      <meta name="geo.placename" content="Elbląg" />
      <meta name="author" content={siteMetadata.company.name} />
      
      {/* JSON-LD structured data */}
      <script type="application/ld+json">
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Organization',
          name: siteMetadata.company.name,
          description: siteMetadata.description,
          url: siteMetadata.siteUrl,
          logo: `${siteMetadata.siteUrl}/logo.png`,
          image: `${siteMetadata.siteUrl}${ogImageUrl}`,
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
