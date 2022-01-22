<?php
include 'connection.php';
$id = $_GET['id'];
$del = "delete FROM comments where cid = {$id}";
mysqli_query($con, $del);
header('Location: ./messages.php');
exit();
?>


