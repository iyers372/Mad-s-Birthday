const body = document.body;

const introLayer = document.getElementById("introLayer");
const typedTextEl = document.getElementById("typedText");

const topHeader = document.getElementById("topHeader");
const giftGrid = document.getElementById("giftGrid");

const modal = document.getElementById("modal");
const modalBody = document.getElementById("modalBody");
const closeModalBtn = document.getElementById("closeModal");

const PRESENTS = document.querySelectorAll(".present");


const introText = "Happy Birthday Mads, I love you";
let typeIndex = 0;
let deleting = false;

function typeLoop(){
  typedTextEl.textContent = introText.slice(0, typeIndex);

  if (!deleting) {
    if (typeIndex < introText.length) {
      typeIndex++;
      setTimeout(typeLoop, 80);
    } else {
      setTimeout(() => {
        deleting = true;
        setTimeout(typeLoop, 45);
      }, 700);
    }
  } else {
    if (typeIndex > 0) {
      typeIndex--;
      setTimeout(typeLoop, 35);
    } else {
      revealGifts();
    }
  }
}

function revealGifts(){
  introLayer.style.opacity = "0";
  introLayer.style.transition = "opacity 350ms ease";

  setTimeout(() => {
    introLayer.style.display = "none";
    body.classList.add("revealed");

    topHeader.classList.remove("hidden");
    giftGrid.classList.remove("hidden");
    topHeader.classList.add("fade-in");
    giftGrid.classList.add("fade-in");
  }, 360);
}

typeLoop();

PRESENTS.forEach(btn => {
  btn.addEventListener("click", () => {
    openBox(btn.dataset.box);
    confettiBurst(110); 
  });
});

closeModalBtn.addEventListener("click", closeModal);
modal.addEventListener("click", (e) => {
  if (e.target === modal) closeModal();
});

function closeModal(){
  modal.classList.add("hidden");
  modalBody.innerHTML = "";
}


const DATA = {
  reasons: {
    title: "Reasons I Love You",
    items: [
      { title: "Your sense of humour", text: "You are absolutely insane, your 'jokes' are ridiculous but they still make me laugh till my stomach hurts" },
      { title: "Sister-ness", text: "I can tell you anything, the most wild shit I've ever done and you'll be there no matter what" },
      { title: "Just you", text: "You're beautiful, strong, resilient and sometimes an absolute pain in the ass, but you're my sister" },
      { title: "You feel like home", text: "No matter where I am, sitting in front of you on your bed or 13,000km away in New York, talking to you feels like home" },
      { title: "Dance moves", text: "You dance like a chicken without a head, but it's my favorite form of entertainment" }
    ]
  },

  memories: {
    title: "Memory Vault",
    items: [
      { title: "Iron Grilled Cheese", text: "When we waited for everyone and B to go to sleep in the night, and make grilled cheese with an Iron at 2am :P, we even had to give Simba some so he would stop barking LMFAO, that was the best thing I've ever eaten" },
      { title: "Sushii can you pick me up?", text: "Me driving you back from work with music playing, you stealing my vape and me getting pissed off while you tell me whatever fuck up Hriday did that day" },
      { title: "Drinks in NYC", text: "The time when we went to that shady bar, got shots after you found out you passed the bar, we didn't tip and they came running after us LOL" }
    ]
  },

  jokes: {
    title: "Unhinged Inside Jokes",
    items: [
      { title: "BOTB", text: "Begging on the Bronx, self explanatory LMFAO" },
      { title: "PEST", text: "Can't explain bro" }
    ]
  },

  openwhen: {
    title: "Open When You Need Me",
    items: [
      { title: "Open when you miss me", text: "You see that little phone icon next to my name? Press it and talk to me, 2am or 4pm, I'm here no matter what; and I'll help you fix whatever recent fuck up you did. Maybe I miss you too" },
      { title: "Open when you need Boy advice", text: "You probably fucked up, but it's okay; If the guy can't make your fuck up his fault and still apologise, dump him. But call me and bitch about it so I can tell you you're stupif but still be on your side." },
      { title: "Open when you Mom says something mean", text: "She's just overwhelmed, don't take it to heart. She's probably wrong, don't believe what she says. I still love you, we'll make it okay. " },
      { title: "Open when you feel lonely", text: "Why are you feeling lonely? You have the most amazing sister to call bro, call her?" },
      { title: "Open when it’s late and your brain is fried with work", text: "QUIT YOUR JOB, QUIT EVERYTHING, JUST SIT AND VIBE. That's a good thought but you have to keep working so I can have nice things that you pay for <3" }
    ]
  },

  coupon: {
    title: "Coupon I Owe You",
    items: [
      {
        title: "1 Free Evening",
        text: "Involves going to Mezcalita, getting food and drinks, coming home and you getting a full 45min back massage",
        isCoupon: true
      }
    ]
  }
};


