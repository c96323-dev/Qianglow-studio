const LINE_BOOKING_URL = "https://lin.ee/rspH0C2";
const LIFF_ID = "";

const questions = [
  {
    eyebrow: "Eye shape",
    title: "你的眼型最接近哪一種？",
    hint: "直覺選最像你的狀態就好，不需要完全一模一樣。",
    answers: [
      { label: "圓眼", note: "眼睛偏大、眼中高度明顯", result: "round" },
      { label: "單眼皮", note: "眼摺不明顯，線條乾淨", result: "monolid" },
      { label: "泡泡眼", note: "眼皮較有厚度或浮腫感", result: "puffy" },
      { label: "下垂眼", note: "眼尾自然往下，眼神柔和", result: "downturned" },
      { label: "丹鳳眼", note: "眼型細長，眼尾帶一點上揚", result: "almond" },
    ],
  },
  {
    eyebrow: "Natural lash",
    title: "你的原生睫毛通常是？",
    hint: "這會影響捲度與維持度的選擇。",
    answers: [
      { label: "細軟", note: "容易被過重設計壓垂", effects: { puffy: 1, monolid: 1 } },
      { label: "粗硬", note: "支撐度佳，但需要柔化線條", effects: { almond: 1, round: 1 } },
      { label: "稀疏", note: "希望補足空隙與自然密度", effects: { monolid: 1, downturned: 1 } },
      { label: "易垂", note: "需要更聰明的翹度配置", effects: { puffy: 1, downturned: 1 } },
    ],
  },
  {
    eyebrow: "Concern",
    title: "你最想改善哪一件事？",
    hint: "芊光會用這題調整推薦方向。",
    answers: [
      { label: "眼神不夠亮", note: "希望有自然放大與精神感", effects: { round: 1, monolid: 1 } },
      { label: "眼皮壓睫毛", note: "嫁接後容易被眼皮吃掉", effects: { monolid: 1, puffy: 2 } },
      { label: "眼尾看起來疲憊", note: "想把眼神輕輕往上拉", effects: { downturned: 2 } },
      { label: "妝感容易太重", note: "想精緻但不要銳利", effects: { almond: 1, round: 1 } },
    ],
  },
  {
    eyebrow: "Makeup",
    title: "你平常最常出現的妝感是？",
    hint: "日常習慣決定濃淡與眼尾比例。",
    answers: [
      { label: "幾乎素顏", note: "想要天生睫毛變漂亮", effects: { round: 1, monolid: 1 } },
      { label: "乾淨淡妝", note: "保留溫柔、清透、耐看", effects: { downturned: 1, puffy: 1 } },
      { label: "精緻眼妝", note: "希望線條更完整、有存在感", effects: { almond: 2 } },
      { label: "拍照妝感", note: "喜歡鏡頭裡更明顯的放大", effects: { round: 1, almond: 1 } },
    ],
  },
  {
    eyebrow: "Mood",
    title: "你希望眼神呈現什麼感覺？",
    hint: "這題會影響最後的推薦方向。",
    answers: [
      { label: "柔和無辜", note: "眼神乾淨、親和、有空氣感", effects: { round: 2 } },
      { label: "清冷乾淨", note: "線條精緻、不過度甜美", effects: { monolid: 1, almond: 1 } },
      { label: "消腫有神", note: "視覺上更輕、更俐落", effects: { puffy: 2 } },
      { label: "溫柔上提", note: "改善疲憊感，眼尾更輕盈", effects: { downturned: 2 } },
    ],
  },
  {
    eyebrow: "Priority",
    title: "你最重視什麼？",
    hint: "最後一題，讓建議更貼近日常。",
    answers: [
      { label: "自然耐看", note: "近看也像自己的睫毛", effects: { round: 1, monolid: 1 } },
      { label: "維持度", note: "希望掉落後仍然漂亮", effects: { puffy: 1, downturned: 1 } },
      { label: "放大效果", note: "想讓眼睛更有存在感", effects: { round: 1, almond: 1 } },
      { label: "精品精緻感", note: "每一根線條都要乾淨細緻", effects: { almond: 2 } },
    ],
  },
];

