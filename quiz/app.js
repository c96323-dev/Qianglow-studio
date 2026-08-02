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
    hint: "這會影響嫁接承重、粗細與維持度。",
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
    hint: "芊光會用這題調整推薦設計的方向。",
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
    hint: "日常習慣會決定濃淡、密度與眼尾比例。",
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
    hint: "這題會影響最後推薦的設計名稱。",
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
    hint: "最後一題，讓建議更貼近日常維護方式。",
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
    summary: "你的眼型很適合保留明亮感，用中段聚焦的配置讓眼神更澄澈，但不做過度甜膩的圓弧。",
    analysis: "圓眼本身放大條件好，重點是控制中段與眼尾比例。若全眼同樣濃密，容易變得太可愛或太圓；芊光會用層次讓眼神更輕、更精品。",
    design: "空氣感娃娃眼。中段微聚焦，眼頭與眼尾降低存在感，保留自然睜眼時的光澤。",
    curl: "C / CC 混合",
    length: "8-11 mm",
    thickness: "0.05 / 0.07 mm",
    care: "避免揉眼與厚重眼線，卸妝時用棉棒順向清潔根部，讓中段線條維持乾淨。",
    cases: [
      ["柔霧圓眼", "中段 10-11 mm，眼尾降半階，清透放大。"],
      ["日常奶油感", "低密度開扇，適合素顏與淡妝。"],
      ["拍照加強版", "保留圓眼亮點，增加一點鏡頭存在感。"],
    ],
  },
  monolid: {
    name: "單眼皮 · Clean Lift",
    summary: "你的眼型適合乾淨、俐落、能被眼皮看見的睫毛線條，重點是翹度與根部支撐。",
    analysis: "單眼皮常見狀況是嫁接後被眼皮覆蓋，所以不一定要盲目加長。更重要的是選對 Curl、控制根部方向，讓睫毛睜眼後能露出漂亮弧度。",
    design: "清冷上提設計。眼中到眼尾微拉長，根部排列乾淨，讓線條像精緻內眼線。",
    curl: "CC / D 局部混合",
    length: "9-12 mm",
    thickness: "0.05 / 0.06 mm",
    care: "睡前用睫毛刷整理方向，避免厚重眼皮產品堆在根部，維持翹度與乾淨度。",
    cases: [
      ["內眼線感", "根部密度加強，睜眼後線條更明確。"],
      ["清冷單眼皮", "眼尾輕拉長，不壓低眼神。"],
      ["自然放大", "短中長層次，適合日常上班。"],
    ],
  },
  puffy: {
    name: "泡泡眼 · Soft Define",
    summary: "你的眼型需要更輕盈的承重與清楚的翹度，讓眼皮厚度被柔化，而不是被濃密感放大。",
    analysis: "泡泡眼如果使用過粗、過密、過長的設計，視覺上會更沉。適合用細毛、分層與較明確的 Curl，把線條從眼皮厚度裡拉出來。",
    design: "消腫柔焦設計。避開過重濃密，利用輕量開扇與上揚弧度做出乾淨精神感。",
    curl: "CC / D 混合",
    length: "8-11 mm",
    thickness: "0.03 / 0.05 mm",
    care: "前三天避免油類眼霜靠近根部，早上若眼皮浮腫，可先冷敷再輕刷睫毛方向。",
    cases: [
      ["輕盈消腫", "細毛配置減重，眼皮視覺更清爽。"],
      ["柔焦睜眼感", "中段微翹，讓眼神更有精神。"],
      ["低負擔密度", "適合細軟或易垂原生睫毛。"],
    ],
  },
  downturned: {
    name: "下垂眼 · Gentle Lift",
    summary: "你的眼型自帶溫柔感，推薦用眼尾減重與前中段支撐，做出不刻意但很有精神的上提。",
    analysis: "下垂眼不建議把眼尾拉得太長太重，否則會更往下。芊光會把重心放在眼中到眼尾前段，讓線條自然往上走。",
    design: "溫柔上提設計。眼尾收短、前中段支撐，讓眼神保留柔和但不疲憊。",
    curl: "C / CC 局部混合",
    length: "8-11 mm",
    thickness: "0.05 / 0.07 mm",
    care: "洗臉後將眼尾睫毛往外上方梳開，避免眼尾互相交疊造成下壓感。",
    cases: [
      ["溫柔上提", "眼尾收短，降低疲憊感。"],
      ["微笑眼線條", "保留親和力，增加精神感。"],
      ["日常通勤款", "自然密度，掉落後仍然整齊。"],
    ],
  },
  almond: {
    name: "丹鳳眼 · Silky Line",
    summary: "你的眼型線條很有氣質，適合精品感的細長配置，讓眼尾優勢被放大但不顯銳利。",
    analysis: "丹鳳眼本身線條漂亮，重點是不要過度堆疊濃密，避免變得太強勢。細緻排列與眼尾絲滑延伸，會讓整體更高級。",
    design: "絲緞眼線設計。眼尾輕延伸，密度乾淨，讓眼型看起來更俐落精緻。",
    curl: "J / C / CC 客製混合",
    length: "9-12 mm",
    thickness: "0.05 / 0.07 mm",
    care: "避免用睫毛夾破壞嫁接弧度，眼尾可每日輕刷保持線條方向一致。",
    cases: [
      ["絲緞眼線", "眼尾延伸但不厚重，精品感明顯。"],
      ["清冷精緻", "低密度高整齊度，適合精緻妝感。"],
      ["鏡頭線條款", "加強眼尾存在感，拍照更有輪廓。"],
    ],
  },
};

