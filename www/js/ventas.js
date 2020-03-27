function consultaPromociones(){
    var claveEntidad = window.localStorage.getItem("IDUS")
    $.ajax({
        url: urlWcf + "ConsultarPromocion",
        data: { ClaveEntidad:claveEntidad},
        type: "GET",
        timeout:20000,
        contentType: "application/json; charset=utf-8",
        dataType: "jsonp",
        success: function (data) {
            var html=""
            var htmlR=""
            html+= '<table class="facturas tblV" id="tblP" cellspacing="0">'
            htmlR+= '<table class="facturas tblV" id="tblPR" cellspacing="0">'
            for(var i = 0; i< data.length; i++){
                if(data[i].Tipo=='Remate'){
                    htmlR+= '<tr style="background-color:'+(i%2 > 0?'#ededed':'#fff')+'"><td width=55%><center><label>'+data[i].Codigo+'</label></center></td>'
                    htmlR+= '<td width=25%><center><label>'+data[i].Linea+'</label></center></td>'
                    htmlR+= '<td width=20%><center><label>'+data[i].PrecioEspecial+'</label></center></td>'
                    htmlR+= '</tr>'
                    htmlR+= '<tr style="background-color:'+(i%2 > 0?'#ededed':'#fff')+'"><td colspan="3" ><center><label>'+data[i].Descripcion+'</label></center></td></tr>'
                }
                else{
                    html+= '<tr style="background-color:'+(i%2 > 0?'#ededed':'#fff')+'"><td width=35%><center><label>'+data[i].Codigo+'</label></center></td>'
                    html+= '<td width=25%><center><label>'+data[i].Linea+'</label></center></td>'
                    html+= '<td width=20%><center><label>'+data[i].PrecioMayoreo+'</label></center></td>'
                    html+= '<td width=20%><center><label>'+data[i].PrecioTransporte+'</label></center></td>'
                    html+= '</tr>'
                    html+= '<tr style="background-color:'+(i%2 > 0?'#ededed':'#fff')+'"><td colspan="4" ><center><label>'+data[i].Descripcion+'</label></center></td></tr>'
                }
            }
            html+= '</table>'
            htmlR+= '</table>'
            $('#divArticulosPromociones').html('')
            $('#divArticulosPromociones').html(html)
            $('#divArticulosRemates').html('')
            $('#divArticulosRemates').html(htmlR)
        },
        error: function(err){
            $.mobile.loading('hide');
        }
    });
}
function filtrarPR() {
  var input, filter, table, tr, td, i;
  input = document.getElementById("filtroPR");
  filter = input.value.toUpperCase();
  table = document.getElementById("tblPR");
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
function filtrarP() {
  var input, filter, table, tr, td, i;
  input = document.getElementById("filtroP");
  filter = input.value.toUpperCase();
  table = document.getElementById("tblP");
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
function Top(div){
    $('body,html').stop(true,true).animate({
            scrollTop: $('#'+div).offset().top
        },1000);
}