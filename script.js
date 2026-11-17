document.documentElement.classList.add('js-loading');
const avatar=document.getElementById('avatar');
const finish=()=>document.documentElement.classList.remove('js-loading');
const imageReady=avatar.complete?Promise.resolve():new Promise(resolve=>{avatar.addEventListener('load',resolve,{once:true});avatar.addEventListener('error',resolve,{once:true})});
const fontReady=document.fonts?document.fonts.load('700 24px Oswald').catch(()=>{}):Promise.resolve();
Promise.race([Promise.all([imageReady,fontReady]),new Promise(resolve=>setTimeout(resolve,6000))]).then(finish);
if(matchMedia('(hover:hover) and (pointer:fine) and (prefers-reduced-motion:no-preference)').matches){
  const hero=document.querySelector('.hero');
  hero.addEventListener('pointermove',event=>{
    if(event.pointerType!=='mouse')return;
    const r=hero.getBoundingClientRect();
    const x=(event.clientX-r.left)/r.width-.5;
    const y=(event.clientY-r.top)/r.height-.5;
    avatar.style.setProperty('--ry',`${x*60}deg`);
    avatar.style.setProperty('--rx',`${-y*30}deg`);
  });
  hero.addEventListener('pointerleave',()=>{
    avatar.style.setProperty('--ry','0deg');
    avatar.style.setProperty('--rx','0deg');
  });
}

if('IntersectionObserver' in window && matchMedia('(prefers-reduced-motion:no-preference)').matches){
  const observer=new IntersectionObserver(entries=>{for(const entry of entries){if(entry.isIntersecting){entry.target.classList.add('reveal-visible');observer.unobserve(entry.target)}}},{threshold:.1});
  document.querySelectorAll('.about-copy,.about-photo,.work-item,.service-list>div,.course-grid>div').forEach(el=>{el.classList.add('reveal-ready');observer.observe(el)});
}