let activeKey = null;
let activeIndex = 0;

function openBox(key){
  activeKey = key;
  activeIndex = 0;
  modal.classList.remove("hidden");
  renderCarousel();
}

function renderCarousel(){
  const pack = DATA[activeKey];
  const items = pack.items;
  const total = items.length;
  const current = items[activeIndex];

  const progressPercent = Math.round(((activeIndex + 1) / total) * 100);

  modalBody.innerHTML = `
    <div class="vault-header">
      <h2 class="vault-title">${escapeHTML(pack.title)}</h2>
      <div class="vault-progress" aria-label="Progress">
        <div style="width:${progressPercent}%;"></div>
      </div>
    </div>

    <div class="memory-card">
      <h3>${escapeHTML(current.title)}</h3>
      <p>${escapeHTML(current.text)}</p>

      ${
        current.isCoupon
          ? `<button class="redeem" id="redeemBtn" type="button">Redeem</button>`
          : ``
      }
    </div>

    <div class="vault-nav">
      <button class="arrow" id="prevItem" type="button" aria-label="Previous">←</button>
      <button class="arrow" id="nextItem" type="button" aria-label="Next">→</button>
    </div>

    <p style="text-align:center; margin:8px 0 0; color:rgba(255,255,255,0.75); font-size:13px;">
      ${activeIndex + 1} / ${total}
    </p>
  `;

  const prev = document.getElementById("prevItem");
  const next = document.getElementById("nextItem");

  prev.disabled = activeIndex === 0;
  next.disabled = activeIndex === total - 1;

  prev.style.opacity = prev.disabled ? "0.45" : "1";
  next.style.opacity = next.disabled ? "0.45" : "1";

  prev.addEventListener("click", () => {
    if (activeIndex > 0) {
      activeIndex--;
      renderCarousel();
    }
  });

  next.addEventListener("click", () => {
    if (activeIndex < total - 1) {
      activeIndex++;
      renderCarousel();
    }
  });

  const redeemBtn = document.getElementById("redeemBtn");
  if (redeemBtn) {
    redeemBtn.addEventListener("click", () => {
      redeemBtn.textContent = "REDEEMED ✅";
      redeemBtn.disabled = true;
      redeemBtn.style.opacity = "0.8";
      redeemBtn.style.cursor = "default";
    });
  }
}


function confettiBurst(count = 110){
  const colors = [
    "rgba(255,182,213,0.95)",
    "rgba(255,111,177,0.95)",
    "rgba(255,255,255,0.95)",
    "rgba(255,210,234,0.95)",
    "rgba(255,77,149,0.90)"
  ];

  for(let i=0;i<count;i++){
    const piece = document.createElement("div");
    const size = rand(5, 11);
    const left = rand(0, 100);
    const drift = rand(-55, 55);
    const duration = rand(1200, 2400);
    const delay = rand(0, 160);

    piece.style.position = "fixed";
    piece.style.zIndex = "1000";
    piece.style.left = left + "vw";
    piece.style.top = "-14px";
    piece.style.width = size + "px";
    piece.style.height = size + "px";
    piece.style.background = colors[Math.floor(Math.random() * colors.length)];
    piece.style.borderRadius = Math.random() > 0.5 ? "50%" : "3px";
    piece.style.opacity = "0.98";
    piece.style.transform = `translateX(0px) rotate(${rand(0, 360)}deg)`;
    piece.style.transition = `transform ${duration}ms linear, opacity ${duration}ms linear`;

    document.body.appendChild(piece);

    setTimeout(() => {
      piece.style.transform = `translate(${drift}px, 115vh) rotate(${rand(240, 720)}deg)`;
      piece.style.opacity = "0";
    }, delay);

    setTimeout(() => piece.remove(), duration + delay + 60);
  }
}

function rand(min, max){
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function escapeHTML(str){
  return String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
