import * as THREE from "three";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";

const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const isMobile = window.matchMedia("(max-width: 640px)").matches;

/* ==========================================================================
   1. PROJECT DATA — single source of truth for the vault grid
   ========================================================================== */

const PROJECTS = [
   {
    name: "Otayo",
    icon: "assets/otayo.png",
    color: "pink",
    desc: "The number 1 events, tickets and seating app in Mauritius.",
    tech: ["Flutter", "Bloc", "Seats.io", "MCB Pay"],
    links: [
      { kind: "play", url: "https://play.google.com/store/apps/details?id=com.otayo.otayoapp&hl=en" },
      { kind: "appstore", url: "https://apps.apple.com/mu/app/otayo-events-tickets-more/id6503912805" },
    ],
  },
   {
    name: "Team Salama",
    icon: "assets/t-s-logo.png",
    color: "pink",
    desc: "A personal-trainer app for a transformative, guided fitness journey.",
    tech: ["Flutter", "Bloc", "Video", "Hive"],
    links: [
      { kind: "play", url: "https://play.google.com/store/apps/details?id=com.teamsalama.teamsalama" },
      { kind: "appstore", url: "https://apps.apple.com/eg/app/team-salama/id6478572631" },
    ],
  },
  {
    name: "Alkan",
    icon: "assets/alkan.png",
    color: "mint",
    desc: "Smart solution for managing electricity meter installations and consumption tracking.",
    tech: ["Flutter"],
    links: [
      { kind: "play", url: "https://play.google.com/store/apps/details?id=com.alkan.app" },
      { kind: "appstore", url: "https://apps.apple.com/us/app/alkan-distribution/id6749531243" },
    ],
  },
  {
    name: "BI Analytics",
    icon: "assets/bi.png",
    color: "violet",
    desc: "Real-time budget insights, approvals and BI reports for smarter business decisions.",
    tech: ["Flutter"],
    links: [{ kind: "appstore", url: "https://apps.apple.com/us/app/advec-bi/id6748640490" }],
  },
  {
    name: "Borro",
    icon: "assets/Borro.png",
    color: "citrine",
    desc: "Makes renting simple, safe and affordable — with an in-app payment flow.",
    tech: ["Flutter", "Bloc", "Paymob"],
    links: [
      { kind: "play", url: "https://play.google.com/store/apps/details?id=com.borro.app&hl=en" },
      { kind: "web", url: "https://borroapp.com/" },
    ],
  },
  {
    name: "Intro Utilities",
    icon: "assets/introutlities.png",
    color: "mint",
    desc: "Manage electricity meter installation, track usage, and recharge your balance.",
    tech: ["Flutter", "Fawry Pay"],
    links: [
      { kind: "play", url: "https://play.google.com/store/apps/details?id=com.intro.introutilities" },
      { kind: "appstore", url: "https://apps.apple.com/us/app/intro-utilities/id6748953856" },
    ],
  },
  {
    name: "Zunko",
    icon: "assets/zunko.png",
    color: "violet",
    desc: "Seamless stock trading — live charts, market data and a gateway to investing.",
    tech: ["Flutter", "Bloc", "Charts", "Market APIs"],
    links: [
      { kind: "web", url: "https://www.zunko.app/" },
    ],
  },
 
 
  {
    name: "ADVEC",
    icon: "assets/advec.png",
    color: "sapphire",
    desc: "Helps clients track, update and communicate on project documentation.",
    tech: ["React Native", "Redux"],
    links: [{ kind: "play", url: "https://play.google.com/store/apps/details?id=com.advec" }],
  },
  {
    name: "Wosol",
    icon: "assets/wosol.png",
    color: "sapphire",
    desc: "Transportation across Saudi Arabia with live, real-time location tracking.",
    tech: ["Flutter", "GetX", "Maps", "Live tracking"],
    links: [
      { kind: "play", url: "https://play.google.com/store/apps/details?id=com.DigitalPartner.wosol&hl=ar" },
      { kind: "appstore", url: "https://apps.apple.com/us/app/wosol-%D9%88%D8%B3%D9%84/id6477467617" },
    ],
  },
  {
    name: "Darna RE",
    icon: "assets/darna_re.png",
    color: "sapphire",
    desc: "Real estate, reinvented — browsing and discovery built for how people actually search.",
    tech: ["Flutter", "GetX", "Maps"],
    links: [{ kind: "appstore", url: "https://apps.apple.com/eg/app/darna-re/id6744989458" }],
  },
  {
    name: "Rewaq",
    icon: "assets/rewaq.png",
    color: "pink",
    desc: "Keeps parents connected to their child's Islamic education journey.",
    tech: ["Flutter", "Bloc", "Charts"],
    links: [{ kind: "play", url: "https://play.google.com/store/apps/details?id=com.rewaq.rewaq" }],
  },
  {
    name: "Fly mart",
    icon: "assets/flymart-logo.png",
    color: "pink",
    desc: "FlyMart is a multi-merchant online store for selling products.",
    tech: ["IOS Native", "UIKit", "Tamara Payment"],
    links: [{ kind: "appstore", url: "https://apps.apple.com/eg/app/%D9%81%D9%84%D8%A7%D9%8A-%D9%85%D8%A7%D8%B1%D8%AA/id1670689288?l=ar" }],
  },
];

