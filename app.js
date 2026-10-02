'use strict';

const PLATFORMS = [
  {id:'github',name:'GitHub Pages',mark:'GH',type:'static',tag:'从代码到网页',desc:'作品集、文档与个人博客的轻量起点。让代码和网站一起被妥善保存。',fit:'纯 HTML、静态博客、项目文档',method:'Git 仓库分支发布',plan:'公开仓库可使用免费 Pages；适用范围见官方说明。',limit:'提供静态文件托管，不运行服务器端程序。',home:'https://github.com/',docs:'https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site',steps:['准备 index.html 与本地资源，确认所有链接使用正确的相对路径。','创建 GitHub 仓库，将网站文件提交到 main 分支。','在 Settings → Pages 中选择发布分支及目录，等待构建完成。','打开 Pages 网址，检查首页、资源、手机布局与交互，然后分享。']},
  {id:'cloudflare',name:'Cloudflare Pages',mark:'☁',type:'static',tag:'全球边缘发布',desc:'连接你的代码仓库，自动构建与发布。适合需要持续迭代的静态作品。',fit:'静态网站、前端应用、持续迭代',method:'Git 集成 / 直接上传',plan:'提供免费方案；构建、文件和动态功能有各自配额。',limit:'静态文件与 Pages Functions 使用不同的配额规则。',home:'https://dash.cloudflare.com/',docs:'https://developers.cloudflare.com/pages/get-started/git-integration/',steps:['准备静态文件，或先在本地构建前端项目。','在 Workers & Pages 中创建 Pages 项目并连接 Git 仓库。','纯 HTML 无需构建命令；构建型项目需填写实际输出目录。','等待部署成功，检查 pages.dev 网址以及页面中的图片、脚本和子路径。']},
  {id:'vercel',name:'Vercel',mark:'▲',type:'static',tag:'前端项目友好',desc:'为现代前端而生。把预览、代码提交与项目发布放进同一条工作流。',fit:'Next.js、React、前端演示',method:'Git 导入 / CLI 发布',plan:'有 Hobby 方案；使用前核对用途限制与资源配额。',limit:'动态渲染与函数有运行限制；实际访问需按目标网络验收。',home:'https://vercel.com/new',docs:'https://vercel.com/docs/deployments',steps:['将项目保存到 Git 仓库，确认本地运行或构建正常。','在 Vercel 导入项目并选择正确的框架预设。','检查构建目录与所需环境变量，再提交部署。','检查生产网址、交互与资源；确认公开访问规则符合预期。']},
  {id:'netlify',name:'Netlify',mark:'✳',type:'static',tag:'灵活的发布入口',desc:'从文件夹上传到 Git 自动发布，为静态网站保留一种顺手的选择。',fit:'静态网站、落地页、前端预览',method:'Git 集成 / 文件上传 / CLI',plan:'提供免费计划；当前计划采用积分和用量管理。',limit:'预览与生产发布权限可能不同，发布前查看账号额度。',home:'https://app.netlify.com/',docs:'https://docs.netlify.com/deploy/create-deploys/',steps:['准备构建后的输出文件夹，确认根目录存在 index.html。','选择导入 Git 仓库，或上传静态文件夹。','核对发布目录、账号额度与生产 / 预览部署类型。','确认链接可被目标访客访问，而不仅是当前登录账号可见。']},
  {id:'edgeone',name:'EdgeOne Pages',mark:'E',type:'static',tag:'边缘部署选择',desc:'支持静态与前端项目发布。先确认域名与区域，再选择你的访问路线。',fit:'前端项目、边缘应用、域名部署',method:'Git 集成 / 静态文件上传',plan:'查看当前免费方案及项目配额。',limit:'默认域名有区域访问规则；大陆加速节点涉及 ICP 备案要求。',home:'https://console.cloud.tencent.com/edgeone/pages',docs:'https://pages.edgeone.ai/document/error-codes',steps:['准备不含账号凭据的静态输出文件。','创建 Pages 项目，选择符合域名条件的部署区域。','完成上传或 Git 集成，检查构建状态与域名设置。','从目标网络验收公开网址；默认域名受限时按官方指引配置自有域名。']},
  {id:'render',name:'Render',mark:'R',type:'backend',tag:'静态与后端都能起步',desc:'静态网站和 Web 服务分开配置。从轻量前端，到需要接口的应用。',fit:'静态网站、Node.js、Web API',method:'Git 仓库 / 服务配置',plan:'静态站有免费部署；部分 Web 服务有免费实例。',limit:'免费 Web 服务会休眠，带宽和构建时间有配额。',home:'https://dashboard.render.com/',docs:'https://render.com/docs/free',steps:['根据项目选择 Static Site 或 Web Service。','连接仓库，填写实际构建命令与输出目录 / 启动命令。','核对服务计划；测试后端时选择适用的免费实例。','等待服务在线，检查公开网址或健康接口，并了解休眠规则。']},
  {id:'railway',name:'Railway',mark:'◉',type:'backend',tag:'让服务运行起来',desc:'从简单 API 到多服务项目。适合探索后端部署，先了解试用边界。',fit:'API、容器、数据库与多服务',method:'Git / 模板 / Function',plan:'试用额度和后续费用以你的账号面板为准。',limit:'试用不等于长期免费；持续运行的服务会消耗资源额度。',home:'https://railway.com/dashboard',docs:'https://docs.railway.com/guides/deploy',steps:['选择适合的仓库、模板或 Function 入口。','配置启动方式、端口与必要的环境变量。','检查当前试用或计划用量，再部署服务。','生成公开域名并检查接口；记录用量与试用到期信息。']},
  {id:'firebase',name:'Firebase',mark:'ϟ',type:'backend',tag:'应用服务与静态 Hosting',desc:'从静态托管开始，再按需求选择身份验证、数据与其他应用服务。',fit:'静态 Hosting、应用服务集成',method:'Firebase CLI / 项目配置',plan:'Spark 提供适用产品的免费配额；部分功能需 Blaze。',limit:'Hosting 与 App Hosting 不同；启用功能前核对结算要求。',home:'https://console.firebase.google.com/',docs:'https://firebase.google.com/docs/hosting/quickstart',steps:['创建 Firebase 项目，核对当前结算方案。','使用 Firebase CLI 登录；静态网站选择 Hosting。','设置正确的公开目录，并确认目录里只有可公开文件。','发布后检查 Hosting 网址；需要其他云功能时单独核对方案。']},
  {id:'google',name:'Google Sites',mark:'G',type:'nocode',tag:'把内容直接放到线上',desc:'用可视化编辑器组织文字、图片与页面。适合简洁的主页和信息站。',fit:'个人主页、团队信息、知识页',method:'可视化编辑器发布',plan:'使用 Google 账号创建；具体能力以当前账号为准。',limit:'编辑器网站不是通用 HTML 托管，发布时需检查查看权限。',home:'https://sites.google.com/new',docs:'https://support.google.com/sites/answer/6372880?hl=zh-Hans',steps:['新建站点，填写标题并组织页面内容。','调整桌面与手机布局，确认更改已保存。','点击发布，设置网站地址与访客查看权限。','用未登录窗口检查公开页面，再分享链接。']},
  {id:'wordpress',name:'WordPress.com',mark:'W',type:'nocode',tag:'让表达持续发生',desc:'用成熟的内容编辑体验，开始一个博客，或整理长期更新的个人站点。',fit:'博客、文章、内容型主页',method:'主题 + 区块编辑器',plan:'可查看免费站点方案；域名与扩展功能按计划提供。',limit:'WordPress.com 托管与自行部署 WordPress 是两条不同路线。',home:'https://wordpress.com/start/',docs:'https://wordpress.com/support/start/',steps:['创建站点并选择适合的免费方案与地址。','选择主题，用区块编辑器整理首页或文章。','检查站点可见性及发布 / Launch 步骤。','打开公开网址，确认正文、导航与手机阅读体验。']}
];
const TYPE_NAMES={static:'静态网站',backend:'全栈 / 后端',nocode:'零代码'};
const STORAGE_KEY='launchroom.v1';
const $=(q,root=document)=>root.querySelector(q);
const $$=(q,root=document)=>[...root.querySelectorAll(q)];
const icon=(id,cls='')=>`<svg class="icon ${cls}" aria-hidden="true"><use href="#i-${id}"/></svg>`;
const escapeHTML=(s)=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const byId=id=>PLATFORMS.find(p=>p.id===id);
let store={projects:[],favorites:[]};
let storageAvailable=true;
let view='platforms', filter='static', selected=new Set(), search='', activeProject=null, toastTimer;
function validURL(value){if(!value.trim())return '';try{const u=new URL(value.trim());return u.protocol==='https:'&&!u.username&&!u.password?u.href:null;}catch{return null;}}
function normalizeData(data){
  if(!data||typeof data!=='object'||!Array.isArray(data.projects)||!Array.isArray(data.favorites))throw new Error('记录格式不正确');
  const ids=new Set();
  return {favorites:[...new Set(data.favorites.filter(x=>byId(x)))].slice(0,10),projects:data.projects.slice(0,100).filter(p=>p&&typeof p.name==='string'&&p.name.trim()&&byId(p.platform)).map(p=>{
    let id=typeof p.id==='string'&&/^[a-zA-Z0-9_-]{1,80}$/.test(p.id)?p.id:crypto.randomUUID();
    if(ids.has(id))id=crypto.randomUUID();ids.add(id);
    return{id,name:p.name.trim().slice(0,80),platform:p.platform,type:byId(p.platform).type,url:validURL(String(p.url??''))||'',tasks:Array.from({length:4},(_,i)=>p.tasks?.[i]===true),created:typeof p.created==='string'&&Number.isFinite(Date.parse(p.created))?p.created:new Date().toISOString()};
  })};
}
try{const saved=localStorage.getItem(STORAGE_KEY);if(saved)store=normalizeData(JSON.parse(saved));}catch{storageAvailable=false;}
function save(){try{localStorage.setItem(STORAGE_KEY,JSON.stringify(store));storageAvailable=true;}catch{storageAvailable=false;toast('浏览器未允许本地保存，请导出记录备份。');}updateCounts();}
function updateCounts(){
  $('#project-count').textContent=store.projects.length;$('#favorite-count').textContent=store.favorites.length;
  $('#storage-status').textContent=storageAvailable?'仅此浏览器可见':'本次记录仅在内存中';$('#storage-status').classList.toggle('storage-warning',!storageAvailable);
}
function toast(message){clearTimeout(toastTimer);const t=$('#toast');t.textContent=message;t.classList.add('show');toastTimer=setTimeout(()=>t.classList.remove('show'),3100);}
function openDialog(d){$$('dialog[open]').forEach(x=>x.close());d.showModal();}
function mark(p){return `<span class="platform-mark ${p.id}" aria-hidden="true">${escapeHTML(p.mark)}</span>`;}
function setView(next){
  view=next;search='';$('#platform-search').value='';
  const names={platforms:['平台导航','READY WHEN YOU ARE','下一站，互联网。','找到适合你的发布方式，让作品被看见。'],projects:['我的项目','ONE IDEA AT A TIME','从一个小计划开始。','把项目、网址和发布进度，放在一起。'],favorites:['已收藏','KEEP THE GOOD ONES','留住适合你的选择。','收藏常用平台，让下次出发更轻松。']};
  const [crumb,kicker,title,desc]=names[next];$('#view-breadcrumb').textContent=crumb;$('#view-kicker').textContent=kicker;$('#view-title').textContent=title;$('#view-description').textContent=desc;
  $$('.workspace-nav button').forEach(b=>{const on=b.dataset.view===view;b.classList.toggle('active',on);if(on)b.setAttribute('aria-current','page');else b.removeAttribute('aria-current');});
  $('#recommendation').hidden=next!=='platforms'||filter!=='static';$('.segmented').hidden=next==='projects';$('#platform-search').placeholder=next==='projects'?'搜索我的项目…':'搜索平台…';
  render();
}
function setFilter(value){filter=value;$$('[data-filter]').forEach(b=>b.setAttribute('aria-selected',String(b.dataset.filter===filter)));$('#recommendation').hidden=view!=='platforms'||filter!=='static';render();}
function render(){
  updateCounts();const isProjects=view==='projects';$('#platform-results').hidden=isProjects;$('#project-results').hidden=!isProjects;$('#catalog-note').hidden=isProjects;
  if(isProjects){renderProjects();return;}
  const list=PLATFORMS.filter(p=>(view!=='favorites'||store.favorites.includes(p.id))&&(search?true:filter==='all'||p.type===filter)&&`${p.name} ${p.desc} ${p.fit} ${TYPE_NAMES[p.type]}`.toLowerCase().includes(search.toLowerCase()));
  $('#platform-results').innerHTML=list.length?list.map(p=>`<article class="platform-card"><div class="card-top">${mark(p)}<div class="card-title"><h3>${p.name}</h3><small>${p.tag}</small></div><button class="icon-button bookmark-button" data-favorite="${p.id}" aria-label="收藏 ${p.name}" aria-pressed="${store.favorites.includes(p.id)}">${icon('book')}</button></div><p>${p.desc}</p><div class="card-footer"><span class="card-category"><span class="status-dot"></span>${TYPE_NAMES[p.type]}</span><div class="card-actions"><button class="compare-toggle" data-compare="${p.id}" aria-label="比较 ${p.name}" aria-pressed="${selected.has(p.id)}" title="加入比较">${icon('check')}</button><button class="guide-button" data-guide="${p.id}">发布指南 ${icon('up')}</button></div></div></article>`).join(''):`<div class="empty-state">${icon(view==='favorites'?'book':'search')}<h3>${view==='favorites'&&!store.favorites.length?'把喜欢的平台留在这里。':'还没有找到匹配的结果。'}</h3><p>${view==='favorites'&&!store.favorites.length?'点击平台右上角的书签，就能加入收藏。':'试试其他关键词，或查看所有类型。'}</p><button class="secondary-button" data-action="reset-search">浏览全部平台 ${icon('arrow')}</button></div>`;
  $('#show-all').textContent=filter==='all'?'已展示全部 10 个平台':'查看全部 10 个平台 ↗';renderCompareTray();
}
function renderProjects(){
  const list=store.projects.filter(p=>`${p.name} ${byId(p.platform).name}`.toLowerCase().includes(search.toLowerCase()));
  const toolbar=`<div class="project-toolbar"><span>${store.projects.length} 个项目 · 本地记录</span><button class="text-button" data-action="import">${icon('download')} 导入备份</button></div>`;
  $('#project-results').innerHTML=toolbar+(list.length?list.map(p=>{const platform=byId(p.platform),done=p.tasks.filter(Boolean).length;return `<article class="project-card">${mark(platform)}<div class="project-info"><h3>${escapeHTML(p.name)}</h3><p>${platform.name} · ${done===4?'清单已完成':`清单 ${done}/4`} ${p.url?'· 已记录网址':''}</p><div class="progress-track" aria-label="清单完成 ${done}/4"><span style="width:${done*25}%"></span></div></div><button class="project-open" data-project="${p.id}">打开计划 ↗</button></article>`;}).join(''):`<div class="empty-state">${icon(search?'search':'folder')}<h3>${search?'没有匹配的项目。':'这里，放你的下一个作品。'}</h3><p>${search?'换个关键词再试试。':'给它一个名字，选择平台，然后一步一步上线。'}</p><button class="pill" data-action="new-project">创建发布计划 ${icon('plus')}</button></div>`);
}
function renderCompareTray(){const n=selected.size;$('#compare-tray').hidden=!n;$('#compare-count').textContent=n;}
function toggleFavorite(id){if(store.favorites.includes(id)){store.favorites=store.favorites.filter(x=>x!==id);toast('已取消收藏');}else{store.favorites.push(id);toast(`已收藏 ${byId(id).name}`);}save();render();}
function toggleCompare(id){if(selected.has(id))selected.delete(id);else if(selected.size<3)selected.add(id);else return toast('最多同时比较 3 个平台。');render();}
function showCompare(){
  if(selected.size<2){toast('再选择一个平台，就可以开始比较。');return;}
  const list=[...selected].map(byId);const rows=[['适合什么','fit'],['发布方式','method'],['方案说明','plan'],['使用边界','limit']];
  $('#comparison-content').innerHTML=`<p class="detail-description">按项目需求比较，具体配额与当前政策请查看官方说明。</p><div class="compare-table-wrap"><table class="compare-table"><thead><tr><th scope="col">比较维度</th>${list.map(p=>`<th scope="col">${p.name}</th>`).join('')}</tr></thead><tbody>${rows.map(([label,key])=>`<tr><th scope="row">${label}</th>${list.map(p=>`<td>${p[key]}</td>`).join('')}</tr>`).join('')}<tr><th scope="row">官方资料</th>${list.map(p=>`<td><a class="text-link" href="${p.docs}" target="_blank" rel="noopener noreferrer">查看官方说明 ↗</a></td>`).join('')}</tr></tbody></table></div>`;
  openDialog($('#compare-dialog'));
}
function showGuide(id){
  const p=byId(id);if(!p)return;activeProject=null;$('#detail-kicker').textContent='PLATFORM FIELD GUIDE';
  $('#detail-content').innerHTML=`<div class="detail-title">${mark(p)}<div><h2>${p.name}</h2><p>${p.tag}</p></div></div><p class="detail-description">${p.desc}</p><dl class="detail-meta"><div><dt>适合什么</dt><dd>${p.fit}</dd></div><div><dt>发布方式</dt><dd>${p.method}</dd></div><div><dt>方案说明</dt><dd>${p.plan}</dd></div><div><dt>需要了解</dt><dd>${p.limit}</dd></div></dl><ol class="guide-list">${p.steps.map(s=>`<li>${s}</li>`).join('')}</ol><div class="guide-links"><button class="pill" data-create-with="${p.id}">用它创建计划 ${icon('plus')}</button><a class="secondary-button" href="${p.docs}" target="_blank" rel="noopener noreferrer">官方指南 ${icon('up')}</a><button class="text-button" data-download-guide="${p.id}">${icon('download')} 保存指南</button></div><p class="guide-note">方案与配额可能调整，请以平台当前说明为准。工作台不会连接或读取你的云平台账号。</p>`;
  openDialog($('#detail-dialog'));
}
function fillPlatformSelect(type,preferred){const matches=PLATFORMS.filter(p=>p.type===type);$('#project-platform').innerHTML=matches.map(p=>`<option value="${p.id}">${p.name}</option>`).join('');if(preferred&&matches.some(p=>p.id===preferred))$('#project-platform').value=preferred;}
function newProject(platform){const form=$('#project-form');form.reset();$('#project-error').textContent='';const p=byId(platform);form.elements.type.value=p?.type||'static';fillPlatformSelect(p?.type||'static',platform);openDialog($('#project-dialog'));form.elements.name.focus();}
function createProject(event){
  event.preventDefault();const form=event.currentTarget;const name=form.elements.name.value.trim(),url=validURL(form.elements.url.value);if(!name){$('#project-error').textContent='请给项目填一个名称。';return;}
  if(url===null){$('#project-error').textContent='请输入有效的 HTTPS 网址，不包含账号或密码。';return;}
  if(store.projects.length>=100){$('#project-error').textContent='最多保存 100 个项目，请先导出并整理现有记录。';return;}
  const p={id:crypto.randomUUID(),name,platform:form.elements.platform.value,type:form.elements.type.value,url,tasks:[false,false,false,false],created:new Date().toISOString()};
  store.projects.unshift(p);save();$('#project-dialog').close();setView('projects');showProject(p.id);toast('发布计划已创建。');
}
function showProject(id){
  const p=store.projects.find(x=>x.id===id);if(!p)return;activeProject=id;const platform=byId(p.platform),done=p.tasks.filter(Boolean).length;$('#detail-kicker').textContent='YOUR NEXT SMALL WIN';
  $('#detail-content').innerHTML=`<div class="detail-title">${mark(platform)}<div><h2>${escapeHTML(p.name)}</h2><p>${platform.name} · <span id="detail-progress">${done}/4 项已记录</span></p></div></div><p class="detail-description">完成一项，就勾选一项。这里记录你的进度；发布结果仍需打开线上网址验收。</p><div class="project-checklist">${platform.steps.map((s,i)=>`<label class="task-check"><input type="checkbox" data-task="${i}" ${p.tasks[i]?'checked':''}><span>${s}</span></label>`).join('')}</div><form class="project-url-form" id="project-url-form"><label for="published-url">记录公开网址</label><div class="url-field"><input id="published-url" name="url" type="url" value="${escapeHTML(p.url)}" placeholder="https://example.com" maxlength="2048"><button class="secondary-button" type="submit">保存网址</button></div><p class="form-error" id="url-error" role="alert"></p></form><div class="guide-links" style="margin-top:22px"><a class="pill" href="${platform.home}" target="_blank" rel="noopener noreferrer">前往 ${platform.name} ${icon('up')}</a>${p.url?`<a class="secondary-button" href="${escapeHTML(p.url)}" target="_blank" rel="noopener noreferrer">打开网站 ${icon('globe')}</a>`:''}<a class="text-button" href="${platform.docs}" target="_blank" rel="noopener noreferrer">官方指南 ↗</a></div><div class="project-data-actions"><button class="text-button" data-copy-project="${p.id}">${icon('copy')} 复制发布清单</button><button class="text-button" data-export-project="${p.id}">${icon('download')} 下载清单</button><button class="delete-button" data-delete-project="${p.id}">删除此计划</button></div><p class="guide-note">${platform.limit}</p>`;
  openDialog($('#detail-dialog'));
}
function guideMarkdown(p){return `# ${p.name} 发布指南\n\n适用场景：${p.fit}\n发布方式：${p.method}\n\n${p.steps.map(s=>'- [ ] '+s).join('\n')}\n\n方案说明：${p.plan}\n使用边界：${p.limit}\n官方指南：${p.docs}\n\n生成自轻舟 Launchroom。具体方案与配额以官方当前说明为准。\n`;}
function projectMarkdown(p){const platform=byId(p.platform);return `# ${p.name} · 发布清单\n\n平台：${platform.name}\n网址：${p.url||'尚未记录'}\n创建：${new Date(p.created).toLocaleDateString('zh-CN')}\n\n${platform.steps.map((s,i)=>`- [${p.tasks[i]?'x':' '}] ${s}`).join('\n')}\n\n官方指南：${platform.docs}\n\n清单状态是本地记录，不代表平台部署验收结果。\n`;}
function download(content,filename,type='text/plain;charset=utf-8'){const url=URL.createObjectURL(new Blob([content],{type})),a=document.createElement('a');a.href=url;a.download=filename;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);}
async function copyText(text){try{await navigator.clipboard.writeText(text);toast('发布清单已复制。');}catch{download(text,'发布清单.md');toast('剪贴板不可用，已下载清单。');}}
function deleteProject(id){const project=store.projects.find(p=>p.id===id);if(!project)return;store.projects=store.projects.filter(p=>p.id!==id);save();$('#detail-dialog').close();render();toast('计划已删除。可从之前导出的备份恢复。');}
function exportData(){download(JSON.stringify({version:1,exported:new Date().toISOString(),...store},null,2),'launchroom-backup.json','application/json');toast('项目与收藏已导出。');}
async function importData(file){if(!file)return;if(file.size>1024*1024){toast('请选择小于 1 MB 的轻舟备份文件。');return;}try{const data=JSON.parse(await file.text());if(data.version!==1)throw new Error('版本不支持');const imported=normalizeData(data),known=new Set(store.projects.map(p=>p.id));const additions=imported.projects.filter(p=>!known.has(p.id));store.projects=[...store.projects,...additions].slice(0,100);store.favorites=[...new Set([...store.favorites,...imported.favorites])];save();render();toast(`备份已合并，当前共 ${store.projects.length} 个项目。`);}catch{toast('无法导入：请使用轻舟导出的 JSON 备份。');}finally{$('#import-file').value='';}}