const results = {
  round: {
    name: "圓眼 · Airy Doll",
    summary: "妳的眼型明亮靈動，天生就有放大感。芊光的方向是讓這份靈氣更精緻，而不是更甜膩。",
    analysis: "圓眼放大條件好，但若全眼同樣濃密容易顯得太可愛、太圓。重點在控制眼尾比例，讓眼神在靈動之中帶一點成熟感。",
    designs: [
      {
        name: "眼尾加長型",
        mood: "性感 · 優雅",
        desc: "眼尾睫毛向外延伸，修飾圓眼的短圓感，讓眼神更成熟、更有女人味。",
      },
      {
        name: "眼中加長型",
        mood: "可愛 · 娃娃眼",
        desc: "黑眼珠正上方睫毛最長、兩側遞減，放大縱向高度，讓圓眼更顯靈動無辜。",
      },
    ],
    length: "8–11 mm",
    care: "避免揉眼與厚重眼線。卸妝時用棉棒順向清潔根部，讓中段線條維持乾淨。",
  },
  monolid: {
    name: "單眼皮 · Clean Lift",
    summary: "妳的眼型線條乾淨俐落，關鍵不在加長，而在讓睫毛從眼皮下「跑出來」。",
    analysis: "單眼皮或內雙容易因眼皮壓住睫毛根部，使睫毛呈現下垂狀。選對捲度比選對長度更重要，讓弧度在睜眼後清楚露出。",
    designs: [
      {
        name: "捲翹加長型",
        mood: "清爽 · 有神",
        desc: "選擇捲翹、加長的睫毛，打造原生睫毛捲翹分明的效果，讓眼神在素顏時也精緻。",
      },
    ],
    length: "9–12 mm",
    care: "睡前用睫毛刷整理方向，避免眼皮產品堆在根部，維持翹度與乾淨度。",
  },
  puffy: {
    name: "泡泡眼 · Soft Define",
    summary: "妳的眼型需要輕盈的承重與清楚的翹度，讓眼皮厚度被柔化，而不是被濃密感放大。",
    analysis: "泡泡眼若使用過粗、過密、過長的設計，視覺上會更沉重。重點是選對捲度類型，把線條從眼皮厚度裡拉出來。",
    designs: [
      {
        name: "L型 / LC型捲度",
        mood: "消腫 · 精神",
        desc: "根部直挺、中後段才向上翹起，能有效避免厚重眼皮將睫毛「吃掉」或頂到眼皮，打造輕盈睜眼感。",
      },
    ],
    length: "8–11 mm",
    care: "前三天避免油類眼霜靠近根部。早上若眼皮浮腫，可先冷敷再輕刷睫毛方向。",
  },
  downturned: {
    name: "下垂眼 · Gentle Lift",
    summary: "妳的眼型自帶溫柔感，芊光的方向是不刻意、不誇張，讓眼神輕輕往上提。",
    analysis: "下垂眼不建議把眼尾拉得太長太重，否則會更顯疲態。重心應放在眼中段，讓線條自然往上走。眼尾加長型需避免。",
    designs: [
      {
        name: "眼中加長型",
        mood: "圓眼 · 娃娃感",
        desc: "中間最長的弧度將視覺往上拉圓，中和眼尾下垂的疲態感，讓眼神更有精神。",
      },
      {
        name: "眼尾高捲翹型",
        mood: "CC捲 · D捲",
        desc: "利用強效弧度向上提拉眼尾，製造精神電眼效果，改善下垂感。",
      },
    ],
    length: "8–11 mm",
    care: "洗臉後將眼尾睫毛往外上方梳開，避免眼尾交疊造成下壓感。",
  },
  almond: {
    name: "丹鳳眼 · Silky Line",
    summary: "妳的眼型線條天生有氣質，芊光的方向是讓這份氣質更柔和，而不是更銳利。",
    analysis: "丹鳳眼本身線條優美，重點是不要讓眼尾過度延伸，避免眼神顯得太強勢。細緻排列搭配中段聚焦，讓整體更高級。眼尾加長型需避免。",
    designs: [
      {
        name: "眼中加長型",
        mood: "柔和 · 精緻",
        desc: "中間最長的弧度把眼睛視覺往上下拉圓，中和眼角上揚的銳利感，讓眼神更溫柔迷人。",
      },
    ],
    length: "9–12 mm",
    care: "避免用睫毛夾破壞嫁接弧度，眼尾每日輕刷保持線條方向一致。",
  },
};

