// hih-language.js의 t()는 선택된 언어의 문구를 반환합니다.
// 분류 ID와 파일 데이터 대신 화면에 보이는 문자열에만 사용합니다.
// 번역 파일이 누락되어도 기본 문구로 업로드와 필터 기능을 계속 실행합니다.
const t = (message, values = {}) => {
    if (window.HIHLanguage?.t) return window.HIHLanguage.t(message, values);
    return message.replace(/\{(\w+)\}/g, (match, key) =>
        Object.hasOwn(values, key) ? String(values[key]) : match);
};

// ==============================
// 1. 스크롤 등장 애니메이션 대상
// ==============================
// 아래 선택자에 해당하는 요소들은 화면에 들어올 때 reveal 애니메이션이 붙습니다.
const revealSelectors = [
    ".hero-copy",
    ".hero-card",
    ".page-header",
    ".section",
    ".mini-card",
    ".info-card",
    ".certificate-card",
    ".project-row",
    ".profile-card",
    ".form-panel",
    ".paper-card",
    ".archive-list",
    ".journey-detail",
    ".journey-list li",
    ".phone-frame",
    ".timeline li",
    ".list-panel div"
];

// ==============================
// 2. 메뉴 버튼 / 사이드바 기능
// ==============================
// JS로 메뉴 버튼과 어두운 배경(menuScrim)을 만들고, 클릭할 때 사이드바를 열고 닫습니다.
const sidebar = document.querySelector(".sidebar");

