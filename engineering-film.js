(() => {
  const film = document.querySelector('.engineering-film');
  if (!film) return;
  const screen = document.querySelector('#film-art');
  const stageButtons = [...document.querySelectorAll('.film-step')];
  const toggle = document.querySelector('#film-toggle');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const line = 'fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"';
  const draw = d => `<path class="draw-line" pathLength="1" d="${d}" ${line}/>`;
  const text = (x,y,t,cls='art-label') => `<text class="${cls}" x="${x}" y="${y}">${t}</text>`;
  const dots = (x,y,n=3) => Array.from({length:n},(_,i)=>`<circle cx="${x+i*9}" cy="${y}" r="1.6" class="art-dot"/>`).join('');
  const panel = (x,y,w,h,content,delay='') => `<g class="appear ${delay}"><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="5" class="art-panel"/>${content}</g>`;
  const chip = (x,y) => `<g class="appear delay-2"><rect x="${x}" y="${y}" width="72" height="72" rx="4" class="chip-fill"/><rect x="${x+12}" y="${y+12}" width="48" height="48" rx="2" ${line}/>${Array.from({length:5},(_,i)=>`<path d="M${x+12+i*12} ${y-11}v11 M${x+12+i*12} ${y+72}v11 M${x-11} ${y+12+i*12}h11 M${x+72} ${y+12+i*12}h11" ${line}/>`).join('')}${text(x+36,y+42,'MCU','chip-label')}</g>`;
  const svg = content => `<svg viewBox="0 0 520 288" xmlns="http://www.w3.org/2000/svg" focusable="false">${content}</svg>`;
  const stages = [
    {title:'Brainstorming', phase:'DISCOVER', description:'Define the problem, explore possibilities and align on product requirements.', art:svg(`
      <circle cx="260" cy="136" r="75" class="orbit-ring"/><circle cx="260" cy="136" r="92" class="orbit-ring outer"/>
      ${draw('M220 115C220 61 300 61 300 115C300 141 282 146 282 164H238C238 146 220 141 220 115Z M240 173H280 M246 183H274 M252 192H268')}
      ${draw('M250 155V125L239 114 M270 155V125L281 114 M250 125H270')}
      <g class="idea-rays">${draw('M260 55V40 M208 70L197 58 M311 70L323 58 M204 119H189 M316 119H331')}</g>
      ${draw('M173 136H119V92 M347 136H401V81 M260 228V247H387')}
      ${panel(63,53,111,44,`${text(76,72,'THE CHALLENGE')}${text(76,85,'Ask the right questions','art-small')}`,'delay-1')}
      ${panel(352,43,112,44,`${text(365,62,'POSSIBILITIES')}${text(365,75,'Explore the options','art-small')}`,'delay-2')}
      ${panel(348,227,117,34,`${text(362,248,'PRODUCT VISION')}`,'delay-3')}
      <circle class="travelling-dot" cx="173" cy="136" r="3"/><circle cx="260" cy="247" r="3" class="art-dot"/>`)},
    {title:'Cost & project planning', phase:'PLAN', description:'Balance the bill of materials, engineering effort, timeline and delivery priorities.', art:svg(`
      ${panel(59,38,229,208,`${dots(76,54)}${text(78,80,'PROJECT PLAN')}<path d="M78 93H269" class="quiet-line"/>${text(78,113,'HARDWARE','art-small')}${text(78,153,'DEVELOPMENT','art-small')}${text(78,193,'VALIDATION','art-small')}<rect x="79" y="122" width="166" height="9" rx="2" class="bar-grow"/><rect x="79" y="162" width="128" height="9" rx="2" class="bar-grow delay-1"/><rect x="79" y="202" width="95" height="9" rx="2" class="bar-grow delay-2"/>`)}
      ${panel(310,62,151,153,`${text(328,86,'COST PLANNING')}<path d="M329 98H444" class="quiet-line"/>${text(329,121,'Bill of materials','art-small')}${text(329,144,'Engineering effort','art-small')}${text(329,167,'Delivery schedule','art-small')}<path d="M332 191l6 6 12-13" class="accent-line"/>${text(362,194,'ALIGNED','art-small')}`,'delay-2')}
      ${draw('M288 148H310')}${text(311,241,'SCOPE  /  COST  /  TIMELINE','art-small')}`)},
    {title:'Research & development', phase:'EXPLORE', description:'Evaluate components, explore technologies and prove the core concept.', art:svg(`
      <circle cx="261" cy="138" r="82" class="orbit-ring"/><ellipse cx="261" cy="138" rx="108" ry="36" class="orbit-ring tilted"/>
      ${chip(224,101)}${draw('M213 137H158V78H135 M307 137H366V98H392 M260 184V229H346 M213 161H151V218H128')}
      ${panel(61,48,89,51,`${text(75,71,'COMPONENTS')}${text(75,86,'Evaluate & select','art-small')}`,'delay-1')}
      ${panel(378,68,98,60,`${text(392,88,'PROTOTYPE')}<path class="signal-line" d="M390 111h12l8-12 9 18 9-12h34"/>`,'delay-2')}
      ${panel(61,198,100,42,`${text(76,216,'FEASIBILITY')}${text(76,229,'Test assumptions','art-small')}`,'delay-3')}
      <g class="appear delay-3"><circle cx="360" cy="229" r="13" class="check-circle"/><path d="M354 229l4 4 8-9" class="accent-line"/></g>${text(382,233,'PROOF OF CONCEPT','art-small')}`)},
    {title:'Schematic & PCB design', phase:'ENGINEER', description:'Translate the architecture into circuits, layouts and prototype electronics.', art:svg(`
      <rect x="64" y="35" width="392" height="217" rx="8" class="board-outline"/>
      ${[78,442].map(x=>[49,238].map(y=>`<circle cx="${x}" cy="${y}" r="4" class="orbit-ring"/>`).join('')).join('')}
      ${chip(226,109)}${draw('M94 84H162V119H215 M94 84V185H148V163H215 M309 121H355V74H415 M309 145H386V189H416 M250 98V68H207 M274 193V225H352')}
      <g class="appear delay-1"><rect x="103" y="68" width="29" height="30" rx="2" class="small-part"/><path d="M111 75v16 M123 75v16" class="accent-line"/><rect x="139" y="202" width="43" height="19" rx="2" class="small-part"/><rect x="369" y="61" width="51" height="27" rx="2" class="small-part"/><rect x="399" y="176" width="24" height="48" rx="2" class="small-part"/></g>
      ${draw('M162 144V165 M154 144H170 M154 165H170 M162 133V144 M162 165V178 M174 186H198 M180 179V193 M188 179V193')}
      ${text(86,237,'SCHEMATIC → LAYOUT → BRING-UP','art-small')}
      <circle cx="162" cy="119" r="3" class="art-dot"/><circle cx="386" cy="189" r="3" class="art-dot"/>`)},
    {title:'CAD & enclosure design', phase:'DESIGN', description:'Develop the mechanical form, enclosure and precise hardware fit.', art:svg(`
      <g class="cad-bottom"><path d="M140 176L288 134L391 187L242 234Z" class="cad-base"/><path d="M140 176V197L242 251V234 M242 251L391 209V187" class="accent-line"/></g>
      <g class="cad-board"><path d="M160 139L285 104L369 148L244 184Z" class="cad-circuit"/><path d="M224 140L272 127L302 143L254 157Z" class="chip-fill"/><path d="M244 137L205 116 M277 154L314 172 M305 133L333 125" class="accent-line"/></g>
      <g class="cad-lid"><path d="M140 84L288 42L391 95L242 137Z" class="cad-top"/><path d="M140 84V100L242 154L391 112V95 M242 137V154" class="accent-line"/><path d="M209 83L281 63L324 85L251 106Z" class="orbit-ring"/></g>
      <path d="M140 104V168 M391 116V181 M242 158V226" class="dimension-line"/>
      ${draw('M111 86L111 199 M104 91L118 81 M104 204L118 194 M147 262L391 194')}
      ${text(52,148,'FORM','art-small')}${text(402,151,'FIT','art-small')}${text(240,278,'ENCLOSURE + ELECTRONICS','art-small')}`)},
    {title:'Firmware development', phase:'BUILD', description:'Build drivers, control logic, connectivity and the device experience.', art:svg(`
      ${panel(55,40,282,210,`${dots(73,57)}${text(72,83,'EMBEDDED FIRMWARE')}<path d="M72 96H320" class="quiet-line"/>
      <g class="code-line delay-1">${text(76,122,'01','line-number')}${text(102,122,'initialize_hardware();','code-text')}</g>
      <g class="code-line delay-2">${text(76,149,'02','line-number')}${text(102,149,'read_sensors();','code-text')}</g>
      <g class="code-line delay-3">${text(76,176,'03','line-number')}${text(102,176,'process_events();','code-text')}</g>
      <g class="code-line delay-4">${text(76,203,'04','line-number')}${text(102,203,'sync_device_data();','code-text')}</g><rect x="103" y="218" width="7" height="12" class="code-cursor"/>`)}
      <g transform="translate(146,0)">${chip(224,103)}</g>${draw('M337 139H358 M337 157H358')}${text(371,214,'DEVICE LOGIC','art-small')}${text(370,230,'& CONNECTIVITY','art-small')}`)},
    {title:'Debugging & testing', phase:'VALIDATE', description:'Bring up the hardware, trace issues and test the integrated system.', art:svg(`
      ${panel(52,42,282,192,`${text(71,68,'SYSTEM VALIDATION')}<rect x="71" y="84" width="244" height="103" rx="2" class="scope-bg"/><path d="M71 109H315 M71 135H315 M71 161H315 M112 84V187 M153 84V187 M194 84V187 M235 84V187 M276 84V187" class="scope-grid"/><path d="M74 144H100L110 143L118 130L126 158L136 110L149 161L158 139H189L199 129L208 152L220 119L229 147H259L268 139L278 146H310" class="scope-wave" pathLength="1"/><path d="M184 83V187" class="scope-scan"/>${text(72,214,'OBSERVE  /  TRACE  /  VERIFY','art-small')}`)}
      ${panel(357,66,112,149,`${text(372,88,'TEST CYCLE')}<g class="appear delay-1"><circle cx="376" cy="112" r="5" class="check-circle"/>${text(390,116,'Hardware','art-small')}</g><g class="appear delay-2"><circle cx="376" cy="145" r="5" class="check-circle"/>${text(390,149,'Firmware','art-small')}</g><g class="appear delay-3"><circle cx="376" cy="178" r="5" class="check-circle"/>${text(390,182,'Integration','art-small')}</g>`,'delay-1')}
      ${draw('M334 139H357')}`)},
    {title:'Revisions & refinement', phase:'REFINE', description:'Apply test findings, refine the design and verify the next iteration.', art:svg(`
      <g class="appear delay-1"><rect x="88" y="84" width="133" height="147" rx="4" class="revision-old"/>${text(105,108,'REVIEW')}<path d="M106 127H199 M106 142H182 M106 157H192 M106 184H172" class="quiet-line"/><path d="M171 179L185 193 M185 179L171 193" class="review-mark"/></g>
      <g class="appear delay-3"><rect x="297" y="63" width="133" height="168" rx="4" class="art-panel"/>${text(315,88,'REFINE')}<path d="M315 108H410 M315 123H391 M315 138H404 M315 153H381" class="accent-line"/><circle cx="362" cy="191" r="17" class="check-circle"/><path d="M354 190l6 7 12-14" class="accent-line"/></g>
      ${draw('M203 66C251 28 305 29 345 47 M333 34L346 47L328 51 M317 250C269 278 217 270 191 248 M193 264L191 248L209 249')}
      ${draw('M236 144H278 M268 135L278 144L268 153')}${text(235,173,'ITERATE','art-small')}`)},
    {title:'Product handover', phase:'DELIVER', description:'Deliver the integrated product with source files, documentation and handover support.', art:svg(`
      <g class="final-product"><path d="M88 112L232 69L326 118L182 161Z" class="cad-top"/><path d="M88 112V192L182 244V161Z" class="cad-base"/><path d="M182 161L326 118V198L182 244Z" class="cad-side"/><path d="M126 111L224 83L272 109L173 138Z" class="chip-fill"/><circle cx="215" cy="188" r="4" class="art-dot"/><path d="M235 183L289 168 M235 194L289 179" class="accent-line"/></g>
      ${panel(355,64,112,153,`${text(370,87,'HANDOVER')}<path d="M371 104H448 M371 117H430" class="quiet-line"/>${text(371,140,'Source files','art-small')}${text(371,159,'Documentation','art-small')}${text(371,178,'Support','art-small')}<path d="M411 192l5 5 10-11" class="accent-line"/>`,'delay-2')}
      ${draw('M327 163H349')}
      <g class="appear delay-3"><circle cx="278" cy="51" r="18" class="check-circle"/><path d="M269 51l6 6 13-14" class="accent-line"/></g>${text(111,272,'ONE COMPLETE, CONNECTED PRODUCT','art-small')}`)}
  ];

  let current = 0;
  let paused = reduceMotion.matches;
  let inView = true;
  let timer;
  let lastFrame = 0;
  let elapsed = 0;
  const duration = 5200;
  const title = document.querySelector('#film-title');
  const description = document.querySelector('#film-description');
  function render() {
    const s = stages[current];
    screen.innerHTML = s.art;
    title.textContent = s.title;
    description.textContent = s.description;
    document.querySelector('#film-phase').textContent = s.phase;
    document.querySelector('#film-counter').textContent = `${String(current+1).padStart(2,'0')} / 09`;
    stageButtons.forEach((button,index) => {
      button.classList.toggle('active',index===current);
      button.classList.toggle('done',index<current);
      button.setAttribute('aria-pressed',String(index===current));
      button.style.setProperty('--progress','0%');
    });
    elapsed=0;
  }
  function syncState() {
    const stopped=paused||!inView||document.hidden;
    film.classList.toggle('is-paused',stopped);
    toggle.setAttribute('aria-label',paused?'Play animation':'Pause animation');
    toggle.innerHTML=paused?'<span aria-hidden="true">▶</span>':'<span aria-hidden="true">Ⅱ</span>';
    cancelAnimationFrame(timer);
    lastFrame=0;
    if(!stopped)timer=requestAnimationFrame(tick);
  }
  function tick(now) {
    if(lastFrame)elapsed+=now-lastFrame;
    lastFrame=now;
    stageButtons[current].style.setProperty('--progress',`${Math.min(elapsed/duration*100,100)}%`);
    if(elapsed>=duration){current=(current+1)%stages.length;render();}
    timer=requestAnimationFrame(tick);
  }
  function choose(index) {
    current=(index+stages.length)%stages.length;
    paused=true;
    render();syncState();
  }
  stageButtons.forEach((b,index)=>b.addEventListener('click',()=>choose(index)));
  document.querySelector('#film-prev').addEventListener('click',()=>choose(current-1));
  document.querySelector('#film-next').addEventListener('click',()=>choose(current+1));
  toggle.addEventListener('click',()=>{paused=!paused;syncState();});
  document.addEventListener('visibilitychange',syncState);
  reduceMotion.addEventListener('change',e=>{paused=e.matches;syncState();});
  new IntersectionObserver(entries=>{inView=entries[0].isIntersecting;syncState();},{threshold:.12}).observe(film);
  render();syncState();
})();
