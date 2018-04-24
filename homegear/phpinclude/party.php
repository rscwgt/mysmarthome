<?php

$hg = new Homegear\Homegear();

$hg->log(2, "test");

function setPartyValues($peerId, $year, $month, $day, $hour, $minute, $temperature) {
  $hg = new Homegear\Homegear();
  $hg->log(2, "setPartyValues: peerId, year, month, day, hour, minute, temperature " .
    "[" . $peerId . ", " . $year . ", " . $month . ", " . $day . ", " . $hour . ", " . $minute . ", " . $temperature . "]");
  $res = $hg->setValue($peerId, 1, "PARTY_STOP_YEAR", $year);
  $hg->log(2, "Result: set party year " . $res);
  $res = $hg->setValue($peerId, 1, "PARTY_STOP_MONTH", $month);
  $hg->log(2, "Result: set party month " . res);
  $hg->setValue($peerId, 1, "PARTY_STOP_DAY", $day);
  $hg->log(2, "Result: set party day " . $res);
  $time = $hour * 60 + $minute;
  $res = $hg->setValue($peerId, 1, "PARTY_STOP_TIME", $time);
  $hg->log(2, "Result: set party time " . $res);
  $res = $hg->setValue($peerId, 1, "PARTY_TEMPERATURE", $temperature);
  $hg->log(2, "Result: set party time " . $res);
}

function activatePartyMode($peerId) {
  $hg = new Homegear\Homegear();
  $hg->log(2, "activatePartyMode: peerId " . $peerId);
  $res = $hg->setValue($peerId, 1, "CONTROL_MODE", 2);
  $hg->log(2, "Result: set party mode " . $res);
}


?>

