<?php
include 'connection.php';
if (isset($_POST['gid']) && isset($_POST['stat'])) {
    $gid = $_POST['gid'];
    $status = $_POST['stat'];

    if ($status == 0) {
        $sql = "UPDATE gallery SET likes = likes + 1 WHERE id = $gid";
    } else {
        $sql = "UPDATE gallery SET likes = likes - 1 WHERE id = $gid";
    }
    if (mysqli_query($con, $sql)) {
        $mysql = "Info-Updated";
    } else {
        $mysql = mysqli_error($con);
    };
    mysqli_close($con);
    $msg = array('status' => 'ok', 'excuted' => $gid, 'error' => $mysql);
} else if (isset($_POST['pid']) && isset($_POST['stat'])) {
    $pid = $_POST['pid'];
    $status = $_POST['stat'];

    if ($status == 0) {
        $sql = "UPDATE photos SET likes = likes + 1 WHERE pid = $pid";
    } else {
        $sql = "UPDATE photos SET likes = likes - 1 WHERE pid = $pid";
    }
    if (mysqli_query($con, $sql)) {
        $mysql = "Info-Updated";
    } else {
        $mysql = mysqli_error($con);
    };
    mysqli_close($con);
    $msg = array('status' => 'ok', 'excuted' => $pid, 'error' => $mysql);
} else {
    $msg = array('status' => 'bad', 'excuted' => $_POST['pid']);
}
echo json_encode($msg);
