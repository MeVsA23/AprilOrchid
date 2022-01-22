<?php
include 'connection.php';

// var_dump($info_rows);
if (isset($_GET['photo']) && $_GET['photo'] == '1') {
    $info = "SELECT * FROM photos ORDER BY 1 DESC";
    $info_results = mysqli_query($con, $info);
} else {
    $info = "SELECT * FROM gallery ORDER BY 1 DESC";
    $info_results = mysqli_query($con, $info);
}

$info_rows = mysqli_fetch_all($info_results, MYSQLI_ASSOC);
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>肆月籣</title>

    <style>
        body {
            display: flex;
            flex-direction: column;
            align-items: center;
        }

        table td {
            padding: 10px;
        }

        .looked {
            background-color: #62c46e;
            color: white;
        }

        a,
        a:visited {
            color: red;
        }
    </style>
</head>

<body>
    <h1>信息处理页面</h1>
    <br />
    <div>
        <a href="/control.php">绘画</a>
		<a href="?photo=1">摄影</a>
    </div>
    <br />
    <?php if (isset($info_rows)) : ?>
        <table border='1'>
            <tr>
                <th>ID</th>
                <th>标题</th>
                <th>姓名</th>
                <th>日期</th>
                <th>url</th>
                <th colspan="2">操作</th>
            </tr>
            <?php foreach ($info_rows as $row) : ?>
                <tr>
                    <?php if (isset($_GET['photo']) && $_GET['photo'] == '1') : ?>
                        <td><?php echo $row['pid']; ?></td>
                    <?php else : ?>
                        <td><?php echo $row['id']; ?></td>
                    <?php endif ?>
                    <td><?php echo $row['title']; ?></td>
                    <td><?php echo $row['author']; ?></td>
                    <td><?php echo $row['date']; ?></td>
                    <td><?php echo $row['url']; ?></td>
                    <?php if (isset($_GET['photo']) && $_GET['photo'] == '1') : ?>
                        <td><a href="infoHandler.php?pid=<?php echo $row['pid']; ?>">删除</a></td>
                        <td><a href="infoHandler.php?peditid=<?php echo $row['pid']; ?>">编辑</a></td>
                    <?php else : ?>
                        <td><a href="infoHandler.php?id=<?php echo $row['id']; ?>">删除</a></td>
                        <td><a href="infoHandler.php?editid=<?php echo $row['id']; ?>">编辑</a></td>
                    <?php endif ?>
                </tr>
            <?php endforeach; ?>
        </table>
    <?php endif ?>




</body>

</html>