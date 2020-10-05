<?php

#$request='http://194.44.112.6/cgi-bin/timetable_export.cgi?req_type=free_rooms_list&req_mode=group&block_name=1&begin_date=31.03.2020&lesson=3&req_format=json&coding_mode=UTF8&bs=ok';


#add checking and validation
$block = $_GET['block_name'];
$date = $_GET['begin_date'];
$lesson = $_GET['lesson'];

$request="http://194.44.112.6/cgi-bin/timetable_export.cgi?req_type=free_rooms_list&req_mode=group&block_name=$block&begin_date=
$date&lesson=$lesson&req_format=json&coding_mode=UTF8&bs=ok";

 if( $curl = curl_init() ) {
      curl_setopt($curl, CURLOPT_URL, $request);
      curl_setopt($curl, CURLOPT_RETURNTRANSFER,true);
      curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);
      $out = curl_exec($curl);
      echo $out;
      curl_close($curl);
}

?>