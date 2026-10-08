(function(){
 'use strict';
 const api=window.HowIAILibrary;if(!api)return;
 const legacy=api.legacyTarget(location.hash);
 if(legacy){location.replace(legacy);return;}
 const items=api.selectContent(window.HOW_I_AI_CONTENT);
 const grid=document.getElementById('content-grid');
 const search=document.getElementById('work-search');
 const type=document.getElementById('work-type');
 const empty=document.getElementById('empty-state');
 const count=document.getElementById('work-count');
 const controls=document.getElementById('library-controls');
 // Show search and filters when the library has enough entries to need them.
 if(items.length>3)controls.hidden=false;
 [...new Set(items.map(x=>x.type||'Article'))].sort().forEach(name=>{
  const option=document.createElement('option');option.value=name;option.textContent=name;type.append(option);
 });
 const params=new URLSearchParams(location.search);
 search.value=params.get('q')||'';
 if([...type.options].some(o=>o.value===params.get('type')))type.value=params.get('type');
 if(search.value||type.value!=='all')controls.hidden=false;
 function render(sync=false){
  const visible=api.findVisibleContent(items,search.value,type.value);
  grid.innerHTML=visible.map(api.renderCard).join('');
  grid.dataset.count=String(visible.length);empty.hidden=visible.length>0;
  count.textContent=visible.length+' '+(visible.length===1?'resource':'resources');
  if(sync){const url=new URL(location.href);url.searchParams.delete('q');url.searchParams.delete('type');if(search.value.trim())url.searchParams.set('q',search.value.trim());if(type.value!=='all')url.searchParams.set('type',type.value);history.replaceState(null,'',url.pathname+url.search+url.hash);}
 }
 search.addEventListener('input',()=>render(true));type.addEventListener('change',()=>render(true));
 document.getElementById('clear-search').addEventListener('click',()=>{search.value='';type.value='all';render(true);search.focus();});
 if(items.length)render(); // Preserve the readable fallback if the catalog is unavailable.
})();
