<?php
include_once 'Config/Db.php';

$method = $_SERVER['REQUEST_METHOD'];

if($method == 'POST'){
    $TurnOf1 = 0;
    $TurnOf2 = 0;

    if(isset($_GET['connexionUD'])){
        $cheickUser = $pdo->prepare('SELECT * FROM usersDrivers WHERE number = "' . $_POST['number'] . '"');
        $cheickUser->execute();
        $uid = $cheickUser->fetch();
        if($cheickUser->rowCount() > 0){
            print json_encode(array(
            'messages' => 'this user was found',
            'status' => 200,
            'u_data' => array(
            "accountType" => $uid['accountType'],
            "id" => $uid['id'],
            "fullName" => $uid['fullName'],
            "email" => $uid['email'],
            "paymentMethod" => $uid['paymentMethod'],
            "password" => $uid['password'],
            "birthDay" => $uid['birthDay'],
            "region" => $uid['region'],
            "city" => $uid['city'],
            "number" => $uid['number'],
            "photoProfil" => $uid['photoProfil'],
            "photoDrivingLicense" => $uid['photoDrivingLicense'],
            "carBrand" => $uid['carBrand'],
            "model" => $uid['model'],
            "year" => $uid['year'],
            "numberMatricles" => $uid['numberMatricles'],
            "dateCreate" => $uid['dateCreate']
            )
            ));
            }else{
                $TurnOf1 = 1;
            }
    }
    if(isset($_GET['connexionUD'])){
        $cheickUserC = $pdo->prepare('SELECT * FROM usersCustomers WHERE number = "' . $_POST['number'] . '"');
        $cheickUserC->execute();
        $uid = $cheickUserC->fetch();
        if($cheickUserC->rowCount() > 0){
            print json_encode(array(
            'messages' => 'this user was found',
            'status' => 200,
            'u_data' => array(
            "id" => $uid['id'],
            "fullName" => $uid['fullName'],
            "email" => $uid['email'],
            "password" => $uid['password'],
            "paymentMethod" => $uid['paymentMethod'],
            "birthDay" => $uid['birthDay'],
            "region" => $uid['region'],
            "city" => $uid['city'],
            "number" => $uid['number'],
            "photoProfil" => $uid['photoProfil'],
            "accountType" => $uid['accountType'],
            "dateCreate" => $uid['dateCreate']
            )
            ));
        }else{
            $TurnOf2 = 3;
        }
    }

    if($TurnOf2 == 3 && $TurnOf1 == 1){
        print json_encode(array(
        'messages' => 'this g user was not found',
        'status' => 405
        ));
    }
        
    
    if(isset($_GET['PaymentMethod'])){
        if($_POST['typeAccount'] == "Conducteur" ){
        $MM = $pdo->prepare('UPDATE `usersCustomers`  SET `paymentMethod` = ? WHERE `usersCustomers`.`id` ='.$_GET['PaymentMethod']);
        $MM->execute(array($_POST['paymentMethod']));
        }else{
        $MM = $pdo->prepare('UPDATE `usersDrivers` SET `paymentMethod` = ? WHERE `usersDrivers`.`id` ='.$_GET['PaymentMethod']);
        $MM->execute(array($_POST['paymentMethod']));
        }
        print json_encode(array(
                'messages' => 'Votre methode de payment à été mis à jour',
                'status' => 200
            ));
    }
    }


