(function(root){
 'use strict';
 const intrinsicWidth=1200;
 function nextScale(current,action,availableWidth){
  const width=Number.isFinite(availableWidth)&&availableWidth>0?availableWidth:intrinsicWidth;
  const fit=Math.min(1,Math.max(.1,width/intrinsicWidth));
  const scale=Number.isFinite(current)&&current>0?current:fit;
  const requested=action==='fit'?fit:action==='actual'?1:action==='in'?scale*1.25:action==='out'?scale/1.25:scale;
  return Math.round(Math.min(3,Math.max(fit,requested))*1000)/1000;
 }
 if(typeof module!=='undefined'&&module.exports){module.exports={nextScale};return;}
 const doc=root.document;
 const home=doc.getElementById('diagram-home');
 const card=doc.getElementById('architecture-viewer');
 const viewport=doc.getElementById('diagram-viewport');
 const svg=viewport&&viewport.querySelector('svg');
 if(!home||!card||!svg)return;
 const dialog=doc.getElementById('architecture-dialog');
 const expand=doc.getElementById('diagram-expand');
 const close=doc.getElementById('diagram-close');
 const controls=doc.getElementById('diagram-zoom-controls');
 const output=doc.getElementById('diagram-zoom');
 let scale=1,mode='fit',previous={scale:1,mode:'fit',x:0,y:0},pageOverflow='';
 function render(action){
  mode=action==='fit'?'fit':'manual';
  scale=nextScale(scale,action,viewport.clientWidth);
  svg.style.width=(scale*intrinsicWidth)+'px';
  output.textContent=Math.round(scale*100)+'%';
  controls.querySelector('[data-diagram-zoom="out"]').disabled=scale<=nextScale(scale,'fit',viewport.clientWidth);
  controls.querySelector('[data-diagram-zoom="in"]').disabled=scale>=3;
  if(action==='fit'){viewport.scrollLeft=0;viewport.scrollTop=0;}
 }
 controls.hidden=false;
 controls.querySelectorAll('[data-diagram-zoom]').forEach(button=>button.addEventListener('click',()=>render(button.dataset.diagramZoom)));
 if(dialog&&typeof dialog.showModal==='function'){
  expand.hidden=false;
  expand.addEventListener('click',()=>{
   previous={scale,mode,x:viewport.scrollLeft,y:viewport.scrollTop};
   dialog.append(card);
   expand.hidden=true;close.hidden=false;
   pageOverflow=doc.body.style.overflow;doc.body.style.overflow='hidden';
   dialog.showModal();render('actual');close.focus();
  });
  close.addEventListener('click',()=>dialog.close());
  dialog.addEventListener('close',()=>{
   home.append(card);
   expand.hidden=false;close.hidden=true;
   doc.body.style.overflow=pageOverflow;
   scale=previous.scale;render(previous.mode==='fit'?'fit':'restore');
   viewport.scrollLeft=previous.x;viewport.scrollTop=previous.y;
   expand.focus({preventScroll:true});
  });
 }
 root.addEventListener('resize',()=>{if(mode==='fit')render('fit');});
 render('fit');
})(typeof globalThis!=='undefined'?globalThis:this);
