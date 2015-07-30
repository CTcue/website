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
    $mail->Username = "fabientesselaar@gmail.com";
    $mail->Password = "password";
    $mail->SetFrom("fabientesselaar@gmail.com");

    $mail->Subject = $title;
    $mail->Body = $body;
    $mail->AddAddress($to);

    return $mail->send();
}
