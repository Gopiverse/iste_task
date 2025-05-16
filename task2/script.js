
const fileInput = document.getElementById('filename');
const formDetails = document.getElementById('myForm');
const clearButton = document.getElementById('clearButton');

clearButton.addEventListener('click', (e) => {
    e.preventDefault();
    console.log("Clear button clicked.");
    formDetails.reset();
    document.getElementById("data").innerHTML = '';
});

// Convert file to base64 encoded string for sending to backend
fileInput.addEventListener('change', function () {
    const file = this.files[0];
    console.log("File selected:", file);

    const reader = new FileReader();
    reader.fileName = file.name;
    
    reader.onload = function (e) {
    console.log("File read successfully.");
    
    const fileData = e.target.result.replace(/^.*,/, ''); 
    console.log("File Data:", fileData);
    
    const mimeType = e.target.result.match(/^.*(?=;)/)[0];
    console.log("MIME Type:", mimeType);
    
    const fileName = e.target.fileName;
    console.log("File Name:", fileName);
    
    const html = `
    <input type="hidden" name="fileData" value="${fileData}">
    <input type="hidden" name="mimeType" value="${mimeType}">
    <input type="hidden" name="fileName" value="${fileName}">
    `;
    document.getElementById("data").innerHTML = html;
};

reader.readAsDataURL(file);
});

document.getElementById('formDataBtn').addEventListener('click', () => {
window.open('display.html', '_blank');
});


document.getElementById('formDataBtn').addEventListener('click', () => {
const sheet = document.getElementById('sheetView');
sheet.style.display = sheet.style.display === 'none' ? 'block' : 'none';
});

// After clicking submit, send the form data to the Apps Script backend
const form = document.forms['google-sheet'];
form.addEventListener('submit', (e) => {
e.preventDefault();
console.log("Form submitted. Sending data to backend...");

const formData = new FormData(form);
for (let [key, value] of formData.entries()) {
console.log(`${key}: ${value}`);
}

fetch(form.action, { 
method: 'POST', 
body: formData
})
.then(response => {
return response.text();
})
.then(data => {
alert("Thanks for contacting us!!");
})  
.catch(error => {
console.error("Error in form submission:", error.message);
});
});
