let contents = [];
const adminPassword = "dF?8Q2sopLZmn";  // Admin Password
const userPin = "2005";  // User PIN
let isAdmin = false;

function toggleUploadForm() {
    const form = document.getElementById('uploadForm');
    form.style.display = (form.style.display === 'none') ? 'block' : 'none';
}

function uploadContent() {
    const fileInput = document.getElementById('fileInput');
    const contentType = document.getElementById('contentType').value;
    const files = fileInput.files;

    if (files.length > 0 && contentType) {
        for (let i = 0; i < files.length; i++) {
            const reader = new FileReader();
            reader.onload = function(event) {
                const newContent = {
                    name: files[i].name,
                    type: contentType,
                    content: event.target.result,
                };
                contents.push(newContent);
                displayContent();
            };
            reader.readAsDataURL(files[i]);
        }
    } else {
        alert('Please select a file and specify the content type.');
    }
}

function displayContent() {
    const contentDiv = document.getElementById('content');
    contentDiv.innerHTML = '';
    contents.forEach(item => {
        const contentItem = document.createElement('div');
        contentItem.innerHTML = `<h4>${item.name} (${item.type})</h4>
                                  <a href="${item.content}" target="_blank">View</a>`;
        contentDiv.appendChild(contentItem);
    });
}

// Handle login (admin or user)
function openLogin(type) {
    document.getElementById('loginTitle').innerText = `${type === 'admin' ? 'Admin' : 'User'} Login`;
    document.getElementById('loginModal').style.display = 'block';
    window.loginType = type;
}

function closeModal() {
    document.getElementById('loginModal').style.display = 'none';
}

function validateLogin() {
    const password = document.getElementById('loginPassword').value;
    if (loginType === 'admin' && password === adminPassword) {
        isAdmin = true;
        alert("Admin login successful!");
        closeModal();
        document.getElementById('dashboard').style.display = 'block';
    } else if (loginType === 'user' && password === userPin) {
        alert("User login successful!");
        closeModal();
        displayContent();  // Users can only view content
    } else {
        alert("Incorrect password or PIN.");
    }
}