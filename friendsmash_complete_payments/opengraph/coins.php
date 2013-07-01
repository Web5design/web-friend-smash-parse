<?php
  $locale           = 'en_US';
  $alternate_locale = 'es_LA';
  $alternate_locale2= 'pt_BR';
  $title            = "Friend Smash Coin!";
  $title_plural     = "Friend Smash Coins";
  $description      = "Get some coins and buy more lives and bombs!";

  if (isset($_REQUEST['fb_locale']) && $_REQUEST['fb_locale'] == 'es_LA') {
    $locale           = $_REQUEST['fb_locale'];
    $alternate_locale = 'en_US';
    $title            = "Moneda de Friend Smash!";
    $title_plural     = "Monedas de Friend Smash!";
    $description      = "Compra algunas monedas para obtener mas vidas y bombas!";
  }
  else if (isset($_REQUEST['fb_locale']) && $_REQUEST['fb_locale'] == 'pt_BR') {
    $locale           = $_REQUEST['fb_locale'];
    $alternate_locale = 'en_US';
    $alternate_locale2= 'es_LA';
    $title            = "Moeda de Friend Smash!";
    $title_plural     = "Moedas de Friend Smash!";
    $description      = "Compre algumas moedas para obter mais bombas e vidas!";
  }
  
  $file     = 'coins_access.txt';
  $current  = file_get_contents($file);
  $current .= "*************\n";
  $current .= date(DATE_ATOM)." \n";
  $current .= print_r($_REQUEST,true);
  file_put_contents($file, $current);
  
?>

<head prefix="og: http://ogp.me/ns# fb: http://ogp.me/ns/fb#">
  <meta property="og:type" content="og:product" />
  <meta property="og:locale" content="<?php echo $locale; ?>" />
  <meta property="og:locale:alternate" content="<?php echo $alternate_locale; ?>" />
  <meta property="og:locale:alternate" content="<?php echo $alternate_locale2; ?>" />
  <meta property="og:title" content="<?php echo $title; ?>" />
  <meta property="og:plural_title" content="<?php echo $title_plural; ?>" />
  <meta property="og:image" content="http://ancient-savannah-6416.herokuapp.com/images/coin64.png" />
  <meta property="og:url" content="http://ancient-savannah-6416.herokuapp.com/opengraph/coins.php" />
  <meta property="og:description" content="<?php echo $description; ?>" />
  <meta property="product:price:amount" content="0.10"/>
  <meta property="product:price:currency" content="USD"/>
  <meta property="product:price:amount" content="0.12"/>
  <meta property="product:price:currency" content="CAD"/>
  <meta property="product:price:amount" content="0.08"/>
  <meta property="product:price:currency" content="EUR"/>
  <meta property="product:price:amount" content="0.06"/>
  <meta property="product:price:currency" content="GBP"/>
  <meta property="product:price:amount" content="1.2"/>
  <meta property="product:price:currency" content="MXN"/>
  <meta property="product:price:amount" content="0.50"/>
  <meta property="product:price:currency" content="BRL"/>
  <meta property="product:price:amount" content="0.64"/>
  <meta property="product:price:currency" content="SEK"/>

</head>