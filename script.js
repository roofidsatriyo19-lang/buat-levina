// Menggunakan 'let' agar isi pesan bisa diubah oleh fungsi saveName
let message = `Hai Levina...\nAku cuma mau bilang, selamat menempuh perjalanan baru di tempat PKL nanti ya. Aku tahu mungkin ada rasa deg-degan atau capek ke depannya, tapi aku yakin banget kamu bisa ngelewatin semuanya dengan hebat.\n\nJangan lupa jaga kesehatan, jangan terlalu diforsir, dan tetap jadi Levina yang selalu semangat.\n\nSemangat ya buat dunianya, dan semangat juga buat harimu!\n\nI'm always rooting for you.`;

let message2 = 'Oh iya..\n\nIni sebagai balasan karna kamu menyemangati aku PKL waktu itu dan tidak hanya satu momen itu saja, masih banyak lainnya.\n\nNikmati juga rasa capek ketika PKL nanti, semoga lelahmu menjadi lillah, dan setiap usahamu berbuah barokah.\n\ntutup mata ketika malam tiba, buka mata ketika matahari menyapa. karna dunia kerja butuh kamu yang segar, bukan kelopak mata yang lebar\n';

// --- FITUR NO 3: SIMPAN NAMA ---
function saveName() {
    const input = document.getElementById('userName');
    const name = input.value.trim();
    
    if (name !== "") {
        // Ganti semua kata "Levina" di pesan dengan nama yang diinput
        message = message.replace(/Levina/g, name);
        message2 = message2.replace(/Levina/g, name);

        const section = document.getElementById('nameInputSection');
        section.style.opacity = "0";
        setTimeout(() => {
            section.style.display = "none";
            const env = document.getElementById('envelopeWrapper');
            env.style.display = "block";
            env.style.opacity = "0";
            setTimeout(() => env.style.opacity = "1", 50);
        }, 500);
    } else {
        alert("Masukkan namamu dulu yaa :)");
    }
}

// --- LOGIC PRELOADER ---
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

  bgMusic.volume = 0;
  bgMusic.play().catch(() => console.log("Audio play blocked"));
  
  let vol = 0;
  const fadeIn = setInterval(() => {
    if (vol < 0.6) {
      vol += 0.02;
      bgMusic.volume = Math.min(vol, 0.6);
    } else {
      clearInterval(fadeIn);
    }
  }, 150);

  typeWriter(message, "typedText", () => {
    startFlowerFall();
    const signature = document.querySelector(".signature");
    if (signature) signature.style.opacity = "1";
    
    setTimeout(() => {
      const btnNext = document.getElementById("btnNext");
      if (btnNext) btnNext.style.display = "block";
      scrollBottom();
    }, 2000);
  });
}

function typeWriter(text, elementId, callback) {
  const element = document.getElementById(elementId);
  let i = 0;
  
  function typing() {
    if (i < text.length) {
      let char = text.charAt(i);
      element.innerHTML += (char === '\n') ? '<br>' : char;
      i++;

      scrollBottom();

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

function scrollBottom() {
    window.scrollTo({
        top: document.body.scrollHeight,
        behavior: 'smooth'
    });
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
    window.scrollTo({ top: 0, behavior: 'smooth' });

    typeWriter(message2, "typedText", () => {
      if (signature) signature.style.opacity = "1";
      addFloatingSticker();
      
      setTimeout(() => {
          const reply = document.getElementById('replySection');
          if(reply) {
              reply.style.display = "block";
              scrollBottom();
          }
      }, 1000);
    });
  }, 1000);
}

function addFloatingSticker() {
  const element = document.getElementById("typedText");
  const sticker = document.createElement("div");
  sticker.innerHTML = "✨💖✨😜";
  sticker.style.cssText = "margin-top:20px; font-size:1.5rem; opacity:0; transition:opacity 2s ease; text-align:right;";
  element.appendChild(sticker);
  
  setTimeout(() => {
    sticker.style.opacity = "1";
    scrollBottom();
  }, 500);
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

// --- FORM HANDLING ---
document.addEventListener("DOMContentLoaded", () => {
    const replyForm = document.getElementById("replyForm");
    const statusNote = document.getElementById("thankYouNote");

    if (replyForm) {
        replyForm.addEventListener("submit", async function(event) {
            event.preventDefault();
            const data = new FormData(event.target);
            
            // Mengubah teks tombol saat loading
            const btn = event.target.querySelector("button");
            const originalBtnText = btn.innerText;
            btn.innerText = "Mengirim...";
            btn.disabled = true;

            fetch(event.target.action, {
                method: 'POST',
                body: data,
                headers: { 'Accept': 'application/json' }
            }).then(response => {
                if (response.ok) {
                    statusNote.style.display = "block";
                    replyForm.style.display = "none";
                    scrollBottom();
                } else {
                    btn.innerText = originalBtnText;
                    btn.disabled = false;
                    alert("Gagal terkirim. Pastikan FORM_ID sudah benar.");
                }
            }).catch(error => {
                btn.innerText = originalBtnText;
                btn.disabled = false;
                alert("Terjadi kesalahan koneksi.");
            });
        });
    }
});