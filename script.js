const message = `Hai Levina...\nAku cuma mau bilang, selamat menempuh perjalanan baru di tempat PKL nanti ya. Aku tahu mungkin ada rasa deg-degan atau capek ke depannya, tapi aku yakin banget kamu bisa ngelewatin semuanya dengan hebat.\n\nJangan lupa jaga kesehatan, jangan terlalu diforsir, dan tetap jadi Levina yang selalu semangat.\n\nSemangat ya buat dunianya, dan semangat juga buat harimu!\n\nI'm always rooting for you.`;

const message2 = 'Oh iya..\n Ini sebagai balasan karna kamu menyemangati aku PKL hari itu dan tidak hanya satu momen itu saja, masih banyak lainnya.\n\n Nikmati juga rasa capek ketika PKL nanti, semoga lelahmu menjadi lillah, dan setiap usahamu berbuah barokah.\n\n tutup mata ketika malam tiba, buka mata ketika matahari menyapa. karna dunia kerja butuh kamu yang segar, bukan kelopak mata yang lebar\n';

// --- PRELOADER ---
window.addEventListener("load", () => {
  const loader = document.getElementById("loader-wrapper");
  const savedTheme = localStorage.getItem('user-theme');
  if (savedTheme) setTheme(savedTheme);

  if (loader) {
    setTimeout(() => {
      loader.style.opacity = "0";
      setTimeout(() => {
        loader.style.display = "none";
      }, 800);
    }, 1500);
  }
});

// --- THEME ENGINE ---
function setTheme(themeName) {
  document.documentElement.setAttribute('data-theme', themeName);
  localStorage.setItem('user-theme', themeName);
}

// --- ENVELOPE LOGIC ---
function openEnvelope() {
  const wrapper = document.getElementById('envelopeWrapper');
  const introText = document.getElementById("introText");
  
  wrapper.classList.add('open');
  if (introText) introText.style.opacity = "0";

  setTimeout(() => {
    wrapper.style.opacity = '0';
    setTimeout(() => {
      wrapper.style.display = 'none';
      if (introText) introText.style.display = "none";
      showLetter(); 
    }, 500);
  }, 1200);
}

// --- MAIN LETTER LOGIC ---
function showLetter() {
  const bgMusic = document.getElementById("bgMusic");
  const volIcon = document.getElementById("volumeToggle");
  const letterBox = document.getElementById("letterBox");
  
  if (volIcon) volIcon.style.display = "flex";
  letterBox.style.display = "block";

  // Fade-in Music
  bgMusic.volume = 0;
  bgMusic.play().catch(() => console.log("User interaction needed for audio"));
  
  let vol = 0;
  const fadeIn = setInterval(() => {
    if (vol < 0.6) {
      vol += 0.02;
      bgMusic.volume = Math.min(vol, 0.6);
    } else {
      clearInterval(fadeIn);
    }
  }, 150);

  // Start Typing Effect
  typeWriter(message, "typedText", () => {
    startFlowerFall();
    const signature = document.querySelector(".signature");
    if (signature) signature.style.opacity = "1";
    
    setTimeout(() => {
      const btnNext = document.getElementById("btnNext");
      if (btnNext) btnNext.style.display = "block";
    }, 2000);
  });
}

// --- REUSABLE TYPING ENGINE ---
function typeWriter(text, elementId, callback) {
  const element = document.getElementById(elementId);
  let i = 0;
  
  function typing() {
    if (i < text.length) {
      let char = text.charAt(i);
      element.innerHTML += (char === '\n') ? '<br>' : char;
      i++;

      // LOGIKA AUTO-SCROLL HALAMAN: Otomatis scroll layar ke bawah mengikuti teks
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: 'smooth'
      });

      let delay = 50;
      if (['.', '?', '!'].includes(char)) delay = 800;
      else if (char === ',') delay = 400;
      else if (char === ' ') delay = 30;

      setTimeout(typing, delay);
    } else if (callback) {
      callback();
    }
  }
  typing();
}

// --- SECOND LETTER LOGIC ---
function readSecondLetter() {
  const typedText = document.getElementById("typedText");
  const btnNext = document.getElementById("btnNext");
  const signature = document.querySelector(".signature");

  if (btnNext) btnNext.style.display = "none";
  if (signature) signature.style.opacity = "0";
  
  typedText.style.opacity = "0";
  
  setTimeout(() => {
    typedText.innerHTML = ""; 
    typedText.style.opacity = "1";
    
    typeWriter(message2, "typedText", () => {
      if (signature) signature.style.opacity = "1";
      addFloatingSticker();
    });
  }, 1000);
}

// --- EXTRAS ---
function addFloatingSticker() {
  const letter = document.getElementById("letterBox");
  const sticker = document.createElement("div");
  sticker.innerHTML = "✨💖✨😜";
  sticker.className = "floating-sticker"; // Tambahkan class untuk styling di CSS jika perlu
  sticker.style.cssText = "position:absolute; bottom:20px; left:30px; font-size:1.5rem; opacity:0; transition:opacity 2s ease;";
  letter.appendChild(sticker);
  setTimeout(() => sticker.style.opacity = "1", 500);
}

function toggleMute() {
    const bgMusic = document.getElementById("bgMusic");
    const volSymbol = document.getElementById("volSymbol");
    bgMusic.muted = !bgMusic.muted;
    volSymbol.innerText = bgMusic.muted ? "🔈" : "🔊";
}

function startFlowerFall() {
    const container = document.getElementById('flowerFallContainer');
    if (!container || container.childElementCount > 40) return; 
    
    for (let i = 0; i < 40; i++) {
        const petal = document.createElement('div');
        petal.classList.add('petal');
        petal.style.left = Math.random() * 100 + 'vw';
        const size = Math.random() * 10 + 8;
        petal.style.width = size + 'px';
        petal.style.height = size + 'px';
        petal.style.animationDuration = (Math.random() * 6 + 6) + 's'; 
        petal.style.animationDelay = (Math.random() * -10) + 's';
        const colors = ['#ffcccc', '#ffe0e6', '#ffb3c7'];
        petal.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        container.appendChild(petal);
    }
}