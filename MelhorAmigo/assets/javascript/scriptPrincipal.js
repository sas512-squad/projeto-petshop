document.getElementById('myForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const email = event.target.email.value;

    fetch('/index', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email }),
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
    })
    .catch(error => {
        alert('Erro ao cadastrar. Tente novamente.');
    });
});

document.addEventListener('DOMContentLoaded', function() {
	if ('AOS' in window) {
		AOS.init();
	}
}, false);

// Botão Flutuante - Whatsapp //

window.addEventListener('scroll', function() {
    const whatsappButton = document.querySelector('.whatsapp-button');
    const width = this.window.innerWidth
    if (window.scrollY > 250) {
        whatsappButton.style.visibility = 'visible';
    } else {
        whatsappButton.style.visibility = 'hidden';
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const whatsappButton = document.querySelector('.whatsapp-button');
    whatsappButton.style.visibility = 'hidden';
});   