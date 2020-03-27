function CambiarAScoreCardPH(){
	var f = new Date();  
    $('#fechaSCPH').val(fechaFormato(f));
    //consultarScorecard()
    var claveEntidad = window.localStorage.getItem("IDUS")
    var rol = window.localStorage.getItem("Rl")
    var slpcode = window.localStorage.getItem("Sl")
    var sucursal = window.localStorage.getItem("Gr")
    $.ajax({
            url: urlWcf + "ObtenerCombosPH",
            data: { claveEntidad : claveEntidad,rol:rol,sucursal:sucursal,slpcode:slpcode},
            type: "GET",
            timeout:20000,
            contentType: "application/json; charset=utf-8",
            dataType: "jsonp",
            success: function (data) {
                $.mobile.loading('hide');
                var htmlC=""
                var htmlNC=""
	            // htmlC+= '<select name="" id="ClientesSCPH" class="comboSC">'
	            // htmlC+= '<option value="">--Seleccionar--</option>'
	            htmlNC+= '<select name="" id="NClientePH" class="comboSC">'
	            htmlNC+= '<option value="">--Seleccionar--</option>'
	            if(data.length>0){
	                for(var i = 0; i< data.length; i++){
	                	// if(data[i].tipo=='1')
                  //       	htmlC+= '<option value="'+data[i].codigo+'">'+data[i].nombre+'</option>'
	                 	if(data[i].tipo=='2')
                        	htmlNC+= '<option value="'+data[i].codigo+'">'+data[i].nombre+'</option>'       
	                }
	            }
	            htmlC+= '</select>'
	            htmlNC+= '</select>'
	            // $('#divClientesPH').html('')
	            // $('#divClientesPH').html(htmlC)
	            $('#divNClientesPH').html('')
	            $('#divNClientesPH').html(htmlNC)
            },
            error: function(err){
                $.mobile.loading('hide');
            }
    });
    $.mobile.changePage( "#pageScoreCardPH", { transition: "slideup", changeHash: false });
}

function consultarScorecardPH(){
	var claveEntidad = window.localStorage.getItem("IDUS")
    var cliente = $('select[id=NClientePH]').val();
    var fechaSC = $('#fechaSCPH').val()
    var rol = window.localStorage.getItem("Rl")
    $.mobile.loading( 'show', {
	            text: 'Enviando Información',
	            textVisible: true,
	            theme: 'a',
	            html: ""
	        }); 
    $.ajax({
	        url: urlWcf + "ConsultarSCPH",
	        data: { claveEntidad : claveEntidad,cliente:cliente,fecha:fechaSC,rol:rol},
	        type: "GET",
	        timeout:90000,
	        contentType: "application/json; charset=utf-8",
	        dataType: "jsonp",
	        beforeSend: function(){
		     	$('#btnSCConsultarPH').prop( "disabled", true );
		   	},
	        success: function (data) {
	            $.mobile.loading('hide');
	            $('#btnSCConsultarPH').prop( "disabled", false );
	            if(data.length>0){
	            	$('#lblPH_cliente').html(data[0].Cliente)   
	            	$('#lblPH_nivel').html(data[0].Nivel)   
	            	$('#lblPH_cuota').html(data[0].Cuota)   
	            	$('#lblPH_consumo').html(data[0].Consumo)   
	            	$('#lblPH_vscuota').html(data[0].Vscuota)   
	            	$('#lblPH_tendencia').html(data[0].Tendecia)   
	            	$('#lblPH_disponibles').html(data[0].Disponibles)  
	            	if(data[0].Css=='1')									
						$('#trPH_consumo').css("background-color","#49C449")  
					else 
						if(data[0].Css=='2')									
							$('#trPH_consumo').ss("background-color","#FBF969")  
						else 
							$('#trPH_consumo').css("background-color","#FF3737") 
	            	var html='';
					$("#tblLineasPH > tbody").empty();
	                for(var i = 0; i< data.length; i++){
	                	var clase = i%2==1?"background-color:#ededed":"";
	                    	$('#lblSC_dm').html(data[i].objetivo)    
	                    	html += '<tr style="'+clase+'">'
		                    	html += '<td style="font-size:12px">'+data[i].Linea+'</td>'
		                    	html += '<td style="text-align: center;padding-right: 4px;font-size:12px">'+data[i].Consumol+'</td>'
		                    	html += '<td style="text-align: center;padding-right: 4px;font-size:12px">'+data[i].Puntosl+'</td>'
		                    	html += '<td style="text-align: center;padding-right: 4px;font-size:12px">'+data[i].Puntost+'</td>'
	                    	html += '<tr>'
	                }
	                $("#tblLineasPH > tbody").append(html);
	            }
	            //MandarAlerta('alerta_2',data)
	        },
	        error: function(err){
	            $.mobile.loading('hide');
	            $('#btnSCConsultarPH').prop( "disabled", false );
	        }
	});
}