function ir_prestaciones() {
  form1.submit();
}

function cambiar_ano() {
  if (form1.ano_espec4.value != "") form1.ano_titulo.disabled = false;
  else {
    form1.ano_titulo.disabled = true;
    form1.ano_titulo.checked = false;
  }
}

// function ayuda_nav(ancla) {
//   ventana = window.open(
//     "ayuda.html#" + ancla,
//     "",
//     "width=700,height=375,left=50,top=0,toolbar=0,location=0,directories=0,status=1,menubar=0,scrollbars=1,resizable=0"
//   );
// }

function ayuda(ancla) {
  ventana = window.open(
    "decreto.html#" + ancla,
    "",
    "width=700,height=375,left=50,top=0,toolbar=0,location=0,directories=0,status=1,menubar=0,scrollbars=1,resizable=0"
  );
}

function formatAsMoney(numero) {
  numero = numero + "";
  var longit = numero.length;
  var cadena = "";
  var contador = 0;

  for (i = longit; i >= 0; i--) {
    if (contador != 3) {
      cadena = numero.charAt(i) + cadena;
      contador++;
    } else {
      contador = 1;
      if (i != 0) cadena = "," + numero.charAt(i) + cadena;
      else cadena = numero.charAt(i) + cadena;
    }
  }
  return cadena;
}

