<?php
$config = [
	'db' => [
		'host' => 'localhost',
		'user' => 'root',
		'password' => '',
		'name' => 'bonex'
	],
	'actions' => ['register', 'subscribe'],
];


function dbo_init($host, $user, $password, $dbname)
{
	$connection = null;
	$dsn = sprintf('mysql:dbname=%s;host=%s', $dbname, $host);
	try {
		$connection = new PDO($dsn, $user, $password);
	} catch (PDOException $e) {
		return jsonResponse([], 'DB_CONNECT_FAIL', 'Internal server error');
	}
	return $connection;
}

function jsonResponse($data = [], $status = 'OK', $message = 'Ok')
{
	die(json_encode([
		'status' => $status,
		'message' => $message,
		'data'	=> $data,	
	]));
}

function cleanup($string)
{
	return trim(filter_var($string, FILTER_SANITIZE_STRING));
}

$connection = null;//dbo_init($config['db']['host'], $config['db']['user'], $config['db']['password'], $config['db']['name']);

function doRegister()
{
	global $connection;
	
	$data = [
		'name' => cleanup($_POST['name']),
		'email' => cleanup($_POST['email']),
		'company' => cleanup($_POST['company']),
		'activity' => cleanup($_POST['activity']),
		'agreement' => (bool)$_POST['agreement'],
	];
	$errors = [
		'empty' => [],
		'invalid' => [],
	];
	foreach($data as $field => $value) {
		if (empty($value)) {
			$errors['empty'][] = $field;
		}
	}
	if (!empty($data['email']) && ($data['email'] !== filter_var($data['email'], FILTER_VALIDATE_EMAIL))) {
		$errors['invalid'] = ['email'];
	}
	if (count($errors['empty']) || count($errors['invalid'])) {
		jsonResponse(['errors' => $errors], 'VALIDATION_FAILED', 'Data validation errors');
	}
	$sql = "INSERT INTO `registrations` (`name`, `email`, `company`, `activity`, `registered`) values (%s, %s, %s, %s, %s)";
	$sql = sprintf($sql, 
		$connection->quote($data['name']),
		$connection->quote($data['email']),
		$connection->quote($data['company']),
		$connection->quote($data['activity']),
		time()
	);
	try {
		$connection->execute($sql);
	} catch (PDOEcxeption $e) {
		jsonResponse([], 'DB_FAILED', 'Internal server error');
	}
	
	return jsonResponse();
}

$action = trim($_GET['action']);
if (!in_array($action, $config['actions'])) {
	jsonResponse([], 'INVALID_USAGE', 'Unsupported action type');
}

switch($action) {
	case 'register':
		doRegister();
	break;
	case 'subscribe':
	break;
}
