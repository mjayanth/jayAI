/* Add a page to the repo, then add its card here. No homepage edits or build step needed.
   draft:true hides a card; it does NOT make a committed file private. */
(function(root){
 const content=[
  {
   id:'ai-platform',
   title:'AI Platform Playbook',
   description:'A practical guide to prioritization, ownership, adoption and evaluation, with worked decisions and a vendor-neutral architecture. Extend the platforms already in use and measure the result after review.',
   type:'Playbook',
   date:'2026-10-09',
   href:'playbooks/ai-platform.html',
   topics:['Enterprise AI','Product','Architecture'],
   featured:true,
   visual:['Data foundation','Compute & training','Inference serving','Knowledge & retrieval','Evaluation','Agents & tools','Trust & governance','Developer platform','Observability & feedback'],
   visualTitle:'Reference architecture',
   visualMeta:'09 layers',
   visualHref:'playbooks/ai-platform.html#architecture',
   visualCaption:'Explore the interactive architecture',
   cta:'Read the playbook',
   links:[
    {label:'Product decisions',hash:'product'},
    {label:'Adoption & ownership',hash:'adoption'},
    {label:'Evaluation',hash:'observability'}
   ]
  }
 ];
 if(typeof module!=='undefined'&&module.exports)module.exports=content;
 else root.HOW_I_AI_CONTENT=content;
})(typeof globalThis!=='undefined'?globalThis:this);
