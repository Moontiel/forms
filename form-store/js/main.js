// -------------- START CODE - SHOW BOX ERRORS ------------- //
/* 
    $inputs: almacena todos los elementos html con tag-input
*/
let $inputs = document.querySelectorAll('input');

/* 
    $err_name: almacena el elementos html con ID error_name
    $#error_email: almacena el elementos html con ID #error_email
    $error_post: almacena el elementos html con ID error_post
*/
let $err_name = document.querySelector('#error_name'),
	$err_email = document.querySelector('#error_email'),
	$err_post = document.querySelector('#error_post');

/*
	almacenamos expresiones regulares en avriables que luego implementaremos
	para validar cada input
*/
let exp_name = /^[a-zA-Z\s]{4,16}$/,
	exp_email = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]{2,3}$/,
	exp_post = /^[a-zA-Z0-9_.+-À-ÿ\s]{10,100}$/;

/* 
    hacemos un recorrido forEach en la variable $inputs
*/
$inputs.forEach((input) => {
	/* 
        generamos un evento keyup en el parametro input definido en el 
		forEach y declaramos una funcion a la que pasamos un EVENT (e) 
		como parametro
    */
	input.addEventListener('keyup', function (e) {
		/* 
            targetValue: almacena los datos ingresados por el usuario en los 
            diferentes inputs
        */
		let targetValue = e.target.value;

		/* 
            targetName: almacena a travez del atributo name="" el input seleccioando 
			por el usuario
        */
		let targetName = e.target.name;

		/* 
            switch: recibe como parametro la variable targetName
        */
		switch (targetName) {
			/* 
				case: este recibe como valor el mismo valor definido en el atributo
				name="" de los inputs
			*/
			case 'name':
				{
					/* 
						definimos un condicional al cual pasamos el metodo .test() que	
					    recibe la variable targetValue y los compara con las EXPRESIONES REGULARES, 
						
				
						si el valor ingresado por el usuario no cumple la condicion de las
						expresiones regulares añade a $err_name la clase js_show_error
						definida en la hoja de estilos

						de lo contrario la remueve
					*/
					!exp_name.test(targetValue)
						? $err_name.classList.add('js_show_error')
						: $err_name.classList.remove('js_show_error');
				}
				break;

			case 'email':
				{
					!exp_email.test(targetValue)
						? $err_email.classList.add('js_show_error')
						: $err_email.classList.remove('js_show_error');
				}
				break;

			case 'post':
				{
					!exp_post.test(targetValue)
						? $err_post.classList.add('js_show_error')
						: $err_post.classList.remove('js_show_error');
				}
				break;
		}
	});
});

// --------------------- END CODE -------------------- //

// ---------- START CODE - SEND DATA DATABASE -------------- //
/*  
    apiUrl: almacena la url de nuestra api creada en nodejs con
	mongo db
*/
let apiUrl = 'http://localhost:3000/api/message';

/*  
    $form: almacena el elemento html con id #form
*/
let $form = document.querySelector('#form');

/* 
    generamos un evento submit para $form y declaramos una funcion
    a la que pasamos un EVENT (e) como parametro
*/
$form.addEventListener('submit', function (e) {
	/* 
        prevenimos el comportamiento del BUTTON tipo SUBMIT
    */
	e.preventDefault();

	/*
        fieldsForm: definimos un OBJETO y pasamos como clave el nombre de los campos 
        declarados en FORM y la API, estas almacenaran la informacion ingresada 
        en cada INPUT, a travez de E.TARGET + el ATRIBUTO NAME de cada input + VALUE
    */
	let fieldsForm = {
		name: e.target.name.value,
		email: e.target.email.value,
		post: e.target.post.value,
	};

	/* 
        fecth: recibe como parametro la variable apiUrl, luego definimos un OBJETO 
		y pasamos el METHOD, un HEADERS y en BODY utilizamos JSON.STRINGFY para 
		convertir los datos y como parametro pasamos el OBJETO fieldsForm.
    */
	fetch(apiUrl, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(fieldsForm),
	})
		/*  
		fecth retorna una promesa por ende hacemos uso de .THEN y .CATCH
		para mostrar alertas al usuario dependiedo del estado del formulario
	*/
		.then((res) => {
			/* 
			si el status de la respuesta es 400 mostrara una alerta de error
			de la libreria swit-alert
		*/
			if (res.status === 400) {
				Swal.fire({
					icon: 'error',
					title: 'verifica que los campos sean correctos',
					position: 'center',
					showConfirmButton: false,
					padding: '0 0 3em',
					timer: 3000,
				});
			}

			/* 
			si el status de la respuesta es 200 mostrara una alerta de exito
			de la libreria swit-alert
		*/
			if (res.status === 200) {
				Swal.fire({
					icon: 'success',
					title: 'el mensaje fue enviado correctamente',
					position: 'center',
					showConfirmButton: false,
					padding: '0 0 3em',
					timer: 3000,
				});

				/* 
				finalmente formatiamos los campos del fomulario y los errores
				con la propiedad .reset()
			*/
				$form.reset();
			}
		})
		.catch((err) =>
			/* 
				de lo contrario si hay un error en cuanto a la conexion con la api
				marcara un error
			*/
			console.log('mil errores', err)
		);
});

// --------------------- END CODE -------------------- //
