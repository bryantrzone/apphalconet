// reparto
// var Latitud = 0; var Longitud = 0;
//  var LatitudReparto = 0; var LongitudReparto = 0;
//  var EnvioReparto =0;
//  var clickCoordenadas = 0;
//  var tiempoEspera = 10000;//15000;
//  var tiempoSincroniza = 500000;
//  options = { maximumAge: 30000,timeout: 3000,enableHighAccuracy: false}; // tiempos de respuesta de gps
// reparto
var watchID = null;
var facturas = [];

console.log("watchID:" + watchID);

function consultaRuta(opcion) {
    var UserName = window.localStorage.getItem('Us')
    var Rol = window.localStorage.getItem('Rol');
    consutastatus();
    var _EstatusRuta = '';
    var sessionInicioRuta = {
        'RutaIni': []
    };
    // alert(UserName);
    var html = "";
    $.ajax({
        url: urlWcf + "ConsultaFacturasRutas",
        data: { usuario: UserName, rol: 5 },
        // data: {  usuario : "ANTONIOL", rol: 5},
        type: "GET",
        //timeout:20000,
        contentType: "application/json; charset=utf-8",
        dataType: "jsonp",
        success: function (data) {
            if (data != null && data.length > 0) {

                $("#contenidoRuta").show();
                var htmlTable = '';
                var idRuta = 0;
                var tipoEvento = "";
                var clienteAnterior = "";

                $("#tblLista").html('');
                htmlTable += '<table class="facturas" id="facturas" cellspacing="0">';
                if (opcion == 0) {
                    stops = [];
                    stops.push({ "Geometry": { "Latitude": data[0].latitudSucursal, "Longitude": data[0].longitudSucursal, "Nombre": data[0].sDescripcion } });
                }

                $.each(data, function (index, value) {
                    if (value.tipoEvento == 'R') {
                        htmlTable += '<tr >' +
                            '<td width=20% style="text-align:center"><a href="#ancla" title="' + value.numFactura + '" style="text-decoration:none;" class="ancla">' + value.numFactura + '</a></td>' +
                            '<td width=70% style="text-align:center"><a href="#ancla" title="' + value.numFactura + '" style="text-decoration:none;" class="ancla">' + value.nombreCliente + '</a></td>' +
                            '<td width=10% style="text-align:center"><a href="#ancla" title="' + value.numFactura + '" style="text-decoration:none;" class="enviarFactura"><div class="estado ' + value.statusFactura + '" ></div></a></td>' +
                            '<td  style="display:none">' + value.statusFactura + '</td>' +
                            '<td  style="display:none">' + value.eDocNum + '</td>' +
                            '</tr>';

                        $('#lblHoraCarga').html(value.carga);
                        _EstatusRuta = value.statusRuta;
                    }
                    else {
                        htmlTable += '<tr >' +
                            '<td width=20% style="text-align:center"><a href="#" title="' + value.numFactura + '" style="text-decoration:none;" class="">' + value.numFactura + '</a></td>' +
                            '<td width=70% style="text-align:center"><a href="#" title="' + value.numFactura + '" style="text-decoration:none;" class="">' + value.nombreCliente + '</a></td>' +
                            '<td width=10% style="text-align:center"><a href="#" title="' + value.numFactura + '" style="text-decoration:none;" class="enviarServicio"><div class="estado ' + value.statusFactura + '" ></div></a></td>' +
                            '<td  style="display:none">' + value.statusFactura + '</td>' +
                            '<td  style="display:none">' + value.idRuta + '</td>' +
                            '</tr>';

                        $('#lblHoraCarga').html(value.carga);
                        $('.tf1').html('N. Servicio');
                        $('.tf2').html('Descripción');
                        _EstatusRuta = value.statusRuta;
                    }
                    idRuta = value.IdRuta;
                    tipoEvento = value.tipoEvento;

                    if (opcion == 0) {
                        facturas.push({ "Geometry": { "Latitude": value.latitudCliente, "Longitude": value.longitudCliente, "Nombre": value.nombreCliente, "Factura": value.numFactura } });
                        if (value.nombreCliente != clienteAnterior)
                            stops.push({ "Geometry": { "Latitude": value.latitudCliente, "Longitude": value.longitudCliente, "Nombre": value.nombreCliente, "Factura": value.numFactura } });
                        //$('#iniciarRuta').show();
                    }
                    //clienteAnterior = value.nombreCliente;
                    //console.log(clienteAnterior);
                    //var restoredInicioRuta = window.localStorage.getItem('inicioRuta');
                    //console.log(restoredInicioRuta);
                    ///*verifica que la ruta sea la misma de la sesion*/
                    //if (restoredInicioRuta != null) {
                    //    var restoredSessionIniRuta2 = JSON.parse(window.localStorage.getItem('inicioRuta'))
                    //    $.each(restoredSessionIniRuta2.RutaIni, function (index, value) {
                    //        console.log(value.idRuta + ' ' + idRuta);
                    //        if (value.idRuta == idRuta) {
                    //            $("#iniciarRuta").hide();
                    //            $("#terminarRuta").show();
                    //            console.log(tipoEvento);
                    //            //tipo evento
                    //            if (tipoEvento == 'R')
                    //                $("#registroFactura").show();
                    //            else
                    //                $("#registroFactura").hide();
                    //            // $("#registroFactura").show();
                    //        }
                    //    });

                    //    // $("#iniciarRuta").hide();
                    //    // $("#terminarRuta").show();
                    //    // $("#registroFactura").show();
                    //} else {
                    if (_EstatusRuta == "P") {
                        $("#iniciarRuta").show();
                        $("#terminarRuta").hide();
                        if (tipoEvento == 'R')
                            $("#registroFactura").show();
                        else
                            $("#registroFactura").hide();
                    }
                    else if (_EstatusRuta == "A") {
                        $("#iniciarRuta").hide();
                        $("#terminarRuta").show();

                        if (tipoEvento == 'R')
                            $("#registroFactura").show();
                        else
                            $("#registroFactura").hide();

                        var fechaN = "";
                        var f = new Date();
                        fechaN = (f.getFullYear()) + '-' + (f.getMonth() + 1) + '-' + f.getDate() + ' ' + f.getHours() + ':' + f.getMinutes();
                        
                        window.localStorage.removeItem('inicioRuta');
                        sessionInicioRuta.RutaIni.push({ "idRuta": idRuta, "fechaInicio": fechaN });
                        window.localStorage.setItem('inicioRuta', JSON.stringify(sessionInicioRuta));
                        
                    }
                    else if (_EstatusRuta == "T") {
                        $("#iniciarRuta").hide();
                        $("#terminarRuta").hide();

                        if (tipoEvento == 'R')
                            $("#registroFactura").show();
                        else
                            $("#registroFactura").hide();
                    }
                    // }
                    /*verifica que la ruta sea la misma de la sesion*/
                    var restoredInicioComida = window.localStorage.getItem('idComidaReparto');
                    if (restoredInicioComida != null) {
                        console.log(restoredInicioComida);
                        $("#iniciarComida").hide();
                        $("#terminarComida").show();
                    }
                    else {
                        $("#iniciarComida").show();
                        $("#terminarComida").hide();
                    }
                });
                htmlTable += '</table>';
                $("#tblListaFacturas").html(htmlTable);
                if (opcion == 0) {
                    stops.push({ "Geometry": { "Latitude": data[0].latitudSucursal, "Longitude": data[0].longitudSucursal, "Nombre": data[0].sDescripcion } });
                    //setTimeout(function(){ pintarMapa(); }, 5000);
                }

                window.localStorage.setItem('Ruta', idRuta);
                window.localStorage.setItem('TipoEvento', tipoEvento);
                //console.log(tipoEvento);
            }
            else $("#contenidoRuta").hide();
        }/*,
            error: function(err){
                $("#txtItemCode").removeClass( "ui-autocomplete-loading" );
            }*/
    });

}
function consutastatus() {
    $.ajax({
        url: urlWcf + "ConsultarStatus",
        data: { opcion: 1 },
        type: "GET",
        contentType: "application/json; charset=utf-8",
        dataType: "jsonp",
        success: function (data) {
            /* Supongamos que #contenido es el tbody de tu tabla */
            /* Inicializamos tu tabla */
            var htmlTable = '';
            $("#radiosStatus").html('');
            htmlTable += '<div >';
            for (var i = 0; i < data.length; i++) {
                // alert(data[i].nOrden);

                if (data[i].nOrden == 1) {
                    htmlTable += '<input type="radio" name="radio-choice-v-6" id="radio-choice-v-6' + data[i].nOrden + '" value="on" title="' + data[i].nIdEstatus + '" checked="checked">' +
                        '<label class="radios" for="radio-choice-v-6' + data[i].nOrden + '">' + data[i].sConcepto + '</label>';
                }
                else if (data[i].nOrden == 99) {
                    htmlTable += '<input type="radio" name="radio-choice-v-6" id="radio-choice-v-6' + data[i].nOrden + '"  value="on" title="' + data[i].nIdEstatus + '"  >' +
                        '<label class="radios" for="radio-choice-v-6' + data[i].nOrden + '">' + data[i].sConcepto + '</label>' +
                        '<input type="text" style="width: 100%;" id="ObsEntregaOtro"></input>';
                }
                else {
                    htmlTable += '<input type="radio" name="radio-choice-v-6" id="radio-choice-v-6' + data[i].nOrden + '"  value="on" title="' + data[i].nIdEstatus + '"  >' +
                        '<label class="radios" for="radio-choice-v-6' + data[i].nOrden + '">' + data[i].sConcepto + '</label>';
                }


            }

            htmlTable += '</div>';
            $("#radiosStatus").html(htmlTable);
        }
    });
}