// ── 選題後的即時回饋文字 ────────────────────────
const feedbacks = [
  ["了解妳的眼型輪廓", "記錄妳的睫毛狀態", "鎖定妳的改善方向", "分析妳的日常妝感", "掌握妳想要的眼神", "完成診斷"],
  ["圓眼有天生的放大感✨", "單眼皮最需要的是捲度", "泡泡眼關鍵在輕盈承重", "下垂眼要從眼中段提起", "丹鳳眼讓線條更柔和", "正在分析中"],
];

const state = {
  currentQuestion: 0,
  scores: {},
  answers: [],
  currentResult: null,
  lastAnswerIndex: null,
};

const $ = (selector) => document.querySelector(selector);

const screens = {
  home: $('[data-screen="home"]'),
  quiz: $('[data-screen="quiz"]'),
  loading: $('[data-screen="loading"]'),
  result: $('[data-screen="result"]'),
};

const showScreen = (name) => {
  Object.values(screens).forEach((s) => s.classList.remove("is-active"));
  screens[name].classList.add("is-active");
  window.scrollTo({ top: 0, behavior: "smooth" });
};

const resetState = () => {
  state.currentQuestion = 0;
  state.scores = { round: 0, monolid: 0, puffy: 0, downturned: 0, almond: 0 };
  state.answers = [];
  state.currentResult = null;
  state.lastAnswerIndex = null;
};

// ── GA4 ─────────────────────────────────────────
const trackEvent = (eventName, params = {}) => {
  if (typeof gtag === "function") gtag("event", eventName, params);
};

// ── 即時回饋 toast ───────────────────────────────
const showFeedback = (qIndex, answerIndex) => {
  const msg = feedbacks[0][qIndex] || "";
  const hint = feedbacks[1][answerIndex] || "";
  let toast = $("#feedback-toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "feedback-toast";
    toast.style.cssText = `
      position:fixed; bottom:32px; left:50%; transform:translateX(-50%) translateY(20px);
      background:rgba(44,40,37,0.92); color:#fdf9f2;
      padding:12px 24px; border-radius:999px;
      font-family:'Noto Serif TC',serif; font-size:0.82rem; letter-spacing:0.15em;
      opacity:0; transition:opacity 0.3s ease, transform 0.3s ease;
      pointer-events:none; z-index:999; white-space:nowrap;
      backdrop-filter:blur(8px);
    `;
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  requestAnimationFrame(() => {
    toast.style.opacity = "1";
    toast.style.transform = "translateX(-50%) translateY(0)";
  });
  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateX(-50%) translateY(10px)";
  }, 1400);
};

// ── 選題時的按鈕閃光反應 ────────────────────────
const flashButton = (btn) => {
  btn.style.transition = "background 0.15s ease, border-color 0.15s ease";
  btn.style.background = "rgba(201,168,118,0.18)";
  btn.style.borderColor = "rgba(201,168,118,0.8)";
  setTimeout(() => {
    btn.style.background = "";
    btn.style.borderColor = "";
  }, 320);
};

const startQuiz = () => {
  resetState();
  showScreen("quiz");
  renderQuestion();
  trackEvent("quiz_start", { quiz_name: "eye_shape_quiz" });
};

const renderQuestion = () => {
  const question = questions[state.currentQuestion];
  const progress = ((state.currentQuestion + 1) / questions.length) * 100;

  $("#stepLabel").textContent = `Question ${state.currentQuestion + 1}`;
  $("#stepCount").textContent = `${state.currentQuestion + 1} / ${questions.length}`;
  $("#progressBar").style.width = `${progress}%`;
  $("#questionEyebrow").textContent = question.eyebrow;
  $("#questionTitle").textContent = question.title;
  $("#questionHint").textContent = question.hint;

  const answersEl = $("#answers");
  answersEl.innerHTML = "";

  question.answers.forEach((answer, idx) => {
    const button = document.createElement("button");
    button.className = "answer-button";
    button.type = "button";
    button.style.animationDelay = `${idx * 60}ms`;
    button.innerHTML = `<strong>${answer.label}</strong><span>${answer.note}</span>`;
    button.addEventListener("click", () => {
      flashButton(button);
      setTimeout(() => chooseAnswer(answer, idx), 180);
    });
    answersEl.appendChild(button);
  });
};

