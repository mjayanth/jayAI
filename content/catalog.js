/* Add a page to the repo, then add its card here. No homepage edits or build step needed.
   draft:true hides a card; it does NOT make a committed file private. */
(function(root){
 const content=[
  {
   id:'ai-platform',
   title:'AI Platform Playbook',
   description:'Connect business outcomes to cross-functional workflows, shared investment and a delivery roadmap. Measure value across the portfolio, including review, rework and support.',
   type:'Playbook',
   date:'2026-10-09',
   href:'playbooks/ai-platform.html',
   topics:['Enterprise AI','Product','Architecture'],
   featured:true,
   visual:['Data foundation','Compute & training','Inference serving','Knowledge & retrieval','Evaluation','Agents & tools','Trust & governance','Developer platform','Observability & feedback'],
   visualTitle:'Architecture for shared delivery',
   visualMeta:'09 layers',
   visualHref:'playbooks/ai-platform.html#architecture',
   visualCaption:'See what delivery teams can reuse',
   cta:'Read the playbook',
   links:[
    {label:'Business functions',hash:'product'},
    {label:'Delivery roadmap',hash:'roadmap'},
    {label:'Value & cost',hash:'metrics'}
   ]
  }
 ];
 if(typeof module!=='undefined'&&module.exports)module.exports=content;
 else root.HOW_I_AI_CONTENT=content;
})(typeof globalThis!=='undefined'?globalThis:this);
