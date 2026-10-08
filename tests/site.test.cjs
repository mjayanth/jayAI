const test=require('node:test');
const assert=require('node:assert/strict');
let api={};try{api=require('../assets/library.js');}catch{}
const item={id:'platform',title:'AI Platform Playbook',description:'A guide to useful AI.',type:'Playbook',topics:['Platforms','Evals'],date:'2026-10-08',href:'playbooks/ai-platform.html',featured:true,links:[{label:'Architecture',hash:'architecture'}]};

test('cards only link to local HTML pages, never scripts or parent directories',()=>{
 assert.equal(typeof api.safeLocalHref,'function');
 for(const good of ['playbooks/ai-platform.html','notes/first.html#evals','project.html'])assert.equal(api.safeLocalHref(good),good);
 for(const bad of ['javascript:alert(1)','https://example.com','//example.com','../private.html','notes/../../secret.html','notes/%2e%2e/secret.html'])assert.equal(api.safeLocalHref(bad),null);
});
test('new content appears without editing the homepage and drafts remain excluded',()=>{
 assert.equal(typeof api.selectContent,'function');
 const extra={...item,id:'new-note',title:'A later note',type:'Note',date:'2026-11-01',featured:false,href:'notes/later.html'};
 const draft={...extra,id:'draft',draft:true};
 assert.deepEqual(api.selectContent([extra,draft,item]).map(x=>x.id),['platform','new-note']);
 assert.equal(api.selectContent([{...extra,href:'../private.html'}]).length,0);
});
test('card rendering escapes publisher text and preserves section links',()=>{
 assert.equal(typeof api.renderCard,'function');
 const html=api.renderCard({...item,title:'<script>alert(1)</script>',description:'A & B'});
 assert.ok(!html.includes('<script>'));
 assert.ok(html.includes('&lt;script&gt;'));
 assert.ok(html.includes('A &amp; B'));
 assert.ok(html.includes('playbooks/ai-platform.html#architecture'));
});
test('library search matches title, topic and description together',()=>{
 assert.equal(typeof api.findVisibleContent,'function');
 assert.equal(api.findVisibleContent([item],' PLATFORM evals ','Playbook').length,1);
 assert.equal(api.findVisibleContent([item],'missing','all').length,0);
 assert.equal(api.findVisibleContent([item],'','Note').length,0);
});
test('old playbook section links open the separate page without hijacking homepage anchors',()=>{
 assert.equal(typeof api.legacyTarget,'function');
 assert.equal(api.legacyTarget('#architecture'),'playbooks/ai-platform.html#architecture');
 assert.equal(api.legacyTarget('#work'),null);
 assert.equal(api.legacyTarget('#about'),null);
});
