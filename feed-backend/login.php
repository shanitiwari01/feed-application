<?php

# database configuration
include('config.php');

# get all param
$input  =   file_get_contents('php://input');
$obj    =   json_decode($input);

# validate data st or not
if(isset($obj->username) && isset($obj->password)) {


    # clean input
    $userName   =   trim($obj->username);
    $password   =   md5(trim($obj->password));

    # check user query
    $query  =   "SELECT * FROM users WHERE username = '$userName' AND password = '$password' AND status = 1 limit 1";

    # run query
    if(!$result = mysqli_query($conn,$query)) {
        echo json_encode(['error' => 1, 'msg' => mysqli_error($conn)]);
        exit;
    }
    else {

        if(mysqli_num_rows($result) > 0) {

            # fetch details and return
            $data  = mysqli_fetch_array($result, MYSQLI_ASSOC);

            echo json_encode(['error' => 0, 'data' => $data]);
            exit;
        }
        else {
            echo json_encode(['error' => 2, 'msg' => 'Invalid username or password']);
            exit;
        }
    }

}