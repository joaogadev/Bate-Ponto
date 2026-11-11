const timeElement = document.getElementById('current-time');
const dateElement = document.getElementById('current-date');
const yearElement = document.getElementById('current-year');

const dateFormatter = new Intl.DateTimeFormat('pt-BR', {
    weekday: 'long', day: '2-digit', month: 'long'
});

function updateClock() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    timeElement.innerHTML = `${hours}:${minutes}<span>:${seconds}</span>`;
    timeElement.dateTime = now.toISOString();
    dateElement.textContent = dateFormatter.format(now);
    yearElement.textContent = now.getFullYear();
}

updateClock();
setInterval(updateClock, 1000);

document.querySelectorAll('.action-button').forEach((button) => {
    button.addEventListener('click', (event) => {
        const rect = button.getBoundingClientRect();
        const ripple = document.createElement('span');
        ripple.className = 'ripple';
        ripple.style.left = `${event.clientX ? event.clientX - rect.left : rect.width / 2}px`;
        ripple.style.top = `${event.clientY ? event.clientY - rect.top : rect.height / 2}px`;
        button.appendChild(ripple);
        ripple.addEventListener('animationend', () => ripple.remove(), { once: true });

        button.classList.add('is-pressed');
        window.setTimeout(() => button.classList.remove('is-pressed'), 180);
    });
});
