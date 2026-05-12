/* R.I.P COCKTAIL MENU — render menu + glossary */

// ============================================================
// Ingredient dictionary — maps each ingredient (case-insensitive)
// to {ko, category, desc}. Category drives colour-coding.
// ============================================================
const ING = {
  // ---- Base spirits ----
  'gin':            { ko:'진',           cat:'base',    desc:'주니퍼베리를 비롯한 보타니컬을 침출시킨 증류주. 쌉쌀하고 향긋해 토닉·라임과 잘 어울려요.' },
  'rum':            { ko:'럼',           cat:'base',    desc:'사탕수수에서 얻은 증류주. 달콤하고 트로피컬한 풍미가 특징이에요.' },
  '151rum':         { ko:'151 럼',       cat:'base',    desc:'알코올 도수 75.5도(151 proof)의 강한 럼. 적은 양으로도 칵테일의 도수를 끌어올려요.' },
  'vodka':          { ko:'보드카',       cat:'base',    desc:'곡물·감자를 증류한 무색무취에 가까운 술. 다른 재료의 맛을 살리는 깨끗한 캔버스 역할.' },
  'tequila':        { ko:'데낄라',       cat:'base',    desc:'멕시코 블루 아가베(용설란)로 만든 증류주. 짭쪼롬한 흙내음과 강한 한 방이 매력.' },
  'whisky':         { ko:'위스키',       cat:'base',    desc:'곡물을 발효·증류해 오크통에서 숙성한 술. 곡물 향과 바닐라·캐러멜 풍미가 깊어요.' },
  'burbon whisky':  { ko:'버번 위스키',  cat:'base',    desc:'옥수수를 51% 이상 사용한 미국 위스키. 달콤하고 부드러운 바닐라 향이 특징.' },
  'scotch whisky':  { ko:'스카치 위스키',cat:'base',    desc:'스코틀랜드산 위스키. 몰트와 스모키·피트한 풍미로 묵직한 캐릭터를 가져요.' },
  'canadian whisky':{ ko:'캐나디안 위스키',cat:'base',  desc:'캐나다산 블렌디드 위스키. 가볍고 부드러워 칵테일 베이스로 무난해요.' },
  'jack daniel’s':  { ko:'잭 다니엘',    cat:'base',    desc:'테네시 위스키. 부드러운 단풍나무 차콜 필터링 덕분에 달큰하고 매끈해요.' },
  'wild turkey':    { ko:'와일드 터키',  cat:'base',    desc:'스파이시한 버번 위스키. 호밀의 알싸함이 살아있어요.' },
  'suntory whisky': { ko:'산토리 위스키',cat:'base',    desc:'일본 위스키 브랜드. 균형 잡힌 향으로 하이볼의 원조.' },
  'jameson':        { ko:'제임슨',       cat:'base',    desc:'세 번 증류한 아이리쉬 위스키. 부드럽고 깔끔한 풍미.' },
  'glenfiddich':    { ko:'글렌피딕',     cat:'base',    desc:'스코틀랜드 싱글몰트 위스키. 사과·배 같은 과실향이 특징.' },
  'brandy':         { ko:'브랜디',       cat:'base',    desc:'와인을 증류한 술. 농축된 포도향과 우아한 단맛.' },
  'apple brandy':   { ko:'애플 브랜디',  cat:'base',    desc:'사과를 증류한 브랜디(칼바도스 계열). 향긋한 사과 풍미가 진해요.' },

  // ---- Liqueurs / modifiers ----
  'triple sec':     { ko:'트리플 섹',    cat:'liqueur', desc:'오렌지 껍질로 만든 무색 리큐르. 깔끔한 시트러스 향이 칵테일의 산뜻함을 살려요.' },
  'cointreau':      { ko:'코앙트로',     cat:'liqueur', desc:'프랑스의 프리미엄 트리플 섹. 더 풍성하고 우아한 오렌지 향.' },
  'blue curacao':   { ko:'블루 큐라소',  cat:'liqueur', desc:'오렌지 향 리큐르에 파란색을 입힌 술. 보기에도 시원한 푸른빛을 만들어요.' },
  'blue cruacao':   { ko:'블루 큐라소',  cat:'liqueur', desc:'블루 큐라소(표기 변형). 오렌지 향의 푸른 리큐르.' },
  'amaretto':       { ko:'아마레또',     cat:'liqueur', desc:'살구씨·아몬드 향이 진한 이탈리아 리큐르. 고소하고 달콤해요.' },
  'khalua':         { ko:'깔루아',       cat:'liqueur', desc:'멕시코산 커피 리큐르. 깊은 커피·바닐라 향과 단맛.' },
  'bailey’s':       { ko:'베일리스',     cat:'liqueur', desc:'아이리쉬 위스키와 크림을 블렌딩한 리큐르. 부드러운 밀크초콜릿 같은 맛.' },
  'frangelico':     { ko:'프란젤리코',   cat:'liqueur', desc:'헤이즐넛 향이 진한 이탈리아 리큐르. 고소한 견과·바닐라 풍미.' },
  'cassis':         { ko:'카시스(크렘 드 카시스)', cat:'liqueur', desc:'블랙커런트(까막까치밥)로 만든 리큐르. 달콤새콤한 베리향.' },
  'peach':          { ko:'피치 리큐르',  cat:'liqueur', desc:'복숭아 향이 진한 리큐르(피치 슈납스 계열). 달콤한 과실미.' },
  'malibu':         { ko:'말리부',       cat:'liqueur', desc:'코코넛 향 화이트 럼 리큐르. 트로피컬 칵테일의 단골.' },
  'mailbu':         { ko:'말리부',       cat:'liqueur', desc:'말리부(표기 변형). 코코넛 향 화이트 럼 리큐르.' },
  'midori':         { ko:'미도리',       cat:'liqueur', desc:'머스크 멜론 향의 초록빛 일본 리큐르. 달콤한 메론맛.' },
  'apple pucker':   { ko:'애플 퍼커',    cat:'liqueur', desc:'새콤달콤한 그린 애플 향 리큐르. 산뜻한 단맛.' },
  'cherry brandy':  { ko:'체리 브랜디',  cat:'liqueur', desc:'체리를 우려 만든 리큐르. 진한 체리·아몬드 향.' },
  'benedictine':    { ko:'베네딕틴',     cat:'liqueur', desc:'27가지 약초·향신료가 들어간 프랑스 허브 리큐르. 향이 복합적이고 약초적이에요.' },
  'drambuie':       { ko:'드람뷔',       cat:'liqueur', desc:'스카치 위스키 + 헤더 꿀 + 허브. 위스키에 꿀을 입힌 듯한 단맛.' },
  'grand manier':   { ko:'그랑 마니에',  cat:'liqueur', desc:'코냑 베이스의 오렌지 리큐르. 깊은 오렌지·바닐라·코냑의 풍미.' },
  'southern comfort':{ ko:'서던 컴포트', cat:'liqueur', desc:'위스키에 복숭아·과실·향신료를 가미한 미국 리큐르. 달콤하고 부드러워요.' },
  'cacao':          { ko:'카카오 리큐르(크렘 드 카카오)', cat:'liqueur', desc:'코코아·초콜릿 향 리큐르. 디저트 칵테일의 단골.' },
  'mint':           { ko:'민트 리큐르(크렘 드 멘트)', cat:'liqueur', desc:'페퍼민트 향 리큐르. 청량하고 시원한 향.' },
  'strawberry':     { ko:'스트로베리 리큐르', cat:'liqueur', desc:'딸기 향 리큐르. 새콤달콤한 과실미.' },
  'banana':         { ko:'바나나 리큐르', cat:'liqueur', desc:'바나나 향 리큐르. 달콤한 열대과일 향.' },
  'jagermeister':   { ko:'예거마이스터', cat:'liqueur', desc:'56가지 허브·향신료를 우려낸 독일 리큐르. 진한 약초향과 단맛.' },
  'agwa':           { ko:'아그와',       cat:'liqueur', desc:'볼리비아의 코카잎과 36가지 허브로 만든 리큐르. 풀잎 같은 향긋함.' },
  'campari':        { ko:'캄파리',       cat:'liqueur', desc:'붉은빛의 이탈리아 비터. 오렌지 껍질의 쌉쌀한 향이 매력.' },
  'dry vermouth':   { ko:'드라이 베르무트', cat:'liqueur', desc:'허브를 침출시킨 강화 와인(드라이 타입). 마티니의 짝꿍.' },
  'sweet vermouth': { ko:'스위트 베르무트', cat:'liqueur', desc:'붉고 단맛이 도는 강화 와인. 맨해튼·네그로니의 핵심.' },
  'angostura bitters':{ ko:'앙고스투라 비터즈', cat:'liqueur', desc:'한두 방울로 향을 잡아주는 약초 비터. 클래식 칵테일의 마법 양념.' },

  // ---- Mixers / Carbonated ----
  'tonic':          { ko:'토닉 워터',    cat:'mixer',   desc:'키니네 특유의 쌉쌀함이 있는 탄산수. 진토닉의 짝.' },
  'tonic water':    { ko:'토닉 워터',    cat:'mixer',   desc:'토닉 워터. 쌉쌀한 탄산.' },
  'coke':           { ko:'콜라',         cat:'mixer',   desc:'단맛과 카페인이 더해진 탄산음료. 럼·위스키와 궁합 좋음.' },
  'sprite':         { ko:'사이다',       cat:'mixer',   desc:'레몬라임 탄산음료. 가볍고 청량한 마무리.' },
  'sprite or tonic':{ ko:'사이다 또는 토닉', cat:'mixer', desc:'주문 시 선택하는 탄산. 데낄라 슬래머 같은 슈터에 사용.' },
  'ginger ale':     { ko:'진저에일',     cat:'mixer',   desc:'생강 향 탄산음료. 알싸함과 청량함.' },
  'redbull':        { ko:'레드불',       cat:'mixer',   desc:'에너지 드링크. 폭탄주(밤) 스타일 칵테일에 사용.' },
  'guiness':        { ko:'기네스',       cat:'mixer',   desc:'아이리쉬 스타우트 흑맥주. 진한 몰트와 크리미한 거품.' },
  'sparkling water':{ ko:'스파클링 워터', cat:'mixer',   desc:'무가당 탄산수. 술맛을 살리고 가볍게 마무리.' },

  // ---- Juices / mixes ----
  'lemon juice':    { ko:'레몬 주스',    cat:'juice',   desc:'산뜻한 신맛. 단맛과 균형을 잡는 산미의 표준.' },
  'lime juice':     { ko:'라임 주스',    cat:'juice',   desc:'레몬보다 더 향긋하고 쌉쌀한 산미. 트로피컬 칵테일의 필수.' },
  'orange juice':   { ko:'오렌지 주스',  cat:'juice',   desc:'달콤하고 부드러운 시트러스. 술의 자극을 누그러뜨려요.' },
  'cranberry juice':{ ko:'크랜베리 주스', cat:'juice',   desc:'붉은 베리의 새콤 쌉쌀한 향. 색감과 산미를 동시에.' },
  'pineapple juice':{ ko:'파인애플 주스', cat:'juice',  desc:'트로피컬한 달콤·산미. 럼 베이스와 환상의 짝.' },
  'apple juice':    { ko:'사과 주스',    cat:'juice',   desc:'은은한 단맛과 산미. 향이 강하지 않아 칵테일을 부드럽게 만들어요.' },
  'fruit juice':    { ko:'과일 주스(선택)', cat:'juice', desc:'레몬·오렌지·사과·크랜베리·포도·파인애플 중 원하는 주스를 선택할 수 있어요.' },
  'pina mix':       { ko:'피나 믹스',    cat:'juice',   desc:'코코넛 크림 + 파인애플 등을 갈아 만든 트로피컬 베이스. 슬러쉬 같은 질감.' },
  'pinamix':        { ko:'피나 믹스',    cat:'juice',   desc:'피나 믹스(표기 변형). 코코넛+파인애플 베이스.' },
  'sweet&sour mix': { ko:'스윗앤사워 믹스', cat:'juice', desc:'레몬·라임 주스에 단맛을 더한 산뜻한 믹스. 균형을 잡아주는 만능 재료.' },
  'sweet & sour mix':{ ko:'스윗앤사워 믹스', cat:'juice', desc:'스윗앤사워 믹스(표기 변형).' },

  // ---- Syrups & other ----
  'sugar':          { ko:'설탕(시럽)',   cat:'syrup',   desc:'심플 시럽 또는 설탕. 신맛을 부드럽게 다듬어줘요.' },
  'grenadine syrup':{ ko:'그레나딘 시럽', cat:'syrup',   desc:'석류 향의 붉은 시럽. 색감과 달콤함을 동시에.' },
  'rose syrup':     { ko:'로즈 시럽',    cat:'syrup',   desc:'장미향 시럽. 우아한 향과 부드러운 단맛.' },
  'apple syrup':    { ko:'애플 시럽',    cat:'syrup',   desc:'사과 향 시럽. 진한 사과 풍미.' },
  'cherry syrup':   { ko:'체리 시럽',    cat:'syrup',   desc:'체리 향 시럽. 달콤하고 새빨간 색감.' },
  'strawberry syrup':{ ko:'스트로베리 시럽', cat:'syrup', desc:'딸기 향 시럽. 디저트 같은 단맛.' },
  'grapefruit syrup':{ ko:'자몽 시럽',   cat:'syrup',   desc:'자몽 향 시럽. 쌉쌀하고 산뜻한 단맛.' },
  '홍초':           { ko:'홍초',         cat:'syrup',   desc:'한국식 발효 식초 음료. 새콤달콤하고 깊은 산미.' },

  // ---- Fresh ----
  'lemon':          { ko:'레몬',         cat:'fresh',   desc:'생레몬. 직접 짜서 향과 신맛을 살립니다.' },
  'lime':           { ko:'라임',         cat:'fresh',   desc:'생라임. 모히또·다이키리의 산뜻함을 책임져요.' },
  'apple':          { ko:'사과',         cat:'fresh',   desc:'생사과. 빻아서 즙과 과육 향을 살립니다.' },
  'apple mint':     { ko:'애플민트',     cat:'fresh',   desc:'은은한 사과향이 도는 민트. 모히또의 그 잎.' },
  'chocolate':      { ko:'초콜릿',       cat:'fresh',   desc:'초콜릿 또는 카카오. 진한 달콤함과 묵직함.' },

  // ---- Dairy / cream ----
  'milk':           { ko:'우유',         cat:'cream',   desc:'부드러움과 단맛을 더해주는 유제품. 깔루아밀크 등에서 메인.' },
  'ice cream':      { ko:'아이스크림',   cat:'cream',   desc:'슬러쉬·셰이크 질감을 만드는 디저트 재료.' },
};