const LINK_ICON = {
  play: "fa-brands fa-google-play",
  appstore: "fa-brands fa-app-store",
  web: "fa-solid fa-arrow-up-right-from-square",
};

function renderVault() {
  const grid = document.getElementById("vault-grid");
  const frag = document.createDocumentFragment();

  PROJECTS.forEach((p, i) => {
    const card = document.createElement("div");
    card.className = "gem-card reveal";
    card.style.setProperty("--gc-color", `var(--${p.color})`);
    card.style.transitionDelay = `${(i % 3) * 0.06}s`;

    const links = p.links
      .map(
        (l) =>
          `<a href="${l.url}" target="_blank" rel="noopener noreferrer" aria-label="${p.name} on ${l.kind}"><i class="${LINK_ICON[l.kind]}"></i></a>`
      )
      .join("");

    const tech = p.tech.map((t) => `<span>${t}</span>`).join("");

    card.innerHTML = `
      <div class="card-top">
        <div class="icon-frame"><div class="inner"><img src="${p.icon}" alt="${p.name} icon" loading="lazy" /></div></div>
        <div class="card-links">${links}</div>
      </div>
      <h3>${p.name}</h3>
      <p>${p.desc}</p>
      <div class="tech-row">${tech}</div>
    `;
    frag.appendChild(card);
  });

  grid.appendChild(frag);
}
renderVault();

/* ==========================================================================
   2. SCROLL PROGRESS HUD
   ========================================================================== */

const progressBar = document.getElementById("progress-bar");
function updateProgress() {
  const h = document.documentElement;
  const scrolled = h.scrollTop;
  const max = h.scrollHeight - h.clientHeight;
  progressBar.style.width = `${max > 0 ? (scrolled / max) * 100 : 0}%`;
}
window.addEventListener("scroll", updateProgress, { passive: true });
updateProgress();

/* ==========================================================================
   3. REVEAL ON SCROLL
   ========================================================================== */

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
);
document.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));

/* ==========================================================================
   4. CARD TILT-ON-HOVER
   ========================================================================== */

if (!reducedMotion && matchMedia("(hover: hover)").matches) {
  document.querySelectorAll(".gem-card").forEach((card) => {
    card.addEventListener("pointermove", (e) => {
      const r = card.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      card.style.transform = `perspective(800px) rotateX(${(-py * 8).toFixed(2)}deg) rotateY(${(px * 10).toFixed(2)}deg) translateY(-4px)`;
    });
    card.addEventListener("pointerleave", () => {
      card.style.transform = "";
    });
  });
}

/* ==========================================================================
   5. SMOOTH NAV SCROLL
   ========================================================================== */

document.querySelectorAll('a[href^="#"]').forEach((a) => {
  a.addEventListener("click", (e) => {
    const target = document.querySelector(a.getAttribute("href"));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth", block: "start" });
    }
  });
});

/* ==========================================================================
   6. CONTACT FORM + CONFETTI REWARD
   ========================================================================== */

