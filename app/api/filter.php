<?php

include '../functions.php';

$response = filter(type: htmlspecialchars($_POST['type']));

echo json_encode(['pokemon' => $response]);