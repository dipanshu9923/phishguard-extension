
# 🛡️ PhishGuard - Chrome Extension for Phishing Website Detection

PhishGuard is a lightweight Chrome extension that uses a machine learning model (via a Flask backend) to detect and warn users about potentially phishing websites in real time.

---

## 🚀 Features

- ✅ Detects phishing websites based on URL structure and heuristics.
- 🔍 Sends extracted features to a backend model for prediction.
- ⚠️ Displays a warning banner on suspicious sites.
- 🖱️ Simple UI with a one-click "Scan Website" button.
- 🌐 Works on all websites via `<all_urls>` permission.

---

## 📁 Project Structure

```
phishguard-extension/
├── background.js       # Handles feature extraction and prediction API request
├── content.js          # Displays warning banner on phishing sites
├── popup.js            # Connects UI to prediction logic
├── popup.html          # HTML layout of the extension popup
├── popup.css           # Styling for the popup UI
├── manifest.json       # Chrome extension configuration
```

---

## 📦 How It Works

1. **User clicks "Scan Website"** in the popup.
2. The extension extracts 30 URL-based features using `background.js`.
3. These features are sent to a **Flask backend** for prediction.
4. The backend returns `1` (Phishing) or `0` (Legitimate).
5. Based on the result:
   - The popup displays the status.
   - If phishing is detected, a **red warning banner** appears on the page.

---

## 🔧 Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/phishguard-extension.git
cd phishguard-extension
```

### 2. Run the Flask Backend

> The extension relies on a Flask backend with a pre-trained ML model.

Example Flask app should expose:

```
POST /predict
{
  "features": [30-feature array]
}
```

### 3. Load the Extension in Chrome

1. Open `chrome://extensions/`
2. Enable **Developer Mode**
3. Click **Load Unpacked**
4. Select the extension folder

---

## 🧠 Technologies Used

- **JavaScript** (Vanilla) – Chrome extension logic
- **HTML/CSS** – UI design
- **Flask** – Python backend for ML prediction
- **Machine Learning** – URL feature-based Random Forest model

---

## 📌 Permissions

- `activeTab`
- `scripting`
- `storage`
- `<all_urls>` for monitoring all page URLs

---




---

## 🛠️ TODO

- Add more advanced URL analysis features
- Host Flask backend on a remote server
- Package and publish on Chrome Web Store

---

---

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

---

## 👨‍💻 Author

**Dipanshu Sharma**  
B.E. Computer Science (AI & ML)  
Chandigarh University