function simular() {
  var suma_produccion = new Array(26);
  var puntos_produccion = new Array(26);

  for (i = 0; i <= 25; i++) suma_produccion[i] = 0.0;

  var valor_unitario = 20895; 

  var suma_total = 0;
  var suma_titulos = 0;
  var suma_categoria = 0;
  var suma_experiencia = 0;
  var suma_productividad = 0;

  //Inicializar el array de los puntos de producción académica
  puntos_produccion[1] = 15;
  puntos_produccion[2] = 12;
  puntos_produccion[3] = 8;
  puntos_produccion[4] = 3;
  puntos_produccion[5] = 4.5;
  puntos_produccion[6] = 3.6;
  puntos_produccion[7] = 2.4;
  puntos_produccion[8] = 0.9;
  puntos_produccion[9] = 9;
  puntos_produccion[10] = 7.2;
  puntos_produccion[11] = 4.8;
  puntos_produccion[12] = 1.8;
  puntos_produccion[13] = 12;
  puntos_produccion[14] = 7;
  puntos_produccion[15] = 20;
  puntos_produccion[16] = 15;
  puntos_produccion[17] = 15;
  puntos_produccion[18] = 15;
  puntos_produccion[19] = 25;
  puntos_produccion[20] = 15;
  puntos_produccion[21] = 20;
  puntos_produccion[22] = 14;
  puntos_produccion[23] = 15;
  puntos_produccion[24] = 8;
  puntos_produccion[25] = 15;

  //TITULOS UNIVERSITARIOS ***********************************

  // Verificar si se seleccionó el área del título
  //if ((form1.area_titulo(0).checked==false) && (form1.area_titulo(1).checked==false))
  if (form1.area_titulo.value == "") {
    alert("Debe seleccionar el área del título");
    form1.ancla.focus();
    return false;
  }

  //if (form1.area_titulo(0).checked==true) suma_titulos=parseInt(form1.area_titulo(0).value);
  //if (form1.area_titulo(1).checked==true) suma_titulos=parseInt(form1.area_titulo(1).value);

  if (eval(form1.area_titulo.value) > 0)
    suma_titulos = parseInt(form1.area_titulo.value);

  // Verificar que los años de las especializaciones sean números
  valido = true;
  for (i = 1; i <= 4; i++)
    if (
      eval("form1.ano_espec" + i).value != "" &&
      !es_numero(eval("form1.ano_espec" + i).value)
    )
      valido = false;
  if (valido == false) {
    alert(
      "Hay valores de años académicos o de número de programas que no son números"
    );
    form1.ano_espec1.focus();
    return false;
  } else {
    suma_clinica = 0;
    suma_no_clinica = 0;
    suma_magister = 0;
    suma_doctorado = 0;
    for (i = 1; i <= 4; i++)
      if (eval("form1.ano_espec" + i).value != "") {
        //if(eval(("form1.ano_espec"+i).value) > 0)
        switch (i) {
          case 1: {
            suma_clinica = parseFloat(form1.ano_espec1.value) * 15;
            if (suma_clinica > 75) suma_clinica = 75;
            break;
          }
          case 2: {
            if (parseInt(form1.ano_espec2.value) >= 2) suma_no_clinica = 30;
            else suma_no_clinica = 20;
            break;
          }
          case 3: {
            if (parseInt(form1.ano_espec3.value) < 2) suma_magister = 40;
            else suma_magister = 60;
            break;
          }
          case 4: {
            if (parseInt(form1.ano_espec4.value) < 2) suma_doctorado = 80;
            else suma_doctorado = 120;
            break;
          }
        }
      }
  }

  suma_temporal = 0;
  if (suma_clinica > 75) suma_clinica = 75;

  if (
    suma_no_clinica == 0 &&
    suma_clinica > 0 &&
    suma_magister == 0 &&
    suma_doctorado == 0
  )
    suma_temporal = suma_clinica;
  else if (
    suma_no_clinica == 0 &&
    suma_clinica > 0 &&
    suma_magister > 0 &&
    suma_doctorado == 0
  )
    if (suma_clinica + suma_magister > 75) suma_temporal = 75;
    else suma_temporal = suma_clinica + suma_magister;
  else if (
    suma_no_clinica == 0 &&
    suma_clinica > 0 &&
    suma_magister > 0 &&
    suma_doctorado > 0
  )
    if (suma_clinica + suma_magister > 75) suma_temporal = suma_doctorado + 75;
    else suma_temporal = suma_doctorado + suma_clinica + suma_magister;
  else if (
    suma_no_clinica == 0 &&
    suma_clinica > 0 &&
    suma_magister == 0 &&
    suma_doctorado > 0
  )
    if (form1.ano_titulo.checked == true)
      suma_temporal = suma_clinica + suma_doctorado + 40;
    else suma_temporal = suma_clinica + suma_doctorado;
  else if (
    suma_no_clinica > 0 &&
    suma_clinica == 0 &&
    suma_magister == 0 &&
    suma_doctorado == 0
  )
    suma_temporal = suma_no_clinica;
  else if (
    suma_no_clinica > 0 &&
    suma_clinica == 0 &&
    suma_magister > 0 &&
    suma_doctorado == 0
  )
    if (suma_no_clinica + suma_magister > 60) suma_temporal = 60;
    else suma_temporal = suma_no_clinica + suma_magister;
  else if (
    suma_no_clinica > 0 &&
    suma_clinica == 0 &&
    suma_magister > 0 &&
    suma_doctorado > 0
  )
    if (suma_no_clinica + suma_magister > 60)
      suma_temporal = suma_doctorado + 60;
    else suma_temporal = suma_doctorado + suma_no_clinica + suma_magister;
  else if (
    suma_no_clinica > 0 &&
    suma_clinica == 0 &&
    suma_magister == 0 &&
    suma_doctorado > 0
  )
    if (form1.ano_titulo.checked == true)
      suma_temporal = suma_no_clinica + suma_doctorado + 40;
    else suma_temporal = suma_no_clinica + suma_doctorado;
  else if (
    suma_no_clinica == 0 &&
    suma_clinica == 0 &&
    suma_magister > 0 &&
    suma_doctorado == 0
  )
    suma_temporal = suma_magister;
  else if (
    suma_no_clinica == 0 &&
    suma_clinica == 0 &&
    suma_magister > 0 &&
    suma_doctorado > 0
  )
    suma_temporal = suma_magister + suma_doctorado;
  else if (
    suma_no_clinica == 0 &&
    suma_clinica == 0 &&
    suma_magister == 0 &&
    suma_doctorado > 0
  )
    suma_temporal = suma_doctorado + 40;

  if (suma_temporal > 140) suma_temporal = 140;
  suma_titulos = suma_titulos + suma_temporal;

  //CATEGORIA ***********************************
  if (document.getElementsByName("escalafon")[1].checked == true)
    suma_categoria = parseInt(document.getElementsByName("escalafon")[1].value);
  if (document.getElementsByName("escalafon")[2].checked == true)
    suma_categoria = parseInt(document.getElementsByName("escalafon")[2].value);
  if (document.getElementsByName("escalafon")[3].checked == true)
    suma_categoria = parseInt(document.getElementsByName("escalafon")[3].value);
  if (document.getElementsByName("escalafon")[4].checked == true)
    suma_categoria = parseInt(document.getElementsByName("escalafon")[4].value);

  //EXPERIENCIA CALIFICADA ***********************************
  if (document.getElementsByName("escalafon")[1].checked == true)
    maximo_experiencia = 20;
  if (document.getElementsByName("escalafon")[2].checked == true)
    maximo_experiencia = 45;
  if (document.getElementsByName("escalafon")[3].checked == true)
    maximo_experiencia = 90;
  if (document.getElementsByName("escalafon")[4].checked == true)
    maximo_experiencia = 120;

  //Verificar que sean números los años de experiencia
  valido = true;
  for (i = 1; i <= 4; i++)
    if (
      eval("form1.ano_experiencia" + i).value != "" &&
      !es_numero(eval("form1.ano_experiencia" + i).value)
    )
      valido = false;

  if (valido == false) {
    alert("Hay valores de años de experiencia que no son números");
    suma_experiencia = 0;
    form1.ano_experiencia1.focus();
    return false;
  } else {
    for (i = 1; i <= 4; i++)
      if (eval("form1.ano_experiencia" + i).value != "") {
        switch (i) {
          case 1: {
            suma_experiencia =
              parseFloat(suma_experiencia) +
              parseFloat(form1.ano_experiencia1.value) * 6;
            break;
          }
          case 2: {
            suma_experiencia =
              parseFloat(suma_experiencia) +
              parseFloat(form1.ano_experiencia2.value) * 4;
            break;
          }
          case 3: {
            suma_experiencia =
              parseFloat(suma_experiencia) +
              parseFloat(form1.ano_experiencia3.value) * 4;
            break;
          }
          case 4: {
            suma_experiencia =
              parseFloat(suma_experiencia) +
              parseFloat(form1.ano_experiencia4.value) * 3;
            break;
          }
        }
      }
  }

  if (suma_experiencia > maximo_experiencia)
    suma_experiencia = parseFloat(maximo_experiencia);

  //PRODUCTIVIDAD ACADEMICA ***********************************
  if (document.getElementsByName("escalafon")[1].checked == true)
    maximo_productividad = 80;
  if (document.getElementsByName("escalafon")[2].checked == true)
    maximo_productividad = 160;
  if (document.getElementsByName("escalafon")[3].checked == true)
    maximo_productividad = 320;
  if (document.getElementsByName("escalafon")[4].checked == true)
    maximo_productividad = 540;

  for (numero = 1; numero <= 25; numero++) {
    if (parseInt(eval("form1.num_art" + numero).value) != -1) {
      suma_produccion[numero] = 0;
      for (i = 1; i <= parseInt(eval("form1.num_art" + numero).value); i++) {
        if (
          !es_numero(eval("form1.aut_art_" + numero + "_" + i).value) ||
          eval("form1.aut_art_" + numero + "_" + i).value == "0"
        ) {
          alert(
            "Existen valores en la productividad académica que no son números o se digitó cero"
          );
          eval("form1.aut_art_" + numero + "_" + i).focus();
          return false;
        } else {
          if (
            parseInt(eval("form1.aut_art_" + numero + "_" + i).value) >= 1 &&
            parseInt(eval("form1.aut_art_" + numero + "_" + i).value) <= 3
          )
            suma_produccion[numero] =
              suma_produccion[numero] + puntos_produccion[numero];
          if (
            parseInt(eval("form1.aut_art_" + numero + "_" + i).value) >= 4 &&
            parseInt(eval("form1.aut_art_" + numero + "_" + i).value) <= 6
          )
            suma_produccion[numero] =
              suma_produccion[numero] + puntos_produccion[numero] / 2;
          if (parseInt(eval("form1.aut_art_" + numero + "_" + i).value) > 6)
            suma_produccion[numero] =
              suma_produccion[numero] +
              puntos_produccion[numero] /
                parseInt(eval("form1.aut_art_" + numero + "_" + i).value);
        }
      }
    }
  }

  for (i = 1; i <= 25; i++)
    suma_productividad =
      parseFloat(suma_productividad) +
      Math.round(suma_produccion[i] * 100) / 100;

  if (suma_productividad > maximo_productividad)
    suma_productividad = maximo_productividad;

  //TOTALES ***********************************
  form1.puntaje1.value = suma_titulos;
  form1.puntaje2.value = suma_categoria;
  form1.puntaje3.value = suma_experiencia;
  form1.puntaje4.value = Math.round(suma_productividad * 100) / 100;
  suma_total1 =
    suma_titulos + suma_categoria + suma_experiencia + suma_productividad / 2;
  suma_total2 =
    suma_titulos + suma_categoria + suma_experiencia + suma_productividad;
  form1.puntaje_total.value = suma_total2;
  if (suma_total1 != suma_total2)
    form1.valor_sueldo.value =
      "entre $" +
      formatAsMoney(Math.round(suma_total1 * valor_unitario)) +
      "  y  $" +
      formatAsMoney(Math.round(suma_total2 * valor_unitario));
  else
    form1.valor_sueldo.value =
      "aproximadamente de $" +
      formatAsMoney(Math.round(suma_total1 * valor_unitario));
}

