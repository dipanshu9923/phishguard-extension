chrome.runtime.sendMessage({ action: "predict_phishing", url: window.location.href }, (response) => {
  console.log("Prediction received in content.js:", response);
  if (response && response.prediction === 1) { // Assuming 1 indicates phishing
    const banner = document.createElement("div");
    banner.innerText = "⚠️ Warning: This site may be a phishing attempt.";
    banner.style.position = "fixed";
    banner.style.top = "0";
    banner.style.left = "0";
    banner.style.width = "100%";
    banner.style.backgroundColor = "red";
    banner.style.color = "white";
    banner.style.fontSize = "18px";
    banner.style.textAlign = "center";
    banner.style.zIndex = "9999";
    banner.style.padding = "10px";
    document.body.prepend(banner);
  }
});