if ($method == 'POST')
{
    // Method is POST IN DRIVERS TABLES
    if(isset($_GET['InsertUD'])){
        //Cheick if user exist
        $cheickUser = $pdo->prepare('SELECT * FROM usersDrivers WHERE email = "' . $_POST['email'] . '" AND password ="' . md5($_POST['password']).'"');
        $cheickUser->execute();

        if ($cheickUser->rowCount() < 1)
        {
            $insertOneUser = $pdo->prepare('INSERT INTO usersDrivers(
                fullName,email,password,birthDay,region,city,number,photoProfil,accountType,photoDrivingLicense,carBrand,model,year,numberMatricles,dateCreate) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,current_timestamp())');
            $insertOneUser->execute(array(
                $_POST['fullName'],
                $_POST['email'],
                md5($_POST['password']),
                $_POST['birthDay'],
                $_POST['region'],
                $_POST['city'],
                $_POST['number'],
                $_POST['photoProfil'],
                $_POST['accountType'],
                $_POST['photoDrivingLicense'],
                $_POST['carBrand'],
                $_POST['model'],
                $_POST['year'],
                $_POST['numberMatricles']
            ));

            $findUserAdd = $pdo->prepare('SELECT * FROM usersDrivers WHERE email = "' . $_POST['email'] . '" AND password ="' . md5($_POST['password']).'"');
            $findUserAdd->execute();
            $uid = $findUserAdd->fetch();
            print json_encode(array(
                'messages' => 'user has been inserted successfully',
                'status' => 200,
                'u_data' => array(
                "id" => $uid['id'],
                "fullName" => $uid['fullName'],
                "email" => $uid['email'],
                "password" => $uid['password'],
                "birthDay" => $uid['birthDay'],
                "region" => $uid['region'],
                "city" => $uid['city'],
                "number" => $uid['number'],
                "photoProfil" => $uid['photoProfil'],
                "accountType" => $uid['accountType'],
                "photoDrivingLicense" => $uid['photoDrivingLicense'],
                "carBrand" => $uid['carBrand'],
                "model" => $uid['model'],
                "year" => $uid['year'],
                "numberMatricles" => $uid['numberMatricles'],
                "dateCreate" => $uid['dateCreate']
            )
            ));
            
        }
        else
        {
            print json_encode(array(
                'messages' => 'An account exists with this email address',
                'status' => 405
            ));
        }
    }

    //METHODE INSERT CUSTOMERS
    if(isset($_GET['InsertUC'])){
        //Cheick if user exist
        $cheickUser = $pdo->prepare('SELECT * FROM usersCustomers WHERE email = "' . $_POST['email'] . '" AND password ="' . md5($_POST['password']).'"');
        $cheickUser->execute();

        if ($cheickUser->rowCount() < 1)
        {
            $insertOneUser = $pdo->prepare('INSERT INTO usersCustomers(
                fullName,email,password,birthDay,region,city,number,photoProfil,accountType) VALUES (?,?,?,?,?,?,?,?,?)');
            $insertOneUser->execute(array(
                $_POST['fullName'],
                $_POST['email'],
                md5($_POST['password']),
                $_POST['birthDay'],
                $_POST['region'],
                $_POST['city'],
                $_POST['number'],
                $_POST['photoProfil'],
                $_POST['accountType']
            ));

            $findUserAdd = $pdo->prepare('SELECT * FROM usersCustomers WHERE email = "' . $_POST['email'] . '" AND password ="' . md5($_POST['password']).'"');
            $findUserAdd->execute();
            $uid = $findUserAdd->fetch();
            print json_encode(array(
                'messages' => 'user has been inserted successfully',
                'status' => 200,
                'u_data' => array(
                "id" => $uid['id'],
                "fullName" => $uid['fullName'],
                "email" => $uid['email'],
                "password" => $uid['password'],
                "birthDay" => $uid['birthDay'],
                "region" => $uid['region'],
                "city" => $uid['city'],
                "number" => $uid['number'],
                "photoProfil" => $uid['photoProfil'],
                "accountType" => $uid['accountType'],
                "dateCreate" => $uid['dateCreate']
            )
            ));
            
        }
        else
        {
            
            print json_encode(array(
                'messages' => 'An account exists with this email address',
                'status' => 405
            ));
        }
    }

    if(isset($_GET['uProgressAlert'])){
        $updateProgress = $pdo->prepare('UPDATE `alertsRaces` SET `state` = "'.$_POST['state'].'" WHERE `alertsRaces`.`id` = "'.$_POST['id'].'"');
        $updateProgress->execute();
        print json_encode(array(
            'messages' => 'this record is update',
            'status' => 200
            ));

    }
    
    if(isset($_GET['insertNewAlert'])){
        $updateProgress = $pdo->prepare('INSERT INTO alertsRaces(idDrivers,districtWAYG,whereAreYouGoing,districtWAY,whereAreYou,seats,IDusersReserve,hours,date,price,totalPrice,state,raceType) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?)');
        $updateProgress->execute(array($_POST['idDrivers'],$_POST['districtWAYG'],$_POST['whereAreYouGoing'],$_POST['districtWAY'],$_POST['whereAreYou'],$_POST['seats'],$_POST['IDusersReserve'],$_POST['hours'],$_POST['date'],$_POST['price'],$_POST['totalPrice'],$_POST['state'],$_POST['raceType']));
        print json_encode(array(
            'messages' => 'success insert',
            'status' => 200
            ));

    }

    if(isset($_GET['reservationsRaces'])){
        $updateProgress = $pdo->prepare('UPDATE `alertsRaces` SET `state` = "'.$_POST['state'].'" WHERE `alertsRaces`.`id` = "'.$_POST['id'].'"');
        $updateProgress->execute();
        print json_encode(array(
            'messages' => 'this record is update',
            'status' => 200
            ));

    }

    if(isset($_GET['startCourseNow'])){
        $updateProgress = $pdo->prepare('UPDATE `alertsRaces` SET `startCourse` = "'.$_POST['startCourse'].'" WHERE `alertsRaces`.`id` = "'.$_POST['id'].'"');
        $updateProgress->execute();
        print json_encode(array(
            'messages' => 'this record is update',
            'status' => 200
            ));

    }

    if(isset($_GET['insertRaceAdd'])){

        /*==== Recuperation du nombre de place disponible pour la course ====*/

        $NmbrePlaceDipso = $pdo->prepare('SELECT * FROM alertsRaces WHERE id ="'.$_POST['idRaces'].'"');
        $NmbrePlaceDipso->execute();
        $seats = $NmbrePlaceDipso->fetchAll();

        /*===== END ======*/

        /*==== Verifications sur le nombre de place déjà prise ====*/

        $NmbrePlacePrise = $pdo->prepare('SELECT * FROM raceCustomersAdd WHERE idRaces ="'.$_POST['idRaces'].'" AND actif = "Oui"');
        $NmbrePlacePrise->execute();
        $CountNow = $NmbrePlacePrise->rowCount();

        /*===== END ======*/

        /* ===== Logique insertion ou refus === */
        if($seats['seats'] > $CountNow){
            $insertRaceAdd = $pdo->prepare("INSERT INTO `raceCustomersAdd` (`idRaces`, `idCustomers`, `methodPayment`, `state`, `raceType`,`price`) VALUES (?,?,?,?,?,?)");
        
        if($insertRaceAdd->execute(array($_POST['idRaces'],$_POST['idCustomers'],$_POST['methodPayment'],$_POST['state'],$_POST['raceType'],$_POST['price']))){
            print json_encode(array(
                    'messages' => 'Vous avez bien reserver votre place',
                    'status' => 200
                    ));
        }else{
            print json_encode(array(
            'messages' => 'reservation à echouer',
            'status' => 405
            ));
            }
        }else{
            print json_encode(array(
            'messages' => 'Plus de place disponible !!!',
            'status' => 405
            ));
        }
        
        /* ==== END ==== */
    }
        
    }

    
