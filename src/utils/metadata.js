/**
 * Metadata utility for managing page metadata
 * This utility provides functions to set page metadata dynamically
 */

/**
 * Updates the document metadata (title, description, etc.)
 * @param {Object} metadata - The metadata to set
 * @param {string} metadata.title - The page title
 * @param {string} metadata.description - The page description
 * @param {string} metadata.keywords - The page keywords
 * @param {string} metadata.ogTitle - The Open Graph title
 * @param {string} metadata.ogDescription - The Open Graph description
 * @param {string} metadata.ogImage - The Open Graph image URL
 * @param {string} metadata.ogUrl - The Open Graph URL
 */
export const setMetadata = ({
  title = 'WebPres',
  description = 'Professional web development and design services',
  keywords = 'web development, design, services',
  ogTitle,
  ogDescription,
  ogImage = '/logo.png', // Default OG image
  ogUrl,
}) => {
  // Set document title
  document.title = title;
  
  // Update or create meta tags
  updateMetaTag('description', description);
  updateMetaTag('keywords', keywords);
  
  // Open Graph meta tags
  updateMetaTag('og:title', ogTitle || title);
  updateMetaTag('og:description', ogDescription || description);
  updateMetaTag('og:image', ogImage);
  updateMetaTag('og:url', ogUrl || window.location.href);
  
  // Twitter Card meta tags
  updateMetaTag('twitter:card', 'summary_large_image');
  updateMetaTag('twitter:title', ogTitle || title);
  updateMetaTag('twitter:description', ogDescription || description);
  updateMetaTag('twitter:image', ogImage);
};

/**
 * Helper function to update or create meta tags
 * @param {string} name - The meta tag name or property
 * @param {string} content - The content value
 */
const updateMetaTag = (name, content) => {
  if (!content) return;
  
  // Check if the meta tag is using name or property attribute
  const isProperty = name.startsWith('og:') || name.startsWith('twitter:');
  const selector = isProperty 
    ? `meta[property="${name}"]` 
    : `meta[name="${name}"]`;
  
  let meta = document.querySelector(selector);
  
  // Create meta tag if it doesn't exist
  if (!meta) {
    meta = document.createElement('meta');
    if (isProperty) {
      meta.setAttribute('property', name);
    } else {
      meta.setAttribute('name', name);
    }
    document.head.appendChild(meta);
  }
  
  // Set content
  meta.setAttribute('content', content);
};

/**
 * Predefined metadata for common pages
 */
export const pageMetadata = {
  home: {
    title: 'WebPres',
    description: 'WebPres offers professional web development and design services to help your business succeed online.',
    keywords: 'web development, web design, professional websites, online presence',
  },
  about: {
    title: 'WebPres - About Us',
    description: 'Learn about WebPres and our mission to provide exceptional web development services.',
    keywords: 'about webpres, web development team, our mission',
  },
  services: {
    title: 'WebPres - Services',
    description: 'Explore our range of web development and design services tailored to meet your business needs.',
    keywords: 'web services, development services, design services, professional websites',
  },
  contact: {
    title: 'WebPres - Contact Us',
    description: 'Get in touch with WebPres for professional web development and design services.',
    keywords: 'contact webpres, get in touch, web development inquiry',
  },
  notFound: {
    title: '404 - Page Not Found',
    description: 'The page you are looking for does not exist.',
    keywords: '404, page not found, error',
  },
};

/**
 * Generate metadata for a service detail page
 * @param {Object} service - The service object
 * @returns {Object} The metadata object
 */
export const generateServiceMetadata = (service) => {
  if (!service) return pageMetadata.notFound;
  
  return {
    title: `WebPres - ${service.title}`,
    description: service.description || service.tagline || `Learn about our ${service.title} service.`,
    keywords: `${service.title.toLowerCase()}, web services, ${service.keywords || ''}`,
    ogTitle: `WebPres - ${service.title}`,
    ogDescription: service.description || service.tagline,
    ogImage: service.image || '/logo.png',
  };
};