function consutastatus2(idChecado) {
    $.ajax({
        url: urlWcf + "ConsultarStatus",
        data: { opcion: 1 },
        type: "GET",
        contentType: "application/json; charset=utf-8",
        dataType: "jsonp",
        success: function (data) {
            /* Supongamos que #contenido es el tbody de tu tabla */
            /* Inicializamos tu tabla */
            var htmlTable = '';
            $("#radiosStatus").html('');
            htmlTable += '<div >';
            for (var i = 0; i < data.length; i++) {
                // alert(data[i].nOrden);
                // alert('radio-choice-v-6'+data[i].nOrden);
                if (idChecado == 'radio-choice-v-6' + data[i].nOrden && data[i].nOrden != 99) {
                    htmlTable += '<input type="radio" name="radio-choice-v-6" id="radio-choice-v-6' + data[i].nOrden + '" value="on" title="' + data[i].nIdEstatus + '" checked="checked">' +
                        '<label class="radios" for="radio-choice-v-6' + data[i].nOrden + '">' + data[i].sConcepto + '</label>';
                }
                else if (data[i].nOrden == 99) {
                    htmlTable += '<input type="radio" name="radio-choice-v-6" id="radio-choice-v-6' + data[i].nOrden + '"  value="on" title="' + data[i].nIdEstatus + '"  >' +
                        '<label class="radios" for="radio-choice-v-6' + data[i].nOrden + '">' + data[i].sConcepto + '</label>' +
                        '<input type="text" style="width: 100%;" id="ObsEntregaOtro"></input>';
                }
                else {
                    htmlTable += '<input type="radio" name="radio-choice-v-6" id="radio-choice-v-6' + data[i].nOrden + '"  value="on" title="' + data[i].nIdEstatus + '"  >' +
                        '<label class="radios" for="radio-choice-v-6' + data[i].nOrden + '">' + data[i].sConcepto + '</label>';
                }

            }
            htmlTable += '</div>';
            $("#radiosStatus").html(htmlTable);
        }
    });
}



//---------------------------------------------------------------------------Funcion Nueva 27/01/17-----------------------------------------------
//determina la distancia entre dos puntos y la regresa en metros, lat1 y lon1 es para la latitud y longit
function distanciaDosPuntos(latitudOrigen, longitudOrigen, latitudDestino, longitudDestino) {
    var R = 6371;
    var dLat = (latitudDestino - latitudOrigen) * (Math.PI / 180);
    var dLon = (longitudDestino - longitudOrigen) * (Math.PI / 180);
    var a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(latitudOrigen * (Math.PI / 180)) * Math.cos(latitudDestino * (Math.PI / 180)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2)
        ;
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var distancia = R * c;
    distancia = distancia * 1000;
    return distancia;
} //---------------------------------------------------------------------------Fin Funcion distanciaDosPuntos -----------------------------------------------


//---------------------------------------------------------------------------Funcion Nueva 27/01/17-----------------------------------------------
//iniciar el seguimiento de los repartidores una vez que hayan dado click en el boton de iniciar Ruta, la llamada a esta funcion se realiza desde la
//funcion iniciarRuta(), así mismo invocamos a la funcion distanciaDosPuntos() para determinar la distancia que existe entre la ubicacion de cada una
//de sus facturas y la distancia a la que se encuentran, y en caso de que la distancia sea menor a 100 metros se comienzan a mandar las coordenadas cada
//3 segundos a la base de datos y una vez que se sale del rango la aplicacion deja de enviar las coordenadas.
//a la linea 77 donde esta el arreglo stops se le agrego: "Factura":value.numFactura
function iniciarRecorrido() {
    var lat1;
    var lon1;
    var options = { enableHighAccuracy: true };
    alert("Recorrido Iniciado");
    var idRuta = window.localStorage.getItem('Ruta');
    var fechas = "";
    var Contador = 0;
    //watchID=navigator.geolocation.watchPosition(
    watchID = setInterval(function () {
        navigator.geolocation.getCurrentPosition(
            function (position) {
                var hora = new Date();
                fechas = (hora.getFullYear()) + '-' + (hora.getMonth() + 1) + '-' + hora.getDate() + ' ' + hora.getHours() + ':' + hora.getMinutes() + ':' + hora.getSeconds() + '.' + hora.getMilliseconds();
                fechass = hora.getMilliseconds();
                lat1 = position.coords.latitude;
                lon1 = position.coords.longitude;
                for (var i = 0; i < facturas.length - 0; i++) {
                    debugger;
                    var distancia = distanciaDosPuntos(lat1, lon1, facturas[i].Geometry.Latitude, facturas[i].Geometry.Longitude);
                    console.log("-------------------------------" + distancia + "----------------------------------\n");
                    if (distancia <= 750) {
                        var distancias = distanciaDosPuntos(lat1, lon1, facturas[i].Geometry.Latitude, facturas[i].Geometry.Longitude);
                        var cliente = "prueba";
                        var Factura = facturas[i].Geometry.Factura;
                        $.ajax({
                            url: urlWcf + "GuardarRangoPosicion",
                            data: { Ruta: idRuta, Factura: Factura, Cliente: cliente, Fecha: fechas, Metrosacercado: distancias, Latitud: lat1, Longitud: lon1 },
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            dataType: "jsonp",
                            success: function (data) {
                                console.log(
                                    'Latitude: ' + lat1 + '\n' +
                                    'Longitude: ' + lon1 + '\n' +
                                    'Latitude 2 : ' + facturas[i].Geometry.Latitude + '\n' +
                                    'Longitude 2 : ' + facturas[i].Geometry.Longitude + '\n' +
                                    'Factura: ' + Factura + '\n' +
                                    'distancia: ' + distancias + '\n' +
                                    'Fecha: ' + fechas + '\n' +
                                    'Contador: ' + Contador + '\n' +
                                    'watchID: ' + watchID + '\n');
                                Contador++;
                            },
                            error: function (err) {
                                console.log("Error al publicar");
                            }
                        });
                    } else {
                        //navigator.vibrate(3000);
                        console.log(distancia);
                    }
                }

                //}
            }, function (error) {
                alert('code: ' + error.code + '\n' +
                    'message: ' + error.message + '\n');
            }, options)
    }, 3000);
}//---------------------------------------------------------------------------Fin Funcion iniciarRecorrido -----------------------------------------------

