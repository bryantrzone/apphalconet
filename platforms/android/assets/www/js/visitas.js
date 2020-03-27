var cliente=""
    $(document).ready(function (e) {
        //window.localStorage.removeItem("RV");
        $("a#enlace").fancybox({
            'hideOnContentClick': true
        });
        $("a#enlaceProspectos").fancybox({
            'hideOnContentClick': true
        });
        $("#descripcionV").change(function(){
            var valor = $('select[id=descripcionV]').val();
            var texto = $("#descripcionV option:selected").html();
            if(valor != "v0"){
                var claveEntidad = window.localStorage.getItem("IDUS")
                setTimeout(function(){ 
                        if (EnvioVisita == 1 ){
                            $.mobile.loading('hide');
                            MandarAlerta('alerta_2',"Probablemente su GPS esta apagado");
                        }
                     }, 50000);
                    $.mobile.loading( 'show', {
                        text: 'Enviando Información',
                        textVisible: true,
                        theme: 'a',
                        html: ""
                    }); 
                    navigator.geolocation.getCurrentPosition(
                            function (pocicion){
                                longitud = pocicion.coords.longitude;
                                latitud = pocicion.coords.latitude;
                                if(cliente != "" && claveEntidad != "" && latitud != "" && longitud != "")
                                {
                                    $.ajax({
                                            url: urlWcf + "RegistrarVisita",
                                            data: { clienteV: cliente ,claveEntidad : claveEntidad,latitud : latitud,longitud:longitud, opcionV: texto},
                                            type: "GET",
                                            timeout:20000,
                                            contentType: "application/json; charset=utf-8",
                                            dataType: "jsonp",
                                            success: function (data) {
                                                EnvioVisita=0
                                                $.mobile.loading('hide');
                                                MandarAlerta('alerta_2',data)
                                                consultaItinerario()
                                                $("#descripcionV").val("v0");
                                                $.fancybox.close();
                                            },
                                            error: function(err){
                                                $.mobile.loading('hide');
                                            }
                                    });
                                }else MandarAlerta('alerta_2',"¡Todos los campos son necesarios!")
                                }, 
                        function (error) {  
                            $('#error').val('Codigo: '    + error.code    + '\n' +   'Mensaje: ' + error.message + '\n');
                            
                        },options
                    );
            }
        });
        $("#descripcionPV").change(function(){
            var valor = $('select[id=descripcionPV]').val();
            var texto = $("#descripcionPV option:selected").html();
            if(valor != "v0"){
                var claveEntidad = window.localStorage.getItem("IDUS")
                setTimeout(function(){ 
                        if (EnvioVisita == 1 ){
                            $.mobile.loading('hide');
                            MandarAlerta('alerta_2',"Probablemente su GPS esta apagado");
                        }
                     }, 50000);
                    $.mobile.loading( 'show', {
                        text: 'Enviando Información',
                        textVisible: true,
                        theme: 'a',
                        html: ""
                    }); 
                    navigator.geolocation.getCurrentPosition(
                            function (pocicion){
                                longitud = pocicion.coords.longitude;
                                latitud = pocicion.coords.latitude;
                                if(cliente != "" && claveEntidad != "" && latitud != "" && longitud != "")
                                {
                                    $.ajax({
                                            url: urlWcf + "RegistrarVisita",
                                            data: { clienteV: cliente ,claveEntidad : claveEntidad,latitud : latitud,longitud:longitud, opcionV: texto},
                                            type: "GET",
                                            timeout:20000,
                                            contentType: "application/json; charset=utf-8",
                                            dataType: "jsonp",
                                            success: function (data) {
                                                EnvioVisita=0
                                                $.mobile.loading('hide');
                                                MandarAlerta('alerta_2',data)
                                                consultaItinerario()
                                                $("#descripcionV").val("v0");
                                                $.fancybox.close();
                                            },
                                            error: function(err){
                                                $.mobile.loading('hide');
                                            }
                                    });
                                }else MandarAlerta('alerta_2',"¡Todos los campos son necesarios!")
                                }, 
                        function (error) {  
                            $('#error').val('Codigo: '    + error.code    + '\n' +   'Mensaje: ' + error.message + '\n');
                            
                        },options
                    );
            }
        });
        BuscarRutaIniciada()
        BuscarRegistroVComidaSucursal()
//cliente registro
    
})

 $(document).on('click','.visita', function () {
     cliente = $(this).attr('alt')
    var titulo = $(this).attr('title')
    var finVisita =0
    var msj = ""
    var vsc = $("#lblRutaC").html()
    var vss = $("#lblRutaS").html()
    if((vsc.indexOf("Fin")> -1 || vsc=="" )&&(vss.indexOf("Fin")> -1 || vss=="" ))
    {
        if(titulo.indexOf("in")> -1){
            msj = "¿Iniciar visita con cliente?"
            finVisita = 0
        }
        if(titulo.indexOf("vis")> -1){
            msj = "¿Terminar visita con cliente?"
            finVisita =1
        }
        var res = confirm(msj);
        if(res){
            var claveEntidad = window.localStorage.getItem("IDUS")
            var latitud;
            var longitud;
            var enVisita =1
            var rvS = window.localStorage.getItem('RV');
            if( rvS!= "" && rvS!= null && !(rvS.indexOf('Fin')>-1)){
                $("#tblCVP tbody tr").each(function (index) 
                {
                    var campo1, campo2, campo3, campo4;
                    $(this).children("td").each(function (index2) 
                    {
                        switch (index2) 
                        {
                            case 0: campo1 = $(this).text();
                            case 1: campo2 = $(this).text();
                                    break;
                        }
                    })
                    if( campo2 == 'En visita' && enVisita == 1){
                        if(campo1==cliente)
                            enVisita=1
                        else{
                            MandarAlerta('alerta_2',"Aún tienes visitas activas");
                            enVisita = 0                        
                        }
                    }
                    //else enVisita = 1;
                })
                if(enVisita ==1 ){
                    EnvioVisita=1;
                    if (finVisita ==1){
                        if(cliente.indexOf('-')>-1)
                            $('#enlaceProspectos').click();
                        else
                            $('#enlace').click();
                    }
                    else{
                        setTimeout(function(){ 
                            if (EnvioVisita == 1 ){
                                $.mobile.loading('hide');
                                MandarAlerta('alerta_2',"Probablemente su GPS esta apagado");
                            }
                         }, 50000);
                        $.mobile.loading( 'show', {
                            text: 'Enviando Información',
                            textVisible: true,
                            theme: 'a',
                            html: ""
                        }); 
                        navigator.geolocation.getCurrentPosition(
                                function (pocicion){
                                    longitud = pocicion.coords.longitude;
                                    latitud = pocicion.coords.latitude;
                                    if(cliente != "" && claveEntidad != "" && latitud != "" && longitud != "")
                                    {
                                        $.ajax({
                                                url: urlWcf + "RegistrarVisita",
                                                data: { clienteV: cliente ,claveEntidad : claveEntidad,latitud : latitud,longitud:longitud, opcionV: ""},
                                                type: "GET",
                                                timeout:20000,
                                                contentType: "application/json; charset=utf-8",
                                                dataType: "jsonp",
                                                success: function (data) {
                                                    EnvioVisita=0
                                                    $.mobile.loading('hide');
                                                    MandarAlerta('alerta_2',data)
                                                    consultaItinerario()
                                                },
                                                error: function(err){
                                                    $.mobile.loading('hide');
                                                }
                                        });
                                    }else MandarAlerta('alerta_2',"¡Todos los campos son necesarios!")
                                    }, 
                            function (error) {  
                                $('#error').val('Codigo: '    + error.code    + '\n' +   'Mensaje: ' + error.message + '\n');
                                
                            },options
                        );
                    }
                }
            }
            else MandarAlerta('alerta_2','Aún no has iniciado la ruta, o ya la has terminado')
        }
    }//fin if
    else{
        MandarAlerta('alerta_2',"¡Tienes pausas pendientes!")
    }
});

