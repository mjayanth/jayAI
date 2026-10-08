const test=require('node:test');
const assert=require('node:assert/strict');
let viewer={};try{viewer=require('../assets/diagram-viewer.js');}catch{}

test('fit uses the available width without upscaling the diagram',()=>{
 assert.equal(typeof viewer.nextScale,'function');
 assert.equal(viewer.nextScale(1,'fit',600),.5);
 assert.equal(viewer.nextScale(1,'fit',360),.3);
 assert.equal(viewer.nextScale(1,'fit',1800),1);
});
test('zoom is bounded and actual size restores readable native dimensions',()=>{
 assert.equal(typeof viewer.nextScale,'function');
 assert.equal(viewer.nextScale(1,'in',600),1.25);
 assert.equal(viewer.nextScale(1.25,'out',600),1);
 assert.equal(viewer.nextScale(3,'in',600),3);
 assert.equal(viewer.nextScale(.5,'out',600),.5);
 assert.equal(viewer.nextScale(.5,'actual',600),1);
});
test('invalid dimensions and scale cannot produce an invisible or unbounded diagram',()=>{
 assert.equal(typeof viewer.nextScale,'function');
 for(const width of [0,NaN,Infinity,-20])assert.equal(viewer.nextScale(1,'fit',width),1);
 assert.equal(viewer.nextScale(NaN,'in',600),.625);
});
