$(document).ready(function() {
    // Alusta virhedialogi
    $("#errorDialog").dialog({
        autoOpen: false,
        modal: true,
        buttons: {
            "OK": function() {
                $(this).dialog("close");
            }
        }
    });

    // Generoi satunnaisluvut sivun latautuessa
    function generateRandomNumber() {
        return Math.floor(Math.random() * 10) + 1;
    }

    $("#number1").val(generateRandomNumber());
    $("#number2").val(generateRandomNumber());

    // Laskuhistoria
    let calculations = [];

    // Näytä virheilmoitus dialogissa
    function showError(message) {
        $("#errorMessage").text(message);
        $("#errorDialog").dialog("open");
    }

    // Validoi syöte
    function validateInput(value, fieldName) {
        if (value === "" || value === null) {
            showError(`${fieldName} ei voi olla tyhjä.`);
            return false;
        }
        
        const num = parseInt(value);
        
        if (isNaN(num)) {
            showError(`${fieldName} täytyy olla numero.`);
            return false;
        }
        
        if (num < 1 || num > 99) {
            showError(`${fieldName} täytyy olla välillä 1-99.`);
            return false;
        }
        
        return true;
    }

    // Päivitä luku-kentän arvo
    function adjustNumber(inputId, delta) {
        const input = $(inputId);
        let value = parseInt(input.val()) || 0;
        value += delta;
        
        // Rajoita arvot välille 1-99
        if (value < 1) value = 1;
        if (value > 99) value = 99;
        
        input.val(value);
    }

    // Painikkeiden tapahtumakäsittelijät
    $("#decrease1").on("click", function() {
        adjustNumber("#number1", -1);
    });

    $("#increase1").on("click", function() {
        adjustNumber("#number1", 1);
    });

    $("#decrease2").on("click", function() {
        adjustNumber("#number2", -1);
    });

    $("#increase2").on("click", function() {
        adjustNumber("#number2", 1);
    });

    // Laske-painikkeen tapahtumakäsittelijä
    $("#calculateBtn").on("click", function() {
        const value1 = $("#number1").val();
        const value2 = $("#number2").val();
        
        // Validoi molemmat kentät
        if (!validateInput(value1, "Ensimmäinen luku")) return;
        if (!validateInput(value2, "Toinen luku")) return;
        
        const num1 = parseInt(value1);
        const num2 = parseInt(value2);
        const operator = $("#operator").val();
        
        // Tarkista nollalla jako
        if (operator === "/" && num2 === 0) {
            showError("Nollalla jakaminen ei ole sallittua.");
            return;
        }
        
        // Laske tulos turvallisesti (ei eval)
        let result;
        switch (operator) {
            case "+":
                result = num1 + num2;
                break;
            case "-":
                result = num1 - num2;
                break;
            case "*":
                result = num1 * num2;
                break;
            case "/":
                result = num1 / num2;
                // Pyöristä kahteen desimaaliin tarvittaessa
                result = Math.round(result * 100) / 100;
                break;
        }
        
        // Näytä tulos
        $("#result").text(result);
        
        // Muodosta näytettävä operaattori
        const displayOperator = operator === "*" ? "×" : (operator === "/" ? "÷" : operator);
        
        // Lisää historiaan
        const calculation = `${num1} ${displayOperator} ${num2} = ${result}`;
        calculations.push(calculation);
        
        // Päivitä historia näkymään
        updateHistory();
    });

    // Päivitä laskuhistoria
    function updateHistory() {
        $("#operationCount").text(calculations.length);
        
        const historyList = $("#historyList");
        historyList.empty();
        
        calculations.forEach(function(calc) {
            historyList.append(`<li>${calc}</li>`);
        });
    }

    // Input-kenttien validointi reaaliaikaisesti
    $("#number1, #number2").on("input", function() {
        let value = parseInt($(this).val());
        
        if (value < 1) $(this).val(1);
        if (value > 99) $(this).val(99);
    });
});
