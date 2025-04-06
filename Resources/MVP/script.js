// Webcam Access
const video = document.getElementById('video');
const captureBtn = document.getElementById('captureBtn');
const canvas = document.getElementById('snapshot');
const ctx = canvas.getContext('2d');

// Initialize Webcam
navigator.mediaDevices.getUserMedia({ video: true })
    .then(stream => {
        video.srcObject = stream;
    })
    .catch(err => {
        console.error("Error accessing webcam:", err);
        document.getElementById('errorMessage').textContent = 
            "Error accessing webcam. Please enable camera permissions.";
    });

// Capture Photo Handler
captureBtn.addEventListener('click', () => {
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    // Add face recognition API integration here
});

// Form Submission Handler
document.getElementById('registrationForm').addEventListener('submit', (e) => {
    e.preventDefault();
    
    const age = parseInt(document.getElementById('age').value);
    const aadhaar = document.getElementById('aadhaar').value;
    const errorMessage = document.getElementById('errorMessage');

    // Validation Checks
    if (age < 18) {
        errorMessage.textContent = "You must be at least 18 years old to register.";
        return;
    }

    if (!/^\d{12}$/.test(aadhaar)) {
        errorMessage.textContent = "Invalid Aadhaar number. Must be 12 digits.";
        return;
    }

    if (canvas.toDataURL() === document.createElement('canvas').toDataURL()) {
        errorMessage.textContent = "Please capture your photo before submitting.";
        return;
    }

    // Submit Logic
    errorMessage.textContent = "";
    alert("Registration submitted successfully! (This is a demo)");
    
    // Reset Form
    e.target.reset();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
});