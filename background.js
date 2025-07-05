// Listen for messages from popup.js
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "predict_phishing") {
    console.log("🌐 Received URL from popup:", request.url);

    fetchPhishingPrediction(request.url)
      .then(result => {
        console.log("✅ Prediction result:", result);
        sendResponse(result);
      })
      .catch(error => {
        console.error("❌ Error in prediction:", error);
        sendResponse({ error: error.message });
      });

    return true; // Keeps response channel open for async response
  }
});

// Extract basic features from the URL
function extractURLFeatures(url) {
  const urlObj = new URL(url);

  return {
    url_length: url.length,
    num_dots: (url.match(/\./g) || []).length,
    num_hyphens: (url.match(/-/g) || []).length,
    num_underscores: (url.match(/_/g) || []).length,
    num_slashes: (url.match(/\//g) || []).length,
    has_https: urlObj.protocol === 'https:',
    domain_length: urlObj.hostname.length,
    path_length: urlObj.pathname.length,
    num_subdomains: urlObj.hostname.split('.').length - 2
  };
}


function generateFullFeatureVector(features) {
  const vector = new Array(30).fill(0); 

  // Populate vector using basic heuristics
  vector[0] = 1; // Placeholder
  vector[1] = features.url_length > 75 ? 1 : -1;
  vector[2] = features.url_length < 20 ? 1 : -1;
  vector[3] = features.num_dots > 5 ? 1 : -1;
  vector[4] = features.num_hyphens > 3 ? 1 : -1;
  vector[5] = features.num_underscores > 2 ? 1 : -1;
  vector[6] = features.path_length > 40 ? 1 : -1;
  vector[7] = features.num_subdomains > 2 ? 1 : -1;
  vector[8] = features.has_https ? 1 : -1;
  vector[9] = features.num_slashes > 5 ? 1 : -1;
  vector[10] = features.domain_length > 30 ? 1 : -1;

  
  for (let i = 11; i < 30; i++) {
    vector[i] = 0;
  }

  return vector;
}

// Send POST request to Flask backend
async function fetchPhishingPrediction(url) {
  console.log("🔍 Analyzing URL:", url);

  const features = extractURLFeatures(url);
  const featureVector = generateFullFeatureVector(features);

  console.log("📦 Sending features:", featureVector);

  try {
    const response = await fetch("http://127.0.0.1:5000/predict", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ features: featureVector })
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    return {
      url: url,
      prediction: data.prediction,
      features: featureVector
    };
  } catch (error) {
    console.error("❌ Prediction failed:", error);
    return { error: "Could not connect to backend or invalid response" };
  }
}
