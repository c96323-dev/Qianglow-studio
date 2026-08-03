const LINE_BOOKING_URL = "https://lin.ee/Pa0mkmD";
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
    eyebrow: "Priority",
    title: "你最重視什麼？",
    hint: "最後一題，讓建議更貼近日常。",
    answers: [
      { label: "自然耐看", note: "近看也像自己的睫毛", effects: { round: 1, monolid: 1 } },
      { label: "維持度", note: "希望掉落後仍然漂亮", effects: { puffy: 1, downturned: 1 } },
      { label: "放大效果", note: "想讓眼睛更有存在感", effects: { round: 1, almond: 1 } },
    ],
  },
];

// ── 日常保養提醒（精簡 3 點，顯示於結果頁卡片下方）────────
const careReminders = [
  "B5強韌液可作為日常使用，幫助維持睫毛健康感與持久度",
  "每天輕柔清潔睫毛根部，避免油脂與灰塵堆積導致黏著力下降",
  "避免趴睡或長時間側壓到睫毛的睡姿",
];

// ── 妝感濃淡分類（顯示於結果頁 03 卡片，所有結果共用）────────
const makeupIntensityLevels = [
  {
    name: "裸妝素顏款",
    desc: "自然日常款，輕盈裸感，幾乎看不出有接睫毛。",
    suited: "第一次接睫毛、平常少化妝、不想被看出有接睫毛的人",
  },
  {
    name: "日常自然款",
    desc: "清透微妝感，放大眼型同時保有自然度。",
    suited: "上班通勤、素顏也想看起來有精神的人",
  },
  {
    name: "立體顯眼款",
    desc: "眼神更明亮有神，修飾眼型效果明顯，約會感提升。",
    suited: "想放大眼神但不想太濃妝感的人",
  },
  {
    name: "濃郁存在款",
    desc: "深邃濃密，帶有完整眼妝感，眼神存在感更強烈。",
    suited: "喜歡明顯睫毛感與妝感的人",
  },
];

// ── 建議妝感對照表：由「你平常最常出現的妝感是？」×「你最重視什麼？」決定唯一一款 ──
const intensityMatrix = {
  幾乎素顏: { 自然耐看: "裸妝素顏款", 維持度: "裸妝素顏款", 放大效果: "日常自然款" },
  乾淨淡妝: { 自然耐看: "日常自然款", 維持度: "日常自然款", 放大效果: "立體顯眼款" },
  精緻眼妝: { 自然耐看: "日常自然款", 維持度: "立體顯眼款", 放大效果: "立體顯眼款" },
  拍照妝感: { 自然耐看: "立體顯眼款", 維持度: "立體顯眼款", 放大效果: "濃郁存在款" },
};

const getIntensityLevel = () => {
  const makeupAnswer = state.answerLog[3]; // Q4：你平常最常出現的妝感是？
  const priorityAnswer = state.answerLog[4]; // Q5：你最重視什麼？
  const name =
    intensityMatrix[makeupAnswer?.label]?.[priorityAnswer?.label] || "日常自然款";
  return makeupIntensityLevels.find((level) => level.name === name) || makeupIntensityLevels[1];
};

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
  },
};

// ── 選題後的即時回饋文字 ────────────────────────
const feedbacks = [
  ["了解妳的眼型輪廓", "記錄妳的睫毛狀態", "鎖定妳的改善方向", "分析妳的日常妝感", "完成診斷"],
  ["圓眼有天生的放大感✨", "單眼皮最需要的是捲度", "泡泡眼關鍵在輕盈承重", "下垂眼要從眼中段提起", "丹鳳眼讓線條更柔和", "正在分析中"],
];

