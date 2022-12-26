<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>PokeApi</title>

    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" rel="stylesheet"
          integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65" crossorigin="anonymous">
    <link rel="stylesheet" href="../public/css/style.css">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=VT323"/>
</head>

<body>
<section class="hero m-5">
    <div class="d-flex justify-content-center">
        <img src="../public/images/pokeapi.svg" class="mw-25 logo" alt="pokeApi" loading="lazy">
    </div>
</section>
<section class="container mb-5">
    <div class="row">
        <div class="col">
            <div class="card">
                <div class="card-body">
                    <div class="row">
                        <div class="col-12 col-lg-4">
                            <img src="<?php echo $pokemon['sprites']['front_default'] ?? '' ?>"/>
                        </div>
                        <div class="col-12 col-lg-8 text-center text-lg-end">
                            <h1><?php echo ucwords($pokemon['name']) ?? 'Unknown' ?></h1>
                            <span class="d-block">ID: <?php echo $pokemon['id'] ?></span>
                            <span class="d-block">Height: <?php echo $pokemon['height'] ?></span>
                            <span class="d-block">Weight: <?php echo $pokemon['weight'] ?></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
<section class="container mb-5">
    <div class="row">
        <div class="col">
            <div class="card">
                <div class="card-body">
                    <div class="row">
                        <?php
                        $sprites = [];
                        array_walk_recursive($pokemon['sprites'], function ($value) use (&$sprites) {
                            if (!is_null($value)) {
                                $sprites[] = $value;
                            }
                        });
                        foreach ($sprites as $sprite): ?>
                            <div class="col">
                                <img src='<?= $sprite ?>' class='img' width='150'/>
                            </div>
                        <?php endforeach; ?>
                    </div>
                </div>
            </div>
        </div>
    </div>

</section>

<section class="container">
    <div class="row">
        <div class="col">
            <div class="card">
                <div class="card-body">
                    <div>
                        <?php dd($pokemon['sprites']) ?>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-kenU1KFdBIe4zVF0s0G1M5b4hcpxyD9F7jL+jjXkk+Q2h455rYXK/7HAuoJl+0I4" crossorigin="anonymous"></script>
<script src="../public/js/component.js"></script>
<script src="../public/js/functions.js"></script>
</body>
</html>
