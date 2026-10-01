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

// ===== INTERACTIVE BUILD PREVIEW =====
const buildProgress=document.getElementById('buildProgress');
const buildPercent=document.getElementById('buildPercent');
const buildStage=document.getElementById('buildStage');
const buildTrack=document.querySelector('.build-track');
const buildCaption=document.querySelector('.build-caption');
const buildStages=[
  {name:'Neon Obby',progress:68,caption:'Blok dan jalur sedang dirakit'},
  {name:'Sky Islands',progress:82,caption:'Pulau melayang mulai terbentuk'},
  {name:'Crystal Cave',progress:56,caption:'Pencahayaan kristal sedang diatur'}
];
let currentBuild=0;
const updateBuildPreview=()=>{
  const stage=buildStages[currentBuild];
  buildProgress.style.width=`${stage.progress}%`;
  buildPercent.textContent=`${stage.progress}%`;
  buildStage.textContent=stage.name;
  buildCaption.textContent=stage.caption;
  buildTrack.setAttribute('aria-valuenow',String(stage.progress));
  currentBuild=(currentBuild+1)%buildStages.length;
};
if(buildProgress&&buildPercent&&buildStage&&buildTrack&&buildCaption){
  updateBuildPreview();
  window.setInterval(updateBuildPreview,4200);
}

// ===== SCROLL INTERACTIONS =====
const prefersReducedMotion=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if(!prefersReducedMotion&&'IntersectionObserver' in window){
  document.documentElement.classList.add('js-motion');
  const revealObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    }
  }),{threshold:.12});
  document.querySelectorAll('section .container > *, .cards-3 > *, .steps > *, .pay-grid > *, .faq-list details').forEach((element,index)=>{
    element.classList.add('reveal');
    element.style.transitionDelay=`${Math.min(index%4,3)*70}ms`;
    revealObserver.observe(element);
  });

  const sectionObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{
    if(entry.isIntersecting){
      document.querySelectorAll('.nav-links a').forEach(link=>{
        link.classList.toggle('is-active',link.getAttribute('href')===`#${entry.target.id}`);
      });
    }
  }),{rootMargin:'-25% 0px -65% 0px'});
  document.querySelectorAll('main section[id], body > section[id]').forEach(section=>sectionObserver.observe(section));
}

const heroMap=document.querySelector('.hero-map');
if(heroMap&&!prefersReducedMotion&&window.matchMedia('(pointer: fine)').matches){
  heroMap.addEventListener('pointermove',event=>{
    const bounds=heroMap.getBoundingClientRect();
    const x=(event.clientX-bounds.left)/bounds.width-.5;
    const y=(event.clientY-bounds.top)/bounds.height-.5;
    heroMap.querySelectorAll('.block').forEach((block,index)=>{
      const depth=(index+1)*5;
      block.style.transform=`translate(${x*depth}px,${y*depth}px)`;
    });
  });
  heroMap.addEventListener('pointerleave',()=>{
    heroMap.querySelectorAll('.block').forEach(block=>block.style.transform='');
  });
}

// ===== ORDER FORM -> WHATSAPP =====
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