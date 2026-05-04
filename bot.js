// ===== SUPPLEMENTS GALLERY AI RECOMMENDER BOT =====

const PRODUCTS = {
  whey_on: {
    brand: 'Optimum Nutrition',
    name: 'Gold Standard 100% Whey',
    price: '₹5,499',
    mrp: '₹6,299',
    why: 'World\'s #1 whey — 24g protein per serving. Perfect for muscle building & recovery.',
    wa: 'Hi! The AI Recommender suggested ON Gold Standard Whey for me. Can I get more details?'
  },
  whey_mb: {
    brand: 'MuscleBlaze',
    name: 'Biozyme Performance Whey',
    price: '₹4,299',
    mrp: '₹4,999',
    why: 'Enhanced absorption formula — 25g protein with digestive enzymes. Great for beginners.',
    wa: 'Hi! The AI Recommender suggested MuscleBlaze Biozyme Whey for me. Can I get more details?'
  },
  ripped_whey: {
    brand: 'Ripped Whey',
    name: 'Ripped Whey Protein',
    price: '₹3,499',
    mrp: '₹3,999',
    why: 'Lean muscle formula with fat burners. Perfect for cutting & staying shredded.',
    wa: 'Hi! The AI Recommender suggested Ripped Whey Protein for me. Can I get more details?'
  },
  isolate: {
    brand: 'IsoLean',
    name: 'IsoLean Whey Isolate',
    price: '₹5,199',
    mrp: '₹5,999',
    why: '27g ultra-pure protein, near-zero carbs & fat. Best for lean gains & lactose sensitivity.',
    wa: 'Hi! The AI Recommender suggested IsoLean Whey Isolate for me. Can I get more details?'
  },
  raw_isolate: {
    brand: 'MuscleBlaze',
    name: 'Raw Whey Isolate 90%',
    price: '₹4,799',
    mrp: '₹5,499',
    why: '90% protein content — cleanest protein you can get. Unflavoured, no fillers.',
    wa: 'Hi! The AI Recommender suggested MuscleBlaze Raw Whey Isolate for me. Can I get more details?'
  },
  mass_anabolic: {
    brand: 'Anabolic Mass',
    name: 'Anabolic Mass Gainer',
    price: '₹2,999',
    mrp: '₹3,499',
    why: '1250+ calories per serving. Ideal for hardgainers who struggle to eat enough.',
    wa: 'Hi! The AI Recommender suggested Anabolic Mass Gainer for me. Can I get more details?'
  },
  mass_tech: {
    brand: 'MuscleTech',
    name: 'Mass Tech Extreme 2000',
    price: '₹5,999',
    mrp: '₹6,999',
    why: '2000 calories & 80g protein per serving. The ultimate serious mass builder.',
    wa: 'Hi! The AI Recommender suggested MuscleTech Mass Tech Extreme for me. Can I get more details?'
  },
  creatine: {
    brand: 'MuscleTech',
    name: 'Platinum Creatine Monohydrate',
    price: '₹1,299',
    mrp: '₹1,799',
    why: 'Pure micronised creatine — increases strength, power & workout performance significantly.',
    wa: 'Hi! The AI Recommender suggested MuscleTech Platinum Creatine for me. Can I get more details?'
  },
  preworkout: {
    brand: 'GNC',
    name: 'GNC Pre-Workout',
    price: '₹2,499',
    mrp: '₹2,999',
    why: 'Explosive energy with caffeine, beta-alanine & citrulline. Maximise every workout.',
    wa: 'Hi! The AI Recommender suggested GNC Pre-Workout for me. Can I get more details?'
  },
  multivitamin: {
    brand: 'GNC',
    name: 'GNC Mega Men Sport',
    price: '₹1,699',
    mrp: '₹1,999',
    why: '35+ vitamins & minerals for active men. Supports energy, immunity & overall performance.',
    wa: 'Hi! The AI Recommender suggested GNC Mega Men Sport for me. Can I get more details?'
  },
  profit_whey: {
    brand: 'Profit Whey',
    name: 'Profit 100% Whey',
    price: '₹2,599',
    mrp: '₹2,999',
    why: 'Great quality whey at a budget-friendly price. Perfect starting point for beginners.',
    wa: 'Hi! The AI Recommender suggested Profit 100% Whey for me. Can I get more details?'
  }
};

