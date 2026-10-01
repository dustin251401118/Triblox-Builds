// ===== THEME TOGGLE =====
const toggle=document.getElementById('themeToggle');
const root=document.documentElement;
const saved=localStorage.getItem('tb-theme');
if(saved){root.setAttribute('data-theme',saved);}
const updateThemeLabel=()=>{
  const nextTheme=root.getAttribute('data-theme')==='dark'?'light':'dark';
  toggle.setAttribute('aria-label',`Ganti ke tema ${nextTheme==='dark'?'gelap':'terang'}`);
  toggle.title=`Ganti ke tema ${nextTheme==='dark'?'gelap':'terang'}`;
};
updateThemeLabel();
toggle.addEventListener('click',()=>{
  const next=root.getAttribute('data-theme')==='dark'?'light':'dark';
  root.setAttribute('data-theme',next);localStorage.setItem('tb-theme',next);
  updateThemeLabel();
});

// ===== MOBILE MENU =====
const hamburger=document.getElementById('hamburger');
const navLinks=document.getElementById('navLinks');
hamburger.addEventListener('click',()=>{
  const isOpen=navLinks.classList.toggle('open');
  hamburger.setAttribute('aria-expanded',String(isOpen));
});
document.querySelectorAll('.nav-links a').forEach(a=>a.addEventListener('click',()=>{
  navLinks.classList.remove('open');
  hamburger.setAttribute('aria-expanded','false');
}));

// ===== ORDER FORM -> WHATSAPP =====
// ⚠️ GANTI nomor di bawah dengan nomor WhatsApp bisnis kalian (format: 628xxxxxxxxxx)
const WA_NUMBER='6281234567890';
document.getElementById('orderForm').addEventListener('submit',function(e){
  e.preventDefault();
  const name=document.getElementById('fName').value.trim();
  const roblox=document.getElementById('fRoblox').value.trim();
  const service=document.getElementById('fService').value;
  const budget=document.getElementById('fBudget').value;
  const detail=document.getElementById('fDetail').value.trim();
  const msg=`Halo Triblox Builds! 🎮%0A%0A*ORDER BARU DARI WEBSITE*%0A─────────────────%0A👤 Nama: ${encodeURIComponent(name)}%0A🕹️ Username Roblox: ${encodeURIComponent(roblox)}%0A📦 Layanan: ${encodeURIComponent(service)}%0A💰 Budget: ${encodeURIComponent(budget)}%0A📝 Detail: ${encodeURIComponent(detail)}%0A─────────────────%0AMohon info selanjutnya ya, terima kasih!`;
  window.open(`https://wa.me/${WA_NUMBER}?text=${msg}`,'_blank');
});