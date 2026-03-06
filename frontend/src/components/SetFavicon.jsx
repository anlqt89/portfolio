import { useEffect } from 'react';

export const useFavicon = (title) => {
    const iconName = "AL-icon"
  useEffect(() => {
    // 1. Store original values to restore them later
    const prevTitle = document.title;
    const link = document.querySelector("link[rel~='icon']");
    const prevIcon = link ? link.href : '/favicon.svg';

    // 2. Apply the new Title and Icon
    document.title = title;
    if (link) {
      // Points to public/iconName.png
      link.href = `/${iconName}.png`; 
    }

    // 3. Cleanup: This runs when the component UNMOUNTS
    return () => {
      document.title = prevTitle;
      if (link) link.href = prevIcon;
    };
  }, [title, iconName]); // Re-run if these change
};