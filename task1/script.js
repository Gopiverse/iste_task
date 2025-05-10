const scriptURL = 'https://script.google.com/macros/s/AKfycbx841K3og90_83QhSiAR0492v2bPAnXBEVK7MIMTMNiRscqSpqKRfUq7xzXkpKUdUM/exec';
const form = document.forms['google-sheet'];

form.addEventListener('submit', e=>{
    e.preventDefault();
    fetch(scriptURL, {method:'POST', body:new FormData(form)}).then(response => alert("Thanks for contacting us!!")).catch(error => console.error('Error!', error.message))
});