function iniciarCarga() {
    var UserName = "";
    var idRuta = window.localStorage.getItem('Ruta');
    var EnvioCarga = 1;

    var horaCarga = $("#lblHoraCarga").text()
    if (horaCarga.indexOf('Fin') == -1) {
        var respuesta = confirm("¿Continuar con el registro?");
        if (respuesta == true) {
            setTimeout(function () {
                if (EnvioCarga == 1) {
                    $.mobile.loading('hide');
                    alert("Probablemente su GPS esta apagado");
                }
            }, 50000);
            $.mobile.loading('show', {
                text: 'Enviando Información',
                textVisible: true,
                theme: 'a',
                html: ""
            });
            navigator.geolocation.getCurrentPosition(
                function (pocicion) {
                    var LatitudCarga = pocicion.coords.longitude;
                    var LongitudCarga = pocicion.coords.latitude;

                    $.ajax({
                        url: urlWcf + "RegistraCargaReparto",
                        data: { idRuta: idRuta, latitud: LatitudCarga, longitud: LongitudCarga },
                        // data: { usuario : "LUISL" , latitud: LatitudComida , longitud : LongitudComida , idComidaReparto : 0},
                        type: "GET",
                        timeout: tiempoEspera,
                        contentType: "application/json; charset=utf-8",
                        dataType: "jsonp",
                        success: function (data) {
                            $.mobile.loading('hide');
                            if (data != "") {
                                EnvioCarga = 0;
                                $("#lblHoraCarga").html(data)
                            } else {
                                alert('Problemas al registrar');
                            }
                        },
                        error: function (err) {
                            $.mobile.loading('hide');
                            alert(err);
                            alert("Es posible que haya una falla en el servicio");
                        }
                    });
                },
                function (error) {
                    $('#error').val('Codigo: ' + error.code + '\n' + 'Mensaje: ' + error.message + '\n');
                }, options
            );
        }
    } else
        MandarAlerta('alerta_2', "¡Ya has terminado el proceso de carga!")
}
//---------------------------------------------------------------------------Funcion Modificada 27/01/17-----------------------------------------------
//se agrego el mobile.loading y el llamado a la funcion iniciarRecorrido()
function iniciarRuta() {
    //iniciarRecorrido();
    var options = { enableHighAccuracy: true };
    //debugger;
    var UserID = window.localStorage.getItem('IDUS');
    var UserName = window.localStorage.getItem('Us');
    //mandarDatos=1;
    var idRuta = window.localStorage.getItem('Ruta');
    var tipoEvento = window.localStorage.getItem('TipoEvento');
    // console.log(tipoEvento);
    var fecha = "";
    var f = new Date();
    var sessionInicioRuta = {
        'RutaIni': []
    };
    fecha = (f.getFullYear()) + '-' + (f.getMonth() + 1) + '-' + f.getDate() + ' ' + f.getHours() + ':' + f.getMinutes();
    var html = "";

    var horaCarga = $("#lblHoraCarga").text()
    if (horaCarga.indexOf('Fin') > -1) {
        $.mobile.loading('show', {
            text: 'Enviando Información',
            textVisible: true,
            theme: 'a',
            html: ""
        });
        navigator.geolocation.getCurrentPosition(
            function (pocicion) {
                var LongitudInicio = pocicion.coords.longitude;
                var LatitudInicio = pocicion.coords.latitude;
                $.ajax({
                    url: urlWcf + "IniciarRuta",
                    data: { idRuta: idRuta, fechaInicio: fecha, latitud: LatitudInicio, longitud: LongitudInicio },
                    type: "GET",
                    timeout: tiempoEspera,
                    contentType: "application/json; charset=utf-8",
                    dataType: "jsonp",
                    success: function (data) {
                        $.mobile.loading('hide');
                        alert("Buen Viaje");
                        $("#iniciarRuta").hide();
                        $("#terminarRuta").show();
                        if (tipoEvento == 'R')
                            $("#registroFactura").show();
                        else
                            $("#registroFactura").hide();

                        window.localStorage.removeItem('inicioRuta');
                        sessionInicioRuta.RutaIni.push({ "idRuta": idRuta, "fechaInicio": fecha });
                        window.localStorage.setItem('inicioRuta', JSON.stringify(sessionInicioRuta));
                    },
                    error: function (err) {
                        $.mobile.loading('hide');
                        alert("Revise su conexón a internet y vuelva a intentarlo");
                    }
                });
            },
            function (error) {
                $.mobile.loading('hide');
                $('#error').val('Codigo: ' + error.code + '\n' + 'Mensaje: ' + error.message + '\n');
            }, options
        );
    }
    else
        MandarAlerta('alerta_2', "¡No has realizado el proceso de carga")
}

function finalizarRecorrido() {
    //if (watchID != null) {

    //navigator.geolocation.clearWatch(watchID);
    clearInterval(watchID);
    watchID = null;
    alert("Fin del trayecto");
    console.log("Fin de watchID: " + watchID);
    //}
}

function terminarRuta() {
    console.log("prueba");
    //debugger;
    var idRuta = window.localStorage.getItem('Ruta');
    var finRuta = 0;
    var fecha = "";
    var sessionFinRuta = {
        'RutaFin': []
    };
    var f = new Date();
    var html = "";
    fecha = (f.getFullYear()) + '-' + (f.getMonth() + 1) + '-' + f.getDate() + ' ' + f.getHours() + ':' + f.getMinutes();
    $("#tblListaFacturas tbody tr").each(function (index) {
        var campo1, campo2, campo3, campo4;
        $(this).children("td").each(function (index2) {
            switch (index2) {
                case 3: campo4 = $(this).text();
                    break;
            }
        })
        if (campo4 == 'N') {
            alert("Aún tienes registros pendientes");
            finRuta = 0
            return false;
        }
        else finRuta = 1;
    })
    if (finRuta == 1) {
        navigator.geolocation.getCurrentPosition(
            function (pocicion) {
                var LongitudTermino = pocicion.coords.longitude;
                var LatitudTermino = pocicion.coords.latitude;



                $.ajax({
                    url: urlWcf + "TerminarRuta",
                    data: { idRuta: idRuta, fechaInicio: fecha, latitud: LatitudTermino, longitud: LongitudTermino },
                    // data: { usuario : "LUISL" , latitud: LatitudComida , longitud : LongitudComida , idComidaReparto : 0},
                    type: "GET",
                    timeout: tiempoEspera,
                    contentType: "application/json; charset=utf-8",
                    dataType: "jsonp",
                    success: function (data) {
                        finalizarRecorrido();
                        alert(data);
                        $("#terminarRuta").hide();
                        $("#registroFactura").hide();
                        $("#obtenerRuta").show();
                        window.localStorage.removeItem('finRuta');
                        window.localStorage.removeItem('inicioRuta');

                    },
                    error: function (err) {
                        alert("Revise su conexón a internet y vuelva a intentarlo");
                    }
                });
            },
            function (error) {
                $('#error').val('Codigo: ' + error.code + '\n' + 'Mensaje: ' + error.message + '\n');

            }, options
        );
        //            // alert("enviar información");
        //            $.ajax({
        //                    url: urlWcf + "TerminarRuta",
        //                    data: {  idRuta : idRuta, fechaInicio: fecha},
        //                    type: "GET",
        //                    timeout:tiempoEspera,
        //                    contentType: "application/json; charset=utf-8",
        //                    dataType: "jsonp",
        //                    success: function (data) {
        //                        alert(data);
        //                        $("#terminarRuta").hide();
        //                        $("#registroFactura").hide();
        //                        $("#obtenerRuta").show();
        //                        window.localStorage.removeItem('finRuta');
        //                        window.localStorage.removeItem('inicioRuta');
        //                    },
        //                    error: function(err){
        //                        alert("Revise su conexón a internet y vuelva a intentarlo");
        //                    }
        //            });
    }
}
function LeerQr() {

    cordova.plugins.barcodeScanner.scan(
        function (result) {
            /*alert("We got a barcode\n" +"Result: " + result.text + "\n" +"Format: " + result.format + "\n" +"Cancelled: " + result.cancelled);*/
            var resultado = result.text;
            var cadenas = resultado.split('&');
            var cadenas2 = cadenas[3].split('=');
            $("#numFacturaR").val(cadenas2[1]);

        },
        function (error) {
            alert("Scanning failed: " + error.message);
        }
    );
}

