/* Técnica y animación de ejercicios. Sin dependencias.
   Expone window.CF_TEC = { patOf(ex), figure(patKey), start(el), stop(), info(patKey) } */
(function(){
'use strict';
var FLOOR=124;
var L={t:40,ua:23,fa:21,th:31,sh:30,ft:10};

/* ---- cinemática: pose -> segmentos ---- */
function ik(a,b,l1,l2,dir){ // codo/rodilla entre a y b
  var dx=b[0]-a[0],dy=b[1]-a[1],d=Math.sqrt(dx*dx+dy*dy);
  var max=l1+l2-0.01;
  if(d>max){var k=max/d;dx*=k;dy*=k;d=max;b=[a[0]+dx,a[1]+dy];}
  if(d<8){d=8;}
  var cos=(l1*l1+d*d-l2*l2)/(2*l1*d);cos=Math.max(-1,Math.min(1,cos));
  var ang=Math.acos(cos),base=Math.atan2(dy,dx),th=base+dir*ang;
  return {m:[a[0]+l1*Math.cos(th),a[1]+l1*Math.sin(th)],e:b};
}
function fk(a,l1,d1,l2,d2){ // ángulos medidos desde "abajo", positivo hacia delante (derecha)
  var r1=d1*Math.PI/180,r2=d2*Math.PI/180;
  var m=[a[0]+l1*Math.sin(r1),a[1]+l1*Math.cos(r1)];
  return {m:m,e:[m[0]+l2*Math.sin(r2),m[1]+l2*Math.cos(r2)]};
}
function solve(p){
  var H=p.h.slice(),S,T;
  if(p.s){var dx=p.s[0]-H[0],dy=p.s[1]-H[1],d=Math.sqrt(dx*dx+dy*dy)||1;S=[H[0]+dx/d*L.t,H[1]+dy/d*L.t];}
  else{var r=(p.t||0)*Math.PI/180;S=[H[0]+L.t*Math.sin(r),H[1]-L.t*Math.cos(r)];}
  var ux=(S[0]-H[0])/L.t,uy=(S[1]-H[1])/L.t;
  var head=[S[0]+ux*13,S[1]+uy*13];
  var ar=p.arm||[0,0],lg=p.leg||[0,0];
  var arm=p.hand?ik(S,p.hand,L.ua,L.fa,p.ad||1):fk(S,L.ua,ar[0],L.fa,ar[1]);
  var leg,leg2;
  var ft=p.ft||0;
  if(p.foot)leg=ik(H,p.foot,L.th,L.sh,p.ld||-1);else leg=fk(H,L.th,lg[0],L.sh,lg[1]);
  if(p.foot2)leg2=ik(H,p.foot2,L.th,L.sh,p.ld||-1);else if(p.leg2)leg2=fk(H,L.th,p.leg2[0],L.sh,p.leg2[1]);else leg2=null;
  return {H:H,S:S,head:head,arm:arm,leg:leg,leg2:leg2,ft:ft};
}
function lerp(a,b,t){return a+(b-a)*t;}
function lp(a,b,t){return a&&b?[lerp(a[0],b[0],t),lerp(a[1],b[1],t)]:(b||a);}
function mix(A,B,t){
  var o={};
  ['h','s','hand','foot','foot2','arm','leg','leg2'].forEach(function(k){if(A[k]||B[k])o[k]=lp(A[k],B[k],t);});
  ['t','ft'].forEach(function(k){if(A[k]!=null||B[k]!=null)o[k]=lerp(A[k]||0,B[k]||0,t);});
  o.ad=A.ad;o.ld=A.ld;if(!A.arm&&B.arm)o.arm=B.arm;
  if(A.s&&!B.s)delete o.s;
  return o;
}

/* ---- dibujo ---- */
function pt(a){return a[0].toFixed(1)+','+a[1].toFixed(1);}
function seg(a,b,w,c){return '<line x1="'+a[0].toFixed(1)+'" y1="'+a[1].toFixed(1)+'" x2="'+b[0].toFixed(1)+'" y2="'+b[1].toFixed(1)+'" stroke="'+c+'" stroke-width="'+w+'" stroke-linecap="round"/>';}
/* miembro con volumen: forma cónica de ancho w1 a w2 con extremos redondeados */
function limb(a,b,w1,w2,c,op){
  var dx=b[0]-a[0],dy=b[1]-a[1],l=Math.sqrt(dx*dx+dy*dy)||1,nx=-dy/l,ny=dx/l,r1=w1/2,r2=w2/2;
  var P=[[a[0]+nx*r1,a[1]+ny*r1],[b[0]+nx*r2,b[1]+ny*r2],[b[0]-nx*r2,b[1]-ny*r2],[a[0]-nx*r1,a[1]-ny*r1]];
  var o=op!=null?' opacity="'+op+'"':'';
  return '<g fill="'+c+'"'+o+'><polygon points="'+P.map(pt).join(' ')+'"/><circle cx="'+a[0].toFixed(1)+'" cy="'+a[1].toFixed(1)+'" r="'+r1+'"/><circle cx="'+b[0].toFixed(1)+'" cy="'+b[1].toFixed(1)+'" r="'+r2+'"/></g>';
}
function footOf(ank,ft){var r=ft*Math.PI/180;return [ank[0]+L.ft*Math.cos(r),ank[1]+L.ft*Math.sin(r)];}
function draw(pa,pb,t,pat){
  var p=mix(pa,pb,t),g=solve(p),h='';
  var body='var(--ink,#111)',back='var(--muted,#8a8f98)',acc='var(--red,#C23229)';
  // suelo y apoyos
  if(pat.sc)h+='<g transform="translate('+(100*(1-pat.sc)).toFixed(1)+',0) scale('+pat.sc+')">';
  if(!pat.nofloor)h+='<line x1="6" y1="'+FLOOR+'" x2="194" y2="'+FLOOR+'" stroke="var(--line,#cfd3da)" stroke-width="2"/>';
  (pat.props||[]).forEach(function(q){
    if(q[0]==='bench')h+='<rect x="'+q[1]+'" y="'+q[2]+'" width="'+q[3]+'" height="'+(q[4]||8)+'" rx="3" fill="var(--line,#cfd3da)"/>';
    if(q[0]==='rect')h+='<rect x="'+q[1]+'" y="'+q[2]+'" width="'+q[3]+'" height="'+q[4]+'" rx="2" fill="var(--line,#cfd3da)"/>';
    if(q[0]==='bar')h+='<line x1="'+q[1]+'" y1="'+q[2]+'" x2="'+q[3]+'" y2="'+q[4]+'" stroke="var(--muted,#8a8f98)" stroke-width="3" stroke-linecap="round"/>';
    if(q[0]==='post')h+='<line x1="'+q[1]+'" y1="'+q[2]+'" x2="'+q[1]+'" y2="'+FLOOR+'" stroke="var(--line,#cfd3da)" stroke-width="4"/>';
  });
  var hl=pat.hl||[],hot=function(k){return hl.indexOf(k)>=0;};
  var skin='var(--muted,#8a8f98)',hc=function(k,base){return hot(k)?acc:base;};
  // pierna trasera (más clara)
  if(g.leg2){var a2=g.leg2;h+=limb(g.H,a2.m,10,7.5,back,.85)+limb(a2.m,a2.e,7.5,5,back,.85)+limb(a2.e,footOf(a2.e,g.ft),5,4,back,.85);}
  // pierna delantera
  var fo=footOf(g.leg.e,g.ft);
  h+=limb(g.H,g.leg.m,hot('thigh')?13:11.5,8.5,hc('thigh',body))+limb(g.leg.m,g.leg.e,8.5,5.5,hc('calf',body))+limb(g.leg.e,fo,6,4.5,body);
  h+='<circle cx="'+g.leg.m[0].toFixed(1)+'" cy="'+g.leg.m[1].toFixed(1)+'" r="4.6" fill="'+hc('thigh',body)+'"/>';
  // tronco: más ancho en el hombro que en la cadera
  h+=limb(g.H,g.S,10,hot('torso')?15:13,hc('torso',body));
  // cabeza
  var hd=g.head;
  h+='<circle cx="'+hd[0].toFixed(1)+'" cy="'+hd[1].toFixed(1)+'" r="7.6" fill="var(--surface,#fff)" stroke="'+body+'" stroke-width="3"/>';
  var ux=hd[0]-g.S[0],uy=hd[1]-g.S[1],ul=Math.sqrt(ux*ux+uy*uy)||1;
  h+=limb(g.S,[g.S[0]+ux/ul*5,g.S[1]+uy/ul*5],6,6,body);
  // brazo
  h+=limb(g.S,g.arm.m,hot('upperarm')||hot('shoulder')?10:8.5,6.5,hc('upperarm',body))+limb(g.arm.m,g.arm.e,6.5,4.6,hc('forearm',body));
  h+='<circle cx="'+g.S[0].toFixed(1)+'" cy="'+g.S[1].toFixed(1)+'" r="'+(hot('shoulder')?7.2:6)+'" fill="'+(hot('shoulder')?acc:body)+'"/>';
  h+='<circle cx="'+g.arm.e[0].toFixed(1)+'" cy="'+g.arm.e[1].toFixed(1)+'" r="3.4" fill="'+body+'"/>';
  // peso en la mano / hombro
  var w=pat.w;
  if(w==='bar'||w==='db'){
    var c=g.arm.e;
    if(w==='bar')h+='<line x1="'+(c[0]-2).toFixed(1)+'" y1="'+(c[1]-15).toFixed(1)+'" x2="'+(c[0]-2).toFixed(1)+'" y2="'+(c[1]+15).toFixed(1)+'" stroke="'+acc+'" stroke-width="3" stroke-linecap="round" opacity=".0"/>';
    if(w==='bar')h+='<circle cx="'+c[0].toFixed(1)+'" cy="'+c[1].toFixed(1)+'" r="8.5" fill="var(--muted,#8a8f98)"/><circle cx="'+c[0].toFixed(1)+'" cy="'+c[1].toFixed(1)+'" r="5.2" fill="var(--surface,#fff)" opacity=".9"/><circle cx="'+c[0].toFixed(1)+'" cy="'+c[1].toFixed(1)+'" r="1.8" fill="var(--muted,#8a8f98)"/>';
    else h+='<rect x="'+(c[0]-7).toFixed(1)+'" y="'+(c[1]-3).toFixed(1)+'" width="14" height="6" rx="2.2" fill="var(--muted,#8a8f98)"/><rect x="'+(c[0]-9).toFixed(1)+'" y="'+(c[1]-5).toFixed(1)+'" width="4" height="10" rx="1.6" fill="var(--ink,#111)"/><rect x="'+(c[0]+5).toFixed(1)+'" y="'+(c[1]-5).toFixed(1)+'" width="4" height="10" rx="1.6" fill="var(--ink,#111)"/>';
  }
  if(w==='bar-s'){h+='<circle cx="'+(g.S[0]-1).toFixed(1)+'" cy="'+(g.S[1]-4).toFixed(1)+'" r="8.5" fill="var(--muted,#8a8f98)"/><circle cx="'+(g.S[0]-1).toFixed(1)+'" cy="'+(g.S[1]-4).toFixed(1)+'" r="5" fill="var(--surface,#fff)" opacity=".9"/>';}
  if(w==='cable'){h+='<line x1="'+g.arm.e[0].toFixed(1)+'" y1="'+g.arm.e[1].toFixed(1)+'" x2="'+(pat.cx||180)+'" y2="'+(pat.cy||8)+'" stroke="'+acc+'" stroke-width="1.6" stroke-dasharray="3 3"/>';}
  if(pat.sc)h+='</g>';
  return h;
}

/* ---- poses (cara a la derecha; suelo y=124; cadera de pie y≈62) ---- */
var stand=[100,62],fl=[100,FLOOR-2];
var P={};
P.sentadilla={w:'bar-s',A:{h:[100,62],t:4,foot:fl,hand:null,arm:[20,100]},B:{h:[80,96],t:42,foot:fl,arm:[20,100]}};
P.sentadilla.A.arm=[10,70];P.sentadilla.B.arm=[10,70];
P.goblet={w:'db',A:{h:[100,62],t:4,foot:fl,arm:[15,150]},B:{h:[84,96],t:30,foot:fl,arm:[15,150]}};
P.prensa={w:null,props:[['rect',72,92,10,32]],A:{h:[80,98],t:-62,foot:[146,64],arm:[10,40]},B:{h:[80,98],t:-62,foot:[116,86],arm:[10,40]}};
P.zancada={w:'db',A:{h:[100,64],t:3,foot:[112,FLOOR-2],foot2:[88,FLOOR-2],arm:[2,2]},B:{h:[100,92],t:3,foot:[124,FLOOR-2],foot2:[72,FLOOR-8],arm:[2,2]}};
P.bisagra={w:'bar',A:{h:[100,62],t:4,foot:fl,arm:[0,0]},B:{h:[74,68],t:72,foot:fl,arm:[0,0]}};
P.puente={w:'bar-s',props:[['bench',34,100,34,24]],A:{h:[100,106],s:[62,98],foot:[128,FLOOR-2]},B:{h:[100,84],s:[62,98],foot:[128,FLOOR-2]}};
P.puentesuelo={w:null,A:{h:[96,112],s:[56,112],foot:[124,FLOOR-2],arm:[10,10]},B:{h:[96,86],s:[56,112],foot:[124,FLOOR-2],arm:[10,10]}};
P.press={w:'bar',props:[['bench',34,96,86,8],['post',44,96]],A:{h:[116,92],t:-90,foot:[140,FLOOR-2],hand:[86,56]},B:{h:[116,92],t:-90,foot:[140,FLOOR-2],hand:[86,78]}};
P.press.A={h:[116,92],t:-90,foot:[138,FLOOR-2],hand:[76,52],ad:-1};P.press.B={h:[116,92],t:-90,foot:[138,FLOOR-2],hand:[80,82],ad:-1};
P.inclinado={w:'bar',props:[['rect',52,100,60,8],['post',60,108]],A:{h:[108,96],t:-58,foot:[134,FLOOR-2],hand:[78,26],ad:-1},B:{h:[108,96],t:-58,foot:[134,FLOOR-2],hand:[84,68],ad:-1}};
P.aperturas={w:'db',props:[['bench',34,96,86,8]],A:{h:[116,92],t:-90,foot:[138,FLOOR-2],hand:[76,54],ad:-1},B:{h:[116,92],t:-90,foot:[138,FLOOR-2],hand:[70,86],ad:-1}};
P.cruce={w:'cable',cx:178,cy:6,A:{h:[96,62],t:12,foot:[104,FLOOR-2],foot2:[88,FLOOR-2],hand:[132,42],ad:1},B:{h:[96,62],t:12,foot:[104,FLOOR-2],foot2:[88,FLOOR-2],hand:[142,70],ad:1}};
P.flexion={w:null,A:{s:[54,78],h:[93,92],foot:[150,FLOOR-2],hand:[54,FLOOR-2],ad:-1},B:{s:[54,106],h:[93,110],foot:[150,FLOOR-2],hand:[54,FLOOR-2],ad:-1}};
P.fondos={w:null,nofloor:1,props:[['bar',70,70,150,70]],A:{h:[100,100],t:8,leg:[8,-35],hand:[104,78],ad:-1},B:{h:[100,126],t:22,leg:[8,-35],hand:[104,78],ad:-1}};
P.fondos.A={h:[100,66],t:8,leg:[10,-60],hand:[104,70],ad:-1};P.fondos.B={h:[98,88],t:20,leg:[10,-60],hand:[104,70],ad:-1};
P.pressh={w:'db',props:[['rect',68,92,12,32]],A:{h:[86,96],t:0,leg:[88,0],hand:[100,56],ad:-1},B:{h:[86,96],t:0,leg:[88,0],hand:[96,2],ad:-1}};
P.lateral={w:'db',A:{h:[100,62],t:3,foot:fl,arm:[4,6]},B:{h:[100,62],t:3,foot:fl,arm:[78,82]}};
P.frontal={w:'db',A:{h:[100,62],t:3,foot:fl,arm:[4,6]},B:{h:[100,62],t:3,foot:fl,arm:[86,90]}};
P.pajaros={w:'db',A:{h:[90,66],t:60,foot:fl,arm:[0,0]},B:{h:[90,66],t:60,foot:fl,arm:[-30,-34]}};
P.facepull={w:'cable',cx:182,cy:36,A:{h:[96,62],t:2,foot:fl,hand:[140,38],ad:1},B:{h:[96,62],t:2,foot:fl,hand:[112,22],ad:1}};
P.encoger={w:'db',A:{h:[100,62],t:2,foot:fl,arm:[0,0]},B:{h:[100,58],t:2,foot:fl,arm:[0,0]}};
P.jalon={w:'cable',cx:120,cy:0,props:[['rect',60,92,30,6]],A:{h:[84,94],t:-10,leg:[90,5],hand:[118,6],ad:1},B:{h:[84,94],t:-14,leg:[90,5],hand:[104,42],ad:1}};
P.jalon.A.hand=[116,8];P.jalon.B.hand=[100,44];
P.dominada={w:null,nofloor:1,sc:.8,props:[['bar',70,12,150,12]],A:{h:[104,96],t:0,leg:[20,-80],hand:[106,12],ad:1},B:{h:[104,66],t:0,leg:[20,-80],hand:[106,12],ad:1}};
P.remo={w:'db',A:{h:[84,70],t:62,foot:fl,arm:[0,0]},B:{h:[84,70],t:62,foot:fl,arm:[-42,10]}};
P.remopolea={w:'cable',cx:190,cy:84,props:[['rect',54,92,30,6]],A:{h:[80,92],t:0,leg:[88,4],hand:[128,56],ad:-1},B:{h:[80,92],t:0,leg:[88,4],hand:[96,62],ad:-1}};
P.curl={w:'db',A:{h:[100,62],t:0,foot:fl,arm:[4,4]},B:{h:[100,62],t:0,foot:fl,arm:[4,142]}};
P.triceps={w:'cable',cx:140,cy:2,A:{h:[96,62],t:6,foot:fl,arm:[8,110]},B:{h:[96,62],t:6,foot:fl,arm:[8,6]}};
P.triceps.A.arm=[8,104];P.triceps.B.arm=[8,6];
P.skull={w:'bar',props:[['bench',34,96,86,8]],A:{h:[116,92],t:-90,foot:[138,FLOOR-2],arm:[180,180]},B:{h:[116,92],t:-90,foot:[138,FLOOR-2],arm:[180,262]}};
P.extensionpierna={w:null,props:[['rect',68,92,12,32]],A:{h:[84,96],t:0,leg:[90,4]},B:{h:[84,96],t:0,leg:[90,90]}};
P.curlpierna={w:null,props:[['rect',68,92,12,32]],A:{h:[84,96],t:0,leg:[90,90]},B:{h:[84,96],t:0,leg:[90,-6]}};
P.gemelo={w:'bar-s',A:{h:[100,62],t:0,foot:fl,ft:0},B:{h:[100,55],t:0,foot:[100,FLOOR-9],ft:-38}};
P.gemelo.B={h:[100,56],t:0,foot:[101,FLOOR-8],ft:30};
P.patada={w:null,A:{h:[92,66],t:30,foot:fl,foot2:[96,FLOOR-2],hand:[128,70],ad:-1},B:{h:[92,66],t:30,foot:fl,foot2:[52,98],hand:[128,70],ad:-1}};
P.patada.A={h:[96,64],t:28,foot:fl,leg2:[4,4],hand:[126,72],ad:-1};P.patada.B={h:[96,64],t:28,foot:fl,leg2:[-48,-60],hand:[126,72],ad:-1};
P.abductor={w:null,props:[['rect',60,92,26,6]],A:{h:[84,94],t:0,leg:[80,10],leg2:[78,14]},B:{h:[84,94],t:0,leg:[80,10],leg2:[80,30]}};
P.plancha={w:null,A:{s:[52,92],h:[104,98],foot:[148,FLOOR-2],arm:[0,86]},B:{s:[52,90],h:[104,95],foot:[148,FLOOR-2],arm:[0,86]}};
P.crunch={w:null,A:{h:[110,108],t:-90,foot:[134,FLOOR-2],arm:[-60,-70]},B:{h:[110,108],t:-52,foot:[134,FLOOR-2],arm:[-20,-30]}};
P.crunch.A={h:[110,112],t:-88,foot:[136,FLOOR-2],hand:[76,104],ad:-1};P.crunch.B={h:[110,112],t:-50,foot:[136,FLOOR-2],hand:[92,84],ad:-1};
P.colgado={w:null,nofloor:1,sc:.8,props:[['bar',70,-14,150,-14]],A:{h:[104,70],t:0,leg:[2,0],hand:[106,-14],ad:1},B:{h:[104,70],t:0,leg:[86,10],hand:[106,-14],ad:1}};
P.hiper={w:null,props:[['rect',100,86,10,38],['rect',70,92,44,6]],A:{h:[104,84],t:70,leg:[-70,-78]},B:{h:[104,84],t:6,leg:[-70,-78]}};
P.hiper.A={h:[104,80],t:112,foot:[60,108],ld:1};P.hiper.B={h:[104,80],t:62,foot:[60,108],ld:1};
P.pullover={w:'db',props:[['bench',34,96,86,8]],A:{h:[116,92],t:-90,foot:[138,FLOOR-2],arm:[178,172]},B:{h:[116,92],t:-90,foot:[138,FLOOR-2],arm:[90,100]}};
P.pullover.A={h:[116,92],t:-90,foot:[138,FLOOR-2],hand:[70,52],ad:-1};P.pullover.B={h:[116,92],t:-90,foot:[138,FLOOR-2],hand:[44,100],ad:-1};
P.granjero={w:'db',A:{h:[100,62],t:2,foot:[106,FLOOR-2],foot2:[92,FLOOR-2],arm:[2,2]},B:{h:[100,62],t:2,foot:[92,FLOOR-2],foot2:[106,FLOOR-2],arm:[2,2]}};

/* ---- texto de técnica por patrón ---- */
var T={
sentadilla:{n:'Sentadilla',steps:['Pies a la anchura de los hombros y puntas algo abiertas. Aprieta el abdomen como si fueras a recibir un golpe.','Baja empujando las caderas atrás y las rodillas hacia fuera, en la dirección de los pies.','Baja hasta donde puedas mantener la espalda neutra (idealmente muslos paralelos al suelo).','Sube empujando el suelo con todo el pie y sin que las rodillas se junten.'],err:['Las rodillas se van hacia dentro.','Se levantan los talones.','Redondear la espalda al final de la bajada.'],safe:['Si no llegas bajo sin redondear la espalda, baja menos y trabaja la movilidad de tobillo y cadera.','Con cargas altas usa un rack con topes de seguridad a la altura de las caderas.']},
goblet:{n:'Sentadilla con peso al pecho',steps:['Sujeta la mancuerna pegada al pecho con los codos hacia abajo.','Baja entre las piernas con el pecho alto y las rodillas siguiendo los pies.','Sube empujando el suelo y aprieta los glúteos arriba.'],err:['Dejar caer el pecho hacia delante.','Rebotar abajo.'],safe:['Es la mejor sentadilla para aprender: el peso delante te ayuda a mantener la espalda recta.']},
prensa:{n:'Prensa de piernas',steps:['Espalda y cadera pegadas al respaldo. Pies a la anchura de los hombros en la plataforma.','Baja controlado hasta que las rodillas lleguen a unos 90° sin que la cadera se despegue.','Empuja con todo el pie, sin bloquear las rodillas del todo arriba.'],err:['Despegar la zona lumbar o la cadera del asiento al bajar.','Bloquear las rodillas con fuerza al subir.','Dejar que las rodillas se junten.'],safe:['Si la cadera se levanta al bajar, estás bajando demasiado: acorta el recorrido.','No sueltes el peso de golpe ni pongas las manos en las rodillas para ayudarte.']},
zancada:{n:'Zancadas y pasos',steps:['Da un paso largo al frente con el torso erguido.','Baja la rodilla de atrás hacia el suelo sin que toque de golpe; la de delante queda sobre el pie.','Empuja con el pie delantero para volver.'],err:['Paso demasiado corto (la rodilla pasa mucho de la punta del pie).','Inclinar el tronco a un lado.'],safe:['Apóyate en una pared o un soporte si te falta equilibrio.','Si te molestan las rodillas, da un paso más largo.']},
bisagra:{n:'Peso muerto y bisagra de cadera',steps:['Pies a la anchura de las caderas. La barra (o mancuernas) pegada a las piernas.','Lleva la cadera hacia atrás como si cerraras una puerta con el culo, con las rodillas apenas flexionadas.','Baja hasta notar el estiramiento detrás del muslo, con la espalda recta.','Sube empujando la cadera hacia delante y aprieta los glúteos arriba.'],err:['Redondear la espalda.','Convertirlo en una sentadilla (doblar demasiado las rodillas).','Alejar la barra del cuerpo.'],safe:['Mira un punto en el suelo a 2 metros; no mires al espejo girando el cuello.','Si la espalda se redondea, baja menos o usa menos peso. No es un ejercicio para ir al límite en tus primeras semanas.','Si tienes molestias lumbares, usa mancuernas ligeras y más repeticiones.']},
puente:{n:'Hip thrust',steps:['Espalda alta apoyada en el banco, pies a la anchura de las caderas y rodillas dobladas a unos 90° arriba.','Empuja con los talones y sube la cadera hasta que el cuerpo quede recto de hombros a rodillas.','Aprieta los glúteos 1 segundo arriba y baja controlado.'],err:['Arquear la zona lumbar en exceso arriba.','Pies demasiado lejos o demasiado cerca.'],safe:['Mete la barbilla ligeramente y mira hacia delante; así no hiperextiendes la lumbar.','Usa una almohadilla en la barra para que no te haga daño en la cadera.']},
puentesuelo:{n:'Puente de glúteo',steps:['Tumbado boca arriba, rodillas dobladas y pies cerca de los glúteos.','Empuja con los talones y sube la cadera hasta que el cuerpo esté en línea.','Aprieta los glúteos y baja despacio.'],err:['Arquear la zona lumbar al subir.'],safe:['Es muy seguro y un buen primer paso para glúteos.']},
press:{n:'Press de pecho',steps:['Túmbate con los pies firmes en el suelo. Junta los omóplatos y llévalos hacia abajo, como metiéndolos en los bolsillos de atrás.','Agarra la barra algo más ancho que los hombros. Baja controlado hasta rozar la parte baja del pecho.','Empuja hacia arriba y un poco atrás, sin despegar la cadera del banco.'],err:['Rebotar la barra en el pecho.','Abrir los codos a 90° (hombros dolorosos): déjalos a unos 45°.','Levantar la cadera del banco.'],safe:['Con cargas altas ten siempre a alguien que te pueda ayudar o usa los topes de seguridad del rack.','Nunca pongas la barra sin los seguros en las puntas.','Si te duele el hombro, prueba con mancuernas o agarre neutro.']},
inclinado:{n:'Press inclinado',steps:['Banco entre 30° y 45°. Hombros hacia atrás y abajo, pies firmes.','Baja hasta la parte alta del pecho con los codos a unos 45°.','Empuja hacia arriba sin encoger los hombros.'],err:['Banco demasiado vertical (trabaja casi solo el hombro).','Encoger los hombros hacia las orejas.'],safe:['Elige un peso con el que puedas controlar la bajada sin rebotes.']},
aperturas:{n:'Aperturas',steps:['Túmbate con las mancuernas arriba y los codos ligeramente flexionados.','Abre los brazos en arco hasta sentir el estiramiento del pecho, sin pasar la altura del banco.','Cierra como si abrazaras un árbol grande.'],err:['Bajar demasiado: la articulación del hombro queda en una posición vulnerable.','Estirar del todo los codos.'],safe:['Usa poco peso: es un ejercicio de estiramiento, no de carga.','Mantén los codos con la misma flexión durante todo el movimiento.']},
cruce:{n:'Cruce de poleas y fly',steps:['Un pie algo adelantado y el torso ligeramente inclinado hacia delante.','Con los codos algo flexionados, lleva las manos hacia delante hasta juntarlas ante el pecho.','Vuelve despacio, notando el estiramiento sin que los hombros se vayan atrás.'],err:['Usar impulso con el cuerpo.','Doblar y estirar los codos como en un press.'],safe:['Peso moderado y control: ese estiramiento final castiga el hombro si vas con prisa.']},
flexion:{n:'Flexiones',steps:['Manos algo más anchas que los hombros, cuerpo recto de cabeza a talones, abdomen y glúteos apretados.','Baja hasta que el pecho casi toque el suelo, con los codos a unos 45° del cuerpo.','Empuja el suelo y vuelve arriba sin dejar caer la cadera.'],err:['Cadera caída o levantada.','Codos totalmente abiertos en cruz.','Medio recorrido.'],safe:['Si no puedes hacer 5 buenas, apoya las manos en un banco o en una pared y ve bajando la altura con las semanas.']},
fondos:{n:'Fondos en paralelas',steps:['Sube a las paralelas con los brazos rectos y los hombros hacia abajo (no hacia las orejas).','Baja con control hasta que los codos lleguen a unos 90°.','Empuja hasta casi estirar los codos.'],err:['Bajar demasiado, con los hombros por debajo de los codos.','Balancearte.'],safe:['Si notas el hombro "pellizcado" abajo, corta el recorrido.','Si aún no puedes con tu peso, usa la máquina asistida o una banda elástica.']},
pressh:{n:'Press de hombro',steps:['Sentado o de pie, abdomen y glúteos apretados. Las manos empiezan a la altura de los hombros.','Empuja hacia arriba en línea recta, con las muñecas sobre los codos.','Baja controlado hasta la altura de las orejas.'],err:['Arquear mucho la zona lumbar.','Empujar demasiado hacia delante.'],safe:['Con la espalda muy cargada, siéntate con respaldo.','Si te duele el hombro por arriba, agarra con las palmas mirándose entre sí.']},
lateral:{n:'Elevación lateral',steps:['De pie, con una ligera flexión de codos y mancuernas a los lados.','Sube los brazos hacia los lados hasta la altura de los hombros, con los codos algo más altos que las manos.','Baja despacio; no dejes caer el peso.'],err:['Balancear el tronco para subir el peso.','Subir los hombros hacia las orejas.'],safe:['Usa poco peso: el hombro lateral es pequeño. Con 4–8 kg ya trabajas de sobra.']},
frontal:{n:'Elevación frontal',steps:['De pie, mancuernas delante de los muslos.','Sube un brazo (o los dos) hasta la altura de los ojos.','Baja controlado.'],err:['Impulso con el tronco.','Subir por encima de los hombros.'],safe:['Peso ligero. El hombro delantero ya trabaja mucho en los press.']},
pajaros:{n:'Pájaros (hombro posterior)',steps:['Inclina el torso hacia delante con la espalda recta y los brazos colgando.','Abre los brazos hacia los lados, con los codos ligeramente flexionados.','Junta los omóplatos arriba y baja despacio.'],err:['Subir con impulso.','Encoger los hombros.'],safe:['Peso pequeño; aquí importa sentir la parte de atrás del hombro, no mover mucho peso.']},
facepull:{n:'Face pull',steps:['Polea a la altura de la cara con una cuerda.','Tira hacia la cara abriendo los codos hacia fuera y hacia atrás.','Junta los omóplatos y vuelve controlado.'],err:['Echarte hacia atrás con el cuerpo.','Tirar con los brazos sin mover los omóplatos.'],safe:['Es un buen ejercicio para cuidar los hombros: úsalo con poco peso y muchas repeticiones (12–20).']},
encoger:{n:'Encogimientos (trapecio)',steps:['De pie con el peso en las manos, brazos estirados.','Sube los hombros hacia las orejas.','Mantén un segundo arriba y baja despacio.'],err:['Girar los hombros en círculo.','Doblar los codos.'],safe:['Sube recto; no hace falta girar los hombros.']},
jalon:{n:'Jalón al pecho',steps:['Sujeta la barra algo más ancha que los hombros, con los muslos bajo el rodillo.','Inclínate un poco hacia atrás y baja la barra hacia la parte alta del pecho, llevando los codos abajo.','Sube controlado hasta estirar los brazos.'],err:['Tirar con los bíceps y no con la espalda.','Balancear mucho el tronco.','Bajar la barra por detrás de la nuca.'],safe:['No bajes la barra por detrás de la nuca: tensiona el hombro y el cuello sin beneficio.']},
dominada:{n:'Dominadas',steps:['Cuelga con las manos un poco más anchas que los hombros. Baja los hombros lejos de las orejas.','Sube llevando el pecho hacia la barra, con los codos hacia abajo y atrás.','Baja despacio hasta estirar los brazos.'],err:['Balancearte para coger impulso.','Medio recorrido.','Encoger los hombros hacia las orejas.'],safe:['Si aún no puedes hacer una, usa la máquina asistida, una banda elástica o hazlas solo en la bajada (3–5 segundos).','No bajes de golpe: cuida los codos y los hombros.']},
remo:{n:'Remo con barra o mancuerna',steps:['Inclina el torso hacia delante con la espalda recta y las rodillas algo flexionadas.','Tira del peso hacia el abdomen llevando los codos hacia atrás.','Aprieta la espalda un segundo y baja controlado.'],err:['Redondear la espalda.','Levantar el torso para ayudarte con el impulso.'],safe:['Si la zona lumbar se queja, apoya el pecho en un banco inclinado o usa una máquina con apoyo en el pecho.']},
remopolea:{n:'Remo sentado (polea o máquina)',steps:['Sentado con la espalda recta y los pies apoyados.','Tira hacia el abdomen, llevando los codos hacia atrás.','Junta los omóplatos y vuelve estirando los brazos sin soltar el peso.'],err:['Balancear el tronco hacia atrás.','Encoger los hombros.'],safe:['Mantén el pecho alto y el torso quieto: el movimiento es de los codos.']},
curl:{n:'Curl de bíceps',steps:['De pie con los codos pegados al cuerpo.','Sube el peso doblando solo los codos.','Aprieta arriba y baja despacio (3 segundos).'],err:['Balancear el cuerpo.','Adelantar los codos para "robar" recorrido.'],safe:['Si necesitas balancearte, el peso es demasiado alto: baja un poco.']},
triceps:{n:'Extensión de tríceps',steps:['Codos pegados al cuerpo y hacia abajo.','Estira los codos hasta abajo sin mover los hombros.','Sube controlado hasta unos 90° de codo.'],err:['Despegar los codos del cuerpo.','Inclinarte hacia delante y empujar con el tronco.'],safe:['Cuida los codos: no bloquees de golpe con mucho peso.']},
skull:{n:'Skullcrusher / extensión tumbado',steps:['Tumbado, con el peso sobre los ojos y los brazos casi verticales.','Dobla solo los codos para bajar el peso hacia la frente o detrás de la cabeza.','Estira los codos para volver.'],err:['Abrir mucho los codos.','Mover los hombros.'],safe:['Empieza con una barra Z y poco peso: el codo es una articulación sensible.']},
extensionpierna:{n:'Extensión de cuádriceps',steps:['Ajusta el respaldo para que las rodillas coincidan con el eje de la máquina.','Estira las rodillas hasta casi bloquearlas y aprieta el muslo.','Baja despacio, sin que el peso se caiga.'],err:['Subir con impulso.','Levantar la cadera del asiento.'],safe:['Con rodillas sensibles, usa peso moderado y no bloquees del todo arriba.']},
curlpierna:{n:'Curl femoral',steps:['Ajusta el rodillo justo encima del talón.','Dobla las rodillas llevando los talones hacia los glúteos.','Vuelve controlado, sin soltar el peso.'],err:['Levantar la cadera.','Tirones.'],safe:['Baja despacio (3 segundos): el estiramiento controlado es la parte más importante.']},
gemelo:{n:'Elevación de gemelos',steps:['Apoya la parte delantera del pie y deja bajar el talón.','Sube todo lo que puedas, apretando el gemelo.','Baja despacio hasta estirar.'],err:['Rebotar abajo.','Recorrido corto.'],safe:['Hazlo con calma: aquí lo importante es el recorrido completo y una pausa arriba y abajo.']},
patada:{n:'Patada de glúteo',steps:['Apoyado en la máquina o la polea con el torso ligeramente inclinado.','Lleva la pierna hacia atrás con la rodilla casi estirada.','Aprieta el glúteo y vuelve sin balancear.'],err:['Arquear la zona lumbar para subir más.','Balancear la pierna.'],safe:['Sube solo hasta donde el glúteo siga trabajando: si notas la zona lumbar, ya te has pasado.']},
abductor:{n:'Abductores y aductores',steps:['Sentado con la espalda apoyada.','Abre (o cierra) las piernas con control.','Vuelve despacio.'],err:['Usar demasiado peso con tirones.'],safe:['Empieza ligero: son músculos pequeños que se cargan fácil.']},
plancha:{n:'Plancha',steps:['Antebrazos en el suelo, codos bajo los hombros, cuerpo en línea recta.','Aprieta abdomen y glúteos; empuja el suelo con los antebrazos.','Mantén la respiración normal.'],err:['Cadera caída (se carga la lumbar).','Cadera demasiado alta.'],safe:['Si sientes más la espalda que el abdomen, para o apoya las rodillas.']},
crunch:{n:'Crunch abdominal',steps:['Tumbado, rodillas dobladas y pies en el suelo.','Sube solo los hombros, llevando las costillas hacia la pelvis.','Baja despacio sin descansar la cabeza del todo.'],err:['Tirar del cuello con las manos.','Sentarte entero (se carga la lumbar).'],safe:['Es un movimiento corto. No hace falta subir mucho.']},
colgado:{n:'Elevación de piernas o rodillas colgado',steps:['Cuelga de la barra con los hombros activos (no dejes caer los hombros hacia las orejas).','Sube las rodillas o las piernas sin balancear, llevando la pelvis hacia arriba.','Baja despacio.'],err:['Balancear el cuerpo.','Subir solo con la fuerza de la cadera.'],safe:['Si te duele la zona lumbar, flexiona las rodillas.']},
hiper:{n:'Extensión lumbar',steps:['Apoya las caderas en el almohadillado con los pies bien sujetos.','Baja el torso con la espalda recta.','Sube hasta que el cuerpo quede en línea, sin pasar de ahí.'],err:['Subir demasiado y arquear la espalda.','Usar impulso.'],safe:['Termina con el cuerpo recto, no hiperextendido.','Si tienes dolor lumbar, hazlo solo con tu peso y consulta con un profesional.']},
pullover:{n:'Pullover',steps:['Tumbado en un banco con una mancuerna sujeta con ambas manos sobre el pecho.','Baja el peso por detrás de la cabeza con los brazos casi rectos.','Sube hasta quedar sobre el pecho.'],err:['Bajar mucho y arquear la espalda.'],safe:['Peso moderado y recorrido cómodo para el hombro.']},
granjero:{n:'Paseo del granjero',steps:['Coge dos pesos y camina erguido con los hombros hacia abajo.','Pasos cortos y firmes, sin balancear.'],err:['Inclinarte hacia un lado.'],safe:['Elige un peso que puedas mantener 30–40 segundos con buena postura.']},
jalonrecto:{n:'Jalón con brazos rectos',steps:['De pie frente a la polea alta, con el torso algo inclinado y los brazos casi rectos.','Baja la barra hacia los muslos moviendo los brazos desde el hombro, con los codos apenas flexionados.','Siente el dorsal y vuelve despacio hasta arriba.'],err:['Doblar los codos y convertirlo en un press de tríceps.','Balancear el tronco.'],safe:['Peso moderado: es un ejercicio de control, no de carga.']},
muneca:{n:'Curl de muñeca',steps:['Antebrazos apoyados en un banco o en los muslos, con las muñecas fuera del borde.','Sube la barra solo con la muñeca.','Baja despacio hasta notar el estiramiento.'],err:['Mover los antebrazos.','Usar demasiado peso con recorrido corto.'],safe:['Peso ligero y muchas repeticiones: las muñecas y los tendones se cargan fácil.']},
deadbug:{n:'Dead bug',steps:['Tumbado boca arriba con los brazos hacia el techo y las rodillas dobladas a 90°.','Pega la zona lumbar al suelo y baja a la vez un brazo y la pierna contraria.','Vuelve al centro y cambia de lado, sin que la espalda se despegue del suelo.'],err:['Arquear la zona lumbar.','Ir demasiado rápido.'],safe:['Es muy seguro para la espalda. Si se arquea, acorta el recorrido.']},
rueda:{n:'Rueda abdominal',steps:['De rodillas, con las manos en la rueda justo bajo los hombros y la espalda neutra.','Estira los brazos hacia delante, rodando solo hasta donde puedas mantener la espalda sin arquear.','Vuelve contrayendo el abdomen.'],err:['Dejar caer la cadera y arquear la lumbar.','Rodar demasiado lejos.'],safe:['Empieza con recorridos cortos, cerca de una pared. Es un ejercicio exigente para la lumbar: si te duele la espalda, deja este ejercicio.']},
rotacion:{n:'Core con giro o anti-giro',steps:['Colócate estable, con el abdomen apretado y la espalda recta.','El movimiento sale del tronco, no solo de los brazos; en el Pallof, la gracia es no dejar que la goma te gire.','Controla el regreso sin impulso.'],err:['Usar el impulso de los brazos.','Redondear la espalda.','Ir demasiado rápido.'],safe:['Peso ligero y control. Para si notas dolor punzante en la espalda baja.']},
cali:{n:'Calistenia avanzada',steps:['Antes de intentarlo, domina las bases: dominadas, fondos y plancha con buena técnica.','Trabaja por progresiones (versiones más fáciles) y no saltes etapas.','Calienta muñecas, hombros y codos antes de empezar.'],err:['Intentar la versión completa sin las progresiones.','Balancearte para compensar la falta de fuerza.'],safe:['Estos ejercicios cargan mucho hombros, codos y muñecas: progresa despacio y, si puedes, con supervisión.']}
};

/* ---- patrón de cada ejercicio ---- */
var MAP=[
 [/^press-(banca|cerrado|pecho|declinado)|^press-banca/,'press'],[/^press-inclinado|^cruce-poleas-alto/,'inclinado'],
 [/^reverse-fly/,'pajaros'],[/^aperturas|^pec-deck/,'aperturas'],[/^cruce-poleas/,'cruce'],[/^flexiones/,'flexion'],[/^fondos/,'fondos'],[/^(muscle-up|l-sit|front-lever|handstand)/,'cali'],
 [/^pullover/,'pullover'],[/^dominadas/,'dominada'],[/^jalon-brazos-rectos/,'jalonrecto'],[/^jalon/,'jalon'],
 [/^remo-(sentado|una-mano-polea|maquina|invertido)|^remo-una-mano-polea/,'remopolea'],[/^remo/,'remo'],
 [/^curl-nordico/,'curlpierna'],[/^peso-muerto|^rack-pull|^buenos-dias/,'bisagra'],
 [/^face-pull/,'facepull'],[/^press-(militar|hombro|arnold)/,'pressh'],[/^elevacion-lateral/,'lateral'],[/^elevacion-frontal/,'frontal'],[/^pajaros/,'pajaros'],
 [/^encogimientos/,'encoger'],[/^curl-muneca/,'muneca'],[/^curl-(barra|mancuernas|inclinado|martillo|predicador|polea|concentrado|arana|inverso|muneca)/,'curl'],
 [/^skullcrusher|^press-cerrado|^extension-triceps-mancuerna/,'skull'],[/^extension-triceps|^patada-triceps/,'triceps'],
 [/^sentadilla-goblet/,'goblet'],[/^sentadilla|^hack-squat/,'sentadilla'],[/^prensa|^gemelos-prensa/,'prensa'],
 [/^zancadas|^step-up|^sentadilla-bulgara/,'zancada'],[/^extension-cuadriceps/,'extensionpierna'],[/^curl-femoral/,'curlpierna'],
 [/^hip-thrust/,'puente'],[/^puente-gluteo/,'puentesuelo'],[/^gluteo-maquina|^patada-gluteo/,'patada'],[/^abduc|^aduc|^abductores|^aductores/,'abductor'],
 [/^gemelos/,'gemelo'],[/^extension-lumbar|^superman/,'hiper'],[/^plancha/,'plancha'],[/^dead-bug/,'deadbug'],[/^rueda/,'rueda'],[/^(giro-ruso|pallof|lenador)/,'rotacion'],
 [/^crunch/,'crunch'],[/^elevacion-(piernas|rodillas)/,'colgado'],[/^paseo-granjero/,'granjero']
];
// excepciones por id
var FIX={'press-cerrado':'press','sentadilla-bulgara':'zancada','sentadilla-frontal':'sentadilla','step-up':'zancada'};
var SMALLTXT={
 pecho:'Pecho: baja los hombros y junta los omóplatos antes de empezar.',
 espalda:'Espalda: piensa en tirar con los codos, no con las manos.'
};
function patOf(ex){
  var id=(ex&&ex.id)||'';
  if(FIX[id])return FIX[id];
  for(var i=0;i<MAP.length;i++)if(MAP[i][0].test(id))return MAP[i][1];
  return null;
}
function info(key){return T[key]||null;}

/* ---- figura animada ---- */
var raf=0,cur=null;
function figure(key){
  var pat=P[key];if(!pat)return '';
  return '<svg class="fig" viewBox="0 -14 200 148" role="img" aria-label="Animación del movimiento" data-pat="'+key+'">'+draw(pat.A,pat.B,0,pat)+'</svg>';
}
function stop(){if(raf)cancelAnimationFrame(raf);raf=0;cur=null;}
function start(svg){
  stop();
  if(!svg)return;
  var pat=P[svg.getAttribute('data-pat')];if(!pat)return;
  var reduce=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(reduce){svg.innerHTML=draw(pat.A,pat.B,1,pat);return;}
  var t0=0,period=3200;
  cur=svg;
  function frame(ts){
    if(!cur||!document.body.contains(svg)){stop();return;}
    if(!t0)t0=ts;
    var ph=((ts-t0)%period)/period;           // 0..1
    var k=ph<0.1?0:ph<0.5?(ph-0.1)/0.4:ph<0.6?1:(1-(ph-0.6)/0.4); // pausa, ida, pausa, vuelta
    k=k*k*(3-2*k);
    svg.innerHTML=draw(pat.A,pat.B,k,pat);
    raf=requestAnimationFrame(frame);
  }
  raf=requestAnimationFrame(frame);
}
function still(key,t){var pat=P[key];if(!pat)return '';return '<svg class="fig" viewBox="0 -14 200 148" aria-hidden="true">'+draw(pat.A,pat.B,t==null?1:t,pat)+'</svg>';}
var HL={thigh:'sentadilla goblet prensa zancada extensionpierna bisagra puente puentesuelo curlpierna patada abductor',calf:'gemelo',
 torso:'press inclinado aperturas cruce flexion fondos jalon dominada remo remopolea pullover hiper plancha crunch colgado',
 shoulder:'pressh lateral frontal pajaros facepull encoger',upperarm:'curl triceps skull fondos press inclinado flexion',forearm:'granjero'};
Object.keys(HL).forEach(function(tag){HL[tag].split(' ').forEach(function(k){if(P[k])(P[k].hl=P[k].hl||[]).push(tag);});});
window.CF_TEC={still:still,patOf:patOf,info:info,figure:figure,start:start,stop:stop,keys:Object.keys(P)};
})();
