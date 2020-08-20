<?php
require 'setup/config.php';

header("Content-type: application/javascript");

function is_ajax() {
  return isset($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest';
}

if ( is_ajax() )  {  
  if (isset($_POST["action"]) && !empty($_POST["action"])) {
    $action = $_POST["action"];
    switch($action) {
      case "randomItems": randomItems(); break;
      case "randomItem": randomItem(); break;

      default: no_action();
    }
  }
}

// *** UPDATE POSITIONS *** //
function randomItem(){
  $ajax = $_POST;
  $json_response = array($ajax);
  $itemId = $_POST['id'];

  //

  //
	$json_response["process"] = 1;
	$json_response["status"] = true;
	$json_response["data"]["msg"] = '';
	//	
	$json["json"] = json_encode($json_response);
	echo json_encode($json);
}