const JOURNEY=[
  {file:'my-first-website / index.html',code:'<span class="code-muted">01</span>  &lt;!doctype html&gt;\n<span class="code-muted">02</span>  &lt;html lang="zh-CN"&gt;\n<span class="code-muted">03</span>    &lt;head&gt;\n<span class="code-muted">04</span>      &lt;title&gt;我的第一个作品&lt;/title&gt;\n<span class="code-muted">05</span>    &lt;/head&gt;\n<span class="code-muted">06</span>    &lt;body&gt;\n<span class="code-muted">07</span>      <span class="code-highlight">&lt;h1&gt;你好，世界。&lt;/h1&gt;</span>\n<span class="code-muted">08</span>    &lt;/body&gt;\n<span class="code-muted">09</span>  &lt;/html&gt;',title:'一个页面，就是一个开始。',desc:'把首页命名为 index.html，图片、样式与脚本放在项目目录里。先在本地确认能正常打开。',action:'下载起步 HTML',kind:'starter'},
  {file:'choose-your-route / platform',code:'<span class="code-muted">你的作品</span>\n\n  静态页面        <span class="code-highlight">→ GitHub Pages</span>\n  持续更新的前端  <span class="code-highlight">→ Cloudflare Pages</span>\n  需要后端接口    <span class="code-highlight">→ Render</span>\n  只想编辑内容    <span class="code-highlight">→ Google Sites</span>\n\n<span class="code-muted">从需求开始，而不是从工具开始。</span>',title:'给作品，选一个合适的家。',desc:'先分清静态文件、后端服务与可视化建站，再核对平台的当前方案。需要时，把两个平台放在一起比较。',action:'比较部署平台',kind:'platforms'},
  {file:'publish-checklist / main',code:'<span class="code-muted">GITHUB PAGES · 发布路线</span>\n\n  01   提交项目文件\n   ↓\n  02   <span class="code-highlight">Settings → Pages</span>\n   ↓\n  03   选择 main 分支及发布目录\n   ↓\n  04   等待平台构建完成',title:'让发布步骤，有迹可循。',desc:'创建一份项目清单，在平台完成一步，就回来记录一步。所有进度留在当前浏览器里，随时可以导出。',action:'创建我的发布计划',kind:'new'},
  {file:'before-you-share / checklist',code:'<span class="code-muted">最后一遍，从访客的角度看看。</span>\n\n  □  首页可以公开打开\n  □  <span class="code-highlight">图片、样式、脚本正常加载</span>\n  □  手机页面没有横向溢出\n  □  导航和按钮都能正常使用\n  □  未登录时也能访问目标内容\n\n<span class="code-muted">完成之后，把它分享给第一个人。</span>',title:'发布成功，还要能好好使用。',desc:'用实际目标网络和手机打开网址，检查页面、资源与关键交互。保存最终网址，为下一个版本留好入口。',action:'下载验收清单',kind:'qa'}
];
function renderJourney(index){const step=JOURNEY[index];$$('[data-step]').forEach(b=>b.setAttribute('aria-selected',String(Number(b.dataset.step)===index)));$('#journey-panel').innerHTML=`<div class="editor-bar"><span class="window-dot"></span><span class="window-dot"></span><span class="window-dot"></span><span>${step.file}</span></div><pre class="code-area">${step.code}</pre><div class="editor-info"><h3>${icon('check')}${step.title}</h3><p>${step.desc}</p><button class="text-button" data-journey-action="${step.kind}">${step.action} ${icon('arrow')}</button></div>`;}
const STARTER='<!doctype html>\n<html lang="zh-CN">\n<head>\n<meta charset="utf-8">\n<meta name="viewport" content="width=device-width,initial-scale=1">\n<title>我的第一个作品</title>\n<style>body{margin:0;min-height:100vh;display:grid;place-items:center;background:#f7f5fa;color:#211a2a;font-family:system-ui,sans-serif}main{padding:32px}h1{font-weight:400;font-size:clamp(32px,6vw,56px)}p{color:#746b7d;line-height:1.8}</style>\n</head>\n<body><main><p>MY FIRST WEBSITE</p><h1>你好，世界。</h1><p>这是我的第一个在线作品。下一步，把你的想法写在这里。</p></main></body>\n</html>\n';

