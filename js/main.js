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
    initials: "LY",
    // 头像照片路径（如 "assets/avatar.jpg"）；留空 "" 则显示姓名首字母
    avatar: "assets/me-avatar.webp",
    role: "AIGC爱好者",
    tagline: "AI让世界开始加速",
    intro:
      "你好，我是陆宇，一位在不断学习新技术的AIGC爱好者。",
    bio2:
      "过去几年里，我参与过从品牌重塑、产品界面到内容创作的各类项目，和不同规模的团队一起把想法变成现实。",
    location: "福建 · 中国",
    available: "开放合作中",
    email: "394037725@qq.com",
    stats: [
      { value: "1+", label: "年设计经验" },
      { value: "40+", label: "完成项目" },
      { value: "15+", label: "合作品牌" }
    ],
    skills: ["3D设计", "AIGC", "视频剪辑", "网页开发"],
    tools: ["Blender", "3dmax", "codex", "photoshop","剪映", ],
    socials: [
      { label: "bilibili", url: "https://space.bilibili.com/3546391250995736" },
      { label: "GitHub", url: "https://github.com/" }
 
  
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
      title: "iphone 17 pro max",
      category: "3D设计",
      year: "2026",
      desc: "个人独自完成产品建模渲染",
      tags: ["3D", "建模", "渲染"],
      cover: "assets/iPhone17promax.png",
      link: ""
    },
    {
      title: "电商主图详情页",
      category: "AIGC",
      year: "2026",
      desc: "部署工作流实现一键生成电商主图详情图",
      tags: ["Web App", "设计系统", "原型"],
      cover: "assets/电商图.png",
      link: ""
    },
    {
      title: "极简博客主题「纸」",
      category: "网页开发",
      year: "2026",
      desc: "一套为文字而生的轻量博客主题，注重排版与阅读体验，全站无框架、加载时间低于 1 秒。",
      tags: ["HTML/CSS", "主题", "排版"],
      cover: "linear-gradient(135deg, #22c1a3, #2f80ed)",
      link: ""
    },
  
    {
      title: "产品宣传动画",
      category: "动态设计",
      year: "2026",
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
    $("hero-name").innerHTML = [...CONFIG.name]
      .map(
        (ch, i) =>
          `<span class="hl" style="--i:${i}">${ch === " " ? "\u00A0" : ch}</span>`
      )
      .join("");
    $("hero-role").textContent = CONFIG.role;
    $("hero-desc").textContent = CONFIG.intro;
    $("hero-meta").textContent = `${CONFIG.location} · ${CONFIG.available}`;

    const avatarEl = $("avatar");
    if (CONFIG.avatar) {
      avatarEl.innerHTML = `<img src="${CONFIG.avatar}" alt="${CONFIG.name} 的头像">`;
      const mark = $("brand-mark");
      mark.style.backgroundImage = `url("${CONFIG.avatar}")`;
      mark.style.backgroundSize = "cover";
      mark.style.backgroundPosition = "center";
    } else {
      avatarEl.textContent = CONFIG.initials;
    }
    $("about-name").textContent = CONFIG.name;
    $("about-tagline").textContent = CONFIG.tagline;
    $("bio-1").textContent = CONFIG.intro;
    $("bio-2").textContent = CONFIG.bio2;

    $("stats").innerHTML = CONFIG.stats
      .map((s) => {
        const m = String(s.value).match(/^(\d+)(.*)$/);
        return `<li><b data-count="${m ? m[1] : "0"}" data-suffix="${m ? m[2] : ""}">0</b><span>${s.label}</span></li>`;
      })
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

  function coverStyle(cover) {
    const value = String(cover).trim();
    const isGradient =
      value.startsWith("linear-gradient") || value.startsWith("radial-gradient");
    const isUrl = value.startsWith("url(");
    if (isGradient) {
      return `background:${value}; background-size:cover; background-position:center;`;
    }
    if (isUrl) {
      return `background:${value} center/cover no-repeat;`;
    }
    return `background:url('${value}') center/cover no-repeat; background-color:var(--surface-2);`;
  }

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
      if (typeof window.__lightboxClose === "function") window.__lightboxClose();
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
        const size = i % 4 === 0 || i % 4 === 3 ? "card-lg" : "card-sm";
        const offset = i % 4 === 2 ? " card-offset" : "";
        return `
          <article class="work-card reveal ${size}${offset}" data-index="${PROJECTS.indexOf(p)}" role="button" tabindex="0" aria-label="查看作品：${p.title}" style="transition-delay:${(i % 3) * 90}ms">
          <div class="work-cover">
            <div class="cover-art" style="${coverStyle(p.cover)}"></div>
            <div class="cover-scrim"></div>
            <span class="cover-index" aria-hidden="true">${index}</span>
            <div class="cover-caption">
              <p class="caption-meta"><span>${p.category}</span><span>${p.year}</span></p>
              <h3>${p.title}</h3>
              <p class="cover-desc">${p.desc}</p>
            </div>
          </div>
        </article>`;
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

  /* ---------- 滚动进度 / 返回顶部 / 视差 ---------- */
  function initScrollEffects() {
    const progress = $("scroll-progress");
    const toTop = $("to-top");
    const heroBg = document.querySelector(".hero-bg");
    let ticking = false;

    function update() {
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      const y = window.scrollY;
      progress.style.width = (max > 0 ? (y / max) * 100 : 0) + "%";
      toTop.classList.toggle("show", y > 640);
      if (heroBg && y < window.innerHeight) {
        heroBg.style.transform = `translateY(${y * 0.12}px)`;
      }
      ticking = false;
    }

    window.addEventListener(
      "scroll",
      () => {
        if (!ticking) {
          ticking = true;
          requestAnimationFrame(update);
        }
      },
      { passive: true }
    );

    toTop.addEventListener("click", () => {
      const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
      window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
    });

    update();
  }

  /* ---------- 导航当前章节高亮 ---------- */
  function initScrollspy() {
    const links = [...document.querySelectorAll(".nav-links a")];
    const sections = links
      .map((a) => document.querySelector(a.getAttribute("href")))
      .filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          links.forEach((l) => l.classList.remove("active"));
          const link = document.querySelector(
            `.nav-links a[href="#${entry.target.id}"]`
          );
          if (link) link.classList.add("active");
        });
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
    );

    sections.forEach((s) => observer.observe(s));
  }

  /* ---------- 鼠标柔光 ---------- */
  function initCursorGlow() {
    if (!matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const glow = $("cursor-glow");
    let tx = window.innerWidth / 2;
    let ty = window.innerHeight / 2;
    let x = tx;
    let y = ty;
    let raf = null;

    function tick() {
      x += (tx - x) * 0.12;
      y += (ty - y) * 0.12;
      glow.style.transform = `translate(${x}px, ${y}px)`;
      if (Math.abs(tx - x) > 0.5 || Math.abs(ty - y) > 0.5) {
        raf = requestAnimationFrame(tick);
      } else {
        raf = null;
      }
    }

    document.addEventListener("mousemove", (e) => {
      tx = e.clientX;
      ty = e.clientY;
      document.body.classList.add("cursor-on");
      if (!raf) raf = requestAnimationFrame(tick);
    });

    document.addEventListener("mouseleave", () => {
      document.body.classList.remove("cursor-on");
    });
  }

  /* ---------- 杂志滚动字幕 ---------- */
  function initMarquee() {
    const track = document.querySelector(".marquee-track");
    if (!track) return;
    const items = [
      "AIGC 创作",
      "3D设计",
      "视频剪辑",
      "网页开发",
      
    ];
    const group = items
      .map(
        (t) =>
          `<span class="marquee-item">${t}<span class="marquee-dot" aria-hidden="true"></span></span>`
      )
      .join("");
    track.innerHTML = group.repeat(4);
  }

  /* ---------- 统计数字滚动计数 ---------- */
  function initStatsCount() {
    const items = document.querySelectorAll(".stats b");
    if (!items.length) return;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          observer.unobserve(entry.target);
          const el = entry.target;
          const target = parseInt(el.dataset.count, 10) || 0;
          const suffix = el.dataset.suffix || "";
          if (reduce) {
            el.textContent = target + suffix;
            return;
          }
          const duration = 1100;
          const start = performance.now();
          function frame(now) {
            const t = Math.min(1, (now - start) / duration);
            const eased = 1 - Math.pow(1 - t, 3);
            el.textContent = Math.round(target * eased) + suffix;
            if (t < 1) requestAnimationFrame(frame);
          }
          requestAnimationFrame(frame);
        });
      },
      { threshold: 0.6 }
    );

    items.forEach((el) => observer.observe(el));
  }

  /* ---------- 作品灯箱（画廊） ---------- */
  function initLightbox() {
    const lb = document.createElement("div");
    lb.className = "lightbox";
    lb.innerHTML = `
      <div class="lightbox-backdrop" data-action="close"></div>
      <div class="lightbox-panel" role="dialog" aria-modal="true" aria-label="作品详情">
        <div class="lightbox-visual">
          <div class="lightbox-media"></div>
          <span class="cover-index lightbox-media-index" aria-hidden="true"></span>
          <span class="lightbox-cat"></span>
          <span class="lightbox-year"></span>
          <span class="lightbox-counter"></span>
          <button class="lightbox-nav lightbox-prev" aria-label="上一个作品">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
          </button>
          <button class="lightbox-nav lightbox-next" aria-label="下一个作品">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
          </button>
        </div>
        <div class="lightbox-body">
          <span class="lightbox-no"></span>
          <h3></h3>
          <p class="lightbox-desc"></p>
          <div class="work-tags"></div>
          <a class="btn btn-primary" target="_blank" rel="noopener noreferrer" style="display:none">查看案例 ↗</a>
        </div>
        <button class="lightbox-close" data-action="close" aria-label="关闭">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </button>
      </div>`;
    document.body.appendChild(lb);

    const state = { list: [], current: 0, lastFocus: null };

    function render(p) {
      const media = lb.querySelector(".lightbox-media");
      const value = String(p.cover).trim();
      const isGradient =
        value.startsWith("linear-gradient") || value.startsWith("radial-gradient");

      if (isGradient) {
        media.innerHTML = `<div class="cover-art" style="${coverStyle(p.cover)}"></div>`;
      } else {
        media.innerHTML = `<img src="${value}" alt="${p.title}">`;
        const img = media.querySelector("img");
        img.onerror = () => {
          media.innerHTML = `<div class="cover-art" style="background:var(--surface-2);"></div>`;
        };
      }

      const position = state.list.indexOf(p);
      lb.querySelector(".lightbox-no").textContent = `No.${String(
        PROJECTS.indexOf(p) + 1
      ).padStart(2, "0")}`;
      lb.querySelector(".lightbox-cat").textContent = p.category;
      lb.querySelector(".lightbox-year").textContent = p.year;
      lb.querySelector(".lightbox-media-index").textContent = String(
        position + 1
      ).padStart(2, "0");
      lb.querySelector(".lightbox-counter").textContent = `${position + 1} / ${state.list.length}`;
      lb.querySelector(".lightbox-body h3").textContent = p.title;
      lb.querySelector(".lightbox-desc").textContent = p.desc;
      lb.querySelector(".lightbox-body .work-tags").innerHTML = p.tags
        .map((t) => `<span class="tag">${t}</span>`)
        .join("");

      const link = lb.querySelector(".lightbox-body .btn");
      if (p.link) {
        link.style.display = "inline-flex";
        link.href = p.link;
      } else {
        link.style.display = "none";
        link.removeAttribute("href");
      }

      media.style.opacity = "0";
      requestAnimationFrame(() => {
        media.style.opacity = "1";
      });
    }

    function open(projectIndex) {
      state.list =
        currentFilter === "全部"
          ? PROJECTS
          : PROJECTS.filter((p) => p.category === currentFilter);
      state.current = Math.max(
        0,
        state.list.findIndex((p) => PROJECTS.indexOf(p) === projectIndex)
      );
      state.lastFocus = document.activeElement;
      render(state.list[state.current]);
      lb.classList.add("open");
      document.body.classList.add("lightbox-open");
      lb.querySelector(".lightbox-close").focus();
    }

    function close() {
      lb.classList.remove("open");
      document.body.classList.remove("lightbox-open");
      if (state.lastFocus && typeof state.lastFocus.focus === "function") {
        state.lastFocus.focus();
      }
    }

    function step(dir) {
      if (!state.list.length) return;
      state.current =
        (state.current + dir + state.list.length) % state.list.length;
      render(state.list[state.current]);
    }

    window.__lightboxClose = close;

    const grid = $("works-grid");
    grid.addEventListener("click", (e) => {
      const card = e.target.closest(".work-card");
      if (!card || e.target.closest("a")) return;
      open(Number(card.dataset.index));
    });

    grid.addEventListener("keydown", (e) => {
      const card = e.target.closest(".work-card");
      if (!card) return;
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        open(Number(card.dataset.index));
      }
    });

    lb.addEventListener("click", (e) => {
      if (e.target.closest("[data-action='close']")) {
        close();
        return;
      }
      if (e.target.closest(".lightbox-prev")) {
        step(-1);
        return;
      }
      if (e.target.closest(".lightbox-next")) {
        step(1);
      }
    });

    document.addEventListener("keydown", (e) => {
      if (!lb.classList.contains("open")) return;
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") step(-1);
      if (e.key === "ArrowRight") step(1);
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
    initScrollEffects();
    initScrollspy();
    initCursorGlow();
    initMarquee();
    initStatsCount();
    initLightbox();
  }

  document.addEventListener("DOMContentLoaded", init);
})();