const form = document.getElementById("contactForm");
const statusDiv = document.getElementById("formStatus");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const btn = form.querySelector('button[type="submit"]');
  const originalHTML = btn.innerHTML;
  btn.disabled = true;
  btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending…';

  try {
    const res = await fetch(form.action, {
      method: "POST",
      body: new FormData(form),
      headers: { Accept: "application/json" },
    });

    if (res.ok) {
      statusDiv.className = "form-status success";
      statusDiv.innerHTML = '<i class="fa-solid fa-circle-check"></i> Sent! I\'ll get back to you soon.';
      form.reset();
      fireConfetti();
    } else {
      throw new Error("submit failed");
    }
  } catch {
    statusDiv.className = "form-status error";
    statusDiv.innerHTML = '<i class="fa-solid fa-circle-exclamation"></i> Something went wrong — try again?';
  } finally {
    btn.disabled = false;
    btn.innerHTML = originalHTML;
    statusDiv.style.display = "block";
    setTimeout(() => (statusDiv.style.display = "none"), 5000);
  }
});

function fireConfetti() {
  if (reducedMotion) return;
  const canvas = document.getElementById("confetti-canvas");
  const ctx = canvas.getContext("2d");
  const dpr = Math.min(window.devicePixelRatio, 2);
  canvas.width = window.innerWidth * dpr;
  canvas.height = window.innerHeight * dpr;
  ctx.scale(dpr, dpr);

  const colors = ["#9b5cff", "#ff5da2", "#35f0c2", "#4fb8ff", "#ffcf4d"];
  const originX = window.innerWidth / 2;
  const originY = window.innerHeight * 0.55;

  const particles = Array.from({ length: 90 }, () => ({
    x: originX,
    y: originY,
    vx: (Math.random() - 0.5) * 14,
    vy: -Math.random() * 14 - 4,
    size: Math.random() * 7 + 4,
    color: colors[Math.floor(Math.random() * colors.length)],
    rot: Math.random() * Math.PI,
    vr: (Math.random() - 0.5) * 0.3,
    life: 1,
  }));

  let running = true;
  function tick() {
    if (!running) return;
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    let alive = false;
    particles.forEach((p) => {
      p.vy += 0.45;
      p.x += p.vx;
      p.y += p.vy;
      p.rot += p.vr;
      p.life -= 0.012;
      if (p.life > 0) {
        alive = true;
        ctx.save();
        ctx.globalAlpha = Math.max(p.life, 0);
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
        ctx.restore();
      }
    });
    if (alive) {
      requestAnimationFrame(tick);
    } else {
      running = false;
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    }
  }
  tick();
}

/* ==========================================================================
   7. HERO GEM — the signature interactive crystal
   ========================================================================== */

