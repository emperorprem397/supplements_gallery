/* ============================================================
   SUPPLEMENTS GALLERY — AI PRODUCT RECOMMENDER
   Fully self-contained. Injects own HTML + CSS.
   Bottom-RIGHT corner. Dark theme.
   ============================================================ */

(function () {

  // ── INJECT CSS ──────────────────────────────────────────────
  const css = `
    #sg-bot-fab {
      position: fixed !important;
      bottom: 100px !important;
      left: 24px !important;
      z-index: 2147483640 !important;
      display: flex !important;
      align-items: center !important;
      gap: 10px !important;
      background: linear-gradient(135deg,#CC0000,#ff3333) !important;
      color: #fff !important;
      border: none !important;
      border-radius: 50px !important;
      padding: 11px 18px 11px 13px !important;
      cursor: pointer !important;
      box-shadow: 0 6px 24px rgba(204,0,0,0.45) !important;
      font-family: 'Segoe UI', sans-serif !important;
      animation: sgBotBounce 1s ease 3s both !important;
      max-width: 220px !important;
    }
    #sg-bot-fab:hover { transform: translateY(-2px) !important; box-shadow: 0 10px 28px rgba(204,0,0,0.55) !important; }
    #sg-bot-fab .sg-fab-emoji { font-size: 22px !important; flex-shrink: 0 !important; }
    #sg-bot-fab .sg-fab-txt { display: flex !important; flex-direction: column !important; line-height: 1.25 !important; }
    #sg-bot-fab .sg-fab-title { font-size: 13px !important; font-weight: 700 !important; letter-spacing: 0.3px !important; }
    #sg-bot-fab .sg-fab-sub { font-size: 10px !important; opacity: 0.85 !important; }
    #sg-bot-fab .sg-fab-x { margin-left: auto !important; font-size: 18px !important; opacity: 0.7 !important; padding: 0 2px !important; line-height: 1 !important; }
    #sg-bot-fab .sg-fab-x:hover { opacity: 1 !important; }

    #sg-bot-panel {
      position: fixed !important;
      bottom: 100px !important;
      left: 24px !important;
      z-index: 2147483641 !important;
      width: 340px !important;
      max-height: 570px !important;
      background: #1a1a1a !important;
      border-radius: 16px !important;
      box-shadow: 0 20px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(204,0,0,0.3) !important;
      display: none !important;
      flex-direction: column !important;
      overflow: hidden !important;
      font-family: 'Segoe UI', sans-serif !important;
    }
    #sg-bot-panel.sg-open { display: flex !important; animation: sgSlideUp 0.3s ease !important; }

    .sg-head {
      background: linear-gradient(135deg,#CC0000,#990000) !important;
      padding: 14px 16px !important;
      display: flex !important;
      align-items: center !important;
      justify-content: space-between !important;
      flex-shrink: 0 !important;
    }
    .sg-head-left { display: flex !important; align-items: center !important; gap: 10px !important; }
    .sg-head-emoji { font-size: 28px !important; }
    .sg-head-name { font-size: 15px !important; color: #fff !important; font-weight: 700 !important; letter-spacing: 0.3px !important; line-height: 1.2 !important; }
    .sg-head-status { font-size: 10px !important; color: rgba(255,255,255,0.75) !important; display: flex !important; align-items: center !important; gap: 4px !important; }
    .sg-head-dot { width: 7px !important; height: 7px !important; background: #4cff7a !important; border-radius: 50% !important; display: inline-block !important; animation: sgBlink 1.5s infinite !important; }
    .sg-close-btn {
      background: rgba(255,255,255,0.2) !important;
      border: none !important;
      color: #fff !important;
      width: 30px !important;
      height: 30px !important;
      border-radius: 50% !important;
      cursor: pointer !important;
      font-size: 15px !important;
      display: flex !important;
      align-items: center !important;
      justify-content: center !important;
      flex-shrink: 0 !important;
    }
    .sg-close-btn:hover { background: rgba(255,255,255,0.35) !important; }

    .sg-body {
      flex: 1 !important;
      overflow-y: auto !important;
      padding: 14px 12px !important;
      display: flex !important;
      flex-direction: column !important;
      gap: 10px !important;
      background: #111 !important;
      min-height: 200px !important;
      max-height: 280px !important;
    }
    .sg-body::-webkit-scrollbar { width: 3px !important; }
    .sg-body::-webkit-scrollbar-thumb { background: #333 !important; border-radius: 2px !important; }

    .sg-msg { display: flex !important; gap: 8px !important; align-items: flex-end !important; animation: sgMsgIn 0.25s ease !important; }
    .sg-msg.sg-user { flex-direction: row-reverse !important; }
    .sg-bubble {
      max-width: 82% !important;
      padding: 9px 13px !important;
      border-radius: 14px !important;
      font-size: 13px !important;
      line-height: 1.55 !important;
      color: #eee !important;
    }
    .sg-msg.sg-bot .sg-bubble { background: #2a2a2a !important; border-bottom-left-radius: 3px !important; }
    .sg-msg.sg-user .sg-bubble { background: #CC0000 !important; color: #fff !important; border-bottom-right-radius: 3px !important; }
    .sg-mic { font-size: 18px !important; flex-shrink: 0 !important; }

    .sg-typing { display: flex !important; gap: 4px !important; align-items: center !important; padding: 10px 13px !important; background: #2a2a2a !important; border-radius: 14px !important; border-bottom-left-radius: 3px !important; width: fit-content !important; }
    .sg-typing span { width: 7px !important; height: 7px !important; background: #666 !important; border-radius: 50% !important; animation: sgDot 1.2s infinite !important; }
    .sg-typing span:nth-child(2) { animation-delay: 0.2s !important; }
    .sg-typing span:nth-child(3) { animation-delay: 0.4s !important; }

    .sg-opts {
      padding: 10px 12px !important;
      display: flex !important;
      flex-wrap: wrap !important;
      gap: 7px !important;
      background: #1a1a1a !important;
      border-top: 1px solid #2a2a2a !important;
      min-height: 54px !important;
      flex-shrink: 0 !important;
    }
    .sg-opt {
      background: #2a2a2a !important;
      border: 1.5px solid #3a3a3a !important;
      color: #ddd !important;
      padding: 7px 13px !important;
      border-radius: 20px !important;
      font-size: 12px !important;
      font-weight: 500 !important;
      cursor: pointer !important;
      transition: all 0.2s !important;
      font-family: 'Segoe UI', sans-serif !important;
    }
    .sg-opt:hover, .sg-opt.sg-picked { background: #CC0000 !important; color: #fff !important; border-color: #CC0000 !important; }

    .sg-result-card {
      background: #1e1e1e !important;
      border: 1.5px solid rgba(204,0,0,0.3) !important;
      border-radius: 10px !important;
      padding: 12px !important;
    }
    .sg-rc-top-tag { display: inline-block !important; background: #CC0000 !important; color: #fff !important; font-size: 9px !important; font-weight: 700 !important; letter-spacing: 1px !important; padding: 2px 8px !important; border-radius: 3px !important; margin-bottom: 6px !important; }
    .sg-rc-brand { font-size: 9px !important; color: #CC0000 !important; font-weight: 700 !important; letter-spacing: 1.5px !important; text-transform: uppercase !important; }
    .sg-rc-name { font-size: 14px !important; font-weight: 700 !important; color: #fff !important; margin: 3px 0 5px !important; }
    .sg-rc-why { font-size: 11px !important; color: #aaa !important; line-height: 1.6 !important; margin-bottom: 8px !important; }
    .sg-rc-price { font-size: 13px !important; font-weight: 700 !important; color: #fff !important; margin-bottom: 8px !important; }
    .sg-rc-price del { color: #666 !important; font-weight: 400 !important; font-size: 11px !important; margin-right: 4px !important; }
    .sg-rc-order {
      display: inline-flex !important;
      align-items: center !important;
      gap: 5px !important;
      background: #25D366 !important;
      color: #fff !important;
      padding: 7px 14px !important;
      border-radius: 5px !important;
      font-size: 11px !important;
      font-weight: 700 !important;
      text-decoration: none !important;
    }
    .sg-rc-order:hover { background: #1ebe5d !important; }

    .sg-foot {
      display: flex !important;
      gap: 8px !important;
      padding: 10px 12px !important;
      background: #1a1a1a !important;
      border-top: 1px solid #2a2a2a !important;
      flex-shrink: 0 !important;
    }
    .sg-restart {
      flex: 1 !important;
      background: #2a2a2a !important;
      border: 1px solid #3a3a3a !important;
      color: #bbb !important;
      padding: 8px !important;
      border-radius: 6px !important;
      font-size: 11px !important;
      cursor: pointer !important;
      font-family: 'Segoe UI', sans-serif !important;
    }
    .sg-restart:hover { background: #333 !important; }
    .sg-wa-link {
      flex: 1 !important;
      background: #25D366 !important;
      color: #fff !important;
      padding: 8px !important;
      border-radius: 6px !important;
      font-size: 11px !important;
      font-weight: 600 !important;
      text-decoration: none !important;
      display: flex !important;
      align-items: center !important;
      justify-content: center !important;
      gap: 4px !important;
    }
    .sg-wa-link:hover { background: #1ebe5d !important; }

    .sg-progress { 
      display: flex !important; 
      gap: 4px !important; 
      padding: 8px 12px !important; 
      background: #111 !important;
      flex-shrink: 0 !important;
    }
    .sg-prog-dot { 
      height: 3px !important; 
      flex: 1 !important; 
      background: #2a2a2a !important; 
      border-radius: 2px !important; 
      transition: background 0.3s !important;
    }
    .sg-prog-dot.sg-done { background: #CC0000 !important; }

    @keyframes sgBotBounce { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)} }
    @keyframes sgSlideUp { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
    @keyframes sgMsgIn { from{opacity:0;transform:translateY(6px)} to{opacity:1;transform:translateY(0)} }
    @keyframes sgDot { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-5px)} }
    @keyframes sgBlink { 0%,100%{opacity:1} 50%{opacity:0.3} }

    @media(max-width:420px){
      #sg-bot-panel { width: calc(100vw - 24px) !important; left: 12px !important; }
      #sg-bot-fab { left: 12px !important; }
    }
  `;

  const styleEl = document.createElement('style');
  styleEl.textContent = css;
  document.head.appendChild(styleEl);

  // ── INJECT HTML ─────────────────────────────────────────────
  const botHTML = `
    <button id="sg-bot-fab">
      <span class="sg-fab-emoji">🤖</span>
      <span class="sg-fab-txt">
        <span class="sg-fab-title">AI Recommender</span>
        <span class="sg-fab-sub">Find your perfect supplement!</span>
      </span>
      <span class="sg-fab-x" id="sg-fab-x">✕</span>
    </button>

    <div id="sg-bot-panel">
      <div class="sg-head">
        <div class="sg-head-left">
          <span class="sg-head-emoji">🤖</span>
          <div>
            <div class="sg-head-name">SG Supplement Advisor</div>
            <div class="sg-head-status">
              <span class="sg-head-dot"></span> AI Powered · Free
            </div>
          </div>
        </div>
        <button class="sg-close-btn" id="sg-close-btn">✕</button>
      </div>
      <div class="sg-progress" id="sg-progress">
        <div class="sg-prog-dot" id="sg-p0"></div>
        <div class="sg-prog-dot" id="sg-p1"></div>
        <div class="sg-prog-dot" id="sg-p2"></div>
        <div class="sg-prog-dot" id="sg-p3"></div>
        <div class="sg-prog-dot" id="sg-p4"></div>
      </div>
      <div class="sg-body" id="sg-body"></div>
      <div class="sg-opts" id="sg-opts"></div>
      <div class="sg-foot">
        <button class="sg-restart" id="sg-restart">🔄 Start Over</button>
        <a class="sg-wa-link" href="https://wa.me/917568521210?text=Hi! I need supplement advice." target="_blank">💬 Ask Expert</a>
      </div>
    </div>
  `;

  const wrapper = document.createElement('div');
  wrapper.innerHTML = botHTML;
  document.body.appendChild(wrapper);

  // ── PRODUCTS DATABASE ────────────────────────────────────────
  const P = {
    whey_on:    { brand:'Optimum Nutrition', name:'Gold Standard 100% Whey',    price:'₹5,499', mrp:'₹6,299', why:'World\'s #1 selling whey — 24g protein per serving. Best for muscle building & recovery.', wa:'Hi! AI Recommender suggested ON Gold Standard Whey for me.' },
    whey_mb:    { brand:'MuscleBlaze',       name:'Biozyme Performance Whey',   price:'₹4,299', mrp:'₹4,999', why:'Enhanced absorption with digestive enzymes. 25g protein. Great for beginners.',         wa:'Hi! AI Recommender suggested MuscleBlaze Biozyme Whey for me.' },
    ripped:     { brand:'Ripped Whey',       name:'Ripped Whey Protein',        price:'₹3,499', mrp:'₹3,999', why:'Lean formula with fat burners. Perfect for cutting phase & staying shredded.',           wa:'Hi! AI Recommender suggested Ripped Whey Protein for me.' },
    profit:     { brand:'Profit Whey',       name:'Profit 100% Whey',           price:'₹2,599', mrp:'₹2,999', why:'High quality whey at a budget-friendly price. Best starting point for beginners.',       wa:'Hi! AI Recommender suggested Profit 100% Whey for me.' },
    isolate:    { brand:'IsoLean',           name:'IsoLean Whey Isolate',       price:'₹5,199', mrp:'₹5,999', why:'27g ultra-pure protein, near-zero carbs & fat. Ideal for lean gains & clean diet.',      wa:'Hi! AI Recommender suggested IsoLean Whey Isolate for me.' },
    raw_iso:    { brand:'MuscleBlaze',       name:'Raw Whey Isolate 90%',       price:'₹4,799', mrp:'₹5,499', why:'90% protein content — cleanest protein available. Unflavoured, zero fillers.',           wa:'Hi! AI Recommender suggested MuscleBlaze Raw Whey Isolate for me.' },
    mass_a:     { brand:'Anabolic Mass',     name:'Anabolic Mass Gainer',       price:'₹2,999', mrp:'₹3,499', why:'1250+ calories per serving. Best for hardgainers who struggle to eat enough.',           wa:'Hi! AI Recommender suggested Anabolic Mass Gainer for me.' },
    mass_mt:    { brand:'MuscleTech',        name:'Mass Tech Extreme 2000',     price:'₹5,999', mrp:'₹6,999', why:'2000 calories & 80g protein per serving. The ultimate serious mass building formula.',    wa:'Hi! AI Recommender suggested MuscleTech Mass Tech Extreme for me.' },
    creatine:   { brand:'MuscleTech',        name:'Platinum Creatine',          price:'₹1,299', mrp:'₹1,799', why:'Pure micronised creatine — proven to increase strength, power & workout performance.',    wa:'Hi! AI Recommender suggested MuscleTech Platinum Creatine for me.' },
    preworkout: { brand:'GNC',               name:'GNC Pre-Workout',            price:'₹2,499', mrp:'₹2,999', why:'Explosive energy with caffeine, beta-alanine & citrulline. Maximise every session.',      wa:'Hi! AI Recommender suggested GNC Pre-Workout for me.' },
    multi:      { brand:'GNC',               name:'GNC Mega Men Sport',         price:'₹1,699', mrp:'₹1,999', why:'35+ vitamins & minerals for active men. Boosts energy, immunity & overall performance.',  wa:'Hi! AI Recommender suggested GNC Mega Men Sport Multivitamin for me.' },
  };

  // ── QUIZ ────────────────────────────────────────────────────
  const QUIZ = [
    { id:'goal', q:'💪 What is your main fitness goal?', opts:[
      {l:'🏋️ Build Muscle & Gain Size', v:'bulk'},
      {l:'🔥 Lose Fat & Get Lean',       v:'cut'},
      {l:'⚡ Increase Strength & Power', v:'strength'},
      {l:'🏃 Improve Stamina & Endurance',v:'endurance'},
      {l:'🧘 General Health & Wellness', v:'health'},
    ]},
    { id:'level', q:'📅 How long have you been training?', opts:[
      {l:'🌱 Just Starting Out',          v:'beginner'},
      {l:'📆 Less than 1 Year',           v:'newbie'},
      {l:'💪 1–3 Years',                  v:'mid'},
      {l:'🏆 3+ Years (Advanced)',        v:'advanced'},
    ]},
    { id:'body', q:'🧍 How would you describe your body?', opts:[
      {l:'🦴 Skinny / Hard to gain weight', v:'ecto'},
      {l:'⚖️ Average build',               v:'meso'},
      {l:'🫃 Gain fat easily',             v:'endo'},
    ]},
    { id:'age', q:'🎂 What is your age group?', opts:[
      {l:'🧒 Below 18',   v:'teen'},
      {l:'🧑 18–25 yrs',  v:'youth'},
      {l:'👨 26–35 yrs',  v:'adult'},
      {l:'🧔 35+ yrs',    v:'mature'},
    ]},
    { id:'budget', q:'💰 Monthly supplement budget?', opts:[
      {l:'💵 Under ₹1,500',     v:'low'},
      {l:'💴 ₹1,500 – ₹3,500', v:'mid'},
      {l:'💶 ₹3,500 – ₹6,000', v:'high'},
      {l:'💷 ₹6,000+',         v:'premium'},
    ]},
  ];

  // ── STATE ───────────────────────────────────────────────────
  let ans = {}, qIdx = 0, open = false;

  // ── ELEMENTS ────────────────────────────────────────────────
  const fab    = document.getElementById('sg-bot-fab');
  const panel  = document.getElementById('sg-bot-panel');
  const body   = document.getElementById('sg-body');
  const opts   = document.getElementById('sg-opts');
  const fabX   = document.getElementById('sg-fab-x');
  const closeB = document.getElementById('sg-close-btn');
  const restart= document.getElementById('sg-restart');

  // ── EVENTS ──────────────────────────────────────────────────
  fab.addEventListener('click', function(e) {
    if (e.target === fabX || fabX.contains(e.target)) {
      fab.style.display = 'none';
      return;
    }
    toggle();
  });
  closeB.addEventListener('click', toggle);
  restart.addEventListener('click', doRestart);

  function toggle() {
    open = !open;
    panel.classList.toggle('sg-open', open);
    fab.style.display = open ? 'none' : 'flex';
    if (open && qIdx === 0 && Object.keys(ans).length === 0) startBot();
  }

  // ── BOT START ───────────────────────────────────────────────
  function startBot() {
    addMsg('bot', '👋 Hey! I\'m your <b>AI Supplement Advisor</b> from <b>Supplements Gallery, Jodhpur!</b>');
    setTimeout(() => {
      addMsg('bot', 'I\'ll ask you <b>5 quick questions</b> to find the <b>perfect supplement</b> for your goals! 💪');
      setTimeout(() => askQ(0), 700);
    }, 600);
  }

  // ── ASK QUESTION ────────────────────────────────────────────
  function askQ(i) {
    qIdx = i;
    if (i >= QUIZ.length) { showResult(); return; }
    updateProgress(i);
    showTyping();
    setTimeout(() => {
      removeTyping();
      addMsg('bot', `<b>Q${i+1} of 5</b><br>${QUIZ[i].q}`);
      renderOpts(QUIZ[i].opts, i);
      scrollBot();
    }, 650);
  }

  // ── RENDER OPTIONS ──────────────────────────────────────────
  function renderOpts(options, qI) {
    opts.innerHTML = '';
    options.forEach(o => {
      const btn = document.createElement('button');
      btn.className = 'sg-opt';
      btn.textContent = o.l;
      btn.onclick = () => pick(qI, o, btn);
      opts.appendChild(btn);
    });
  }

  // ── PICK ANSWER ─────────────────────────────────────────────
  function pick(qI, o, btn) {
    document.querySelectorAll('.sg-opt').forEach(b => { b.disabled = true; b.style.opacity = '0.4'; });
    btn.classList.add('sg-picked');
    btn.style.opacity = '1';
    ans[QUIZ[qI].id] = o.v;
    addMsg('user', o.l);
    setTimeout(() => { opts.innerHTML = ''; askQ(qI + 1); }, 400);
  }

  // ── RECOMMEND LOGIC ─────────────────────────────────────────
  function getRecs() {
    const {goal, level, body: b, age, budget} = ans;
    let recs = [];

    if (goal === 'bulk') {
      if (b === 'ecto' || level === 'beginner') {
        recs = budget === 'low' ? [P.profit, P.multi] : budget === 'mid' ? [P.mass_a, P.whey_mb] : [P.mass_mt, P.whey_on, P.creatine];
      } else {
        recs = budget === 'low' ? [P.profit, P.creatine] : budget === 'mid' ? [P.whey_mb, P.creatine] : [P.whey_on, P.creatine, P.mass_a];
      }
    } else if (goal === 'cut') {
      recs = budget === 'low' ? [P.ripped, P.multi] : budget === 'premium' ? [P.isolate, P.ripped, P.multi] : [P.ripped, P.isolate];
    } else if (goal === 'strength') {
      recs = budget === 'low' ? [P.creatine, P.profit] : [P.creatine, P.preworkout, P.whey_on];
    } else if (goal === 'endurance') {
      recs = [P.preworkout, P.multi, P.raw_iso];
    } else {
      recs = budget === 'low' ? [P.multi, P.profit] : [P.multi, P.whey_mb, P.creatine];
    }

    // Teen safety — replace creatine
    if (age === 'teen') {
      recs = recs.map(r => r === P.creatine ? P.multi : r);
    }

    // Budget cap
    if (budget === 'low') recs = recs.filter(r => parseInt(r.price.replace(/[₹,]/g,'')) <= 3000);
    if (!recs.length) recs = [P.profit, P.multi];

    // Deduplicate
    const seen = new Set();
    return recs.filter(r => { if (seen.has(r.name)) return false; seen.add(r.name); return true; }).slice(0, 3);
  }

  // ── SHOW RESULT ─────────────────────────────────────────────
  function showResult() {
    updateProgress(5);
    showTyping();
    setTimeout(() => {
      removeTyping();
      addMsg('bot', '🎉 <b>Analysis complete!</b> Here are your personalised picks:');
      const recs = getRecs();
      recs.forEach((prod, i) => {
        setTimeout(() => {
          addResultCard(prod, i === 0);
          scrollBot();
        }, i * 350);
      });
      setTimeout(() => {
        addMsg('bot', '💬 Want to talk to a real expert? Our team is available on WhatsApp!');
        opts.innerHTML = `
          <a href="https://wa.me/917568521210?text=Hi! I just used the AI Recommender on your website and need supplement advice." target="_blank" class="sg-opt" style="text-decoration:none;background:#25D366 !important;color:#fff !important;border-color:#25D366 !important;">💬 Chat with Expert</a>
          <button class="sg-opt" onclick="doRestart()">🔄 Try Again</button>
        `;
        scrollBot();
      }, recs.length * 350 + 500);
    }, 1000);
  }

  function addResultCard(prod, isTop) {
    const div = document.createElement('div');
    div.className = 'sg-msg sg-bot';
    div.innerHTML = `
      <span class="sg-mic">${isTop ? '🏆' : '⭐'}</span>
      <div class="sg-result-card">
        ${isTop ? '<div class="sg-rc-top-tag">TOP PICK</div>' : ''}
        <div class="sg-rc-brand">${prod.brand}</div>
        <div class="sg-rc-name">${prod.name}</div>
        <div class="sg-rc-why">${prod.why}</div>
        <div class="sg-rc-price"><del>${prod.mrp}</del> ${prod.price}</div>
        <a href="https://wa.me/917568521210?text=${encodeURIComponent(prod.wa)}" target="_blank" class="sg-rc-order">🛒 Order on WhatsApp</a>
      </div>`;
    body.appendChild(div);
  }

  // ── HELPERS ─────────────────────────────────────────────────
  function addMsg(type, html) {
    const div = document.createElement('div');
    div.className = `sg-msg sg-${type}`;
    div.innerHTML = type === 'bot'
      ? `<span class="sg-mic">🤖</span><div class="sg-bubble">${html}</div>`
      : `<div class="sg-bubble">${html}</div>`;
    body.appendChild(div);
    scrollBot();
  }

  function showTyping() {
    const div = document.createElement('div');
    div.className = 'sg-msg sg-bot';
    div.id = 'sg-typing';
    div.innerHTML = '<span class="sg-mic">🤖</span><div class="sg-typing"><span></span><span></span><span></span></div>';
    body.appendChild(div);
    scrollBot();
  }

  function removeTyping() {
    const t = document.getElementById('sg-typing');
    if (t) t.remove();
  }

  function scrollBot() {
    setTimeout(() => { body.scrollTop = body.scrollHeight; }, 60);
  }

  function updateProgress(i) {
    for (let j = 0; j < 5; j++) {
      const d = document.getElementById(`sg-p${j}`);
      if (d) d.classList.toggle('sg-done', j < i);
    }
  }

  function doRestart() {
    ans = {}; qIdx = 0;
    body.innerHTML = ''; opts.innerHTML = '';
    updateProgress(0);
    startBot();
  }

  window.doRestart = doRestart;

  // ── AUTO SHOW FAB after 4s ──────────────────────────────────
  fab.style.display = 'none';
  setTimeout(() => { fab.style.display = 'flex'; }, 4000);

})();