elseif ($method == 'GET')
{
/*
    $data = "/1/2/3";
    $dataSplit = explode("/",$data);
    $txt = 0;
    var_dump(array_filter($dataSplit, function($k) {
    
    if($k == 1}{

    }
    return $k == 1;
    }, ARRAY_FILTER_USE_BOTH));
*/
    // Method is GET
    if(isset($_GET['cmd']) == "All"){

        $getOneUser = $pdo->prepare('SELECT * FROM usersDrivers');

        $getOneUser->execute();

        $data = [];

        while ($row = $getOneUser->fetch())
        {
            $data[] = array(
                "id" => $row['id'],
                "fullName" => $row['fullName'],
                "email" => $row['email'],
                "password" => $row['password'],
                "birthDay" => $row['birthDay'],
                "region" => $row['region'],
                "city" => $row['city'],
                "number" => $row['number'],
                "photoProfil" => $row['photoProfil'],
                "accountType" => $row['accountType'],
                "photoDrivingLicense" => $row['photoDrivingLicense'],
                "carBrand" => $row['carBrand'],
                "model" => $row['model'],
                "year" => $row['year'],
                "numberMatricles" => $row['numberMatricles'],
                "dateCreate" => $row['dateCreate']
            );
        }
        
        print json_encode($data);

    }


    if(isset($_GET['AlertAll'])){

        $AlertAll = $pdo->prepare('SELECT * FROM alertsRaces WHERE raceType = "'. $_GET['AlertAll'] .'"');

        $AlertAll->execute();

        $data = [];

        while ($row = $AlertAll->fetch())
        {
            $Reservation = false;

            $AlertOne = $pdo->prepare('SELECT * FROM usersDrivers WHERE id = "'. $row['idDrivers'] .'"');
            $AlertOne->execute();
            $uid = $AlertOne->fetch();

            $AlertAddRace = $pdo->prepare('SELECT * FROM raceCustomersAdd WHERE idRaces = "'. $row['id'] .'" AND idCustomers = "'.$_GET['currentUserID'].'"');
            $AlertAddRace->execute();
            
            $Count = $AlertAddRace->rowCount();

            $data[] = array(
                "id" => $row['id'],
                "idDrivers" => $row['idDrivers'],
                "districtWAYG" => $row['districtWAYG'],
                "whereAreYouGoing" => $row['whereAreYouGoing'],
                "districtWAY" => $row['districtWAY'],
                "whereAreYou" => $row['whereAreYou'],
                "IDusersReserve" =>  $row['IDusersReserve'],
                "seats" => $row['seats'],
                "seatsAvailable" => $row['seatsAvailable'],
                "hours" => $row['hours'],
                "date" => $row['date'],
                "price" => $row['price'],
                "totalPrice" => $row['totalPrice'],
                "dateUpdate" => $row['dateUpdate'],
                "state" => $row['state'],
                "raceType" => $row['raceType'],
                "reservation" => $Count > 0  ? 'Oui' : 'Non',
                "DriverData" => array(
                "id" => $uid['id'],
                "fullName" => $uid['fullName'],
                "email" => $uid['email'],
                "birthDay" => $uid['birthDay'],
                "region" => $uid['region'],
                "city" => $uid['city'],
                "number" => $uid['number'],
                "photoProfil" => $uid['photoProfil'],
                "accountType" => $uid['accountType'],
                "photoDrivingLicense" => $uid['photoDrivingLicense'],
                "carBrand" => $uid['carBrand'],
                "model" => $uid['model'],
                "year" => $uid['year'],
                "reservations" => $Count > 0  ? 'Oui' : 'Non',
                "numberMatricles" => $uid['numberMatricles'],
                "dateCreate" => $uid['dateCreate']),
                
            );
        }
        
        print json_encode($data);

    }

    if(isset($_GET['AlertAllCourseDrivers'])){

        $AlertAll = $pdo->prepare('SELECT * FROM alertsRaces WHERE raceType = "'. $_GET['AlertAllCourseDrivers'] .'" AND idDrivers ="'.$_GET['idDrivers'].'"');

        $AlertAll->execute();

        $data = [];

        while ($row = $AlertAll->fetch())
        {

            $AlertOne = $pdo->prepare('SELECT * FROM usersDrivers WHERE id = "'. $row['idDrivers'] .'"');
            $AlertOne->execute();
            $uid = $AlertOne->fetch();

            $AlertAddRace = $pdo->prepare('SELECT * FROM raceCustomersAdd WHERE idRaces = "'. $row['id'] .'"');
            $AlertAddRace->execute();
            
            $Count = $AlertAddRace->rowCount();

            $data[] = array(
                "id" => $row['id'],
                "idDrivers" => $row['idDrivers'],
                "districtWAYG" => $row['districtWAYG'],
                "whereAreYouGoing" => $row['whereAreYouGoing'],
                "districtWAY" => $row['districtWAY'],
                "whereAreYou" => $row['whereAreYou'],
                "IDusersReserve" =>  $row['IDusersReserve'],
                "seats" => $row['seats'],
                "seatsAvailable" => $row['seatsAvailable'],
                "hours" => $row['hours'],
                "date" => $row['date'],
                "price" => $row['price'],
                "totalPrice" => $row['totalPrice'],
                "dateUpdate" => $row['dateUpdate'],
                "state" => $row['state'],
                "raceType" => $row['raceType'],
                "reservation" => $Count > 0  ? 'Oui' : 'Non',
                "DriverData" => array(
                "id" => $uid['id'],
                "fullName" => $uid['fullName'],
                "email" => $uid['email'],
                "birthDay" => $uid['birthDay'],
                "region" => $uid['region'],
                "city" => $uid['city'],
                "number" => $uid['number'],
                "photoProfil" => $uid['photoProfil'],
                "accountType" => $uid['accountType'],
                "photoDrivingLicense" => $uid['photoDrivingLicense'],
                "carBrand" => $uid['carBrand'],
                "model" => $uid['model'],
                "year" => $uid['year'],
                "reservations" => $Count,
                "numberMatricles" => $uid['numberMatricles'],
                "dateCreate" => $uid['dateCreate']),
                
            );
        }
        
        print json_encode($data);

    }

    if(isset($_GET['AlertAllT'])){

        $AlertAll = $pdo->prepare('SELECT * FROM alertsRaces');

        $AlertAll->execute();

        $data = [];

        while ($row = $AlertAll->fetch())
        {
            $data[] = array(
                "id" => $row['id'],
                "idDrivers" => $row['idDrivers'],
                "districtWAYG" => $row['districtWAYG'],
                "whereAreYouGoing" => $row['whereAreYouGoing'],
                "districtWAY" => $row['districtWAY'],
                "whereAreYou" => $row['whereAreYou'],
                "IDusersReserve" =>  $row['IDusersReserve'],
                "seats" => $row['seats'],
                "seatsAvailable" => $row['seatsAvailable'],
                "hours" => $row['hours'],
                "date" => $row['date'],
                "price" => $row['price'],
                "totalPrice" => $row['totalPrice'],
                "dateUpdate" => $row['dateUpdate'],
                "state" => $row['state'],
                "raceType" => $row['raceType']
                
            );
        }
        
        print json_encode($data);

    }

    if(isset($_GET['AlertID'])){

        $getOneUser = $pdo->prepare('SELECT * FROM alertsRaces Where id ="'.$_GET['AlertID'].'"');

        $getOneUser->execute();

        $data = [];

        while ($row = $getOneUser->fetch())
        {
            $AlertOne = $pdo->prepare('SELECT * FROM usersDrivers WHERE id = "'. $row['idDrivers'] .'"');
            $AlertOne->execute();
            $uid = $AlertOne->fetch();

            

            $data[] = array(
                "id" => $row['id'],
                "idDrivers" => $row['idDrivers'],
                "districtWAYG" => $row['districtWAYG'],
                "whereAreYouGoing" => $row['whereAreYouGoing'],
                "districtWAY" => $row['districtWAY'],
                "whereAreYou" => $row['whereAreYou'],
                "IDusersReserve" =>  $row['IDusersReserve'],
                "seats" => $row['seats'],
                "seatsAvailable" => $row['seatsAvailable'],
                "hours" => $row['hours'],
                "date" => $row['date'],
                "price" => $row['price'],
                "totalPrice" => $row['totalPrice'],
                "dateUpdate" => $row['dateUpdate'],
                "state" => $row['state'],
                "raceType" => $row['raceType'],
                "DriverData" => array(
                "id" => $uid['id'],
                "fullName" => $uid['fullName'],
                "email" => $uid['email'],
                "birthDay" => $uid['birthDay'],
                "region" => $uid['region'],
                "city" => $uid['city'],
                "number" => $uid['number'],
                "photoProfil" => $uid['photoProfil'],
                "accountType" => $uid['accountType'],
                "photoDrivingLicense" => $uid['photoDrivingLicense'],
                "carBrand" => $uid['carBrand'],
                "model" => $uid['model'],
                "year" => $uid['year'],
                "numberMatricles" => $uid['numberMatricles'],
                "dateCreate" => $uid['dateCreate']),
                
            );
        }
        
        print json_encode($data);

    }

    if(isset($_GET['AlertAllActif'])){

        $AlertAll = $pdo->prepare('SELECT * FROM alertsRaces WHERE raceType = "'. $_GET['AlertAllActif'] .'" WHERE state ="in progress"');

        $AlertAll->execute();

        $data = [];

        while ($row = $AlertAll->fetch())
        {
            $AlertOne = $pdo->prepare('SELECT * FROM usersDrivers WHERE id = "'. $row['idDrivers'] .'"');
            $AlertOne->execute();
            $uid = $AlertOne->fetch();

            $data[] = array(
                "id" => $row['id'],
                "idDrivers" => $row['idDrivers'],
                "districtWAYG" => $row['districtWAYG'],
                "whereAreYouGoing" => $row['whereAreYouGoing'],
                "districtWAY" => $row['districtWAY'],
                "whereAreYou" => $row['whereAreYou'],
                "IDusersReserve" =>  $row['IDusersReserve'],
                "seats" => $row['seats'],
                "seatsAvailable" => $row['seatsAvailable'],
                "hours" => $row['hours'],
                "date" => $row['date'],
                "price" => $row['price'],
                "totalPrice" => $row['totalPrice'],
                "dateUpdate" => $row['dateUpdate'],
                "state" => $row['state'],
                "raceType" => $row['raceType'],
                "DriverData" => array(
                "id" => $uid['id'],
                "fullName" => $uid['fullName'],
                "email" => $uid['email'],
                "birthDay" => $uid['birthDay'],
                "region" => $uid['region'],
                "city" => $uid['city'],
                "number" => $uid['number'],
                "photoProfil" => $uid['photoProfil'],
                "accountType" => $uid['accountType'],
                "photoDrivingLicense" => $uid['photoDrivingLicense'],
                "carBrand" => $uid['carBrand'],
                "model" => $uid['model'],
                "year" => $uid['year'],
                "numberMatricles" => $uid['numberMatricles'],
                "dateCreate" => $uid['dateCreate'])
            );
        }
        
        print json_encode($data);

    }

    if(isset($_GET['validUser'])){
        $AlertAddRace = $pdo->prepare('SELECT * FROM raceCustomersAdd WHERE idRaces = "'. $_GET['validUser'] .'" AND idCustomers = "'. $_GET['validCustom'] .'" AND actif = "Oui" ');
        $AlertAddRace->execute();
        
        $Count = $AlertAddRace->rowCount();
        if($Count > 0 ){
            print json_encode(array(
                'messages' => 'Oui',
                'status' => 200
            ));
        }else{
            print json_encode(array(
                'messages' => 'Non',
                'status' => 405
            ));
        }
        
    }

    

}
elseif ($method == 'PUT')
{
    // Method is PUT
    if(isset($_GET['SuppReservation'])){
        $DeleteReservations = $pdo->prepare('UPDATE `raceCustomersAdd` SET `actif` = "Non" WHERE `raceCustomersAdd`.`idRaces` ="'.$_GET['idRaces'].'" AND `raceCustomersAdd`.`idCustomers` ="'.$_GET['idCustomers'].'"');
        if($DeleteReservations->execute()){
            print json_encode(array(
                'messages' => 'Votre reservations à été annuler',
                'status' => 200
            ));
        }else{
            print json_encode(array(
                'messages' => "Vôtre reservations n'a pas pu être annuler ,quelque chose s'est mal passé",
                'status' => 405
            ));
        }

    }

    if(isset($_GET['CourseStart'])){
        $DeleteReservations = $pdo->prepare('UPDATE `alertsRaces` SET `state` = "start" WHERE `alertsRaces`.`id` ='.$_GET['CourseStart']);
        if($DeleteReservations->execute()){
            print json_encode(array(
                'messages' => 'Votre course à commencer a commencer',
                'status' => 200
            ));
        }else{
            print json_encode(array(
                'messages' => "Vôtre course n'a pas pu être annuler ,quelque chose s'est mal passé",
                'status' => 405
            ));
        }
    }
}
elseif ($method == 'DELETE')
{
    // Method is DELETE= 11
    if(isset($_GET['CourseDelete'])){
        $DeleteReservations = $pdo->prepare('DELETE FROM alertsRaces WHERE `alertsRaces`.`id` ='.$_GET['CourseDelete']);
        if($DeleteReservations->execute()){
            print json_encode(array(
                'messages' => 'Votre course à été supprimer a commencer',
                'status' => 200
            ));
        }else{
            print json_encode(array(
                'messages' => "Vôtre course n'a pas pu être annuler ,quelque chose s'est mal passé",
                'status' => 405
            ));
        }
    }
    
}
else
{
    // Method unknown
    
}

?>
