<?php

// */1 * * * *  cd ~/Web/Apuesta/php/ && php cron.php  > logs/`date +\%H:\%M`.log 2>&1

include "config.php";

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
$output = curl_exec($ch);
curl_close($ch);

// -----------------------------------------------
$response = json_decode($output); //object

if (!$response->ResponseError) {
    // ----------------
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
                $insert = "INSERT INTO board (`resultText`,`apiId`,`format`,`teamA`,`teamB`, `startsAt`,`endsAt`,`status`) 
                                    VALUES ('".$value->ResultText."'," . $value->Id . ", '" . $value->GameType . "', '" . $value->HomeTeam->Name . "','" . $value->AwayTeam->Name . "','" . $value->StartDateTime . "','" . $value->EndDateTime . "','upcoming')";
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
            $scoreA = "0-0(0)";
            $scoreB = "0-0(0)";
            if (($row['teamA'] == $toss) && $value->TossDecision == "Bat") {
                $scoreA = $value->Innings[0]->RunsScored . "-" . $value->Innings[0]->NumberOfWicketsFallen . "(" . $value->Innings[0]->OversBowled . ")";
                if (sizeof($value->Innings) > 1) {
                    $scoreB = $value->Innings[1]->RunsScored . "-" . $value->Innings[1]->NumberOfWicketsFallen . "(" . $value->Innings[1]->OversBowled . ")";
                }
            } else {
                if (sizeof($value->Innings) > 1) {
                    $scoreA = $value->Innings[1]->RunsScored . "-" . $value->Innings[1]->NumberOfWicketsFallen . "(" . $value->Innings[1]->OversBowled . ")";
                }
                $scoreB = $value->Innings[0]->RunsScored . "-" . $value->Innings[0]->NumberOfWicketsFallen . "(" . $value->Innings[0]->OversBowled . ")";
            }

            $values = " status='inProgress', isLive=1, resultText='" . $value->ResultText . "', tossDecision='" . $value->TossDecision . "' ,toss='" . $toss . "', scoreA='" . $scoreA . "', scoreB='" . $scoreB . "' ";
            $update = "UPDATE board SET " . $values . " WHERE apiId=" . $value->Id;
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
            if (strpos($value->TossResult, $row['teamA']) !== false) {
                $toss = $row['teamA'];
            }
            if (strpos($value->TossResult, $row['teamB']) !== false) {
                $toss = $row['teamB'];
            }
            $values = " status='completed', resultText='" . $value->ResultText . "', tossDecision='" . $value->TossDecision . "', toss='" . $toss . "' ,isLive=0, winner='" . $winner . "', scoreA='" . $scoreA . "', scoreB='" . $scoreB . "' ";
            $update = "UPDATE board SET " . $values . " WHERE apiId=" . $value->Id;
            $conn->query($update);

            // 
            // updated bets results and update transactions and users wallet
            // 

        }
    }


    $conn->close();
    // ---------------- 

}