// Aliases (case-insensitive lookup will handle most). Some have alt category.
function ingKey(raw){
  return raw.toLowerCase().replace(/\s+/g,' ').trim();
}
function lookup(raw){
  const k = ingKey(raw);
  if(ING[k]) return ING[k];
  // try without trailing punctuation
  return ING[k.replace(/[.,]/g,'')] || null;
}

// ============================================================
// RENDER MENU
// ============================================================
async function loadMenu(){
  const res = await fetch('assets/menu.json');
  return await res.json();
}

function parseIngredients(s){
  if(!s) return [];
  return s.split(',').map(x => x.trim()).filter(Boolean);
}

function el(tag, attrs={}, ...children){
  const e = document.createElement(tag);
  for(const k in attrs){
    if(k === 'class') e.className = attrs[k];
    else if(k === 'html') e.innerHTML = attrs[k];
    else if(k.startsWith('data-')) e.setAttribute(k, attrs[k]);
    else e[k] = attrs[k];
  }
  for(const c of children){
    if(c == null) continue;
    e.appendChild(typeof c === 'string' ? document.createTextNode(c) : c);
  }
  return e;
}

function renderIngredients(list){
  const wrap = el('div', {class:'ingredients-block'});
  wrap.appendChild(el('div', {class:'ingredients-label'}, 'Ingredients · 구성 재료'));
  const inner = el('div', {class:'ingredients'});
  list.forEach(name => {
    const info = lookup(name);
    const chip = el('span', {
      class:'ing',
      'data-cat': info ? info.cat : 'other',
      'data-base': info && info.cat === 'base' ? 'true' : 'false',
    });
    chip.textContent = name;
    if(info){
      chip.title = `${name} · ${info.ko}\n${info.desc}`;
    } else {
      chip.title = name;
    }
    inner.appendChild(chip);
  });
  wrap.appendChild(inner);
  return wrap;
}

