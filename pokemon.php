<?php

include 'app/functions.php';

$pokemon = getPokemon(htmlspecialchars($_GET['pokemon']));

function showSprite(array|string $sprite){
    if(is_string($sprite)){
        echo '<div class="col">';
        echo "<img src='$sprite' class='img' width='150' />";
        echo '</div>';
    }
    else{
        foreach ($sprite as $i){
            if(is_null($i)) break;
            showSprite($i);
        }
    }
}

include 'views/pokemon/show.view.php';
