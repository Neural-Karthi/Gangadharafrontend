import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'course';
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  section?: string;
  tags?: string[];
}

const SEO: React.FC<SEOProps> = ({
  title = "Gangadhar Nagarjuna's Business Academy - Transform Your Business with Expert Training",
  description = "Join 400,000+ successful entrepreneurs. Learn startup strategies, digital business growth, and AI-powered income methods. Special offer: ₹299 only! Expert-led workshops and premium courses.",
  keywords = "business academy, startup training, digital business, entrepreneurship, AI income, business coaching, online workshops, business strategy, digital marketing, business growth",
  image = "https://yourdomain.com/og-image.jpg",
  url = "https://yourdomain.com",
  type = "website",
  author = "Gangadhar Nagarjuna",
  publishedTime,
  modifiedTime,
  section,
  tags = []
}) => {
  const siteName = "Gangadhar Nagarjuna's Business Academy";
  const twitterHandle = "@gangadharnagarjuna";

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={url} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:locale" content="en_US" />
      
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />
      <meta property="twitter:creator" content={twitterHandle} />
      
      {/* Additional Meta Tags */}
      {publishedTime && <meta property="article:published_time" content={publishedTime} />}
      {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}
      {section && <meta property="article:section" content={section} />}
      {tags.length > 0 && tags.map((tag, index) => (
        <meta key={index} property="article:tag" content={tag} />
      ))}
      
      {/* Structured Data for Articles */}
      {type === 'article' && (
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": title,
            "description": description,
            "image": image,
            "author": {
              "@type": "Person",
              "name": author
            },
            "publisher": {
              "@type": "Organization",
              "name": siteName,
              "logo": {
                "@type": "ImageObject",
                "url": "https://yourdomain.com/logo.png"
              }
            },
            "datePublished": publishedTime,
            "dateModified": modifiedTime || publishedTime,
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": url
            }
          })}
        </script>
      )}
      
      {/* Structured Data for Courses */}
      {type === 'course' && (
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Course",
            "name": title,
            "description": description,
            "provider": {
              "@type": "Organization",
              "name": siteName,
              "sameAs": "https://yourdomain.com"
            },
            "offers": {
              "@type": "Offer",
              "price": "299",
              "priceCurrency": "INR",
              "availability": "https://schema.org/InStock"
            },
            "courseMode": "online",
            "educationalLevel": "beginner",
            "inLanguage": "en"
          })}
        </script>
      )}
    </Helmet>
  );
};

export default SEO; 