let write_words = [];

const up = document.getElementById("upload-input");
const preview = document.getElementById("upload-preview");

const typing_el = document.getElementById("upload-typing");
const typing_right = document.getElementById("upload-right");
const typing_wrong = document.getElementById("upload-wrong");

const up_current_el = document.getElementById("upload-current");
const up_next = document.getElementById("upload-next");

const up_cps_el = document.getElementById("upload-cps");
const up_kbps_el = document.getElementById("upload-kbps");

let current_upload_word = "";
let current_upload_index = 0;
let upload_done = false;
let upload_over = false;

let upload_started = false;
let upload_start_time = 0;
let upload_mistakes = 0;
let char_count = 0;

function initUpload() {
  write_words = shuffle(original_words);
  current_upload_index = 0;
  upload_done = false;
  upload_over = false;

  upload_started = false;
  upload_start_time = 0;
  upload_mistakes = 0;
  char_count = 0;

  current_upload_word = write_words.shift();
  up_current_el.textContent = current_upload_word;
  write_words.forEach((w) => {
    const span = document.createElement("span");
    span.textContent = w;
    up_next.appendChild(span);
  });
}
window.addEventListener("load", initUpload);

function nextUploadWord() {
  typing_right.textContent = "";
  typing_wrong.textContent = "";
  up.value = "";
  current_upload_index = 0;
  upload_done = false;
  updateUploadValues();

  if(write_words.length <= 0) {
    upload_over = true;
    up_current_el.textContent = "Fim :)";
    return;
  }
  current_upload_word = write_words.shift();
  up_current_el.textContent = current_upload_word;
  up_next.firstElementChild.remove();
}

function updateUploadValues() {
  const delta = Date.now() - upload_start_time;
  const cps = char_count/(delta/1000);
  up_cps_el.textContent = cps.toFixed(4);

  const kbps = (cps*7)/1000;
  up_kbps_el.textContent = kbps.toFixed(4);
}

up.oninput = e => {
  if(!upload_started) {
    upload_started = true;
    upload_start_time = new Date();
  }
  if(upload_over) return;
  if(!e.data || e.data.length > 1) return;

  if(!upload_done) {
    if(e.data === current_upload_word.charAt(current_upload_index)) {
      typing_right.textContent += e.data;
      current_upload_index++;
      char_count++;
      if(current_upload_index >= current_upload_word.length) {
        upload_done = true;
      }
    } else {
      const ulen = current_upload_word.length;
      typing_wrong.textContent = current_upload_word.substr(current_upload_index,ulen);
      upload_mistakes++;
      upload_done = true;
    }
  } else if(e.data === " ") {
    nextUploadWord();
  } else {
    upload_mistakes++;
  }
};