function renderCard(item){
  const card = el('article', {class: 'card' + (item.only ? ' has-only' : '')});
  if(item.only){
    card.appendChild(el('span', {class:'badge-only'}, 'R.I.P ONLY'));
  }
  const head = el('div', {class:'card-head'});
  head.appendChild(el('h3', {class:'card-name'}, item.name || ''));
  if(item.price){
    head.appendChild(el('span', {class:'card-price'}, Number(item.price).toLocaleString() + '원'));
  }
  card.appendChild(head);

  if(item.description){
    card.appendChild(el('p', {class:'card-desc'}, item.description));
  }

  if(item.tags && item.tags.length){
    const tagWrap = el('div', {class:'tags'});
    item.tags.forEach(t => {
      if(/r\.?i\.?p\s*only/i.test(t)) return; // already shown via badge
      tagWrap.appendChild(el('span', {class:'tag'}, '# ' + t));
    });
    if(tagWrap.children.length) card.appendChild(tagWrap);
  }

  const ings = parseIngredients(item.ingredients);
  if(ings.length){
    card.appendChild(renderIngredients(ings));
  }
  return card;
}

function renderCategory(cat){
  const sec = el('section', {class:'category', id:'cat-'+cat.id});
  const head = el('div', {class:'category-head'});
  head.appendChild(el('h2', {}, cat.name));
  if(cat.subtitle) head.appendChild(el('div', {class:'sub'}, cat.subtitle));
  sec.appendChild(head);

  cat.groups.forEach(group => {
    const wrap = el('div', {class:'group'});
    if(group.name){
      wrap.appendChild(el('div', {class:'group-name'}, group.name));
    }
    const grid = el('div', {class:'grid'});
    group.items.forEach(item => grid.appendChild(renderCard(item)));
    wrap.appendChild(grid);
    sec.appendChild(wrap);
  });
  return sec;
}

