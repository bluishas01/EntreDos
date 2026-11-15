import { IntensityLevelMeta, TruthDareCard } from '../types/game';

export const INTENSITY_LEVELS: IntensityLevelMeta[] = [
  {
    id: 1,
    key: 'suave',
    label: 'Suave',
    subtitle: 'Nivel 1 · Besos, faje y juegos previos',
    description:
      'Besos mojados, manos por debajo de la ropa, masajes tibios y faje lento para prender las ganas sin prisa.',
    accentHex: '#F472B6',
  },
  {
    id: 2,
    key: 'rudo',
    label: 'Rudo',
    subtitle: 'Nivel 2 · Alto voltaje, sexo directo y retos pesados',
    description:
      'Preguntas sin filtro, juegos sucios directos, agarre duro, vendas, retos fuertes y posturas al máximo.',
    accentHex: '#EF4444',
  },
];

export const getLevelMeta = (levelId: number): IntensityLevelMeta => {
  return INTENSITY_LEVELS.find((l) => l.id === levelId) ?? INTENSITY_LEVELS[0];
};

export const TRUTH_DARE_CARDS: TruthDareCard[] = [
  // ================= NIVEL 1: SUAVE =================
  {
    id: 'td-s-v1',
    level: 1,
    type: 'verdad',
    prompt:
      '¿Qué beso o mordidita lenta en el cuello, oreja o espalda hace que se te ponga la piel chinita al segundo?',
  },
  {
    id: 'td-s-v2',
    level: 1,
    type: 'verdad',
    prompt:
      '¿Dónde te gusta más que te llene de besos húmedos los primeros cinco minutos antes de quitarnos todo?',
  },
  {
    id: 'td-s-v3',
    level: 1,
    type: 'verdad',
    prompt:
      '¿Qué parte de mi cuerpo te dan ganas de chupar o morder despacito cuando nos fajamos en la cama?',
  },
  {
    id: 'td-s-v4',
    level: 1,
    type: 'verdad',
    prompt:
      '¿Qué cosa mía en la previa hace que ya no aguantes las ganas de pasar a lo rudo?',
  },
  {
    id: 'td-s-v5',
    level: 1,
    type: 'verdad',
    prompt:
      '¿Cómo prefieres que te encuere: empezando por arriba o bajándote primero la ropa de abajo?',
  },
  {
    id: 'td-s-v6',
    level: 1,
    type: 'verdad',
    prompt:
      '¿Qué guarrada bajita al oído te calienta más rápido ahorita?',
  },
  {
    id: 'td-s-v7',
    level: 1,
    type: 'verdad',
    prompt:
      '¿Qué parte de tu cuerpo tienes más sensible hoy para que la bese y la sobe despacito?',
  },
  {
    id: 'td-s-v8',
    level: 1,
    type: 'verdad',
    prompt:
      '¿Cuánto aguantas un faje bueno encima de la ropa antes de querer quitármela toda?',
  },
  {
    id: 'td-s-v9',
    level: 1,
    type: 'verdad',
    prompt:
      '¿Te prende más que empiece con besos largos de lengua o con manos directo abajo de la camisa?',
  },
  {
    id: 'td-s-v10',
    level: 1,
    type: 'verdad',
    prompt:
      '¿Qué ropa mía te dan ganas de arrancarme apenas me ves por la casa?',
  },
  {
    id: 'td-s-v11',
    level: 1,
    type: 'verdad',
    prompt:
      '¿Dónde te gusta más que te apriete con fuerza cuando nos estamos besando pegados?',
  },
  {
    id: 'td-s-v12',
    level: 1,
    type: 'verdad',
    prompt:
      '¿Qué movimiento de mis caderas encima de ti en la previa te deja pidiendo más al instante?',
  },
  {
    id: 'td-s-v13',
    level: 1,
    type: 'verdad',
    prompt:
      '¿Te gusta más llevar tú las manos en el faje o quedarte quieto/a dejando que yo te recorra completo?',
  },
  {
    id: 'td-s-v14',
    level: 1,
    type: 'verdad',
    prompt:
      '¿Qué recuerdo de una vez que nos besamos bien caliente todavía te prende cuando te acuerdas?',
  },
  {
    id: 'td-s-v15',
    level: 1,
    type: 'verdad',
    prompt:
      '¿Qué tan cerca de la entrepierna quieres que baje mis besos ahorita todavía en Suave?',
  },
  {
    id: 'td-s-v16',
    level: 1,
    type: 'verdad',
    prompt:
      '¿Prefieres luces completamente apagadas o una luz tenue para ver cada mirada mientras te desvisto?',
  },
  {
    id: 'td-s-v17',
    level: 1,
    type: 'verdad',
    prompt:
      '¿Qué te da más cosquillas calientes: que te lama suave atrás de la rodilla, la cintura o la oreja?',
  },
  {
    id: 'td-s-v18',
    level: 1,
    type: 'verdad',
    prompt:
      '¿Cuál es la señal tuya cuando ya estás bien mojado/a o duro/a y quieres que aceleremos?',
  },
  {
    id: 'td-s-v19',
    level: 1,
    type: 'verdad',
    prompt:
      '¿Te calienta más un masaje lento con aceite en las nalgas o besos húmedos por todo el pecho?',
  },
  {
    id: 'td-s-v20',
    level: 1,
    type: 'verdad',
    prompt:
      'Si pudieras pedir 3 minutos de pura boca en una sola zona tuya ahora mismo, ¿cuál pides?',
  },
  {
    id: 'td-s-v21',
    level: 1,
    type: 'verdad',
    prompt:
      '¿Qué es lo primero que viste hoy de mí que te dio ganas de jalarme a la cama?',
  },
  {
    id: 'td-s-v22',
    level: 1,
    type: 'verdad',
    prompt:
      '¿Te prende que te jale suave del pelo en la nuca mientras nos comemos a besos?',
  },
  {
    id: 'td-s-v23',
    level: 1,
    type: 'verdad',
    prompt:
      '¿Cómo te gusta que te toque por encima del calzón o bóxer antes de meter la mano directo?',
  },
  {
    id: 'td-s-v24',
    level: 1,
    type: 'verdad',
    prompt:
      '¿Qué canción o ambiente te pone en el mood exacto para quitarnos la ropa despacio?',
  },
  {
    id: 'td-s-v25',
    level: 1,
    type: 'verdad',
    prompt:
      '¿Te gusta más que te muerda el labio de abajo o que pase la punta de la lengua por tus labios?',
  },
  {
    id: 'td-s-v26',
    level: 1,
    type: 'verdad',
    prompt:
      '¿En qué momento del día traes más ganas acumuladas de mí últimamente?',
  },
  {
    id: 'td-s-v27',
    level: 1,
    type: 'verdad',
    prompt:
      '¿Qué parte de mi cuerpo te encanta agarrar con las dos manos cuando nos abrazamos fuerte?',
  },
  {
    id: 'td-s-v28',
    level: 1,
    type: 'verdad',
    prompt:
      '¿Te excita que te hable bajito al oído contándote qué quiero hacerte en cuanto acabemos el faje?',
  },
  {
    id: 'td-s-v29',
    level: 1,
    type: 'verdad',
    prompt:
      '¿Cuánto tiempo te gusta durar en juegos previos antes de pasar directo a lo más fuerte?',
  },
  {
    id: 'td-s-v30',
    level: 1,
    type: 'verdad',
    prompt:
      '¿Qué te prende más ahorita: que me quite todo delante de ti o quitármelo tú poco a poco?',
  },
  {
    id: 'td-s-r1',
    level: 1,
    type: 'reto',
    prompt:
      'Besa y chupa despacio los labios, mandíbula y cuello de tu pareja durante 45 segundos sin meter las manos.',
    tip: 'Respira bien caliente sobre su piel entre cada beso.',
  },
  {
    id: 'td-s-r2',
    level: 1,
    type: 'reto',
    prompt:
      'Mete ambas manos por debajo de su blusa o playera y soba toda su espalda y pecho durante un minuto.',
  },
  {
    id: 'td-s-r3',
    level: 1,
    type: 'reto',
    prompt:
      'Sube los dedos por la parte interna de sus muslos hasta rozar justo el borde de su calzón o bóxer.',
  },
  {
    id: 'td-s-r4',
    level: 1,
    type: 'reto',
    prompt:
      'Quítale una prenda despacio viéndole fijo a los ojos y dale un beso bien mojado en la piel que destapes.',
  },
  {
    id: 'td-s-r5',
    level: 1,
    type: 'reto',
    prompt:
      'Pega tu cuerpo al suyo pecho con pecho y froten las caderas lento 45 segundos mientras se dicen qué quieren hacer.',
  },
  {
    id: 'td-s-r6',
    level: 1,
    type: 'reto',
    prompt:
      'Agarra la mano de tu pareja y llévala directo por tres partes tuyas donde quieres que te bese ahorita.',
  },
  {
    id: 'td-s-r7',
    level: 1,
    type: 'reto',
    prompt:
      'Recorre con la punta de la lengua toda su oreja y bájale por el cuello mordiendo muy suave 30 segundos.',
  },
  {
    id: 'td-s-r8',
    level: 1,
    type: 'reto',
    prompt:
      'Siéntate encima de sus muslos frente a frente y bésense con lengua 40 segundos moviendo lento la cadera.',
  },
  {
    id: 'td-s-r9',
    level: 1,
    type: 'reto',
    prompt:
      'Amasa y aprieta sus nalgas por encima o debajo de la ropa interior un minuto entero sin parar.',
  },
  {
    id: 'td-s-r10',
    level: 1,
    type: 'reto',
    prompt:
      'Baja dejando besos húmedos por todo su abdomen hasta rozar justo arriba de la línea del calzón.',
  },
  {
    id: 'td-s-r11',
    level: 1,
    type: 'reto',
    prompt:
      'Pasa tus uñas suave desde la nuca hasta la espalda baja 45 segundos haciendo que se estremezca.',
  },
  {
    id: 'td-s-r12',
    level: 1,
    type: 'reto',
    prompt:
      'Chupa y lame suave alrededor de sus pezones durante 40 segundos mirando de reojo su reacción.',
  },
  {
    id: 'td-s-r13',
    level: 1,
    type: 'reto',
    prompt:
      'Dile al oído con voz bien bajita dos cosas sucias que te mueres por hacerle hoy.',
  },
  {
    id: 'td-s-r14',
    level: 1,
    type: 'reto',
    prompt:
      'Frota la palma caliente sobre su entrepierna por encima de la tela durante 35 segundos en ritmo lento.',
  },
  {
    id: 'td-s-r15',
    level: 1,
    type: 'reto',
    prompt:
      'Jala suavemente su playera hacia arriba y pásale la lengua despacio de un huesito de la cadera al otro.',
  },
  {
    id: 'td-s-r16',
    level: 1,
    type: 'reto',
    prompt:
      'Abrázalo/a por detrás en cucharita y soba pecho, panza y muslos 50 segundos mientras muerdes su hombro.',
  },
  {
    id: 'td-s-r17',
    level: 1,
    type: 'reto',
    prompt:
      'Deja que te vende o tape los ojos y adivina qué parte de su cuerpo estás besando durante 30 segundos.',
  },
  {
    id: 'td-s-r18',
    level: 1,
    type: 'reto',
    prompt:
      'Chúpale dos dedos despacio viéndole fijo a los ojos como probando lo que viene después.',
  },
  {
    id: 'td-s-r19',
    level: 1,
    type: 'reto',
    prompt:
      'Quítate tú mismo/a una prenda bailando pegado/a casi encima sin dejar de mirarlo/a.',
  },
  {
    id: 'td-s-r20',
    level: 1,
    type: 'reto',
    prompt:
      'Dale un masaje tibio en la parte interna de los muslos subiendo cada vez más cerca del centro 45 segundos.',
  },
  {
    id: 'td-s-r21',
    level: 1,
    type: 'reto',
    prompt:
      'Muérdele despacio el labio inferior, jala tantito y mete la lengua lento otros 30 segundos.',
  },
  {
    id: 'td-s-r22',
    level: 1,
    type: 'reto',
    prompt:
      'Pega tu frente a la suya respirando agitados y froten narices y labios 25 segundos antes de besarse.',
  },
  {
    id: 'td-s-r23',
    level: 1,
    type: 'reto',
    prompt:
      'Recorre con besos mojados toda la parte interna de su brazo desde la muñeca hasta el cuello.',
  },
  {
    id: 'td-s-r24',
    level: 1,
    type: 'reto',
    prompt:
      'Pon sus manos en tus nalgas y muévete contra ellas 30 segundos enseñándole qué tanta presión te gusta.',
  },
  {
    id: 'td-s-r25',
    level: 1,
    type: 'reto',
    prompt:
      'Baja el cierre o desabrocha una prenda usando únicamente la boca sin meter las manos.',
  },
  {
    id: 'td-s-r26',
    level: 1,
    type: 'reto',
    prompt:
      'Pasa un dedo mojado dibujando círculos lentos justo alrededor del ombligo bajando cada vuelta un poco más.',
  },
  {
    id: 'td-s-r27',
    level: 1,
    type: 'reto',
    prompt:
      'Échale aliento calientito directo encima del calzón o bóxer y da un beso largo justo ahí por fuera.',
  },
  {
    id: 'td-s-r28',
    level: 1,
    type: 'reto',
    prompt:
      'Soba su espalda baja y nalgas con aceite o crema tibiecita durante un minuto completo.',
  },
  {
    id: 'td-s-r29',
    level: 1,
    type: 'reto',
    prompt:
      'Acuéstalo/a boca abajo y llénale toda la espalda y los muslos de besos húmedos y mordiditas suaves.',
  },
  {
    id: 'td-s-r30',
    level: 1,
    type: 'reto',
    prompt:
      'Comanse a besos con manos inquietas por todo el cuerpo 45 segundos sin poder tocar todavía por debajo del calzón.',
  },

  // ================= NIVEL 2: RUDO =================
  {
    id: 'td-r-v1',
    level: 2,
    type: 'verdad',
    prompt:
      'Si nos vamos directo a coger duro ahorita, ¿en qué pose, ritmo y qué tan fuerte quieres que te agarre?',
  },
  {
    id: 'td-r-v2',
    level: 2,
    type: 'verdad',
    prompt:
      '¿Cuál es la grosería o frase más sucia que te prende oír al oído cuando vamos a toda velocidad?',
  },
  {
    id: 'td-r-v3',
    level: 2,
    type: 'verdad',
    prompt:
      '¿Cuál es la cochinada o fantasía sexual más pesada que todavía no me has pedido directo?',
  },
  {
    id: 'td-r-v4',
    level: 2,
    type: 'verdad',
    prompt:
      'Cuando te hago oral, ¿qué movimiento de lengua, chupada o dedos te deja temblando más rápido?',
  },
  {
    id: 'td-r-v5',
    level: 2,
    type: 'verdad',
    prompt:
      '¿Te calienta más que te aplaste contra la cama o pared sin dejarte mover, o montarte encima y cogerme a tu ritmo?',
  },
  {
    id: 'td-r-v6',
    level: 2,
    type: 'verdad',
    prompt:
      '¿Qué tan duro te gusta que te agarre de las nalgas, caderas o del pelo cuando ya estás a punto de venirte?',
  },
  {
    id: 'td-r-v7',
    level: 2,
    type: 'verdad',
    prompt:
      '¿Qué te da más morbo ahorita: vernos coger enfrente de un espejo o taparte los ojos sin saber qué te voy a hacer?',
  },
  {
    id: 'td-r-v8',
    level: 2,
    type: 'verdad',
    prompt:
      '¿En qué parte fuera de la cama (sillón, mesa, regadera o carro) quieres echarnos un palo rápido esta semana?',
  },
  {
    id: 'td-r-v9',
    level: 2,
    type: 'verdad',
    prompt:
      '¿Prefieres que te lleve casi hasta venirte y pare para aguantar más, o que te dé duro hasta acabar juntos?',
  },
  {
    id: 'td-r-v10',
    level: 2,
    type: 'verdad',
    prompt:
      'De la sección de Posiciones en Rudo, ¿cuál quieres que hagamos apenas soltemos el teléfono?',
  },
  {
    id: 'td-r-v11',
    level: 2,
    type: 'verdad',
    prompt:
      '¿Qué gemido, mordida o manoseo mío hace que pierdas la cabeza por completo en la cama?',
  },
  {
    id: 'td-r-v12',
    level: 2,
    type: 'verdad',
    prompt:
      'Cuenta sin pena cuál fue la cogida más sudada y pasada de ruda que nos hemos echado juntos.',
  },
  {
    id: 'td-r-v13',
    level: 2,
    type: 'verdad',
    prompt:
      '¿Te gusta más que te dé un oral largo hasta hacerte acabar en mi boca o usarlo nada más para prenderte antes de meterla?',
  },
  {
    id: 'td-r-v14',
    level: 2,
    type: 'verdad',
    prompt:
      '¿Cuál es la posición donde sientes que entra más hondo y te hace gemir sin poder aguantarte?',
  },
  {
    id: 'td-r-v15',
    level: 2,
    type: 'verdad',
    prompt:
      '¿Qué te calienta más que te hagan por detrás: nalgadas sonoras, jalón de pelo o que te aprieten duro de las caderas?',
  },
  {
    id: 'td-r-v16',
    level: 2,
    type: 'verdad',
    prompt:
      '¿Alguna vez te has tocado pensando en una cochinada específica que hicimos juntos? ¿Cuál fue?',
  },
  {
    id: 'td-r-v17',
    level: 2,
    type: 'verdad',
    prompt:
      '¿Prefieres un 69 bien cochino donde los dos estén dándose boca a la vez o enfocarte solo en recibir tú primero?',
  },
  {
    id: 'td-r-v18',
    level: 2,
    type: 'verdad',
    prompt:
      '¿Qué palabra sucia o apodo caliente en la cama te prende al doble cuando te la digo mientras cogemos?',
  },
  {
    id: 'td-r-v19',
    level: 2,
    type: 'verdad',
    prompt:
      '¿Te da morbo que te aten las muñecas con una prenda o corbata para que no puedas defenderte de lo que te haga?',
  },
  {
    id: 'td-r-v20',
    level: 2,
    type: 'verdad',
    prompt:
      'Si tuvieras que elegir ahorita entre un palo rapidísimo contra la pared o 30 minutos de sexo sucio sin prisa, ¿cuál agarras?',
  },
  {
    id: 'td-r-v21',
    level: 2,
    type: 'verdad',
    prompt:
      '¿Qué cosa quieres probar en la cama que todavía te da poquito nervio pedirme directo?',
  },
  {
    id: 'td-r-v22',
    level: 2,
    type: 'verdad',
    prompt:
      '¿Te gusta que te vean a los ojos mientras me la chupas o prefieres cerrar los ojos y perderte en el ritmo?',
  },
  {
    id: 'td-r-v23',
    level: 2,
    type: 'verdad',
    prompt:
      '¿Dónde prefieres terminar cuando cogemos duro: adentro, en el pecho/panza o en la boca?',
  },
  {
    id: 'td-r-v24',
    level: 2,
    type: 'verdad',
    prompt:
      '¿Qué tanto te prende escucharme gemir o hablar sucio sin aguantarme nada?',
  },
  {
    id: 'td-r-v25',
    level: 2,
    type: 'verdad',
    prompt:
      '¿Cuál es el juguete o accesorio (vibrador, lubricante frío/caliente, vendas, esposas) que más ganas tienes de meter hoy?',
  },
  {
    id: 'td-r-v26',
    level: 2,
    type: 'verdad',
    prompt:
      '¿Te excita más hacerlo de madrugada medio dormidos y calientes o a plena luz del día viéndonos todo?',
  },
  {
    id: 'td-r-v27',
    level: 2,
    type: 'verdad',
    prompt:
      '¿Qué parte mía te dan ganas de morder o chupar duro cuando ya estás bien prendido/a?',
  },
  {
    id: 'td-r-v28',
    level: 2,
    type: 'verdad',
    prompt:
      '¿Te gusta más que te den en cuatro, de cucharita apretada o arriba cabalgando sin parar?',
  },
  {
    id: 'td-r-v29',
    level: 2,
    type: 'verdad',
    prompt:
      '¿Cuánto aguantas sin correrte cuando te hacen el mejor oral o paja/dedeo de tu vida?',
  },
  {
    id: 'td-r-v30',
    level: 2,
    type: 'verdad',
    prompt:
      '¿Qué te da más morbo: hacerlo en silencio total para que nadie oiga afuera o soltar todo sin callarte nada?',
  },
  {
    id: 'td-r-v31',
    level: 2,
    type: 'verdad',
    prompt:
      '¿Qué parte de tu cuerpo quieres que te nalguee o apriete más fuerte hoy?',
  },
  {
    id: 'td-r-v32',
    level: 2,
    type: 'verdad',
    prompt:
      '¿Te gustaría que te grabara o tomara fotos íntimas solo para nosotros dos o prefieres dejarlo todo en vivo?',
  },
  {
    id: 'td-r-v33',
    level: 2,
    type: 'verdad',
    prompt:
      '¿Cuál fue la vez que más rápido te hiciste venir conmigo y qué estábamos haciendo exacto?',
  },
  {
    id: 'td-r-v34',
    level: 2,
    type: 'verdad',
    prompt:
      '¿Te prende que meta los dedos mientras te doy oral al mismo tiempo o prefieres pura lengua bien mojada?',
  },
  {
    id: 'td-r-v35',
    level: 2,
    type: 'verdad',
    prompt:
      '¿Qué ropa interior mía o falta de ella hace que quieras cogerme sin siquiera quitarnos todo?',
  },
  {
    id: 'td-r-v36',
    level: 2,
    type: 'verdad',
    prompt:
      '¿Te calienta que te marquen con mordidas o chupetones escondidos en muslos, nalgas o pecho?',
  },
  {
    id: 'td-r-v37',
    level: 2,
    type: 'verdad',
    prompt:
      '¿Qué te vuelve más loco/a: empezar lentísimo hasta desesperarte o empezar de golpe bien duro?',
  },
  {
    id: 'td-r-v38',
    level: 2,
    type: 'verdad',
    prompt:
      'Si hoy tuvieras pase libre para darme tres órdenes sexuales sin que pueda decir que no, ¿cuáles serían?',
  },
  {
    id: 'td-r-v39',
    level: 2,
    type: 'verdad',
    prompt:
      '¿Te prende ver cómo me toco yo solo/a enfrente de ti mientras me ves con ganas?',
  },
  {
    id: 'td-r-v40',
    level: 2,
    type: 'verdad',
    prompt:
      '¿Qué te da más placer: doble estímulo por dentro y por fuera o empujones rectos bien profundos hasta el fondo?',
  },
  {
    id: 'td-r-v41',
    level: 2,
    type: 'verdad',
    prompt:
      '¿En qué parte de la casa nos falta estrenarnos echando un buen palo?',
  },
  {
    id: 'td-r-v42',
    level: 2,
    type: 'verdad',
    prompt:
      '¿Te calienta que te digan "eres mío/a" o algo mucho más sucio mientras te agarran duro?',
  },
  {
    id: 'td-r-v43',
    level: 2,
    type: 'verdad',
    prompt:
      '¿Cuántos rounds seguidos aguantas conmigo hoy si nos dejamos llevar sin prisa?',
  },
  {
    id: 'td-r-v44',
    level: 2,
    type: 'verdad',
    prompt:
      '¿Qué fantasía de sexo en un lugar con riesgo de que casi nos cachen te gustaría cumplir algún día?',
  },
  {
    id: 'td-r-v45',
    level: 2,
    type: 'verdad',
    prompt:
      'Cuando estás encima mandando tú, ¿prefieres rebotar arriba y abajo o frotarte fuerte en círculos sin salir?',
  },
  {
    id: 'td-r-v46',
    level: 2,
    type: 'verdad',
    prompt:
      '¿Qué es lo más cochino que has pensado hacerme hoy desde que abrimos el juego?',
  },
  {
    id: 'td-r-v47',
    level: 2,
    type: 'verdad',
    prompt:
      '¿Te gusta que te tapen la boca con un beso salvaje cuando ya no puedes aguantar el grito?',
  },
  {
    id: 'td-r-v48',
    level: 2,
    type: 'verdad',
    prompt:
      '¿Cuál de mis gemidos o caras cuando me estoy viniendo te prende más?',
  },
  {
    id: 'td-r-v49',
    level: 2,
    type: 'verdad',
    prompt:
      '¿Prefieres un mañanero sudado nada más despertar o desvelarnos dándonos duro hasta quedar rendidos?',
  },
  {
    id: 'td-r-v50',
    level: 2,
    type: 'verdad',
    prompt:
      'Dime sin rodeo cómo quieres que acabemos esta noche para irnos a la cama felices.',
  },
  {
    id: 'td-r-r1',
    level: 2,
    type: 'reto',
    prompt:
      'Acorrala a tu pareja contra la pared, aplástale las muñecas arriba y bésala con hambre 45 segundos pegando las caderas.',
  },
  {
    id: 'td-r-r2',
    level: 2,
    type: 'reto',
    prompt:
      'Quítale la ropa que queda usando manos firmes y mordidas ricas sin darle respiro.',
  },
  {
    id: 'td-r-r3',
    level: 2,
    type: 'reto',
    prompt:
      'Dale 60 segundos de buen oral combinando lengua bien mojada y chupada fuerte sin meter las manos.',
  },
  {
    id: 'td-r-r4',
    level: 2,
    type: 'reto',
    prompt:
      'Ponlo/a boca abajo al filo de la cama, ábrele bien los muslos y dale lengua y dedos por toda la zona un buen rato (45 s).',
  },
  {
    id: 'td-r-r5',
    level: 2,
    type: 'reto',
    prompt:
      'Tápale los ojos con una prenda y mézclale manoseo rápido, mordidas en muslos y besos mojados abajo por un minuto.',
  },
  {
    id: 'td-r-r6',
    level: 2,
    type: 'reto',
    prompt:
      'Súbete encima, agárralo/a duro de los hombros y rebota con fuerza 40 segundos sin dejar que te toque la cintura.',
  },
  {
    id: 'td-r-r7',
    level: 2,
    type: 'reto',
    prompt:
      'Suelta tres nalgadas firmes que suenen rico seguidas de sobada profunda y besos calientes ahí mismo.',
  },
  {
    id: 'td-r-r8',
    level: 2,
    type: 'reto',
    prompt:
      'Escojan una postura de Posiciones en Rudo y denle 20 metidas bien rápidas seguidas de 5 segundos quietos al fondo.',
  },
  {
    id: 'td-r-r9',
    level: 2,
    type: 'reto',
    prompt:
      'Dile al oído exactamente qué cochinada le vas a hacer en los próximos tres minutos mientras le das mano rápido abajo.',
  },
  {
    id: 'td-r-r10',
    level: 2,
    type: 'reto',
    prompt:
      'Llévalo/a casi hasta que se venga con boca y dedos, frena 5 segundos respirando encima y retoma al doble.',
  },
  {
    id: 'td-r-r11',
    level: 2,
    type: 'reto',
    prompt:
      'Agárrale las caderas desde atrás con fuerza y marca el ritmo que tú quieras un minuto entero sin soltar.',
  },
  {
    id: 'td-r-r12',
    level: 2,
    type: 'reto',
    prompt:
      'Pónganse encuerados frente al espejo más cercano pegados cuerpo con cuerpo 45 segundos viendo cada roce.',
  },
  {
    id: 'td-r-r13',
    level: 2,
    type: 'reto',
    prompt:
      'Échense un 69 bien pegados durante 60 segundos intentando hacer gemir primero al otro sin perder el ritmo.',
  },
  {
    id: 'td-r-r14',
    level: 2,
    type: 'reto',
    prompt:
      'Híncate enfrente de tu pareja sentada al borde de la cama y dale 50 segundos de oral viéndole directo a los ojos.',
  },
  {
    id: 'td-r-r15',
    level: 2,
    type: 'reto',
    prompt:
      'Átale las muñecas al frente con una bufanda o camisa y juega 60 segundos con su cuerpo como tú mandes.',
  },
  {
    id: 'td-r-r16',
    level: 2,
    type: 'reto',
    prompt:
      'Ponlo/a en cuatro, separa las nalgas con ambas manos y dale lengua bien mojada por detrás durante 45 segundos.',
  },
  {
    id: 'td-r-r17',
    level: 2,
    type: 'reto',
    prompt:
      'Hazle una paja o dedeo bien lubricado y rápido durante 50 segundos mientras le muerdes el cuello y dices groserías.',
  },
  {
    id: 'td-r-r18',
    level: 2,
    type: 'reto',
    prompt:
      'Tócate frente a tu pareja 40 segundos sin pena mientras te mira pegado/a a ti sin poder tocarte todavía.',
  },
  {
    id: 'td-r-r19',
    level: 2,
    type: 'reto',
    prompt:
      'Jálalo/a suave del pelo desde atrás mientras aceleras las metidas 40 segundos seguidos sin aflojar.',
  },
  {
    id: 'td-r-r20',
    level: 2,
    type: 'reto',
    prompt:
      'Pasa un hielo rápido por sus pezones y entrepierna y enseguida ponle la boca hirviendo abajo 35 segundos.',
  },
  {
    id: 'td-r-r21',
    level: 2,
    type: 'reto',
    prompt:
      'Móntate de espaldas (Cabalgata invertida) y rebota bien fuerte 45 segundos agarrándote de sus muslos.',
  },
  {
    id: 'td-r-r22',
    level: 2,
    type: 'reto',
    prompt:
      'Aguanta 45 segundos de oral intenso con las manos puestas en la cabecera sin poder mover ni un centímetro la cadera.',
  },
  {
    id: 'td-r-r23',
    level: 2,
    type: 'reto',
    prompt:
      'Combina dos dedos entrando rápido con chupada intensa al mismo compás durante 50 segundos.',
  },
  {
    id: 'td-r-r24',
    level: 2,
    type: 'reto',
    prompt:
      'Bésense con hambre comiéndose los gemidos mientras le metes empujones lentos pero clavados hasta el fondo 45 segundos.',
  },
  {
    id: 'td-r-r25',
    level: 2,
    type: 'reto',
    prompt:
      'Súbele una pierna arriba contra la pared y dale un palo rápido de pie durante 40 segundos.',
  },
  {
    id: 'td-r-r26',
    level: 2,
    type: 'reto',
    prompt:
      'Haz que te pida en voz alta exactamente lo que quiere que le hagas más duro antes de cumplirlo 45 segundos.',
  },
  {
    id: 'td-r-r27',
    level: 2,
    type: 'reto',
    prompt:
      'Frótense sexo con sexo bien mojados piel con piel 40 segundos sin meterla todavía para volverlo/a loco/a.',
  },
  {
    id: 'td-r-r28',
    level: 2,
    type: 'reto',
    prompt:
      'Dale 15 segundos de oral bien despacio, 15 medio y 20 segundos a máxima velocidad sin soltar.',
  },
  {
    id: 'td-r-r29',
    level: 2,
    type: 'reto',
    prompt:
      'Acuéstense de lado en cucharita, levántale la pierna de arriba y entra bien profundo desde atrás 50 segundos.',
  },
  {
    id: 'td-r-r30',
    level: 2,
    type: 'reto',
    prompt:
      'Soba y chupa fuerte sus pezones 30 segundos antes de bajar directo con la mano o boca entre sus piernas otros 30.',
  },
  {
    id: 'td-r-r31',
    level: 2,
    type: 'reto',
    prompt:
      'Pónganse al borde de una silla o sillón y denle 45 segundos rebotando bien pegados cara a cara.',
  },
  {
    id: 'td-r-r32',
    level: 2,
    type: 'reto',
    prompt:
      'Muerde suave sus muslos internos y nalgas dejando el calor marcado y remata con tres nalgadas firmes.',
  },
  {
    id: 'td-r-r33',
    level: 2,
    type: 'reto',
    prompt:
      'Sujétale la nuca suave mientras le das oral para que te marque exactamente la presión que más le gusta 45 segundos.',
  },
  {
    id: 'td-r-r34',
    level: 2,
    type: 'reto',
    prompt:
      'Jueguen al "quieto ahí": mete una almohada bajo su cadera, súbele los tobillos a tus hombros y dale duro 45 segundos.',
  },
  {
    id: 'td-r-r35',
    level: 2,
    type: 'reto',
    prompt:
      'Di una guarrada diferente al oído en cada empujón fuerte durante 30 segundos sin perder el ritmo.',
  },
  {
    id: 'td-r-r36',
    level: 2,
    type: 'reto',
    prompt:
      'Toma un trago de agua fresca o tibia, escúpelo o pásalo y bájate al segundo a hacerle oral 40 segundos.',
  },
  {
    id: 'td-r-r37',
    level: 2,
    type: 'reto',
    prompt:
      'Prohíbele venirse durante un minuto completo mientras usas tus mejores trucos con boca y manos.',
  },
  {
    id: 'td-r-r38',
    level: 2,
    type: 'reto',
    prompt:
      'Voltéalo/a de boca arriba a boca abajo sin hablar y empieza por detrás con ritmo firme 45 segundos.',
  },
  {
    id: 'td-r-r39',
    level: 2,
    type: 'reto',
    prompt:
      'Agarra sus tobillos bien abiertos sobre el colchón y clávala recto hasta el tope durante 40 segundos.',
  },
  {
    id: 'td-r-r40',
    level: 2,
    type: 'reto',
    prompt:
      'Pongan el espejo enfrente en cuatro y mantén el ritmo duro 45 segundos viendo todo el movimiento.',
  },
  {
    id: 'td-r-r41',
    level: 2,
    type: 'reto',
    prompt:
      'Aprieten todo abajo con fuerza estando adentro 25 segundos quietos mientras se muerden y besan el cuello.',
  },
  {
    id: 'td-r-r42',
    level: 2,
    type: 'reto',
    prompt:
      'Pasa la lengua bien plana desde la parte baja hasta arriba 10 veces seguidas antes de chupar fuerte 30 segundos.',
  },
  {
    id: 'td-r-r43',
    level: 2,
    type: 'reto',
    prompt:
      'Cambia de pose tres veces en un minuto sin que se salga ni bajen la calentura.',
  },
  {
    id: 'td-r-r44',
    level: 2,
    type: 'reto',
    prompt:
      'Usa lubricante o saliva en tus dos manos y trabaja arriba y abajo con ritmo rápido 45 segundos viéndole la cara.',
  },
  {
    id: 'td-r-r45',
    level: 2,
    type: 'reto',
    prompt:
      'Oblígalo/a a mantener los ojos abiertos mirándote directo mientras le das oral bien sucio 40 segundos.',
  },
  {
    id: 'td-r-r46',
    level: 2,
    type: 'reto',
    prompt:
      'En cuatro con el pecho pegado al colchón y las nalgas bien alzadas, dale duro 45 segundos agarrando caderas.',
  },
  {
    id: 'td-r-r47',
    level: 2,
    type: 'reto',
    prompt:
      'Sube encima en cuclillas con los pies apoyados en la cama y rebota con fuerza 35 segundos sin parar.',
  },
  {
    id: 'td-r-r48',
    level: 2,
    type: 'reto',
    prompt:
      'Pide una orden sexual directa ahorita y tu pareja tiene 60 segundos para cumplirla al pie de la letra.',
  },
  {
    id: 'td-r-r49',
    level: 2,
    type: 'reto',
    prompt:
      'Combina tres besos bien sucios con lengua, tres nalgadas buenas y 30 segundos de fricción dura sin ropa.',
  },
  {
    id: 'td-r-r50',
    level: 2,
    type: 'reto',
    prompt:
      'Dalo absolutamente todo 45 segundos con boca, manos o penetración como más te pida tu pareja para dejarla temblando.',
  },
];
