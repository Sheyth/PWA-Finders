//importamos el achivo de funciones y accedemos al objeto de la bd y funciones
import contactbd, {guardar} from './funciones.js';

/*Al cargar por primera vez el sitio debemos crear la bd,
empleamos la función de tindabd para crear la base de datos tienda
y la tabla de productos, para crear la tabla debemos indicar los atributos
++id indica que el id es auto incremental*/
let bd=contactbd("", {cliente:`++id,nombre, email, telefono, mensaje`});


/*Genermaos un objeto para cada elemento del formulario que
manipularemos, campos de formulario, botones, tabla, etc 
Campos del formulario. 
Nota: recuerda que el nombre que esta entre paretesis es el nombre de
los id de la etiqueta html*/

//Objetos para acceder a lso input del formulario
const clave_cliente = document.getElementById("clave");
const nombre_cliente = document.getElementById("nombre");
const email_cliente = document.getElementById("email");
const telefono_cliente = document.getElementById("telefono");
const mensaje_cliente = document.getElementById("mensaje");

/*Objeto para acceder a etiqueta que nos mostrará un mesaje en la 
tabla cuando no tengamos productos para mostrar*/
const mesajeSinRegistros = document.getElementById("siRegistros");
//Objetos para acceder a los botones del formulario
const btGuardar=document.getElementById("guardar");



//Evento que se ejecuta al abrir la página
window.onload=() =>{
/*Ejecutamos la función de cargar tabla para que se muestren los productos
que actualmente estan en la BD*/
cargarTabla();
}



/*Evento click para guardar, se activa al presionar el 
boton guardar del formulario*/
btGuardar.onclick=(evento)=>{
    /*Ejecutamos la función guardar de el archivo de funciones
    indicamos que gaurdaremos un producto y que los datos a enviar
    son el nombre, precio e imagen (el id no por que es autoincremental)
    asignamos a cada campo el valor recuperado del formulario
    Nota: Recordar que flag retorna true si se gaurdo el registro y flase si no*/
     let flag =guardar(bd.cliente, {
     nombre:nombre_cliente.value,
     email:email_cliente.value,
     telefono:telefono_cliente.value,
     mensaje:mensaje_cliente.value
 });
 
 if(flag){//Si se guardo limpiamo el formulario
   nombre_cliente.value="";
   email_cliente.value=""
   telefono_cliente.value="";
   mensaje_cliente.value=""

  //recargamos la tabla para visualizar el nuevo registro
   cargarTabla();
   
}
}

/*Evento click para ejecutar la modificación de datos, 
se activa al presionar el boton modificar del formulario*/
btModificar.onclick=(evento)=>{
    //Recuperamos la clave del producto que se muestra en el input del formulario
    const id=parseInt(clave_cliente.value||0);
    //Si existe un id
    if(id){
        /*Ejecutamos la modificación, update requiere la clave del producto
        y los valores a modificar tomando los valores del formulario*/
        bd.productos.update(id,{
            nombre:nombre_cliente.value,
            email:email_cliente.value,
            telefono:telefono_cliente.value,
            mensaje:mensaje_cliente.value
        }).then((resultado)=>{//si se realiza la modificación
            if(resultado){
                //Limpiamos el formulario y recargamos la tabla
               console.log("Modificación realizada");
                nombre_cliente.value="";
                email_cliente.value=""
                telefono_cliente.value="";
                mensaje_cliente.value="";
                cargarTabla();
                
            }else{
                console.log("No se aplicaron los cambios");
        
            }
            
        })
    }
}




