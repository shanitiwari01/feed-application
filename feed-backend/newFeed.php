<?php

# database configuration
include('config.php');

# get all param
$text = $_POST["text"];
$user_id = $_POST["user_id"];

if(!empty($text)){

    # upload image
    $imageFilePath = null;
    if(isset($_POST["image"])){
        $image_base64 = base64_decode($_POST['image']);
        $file =  UPLOAD_DIR . uniqid() . '.png';
        file_put_contents($file, $image_base64);
        $imageFilePath = "/".$file;
    }

    # upload video
    $videoFilePath = null;
    if(isset($_FILES['videoFile']['name']) && $_FILES['videoFile']['name'] != ''){
        $target_file = UPLOAD_DIR . uniqid() . $_FILES["videoFile"]["name"];
        $extension = strtolower(pathinfo($target_file,PATHINFO_EXTENSION));
        move_uploaded_file($_FILES['videoFile']['tmp_name'],$target_file);
        $videoFilePath = "/".$target_file;
    }

    # feed type
    if(is_null($videoFilePath)){
        $type = "photo";
    }else{
        $type = "video";
    }

    

    # insert feed
    $query = "INSERT INTO `feeds` (`id`, `user_id`, `text`, `image`, `video`, `type`) VALUES (NULL, '$user_id', '$text', '$imageFilePath', '$videoFilePath', '$type')";

    if(!$result = mysqli_query($conn,$query)) {
        echo json_encode(['error' => 1, 'msg' => mysqli_error($conn)]);
        exit;
    }
    else {
        echo json_encode(['error' => 0, 'msg' => 'Feed uploaded successflly']);
        exit;
    }

}else{
    echo json_encode(['error' => 2, 'msg' => 'Invalid Feed']);
    exit;
}



