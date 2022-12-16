<?php

include 'app/functions.php';

$response = loadNewSet(options: ['offset' => htmlspecialchars($_POST['offset'])]);

echo json_encode(['data' => $response]);