document.addEventListener('click',event=>{
  const target=event.target.closest('button,a');if(!target)return;
  if(target.dataset.view)setView(target.dataset.view);
  if(target.dataset.filter)setFilter(target.dataset.filter);
  if(target.dataset.favorite)toggleFavorite(target.dataset.favorite);
  if(target.dataset.compare)toggleCompare(target.dataset.compare);
  if(target.dataset.guide)showGuide(target.dataset.guide);
  if(target.dataset.createWith)newProject(target.dataset.createWith);
  if(target.dataset.project)showProject(target.dataset.project);
  if(target.dataset.downloadGuide){const p=byId(target.dataset.downloadGuide);download(guideMarkdown(p),p.id+'-发布指南.md');toast('指南已下载。');}
  if(target.dataset.copyProject){const p=store.projects.find(x=>x.id===target.dataset.copyProject);if(p)copyText(projectMarkdown(p));}
  if(target.dataset.exportProject){const p=store.projects.find(x=>x.id===target.dataset.exportProject);if(p)download(projectMarkdown(p),'launchroom-发布清单.md');}
  if(target.dataset.deleteProject)deleteProject(target.dataset.deleteProject);
  if(target.hasAttribute('data-close'))target.closest('dialog').close();
  if(target.dataset.step!==undefined)renderJourney(Number(target.dataset.step));
  if(target.dataset.route){setView('platforms');setFilter(target.dataset.route);$('#workspace').scrollIntoView({behavior:'smooth'});}
  if(target.dataset.action==='new-project')newProject();
  if(target.dataset.action==='import')$('#import-file').click();
  if(target.dataset.action==='reset-search'){setView('platforms');setFilter('all');}
  if(target.dataset.journeyAction){const kind=target.dataset.journeyAction;if(kind==='new')newProject();if(kind==='starter'){download(STARTER,'index.html','text/html');toast('起步 HTML 已下载。');}if(kind==='platforms'){setView('platforms');setFilter('all');$('#workspace').scrollIntoView({behavior:'smooth'});}if(kind==='qa'){download('# 网站发布验收清单\n\n- [ ] 首页可以公开打开\n- [ ] 样式、脚本、图片加载正常\n- [ ] 手机页面没有横向溢出\n- [ ] 导航和按钮可以使用\n- [ ] 未登录访客可以正常查看\n- [ ] 最终网址已经保存\n','网站发布验收清单.md');toast('验收清单已下载。');}}
});
$('#platform-search').addEventListener('input',e=>{search=e.target.value.trim();render();});
$('#project-form').addEventListener('submit',createProject);
$('#project-form').elements.type.addEventListener('change',e=>fillPlatformSelect(e.target.value));
$('#show-all').addEventListener('click',()=>{setFilter('all');search='';$('#platform-search').value='';render();});
$('#open-compare').addEventListener('click',showCompare);
$('#clear-compare').addEventListener('click',()=>{selected.clear();render();});
$('#export-data').addEventListener('click',exportData);
$('#import-file').addEventListener('change',e=>importData(e.target.files[0]));
$('#detail-content').addEventListener('change',e=>{if(!e.target.matches('[data-task]')||!activeProject)return;const p=store.projects.find(p=>p.id===activeProject);if(!p)return;p.tasks[Number(e.target.dataset.task)]=e.target.checked;save();$('#detail-progress').textContent=`${p.tasks.filter(Boolean).length}/4 项已记录`;render();});
$('#detail-content').addEventListener('submit',e=>{if(e.target.id!=='project-url-form')return;e.preventDefault();const p=store.projects.find(p=>p.id===activeProject),url=validURL(e.target.elements.url.value);if(url===null){$('#url-error').textContent='请输入有效的 HTTPS 网址，不包含账号或密码。';return;}p.url=url;save();render();showProject(p.id);toast(url?'网址已保存。':'已清空网址。');});
$('#menu-toggle').addEventListener('click',()=>{const isOpen=$('#menu-toggle').getAttribute('aria-expanded')==='true';$('#menu-toggle').setAttribute('aria-expanded',String(!isOpen));$('#menu-toggle').setAttribute('aria-label',isOpen?'打开导航':'关闭导航');$('#main-nav').classList.toggle('open',!isOpen);});
$$('#main-nav a').forEach(a=>a.addEventListener('click',()=>{$('#main-nav').classList.remove('open');$('#menu-toggle').setAttribute('aria-expanded','false');$('#menu-toggle').setAttribute('aria-label','打开导航');}));
document.addEventListener('keydown',e=>{if(e.key==='/'&&!e.ctrlKey&&!e.metaKey&&!e.altKey&&!$('dialog[open]')&&!['INPUT','TEXTAREA','SELECT'].includes(document.activeElement.tagName)){e.preventDefault();$('#workspace').scrollIntoView();$('#platform-search').focus();}if(e.key==='Escape'){$('#main-nav').classList.remove('open');$('#menu-toggle').setAttribute('aria-expanded','false');}const tab=e.target.closest('[role=tab]');if(tab&&['ArrowLeft','ArrowRight','Home','End'].includes(e.key)){e.preventDefault();const tabs=$$('[role=tab]',tab.closest('[role=tablist]'));const i=tabs.indexOf(tab);const n=e.key==='Home'?0:e.key==='End'?tabs.length-1:(i+(e.key==='ArrowRight'?1:-1)+tabs.length)%tabs.length;tabs[n].focus();tabs[n].click();}});
$$('dialog').forEach(dialog=>dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close();}}));
render();renderJourney(0);
