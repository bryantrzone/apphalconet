function CambiarAScoreCard(){
	var f = new Date();  
    $('#fechaSC').val(fechaFormato(f));
    //consultarScorecard()
    var claveEntidad 	= window.localStorage.getItem("IDUS")
    var rol 			= window.localStorage.getItem("Rl")
    var slpcode 		= window.localStorage.getItem("Sl")
    var sucursal 		= window.localStorage.getItem("Gr")
	
   $.ajax({
            url: urlWcf + "ObtenerCombos",
            data: { claveEntidad : claveEntidad,rol:rol,sucursal:sucursal,slpcode:slpcode},
            type: "GET",
            timeout:20000,
            contentType: "application/json; charset=utf-8",
            dataType: "jsonp",
            success: function (data) {
                $.mobile.loading('hide');
                //MandarAlerta('alerta_2',data)
                var htmlV=""
                var htmlS=""
	            htmlV+= '<select name="" id="VendedoresSC" class="comboSC">'
	            htmlV+= '<option value="">--Seleccionar--</option>'
	            htmlS+= '<select name="" id="SucursalesSC" class="comboSC">'
	            htmlS+= '<option value="">--Seleccionar--</option>'
	            if(data.length>0){
	                for(var i = 0; i< data.length; i++){
	                	if(data[i].tipo=='1')
                        	htmlV+= '<option value="'+data[i].codigo+'">'+data[i].nombre+'</option>'
	                 if(data[i].tipo=='2')
                        	htmlS+= '<option value="'+data[i].codigo+'">'+data[i].nombre+'</option>'  
                     if(data[i].tipo=='3'){
                        	$("#c_"+data[i].codigo).css("display","block")    
        					$("#c_"+data[i].codigo).removeClass('sinSeleccionar');
            				$("#c_"+data[i].codigo).addClass("seleccionar");    
                     }
	                }
	            }
	            htmlV+= '</select>'
	            htmlS+= '</select>'
	            $('#divVendedores').html('')
	            $('#divVendedores').html(htmlV)
	            $('#divSucursales').html('')
	            $('#divSucursales').html(htmlS)
            },
            error: function(err){
                $.mobile.loading('hide');
            }
    });
    $.mobile.changePage( "#pageScoreCard", { transition: "slideup", changeHash: false });
}

