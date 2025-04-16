<?php
// Clear the user_email cookie
setcookie("user_email", "", time() - 3600, "/");

// Redirect to the homepage
header("Location: ../index.php");
exit();
?>