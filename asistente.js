/* Asistente: crea una rutina a partir de objetivo, días, tiempo, material y nivel.
   Reglas fijas (sin IA). Expone window.CF_ASIS. */
(function(){
'use strict';
var GOALS={musculo:'Ganar músculo',grasa:'Perder grasa y tonificar',fuerza:'Ganar fuerza',salud:'Estar sano y activo'};
var GOAL_HELP={musculo:'Más masa muscular y mejor forma.',grasa:'Músculo firme y gasto de energía; la alimentación pesa mucho.',fuerza:'Levantar cada vez más peso en los básicos.',salud:'Cuerpo fuerte, menos dolores y más energía.'};
var EQUIP={gym:'Gimnasio completo',mancuernas:'Solo mancuernas y banco',casa:'En casa, sin material'};
var LEVEL={nuevo:'Nunca he entrenado',algo:'Algo de experiencia',exp:'Más de un año'};
var NAMES={nuevo:'principiante',algo:'intermedio',exp:'avanzado'};

var POOL={
 'Pecho':{gym:['press-pecho-maquina','press-inclinado-mancuernas','press-banca-mancuernas','cruce-poleas'],mancuernas:['press-banca-mancuernas','press-inclinado-mancuernas','aperturas-mancuernas'],casa:['flexiones']},
 'Espalda':{gym:['jalon-pecho-polea','remo-sentado-polea','remo-maquina','jalon-agarre-cerrado'],mancuernas:['remo-mancuerna','pullover-mancuerna'],casa:['remo-invertido','superman']},
 'Hombros':{gym:['press-hombro-maquina','elevacion-lateral-mancuernas','face-pull','elevacion-lateral-polea'],mancuernas:['press-militar-mancuernas','elevacion-lateral-mancuernas','pajaros-mancuernas'],casa:[]},
 'Cuádriceps':{gym:['prensa','sentadilla-goblet','extension-cuadriceps','hack-squat'],mancuernas:['sentadilla-goblet','zancadas','sentadilla-bulgara'],casa:['sentadilla-goblet','zancadas','step-up']},
 'Isquios':{gym:['curl-femoral-sentado','peso-muerto-rumano-mancuernas','curl-femoral-tumbado'],mancuernas:['peso-muerto-rumano-mancuernas'],casa:['puente-gluteo']},
 'Glúteos':{gym:['hip-thrust-maquina','gluteo-maquina','patada-gluteo-polea'],mancuernas:['puente-gluteo','sentadilla-bulgara'],casa:['puente-gluteo']},
 'Bíceps':{gym:['curl-mancuernas','curl-polea','curl-martillo-mancuerna'],mancuernas:['curl-mancuernas','curl-martillo-mancuerna'],casa:[]},
 'Tríceps':{gym:['extension-triceps-polea','extension-triceps-sobre-cabeza-polea'],mancuernas:['extension-triceps-mancuerna','patada-triceps'],casa:['fondos-banco']},
 'Gemelos':{gym:['gemelos-pie','gemelos-sentado','gemelos-prensa'],mancuernas:['gemelos-escalon'],casa:['gemelos-escalon']},
 'Core':{gym:['plancha','crunch-polea','elevacion-rodillas-colgado','dead-bug'],mancuernas:['plancha','dead-bug'],casa:['plancha','dead-bug','crunch']}
};
var AVOID={
 back:['peso-muerto-rumano-mancuernas','remo-barra','extension-lumbar'],
 knees:['zancadas','sentadilla-bulgara','step-up','extension-cuadriceps','sentadilla-goblet','hack-squat'],
 shoulders:['press-militar-mancuernas','press-hombro-maquina','aperturas-mancuernas','elevacion-lateral-polea','fondos-banco']
};
var TPL={
 2:[{n:'Cuerpo completo A',k:'push',m:['Cuádriceps','Pecho','Espalda','Isquios','Hombros','Core']},
    {n:'Cuerpo completo B',k:'pull',m:['Glúteos','Espalda','Pecho','Cuádriceps','Bíceps','Tríceps','Gemelos']}],
 3:[{n:'Cuerpo completo A',k:'push',m:['Cuádriceps','Pecho','Espalda','Isquios','Hombros','Core']},
    {n:'Cuerpo completo B',k:'pull',m:['Glúteos','Espalda','Pecho','Cuádriceps','Bíceps','Tríceps','Gemelos']},
    {n:'Cuerpo completo C',k:'piernas',m:['Cuádriceps','Espalda','Pecho','Isquios','Hombros','Tríceps','Core']}],
 4:[{n:'Superior 1',k:'push',m:['Pecho','Espalda','Hombros','Tríceps','Bíceps','Core']},
    {n:'Inferior 1',k:'piernas',m:['Cuádriceps','Isquios','Glúteos','Gemelos','Core']},
    {n:'Superior 2',k:'pull',m:['Espalda','Pecho','Hombros','Bíceps','Tríceps']},
    {n:'Inferior 2',k:'piernas',m:['Isquios','Glúteos','Cuádriceps','Gemelos','Core']}],
 5:[{n:'Empuje (pecho y hombro)',k:'push',m:['Pecho','Hombros','Tríceps','Pecho']},
    {n:'Tirón (espalda y bíceps)',k:'pull',m:['Espalda','Espalda','Bíceps','Core']},
    {n:'Piernas',k:'piernas',m:['Cuádriceps','Isquios','Glúteos','Gemelos']},
    {n:'Superior',k:'push',m:['Espalda','Pecho','Hombros','Bíceps','Tríceps']},
    {n:'Inferior y core',k:'piernas',m:['Isquios','Glúteos','Cuádriceps','Gemelos','Core']}]
};
function minutes(items,exOf){
  var m=5; // calentamiento
  items.forEach(function(it){var c=exOf(it.id).t==='C';m+=it.sets*(c?2.4:1.7);});
  return Math.round(m);
}
function repsFor(goal,ex){
  if(ex.id==='plancha')return '30–45 s';
  if(ex.id==='dead-bug')return '8–10';
  var c=ex.t==='C';
  if(goal==='fuerza')return c?'5–8':'8–12';
  if(goal==='grasa')return c?'10–15':'12–15';
  if(goal==='salud')return c?'10–12':'12–15';
  return c?'8–12':'10–15';
}
function build(q,H){
  var exOf=H.exOf,has=H.has,days=Math.max(2,Math.min(5,q.days)),budget=Math.max(25,q.mins)-0;
  var avoid=[];['back','knees','shoulders'].forEach(function(k){if(q[k])avoid=avoid.concat(AVOID[k]);});
  var occ={},pid='a'+Date.now().toString(36);
  var base=q.level==='nuevo'?2:3;
  var notes=[];
  var sessions=TPL[days].map(function(s,si){
    var items=[],seen={};
    s.m.forEach(function(m){
      var pool=((POOL[m]||{})[q.equip]||[]).filter(function(id){return has(id)&&avoid.indexOf(id)<0;});
      if(!pool.length)return;
      var o=occ[m]||0;occ[m]=o+1;
      var id=null;
      for(var j=0;j<pool.length;j++){var c=pool[(o+j)%pool.length];if(!seen[c]){id=c;break;}}
      if(!id)return;
      seen[id]=1;
      var ex=exOf(id);
      items.push({id:id,sets:base,reps:repsFor(q.goal,ex),last:null,note:''});
    });
    // ajustar al tiempo disponible
    while(minutes(items,exOf)>budget&&items.length>3)items.pop();
    var guard=0;
    while(minutes(items,exOf)>budget&&guard++<20){
      var big=items.slice().sort(function(a,b){return b.sets-a.sets;})[0];
      if(big.sets>2)big.sets--;else break;
    }
    guard=0;
    var maxS=q.level==='nuevo'?3:4;
    while(guard++<30){
      var cand=items.filter(function(it){return exOf(it.id).t==='C'&&it.sets<maxS;})[0];
      if(!cand||minutes(items,exOf)+2.4>budget)break;
      cand.sets++;
    }
    if(items.length){
      var first=items[0];
      first.note=q.level==='nuevo'?'Empieza con un peso ligero. Termina cada serie sintiendo que podrías hacer 3 repeticiones más.':'Termina cada serie con 1–3 repeticiones en reserva.';
    }
    items.forEach(function(it){
      if(it.id==='remo-invertido')it.note=(it.note?it.note+' ':'')+'Hazlo bajo una barra baja o una mesa muy resistente.';
      if(q.equip==='casa'&&it.id==='sentadilla-goblet')it.note=(it.note?it.note+' ':'')+'Sin peso o con una mochila cargada.';
    });
    var mu=[];s.m.forEach(function(m){if(mu.indexOf(m)<0)mu.push(m);});
    return {key:pid+'-'+(si+1),name:s.n,kind:s.k,focus:mu.join(', ')+' · unos '+minutes(items,exOf)+' min',items:items};
  });
  var est=sessions.map(function(s){return minutes(s.items,exOf);});
  var why=[];
  why.push({e:'freq',x:'Con '+days+' días por semana, '+(days<=3?'cada sesión trabaja todo el cuerpo y cada músculo se entrena 2–3 veces por semana.':days===4?'el cuerpo se reparte en tren superior e inferior y cada músculo se entrena 2 veces por semana.':'repartimos empuje, tirón y piernas, con trabajo extra de superior e inferior.')});
  why.push({e:'vol',x:'Ajusté series y ejercicios a tus '+q.mins+' minutos: las sesiones salen de unos '+Math.min.apply(null,est)+' a '+Math.max.apply(null,est)+' minutos contando calentamiento y descansos.'});
  why.push({e:'fail',x:'No hace falta llegar al fallo. Termina las series con 1–3 repeticiones en reserva.'});
  why.push({e:'prog',x:'Cuando hagas todas las repeticiones del rango en todas las series con buena técnica, sube un poco el peso (unos 2,5 kg; 1 kg en mancuernas).'});
  why.push({e:'order',x:'Los ejercicios grandes van antes que los pequeños, cuando aún tienes energía.'});
  var extra='';
  if(q.goal==='grasa')extra=' Para bajar grasa, lo que más pesa es la alimentación (déficit moderado y proteína suficiente) y moverte a diario; el músculo que mantienes con estas sesiones es lo que se queda.';
  if(q.goal==='salud')extra=' Suma caminar a paso ligero 150 minutos a la semana, que es la recomendación general de actividad física.';
  var nm=GOALS[q.goal]+' · '+days+' días · '+q.mins+' min';
  return {est:est,plan:{id:pid,name:nm,note:GOALS[q.goal]+', '+days+' días por semana, '+q.mins+' minutos, nivel '+NAMES[q.level]+'. Creado con el asistente: es un punto de partida, ajústalo a tus sensaciones.'+extra,sessions:sessions,gen:{asis:true,goal:q.goal,days:days,mins:q.mins,equip:q.equip,level:q.level},why:why,created:new Date().toISOString()}};
}
window.CF_ASIS={GOALS:GOALS,GOAL_HELP:GOAL_HELP,EQUIP:EQUIP,LEVEL:LEVEL,build:build,minutes:minutes};
})();
