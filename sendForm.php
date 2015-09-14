<?php

include_once(dirname(__FILE__) . '/phpmailer/PHPMailerAutoload.php');

function send_email($to, $title, $body) {
    $mail = new PHPMailer();
    $mail->IsSMTP();
    $mail->SMTPAuth = true;
    $mail->SMTPSecure = 'ssl';
    $mail->Host = "smtp.gmail.com";
    $mail->Port = 465;
    $mail->IsHTML(true);

    // Gegevens
    $mail->Username = "admin@ctcue.com";
    $mail->Password = "U2nHXCZ8";

    $mail->From = "CTcue";
    $mail->FromName = "CTcue";

    $mail->Subject = $title;
    $mail->Body = $body;
    $mail->AddAddress($to);

    return $mail->send();
}

if(isset($_POST['email'])) {
  $naam = trim($_POST['name']);
  $phone = trim($_POST['phone']);
  $email = trim($_POST['email']);
  $bericht = trim($_POST['message']);

  $naar = 'info@ctcue.com'; // Waar moet het naartoe?
  $onderwerp = "Contactformulier: $email"; // Het onderwerp van het bericht

  $fout = false; // Om te kijken straks of er wat fout is
  $EmailMessage  = "Name: " . $naam . " \n\n";
  $EmailMessage .= "Email: " . $email . " \n\n";
  $EmailMessage .= "Phone: " . $phone . " \n\n";
  $EmailMessage .= "Message: " . $bericht . " \n\n";

  if(empty($naam)) {
    print '<p>The first name field is required but has not been completed now!</p>';
    $fout = true; // Zorgen dat het script zometeen weet dat er wat fout is
  }

  if(empty($email)) {
    print '<p>The email field is required but has not been completed now!</p>';
    $fout = true;
  }

  if(!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    print '<p>Unfortunately, the email address is incorrect!</p>';
    $fout = true;
  }

  if(empty($bericht)) {
    print '<p>The message field is required but is not filled</p>';
    $fout = true;
  }

  if (!$fout) {
    if (send_email($naar, $onderwerp, nl2br($EmailMessage))) {
      print '<p>The message is sent!</p>';
    }
    else {
      print '<p>Unfortunately, something went wrong while sending the form.</p>';
    }
  }
}
?>