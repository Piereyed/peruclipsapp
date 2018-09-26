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
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        //        var parentElement = document.getElementById(id);
        //        var listeningElement = parentElement.querySelector('.listening');
        //        var receivedElement = parentElement.querySelector('.received');

        // listeningElement.setAttribute('style', 'display:none;');
        // receivedElement.setAttribute('style', 'display:block;');

        // console.log('Received Event: ' + id);

        var btn = document.getElementById("mybtn");
        btn.addEventListener('click', function(){
            $(".relleno").empty();
            $(".relleno").html("Trayendo tags....");

            //            $.ajax({
            //                url: "//restcountries.eu/rest/v2/all",
            //                type: "GET",
            //                dataType: "json",
            //                success: function (myJson) {
            //                    $(".relleno").empty();
            //                    for (var i = 0; i < myJson.length; i++){
            //                        var obj = myJson[i];                
            //                        $(".relleno").append(tagItemTemplate(obj['name'],obj['capital'], obj['area']));
            //                    }
            //                },
            //                error: function (jqXHR, textStatus, errorThrown) {
            //                    console.log(jqXHR);
            ////                    $(".relleno").html(textStatus + " in processing: " + errorThrown + " " + jqXHR);
            //                }
            //            });

            fetch('https://peruclips.com/api/tags')
                .then(function(response) {
                return response.json();
            })
                .then(function(myJson) {
                $(".relleno").empty();
                //            console.log(myJson);
                for (var i = 0; i < myJson.length; i++){
                    var obj = myJson[i];                
                    $(".relleno").append(tagItemTemplate(obj['id'],obj['name'], obj['en_name']));

                }
            })
                .catch(function(error) {
                console.log(error);
                $(".relleno").html("Hubo un problema con la petición Fetch:" + error.message);
            });
        });
    }
};
