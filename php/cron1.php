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
        if ($result->num_rows == 0) {
            if (($value->GameType == "T20 International" || $value->GameType == "ODI" || $value->GameType == "Test") &&  !$value->IsWomensMatch) {
                if ($value->GameType == "T20 International") {
                    $value->GameType = "T20";
                }
                $value->StartDateTime = date("Y-m-d H:i:s", strtotime($value->StartDateTime));
                $value->EndDateTime = date("Y-m-d H:i:s", strtotime($value->EndDateTime));
                $value->HomeTeam->Name = str_replace(" Men", "", $value->HomeTeam->Name);
                $value->AwayTeam->Name = str_replace(" Men", "", $value->AwayTeam->Name);
                $insert = "INSERT INTO board (`apiId`,`format`,`teamA`,`teamB`, `startsAt`,`endsAt`,`status`) 
                                    VALUES (" . $value->Id . ", '" . $value->GameType . "', '" . $value->HomeTeam->Name . "','" . $value->AwayTeam->Name . "','" . $value->StartDateTime . "','" . $value->EndDateTime . "','upcoming')";
                $conn->query($insert);
            }
        }
    }

    foreach ($response->InProgressFixtures as $key => $value) {

        $sql = "SELECT * FROM board WHERE apiId=" . $value->Id . "";
        $result = $conn->query($sql);
        if ($result->num_rows == 1) {
            $row = mysqli_fetch_assoc($result);
            if (strpos($value->TossResult, $row['teamA']) !== false) {
                $toss = $row['teamA'];
            }
            if (strpos($value->TossResult, $row['teamB']) !== false) {
                $toss = $row['teamB'];
            }
            if (($row['teamA'] == $toss) && $value->TossDecision == "Bat") {
                $scoreA = $value->Innings[0]->RunsScored . "-" . $value->Innings[0]->NumberOfWicketsFallen . "(" . $value->Innings[0]->OversBowled . ")";
                $scoreB = $value->Innings[1]->RunsScored . "-" . $value->Innings[1]->NumberOfWicketsFallen . "(" . $value->Innings[1]->OversBowled . ")";
            } else {
                $scoreA = $value->Innings[1]->RunsScored . "-" . $value->Innings[1]->NumberOfWicketsFallen . "(" . $value->Innings[1]->OversBowled . ")";
                $scoreB = $value->Innings[0]->RunsScored . "-" . $value->Innings[0]->NumberOfWicketsFallen . "(" . $value->Innings[0]->OversBowled . ")";
            }

            $values = " status='inProgress', isLive=1, tossDecision='" . $value->TossDecision . "' ,toss='" . $toss . "', scoreA='" . $scoreA . "', scoreB='" . $scoreB . "' ";
            $update = "UPDATE board SET " . $values . " WHERE id=" + $value->id;
            $conn->query($update);
        }
    }

    foreach ($response->CompletedFixtures as $key => $value) {
        $sql = "SELECT * FROM board WHERE apiId=" . $value->Id . "";
        $result = $conn->query($sql);
        if ($result->num_rows == 1) {
            $row = mysqli_fetch_assoc($result);
            if (strpos($value->ResultText, $row['teamA']) !== false) {
                $winner = $row['teamA'];
            }
            if (strpos($value->ResultText, $row['teamB']) !== false) {
                $winner = $row['teamB'];
            }
            if (($row['teamA'] == $row['toss']) && $value->TossDecision == "Bat") {
                $scoreA = $value->Innings[0]->RunsScored . "-" . $value->Innings[0]->NumberOfWicketsFallen . "(" . $value->Innings[0]->OversBowled . ")";
                $scoreB = $value->Innings[1]->RunsScored . "-" . $value->Innings[1]->NumberOfWicketsFallen . "(" . $value->Innings[1]->OversBowled . ")";
            } else {
                $scoreA = $value->Innings[1]->RunsScored . "-" . $value->Innings[1]->NumberOfWicketsFallen . "(" . $value->Innings[1]->OversBowled . ")";
                $scoreB = $value->Innings[0]->RunsScored . "-" . $value->Innings[0]->NumberOfWicketsFallen . "(" . $value->Innings[0]->OversBowled . ")";
            }

            $values = " status='completed', isLive=0, winner='" . $winner . "', scoreA='" . $scoreA . "', scoreB='" . $scoreB . "' ";
            $update = "UPDATE board SET " . $values . " WHERE id=" + $value->id;
            $conn->query($update);

            // 
            // updated bets results and update transactions and users wallet
            // 

        }
    }


    $conn->close();
    // ---------------- 

}
// var_dump(sizeof($response->UpcomingFixtures));
