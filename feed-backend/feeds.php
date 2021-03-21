<?php

# database configuration
include('config.php');

# get all feeds query
$query  =   "SELECT feeds.id, feeds.text, feeds.image, feeds.video, feeds.type, users.first_name, users.last_name, users.image as user_image, feeds.status FROM feeds LEFT JOIN users on feeds.user_id = users.id WHERE feeds.status = 1 ORDER BY feeds.id desc";

if(!$result = mysqli_query($conn,$query)) {
    echo json_encode(['error' => 1, 'msg' => mysqli_error($conn)]);
    exit;
}
else {

    if(mysqli_num_rows($result) > 0) {

        # fetch all feeds and send in response
        $feeds   =   [];
       
        while($row = mysqli_fetch_array($result, MYSQLI_ASSOC)) {
            $feeds[]     =   $row;
        }

        echo json_encode(['error' => 0, 'data' => $feeds]);
        exit;
    }
    else {
        echo json_encode(['error' => 2, 'msg' => 'Feeds not found']);
        exit;
    }
}