if (sidebar) {
    const menuButton = document.createElement("button");
    const menuScrim = document.createElement("div");

    menuButton.className = "menu-toggle";
    menuButton.type = "button";
    menuButton.setAttribute("aria-label", t("Open menu"));
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M3 4H21V6H3V4ZM3 11H21V13H3V11ZM3 18H21V20H3V18Z"></path>
        </svg>
    `;

    menuScrim.className = "menu-scrim";

    // prepend()는 body의 맨 앞에 요소를 넣는 함수입니다.
    document.body.prepend(menuScrim);
    document.body.prepend(menuButton);

    // body에 nav-open 클래스를 붙이면 CSS에서 사이드바가 보이게 됩니다.
    const setMenuOpen = (isOpen) => {
        document.body.classList.toggle("nav-open", isOpen);
        menuButton.setAttribute("aria-expanded", String(isOpen));
        menuButton.setAttribute("aria-label", t(isOpen ? "Close menu" : "Open menu"));
    };

    menuButton.addEventListener("click", () => {
        setMenuOpen(!document.body.classList.contains("nav-open"));
    });

    menuScrim.addEventListener("click", () => setMenuOpen(false));

    sidebar.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => setMenuOpen(false));
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            setMenuOpen(false);
        }
    });
    document.addEventListener("hih:languagechange", () => {
        menuButton.setAttribute("aria-label", t(document.body.classList.contains("nav-open") ? "Close menu" : "Open menu"));
    });
}


// ==============================
// 3. 스크롤 등장 애니메이션 실행
// ==============================
// IntersectionObserver는 요소가 화면 안에 들어왔는지 감시하는 브라우저 기능입니다.
const revealItems = document.querySelectorAll(revealSelectors.join(","));

revealItems.forEach((item, index) => {
    item.classList.add("reveal");
    item.style.setProperty("--reveal-delay", `${Math.min(index % 6, 5) * 70}ms`);
});

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.18,
    rootMargin: "0px 0px -8% 0px"
});

revealItems.forEach((item) => observer.observe(item));

// ==============================
// 4. 짧은 알림 Toast 기능
// ==============================
// showToast("메시지")처럼 호출하면 화면 아래에 잠깐 알림이 나타납니다.
const showToast = (message, values) => {
    const toast = document.createElement("div");
    toast.className = "toast";
    toast.textContent = t(message, values);
    toast.setAttribute("role", "status");
    document.body.append(toast);

    requestAnimationFrame(() => toast.classList.add("is-visible"));

    setTimeout(() => {
        toast.classList.remove("is-visible");
        toast.addEventListener("transitionend", () => toast.remove(), { once: true });
    }, 2400);
};

// ==============================
// 5. Career Archive 상태값
// ==============================
// localStorage key와 현재 선택된 카테고리/학기를 저장하는 변수입니다.
const worksheetStorageKey = "hihCareerWorksheets";
const worksheetFileDbName = "hihCareerFiles";
const worksheetFileStoreName = "files";
let currentCategory = "Learning Archive";
let currentSemester = "2026 1학기";

const categoryLabels = {
    "Career Exploration": "진로 탐색",
    "Academic Interests": "관심사와 특기",
    "Learning Archive": "진로 시간 학습지"
};

// 사용자가 입력한 문자를 HTML에 넣을 때 태그로 실행되지 않도록 안전하게 바꿉니다.
const escapeHTML = (value = "") => String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

// ==============================
// 6. 공통 모달 기능
// ==============================
// openModal(() => ({ title, subtitle, body })) 형태로 호출하면 팝업이 열립니다.
// 함수를 전달하면 언어를 바꿀 때 내용만 다시 그릴 수 있습니다.
const openModal = (getContent) => {
    const overlay = document.createElement("div");
    overlay.className = "modal-overlay";
    const render = () => {
        const { title, subtitle, body, actions = "" } = getContent();
        const safeTitle = escapeHTML(title);
        overlay.innerHTML = `
        <section class="modal-card" role="dialog" aria-modal="true" aria-label="${safeTitle}">
            <button class="modal-close" type="button" aria-label="${t("Close")}">×</button>
            <p class="eyebrow">${escapeHTML(subtitle)}</p>
            <h2>${safeTitle}</h2>
            <p>${escapeHTML(body)}</p>
            ${actions}
        </section>
    `;
    };
    render();
    document.addEventListener("hih:languagechange", render);

    document.body.append(overlay);
    requestAnimationFrame(() => overlay.classList.add("is-visible"));

    const handleEscape = (event) => {
        if (event.key === "Escape") {
            closeModal();
        }
    };

    const closeModal = () => {
        overlay.classList.remove("is-visible");
        document.removeEventListener("keydown", handleEscape);
        document.removeEventListener("hih:languagechange", render);
        overlay.addEventListener("transitionend", () => overlay.remove(), { once: true });
    };

    overlay.addEventListener("click", (event) => {
        if (event.target === overlay || event.target.closest(".modal-close")) {
            closeModal();
        }
    });

    document.addEventListener("keydown", handleEscape);
};

// ==============================
// 7. Career Archive 데이터 저장 / 불러오기
// ==============================
// localStorage는 브라우저 안에 데이터를 저장합니다. 새로고침해도 남습니다.
const getStoredWorksheets = () => {
    try {
        return JSON.parse(localStorage.getItem(worksheetStorageKey)) || [];
    } catch {
        return [];
    }
};

const saveStoredWorksheets = (worksheets) => {
    localStorage.setItem(worksheetStorageKey, JSON.stringify(worksheets));
};

// localStorage에는 카드 정보, IndexedDB에는 실제 파일이 저장됩니다.
// 그래서 파일이 필요한 카드인데 IndexedDB 파일이 사라졌다면 카드 정보도 같이 정리합니다.
const getValidStoredWorksheets = async () => {
    const worksheets = getStoredWorksheets();

    if (!worksheets.some((worksheet) => worksheet.fileName)) {
        return worksheets;
    }

    const checkedWorksheets = await Promise.all(worksheets.map(async (worksheet) => {
        if (!worksheet.fileName) {
            return worksheet;
        }

        try {
            const storedFile = await getWorksheetFile(worksheet.id);
            return storedFile ? worksheet : null;
        } catch {
            return null;
        }
    }));

    const validWorksheets = checkedWorksheets.filter(Boolean);

    if (validWorksheets.length !== worksheets.length) {
        saveStoredWorksheets(validWorksheets);
        showToast("Missing file cards were removed");
    }

    return validWorksheets;
};

// 각 학습지를 구분하기 위한 고유 ID를 만듭니다.
const makeId = () => {
    if (crypto.randomUUID) {
        return crypto.randomUUID();
    }

    return `worksheet-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
};