// ===== QUIZ FLOW =====
const QUIZ = [
  {
    id: 'goal',
    question: '💪 What is your main fitness goal?',
    options: [
      { label: '🏋️ Build Muscle & Size', value: 'bulk' },
      { label: '🔥 Lose Fat & Get Lean', value: 'cut' },
      { label: '⚡ Boost Strength & Power', value: 'strength' },
      { label: '🏃 Improve Stamina & Fitness', value: 'endurance' },
      { label: '🧘 General Health & Wellness', value: 'health' }
    ]
  },
  {
    id: 'experience',
    question: '📅 How long have you been working out?',
    options: [
      { label: '🌱 Just Starting Out', value: 'beginner' },
      { label: '📆 Less than 1 Year', value: 'newbie' },
      { label: '💪 1–3 Years', value: 'intermediate' },
      { label: '🏆 3+ Years (Advanced)', value: 'advanced' }
    ]
  },
  {
    id: 'body',
    question: '🧍 What best describes your body type?',
    options: [
      { label: '🦴 Skinny / Hard to gain weight', value: 'ecto' },
      { label: '⚖️ Average build', value: 'meso' },
      { label: '🫃 Tend to gain fat easily', value: 'endo' }
    ]
  },
  {
    id: 'age',
    question: '🎂 What is your age group?',
    options: [
      { label: '🧒 Below 18', value: 'teen' },
      { label: '🧑 18–25 years', value: 'youth' },
      { label: '👨 26–35 years', value: 'adult' },
      { label: '🧔 35+ years', value: 'mature' }
    ]
  },
  {
    id: 'budget',
    question: '💰 What is your monthly supplement budget?',
    options: [
      { label: '💵 Under ₹1,500', value: 'low' },
      { label: '💴 ₹1,500 – ₹3,500', value: 'mid' },
      { label: '💶 ₹3,500 – ₹6,000', value: 'high' },
      { label: '💷 ₹6,000+', value: 'premium' }
    ]
  }
];

// ===== STATE =====
let answers = {};
let currentQ = 0;
let botOpen = false;
let pulseHidden = false;

// ===== DOM HELPERS =====
const panel = () => document.getElementById('botPanel');
const launcher = () => document.getElementById('botLauncher');
const body = () => document.getElementById('botBody');
const options = () => document.getElementById('botOptions');

// ===== TOGGLE BOT =====
function toggleBot() {
  botOpen = !botOpen;
  if (botOpen) {
    panel().classList.add('open');
    launcher().classList.add('hidden');
    if (currentQ === 0 && Object.keys(answers).length === 0) {
      startBot();
    }
  } else {
    panel().classList.remove('open');
    launcher().classList.remove('hidden');
  }
}

function closeBotPulse(e) {
  e.stopPropagation();
  launcher().classList.add('hidden');
  pulseHidden = true;
}

// ===== START BOT =====
function startBot() {
  addBotMessage("👋 Hey! I'm your <strong>AI Supplement Advisor</strong> from Supplements Gallery, Jodhpur!");
  setTimeout(() => {
    addBotMessage("I'll ask you <strong>5 quick questions</strong> and suggest the <strong>best product</strong> for your goals. Ready? 💪");
    setTimeout(() => askQuestion(0), 800);
  }, 700);
}

// ===== ASK QUESTION =====
function askQuestion(index) {
  if (index >= QUIZ.length) {
    showResult();
    return;
  }
  currentQ = index;
  const q = QUIZ[index];

  // Show typing indicator
  showTyping();
  setTimeout(() => {
    removeTyping();
    addBotMessage(`<strong>Q${index + 1}/5</strong> — ${q.question}`);
    renderOptions(q.options, index);
    scrollBot();
  }, 600);
}

// ===== RENDER OPTIONS =====
function renderOptions(opts, qIndex) {
  const el = options();
  el.innerHTML = '';
  opts.forEach(opt => {
    const btn = document.createElement('button');
    btn.className = 'bot-opt-btn';
    btn.textContent = opt.label;
    btn.onclick = () => selectAnswer(qIndex, opt, btn);
    el.appendChild(btn);
  });
}

// ===== SELECT ANSWER =====
function selectAnswer(qIndex, opt, btn) {
  // Disable all buttons
  document.querySelectorAll('.bot-opt-btn').forEach(b => {
    b.disabled = true;
    b.style.opacity = '0.5';
  });
  btn.classList.add('selected');
  btn.style.opacity = '1';

  // Record answer
  answers[QUIZ[qIndex].id] = opt.value;

  // Show user message
  addUserMessage(opt.label);

  // Next question or result
  setTimeout(() => {
    options().innerHTML = '';
    askQuestion(qIndex + 1);
  }, 500);
}