const state = {
  currentQuestion: 0,
  scores: {},
  answers: [],
  answerLog: [],
  currentResult: null,
  lastAnswerIndex: null,
  currentIntensity: null,
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
  state.answerLog = [];
  state.currentResult = null;
  state.lastAnswerIndex = null;
  state.currentIntensity = null;
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
  $("#quizBackBtn").textContent = state.currentQuestion === 0 ? "返回" : "上一題";
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

const applyAnswerScore = (answer) => {
  if (answer.result) state.scores[answer.result] += 4;
  Object.entries(answer.effects || {}).forEach(([key, value]) => {
    state.scores[key] += value;
  });
};

const revertAnswerScore = (answer) => {
  if (!answer) return;
  if (answer.result) state.scores[answer.result] -= 4;
  Object.entries(answer.effects || {}).forEach(([key, value]) => {
    state.scores[key] -= value;
  });
};

const chooseAnswer = (answer, answerIndex) => {
  state.answers.push(answer.label);
  state.answerLog[state.currentQuestion] = answer;
  state.lastAnswerIndex = answerIndex;

  applyAnswerScore(answer);

  showFeedback(state.currentQuestion, answerIndex);

  if (state.currentQuestion < questions.length - 1) {
    state.currentQuestion += 1;
    setTimeout(renderQuestion, 260);
    return;
  }

  setTimeout(showLoading, 400);
};

const goToPreviousQuestion = () => {
  if (state.currentQuestion === 0) {
    showScreen("home");
    return;
  }
  state.currentQuestion -= 1;
  const prevAnswer = state.answerLog[state.currentQuestion];
  if (prevAnswer) {
    revertAnswerScore(prevAnswer);
    state.answerLog[state.currentQuestion] = null;
    state.answers.pop();
  }
  renderQuestion();
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
  $("#lineBooking").href = LINE_BOOKING_URL;

  // 建議妝感卡片（由 Q4 + Q5 決定唯一一款）
  state.currentIntensity = getIntensityLevel();
  const intensityWrap = $("#resultIntensity");
  if (intensityWrap) {
    const level = state.currentIntensity;
    intensityWrap.innerHTML = `
      <div class="intensity-item">
        <strong>${level.name}</strong>
        <p>${level.desc}</p>
        <span class="intensity-suited">適合：${level.suited}</span>
      </div>
    `;
  }

  // 日常保養提醒（精簡 3 點，所有結果共用）
  $("#careReminder").innerHTML = careReminders.map((item) => `<li>${item}</li>`).join("");

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

const buildResultMessage = (result) =>
  `您好，我完成芊光眼型測驗，結果是「${result.name}」。想預約並討論適合我的睫毛設計。`;

// ── 複製提示 toast（獨立於選題回饋 toast，避免衝突） ──
const showCopyToast = (msg) => {
  let toast = $("#copy-toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "copy-toast";
    toast.style.cssText = `
      position:fixed; bottom:32px; left:50%; transform:translateX(-50%) translateY(20px);
      background:rgba(44,40,37,0.92); color:#fdf9f2;
      padding:12px 24px; border-radius:999px;
      font-family:'Noto Serif TC',serif; font-size:0.82rem; letter-spacing:0.06em;
      opacity:0; transition:opacity 0.3s ease, transform 0.3s ease;
      pointer-events:none; z-index:999; max-width:80vw; text-align:center;
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
  }, 2200);
};

// ── 分享結果：產生視覺化診斷卡片（IG 限動尺寸 9:16） ────────
const CARD_W = 1080;
const CARD_H = 1920;

const wrapCanvasText = (ctx, text, x, y, maxWidth, lineHeight) => {
  let line = "";
  let cy = y;
  for (const char of text) {
    const test = line + char;
    if (ctx.measureText(test).width > maxWidth && line) {
      ctx.fillText(line, x, cy);
      line = char;
      cy += lineHeight;
    } else {
      line = test;
    }
  }
  if (line) ctx.fillText(line, x, cy);
  return cy;
};

const drawCardEye = (ctx, cx, cy, w) => {
  const h = w * 0.42;
  ctx.save();
  ctx.strokeStyle = "#c9a876";
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(cx - w / 2, cy);
  ctx.bezierCurveTo(cx - w / 4, cy - h, cx + w / 4, cy - h, cx + w / 2, cy);
  ctx.bezierCurveTo(cx + w / 4, cy + h, cx - w / 4, cy + h, cx - w / 2, cy);
  ctx.closePath();
  ctx.stroke();
  ctx.fillStyle = "#8e9c87";
  ctx.beginPath();
  ctx.arc(cx, cy, w * 0.11, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "#2c2825";
  ctx.beginPath();
  ctx.arc(cx, cy, w * 0.05, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
};

// 分享卡片圖示：使用指定圖片，依短邊自動裁切成正方形（cover 模式，不變形）
const SHARE_EYE_SRC = "assets/share-eye.png";
let shareEyeImagePromise = null;
const loadShareEyeImage = () => {
  if (!shareEyeImagePromise) {
    shareEyeImagePromise = new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = SHARE_EYE_SRC;
    });
  }
  return shareEyeImagePromise;
};

const drawCardEyeImage = (ctx, img, cx, cy, size, radius = 32) => {
  const srcSize = Math.min(img.naturalWidth, img.naturalHeight);
  const sx = (img.naturalWidth - srcSize) / 2;
  const sy = (img.naturalHeight - srcSize) / 2;
  const x = cx - size / 2;
  const y = cy - size / 2;
  ctx.save();
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.arcTo(x + size, y, x + size, y + size, radius);
  ctx.arcTo(x + size, y + size, x, y + size, radius);
  ctx.arcTo(x, y + size, x, y, radius);
  ctx.arcTo(x, y, x + size, y, radius);
  ctx.closePath();
  ctx.clip();
  ctx.drawImage(img, sx, sy, srcSize, srcSize, x, y, size, size);
  ctx.restore();
};

const buildShareCard = async (result) => {
  await document.fonts.ready.catch(() => {});
  const canvas = document.createElement("canvas");
  canvas.width = CARD_W;
  canvas.height = CARD_H;
  const ctx = canvas.getContext("2d");
  const pad = 96;

  const bg = ctx.createLinearGradient(0, 0, CARD_W, CARD_H);
  bg.addColorStop(0, "#fffcf7");
  bg.addColorStop(0.55, "#f8f4ee");
  bg.addColorStop(1, "#efe5d8");
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, CARD_W, CARD_H);

  ctx.textAlign = "left";
  ctx.fillStyle = "#c9a876";
  ctx.font = "600 26px 'Noto Serif TC', serif";
  ctx.fillText("Q I A N G L O W   S T U D I O", pad, 150);

  ctx.fillStyle = "#6f6258";
  ctx.font = "300 30px 'Noto Serif TC', serif";
  ctx.fillText("芊光專屬眼型診斷", pad, 198);

  const eyeImg = await loadShareEyeImage().catch(() => null);
  if (eyeImg) {
    drawCardEyeImage(ctx, eyeImg, CARD_W / 2, 390, 360);
  } else {
    drawCardEye(ctx, CARD_W / 2, 410, 520);
  }

  ctx.textAlign = "center";
  ctx.fillStyle = "#2c2825";
  ctx.font = "600 74px 'Noto Serif TC', serif";
  ctx.fillText(result.name, CARD_W / 2, 650);

  ctx.strokeStyle = "#c9a876";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(CARD_W / 2 - 60, 690);
  ctx.lineTo(CARD_W / 2 + 60, 690);
  ctx.stroke();

  ctx.textAlign = "left";
  ctx.fillStyle = "#6f6258";
  ctx.font = "300 34px 'Noto Serif TC', serif";
  let y = wrapCanvasText(ctx, result.summary, pad, 770, CARD_W - pad * 2, 54) + 76;

  ctx.fillStyle = "#c9a876";
  ctx.font = "600 26px 'Noto Serif TC', serif";
  ctx.fillText("推薦設計", pad, y);
  result.designs.forEach((d) => {
    y += 64;
    ctx.fillStyle = "#2c2825";
    ctx.font = "600 40px 'Noto Serif TC', serif";
    ctx.fillText(`・${d.name}`, pad, y);
    y += 42;
    ctx.fillStyle = "#8e9c87";
    ctx.font = "400 26px 'Noto Serif TC', serif";
    ctx.fillText(d.mood, pad + 30, y);
  });

  y += 90;
  ctx.fillStyle = "#c9a876";
  ctx.font = "600 26px 'Noto Serif TC', serif";
  ctx.fillText("建議長度", pad, y);
  y += 54;
  ctx.fillStyle = "#2c2825";
  ctx.font = "600 44px 'Noto Serif TC', serif";
  ctx.fillText(result.length, pad, y);

  const intensity = state.currentIntensity;
  if (intensity) {
    y += 90;
    ctx.fillStyle = "#c9a876";
    ctx.font = "600 26px 'Noto Serif TC', serif";
    ctx.fillText("建議妝感", pad, y);
    y += 54;
    ctx.fillStyle = "#2c2825";
    ctx.font = "600 40px 'Noto Serif TC', serif";
    ctx.fillText(intensity.name, pad, y);
    y += 42;
    ctx.fillStyle = "#6f6258";
    ctx.font = "300 28px 'Noto Serif TC', serif";
    ctx.fillText(intensity.desc, pad, y);
  }

  const ctaY = CARD_H - 240;
  ctx.strokeStyle = "rgba(44,40,37,0.15)";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(pad, ctaY);
  ctx.lineTo(CARD_W - pad, ctaY);
  ctx.stroke();

  ctx.textAlign = "center";
  ctx.fillStyle = "#2c2825";
  ctx.font = "300 32px 'Noto Serif TC', serif";
  ctx.fillText("找到最適合妳眼型的睫毛設計", CARD_W / 2, ctaY + 78);
  ctx.fillStyle = "#c9a876";
  ctx.font = "600 30px 'Noto Serif TC', serif";
  ctx.fillText("qianglow.com/quiz", CARD_W / 2, ctaY + 128);

  return canvas;
};

const openShareModal = (canvas, result) => {
  $("#shareModal")?.remove();

  const modal = document.createElement("div");
  modal.id = "shareModal";
  modal.style.cssText = `
    position:fixed; inset:0; z-index:1000;
    display:flex; flex-direction:column; align-items:center; justify-content:center;
    gap:20px; padding:28px;
    background:rgba(44,40,37,0.72); backdrop-filter:blur(8px);
  `;

  const imgWrap = document.createElement("div");
  imgWrap.style.cssText = `
    width:min(76vw,320px); aspect-ratio:${CARD_W}/${CARD_H};
    border-radius:14px; overflow:hidden; box-shadow:0 24px 60px rgba(0,0,0,0.35);
  `;
  const img = document.createElement("img");
  img.src = canvas.toDataURL("image/png");
  img.alt = `芊光眼型診斷卡片：${result.name}`;
  img.style.cssText = "width:100%; height:100%; display:block; object-fit:cover;";
  imgWrap.appendChild(img);

  const hint = document.createElement("p");
  hint.textContent = "長按圖片即可儲存";
  hint.style.cssText = `
    color:#fdf9f2; font-family:'Noto Serif TC',serif; font-size:0.85rem;
    letter-spacing:0.04em; text-align:center; max-width:320px; margin:0;
  `;

  const actions = document.createElement("div");
  actions.style.cssText = "display:flex; gap:12px; flex-wrap:wrap; justify-content:center;";

  const makeBtn = (label, primary) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.textContent = label;
    btn.style.cssText = `
      font-family:'Noto Serif TC',serif; font-size:0.88rem; letter-spacing:0.08em;
      padding:12px 26px; border-radius:999px; cursor:pointer;
      border:1px solid ${primary ? "transparent" : "rgba(255,252,247,0.5)"};
      background:${primary ? "#c9a876" : "transparent"};
      color:${primary ? "#2c2825" : "#fdf9f2"};
    `;
    return btn;
  };

  const downloadBtn = makeBtn("儲存圖片", true);
  downloadBtn.addEventListener("click", () => {
    const a = document.createElement("a");
    a.href = canvas.toDataURL("image/png");
    a.download = `qianglow-${state.currentResult || "result"}.png`;
    a.click();
    trackEvent("share_card_download", { result_type: state.currentResult || "unknown" });
  });
  actions.appendChild(downloadBtn);

  if (navigator.canShare) {
    const nativeBtn = makeBtn("分享", false);
    nativeBtn.addEventListener("click", () => {
      canvas.toBlob(async (blob) => {
        if (!blob) return;
        const file = new File([blob], "qianglow-result.png", { type: "image/png" });
        if (!navigator.canShare({ files: [file] })) return;
        await navigator
          .share({ files: [file], title: `我的芊光眼型：${result.name}`, text: result.summary })
          .catch(() => {});
        trackEvent("share_card_native", { result_type: state.currentResult || "unknown" });
      }, "image/png");
    });
    actions.appendChild(nativeBtn);
  }

  const closeBtn = makeBtn("關閉", false);
  closeBtn.addEventListener("click", () => modal.remove());
  actions.appendChild(closeBtn);

  modal.append(imgWrap, hint, actions);
  modal.addEventListener("click", (event) => {
    if (event.target === modal) modal.remove();
  });
  document.body.appendChild(modal);
};

const share = async () => {
  const result = state.currentResult ? results[state.currentResult] : null;
  if (!result) return;
  trackEvent("share_result_click", { result_type: state.currentResult });
  const canvas = await buildShareCard(result);
  openShareModal(canvas, result);
};

const initLiff = async () => {
  if (!LIFF_ID || !window.liff) return;
  await window.liff.init({ liffId: LIFF_ID }).catch(() => {});
};

document.addEventListener("click", (event) => {
  const action = event.target.closest("[data-action]")?.dataset.action;
  if (!action) return;
  if (action === "start") startQuiz();
  if (action === "quiz-back") goToPreviousQuestion();
  if (action === "restart") startQuiz();
  if (action === "share" || action === "share-result") share();
  if (action === "scroll-knowledge") $("#knowledge").scrollIntoView({ behavior: "smooth", block: "start" });
});

document.addEventListener("click", (event) => {
  if (event.target.closest("#lineBooking")) {
    trackEvent("line_booking_click", { result_type: state.currentResult || "unknown" });
    const result = state.currentResult ? results[state.currentResult] : null;
    if (result && navigator.clipboard?.writeText) {
      navigator.clipboard
        .writeText(buildResultMessage(result))
        .then(() => showCopyToast("已複製測驗結果，進入 LINE 後貼上傳送給芊光"))
        .catch(() => {});
    }
  }
});

resetState();
initLiff();
