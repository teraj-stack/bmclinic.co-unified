// <plexus-net> — rysowana siatka plexus: delikatny dryf, tafle plexi z refleksami,
// stuknięcie wysyła powolną falę perystaltyczną wibrującą węzłami.
(function () {
  class PlexusNet extends HTMLElement {
    connectedCallback() {
      if (this._init) return; this._init = true;
      this.style.display = 'block';
      const cv = document.createElement('canvas');
      cv.style.cssText = 'width:100%;height:100%;display:block;';
      this.appendChild(cv);
      const ctx = cv.getContext('2d');
      const royal = (this.getAttribute('variant') || '') === 'royal';
      const P = royal
        ? { bg0: 'rgba(4,8,34,0.97)', bg1: 'rgba(10,22,72,0.9)', bg2: 'rgba(16,34,110,0.6)', bok: '80,130,255', far: 'rgba(90,130,255,0.09)', edge: '110,170,255', node: '205,225,255', glow: 'rgba(120,170,255,.95)', p0: '90,150,255', pHi: '220,235,255', p1: '60,110,235' }
        : { bg0: 'rgba(0,1,4,0.96)', bg1: 'rgba(2,10,22,0.88)', bg2: 'rgba(3,12,26,0.55)', bok: '70,150,220', far: 'rgba(60,120,190,0.06)', edge: '140,200,255', node: '225,242,255', glow: 'rgba(150,210,255,.9)', p0: '100,180,255', pHi: '235,248,255', p1: '60,120,210' };
      let W = 0, H = 0, dpr = Math.min(window.devicePixelRatio || 1, 2);
      const N = 92, TH = 54;
      const rnd = (i, s) => { const x = Math.sin(i * 127.1 + s * 311.7) * 43758.5453; return x - Math.floor(x); };
      let nodes = [], edges = [], panes = [], waves = [];
      const link = () => {
        edges = []; const tri = [];
        const M = nodes.length;
        for (let i = 0; i < M; i++) for (let j = i + 1; j < M; j++) {
          const dx = nodes[i].bx - nodes[j].bx, dy = nodes[i].by - nodes[j].by;
          if (dx * dx + dy * dy < TH * TH) {
            edges.push([i, j]);
            for (let k = j + 1; k < M; k++) {
              const d2 = (nodes[i].bx - nodes[k].bx) ** 2 + (nodes[i].by - nodes[k].by) ** 2;
              const d3 = (nodes[j].bx - nodes[k].bx) ** 2 + (nodes[j].by - nodes[k].by) ** 2;
              if (d2 < TH * TH && d3 < TH * TH) tri.push([i, j, k]);
            }
          }
        }
        panes = tri.filter((_, idx) => rnd(idx, 7) < 0.1).slice(0, 10)
          .map((t, idx) => ({ t, ph: rnd(idx, 8) * Math.PI * 2, sp: 0.3 + rnd(idx, 9) * 0.5 }));
      };
      const build = () => {
        nodes = Array.from({ length: N }, (_, i) => ({
          bx: rnd(i, 1) * W, by: rnd(i, 2) * H,
          a: rnd(i, 3) * Math.PI * 2, sp: 0.14 + rnd(i, 4) * 0.2, r: 3.5 + rnd(i, 5) * 7,
          dx: 0, dy: 0,
        }));
        link();
      };
      const resize = () => {
        const r = this.getBoundingClientRect();
        if (!r.width || !r.height) return;
        W = r.width; H = r.height;
        cv.width = W * dpr; cv.height = H * dpr;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        build();
      };
      new ResizeObserver(resize).observe(this);
      const tap = (x, y) => {
        waves.push({ x, y, t0: performance.now() }); if (waves.length > 3) waves.shift();
        // podział oczka: stuknięcie dorabia drobniejsze węzły — sieć gęstnieje z zabawy
        if (nodes.length < 230) {
          const M = nodes.length;
          for (let k = 0; k < 5; k++) {
            const ang = rnd(M + k, 21) * Math.PI * 2, rr = 5 + rnd(M + k, 22) * 30;
            nodes.push({ bx: x + Math.cos(ang) * rr, by: y + Math.sin(ang) * rr, a: rnd(M + k, 23) * Math.PI * 2, sp: 0.16 + rnd(M + k, 24) * 0.24, r: 1.8 + rnd(M + k, 25) * 4.5, dx: 0, dy: 0 });
          }
          link();
        }
      };
      this.addEventListener('pointerdown', (e) => { const r = this.getBoundingClientRect(); tap(e.clientX - r.left, e.clientY - r.top); });
      let raf;
      const step = (now) => {
        raf = requestAnimationFrame(step);
        if (!W) return;
        const t = now / 1000;
        ctx.clearRect(0, 0, W, H);
        // głębia: czerń przechodząca w granat + rozmyte bokeh w tle
        const bg = ctx.createLinearGradient(0, 0, 0, H);
        bg.addColorStop(0, P.bg0);
        bg.addColorStop(0.55, P.bg1);
        bg.addColorStop(1, P.bg2);
        ctx.fillStyle = bg; ctx.fillRect(0, 0, W, H);
        for (let i = 0; i < 12; i++) {
          const bx = ((rnd(i, 11) * 1.3 + t * 0.004 * (1 + rnd(i, 12))) % 1.1 - 0.05) * W;
          const by = rnd(i, 13) * H;
          const br = 8 + rnd(i, 14) * 26;
          const bo = 0.05 + rnd(i, 15) * 0.1 + 0.04 * Math.sin(t * 0.4 + i);
          const bg2 = ctx.createRadialGradient(bx, by, 0, bx, by, br);
          bg2.addColorStop(0, 'rgba(' + P.bok + ',' + bo.toFixed(3) + ')');
          bg2.addColorStop(1, 'rgba(' + P.bok + ',0)');
          ctx.fillStyle = bg2; ctx.beginPath(); ctx.arc(bx, by, br, 0, Math.PI * 2); ctx.fill();
        }
        // dalszy plan siatki — rozmyty, ciemny
        ctx.save(); ctx.translate(W * 0.06, H * 0.04); ctx.scale(0.9, 0.9);
        ctx.strokeStyle = P.far; ctx.lineWidth = 1.6;
        for (const [i, j] of edges) { const a = nodes[i], b = nodes[j]; if (!a.x) continue; ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke(); }
        ctx.restore();
        waves = waves.filter(w => now - w.t0 < 16000);
        for (let i = 0; i < nodes.length; i++) {
          const n = nodes[i];
          let x = n.bx + Math.cos(n.a + t * n.sp) * n.r;
          let y = n.by + Math.sin(n.a * 1.7 + t * n.sp * 0.8) * n.r;
          let vib = 0;
          for (const w of waves) {
            const age = (now - w.t0) / 1000;
            const R = age * 46; // bardzo powoli
            const d = Math.hypot(x - w.x, y - w.y);
            const band = Math.exp(-((d - R) * (d - R)) / (2 * 46 * 46));
            const amp = band * 6 * Math.exp(-age / 7);
            vib = Math.max(vib, band * Math.exp(-age / 7));
            x += Math.sin(t * 13 + i * 2.1) * amp;
            y += Math.cos(t * 11 + i * 1.3) * amp * 0.8 + Math.sin((d - R) * 0.09) * amp * 0.5;
          }
          n.x = x; n.y = y; n.vib = vib;
        }
        // tafle plexi
        for (const p of panes) {
          const [a, b, c] = p.t.map(k => nodes[k]);
          const g = ctx.createLinearGradient(a.x, a.y, c.x, c.y);
          const sh = 0.5 + 0.5 * Math.sin(t * p.sp + p.ph);
          const vib = Math.max(a.vib, b.vib, c.vib);
          const base = 0.07 + sh * 0.12 + vib * 0.2;
          g.addColorStop(0, 'rgba(' + P.p0 + ',' + (base * 0.5).toFixed(3) + ')');
          g.addColorStop(Math.max(0.05, Math.min(0.95, sh)), 'rgba(' + P.pHi + ',' + Math.min(0.55, base * 2.2).toFixed(3) + ')');
          g.addColorStop(1, 'rgba(' + P.p1 + ',' + (base * 0.4).toFixed(3) + ')');
          ctx.fillStyle = g;
          ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.lineTo(c.x, c.y); ctx.closePath(); ctx.fill();
        }
        // krawędzie
        for (const [i, j] of edges) {
          const a = nodes[i], b = nodes[j];
          const vib = Math.max(a.vib, b.vib);
          ctx.strokeStyle = 'rgba(' + P.edge + ',' + (0.13 + vib * 0.45).toFixed(3) + ')';
          ctx.lineWidth = 0.4 + vib * 0.6;
          ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
        }
        // węzły
        for (const n of nodes) {
          const al = 0.5 + n.vib * 0.5;
          ctx.fillStyle = 'rgba(' + P.node + ',' + al.toFixed(3) + ')';
          ctx.shadowColor = P.glow; ctx.shadowBlur = 3 + n.vib * 8;
          ctx.beginPath(); ctx.arc(n.x, n.y, 0.9 + n.vib * 1.3, 0, Math.PI * 2); ctx.fill();
          ctx.shadowBlur = 0;
        }
      };
      raf = requestAnimationFrame(step);
      this._stop = () => cancelAnimationFrame(raf);
    }
    disconnectedCallback() { if (this._stop) this._stop(); this._init = false; if (this.firstChild) this.removeChild(this.firstChild); }
  }
  if (!customElements.get('plexus-net')) customElements.define('plexus-net', PlexusNet);
})();
