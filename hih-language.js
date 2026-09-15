(() => {
    "use strict";

    // 1. 번역 사전: [영어, 한국어] 순서입니다. 새 문구도 여기에 추가합니다.
    // HTML에 원래 한국어로 적힌 문구도 양쪽 언어로 찾을 수 있습니다.
    const messages = [
        ["Home", "홈"],
        ["About Me", "나의 소개"],
        ["Career Learning", "진로 학습"],
        ["Skills & Activities", "역량과 활동"],
        ["Projects", "프로젝트"],
        ["Growth Journey", "성장 여정"],
        ["Bio Site", "나만의 페이지 만들기"],
        ["About", "소개"],
        ["Portfolio", "포트폴리오"],
        ["Request", "제작 요청"],
        ["Email", "이메일"],
        ["Career digital portfolio", "진로 디지털 포트폴리오"],
        ["My Career digital portfolio", "할림이의 진로 디지털 포트폴리오"],
        ["Seoul, Korea", "대한민국 서울"],
        ["🏫 Seoul, Korea", "🏫 대한민국 서울"],
        ["HIH Home", "HIH 홈"],
        ["Main navigation", "메인 메뉴"],
        ["Quick navigation", "바로가기"],
        ["HIH logo", "HIH 로고"],
        ["Halim's H monogram", "할림의 H 로고"],
        ["Open menu", "메뉴 열기"],
        ["Close menu", "메뉴 닫기"],
        ["Language", "언어"],
        ["Close", "닫기"],
        ["UI/UX Programmer · History Enthusiast", "UI/UX 개발자 · 역사 덕후"],
        ["A Korean-born Indonesian Muslim student building a career portfolio through programming, science, languages, and creative projects.", "한국에서 태어난 인도네시아 무슬림 학생으로 프로그래밍, 과학, 언어, 역사 프로젝트를 통해 나의 포트폴리오를 쌓아가고 있다."],
        ["View Profile", "프로필 보기"],
        ["See Work", "프로젝트 보기"],
        ["Scroll down", "아래로"],
        ["Latest", "최근 소식"],
        ["Recent Activity", "최근 활동"],
        ["Project", "프로젝트"],
        ["Learning", "학습"],
        ["Certificate", "자격증"],
        ["Career learning archive update", "진로 프린트 자료실 업데이트"],
        ["AI-POT", "AI-POT 자격증"],
        ["Profile", "프로필"],
        ["About Halim", "할림은 처음이지?"],
        ["I study in Korea while keeping my Indonesian identity close. My goal is to grow into a creator who can connect technology, learning, and real people.", "인도네시아인으로서의  한국에서 초-중-고등학교에 다니고 있다,. 배움과 지식, 사람을 연결하는 창작자로 성장하고 싶다."],
        ["Languages", "사용 언어"],
        ["Portfolio Works", "포트폴리오 작품"],
        ["Career Growth", "진로 여정"],
        ["Strength", "강점"],
        ["Personal Traits", "나의 주무기"],
        ["Programming Languages", "프로그래밍 언어"],
        ["Python, HTML, CSS, JavaScript, and web development basics.", "Python, HTML, CSS, JavaScript와 웹 개발의 기초를 공부합니다."],
        ["Scientific Thinking", "과학적 사고"],
        ["Strong curiosity around physics concepts, algorithms, and systems.", "물리학과 알고리즘, 시스템의 원리에 깊은 호기심을 갖고 있습니다."],
        ["Language Skills", "언어 능력"],
        ["Fluent in Indonesian, English, and Korean.", "인도네시아어, 영어, 한국어를 유창하게 사용합니다."],
        ["Timeline", "타임라인"],
        ["Career exploration started", "진로 탐색 시작 - 프로그래밍 복귀"],
        ["Web development interest became stronger", "웹 개발을 배우기 시작 - HTML CSS JS"],
        ["React learning began", "React 배우기 시작, 프론트엔드 시작"],
        ["First project experience - Seoul Donghaeng Plaza kiosk", "첫 프로젝트 경험 - 서울동행플라자 키오스크"],
        ["Chuncheon Data Hackathon award", "2026 춘천시 해커톤 대회 장려상"],
        ["AI and computer science exploration", "CPU-GPU 시스템 연구 시작"],
        ["Introducing who I am, what I care about, and where I want to grow next.", "어떤 사람인지, 무엇에 관심이 있는지, 앞으로 어떻게 성장하고 싶은지 소개합니다."],
        ["Software and AI learner", "소프트웨어와 AI를 배우는 학생"],
        ["Introduce Me", "자기소개"],
        ["I am a Korean-born Indonesian Muslim student who keeps learning through coding, science, design, and real projects. I study in Korea and also stay connected to Indonesian education and culture.", "한국에서 태어난 인도네시아인 무슬림 학생이다. 코딩, 과학, 디자인과 실제 프로젝트를 통해 꾸준히 배우고 있다. 한국에서 공부하면서 인도네시아의 교육과 문화도 함께 이어가고 있다."],
        ["Traits", "나의 성향"],
        ["Curious, multilingual, persistent, and comfortable learning new tools. I like turning rough ideas into something people can actually use.", "호기심이 많고 3개 국어를 사용하며, 끈기 있게 새로운 도구를 배운다. 막연한 아이디어를 사람들이 실제로 사용할 수 있고 선한 영향력을 만드는 결과물로 만드는 일을 좋아한다."],
        ["Vision", "나의 목표"],
        ["My goal is to enter a top university and build skills in computer science, AI, and meaningful technology for people.", "우수한 대학에 진학해 컴퓨터공학과와 인문 계열 복수 전공으로 AI와 인문학을 배우는게 목표입니다."],
        ["Interests", "관심 분야"],
        ["#AI", "#AI"],
        ["#History", "#역사"],
        ["#UI/UX", "#UI/UX"],
        ["#Full-Stacks Wannabe", "#풀스택 지향"],
        ["#Computer Science", "#컴퓨터공학"],
        ["#Algorithms", "#알고리즘"],
        ["#Systems", "#시스템"],
        ["#Dakwah", "#다와"],
        ["Proficient in Python and web development fundamentals.", "파이썬과 웹 프론트를 익히고 프로젝트에 활용한다."],
        ["Strong understanding of physics concepts and problem-solving patterns.", "물리 (과학) 개념과 문제 해결 방식을 이해하고 적용합니다."],
        ["History Enthusiast", "역사에 대한 전문 지식"],
        ["Interested in history knowledge, especially Korean history.", "역사, 특히 한국사에 관심이 많다 (장담컨대 한능검 3급이다)."],
        ["Career Class Archive", "진로 학습 자료실"],
        ["A collection of career-class worksheets and exploration notes.", "진로 시간 학습지와 탐색 기록을 모아두는 페이지입니다."],
        ["Learning Archive", "진로 시간 학습지"],
        ["Academic Interests", "관심사와 특기"],
        ["Hobbies and skills", "취미 및 특기"],
        ["Career Exploration", "진로 탐색"],
        ["Add career worksheet", "진로 학습지 추가"],
        ["Add Print", "자료 등록"],
        ["Add worksheet", "학습지 추가"],
        ["Title", "제목"],
        ["Description", "설명"],
        ["Category", "분류"],
        ["Semester", "학기"],
        ["Date", "날짜"],
        ["File", "파일"],
        ["e.g. Career worksheet 05", "예: 진로 학습지 05"],
        ["e.g. Careers I am interested in", "예: 나의 관심 직업 정리"],
        ["2026 Semester 1", "2026 1학기"],
        ["2026 Semester 2", "2026 2학기"],
        ["2025 Semester 2", "2025 2학기"],
        ["Add to Archive", "자료실에 추가"],
        ["Semester archive", "학기별 자료"],
        ["No worksheets yet. Add your class handouts or worksheets using the form above.", "아직 추가된 학습지가 없습니다. 위 폼에서 수업 프린트나 학습지를 추가해보세요."],
        ["No worksheets in {semester} / {category}.", "{semester} / {category}에 추가된 학습지가 없습니다."],
        ["Open Item", "자료 열기"],
        ["Career worksheet", "진로 학습지"],
        ["Career learning archive item", "진로 학습 자료"],
        ["No date", "날짜 없음"],
        ["Worksheet Preview", "학습지 미리보기"],
        ["Open File", "파일 열기"],
        ["Download File", "파일 다운로드"],
        ["Attached file: {fileName}", "첨부 파일: {fileName}"],
        ["This worksheet is saved as a note without a file.", "파일 없이 기록만 저장된 학습지입니다."],
        ["The file name is saved, but the file data is missing. Please attach the same file again.", "파일 이름은 저장되어 있지만 파일 데이터가 없습니다. 같은 파일을 다시 첨부해서 추가해주세요."],
        ["Missing file cards were removed", "파일이 없는 자료 카드를 정리했습니다."],
        ["Could not open this file", "파일을 열 수 없습니다."],
        ["Could not save this file in the browser", "브라우저에 파일을 저장하지 못했습니다."],
        ["Browser storage is full. Try a smaller file.", "브라우저 저장 공간이 부족합니다. 더 작은 파일로 시도해주세요."],
        ["Worksheet added to Career Archive", "진로 자료실에 학습지를 추가했습니다."],
        ["{label} selected", "{label} 선택됨"],
        ["{semester} opened", "{semester} 자료를 열었습니다."],
        ["School activities, club experiences, technical skills, and certificates.", "학교 활동과 동아리 경험, 기술 역량과 자격증을 정리합니다."],
        ["Activity Tabs", "활동 분류"],
        ["School Activities", "학교 활동"],
        ["Club Activities", "동아리 활동"],
        ["Skills", "기술 역량"],
        ["Certificates", "자격증"],
        ["Outstanding achievement", "3급"],
        ["Korean History Proficiency Test", "한국사능력검정시험"],
        ["Chuncheon Data Hackathon", "2026 춘천시 데이터활용 해커톤"],
        ["Encouragement Award", "장려상"],
        ["Sunrin Software Sharing Festival", "2026 선린 소프트웨어나눔축제"],
        ["TAPIE", "TAPIE (테이피)"],
        ["More Growth", "앞으로의 성장"],
        ["New activities and certificates will be added here.", "새로운 활동과 자격증을 이곳에 기록할 예정입니다."],
        ["Achievement", "성과"],
        ["Awards", "수상 내역"],
        ["School", "학교"],
        ["Chuncheon Data Hackathon Encouragement Award.", "2026 춘천시 데이터활용 해커톤 장려상"],
        ["온 가족 북웨이브 100일 챌린지 수상", "온 가족 북웨이브 100일 챌린지 수상"],
        ["서울로봇고등학교 영재교육원 수료 and top award.", "/ 서울로봇고등학교 영재교육원 수료 및 최우수상"],
        ["2025 KMF Scholarship", "2025 한국이슬람교 초승달장학금 수상"],
        ["2024 Seoul National University of Education Bilingual Festival Encouragement Award", "2024 서울교육대학교 이중언어페스티벌 장려상"],
        ["Project Lab", "프로젝트 기록"],
        ["Research, school projects, and personal web projects collected in one place.", "탐구 활동, 학교 프로젝트, 개인 웹 프로젝트를 한곳에 모았습니다."],
        ["Researches", "탐구 활동"],
        ["School Projects", "학교 프로젝트"],
        ["My Projects", "개인 프로젝트"],
        ["Accessible kiosk interface project designed for a school project experience.", "학교 프로젝트로 제작한 접근성을 고려한 키오스크 인터페이스입니다."],
        ["Travel web page project for Korean tourism packages and itinerary pages.", "한국 관광 상품과 여행 일정을 무슬림 관광객들에게 소개하는 여행 웹페이지 프로젝트입니다."],
        ["Tourism", "관광"],
        ["Chemistry educational site created through AI-assisted exploration.", "바이브코딩으로 개발하며 제작한 화학 교육 사이트입니다."],
        ["Education", "교육"],
        ["Chemistry", "화학"],
        ["First Vibe-Coded Web", "첫 바이브 코딩 웹사이트"],
        ["AI Assisted", "AI 활용"],
        ["First python project, as my research paper in middle school.", "중학교 탐구 보고서를 위해 만든 첫 Python 프로젝트입니다."],
        ["Web-Simulator", "웹 시뮬레이터"],
        ["Project detail", "프로젝트 상세 내용"],
        ["Project Detail", "프로젝트 상세"],
        ["{description} Tags: {tags}.", "{description} 사용 기술: {tags}."],
        ["View Growth", "성장 여정 보기"],
        ["A space to reflect on monthly growth and record what I have learned.", "월별 성장 과정을 돌아보고, 배운 점을 기록하는 공간입니다."],
        ["Started taking an interest in web development", "웹 개발에 관심을 가지기 시작"],
        ["AI / computer science exploration", "AI / 컴퓨터공학 탐구"],
        ["Building a career portfolio", "진로 포트폴리오 구축"],
        ["Selected Moment", "선택한 순간"],
        ["Activities", "당시 활동"],
        ["Lessons learned", "배운 점"],
        ["I learned about UI structure, user flows, and collaboration through the Seoul Donghaeng Plaza kiosk project.", "서울동행플라자 키오스크 프로젝트를 진행하며 UI 구조, 사용자 흐름, 협업 방식에 대해 배웠습니다."],
        ["Turning an idea into code taught me that a clear structure for real users matters as much as appearance.", "아이디어를 코드로 옮길 때는 화면의 예쁨뿐 아니라 실제 사용자가 쉽게 이해할 수 있는 구조가 중요하다는 점을 알게 되었습니다."],
        ["Mobile", "모바일"],
        ["Responsive Preview", "반응형 미리보기"],
        ["Mobile layout preview", "모바일 레이아웃 미리보기"],
        ["{date} journey selected", "{date} 성장 기록을 선택했습니다."],
        ["2026.03 Career exploration started", "2026.03 진로 탐색 시작"],
        ["2026.04 Interest in web development", "2026.04 웹 개발 관심 시작"],
        ["2026.05 React learning began", "2026.05 React 학습 시작"],
        ["2026.06 First project experience", "2026.06 첫 프로젝트 경험"],
        ["2026.07 AI / computer science exploration", "2026.07 AI / 컴퓨터공학 탐구"],
        ["2026.08 Building a career portfolio", "2026.08 진로 포트폴리오 구축"],
        ["Career worksheets helped me start organizing my interests and goals.", "진로 학습지를 통해 관심 분야와 목표를 정리하기 시작했습니다."],
        ["Writing down vague interests makes it easier to choose the next step.", "막연한 관심사를 글로 정리하면 다음 행동을 더 쉽게 정할 수 있다는 점을 배웠습니다."],
        ["I focused more on building interfaces with HTML, CSS, and JavaScript.", "HTML, CSS, JavaScript를 사용해 화면을 구성하는 방법에 더 집중했습니다."],
        ["Design and coding work together to create one user experience.", "디자인과 코딩은 따로가 아니라 같은 사용자 경험을 만드는 과정이라는 점을 알게 되었습니다."],
        ["I studied how to break interfaces into components and manage state.", "컴포넌트 단위로 화면을 나누고 상태를 관리하는 방식을 공부했습니다."],
        ["Breaking a large interface into smaller parts makes it easier to build.", "큰 화면도 작은 단위로 나누면 더 차분하게 만들 수 있다는 점을 배웠습니다."],
        ["I explored UI structure and user flows while building the Seoul Donghaeng Plaza kiosk project.", "서울동행플라자 키오스크 프로젝트를 진행하며 UI 구조와 사용자 흐름을 고민했습니다."],
        ["A project needs a structure that real people can use easily, as well as a good-looking interface.", "프로젝트는 예쁜 화면뿐 아니라 실제 사람이 쉽게 사용할 수 있는 구조가 중요합니다."],
        ["I expanded my exploration to AI, algorithms, and computer architecture.", "AI, 알고리즘, 컴퓨터 구조 등 관심 주제를 넓혀 탐구했습니다."],
        ["Using tools well also requires understanding their principles and structure.", "도구를 잘 쓰려면 원리와 구조를 함께 이해해야 한다는 점을 느꼈습니다."],
        ["I organized my records on the web while developing HIH into a career digital portfolio.", "HIH를 진로 디지털 포트폴리오로 발전시키며 내 기록을 웹으로 정리했습니다."],
        ["Silver Award at Yeongwon Middle School Science Fair.", "영원중학교 교내 과학전람회 은상."],
        ["Designing my own growth record makes my direction clearer.", "나의 성장 과정을 직접 디자인하면 내가 어디로 가고 있는지 더 선명해집니다."],
        ["Make Your Page", "나만의 페이지 만들기"],
        ["A simple request form for people who want a small personal bio site.", "개인 소개 사이트를 원하는 분들을 위한 간단한 제작 요청 양식입니다."],
        ["Bio-site Builder", "소개 사이트 제작"],
        ["Share your name, title, preferred layout, and the features you want to show. This page keeps the request simple and clean.", "이름과 사이트 제목, 원하는 레이아웃과 기능을 알려주세요. 간단한 양식으로 제작을 요청할 수 있습니다."],
        ["REQUEST FORM", "제작 요청서"],
        ["Make your Bio-site", "소개 사이트 제작 요청"],
        ["1. Enter your name", "1. 이름을 입력해주세요"],
        ["Name", "이름"],
        ["2. Enter the bio-site title you want", "2. 원하는 사이트 제목을 입력해주세요"],
        ["3. Which layout do you prefer?", "3. 어떤 레이아웃을 선호하나요?"],
        ["Minimalist", "미니멀"],
        ["Futuristic", "미래적인 스타일"],
        ["Pitch Deck", "발표 자료 스타일"],
        ["Creative", "창의적인 스타일"],
        ["Business-style", "비즈니스 스타일"],
        ["4. Write the features you want to show", "4. 넣고 싶은 기능을 적어주세요"],
        ["Links, profile, gallery, skills, contact, achievements...", "링크, 프로필, 갤러리, 기술 역량, 연락처, 성과 등"],
        ["Submit Request", "제작 요청 저장"],
        ["Please fill in every field first", "모든 항목을 먼저 입력해주세요."],
        ["Bio-site request saved in this browser", "이 브라우저에 제작 요청을 저장했습니다."],
        ["HIH | About Me", "HIH | 나의 소개"],
        ["HIH | Career Learning", "HIH | 진로 학습"],
        ["HIH | Skills & Activities", "HIH | 역량과 활동"],
        ["HIH | Projects", "HIH | 프로젝트"],
        ["HIH | Growth Journey", "HIH | 성장 여정"],
        ["HIH | Bio Site Request", "HIH | 소개 사이트 제작 요청"]
    ];

    // 번호가 붙은 페이지 제목도 같은 사전을 사용합니다.
    ["About Me", "Career Learning", "Skills & Activities", "Projects", "Growth Journey", "Bio Site"]
        .forEach((title, index) => {
            const korean = messages.find(([english]) => english === title)[1];
            messages.push([`0${index + 2}. ${title}`, `0${index + 2}. ${korean}`]);
        });

    const dictionary = new Map();
    messages.forEach(([en, ko]) => {
        dictionary.set(en, { en, ko });
        dictionary.set(ko, { en, ko });
    });

    // 2. 언어 선택만 저장합니다. 학습지 DB나 사용자가 쓴 내용은 수정하지 않습니다.
    const storageKey = "hihLanguage";
    const supported = ["ko", "en"];
    const defaultLanguage = (navigator.languages || [navigator.language])
        .find((language) => /^(ko|en)(-|$)/i.test(language))?.slice(0, 2).toLowerCase() || "en";
    let language = defaultLanguage;
    try {
        const saved = localStorage.getItem(storageKey);
        if (supported.includes(saved)) language = saved;
    } catch {
        // 저장이 차단된 브라우저에서도 현재 페이지의 언어 전환은 가능합니다.
    }
    const requestedLanguage = new URL(location.href).searchParams.get("lang");
    if (supported.includes(requestedLanguage)) language = requestedLanguage;

    // t("{label} selected", { label: "React" })처럼 변수도 넣을 수 있습니다.
    const t = (source, values = {}) => {
        const template = dictionary.get(source)?.[language] || source;
        return template.replace(/\{(\w+)\}/g, (match, key) =>
            Object.hasOwn(values, key) ? String(values[key]) : match);
    };

    // 3. 처음 HTML에 들어 있던 문구만 등록합니다. innerHTML을 다시 만들지 않으므로
    // 링크, 이벤트, 입력 중인 폼 값은 유지됩니다. 동적 UI는 별도로 t()를 호출합니다.
    const bindings = [];
    const walker = document.createTreeWalker(document.documentElement, NodeFilter.SHOW_TEXT);
    while (walker.nextNode()) {
        const node = walker.currentNode;
        if (node.parentElement.closest("script, style, textarea, [translate='no']")) continue;
        const source = node.data.trim();
        if (!dictionary.has(source)) continue;
        const leading = node.data.match(/^\s*/)[0];
        const trailing = node.data.match(/\s*$/)[0];
        bindings.push(() => {
            if (node.isConnected) node.data = leading + t(source) + trailing;
        });
    }
    document.querySelectorAll("[placeholder], [aria-label], [alt], [title]").forEach((element) => {
        ["placeholder", "aria-label", "alt", "title"].forEach((attribute) => {
            const source = element.getAttribute(attribute);
            if (dictionary.has(source)) bindings.push(() => element.setAttribute(attribute, t(source)));
        });
    });

    // HTML 파일을 직접 열 때도 페이지 사이에 언어를 전달하도록 URL에 lang을 붙입니다.
    const pageLinks = [...document.querySelectorAll("a[href]")].filter((link) => {
        if (link.getAttribute("href").startsWith("#")) return false;
        const url = new URL(link.href, location.href);
        return url.origin === location.origin && url.pathname.endsWith(".html");
    });

    // 4. 두 버튼 중 현재 언어를 aria-pressed로 표시합니다. 키보드로도 선택 가능합니다.
    const switcher = document.createElement("div");
    switcher.className = "language-switcher";
    switcher.setAttribute("role", "group");
    [["ko", "한국어"], ["en", "EN"]].forEach(([locale, label]) => {
        const button = document.createElement("button");
        button.type = "button";
        button.lang = locale;
        button.textContent = label;
        button.dataset.language = locale;
        button.setAttribute("aria-label", locale === "ko" ? "한국어" : "English");
        button.addEventListener("click", () => setLanguage(locale));
        switcher.append(button);
    });
    document.body.append(switcher);

    const applyLanguage = () => {
        document.documentElement.lang = language;
        bindings.forEach((update) => update());
        pageLinks.forEach((link) => {
            const url = new URL(link.href, location.href);
            url.searchParams.set("lang", language);
            link.href = url.href;
        });
        switcher.setAttribute("aria-label", t("Language"));
        switcher.querySelectorAll("button").forEach((button) => {
            button.setAttribute("aria-pressed", String(button.dataset.language === language));
        });
    };

    const setLanguage = (locale, persist = true) => {
        if (!supported.includes(locale)) return;
        language = locale;
        try {
            const url = new URL(location.href);
            url.searchParams.set("lang", locale);
            history.replaceState(null, "", url.href);
        } catch { /* 브라우저가 파일 URL 변경을 제한해도 전환은 계속합니다. */ }
        if (persist) {
            try { localStorage.setItem(storageKey, locale); } catch { /* 세션 내 전환 유지 */ }
        }
        applyLanguage();
        // 다른 JS에 언어 변경을 알려 카드와 팝업도 새 언어로 표시합니다.
        document.dispatchEvent(new CustomEvent("hih:languagechange", { detail: { language } }));
    };

    window.HIHLanguage = { t, setLanguage, get language() { return language; } };
    applyLanguage();
    window.addEventListener("storage", (event) => {
        if (event.key === storageKey || event.key === null) {
            setLanguage(supported.includes(event.newValue) ? event.newValue : defaultLanguage, false);
        }
    });
})();
