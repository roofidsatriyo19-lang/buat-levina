const message = `Hai Levina...\n\nAku cuma mau bilang, selamat menempuh perjalanan baru di tempat PKL nanti ya. Aku tahu mungkin ada rasa deg-degan atau capek ke depannya, tapi aku yakin banget kamu bisa ngelewatin semuanya dengan hebat.\n\nJangan lupa jaga kesehatan, jangan terlalu diforsir, dan tetap jadi Levina yang selalu semangat.\n\nSemangat ya buat dunianya, dan semangat juga buat harimu!\n\nI'm always rooting for you.`;

const message2 = 'Oh iya..\n Ini sebagai balasan karna kamu menyemangati aku PKL waktu itu dan tidak hanya satu momen itu saja, masih banyak lainnya.\n\n Nikmati juga rasa capek ketika PKL nanti, semoga lelahmu menjadi lillah, dan setiap usahamu berbuah barokah.\n\n tutup mata ketika malam tiba, buka mata ketika matahari menyapa. karna dunia kerja butuh kamu yang segar, bukan kelopak mata yang lebar\n';

// --- LOGIC PRELOADER ---
window.addEventListener("load", () => {
  const loader = document.getElementById("loader-wrapper");
  if (loader) {
    setTimeout(() => {
      loader.style.opacity = "0";
      setTimeout(() => {
        loader.style.display = "none";
      }, 800);
    }, 1500); // loading 1.5 sec
  }
});

function showLetter() {
  const bgMusic = document.getElementById("bgMusic");
  const volIcon = document.getElementById("volumeToggle");
  
  if (volIcon) volIcon.style.display = "flex";

  // ---  FADE-IN MUSIC HALUS ---
  bgMusic.volume = 0;
  bgMusic.play().catch(e => console.log("Menunggu interaksi user untuk musik"));

  let vol = 0;
  const fadeIn = setInterval(() => {
    if (vol < 0.6) {
      vol += 0.02; // Transisi 
      bgMusic.volume = Math.min(vol, 0.6);
    } else {
      clearInterval(fadeIn);
    }
  }, 150);

  document.getElementById("introText").style.opacity = 0;
  document.querySelector(".btn").style.display = "none";

  setTimeout(() => {
    const letterBox = document.getElementById("letterBox");
    const typedText = document.getElementById("typedText");
    const signature = document.querySelector(".signature");
    
    letterBox.style.display = "block";
    
    let i = 0;
    function typeWriter() {
      if (i < message.length) {
        let char = message.charAt(i);
        typedText.innerHTML += (char === '\n') ? '<br>' : char;
        i++;

        let delay = 50;
        if (char === '.' || char === '?' || char === '!') delay = 800;
        else if (char === ',') delay = 400;
        else if (char === ' ') delay = 30;

        setTimeout(typeWriter, delay);
      } else {
        startFlowerFall(); 
        if (signature) {
            signature.style.opacity = "1";
            signature.style.transition = "opacity 2.5s ease-in";
        }
        
        setTimeout(() => {
          const btnNext = document.getElementById("btnNext");
          if (btnNext) {
              btnNext.style.display = "block";
          }
        }, 2000); 
      }
    }
    typeWriter();
  }, 1000);
}

function readSecondLetter() {
  const typedText = document.getElementById("typedText");
  const btnNext = document.getElementById("btnNext");
  const signature = document.querySelector(".signature");

  if (btnNext) btnNext.style.display = "none";
  if (signature) {
      signature.style.transition = "opacity 1s ease";
      signature.style.opacity = "0";
  }

  typedText.style.opacity = "0";
  
  setTimeout(() => {
    typedText.innerHTML = ""; 
    typedText.style.opacity = "1";
    
    let j = 0;
    function typeWriter2() {
      if (j < message2.length) {
        let char = message2.charAt(j);
        typedText.innerHTML += (char === '\n') ? '<br>' : char;
        j++;

        let delay = 50;
        if (char === '.' || char === '!' || char === '?') delay = 800;
        else if (char === ',') delay = 400;

        setTimeout(typeWriter2, delay);
      } else {
        if (signature) signature.style.opacity = "1";
        
        // show a sticker in the end
        addFloatingSticker();
      }
    }
    typeWriter2();
  }, 1000);
}

// show emoji in the end
function addFloatingSticker() {
  const letter = document.getElementById("letterBox");
  const sticker = document.createElement("div");
  sticker.innerHTML = "✨💖✨😜";
  sticker.style.position = "absolute";
  sticker.style.bottom = "20px";
  sticker.style.left = "30px";
  sticker.style.fontSize = "1.5rem";
  sticker.style.opacity = "0";
  sticker.style.transition = "opacity 2s ease";
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