<?php
include_once 'connection.php';
if (isset($_POST['type']) && $_POST['type'] == 'photo') {
    $images = "SELECT * FROM photos ORDER BY `date` desc";
    $images_results = mysqli_query($con, $images);
} else {
    $images = "SELECT * FROM gallery ORDER BY `date` desc";
    $images_results = mysqli_query($con, $images);
}
$info_rows = mysqli_fetch_all($images_results, MYSQLI_ASSOC);
echo json_encode($info_rows);
