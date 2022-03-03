const querty = "QWERTYUIOPASDFGHJKLÑ<ZXCVBNM.";
const palabras = ['apoyo', 'amigo', 'armar', 'antes', 'ayuda', 'ahora', 'abrir', 'audaz', 'ajeno', 'aroma', 'bajar', 'bella', 'bueno', 'breve', 'banal', 'basar', 'burdo', 'broma', 'brisa', 'bello', 'beber', 'bingo', 'burla', 'burro', 'barco', 'busca', 'crear', 'comer', 'causa', 'carta', 'claro', 
'coger', 'calma', 'cerca', 'campo', 'culpa', 'deseo', 'donde', 'decir', 'dulce', 'dejar', 'deber', 'dicha', 'dueño', 'dotar', 'dolor', 'denso', 'dieta', 'donar', 'durar', 'dicho', 'danza', 'etapa', 'estar', 'error', 'echar', 'enojo', 'ebrio', 'feliz', 'final', 'forma', 'falta', 'frase', 'golpe', 'grupo', 'girar', 'globo', 'grito', 'gordo', 'ganar', 'grave', 'grato', 'gente', 'gozar', 'gusto', 'guapa', 'honor', 'hogar', 'ideal', 'icono', 'igual', 'iluso', 'ijada', 'ileso', 'idear', 'ideas', 'impar', 'indio', 'joven', 'justo', 'juego', 'junto', 'jaula', 'kilos', 'karma', 'koala', 'lugar', 'lleno', 'libro', 'lento', 'libre', 'lindo', 'local', 'labor', 'lejos', 'listo', 'miedo', 'mucho', 'mujer', 'mundo', 'mejor', 'mayor', 'mirar', 'matar', 'nuevo', 'nivel', 'norma', 'nunca', 'nacer', 'noche', 'negro', 'notar', 'noble', 'nueva', 'orden', 'oasis', 'obrar', 'obeso', 'ojota', 'parte', 'papel', 'punto', 'pasar', 'pluma', 'pobre', 'quema', 'quita', 'queja', 'rueda', 'regar', 'robar', 'recto', 'resta', 'rubro', 'rigor', 'regir', 'ruido', 'serio', 'sobre', 'suelo', 'sucio', 'silla', 'sitio', 'tonto', 'turno', 'trama', 'trato', 'usado', 'usual', 'unido', 'untar', 'viaje', 'volar', 'venta', 'viejo', 'vivir', 'veloz', 'visto', 'valla', 'verde', 'voraz', 
'vicio', 'vital', 'wafle', 'yerba', 'yogur', 'zorro', 'zurdo']
var item = palabras[Math.floor(Math.random()*palabras.length)];
let rta = item.toUpperCase();
console.log(rta);
let iLetra = 1;
let iPalabra = 1;
let intento = '';
const idLetras=document.getElementById("letras");
const idDisposicionTeclado=document.getElementById("disposicionTeclado");
const container=document.querySelector(".contenedor");
const titulo=document.getElementById("titulo");
let aciertos = '';
let semiAciertos = '';
let fails = '';
 
// funcion para mostrar las letras del teclado
// tiene que recibir el listado de letras a mostrar
const mostrarLetras = listadoLetras => {
    idLetras.innerHTML="";
    // añadimos las letras
    listadoLetras.split('').map(el => {
        let span=document.createElement("span");
        span.addEventListener("click", teclaPulsada);
        span.innerText=el;
        if (el=="<") {
            span.classList.add("enviar");
            span.innerHTML = 'ENVIAR';
        };
        if (el==".") {
            span.innerHTML = '<img src="borrar.png" class="borrar">';
            span.classList.add("borrar");
            console.log('"'+span.innerText+'"');
        };
        if (aciertos.includes(el)){
            span.classList.add('acierto');
            console.log(aciertos);
            console.log('Acierto: '+el);
        }
        else if (semiAciertos.includes(el)){
            span.classList.add('malPos');
            console.log(semiAciertos);
            console.log('malPos: '+el);
        }
        else if (fails.includes(el)){
            span.classList.add('fail');
            console.log('fail: '+el);
            console.log(fails);
        };
        idLetras.appendChild(span);
    });
}

mostrarLetras(querty);
 
function teclaPulsada(e) {
    const tecla=this.classList && this.classList.contains("space") ? " " : this.innerHTML;
    console.log(tecla);
    if (6>iLetra>0 && 0<iPalabra<7 && tecla != 'ENVIAR' && tecla != '<img src="borrar.png" class="borrar">') {
        clase = '.p'+iPalabra + '.l' + iLetra;
        let letractual = document.querySelector(clase);
        letractual.innerHTML = tecla;
        iLetra += 1;
        if (tecla != 'ENVIAR'){
            intento += tecla;
        }
    }
    if (tecla == 'ENVIAR' && iLetra == 6) {
        if(intento == rta) {
            //container.classList.add('ganar');
            titulo.innerHTML = 'WINNER';
            for (i in rta) {
                aux = 1+parseInt(i);
                clase = '.p'+iPalabra + '.l' + (aux);
                let letractual = document.querySelector(clase);
                letractual.classList.add('acierto');
            }
            
        } 
        else {
            for (i in rta) {
                aux = 1+parseInt(i);
                clase = '.p'+iPalabra + '.l' + (aux);
                let letractual = document.querySelector(clase);
                if (rta.charAt(i) == intento.charAt(i)) {
                    letractual.classList.add('acierto');
                    aciertos += letractual.innerHTML;
                }
                else if (rta.includes(intento.charAt(i))) {
                    letractual.classList.add('malPos');
                    semiAciertos += letractual.innerHTML;
                } 
                else {
                    letractual.classList.add('fail');
                    fails += letractual.innerHTML;                     
                }
            }
            console.log(fails);
            console.log(aciertos);
            console.log(semiAciertos);
            iPalabra += 1;
            iLetra = 1;    
            intento = '';
            mostrarLetras(querty);    
        }
    }
    if (tecla == '<img src="borrar.png" class="borrar">' && iLetra>1) {
        iLetra -= 1;
        clase = '.p'+iPalabra + '.l' + iLetra;
        let letractual = document.querySelector(clase);
        letractual.innerHTML = '';
        intento = intento.substring(0, intento.length - 1);
    };
    if (iPalabra == 7) {
        container.classList.add('perder');
        titulo.innerHTML = 'LOOSER';
    }
}
 
