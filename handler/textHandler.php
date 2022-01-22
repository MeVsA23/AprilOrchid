<?php
header("Access-Control-Allow-Origin: *"); //解决跨域
header('Access-Control-Allow-Methods:post'); // 响应类型
date_default_timezone_set('Asia/Shanghai'); //获取当前时间
include 'connection.php';
if(isset($_POST['text'])){

    $var_text = mysqli_real_escape_string($con, $_POST['text']);



    date_default_timezone_set('Asia/Shanghai');
    $date = date('Y/m/d H:i:s', time());
    $sql = "INSERT INTO comments (comment, date) VALUES ('$var_text','$date')";
    mysqli_query($con, $sql);
    $msg = array('msg'=>'1');
    echo json_encode($msg);
}else{
    $msg2 = array('msg'=>'0');
    echo json_encode($msg2);
}


?>