//function EnviarMail() {
//    alert('apunto de enviar correo');

//    cordova.plugins.email.open({
//        to: 'pedro.juarez@tractozone.com.mx',
//        cc: 'pemijumo@hotmail.com',
//        bcc: ['pemijumo@gmail.com', 'pemijumo@yahoo.com.mx'],
//        subject: 'Prueba de envío',
//        body: 'Se realiza la primer prueba de envio de correo mail'
//    });

//    alert('Correo enviado');
//}


function checkConnection() {
    var networkState = navigator.network.connection.type;
    var internet = 1;
    var states = {};
    states[Connection.UNKNOWN] = '1';
    states[Connection.ETHERNET] = '1';
    states[Connection.WIFI] = '1';
    states[Connection.CELL_2G] = '1';
    states[Connection.CELL_3G] = '1';
    states[Connection.CELL_4G] = '1';
    states[Connection.NONE] = '0';

    if (states[networkState] == '0')
        internet = 0;

    return internet;
}


function MuestraRepartidor() {
    var Rol = window.localStorage.getItem('Rl');
    var user = window.localStorage.getItem("Nombre");
    $('#nombreUsuario').html(user)
    // var Rol = 6;
    // alert(Rol);cosul
    if (Rol == 1) { //admin
        $('#coordenadas').css('display', 'block');
        $('#catalogo').css('display', 'block');
        $('#entregaReparto').css('display', 'block');
        $('#consultaRep').css('display', 'block');
        $('#hacerLlamadas').css('display', 'block');
        $('#ventasP').css('display', 'block');
        $('#entregasA').css('display', 'block');
        $('#entregasB').css('display', 'block');
        $('#direcrtorioVentas').css('display', 'block');
        $('#opcItinerario').css('display', 'block');
        $('#promociones').css('display', 'block');
        $('#scorecard').css('display', 'block');
        $('#scorecardPH').css('display', 'block');
        $('#Choferes').css('display', 'block');
    }
    if (Rol == 2) { //regional
        $('#coordenadas').css('display', 'block');
        $('#catalogo').css('display', 'block');
        $('#entregaReparto').css('display', 'none');
        $('#consultaRep').css('display', 'block');
        $('#ventasP').css('display', 'block');
        $('#entregasA').css('display', 'none');
        $('#hacerLlamadas').css('display', 'none');
        var f = new Date();
        $('#fechaIni').val(fechaFormato(f));
        $('#fechaFinal').val(fechaFormato(f));
        $('#direcrtorioVentas').css('display', 'block');
        $('#opcItinerario').css('display', 'block');
        $('#promociones').css('display', 'block');
        $('#scorecard').css('display', 'block');
        $('#scorecardPH').css('display', 'block');
        $('#Choferes').css('display', 'none');
    }
    if (Rol == 3 || Rol == 4) {//ventas
        $('#coordenadas').css('display', 'block');
        $('#catalogo').css('display', 'block');
        $('#entregaReparto').css('display', 'none');
        $('#consultaRep').css('display', 'block');
        $('#ventasP').css('display', 'block');
        $('#entregasA').css('display', 'none');
        $('#entregasB').css('display', 'none');
        $('#hacerLlamadas').css('display', 'none');
        var f = new Date();
        $('#fechaIni').val(fechaFormato(f));
        $('#fechaFinal').val(fechaFormato(f));
        $('#direcrtorioVentas').css('display', 'block');
        $('#opcItinerario').css('display', 'block');
        $('#promociones').css('display', 'block');
        $('#scorecard').css('display', 'block');
        $('#scorecardPH').css('display', 'block');
        $('#Choferes').css('display', 'none');
    }
    if (Rol == 5) {//reparto
        $('#coordenadas').css('display', 'none');
        $('#catalogo').css('display', 'none');
        $('#entregaReparto').css('display', 'block');
        $('#consultaRep').css('display', 'none');
        $('#rutaRepartidor').css('display', 'block');
        $('#registroComida').css('display', 'block');
        $('#ventasP').css('display', 'none');
        $('#entregasA').css('display', 'none');
        $('#entregasB').css('display', 'none');
        $('#hacerLlamadas').css('display', 'none');
        $.mobile.changePage("#reparto");
        consultaRuta(0);
        $("#terminarRuta").hide();
        $('#direcrtorioVentas').css('display', 'none');
        $('#opcItinerario').css('display', 'none');
        $('#promociones').css('display', 'none');
        $('#scorecard').css('display', 'none');
        $('#scorecardPH').css('display', 'none');
        $('#Choferes').css('display', 'block');
    }
    if (Rol == null || Rol == undefined || Rol == 0) {
        $('#rutaRepartidor').css('display', 'none');
        $('#registroFactura').css('display', 'none');
        $('#registroCliente').css('display', 'none');
        $('#buscarArticulo').css('display', 'none');
        $('#ventasP').css('display', 'none');
        $('#entregasA').css('display', 'none');
        $('#entregasB').css('display', 'none');
        $('#direcrtorioVentas').css('display', 'none');
        $('#opcItinerario').css('display', 'none');
        $('#promociones').css('display', 'none');
        $('#scorecard').css('display', 'none');
        $('#scorecardPH').css('display', 'none');
        $('#Choferes').css('display', 'none');
    }
    if (Rol == 6) {//cobranza
        $('#coordenadas').css('display', 'none');
        $('#catalogo').css('display', 'none');
        $('#entregaReparto').css('display', 'none');
        $('#consultaRep').css('display', 'none');
        $('#hacerLlamadas').css('display', 'block');
        $('#ventasP').css('display', 'none');
        $('#entregasA').css('display', 'none');
        $('#entregasA').css('display', 'none');
        $('#opcItinerario').css('display', 'none');
        $.mobile.changePage("#llamadas");
        $('#promociones').css('display', 'none');
        $('#scorecard').css('display', 'none');
        $('#scorecardPH').css('display', 'none');
        $('#Choferes').css('display', 'none');
    }
    if (Rol == 7) {//almacen
        $('#coordenadas').css('display', 'none');
        $('#catalogo').css('display', 'none');
        $('#entregaReparto').css('display', 'none');
        $('#consultaRep').css('display', 'none');
        $('#hacerLlamadas').css('display', 'none');
        $('#ventasP').css('display', 'none');
        $('#entregasA').css('display', 'block');
        $('#entregasB').css('display', 'none');
        $('#direcrtorioVentas').css('display', 'none');
        $('#opcItinerario').css('display', 'none');
        $.mobile.changePage("#entregas");
        $('#promociones').css('display', 'none');
        $('#scorecard').css('display', 'none');
        $('#scorecardPH').css('display', 'none');
        $('#Choferes').css('display', 'none');
    }
    if (Rol == 8) {//entrega pedidos
        $('#coordenadas').css('display', 'none');
        $('#catalogo').css('display', 'none');
        $('#entregaReparto').css('display', 'none');
        $('#consultaRep').css('display', 'none');
        $('#hacerLlamadas').css('display', 'none');
        $('#ventasP').css('display', 'none');
        $('#entregasA').css('display', 'none');
        $('#entregasB').css('display', 'block');
        $('#direcrtorioVentas').css('display', 'none');
        $('#opcItinerario').css('display', 'none');
        $.mobile.changePage("#entregasO");
        $('#promociones').css('display', 'none');
        $('#scorecard').css('display', 'none');
        $('#scorecardPH').css('display', 'none');
        $('#Choferes').css('display', 'none');
    }
    if (Rol == 11) {//Reporteo Choferes
        $('#coordenadas').css('display', 'none');
        $('#catalogo').css('display', 'none');
        $('#entregaReparto').css('display', 'none');
        $('#consultaRep').css('display', 'none');
        $('#hacerLlamadas').css('display', 'none');
        $('#ventasP').css('display', 'none');
        $('#entregasA').css('display', 'none');
        $('#entregasB').css('display', 'none');
        $('#direcrtorioVentas').css('display', 'none');
        $('#opcItinerario').css('display', 'none');
        $('#promociones').css('display', 'none');
        $('#scorecard').css('display', 'none');
        $('#scorecardPH').css('display', 'none');
        $('#Choferes').css('display', 'block');
    }
}



