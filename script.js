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

// ===== CONCEPT PICKER -> ORDER FORM =====
const conceptPanel=document.querySelector('.concept-panel');
const conceptKicker=document.getElementById('conceptKicker');
const conceptTitle=document.getElementById('conceptTitle');
const conceptDescription=document.getElementById('conceptDescription');
const conceptFeatures=document.getElementById('conceptFeatures');
const conceptVisual=document.getElementById('conceptVisual');
const conceptVisualGenre=document.getElementById('conceptVisualGenre');
const conceptArt=document.getElementById('conceptArt');
const conceptOptions=document.querySelectorAll('.concept-option');
const orderDetails=document.getElementById('fDetail');
const conceptSteps=[1,2,3,4].map(step=>document.getElementById(`conceptStep${step}`));
const conceptIcons=Array.from(document.querySelectorAll('.concept-node-icon use'));
const conceptBriefs={
  obby:{label:'Obby',title:'Obby penuh tantangan',description:'Susun lintasan dengan tempo, tantangan, dan tujuan yang jelas.',steps:['Spawn','Rintangan','Checkpoint','Finish'],icons:['icon-target','icon-hammer','icon-map','icon-trophy'],features:['Checkpoint dan level bertahap','Rintangan sesuai tingkat kesulitan','Area finish dan reward'],brief:'Ide map: Obby dengan checkpoint, rintangan bertahap, dan area finish.'},
  tycoon:{label:'Tycoon',title:'Tycoon yang terus berkembang',description:'Bangun loop permainan dari awal, kumpulkan hasil, lalu kembangkan area.',steps:['Klaim plot','Produksi','Upgrade','Ekspansi'],icons:['icon-house','icon-wallet','icon-design','icon-globe'],features:['Plot dan jalur progres pemain','Mesin atau objek penghasil resource','Upgrade dan area yang terbuka bertahap'],brief:'Ide map: Tycoon dengan plot pemain, sistem upgrade, dan area yang terbuka bertahap.'},
  simulator:{label:'Simulator',title:'Simulator dengan progres terasa',description:'Buat pemain punya alasan untuk terus mengumpulkan, meningkatkan, dan menjelajah.',steps:['Jelajah','Kumpulkan','Upgrade','Buka area'],icons:['icon-map','icon-gem','icon-design','icon-globe'],features:['Sistem koleksi atau resource','Upgrade karakter dan perlengkapan','Area eksplorasi dengan target baru'],brief:'Ide map: Simulator dengan sistem koleksi, upgrade, dan area eksplorasi bertahap.'},
  horror:{label:'Horror',title:'Horror penuh ketegangan',description:'Atur ritme eksplorasi, petunjuk, dan ancaman agar pemain terus penasaran.',steps:['Eksplorasi','Cari petunjuk','Hindari ancaman','Melarikan diri'],icons:['icon-moon','icon-key','icon-eye','icon-door'],features:['Area dengan suasana dan pencahayaan kuat','Petunjuk untuk membuka jalur cerita','Momen kejar-kejaran atau kejutan'],brief:'Ide map: Horror dengan eksplorasi, petunjuk cerita, dan momen menghindari ancaman.'},
  roleplay:{label:'Roleplay',title:'Dunia roleplay yang hidup',description:'Siapkan tempat dan aktivitas yang mendorong pemain membangun cerita bersama.',steps:['Pilih peran','Temukan tempat','Mulai cerita','Bermain bersama'],icons:['icon-collab','icon-map','icon-chat','icon-sun'],features:['Area publik dan lokasi interaksi','Pilihan peran atau pekerjaan','Ruang sosial untuk aktivitas pemain'],brief:'Ide map: Roleplay dengan beragam area interaksi, pilihan peran, dan ruang sosial.'},
  adventure:{label:'Adventure',title:'Petualangan dengan tujuan',description:'Bawa pemain melewati area baru, misi, dan tantangan yang makin berkembang.',steps:['Terima misi','Jelajahi','Hadapi boss','Temukan hadiah'],icons:['icon-bulb','icon-map','icon-shield','icon-gem'],features:['Jalur eksplorasi dengan rahasia','Misi dan objektif bertahap','Pertarungan atau tantangan akhir'],brief:'Ide map: Adventure dengan jalur eksplorasi, misi bertahap, dan tantangan akhir.'},
  racing:{label:'Racing',title:'Balapan yang kompetitif',description:'Rancang sirkuit yang mudah dibaca, seru dikuasai, dan enak dimainkan berulang.',steps:['Pilih kendaraan','Garis start','Kuasai tikungan','Garis finish'],icons:['icon-car','icon-flag','icon-map','icon-trophy'],features:['Sirkuit dengan variasi tikungan','Jalur alternatif atau shortcut','Area start, checkpoint, dan finish'],brief:'Ide map: Racing dengan sirkuit bervariasi, checkpoint, dan jalur alternatif.'},
  battle:{label:'Battle',title:'Arena untuk adu strategi',description:'Tata arena dan titik objektif supaya pertandingan tetap seimbang dan dinamis.',steps:['Pilih loadout','Masuk arena','Rebut objektif','Raih kemenangan'],icons:['icon-collab','icon-shield','icon-target','icon-trophy'],features:['Arena dengan cover dan rute seimbang','Titik objektif yang mudah dipahami','Ruang untuk strategi tim'],brief:'Ide map: Battle dengan arena seimbang, titik objektif, dan pilihan strategi tim.'}
};
conceptOptions.forEach(option=>option.addEventListener('click',()=>{
  const concept=conceptBriefs[option.dataset.concept];
  if(!concept)return;
  conceptPanel.dataset.concept=option.dataset.concept;
  conceptVisual.dataset.concept=option.dataset.concept;
  conceptArt.dataset.concept=option.dataset.concept;
  conceptVisualGenre.textContent=concept.label.toUpperCase();
  conceptVisual.setAttribute('aria-label',`Ilustrasi konsep ${concept.label}. Alur: ${concept.steps.join(', ')}`);
  concept.steps.forEach((step,index)=>{
    conceptSteps[index].textContent=step;
    conceptIcons[index].setAttribute('href',`#${concept.icons[index]}`);
  });
  conceptKicker.textContent=concept.label;
  conceptTitle.textContent=concept.title;
  conceptDescription.textContent=concept.description;
  conceptFeatures.replaceChildren(...concept.features.map(feature=>{
    const item=document.createElement('li');
    item.textContent=feature;
    return item;
  }));
  conceptOptions.forEach(button=>button.setAttribute('aria-pressed',String(button===option)));
}));
document.getElementById('useConcept').addEventListener('click',()=>{
  const concept=conceptBriefs[conceptPanel.dataset.concept];
  if(!concept)return;
  const currentDetails=orderDetails.value.trim();
  if(!currentDetails){
    orderDetails.value=concept.brief;
  }else if(!currentDetails.includes(concept.brief)){
    orderDetails.value=`${currentDetails}\n\n${concept.brief}`;
  }
});

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

// ===== ORDER FORM -> WHATSAPP =====
const WA_ORDER_LINK='https://wa.me/message/CGPS3H5U5TVLD1';
document.getElementById('orderForm').addEventListener('submit',function(e){
  e.preventDefault();
  const name=document.getElementById('fName').value.trim();
  const roblox=document.getElementById('fRoblox').value.trim();
  const service=document.getElementById('fService').value;
  const budget=document.getElementById('fBudget').value;
  const detail=document.getElementById('fDetail').value.trim();
  const message=[
    'Halo Triblox Builds! Saya ingin konsultasi order map.',
    '',
    'ORDER DARI WEBSITE',
    `Nama: ${name}`,
    `Username Roblox: ${roblox}`,
    `Layanan: ${service}`,
    `Budget: ${budget}`,
    `Detail request: ${detail}`,
    '',
    'Mohon info selanjutnya, terima kasih!'
  ].join('\n');
  const orderUrl=new URL(WA_ORDER_LINK);
  orderUrl.searchParams.set('text',message);
  window.open(orderUrl.toString(),'_blank','noopener,noreferrer');
});