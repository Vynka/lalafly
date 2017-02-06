// Get the modal
var modal = document.getElementById('payment');

// Get the button that opens the modal
var btn = document.getElementById("payBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal 
btn.onclick = function () {
    modal.style.display = "block";
};

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
    modal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target === modal) {
        modal.style.display = "none";
    }
};


$(function () {
    $("#slider-range-min").slider({
        range: "min",
        value: 150,
        min: 50,
        max: 450,
        slide: function (event, ui) {
            $("#amount").val(ui.value + ' €');
        }
    });
    $("#amount").val($("#slider-range-min").slider("value") + " €");
});

$(function () {
    var dateFormat = "dd/mm/yyyy",
            from = $("#fechaSalida")
            .datepicker({
                defaultDate: "+1w",
                changeMonth: true,
                numberOfMonths: 3
            })
            .on("change", function () {
                to.datepicker("option", "minDate", getDate(this));
            }),
            to = $("#fechaLlegada").datepicker({
        defaultDate: "+1w",
        changeMonth: true,
        numberOfMonths: 3
    })
            .on("change", function () {
                from.datepicker("option", "maxDate", getDate(this));
            });

    function getDate(element) {
        var date;
        try {
            date = $.datepicker.parseDate(dateFormat, element.value);
        } catch (error) {
            date = null;
        }

        return date;
    }
});

/*
 DATOS DE EJEMPLO
 */
var aeropuertos = [];
var aerolineas = [];
var vuelosGenericos = [];

function cargaDatos() {
    ajaxAeropuerto = $.ajax({
        "url": "webresources/aeropuerto",
        "type": "get",
        "dataType": "json",
        "success": function (aeropuerto) {
            aeropuertos = aeropuerto;
            populate('#selASalida',aeropuertos);
            populate('#selALlegada',aeropuertos);
        }
        });

    ajaxAerolineas = $.ajax({
        "url": "webresources/aerolinea",
        "type": "get",
        "dataType": "json",
        "success": function (aerolinea) {
            aerolineas = aerolinea;
            populate('#selectAerolinea', aerolineas);
        }
        });

    vuelosGenericos = [{id: '0', origen: 'MAD', destino: 'TFN', precio: 100, hora: '8:00', plazas: 3, aerolinea: 'IBE'},
        {id: '1', origen: 'BCN', destino: 'MAD', precio: 50, hora: '8:00', plazas: 4, aerolinea: 'AEA'},
        {id: '2', origen: 'TFN', destino: 'MAD', precio: 150, hora: '8:00', plazas: 2, aerolinea: 'IBB'},
        {id: '3', origen: 'TFN', destino: 'BCN', precio: 200, hora: '8:00', plazas: 1, aerolinea: 'IBB'},
        {id: '4', origen: 'MAD', destino: 'TFS', precio: 110, hora: '9:00', plazas: 3, aerolinea: 'IBE'}
    ];
};

$(document).ready(cargaDatos);

function populate(selector, data) {
    for (var i = 0; i < data.length; i++) {
        $(selector)
                .append('<option value="' + data[i].codigo + '">' + data[i].nombre + '</option>');
    }
}

$("#btn_Buscar").click(function () {
    $('#listaVuelos').html('');
    var nvuelos = 0;
    $("#vuelos").css('visibility', 'visible');
    $('#reserva').css('visibility', 'hidden');

    for (var i = 0; i < vuelosGenericos.length; i++) {

        var vuelo = vuelosGenericos[i];

        if ($('#selASalida').val() == vuelo.origen &&
                $('#selALlegada').val() == vuelo.destino &&
                parseInt($('#numPasajero').val()) <= vuelo.plazas &&
                parseInt($('#amount').val()) >= vuelo.precio &&
                $('#selectAerolinea').val() == vuelo.aerolinea
                ) {

            nvuelos++;

            $('#listaVuelos').append('<div class="detalleVuelo" id="' + vuelo.id + '"><h1>' + vuelo.origen + ' - ' + vuelo.destino + '</h1></div>');
            $('#' + vuelo.id).append('<label>Hora de salida</label> ');
            $('#' + vuelo.id).append(vuelo.hora);
            $('#' + vuelo.id).append('<br/><label>Plazas</label> ');
            $('#' + vuelo.id).append(vuelo.plazas);
            $('#' + vuelo.id).append('<br/><label>Precio</label> ');
            $('#' + vuelo.id).append(vuelo.precio);
            $('#' + vuelo.id).append('<br/><button class="btn btn-primary btn-lg" id="btn_' + vuelo.id + '">Reservar</button>')

            $('#btn_' + vuelo.id).click(function (e) {

                var id = e.target.id.substr(e.target.id.length - 1);

                $('#reserva').css('visibility', 'visible')
                $('#nVuelo').html(vuelosGenericos  [id].id);
                $('#aOrigen').html(vuelosGenericos [id].origen);
                $('#aDestino').html(vuelosGenericos[id].destino);
                $('#vCompany').html(vuelosGenericos[id].aerolinea);
                $('#vPrice').html(vuelosGenericos  [id].precio + ' €');
                $('#plazasReservadas').html($('#numPasajero').val());

                var datosDeVuelo = $('#datosDeVuelo').html();
                $('#confirmData').html(datosDeVuelo);
            });
        }
    }

    if (nvuelos == 0)
        $('#listaVuelos').append('<div class="detalleVuelo" id="0"><h1> No se han encontrado vuelos con las características deseadas </h1></div>');

})

$('#success').click(function () {
    modal.style.display = "none";
    $('#vuelos').css('visibility', 'hidden');
    $('#reserva').css('visibility', 'hidden');
});