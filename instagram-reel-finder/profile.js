const reelId = sessionStorage.getItem("targetReelId");

if (!reelId) {
  console.warn("No target reel ID found.");
} else {
  let scrollAttempts = 0;
  const maxAttempts = 30;

  const scrollAndHighlight = setInterval(() => {
    const reelLinks = document.querySelectorAll('a[href*="/reel/"]');

    for (const link of reelLinks) {
      if (link.href.includes(reelId)) {
        link.scrollIntoView({ behavior: "smooth", block: "center" });

        // Create dim background
       
        // Inject styles
        const style = document.createElement("style");
        style.textContent = `
          .reel-highlight {
            position: relative !important;
            z-index: 9999 !important;
            border: 6px solid #00f !important;
            border-radius: 12px !important;
            animation: blinkGlow 1s infinite, zoomPop 0.3s ease-in-out 3;
            box-shadow: 0 0 30px 15px rgba(0, 174, 255, 0.9) !important;
          }

          @keyframes blinkGlow {
            0%, 100% { box-shadow: 0 0 30px 15px rgba(0, 174, 255, 0.9); }
            50% { box-shadow: 0 0 5px 2px rgba(0, 174, 255, 0.3); }
          }

          @keyframes zoomPop {
            0%   { transform: scale(1); }
            50%  { transform: scale(1.08); }
            100% { transform: scale(1); }
          }
        `;
        document.head.appendChild(style);

        // Find the thumbnail container inside the link
        const reelContainer = link.querySelector("div, img, video");
        if (reelContainer) {
          reelContainer.classList.add("reel-highlight");
        } else {
          // fallback if no thumbnail container found
          link.classList.add("reel-highlight");
        }

        clearInterval(scrollAndHighlight);
        sessionStorage.removeItem("targetReelId");
        return;
      }
    }

    window.scrollBy(0, 1000);
    scrollAttempts++;

    if (scrollAttempts > maxAttempts) {
      console.warn("❌ Reel not found after scrolling.");
      clearInterval(scrollAndHighlight);
    }
  }, 1200);
}