const state = {
  currentQuestion: 0,
  scores: {},
  answers: [],
  currentResult: null,
};

const $ = (selector) => document.querySelector(selector);

const screens = {
  home: $('[data-screen="home"]'),
  quiz: $('[data-screen="quiz"]'),
  loading: $('[data-screen="loading"]'),
  result: $('[data-screen="result"]'),
};

const showScreen = (name) => {
  Object.values(screens).forEach((screen) => screen.classList.remove("is-active"));
  screens[name].classList.add("is-active");
  window.scrollTo({ top: 0, behavior: "smooth" });
};

const resetState = () => {
  state.currentQuestion = 0;
  state.scores = { round: 0, monolid: 0, puffy: 0, downturned: 0, almond: 0 };
  state.answers = [];
  state.currentResult = null;
};

const startQuiz = () => {
  resetState();
  showScreen("quiz");
  renderQuestion();
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

  const answers = $("#answers");
  answers.innerHTML = "";

  question.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.className = "answer-button";
    button.type = "button";
    button.innerHTML = `<strong>${answer.label}</strong><span>${answer.note}</span>`;
    button.addEventListener("click", () => chooseAnswer(answer));
    answers.appendChild(button);
  });
};

const chooseAnswer = (answer) => {
  state.answers.push(answer.label);

  if (answer.result) {
    state.scores[answer.result] += 4;
  }

  Object.entries(answer.effects || {}).forEach(([key, value]) => {
    state.scores[key] += value;
  });

  if (state.currentQuestion < questions.length - 1) {
    state.currentQuestion += 1;
    renderQuestion();
    return;
  }

  showLoading();
};

const showLoading = () => {
  showScreen("loading");
  window.setTimeout(() => {
    state.currentResult = getTopResult();
    renderResult();
    showScreen("result");
  }, 1700);
};

const getTopResult = () => {
  const fallback = "round";
  return Object.entries(state.scores).sort((a, b) => b[1] - a[1])[0]?.[0] || fallback;
};

const renderResult = () => {
  const result = results[state.currentResult];
  $("#resultTitle").textContent = result.name;
  $("#resultSummary").textContent = result.summary;
  $("#resultAnalysis").textContent = result.analysis;
  $("#resultDesign").textContent = result.design;
  $("#resultCurl").textContent = result.curl;
  $("#resultLength").textContent = result.length;
  $("#resultThickness").textContent = result.thickness;
  $("#resultCare").textContent = result.care;
  $("#lineBooking").href = buildLineUrl(result);

  const carousel = $("#caseCarousel");
  carousel.innerHTML = "";
  result.cases.forEach(([title, description]) => {
    const card = document.createElement("figure");
    card.className = "case-card";
    card.innerHTML = `
      <div class="case-image" aria-hidden="true"><div class="case-eye"></div></div>
      <figcaption><strong>${title}</strong><span>${description}</span></figcaption>
    `;
    carousel.appendChild(card);
  });
};

const buildLineUrl = (result) => {
  const text = encodeURIComponent(
    `您好，我完成芊光眼型測驗，結果是「${result.name}」。想預約並討論適合我的睫毛設計。`
  );

  if (LINE_BOOKING_URL === "https://lin.ee/") {
    return `https://line.me/R/msg/text/?${text}`;
  }

  return LINE_BOOKING_URL;
};

const sharePayload = () => {
  const result = state.currentResult ? results[state.currentResult] : null;
  const title = result ? `我的芊光眼型測驗結果：${result.name}` : "芊光 Qianglow Studio 眼型測驗";
  const text = result ? result.summary : "6 題找出你的眼型與專屬睫毛設計。";
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

resetState();
initLiff();
