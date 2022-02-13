<?php
// create curl resource
$ch = curl_init();

$url = "https://apiv2.cricket.com.au/web/views/fixtures?CompletedFixturesCount=12&InProgressFixturesCount=12&UpcomingFixturesCount=12";

// set url
curl_setopt($ch, CURLOPT_URL, $url);

//return the transfer as a string
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);

// $output contains the output string
$output = curl_exec($ch);

// close curl resource to free up system resources
curl_close($ch);

// -----------------------------------------------


// $response = json_decode($output,true); //array
$response = json_decode($output); //object

if (!$response->ResponseError) {
    // ----------------
    $servername = "localhost";
    $username = "root";
    $password = "qwerty@123";
    $dbname = "Apuesta";

    $conn = new mysqli($servername, $username, $password, $dbname);

    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }


    foreach ($response->UpcomingFixtures as $key => $value) {
        $sql = "SELECT id FROM board WHERE apiId=" . $value->Id . "";
        $result = $conn->query($sql);
        if ($result->num_rows) {
            $values = "";
            $update = "UPDATE board SET " . $values . " WHERE id=" + $value->id;
            $conn->query($update);
        } else {
            $insert = "INSERT INTO board (`apiId`, `type`, `format`, ) 
                                    VALUES (".$value->Id.", 'toss', 'john@example.com')";
            $conn->query($insert);
        }
    }


    $conn->close();
    // ---------------- 

}
// var_dump(sizeof($response->UpcomingFixtures));
