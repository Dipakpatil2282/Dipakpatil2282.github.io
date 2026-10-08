const body=document.body;
const themeToggle=document.getElementById('themeToggle');
const menuToggle=document.getElementById('menuToggle');
const navLinks=document.getElementById('navLinks');
const toast=document.getElementById('toast');

const savedTheme=localStorage.getItem('dipak-theme');
if(savedTheme==='light'){body.classList.add('light');themeToggle.textContent='☾';}

themeToggle.addEventListener('click',()=>{
  body.classList.toggle('light');
  const light=body.classList.contains('light');
  localStorage.setItem('dipak-theme',light?'light':'dark');
  themeToggle.textContent=light?'☾':'☀';
});

menuToggle.addEventListener('click',()=>navLinks.classList.toggle('open'));
document.querySelectorAll('#navLinks a').forEach(a=>a.addEventListener('click',()=>navLinks.classList.remove('open')));

const revealObserver=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');revealObserver.unobserve(entry.target);}});
},{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>revealObserver.observe(el));

const skillButtons=document.querySelectorAll('.skill-tab');
const skillCards=document.querySelectorAll('.skill-card');
skillButtons.forEach(btn=>btn.addEventListener('click',()=>{
  skillButtons.forEach(b=>b.classList.remove('active')); btn.classList.add('active');
  const value=btn.dataset.skill;
  skillCards.forEach(card=>card.classList.toggle('hidden',value!=='all' && card.dataset.category!==value));
}));

const filterButtons=document.querySelectorAll('.filter');
const projects=document.querySelectorAll('.project-card');
filterButtons.forEach(btn=>btn.addEventListener('click',()=>{
  filterButtons.forEach(b=>b.classList.remove('active')); btn.classList.add('active');
  const value=btn.dataset.filter;
  projects.forEach(project=>{
    const types=project.dataset.type.split(' ');
    project.classList.toggle('hidden',value!=='all' && !types.includes(value));
  });
}));

window.addEventListener('scroll',()=>{
  const scrollTop=window.scrollY;
  const height=document.documentElement.scrollHeight-window.innerHeight;
  document.querySelector('.progress').style.width=(height>0?(scrollTop/height)*100:0)+'%';
});

document.querySelector('a[download]').addEventListener('click',()=>{
  toast.classList.add('show');
  setTimeout(()=>toast.classList.remove('show'),2200);
});
