/* Asistente: crea una rutina a partir de objetivo, días, tiempo, material, nivel, sexo y otras actividades.
   Reglas fijas (sin IA). Expone window.CF_ASIS. */
(function(){
'use strict';
var GOALS={musculo:'Ganar músculo',grasa:'Perder grasa y tonificar',fuerza:'Ganar fuerza',salud:'Estar sano y activo'};
var GOAL_HELP={musculo:'Más masa muscular y mejor forma.',grasa:'Músculo firme y gasto de energía; la alimentación pesa mucho.',fuerza:'Levantar cada vez más peso en los básicos.',salud:'Cuerpo fuerte, menos dolores y más energía.'};
var EQUIP={gym:'Gimnasio completo',casa:'En casa o con mi material'};
var LEVEL={nuevo:'Nunca he entrenado',algo:'Algo de experiencia',exp:'Más de un año'};
var NAMES={nuevo:'principiante',algo:'intermedio',exp:'avanzado'};
var SEX={f:'Mujer',m:'Hombre',n:'Prefiero no decirlo'};
var GEAR={mancuernas:'Mancuernas',banco:'Banco o sofá estable',barra:'Barra con discos',banda:'Bandas elásticas / banda de glúteo',kettlebell:'Kettlebell',dominadas:'Barra de dominadas',trx:'Suspensión (TRX)'};
var KGS=[2,4,6,8,10,12,15,20];
var OTHER={
 pilates:{n:'Pilates',h:'Ya trabaja mucho el core: lo quito de tus sesiones.'},
 yoga:{n:'Yoga',h:'Suma movilidad; no cambia mucho la fuerza.'},
 hybrid:{n:'Clase tipo Hybrid / HIIT / CrossFit',h:'Cansa todo el cuerpo: bajo un poco el volumen y quito el core.'},
 boulder:{n:'Boulder / escalada',h:'Ya tira mucho de espalda, bíceps y antebrazo: reduzco tirones y equilibro con empuje y hombro posterior.'},
 running:{n:'Correr',h:'Cuido las piernas: menos cuádriceps, más glúteo, isquios y gemelos.'},
 bici:{n:'Ciclismo / spinning',h:'Cuido el cuádriceps, que ya trabaja mucho; refuerzo glúteo e isquios.'},
 natacion:{n:'Natación',h:'Cuido los hombros: menos empujes por encima de la cabeza.'},
 otra:{n:'Otra actividad',h:'Bajo un poco el volumen para que puedas recuperarte.'}
};

/* ---- candidatos por músculo, de mejor a peor ---- */
var POOL={
 'Pecho':{gym:['press-pecho-maquina','press-inclinado-mancuernas','press-banca-mancuernas','cruce-poleas','pec-deck','press-inclinado-maquina','aperturas-inclinadas-mancuernas','flexiones'],
          casa:['flexiones','press-banca-mancuernas','press-inclinado-mancuernas','aperturas-mancuernas','pullover-mancuerna']},
 'Espalda':{gym:['jalon-pecho-polea','remo-sentado-polea','remo-maquina','jalon-agarre-cerrado','remo-mancuerna','remo-una-mano-polea','jalon-dorsales-polea','jalon-brazos-rectos'],
          casa:['remo-mancuerna','remo-invertido','dominadas-neutras','dominadas','pullover-mancuerna','superman']},
 'Hombros':{gym:['press-hombro-maquina','elevacion-lateral-mancuernas','face-pull','elevacion-lateral-polea','pajaros-mancuernas','press-militar-mancuernas','reverse-fly-maquina','press-arnold'],
          casa:['press-militar-mancuernas','elevacion-lateral-mancuernas','pajaros-mancuernas','press-arnold','elevacion-frontal-mancuernas']},
 'Cuádriceps':{gym:['prensa','sentadilla-goblet','extension-cuadriceps','hack-squat','sentadilla-bulgara','zancadas','sentadilla-smith','step-up'],
          casa:['sentadilla-goblet','zancadas','sentadilla-bulgara','step-up','zancada-inversa','zancadas-caminando']},
 'Isquios':{gym:['curl-femoral-sentado','peso-muerto-rumano-mancuernas','curl-femoral-tumbado','peso-muerto-rumano','curl-femoral-de-pie'],
          casa:['peso-muerto-rumano-mancuernas','peso-muerto-rumano-unilateral','curl-nordico','puente-gluteo-unilateral']},
 'Glúteos':{gym:['hip-thrust-maquina','hip-thrust-barra','zancada-inversa','pull-through-polea','gluteo-maquina','patada-gluteo-polea','peso-muerto-rumano-unilateral','peso-muerto-sumo'],
          casa:['hip-thrust-mancuerna','puente-gluteo','hip-thrust-unilateral','puente-gluteo-unilateral','puente-gluteo-elevado','zancada-inversa','puente-gluteo-banda','hip-thrust-banda','patada-gluteo-cuadrupedia','patada-burro','patada-gluteo-banda','peso-muerto-rumano-unilateral']},
 'Abductores':{gym:['abductores-maquina','abduccion-polea','caminata-lateral-banda','almeja-banda'],
          casa:['hidrante','almeja-banda','caminata-lateral-banda','patada-gluteo-banda']},
 'Bíceps':{gym:['curl-mancuernas','curl-polea','curl-martillo-mancuerna','curl-inclinado-mancuerna','curl-predicador-maquina'],
          casa:['curl-mancuernas','curl-martillo-mancuerna','curl-concentrado','curl-inclinado-mancuerna']},
 'Tríceps':{gym:['extension-triceps-polea','extension-triceps-sobre-cabeza-polea','extension-triceps-maquina','patada-triceps','fondos-banco'],
          casa:['extension-triceps-mancuerna','patada-triceps','fondos-banco']},
 'Gemelos':{gym:['gemelos-pie','gemelos-sentado','gemelos-prensa','gemelos-escalon'],casa:['gemelos-escalon']},
 'Core':{gym:['plancha','crunch-polea','elevacion-rodillas-colgado','dead-bug','pallof-press','plancha-lateral','giro-ruso'],
          casa:['plancha','dead-bug','crunch','plancha-lateral','giro-ruso']}
};
var AVOID={
 back:['peso-muerto-rumano-mancuernas','peso-muerto-rumano','peso-muerto-rumano-unilateral','remo-barra','extension-lumbar','pull-through-polea','peso-muerto-sumo'],
 knees:['zancadas','zancadas-caminando','sentadilla-bulgara','step-up','extension-cuadriceps','sentadilla-goblet','hack-squat','zancada-inversa'],
 shoulders:['press-militar-mancuernas','press-hombro-maquina','aperturas-mancuernas','aperturas-inclinadas-mancuernas','elevacion-lateral-polea','fondos-banco','press-arnold']
};

/* ---- plantillas. m = ejercicios base de la sesión; x = qué ir añadiendo si sobra tiempo ---- */
function S(n,k,m,x){return {n:n,k:k,m:m,x:x||[]};}
var XP={push:['Hombros','Tríceps','Pecho','Hombros','Core'],pull:['Espalda','Bíceps','Hombros','Espalda','Core'],piernas:['Glúteos','Gemelos','Isquios','Cuádriceps','Core'],full:['Hombros','Glúteos','Core','Gemelos','Bíceps','Tríceps']};
var TPL={
 1:[S('Cuerpo completo','push',['Cuádriceps','Pecho','Espalda','Isquios','Hombros','Glúteos','Bíceps','Tríceps','Core'],XP.full)],
 2:[S('Cuerpo completo A','push',['Cuádriceps','Pecho','Espalda','Isquios','Hombros','Core'],XP.full),
    S('Cuerpo completo B','pull',['Glúteos','Espalda','Pecho','Cuádriceps','Bíceps','Tríceps','Gemelos'],XP.full)],
 3:[S('Cuerpo completo A','push',['Cuádriceps','Pecho','Espalda','Isquios','Hombros','Core'],XP.full),
    S('Cuerpo completo B','pull',['Glúteos','Espalda','Pecho','Cuádriceps','Bíceps','Tríceps','Gemelos'],XP.full),
    S('Cuerpo completo C','piernas',['Cuádriceps','Espalda','Pecho','Isquios','Hombros','Tríceps','Core'],XP.full)],
 4:[S('Superior 1','push',['Pecho','Espalda','Hombros','Tríceps','Bíceps','Core'],XP.push),
    S('Inferior 1','piernas',['Cuádriceps','Isquios','Glúteos','Gemelos','Core'],XP.piernas),
    S('Superior 2','pull',['Espalda','Pecho','Hombros','Bíceps','Tríceps'],XP.pull),
    S('Inferior 2','piernas',['Isquios','Glúteos','Cuádriceps','Gemelos','Core'],XP.piernas)],
 5:[S('Empuje (pecho y hombro)','push',['Pecho','Hombros','Tríceps','Pecho'],XP.push),
    S('Tirón (espalda y bíceps)','pull',['Espalda','Espalda','Bíceps','Core'],XP.pull),
    S('Piernas','piernas',['Cuádriceps','Isquios','Glúteos','Gemelos'],XP.piernas),
    S('Superior','push',['Espalda','Pecho','Hombros','Bíceps','Tríceps'],XP.push),
    S('Inferior y core','piernas',['Isquios','Glúteos','Cuádriceps','Gemelos','Core'],XP.piernas)],
 6:[S('Empuje A','push',['Pecho','Hombros','Tríceps','Pecho'],XP.push),
    S('Tirón A','pull',['Espalda','Espalda','Bíceps','Hombros'],XP.pull),
    S('Piernas A','piernas',['Cuádriceps','Isquios','Glúteos','Gemelos'],XP.piernas),
    S('Empuje B','push',['Hombros','Pecho','Tríceps','Hombros'],XP.push),
    S('Tirón B','pull',['Espalda','Espalda','Bíceps','Core'],XP.pull),
    S('Piernas B','piernas',['Isquios','Glúteos','Cuádriceps','Gemelos','Core'],XP.piernas)]
};
/* Mujer: más peso del trabajo en glúteo y tren inferior (mayor tolerancia al volumen y objetivo habitual),
   glúteo entrenado 2–3 veces por semana con ejercicios distintos, y tren superior bien repartido. */
var XF={g:['Glúteos','Abductores','Isquios','Core','Gemelos','Cuádriceps'],u:['Hombros','Espalda','Glúteos','Tríceps','Bíceps','Core'],full:['Glúteos','Abductores','Hombros','Core','Gemelos','Bíceps']};
var TPLF={
 1:[S('Glúteo y cuerpo completo','piernas',['Glúteos','Cuádriceps','Isquios','Espalda','Pecho','Hombros','Abductores','Core'],XF.full)],
 2:[S('Glúteo y piernas','piernas',['Glúteos','Cuádriceps','Isquios','Espalda','Pecho','Core'],XF.full),
    S('Glúteo y cuerpo completo','pull',['Glúteos','Espalda','Hombros','Isquios','Pecho','Abductores','Core'],XF.full)],
 3:[S('Glúteo y piernas','piernas',['Glúteos','Cuádriceps','Isquios','Glúteos','Core'],XF.g),
    S('Superior y glúteo','pull',['Espalda','Pecho','Hombros','Glúteos','Bíceps','Tríceps'],XF.u),
    S('Glúteo e isquios','piernas',['Glúteos','Isquios','Cuádriceps','Abductores','Espalda','Core'],XF.g)],
 4:[S('Glúteo y piernas 1','piernas',['Glúteos','Cuádriceps','Isquios','Glúteos','Gemelos','Core'],XF.g),
    S('Superior 1','push',['Espalda','Pecho','Hombros','Tríceps','Bíceps'],XF.u),
    S('Glúteo y piernas 2','piernas',['Isquios','Glúteos','Cuádriceps','Abductores','Glúteos','Core'],XF.g),
    S('Superior 2 y glúteo','pull',['Espalda','Hombros','Pecho','Bíceps','Glúteos'],XF.u)],
 5:[S('Glúteo y piernas 1','piernas',['Glúteos','Cuádriceps','Isquios','Glúteos','Gemelos'],XF.g),
    S('Superior 1','push',['Espalda','Pecho','Hombros','Tríceps','Bíceps'],XF.u),
    S('Glúteo y isquios','piernas',['Glúteos','Isquios','Abductores','Cuádriceps','Core'],XF.g),
    S('Superior 2','pull',['Espalda','Hombros','Pecho','Bíceps','Tríceps'],XF.u),
    S('Glúteo y core','piernas',['Glúteos','Cuádriceps','Glúteos','Abductores','Core'],XF.g)],
 6:[S('Glúteo 1','piernas',['Glúteos','Cuádriceps','Isquios','Glúteos','Core'],XF.g),
    S('Superior 1','push',['Espalda','Pecho','Hombros','Tríceps','Bíceps'],XF.u),
    S('Piernas y glúteo','piernas',['Cuádriceps','Isquios','Glúteos','Gemelos','Abductores'],XF.g),
    S('Superior 2','pull',['Espalda','Hombros','Pecho','Bíceps','Tríceps'],XF.u),
    S('Glúteo 2','piernas',['Isquios','Glúteos','Abductores','Glúteos','Core'],XF.g),
    S('Cuerpo completo ligero','pull',['Espalda','Pecho','Cuádriceps','Glúteos','Hombros','Core'],XF.full)]
};

/* ---- tiempo: lo que cuesta de verdad una serie (ejecución + descanso) ---- */
var WARM=5;
function setMin(ex,rest){return ex.t==='C'?(rest?2.7:3.0):(rest?1.8:2.1);}
function minutes(items,exOf){
  var m=WARM;
  items.forEach(function(it){var ex=exOf(it.id);m+=(ex.grp==='Cardio')?(it.cmin||10):it.sets*setMin(ex);});
  return Math.round(m);
}

function repsFor(goal,ex,o){
  o=o||{};
  if(ex.id==='plancha'||ex.id==='plancha-lateral')return '30–45 s';
  if(ex.id==='dead-bug')return '8–10';
  var c=ex.t==='C',r;
  if(goal==='fuerza')r=c?'5–8':'8–12';
  else if(goal==='grasa')r=c?'10–15':'12–15';
  else if(goal==='salud')r=c?'10–12':'12–15';
  else r=c?'8–12':'10–15';
  if(o.light&&ex.eq!=='Peso corporal')r=c?'15–20':'15–25';
  else if(o.f&&ex.grp==='Glúteos'&&!c)r='12–20';
  else if(o.f&&ex.grp==='Glúteos'&&c&&goal!=='fuerza'&&ex.eq!=='Peso corporal'&&ex.eq!=='Banda')r='8–12';
  if(ex.eq==='Banda'||(ex.eq==='Peso corporal'&&ex.grp==='Glúteos'&&!c))r='12–20';
  if(/unilateral|bulgara|zancada|step-up|patada|hidrante|almeja|burro/.test(ex.id)&&!/triceps/.test(ex.id))r+=' por lado';
  return r;
}
function parseGear(q){
  var g={},src=q.gear||{};
  Object.keys(GEAR).forEach(function(k){g[k]=!!src[k];});
  var kg=+q.kg||0,t=String(q.gearText||'').toLowerCase();
  if(t){
    if(/mancuerna|pesas|halter/.test(t))g.mancuernas=true;
    if(/banco|sof[aá]|step|esc[aá]l[oó]n|caj[oó]n/.test(t))g.banco=true;
    if(/barra (ol|con disc|de disc)|discos|barra ol/.test(t))g.barra=true;
    if(/banda|goma|el[aá]stic|miniband|mini band/.test(t))g.banda=true;
    if(/kettlebell|pesa rusa/.test(t))g.kettlebell=true;
    if(/dominadas|barra fija/.test(t))g.dominadas=true;
    if(/trx|suspensi/.test(t))g.trx=true;
    var m,re=/(\d+(?:[.,]\d+)?)\s*kg/g;while((m=re.exec(t))){var v=parseFloat(m[1].replace(',','.'));if(v>kg&&v<=60)kg=v;}
  }
  if(g.kettlebell)g.mancuernas=true;
  g.kgMax=kg;
  return g;
}
function needs(id,ex){
  var r=[];
  if(ex.eq==='Mancuerna')r.push('mancuernas');
  if(ex.eq==='Banda')r.push('banda');
  if(ex.eq==='Barra')r.push('barra');
  if(ex.eq==='Polea'||ex.eq==='Máquina'||ex.eq==='Smith')r.push('gym');
  if(/^(press-banca-mancuernas|press-inclinado-mancuernas|aperturas|pullover|curl-inclinado|hip-thrust-mancuerna|hip-thrust-unilateral)/.test(id))r.push('banco');
  if(/^dominadas/.test(id))r.push('dominadas');
  return r;
}
function canUse(id,ex,g,gym){
  if(gym)return true;
  if(id==='remo-invertido')return g.dominadas||g.trx;
  return needs(id,ex).every(function(t){return t==='gym'?false:!!g[t];});
}
function actMods(q){
  var o=q.other||[],mod={drop:{},cut:{},addX:[],avoid:[],setsDelta:0,items:0,notes:[],n:o.length};
  o.forEach(function(k){
    if(!OTHER[k])return;
    mod.notes.push(OTHER[k].n);
    if(k==='pilates'){mod.drop['Core']=1;}
    if(k==='hybrid'){mod.drop['Core']=1;mod.setsDelta-=1;mod.items-=1;}
    if(k==='boulder'){mod.cut['Espalda']=1;mod.drop['Bíceps']=1;mod.drop['Antebrazo']=1;mod.addX=mod.addX.concat(['Hombros','Pecho']);mod.avoid=mod.avoid.concat(['dominadas','dominadas-supinas','dominadas-neutras','remo-barra','remo-pendlay','peso-muerto-barra','rack-pull','paseo-granjero','curl-barra','curl-barra-z']);}
    if(k==='running'||k==='bici'){mod.cut['Cuádriceps']=1;mod.addX=mod.addX.concat(['Gemelos']);}
    if(k==='natacion'){mod.avoid=mod.avoid.concat(AVOID.shoulders);}
    if(k==='otra'){mod.items-=1;}
  });
  if(q.otherN>=3)mod.setsDelta-=1;
  return mod;
}

function build(q,H){
  var exOf=H.exOf,has=H.has,days=Math.max(1,Math.min(6,q.days||3)),budget=Math.max(25,q.mins||60);
  var f=q.sex==='f',gym=(q.equip||'gym')==='gym'&&q.equip!=='casa',g=parseGear(q);
  if(q.equip==='mancuernas'){gym=false;g.mancuernas=true;g.banco=true;}
  var light=!gym&&g.mancuernas&&g.kgMax>0&&g.kgMax<=8;
  var mod=actMods(q);
  var avoid=mod.avoid.slice();['back','knees','shoulders'].forEach(function(k){if(q[k])avoid=avoid.concat(AVOID[k]);});
  var tpl=(f?TPLF:TPL)[days];
  var occ={},pid='a'+Date.now().toString(36);
  var base=q.level==='nuevo'?2:3;
  var maxS=Math.max(2,(q.level==='nuevo'?3:q.level==='algo'?4:5)+mod.setsDelta);
  var minItems=Math.max(4,Math.round(budget/8)+mod.items),maxItems=Math.max(minItems+1,Math.round(budget/5.6)+mod.items);
  var wantCore=!!q.core&&!mod.drop['Core'];
  var skipped={};
  function pickFor(m,seen){
    var L=(POOL[m]||{})[gym?'gym':'casa']||[];
    var pool=L.filter(function(id){if(!has(id)||avoid.indexOf(id)>=0)return false;return canUse(id,exOf(id),g,gym);});
    if(!gym&&g.mancuernas&&light){ // con mancuernas ligeras, prioriza los ejercicios a una pierna/brazo
      pool=pool.filter(function(id){return /unilateral|bulgara|zancada|step-up|goblet/.test(id);}).concat(pool.filter(function(id){return !/unilateral|bulgara|zancada|step-up|goblet/.test(id);}));
    }
    if(!pool.length)return null;
    var o=occ[m]||0;occ[m]=o+1;
    for(var j=0;j<pool.length;j++){var c=pool[(o+j)%pool.length];if(!seen[c])return c;}
    return null;
  }
  function mk(id){var ex=exOf(id);return {id:id,sets:base,reps:repsFor(q.goal,ex,{f:f,light:light}),last:null,note:''};}
  var sessions=tpl.map(function(s,si){
    var items=[],seen={},cutDone={};
    s.m.forEach(function(m){
      if(mod.drop[m]){skipped[m]=1;return;}
      if(mod.cut[m]){cutDone[m]=(cutDone[m]||0)+1;if(cutDone[m]>1){skipped[m]=1;return;}}
      var id=pickFor(m,seen);if(!id)return;seen[id]=1;items.push(mk(id));
    });
    /* primero los grandes (compuestos), luego los pequeños; se respeta el orden de la plantilla dentro de cada grupo */
    var order=function(){items.sort(function(a,b){var ca=exOf(a.id).t==='C'?0:1,cb=exOf(b.id).t==='C'?0:1;return ca-cb;});};
    order();
    var xs=s.x.concat(mod.addX).filter(function(m){return !mod.drop[m]&&!mod.cut[m];});
    if(wantCore&&xs.indexOf('Core')<0)xs.unshift('Core');
    var xi=0,guard=0,lastAdded=null;
    function addX(){
      for(var n=0;n<xs.length;n++){
        var m=xs[(xi++)%xs.length];
        var id=pickFor(m,seen);if(!id)continue;
        seen[id]=1;var nw=mk(id);items.push(nw);order();lastAdded=nw;return true;
      }
      return false;
    }
    if(wantCore&&!items.some(function(it){return exOf(it.id).grp==='Core';}))addX();
    var t=function(){return minutes(items,exOf);};
    /* 1) si sobra tiempo, más ejercicios hasta el mínimo razonable */
    while(items.length<minItems&&t()+base*2<=budget&&guard++<20){if(!addX())break;}
    /* 2) más series en los compuestos y luego en el resto, hasta el tope */
    var added=true;guard=0;
    while(added&&guard++<60){
      added=false;
      var pri=items.filter(function(it){return it.sets<maxS;}).sort(function(a,b){return (exOf(a.id).t==='C'?0:1)-(exOf(b.id).t==='C'?0:1)||a.sets-b.sets;});
      for(var k=0;k<pri.length;k++){var cost=setMin(exOf(pri[k].id));if(t()+cost<=budget){pri[k].sets++;added=true;break;}}
    }
    /* 3) si todavía cabe, más ejercicios (con 2–3 series) hasta el límite */
    guard=0;
    while(items.length<maxItems&&t()+2*2<=budget&&guard++<20){
      var before=items.length;if(!addX())break;
      var last=lastAdded||items[items.length-1],lx=exOf(last.id);
      if(items.length>before&&t()>budget){ // no cabe: quítalo o recorta series
        var it=items.filter(function(i){return i.id===last.id;})[0];
        while(t()>budget&&it.sets>2)it.sets--;
        if(t()>budget){items.splice(items.indexOf(it),1);break;}
      }
    }
    /* 4) ajuste final por si nos pasamos */
    guard=0;
    while(t()>budget&&guard++<40){
      var big=items.slice().sort(function(a,b){return b.sets-a.sets;})[0];
      if(big.sets>2)big.sets--;else if(items.length>3)items.pop();else break;
    }
    /* mujeres: un set más en el glúteo principal si cabe */
    if(f){var gi=items.filter(function(it){return exOf(it.id).grp==='Glúteos'&&exOf(it.id).t==='C'&&it.sets<maxS;})[0];if(gi&&t()+setMin(exOf(gi.id))<=budget)gi.sets++;}
    if(items.length){
      items[0].note=q.level==='nuevo'?'Empieza con un peso ligero. Termina cada serie sintiendo que podrías hacer 3 repeticiones más.':'Termina cada serie con 1–3 repeticiones en reserva.';
    }
    items.forEach(function(it){
      if(it.id==='remo-invertido')it.note=(it.note?it.note+' ':'')+(g.trx?'Con la suspensión, cuerpo inclinado.':'Hazlo bajo una barra baja o una mesa muy resistente.');
      if(!gym&&it.id==='sentadilla-goblet'&&!g.mancuernas)it.note=(it.note?it.note+' ':'')+'Sin peso o con una mochila cargada.';
      if(!gym&&light&&exOf(it.id).eq==='Mancuerna'&&it===items.filter(function(x){return exOf(x.id).eq==='Mancuerna';})[0])it.note=(it.note?it.note+' ':'')+'Con mancuernas ligeras: más repeticiones, ritmo lento (3 s bajando) y pausa de 1 s.';
      if(/unilateral|bulgara|zancada|step-up/.test(it.id)&&!it.note)it.note='Empieza por la pierna más débil.';
    });
    var mu=[];s.m.concat(s.x.slice(0,0)).forEach(function(m){if(mu.indexOf(m)<0&&!mod.drop[m])mu.push(m);});
    return {key:pid+'-'+(si+1),name:s.n,kind:s.k,focus:mu.join(', ')+' · unos '+minutes(items,exOf)+' min',items:items};
  });
  var est=sessions.map(function(s){return minutes(s.items,exOf);});
  var why=[];
  why.push({e:'freq',x:days===1?'Con 1 día por semana, la sesión trabaja todo el cuerpo y cada músculo se entrena una vez por semana. Es el mínimo para mantener y progresar despacio; con 2 días notarías más resultados.':'Con '+days+' días por semana, '+(f?'repartimos glúteo y piernas en '+(days>=4?'dos o tres':'dos')+' sesiones con ejercicios distintos, y el resto de músculos se entrenan 2 veces.':(days<=3?'cada sesión trabaja todo el cuerpo y cada músculo se entrena 2–3 veces por semana.':days===4?'el cuerpo se reparte en tren superior e inferior y cada músculo se entrena 2 veces por semana.':'repartimos empuje, tirón y piernas, con trabajo extra de superior e inferior.'))});
  why.push({e:'vol',x:'Ajusté series y ejercicios a tus '+budget+' minutos: las sesiones salen de unos '+Math.min.apply(null,est)+' a '+Math.max.apply(null,est)+' minutos contando calentamiento y descansos (unos 2–3 minutos por serie en los ejercicios grandes).'});
  if(f)why.push({e:'sex',x:'Para mujer: más peso del trabajo en glúteo y piernas, que es donde suele estar el objetivo y donde se tolera más volumen. Las mujeres suelen recuperarse antes entre series, así que puedes descansar 1:30–2:00 en los ejercicios grandes. Entrena con peso real: levantar con carga también cuida los huesos. Si tu energía cambia a lo largo del mes, ajusta el peso ese día; no hace falta cambiar el plan.'});
  why.push({e:'fail',x:'No hace falta llegar al fallo. Termina las series con 1–3 repeticiones en reserva.'});
  why.push({e:'prog',x:'Cuando hagas todas las repeticiones del rango en todas las series con buena técnica, sube un poco el peso (unos 2,5 kg; 1 kg en mancuernas).'});
  why.push({e:'order',x:'Los ejercicios grandes van antes que los pequeños, cuando aún tienes energía.'});
  if(mod.notes.length){
    var ks=(q.other||[]).filter(function(k){return OTHER[k];});
    why.push({e:'other',x:'Como además haces '+mod.notes.join(' y ')+(q.otherN?' ('+q.otherN+(q.otherN>=3?' o más':'')+' veces por semana)':'')+', adapté la rutina: '+ks.map(function(k){return OTHER[k].h;}).join(' ')+' Intenta no poner una clase intensa el día antes de piernas.'});
    if(days+(q.otherN||ks.length)>6)why.push({e:'rest',x:'Entre gimnasio y '+mod.notes.join(' / ')+' sumas más de 6 días de actividad. Deja al menos un día entero de descanso o baja un día de gimnasio.'});
  }
  if(!gym){
    var have=Object.keys(GEAR).filter(function(k){return g[k];}).map(function(k){return GEAR[k].toLowerCase();});
    why.push({e:'gear',x:'Con tu material ('+(have.length?have.join(', '):'solo tu cuerpo')+(g.kgMax?', mancuernas de hasta '+g.kgMax+' kg':'')+') elegí ejercicios que puedes hacer en casa.'+(light?' Con mancuernas ligeras usé más repeticiones y ejercicios a una pierna o un brazo para que siga costando.':'')});
  }
  if(skipped['Core']&&q.other&&q.other.length)why.push({e:'core',x:'Quité el core de tus sesiones porque ya lo trabajas en tu otra actividad. Si lo echas de menos, pulsa «Añadir core» en el plan.'});
  var extra='';
  if(q.goal==='grasa')extra=' Para bajar grasa, lo que más pesa es la alimentación (déficit moderado y proteína suficiente) y moverte a diario; el músculo que mantienes con estas sesiones es lo que se queda.';
  if(q.goal==='salud')extra=' Suma caminar a paso ligero 150 minutos a la semana, que es la recomendación general de actividad física.';
  var nm=GOALS[q.goal]+' · '+(days===1?'1 día':days+' días')+' · '+budget+' min'+(f?' · glúteo':'');
  var gearTxt=(q.gearText||'').trim();
  return {est:est,plan:{id:pid,name:nm,note:GOALS[q.goal]+', '+(days===1?'1 día':days+' días')+' por semana, '+budget+' minutos, nivel '+NAMES[q.level]+'. Creado con el asistente: es un punto de partida, ajústalo a tus sensaciones.'+(gearTxt?' Material: '+gearTxt.slice(0,160)+'.':'')+extra,sessions:sessions,gen:{asis:true,goal:q.goal,days:days,mins:budget,equip:gym?'gym':'casa',level:q.level,sex:q.sex||'n',gear:g,other:q.other||[],otherN:q.otherN||0,core:!!q.core,cardio:!!q.cardio,light:light,f:f,back:!!q.back,knees:!!q.knees,shoulders:!!q.shoulders},why:why,created:new Date().toISOString()}};
}

/* ---- personalizar una rutina ya creada: añadir core o cardio ---- */
var CARDIO={gym:['cinta-inclinada','bicicleta-estatica','eliptica','escaladora','remo-ergometro'],casa:['caminata-rapida','comba','saltos-tijera']};
function genOf(plan){var g=(plan&&plan.gen)||{};return {gym:(g.equip||'gym')!=='casa',gear:g.gear||{},goal:g.goal||'musculo',level:g.level||'algo',f:!!g.f,light:!!g.light};}
function addCore(sess,H,plan){
  var g=genOf(plan),L=POOL.Core[g.gym?'gym':'casa'];
  var have={};sess.items.forEach(function(it){have[it.id]=1;});
  for(var i=0;i<L.length;i++){
    var id=L[i];if(have[id]||!H.has(id))continue;
    var ex=H.exOf(id);if(!canUse(id,ex,g.gear,g.gym))continue;
    sess.items.push({id:id,sets:3,reps:repsFor(g.goal,ex,{f:g.f,light:g.light}),last:null,note:''});
    return id;
  }
  return null;
}
function addCardio(sess,H,plan,idx){
  var g=genOf(plan),cur=null;
  sess.items.forEach(function(it){if(H.exOf(it.id).grp==='Cardio')cur=it;});
  if(cur){ // ya hay cardio: sube 5 minutos (máximo 30)
    var m=(cur.cmin||10);if(m>=30)return null;
    cur.cmin=m+5;cur.reps=cur.cmin+' min';return cur.id;
  }
  var L=CARDIO[g.gym?'gym':'casa'];
  for(var k=0;k<L.length;k++){
    var id=L[(k+(idx||0))%L.length];if(!H.has(id))continue;
    sess.items.push({id:id,sets:1,reps:'10 min',cmin:10,last:null,note:'Ritmo moderado: que puedas hablar con algo de esfuerzo.'});
    return id;
  }
  return null;
}
window.CF_ASIS={addCore:addCore,addCardio:addCardio,AVOID:AVOID,GOALS:GOALS,GOAL_HELP:GOAL_HELP,EQUIP:EQUIP,LEVEL:LEVEL,SEX:SEX,GEAR:GEAR,KGS:KGS,OTHER:OTHER,POOL:POOL,build:build,minutes:minutes,setMin:setMin,repsFor:repsFor,parseGear:parseGear,canUse:canUse};
})();
