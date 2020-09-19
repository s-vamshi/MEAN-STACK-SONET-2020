var i=0;
    function getLocation() {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(myfunlocation);
        } else { 
          x.innerHTML = "Geolocation is not supported by this browser.";
        }
      }
      
    function myfunlocation(position) {
        var lat = position.coords.latitude ;
        var long = position.coords.longitude; 

        var request = new XMLHttpRequest();
        request.open("GET",`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&APPID=5ef48cfaa20e964ed7af5002eca538c4`,true);
        
        request.send();

        request.onload = function (){
            i++;
            if(i==1){
                document.getElementsByClassName("col-sm")[0].remove();
            }
            if(request.status >=200 && request.status<400){
                var data = JSON.parse(request.responseText);
            }
            var main = document.getElementsByTagName("h1")[0];
            main.innerHTML = data.name + "," + data.sys.country;
            var main2 = document.getElementsByTagName("h2")[0];
            main2.innerHTML = data.main.temp +`<img src="./csymbol.png" />`;
            var logo = document.getElementById("logo");
            var location = data.weather[0].icon + ".png";
            logo.innerHTML = `<img style="height:100%;width:100%;" src="./${location}" />`;
        }
    }
    
    
    function myfun(){
        var city = document.getElementById("city").value;
        var request = new XMLHttpRequest();
        request.open("GET",`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=5ef48cfaa20e964ed7af5002eca538c4`,true);

        request.send();

        request.onload = function (){
            if(request.status >=200 && request.status<400){
                var data = JSON.parse(request.responseText);
            }
            i++;
            if(i==1){
                document.getElementsByClassName("col-sm")[0].remove();
            }
            var main = document.getElementsByTagName("h1")[0];
            main.innerHTML = data.name + "," + data.sys.country;
            var main2 = document.getElementsByTagName("h2")[0];
            main2.innerHTML = data.main.temp +`<img src="./csymbol.png" />`;
            var logo = document.getElementById("logo");
            var location = data.weather[0].icon;
            console.log(location);
            var array = ["01d","01n","02d","02n","09d","09n","10d","10n"];
            var l=array.indexOf(location);
            console.log(l);
            if(l == -1){
                if(location == "04d" || location == "04n"){
                    location = "03d";
                }
                else if(location == "11d" || location == "11n"){
                    location = "11d";
                }
                else if(location == "13d" || location == "13n"){
                    location = "13d";
                }
                else{
                    if(location[2]=="d"){
                        location = "commonorig";
                    }
                    else{
                        location = "common";
                    }
                }
                    
            }
            logo.innerHTML = `<img  style="height:100%;width:100%;" src="./${location}.png"/>`;
        }  

    }