document.getElementById("checkBtn").addEventListener("click", () => {
  const currentUrl = window.location.href;

  chrome.runtime.sendMessage(
    { action: "predict_phishing", url: currentUrl },
    (response) => {
      if (chrome.runtime.lastError) {
        console.error("Runtime error:", chrome.runtime.lastError.message);
        return;
      }

      if (!response) {
        console.error("No response.");
        return;
      }

      // Display the prediction result
      const statusMessage = document.getElementById("statusMessage");
      if (response.error) {
        statusMessage.innerText = `Error: ${response.error}`;
      } else {
        statusMessage.innerText = `Prediction: ${response.prediction === 1 ? "Phishing" : "Legitimate"}`;
      }
    }
  );
});
