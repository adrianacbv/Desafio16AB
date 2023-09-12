let valor_dolar_historico = [];
let valor_euro_historico = [];

let valor_dolar_actual = 0;
let valor_euro_actual = 0;

async function obtenerDatos() {
  try {
    const response = await fetch('https://mindicador.cl/api/dolar');
    const data = await response.json();
    valor_dolar_historico = data.serie;
    valor_dolar_historico.splice(10);
    valor_dolar_actual = valor_dolar_historico[0];
    graficarDolar();
  } catch (error) {
    console.log('Ocurrió un error', error);
    const errordiv=document.getElementById("error");
    errordiv.innerHTML="Ocurrió un error"+error;
  }

  try {
    const response = await fetch('https://mindicador.cl/api/euro');
    const data = await response.json();
    valor_euro_historico = data.serie;
    valor_euro_historico.splice(10);
    valor_euro_actual = valor_euro_historico[0];
    graficarEuro();
  } catch (error) {
    console.log('Ocurrió un error', error);
    const errordiv=document.getElementById("error");
    errordiv.innerHTML="Ocurrió un error"+error;
  }
}

function graficarDolar() {
  const ctx = document.getElementById('graficaDolar');

  new Chart(ctx, {
    type: 'line',
    data: {
      labels: valor_dolar_historico.map(function(elemento){ return elemento.fecha }),
      datasets: [{
        label: 'Valor Dolar en Peso Chileno',
        data: valor_dolar_historico.map(function(elemento){ return elemento.valor }),
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
        borderWidth: 1,
      }]
    }
  });
}

function graficarEuro() {
  const ctx = document.getElementById('graficaEuro');

  new Chart(ctx, {
    type: 'line',
    data: {
      labels: valor_euro_historico.map(function(elemento){ return elemento.fecha }),
      datasets: [{
        label: 'Valor Euro en Peso Chileno',
        data: valor_euro_historico.map(function(elemento){ return elemento.valor }),
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
        borderWidth: 1,
      }]
    }
  });
}

document.getElementById("buscar").addEventListener("click", function() {

  const tipo_cambio = document.getElementById("selector").value;
  const valor_pesos = document.getElementById("valorPesos").value;
  const resultado = document.getElementById("resultado");
  let conversion = 0;

  if(tipo_cambio == 'dolar') {
    conversion = valor_pesos/valor_dolar_actual.valor;
    
  } else if(tipo_cambio == 'euro') {
    conversion = valor_pesos/valor_euro_actual.valor;
  }

  resultado.innerHTML = "";
  resultado.innerHTML = conversion.toFixed(2);
});

obtenerDatos();