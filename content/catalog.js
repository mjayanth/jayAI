/* Add a page to the repo, then add its card here. No homepage edits or build step needed.
   draft:true hides a card; it does NOT make a committed file private. */
(function(root){
 const content=[
  {
   id:'ai-platform',
   title:'AI Platform Playbook',
   description:'How I would build an enterprise AI platform, from choosing the work to designing shared capabilities, evaluating agents and running the service. With diagrams and the trade-offs behind each decision.',
   type:'Playbook',
   date:'2026-10-08',
   href:'playbooks/ai-platform.html',
   topics:['Enterprise AI','Product','Architecture'],
   featured:true,
   visual:['Business outcomes','Shared capabilities','Data & access','Evals & evidence'],
   visualCaption:'9 architecture layers · 13 sections',
   cta:'Read the playbook',
   links:[
    {label:'Architecture',hash:'architecture'},
    {label:'Agent delivery',hash:'harness'},
    {label:'Evals',hash:'observability'},
    {label:'Economics',hash:'metrics'}
   ]
  }
 ];
 if(typeof module!=='undefined'&&module.exports)module.exports=content;
 else root.HOW_I_AI_CONTENT=content;
})(typeof globalThis!=='undefined'?globalThis:this);
