<?php
include 'connection.php';
if(isset($_GET['id'])){
$id = $_GET['id'];

$galurl = "select url from gallery where id = $id";
    $url = mysqli_fetch_assoc(mysqli_query($con, $galurl));
    $gal_address= './' . $url['url'];
    gc_collect_cycles();
    unlink($gal_address);
	
	
$del = "delete FROM gallery where id = $id";
mysqli_query($con, $del);
header('Location: control.php');
exit();
};

if(isset($_GET['pid'])){
    $pid = $_GET['pid'];
	$picurl = "select url from photos where pid = $pid";
    $url = mysqli_fetch_assoc(mysqli_query($con, $picurl));
    $address= './' . $url['url'];
    gc_collect_cycles();
    unlink($address);
	
    $del = "delete FROM photos where pid = $pid";
    mysqli_query($con, $del);
    header('Location: control.php');
    exit();
    };

if(isset($_GET['editid'])){
    $editid =$_GET['editid'];
$rents = "SELECT * FROM gallery where id = $editid";
$rents_results = mysqli_query($con, $rents);
$info_rows = mysqli_fetch_assoc($rents_results);
}
if(isset($_GET['peditid'])){
    $peditid =$_GET['peditid'];
$rents = "SELECT * FROM photos where pid = $peditid";
$rents_results = mysqli_query($con, $rents);
$info_rows = mysqli_fetch_assoc($rents_results);
}

if(isset($_POST['submit'])){
    $title = mysqli_escape_string($con, $_POST['title']);
    $author = mysqli_escape_string($con, $_POST['author']);
    $url = mysqli_escape_string($con, $_POST['url']);
    if(isset($_GET['peditid'])){
        $upld = "UPDATE photos SET title='$title', url='$url' WHERE pid = '$peditid'";
    }else{
        $upld = "UPDATE gallery SET title='$title', url='$url' WHERE id = '$editid'";
    }

    
    if(mysqli_query($con, $upld)){
        echo "<script> alert('成功');</script>";
    }else{
        echo "<script> alert('服务器有问题了');</script>" . mysqli_error($con);
    }
    mysqli_close($con);
    header('Location: control.php');
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>信息处理页面</title>
<style>
        body {
            display: flex;
            align-items: center;
            height: 98vh;
        }

        form {
            width: 400px;
            margin: 0 auto;
            display: flex;
            flex-flow: column;
        }

        input {
            padding: 10px;
            font-size: 20px;
        }

        button {
            margin-top: 20px;
            font-size: 20px;
            padding: 10px;
        }

        textarea {
            resize: vertical;
            font-size: 16px;
            height: 100px;
        }
    </style>
</head>

<body>
    <?php if(isset($info_rows)): ?>
    <form action="" method="post">
        <h3>标题</h3>
        <input type="text" name="title" value="<?php echo $info_rows['title']; ?>">
        <h3>超链接</h3>
        <input type='text' name='url' value="<?php echo $info_rows['url']; ?>"/>
        <h3>作者</h3>
        <textarea name="author"><?php echo $info_rows['author']; ?></textarea>
        <button type="submit" name="submit">提交</button>
    </form>
    <?php endif ?>
</body>

</body>
</html>