async function search(a){

try{
    var x =await fetch(`https://api.weatherapi.com/v1/forecast.json?key=ea950b99021447fb8bb225414242811&q=${a}&days=3`);
    if(x.status != 400&&x.ok){
        var finalResult=await x.json();
        console.log(finalResult);
        displaycards(finalResult.current,finalResult.location,finalResult.forecast.forecastday)
    }

    

var searchInput=document.querySelector('#inputSearch')
searchInput.addEventListener('keyup',function(e){
    if(e.target.value.length==3){
        search(e.target.value) 
    }
})

} catch(error){
    document.querySelector('.row').innerHTML=`<div class="alert alert-danger">${error}</div>`
}}

               //0       1        2        3            4         5         6
var daysName=["sunday","monday","tuesday","wednesday","thursday","friday","saturday"];
var monthNames=["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
function displaycards(current,location,x) {
    var date =new Date(current.last_updated);
    var cartona=`<div class="card">
                            <div class="header-card">
                                <div class="header-content d-flex align-items-center justify-content-between">
                                    <div class="day">${daysName[date.getDay()]}</div>
                                    <div class="date">${date.getDate()+monthNames[date.getMonth()]}</div>
                                </div>
                            </div>
                            <div class="card-content">
                                <div class="location">${location.name} </div>
                                <div class="degree">
                                    <div class="num">
                                    ${current.temp_c}<sup>o</sup>C
                                    </div>
                                    <div class="icon">
                                    <img class="todayConditionImg" src="" alt="" width="90">
                                    </div>
                                </div>
                                
                                <div class="custom">${current.condition.text}</div>
                                <span>
                                    <img src="images/icon-umberella.png" alt="">
                                    20%
                                </span>
                                <span>
                                    <img src="images/icon-wind.png" alt="">
                                    18km/h
                                </span>
                                <span>
                                    <img src="images//icon-compass.png" alt="">
                                    East
                                </span>
                            </div>
                        </div>`;
    document.querySelector('.today').innerHTML=cartona;
    document.querySelector('.todayConditionImg').setAttribute('src','http:'+current.condition.icon)
    var cartona2=``
    for(var i=1;i<x.length;i++){
        cartona2 +=`   <div class="col-md-4">
        <div class="card">
                            <div class="header-card">
                                <div class="header-content d-flex align-items-center justify-content-center">
                                    <div class="day">${daysName[new Date(x[i].date).getDay()]}</div>
                                </div>
                            </div>
                            <div class="card-content text-center">
                                <div class="icon">
                                    <img class="otherConditionImg" src="http:${x[i].day.condition.icon}" alt="" width="50">
                                </div>
                                <div class="degree">
                                    <div class="num m-0 fs-3">
                                        ${x[i].day.maxtemp_c}<sup>o</sup>C
                                    </div>
                                </div>
                                <small>${x[i].day.mintemp_c} <sup>o</sup></small>
                                <div class="custom">${x[i].day.condition.text}</div>
                            </div>
                        </div>
                        </div>`
    }
    document.querySelector('.row').innerHTML+=cartona2
}
if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(function(position){
console.log(position.coords.latitude,position.coords.longitude);
fetch(`https://api.opencagedata.com/geocode/v1/json?key=b45cb92ab2d84fe190e98c5eda0c142a&q=${position.coords.latitude}+${position.coords.longitude}&pretty=1`)
    .then(response => response.json())
    .then(data => {
        const country = data.results[0].components.city||data.results[0].components.town;
        console.log(`Country: ${country}`);
        search(country)
    })
    .catch(error => {
        console.error("Error fetching data from the API:", error);
    });
    })
}




