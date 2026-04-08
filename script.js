// Phone number auto-format
const phoneInput = document.getElementById('phone');
phoneInput.addEventListener('input', (e) => {
  const digits = e.target.value.replace(/\D/g, '').slice(0, 10);
  let formatted = '';
  if (digits.length >= 1) formatted = '(' + digits.slice(0, 3);
  if (digits.length >= 4) formatted += ') ' + digits.slice(3, 6);
  if (digits.length >= 7) formatted += '-' + digits.slice(6, 10);
  e.target.value = formatted;
});

// Mobile menu
const toggle = document.querySelector('.nav-toggle');
const menu = document.getElementById('mobileMenu');
const closeBtn = document.getElementById('mobileClose');
const mobileLinks = document.querySelectorAll('.mobile-link');

toggle.addEventListener('click', () => menu.classList.add('open'));
closeBtn.addEventListener('click', () => menu.classList.remove('open'));
mobileLinks.forEach(link => link.addEventListener('click', () => menu.classList.remove('open')));

// Contact form success message
const form = document.querySelector('.contact-form');
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const btn = form.querySelector('button[type="submit"]');
  btn.textContent = 'Sending...';
  btn.disabled = true;

  try {
    const res = await fetch(form.action, {
      method: 'POST',
      body: new FormData(form),
      headers: { 'Accept': 'application/json' }
    });

    if (res.ok) {
      form.innerHTML = `
        <div style="text-align:center; padding: 40px 0;">
          <div style="font-size: 3rem; margin-bottom: 16px;">&#10003;</div>
          <h3 style="color: var(--green); margin-bottom: 8px;">Message Sent!</h3>
          <p style="color: var(--text-light);">Thanks for reaching out. We'll get back to you within one business day.</p>
        </div>`;
    } else {
      btn.textContent = 'Send Message';
      btn.disabled = false;
      alert('Something went wrong. Please email us directly at help@mydigitalaid.com');
    }
  } catch {
    btn.textContent = 'Send Message';
    btn.disabled = false;
    alert('Something went wrong. Please email us directly at help@mydigitalaid.com');
  }
});