function initHeroGem() {
  const stage = document.querySelector(".hero-gem-stage");
  const canvas = document.getElementById("hero-canvas");
  if (!stage || !canvas) return;

  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.1;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
  camera.position.set(0, 0, 7.2);

  const pmrem = new THREE.PMREMGenerator(renderer);
  scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;

  scene.add(new THREE.AmbientLight(0xffffff, 0.55));
  const key = new THREE.DirectionalLight(0xffffff, 1.3);
  key.position.set(4, 5, 6);
  scene.add(key);
  const pinkLight = new THREE.PointLight(0xff5da2, 5, 20);
  pinkLight.position.set(-4, -2, 3);
  scene.add(pinkLight);
  const mintLight = new THREE.PointLight(0x35f0c2, 4, 20);
  mintLight.position.set(3, -3, -3);
  scene.add(mintLight);

  const gemGroup = new THREE.Group();
  scene.add(gemGroup);

  // Faceted core: flat-shaded icosahedron for crisp gem-cut look
  const coreGeo = new THREE.IcosahedronGeometry(1.65, 0).toNonIndexed();
  coreGeo.computeVertexNormals();
  const coreMat = new THREE.MeshPhysicalMaterial({
    color: 0x9b5cff,
    metalness: 0,
    roughness: 0.06,
    transmission: 0.88,
    thickness: 1.8,
    ior: 2.1,
    clearcoat: 1,
    clearcoatRoughness: 0.1,
    iridescence: 1,
    iridescenceIOR: 1.3,
    iridescenceThicknessRange: [120, 420],
    envMapIntensity: 1.4,
  });
  const core = new THREE.Mesh(coreGeo, coreMat);
  gemGroup.add(core);

  // Edge lines to define facets
  const edges = new THREE.EdgesGeometry(coreGeo, 1);
  const edgeLines = new THREE.LineSegments(
    edges,
    new THREE.LineBasicMaterial({ color: 0xf4f1ff, transparent: true, opacity: 0.35 })
  );
  gemGroup.add(edgeLines);

  // A light layer of ambient sparkle, kept subtle so the stack badges read clearly
  const sparkleTex = makeSparkleTexture();
  const sparkleCount = isMobile ? 16 : 28;
  const positions = new Float32Array(sparkleCount * 3);
  for (let i = 0; i < sparkleCount; i++) {
    const r = 2.2 + Math.random() * 0.9;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
    positions[i * 3 + 2] = r * Math.cos(phi);
  }
  const sparkleGeo = new THREE.BufferGeometry();
  sparkleGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  const sparkleMat = new THREE.PointsMaterial({
    size: 0.1,
    map: sparkleTex,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    color: 0xffe9c9,
  });
  const sparkles = new THREE.Points(sparkleGeo, sparkleMat);
  scene.add(sparkles);

  function makeSparkleTexture() {
    const size = 64;
    const c = document.createElement("canvas");
    c.width = c.height = size;
    const ctx = c.getContext("2d");
    const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
    g.addColorStop(0, "rgba(255,255,255,1)");
    g.addColorStop(0.4, "rgba(255,255,255,0.6)");
    g.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, size, size);
    return new THREE.CanvasTexture(c);
  }

  // Orbiting tech-stack badges — ties the centerpiece gem directly to the real stack
  const STACK = [
    { label: "Flutter", color: "#9b5cff" },
    { label: "Dart", color: "#35f0c2" },
    { label: "Firebase", color: "#ffcf4d" },
    { label: "GraphQL", color: "#ff5da2" },
    { label: "Swift", color: "#4fb8ff" },
    { label: "Git", color: "#c9aaff" },
  ];

  function roundRectPath(ctx, x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
  }

  function makeBadgeTexture(label, color) {
    const w = 300,
      h = 108;
    const c = document.createElement("canvas");
    c.width = w;
    c.height = h;
    const ctx = c.getContext("2d");
    roundRectPath(ctx, 4, 4, w - 8, h - 8, 30);
    ctx.fillStyle = "rgba(8,7,18,0.88)";
    ctx.fill();
    ctx.lineWidth = 4;
    ctx.strokeStyle = color;
    ctx.stroke();
    ctx.fillStyle = "#f4f1ff";
    ctx.font = "600 42px 'JetBrains Mono', monospace";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(label, w / 2, h / 2 + 3);
    return new THREE.CanvasTexture(c);
  }

  const badgeGroup = new THREE.Group();
  scene.add(badgeGroup);
  const badges = [];

  STACK.forEach((s, i) => {
    const tex = makeBadgeTexture(s.label, s.color);
    const mat = new THREE.SpriteMaterial({ map: tex, transparent: true, depthWrite: false });
    const sprite = new THREE.Sprite(mat);
    const w = 0.82;
    sprite.scale.set(w, w * (108 / 300), 1);

    const phi = Math.acos(1 - (2 * (i + 0.5)) / STACK.length);
    const theta = Math.PI * (1 + Math.sqrt(5)) * i;
    const r = 2.75;
    sprite.position.set(
      r * Math.sin(phi) * Math.cos(theta),
      r * Math.sin(phi) * Math.sin(theta),
      r * Math.cos(phi)
    );
    sprite.userData = {
      basePos: sprite.position.clone(),
      phase: Math.random() * Math.PI * 2,
      speed: 0.3 + Math.random() * 0.2,
    };
    badgeGroup.add(sprite);
    badges.push(sprite);
  });

  // Sizing
  function resize() {
    const w = stage.clientWidth;
    const h = stage.clientHeight;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
  }
  new ResizeObserver(resize).observe(stage);
  resize();

  // Drag-to-spin with inertia
  let dragging = false;
  let lastX = 0,
    lastY = 0;
  let velX = 0,
    velY = 0;
  let targetRotX = 0.15,
    targetRotY = 0;

  function pointerDown(e) {
    dragging = true;
    lastX = e.clientX;
    lastY = e.clientY;
    velX = 0;
    velY = 0;
  }
  function pointerMove(e) {
    if (!dragging) return;
    const dx = e.clientX - lastX;
    const dy = e.clientY - lastY;
    lastX = e.clientX;
    lastY = e.clientY;
    velY = dx * 0.005;
    velX = dy * 0.005;
    targetRotY += velY;
    targetRotX += velX;
  }
  function pointerUp() {
    dragging = false;
  }
  canvas.addEventListener("pointerdown", pointerDown);
  window.addEventListener("pointermove", pointerMove);
  window.addEventListener("pointerup", pointerUp);
  canvas.addEventListener(
    "touchstart",
    (e) => e.preventDefault(),
    { passive: false }
  );

  const clock = new THREE.Clock();
  let frameId;

  function animate() {
    frameId = requestAnimationFrame(animate);
    const t = clock.getElapsedTime();

    if (!dragging) {
      // momentum decay
      velX *= 0.94;
      velY *= 0.94;
      targetRotX += velX;
      targetRotY += velY;
      // gentle idle spin when at rest
      if (!reducedMotion && Math.abs(velX) < 0.0006 && Math.abs(velY) < 0.0006) {
        targetRotY += 0.0022;
      }
    }

    gemGroup.rotation.x += (targetRotX - gemGroup.rotation.x) * 0.12;
    gemGroup.rotation.y += (targetRotY - gemGroup.rotation.y) * 0.12;

    if (!reducedMotion) {
      gemGroup.position.y = Math.sin(t * 0.6) * 0.08;
      sparkles.rotation.y = t * 0.05;
      sparkles.rotation.x = Math.sin(t * 0.1) * 0.1;
      pinkLight.intensity = 4.5 + Math.sin(t * 0.9) * 1.2;
      mintLight.intensity = 3.5 + Math.cos(t * 0.7) * 1.2;

      badgeGroup.rotation.y = t * 0.11;
      badgeGroup.rotation.x = Math.sin(t * 0.08) * 0.15;
      badges.forEach((b) => {
        const d = b.userData;
        const bob = Math.sin(t * d.speed + d.phase) * 0.06;
        b.position.copy(d.basePos);
        b.position.y += bob;
      });
    }

    renderer.render(scene, camera);
  }
  animate();

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      cancelAnimationFrame(frameId);
    } else {
      animate();
    }
  });
}

