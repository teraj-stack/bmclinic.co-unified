(() => {
  const shop = document.getElementById('sklep');
  const catalog = document.getElementById('shopCatalog');
  const cart = document.getElementById('shopCart');
  const status = document.getElementById('shopStatus');
  const storageKey = 'bm-clinic-service-cart';
  const formatPLN = new Intl.NumberFormat('pl-PL', {
    style: 'currency', currency: 'PLN', maximumFractionDigits: 0
  });
  const priceLabel = (amount, from) => amount == null
    ? 'Cena do ustalenia'
    : `${from ? 'od ' : ''}${formatPLN.format(amount)}`;
  const groups = [
    ['Proktologia', [
      ['konsultacja-pro', 'Konsultacja proktologiczna', 390],
      ['P01', 'Badanie proktologiczne i anoskopia'],
      ['P02', 'Gumkowanie hemoroidów (RBL)', 700],
      ['P03', 'Laserowe leczenie hemoroidów (LHP)', 6000],
      ['przetoka', 'Laserowe leczenie przetoki okołoodbytniczej', 4300, true],
      ['szczelina', 'Leczenie szczeliny odbytu toksyną botulinową', 1600],
      ['faldy', 'Usuwanie fałdów okołoodbytniczych', 2000]
    ]],
    ['Flebologia', [
      ['konsultacja-fle', 'Konsultacja flebologiczna', 390],
      ['konsultacja-naczyniowa', 'Konsultacja chirurga naczyniowego', 390],
      ['konsultacja-doppler', 'Konsultacja chirurga naczyniowego z USG Doppler', 550],
      ['doppler', 'USG Doppler żył kończyn dolnych'],
      ['F01', 'Laserowa ablacja żylna (EVLT / EVLA)', 5500],
      ['F02', 'Skleroterapia', 600, true],
      ['F03', 'Laserowe zamykanie naczynek', 500, true],
      ['naczynka-twarz', 'Laserowe zamykanie naczynek na twarzy', 500, true],
      ['obliteracja', 'Obliteracja', 5000]
    ]],
    ['Chirurgia ogólna', [
      ['konsultacja-chi', 'Konsultacja chirurgiczna', 390],
      ['C01', 'Chirurgiczne usuwanie zmian skórnych', 500, true],
      ['dermatoskopia', 'Dermatoskopia zmian skórnych z konsultacją', 500],
      ['zabiegi-miejscowe', 'Zabiegi chirurgiczne w znieczuleniu miejscowym', 2000, true],
      ['C02', 'Leczenie wrastającego paznokcia'],
      ['C03', 'Chirurgiczne opracowanie rany']
    ]]
  ];

  function describeService(name, amount, from) {
    const label = document.createElement('span');
    label.textContent = name;
    const price = document.createElement('strong');
    price.className = 'shop-price';
    price.textContent = priceLabel(amount, from);
    label.append(price);
    return label;
  }

  const services = new Map();
  for (const [title, entries] of groups) {
    const section = document.createElement('section');
    const heading = document.createElement('h3');
    heading.textContent = title;
    section.append(heading);
    for (const [id, name, amount, from] of entries) {
      const row = document.createElement('div');
      row.className = 'shop-row';
      const label = describeService(name, amount, from);
      const button = document.createElement('button');
      button.type = 'button';
      button.dataset.addService = id;
      row.append(label, button);
      section.append(row);
      services.set(id, { name, button, amount, from });
    }
    catalog.append(section);
  }

  let selected = new Set();
  try {
    const saved = JSON.parse(localStorage.getItem(storageKey) || '[]');
    if (Array.isArray(saved)) selected = new Set(saved.filter(id => services.has(id)));
  } catch {
    // The cart remains available in memory when storage is unavailable.
  }

  function render() {
    document.getElementById('shopCount').textContent = String(selected.size);
    document.getElementById('shopEmpty').hidden = selected.size > 0;
    const items = [...selected].map(id => services.get(id));
    const priced = items.filter(item => item.amount != null);
    const pending = items.length - priced.length;
    const subtotal = priced.reduce((sum, item) => sum + item.amount, 0);
    const total = document.getElementById('shopTotal');
    total.hidden = items.length === 0;
    const prefix = pending ? 'Suma wycenionych usług' : 'Razem';
    total.textContent = priced.length
      ? `${prefix}: ${priceLabel(subtotal, priced.some(item => item.from))}`
      : 'Koszt do ustalenia';
    if (priced.length && pending) total.textContent += ' + usługi do wyceny';
    cart.replaceChildren();
    for (const [id, { name, button, amount, from }] of services) {
      const added = selected.has(id);
      button.disabled = added;
      button.textContent = added ? 'W koszyku' : 'Dodaj do koszyka';
      button.setAttribute('aria-label', `${button.textContent}: ${name}`);
      if (added) {
        const row = document.createElement('li');
        row.className = 'shop-row';
        const label = describeService(name, amount, from);
        const remove = document.createElement('button');
        remove.type = 'button';
        remove.dataset.removeService = id;
        remove.textContent = 'Usuń';
        remove.setAttribute('aria-label', `Usuń: ${name}`);
        row.append(label, remove);
        cart.append(row);
      }
    }
  }

  shop.addEventListener('click', event => {
    const button = event.target.closest('[data-add-service], [data-remove-service]');
    if (!button) return;
    const { addService, removeService } = button.dataset;
    const id = addService || removeService;
    if (addService) selected.add(id);
    else selected.delete(id);
    try {
      localStorage.setItem(storageKey, JSON.stringify([...selected]));
    } catch {
      // Storage is optional.
    }
    render();
    const next = [...cart.querySelectorAll('button')].find(item => item.dataset.removeService === id);
    (next || services.get(id).button).focus({ preventScroll: true });
    status.textContent = `${addService ? 'Dodano do koszyka' : 'Usunięto z koszyka'}: ${services.get(id).name}.`;
  });

  render();
})();