// ===== RECOMMEND LOGIC =====
function getRecommendation() {
  const { goal, experience, body, age, budget } = answers;
  const recs = [];

  // PRIMARY RECOMMENDATION
  if (goal === 'bulk') {
    if (body === 'ecto' || experience === 'beginner') {
      recs.push(budget === 'low' ? PRODUCTS.profit_whey : PRODUCTS.mass_anabolic);
      if (budget === 'premium' || budget === 'high') recs.push(PRODUCTS.mass_tech);
    } else {
      recs.push(budget === 'premium' ? PRODUCTS.whey_on : PRODUCTS.whey_mb);
      recs.push(PRODUCTS.creatine);
    }
  } else if (goal === 'cut') {
    recs.push(PRODUCTS.ripped_whey);
    if (budget !== 'low') recs.push(PRODUCTS.isolate);
  } else if (goal === 'strength') {
    recs.push(PRODUCTS.creatine);
    if (budget !== 'low') recs.push(PRODUCTS.preworkout);
    if (budget === 'premium' || budget === 'high') recs.push(PRODUCTS.whey_on);
  } else if (goal === 'endurance') {
    recs.push(PRODUCTS.preworkout);
    recs.push(PRODUCTS.multivitamin);
  } else if (goal === 'health') {
    recs.push(PRODUCTS.multivitamin);
    if (budget !== 'low') recs.push(PRODUCTS.profit_whey);
  }

  // Budget adjustment
  if (budget === 'low' && !recs.includes(PRODUCTS.profit_whey) && !recs.includes(PRODUCTS.creatine) && !recs.includes(PRODUCTS.multivitamin)) {
    recs[0] = PRODUCTS.profit_whey;
  }

  // Isolate recommendation for lactose / lean
  if ((goal === 'bulk' || goal === 'cut') && budget === 'premium' && !recs.includes(PRODUCTS.isolate)) {
    recs.push(PRODUCTS.raw_isolate);
  }

  // Age adjustment — teens get safer options
  if (age === 'teen') {
    // remove creatine for teens
    const idx = recs.indexOf(PRODUCTS.creatine);
    if (idx > -1) recs.splice(idx, 1, PRODUCTS.multivitamin);
  }

  // Deduplicate
  return [...new Map(recs.map(p => [p.name, p])).values()].slice(0, 3);
}

// ===== SHOW RESULT =====
function showResult() {
  showTyping();
  setTimeout(() => {
    removeTyping();
    const recs = getRecommendation();

    addBotMessage("🎉 Analysis complete! Based on your answers, here are your <strong>personalised recommendations</strong>:");

    setTimeout(() => {
      recs.forEach((prod, i) => {
        setTimeout(() => {
          addResultCard(prod, i === 0);
          scrollBot();
        }, i * 400);
      });

      setTimeout(() => {
        addBotMessage("💬 Want expert advice? Chat directly with our supplement specialist on WhatsApp!");
        options().innerHTML = `
          <a href="https://wa.me/917568521210?text=Hi! I just used the AI Recommender on your website. Can I get personalised supplement advice?" 
             target="_blank" class="bot-opt-btn" style="background:#25D366;color:#fff;border-color:#25D366;text-decoration:none;">
            💬 Chat with Expert
          </a>
          <button class="bot-opt-btn" onclick="restartBot()">🔄 Try Again</button>
        `;
        scrollBot();
      }, recs.length * 400 + 400);
    }, 600);
  }, 1000);
}

// ===== ADD RESULT CARD =====
function addResultCard(prod, isTop) {
  const el = body();
  const wrapper = document.createElement('div');
  wrapper.className = 'bot-msg bot';
  wrapper.innerHTML = `
    <div class="bot-msg-icon">${isTop ? '🏆' : '⭐'}</div>
    <div class="bot-result-card">
      ${isTop ? '<div style="font-size:10px;background:#CC0000;color:#fff;padding:2px 8px;border-radius:3px;display:inline-block;margin-bottom:6px;font-weight:700;letter-spacing:1px;">TOP PICK</div>' : ''}
      <div class="rc-brand">${prod.brand}</div>
      <div class="rc-name">${prod.name}</div>
      <div class="rc-why">${prod.why}</div>
      <div class="rc-price"><del style="color:#999;font-size:11px;font-weight:400;">${prod.mrp}</del> &nbsp;${prod.price}</div>
      <a href="https://wa.me/917568521210?text=${encodeURIComponent(prod.wa)}" target="_blank" class="rc-order">
        <i class="fab fa-whatsapp"></i> Order Now
      </a>
    </div>
  `;
  el.appendChild(wrapper);
}

// ===== HELPERS =====
function addBotMessage(html) {
  const el = body();
  const msg = document.createElement('div');
  msg.className = 'bot-msg bot';
  msg.innerHTML = `
    <div class="bot-msg-icon">🤖</div>
    <div class="bot-bubble">${html}</div>
  `;
  el.appendChild(msg);
  scrollBot();
}

function addUserMessage(text) {
  const el = body();
  const msg = document.createElement('div');
  msg.className = 'bot-msg user';
  msg.innerHTML = `<div class="bot-bubble">${text}</div>`;
  el.appendChild(msg);
  scrollBot();
}

function showTyping() {
  const el = body();
  const typing = document.createElement('div');
  typing.className = 'bot-msg bot';
  typing.id = 'botTyping';
  typing.innerHTML = `
    <div class="bot-msg-icon">🤖</div>
    <div class="bot-typing"><span></span><span></span><span></span></div>
  `;
  el.appendChild(typing);
  scrollBot();
}

function removeTyping() {
  const t = document.getElementById('botTyping');
  if (t) t.remove();
}

function scrollBot() {
  const el = body();
  setTimeout(() => { el.scrollTop = el.scrollHeight; }, 50);
}

// ===== RESTART =====
function restartBot() {
  answers = {};
  currentQ = 0;
  body().innerHTML = '';
  options().innerHTML = '';
  startBot();
}

// ===== AUTO SHOW LAUNCHER AFTER 5s =====
setTimeout(() => {
  if (!botOpen && !pulseHidden) {
    launcher().style.display = 'flex';
  }
}, 5000);
