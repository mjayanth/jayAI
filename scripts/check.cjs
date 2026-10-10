const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const assert=require('node:assert/strict');
const root=path.resolve(__dirname,'..');
const catalog=require('../content/catalog.js');
const {safeLocalHref,selectContent}=require('../assets/library.js');
const pages=['index.html',...selectContent(catalog).map(x=>x.href.split('#')[0])];
const voids=new Set(['area','base','br','col','embed','hr','img','input','link','meta','param','source','track','wbr']);
let checkedLinks=0;
for(const filename of [...new Set(pages)]){
 const full=path.join(root,filename);assert.ok(fs.existsSync(full),'Missing page '+filename);
 const html=fs.readFileSync(full,'utf8');
 const markup=html.replace(/<(script|style)\b[^>]*>[\s\S]*?<\/\1>/g,'');
 const ids=[...markup.matchAll(/\bid="([^"]+)"/g)].map(x=>x[1]);
 assert.equal(new Set(ids).size,ids.length,'Duplicate IDs in '+filename);
 const stack=[];
 for(const match of markup.matchAll(/<(\/?)([a-z][a-z0-9-]*)\b[^>]*>/gi)){
  const tag=match[2].toLowerCase();if(voids.has(tag))continue;
  if(match[1])assert.equal(stack.pop(),tag,'Invalid nesting in '+filename);else stack.push(tag);
 }
 assert.equal(stack.length,0,'Unclosed tag in '+filename);
 for(const match of html.matchAll(/<script\b[^>]*>([\s\S]*?)<\/script>/g))new vm.Script(match[1]);
 for(const match of markup.matchAll(/\b(?:href|src)="([^"]+)"/g)){
  const url=match[1];if(/^(?:https?:|mailto:|data:)/.test(url))continue;
  const [file,hash]=url.split('#');const target=file?path.resolve(path.dirname(full),file):full;
  assert.ok(target.startsWith(root+path.sep),'Link outside site '+url);
  assert.ok(fs.existsSync(target),'Broken file link '+url+' in '+filename);
  if(hash){const linked=fs.readFileSync(target,'utf8');assert.ok(linked.includes('id="'+hash+'"'),'Broken anchor '+url+' in '+filename);}
  checkedLinks++;
 }
 for(const match of markup.matchAll(/aria-controls="([^"]+)"/g))assert.ok(ids.includes(match[1]),'Missing control target '+match[1]);
 assert.ok(!/(?:file:\/\/|\/Users\/|\/tmp\/codex|Preparation note|Vish|Interview Packet)/i.test(html),'Private preparation material in '+filename);
 assert.ok(html.includes('name="viewport"'),'Missing viewport in '+filename);
}
const unique=new Set();
for(const item of catalog){
 assert.ok(item.id&&!unique.has(item.id),'Missing/duplicate catalog id');unique.add(item.id);
 assert.ok(safeLocalHref(item.href),'Unsafe catalog href');
 assert.ok(/^\d{4}-\d{2}-\d{2}$/.test(item.date),'Use ISO date');
 if(item.draft)continue;
 const target=fs.readFileSync(path.join(root,item.href.split('#')[0]),'utf8');
 for(const link of item.links||[])assert.ok(target.includes('id="'+link.hash+'"'),'Missing catalog sublink '+link.hash);
}
for(const script of ['assets/library.js','assets/main.js','assets/diagram-viewer.js','assets/analytics.js','content/catalog.js'])new vm.Script(fs.readFileSync(path.join(root,script),'utf8'));
function luminance(h){const rgb=h.match(/../g).map(v=>parseInt(v,16)/255).map(v=>v<=.04045?v/12.92:((v+.055)/1.055)**2.4);return rgb[0]*.2126+rgb[1]*.7152+rgb[2]*.0722;}
const pairs=[['16232a','e9eef0'],['53636b','e9eef0'],['006d68','f8faf9'],['e6edef','0e1519'],['a0b0b6','131d22'],['60c5bc','131d22']];
for(const [fg,bg] of pairs){const a=luminance(fg),b=luminance(bg);assert.ok((Math.max(a,b)+.05)/(Math.min(a,b)+.05)>=4.5,'Text contrast below AA');}
console.log('PASS: '+pages.length+' pages, '+checkedLinks+' local links, catalog sublinks, HTML nesting, JavaScript syntax, public-content scan and principal light/dark contrast pairs.');
console.log('This static check does not verify browser layout or interaction.');
