import { useEffect } from 'react';

const SITE_URL = 'https://www.samyfel.com';

const setMetaByName = (name, content) => {
    let el = document.querySelector(`meta[name="${name}"]`);
    if (!el) {
        el = document.createElement('meta');
        el.setAttribute('name', name);
        document.head.appendChild(el);
    }
    el.setAttribute('content', content);
};

const setMetaByProperty = (property, content) => {
    let el = document.querySelector(`meta[property="${property}"]`);
    if (!el) {
        el = document.createElement('meta');
        el.setAttribute('property', property);
        document.head.appendChild(el);
    }
    el.setAttribute('content', content);
};

const setCanonical = (href) => {
    let el = document.querySelector('link[rel="canonical"]');
    if (!el) {
        el = document.createElement('link');
        el.setAttribute('rel', 'canonical');
        document.head.appendChild(el);
    }
    el.setAttribute('href', href);
};

// Keeps <title>/description/canonical/OG tags in sync with the current route.
// This is a client-rendered SPA with no SSR, so index.html's static tags only
// cover the "/" bots that skip JS ever see — this covers the rest for Googlebot
// and anyone browsing with JS enabled.
const PageMeta = ({ title, description, path = '/', noindex = false }) => {
    useEffect(() => {
        if (title) {
            document.title = title;
            setMetaByProperty('og:title', title);
            setMetaByName('twitter:title', title);
        }
        if (description) {
            setMetaByName('description', description);
            setMetaByProperty('og:description', description);
            setMetaByName('twitter:description', description);
        }

        const url = `${SITE_URL}${path}`;
        setCanonical(url);
        setMetaByProperty('og:url', url);

        setMetaByName('robots', noindex ? 'noindex, nofollow' : 'index, follow');
    }, [title, description, path, noindex]);

    return null;
};

export default PageMeta;
