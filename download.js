const read_words = shuffle([
  ...original_words,
  "gavião", "palmeira", "espirro", "maquete",
  "tijolo", "hortaliças", "espírito", "chocolate",
  "pimenta", "característica", "palavra", "dezesseis",
  "púrpura", "asiático", "fornalha", "enxofre",
  "jovial", "siamês", "caixote", "flácido",
  "alvenaria", "espinhento", "rochoso", "alicerce",
  "cardume", "percussão", "jangada", "marmita",
  "franceses", "piñata", "torre", "montanha",
  "trigo", "alimento", "pêssego", "nectarina",
  "úmido", "diamante", "azulado", "nabo", "espeto",
  "cogumelo", "empada", "geladeira", "guarda-sol",
  "iluminação", "estereótipo", "loção", "peixe"
]);
const display = document.getElementById("download-display");
const slider = document.getElementById("download-range");
const dwn_pause_el = document.getElementById("download-on");
const dwn_cps_el = document.getElementById("download-cps");
const dwn_kbps_el = document.getElementById("download-kbps");
const rlen = read_words.length;
const ravg = read_words.map(e => e.length).reduce((a, b) => a + b, 0)/rlen;
let current_download_index = 0;
let dwn_is_on = false;

function initDownload() {
  slider.value = 300;
  updateDownloadWord();
}

async function updateDownloadWord() {
  display.textContent = read_words[current_download_index];
  current_download_index++;
  if(current_download_index >= rlen) {
    current_download_index = 0;
  }
  await sleep(slider.value);
  if(dwn_is_on)
    updateDownloadWord();
}

slider.onchange = () => {
  const cps = ravg * (1000/slider.value);
  dwn_cps_el.textContent = cps.toFixed(4);

  const kbps = (cps*7)/1000;
  dwn_kbps_el.textContent = kbps.toFixed(4);
}
dwn_pause_el.onchange = () => {
  dwn_is_on = !dwn_pause_el.checked;
  if(dwn_is_on)
    updateDownloadWord();
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
window.addEventListener("load", initDownload);