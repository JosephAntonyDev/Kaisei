const cartasData = [
    {
        id: 1,
        nombre: "Mi Primera Carta Digital",
        fecha: "2025-12-18",
        diseño: "sobre",
        destinatario: "Kelly",
        contenido: `Querida Kelly,

Esta es la primera carta que te escribo en este nuevo formato digital. Decidí crear este espacio especial porque las cartas en papel que te había escrito se perdieron (y también perdí las últimas que te hice), y no quiero que nuestros momentos se olviden.

Este lugar será como un cofre de tesoros, donde guardaré cada pensamiento, cada sentimiento, cada momento que quiero compartir contigo.

Espero que te guste tanto como a mí me gustó crearlo para ti.

Con todo mi cariño,
Joseph.`
    },
    {
        id: 2,
        nombre: "Un abrazo que me falto darte",
        fecha: "2025-12-22",
        diseño: "antiguo",
        destinatario: "Kelly",
        contenido: `Querida Kelly,

He querido escribirte esto desde hace meses, pero a veces las palabras se atoran cuando el corazón pesa tanto.

Sé que este año la vida nos puso a prueba de la forma más dura. Me dolió en el alma no poder estar físicamente ahí, sosteniendo tu mano, cuando tu mami partió al cielo. Sabes cuánto la quería y lo especial que ella fue conmigo; siempre confió en mí, incluso cuando éramos solo unos niños caminando sin rumbo.

Aunque no pude estar a tu lado en esos momentos, quiero decirte que no hubo ni un solo día en que no pensara en ti y en el dolor que estabas pasando. Quería estar a tu lado y abrazarte fuerte. Me sentí impotente por no poder correr hasta Huixtla y darte ese abrazo que tanto anhelaba darte.

No pude estar en ese instante, pero estare aquí para todo lo que viene. Para recordar su sonrisa, para honrar su confianza en nosotros y para seguir siendo ese amigo leal que ella tanto apreciaba.

No importa cuánto cambien nuestros caminos o cuánto tiempo pase, siempre guardaré un lugar especial para ella en mi memoria, y un lugar inamovible para ti en mi vida.

Con todo mi cariño y apoyo incondicional,
El amigo Joseph, como me decía tu mami.`
    },
    /*{
        id: 2,
        nombre: "Carta de Cumpleaños",
        fecha: "2024-03-15",
        diseño: "celebracion",
        destinatario: "Kelly",
        contenido: `¡Querida Kelly!

En este día tan especial quiero que sepas cuánto significas para mí. Tu amistad ha sido un regalo invaluable en mi vida, lleno de momentos compartidos, risas interminables y apoyo incondicional.

Que este nuevo año de vida te traiga toda la felicidad que mereces, nuevas aventuras y sueños cumplidos. Recuerda que siempre estaré aquí para ti, en las buenas y en las malas.

Eres una persona increíble y mereces todo lo mejor que el mundo tiene para ofrecer.

¡Feliz cumpleaños! 🎉🎂

Con todo mi cariño,
Tu amigo de siempre`
    },
    {
        id: 3,
        nombre: "Agradecimiento Sincero",
        fecha: "2024-06-22",
        diseño: "vintage",
        destinatario: "Kelly",
        contenido: `Querida Kelly,

Necesitaba escribirte para expresar mi más profundo agradecimiento por estar ahí cuando más te necesité. Tu apoyo durante esos momentos difíciles fue como un faro de luz en medio de la oscuridad.

No todos tienen la suerte de contar con una amiga tan leal y comprensiva como tú. Tu empatía y tu forma de escuchar sin juzgar son cualidades que admiro profundamente.

Las palabras se quedan cortas para expresar lo agradecido que estoy de tenerte en mi vida. Simplemente, gracias por ser quien eres.

Con gratitud infinita,
Tu amigo`
    },
    {
        id: 4,
        nombre: "Disculpas Sinceras",
        fecha: "2024-08-10",
        diseño: "elegante",
        destinatario: "Kelly",
        contenido: `Querida Kelly,

Escribo estas líneas con el corazón en la mano para pedirte disculpas por mi comportamiento reciente. Me he dado cuenta de que mis palabras o acciones te lastimaron, y eso es algo que lamento profundamente.

Nuestra amistad es muy valiosa para mí, y la idea de haberte herido me duele más de lo que puedo expresar. No hay excusas para lo que hice, solo el genuino deseo de enmendarlo.

Espero que puedas perdonarme y que podamos superar esto juntos. Prometo ser más cuidadoso y valorar aún más nuestra amistad.

Con arrepentimiento sincero,
Tu amigo`
    },
    {
        id: 5,
        nombre: "Felicitaciones por tu Logro",
        fecha: "2024-11-05",
        diseño: "moderno",
        destinatario: "Kelly",
        contenido: `¡Querida Kelly!

¡No puedo contener mi emoción! Tu logro reciente es simplemente extraordinario y merece ser celebrado con todo el entusiasmo del mundo.

Siempre supe que eras capaz de alcanzar grandes cosas, pero verte lograr este objetivo me llena de orgullo y alegría. Tu dedicación, tu esfuerzo y tu perseverancia han dado sus frutos, y no es casualidad.

Has trabajado tan duro para llegar hasta aquí, y todo ese esfuerzo ha valido la pena. Este es solo el comienzo de muchos más éxitos que vendrán.

¡Sigue brillando! ✨

Con admiración y orgullo,
Tu amigo incondicional`
    },
    {
        id: 6,
        nombre: "Solo porque sí",
        fecha: "2024-12-01",
        diseño: "minimalista",
        destinatario: "Kelly",
        contenido: `Querida Kelly,

No hay ninguna ocasión especial hoy, ni cumpleaños ni celebración. Solo quería recordarte que eres una persona increíble y que tu amistad hace mi vida mucho mejor.

A veces nos olvidamos de decirle a las personas importantes lo mucho que significan para nosotros. No quiero caer en ese error.

Tu forma de ver el mundo, tu sonrisa, tu risa, tus consejos... todo eso hace que cada día sea un poco mejor.

Gracias por existir y por ser mi amiga.

Con cariño,
Tu amigo de siempre`
    },
    {
        id: 7,
        nombre: "Te extraño",
        fecha: "2024-09-18",
        diseño: "romantico",
        destinatario: "Kelly",
        contenido: `Querida Kelly,

Hace tiempo que no nos vemos y quería que supieras que te extraño mucho. Extraño nuestras conversaciones, nuestras risas, esos momentos donde el tiempo parecía no existir.

La vida nos ha mantenido ocupados, lo sé, pero espero que pronto podamos encontrarnos de nuevo. Hay tantas cosas que quiero contarte, tantas historias que compartir.

Mientras tanto, recuerda que aunque no nos veamos tan seguido, siempre estás en mis pensamientos.

Espero verte pronto.

Con nostalgia,
Tu amigo`
    },
    {
        id: 8,
        nombre: "Reflexiones de Medianoche",
        fecha: "2024-10-30",
        diseño: "antiguo",
        destinatario: "Kelly",
        contenido: `Querida Kelly,

Son las 2 de la mañana y no puedo dormir. Me puse a pensar en todas las veces que hemos estado ahí el uno para el otro, en todas las aventuras que hemos vivido juntos.

Es curioso cómo una amistad puede cambiar tu vida de maneras que nunca imaginaste. Tú has sido esa persona para mí. Has sido mi confidente, mi cómplice, mi apoyo.

No sé qué me deparará el futuro, pero sé que quiero que estés en él. Porque las mejores historias de mi vida tienen tu nombre escrito en ellas.

Gracias por todos estos años de amistad.

En la quietud de la noche,
Tu amigo pensativo`
    }*/
];

function obtenerTodasLasCartas() {
    return cartasData;
}

function obtenerCartaPorId(id) {
    return cartasData.find(carta => carta.id === id);
}

function agregarNuevaCarta(carta) {
    const nuevoId = Math.max(...cartasData.map(c => c.id)) + 1;
    carta.id = nuevoId;
    cartasData.push(carta);
    return carta;
}