function es_numero(numero) {
  var longit = numero.length;
  var cont_decimales = false;

  for (k = 0; k < longit; k++) {
    var car = numero.charAt(k);
    if (
      car != "1" &&
      car != "2" &&
      car != "3" &&
      car != "4" &&
      car != "5" &&
      car != "6" &&
      car != "7" &&
      car != "8" &&
      car != "9" &&
      car != "0"
    )
      if (cont_decimales == false && car == ".") cont_decimales = true;
      else return false;
  }
  if (longit > 0) return true;
  else return false;
}

function habilitacion(h, d) {
  eval("form1.ano_espec" + h).disabled = false;
  eval("form1.ano_espec" + d).disabled = true;
}

function mostrar(tabla,cuantos,numero)
{	
	//form1.MostrarTablas.value = "S"; 
	
	for (i=0;i<=numero;i++)
		eval(tabla+i).style.display="none";

	for (i=0;i<=cuantos;i++)
		eval(tabla+i).style.display="";
		
//	alert("MostrarTablas: "+form1.MostrarTablas.value);	
}

function ocultarTablas()
{
	var opciones = 30
//	alert("ocultarTablas");	
	form1.MostrarTablas.value = "N";
	
	if(form1.MostrarTablas.value != "S")
	{
		for (k=1; k<=25; k++)
		{
			ocultar("tabla_"+k+"_",opciones);
		}
	}
}

function ocultar(tabla,numero)
{		
//	alert("tabla: "+tabla);	
	for (i=0;i<=numero;i++)
	{
		eval(tabla+i).style.display="none";
	}
}
