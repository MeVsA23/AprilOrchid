<?php

header("Access-Control-Allow-Origin: *"); //解决跨域
header('Access-Control-Allow-Methods:post'); // 响应类型
date_default_timezone_set('Asia/Shanghai'); //获取当前时间
include 'connection.php';
$month = date('Ym', time()); //获取年月
//  define('BASE_PATH', str_replace('\\', '/', realpath(dirname(__FILE__).'/'))."/");
$dir = "upload" . '/' . $month . '/'; //判断是否有对应的文件

if(isset($_POST['title'])){
    $info = $_POST['title'];
    if($_POST['date'] != ''){
        $date= $_POST['date'];
       
    }else{
        $date= date('Y/m/d', time());
    }
}
if(isset($_POST['artChoice'])){
    $artChoice = $_POST['artChoice'];
}
$arr = array(
    'code' => 0, //返回状态
    'info' => $info,
    'msg' => '', //提示消息
    'date'=> $date,
    'data' => array( //文件链接
        'src' => $dir . $_FILES["file"]["name"]
    ),
);


$file_info = $_FILES['file']; //前端传过来的文件
$file_error = $file_info['error'];
if (!is_dir($dir)) { //判断目录是否存在
    mkdir($dir, 0777, true); //如果目录不存在则创建目录
};
$file = $dir . $_FILES["file"]["name"]; //上传文件的名字
if (!file_exists($file)) { //判断文件中是否有相同的文件
    if ($file_error == 0) {
        if (move_uploaded_file($_FILES["file"]["tmp_name"], $dir . $_FILES["file"]["name"])) {
            $arr['msg'] = "上传成功";
            if($artChoice == 'drawing'){
            $upld = "INSERT INTO gallery (title, date, url) values ('$info','$date', '$file')";
        }else{
            $upld = "INSERT INTO photos (title, date, url) values ('$info','$date', '$file')";
        }
            mysqli_query($con, $upld);
            mysqli_close($con);
        } else {
            $arr['msg'] = "上传失败";
        }
    } else {
        switch ($file_error) {
            case 1:
                $arr['msg'] = '上传文件超过了PHP配置文件中upload_max_filesize选项的值';
                break;
            case 2:
                $arr['msg'] = '超过了表单max_file_size限制的大小';
                break;
            case 3:
                $arr['msg'] = '文件部分被上传';
                break;
            case 4:
                $arr['msg'] = '没有选择上传文件';
                break;
            case 6:
                $arr['msg'] = '没有找到临时文件';
                break;
            case 7:
            case 8:
                $arr['msg'] = '系统错误';
                break;
        }
    }
} else {
    $arr['code'] = "1";
    $arr['msg'] = "当前目录中，文件" . $file . "已存在";
}
echo json_encode($arr);//将遍历好的数组反给前端
