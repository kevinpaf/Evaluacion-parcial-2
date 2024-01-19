<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Allow: GET, POST, OPTIONS, PUT, DELETE");
$method = $_SERVER["REQUEST_METHOD"];
if ($method == "OPTIONS") {
    die();
}


require_once('../Models/Compras.model.php');
$compras = new Clase_Compras;
switch ($_GET["op"]) {
    case 'todos':
        $datos = array(); //defino un arreglo
        $datos = $compras->todos(); //llamo al modelo de usuarios e invoco al procedimiento todos y almaceno en una variable
        while ($fila = mysqli_fetch_assoc($datos)) { //recorro el arreglo de datos
            $todos[] = $fila;
        }
        echo json_encode($todos); //devuelvo el arreglo en formato json
        break;
    case "uno":
        $ID_compra = $_POST["ID_compra"]; //defino una variable para almacenar el id del usuario, la variable se obtiene mediante POST
        $datos = array(); //defino un arreglo
        $datos = $compras->uno($ID_compra); //llamo al modelo de usuarios e invoco al procedimiento uno y almaceno en una variable
        $uno = mysqli_fetch_assoc($datos); //recorro el arreglo de datos
        echo json_encode($uno); //devuelvo el arreglo en formato json
        break;
    case 'insertar':
        $ID_cliente = $_POST["ID_cliente"];
        $ID_producto = $_POST["ID_producto"];
        $Cantidad = $_POST["Cantidad"];
        $Total = $_POST["Total"];

        $datos = array(); //defino un arreglo
        $datos = $compras->insertar($ID_cliente, $ID_producto, $Cantidad, $Total); //llamo al modelo de usuarios e invoco al procedimiento insertar
        echo json_encode($datos); //devuelvo el arreglo en formato json
        break;
    case 'actualizar':
        $ID_compra = $_POST["ID_compra"];
        $ID_cliente = $_POST["ID_cliente"];
        $ID_producto = $_POST["ID_producto"];
        $Cantidad = $_POST["Cantidad"];
        $Total = $_POST["Total"];
        $datos = array(); //defino un arreglo
        $datos = $compras->actualizar($ID_compra, $ID_cliente, $ID_producto, $Cantidad, $Total); //llamo al modelo de usuarios e invoco al procedimiento actual
        echo json_encode($datos); //devuelvo el arreglo en formato json
        break;

    case 'eliminar':
        $ID_compra = $_POST["ID_compra"]; //defino una variable para almacenar el id del usuario, la variable se obtiene mediante POST
        $datos = array(); //defino un arreglo
        $datos = $compras->eliminar($ID_compra); //llamo al modelo de usuarios e invoco al procedimiento uno y almaceno en una variable
        echo json_encode($datos); //devuelvo el arreglo en formato json
        break;
}
