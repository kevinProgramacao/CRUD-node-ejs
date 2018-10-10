	$(document).ready(function(){
		$("#pass").click(function(){
			var usuario = $("#usuario").val();
			if( usuario ===''){
				$("#u").addClass('warning');
				$("#alert").text("Informe seu e-mail!").show().delay(3000).fadeOut(1000);				
			}else {
				$.post("php/pedirSenha.php",$("#conectar").serialize(),
				function(data) {
					if(data != null){
						$("#alert").text(data).show().delay(3000).fadeOut(1000);
					}else{
						$("#alert").text("Erro").show().delay(3000).fadeOut(1000);
					}
				});
			}
		});

		$("#novo").click(function () {		
			window.location.href="cadastrar.php";
		});	

		$("#voltar").click(function () {		
			window.history.back();
		});	

		$("#voltar2").click(function () {		
			window.history.go(-2);
		});	

	$("#inicio").datepicker({
		dateFormat: 'dd/mm/yy',
		dayNames: [
			'Domingo','Segunda','Terça','Quarta','Quinta','Sexta','Sábado','Domingo'
		],
		dayNamesMin: [
			'D','S','T','Q','Q','S','S','D'
		],
		dayNamesShort: [
			'Dom','Seg','Ter','Qua','Qui','Sex','Sáb','Dom'
		],
		monthNames: [
			'Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro',
			'Outubro','Novembro','Dezembro'
		],
		monthNamesShort: [
			'Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set',
			'Out','Nov','Dez'
		],
		nextText: 'Próximo',
		prevText: 'Anterior'
	});
		
		$("#termino").datepicker({
			dateFormat: 'dd/mm/yy',					
			dayNames: [
				'Domingo','Segunda','Terça','Quarta','Quinta','Sexta','Sábado','Domingo'
			],
			dayNamesMin: [
				'D','S','T','Q','Q','S','S',''
			],
			dayNamesShort: [
				'Dom','Seg','Ter','Qua','Qui','Sex','Sáb','Dom'
			],
			monthNames: [
				'Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro',
				'Outubro','Novembro','Dezembro'
			],
			monthNamesShort: [
				'Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set',
				'Out','Nov','Dez'
			],
			nextText: 'Próximo',
			prevText: 'Anterior'
		});
	});

function editar(id,loc){ 
	window.location.href="editar.php?id=" + id + "&loc=" + loc;
}

function fotos(id,loc){ 
	window.location.href="fotos.php?id=" + id + "&loc=" + loc;
}

function crop (){
	$.post("/customers/crop", $("#recorte").serialize(),
	function(data) {
	  if(data!=='') {
		//$("#info").text(data).show();
		window.location.href="/customers";
	  } else{
		//window.location.href="index.php?id=" +id;
	  }
	});
}

function cropBanner(){
	$.post("crop.php", $("#recorte").serialize(),
	function(data) {
	  if(data!=='') {
		//$("#info").text(data).show();
		window.location.href="index.php";
	  } else{
		window.location.href="index.php";
	  }
	});
} 