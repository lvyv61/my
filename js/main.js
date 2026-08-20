/* ============================================================
   个人作品集 · 交互脚本

   ▸ 所有个人信息都在下方 CONFIG 中修改
   ▸ 作品数据在 PROJECTS 中修改
   改完保存刷新即可，无需构建。
   ============================================================ */

(function () {
  "use strict";

  /* ---------- 个人信息（改这里） ---------- */
  const CONFIG = {
    name: "陆宇",
    initials: "LvYv61",
    role: "AIGC爱好者",
    tagline: "AI让世界开始加速",
    intro:
      "你好，我是林一，一位住在上海的视觉设计师与前端爱好者。我热爱把复杂的问题变得简单、优雅，也乐于用设计和技术讲述品牌的故事。",
    bio2:
      "过去几年里，我参与过从品牌重塑、产品界面到内容创作的各类项目，和不同规模的团队一起把想法变成现实。工作之外，我喜欢用相机记录城市，也喜欢研究那些「好得让人察觉不到」的细节。",
    location: "上海 · 中国",
    available: "开放合作中",
    email: "hello@yourname.com",
    stats: [
      { value: "6+", label: "年设计经验" },
      { value: "40+", label: "完成项目" },
      { value: "15+", label: "合作品牌" }
    ],
    skills: ["品牌设计", "UI/UX 设计", "网页开发", "插画", "摄影", "视频剪辑"],
    tools: ["Figma", "Photoshop", "Illustrator", "Blender", "VS Code", "After Effects"],
    socials: [
      { label: "GitHub", url: "https://github.com/" },
      { label: "Dribbble", url: "https://dribbble.com/" },
      { label: "微博", url: "https://weibo.com/" },
      { label: "小红书", url: "https://www.xiaohongshu.com/" }
    ]
  };

  /* ---------- 作品数据（改这里） ----------
     字段说明：
     title      作品名称
     category   分类（用于筛选）
     year       年份
     desc       一句话介绍
     tags       标签数组
     cover      封面：可以是渐变字符串，也可以是图片路径（如 "assets/photo.jpg"）
     link       案例链接（留空 "" 则整卡不可点击）
  */
  const PROJECTS = [
    {
      title: "「焙」咖啡品牌视觉焕新",
      category: "品牌设计",
      year: "2026",
      desc: "为独立咖啡品牌「焙」重塑完整视觉系统：从标志、包装到空间导视，上线 3 个月门店复购率提升 22%。",
      tags: ["Logo", "VI", "包装"],
      cover: "linear-gradient(135deg, #ff9a62, #ff5e7a)",
      link: ""
    },
    {
      title: "Flow 数据仪表盘",
      category: "UI/UX",
      year: "2025",
      desc: "为 SaaS 团队设计的实时数据分析平台，重构信息架构与设计系统，关键操作路径缩短 40%。",
      tags: ["Web App", "设计系统", "原型"],
      cover: "linear-gradient(135deg, #7c6cff, #43d5f2)",
      link: ""
    },
    {
      title: "极简博客主题「纸」",
      category: "网页开发",
      year: "2025",
      desc: "一套为文字而生的轻量博客主题，注重排版与阅读体验，全站无框架、加载时间低于 1 秒。",
      tags: ["HTML/CSS", "主题", "排版"],
      cover: "linear-gradient(135deg, #22c1a3, #2f80ed)",
      link: ""
    },
    {
      title: "城市光影",
      category: "摄影",
      year: "2024",
      desc: "两年间行走于 12 座城市，用 2000+ 张胶片记录街头的光、影与日常瞬间，精选 30 张集结成册。",
      tags: ["胶片", "街头", "影集"],
      cover: "linear-gradient(135deg, #1f3b73, #59c3f0)",
      link: ""
    },
    {
      title: "《山海》幻想插画系列",
      category: "插画",
      year: "2024",
      desc: "以《山海经》为灵感的系列插画，融合水墨笔触与数字技法，共 12 幅，曾在线上展览展出。",
      tags: ["数字插画", "系列", "展览"],
      cover: "linear-gradient(135deg, #b85cff, #ff6ec7)",
      link: ""
    },
    {
      title: "产品宣传动画",
      category: "动态设计",
      year: "2023",
      desc: "为新款智能手表制作 30 秒概念宣传动画，负责从分镜、动画到声音设计的全流程。",
      tags: ["分镜", "MG 动画", "声音设计"],
      cover: "linear-gradient(135deg, #ffb347, #ff5e62)",
      link: ""
    }
  ];

  /* ---------- 工具函数 ---------- */
  const $ = (id) => document.getElementById(id);

  /* ---------- 主题切换 ---------- */
  function initTheme() {
    const root = document.documentElement;
    const saved = localStorage.getItem("theme");
    const preferred = window.matchMedia("(prefers-color-scheme: light)").matches
      ? "light"
      : "dark";
    root.dataset.theme = saved || preferred;

    $("theme-toggle").addEventListener("click", () => {
      const next = root.dataset.theme === "dark" ? "light" : "dark";
      root.dataset.theme = next;
      localStorage.setItem("theme", next);
    });
  }

  /* ---------- 导航 ---------- */
  function initHeader() {
    const header = $("site-header");
    const toggle = $("nav-toggle");
    const links = $("nav-links");

    const onScroll = () => {
      header.classList.toggle("scrolled", window.scrollY > 8);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    toggle.addEventListener("click", () => {
      const open = links.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "关闭菜单" : "打开菜单");
    });

    links.addEventListener("click", (e) => {
      if (e.target.closest("a")) {
        links.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.setAttribute("aria-label", "打开菜单");
      }
    });
  }

  /* ---------- 填充内容 ---------- */
  function fillContent() {
    document.title = `${CONFIG.name} · 个人作品集`;
    $("brand-name").textContent = CONFIG.name;
    $("hero-name").textContent = CONFIG.name;
    $("hero-role").textContent = CONFIG.role;
    $("hero-desc").textContent = CONFIG.intro;
    $("hero-meta").textContent = `${CONFIG.location} · ${CONFIG.available}`;

    $("avatar").textContent = CONFIG.initials;
    $("about-name").textContent = CONFIG.name;
    $("about-tagline").textContent = CONFIG.tagline;
    $("bio-1").textContent = CONFIG.intro;
    $("bio-2").textContent = CONFIG.bio2;

    $("stats").innerHTML = CONFIG.stats
      .map(
        (s) =>
          `<li><b>${s.value}</b><span>${s.label}</span></li>`
      )
      .join("");

    $("skills").innerHTML = CONFIG.skills
      .map((s) => `<span>${s}</span>`)
      .join("");
    $("tools").innerHTML = CONFIG.tools
      .map((t) => `<span>${t}</span>`)
      .join("");

    $("contact-email").textContent = CONFIG.email;
    $("contact-email").href = `mailto:${CONFIG.email}`;

    $("socials").innerHTML = CONFIG.socials
      .map(
        (s) =>
          `<a href="${s.url}" target="_blank" rel="noopener noreferrer">${s.label} ↗</a>`
      )
      .join("");

    $("footer-name").textContent = CONFIG.name;
    $("footer-year").textContent = new Date().getFullYear();
  }

  /* ---------- 作品渲染与筛选 ---------- */
  let currentFilter = "全部";

  function renderFilters() {
    const categories = ["全部", ...new Set(PROJECTS.map((p) => p.category))];
    $("filters").innerHTML = categories
      .map(
        (c) =>
          `<button class="filter${c === currentFilter ? " active" : ""}" role="tab" aria-selected="${c === currentFilter}">${c}</button>`
      )
      .join("");

    $("filters").addEventListener("click", (e) => {
      const btn = e.target.closest(".filter");
      if (!btn) return;
      currentFilter = btn.textContent;
      renderFilters();
      renderWorks();
    });
  }

  function renderWorks() {
    const list =
      currentFilter === "全部"
        ? PROJECTS
        : PROJECTS.filter((p) => p.category === currentFilter);

    $("works-grid").innerHTML = list
      .map((p, i) => {
        const index = String(PROJECTS.indexOf(p) + 1).padStart(2, "0");
        const inner = `
          <div class="work-cover">
            <div class="cover-art" style="background:${p.cover}; background-size:cover; background-position:center;"></div>
            <span class="cover-cat">${p.category}</span>
            <span class="cover-year">${p.year}</span>
            <span class="cover-index" aria-hidden="true">${index}</span>
          </div>
          <div class="work-body">
            <h3>${p.title}</h3>
            <p class="work-desc">${p.desc}</p>
            <div class="work-tags">${p.tags.map((t) => `<span class="tag">${t}</span>`).join("")}</div>
            <span class="work-link">查看案例 →</span>
          </div>`;

        const card = p.link
          ? `<a class="work-card reveal" href="${p.link}" target="_blank" rel="noopener noreferrer" style="transition-delay:${(i % 3) * 80}ms">${inner}</a>`
          : `<article class="work-card reveal" style="transition-delay:${(i % 3) * 80}ms">${inner}</article>`;
        return card;
      })
      .join("");

    // 触发入场动画
    requestAnimationFrame(() => {
      document.querySelectorAll("#works-grid .reveal").forEach((el) => {
        el.classList.add("visible");
      });
    });
  }

  /* ---------- 滚动入场 ---------- */
  function initReveal() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    window.revealObserver = observer;
  }

  /* ---------- 联系表单 ---------- */
  function initForm() {
    $("contact-form").addEventListener("submit", (e) => {
      e.preventDefault();
      const name = $("form-name").value.trim();
      const email = $("form-email").value.trim();
      const message = $("form-message").value.trim();

      if (!name || !email || !message) return;

      const subject = encodeURIComponent(`来自 ${name} 的来信`);
      const body = encodeURIComponent(
        `你好，我是 ${name}（${email}）。\n\n${message}\n`
      );
      window.location.href = `mailto:${CONFIG.email}?subject=${subject}&body=${body}`;
    });
  }

  /* ---------- 启动 ---------- */
  function init() {
    initTheme();
    initHeader();
    fillContent();
    renderFilters();
    renderWorks();
    initReveal();
    initForm();
  }

  document.addEventListener("DOMContentLoaded", init);
})();
