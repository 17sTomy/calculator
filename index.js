const $LOWER_VAL = document.querySelector("[data-lower-val]"),
    $HIGHER_VAL = document.querySelector("[data-higher-val]"),
    $BTN_NUMBERS = document.querySelectorAll("[data-number]"),
    $BTN_OPERATOR = document.querySelectorAll("[data-operator]"),
    $BTN_OPERATOR_SUB = document.querySelectorAll("[data-operator-sub]"),
    $BTN_DELETE_ALL = document.querySelectorAll("[data-delete-all]"),
    $BTN_DELETE = document.querySelectorAll("[data-delete]"),
    $BTN_EQUAL = document.querySelectorAll("[data-equal]")

let valorSuperior = "",
    valorInferior = "",
    operador = null,
    btnIgual = 0

const display = () => {
    $HIGHER_VAL.textContent = valorSuperior
    $LOWER_VAL.textContent = valorInferior
}

const calculate = () => {
    let resultado,
        valorSuperiorToNumber = parseFloat(valorSuperior),
        valorInferiorToNumber = parseFloat(valorInferior)

    if(isNaN(valorSuperiorToNumber) || isNaN(valorInferiorToNumber)) return 

    switch (operador) {
        case "+":
            resultado = valorSuperiorToNumber + valorInferiorToNumber
            break;
        case "-":
            resultado = valorSuperiorToNumber - valorInferiorToNumber
            break;
        case "x":
            resultado = valorSuperiorToNumber * valorInferiorToNumber
            break;
        case "÷":
            resultado = valorSuperiorToNumber / valorInferiorToNumber
            break;
    }

    if (resultado % 1 !== 0){
        resultado = resultado.toFixed(4)
        resultado = parseFloat(resultado)
        if (resultado.toString().slice(-3) === "000"){
            resultado = resultado.toFixed(1)
        }else if (resultado.toString().slice(-2) === "00"){
            resultado = resultado.toFixed(2)
        }
    }

    valorInferior = resultado
    valorSuperior = ""
    operador = null
}

const chooseOperation = operator => {
    if (valorInferior === "-"){
        valorInferior = ""
        return
    }
    if (valorInferior === ""){
        operador = operator
        return
    }
    if (valorSuperior !== ""){
        calculate()
    }
    operador = operator
    valorSuperior = valorInferior
    valorInferior = ""
}

const deleteNumber = () => {
    valorInferior = valorInferior.slice(0, -1)
}

const deleteAll = () => {
    valorInferior = "" 
    valorSuperior = "" 
    operador = null
}

const addNumber = number => {
    if (valorInferior !== "" && number === "-") return
    if (valorInferior === "0" && number === "0") return
    if (valorInferior.length > 9) return
    if (number === "." && valorInferior.indexOf(".") !== -1) return
    valorInferior += number
}

$BTN_NUMBERS.forEach(btn => {
    btn.addEventListener("click", () => {
        addNumber(btn.textContent)
        display()
    })
})

$BTN_OPERATOR.forEach(btn => {
    btn.addEventListener("click", () => {
        chooseOperation(btn.textContent)
        display()
    })
})

$BTN_OPERATOR_SUB[0].addEventListener("click", () => {
    if (valorInferior === ""){
        addNumber($BTN_OPERATOR_SUB[0].textContent)
    }else{
        chooseOperation($BTN_OPERATOR_SUB[0].textContent)
    }
    display()
})


$BTN_DELETE[0].addEventListener("click", () => {
    deleteNumber()
    display()
})

$BTN_DELETE_ALL[0].addEventListener("click", () => {
    deleteAll()
    display()
})

$BTN_EQUAL[0].addEventListener("click", () => {
    calculate()
    display()
})