// IndexedDB는 PDF/이미지 같은 파일 Blob을 브라우저 안에 저장할 때 씁니다.
const openWorksheetFileDb = () => new Promise((resolve, reject) => {
    const request = indexedDB.open(worksheetFileDbName, 1);

    request.addEventListener("upgradeneeded", () => {
        request.result.createObjectStore(worksheetFileStoreName);
    });

    request.addEventListener("success", () => resolve(request.result));
    request.addEventListener("error", () => reject(request.error));
});

const storeWorksheetFile = async (id, file) => {
    const db = await openWorksheetFileDb();

    return new Promise((resolve, reject) => {
        const transaction = db.transaction(worksheetFileStoreName, "readwrite");
        const store = transaction.objectStore(worksheetFileStoreName);

        store.put(file, id);
        transaction.addEventListener("complete", resolve);
        transaction.addEventListener("error", () => reject(transaction.error));
    });
};

const getWorksheetFile = async (id) => {
    const db = await openWorksheetFileDb();

    return new Promise((resolve, reject) => {
        const transaction = db.transaction(worksheetFileStoreName, "readonly");
        const store = transaction.objectStore(worksheetFileStoreName);
        const request = store.get(id);

        request.addEventListener("success", () => resolve(request.result));
        request.addEventListener("error", () => reject(request.error));
    });
};

const worksheetGrid = document.querySelector(".worksheet-grid");
const archiveList = document.querySelector(".archive-list");
const archiveForm = document.querySelector(".archive-form");

// 현재 필터 결과가 비어 있으면 empty-state 문구를 보여줍니다.
const updateWorksheetEmptyState = () => {
    const emptyState = document.querySelector(".empty-state");
    const visibleCards = document.querySelectorAll(".paper-card:not([hidden])").length;

    if (emptyState) {
        emptyState.hidden = visibleCards > 0;
        emptyState.textContent = visibleCards > 0
            ? ""
            : t("No worksheets in {semester} / {category}.", {
                semester: t(currentSemester), category: t(categoryLabels[currentCategory] || currentCategory)
            });
    }
};

// 저장된 학습지 데이터 하나를 실제 HTML 카드 요소로 바꿉니다.
const buildPaperCard = (worksheet) => {
    const card = document.createElement("article");
    card.className = "paper-card is-added";
    card.dataset.id = worksheet.id;
    card.dataset.category = worksheet.category;
    card.dataset.semester = worksheet.semester;
    card.dataset.fileName = worksheet.fileName || "";
    card.dataset.fileType = worksheet.fileType || "";
    card.dataset.fileData = worksheet.fileData || "";

    card.innerHTML = `
        <div class="paper-visual" aria-hidden="true">
            <span class="paper-icon">${escapeHTML(worksheet.fileLabel || "DOC")}</span>
        </div>
        <div class="paper-copy">
            <h3>${escapeHTML(worksheet.title)}</h3>
            <p>${escapeHTML(worksheet.description)}</p>
        </div>
        <div class="paper-meta">
            <time>${escapeHTML(worksheet.date)}</time>
            <small>${escapeHTML(t(worksheet.semester))} · ${escapeHTML(t(categoryLabels[worksheet.category] || worksheet.category))}</small>
        </div>
        <span class="paper-cta">${t("Open Item")}</span>
    `;

    return card;
};

