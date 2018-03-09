#!/usr/bin/env php
<?php
//Wochenprogramm fuer LEQ1115280


// Wandthermostat
$wtdevice=5;

// Fensterkontakt Strasse
$fksdevice=4;
// Heizthermostat innen
$hidevice=6;
// Heizthermostat Terrasse
$htdevice=7;


$hg = new \Homegear\Homegear();
echo "Set WINDOW_OPEN_TEMPERATURE\n" ;
$res=$hg->setValue($wtdevice, 1, "WINDOW_OPEN_TEMPERATURE", 12.0);
echo "Result=" . $res . "\n";

echo "Set ECO_TEMPERATURE\n";
$res=$hg->setValue($wtdevice, 1, "ECO_TEMPERATURE", 17.0);
echo "Result=" . $res . "\n";
$res=$hg->setValue($wtdevice, 1, "COMFORT_TEMPERATURE", 19.0);
echo "Result=" . $res . "\n";
$res=$hg->setValue($wtdevice, 1, "MAX_TEMPERATURE", 22.0);
echo "Result=" . $res . "\n";
$res=$hg->setValue($wtdevice, 1, "CONTROL_MODE", 0);
echo "Result=" . $res . "\n";
$res=$hg->setValue($wtdevice, 1, "TEMPERATURE_OFFSET", 5);
echo "Result=" . $res . "\n";
$res=$hg->setValue($wtdevice, 1, "BOOST_TIME_PERIOD", 1);
echo "Result=" . $res . "\n";
$hg->setValue($wtdevice, 1, "SHOW_SET_TEMPERATURE", 0);

$hg->setValue($hidevice, 1, "DECALCIFICATION_WEEKDAY", 2); 
$hg->setValue($hidevice, 1, "DECALCIFICATION_TIME", 720);
$hg->setValue($htdevice, 1, "DECALCIFICATION_WEEKDAY", 2); 
$hg->setValue($htdevice, 1, "DECALCIFICATION_TIME", 720);

$hg->addLink($fksdevice, 3, $wtdevice, 4, "Wz-FensterkontaktStrasse-Wandthermostat", "Fensterkontakt Strasse zu Wandthermostat");
$hg->addLink($fksdevice, 1, $hidevice, 3, "Wz-FensterkontaktStrasse-HeizthermostatInnen", "Wz: Wandthermostat zu Heizthermostat Innen");
$hg->addLink($fksdevice, 1, $htdevice, 3, "Wz-FensterkontaktStrasse-HeizthermostatTerrasse", "Wz: Fensterkontakt Strasse zu Heizthermostat Terrasse");
$hg->addLink($wtdevice, 1, $hidevice, 3, "Wz-Wandthermostat-HeizthermostatInnen-", "Wz: Wandthermostat zu Heizthermostat Innen");
$hg->addLink($wtdevice, 1, $htdevice, 3, "Wz-Wandthermostat-HeizthermostatTerrasse", "Wz: Wandthermostat zu Heizthermostat Terrasse");

?>