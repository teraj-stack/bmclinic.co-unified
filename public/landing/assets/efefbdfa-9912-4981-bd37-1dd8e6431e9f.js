// <type-writer text="..." speed="30" delay="500" cursor="#f0c987"> — efekt pisania na maszynie
// z pauzami "zastanowienia" po znakach interpunkcyjnych i losowymi wahaniami.
(function () {
  class TypeWriter extends HTMLElement {
    connectedCallback() {
      if (this._on) return; this._on = true;
      const text = this.getAttribute('text') || '';
      const speed = parseFloat(this.getAttribute('speed')) || 30;
      const delay = parseFloat(this.getAttribute('delay')) || 0;
      const cCol = this.getAttribute('cursor') || '#f0c987';
      this.style.position = 'relative';
      this.style.display = 'inline-block';
      this.style.width = '100%';
      // duch rezerwuje miejsce (brak skoków layoutu), tekst pisze się na wierzchu
      this.innerHTML = '';
      const ghost = document.createElement('span');
      ghost.textContent = text;
      ghost.style.cssText = 'visibility:hidden;';
      const typed = document.createElement('span');
      typed.style.cssText = 'position:absolute;left:0;top:0;width:100%;';
      const cur = document.createElement('span');
      cur.style.cssText = 'display:inline-block;width:2px;height:1em;vertical-align:-0.12em;margin-left:1px;background:' + cCol + ';box-shadow:0 0 6px ' + cCol + ';-webkit-text-fill-color:initial;';
      typed.appendChild(document.createTextNode(''));
      typed.appendChild(cur);
      this.appendChild(ghost); this.appendChild(typed);
      const tn = typed.firstChild;
      let i = 0, blink;
      const rnd = () => Math.random();
      const startBlink = () => { blink = setInterval(() => { cur.style.opacity = cur.style.opacity === '0' ? '1' : '0'; }, 460); };
      const stepType = () => {
        if (!this.isConnected) return;
        if (i >= text.length) {
          startBlink();
          this._t = setTimeout(() => { cur.style.display = 'none'; clearInterval(blink); }, 3200);
          return;
        }
        const ch = text[i]; i++;
        tn.textContent = text.slice(0, i);
        let d = speed * (0.7 + rnd() * 0.7);
        if (',;:'.includes(ch)) d += 260 + rnd() * 220;
        if ('.!?…'.includes(ch)) d += 520 + rnd() * 420;
        if (ch === '—') d += 340;
        if (rnd() < 0.045) d += 300 + rnd() * 380; // chwila zastanowienia
        this._t = setTimeout(stepType, d);
      };
      cur.style.opacity = '0';
      this._t = setTimeout(() => { cur.style.opacity = '1'; stepType(); }, delay);
    }
    disconnectedCallback() { clearTimeout(this._t); this._on = false; }
  }
  if (!customElements.get('type-writer')) customElements.define('type-writer', TypeWriter);
})();