/* ==========================================================================
   8. AMBIENT BACKGROUND — floating gem field behind the whole page
   ========================================================================== */

function initAmbientField() {
  const canvas = document.getElementById("ambient-canvas");
  if (!canvas) return;

  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: false });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.6));

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 60);
  camera.position.z = 14;

  scene.add(new THREE.AmbientLight(0xffffff, 0.6));
  const l1 = new THREE.DirectionalLight(0x9b5cff, 1.2);
  l1.position.set(5, 6, 8);
  scene.add(l1);
  const l2 = new THREE.PointLight(0xff5da2, 3, 30);
  l2.position.set(-6, -4, 4);
  scene.add(l2);

  const palette = [0x9b5cff, 0xff5da2, 0x35f0c2, 0x4fb8ff, 0xffcf4d];
  const count = isMobile ? 7 : 15;
  const shards = [];
  const group = new THREE.Group();
  scene.add(group);

  // Code-symbol glyphs, cut with a gem bevel so they still belong in the vault.
  const GLYPHS = ["chevronLeft", "chevronRight", "bracketLeft", "bracketRight", "slash"];

  function glyphShape(type) {
    const shape = new THREE.Shape();
    const t = 0.15;
    if (type === "bracketLeft") {
      const w = 0.36, h = 0.64;
      shape.moveTo(0, 0); shape.lineTo(0, h); shape.lineTo(w, h);
      shape.lineTo(w, h - t); shape.lineTo(t, h - t); shape.lineTo(t, t);
      shape.lineTo(w, t); shape.lineTo(w, 0); shape.closePath();
    } else if (type === "bracketRight") {
      const w = 0.36, h = 0.64;
      shape.moveTo(w, 0); shape.lineTo(w, h); shape.lineTo(0, h);
      shape.lineTo(0, h - t); shape.lineTo(w - t, h - t); shape.lineTo(w - t, t);
      shape.lineTo(0, t); shape.lineTo(0, 0); shape.closePath();
    } else if (type === "chevronLeft") {
      const w = 0.52, h = 0.64;
      shape.moveTo(w, 0); shape.lineTo(w, t * 1.7); shape.lineTo(t * 1.5, h / 2);
      shape.lineTo(w, h - t * 1.7); shape.lineTo(w, h); shape.lineTo(0, h / 2);
      shape.closePath();
    } else if (type === "chevronRight") {
      const w = 0.52, h = 0.64;
      shape.moveTo(0, 0); shape.lineTo(0, t * 1.7); shape.lineTo(w - t * 1.5, h / 2);
      shape.lineTo(0, h - t * 1.7); shape.lineTo(0, h); shape.lineTo(w, h / 2);
      shape.closePath();
    } else {
      const w = 0.22, h = 0.7, skew = 0.26;
      shape.moveTo(skew, 0); shape.lineTo(skew + w, 0); shape.lineTo(w, h);
      shape.lineTo(0, h); shape.closePath();
    }
    return shape;
  }

  for (let i = 0; i < count; i++) {
    const type = GLYPHS[i % GLYPHS.length];
    let geo = new THREE.ExtrudeGeometry(glyphShape(type), {
      depth: 0.14,
      bevelEnabled: true,
      bevelThickness: 0.035,
      bevelSize: 0.025,
      bevelSegments: 1,
    });
    geo.center();
    geo = geo.toNonIndexed();
    geo.computeVertexNormals();

    const mat = new THREE.MeshPhysicalMaterial({
      color: palette[i % palette.length],
      roughness: 0.25,
      metalness: 0.1,
      clearcoat: 0.6,
      clearcoatRoughness: 0.25,
      transparent: true,
      opacity: 0.58,
    });

    const mesh = new THREE.Mesh(geo, mat);
    mesh.scale.setScalar(0.8 + Math.random() * 0.6);
    const x = (Math.random() - 0.5) * 22;
    const y = (Math.random() - 0.5) * 16;
    const z = (Math.random() - 0.5) * 12 - 3;
    mesh.position.set(x, y, z);
    mesh.userData = {
      basePos: mesh.position.clone(),
      phase: Math.random() * Math.PI * 2,
      speed: 0.15 + Math.random() * 0.25,
      rotSpeed: new THREE.Vector3(
        (Math.random() - 0.5) * 0.25,
        (Math.random() - 0.5) * 0.25,
        (Math.random() - 0.5) * 0.25
      ),
    };
    group.add(mesh);
    shards.push(mesh);
  }

  function resize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }
  window.addEventListener("resize", resize);
  resize();

  let mouseX = 0,
    mouseY = 0;
  window.addEventListener("mousemove", (e) => {
    mouseX = (e.clientX / window.innerWidth) * 2 - 1;
    mouseY = (e.clientY / window.innerHeight) * 2 - 1;
  });

  const clock = new THREE.Clock();
  let frameId;

  function renderStatic() {
    renderer.render(scene, camera);
  }

  function animate() {
    frameId = requestAnimationFrame(animate);
    const t = clock.getElapsedTime();
    const scrollT = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight || 1);

    group.rotation.y += (mouseX * 0.08 - group.rotation.y) * 0.01;
    group.position.y = -scrollT * 3.2;

    shards.forEach((m) => {
      const d = m.userData;
      m.position.x = d.basePos.x + Math.sin(t * d.speed + d.phase) * 0.4;
      m.position.y = d.basePos.y + Math.cos(t * d.speed * 0.8 + d.phase) * 0.5;
      m.rotation.x += d.rotSpeed.x * 0.01;
      m.rotation.y += d.rotSpeed.y * 0.01;
      m.rotation.z += d.rotSpeed.z * 0.01;
    });

    renderer.render(scene, camera);
  }

  if (reducedMotion) {
    renderStatic();
  } else {
    animate();
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) cancelAnimationFrame(frameId);
      else animate();
    });
  }
}

/* ==========================================================================
   Boot
   ========================================================================== */

initHeroGem();
initAmbientField();