// 카드에 클릭/키보드 이벤트를 붙여서 모달 미리보기가 열리게 합니다.
const attachPaperCardBehavior = (card) => {
    if (card.dataset.bound === "true") return;
    card.dataset.bound = "true";
    card.tabIndex = 0;
    card.setAttribute("role", "button");

    const openPaper = async () => {
        const title = card.querySelector("h3")?.textContent.trim();
        const desc = card.querySelector("p")?.textContent.trim();
        const date = card.querySelector("time")?.textContent.trim();
        const id = card.dataset.id;
        const fileName = card.dataset.fileName;
        const fileData = card.dataset.fileData;
        let preview = "";
        let fileUrl = fileData;
        let resolvedFileType = card.dataset.fileType;

        if (!fileUrl && fileName && id) {
            try {
                const storedFile = await getWorksheetFile(id);

                if (storedFile) {
                    fileUrl = URL.createObjectURL(storedFile);
                    resolvedFileType = storedFile.type || resolvedFileType;
                }
            } catch {
                showToast("Could not open this file");
                return;
            }
        }

        if (fileUrl && resolvedFileType.startsWith("image/")) {
            preview = `<div class="modal-preview"><img src="${fileUrl}" alt="${escapeHTML(fileName)}"></div>`;
        } else if (fileUrl && resolvedFileType === "application/pdf") {
            preview = `<div class="modal-preview"><iframe src="${fileUrl}" title="${escapeHTML(fileName)}"></iframe></div>`;
        }

        const fileActions = () => fileUrl
            ? `
                <div class="modal-actions">
                    <a class="button" href="${fileUrl}" target="_blank" rel="noopener">${t("Open File")}</a>
                    <a class="button primary" href="${fileUrl}" download="${escapeHTML(fileName)}">${t("Download File")}</a>
                </div>
            `
            : fileName
                ? `<p class="file-missing">${t("The file name is saved, but the file data is missing. Please attach the same file again.")}</p>`
                : "";

        openModal(() => ({
            title: title || t("Career worksheet"),
            subtitle: t("Worksheet Preview"),
            body: `${desc || t("Career learning archive item")} · ${date || t("No date")}. ${fileName ? t("Attached file: {fileName}", { fileName }) : t("This worksheet is saved as a note without a file.")}`,
            actions: `${preview}${fileActions()}`
        }));
    };

    card.addEventListener("click", openPaper);
    card.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            openPaper();
        }
    });
};

// 왼쪽 학기 목록을 저장된 데이터 기준으로 다시 그립니다.
const renderArchiveLinks = (worksheets = getStoredWorksheets()) => {
    if (!archiveList) return;

    const semesters = [...new Set(["2026 1학기", ...worksheets.map((worksheet) => worksheet.semester)])]
        .filter(Boolean);

    archiveList.innerHTML = "";

    semesters.forEach((semester) => {
        const link = document.createElement("a");
        link.href = "#";
        link.textContent = t(semester);
        link.classList.toggle("active", semester === currentSemester);
        link.addEventListener("click", (event) => {
            event.preventDefault();
            currentSemester = semester;
            renderArchiveLinks();
            filterWorksheets();
            showToast("{semester} opened", { semester: t(semester) });
        });
        archiveList.append(link);
    });
};

// 현재 선택된 카테고리와 학기에 맞는 카드만 보여줍니다.
const filterWorksheets = () => {
    document.querySelectorAll(".paper-card").forEach((card) => {
        const matchesCategory = card.dataset.category === currentCategory;
        const matchesSemester = card.dataset.semester === currentSemester;
        card.hidden = !(matchesCategory && matchesSemester);
    });

    updateWorksheetEmptyState();
};

// localStorage에 저장된 학습지들을 화면에 다시 렌더링합니다.
const renderStoredWorksheets = async () => {
    if (!worksheetGrid) return;

    worksheetGrid.querySelectorAll(".paper-card").forEach((card) => card.remove());

    const worksheets = await getValidStoredWorksheets();

    renderArchiveLinks(worksheets);

    worksheets.forEach((worksheet) => {
        const card = buildPaperCard(worksheet);
        worksheetGrid.append(card);
        attachPaperCardBehavior(card);
    });

    filterWorksheets();
};

// ==============================
// 8. Career Archive 카테고리 탭
// ==============================
// Career Exploration / Academic Interests / Learning Archive 버튼 필터 기능입니다.
document.querySelectorAll(".dashboard-tabs span").forEach((tab) => {
    tab.tabIndex = 0;
    tab.setAttribute("role", "button");

    const activateCategory = () => {
        tab.parentElement.querySelectorAll("span").forEach((item) => item.classList.remove("active"));
        tab.classList.add("active");
        currentCategory = tab.dataset.category || tab.textContent.trim();
        filterWorksheets();
        showToast("{label} selected", { label: tab.textContent.trim() });
    };

    tab.addEventListener("click", activateCategory);
    tab.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            activateCategory();
        }
    });
});

