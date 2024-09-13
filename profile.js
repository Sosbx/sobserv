let isDrawing = false;
let context;
let canvas;

document.addEventListener('DOMContentLoaded', function() {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const profileForm = document.getElementById('profileForm');
    const notConnected = document.getElementById('notConnected');

    if (userInfo) {
        profileForm.style.display = 'block';
        document.getElementById('name').value = userInfo.name;
        document.getElementById('email').value = userInfo.email;

        // Charger les données sauvegardées si elles existent
        const savedProfile = JSON.parse(localStorage.getItem('userProfile'));
        if (savedProfile) {
            document.getElementById('rpps').value = savedProfile.rpps || '';
            document.getElementById('adeli').value = savedProfile.adeli || '';
            document.getElementById('address').value = savedProfile.address || '';
        }

        // Initialiser le canvas pour la signature
        canvas = document.getElementById('signatureCanvas');
        context = canvas.getContext('2d');

        // Charger la signature sauvegardée si elle existe
        if (savedProfile && savedProfile.signature) {
            const img = new Image();
            img.onload = function() {
                context.drawImage(img, 0, 0);
            }
            img.src = savedProfile.signature;
        }

        // Gestion des événements pour desktop et mobile
        canvas.addEventListener('mousedown', startDrawing);
        canvas.addEventListener('mousemove', draw);
        canvas.addEventListener('mouseup', stopDrawing);
        canvas.addEventListener('mouseout', stopDrawing);

        canvas.addEventListener('touchstart', startDrawing);
        canvas.addEventListener('touchmove', draw);
        canvas.addEventListener('touchend', stopDrawing);

        document.getElementById('clearSignature').addEventListener('click', clearSignature);

        document.getElementById('userProfileForm').addEventListener('submit', function(e) {
            e.preventDefault();
            saveProfile();
        });
    } else {
        notConnected.style.display = 'block';
    }

    // Assurez-vous que cette fonction est définie dans votre fichier JavaScript principal
    if (typeof updateAuthButton === 'function') {
        updateAuthButton();
    }
});

function startDrawing(e) {
    isDrawing = true;
    draw(e);
}

function draw(e) {
    if (!isDrawing) return;

    e.preventDefault();

    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    let x, y;

    if (e.type === 'mousemove') {
        x = (e.clientX - rect.left) * scaleX;
        y = (e.clientY - rect.top) * scaleY;
    } else if (e.type === 'touchmove') {
        x = (e.touches[0].clientX - rect.left) * scaleX;
        y = (e.touches[0].clientY - rect.top) * scaleY;
    }

    context.lineWidth = 2;
    context.lineCap = 'round';
    context.strokeStyle = '#000';

    context.lineTo(x, y);
    context.stroke();
    context.beginPath();
    context.moveTo(x, y);
}

function stopDrawing() {
    isDrawing = false;
    context.beginPath();
}

function clearSignature() {
    context.clearRect(0, 0, canvas.width, canvas.height);
}

function saveProfile() {
    const profile = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        rpps: document.getElementById('rpps').value,
        adeli: document.getElementById('adeli').value,
        address: document.getElementById('address').value,
        signature: canvas.toDataURL()
    };

    localStorage.setItem('userProfile', JSON.stringify(profile));
    alert('Profil enregistré avec succès!');
}