function actualizarTabla(numFactura, sEntregado) {
    $("#facturas  tr").each(function (index) {
        var campo0, campo2, campo3, campo4;
        $(this).children("td").each(function (index2) {
            switch (index2) {
                case 0: campo0 = $(this).text();
                    break;
                case 4: campo4 = $(this).text();
                    break;
            }

        })
        if (campo0 == numFactura || campo4 == numFactura) {
            $($('#tblListaFacturas').find('tbody > tr')[index]).children('td')[3].innerHTML = sEntregado;
        }
    })
}
function guardarTFSesion() {
    var sessionTablaFacturas = {
        'tablaFactura': []
    };

    var restoredSessionTF = JSON.parse(window.localStorage.getItem('tablaFacturas'));
    // var restoredSession = JSON.parse(window.window.localStorage.getItem('sesion'));
    if (restoredSessionTF != null) {
        console.log(restoredSessionTF);
        $.each(restoredSessionTF.tablaFactura, function (index, value) {
            sessionTablaFacturas.tablaFactura.push({ 'numFactura': value.numFactura, "Cliente": value.nombreCliente, "StatusFactura": value.statusFactura, "EDocNum": value.EdocNum });
        });
    }
    window.localStorage.removeItem("tablaFacturas");
    $("#tblListaFacturas tbody tr").each(function (index) {
        var campo0, campo1, campo2, campo3, campo4;
        $(this).children("td").each(function (index2) {
            switch (index2) {
                case 0: campo0 = $(this).text();
                    break;
                case 1: campo1 = $(this).text();
                    break;
                case 3: campo3 = $(this).text();
                    break;
                case 4: campo4 = $(this).text();
                    break;
            }

        })
        sessionTablaFacturas.tablaFactura.push({ 'numFactura': campo0, "Cliente": campo1, "StatusFactura": campo3, "EDocNum": campo4 });
    })

    window.localStorage.setItem('tablaFacturas', JSON.stringify(sessionTablaFacturas));
    console.log(sessionTablaFacturas);
    pintarTabla();
}
function pintarTabla() {
    var restoredSessionTF = JSON.parse(window.localStorage.getItem('tablaFacturas'));
    var htmlTable = '';
    if (restoredSessionTF != null) {
        htmlTable += '<table class="precios" id="facturas" cellspacing="0">';
        console.log(restoredSessionTF);
        $.each(restoredSessionTF.tablaFactura, function (index, value) {
            htmlTable += '<tr >' +
                '<td width=20% style="text-align:center">' + value.numFactura + '</td>' +
                '<td width=70% style="text-align:center">' + value.Cliente + '</td>' +
                '<td width=10% style="text-align:center"><div class="estado ' + value.StatusFactura + '" ></div></td>' +
                '<td  style="display:none">' + value.StatusFactura + '</td>' +
                '<td  style="display:none">' + value.EDocNum + '</td>' +
                '</tr>';

        });
        htmlTable += '</table>';
        $("#tblListaFacturas").html(htmlTable);
    }
    window.localStorage.removeItem("tablaFacturas");
}

function envioRapidoServicio(numFacturaR) {
    //enviar factura con un click
    var r = confirm("¿Desea cambiar el status del servicio?");
    var idRuta = window.localStorage.getItem('Ruta');
    if (r == true) {
        var f = new Date();
        fc = (f.getFullYear()) + '-' + (f.getMonth() + 1) + '-' + f.getDate() + ' ' + f.getHours() + ':' + f.getMinutes();
        EnvioReparto = 1;
        $("#enviarReparto").prop("disabled", true);

        setTimeout(function () {
            if (EnvioReparto == 1 && LongitudReparto == 0) {
                $.mobile.loading('hide');
                EnvioReparto = 0;
                $("#enviarReparto").prop("disabled", false);
                alert("Probablemente su GPS esta apagado");
            }
        }, 50000);

        $.mobile.loading('show', {
            text: 'Enviando Información',
            textVisible: true,
            theme: 'a',
            html: ""
        });
        navigator.geolocation.getCurrentPosition(
            function (pocicion) {
                LongitudReparto = pocicion.coords.longitude;
                LatitudReparto = pocicion.coords.latitude;

                $.ajax({
                    url: urlWcf + "EntregaServicio",
                    data: { numFactura: numFacturaR, latitud: LatitudReparto, longitud: LongitudReparto, incidencia: "", fechaEntrega: fc, entregado: 'S', idRuta: idRuta },
                    type: "GET",
                    timeout: tiempoEspera,
                    contentType: "application/json; charset=utf-8",
                    dataType: "jsonp",
                    success: function (data) {
                        $.mobile.loading('hide');
                        $("#enviarReparto").prop("disabled", false);
                        $("#numFacturaR").val("");
                        $("#incidenciaR").val("");
                        $("#coordenadasC").val("");
                        EnvioReparto = 0;
                        alert(data);
                        consultaRuta(1);
                    },
                    error: function (err) {
                        $.mobile.loading('hide');
                        $("#enviarReparto").prop("disabled", false);
                        EnvioReparto = 0;
                        alert("Es posible que haya una falla en el servicio");


                    }
                });
            },
            function (error) {
                $('#error').val('Codigo: ' + error.code + '\n' + 'Mensaje: ' + error.message + '\n');

            }, options
        );
    } else {
        alert("No enviado");
    }
}

