(function() {
    "use strict";
    
    //clock

    document.addEventListener("DOMContentLoaded", function() {
        
        let c = document.getElementById("clock");
       
        //setTimeout(updateClock, 2000);
        setInterval(updateClock, 1000);
        
        function updateClock() {
            
            let date = new Date();
            let h = date.getHours();
            let m = date.getMinutes();
            let s = date.getSeconds();
            let ampm = 'AM'
            if (h >= 12) {
                ampm = 'PM'
                if(h > 12){
                    h = h-12
                }
            }
            if (h < 10) {
                h = "0" + h;
            }

            if (m < 10) {
                m = "0" + m;
            }

            if (s < 10) {
                s = "0" + s;
            }

            c.innerHTML = h + ":" + m + ":" + s + ' ' + ampm;
            
        };
        
    });
    
    // forms
    
    document.getElementById("form").addEventListener("submit", estimateDelivery);
    
    let e = document.getElementById("delivery");
    e.innerHTML = "0,00 &euro;";
    
    function estimateDelivery(event) {
        event.preventDefault();
        
        let linn = document.getElementById("linn");
        let maksemeetod = document.querySelector('input[name="maksemeetod"]:checked');
        let fname = document.getElementById("fname");
        let lname = document.getElementById("lname");
        if (linn.value === "") {
            
            alert("Palun valige linn nimekirjast");
            
            linn.focus();
            
            return;
            
        } else if (!maksemeetod) {
            
            alert("Palun valige maksemeetod");
            
            maksemeetod.focus();
            
            return;
            
                
        } else if (fname.value === "" || /\d/.test(fname.value)) {
            
            alert("Eesnimi tühi või sisaldab numbrit");
            
            maksemeetod.focus();
            
            return;
            
                
        } else if (lname.value === "" || /\d/.test(lname.value)) {
            
            alert("Prekonnanimi tühi või sisaldab numbrit");
            
            maksemeetod.focus();
            
            return;
            
                
        }else {
            let summa = 0.0
            linn = linn.value
            if (linn === 'tln'){
                summa += 0
            } else if (linn === 'trt' || linn === 'nrv'){
                summa += 2.5
            } else if (linn === 'prn'){
                summa += 3
            }
            if (document.getElementById('v1').checked){
                summa += 5
            }
            if (document.getElementById('v2').checked){
                summa += 1
            }
            e.innerHTML = summa.toLocaleString('fr-FR', {style:'currency', currency:'EUR'});
            
        }        
        
        console.log("Tarne hind on arvutatud");
    }
    
})();

// map

let mapAPIKey = "AqLLRE37SJGqIxXEYxezPUa6fF2oCzl3cvG4n05FtFIVBrotBYxchpMYYpwuxBak";

let map;

function GetMap() {
    
    "use strict";

    let centerPoint = new Microsoft.Maps.Location(
            58.38104, 
            26.71992
        );
    let TallinnCenter = new Microsoft.Maps.Location(
        59.4713933,24.4580691
    );

    let newCenter = new Microsoft.Maps.Location(
        58.87464017546276, 25.625366433714948
    );

    map = new Microsoft.Maps.Map("#map", {
        credentials: mapAPIKey,
        center: newCenter,
        zoom: 7,
        mapTypeId: Microsoft.Maps.MapTypeId.road,
        disablePanning: true
    });
    
    //Create an infobox at the center of the map but don't show it.
    let infobox = new Microsoft.Maps.Infobox(map.getCenter(), {
        visible: false
    });

    //Assign the infobox to a map instance.
    infobox.setMap(map);

    let pushpin = new Microsoft.Maps.Pushpin(centerPoint, {
        title: 'Tartu Ülikool',
        describtion: 'Tartu Ülikool on Eesti ülikool',
        text: 'UT'
    });
    pushpin.metadata = {
        title: 'Tartu Ülikool',
        describtion: 'Tartu Ülikool on Eesti ülikool',
    };
    //Add a click event handler to the pushpin.
    Microsoft.Maps.Events.addHandler(pushpin, 'click', pushpinClicked);
    map.entities.push(pushpin);
    //Add a click event handler to the pushpin.
    let newpushpin = new Microsoft.Maps.Pushpin(TallinnCenter, {
        title: 'Tallinn',
        describtion: 'Tallinn on Eesti pealinn',
        text: 'TLN'
    });

    newpushpin.metadata = {
        title: 'Tallinn',
        describtion: 'Tallinn on Eesti pealinn',
    };
    
    Microsoft.Maps.Events.addHandler(newpushpin, 'click', pushpinClicked);
    map.entities.push(newpushpin);
    function pushpinClicked(e) {
        //Make sure the infobox has metadata to display.
        if (e.target.metadata) {
            //Set the infobox options with the metadata of the pushpin.
            infobox.setOptions({
                location: e.target.getLocation(),
                title: e.target.metadata.title,
                description: e.target.metadata.description,
                visible: true
            });
        }
    }
}


// https://dev.virtualearth.net/REST/v1/Locations?q=1000 Vin Scully Ave, Los Angeles,CA&key=YOUR_KEY_HERE

