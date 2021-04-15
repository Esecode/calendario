
/*
usuarios
*/
const url = 'http://test.movilbox.co:888/test_mbox/test.php?metodo=usuarios';

const api = new XMLHttpRequest();

api.open('GET', url, true);
api.send();

api.onreadystatechange = function () {

  if (this.status == 200 && this.readyState == 4) {

    let datos = JSON.parse(this.responseText);
    let resultado = document.querySelector('#resultado'); resultado.innerHTML = '';

    for (let [index, value] of datos.entries()) {
      console.log(value.nombre, value.perfil, value.dias_plani, value.tiendas_plani);
      const itemList =
        `<li id="item-${index}">
        <p><strong>${value.nombre}</strong></p>
        <p><strong>${value.perfil}</strong></p>
        <p>Dias planificados: ${value.dias_plani}</p>
        <p>Tiendas planificadas: ${value.tiendas_plani}</p>
      </li>`;
      resultado.innerHTML += itemList;
      document.getElementById(`item-${index}`).style.borderRight = `8px solid ${getRandomColor()}`;
    }
  }
}

function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

/*
calendario
*/

var year = '2020';
var month = '04';
var totalCeldas = 42;

function renderCalendar(year, month)
{
  $(".cBox").html("");
  $(".cRow6").hide();
  var miFecha = year+'-'+month;
  var arrFecha = miFecha.split('-');
  var fecha = new Date(arrFecha[0], arrFecha[1]-1);
  var mes = fecha.getUTCMonth();
  var ano = fecha.getUTCFullYear();
  var primerDiaMes = fecha.getDay();
  var fecha2 = new Date(arrFecha[0], arrFecha[1], 0);
  var ultimoDiaMes = fecha2.getDate();
  // Colocar números  
  colocarNumeros(primerDiaMes, ultimoDiaMes);
  // Colocar el año y el mes en texto actuales
  $(".currentYear").html(arrFecha[0]);
  $(".currentMonth").html(monthNames[arrFecha[1]-1]);
}//fn

// Colocar numeración en el calendario
function colocarNumeros(primerDiaMes, ultimoDiaMes)
{
  var dia = 0;
  for(i=1; i<=totalCeldas; i++){
    if (i > primerDiaMes && dia < ultimoDiaMes){
      dia++;
      var dayTxt = (String(dia).length == 1) ? String('0'+dia) : String(dia);
      $(".box"+i).html(dia);
      $(".box"+i).closest('.item-flex')
        .find('button')
        .prop("id", year+'-'+month+'-'+dayTxt);
      if (i >= 36){
        $(".cRow6").show();
      }
    }//if
  }//for
}//fn

const monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
];

// Controles del calendario
// Ir a Mes Anterior
function mesAnterior()
{
  var newMonth = parseInt(month)-1;
  if (newMonth == 0){
    newMonth = 12;
    year = parseInt(year)-1;
  } else if (newMonth.length == 1){
    newMonth = '0'+newMonth;
  }//if
  month = newMonth;
  renderCalendar(year, month);
}//fn

// Ir a Siguiente Mes
function mesSiguiente()
{
  var newMonth = parseInt(month)+1;
  if (newMonth == 13){
    newMonth = 1;
    year = parseInt(year)+1;
  } else if (newMonth.length == 1){
    newMonth = '0'+newMonth;
  }//if
  month = newMonth;
  renderCalendar(year, month);
}//fn

// Consultar eventos del día
function consultarEventosDelDia(el)
{
  var miFecha = $(el).attr("id");
  console.log("Eventos del Día "+miFecha);
  // Cargar vista de los eventos
  $(".listadoEventos").fadeIn();
}//fn

// Acción para cerrar calendario
function cerrarCalendario()
{
   $(".listadoEventos").fadeOut();
}//fn

renderCalendar(year, month);


const drag = document.querySelector('#resultado');
/*
drag.addEventListener('dragstart', e => {
  console.log('Drag Start');
});

drag.addEventListener('dragend', e => {
  console.log('Drag end');
});

drag.addEventListener('drag', e => {
  console.log('Drag');
});
*/

const drop = document.querySelector('#drop');

      drop.addEventListener('dragenter', e => {
        console.log('Drag Enter');
      });
      
      drop.addEventListener('dragleave', e => {
        console.log('Drag Leave');
      });
      
      drop.addEventListener('dragover', e => {
      
        e.preventDefault();
        console.log('Drag Over');
      });
      
      drop.addEventListener('drop', e => {
        console.log('Drop');
      
        drop.appendChild(resultado);
      });