function envioRapidoFactrura(numFacturaR) {
    //enviar factura con un click
    var r = confirm("¿Desea cambiar el status de la factura?");
    if (r == true) {
        var statusSeleccionado = $('input[name=radio-choice-v-6]:checked').attr('title');
        var f = new Date();
        fc = (f.getFullYear()) + '-' + (f.getMonth() + 1) + '-' + f.getDate() + ' ' + f.getHours() + ':' + f.getMinutes();
        EnvioReparto = 1;
        $("#enviarReparto").prop("disabled", true);

        setTimeout(function () {
            if (EnvioReparto == 1 && LongitudReparto == 0) {
                $.mobile.loading('hide');
                EnvioReparto = 0;
                $("#enviarReparto").prop("disabled", false);
                alert("Probablemente su GPS esta apagado");
            }
        }, 50000);

        $.mobile.loading('show', {
            text: 'Enviando Información',
            textVisible: true,
            theme: 'a',
            html: ""
        });
        navigator.geolocation.getCurrentPosition(
            function (pocicion) {
                LongitudReparto = pocicion.coords.longitude;
                LatitudReparto = pocicion.coords.latitude;

                $.ajax({
                    url: urlWcf + "EntregaReparto",
                    data: { numFactura: numFacturaR, latitud: LatitudReparto, longitud: LongitudReparto, incidencia: "", fechaEntrega: fc, entregado: 'S', tipoIncidencia: statusSeleccionado },
                    type: "GET",
                    timeout: tiempoEspera,
                    contentType: "application/json; charset=utf-8",
                    dataType: "jsonp",
                    success: function (data) {
                        $.mobile.loading('hide');
                        $("#enviarReparto").prop("disabled", false);
                        $("#numFacturaR").val("");
                        $("#incidenciaR").val("");
                        $("#coordenadasC").val("");
                        EnvioReparto = 0;
                        alert(data);
                        consultaRuta(1);
                    },
                    error: function (err) {
                        $.mobile.loading('hide');
                        $("#enviarReparto").prop("disabled", false);
                        EnvioReparto = 0;
                        alert("Es posible que haya una falla en el servicio");
                        $("#numFacturaR").val("");
                        $("#incidenciaR").val("");
                        $("#coordenadasC").val("");
                        /*========================================================================guardar envio de facturas==================================================*/
                        var sessionFacturas = {
                            'factura': []
                        };
                        var restoredSession = JSON.parse(window.localStorage.getItem('facturasEntrega'));
                        // var restoredSession = JSON.parse(window.localStorage.getItem('sesion'));
                        if (restoredSession != null) {
                            console.log(restoredSession);
                            $.each(restoredSession.factura, function (index, value) {
                                sessionFacturas.factura.push({ 'numFactura': value.numFactura, 'latitud': value.latitud, 'longitud': value.longitud, 'incidencia': value.incidencia, 'fechaEntrega': value.fechaEntrega, 'entregado': value.entregado, 'tipoIncidencia': value.tipoIncidencia });
                            });
                        }

                        // console.log(sessionFacturas);
                        window.localStorage.removeItem("facturasEntrega");
                        sessionFacturas.factura.push({ 'numFactura': numFacturaR, 'latitud': LatitudReparto, 'longitud': LongitudReparto, 'incidencia': '', 'fechaEntrega': fc, 'entregado': 'S', 'tipoIncidencia': statusSeleccionado });
                        // console.log(sessionFacturas);
                        window.localStorage.setItem('facturasEntrega', JSON.stringify(sessionFacturas));
                        // window.localStorage.setItem('sesion', JSON.stringify(session));
                        actualizarTabla(numFacturaR, 'S');
                        /*========================================================================guardar tabla de las facturas==================================================*/
                        guardarTFSesion();
                        /*========================================================================guardar tabla de las facturas==================================================*/

                    }
                });
            },
            function (error) {
                $('#error').val('Codigo: ' + error.code + '\n' + 'Mensaje: ' + error.message + '\n');

            }, options
        );
    } else {
        alert("No enviado");
    }
}

