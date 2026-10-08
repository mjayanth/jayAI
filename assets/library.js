(function(root){
 'use strict';
 const escape=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 function safeLocalHref(value){
  if(typeof value!=='string'||value.includes('..'))return null;
  return /^(?:[a-zA-Z0-9_-]+\/)*[a-zA-Z0-9_.-]+\.html(?:#[a-zA-Z0-9_-]+)?$/.test(value)?value:null;
 }
 function selectContent(items){
  const seen=new Set();
  return (Array.isArray(items)?items:[]).filter(item=>{
   if(!item||item.draft||!item.id||!item.title||!safeLocalHref(item.href)||seen.has(item.id))return false;
   seen.add(item.id);return true;
  }).sort((a,b)=>Number(Boolean(b.featured))-Number(Boolean(a.featured))||String(b.date||'').localeCompare(String(a.date||'')));
 }
 function findVisibleContent(items,query='',type='all'){
  const words=query.toLowerCase().trim().split(/\s+/).filter(Boolean);
  return items.filter(item=>(type==='all'||item.type===type)&&words.every(word=>[item.title,item.description,...(item.topics||[])].join(' ').toLowerCase().includes(word)));
 }
 function preview(item){
  const labels=Array.isArray(item.visual)?item.visual:['Problem','Approach','Decisions'];
  const href=safeLocalHref(item.visualHref);
  const diagram=`<div class="preview-top"><span>${escape(item.visualTitle||item.type||'Article')}</span><span>${escape(item.visualMeta||'')}</span></div><div class="preview-stack">${labels.map((label,i)=>`<div class="preview-layer layer-${i}"><span>${String(i+1).padStart(2,'0')}</span><strong>${escape(label)}</strong><i aria-hidden="true"></i></div>`).join('')}</div><div class="preview-bottom"><span>${escape(item.visualCaption||'Decisions, diagrams and detail')}</span>${href?'<span aria-hidden="true">↗</span>':''}</div>`;
  return `<div class="card-preview">${href?`<a class="preview-open" href="${escape(href)}" aria-label="Open ${escape(item.visualTitle||'diagram')} in ${escape(item.title)}">${diagram}</a>`:diagram}</div>`;
 }
 function renderCard(item){
  const href=safeLocalHref(item.href);if(!href)return '';
  const base=href.split('#')[0];
  const links=(item.links||[]).filter(l=>/^[a-zA-Z0-9_-]+$/.test(l.hash));
  return `<article class="work-card${item.featured?' featured':''}" data-content-id="${escape(item.id)}">${preview(item)}<div class="card-copy"><div class="card-meta"><span>${escape(item.type||'Article')}</span>${item.date?`<time datetime="${escape(item.date)}">${escape(item.date)}</time>`:''}</div><h3><a href="${escape(href)}">${escape(item.title)}</a></h3><p>${escape(item.description)}</p><div class="tags">${(item.topics||[]).map(t=>`<span>${escape(t)}</span>`).join('')}</div><a class="text-link card-read" href="${escape(href)}">${escape(item.cta||'Read the piece')} <span aria-hidden="true">↗</span></a>${links.length?`<nav class="section-links" aria-label="Jump into ${escape(item.title)}">${links.map(l=>`<a href="${escape(base)}#${l.hash}">${escape(l.label)}</a>`).join('')}</nav>`:''}</div></article>`;
 }
 function legacyTarget(hash){
  const sections=['north-star','principles','product','architecture','harness','data','agents','governance','observability','adoption','metrics','roadmap','canvas','failure'];
  return sections.includes(String(hash).replace(/^#/,''))?'playbooks/ai-platform.html'+hash:null;
 }
 const api={safeLocalHref,selectContent,findVisibleContent,renderCard,legacyTarget};
 if(typeof module!=='undefined'&&module.exports)module.exports=api;
 else root.HowIAILibrary=api;
})(typeof globalThis!=='undefined'?globalThis:this);
