// script.js
const TOTAL = 7;
let actual = 0;

// Crear estrellas
const cont = document.getElementById('estrellas');
const emojis = ['⭐','✨','💫','🌟'];
for(let i = 0; i < 20; i++) {
  const e = document.createElement('div');
  e.className = 'estrella';
  e.textContent = emojis[Math.floor(Math.random()*emojis.length)];
  e.style.left = Math.random()*100 + 'vw';
  e.style.animationDuration = (8 + Math.random()*12) + 's';
  e.style.animationDelay = (Math.random()*10) + 's';
  e.style.fontSize = (0.8 + Math.random()*1.2) + 'rem';
  cont.appendChild(e);
}

// Crear puntos de progreso
const progreso = document.getElementById('progreso');
for(let i = 0; i < TOTAL; i++) {
  const p = document.createElement('div');
  p.className = 'punto' + (i===0 ? ' activo' : '');
  p.id = 'punto-' + i;
  progreso.appendChild(p);
}

function irA(n) {
  document.getElementById('slide-' + actual).classList.remove('active');
  document.getElementById('punto-' + actual).classList.remove('activo');
  actual = n;
  document.getElementById('slide-' + actual).classList.add('active');
  document.getElementById('punto-' + actual).classList.add('activo');
  actualizarBotones();
  
  // Scroll al inicio del slide cuando se cambia (opcional)
  const slideElement = document.getElementById('slide-' + actual);
  if(slideElement) {
    slideElement.scrollTop = 0;
  }
}

function siguiente() {
  if(actual < TOTAL-1) irA(actual+1);
}

function anterior() {
  if(actual > 0) irA(actual-1);
}

function actualizarBotones() {
  document.getElementById('btnAnterior').style.display = actual > 0 ? 'flex' : 'none';
  document.getElementById('btnInicio').style.display = actual > 0 ? 'flex' : 'none';
  const btnSig = document.getElementById('btnSiguiente');
  if(actual === TOTAL-1) {
    btnSig.textContent = '🔄 Ver de nuevo';
    btnSig.onclick = () => irA(0);
  } else {
    btnSig.innerHTML = 'Siguiente →';
    btnSig.onclick = siguiente;
  }
}

// Eventos de teclado
document.addEventListener('keydown', e => {
  if(e.key === 'ArrowRight') siguiente();
  if(e.key === 'ArrowLeft') anterior();
});

// También permitir swipe en móvil (opcional)
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', e => {
  touchStartX = e.changedTouches[0].screenX;
});

document.addEventListener('touchend', e => {
  touchEndX = e.changedTouches[0].screenX;
  const swipeDistance = touchEndX - touchStartX;
  if (Math.abs(swipeDistance) > 50) {
    if (swipeDistance > 0) {
      anterior();
    } else {
      siguiente();
    }
  }
});

// Asignar eventos a los botones después de que existan en el DOM
document.getElementById('btnSiguiente').onclick = siguiente;
document.getElementById('btnAnterior').onclick = anterior;
document.getElementById('btnInicio').onclick = () => irA(0);