function consultarScorecard(){
    var claveEntidad = window.localStorage.getItem("IDUS")
    var sucursal = $('select[id=SucursalesSC]').val();
    var vendedor = $('select[id=VendedoresSC]').val();
    var fechaSC = $('#fechaSC').val()
    var canales = "";
    var clase3=$('#c_3').attr('class');
    var clase2 =$('#c_2').attr('class');
    var clase1=$('#c_1').attr('class');
    if(clase3.indexOf('seleccionar')> 0)
    	canales +="3,";
    if(clase2.indexOf('seleccionar')> 0)
    	canales +="2,";
    if(clase1.indexOf('seleccionar')> 0)
    	canales +="1,";
    var rol = window.localStorage.getItem("Rl")
    if(rol > 3)
    {
    	if(sucursal!='' && vendedor!=''){
	        $.mobile.loading( 'show', {
	            text: 'Enviando Información',
	            textVisible: true,
	            theme: 'a',
	            html: ""
	        }); 
	                    
	        $.ajax({
	                url: urlWcf + "ConsultarSCCanales",
	                data: { claveEntidad : claveEntidad,sucursal:sucursal,slpcode:vendedor,fecha:fechaSC,rol:rol,canales: canales},
	                type: "GET",
	                timeout:90000,
	                contentType: "application/json; charset=utf-8",
	                dataType: "jsonp",
	                beforeSend: function(){
				     	$('#btnSCConsultar').prop( "disabled", true );
				   	},
	                success: function (data) {
	                    $.mobile.loading('hide');
			            $('#btnSCConsultar').prop( "disabled", false );
	                    if(data.length>0){
			                for(var i = 0; i< data.length; i++){
			                 	if(data[i].tipo=='0'){
		                        	$('#lblSC_dm').html(data[i].objetivo)    
		                        	$('#lblSC_dr').html(data[i].real)    
			                 	}
			                 	if(data[i].tipo=='1'){
		                        	$('#lblSC_uc').html(data[i].objetivo)    
		                        	$('#lblSC_ur').html(data[i].real) 
									// alert(data[i].css)
									if(data[i].css=='1')									
										$('#trdc_vt').css("background-color","#FF0000")  
									else 
										$('#trdc_vt').css("background-color","#00FF00")
									
			                 	}
			                 	if(data[i].tipo=='2'){
		                        	$('#lblSC_lha').html(data[i].acumulado)    
		                        	$('#lblSC_lho').html(data[i].objetivo)    
		                        	$('#lblSC_lhp').html(data[i].pronostico)   
		                        	// $('#trdc_lht').css("background-color","'"+data[i].css+"'")    
									if(data[i].css=='1')									
										$('#trdc_lht').css("background-color","#FF0000")  
									else if(data[i].css=='2')
										$('#trdc_lht').css("background-color","#FFFF00") 
										else
										$('#trdc_lht').css("background-color","#00FF00") 
		                        	$('#lblSC_lhvsc').html(data[i].vsCuota)       
			                 	}
			                 	if(data[i].tipo=='4'){   
		                        	$('#lblSC_evpr').html(data[i].ventaDia)    
		                        	$('#lblSC_evc').html(data[i].objetivo)    
		                        	$('#lblSC_evr').html(data[i].real)    
		                        	$('#lblSC_evp').html(data[i].pronostico)  
		                        	// $('#trdc_evp').css("background-color","'"+data[i].css+"'")    
									if(data[i].css=='1')									
										$('#trdc_evp').css("background-color","#FF0000")  
									else if(data[i].css=='2')
										$('#trdc_evp').css("background-color","#FFFF00") 
										else
										$('#trdc_evp').css("background-color","#00FF00")        
			                 	}
			                 	if(data[i].tipo=='3'){
		                        	$('#lblSC_va').html(data[i].acumulado)    
		                        	$('#lblSC_vc').html(data[i].objetivo)    
		                        	$('#lblSC_vvd').html(data[i].ventaDia)    
		                        	$('#lblSC_vp').html(data[i].pronostico)         
		                        	$('#lblSC_vvsc').html(data[i].vsCuota)     
		                        	// $('#trdc_vp').css("background-color","'"+data[i].css+"'")  
									if(data[i].css=='1')									
										$('#trdc_vp').css("background-color","#FF0000")  
									else if(data[i].css=='2')
										$('#trdc_vp').css("background-color","#FFFF00") 
										else
										$('#trdc_vp').css("background-color","#00FF00")      
			                 	}
			                }
			            }
	                    //MandarAlerta('alerta_2',data)
	                },
	                error: function(err){
	                    $.mobile.loading('hide');
	                    $('#btnSCConsultar').prop( "disabled", false );
	                }
	        });                   
                   
    	}else MandarAlerta('alerta_2',"¡Todos los campos son necesarios!")
    }else {
    	if((sucursal=='' && vendedor=='' )||(sucursal!='' && vendedor!='' )){
	        MandarAlerta('alerta_2',"Debe seleccionar al menos una sucursal o vendedor")
	        // alert("¡Todos los campos son necesarios!")
                   
    	}else {
    		$.mobile.loading( 'show', {
	            text: 'Enviando Información',
	            textVisible: true,
	            theme: 'a',
	            html: ""
	        }); 
	                    
	        $.ajax({
	                url: urlWcf + "ConsultarSCCanales",
	                data: { claveEntidad : claveEntidad,sucursal:sucursal,slpcode:vendedor,fecha:fechaSC,rol:rol,canales: canales},
	                type: "GET",
	                timeout:90000,
	                contentType: "application/json; charset=utf-8",
	                dataType: "jsonp",
	                beforeSend: function(){
				     	$('#btnSCConsultar').prop( "disabled", true );
				   	},
	                success: function (data) {
	                    $.mobile.loading('hide');
	                    $('#btnSCConsultar').prop( "disabled", false );
	                    if(data.length>0){
			                for(var i = 0; i< data.length; i++){
			                 	if(data[i].tipo=='0'){
		                        	$('#lblSC_dm').html(data[i].objetivo)    
		                        	$('#lblSC_dr').html(data[i].real)    
			                 	}
			                 	if(data[i].tipo=='1'){
		                        	$('#lblSC_uc').html(data[i].objetivo)    
		                        	$('#lblSC_ur').html(data[i].real)   
									if(data[i].css=='1')									
										$('#trdc_vt').css("background-color","#FF0000")  
									else 
										$('#trdc_vt').css("background-color","#00FF00")  
			                 	}
			                 	if(data[i].tipo=='2'){
		                        	$('#lblSC_lha').html(data[i].acumulado)    
		                        	$('#lblSC_lho').html(data[i].objetivo)    
		                        	$('#lblSC_lhp').html(data[i].pronostico)   
									if(data[i].css=='1')									
										$('#trdc_lht').css("background-color","#FF0000")  
									else if(data[i].css=='2')
										$('#trdc_lht').css("background-color","#FFFF00") 
										else
										$('#trdc_lht').css("background-color","#00FF00") 
		                        	$('#lblSC_lhvsc').html(data[i].vsCuota)       
			                 	}
			                 	if(data[i].tipo=='4'){   
		                        	$('#lblSC_evpr').html(data[i].ventaDia)    
		                        	$('#lblSC_evc').html(data[i].objetivo)    
		                        	$('#lblSC_evr').html(data[i].real)    
		                        	$('#lblSC_evp').html(data[i].pronostico)   
									if(data[i].css=='1')									
										$('#trdc_evp').css("background-color","#FF0000")  
									else if(data[i].css=='2')
										$('#trdc_evp').css("background-color","#FFFF00") 
										else
										$('#trdc_evp').css("background-color","#00FF00")     
		                        	// $('#trdc_evp').css("color","#ededed")          
			                 	}
			                 	if(data[i].tipo=='3'){
		                        	$('#lblSC_va').html(data[i].acumulado)    
		                        	$('#lblSC_vc').html(data[i].objetivo)    
		                        	$('#lblSC_vvd').html(data[i].ventaDia)    
		                        	$('#lblSC_vp').html(data[i].pronostico)         
		                        	$('#lblSC_vvsc').html(data[i].vsCuota)  
									if(data[i].css=='1')									
										$('#trdc_vp').css("background-color","#FF0000")  
									else if(data[i].css=='2')
										$('#trdc_vp').css("background-color","#FFFF00") 
										else
										$('#trdc_vp').css("background-color","#00FF00")     
		                        	// $('#trdc_vp').css("color","#ededed")          
			                 	}
			                }
			            }
	                },
	                error: function(err){
	                    $.mobile.loading('hide');
	                    $('#btnSCConsultar').prop( "disabled", false );
	                }
	        });              
    	}
    }
}

$(document).ready(function (e) {
    $('body').on('click', '.divCanal', function() {//datos de prospecto
        var titleC=$(this).attr('title');
        var clase=$(this).attr('class');
		if(clase.indexOf('sinSeleccionar')> 0){
        	$(this).removeClass('sinSeleccionar');
            $(this).addClass("seleccionar"); 
        }
        else{
			$(this).removeClass('seleccionar');
            $(this).addClass("sinSeleccionar"); 
        }
    });
});