// ==============================
// 9. Skills & Activities 탭
// ==============================
// 현재는 선택 표시와 알림만 담당합니다. 나중에 실제 필터도 여기에 추가할 수 있습니다.
document.querySelectorAll(".activity-tabs span").forEach((tab) => {
    tab.tabIndex = 0;
    tab.setAttribute("role", "button");

    const activateTab = () => {
        tab.parentElement.querySelectorAll("span").forEach((item) => item.classList.remove("active"));
        tab.classList.add("active");
        showToast("{label} selected", { label: tab.textContent.trim() });
    };

    tab.addEventListener("click", activateTab);
    tab.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            activateTab();
        }
    });
});

// ==============================
// 10. 학습지 추가 폼
// ==============================
// 폼 입력값을 읽고, 파일이 있으면 읽은 뒤 localStorage에 저장합니다.
if (archiveForm && worksheetGrid) {
    archiveForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const data = new FormData(archiveForm);
        const file = data.get("worksheetFile");
        let fileName = "";
        let fileType = "";
        let fileLabel = "DOC";

        if (file && file.size > 0) {
            fileName = file.name;
            fileType = file.type || "application/octet-stream";
            fileLabel = fileType.startsWith("image/") ? "IMG" : "PDF";
        }

        const worksheet = {
            id: makeId(),
            title: data.get("worksheetTitle").trim(),
            description: data.get("worksheetDescription").trim(),
            category: data.get("worksheetCategory"),
            semester: data.get("worksheetSemester"),
            date: data.get("worksheetDate"),
            fileName,
            fileType,
            fileData: "",
            fileLabel
        };

        if (file && file.size > 0) {
            try {
                await storeWorksheetFile(worksheet.id, file);
            } catch {
                showToast("Could not save this file in the browser");
                return;
            }
        }

        try {
            const worksheets = getStoredWorksheets();
            worksheets.push(worksheet);
            saveStoredWorksheets(worksheets);
        } catch {
            showToast("Browser storage is full. Try a smaller file.");
            return;
        }

        currentCategory = worksheet.category;
        currentSemester = worksheet.semester;

        document.querySelectorAll(".dashboard-tabs span").forEach((tab) => {
            tab.classList.toggle("active", (tab.dataset.category || tab.textContent.trim()) === currentCategory);
        });

        await renderStoredWorksheets();
        archiveForm.reset();
        showToast("Worksheet added to Career Archive");
    });
}

// Career Archive 페이지가 열릴 때 저장된 자료와 학기 목록을 먼저 그립니다.
renderStoredWorksheets();

// 개발자도구에서 IndexedDB를 지운 뒤 다시 탭으로 돌아오면 화면도 다시 검사합니다.
window.addEventListener("focus", () => {
    renderStoredWorksheets();
});

// ==============================
// 11. Projects 카드 모달
// ==============================
// 프로젝트 카드를 누르면 제목, 설명, 태그를 모아서 상세 모달로 보여줍니다.
document.querySelectorAll(".project-row").forEach((project) => {
    project.tabIndex = 0;
    project.setAttribute("role", "button");

    const openProject = () => {
        openModal(() => {
            const title = project.querySelector("h3")?.textContent.trim() || t("Project");
            const description = project.querySelector("p")?.textContent.trim() || t("Project detail");
            const tags = [...project.querySelectorAll(".project-tags span")]
                .map((tag) => tag.textContent.trim()).join(" · ");
            return {
                title,
                subtitle: t("Project Detail"),
                body: t("{description} Tags: {tags}.", { description, tags }),
                actions: `<a class="button primary" href="hih-growth jour.html?lang=${window.HIHLanguage?.language || "en"}">${t("View Growth")}</a>`
            };
        });
    };

    project.addEventListener("click", openProject);
    project.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            openProject();
        }
    });
});

