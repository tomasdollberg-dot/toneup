/* Variantes por ejercicio: animación y texto propios cuando el gesto o el material cambian.
   Usa CF_TEC.def(id, patrónBase, {cambios de animación}, {steps, err, safe}). */
(function(){
'use strict';
var C=window.CF_TEC;if(!C||!C.def)return;
var P=C.P,FL=C.FLOOR-2,fl=[100,FL];
function d(id,base,o,s,e,f){C.def(id,base,o,{steps:s,err:e,safe:f});}

/* ===== animaciones que faltaban (no tenían dibujo) ===== */
P.jalonrecto={w:'cable',cx:150,cy:0,A:{h:[100,62],t:22,foot:fl,arm:[148,148]},B:{h:[100,62],t:22,foot:fl,arm:[14,14]}};
P.muneca={w:'bar',A:{h:[92,96],t:34,leg:[88,4],arm:[12,92]},B:{h:[92,96],t:34,leg:[88,4],arm:[12,118]}};
P.rueda={w:null,A:{h:[100,88],s:[118,56],leg:[0,-90],hand:[126,104],ad:-1},B:{h:[108,96],s:[148,98],leg:[10,-90],hand:[150,118],ad:-1}};
P.deadbug={w:null,A:{h:[100,116],t:-90,arm:[180,180],leg:[180,90],leg2:[180,90]},B:{h:[100,116],t:-90,arm:[-130,-130],leg:[106,100],leg2:[180,90]}};
P.rotacion={w:'cable',cx:190,cy:62,A:{h:[100,62],t:2,foot:[106,FL],foot2:[92,FL],hand:[124,44],ad:-1},B:{h:[100,62],t:2,foot:[106,FL],foot2:[92,FL],hand:[118,52],ad:-1}};
P.jalonrecto.hl=['torso'];P.rueda.hl=['torso'];P.deadbug.hl=['torso'];P.rotacion.hl=['torso'];P.muneca.hl=['forearm'];
C.keys.push('jalonrecto','muneca','rueda','deadbug','rotacion');
function ex(a,b){var o={};for(var k in a)o[k]=a[k];for(k in b)o[k]=b[k];return o;}

/* ===== CURL FEMORAL ===== */
d('curl-femoral-sentado','curlpierna',{},
 ['Siéntate con la espalda pegada al respaldo y ajusta el soporte para que el rodillo quede justo encima de los talones.','Baja la almohadilla del muslo para que te sujete la pierna y no se levante la cadera.','Dobla las rodillas llevando los talones hacia abajo y atrás hasta casi 90° o más.','Vuelve controlado, sin dejar que las placas se choquen.'],
 ['Despegar la cadera o los muslos del asiento.','Ir muy rápido y dejar caer el peso al volver.'],
 ['Sube y baja en 2 a 3 segundos: el músculo trabaja de forma segura cuando controlas la bajada.']);
d('curl-femoral-tumbado','curlpierna',{props:[['bench',56,104,96,10]],
 A:{h:[112,96],t:86,leg:[-90,-90],arm:[40,40]},B:{h:[112,96],t:86,leg:[-90,-160],arm:[40,40]}},
 ['Túmbate boca abajo en la máquina con las rodillas justo en el borde del banco y el rodillo encima de los talones.','Agarra las asas y mantén la cadera pegada al banco.','Dobla las rodillas llevando los talones hacia los glúteos.','Baja lento hasta casi estirar las piernas, sin que las placas descansen.'],
 ['Levantar la cadera del banco para subir más peso.','Arquear la zona lumbar al final del recorrido.'],
 ['Si notas que la zona lumbar se arquea, baja el peso: la cadera debe quedarse pegada al banco.']);
d('curl-femoral-de-pie','curlpierna',{props:[['rect',122,52,8,72]],
 A:{h:[100,62],t:4,foot:fl,leg2:[0,0],hand:[124,66],ad:-1},B:{h:[100,62],t:4,foot:fl,leg2:[-6,-140],hand:[124,66],ad:-1}},
 ['Colócate de pie frente a la máquina, apoyado en las asas y con el rodillo detrás del talón de la pierna que trabaja.','Mantén el muslo quieto y el abdomen apretado.','Dobla la rodilla llevando el talón hacia el glúteo.','Baja despacio hasta casi estirar la pierna y cambia de lado.'],
 ['Balancear la cadera o inclinarte hacia delante para ayudarte.','Subir el muslo en lugar de solo doblar la rodilla.'],
 ['Trabajas de una pierna cada vez: usa menos peso que sentado y apóyate bien con las manos.']);
d('curl-nordico','curlpierna',{props:[['rect',88,118,28,6],['rect',46,112,8,12]],
 A:{h:[100,90],t:2,leg:[2,-90]},B:{h:[121,100],t:62,leg:[-44,-90]}},
 ['Arrodíllate sobre una colchoneta con los pies bien sujetos (bajo una barra o con un compañero).','Mantén el cuerpo recto de rodillas a cabeza y el abdomen apretado.','Baja el cuerpo hacia delante lo más lento que puedas, frenando la caída con los isquios.','Cuando no puedas más, apóyate con las manos y empuja suave para volver a subir.'],
 ['Doblarte por la cadera en vez de mantener el cuerpo recto.','Dejarte caer de golpe.'],
 ['Es muy exigente para los isquios y los tendones de la rodilla: empieza con pocas repeticiones y solo la fase de bajada.']);

/* ===== CURL DE BÍCEPS ===== */
d('curl-barra','curl',{w:'bar'},
 ['De pie, pies a la anchura de los hombros, la barra en las manos con agarre por debajo (palmas hacia arriba), un poco más ancho que los hombros.','Codos pegados a las costillas y abdomen apretado.','Sube la barra doblando solo los codos hasta tenerla a la altura de los hombros.','Baja en 3 segundos hasta estirar casi del todo.'],
 ['Balancear el cuerpo hacia atrás para subir la barra.','Adelantar los codos al subir.'],
 ['Si necesitas balancearte, el peso es demasiado alto. Mantén las muñecas rectas, sin doblarlas hacia atrás.']);
d('curl-barra-z','curl',{w:'bar'},
 ['Coge la barra Z por las curvas interiores o exteriores, con las palmas mirando hacia arriba y en diagonal.','Codos pegados al cuerpo, hombros relajados.','Sube doblando solo los codos y aprieta el bíceps arriba.','Baja controlado hasta estirar los brazos.'],
 ['Balancear el tronco.','Subir los hombros al final del movimiento.'],
 ['La barra Z reduce la tensión en las muñecas y los codos: es una buena opción si el agarre recto te molesta.']);
d('curl-mancuernas','curl',{},
 ['De pie, una mancuerna en cada mano a los lados del cuerpo, palmas hacia delante.','Sube una mancuerna doblando el codo, girando la palma hacia ti al subir.','Aprieta arriba, baja lento y repite con el otro brazo (o sube los dos a la vez).'],
 ['Balancear el cuerpo.','Dejar que el codo se vaya hacia delante.'],
 ['Empieza con poco peso: cada brazo trabaja por separado y se nota si uno es más débil.']);
d('curl-inclinado-mancuerna','curl',{props:[['bar',58,62,92,100],['bench',84,104,34,6]],
 A:{h:[96,98],t:-38,foot:[116,FL],arm:[-12,-12]},B:{h:[96,98],t:-38,foot:[116,FL],arm:[-12,120]}},
 ['Siéntate en un banco inclinado a unos 45° con la espalda y los hombros apoyados y los brazos colgando detrás del cuerpo.','Con las palmas hacia delante, sube las mancuernas doblando solo los codos.','Baja despacio hasta estirar del todo: así notas el estiramiento del bíceps.'],
 ['Despegar los hombros del respaldo.','Cortar el recorrido abajo y no estirar el brazo.'],
 ['Empieza con poco peso: el bíceps trabaja muy estirado y es fácil pasarse.']);
d('curl-martillo-mancuerna','curl',{w:'dbv'},
 ['De pie con las mancuernas a los lados y las palmas mirando hacia el cuerpo (como sujetando un martillo).','Sube la mancuerna doblando solo el codo, sin girar la muñeca.','Aprieta arriba y baja lento.'],
 ['Balancear el cuerpo.','Girar la muñeca durante el movimiento.'],
 ['Trabaja el braquial y el antebrazo además del bíceps. Mantén las muñecas rectas.']);
d('curl-martillo-polea','curl',{w:'cable',cx:150,cy:124},
 ['Engancha una cuerda a la polea baja y sujétala con las palmas mirando hacia dentro.','Codos pegados al cuerpo y un paso atrás para tensar la polea.','Sube la cuerda doblando solo los codos y aprieta arriba.','Baja controlado sin soltar la tensión.'],
 ['Echar los codos hacia delante.','Dejar que la pila toque y se pierda la tensión.'],
 ['La polea mantiene tensión constante: elige un peso con el que puedas bajar en 3 segundos.']);
d('curl-polea','curl',{w:'cable',cx:150,cy:124},
 ['Sujeta la barra recta o la barra Z en la polea baja, con las palmas hacia arriba.','Da un paso atrás para tensar el cable, con los codos pegados al cuerpo.','Sube doblando solo los codos hasta los hombros.','Baja lento, sin soltar la tensión abajo.'],
 ['Inclinarte hacia atrás para subir.','Dejar caer el peso al bajar.'],
 ['Es una opción cómoda para las muñecas: el cable tira siempre en la misma línea.']);
d('curl-predicador-barra','curl',{props:[['bar',90,62,118,102],['bench',70,102,34,6]],
 A:{h:[84,96],t:10,leg:[88,4],arm:[42,42]},B:{h:[84,96],t:10,leg:[88,4],arm:[42,150]}},
 ['Siéntate en el banco predicador con la parte alta de los brazos apoyada completamente en la almohadilla.','Agarra la barra Z con las palmas hacia arriba.','Sube doblando solo los codos y aprieta arriba.','Baja despacio, deteniéndote antes de bloquear los codos del todo.'],
 ['Despegar los brazos de la almohadilla para tener más impulso.','Dejar caer la barra abajo y estirar de golpe.'],
 ['Evita estirar del todo los codos con el peso: la parte baja es donde más se tensa el tendón del bíceps.']);
d('curl-predicador-maquina','curl',{w:null,props:[['bar',90,62,118,102],['bench',70,102,34,6]],
 A:{h:[84,96],t:10,leg:[88,4],arm:[42,42]},B:{h:[84,96],t:10,leg:[88,4],arm:[42,150]}},
 ['Ajusta el asiento para que las axilas queden en el borde de la almohadilla y los brazos descansen encima.','Sujeta las asas con las palmas hacia arriba.','Sube las asas doblando los codos y aprieta el bíceps.','Baja controlado hasta casi estirar.'],
 ['Subir los hombros hacia las orejas.','Cortar el recorrido abajo.'],
 ['La máquina guía el movimiento: es muy buena para aprender a aislar el bíceps.']);
d('curl-concentrado','curl',{
 A:{h:[92,96],t:38,leg:[88,4],arm:[0,0]},B:{h:[92,96],t:38,leg:[88,4],arm:[0,138]}},
 ['Siéntate con las piernas abiertas e inclínate hacia delante.','Apoya el codo en la cara interna del muslo con el brazo colgando.','Sube la mancuerna hacia el hombro doblando solo el codo.','Aprieta arriba un segundo y baja lento.'],
 ['Mover el codo del muslo para hacer trampa.','Balancear el tronco.'],
 ['Usa un peso ligero: el objetivo es sentir el bíceps, no mover mucho peso.']);
d('curl-arana','curl',{props:[['bar',92,112,130,72]],
 A:{h:[84,84],t:58,foot:fl,arm:[0,0]},B:{h:[84,84],t:58,foot:fl,arm:[0,140]}},
 ['Túmbate boca abajo sobre un banco inclinado, con el pecho apoyado y los brazos colgando rectos hacia el suelo.','Sujeta las mancuernas con las palmas hacia delante.','Sube las mancuernas doblando solo los codos y aprieta arriba.','Baja controlado hasta estirar.'],
 ['Subir con impulso del tronco.','Mover los hombros hacia delante.'],
 ['El banco impide balancearte: usa un peso moderado y controla la subida.']);
d('curl-inverso','curl',{w:'bar'},
 ['De pie con la barra por encima de los muslos y las palmas hacia abajo.','Codos pegados a las costillas.','Sube la barra doblando solo los codos; las muñecas se mantienen firmes y rectas.','Baja lento hasta estirar.'],
 ['Doblar las muñecas hacia atrás para subir.','Usar demasiado peso.'],
 ['Trabaja antebrazo y braquial: usa menos peso que en el curl normal.']);

/* ===== PRESS DE PECHO ===== */
d('press-banca-barra','press',{},
 ['Túmbate con los ojos bajo la barra, los pies firmes y las escápulas juntas y hacia abajo.','Agarra la barra algo más ancha que los hombros y sácala del soporte con los brazos rectos.','Baja a la parte baja del pecho con los codos a unos 45° del cuerpo.','Empuja hacia arriba y un poco atrás hasta estirar los brazos.'],
 ['Rebotar la barra en el pecho.','Despegar los glúteos del banco.'],
 ['Pide a alguien que te ayude con la barra (o usa los topes de seguridad) cuando uses cargas altas.']);
d('press-banca-mancuernas','press',{w:'db'},
 ['Siéntate con las mancuernas en los muslos y túmbate, llevándolas a la altura del pecho.','Empuja hacia arriba hasta juntarlas suavemente, con los codos a unos 45°.','Baja controlado hasta que las mancuernas queden a los lados del pecho.'],
 ['Chocar las mancuernas arriba.','Abrir los codos mucho al bajar.'],
 ['Al terminar, no las tires al suelo: deja caer las rodillas sobre el pecho y suéltalas a los lados con cuidado.']);
d('press-banca-smith','press',{props:[['bench',34,96,86,8],['post',44,96],['bar',74,0,74,FL]],
 A:{h:[116,92],t:-90,foot:[132,FL],hand:[76,52],ad:-1},B:{h:[116,92],t:-90,foot:[132,FL],hand:[80,82],ad:-1}},
 ['Coloca el banco para que la barra baje justo sobre la parte baja del pecho.','Gira la barra para soltar el seguro y empuja hacia arriba.','Baja controlado hasta rozar el pecho y sube.','Al terminar, gira la barra para engancharla.'],
 ['Poner el banco mal alineado con la barra guiada.','Perder el control al bajar: aunque la barra va guiada, el hombro sigue trabajando.'],
 ['Aprovecha el seguro: puedes parar en cualquier punto sin ayuda.']);
d('press-cerrado','press',{},
 ['Túmbate como en el press normal, pero agarra la barra con las manos a la anchura de los hombros.','Baja con los codos pegados al cuerpo hasta rozar el pecho.','Empuja hacia arriba hasta estirar los brazos.'],
 ['Juntar demasiado las manos y forzar las muñecas.','Abrir los codos hacia fuera.'],
 ['Trabaja más el tríceps: las manos no deben estar pegadas, solo a la anchura de los hombros.']);
d('press-declinado-barra','press',{props:[['bench',60,106,70,8],['post',44,96]],
 A:{h:[120,90],s:[80,108],foot:[142,102],hand:[80,66],ad:-1},B:{h:[120,90],s:[80,108],foot:[142,102],hand:[84,90],ad:-1}},
 ['Túmbate en el banco declinado con los pies sujetos y las escápulas juntas.','Baja la barra a la parte baja del pecho.','Empuja hacia arriba hasta estirar los brazos.'],
 ['Rebotar la barra en el pecho.','Usar tanto peso que no puedas controlar la bajada.'],
 ['Mareos o presión en la cabeza: pasa a un banco menos inclinado. Pide ayuda con cargas altas.']);
d('press-declinado-mancuernas','press',{w:'db',props:[['bench',60,106,70,8]],
 A:{h:[120,90],s:[80,108],foot:[142,102],hand:[80,66],ad:-1},B:{h:[120,90],s:[80,108],foot:[142,102],hand:[84,90],ad:-1}},
 ['Túmbate en el banco declinado con las mancuernas sobre el pecho.','Baja controlado hasta los lados del pecho, codos a unos 45°.','Empuja hacia arriba juntando las mancuernas.'],
 ['Dejarlas caer demasiado.','Abrir los codos en exceso.'],
 ['Si sientes presión en la cabeza, usa menos inclinación.']);
d('press-pecho-maquina','press',{w:null,props:[['rect',82,54,8,50],['bench',74,100,34,6]],
 A:{h:[94,96],t:-6,leg:[88,4],hand:[96,62],ad:-1},B:{h:[94,96],t:-6,leg:[88,4],hand:[128,62],ad:-1}},
 ['Ajusta el asiento para que las asas queden a la altura del pecho.','Espalda pegada al respaldo y hombros hacia atrás.','Empuja las asas hasta estirar casi los brazos.','Vuelve controlado sin que las placas se choquen.'],
 ['Despegar la espalda del respaldo.','Encoger los hombros.'],
 ['No bloquees los codos con fuerza arriba.']);

/* ===== PRESS INCLINADO ===== */
d('press-inclinado-barra','inclinado',{},
 ['Banco a unos 30°–45°. Escápulas juntas y hacia abajo, pies firmes.','Agarra la barra algo más ancha que los hombros y bájala a la parte alta del pecho.','Empuja hacia arriba sin encoger los hombros.'],
 ['Banco demasiado vertical (trabaja casi solo el hombro).','Rebotar la barra.'],
 ['Cargas altas: usa los topes de seguridad o pide ayuda.']);
d('press-inclinado-mancuernas','inclinado',{w:'db'},
 ['Banco inclinado a 30°–45°. Lleva las mancuernas a los hombros.','Empuja hacia arriba hasta juntarlas.','Baja controlado hasta la altura del pecho alto.'],
 ['Subir las mancuernas hacia la cara.','Abrir los codos demasiado.'],
 ['Empieza ligero: las mancuernas exigen más estabilidad.']);
d('press-inclinado-smith','inclinado',{props:[['rect',52,100,60,8],['post',60,108],['bar',84,0,84,FL]]},
 ['Coloca el banco inclinado para que la barra baje sobre la parte alta del pecho.','Gira la barra para soltarla y bájala hasta rozar.','Empuja hacia arriba y engancha al terminar.'],
 ['Banco mal centrado respecto a la barra.','Encoger los hombros.'],
 ['La barra va guiada: aprovecha para trabajar con control y sin miedo a quedarte atascado.']);
d('press-inclinado-maquina','inclinado',{w:null,props:[['rect',80,54,8,50]],
 A:{h:[94,98],t:-38,leg:[88,4],hand:[96,66],ad:-1},B:{h:[94,98],t:-38,leg:[88,4],hand:[122,36],ad:-1}},
 ['Ajusta el asiento para que las asas queden a la altura de la parte alta del pecho.','Espalda pegada al respaldo.','Empuja hacia arriba y hacia delante hasta estirar casi los brazos.','Vuelve despacio.'],
 ['Despegar la espalda.','Encoger los hombros.'],
 ['Sin bloquear los codos arriba.']);

/* ===== CRUCES DE POLEAS ===== */
d('cruce-poleas','cruce',{},
 ['Poleas a la altura de los hombros. Un pie adelantado y el torso algo inclinado.','Con los codos ligeramente flexionados, junta las manos delante del pecho.','Vuelve despacio, notando el estiramiento del pecho.'],
 ['Usar impulso con el cuerpo.','Doblar los codos y convertirlo en un press.'],
 ['No dejes que los brazos vayan muy atrás: el hombro se resiente.']);
d('cruce-poleas-bajo','cruce',{cx:178,cy:6,A:{h:[96,62],t:12,foot:[104,FL],foot2:[88,FL],hand:[132,36],ad:1},B:{h:[96,62],t:12,foot:[104,FL],foot2:[88,FL],hand:[138,80],ad:1}},
 ['Polea alta. Un pie adelantado y el torso algo inclinado hacia delante.','Lleva las manos hacia abajo y delante hasta cruzarlas a la altura del ombligo.','Vuelve despacio.'],
 ['Echar el cuerpo hacia delante para ayudarte.','Doblar los codos.'],
 ['Pecho bajo: no subas las manos por encima de los hombros al volver.']);
d('cruce-poleas-alto','cruce',{cx:176,cy:122,A:{h:[96,62],t:12,foot:[104,FL],foot2:[88,FL],hand:[124,80],ad:1},B:{h:[96,62],t:12,foot:[104,FL],foot2:[88,FL],hand:[140,38],ad:1}},
 ['Polea baja. Un pie adelantado y el torso algo inclinado.','Con los codos ligeramente flexionados, lleva las manos de abajo hacia arriba hasta juntarlas a la altura de la cara.','Vuelve despacio.'],
 ['Levantar los hombros hacia las orejas.','Usar impulso con las piernas.'],
 ['Pecho alto: sube hasta la altura de la cara, no más.']);

/* ===== PESO MUERTO ===== */
d('peso-muerto-barra','bisagra',{A:{h:[88,84],t:55,foot:fl,arm:[0,0]},B:{h:[100,62],t:4,foot:fl,arm:[0,0]}},
 ['Pies a la anchura de las caderas, la barra sobre la mitad del pie. Agarra la barra con los brazos rectos.','Pecho alto, espalda recta y abdomen apretado. Empuja el suelo con los pies.','Sube la barra pegada a las piernas hasta quedar erguido.','Baja con la misma ruta, empujando la cadera atrás.'],
 ['Redondear la espalda.','Tirar de la barra con los brazos antes de empujar con las piernas.'],
 ['Si no puedes mantener la espalda recta, baja el peso o empieza con un rack pull.']);
d('rack-pull','bisagra',{A:{h:[84,72],t:62,foot:fl,arm:[0,0]},B:{h:[100,62],t:4,foot:fl,arm:[0,0]}},
 ['Ajusta el rack para que la barra quede justo bajo las rodillas.','Pecho alto, espalda recta, agarra la barra.','Sube empujando con los pies y llevando la cadera hacia delante.','Baja controlado hasta apoyar en los soportes.'],
 ['Redondear la espalda al despegar.','Tirar con los brazos.'],
 ['Menos recorrido que el peso muerto, pero la carga puede ser mayor: sé estricto con la espalda.']);
d('peso-muerto-rumano','bisagra',{},
 ['De pie con la barra por delante de los muslos, rodillas apenas flexionadas.','Lleva la cadera hacia atrás, deslizando la barra por las piernas hasta notar el estiramiento detrás del muslo.','Sube empujando la cadera hacia delante y aprieta los glúteos.'],
 ['Doblar mucho las rodillas (se convierte en sentadilla).','Redondear la espalda al bajar.'],
 ['Baja solo hasta donde mantengas la espalda recta (normalmente por debajo de las rodillas).']);
d('peso-muerto-rumano-mancuernas','bisagra',{w:'db'},
 ['De pie con una mancuerna en cada mano delante de los muslos.','Lleva la cadera atrás y baja las mancuernas pegadas a las piernas.','Sube empujando la cadera hacia delante.'],
 ['Redondear la espalda.','Alejar las mancuernas del cuerpo.'],
 ['Una opción más fácil de aprender que la barra.']);
d('peso-muerto-sumo','bisagra',{A:{h:[100,86],t:36,foot:[112,FL],foot2:[88,FL],arm:[0,0]},B:{h:[100,62],t:4,foot:[112,FL],foot2:[88,FL],arm:[0,0]}},
 ['Pies muy abiertos con las puntas hacia fuera y la barra sobre la mitad del pie.','Agarra la barra por dentro de las piernas, pecho alto y espalda recta.','Empuja el suelo hacia fuera con los pies y sube estirando caderas y rodillas a la vez.','Baja con control hasta el suelo.'],
 ['Rodillas que se van hacia dentro.','Tirones al despegar.'],
 ['Deja que las rodillas sigan la dirección de los pies.']);
d('buenos-dias','bisagra',{w:'bar-s',A:{h:[100,62],t:4,foot:fl,arm:[10,70]},B:{h:[76,68],t:70,foot:fl,arm:[10,70]}},
 ['De pie con la barra sobre la parte alta de la espalda y las rodillas apenas flexionadas.','Lleva la cadera atrás e inclina el torso hacia delante con la espalda recta.','Baja hasta notar el estiramiento detrás del muslo y sube empujando la cadera hacia delante.'],
 ['Redondear la espalda.','Bajar demasiado peso.'],
 ['Empieza con muy poco peso: es un movimiento exigente para la zona lumbar.']);

/* ===== PRESS DE HOMBRO ===== */
d('press-militar-barra','pressh',{w:'bar',sc:.82,props:[],
 A:{h:[100,62],t:2,foot:fl,hand:[108,28],ad:-1},B:{h:[100,62],t:0,foot:fl,hand:[104,2],ad:-1}},
 ['De pie, pies a la anchura de las caderas, barra apoyada en la parte alta del pecho y agarre un poco más ancho que los hombros.','Aprieta glúteos y abdomen. Empuja la barra hacia arriba pasándola cerca de la cara.','Cuando pase la frente, mete la cabeza hacia delante y termina con la barra sobre la nuca.','Baja controlado hasta el pecho.'],
 ['Arquear mucho la zona lumbar.','Empujar con las piernas (eso es un push press).'],
 ['Si te duele el hombro o la zona lumbar, prueba con mancuernas sentado.']);
d('press-militar-mancuernas','pressh',{},
 ['Siéntate con el respaldo recto y las mancuernas a la altura de los hombros.','Empuja hacia arriba hasta casi juntarlas, con las muñecas sobre los codos.','Baja controlado hasta la altura de las orejas.'],
 ['Arquear la zona lumbar.','Dejar caer las mancuernas hacia delante.'],
 ['Mantén las muñecas rectas y el abdomen apretado.']);
d('press-arnold','pressh',{A:{h:[86,96],t:0,leg:[88,0],hand:[110,50],ad:-1},B:{h:[86,96],t:0,leg:[88,0],hand:[96,2],ad:-1}},
 ['Siéntate con las mancuernas delante del pecho, a la altura de la barbilla, con las palmas mirando hacia ti.','Empuja hacia arriba girando las muñecas hasta que las palmas miren hacia delante.','Baja girando las palmas de nuevo hacia ti.'],
 ['Hacer el giro con prisa y perder el control.','Arquear la zona lumbar.'],
 ['El giro lo hace más exigente: usa menos peso que en el press militar.']);
d('press-hombro-plate','pressh',{w:null,props:[['rect',68,92,12,32],['rect',100,38,6,6]],
 A:{h:[86,96],t:0,leg:[88,0],hand:[98,50],ad:-1},B:{h:[86,96],t:0,leg:[88,0],hand:[98,4],ad:-1}},
 ['Ajusta el asiento para que las asas queden a la altura de los hombros.','Espalda pegada al respaldo.','Empuja hacia arriba hasta estirar casi los brazos.','Baja controlado hasta que las asas queden a la altura de las orejas.'],
 ['Despegar la espalda.','Encoger los hombros.'],
 ['Carga con discos: añade el peso poco a poco y comprueba que están bien sujetos.']);
d('press-hombro-maquina','pressh',{w:null,
 A:{h:[86,96],t:0,leg:[88,0],hand:[98,50],ad:-1},B:{h:[86,96],t:0,leg:[88,0],hand:[98,4],ad:-1}},
 ['Ajusta el asiento para que las asas queden a la altura de los hombros.','Espalda pegada al respaldo y pies firmes.','Empuja hacia arriba hasta estirar casi los brazos.','Vuelve controlado.'],
 ['Despegar la espalda o arquear la zona lumbar.','Bloquear los codos de golpe.'],
 ['Es la forma más segura para empezar con el press de hombro.']);
d('press-hombro-smith','pressh',{w:'bar',props:[['rect',68,92,12,32],['bar',112,-10,112,FL]],
 A:{h:[86,96],t:0,leg:[88,0],hand:[108,52],ad:-1},B:{h:[86,96],t:0,leg:[88,0],hand:[106,4],ad:-1}},
 ['Coloca el banco recto bajo la barra y siéntate con la espalda apoyada.','Gira la barra para soltarla y baja hasta la altura de la barbilla.','Empuja hacia arriba hasta estirar los brazos.','Engancha la barra al terminar.'],
 ['Colocar el banco muy atrás o muy adelante y empujar con el cuerpo torcido.','Arquear la zona lumbar.'],
 ['Usa el seguro de la barra siempre que termines la serie.']);

/* ===== ELEVACIONES ===== */
d('elevacion-lateral-mancuernas','lateral',{},
 ['De pie, mancuernas a los lados con los codos ligeramente flexionados.','Sube los brazos hacia los lados hasta la altura de los hombros, con los codos algo más altos que las manos.','Baja despacio.'],
 ['Balancear el tronco.','Subir los hombros hacia las orejas.'],
 ['Pesos ligeros: el deltoides lateral es un músculo pequeño.']);
d('elevacion-lateral-polea','lateral',{w:'cable',cx:180,cy:120},
 ['Colócate de lado a la polea baja y agarra el asa con la mano más alejada.','Sube el brazo hacia fuera hasta la altura del hombro, con el codo ligeramente flexionado.','Baja controlado sin soltar la tensión.'],
 ['Echar el cuerpo hacia el lado contrario.','Usar impulso.'],
 ['El cable mantiene tensión constante abajo: elige poco peso.']);
d('elevacion-lateral-maquina','lateral',{w:null,props:[['rect',68,92,12,32]],
 A:{h:[86,96],t:0,leg:[88,0],arm:[4,6]},B:{h:[86,96],t:0,leg:[88,0],arm:[74,78]}},
 ['Ajusta el asiento para que las almohadillas queden en los codos o antebrazos.','Sube los brazos hacia los lados hasta la altura de los hombros.','Baja despacio.'],
 ['Subir los hombros.','Dejar caer el peso.'],
 ['Máquina guiada: ideal para trabajar el deltoides sin balancearte.']);
d('elevacion-frontal-mancuernas','frontal',{},
 ['De pie, mancuernas delante de los muslos con las palmas hacia ti.','Sube un brazo (o ambos) hacia delante hasta la altura de los ojos.','Baja controlado.'],
 ['Balancear el tronco hacia atrás.','Subir por encima de los hombros.'],
 ['El deltoides frontal ya trabaja mucho en los press: peso ligero.']);
d('elevacion-frontal-polea','frontal',{w:'cable',cx:150,cy:124},
 ['De espaldas a la polea baja, con el cable entre las piernas y el asa en una mano.','Sube el brazo hacia delante hasta la altura de los ojos.','Baja lento.'],
 ['Inclinarte hacia atrás.','Subir el hombro.'],
 ['Peso ligero y sin balanceo.']);
d('pajaros-mancuernas','pajaros',{},
 ['Inclina el torso casi paralelo al suelo con la espalda recta y los brazos colgando.','Abre los brazos hacia los lados con los codos ligeramente flexionados.','Junta los omóplatos arriba y baja lento.'],
 ['Subir con impulso.','Encoger los hombros.'],
 ['Peso pequeño: es un músculo pequeño y fácil de forzar.']);
d('reverse-fly-maquina','pajaros',{w:null,props:[['rect',112,52,8,50]],
 A:{h:[90,96],t:-6,leg:[88,4],hand:[120,64],ad:-1},B:{h:[90,96],t:-6,leg:[88,4],hand:[86,62],ad:-1}},
 ['Siéntate mirando al respaldo, con el pecho apoyado y las asas delante.','Abre los brazos hacia atrás hasta que las manos pasen la línea de los hombros.','Junta los omóplatos y vuelve controlado.'],
 ['Encoger los hombros.','Usar más peso del que puedas controlar.'],
 ['Es buena para la postura. Pesos ligeros y repeticiones controladas.']);
d('encogimientos-mancuerna','encoger',{},
 ['De pie con una mancuerna en cada mano a los lados del cuerpo.','Sube los hombros hacia las orejas sin doblar los codos.','Mantén un segundo arriba y baja lento.'],
 ['Girar los hombros.','Doblar los codos.'],
 ['Sube recto, sin rotar los hombros.']);
d('encogimientos-barra','encoger',{w:'bar'},
 ['De pie con la barra por delante de los muslos y las manos algo más anchas que las caderas.','Sube los hombros hacia las orejas sin doblar los codos.','Mantén un segundo arriba y baja lento.'],
 ['Girar los hombros.','Mover la cabeza hacia delante.'],
 ['Evita cargas tan altas que no puedas pausar arriba.']);
d('encogimientos-smith','encoger',{w:'bar',props:[['bar',112,0,112,FL]]},
 ['De pie delante de la barra del Smith, con las manos algo más anchas que las caderas.','Sube los hombros hacia las orejas sin doblar los codos.','Mantén un segundo arriba y baja lento.'],
 ['Colocarte mal respecto a la barra y echar el tronco hacia delante.','Girar los hombros.'],
 ['La barra va guiada: ideal para subir carga con seguridad.']);

/* ===== ESPALDA ===== */
d('jalon-pecho-polea','jalon',{},
 ['Siéntate con los muslos bajo el rodillo y agarra la barra algo más ancha que los hombros.','Inclínate un poco hacia atrás y baja la barra hacia la parte alta del pecho, llevando los codos abajo.','Sube controlado hasta estirar los brazos.'],
 ['Tirar con los bíceps y no con la espalda.','Echar el cuerpo muy atrás.'],
 ['Baja la barra por delante de la cara, no por detrás de la nuca.']);
d('jalon-dorsales-polea','jalon',{A:{h:[84,94],t:-10,leg:[90,5],hand:[116,8],ad:1},B:{h:[84,94],t:-26,leg:[90,5],hand:[96,50],ad:1}},
 ['Siéntate con los muslos bajo el rodillo y agarra la barra con un agarre ancho.','Inclínate hacia atrás unos 20°, con el pecho alto.','Tira de la barra hacia la clavícula con los codos hacia abajo y hacia los lados.','Sube controlado hasta estirar los dorsales.'],
 ['Balancearte con todo el cuerpo.','Bajar la barra detrás de la nuca.'],
 ['Si notas el hombro, cierra un poco el agarre y baja menos peso.']);
d('jalon-agarre-cerrado','jalon',{A:{h:[84,94],t:-8,leg:[90,5],hand:[114,8],ad:1},B:{h:[84,94],t:-18,leg:[90,5],hand:[104,52],ad:1}},
 ['Coloca el agarre triangular y siéntate con los muslos bajo el rodillo.','Inclínate un poco hacia atrás con el pecho alto.','Tira del agarre hacia el pecho, con los codos pegados a los costados.','Sube controlado.'],
 ['Tirar con los brazos sin mover los omóplatos.','Echarte hacia atrás de más.'],
 ['El agarre cerrado trabaja más la parte baja del dorsal y el bíceps.']);
d('dominadas','dominada',{},
 ['Cuelga con las manos un poco más anchas que los hombros y las palmas hacia delante.','Baja los hombros lejos de las orejas y aprieta el abdomen.','Sube hasta pasar la barbilla de la barra, con los codos hacia abajo y atrás.','Baja despacio hasta estirar los brazos.'],
 ['Balancearte para coger impulso.','Medio recorrido.'],
 ['Si no puedes hacer una, usa una banda elástica o la máquina asistida.']);
d('dominadas-supinas','dominada',{},
 ['Cuelga con las manos a la anchura de los hombros y las palmas hacia ti.','Baja los hombros y aprieta el abdomen.','Sube hasta pasar la barbilla de la barra.','Baja lento hasta estirar.'],
 ['Balancearte.','Subir solo con los brazos sin usar la espalda.'],
 ['Trabajan más el bíceps: cuida los codos y no hagas demasiadas repeticiones al principio.']);
d('dominadas-neutras','dominada',{},
 ['Cuelga de las asas paralelas con las palmas enfrentadas.','Baja los hombros y aprieta el abdomen.','Sube llevando el pecho hacia las asas.','Baja lento.'],
 ['Balancearte.','Encoger los hombros.'],
 ['Es el agarre más cómodo para hombros y codos.']);
d('dominadas-explosivas','dominada',{period:2000,
 A:{h:[104,96],t:0,leg:[20,-80],hand:[106,12],ad:1},B:{h:[104,54],t:0,leg:[20,-80],hand:[106,12],ad:1}},
 ['Empieza colgado con los brazos estirados y el abdomen apretado.','Tira con fuerza y rapidez hasta que el pecho llegue cerca de la barra.','Baja controlado en 2 a 3 segundos.'],
 ['Usar impulso de piernas.','Dejarte caer en la bajada.'],
 ['Hazlas solo si dominas las dominadas normales: la fase explosiva carga el hombro y el codo.']);
d('remo-barra','remo',{w:'bar'},
 ['Inclina el torso casi paralelo al suelo con la espalda recta y las rodillas algo flexionadas.','Tira de la barra hacia el abdomen llevando los codos hacia atrás.','Aprieta la espalda un segundo y baja controlado.'],
 ['Redondear la espalda.','Subir el torso para coger impulso.'],
 ['Si notas la zona lumbar, prueba el remo con apoyo en el pecho.']);
d('remo-pendlay','remo',{w:'bar',A:{h:[84,70],t:84,foot:fl,arm:[0,0]},B:{h:[84,70],t:84,foot:fl,arm:[-42,10]}},
 ['Con la barra en el suelo, inclina el torso paralelo al suelo con la espalda recta.','Tira de la barra con fuerza hacia el abdomen.','Baja hasta que la barra toque el suelo y reinicia cada repetición.'],
 ['Levantar el torso al subir.','Dejar caer la barra.'],
 ['Cada repetición parte de parado: es una buena forma de cuidar la espalda baja.']);
d('remo-mancuerna','remo',{props:[['bench',60,96,70,8]],
 A:{h:[84,70],t:80,foot:fl,arm:[0,0]},B:{h:[84,70],t:80,foot:fl,arm:[-42,10]}},
 ['Apoya una mano y una rodilla en el banco con la espalda recta y paralela al suelo.','Con la otra mano, tira de la mancuerna hacia la cadera, llevando el codo atrás.','Baja controlado y cambia de lado.'],
 ['Girar el torso para subir la mancuerna.','Subir hacia el pecho en lugar de hacia la cadera.'],
 ['Mantén el cuello neutro, mirando al banco.']);
d('remo-t','remo',{w:'bar',A:{h:[84,70],t:50,foot:fl,arm:[0,0]},B:{h:[84,70],t:50,foot:fl,arm:[-40,6]}},
 ['Colócate sobre la barra en T con los pies a los lados y la espalda recta.','Tira de las asas hacia el pecho llevando los codos atrás.','Aprieta los omóplatos y baja controlado.'],
 ['Redondear la espalda.','Levantar el torso.'],
 ['Si te cuesta mantener la espalda recta, usa la versión con apoyo en el pecho.']);
d('remo-sentado-polea','remopolea',{},
 ['Siéntate con los pies apoyados, las rodillas algo flexionadas y la espalda recta.','Tira del agarre hacia el abdomen, llevando los codos hacia atrás.','Junta los omóplatos y vuelve estirando los brazos sin soltar el peso.'],
 ['Balancear el tronco.','Encoger los hombros.'],
 ['Mantén el pecho alto durante toda la serie.']);
d('remo-una-mano-polea','remopolea',{w:'cable',cx:190,cy:80,
 A:{h:[100,62],t:8,foot:fl,hand:[132,64],ad:-1},B:{h:[100,62],t:8,foot:fl,hand:[100,66],ad:-1}},
 ['De pie o en posición de zancada frente a la polea, con el torso recto.','Tira del asa con una mano llevando el codo hacia atrás.','Vuelve lento y cambia de lado.'],
 ['Girar el torso para ayudarte.','Encoger el hombro.'],
 ['Mantén la cadera y los hombros mirando al frente.']);
d('remo-maquina','remopolea',{w:null,props:[['rect',118,54,8,40]],
 A:{h:[84,96],t:-8,leg:[88,4],hand:[128,56],ad:-1},B:{h:[84,96],t:-8,leg:[88,4],hand:[96,62],ad:-1}},
 ['Ajusta el asiento y apoya el pecho en la almohadilla.','Agarra las asas con los brazos estirados.','Tira hacia atrás llevando los codos pegados al cuerpo.','Junta los omóplatos y vuelve controlado.'],
 ['Despegar el pecho de la almohadilla.','Encoger los hombros.'],
 ['El apoyo en el pecho protege la zona lumbar.']);
d('remo-invertido','remopolea',{w:null,nofloor:0,props:[['bar',56,76,84,76],['post',70,76]],
 A:{s:[58,102],h:[96,110],foot:[158,FL],hand:[62,76],ad:1},B:{s:[62,86],h:[98,106],foot:[158,FL],hand:[62,76],ad:1}},
 ['Colócate bajo una barra baja y agárrala con las manos algo más anchas que los hombros.','Cuerpo recto de cabeza a talones, con el abdomen y los glúteos apretados.','Tira del pecho hacia la barra, juntando los omóplatos.','Baja controlado hasta estirar los brazos.'],
 ['Dejar caer la cadera.','Tirar solo con los brazos.'],
 ['Para hacerlo más fácil, dobla las rodillas.']);
d('jalon-brazos-rectos','jalonrecto',{},
 ['De pie frente a la polea alta con el torso algo inclinado y los brazos casi rectos.','Baja la barra hacia los muslos moviendo los brazos desde el hombro.','Siente el dorsal y vuelve despacio.'],
 ['Doblar los codos y convertirlo en un press.','Usar impulso.'],
 ['Peso moderado: lo importante es sentir el dorsal.']);

/* ===== PECHO: APERTURAS Y FONDOS ===== */
d('aperturas-mancuernas','aperturas',{},
 ['Túmbate en un banco plano con las mancuernas sobre el pecho y los codos ligeramente flexionados.','Abre los brazos en arco hasta sentir el estiramiento del pecho, sin pasar la altura del banco.','Cierra como si abrazaras un árbol grande.'],
 ['Bajar demasiado y cargar el hombro.','Doblar los codos y convertirlo en un press.'],
 ['Peso ligero: es un ejercicio de estiramiento, no de fuerza máxima.']);
d('aperturas-inclinadas-mancuernas','aperturas',{w:'db',props:[['rect',52,100,60,8],['post',60,108]],
 A:{h:[108,96],t:-58,foot:[134,FL],hand:[80,30],ad:-1},B:{h:[108,96],t:-58,foot:[134,FL],hand:[74,64],ad:-1}},
 ['Banco inclinado a 30°. Mancuernas sobre el pecho con los codos ligeramente flexionados.','Abre los brazos en arco hasta sentir el estiramiento de la parte alta del pecho.','Cierra el arco hasta juntar las mancuernas arriba.'],
 ['Bajar demasiado.','Usar demasiado peso.'],
 ['Empieza con poco peso: el hombro está más expuesto en inclinado.']);
d('pec-deck','aperturas',{w:null,props:[['rect',82,54,8,50],['bench',74,100,34,6]],
 A:{h:[94,96],t:-6,leg:[88,4],hand:[92,56],ad:-1},B:{h:[94,96],t:-6,leg:[88,4],hand:[128,58],ad:-1}},
 ['Ajusta el asiento para que las asas queden a la altura del pecho. Espalda pegada al respaldo.','Con los codos ligeramente flexionados, junta los brazos delante del pecho.','Vuelve despacio hasta notar el estiramiento.'],
 ['Despegar la espalda.','Encoger los hombros.'],
 ['No dejes que los brazos vayan por detrás de la línea del cuerpo al abrir.']);
d('fondos-pecho','fondos',{sc:.82,
 A:{h:[100,66],t:24,leg:[10,-60],hand:[104,70],ad:-1},B:{h:[98,90],t:30,leg:[10,-60],hand:[104,70],ad:-1}},
 ['Sube a las paralelas con los brazos rectos y el cuerpo inclinado hacia delante.','Baja con los codos algo abiertos hasta sentir el estiramiento del pecho.','Empuja hasta casi estirar los brazos.'],
 ['Bajar demasiado con el hombro por debajo del codo.','Balancearte.'],
 ['Si notas dolor en el hombro, para y usa un fondo asistido o un press.']);
d('fondos-triceps','fondos',{},
 ['Sube a las paralelas con los brazos rectos y el cuerpo vertical.','Baja con los codos pegados al cuerpo hasta unos 90°.','Empuja hasta casi estirar los codos.'],
 ['Inclinar el cuerpo hacia delante (pasa a ser de pecho).','Bajar demasiado.'],
 ['Hombros hacia abajo, lejos de las orejas.']);
d('fondos-banco','fondos',{nofloor:0,props:[['bench',70,94,34,8]],
 A:{s:[88,66],h:[106,102],foot:[168,FL],hand:[88,92],ad:1},B:{s:[88,86],h:[106,116],foot:[168,FL],hand:[88,92],ad:1}},
 ['Apoya las manos en el borde de un banco, detrás de ti, con los dedos hacia delante y las piernas estiradas.','Dobla los codos hacia atrás y baja la cadera hasta unos 90°.','Empuja hasta estirar los brazos.'],
 ['Alejar la cadera del banco.','Bajar demasiado y cargar el hombro.'],
 ['Si te molesta el hombro, dobla las rodillas y baja menos.']);

/* ===== TRÍCEPS ===== */
d('extension-triceps-polea','triceps',{},
 ['De pie frente a la polea alta, agarra la cuerda o la barra con los codos pegados al cuerpo.','Estira los codos hacia abajo sin mover los hombros.','Sube controlado hasta unos 90° de codo.'],
 ['Despegar los codos.','Inclinarte hacia delante y empujar con el tronco.'],
 ['No bloquees los codos de golpe con mucho peso.']);
d('extension-triceps-sobre-cabeza-polea','triceps',{cx:140,cy:20,
 A:{h:[96,62],t:6,foot:fl,arm:[168,-30]},B:{h:[96,62],t:6,foot:fl,arm:[168,172]}},
 ['De espaldas a la polea, con la cuerda detrás de la cabeza y un pie adelantado.','Con los codos hacia delante y pegados a la cabeza, estira los brazos hacia arriba.','Baja lento hasta que los antebrazos queden detrás de la cabeza.'],
 ['Abrir los codos hacia fuera.','Arquear la zona lumbar.'],
 ['Trabaja el tríceps estirado: usa menos peso que en el pushdown.']);
d('extension-triceps-maquina','triceps',{w:null,props:[['rect',74,92,12,32]],
 A:{h:[86,96],t:0,leg:[88,0],arm:[8,100]},B:{h:[86,96],t:0,leg:[88,0],arm:[8,8]}},
 ['Ajusta el asiento y apoya los codos en las almohadillas o junto al cuerpo.','Empuja las asas hacia abajo estirando los codos.','Vuelve controlado.'],
 ['Subir los hombros.','Despegar la espalda.'],
 ['Es una buena opción para aprender a aislar el tríceps.']);
d('patada-triceps','triceps',{w:'db',
 A:{h:[90,66],t:66,foot:fl,arm:[-90,-10]},B:{h:[90,66],t:66,foot:fl,arm:[-90,-88]}},
 ['Inclínate hacia delante con la espalda recta y apoya una mano en un banco.','Sube el codo hasta que el brazo quede pegado al cuerpo, paralelo al suelo.','Estira el codo llevando la mancuerna hacia atrás y aprieta el tríceps.','Vuelve controlado.'],
 ['Mover el hombro en lugar de solo el codo.','Usar demasiado peso.'],
 ['Pesos muy ligeros: el movimiento es corto.']);
d('skullcrusher-barra','skull',{},
 ['Tumbado en un banco con la barra Z sobre los ojos y los brazos casi verticales.','Dobla solo los codos para bajar la barra hacia la frente o detrás de la cabeza.','Estira los codos para volver.'],
 ['Abrir mucho los codos.','Mover los hombros.'],
 ['Empieza con una barra Z y poco peso; cuida los codos.']);
d('extension-triceps-mancuerna','skull',{props:[['rect',68,92,12,32]],w:'db',
 A:{h:[86,96],t:0,leg:[88,0],arm:[170,-20]},B:{h:[86,96],t:0,leg:[88,0],arm:[170,172]}},
 ['Siéntate o ponte de pie con una mancuerna sujeta con ambas manos sobre la cabeza.','Baja la mancuerna por detrás de la cabeza doblando solo los codos.','Estira los codos para volver arriba.'],
 ['Abrir los codos hacia los lados.','Arquear la zona lumbar.'],
 ['Si te molesta el hombro, hazlo con una mancuerna más ligera o con polea.']);

/* ===== PIERNAS ===== */
d('sentadilla-barra','sentadilla',{},
 ['Barra sobre la parte alta de la espalda, pies a la anchura de los hombros y puntas algo abiertas.','Aprieta el abdomen. Baja empujando las caderas atrás y las rodillas hacia fuera.','Baja hasta donde mantengas la espalda neutra (idealmente muslos paralelos al suelo).','Sube empujando el suelo con todo el pie.'],
 ['Rodillas que se van hacia dentro.','Despegar los talones del suelo.'],
 ['Usa los topes del rack a la altura de las caderas para las cargas altas.']);
d('sentadilla-frontal','sentadilla',{A:{h:[100,62],t:2,foot:fl,arm:[40,140]},B:{h:[84,96],t:26,foot:fl,arm:[40,140]}},
 ['Barra apoyada en la parte delantera de los hombros, con los codos altos y apuntando hacia delante.','Pies a la anchura de los hombros. Baja manteniendo el torso muy vertical.','Sube empujando el suelo y mantén los codos altos.'],
 ['Dejar caer los codos.','Inclinarte hacia delante.'],
 ['Es muy exigente para las muñecas y la espalda alta: empieza con poco peso.']);
d('sentadilla-smith','sentadilla',{props:[['bar',100,0,100,FL]],
 A:{h:[100,62],t:2,foot:[104,FL],arm:[10,70]},B:{h:[82,96],t:34,foot:[104,FL],arm:[10,70]}},
 ['Coloca los pies un poco por delante de la barra y apoya la barra en los hombros.','Gira para soltar el seguro y baja con la espalda recta.','Sube empujando con todo el pie.','Engancha la barra al terminar.'],
 ['Pies debajo de la barra (se carga la rodilla).','Redondear la zona lumbar.'],
 ['La barra va guiada: usa el seguro siempre que la sueltes.']);
d('hack-squat','sentadilla',{w:null,props:[['bar',66,42,124,114],['bench',70,104,40,6]],
 A:{h:[92,66],t:-30,foot:[128,FL]},B:{h:[88,100],t:-34,foot:[128,FL]}},
 ['Apoya la espalda en el respaldo y los pies en la plataforma, a la anchura de los hombros.','Suelta el seguro y baja doblando las rodillas hasta unos 90°.','Empuja con todo el pie para subir sin bloquear las rodillas.'],
 ['Despegar la cadera del respaldo.','Bajar con las rodillas hacia dentro.'],
 ['Máquina guiada: usa el seguro siempre al terminar.']);
d('sentadilla-goblet','goblet',{},
 ['Sujeta una mancuerna o pesa rusa pegada al pecho con los codos hacia abajo.','Baja entre las piernas con el pecho alto y las rodillas siguiendo los pies.','Sube empujando el suelo y aprieta los glúteos arriba.'],
 ['Dejar caer el pecho hacia delante.','Rebotar abajo.'],
 ['Es la mejor sentadilla para aprender el movimiento.']);
d('prensa','prensa',{},
 ['Espalda y cadera pegadas al respaldo. Pies a la anchura de los hombros en la plataforma.','Suelta el seguro y baja controlado hasta que las rodillas lleguen a unos 90°.','Empuja con todo el pie, sin bloquear las rodillas arriba.'],
 ['Despegar la cadera del asiento.','Bajar tanto que la zona lumbar se redondee.'],
 ['Pon siempre el seguro al terminar. No bloquees las rodillas con mucho peso.']);
d('gemelos-prensa','prensa',{
 A:{h:[80,98],t:-62,foot:[146,64],ft:-6,arm:[10,40]},B:{h:[80,98],t:-62,foot:[146,60],ft:30,arm:[10,40]}},
 ['Siéntate en la prensa con las piernas casi estiradas y solo la parte delantera del pie en la plataforma.','Empuja con la punta de los pies, subiendo los talones lo más posible.','Baja despacio hasta estirar los gemelos.'],
 ['Doblar las rodillas.','Rebotar abajo.'],
 ['Rodillas sin bloquear del todo y pon el seguro al terminar.']);
d('zancadas','zancada',{},
 ['De pie con una mancuerna en cada mano y el torso erguido.','Da un paso largo al frente y baja hasta que la rodilla de atrás casi toque el suelo.','Empuja con el pie delantero para volver.'],
 ['Paso demasiado corto.','Inclinar el tronco hacia delante.'],
 ['La rodilla delantera sigue la dirección del pie.']);
d('zancadas-caminando','zancada',{},
 ['Camina hacia delante dando pasos largos con una mancuerna en cada mano.','Baja la rodilla de atrás hasta casi tocar el suelo en cada paso.','Empuja con la pierna delantera y da el siguiente paso.'],
 ['Pasos demasiado cortos.','Perder el equilibrio al girar el tronco.'],
 ['Necesitas espacio libre: empieza con poco peso.']);
d('sentadilla-bulgara','zancada',{props:[['bench',44,98,30,8]],
 A:{h:[104,64],t:3,foot:[124,FL],foot2:[58,96],arm:[2,2]},B:{h:[104,96],t:3,foot:[124,FL],foot2:[58,96],arm:[2,2]}},
 ['Apoya el pie de atrás sobre un banco y da un paso largo adelante con la otra pierna.','Baja doblando la rodilla delantera hasta unos 90°.','Sube empujando con el pie delantero.'],
 ['Colocar el pie delantero demasiado cerca del banco.','Inclinar el tronco.'],
 ['Empieza sin peso para encontrar el equilibrio.']);
d('step-up','zancada',{props:[['rect',92,100,40,24]],
 A:{h:[100,80],t:6,foot:[112,98],foot2:[86,FL],arm:[2,2]},B:{h:[104,56],t:4,foot:[112,98],foot2:[112,84],arm:[2,2]}},
 ['Pon un pie completo sobre un cajón o banco bajo.','Empuja con esa pierna para subir hasta quedar de pie sobre el cajón.','Baja controlado con la otra pierna y repite.'],
 ['Empujarte con el pie de abajo.','Cajón demasiado alto.'],
 ['Elige una altura que te permita doblar la rodilla unos 90°, no más.']);
d('extension-cuadriceps','extensionpierna',{},
 ['Ajusta el respaldo para que las rodillas coincidan con el eje de la máquina.','Estira las rodillas hasta casi bloquearlas y aprieta el muslo.','Baja despacio, sin que el peso se caiga.'],
 ['Subir con impulso.','Levantar la cadera del asiento.'],
 ['Con rodillas sensibles, usa poco peso y pausa arriba.']);
d('hip-thrust-barra','puente',{},
 ['Apoya la espalda alta en un banco, con la barra sobre la cadera (usa una almohadilla) y los pies a la anchura de las caderas.','Empuja con los talones y sube la cadera hasta que el cuerpo quede recto de hombros a rodillas.','Aprieta los glúteos 1 segundo arriba y baja controlado.'],
 ['Arquear la zona lumbar arriba.','Subir demasiado la barbilla.'],
 ['Usa una almohadilla para la barra y no subas más de la posición recta.']);
d('hip-thrust-maquina','puente',{w:null},
 ['Siéntate en la máquina con la espalda alta apoyada y el cinturón sobre la cadera.','Empuja con los talones y sube la cadera hasta que el cuerpo quede recto.','Aprieta los glúteos arriba y baja controlado.'],
 ['Arquear la zona lumbar.','Empujar con la punta de los pies.'],
 ['Una opción cómoda: sin barra que sostener.']);
d('puente-gluteo','puentesuelo',{},
 ['Tumbado boca arriba, rodillas dobladas y pies cerca de los glúteos.','Empuja con los talones y sube la cadera hasta que el cuerpo esté en línea.','Aprieta los glúteos y baja despacio.'],
 ['Arquear la zona lumbar al subir.'],
 ['Es muy seguro y un buen primer paso para los glúteos.']);
d('gluteo-maquina','patada',{},
 ['Apoya el pecho en la almohadilla y el pie en la plataforma.','Empuja la plataforma hacia atrás con la pierna casi estirada.','Aprieta el glúteo y vuelve controlado.'],
 ['Arquear la zona lumbar para subir más.','Balancear la pierna.'],
 ['Sube solo hasta donde el glúteo siga trabajando.']);
d('patada-gluteo-polea','patada',{w:'cable',cx:34,cy:120},
 ['Coloca la tobillera en la polea baja y apóyate en la máquina con el torso algo inclinado.','Lleva la pierna hacia atrás con la rodilla casi estirada.','Aprieta el glúteo y vuelve sin balancear.'],
 ['Arquear la zona lumbar.','Usar impulso.'],
 ['Sube solo hasta donde el glúteo siga trabajando.']);
d('abductores-maquina','abductor',{},
 ['Siéntate con la espalda apoyada y las almohadillas por fuera de las rodillas.','Abre las piernas con control hasta donde puedas sin despegar la espalda.','Vuelve despacio.'],
 ['Usar demasiado peso con tirones.','Despegar la espalda del respaldo.'],
 ['Empieza ligero: son músculos pequeños y se cargan fácil.']);
d('aductores-maquina','abductor',{
 A:{h:[84,94],t:0,leg:[80,10],leg2:[80,30]},B:{h:[84,94],t:0,leg:[80,10],leg2:[78,14]}},
 ['Siéntate con la espalda apoyada y las almohadillas por dentro de las rodillas.','Cierra las piernas con control hasta juntarlas.','Vuelve despacio hasta abrirlas.'],
 ['Soltar el peso al abrir.','Rebotar.'],
 ['Empieza ligero y no abras más de lo cómodo.']);
d('abduccion-polea','abductor',{w:'cable',cx:34,cy:120,props:[],
 A:{h:[100,62],t:2,foot:fl,leg2:[0,0]},B:{h:[100,62],t:2,foot:fl,leg2:[-10,-12]}},
 ['De pie de lado a la polea baja con la tobillera en la pierna que queda más lejos.','Aleja la pierna hacia fuera, sin inclinar el tronco.','Vuelve controlado.'],
 ['Inclinar el tronco hacia un lado.','Usar impulso.'],
 ['Apóyate en la máquina para no perder el equilibrio.']);
d('aduccion-polea','abductor',{w:'cable',cx:34,cy:120,props:[],
 A:{h:[100,62],t:2,foot:fl,leg2:[-10,-12]},B:{h:[100,62],t:2,foot:fl,leg2:[0,0]}},
 ['De pie de lado a la polea baja con la tobillera en la pierna que queda más cerca.','Lleva la pierna hacia dentro cruzando delante de la otra.','Vuelve controlado.'],
 ['Inclinar el tronco.','Usar impulso.'],
 ['Apóyate en la máquina y controla la vuelta.']);
d('gemelos-pie','gemelo',{},
 ['Colócate bajo las almohadillas con la parte delantera de los pies en el borde de la plataforma.','Sube todo lo que puedas, apretando los gemelos.','Baja despacio hasta estirar.'],
 ['Rebotar abajo.','Recorrido corto.'],
 ['Aquí lo importante es el recorrido completo y una pausa arriba y abajo.']);
d('gemelos-sentado','gemelo',{w:null,props:[['rect',100,76,28,8]],
 A:{h:[84,96],t:0,leg:[90,4],ft:0},B:{h:[84,96],t:0,leg:[90,12],ft:26}},
 ['Siéntate con las almohadillas sobre las rodillas y la parte delantera del pie en la plataforma.','Sube los talones todo lo que puedas.','Baja despacio hasta estirar.'],
 ['Rebotar abajo.','Recorrido corto.'],
 ['Con las rodillas dobladas trabaja más el sóleo (la parte profunda del gemelo).']);
d('gemelos-escalon','gemelo',{w:null,props:[['rect',80,112,40,12]],
 A:{h:[100,62],t:0,foot:[100,110],ft:0,foot2:[96,100]},B:{h:[100,55],t:0,foot:[101,104],ft:30,foot2:[96,100]}},
 ['De pie con la parte delantera de un pie en el borde de un escalón y la otra pierna doblada detrás.','Sube el talón todo lo que puedas.','Baja por debajo del escalón hasta estirar.'],
 ['Rebotar abajo.','Perder el equilibrio.'],
 ['Apóyate en la pared o en una barra para no caerte.']);

/* ===== CORE ===== */
d('crunch','crunch',{},
 ['Tumbado, rodillas dobladas y pies en el suelo, manos cruzadas sobre el pecho.','Sube solo los hombros llevando las costillas hacia la pelvis.','Baja despacio sin descansar del todo la cabeza.'],
 ['Tirar del cuello con las manos.','Sentarte entero.'],
 ['Es un movimiento corto: no hace falta subir mucho.']);
d('crunch-maquina','crunch',{w:null,props:[['rect',68,92,12,32]],
 A:{h:[86,96],t:-6,leg:[88,4],hand:[110,56],ad:-1},B:{h:[86,96],t:34,leg:[88,4],hand:[116,74],ad:-1}},
 ['Siéntate con los pies sujetos y las asas junto a la cabeza.','Enrolla el tronco llevando las costillas hacia la pelvis.','Vuelve despacio.'],
 ['Tirar con los brazos en vez del abdomen.','Usar demasiado peso con tirones.'],
 ['Concéntrate en redondear el tronco, no en bajar mucho.']);
d('crunch-polea','crunch',{w:'cable',cx:150,cy:-10,
 A:{h:[100,92],t:14,leg:[0,-90],hand:[114,50],ad:-1},B:{h:[100,92],t:58,leg:[0,-90],hand:[124,76],ad:-1}},
 ['Arrodíllate delante de la polea alta y agarra la cuerda junto a la cabeza.','Baja el tronco redondeando la espalda y acercando el codo a las rodillas.','Vuelve despacio.'],
 ['Tirar con los brazos.','Bajar con la cadera en lugar del abdomen.'],
 ['La cadera se queda quieta; el movimiento sale del abdomen.']);
d('elevacion-piernas-colgado','colgado',{},
 ['Cuelga de la barra con los hombros activos (no los dejes caer hacia las orejas).','Sube las piernas rectas sin balancear.','Baja despacio.'],
 ['Balancear el cuerpo.','Subir solo con la fuerza de la cadera.'],
 ['Si es difícil, empieza con rodillas dobladas.']);
d('elevacion-rodillas-colgado','colgado',{A:{h:[104,70],t:0,leg:[2,0],hand:[106,-14],ad:1},B:{h:[104,70],t:-4,leg:[78,-30],hand:[106,-14],ad:1}},
 ['Cuelga de la barra con los hombros activos.','Sube las rodillas hacia el pecho, enrollando la pelvis hacia arriba.','Baja despacio.'],
 ['Balancear el cuerpo.','Subir solo con los flexores de la cadera.'],
 ['Es la versión más fácil: ideal para aprender el movimiento.']);
d('plancha','plancha',{},
 ['Antebrazos en el suelo, codos bajo los hombros y cuerpo en línea recta.','Aprieta abdomen y glúteos; empuja el suelo con los antebrazos.','Mantén la respiración normal.'],
 ['Cadera caída.','Cadera demasiado alta.'],
 ['Si sientes más la espalda que el abdomen, para o apoya las rodillas.']);
d('plancha-lateral','plancha',{
 A:{s:[52,92],h:[104,98],foot:[148,FL],arm:[0,86]},B:{s:[52,90],h:[104,106],foot:[148,FL],arm:[0,86]}},
 ['Apoya el antebrazo en el suelo, con el codo bajo el hombro, y las piernas estiradas apiladas.','Eleva la cadera hasta que el cuerpo quede recto de la cabeza a los pies.','Mantén la posición sin dejar caer la cadera.'],
 ['Dejar caer la cadera.','Girar el pecho hacia delante.'],
 ['Hazlo en ambos lados. Si es difícil, apoya la rodilla de abajo.']);
d('giro-ruso','rotacion',{w:null,props:[],
 A:{h:[100,108],t:-38,foot:[132,100],hand:[128,86],ad:-1},B:{h:[100,108],t:-38,foot:[132,100],hand:[116,94],ad:-1}},
 ['Siéntate con las rodillas dobladas, inclínate hacia atrás con la espalda recta y los pies levantados (o apoyados).','Junta las manos delante del pecho.','Gira el tronco a un lado y luego al otro, llevando las manos junto a la cadera.'],
 ['Mover solo los brazos sin girar el tronco.','Redondear la espalda.'],
 ['Si te duele la zona lumbar, apoya los pies y reduce el giro.']);
d('pallof-press','rotacion',{w:'cable',cx:190,cy:62,
 A:{h:[100,62],t:2,foot:[106,FL],foot2:[92,FL],hand:[108,44],ad:-1},B:{h:[100,62],t:2,foot:[106,FL],foot2:[92,FL],hand:[140,48],ad:-1}},
 ['De pie de lado a la polea o a una goma, con las manos junto al pecho.','Empuja las manos hacia delante hasta estirar los brazos, sin dejar que la goma te gire.','Vuelve despacio.'],
 ['Dejar que el tronco gire.','Inclinarte hacia el lado de la polea.'],
 ['Ejercicio de estabilidad: con poco peso y mucho control.']);
d('lenador-polea','rotacion',{w:'cable',cx:182,cy:0,
 A:{h:[100,62],t:2,foot:[106,FL],foot2:[92,FL],hand:[126,8],ad:-1},B:{h:[100,62],t:12,foot:[106,FL],foot2:[92,FL],hand:[118,92],ad:-1}},
 ['De pie de lado a la polea alta, agarra la cuerda con ambas manos.','Tira en diagonal hacia abajo y al otro lado del cuerpo, girando el tronco.','Vuelve controlado.'],
 ['Usar solo los brazos.','Perder el equilibrio.'],
 ['El giro sale del tronco y las caderas: pies firmes y movimiento controlado.']);
d('extension-lumbar','hiper',{},
 ['Apoya las caderas en el almohadillado con los pies bien sujetos.','Baja el torso con la espalda recta.','Sube hasta que el cuerpo quede en línea, sin pasar de ahí.'],
 ['Subir demasiado y arquear la espalda.','Usar impulso.'],
 ['Termina con el cuerpo recto, no hiperextendido.']);
d('superman','hiper',{nofloor:0,props:[],
 A:{h:[100,116],t:89,leg:[-88,-90],arm:[88,88]},B:{h:[100,112],t:78,leg:[-82,-84],arm:[96,98]}},
 ['Túmbate boca abajo con los brazos estirados delante y las piernas rectas.','Levanta a la vez brazos, pecho y piernas unos centímetros.','Mantén un segundo y baja despacio.'],
 ['Subir demasiado y cargar la zona lumbar.','Mirar hacia arriba y forzar el cuello.'],
 ['Un gesto pequeño y controlado es suficiente.']);

/* ===== CALISTENIA AVANZADA ===== */
d('muscle-up','dominada',{sc:.8,
 A:{h:[104,96],t:0,leg:[20,-70],hand:[106,12],ad:1},B:{h:[104,46],t:18,leg:[20,-70],hand:[106,12],ad:1}},
 ['Antes de intentarlo, domina las dominadas pectorales y los fondos.','Tira con fuerza y explosividad hasta que el pecho pase la barra.','Gira por encima de la barra y empuja como en un fondo hasta estirar los brazos.'],
 ['Intentarlo sin base de dominadas y fondos.','Balancearte de más.'],
 ['Es muy exigente para hombros y codos. Practica las progresiones antes.']);
d('front-lever','dominada',{sc:.8,props:[['bar',70,-14,150,-14]],nofloor:1,
 A:{s:[100,46],h:[136,76],leg:[50,-14],hand:[104,-14],ad:1},B:{s:[100,46],h:[140,50],leg:[90,90],hand:[104,-14],ad:1}},
 ['Cuelga de la barra con los brazos estirados y los hombros activos.','Con el cuerpo en tuck (rodillas al pecho), lleva la cadera hacia arriba.','Extiende poco a poco el cuerpo hasta quedar horizontal.'],
 ['Doblar los codos.','Dejar caer la cadera.'],
 ['Avanza por progresiones: tuck, tuck avanzado, una pierna y completo.']);
d('handstand','dominada',{sc:.58,nofloor:0,props:[],
 A:{s:[100,96],h:[100,56],hand:[100,122],leg:[180,180],ad:1},B:{s:[100,100],h:[100,60],hand:[100,122],leg:[180,180],ad:1}},
 ['Practica junto a una pared, con las manos a la anchura de los hombros.','Sube con una pierna tras otra hasta apoyar los pies en la pared.','Empuja el suelo con los hombros y mantén el cuerpo en línea.'],
 ['Arquear la espalda.','Dejar caer los hombros hacia las orejas.'],
 ['Calienta las muñecas y baja con control: avanza por progresiones.']);
d('l-sit','dominada',{sc:.9,nofloor:0,props:[],
 A:{s:[96,78],h:[96,118],hand:[96,122],leg:[20,20],ad:1},B:{s:[96,78],h:[96,118],hand:[96,122],leg:[90,90],ad:1}},
 ['Apoya las manos en el suelo o en paralelas a los lados de la cadera, con los brazos rectos.','Empuja el suelo y levanta el cuerpo.','Sube las piernas rectas hasta la horizontal y mantén.'],
 ['Doblar los codos.','Encoger los hombros.'],
 ['Empieza con las rodillas dobladas e ve estirándolas poco a poco.']);
})();
