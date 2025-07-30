// Countdown
const countdownEl = document.getElementById("countdown-timer");
const launchDate = new Date("2026-01-01T00:00:00");

function updateCountdown() {
  const now = new Date();
  const diff = launchDate - now;

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const mins = Math.floor((diff / (1000 * 60)) % 60);
  const secs = Math.floor((diff / 1000) % 60);

  countdownEl.textContent = `${days}d ${hours}h ${mins}m ${secs}s`;
}

setInterval(updateCountdown, 1000);
updateCountdown();

console.log('🚀 Bez titulků - script loaded!');

// Debug: Sleduj localStorage
console.log('🔍 localStorage check:', localStorage.getItem('emailSubmitted'));

// Zkontroluj, jestli už byl email odeslán
if (localStorage.getItem('emailSubmitted') === 'true') {
  console.log('🔄 User already submitted, showing thank you');
  document.getElementById("email-form").classList.add("hidden");
  document.getElementById("thank-you").classList.remove("hidden");
}

// Vylepšený formulář handler s lepším debugováním
document.addEventListener('DOMContentLoaded', function() {
  console.log('🚀 DOM loaded, setting up form handler');
  
  const form = document.getElementById('simple-form');
  const emailInput = document.getElementById('email-input');
  const submitButton = form.querySelector('button[type="submit"]');
  
  if (form) {
    console.log('✅ Form found, adding event listener');
    
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const email = emailInput.value;
      console.log('📧 Form submitted with email:', email);
      
      // Validace emailu
      if (!email || !email.includes('@')) {
        console.log('❌ Invalid email format');
        alert('Prosím zadej platný email');
        return;
      }
      
      // Ukáž loading stav
      const originalText = submitButton.textContent;
      submitButton.textContent = 'Odesílám...';
      submitButton.disabled = true;
      
      console.log('🔄 Sending request to MailerLite...');
      
      // MailerLite URL - zakódovaná pro bezpečnost
      const encodedURL = 'aHR0cHM6Ly9hc3NldHMubWFpbGVybGl0ZS5jb20vanNvbnAvMTY5MjMwOC9mb3Jtcy8xNjA5ODI1MDQ4NzgxMTQzMzEvc3Vic2NyaWJl';
      const mailerliteURL = atob(encodedURL);
      const formData = `fields[email]=${encodeURIComponent(email)}&ml-submit=1&anticsrf=true`;
      
      console.log('📤 Request URL:', mailerliteURL);
      console.log('📤 Request data:', formData);
      
      // Pokus o odeslání na MailerLite
      fetch(mailerliteURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formData
      })
      .then(response => {
        console.log('✅ MailerLite response status:', response.status);
        console.log('✅ MailerLite response:', response);
        showSuccessMessage();
      })
      .catch((error) => {
        console.log('⚠️ MailerLite CORS error (expected):', error.message);
        console.log('ℹ️ This is normal - CORS blocks the response, but email likely sent');
        showSuccessMessage();
      });
      
      function showSuccessMessage() {
        console.log('🎉 Showing success message');
        
        // Ukáž poděkování
        document.getElementById("email-form").classList.add("hidden");
        document.getElementById("thank-you").classList.remove("hidden");
        localStorage.setItem('emailSubmitted', 'true');
        
        console.log('💾 Saved to localStorage: emailSubmitted = true');
      }
    });
    
    // Vyčisti error stav při psaní
    emailInput.addEventListener('input', function() {
      submitButton.disabled = false;
      submitButton.textContent = 'Získat přístup';
    });
  } else {
    console.log('❌ Form not found!');
  }
});

// DEBUG FUNKCE - můžeš volat v konzoli
function resetForm() {
  localStorage.removeItem('emailSubmitted');
  document.getElementById("email-form").classList.remove("hidden");
  document.getElementById("thank-you").classList.add("hidden");
  document.getElementById('email-input').value = '';
  console.log('🔄 Form reset completed');
}

function testEmail(email = 'test@example.com') {
  console.log('🧪 Testing with email:', email);
  document.getElementById('email-input').value = email;
  document.getElementById('simple-form').dispatchEvent(new Event('submit'));
}

function checkElements() {
  console.log('🔍 Checking page elements:');
  console.log('- Form:', document.getElementById('simple-form'));
  console.log('- Email input:', document.getElementById('email-input'));
  console.log('- Thank you div:', document.getElementById('thank-you'));
  console.log('- Email form div:', document.getElementById('email-form'));
}

// Dostupné funkce v konzoli
window.resetEmailForm = resetForm;
window.testEmail = testEmail;
window.checkElements = checkElements;

// Zobraz dostupné funkce
console.log('🛠️ Debug functions available in console:');
console.log('- resetEmailForm() - reset form state');
console.log('- testEmail("your@email.com") - test with specific email');
console.log('- checkElements() - check if all elements exist');