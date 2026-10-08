const messageInput = document.getElementById("message");
const scanButton = document.getElementById("scanButton");
const clearButton = document.getElementById("clearButton");

const characterCount = document.getElementById("characterCount");

const loading = document.getElementById("loading");
const result = document.getElementById("result");

const verdict = document.getElementById("verdict");
const riskScore = document.getElementById("riskScore");
const riskBar = document.getElementById("riskBar");

const category = document.getElementById("category");
const reasons = document.getElementById("reasons");
const recommendation = document.getElementById("recommendation");


// ===============================
// CHARACTER COUNTER
// ===============================

messageInput.addEventListener("input", () => {
    const count = messageInput.value.length;

    characterCount.textContent = `${count} characters`;
});


// ===============================
// CLEAR BUTTON
// ===============================

clearButton.addEventListener("click", () => {

    messageInput.value = "";

    characterCount.textContent = "0 characters";

    result.classList.add("hidden");

});


// ===============================
// SCAN MESSAGE
// ===============================

scanButton.addEventListener("click", async () => {

    const message = messageInput.value.trim();

    if (!message) {
        alert("Please enter a message to scan.");
        return;
    }


    // Show loading
    result.classList.add("hidden");
    loading.classList.remove("hidden");

    scanButton.disabled = true;
    scanButton.textContent = "🔄 Analyzing...";


    try {

        /*
         * TEMPORARY DEMO RESULT
         *
         * Later this will be replaced with:
         *
         * POST /api/analyze
         *
         * The backend will send the message
         * to Gemini AI and return the real analysis.
         */

        await new Promise(resolve => setTimeout(resolve, 1500));


        const demoResult = {

            verdict: "LIKELY SCAM",

            riskScore: 94,

            category: "Phishing / Financial Scam",

            reasons: [

                "Creates urgency and pressures the recipient to act immediately.",

                "Requests potentially sensitive information or action.",

                "Contains language commonly associated with impersonation scams.",

                "Attempts to create fear or excitement to influence the user's decision."

            ],

            recommendation:
                "Do not click suspicious links or provide passwords, OTPs, PINs, or banking information. Verify the request through the organization's official website or app."

        };


        displayResult(demoResult);


    } catch (error) {

        console.error("Scan error:", error);

        alert("Something went wrong while analyzing the message.");

    } finally {

        loading.classList.add("hidden");

        scanButton.disabled = false;

        scanButton.innerHTML = "🔍 Scan for Scam";

    }

});


// ===============================
// DISPLAY RESULT
// ===============================

function displayResult(data) {

    result.classList.remove("hidden");


    // Verdict
    verdict.textContent = data.verdict;


    // Risk score
    riskScore.textContent = `${data.riskScore}%`;


    // Risk bar
    riskBar.style.width = `${data.riskScore}%`;


    // Category
    category.textContent = data.category;


    // Clear old reasons
    reasons.innerHTML = "";


    // Add reasons
    data.reasons.forEach((reason, index) => {

        const div = document.createElement("div");

        div.className = "reason";

        div.innerHTML = `
            <strong>⚠️ ${index + 1}.</strong>
            ${escapeHTML(reason)}
        `;

        reasons.appendChild(div);

    });


    // Safety recommendation
    recommendation.textContent = data.recommendation;

}


// ===============================
// HTML SECURITY
// ===============================

function escapeHTML(text) {

    const div = document.createElement("div");

    div.textContent = text;

    return div.innerHTML;

}
