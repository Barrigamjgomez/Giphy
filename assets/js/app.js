$(document).ready(function(){
	var dibujarGifs = function(data){ //hace recorrido a la data, pide que nos imprima el las imagenes que corresponde a la palabra 
		var gif = "";                    //ingresada en el impu del html, ademas que añada un enlace a la pagina web donde se encuenra la imagen
		var url = "";
		data.forEach(function(element){
			gif = element.images.downsized_large.url;
			url = element.bitly_gif_url;
			$("#elementos").append(armarTemplate(gif , url));
		});
	}


//aca solo armaremos la estructura que se mostrará en el hm, con los datos que hemos 
//soliciado anteriormente
 var armarTemplate = function(gif,url){
	 	var t = "<div class='elemento'><img src='" + gif + "'/><a href='" + url +"'>ver más</a></div>"
	 	return t;
	}
 //en nuestro siguiente codigo, haremos el llamado a ajax en url:pondremos la direccion de nuestra 
 //pagina donde buscaremos las imagenes, el type: es GET (obtenes datos), datatype: es el tipo
 //de datos que se espera como respuesta, data: es la informacion que me tiene que enviar
 	var ajaxGif = function(gif){
	 	$.ajax({
	 		url: 'http://api.giphy.com/v1/gifs/search',
	 		type: 'GET',
	 		datatype: 'json',
	 		data : {
	 			q : gif,
	 			api_key : 'dc6zaTOxFJmzC'
	 		}
	 	})
	 	.done(function(response){
	 		console.log(response);
	 		dibujarGifs(response.data);
	 	})
	 	.fail(function(){
	 		console.log("error");
	 	});
  }

 //para finalizar al hacer clic sobre el botón, se mostrará un mensaje en la consola, se limpiara
 //el contenedor donde se pondrán las imagenes (en caso de que esté ocuṕado), guardará el valor 
 //obtenido en el input en una variable y ese valor será pasando a la función que hará el llamado Ajax.
	$("#buscar-gif").click(function(event){
		console.log("Entro");
		$("#elementos").empty();
		var gif = $("#gif-text").val();
		ajaxGif(gif);
	});
});