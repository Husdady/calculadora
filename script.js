/* My First Calculator */

/* Mi primera calculadora sin hacer uso de eval() 
Para poder calcular he usado expresiones regulares para hacer un filtro
de busqueda avanzado sobre el posicionamiento de numeros y operadores a
calcular. He comantado el codigo en español, no solo para mejorar su lectura
sino para no olvidarme en un futuro de las cosas que hace
*/

document.addEventListener('DOMContentLoaded', ()=>{

/* Selectores */
const textInput = document.getElementById('input'),
      box = document.querySelector('.calculator-box'),
      buttonOn = document.querySelector('.on'),
      buttonOff = document.querySelector('.off'),
      buttonAll = document.querySelectorAll('button');

// Agregar clase active a boton con clase "on"
buttonOn.classList.add('active');
valueDefault();

// Limpiamos todo el valor de entrada de la calculadora
const cleanCalculator = () =>{
textInput.textContent = '';
};


// Igualar a 0
function valueDefault(){
textInput.textContent = "0";
}

// Eliminar ultimo caracter
function removeLastCharacter(z){
z.innerHTML = z.innerHTML.slice(0, -1);
}

// Eliminar ultimo caracter
const deleteLastCharacter = y =>{
let lastSupTag = textInput.querySelector("sup:last-child"),
    selectLastTagSup = /<sup>.+<\/sup>$/gim;

if (textInput.contains(lastSupTag)){ /*
Si identificador input contiene un sup al final del contexto */

selectLastTagSup.test(textInput.innerHTML) 
/* Si hay una etiqueta sup al final y despues no hay numeros o signos
eliminar numeros en la etiqueta sup */
? removeLastCharacter(lastSupTag) 
: null // No hagas nada

lastSupTag.innerHTML === "" /* Si el contenido de la etiqueta sup 
esta vacio, eliminame la etiqueta sup, esta no se elimina automaticamente*/
? lastSupTag.remove()
: removeLastCharacter(y) /* de lo contrario primero elimina el texto que
esta despues*/

}

else {

    y.textContent.length === 1 /* Si en el contenido del input solo hay
    una caracter, al volver hacer click en el boton, igualame a 0 */
    ? valueDefault()
    : removeLastCharacter(y) /* De lo contrario, eliminame el ultimo caracter*/

}

    }


// Agregar caracteres a input
const addCharacter = (character, elementParent) =>{

if (elementParent.innerHTML == "0" || elementParent.innerHTML == "x"){
elementParent.innerHTML = character; // Igualar texto al texto del parametro text
} else {
elementParent.innerHTML += character;  // Concatenar texto al texto del parametro text
textInput.scrollLeft += 20;
}

    }


let statusPower = true; // La usaremos luego para validar cosas

// Condicion para agregar numeros
const addNumber = number =>{

    let lastSupTag = textInput.querySelector('sup:last-child');

    if (textInput.contains(lastSupTag)){ /* Si input contiene una etiqueta
    sup al final */

    lastSupTag.innerHTML === "x" /* Si el contexto de la etiqueta sup es
    igual a x cambiamelo por el numero, si no es x concatena numeros*/
    ? addCharacter(number, lastSupTag)
    : statusPower == true /* si es true, concatename en etiqueta sup */
        ? addCharacter(number, lastSupTag)
        : addCharacter(number, textInput) /* si es false, concatename
        fuera de la etiqueta sup */

    }

    else {

    addCharacter(number, textInput); /* si no contiene etiquetas sup
    agregar numeros fuera de esta etiqueta */
    justOneExponent = true;    /* cambiamos a true para volver a escribir
    etiquetas sup */

    }

}


let justOneExponent = true; // La usaremos luego para validar cosas

// Condicion para agregar operadores
const addOperator = operator =>{

    if (operator.includes("a")){

    let newSup = document.createElement("sup"),
          newTextSup = document.createTextNode("x");

         newSup.appendChild(newTextSup);

         statusPower = true;

         // si es true agregame una tag <sup>
         if (justOneExponent === true) textInput.appendChild(newSup)

         textInput.scrollLeft += 20; // Para mantener el ultimo numero y no perder focus

         justOneExponent = false; // cambia a false para ya no agregar etiquetas sup


    } else {

        addCharacter(operator, textInput); // concatenar operadores
        statusPower = false; /* cambiando a false para dejar de escribir en <sup>
        y escribir fuera de esta */
        justOneExponent = true; // cambiando a true para volver a agregar <sup>

    }
    
}


// Evento click para agregar el signo de raiz
buttonAll[3].addEventListener('click', () =>{

let tokenRoot = `√`;
 if (textInput.innerHTML === "0"){
textInput.innerHTML = tokenRoot;
} else {
textInput.innerHTML += tokenRoot;
}

})

// Evento click en boton con clase "on"
const activeCalculator = () =>{

buttonOff.classList.remove('active'); // Agregar clase
buttonOn.classList.add('active'); // Remover clase
valueDefault(); // Valor de input igual a 0

for(let i=0; i<buttonAll.length; i++){
    buttonAll[i].removeAttribute('disabled');
    // Remover todos los atributos disabled en todos los botones  
}

    }


// Evento click en boton Off
const desactiveCalculator = () =>{

buttonOn.classList.remove('active'); // Remover clase
buttonOff.classList.add('active'); // Agregar clase

for(let i=0; i<buttonAll.length; i++){
    if(buttonAll[i].className !== 'on' && buttonAll[i].className !== 'off active'){
    buttonAll[i].disabled = "true"; /* Agregar atributo disabled solo a
    botones que no tengan la clase "on" ni "off" */
    }
}

    }


/* Evento click en el calculator-box para luego seleccionar cada boton
dependiendo de su contexto */ 
box.addEventListener('click', e =>{

    let target = e.target;

    if (target.className === "on"){

        return activeCalculator();

    }

    else if (target.className === "off") {

        desactiveCalculator();
        return cleanCalculator();

    }

    else if (target.className === "delete-last-character"){

        return deleteLastCharacter(textInput);

    }

    else if (target.className === "delete-all-character"){

        return valueDefault();

    }

    else if (target.className === "number"){
        
        return addNumber(target.innerHTML);

    }

    else if (target.className === "operator"){

        return addOperator(target.innerHTML);

    }

    else if (target.className === "result"){

        justOneExponent = true;
        return textInput.innerHTML = calculate(textInput.innerHTML);

    }    

})

/* Necesitas saber expresiones regulares para entender esto,
no se si es la mejor forma de hacerlo, puede que hayan otras mejores
formas de reducir las siguientes expresiones regulares*/
const calculate = operation =>{

    // output 3√9 = 9
    let multiplication_root = /((?:\-)?(?:\d+)?[\.]?(?:\d+|\Infinity))\√((?:\d+)?[\.]?(?:\d+|\Infinity))/,
    // output √9 = 3
    root = /\√((?:\d+)?[\.]?(?:\d+|\Infinity))/,
    // output 3² = 9
    power = /((?:\-)?(?:\d+)?[\.]?(?:\d+|Infinity))<sup>(\d+)<\/sup>/,
    // output 9/3 = 3
    division = /((?:\-)?(?:\d+)?[\.]?(?:\d+|\Infinity))\/((?:\-)?(?:\d+)?[\.]?(?:\d+|\Infinity)(?:\.\d+)?)/,
    // output 9×3 = 27
    multiplication = /((?:\-)?(?:\d+)?[\.]?(?:\d+|\Infinity))\×((?:\-)?(?:\d+)?[\.]?(?:\d+|\Infinity)(?:\.\d+)?)/, 
    // output 9%3 = 0 
    modulus = /((?:\d+)?[\.]?(?:\d+|\Infinity))\%((?:\-)?(?:\d+)?[\.]?(?:\d+|\Infinity)(?:\.\d+)?)/,
    // output 9+3 = 12
    sum = /((?:\-)?(?:\d+)?[\.]?(?:\d+|\Infinity))\+([\.]?(?:\d+|\Infinity)(?:\.\d+)?)/,
    // output 9-3 = 6
    subtraction = /((?:\-)?(?:\d+)?[\.]?(?:\d+|\Infinity))\-([\.]?(?:\d+|\Infinity)(?:\.\d+)?)/,
    // output 3% = 0.03
    percentage = /((?:\-)?(?:\d+)?[\.]?(\d+))\%(?!\d+|\b$)/g,
    // output 4+2% = 4.08 
    percentageOperation = /((?:\-)?(?:\d+)?[\.]?(?:\d+|\Infinity))(\+|\-)([\.]?(?:\d+|\Infinity)(?:\.\d+)?)\%(?!\d+|\b$)/,
    // En caso de que haya +- cambiarlo por +
    conditionMinus = /\+\-|\-\+/,
    // En caso de que haya -- cambiarlo por -
    conditionPlus = /\-\-|\+\+/,
    // En caso de que haya .2 cambiarlo por 0.2
    decimalNumbers = /^(\.)(\d+)/;

    let newExpr;

    if (decimalNumbers.test(operation)){

    operation = operation.replace(decimalNumbers, (match, point, number)=>{

    return "0" + point + number

    })

       }
       
    else if (conditionMinus.test(operation)){

        operation = operation.replace(conditionMinus, "-");

        }

        else if (conditionPlus.test(operation)){

        operation = operation.replace(conditionPlus, "+");

        }
       

    // Si no es numero, es decir, string, booleano, null, undefined
    if (isNaN(operation)){

    /* Comprobara cada una de las expresiones regulares, reemplazara
    y ejecutara su operacion en la pantalla*/ 

        if (power.test(operation)){

        newExpr = operation.replace(power, (match, a, b)=>{

        return Math.pow(+a, +b);

        })

        }

        else if (multiplication_root.test(operation)){

        newExpr = operation.replace(multiplication_root, (match, a, b)=>{
    
        return +a * Math.sqrt(+b);
    
        })
    
        }

        
        else if (root.test(operation)){

        newExpr = operation.replace(root, (match, a)=>{
    
        return Math.sqrt(+a);
    
        })
    
        }
            
        else if (percentageOperation.test(operation)){

        newExpr = operation.replace(percentageOperation, (match, a, b, c)=>{
        return +a + b + (+a * +c) / 100;

        })

        }

        else if (percentage.test(operation)){

        newExpr = operation.replace(percentage, (match, a)=>{

        return +a / 100;
    
        })
    
        }
      

        else if (division.test(operation)){

        newExpr = operation.replace(division, (match, a, b)=> {
    
        if(b != 0){
        return +a / +b;
        }
        else{
        return operation = "0";
        }

        });

        }


        else if (multiplication.test(operation)){

        newExpr = operation.replace(multiplication, (match, a, b)=>{

        return +a * +b;

       	});

        } 


        else if (modulus.test(operation)){

            newExpr = operation.replace(modulus, (match, a, b)=>{
            
            function mod(n, m) {
            return ((n % m) + m)  % m;
            }
                    
            return mod(+a, +b);
                    
            });
                    
            }
        

       	else if (subtraction.test(operation)){

        newExpr = operation.replace(subtraction, (match, a, b)=>{

        return +a - +b;

        });

        }


        else if (sum.test(operation)){

        newExpr = operation.replace(sum, (match, a, b)=>{

        return +a + +b;

        });

        }


        else if (operation === "Infinity"){

        return operation = "Infinity"

        }

        else if (operation === "NaN"){
       
        return operation = "0"
       
        }

        else {
           
        return operation = "Syntax Error!";

        }


       	return calculate(newExpr);


        }


    else {

    return operation;

    }    
}

});