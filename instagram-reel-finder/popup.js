document.getElementById('findBtn').addEventListener('click', () => {
  const reelUrl = document.getElementById('reelUrl').value;

  if (!reelUrl.includes("instagram.com/reel/")) {
    alert("Please enter a valid Instagram Reel URL.");
    return;
  }

  // Open the reel in a new tab
  chrome.tabs.create({ url: reelUrl }, (tab) => {
    // After short delay, inject content script
    setTimeout(() => {
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        files: ['content.js']
      });
    }, 2000); // Give page time to load
  });
});
