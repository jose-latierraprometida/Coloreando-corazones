// Lettering "Raíz" — alfabeto en mayúsculas dibujado con código.
// Cada letra es un trazo central (cap height = 100 unidades) que luego recibe
// tinta corrida, bordes orgánicos y desgaste mediante filtros SVG.
(function(){
const G = {
 A:{w:88,d:'M0 100 L42 1 Q44 -2 46 1 L88 100 M21 67 L67 67'},
 B:{w:60,d:'M0 0 V100 M0 0 H32 C57 0 57 47 32 47 H0 M0 47 H36 C63 47 63 100 36 100 H0',f:[0]},
 C:{w:76,d:'M76 17 C67 5 56 -1 46 -1 C18 -1 0 22 0 50 C0 78 18 101 46 101 C57 101 68 96 77 83'},
 D:{w:76,d:'M0 0 V100 H30 C60 100 76 80 76 50 C76 20 60 0 30 0 H0',f:[0]},
 E:{w:54,d:'M54 0 H0 V100 H56 M0 50 H46'},
 F:{w:52,d:'M52 0 H0 V100 M0 50 H44'},
 G:{w:80,d:'M76 17 C67 5 56 -1 46 -1 C18 -1 0 22 0 50 C0 78 18 101 46 101 C65 101 80 90 80 70 V55 H50'},
 H:{w:76,d:'M0 0 V100 M76 0 V100 M0 54 Q38 57 76 53'},
 I:{w:0,d:'M0 0 V100',f:[0]},
 J:{w:42,d:'M42 0 V70 C42 91 32 101 19 101 C9 101 2 95 -1 87'},
 K:{w:64,d:'M0 0 V100 M62 0 L4 57 M25 38 L66 100',f:[0,66]},
 L:{w:50,d:'M0 0 V100 H52',f:[0]},
 M:{w:94,d:'M0 100 L3 0 L47 66 L91 0 L94 100'},
 N:{w:72,d:'M0 100 V0 L72 100 V0',f:[0]},
 O:{w:98,d:'M49 -1 C77 -1 98 21 98 50 C98 79 77 101 49 101 C21 101 0 79 0 50 C0 21 21 -1 49 -1 Z'},
 P:{w:58,d:'M0 100 V0 H29 C62 0 62 55 29 55 H0',f:[0]},
 Q:{w:98,d:'M49 -1 C77 -1 98 21 98 50 C98 79 77 101 49 101 C21 101 0 79 0 50 C0 21 21 -1 49 -1 Z M60 80 L94 110'},
 R:{w:62,d:'M0 100 V0 H29 C60 0 60 53 29 53 H0 M27 53 L64 100',f:[0,64]},
 S:{w:56,d:'M53 13 C46 4 38 -1 28 -1 C12 -1 2 10 2 24 C2 57 56 42 56 75 C56 91 44 101 27 101 C15 101 5 94 -1 84'},
 T:{w:72,d:'M0 0 H72 M36 0 V100',f:[36]},
 U:{w:70,d:'M0 0 V62 C0 87 14 101 35 101 C56 101 70 87 70 62 V0'},
 V:{w:80,d:'M0 0 L40 100 L80 0'},
 W:{w:122,d:'M0 0 L28 100 L61 12 L94 100 L122 0'},
 X:{w:70,d:'M0 0 L70 100 M70 0 L0 100',f:[0,70]},
 Y:{w:72,d:'M0 0 L36 53 L72 0 M36 53 V100',f:[36]},
 Z:{w:64,d:'M3 0 H64 L0 100 H66'},
 ' ':{w:34,d:''},
 '·':{w:0,d:'',dot:[0,50]},
 '.':{w:0,d:'',dot:[0,100]},
 '&':{w:76,d:'M74 100 L18 34 C8 22 12 0 32 0 C50 0 54 20 40 32 L14 54 C2 64 0 74 4 86 C10 100 24 102 36 101 C54 99 66 84 72 62'},
};
const ACC = { // diacríticos sobre letras base
 'Ñ':['N','M12 -24 C18 -33 27 -32 35 -27 C43 -22 51 -20 60 -29'],
 'Ó':['O','M47 -24 L61 -39'],'Á':['A','M41 -24 L55 -39'],'É':['E','M21 -24 L35 -39'],
 'Í':['I','M-3 -24 L11 -39'],'Ú':['U','M33 -24 L47 -39'],
 'Ō':['O','M31 -26 H67'],
};
function glyph(ch){ if(G[ch])return G[ch]; const a=ACC[ch]; if(a){const b=G[a[0]];return {w:b.w,d:b.d+' '+a[1],f:b.f};} return G[' ']; }
function rng(seed){return function(){seed|=0;seed=seed+0x6D2B79F5|0;let t=Math.imul(seed^seed>>>15,1|seed);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296;}}
const NS='http://www.w3.org/2000/svg';
function el(n,a){const e=document.createElementNS(NS,n);for(const k in a)e.setAttribute(k,a[k]);return e;}
let fid=0;
// Filtro "tinta sobre papel": la tinta se corre (rellena y redondea esquinas),
// el borde ondula suavemente y la densidad varía un poco. Sin poros digitales.
function makeFilter(defs,cap,color,o){
 const id='raiz'+(fid++), s=cap/100, seed=o.seed||7;
 const f=el('filter',{id,x:'-10%',y:'-40%',width:'120%',height:'180%','color-interpolation-filters':'sRGB'});
f.innerHTML=`
  <feTurbulence type="fractalNoise" baseFrequency="${(0.05/s).toFixed(5)}" numOctaves="3" seed="${seed}" result="w"/>
  <feDisplacementMap in="SourceGraphic" in2="w" scale="${(o.wobble??3.4)*s}" xChannelSelector="R" yChannelSelector="G" result="d1"/>
  <feGaussianBlur in="d1" stdDeviation="${(o.ink??3.0)*s}" result="b"/>
  <!-- borde fibroso: ruido fino sumado antes del umbral -->
  <feTurbulence type="fractalNoise" baseFrequency="${(o.fiberF??0.3)}" numOctaves="3" seed="${seed+5}" result="fn"/>
  <feColorMatrix in="fn" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  1 0 0 0 0" result="fnA"/>
  <feTurbulence type="fractalNoise" baseFrequency="${(0.12/s).toFixed(5)}" numOctaves="2" seed="${seed+6}" result="mn"/>
  <feColorMatrix in="mn" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  1 0 0 0 0" result="mnA"/>
  <feComposite in="fnA" in2="mnA" operator="arithmetic" k2="${o.edge??0.28}" k3="0.3" result="nz"/>
  <feComposite in="b" in2="nz" operator="arithmetic" k2="1" k3="1" k4="-0.29" result="bn"/>
  <feComponentTransfer in="bn" result="g"><feFuncA type="linear" slope="13" intercept="-6.0"/></feComponentTransfer>
  <feGaussianBlur in="g" stdDeviation="0.45" result="soft"/>
  <feComponentTransfer in="soft" result="edge"><feFuncA type="linear" slope="1.6" intercept="-0.3"/></feComponentTransfer>
  <!-- grano del papel dentro de la tinta -->
  <feTurbulence type="fractalNoise" baseFrequency="${o.grainF??0.75}" numOctaves="2" seed="${seed+9}" result="gr"/>
  <feColorMatrix in="gr" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  ${o.grain??0.9} 0 0 0 ${0.98-(o.grain??0.9)*0.5}" result="grA"/>
  <feTurbulence type="fractalNoise" baseFrequency="${(0.05/s).toFixed(5)}" numOctaves="3" seed="${seed+11}" result="m"/>
  <feColorMatrix in="m" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0.3 0 0 0 0.82" result="mA"/>
  <feComposite in="grA" in2="mA" operator="arithmetic" k1="1" result="tex"/>
  <feComposite in="edge" in2="tex" operator="arithmetic" k1="1" result="ink"/>
  <feFlood flood-color="${color}"/><feComposite in2="ink" operator="in"/>`;
 defs.appendChild(f); return id;
}
let probe=null;
function probePath(d){ if(!probe){const sv=el('svg',{width:0,height:0,style:'position:absolute'});document.body.appendChild(sv);probe=el('path',{});sv.appendChild(probe);} probe.setAttribute('d',d); return probe; }
function field(R,amp,freq){
  const p=[R()*6.28,R()*6.28,R()*6.28,R()*6.28];
  return (x,y)=>[amp*(Math.sin(y*freq+p[0])*.7+Math.sin(x*freq*1.7+p[2])*.3), amp*(Math.sin(x*freq+p[1])*.7+Math.sin(y*freq*1.7+p[3])*.3)];
}
// Trazo con contraste (verticales gruesas, horizontales finas) y astas que se abren en los extremos.
function inkStroke(d,o,R,warp){
  const path=probePath(d), L=path.getTotalLength(); if(L<1)return '';
  const n=Math.max(16,Math.round(L/1.2)), pts=[];
  for(let i=0;i<=n;i++){const q=path.getPointAtLength(L*i/n);const w=warp(q.x,q.y);pts.push([q.x+w[0],q.y+w[1]]);}
  const closed=Math.hypot(pts[0][0]-pts[n][0],pts[0][1]-pts[n][1])<0.5;
  const ang=o.nib*Math.PI/180, k=1+(R()-.5)*.08, ph=R()*6.28, fl=o.flare*(0.8+R()*.4);
  const left=[],right=[];
  for(let i=0;i<=n;i++){
    const a=pts[Math.max(0,i-1)], b=pts[Math.min(n,i+1)], th=Math.atan2(b[1]-a[1],b[0]-a[0]), t=i/n;
    let w=o.weight*k*(o.contrast+(1-o.contrast)*Math.abs(Math.sin(th-ang)));
    w*=1+0.035*Math.sin(t*7+ph);
    if(!closed){ const e=Math.min(t,1-t)*L; if(e<9) w*=1+fl*Math.pow(1-e/9,2); }
    const nx=-Math.sin(th), ny=Math.cos(th);
    left.push([pts[i][0]+nx*w/2,pts[i][1]+ny*w/2]); right.push([pts[i][0]-nx*w/2,pts[i][1]-ny*w/2]);
  }
  const f=v=>v[0].toFixed(2)+' '+v[1].toFixed(2);
  if(closed) return 'M'+left.map(f).join('L')+'Z M'+right.reverse().map(f).join('L')+'Z';
  return 'M'+left.map(f).join('L')+'L'+right.reverse().map(f).join('L')+'Z';
}
window.measureRaiz=function(text,o){o=Object.assign({cap:100,track:22,weight:16},o);let x=0;[...text].forEach(ch=>{const g=glyph(ch);x+=g.w+o.weight+(ch===' '?0:o.track);});return (x-o.track)*o.cap/100;};
// Dibuja texto. opts: x,y(baseline),cap,color,track,weight,seed,align,jitter
window.drawRaiz=function(svg,text,opts){
 const o=Object.assign({cap:100,color:'#000',track:24,weight:16,seed:7,align:'left',jitter:1,nib:-12,contrast:.72,flare:.36,warp:1.1},opts);
 const s=o.cap/100, R=rng(o.seed*97+text.length);
 let defs=svg.querySelector('defs'); if(!defs){defs=el('defs',{});svg.prepend(defs);}
 const fidv=makeFilter(defs,o.cap,o.color,o);
 const outer=el('g',{filter:`url(#${fidv})`}); const inner=el('g',{});
 let x=0;
 [...text].forEach(ch=>{
  const g=glyph(ch), J=o.jitter, r=(R()-.5)*1.4*J, dy=(R()-.5)*1.6*J;
  const grp=el('g',{transform:`translate(${x+o.weight/2} ${dy}) rotate(${r} ${g.w/2} 50)`});
  const warp=field(R,o.warp*J,0.05);
  if(g.d){ let dd=''; g.d.split(/(?=M)/).filter(t=>t.trim()).forEach(sp=>dd+=inkStroke(sp,o,R,warp)+' ');
    grp.appendChild(el('path',{d:dd,fill:'#000'})); }
  if(g.dot) grp.appendChild(el('circle',{cx:g.dot[0],cy:g.dot[1]-(g.dot[1]===100?o.weight*.5:0),r:o.weight*.7,fill:'#000'}));
  inner.appendChild(grp); x+=g.w+o.weight+(ch===' '?0:o.track);
 });
 const width=(x-o.track)*s; let x0=o.x; if(o.align==='center')x0-=width/2; if(o.align==='right')x0-=width;
 inner.setAttribute('transform',`translate(${x0} ${o.y-o.cap}) scale(${s})`);
 outer.appendChild(inner); svg.appendChild(outer); return width;
};
})();
