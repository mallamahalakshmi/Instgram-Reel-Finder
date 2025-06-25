setTimeout(() => {
  const urlParts = window.location.href.split('/');
  const reelId = urlParts[4]; // e.g., C2ZyCkGpwYZ

  sessionStorage.setItem("targetReelId", reelId); // 🔴 Save it

  const anchor = document.querySelector('a[href^="/"][role="link"]');
  if (anchor) {
    const username = anchor.getAttribute('href').split('/')[1];
    if (username) {
      window.location.href = `https://www.instagram.com/${username}/`;
    }
  } else {
    alert("Could not find username on this reel.");
  }
}, 2000);
