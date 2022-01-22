<?php
include 'connection.php';
$info = "SELECT * FROM comments";
$info_results = mysqli_query($con, $info);
$info_rows = mysqli_fetch_all($info_results, MYSQLI_ASSOC);
// var_dump($info_rows);
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>肆月蘭</title>

    <style>
    body{
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    table td{
        padding:10px;
    }
    </style>
</head>

<body>
    <h1>信息处理页面</h1>
    <br/>
    <?php if (isset($info_rows)) : ?>
        <table border='1'>
            <tr>
            <th>ID</th>
            <th>内容</th>
            <th>日期</th>
            <th>操作</th>
            </tr>
            <?php foreach ($info_rows as $row) : ?>
                <tr>
                    <td><?php echo $row['cid']; ?></td>
                    <td><?php echo $row['comment']; ?></td>
                    <td><?php echo $row['date']; ?></td>
                    <td><a href="delMsg.php?id=<?php echo $row['cid']; ?>">删除</a></td>
                </tr>
            <?php endforeach; ?>
        </table>
    <?php endif ?>




</body>

</html>