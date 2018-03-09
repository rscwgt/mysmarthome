#!/usr/bin/env php
<?php

// Heizthermostat
$hzdevice=10;
// Fensterkontakt
$fkdevice=3;

$hg = new \Homegear\Homegear();
$hg->setValue($hzdevice, 1, "WINDOW_OPEN_TEMPERATURE", 12.0);
$hg->setValue($hzdevice, 1, "ECO_TEMPERATURE", 17.0);
$hg->setValue($hzdevice, 1, "COMFORT_TEMPERATURE", 19.0);
$hg->setValue($hzdevice, 1, "MAX_TEMPERATURE", 22.0);
// auto
$hg->setValue($hzdevice, 1, "CONTROL_MODE", 0);
// Offset 0K
$hg->setValue($hzdevice, 1, "TEMPERATURE_OFFSET", 7);
// 5 min
$hg->setValue($hzdevice, 1, "BOOST_TIME_PERIOD", 1);


//Linken von Geraeten LEQ0432397, NEQ0025277, 
$hg->addLink($fkdevice, 1, $hzdevice, 4, "Kue-Fensterkontakt-Heizthermostat", "Kueche: Fensterkontakt zu Heizthermostat");

// Montag 12h
$hg->setValue($hzdevice, 1, "DECALCIFICATION_WEEKDAY", 2); 
$hg->setValue($hzdevice, 1, "DECALCIFICATION_TIME", 720);

?>