function renderNav(menu){
  const nav = document.getElementById('catnav');
  menu.forEach((cat, i) => {
    const btn = el('button', {type:'button'}, cat.name);
    btn.dataset.target = 'cat-' + cat.id;
    if(i === 0) btn.classList.add('active');
    btn.addEventListener('click', () => {
      const el2 = document.getElementById(btn.dataset.target);
      if(el2) el2.scrollIntoView({behavior:'smooth', block:'start'});
    });
    nav.appendChild(btn);
  });
  // Glossary + Primer entries
  const glossaryBtn = el('button', {type:'button'}, '재료 사전');
  glossaryBtn.dataset.target = 'glossary';
  glossaryBtn.addEventListener('click', () => document.getElementById('glossary').scrollIntoView({behavior:'smooth'}));
  nav.appendChild(glossaryBtn);
}

function updateActiveNav(){
  const nav = document.getElementById('catnav');
  const buttons = Array.from(nav.querySelectorAll('button'));
  const sections = buttons.map(b => document.getElementById(b.dataset.target)).filter(Boolean);
  const offset = 90;
  let active = sections[0];
  for(const s of sections){
    const r = s.getBoundingClientRect();
    if(r.top - offset <= 0) active = s;
  }
  buttons.forEach(b => b.classList.toggle('active', b.dataset.target === (active ? active.id : '')));
}

