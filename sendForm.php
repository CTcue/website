<?php
$naar = 'nick@ctcue.com'; // Waar moet het naartoe?
$onderwerp = 'Contactformulier (ctcue.com)'; // Het onderwerp van het bericht

// Header instellen, zodat nl2br() werkt
$headers = "MIME-version: 1.0\r\n"; 
$headers .= "content-type: text/html;charset=utf-8\r\n";

if(isset($_POST['email'])) // Als het formulier verzonden is door op de verzend knop te klikken
{
  $naam = trim($_POST['name']); // Alle overbodige spaties uit het voornaam veld verwijderen
  $phone = trim($_POST['phone']); // Alle overbodige spaties uit het phone veld verwijderen
  $email = trim($_POST['email']); // Alle overbodige spaties uit het email veld verwijderen
  $bericht = trim($_POST['message']); // Alle overbodige spaties uit het bericht veld verwijderen
  $fout = false; // Om te kijken straks of er wat fout is
  $EmailMessage = "Name: " . $naam . " \n\n";
  $EmailMessage .= "Email: " . $email . " \n\n";
  $EmailMessage .= "Phone: " . $phone . " \n\n";
  $EmailMessage .= "Message: " . $bericht . " \n\n";

  if(empty($naam)) // Als het voornaam veld niet is ingevuld
  {
    print '<p>The first name field is required but has not been completed now!</p>';
    $fout = true; // Zorgen dat het script zometeen weet dat er wat fout is
  }
  if(empty($email)) // Als het email veld niet is ingevuld
  {
    print '<p>The email field is required but has not been completed now!</p>';
    $fout = true;
  }
  if(!filter_var($email, FILTER_VALIDATE_EMAIL)) // Als het email adres niet correct is
  {
    print '<p>Unfortunately, the email address is incorrect!</p>';
    $fout = true;
  }
  if(empty($bericht)) // Als het bericht veld niet is ingevuld
  {
    print '<p>The message field is required but is not filled</p>';
    $fout = true;
  }

  if($fout == false) // Als er niks fout is (alles is dus netjes ingevuld)
  {
    $headers .= 'From: ' . $naam . ' <' . $email . '>'; // Een afzender instellen zodat je kan reageren.

    if(mail($naar, $onderwerp, nl2br($EmailMessage), $headers))
    {
      print '<p>The message is sent!</p>';
    }
    else
    {
      print '<p>Unfortunately, something went wrong while sending the form.</p>';
    }
  }
}
?>