const chooseAnswer = (answer, answerIndex) => {
  state.answers.push(answer.label);
  state.lastAnswerIndex = answerIndex;

  if (answer.result) state.scores[answer.result] += 4;
  Object.entries(answer.effects || {}).forEach(([key, value]) => {
    state.scores[key] += value;
  });

  showFeedback(state.currentQuestion, answerIndex);

  if (state.currentQuestion < questions.length - 1) {
    state.currentQuestion += 1;
    setTimeout(renderQuestion, 260);
    return;
  }

  setTimeout(showLoading, 400);
};

const showLoading = () => {
  showScreen("loading");
  window.setTimeout(() => {
    state.currentResult = getTopResult();
    renderResult();
    showScreen("result");
    trackEvent("quiz_complete", {
      quiz_name: "eye_shape_quiz",
      result_type: state.currentResult,
    });
  }, 1800);
};

const getTopResult = () => {
  const fallback = "round";
  return Object.entries(state.scores).sort((a, b) => b[1] - a[1])[0]?.[0] || fallback;
};

// ── 結果頁渲染（雜誌診斷書格式）───────────────────
const renderResult = () => {
  const result = results[state.currentResult];

  $("#resultTitle").textContent = result.name;
  $("#resultSummary").textContent = result.summary;
  $("#resultAnalysis").textContent = result.analysis;
  $("#resultLength").textContent = result.length;
  $("#resultCare").textContent = result.care;
  $("#lineBooking").href = buildLineUrl(result);

  // 推薦設計卡片
  const designWrap = $("#resultDesigns");
  if (designWrap) {
    designWrap.innerHTML = "";
    result.designs.forEach((d) => {
      const card = document.createElement("div");
      card.className = "design-card";
      card.innerHTML = `
        <div class="design-card-header">
          <strong>${d.name}</strong>
          <span class="design-mood">${d.mood}</span>
        </div>
        <p>${d.desc}</p>
      `;
      designWrap.appendChild(card);
    });
  }

  // 彩蛋：根據結果顯示不同的芊光小語
  const easterEggs = {
    round: "圓眼的妳天生就有讓人忍不住多看一眼的靈氣 ✨",
    monolid: "單眼皮的線條感，是最難被複製的獨特氣質 ✨",
    puffy: "消腫不是目的，讓眼神輕盈有神才是 ✨",
    downturned: "下垂眼的溫柔，是種讓人放鬆的力量 ✨",
    almond: "丹鳳眼的氣質，靜靜地就讓人記住了 ✨",
  };
  const eggEl = $("#resultEasterEgg");
  if (eggEl) eggEl.textContent = easterEggs[state.currentResult] || "";
};

const buildLineUrl = (result) => {
  const message = encodeURIComponent(
    `您好，我完成芊光眼型測驗，結果是「${result.name}」。想預約並討論適合我的睫毛設計。`
  );
  return `https://line.me/R/msg/text/?${message}`;
};

const sharePayload = () => {
  const result = state.currentResult ? results[state.currentResult] : null;
  const title = result ? `我的芊光眼型：${result.name}` : "芊光 Qianglow Studio 眼型測驗";
  const text = result ? result.summary : "6 題找出妳的眼型與專屬睫毛設計。";
  return { title, text, url: window.location.href };
};

const share = async () => {
  const payload = sharePayload();
  if (navigator.share) {
    await navigator.share(payload).catch(() => {});
    return;
  }
  await navigator.clipboard?.writeText(`${payload.title}\n${payload.text}\n${payload.url}`).catch(() => {});
};

const initLiff = async () => {
  if (!LIFF_ID || !window.liff) return;
  await window.liff.init({ liffId: LIFF_ID }).catch(() => {});
};

document.addEventListener("click", (event) => {
  const action = event.target.closest("[data-action]")?.dataset.action;
  if (!action) return;
  if (action === "start") startQuiz();
  if (action === "back-home") showScreen("home");
  if (action === "restart") startQuiz();
  if (action === "share" || action === "share-result") share();
  if (action === "scroll-knowledge") $("#knowledge").scrollIntoView({ behavior: "smooth", block: "start" });
});

document.addEventListener("click", (event) => {
  if (event.target.closest("#lineBooking")) {
    trackEvent("line_booking_click", { result_type: state.currentResult || "unknown" });
  }
});

resetState();
initLiff();