// ==============================
// 12. Growth Journey 데이터
// ==============================
// 타임라인 날짜를 클릭했을 때 오른쪽 상세 카드에 들어갈 내용입니다.
const journeyDetails = {
    "2026.03": {
        title: "2026.03 진로 탐색 시작",
        activity: "진로 학습지를 통해 관심 분야와 목표를 정리하기 시작했습니다.",
        lesson: "막연한 관심사를 글로 정리하면 다음 행동을 더 쉽게 정할 수 있다는 점을 배웠습니다."
    },
    "2026.04": {
        title: "2026.04 웹 개발 관심 시작",
        activity: "HTML, CSS, JavaScript를 사용해 화면을 구성하는 방법에 더 집중했습니다.",
        lesson: "디자인과 코딩은 따로가 아니라 같은 사용자 경험을 만드는 과정이라는 점을 알게 되었습니다."
    },
    "2026.05": {
        title: "2026.05 React 학습 시작",
        activity: "컴포넌트 단위로 화면을 나누고 상태를 관리하는 방식을 공부했습니다.",
        lesson: "큰 화면도 작은 단위로 나누면 더 차분하게 만들 수 있다는 점을 배웠습니다."
    },
    "2026.06": {
        title: "2026.06 첫 프로젝트 경험",
        activity: "서울동행플라자 키오스크 프로젝트를 진행하며 UI 구조와 사용자 흐름을 고민했습니다.",
        lesson: "프로젝트는 예쁜 화면뿐 아니라 실제 사람이 쉽게 사용할 수 있는 구조가 중요합니다."
    },
    "2026.07": {
        title: "2026.07 AI / 컴퓨터공학 탐구",
        activity: "AI, 알고리즘, 컴퓨터 구조 등 관심 주제를 넓혀 탐구했습니다.",
        lesson: "도구를 잘 쓰려면 원리와 구조를 함께 이해해야 한다는 점을 느꼈습니다."
    },
    "2026.08": {
        title: "2026.08 진로 포트폴리오 구축",
        activity: "HIH를 진로 디지털 포트폴리오로 발전시키며 내 기록을 웹으로 정리했습니다.",
        lesson: "나의 성장 과정을 직접 디자인하면 내가 어디로 가고 있는지 더 선명해집니다."
    }
};

// ==============================
// 13. Growth Journey 클릭 기능
// ==============================
// 왼쪽 월별 항목을 누르면 오른쪽 상세 내용이 해당 월의 내용으로 바뀝니다.
document.querySelectorAll(".journey-list li").forEach((item) => {
    item.tabIndex = 0;
    item.setAttribute("role", "button");

    const updateJourney = (notify = true) => {
        const date = item.querySelector("time")?.textContent.trim();
        const detail = journeyDetails[date];
        const panel = document.querySelector(".journey-detail");

        if (!detail || !panel) return;

        document.querySelectorAll(".journey-list li").forEach((li) => li.classList.remove("current"));
        item.classList.add("current");
        panel.querySelector("h2").textContent = t(detail.title);
        const paragraphs = panel.querySelectorAll("p");
        paragraphs[1].textContent = t(detail.activity);
        paragraphs[2].textContent = t(detail.lesson);
        if (notify) showToast("{date} journey selected", { date });
    };

    item.addEventListener("click", updateJourney);
    item.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            updateJourney();
        }
    });
    document.addEventListener("hih:languagechange", () => {
        if (item.classList.contains("current")) updateJourney(false);
    });
});

// 13-1. 언어만 바뀌면 카드의 표시 문구만 갱신합니다. 파일과 필터 값은 그대로입니다.
document.addEventListener("hih:languagechange", () => {
    if (!worksheetGrid) return;
    renderArchiveLinks();
    worksheetGrid.querySelectorAll(".paper-card").forEach((card) => {
        card.querySelector("small").textContent = `${t(card.dataset.semester)} · ${t(categoryLabels[card.dataset.category] || card.dataset.category)}`;
        card.querySelector(".paper-cta").textContent = t("Open Item");
    });
    updateWorksheetEmptyState();
});

// ==============================
// 14. Bio-site 요청 폼
// ==============================
// Bio-site 제작 요청 정보를 브라우저 localStorage에 저장합니다.
const bioForm = document.querySelector(".form-panel form");

if (bioForm) {
    bioForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const data = new FormData(bioForm);
        const request = {
            name: data.get("name")?.trim(),
            title: data.get("title")?.trim(),
            layout: data.get("layout"),
            features: data.get("features")?.trim(),
            savedAt: new Date().toISOString()
        };

        if (!request.name || !request.title || !request.layout || !request.features) {
            showToast("Please fill in every field first");
            return;
        }

        localStorage.setItem("hihBioSiteRequest", JSON.stringify(request));
        showToast("Bio-site request saved in this browser");
        bioForm.reset();
    });
}