function iniciarComida() {
    var UserName = "";
    UserName = window.localStorage.getItem('Us');
    EnvioComida = 1;
    setTimeout(function () {
        if (EnvioComida == 1) {
            $.mobile.loading('hide');
            alert("Probablemente su GPS esta apagado");
        }
    }, 50000);
    $.mobile.loading('show', {
        text: 'Enviando Información',
        textVisible: true,
        theme: 'a',
        html: ""
    });
    navigator.geolocation.getCurrentPosition(
        function (pocicion) {
            LatitudComida = pocicion.coords.longitude;
            LongitudComida = pocicion.coords.latitude;

            $.ajax({
                url: urlWcf + "RegistrarComidaReparto",
                data: { usuario: UserName, latitud: LatitudComida, longitud: LongitudComida, idComidaReparto: 0 },
                // data: { usuario : "LUISL" , latitud: LatitudComida , longitud : LongitudComida , idComidaReparto : 0},
                type: "GET",
                timeout: tiempoEspera,
                contentType: "application/json; charset=utf-8",
                dataType: "jsonp",
                success: function (data) {
                    $.mobile.loading('hide');
                    if (data > 0) {
                        alert('Registro guardado');
                        $("#terminarComida").show();
                        $("#iniciarComida").hide();
                        EnvioComida = 0;
                        window.localStorage.removeItem('idComidaReparto');
                        window.localStorage.setItem("idComidaReparto", data);

                    } else {
                        alert('Problemas al registrar');
                    }
                },
                error: function (err) {
                    $.mobile.loading('hide');
                    alert("Es posible que haya una falla en el servicio");

                }
            });
        },
        function (error) {
            $('#error').val('Codigo: ' + error.code + '\n' + 'Mensaje: ' + error.message + '\n');

        }, options
    );
}
function terminarComida() {
    var UserName = "";
    var idComidaReparto = "";
    UserName = window.localStorage.getItem('Us');
    idComidaReparto = window.localStorage.getItem('idComidaReparto');
    EnvioComida = 1;
    setTimeout(function () {
        if (EnvioComida == 1) {
            $.mobile.loading('hide');
            alert("Probablemente su GPS esta apagado");

        }
    }, 50000);
    $.mobile.loading('show', {
        text: 'Enviando Información',
        textVisible: true,
        theme: 'a',
        html: ""
    });
    navigator.geolocation.getCurrentPosition(
        function (pocicion) {
            LongitudComida = pocicion.coords.longitude;
            LatitudComida = pocicion.coords.latitude;

            $.ajax({
                url: urlWcf + "RegistrarComidaReparto",
                data: { usuario: UserName, latitud: LatitudComida, longitud: LongitudComida, idComidaReparto: idComidaReparto },
                // data: { usuario : "LUISL" , latitud: LatitudComida , longitud : LongitudComida , idComidaReparto :idComidaReparto},
                type: "GET",
                timeout: tiempoEspera,
                contentType: "application/json; charset=utf-8",
                dataType: "jsonp",
                success: function (data) {
                    $.mobile.loading('hide');
                    if (data == 0) {
                        alert('Registro guardado');
                        $("#terminarComida").hide();
                        $("#iniciarComida").show();
                        EnvioComida = 0;
                        window.localStorage.removeItem('idComidaReparto');

                    } else {
                        alert('Problemas al registrar');
                    }
                },
                error: function (err) {
                    $.mobile.loading('hide');
                    alert("Es posible que haya una falla en el servicio");

                }
            });
        },
        function (error) {
            $('#error').val('Codigo: ' + error.code + '\n' + 'Mensaje: ' + error.message + '\n');

        }, options
    );
}
$(document).ready(function (e) {
    var nombre = window.localStorage.getItem("Nombre");
    var id = window.localStorage.getItem("ID");
    // if(id > 0)
    // {
    $('#nombreUsuario').html(nombre)
    MuestraRepartidor();
    // }
    // else  location.href = 'login.html';
    var map;
    $('body,html').on("click", ".radios", function (event) {
        event.preventDefault();
        var radio = $(this).attr('for');

        consutastatus2(radio);
    });

    //clic en un enlace de la lista
    $('body').on('click', '.enviarFactura', function () {
        var titleF = $(this).attr('title');
        var restoredInicioRuta = window.localStorage.getItem('inicioRuta');
        if (restoredInicioRuta != null) {
            envioRapidoFactrura(titleF);
        }
    });

    $('body').on('click', '.enviarServicio', function () {
                var titleF = $(this).attr('title');
        var restoredInicioRuta = window.localStorage.getItem('inicioRuta');
        if (restoredInicioRuta != null) {
            envioRapidoServicio(titleF);
        }
        });

    $("#mapa").click(function () {
        prettyPrint();
        map = new GMaps({
            div: '#map2',
            zoom: 13,
            lat: stops[0].Geometry.Latitude,
            lng: stops[0].Geometry.Longitude,
            controls: {
                streetViewControl: false,
                mapTypeControl: false,
                overviewMapControl: false
            }
        });
        for (var j = 0; j < stops.length; j++) {
            //alert( stops[j].Geometry.Latitude+' '+ stops[j].Geometry.Longitude);
            map.addMarker({
                lat: stops[j].Geometry.Latitude,
                lng: stops[j].Geometry.Longitude,
                title: stops[j].Geometry.Nombre,
                /*click: function(e) {
                  alert(stops[j].Geometry.Nombre);
                }*/
            });
            map.drawOverlay({
                lat: stops[j].Geometry.Latitude,
                lng: stops[j].Geometry.Longitude,
                content: '<div class="clienteDir">' + stops[j].Geometry.Nombre + '</div>'
            });
            if (j < stops.length - 1) {
                map.drawRoute({
                    origin: [stops[j].Geometry.Latitude, stops[j].Geometry.Longitude],
                    destination: [stops[j + 1].Geometry.Latitude, stops[j + 1].Geometry.Longitude],
                    travelMode: 'driving',
                    strokeColor: '#f00',
                    strokeOpacity: 0.6,
                    strokeWeight: 4
                });
            }
            if (j == stops.length - 1) {
                map.drawRoute({
                    origin: [stops[j].Geometry.Latitude, stops[j].Geometry.Longitude],
                    destination: [stops[0].Geometry.Latitude, stops[0].Geometry.Longitude],
                    travelMode: 'driving',
                    strokeColor: '#f00',
                    strokeOpacity: 0.6,
                    strokeWeight: 4
                });
            }
        };

    });
    setInterval(function () {
        var restoredSession = JSON.parse(window.localStorage.getItem('facturasEntrega'));
        var restoredSessionIniRuta = JSON.parse(window.localStorage.getItem('inicioRuta'))
        var restoredSessionFinRuta = JSON.parse(window.localStorage.getItem('finRuta'))
        //var restoredSessionClientes = JSON.parse(window.localStorage.getItem('clientes'))
        /*if(restoredSessionClientes != null)
        {
            var conexion =  checkConnection();
            // alert(restoredSessionClientes.cliente.length);
            if(conexion == 1)
            {
                var enviadoCliente = 0;
                $.each(restoredSessionClientes.cliente,function(index, value){
                    //console.log(value.numFactura);
                    $.ajax({
                        url: urlWcf + "RegistrarCliente",
                        data: { cliente : value.cliente , nombreC:value.nombreC , latitud:value.latitud , longitud : value.longitud},
                        type: "GET",
                        timeout:tiempoEspera,
                        contentType: "application/json; charset=utf-8",
                        dataType: "jsonp",
                        success: function (data) {
                            enviadoCliente = 1;
                            console.log(data);
                        },
                        error: function(err){
                            $.mobile.loading('hide');
                         }
                    });
                });
                if(enviadoCliente == 1)
                    window.localStorage.removeItem("clientes");
                //alert("Sincronización correcta");
            }
        }*/
        if (restoredSession != null) {
            var conexion = checkConnection();
            // alert(restoredSession.factura.length);
            if (conexion == 1) {
                var enviadoFactura = 0;
                $.each(restoredSession.factura, function (index, value) {
                    //console.log(value.numFactura);
                    $.ajax({
                        url: urlWcf + "EntregaReparto",
                        data: { numFactura: value.numFactura, latitud: value.latitud, longitud: value.longitud, incidencia: value.incidencia, fechaEntrega: value.fechaEntrega, entregado: value.entregado, tipoIncidencia: value.tipoIncidencia },
                        type: "GET",
                        timeout: tiempoEspera,
                        contentType: "application/json; charset=utf-8",
                        dataType: "jsonp",
                        success: function (data) {
                            // $.mobile.loading('hide');
                            enviadoFactura = 1;
                            console.log(data);
                        },
                        error: function (err) {
                            $.mobile.loading('hide');
                        }
                    });
                });
                if (enviadoFactura == 1)
                    window.localStorage.removeItem("facturasEntrega");
                //alert("Sincronización correcta");
            }
        }
        /*if(restoredSessionIniRuta != null)
        {
            var conexion =  checkConnection();
            // alert(restoredSession.RutaIni.length);
            if(conexion == 1)
            {
                $.each(restoredSessionIniRuta.RutaIni,function(index, value){
                    //console.log(value.numFactura);
                    $.ajax({
                        url: urlWcf + "IniciarRuta",
                        data: {  idRuta : value.idRuta, fechaInicio: value.fecha},
                        type: "GET",
                        timeout:tiempoEspera,
                        contentType: "application/json; charset=utf-8",
                        dataType: "jsonp",
                        success: function (data) {
                            console.log("correcto");
                            window.localStorage.removeItem("inicioRuta");
                        },
                        error: function(err){
                            console.log("Error al guardar");
                        }
                    });
                });
                alert("Sincronización correcta");

            }
        }
        if(restoredSessionFinRuta != null)
        {
            var conexion =  checkConnection();
            // alert(restoredSession.RutaIni.length);
            if(conexion == 1)
            {
                $.each(restoredSessionFinRuta.RutaFin,function(index, value){
                    //console.log(value.numFactura);
                    $.ajax({
                        url: urlWcf + "TerminarRuta",
                        data: {  idRuta : value.idRuta, fechaInicio: value.fecha},
                        type: "GET",
                        timeout:tiempoEspera,
                        contentType: "application/json; charset=utf-8",
                        dataType: "jsonp",
                        success: function (data) {
                            console.log("correcto");
                            window.localStorage.removeItem("finRuta");
                        },
                        error: function(err){
                            console.log("Error al guardar");
                        }
                    });
                });
                alert("Sincronización correcta");

            }
        }
        //else{
        //    var conexion =  checkConnection();
            // alert(conexion);
        //}*/
    }, tiempoSincroniza);//100000//ejecutar funcion cada determinado tiempo

    // reparto


    $("#enviarReparto").click(function () {
        var numFacturaR = $("#numFacturaR").val();
        var incidenciaR = $("#incidenciaR").val();
        var tipoConsulta = 0;
        var ObsEntrega = "";
        ObsEntrega = $("#ObsEntregaOtro").val();
        if (ObsEntrega == null)
            ObsEntrega = "";

        var f = new Date();
        fc = (f.getFullYear()) + '-' + (f.getMonth() + 1) + '-' + f.getDate() + ' ' + f.getHours() + ':' + f.getMinutes();
        // if($("#radio-choice-v-6c").is(':checked')) {
        //     tipoConsulta = 1;
        // }
        var statusSeleccionado = $('input[name=radio-choice-v-6]:checked').attr('title');
        // if(tipoConsulta == 1)
        // {
        //     if(numFacturaR != ""  && incidenciaR != ""){
        //         $.mobile.loading( 'show', {
        //             text: 'Enviando Información',
        //             textVisible: true,
        //             theme: 'a',
        //             html: ""
        //         });
        //         $("#enviarReparto").prop( "disabled", true );
        //         $.ajax({
        //                 url: urlWcf + "EntregaReparto",
        //                 data: { numFactura : numFacturaR , latitud: "0" , longitud : "0", incidencia : incidenciaR, fechaEntrega:fc, entregado:'I',tipoIncidencia: "2"},
        //                 type: "GET",
        //                 timeout:tiempoEspera,
        //                 contentType: "application/json; charset=utf-8",
        //                 dataType: "jsonp",
        //                 success: function (data) {
        //                     $.mobile.loading('hide');
        //                     $("#enviarReparto").prop( "disabled", false );
        //                     $("#numFacturaR").val( "" );
        //                     $("#incidenciaR").val( "" );
        //                     $(".registroIncidencia").hide();
        //                     $( "#radio-choice-v-6c" ).prop( "checked", false ).checkboxradio( "refresh" );
        //                     $( "#radio-choice-v-6b" ).prop( "checked", false ).checkboxradio( "refresh" );
        //                     $( "#radio-choice-v-6a" ).prop( "checked", true ).checkboxradio( "refresh" );
        //                     alert(data);
        //                     consultaRuta(1);
        //                 },
        //                 error: function(err){
        //                     $.mobile.loading('hide');
        //                     $("#enviarReparto").prop( "disabled", false );
        //                     alert("Es posible que haya una falla en el servicio");
        //                     $("#numFacturaR").val( "" );
        //                     $("#incidenciaR").val( "" );
        //                     $(".registroIncidencia").hide();
        //                     $( "#radio-choice-v-6c" ).prop( "checked", false ).checkboxradio( "refresh" );
        //                     $( "#radio-choice-v-6b" ).prop( "checked", false ).checkboxradio( "refresh" );
        //                     $( "#radio-choice-v-6a" ).prop( "checked", true ).checkboxradio( "refresh" );
        //                     /*========================================================================guardar envio de facturas==================================================*/
        //                     var sessionFacturas = {
        //                       'factura': []
        //                     };

        //                     var restoredSession = JSON.parse(window.localStorage.getItem('facturasEntrega'));
        //                     // var restoredSession = JSON.parse(window.localStorage.getItem('sesion'));
        //                     if(restoredSession!= null){
        //                         console.log(restoredSession);
        //                         $.each(restoredSession.factura,function(index, value){
        //                             sessionFacturas.factura.push({ 'numFactura': value.numFactura, 'latitud': value.latitud, 'longitud': value.longitud , 'incidencia':value.incidencia,'fechaEntrega':value.fechaEntrega,'entregado':value.entregado,'tipoIncidencia':value.tipoIncidencia});
        //                         });

        //                     }
        //                     window.localStorage.removeItem("facturasEntrega");

        //                     sessionFacturas.factura.push({ 'numFactura': numFacturaR, 'latitud': 0, 'longitud': 0 , 'incidencia':incidenciaR,'fechaEntrega':fc,'entregado':'I','tipoIncidencia': "2"});

        //                     window.localStorage.setItem('facturasEntrega', JSON.stringify(sessionFacturas));

        //                     actualizarTabla(numFacturaR,'I');
        //                     /*========================================================================guardar tabla de las facturas==================================================*/
        //                     guardarTFSesion();
        //                     /*========================================================================guardar tabla de las facturas==================================================*/
        //                 }
        //             });
        //     }else
        //         alert("Todos los campos son necesarios");
        // }
        // if(tipoConsulta == 0)
        // {
        if (numFacturaR != "") {
            EnvioReparto = 1;
            $("#enviarReparto").prop("disabled", true);

            setTimeout(function () {
                if (EnvioReparto == 1 && LongitudReparto == 0) {
                    $.mobile.loading('hide');
                    EnvioReparto = 0;
                    $("#enviarReparto").prop("disabled", false);
                    alert("Probablemente su GPS esta apagado");
                    $.ajax({
                        url: urlWcf + "EntregaReparto",
                        data: { numFactura: numFacturaR, latitud: 0, longitud: 0, incidencia: ObsEntrega, fechaEntrega: fc, entregado: 'S', tipoIncidencia: statusSeleccionado },
                        type: "GET",
                        timeout: tiempoEspera,
                        contentType: "application/json; charset=utf-8",
                        dataType: "jsonp",
                        success: function (data) {
                            $.mobile.loading('hide');
                            $("#enviarReparto").prop("disabled", false);
                            $("#numFacturaR").val("");
                            $("#incidenciaR").val("");
                            $("#coordenadasC").val("");
                            EnvioReparto = 0;
                            alert(data);
                            consultaRuta(1);
                        }
                    });
                }
            }, 50000);

            $.mobile.loading('show', {
                text: 'Enviando Información',
                textVisible: true,
                theme: 'a',
                html: ""
            });
            navigator.geolocation.getCurrentPosition(
                function (pocicion) {
                    LongitudReparto = pocicion.coords.longitude;
                    LatitudReparto = pocicion.coords.latitude;

                    $.ajax({
                        url: urlWcf + "EntregaReparto",
                        data: { numFactura: numFacturaR, latitud: LatitudReparto, longitud: LongitudReparto, incidencia: ObsEntrega, fechaEntrega: fc, entregado: 'S', tipoIncidencia: statusSeleccionado },
                        type: "GET",
                        timeout: tiempoEspera,
                        contentType: "application/json; charset=utf-8",
                        dataType: "jsonp",
                        success: function (data) {
                            $.mobile.loading('hide');
                            $("#enviarReparto").prop("disabled", false);
                            $("#numFacturaR").val("");
                            $("#incidenciaR").val("");
                            $("#coordenadasC").val("");
                            EnvioReparto = 0;
                            alert(data);
                            consultaRuta(1);
                        },
                        error: function (err) {
                            $.mobile.loading('hide');
                            $("#enviarReparto").prop("disabled", false);
                            EnvioReparto = 0;
                            alert("Es posible que haya una falla en el servicio");
                            $("#numFacturaR").val("");
                            $("#incidenciaR").val("");
                            $("#coordenadasC").val("");
                            /*========================================================================guardar envio de facturas==================================================*/
                            var sessionFacturas = {
                                'factura': []
                            };
                            var restoredSession = JSON.parse(window.localStorage.getItem('facturasEntrega'));
                            // var restoredSession = JSON.parse(window.localStorage.getItem('sesion'));
                            if (restoredSession != null) {
                                console.log(restoredSession);
                                $.each(restoredSession.factura, function (index, value) {
                                    sessionFacturas.factura.push({ 'numFactura': value.numFactura, 'latitud': value.latitud, 'longitud': value.longitud, 'incidencia': value.incidencia, 'fechaEntrega': value.fechaEntrega, 'entregado': value.entregado, 'tipoIncidencia': value.tipoIncidencia });
                                });
                            }

                            // console.log(sessionFacturas);
                            window.localStorage.removeItem("facturasEntrega");
                            sessionFacturas.factura.push({ 'numFactura': numFacturaR, 'latitud': LatitudReparto, 'longitud': LongitudReparto, 'incidencia': '', 'fechaEntrega': fc, 'entregado': 'S', 'tipoIncidencia': "1" });
                            // console.log(sessionFacturas);
                            window.localStorage.setItem('facturasEntrega', JSON.stringify(sessionFacturas));
                            // window.localStorage.setItem('sesion', JSON.stringify(session));
                            actualizarTabla(numFacturaR, 'S');
                            /*========================================================================guardar tabla de las facturas==================================================*/
                            guardarTFSesion();
                            /*========================================================================guardar tabla de las facturas==================================================*/

                        }
                    });
                },
                function (error) {
                    $('#error').val('Codigo: ' + error.code + '\n' + 'Mensaje: ' + error.message + '\n');

                }, options
            );

        } else
            alert("Número de factura necesario");
        // }
    });
});

function MandarAlerta(opcion, mensaje) {
    if (opcion == 'alerta_1')
        alert(mensaje)
    else {
        navigator.notification.alert(mensaje, alertDismissed, 'HalcoNet', 'Aceptar');
    }
}

