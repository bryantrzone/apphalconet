//var UrlWCF = "http://localhost:8732/Design_Time_Addresses/HNTService/Service1/";
//var UrlWCF = "http://192.168.2.100:70/WS/HNTService.Service1.svc/";
var UrlWCF = "http://serverpjsap.ddns.net:60/Wcf2/WcfServiceLibrary1.Json.svc/";
var ms = '';
var variableN = '';
var options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 1000
};

var fn = {
    init: function (){
        $('#btnReportarChofer').on('click', fn.getPosition);
		},
    
    deviceready: function(){
        window.addEventListener("load", fn.init, false);
    },

    getPosition: function () {
        $.mobile.loading('show', {
            text: 'reportando...',
            textVisible: true,
            theme: 'a',
            html: ""
        });
        navigator.geolocation.getCurrentPosition(success, error, options);
    }
}

function success(pocicion) {
    var cve = $("#cve").val();
    var LatitudCarga = pocicion.coords.latitude;
    var LongitudCarga = pocicion.coords.longitude;
    $.ajax({
        url: UrlWCF + "RegistraBitacora",
        data: { clave: cve, latitud: LatitudCarga, longitud: LongitudCarga},
        type: "GET",
        contentType: "application/json; charset=utf-8",
        dataType: "jsonp",
        success: function (data) {
            // $.mobile.loading('hide');
            alert(data);
            $.mobile.loading("hide");
        },
        error: function (err) {
            //$.mobile.loading('hide');
            alert("Revise su conexón a internet y vuelva a intentarlo");
            $.mobile.loading("hide");
        }
    });
};

function error(err) {
    console.warn('ERROR(' + err.code + '): ' + err.message);
    $.mobile.loading("hide");
};

$(fn.deviceready);