function consultaItinerarioSugerido(){
    BuscarRutaIniciada()
    BuscarRegistroVComidaSucursal()
    var claveEntidad = window.localStorage.getItem("IDUS")
    $.ajax({
        url: urlWcf + "ConsultarClientesVisita",
        data: { ClaveEntidad:claveEntidad,tipoconsulta:14},
        type: "GET",
        timeout:20000,
        contentType: "application/json; charset=utf-8",
        dataType: "jsonp",
        success: function (data) {
            var html=""
            html+= '<table class="facturas tblV" cellspacing="0">'
            for(var i = 0; i< data.length; i++){
                html+= '<tr style="background-color:'+(i%2 > 0?'#ededed':'#fff')+'"><td width=25%><center><label>'+data[i].codigo+'</label></center></td>'
                html+= '<td width=75%><center><label>'+data[i].nombre+'</label></center></td></tr>'
            }
            html+= '</table>'
            $('#divClientesVisitas').html('')
            $('#divClientesVisitas').html(html)
        },
        error: function(err){
            $.mobile.loading('hide');
        }
    });
}
function consultaItinerarioCompleto(){
    BuscarRutaIniciada()
    BuscarRegistroVComidaSucursal()
    var claveEntidad = window.localStorage.getItem("IDUS")

    $.ajax({
        url: urlWcf + "ConsultarClientesVisita",
        data: { ClaveEntidad:claveEntidad,tipoconsulta:15},
        type: "GET",
        timeout:20000,
        contentType: "application/json; charset=utf-8",
        dataType: "jsonp",
        success: function (data) {
            var html=""
            html+= '<table class="facturas tblV" cellspacing="0" id="tblCVC">'
            for(var i = 0; i< data.length; i++){
                html+= '<tr style="background-color:'+(i%2 > 0?'#ededed':'#fff')+'"><td width=50%><center><label>'+data[i].codigo+'</center></label></td>'
                html+= '<td width=50% ><center><input type="checkbox" class="clientePlanear" name="'+data[i].codigo+'" value="'+data[i].codigo+'"  ><center></td></tr>'
                // html+= '<td width=50% ><center><select name="slider2" id="slider2" data-role="slider"><option value="SI">SI</option><option value="NO">NO</option>select></center><td></tr>'
                // html+= '<td width=20% ><input type="checkbox" name="'+data[i].codigo+'" value="'+data[i].codigo+'"><td></tr>'                
            }
            html+= '</table>'
            $('#divClientesVisitasCompleto').html('')
            $('#divClientesVisitasCompleto').html(html)
        },
        error: function(err){
            $.mobile.loading('hide');
        }
    });
}
function consultaItinerario(){
    var claveEntidad = window.localStorage.getItem("IDUS")
    $.ajax({
        url: urlWcf + "ConsultarClientesPlaneados",
        data: { ClaveEntidad:claveEntidad},
        type: "GET",
        timeout:20000,
        contentType: "application/json; charset=utf-8",
        dataType: "jsonp",
        success: function (data) {
            var html=""
            html+= '<table class="facturas tblV" cellspacing="0" id="tblCVP">'
            if(data.length>0){
                for(var i = 0; i< data.length; i++){
                    html+= '<tr style="background-color:'+(i%2 > 0?'#ededed':'#fff')+'"><td width=40%><center><label>'+data[i].codigo+'</center></label></td>'
                    html+= '<td width=40% align="center"><label>'+data[i].direccion+'</label></td>'
                    if(data[i].direccion!= 'Terminada')
                        html+= '<td width=20% ><center><button class="visita cssVisita" title="'+data[i].direccion+'" type="button" alt="'+data[i].codigo+'"><i class="fa fa-street-view fa-lg"></i></button></center></td></tr>'
                    else html+= '<td width=20%><td></tr>'
                }
            }
            else html+= '<tr><td>Sin clientes agendados</td></tr>'
            html+= '</table>'
            $('#divClientesVisitasPlaneado').html('')
            $('#divClientesVisitasPlaneado').html(html)
        },
        error: function(err){
            $.mobile.loading('hide');
        }
    });
}

