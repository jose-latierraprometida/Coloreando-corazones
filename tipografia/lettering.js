// Lettering "Raíz" — alfabeto en mayúsculas dibujado con código.
// Cada letra es un trazo central (cap height = 100 unidades) que luego recibe
// tinta corrida, bordes orgánicos y desgaste mediante filtros SVG.
(function(){
const G = {
 A:{w:84,d:'M0 100 L39 1 Q42 -3 45 1 L84 100 M17 64 L67 64',f:[0,84]},
 B:{w:60,d:'M0 0 V100 M0 0 H32 C57 0 57 47 32 47 H0 M0 47 H36 C63 47 63 100 36 100 H0',f:[0]},
 C:{w:76,d:'M76 17 C67 5 56 -1 46 -1 C18 -1 0 22 0 50 C0 78 18 101 46 101 C57 101 68 96 77 83'},
 D:{w:76,d:'M0 0 V100 H30 C60 100 76 80 76 50 C76 20 60 0 30 0 H0',f:[0]},
 E:{w:52,d:'M52 0 H0 V100 H54 M0 48 H44',f:[0]},
 F:{w:50,d:'M50 0 H0 V100 M0 48 H42',f:[0]},
 G:{w:80,d:'M76 17 C67 5 56 -1 46 -1 C18 -1 0 22 0 50 C0 78 18 101 46 101 C65 101 80 90 80 70 V55 H50'},
 H:{w:72,d:'M0 0 V100 M72 0 V100 M0 50 H72',f:[0,72]},
 I:{w:0,d:'M0 0 V100',f:[0]},
 J:{w:42,d:'M42 0 V70 C42 91 32 101 19 101 C9 101 2 95 -1 87'},
 K:{w:64,d:'M0 0 V100 M62 0 L4 57 M25 38 L66 100',f:[0,66]},
 L:{w:50,d:'M0 0 V100 H52',f:[0]},
 M:{w:98,d:'M0 100 L7 0 L49 72 L91 0 L98 100',f:[0,98]},
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
 'Ñ':['N','M12 -20 C18 -29 27 -28 35 -23 C43 -18 51 -16 60 -25'],
 'Ó':['O','M44 -14 L61 -31'],'Á':['A','M38 -14 L55 -31'],'É':['E','M18 -14 L35 -31'],
 'Í':['I','M-6 -14 L11 -31'],'Ú':['U','M30 -14 L47 -31'],
 'Ō':['O','M30 -22 H68'],
};
function glyph(ch){ if(G[ch])return G[ch]; const a=ACC[ch]; if(a){const b=G[a[0]];return {w:b.w,d:b.d+' '+a[1],f:b.f};} return G[' ']; }
function rng(seed){return function(){seed|=0;seed=seed+0x6D2B79F5|0;let t=Math.imul(seed^seed>>>15,1|seed);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296;}}
const NS='http://www.w3.org/2000/svg';
function el(n,a){const e=document.createElementNS(NS,n);for(const k in a)e.setAttribute(k,a[k]);return e;}
let fid=0;
function makeFilter(defs,cap,color,o){
 const id='raiz'+(fid++), s=cap/100, seed=o.seed||7;
 const f=el('filter',{id,x:'-10%',y:'-30%',width:'120%',height:'160%',filterUnits:'objectBoundingBox','color-interpolation-filters':'sRGB'});
 f.innerHTML=`
  <feTurbulence type="fractalNoise" baseFrequency="${(0.011/s).toFixed(5)}" numOctaves="2" seed="${seed}" result="w"/>
  <feDisplacementMap in="SourceGraphic" in2="w" scale="${(o.wobble??3.2)*s}" xChannelSelector="R" yChannelSelector="G" result="d1"/>
  <feGaussianBlur in="d1" stdDeviation="${(o.ink??1.5)*s}" result="b"/>
  <feComponentTransfer in="b" result="g"><feFuncA type="linear" slope="22" intercept="-10.2"/></feComponentTransfer>
  <feTurbulence type="fractalNoise" baseFrequency="${(0.16/s).toFixed(5)}" numOctaves="2" seed="${seed+3}" result="r"/>
  <feDisplacementMap in="g" in2="r" scale="${(o.rough??1.4)*s}" xChannelSelector="R" yChannelSelector="G" result="d2"/>
  <feTurbulence type="fractalNoise" baseFrequency="${(0.32/s).toFixed(5)}" numOctaves="1" seed="${seed+9}" result="sp"/>
  <feColorMatrix in="sp" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  60 0 0 0 ${-60*(o.speck??0.71)}" result="holes"/>
  <feTurbulence type="fractalNoise" baseFrequency="${(0.025/s).toFixed(5)}" numOctaves="3" seed="${seed+21}" result="wear"/>
  <feColorMatrix in="wear" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  60 0 0 0 ${-60*(o.wear??0.64)}" result="wearA"/>
  <feTurbulence type="fractalNoise" baseFrequency="${(0.42/s).toFixed(5)}" numOctaves="1" seed="${seed+33}" result="fineN"/>
  <feColorMatrix in="fineN" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  60 0 0 0 -30" result="fine"/>
  <feComposite in="wearA" in2="fine" operator="arithmetic" k1="1" k2="0" k3="0" k4="0" result="wearHoles"/>
  <feComposite in="d2" in2="holes" operator="out" result="h1"/>
  <feComposite in="h1" in2="wearHoles" operator="out" result="h2"/>
  <feFlood flood-color="${color}"/><feComposite in2="h2" operator="in"/>`;
 defs.appendChild(f); return id;
}
// ---- Motor "pincel": convierte cada trazo central en una forma de grosor variable ----
let probe=null;
function probePath(d){ if(!probe){const sv=el('svg',{width:0,height:0,style:'position:absolute'});document.body.appendChild(sv);probe=el('path',{});sv.appendChild(probe);} probe.setAttribute('d',d); return probe; }
function field(R,amp,freq){ // campo de deformación suave 2D (esqueleto orgánico)
  const p=[R()*6.28,R()*6.28,R()*6.28,R()*6.28],f=[freq*(0.8+R()*.4),freq*(0.8+R()*.4),freq*(1.6+R()*.6),freq*(1.6+R()*.6)];
  return (x,y)=>[amp*(Math.sin(y*f[0]+p[0])*.7+Math.sin(x*f[2]+p[2])*.3), amp*(Math.sin(x*f[1]+p[1])*.7+Math.sin(y*f[3]+p[3])*.3)];
}
function brushStroke(d,o,R,warp){
  const path=probePath(d), L=path.getTotalLength(); if(L<1)return '';
  const n=Math.max(12,Math.round(L/1.6)), pts=[];
  for(let i=0;i<=n;i++){const q=path.getPointAtLength(L*i/n);const w=warp(q.x,q.y);pts.push([q.x+w[0],q.y+w[1]]);}
  const closed=Math.hypot(pts[0][0]-pts[n][0],pts[0][1]-pts[n][1])<0.5;
  const ang=o.nib*Math.PI/180, ph=R()*6.28, ph2=R()*6.28, press=0.85+R()*.3, endT=0.82+R()*.12;
  const left=[],right=[];
  for(let i=0;i<=n;i++){
    const a=pts[Math.max(0,i-1)], b=pts[Math.min(n,i+1)], th=Math.atan2(b[1]-a[1],b[0]-a[0]);
    const t=i/n;
    let w=o.weight*(o.contrast+(1-o.contrast)*Math.abs(Math.sin(th-ang)));      // pincel plano inclinado
    w*=1+0.10*Math.sin(t*9.4+ph)+0.06*Math.sin(t*23+ph2);                     // pulso irregular
    if(!closed){ w*= t<0.08 ? press*(0.85+t/0.08*0.25) : 1;                      // entrada con presión
                 if(t>endT) w*=1-((t-endT)/(1-endT))*0.45; }                     // salida que afina
    const nx=-Math.sin(th), ny=Math.cos(th);
    left.push([pts[i][0]+nx*w/2,pts[i][1]+ny*w/2]); right.push([pts[i][0]-nx*w/2,pts[i][1]-ny*w/2]);
  }
  const f=v=>v[0].toFixed(2)+' '+v[1].toFixed(2);
  if(closed) return 'M'+left.map(f).join('L')+'Z M'+right.reverse().map(f).join('L')+'Z';
  return 'M'+left.map(f).join('L')+'L'+right.reverse().map(f).join('L')+'Z';
}
window.measureRaiz=function(text,o){o=Object.assign({cap:100,track:22,weight:13},o);let x=0;[...text].forEach(ch=>{const g=glyph(ch);x+=g.w+o.weight+(ch===' '?0:o.track);});return (x-o.track)*o.cap/100;};
// Dibuja texto. opts: x,y(baseline),cap,color,track(unid.),weight(unid.),seed,align,jitter
window.drawRaiz=function(svg,text,opts){
 const o=Object.assign({cap:100,color:'#000',track:22,weight:13,seed:7,align:'left',jitter:1,nib:-35,contrast:.42,warp:3.2},opts);
 const s=o.cap/100, R=rng(o.seed*97+text.length);
 let defs=svg.querySelector('defs'); if(!defs){defs=el('defs',{});svg.prepend(defs);}
 const fidv=makeFilter(defs,o.cap,o.color,Object.assign({wobble:2.2,ink:1.1,rough:1.2,speck:.73,wear:.66},o));
 const outer=el('g',{filter:`url(#${fidv})`}); const inner=el('g',{});
 let x=0;
 [...text].forEach(ch=>{
  const g=glyph(ch), J=o.jitter;
  const r=(R()-.5)*5*J, dy=(R()-.5)*5*J, sx=1+(R()-.5)*.09*J, sy=1+(R()-.5)*.08*J, sk=(R()-.5)*5*J;
  const grp=el('g',{transform:`translate(${x+o.weight/2} ${dy+(1-sy)*100}) rotate(${r} ${g.w/2} 50) skewX(${sk}) scale(${sx} ${sy})`});
  const warp=field(R,o.warp*J,0.045);
  if(g.d){ const subs=g.d.split(/(?=M)/).filter(t=>t.trim()); let dd='';
    subs.forEach(sp=>dd+=brushStroke(sp,o,R,warp)+' ');
    grp.appendChild(el('path',{d:dd,fill:'#000','fill-rule':'nonzero'})); }
  if(g.dot){const w=warp(g.dot[0],g.dot[1]);grp.appendChild(el('ellipse',{cx:g.dot[0]+w[0],cy:g.dot[1]-(g.dot[1]===100?o.weight*.5:0),rx:o.weight*.8,ry:o.weight*.65,transform:`rotate(${R()*60})`,fill:'#000'}));}
  inner.appendChild(grp);
  x+=g.w*sx+o.weight+(ch===' '?0:o.track);
 });
 const width=(x-o.track)*s; let x0=o.x; if(o.align==='center')x0-=width/2; if(o.align==='right')x0-=width;
 inner.setAttribute('transform',`translate(${x0} ${o.y-o.cap}) scale(${s})`);
 outer.appendChild(inner); svg.appendChild(outer); return width;
};
})();
