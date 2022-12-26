<?php

include 'app/functions.php';

$pokemon = getPokemon(htmlspecialchars($_GET['pokemon']));

include 'views/pokemon/show.view.php';