// ============================================================
// GLOSSARY
// ============================================================
const CAT_LABEL = {
  base:'베이스 스피릿',
  liqueur:'리큐르 & 모디파이어',
  mixer:'탄산 & 믹서',
  juice:'주스 & 믹스',
  syrup:'시럽',
  fresh:'생재료',
  cream:'유제품',
};
const CAT_ORDER = ['base','liqueur','mixer','juice','syrup','fresh','cream'];

function buildGlossaryFromMenu(menu){
  const used = new Set();
  menu.forEach(c => c.groups.forEach(g => g.items.forEach(it => {
    parseIngredients(it.ingredients).forEach(n => used.add(ingKey(n)));
  })));
  // Dedup by canonical ko name to avoid showing aliases twice
  const byCat = {};
  const seenKo = new Set();
  used.forEach(k => {
    const info = ING[k];
    if(!info) return;
    if(seenKo.has(info.ko)) return;
    seenKo.add(info.ko);
    (byCat[info.cat] = byCat[info.cat] || []).push({raw:k, ...info});
  });
  for(const c in byCat){
    byCat[c].sort((a,b) => a.ko.localeCompare(b.ko, 'ko'));
  }
  return byCat;
}

function renderGlossary(menu){
  const byCat = buildGlossaryFromMenu(menu);
  const tabs = document.getElementById('glossary-tabs');
  const grid = document.getElementById('glossary-grid');
  const available = CAT_ORDER.filter(c => byCat[c] && byCat[c].length);
  let current = 'all';

  function paint(){
    grid.innerHTML = '';
    const cats = current === 'all' ? available : [current];
    cats.forEach(c => {
      byCat[c].forEach(item => {
        const card = el('div', {class:'gl-card', 'data-cat':c});
        const head = el('div', {class:'gl-name'});
        head.appendChild(el('strong', {}, item.ko));
        head.appendChild(el('span', {}, item.raw));
        card.appendChild(head);
        card.appendChild(el('p', {}, item.desc));
        grid.appendChild(card);
      });
    });
    Array.from(tabs.children).forEach(btn => {
      btn.classList.toggle('active', btn.dataset.cat === current);
    });
  }

  const all = el('button', {type:'button'}, '전체');
  all.dataset.cat = 'all';
  all.classList.add('active');
  all.addEventListener('click', () => { current = 'all'; paint(); });
  tabs.appendChild(all);

  available.forEach(c => {
    const btn = el('button', {type:'button'}, CAT_LABEL[c]);
    btn.dataset.cat = c;
    btn.addEventListener('click', () => { current = c; paint(); });
    tabs.appendChild(btn);
  });

  paint();
}

// ============================================================
// BOOT
// ============================================================
(async function(){
  try{
    const menu = await loadMenu();
    renderNav(menu);
    const main = document.getElementById('menu');
    menu.forEach(cat => main.appendChild(renderCategory(cat)));
    renderGlossary(menu);
    window.addEventListener('scroll', updateActiveNav, {passive:true});
    updateActiveNav();
  }catch(err){
    document.getElementById('menu').innerHTML =
      '<p style="color:#ff9999;text-align:center;padding:40px">메뉴를 불러오지 못했어요. 새로고침 해주세요.<br><small>'+ err.message +'</small></p>';
    console.error(err);
  }
})();
