(function () {
  "use strict";

  const TechBubbles = (function () {

    const DEFAULT_CONFIG_PATH = "bubbles/icons.json";
    const DEFAULT_ICONS_BASE_PATH = "bubbles/icons/";

    const MIN_RADIUS = 22;
    const MAX_RADIUS = 70;

    async function init(options = {}) {
      const configPath = options.configPath || DEFAULT_CONFIG_PATH;
      const iconsBasePath = options.iconsBasePath || DEFAULT_ICONS_BASE_PATH;
      const canvasId = options.canvasId || "bubbles-canvas";

      let canvas = document.getElementById(canvasId);

      if (!canvas) {
        canvas = document.createElement("canvas");
        canvas.id = canvasId;
        document.body.prepend(canvas);
      }

      const ctx = canvas.getContext("2d");

      let bubbles = [];
      let icons = [];

      let bubbleCount = 15;
      let globalSpeed = 0.6;

      let glowEnabled = true;
      let glowColor = "#22d3ee";

      function resize() {
        const dpr = window.devicePixelRatio || 1;
        canvas.width = window.innerWidth * dpr;
        canvas.height = window.innerHeight * dpr;
        canvas.style.width = window.innerWidth + "px";
        canvas.style.height = window.innerHeight + "px";
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      }

      window.addEventListener("resize", resize);
      resize();

      // === Adaptive scale based on screen width ===
      function getScreenScale() {
        const baseWidth = 1920;
        const scale = window.innerWidth / baseWidth;
        return Math.min(Math.max(scale, 0.45), 1);
      }

      async function loadConfig() {
        const response = await fetch(configPath);
        const data = await response.json();

        bubbleCount = data.bubbleCount || 15;
        globalSpeed = data.speed || 0.6;

        glowEnabled = data.glow ?? true;
        glowColor = data.glowColor || "#22d3ee";

        // === Adaptive bubble count for mobile ===
        if (window.innerWidth < 768) {
          bubbleCount = Math.floor(bubbleCount * 0.6);
        }

        const loaded = await Promise.all(
          data.icons.map(item => {
            return new Promise(resolve => {
              const img = new Image();
              img.src = iconsBasePath + item.file;
              img.onload = () => resolve({ img, weight: item.weight });
              img.onerror = () => resolve(null);
            });
          })
        );

        icons = loaded.filter(Boolean);
      }

      function weightToRadius(weight) {
        const normalized = Math.min(Math.max(weight, 1), 10) / 10;
        const scale = getScreenScale();
        return (MIN_RADIUS + normalized * (MAX_RADIUS - MIN_RADIUS)) * scale;
      }

      class Bubble {
        constructor(x, y, radius, weight, img) {
          this.x = x;
          this.y = y;
          this.radius = radius;
          this.mass = radius * weight;

          const speedFactor = globalSpeed * (1.2 - weight / 12);

          this.vx = (Math.random() - 0.5) * speedFactor;
          this.vy = (Math.random() - 0.5) * speedFactor;

          this.img = img;
        }

        update() {
          this.x += this.vx;
          this.y += this.vy;

          const minBounce = 0.4;

          if (this.x - this.radius < 0) {
            this.x = this.radius;
            this.vx = Math.abs(this.vx);
            if (Math.abs(this.vx) < minBounce) this.vx = minBounce;
          }

          if (this.x + this.radius > window.innerWidth) {
            this.x = window.innerWidth - this.radius;
            this.vx = -Math.abs(this.vx);
            if (Math.abs(this.vx) < minBounce) this.vx = -minBounce;
          }

          if (this.y - this.radius < 0) {
            this.y = this.radius;
            this.vy = Math.abs(this.vy);
            if (Math.abs(this.vy) < minBounce) this.vy = minBounce;
          }

          if (this.y + this.radius > window.innerHeight) {
            this.y = window.innerHeight - this.radius;
            this.vy = -Math.abs(this.vy);
            if (Math.abs(this.vy) < minBounce) this.vy = -minBounce;
          }
        }

        draw() {
          ctx.save();

          ctx.beginPath();
          ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
          ctx.fillStyle = "rgba(34,211,238,0.05)";
          ctx.fill();
          ctx.closePath();

          if (glowEnabled) {
            ctx.save();
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.clip();

            const innerGlow = ctx.createRadialGradient(
              this.x,
              this.y,
              this.radius,
              this.x,
              this.y,
              this.radius * 0.2
            );

            innerGlow.addColorStop(0, glowColor + "44");
            innerGlow.addColorStop(0.2, glowColor + "11");
            innerGlow.addColorStop(1, "rgba(0,0,0,0)");

            ctx.fillStyle = innerGlow;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fill();

            ctx.restore();
          }

          const size = this.radius * 1.2;

          ctx.drawImage(
            this.img,
            this.x - size / 2,
            this.y - size / 2,
            size,
            size
          );

          ctx.restore();
        }
      }

      function resolveCollision(b1, b2) {
        const dx = b2.x - b1.x;
        const dy = b2.y - b1.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < b1.radius + b2.radius) {
          const angle = Math.atan2(dy, dx);
          const totalMass = b1.mass + b2.mass;

          const vx1 = b1.vx;
          const vy1 = b1.vy;

          b1.vx = (vx1 * (b1.mass - b2.mass) + 2 * b2.mass * b2.vx) / totalMass;
          b1.vy = (vy1 * (b1.mass - b2.mass) + 2 * b2.mass * b2.vy) / totalMass;

          b2.vx = (b2.vx * (b2.mass - b1.mass) + 2 * b1.mass * vx1) / totalMass;
          b2.vy = (b2.vy * (b2.mass - b1.mass) + 2 * b1.mass * vy1) / totalMass;

          const overlap = b1.radius + b2.radius - distance;
          const push = overlap / 2;

          b1.x -= Math.cos(angle) * push;
          b1.y -= Math.sin(angle) * push;
          b2.x += Math.cos(angle) * push;
          b2.y += Math.sin(angle) * push;
        }
      }

      function createBubbles() {
        bubbles = [];

        const finalCount =
          icons.length >= bubbleCount ? icons.length : bubbleCount;

        for (let i = 0; i < finalCount; i++) {
          const icon = icons[i % icons.length];

          const radius = weightToRadius(icon.weight);
          const x = radius + Math.random() * (window.innerWidth - radius * 2);
          const y = radius + Math.random() * (window.innerHeight - radius * 2);

          bubbles.push(new Bubble(x, y, radius, icon.weight, icon.img));
        }
      }

      function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (let i = 0; i < bubbles.length; i++) {
          bubbles[i].update();

          for (let j = i + 1; j < bubbles.length; j++) {
            resolveCollision(bubbles[i], bubbles[j]);
          }

          bubbles[i].draw();
        }

        requestAnimationFrame(animate);
      }

      await loadConfig();
      if (!icons.length) return;

      createBubbles();
      animate();
    }

    return { init };
  })();

  window.TechBubbles = TechBubbles;
})();
