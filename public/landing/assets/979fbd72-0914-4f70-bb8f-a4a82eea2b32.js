// <gem-stage> — kryształowe serce: unosi się, po dotknięciu błyska i wysyła 'gemtap'
(function () {
  class GemStage extends HTMLElement {
    connectedCallback() {
      this.attachShadow({ mode: 'open' });
      this.shadowRoot.innerHTML = `
        <style>
          :host { display: block; width: 100%; height: 100%; }
          .wrap { position: relative; width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; overflow: hidden; }
          .halo { position: absolute; width: 340px; height: 340px; border-radius: 50%;
            background: radial-gradient(circle, rgba(240,201,135,.22) 0%, rgba(214,140,220,.12) 40%, transparent 70%);
            filter: blur(6px); transition: opacity .6s, transform .6s; }
          .gem { position: relative; width: 250px; height: 250px; border-radius: 50%; cursor: pointer;
            animation: floaty 5s ease-in-out infinite; -webkit-tap-highlight-color: transparent;
            transition: transform .35s cubic-bezier(.3,.7,.2,1), filter .5s; }
          .gem img { width: 100%; height: 100%; object-fit: cover; border-radius: 50%;
            -webkit-mask-image: radial-gradient(circle, #000 55%, transparent 72%);
            mask-image: radial-gradient(circle, #000 55%, transparent 72%);
            user-select: none; -webkit-user-drag: none; pointer-events: none; }
          .gem:active { transform: scale(.94); }
          .flash { position: absolute; inset: -20px; border-radius: 50%; pointer-events: none; opacity: 0;
            background: radial-gradient(circle, rgba(255,240,215,.85) 0%, rgba(240,201,135,.35) 45%, transparent 70%); }
          .gem.lit .flash { animation: flash .9s ease-out; }
          .gem.lit { filter: drop-shadow(0 0 30px rgba(240,201,135,.7)) drop-shadow(0 0 70px rgba(214,140,220,.4)); }
          .spark { position: absolute; left: 50%; top: 50%; width: 6px; height: 6px; border-radius: 50%;
            background: #ffe9c9; box-shadow: 0 0 10px rgba(255,225,170,.95); pointer-events: none;
            animation: fly 1s cubic-bezier(.2,.7,.3,1) forwards; }
          @keyframes floaty { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-12px); } }
          @keyframes flash { 0% { opacity: 0; } 25% { opacity: 1; } 100% { opacity: 0; } }
          @keyframes fly { to { transform: translate(var(--dx), var(--dy)) scale(0); opacity: 0; } }
        </style>
        <div class="wrap">
          <div class="halo"></div>
          <div class="gem" id="gem">
            <img src="./heart.jpg" alt="">
            <div class="flash"></div>
          </div>
        </div>`;
      const gem = this.shadowRoot.getElementById('gem');
      const wrap = this.shadowRoot.querySelector('.wrap');
      let glow = 0;
      gem.addEventListener('click', () => {
        glow = Math.min(glow + 1, 5);
        gem.classList.remove('lit'); void gem.offsetWidth; gem.classList.add('lit');
        const halo = this.shadowRoot.querySelector('.halo');
        halo.style.transform = `scale(${1 + glow * 0.12})`;
        halo.style.opacity = String(0.7 + glow * 0.06);
        for (let i = 0; i < 10; i++) {
          const s = document.createElement('span');
          s.className = 'spark';
          const a = Math.random() * Math.PI * 2, r = 90 + Math.random() * 90;
          s.style.setProperty('--dx', Math.cos(a) * r + 'px');
          s.style.setProperty('--dy', Math.sin(a) * r + 'px');
          wrap.appendChild(s);
          setTimeout(() => s.remove(), 1100);
        }
        document.dispatchEvent(new CustomEvent('gemtap'));
      });
    }
  }
  if (!customElements.get('gem-stage')) customElements.define('gem-stage', GemStage);
})();
