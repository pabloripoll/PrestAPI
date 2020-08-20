<?php
session_start();

// *** CHECK ERRORS *** //
$display_errors = true; // if remains TRUE some script may not function correctly
if($display_errors == true){
	ini_set('display_errors', 1);
	ini_set('display_startup_errors', 1);
	error_reporting(E_ALL);
} else {
  ini_set('display_errors', 0);
}

// Some connection to database if it's required...