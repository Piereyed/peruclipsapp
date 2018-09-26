/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

function tagItemTemplate(id,name, ename) {
    return (
        `<div class="panel panel-default">
<div class="panel-heading">
<h3 class="panel-title">${name}</h3>
</div>
<div class="panel-body">
Codigo: ${id} <br>
Ingles: ${ename}
</div>
</div>`
    )
}
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');

        //                alert(window.QRScanner); 

    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {


        //        console.log(navigator.vibrate);
        //        
        //
        //        console.log(navigator.notification);
        //        navigator.notification.alert("Este es una alerta", alertDismissed, 'Bienvenido', 'Entendido');
        //        function alertDismissed() {
        //            navigator.vibrate(3000); 
        //        }
        //        var parentElement = document.getElementById(id);
        //        var listeningElement = parentElement.querySelector('.listening');
        //        var receivedElement = parentElement.querySelector('.received');

        // listeningElement.setAttribute('style', 'display:none;');
        // receivedElement.setAttribute('style', 'display:block;');

        // console.log('Received Event: ' + id);

        //        var btn = document.getElementById("mybtn");
        //        var camara = document.getElementById("camara");
        //
        //        function cameraSuccess(imageData) {
        //            //            var image = document.getElementById('myImage');
        //            //            image.src = "data:image/jpeg;base64," + imageData;
        //
        //            var image = document.getElementById('myImage');
        //            image.src = imageData;
        //
        //        }
        //        function onFail(message) {
        //            alert('Failed because: ' + message);
        //        }
        //        camara.addEventListener('click', function(){
        //            navigator.camera.getPicture(cameraSuccess, onFail, { quality: 50 , 
        //                                                                destinationType: Camera.DestinationType.FILE_URI,
        //                                                                allowEdit: true,
        //                                                                correctOrientation: true,
        //                                                                //                                                                saveToPhotoAlbum: true,
        //                                                                //                                                                cameraDirection: Camera.Direction.FRONT,
        //                                                               });
        //
        //        });

        //        function displayContents(err, text){
        //            if(err){
        //                $("#error").html("Hubo un error al intentar leer el QR CODE");
        //                navigator.notification.alert("Hubo un error al intentar leer el QR CODE");
        //                // an error occurred, or the scan was canceled (error code `6`)
        //            } else {
        //                // The scan completed, display the contents of the QR code:
        //                $("#error").html("The scan completed");
        //                alert(text);
        //            }
        //        }


        document.getElementById("qrcode").addEventListener('click', function(){


            if(QRScanner){
                $("#info").append("se detecto el scaner. ");
                QRScanner.prepare(onDone); // show the prompt
                $("#info").append("se preparo. ");


                // Start a scan. Scanning will continue until something is detected or
                // `QRScanner.cancelScan()` is called.
                QRScanner.scan(displayContents);
                $("#info").append("se escaneo. ");

                // Make the webview transparent so the video preview is visible behind it.
                QRScanner.show();
                $("#info").append("se mostro. ");
                // Be sure to make any opaque HTML elements transparent here to avoid
                // covering the video.
            }
            else{
                $("#error").html("No se encontro el lector de qr");
                navigator.vibrate(500); 
            }
        });


        //        btn.addEventListener('click', function(){
        //            $(".relleno").empty();
        //            $(".relleno").html("Trayendo tags....");
        //
        //
        //
        //            //            $.ajax({
        //            //                url: "//restcountries.eu/rest/v2/all",
        //            //                type: "GET",
        //            //                dataType: "json",
        //            //                success: function (myJson) {
        //            //                    $(".relleno").empty();
        //            //                    for (var i = 0; i < myJson.length; i++){
        //            //                        var obj = myJson[i];                
        //            //                        $(".relleno").append(tagItemTemplate(obj['name'],obj['capital'], obj['area']));
        //            //                    }
        //            //                },
        //            //                error: function (jqXHR, textStatus, errorThrown) {
        //            //                    console.log(jqXHR);
        //            ////                    $(".relleno").html(textStatus + " in processing: " + errorThrown + " " + jqXHR);
        //            //                }
        //            //            });
        //
        //            fetch('https://peruclips.com/api/tags')
        //                .then(function(response) {
        //                return response.json();
        //            })
        //                .then(function(myJson) {
        //                $(".relleno").empty();
        //                //            console.log(myJson);
        //                for (var i = 0; i < myJson.length; i++){
        //                    var obj = myJson[i];                
        //                    $(".relleno").append(tagItemTemplate(obj['id'],obj['name'], obj['en_name']));
        //
        //                }
        //            })
        //                .catch(function(error) {
        //                console.log(error);
        //                $(".relleno").html("Hubo un problema con la petición Fetch:" + error.message);
        //            });
        //        });
    }
};

function onDone(err, status){
    if (err) {
        // here we can handle errors and clean up any loose ends.
        $("#error").html(err);
    }
    if (status.authorized) {
        // W00t, you have camera access and the scanner is initialized.
        // QRscanner.show() should feel very fast.
        $("#info").html("authorized. ");
    } else if (status.denied) {
        // The video preview will remain black, and scanning is disabled. We can
        // try to ask the user to change their mind, but we'll have to send them
        // to their device settings with `QRScanner.openSettings()`.
        $("#info").html("denied. ");
    } else {
        // we didn't get permission, but we didn't get permanently denied. (On
        // Android, a denial isn't permanent unless the user checks the "Don't
        // ask again" box.) We can ask again at the next relevant opportunity.
    }
}

function displayContents(err, text){
    if(err){
        $("#error").html(err._message);
        // an error occurred, or the scan was canceled (error code `6`)
    } else {
        // The scan completed, display the contents of the QR code:
        alert(text);
    }
}