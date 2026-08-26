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


//사이드바 기능
const sidebar = document.querySelector(".sidebar");

if (sidebar) {
    const menuButton = document.createElement("button");
    const menuScrim = document.createElement("div");

    menuButton.className = "menu-toggle";
    menuButton.type = "button";
    menuButton.setAttribute("aria-label", "Open menu");
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M3 4H21V6H3V4ZM3 11H21V13H3V11ZM3 18H21V20H3V18Z"></path>
        </svg>
    `;

    menuScrim.className = "menu-scrim";

    document.body.prepend(menuScrim);
    document.body.prepend(menuButton);

    const setMenuOpen = (isOpen) => {
        document.body.classList.toggle("nav-open", isOpen);
        menuButton.setAttribute("aria-expanded", String(isOpen));
        menuButton.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
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
}


//스크롤 애니메이션 기능
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

const showToast = (message) => {
    const toast = document.createElement("div");
    toast.className = "toast";
    toast.textContent = message;
    document.body.append(toast);

    requestAnimationFrame(() => toast.classList.add("is-visible"));

    setTimeout(() => {
        toast.classList.remove("is-visible");
        toast.addEventListener("transitionend", () => toast.remove(), { once: true });
    }, 2400);
};

const openModal = ({ title, subtitle, body, actions = "" }) => {
    const overlay = document.createElement("div");
    overlay.className = "modal-overlay";
    overlay.innerHTML = `
        <section class="modal-card" role="dialog" aria-modal="true" aria-label="${title}">
            <button class="modal-close" type="button" aria-label="Close">×</button>
            <p class="eyebrow">${subtitle}</p>
            <h2>${title}</h2>
            <p>${body}</p>
            ${actions}
        </section>
    `;

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
        overlay.addEventListener("transitionend", () => overlay.remove(), { once: true });
    };

    overlay.addEventListener("click", (event) => {
        if (event.target === overlay || event.target.closest(".modal-close")) {
            closeModal();
        }
    });

    document.addEventListener("keydown", handleEscape);
};

document.querySelectorAll(".dashboard-tabs span, .activity-tabs span").forEach((tab) => {
    tab.tabIndex = 0;
    tab.setAttribute("role", "button");

    const activateTab = () => {
        const group = tab.parentElement;
        group.querySelectorAll("span").forEach((item) => item.classList.remove("active"));
        tab.classList.add("active");
        showToast(`${tab.textContent.trim()} selected`);
    };

    tab.addEventListener("click", activateTab);
    tab.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            activateTab();
        }
    });
});

document.querySelectorAll(".archive-list a").forEach((link) => {
    link.addEventListener("click", (event) => {
        event.preventDefault();
        link.parentElement.querySelectorAll("a").forEach((item) => item.classList.remove("active"));
        link.classList.add("active");
        showToast(`${link.textContent.trim()} opened`);
    });
});

document.querySelectorAll(".paper-card").forEach((card) => {
    card.tabIndex = 0;
    card.setAttribute("role", "button");

    const openPaper = () => {
        const title = card.querySelector("h3")?.textContent.trim() || "Career worksheet";
        const desc = card.querySelector("p")?.textContent.trim() || "Career learning archive item";
        const date = card.querySelector("time")?.textContent.trim() || "No date";

        openModal({
            title,
            subtitle: "Worksheet Preview",
            body: `${desc} · ${date}. PDF 파일을 나중에 연결하면 이 카드에서 미리보기와 다운로드를 열 수 있어요.`,
            actions: `<button type="button" class="modal-action">Download later</button>`
        });
    };

    card.addEventListener("click", openPaper);
    card.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            openPaper();
        }
    });
});

document.querySelectorAll(".project-row").forEach((project) => {
    project.tabIndex = 0;
    project.setAttribute("role", "button");

    const openProject = () => {
        const title = project.querySelector("h3")?.textContent.trim() || "Project";
        const desc = project.querySelector("p")?.textContent.trim() || "Project detail";
        const tags = [...project.querySelectorAll(".project-tags span")]
            .map((tag) => tag.textContent.trim())
            .join(" · ");

        openModal({
            title,
            subtitle: "Project Detail",
            body: `${desc} Tags: ${tags}. 나중에 실제 상세 페이지나 GitHub 링크를 연결할 수 있어요.`,
            actions: `<a class="button primary" href="hih-growth jour.html">View Growth</a>`
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

document.querySelectorAll(".journey-list li").forEach((item) => {
    item.tabIndex = 0;
    item.setAttribute("role", "button");

    const updateJourney = () => {
        const date = item.querySelector("time")?.textContent.trim();
        const detail = journeyDetails[date];
        const panel = document.querySelector(".journey-detail");

        if (!detail || !panel) return;

        document.querySelectorAll(".journey-list li").forEach((li) => li.classList.remove("current"));
        item.classList.add("current");
        panel.querySelector("h2").textContent = detail.title;
        const paragraphs = panel.querySelectorAll("p");
        paragraphs[1].textContent = detail.activity;
        paragraphs[2].textContent = detail.lesson;
        showToast(`${date} journey selected`);
    };

    item.addEventListener("click", updateJourney);
    item.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            updateJourney();
        }
    });
});

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
