$( function() {
    $( "#slider-range-min" ).slider({
      range: "min",
      value: 150,
      min: 50,
      max: 450,
      slide: function( event, ui ) {
        $( "#amount" ).val(  ui.value );
      }
    });
    $( "#amount" ).val( $( "#slider-range-min" ).slider( "value" )  );
  } );
  
  $( function() {
    var dateFormat = "dd/mm/yyyy",
      from = $( "#fechaSalida" )
        .datepicker({
          defaultDate: "+1w",
          changeMonth: true,
          numberOfMonths: 3
        })
        .on( "change", function() {
          to.datepicker( "option", "minDate", getDate( this ) );
        }),
      to = $( "#fechaLlegada" ).datepicker({
        defaultDate: "+1w",
        changeMonth: true,
        numberOfMonths: 3
      })
      .on( "change", function() {
        from.datepicker( "option", "maxDate", getDate( this ) );
      });
 
    function getDate( element ) {
      var date;
      try {
        date = $.datepicker.parseDate( dateFormat, element.value );
      } catch( error ) {
        date = null;
      }
 
      return date;
    }
  } );
  
/*
DATOS DE EJEMPLO
*/
aeropuertos = [
					{data:"Madrid Barajas",code:"MAD"},
					{data:"Barcelona El Prat",code:"BCN"},
					{data:"Tenerife Norte",code:"TFN"},
					{data:"Tenerife Sur",code:"TFS"}
			];


aerolineas = [
				{code:"IBB",data:"Binter"},
				{code:"AEA",data:"Air Europa"},
				{code:"IBB",data:"Iberia"}
			];
				
				
vuelosGenericos = [ {id: '12345_1', code: 'MAD', origen:'Madrid', destino:'Tenerife Norte', precio:100, hora:'8:00', plazas:3},
					{id: '12345_2', code: 'BCN', origen:'Barcelona', destino:'Barcelona', precio:50, hora:'8:00', plazas:4},
					{id: '12345_3', code: 'TFN', origen:'Tenerife', destino:'Madrid', precio:150, hora:'8:00', plazas:2},
					{id: '12345_4', code: 'TFS', origen:'Tenerife', destino:'Barcelona', precio:200, hora:'8:00', plazas:1},
					{id: '12345_5', code: 'MAD', origen:'Madrid', destino:'Tenerife Sur', precio:110, hora:'9:00', plazas:3}
				  ];
  
function populate(selector,data) {
	for (var i=0; i < data.length; i++){
		$(selector)
		.append('<option value="'+ data[i].code + '">' + data[i].data + '</option>')
	}
}

populate('#selASalida',aeropuertos);
populate('#selALlegada',aeropuertos);
populate('#selectAerolinea',aerolineas);

$("#btn_Buscar").click(function (){
	$("#vuelos").css('visibility','visible');
				$('#reserva').css('visibility','hidden')
	for (var i = 0; i < vuelosGenericos.length; i++){
		var vuelo = vuelosGenericos[i];
		if ($('#selASalida').val() == vuelo.code &&
					parseInt($('#numPasajero').val()) <= vuelo.plazas &&
					parseInt($('#amount').val()) >= vuelo.precio) {
				
			$('#listaVuelos').append('<div class="detalleVuelo" id="' + vuelo.id + '"><h1>' + vuelo.origen + ' - ' + vuelo.destino + '</h1></div>');
			$('#'+vuelo.id).append('<label>Hora de salida</label> ');
			$('#'+vuelo.id).append(vuelo.hora);
			$('#'+vuelo.id).append('<br/><label>Plazas</label> ');
			$('#'+vuelo.id).append(vuelo.plazas);
			$('#'+vuelo.id).append('<br/><button id="btn_'+vuelo.id+'">Reservar</button>')
			$('#btn_'+vuelo.id).click(function(){
				$('#reserva').css('visibility','visible')
			});
		}
	}
	
})