$(document).on('click','.clientePlanear', function () {
    var cliente = $(this).attr('name')
    var claveEntidad = window.localStorage.getItem("IDUS")
    var estatus = 0
    if( $(this).prop('checked') ) {
        var estatus = 1
    }
    else estatus=0
        //alert(estatus)
    $.ajax({
        url: urlWcf + "GuardarClientesPlaneados",
        data: { ClaveEntidad:claveEntidad,Cliente:cliente,estatus:estatus},
        type: "GET",
        timeout:20000,
        contentType: "application/json; charset=utf-8",
        dataType: "jsonp",
        success: function (data) {
            if (data!= 'OK')
                res=false;
        },
        error: function(err){
            $.mobile.loading('hide');
        }
    }); 
});
function IniciarRutaVisita(){
    var UserName = "";
    var rvS = "";
    var opcion=0
    var EnvioVisita=0;
    var visitasPlaneadas=0
    UserName = window.localStorage.getItem('Us');
    rvS = window.localStorage.getItem('RV');
    var claveEntidad = window.localStorage.getItem("IDUS")
    var msjalert ="";
    if(rvS!= "" && rvS!= null){
        if(rvS.indexOf('Fin')>-1){
            opcion = 2
        }
        else {  opcion =1}
        msjalert="¿Finalizar la ruta de visita?"
    }
    else{
        msjalert="¿Iniciar la ruta de visita?"
        opcion=0
    }
    var respuesta = confirm(msjalert);
    if (respuesta == true) {
        EnvioVisita=1;
        visitasPlaneadas =0
        if(opcion ==0)//iniciar ruta
        {
            setTimeout(function(){ 
                    if (EnvioVisita == 1 ){
                        $.mobile.loading('hide');
                        MandarAlerta('alerta_2',"Probablemente su GPS esta apagado");
                    }
                 }, 20000);
            $.mobile.loading( 'show', {
                text: 'Enviando Información',
                textVisible: true,
                theme: 'a',
                html: ""
            }); 
            navigator.geolocation.getCurrentPosition(
                    function (pocicion){
                        var  LongitudVisita= pocicion.coords.longitude;
                        var  LatitudVisita= pocicion.coords.latitude;                
                        $.ajax({
                            url: urlWcf + "RegistrarRutaVisita",
                            data: { idUsuario : claveEntidad , latitud: LatitudVisita , longitud : LongitudVisita,opcion:1 },
                            type: "GET",
                            timeout:tiempoEspera,
                            contentType: "application/json; charset=utf-8",
                            dataType: "jsonp",
							beforeSend: function(){
								$('#btnInicioFinRuta').prop( "disabled", true );
							},
                            success: function (data) {
                                $.mobile.loading('hide');  
								$('#btnInicioFinRuta').prop( "disabled", false );								
                                    // navigator.notification.alert(data, alertDismissed, 'HalcoNet', 'Aceptar');
                                                        //alert(data)
                                    if(data.indexOf('inicio')>='ERROR'){
                                         MandarAlerta('alerta_2',data)
                                    }
                                    else{
                                        window.localStorage.setItem("RV", data);
                                        $('#lblRutaI').html(data)
                                    }
                                    EnvioVisita =0;                        
                            },
                            error: function(err){
                                $.mobile.loading('hide');
                                MandarAlerta('alerta_2',"Es posible que haya una falla en el servicio");
								$('#btnInicioFinRuta').prop( "disabled", false );
                            }
                        });
                    }, 
                    function (error) {  
                        $('#error').val('Codigo: '    + error.code    + '\n' +   'Mensaje: ' + error.message + '\n');
                        
                    },options
                );
        }
        if(opcion == 1) { //finalizar
            var finRuta =1
            var vsc = $("#lblRutaC").html()
            var vss = $("#lblRutaS").html()
            if((vsc.indexOf("Fin")> -1 || vsc=="" )&&(vss.indexOf("Fin")> -1 || vss=="" ))
            {
                $("#tblCVP tbody tr").each(function (index) 
                {
                    var campo1, campo2, campo3, campo4;
                    $(this).children("td").each(function (index2) 
                    {
                        switch (index2) 
                        {
                            case 1: campo2 = $(this).text();
                                    break;
                        }
                    })
                    if( campo2 == 'En visita' && finRuta == 1){
                        MandarAlerta('alerta_2',"Aún tienes visitas activas");
                        finRuta = 0
                    }
                    if( campo2 == 'Sin registro' ){
                        visitasPlaneadas++
                    }
                })
                if(finRuta ==1){
                    var res = true;
                    if(visitasPlaneadas==0)
                        res=true
                    else {
                        res= confirm("Aún tienes visitas pendientes ¿Terminar la ruta de visita?")
                    }
                    if(res){
                        setTimeout(function(){ 
                                if (EnvioVisita == 1 ){
                                    $.mobile.loading('hide');
                                    MandarAlerta('alerta_2',"Probablemente su GPS esta apagado");
                                }
                             }, 20000);
                        $.mobile.loading( 'show', {
                            text: 'Enviando Información',
                            textVisible: true,
                            theme: 'a',
                            html: ""
                        }); 
                        navigator.geolocation.getCurrentPosition(
                                function (pocicion){
                                    var  LongitudVisita= pocicion.coords.longitude;
                                    var  LatitudVisita= pocicion.coords.latitude;                
                                    $.ajax({
                                        url: urlWcf + "RegistrarRutaVisita",
                                        data: { idUsuario : claveEntidad , latitud: LatitudVisita , longitud : LongitudVisita,opcion:1 },
                                        type: "GET",
                                        timeout:tiempoEspera,
                                        contentType: "application/json; charset=utf-8",
                                        dataType: "jsonp",
                                        success: function (data) {
                                            $.mobile.loading('hide');                         
                                                // navigator.notification.alert(data,
                                                                    // alertDismissed, 'HalcoNet', 'Aceptar');
                                                                    //alert(data)
                                                if(data.indexOf('inicio')>='ERROR'){
                                                     MandarAlerta('alerta_2',data)
                                                }
                                                else{
                                                    window.localStorage.setItem("RV", data);
                                                    $('#lblRutaI').html(data)
                                                }
                                                EnvioVisita =0;                        
                                        },
                                        error: function(err){
                                            $.mobile.loading('hide');
                                            MandarAlerta('alerta_2',"Es posible que haya una falla en el servicio");
                                           
                                        }
                                    });
                                }, 
                                function (error) {  
                                    $('#error').val('Codigo: '    + error.code    + '\n' +   'Mensaje: ' + error.message + '\n');
                                    
                                },options
                            );
                    }
                }
            }//fin if
            else{
                MandarAlerta('alerta_2','¡Tienes pausas activas!')
            }
        }//fin pocion 1
        if(opcion == 2){
            MandarAlerta('alerta_2','¡Ya has terminado la ruta de visita!')
        }
    }
}
function IniciarVComida(){
    var rvS = "";
    var rvPS = "";
    var rv = "";
    var opcion=0
    var EnvioVisita=0;
    var visitasPlaneadas=0
    rvS = $('#lblRutaC').html();//obtener hora de pausa comida
    rvPS = $('#lblRutaS').html();//obtener hora de pausa comida
    rv = $('#lblRutaI').html();
    var claveEntidad = window.localStorage.getItem("IDUS")
    var msjalert ="";
    if(rv.indexOf('Fin')> -1 || (rv== "" || rv== null) || (rvPS.indexOf('Fin')== -1 && rvPS!="")){
        MandarAlerta('alerta_2',"¡No has iniciado la ruta ó ya has terminado!,¡Tienes una pausa activa!")
    }
    else{
        if(rvS!= "" && rvS!= null){
            if(rvS.indexOf('Fin')>-1){  
                opcion = 2
            }
            else {  opcion =1}
            msjalert="¿Finalizar pausa de comida?"
        }
        else{
            msjalert="¿Iniciar pausa de comida?"
            opcion=0
        }
        var respuesta = confirm(msjalert);
        if (respuesta == true) 
        {
            EnvioVisita=1;
            visitasPlaneadas =0
            if(opcion ==1)//finalizar
            {
                setTimeout(function(){ 
                        if (EnvioVisita == 1 ){
                            $.mobile.loading('hide');
                            MandarAlerta('alerta_2',"Probablemente su GPS esta apagado");
                        }
                     }, 20000);
                $.mobile.loading( 'show', {
                    text: 'Enviando Información',
                    textVisible: true,
                    theme: 'a',
                    html: ""
                }); 
                navigator.geolocation.getCurrentPosition(
                        function (pocicion){
                            var  LongitudVisita= pocicion.coords.longitude;
                            var  LatitudVisita= pocicion.coords.latitude;                
                            $.ajax({
                                url: urlWcf + "RegistrarRutaVisita",
                                data: { idUsuario : claveEntidad , latitud: LatitudVisita , longitud : LongitudVisita,opcion:2 },
                                type: "GET",
                                timeout:tiempoEspera,
                                contentType: "application/json; charset=utf-8",
                                dataType: "jsonp",
                                success: function (data) {
                                    $.mobile.loading('hide');                         
                                        // navigator.notification.alert(data,
                                                            // alertDismissed, 'HalcoNet', 'Aceptar');
                                                            //alert(data)
                                        if(data.indexOf('inicio')>='ERROR'){
                                             MandarAlerta('alerta_2',data)
                                        }
                                        else{
                                            //window.localStorage.setItem("RV", data);
                                            $('#lblRutaC').html(data)
                                        }
                                        EnvioVisita =0;                        
                                },
                                error: function(err){
                                    $.mobile.loading('hide');
                                    MandarAlerta('alerta_2',"Es posible que haya una falla en el servicio ");
                                   
                                }
                            });
                        }, 
                        function (error) {  
                            $('#error').val('Codigo: '    + error.code    + '\n' +   'Mensaje: ' + error.message + '\n');
                            
                        },options
                    );
            }
            if(opcion == 0) { //iniciar comida
                var finRuta =1
                $("#tblCVP tbody tr").each(function (index) 
                {
                    var campo1, campo2, campo3, campo4;
                    $(this).children("td").each(function (index2) 
                    {
                        switch (index2) 
                        {
                            case 1: campo2 = $(this).text();
                                    break;
                        }
                    })
                    if( campo2 == 'En visita' && finRuta == 1){
                        MandarAlerta('alerta_2',"Aún tienes visitas activas");
                        finRuta = 0
                    }
                    if( campo2 == 'Sin registro' ){
                        visitasPlaneadas++
                    }
                })
                if(finRuta ==1){
                    var res = true;
                    /*if(visitasPlaneadas==0)
                        res=true
                    else {
                        alert("¡Aún tienes visitas pendientes!")
                        res= false
                    }*/
                    if(res){
                        setTimeout(function(){ 
                                if (EnvioVisita == 1 ){
                                    $.mobile.loading('hide');
                                    MandarAlerta('alerta_2',"Probablemente su GPS esta apagado");
                                }
                             }, 20000);
                        $.mobile.loading( 'show', {
                            text: 'Enviando Información',
                            textVisible: true,
                            theme: 'a',
                            html: ""
                        }); 
                        navigator.geolocation.getCurrentPosition(
                                function (pocicion){
                                    var  LongitudVisita= pocicion.coords.longitude;
                                    var  LatitudVisita= pocicion.coords.latitude;                
                                    $.ajax({
                                        url: urlWcf + "RegistrarRutaVisita",
                                        data: { idUsuario : claveEntidad , latitud: LatitudVisita , longitud : LongitudVisita,opcion:2 },
                                        type: "GET",
                                        timeout:tiempoEspera,
                                        contentType: "application/json; charset=utf-8",
                                        dataType: "jsonp",
                                        success: function (data) {
                                            $.mobile.loading('hide');                         
                                                // navigator.notification.alert(data,
                                                                    // alertDismissed, 'HalcoNet', 'Aceptar');
                                                                    //alert(data)
                                                if(data.indexOf('inicio')>='ERROR'){
                                                     MandarAlerta('alerta_2',data)
                                                }
                                                else{
                                                    //window.localStorage.setItem("RV", data);
                                                    $('#lblRutaC').html(data)
                                                }
                                                EnvioVisita =0;                        
                                        },
                                        error: function(err){
                                            $.mobile.loading('hide');
                                            MandarAlerta('alerta_2',"Es posible que haya una falla en el servicio");
                                           
                                        }
                                    });
                                }, 
                                function (error) {  
                                    $('#error').val('Codigo: '    + error.code    + '\n' +   'Mensaje: ' + error.message + '\n');
                                    
                                },options
                            );
                    }
                }
            }//fin pocion 1
            if(opcion == 2){
                MandarAlerta('alerta_2','¡Ya has terminado la pausa de comida!')
            }
        }
    }//fin else
}
function IniciarVSucursal(){
    var rvS = "";
    var rvPC = "";
    var rv = "";
    var opcion=0
    var EnvioVisita=0;
    var visitasPlaneadas=0
    rvS = $('#lblRutaS').html();//obtener hora de pausa comida
    rvPC = $('#lblRutaC').html();//obtener hora de pausa comida
    rv = $('#lblRutaI').html();
    var claveEntidad = window.localStorage.getItem("IDUS")
    var msjalert ="";
    if((rv.indexOf('Fin')> -1 || rv== "" || rv== null) || ( rvPC.indexOf('Fin')== -1 && rvPC!="")) {
        MandarAlerta('alerta_2',"¡No has iniciado la ruta ó ya has terminado!, ¡Tienes una pausa activa!")
    }
    else{
        if(rvS!= "" && rvS!= null){
            if(rvS.indexOf('Fin')>-1){  
                opcion = 2
            }
            else {  opcion =1}
            msjalert="¿Finalizar pausa de sucursal?"
        }
        else{
            msjalert="¿Iniciar pausa de sucursal?"
            opcion=0
        }
        var respuesta = confirm(msjalert);
        if (respuesta == true) 
        {
            EnvioVisita=1;
            visitasPlaneadas =0
            if(opcion ==1)//finalizar
            {
                setTimeout(function(){ 
                        if (EnvioVisita == 1 ){
                            $.mobile.loading('hide');
                            MandarAlerta('alerta_2',"Probablemente su GPS esta apagado");
                        }
                     }, 20000);
                $.mobile.loading( 'show', {
                    text: 'Enviando Información',
                    textVisible: true,
                    theme: 'a',
                    html: ""
                }); 
                navigator.geolocation.getCurrentPosition(
                        function (pocicion){
                            var  LongitudVisita= pocicion.coords.longitude;
                            var  LatitudVisita= pocicion.coords.latitude;                
                            $.ajax({
                                url: urlWcf + "RegistrarRutaVisita",
                                data: { idUsuario : claveEntidad , latitud: LatitudVisita , longitud : LongitudVisita,opcion:3},
                                type: "GET",
                                timeout:tiempoEspera,
                                contentType: "application/json; charset=utf-8",
                                dataType: "jsonp",
                                success: function (data) {
                                    $.mobile.loading('hide');                         
                                        // navigator.notification.alert(data,
                                                            // alertDismissed, 'HalcoNet', 'Aceptar');
                                                            //alert(data)
                                        if(data.indexOf('inicio')>='ERROR'){
                                             MandarAlerta('alerta_2',data)
                                        }
                                        else{
                                            //window.localStorage.setItem("RV", data);
                                            $('#lblRutaS').html(data)
                                        }
                                        EnvioVisita =0;                        
                                },
                                error: function(err){
                                    $.mobile.loading('hide');
                                    MandarAlerta('alerta_2',"Es posible que haya una falla en el servicio ");
                                   
                                }
                            });
                        }, 
                        function (error) {  
                            $('#error').val('Codigo: '    + error.code    + '\n' +   'Mensaje: ' + error.message + '\n');
                            
                        },options
                    );
            }
            if(opcion == 0) { //iniciar comida
                var finRuta =1
                $("#tblCVP tbody tr").each(function (index) 
                {
                    var campo1, campo2, campo3, campo4;
                    $(this).children("td").each(function (index2) 
                    {
                        switch (index2) 
                        {
                            case 1: campo2 = $(this).text();
                                    break;
                        }
                    })
                    if( campo2 == 'En visita' && finRuta == 1){
                        MandarAlerta('alerta_2',"Aún tienes visitas activas");
                        finRuta = 0
                    }
                    if( campo2 == 'Sin registro' ){
                        visitasPlaneadas++
                    }
                })
                if(finRuta ==1){
                    var res = true;
                    /*if(visitasPlaneadas==0)
                        res=true
                    else {
                        alert("¡Aún tienes visitas pendientes!")
                        res= false
                    }*/
                    if(res){
                        setTimeout(function(){ 
                                if (EnvioVisita == 1 ){
                                    $.mobile.loading('hide');
                                    MandarAlerta('alerta_2',"Probablemente su GPS esta apagado");
                                }
                             }, 20000);
                        $.mobile.loading( 'show', {
                            text: 'Enviando Información',
                            textVisible: true,
                            theme: 'a',
                            html: ""
                        }); 
                        navigator.geolocation.getCurrentPosition(
                                function (pocicion){
                                    var  LongitudVisita= pocicion.coords.longitude;
                                    var  LatitudVisita= pocicion.coords.latitude;                
                                    $.ajax({
                                        url: urlWcf + "RegistrarRutaVisita",
                                        data: { idUsuario : claveEntidad , latitud: LatitudVisita , longitud : LongitudVisita,opcion:3 },
                                        type: "GET",
                                        timeout:tiempoEspera,
                                        contentType: "application/json; charset=utf-8",
                                        dataType: "jsonp",
                                        success: function (data) {
                                            $.mobile.loading('hide');                         
                                                // navigator.notification.alert(data,
                                                                    // alertDismissed, 'HalcoNet', 'Aceptar');
                                                                    //alert(data)
                                                if(data.indexOf('inicio')>='ERROR'){
                                                     MandarAlerta('alerta_2',data)
                                                }
                                                else{
                                                    //window.localStorage.setItem("RV", data);
                                                    $('#lblRutaS').html(data)
                                                }
                                                EnvioVisita =0;                        
                                        },
                                        error: function(err){
                                            $.mobile.loading('hide');
                                            MandarAlerta('alerta_2',"Es posible que haya una falla en el servicio");
                                           
                                        }
                                    });
                                }, 
                                function (error) {  
                                    $('#error').val('Codigo: '    + error.code    + '\n' +   'Mensaje: ' + error.message + '\n');
                                    
                                },options
                            );
                    }
                }
            }//fin pocion 1
            if(opcion == 2){
                MandarAlerta('alerta_2','¡Ya has terminado la pausa de comida!')
            }
        }
    }//fin else
}
function BuscarRutaIniciada(){
    consultaItinerario()
    var claveEntidad = window.localStorage.getItem("IDUS")
    $.ajax({
            url: urlWcf + "BuscarRegistroVisita",
            data: { idUsuario : claveEntidad},
            type: "GET",
            timeout:20000,
            contentType: "application/json; charset=utf-8",
            dataType: "jsonp",
            success: function (data) {
                if(data!=""){
                    window.localStorage.setItem("RV",data.split('_')[1])
                    $('#lblRutaI').html(window.localStorage.getItem("RV"))
                }
                else {window.localStorage.removeItem("RV")
                        $('#lblRutaI').html('')}
            },
            error: function(err){
                $.mobile.loading('hide');
            }
    });
}
function BuscarRegistroVComidaSucursal(){
    var claveEntidad = window.localStorage.getItem("IDUS")
    $.ajax({
            url: urlWcf + "BuscarRegistroVComidaSucursal",
            data: { idUsuario : claveEntidad},
            type: "GET",
            timeout:20000,
            contentType: "application/json; charset=utf-8",
            dataType: "jsonp",
            success: function (data) {
                if(data!=""){
                    //window.localStorage.setItem("RV",data.split('_')[1])
                    // $('#lblRutaI').html(window.localStorage.getItem("RV"))
                    $('#lblRutaC').html(data.split('@')[0])
                    $('#lblRutaS').html(data.split('@')[1])
                }
                else {//window.localStorage.removeItem("RV")
                        $('#lblRutaC').html('')
                        $('#lblRutaS').html('')
                }
            },
            error: function(err){
                $.mobile.loading('hide');
            }
    });
}
/*prospectos*/
function CambiarAProspectos(){
    var rvS = "";
    var rvPS = "";
    var rv = "";
    var opcion=0
    var EnvioVisita=0;
    var visitasPlaneadas=0
    rvS = $('#lblRutaC').html();//obtener hora de pausa comida
    rvPS = $('#lblRutaS').html();//obtener hora de pausa sucursal
    rv = $('#lblRutaI').html();
    var claveEntidad = window.localStorage.getItem("IDUS")
    var msjalert ="";
    if(rv.indexOf('Fin')> -1 || (rv== "" || rv== null) || (rvPS.indexOf('Fin')== -1 && rvPS!="")|| (rvS.indexOf('Fin')== -1 && rvS!="")){
        // alert("¡No has iniciado la ruta ó ya has terminado!,¡Tienes una pausa activa!")
		MandarAlerta('alerta_2',"¡No has iniciado la ruta ó ya has terminado!,¡Tienes una pausa activa!")
    }
    else{
        $.mobile.changePage( "#ListarProspectosV", { transition: "slideup", changeHash: false });
        //listarProspectos(1)
    }
}
function CambiarItinerario(){
	
		$("#idProspE").val(0)
		$("#codigoProspE").val('')
		$("#nombreProspE").val('')
		$("#direccionProspE").val('')
		$("#telefonoProspE").val('')
		$("#correoProspE").val('')
        $.mobile.changePage( "#itinerarioV", { transition: "slideup", changeHash: false });
}
function listarProspectos(){
    var claveEntidad = window.localStorage.getItem("IDUS")
    $.ajax({
        url: urlWcf + "ConsultarProspectos",
        data: { ClaveEntidad:claveEntidad},
        type: "GET",
        timeout:20000,
        contentType: "application/json; charset=utf-8",
        dataType: "jsonp",
        success: function (data) {
            var html=""
            html+= '<table class="facturas tblV" cellspacing="0" id="">'
            if(data.length>0){
                for(var i = 0; i< data.length; i++){
                        html+= '<tr style="background-color:'+(i%2 > 0?'#ededed':'#fff')+'">'
                        html+= '<td width=25%><center><a href="#" title="'+data[i].idCliente+'|'+data[i].codigo+'|'+data[i].nombre+'|'+data[i].direccion+'|'+data[i].telefono+'|'+data[i].correo+'|'+data[i].subcanal+'|'+data[i].groupcode+'|'+data[i].rfc+'" style="text-decoration:none;" class="anclaP"><label>'+data[i].codigo+'</label></a></center></td>'
                        html+= '<td width=65% align="center">'+data[i].nombre+'<label id="l'+data[i].codigo+'" style="display:none">1</label></td>'
                        html+= '<td width=10% ><input type="button" class="visitarProp"  title ="'+data[i].codigo+'" value="Visitar"  ></td>'
                        html+= '</tr>'

                        // html+= '<tr style="background-color:'+(i%2 > 0?'#ededed':'#fff')+'">'
                        // html+= '<td width=25%><center><a href="#" title="'+data[i].idCliente+'|'+data[i].codigo+'|'+data[i].nombre+'|'+data[i].direccion+'|'+data[i].telefono+'|'+data[i].correo+'|'+data[i].subcanal+'|'+data[i].groupcode+'" style="text-decoration:none;" class="anclaP"><label>'+data[i].codigo+'</center></label></a></td>'
                        // html+= '<td width=75% align="center"><a href="#" title="'+data[i].idCliente+'" style="text-decoration:none;" class="anclaP"><label>'+data[i].nombre+'</label></a></td>'
                        // html+= '</tr>'
                    
                }
            }
            else html+= '<tr><td>Sin prospectos</td></tr>'
            html+= '</table>'
            $('#divListaProspectos').html('')
            $('#divListaProspectos').html(html)
            // $.mobile.changePage( "#ListarProspectosV", { transition: "slideup", changeHash: false });
        },
        error: function(err){
            $.mobile.loading('hide');
        }
    });
}
function CambiarARegistro(){
	
    $.mobile.changePage( "#RegistroProspectosV", { transition: "slideup", changeHash: false });

}
function RegistrarProspecto(){
    var claveEntidad = window.localStorage.getItem("IDUS")
    var nombre = $('#nombreProsp').val()
    var direccion = $('#direccionProsp').val()
    var telefono = $('#telefonoProsp').val()
    var correo = $('#correoProsp').val()
    var rfc = $('#rfcProsp').val()
    var sucursal = $('select[id=sucursalProsp]').val();
    var subcanal = $('select[id=subcanalProsp]').val();
    if(nombre != "" && claveEntidad != "" )
    {
        setTimeout(function(){ 
            if (EnvioVisita == 1 ){
                $.mobile.loading('hide');
                MandarAlerta('alerta_2',"Probablemente su GPS esta apagado");
            }
         }, 50000);
        $.mobile.loading( 'show', {
            text: 'Enviando Información',
            textVisible: true,
            theme: 'a',
            html: ""
        }); 
        navigator.geolocation.getCurrentPosition(
                function (pocicion){
                    longitud = pocicion.coords.longitude;
                    latitud = pocicion.coords.latitude;
                    
                        $.ajax({
                                url: urlWcf + "RegistrarProspecto",
                                data: { nombre: nombre,direccion:direccion,telefono:telefono,correo:correo,subcanal:subcanal ,claveEntidad : claveEntidad,groupcode:sucursal,latitud : latitud,longitud:longitud,rfc:rfc},
                                type: "GET",
                                timeout:20000,
                                contentType: "application/json; charset=utf-8",
                                dataType: "jsonp",
                                success: function (data) {
                                    EnvioVisita=0
                                    $.mobile.loading('hide');
                                    MandarAlerta('alerta_2',data)
                                    $("#nombreProsp").val('')
                                    $("#direccionProsp").val('')
                                    $("#telefonoProsp").val('')
                                    $("#correoProsp").val('')
                                    consultaItinerario()
                                    $.mobile.changePage( "#itinerarioV", { transition: "slideup", changeHash: false });
                                },
                                error: function(err){
                                    $.mobile.loading('hide');
                                }
                        });
                    
                    }, 
            function (error) {                  
                $('#error').val('Codigo: '    + error.code    + '\n' +   'Mensaje: ' + error.message + '\n');
                
            },options
        );
    }else MandarAlerta('alerta_2',"¡Todos los campos son necesarios!")
}
$(document).ready(function (e) {
    $('body').on('click', '.anclaP', function() {//datos de prospecto
        var titleP=$(this).attr('title');
        var datos = titleP.split('|')
        $("#idProspE").val(datos[0])
        $("#codigoProspE").val(datos[1])
        $("#nombreProspE").val(datos[2])
        $("#direccionProspE").val(datos[3])
        $("#telefonoProspE").val(datos[4])
        $("#correoProspE").val(datos[5])
        $("#rfcProspE").val(datos[8])
        $("#subcanalProspE option[value="+ datos[6] +"]").attr("selected",true);
        $("#sucursalProspE option[value="+ datos[7] +"]").attr("selected",true);
    });
    $('body').on('click', '.visitarProp', function() {//planear prospecto
        var cliente=$(this).attr('title');
        var status = $('#l'+cliente).html()
        var claveEntidad = window.localStorage.getItem("IDUS")
        $.ajax({
            url: urlWcf + "GuardarClientesPlaneados",
            data: { ClaveEntidad:claveEntidad,Cliente:cliente,estatus:status},
            type: "GET",
            timeout:20000,
            contentType: "application/json; charset=utf-8",
            dataType: "jsonp",
            success: function (data) {
                if (data!= 'OK')
                    MandarAlerta('alerta_2','Problemas con el envío de información, intentelo nuevamente')
                else{
                    if(status==1)
                        $('#l'+cliente).html('0');
                    else
                        $('#l'+cliente).html('1');
                    BuscarRutaIniciada()
                    $.mobile.changePage( "#itinerarioV", { transition: "slideup", changeHash: false });
                }
            },
            error: function(err){
                $.mobile.loading('hide');
            }
        }); 
    });
})
function EditarProspecto(){
    var id = $('#idProspE').val()
    var nombre = $('#nombreProspE').val()
    var direccion = $('#direccionProspE').val()
    var telefono = $('#telefonoProspE').val()
    var correo = $('#correoProspE').val()
    var rfc = $('#rfcProspE').val()
    var sucursal = $('select[id=sucursalProspE]').val();
    var subcanal = $('select[id=subcanalProspE]').val();
    if(nombre != "" && id >0 )
    {
        $.mobile.loading( 'show', {
            text: 'Enviando Información',
            textVisible: true,
            theme: 'a',
            html: ""
        }); 
                    
        $.ajax({
                url: urlWcf + "EditarProspecto",
                data: { id:id,nombre: nombre,direccion:direccion,telefono:telefono,correo:correo,subcanal:subcanal ,groupcode:sucursal,rfc:rfc},
                type: "GET",
                timeout:20000,
                contentType: "application/json; charset=utf-8",
                dataType: "jsonp",
                success: function (data) {
                    $.mobile.loading('hide');
                    MandarAlerta('alerta_2',data)
                    $("#idProspE").val(0)
                    $("#codigoProspE").val('')
                    $("#nombreProspE").val('')
                    $("#direccionProspE").val('')
                    $("#telefonoProspE").val('')
                    $("#correoProspE").val('')
                    listarProspectos()
                },
                error: function(err){

                    $.mobile.loading('hide');
                }
        });
                    
    }else MandarAlerta('alerta_2',"¡Todos los campos son necesarios!")
}
/*prospectos*/
function filtrarCV() {
  var input, filter, table, tr, td, i;
  input = document.getElementById("filtroV");
  filter = input.value.toUpperCase();
  table = document.getElementById("tblCVC");
  tr = table.getElementsByTagName("tr");
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[0];
    if (td) {
      if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    } 
  }
}
function MandarAlerta(opcion,mensaje){
    if(opcion=='alert_1')
        alert(mensaje)
    else{
        navigator.notification.alert(mensaje,alertDismissed, 'HalcoNet', 'Aceptar');
    }
}
