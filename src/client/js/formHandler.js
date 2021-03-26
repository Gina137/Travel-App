///scroll into view
let addbutton=document.getElementById('addButton');
let seconddiv = document.getElementById('seconddiv')
let save = document.getElementById('save')
let thirddiv = document.getElementById('thirddiv')
let anotherTrip = document.getElementById('anotherTrip')
let firstdiv = document.getElementById('firstdiv')
let removeTrip = document.getElementById('removeTrip')
let reservehotel = document.getElementById('reservehotel')


///BUTTONS ACTIONS

//first button
addbutton.addEventListener('click',function()
{
    seconddiv.scrollIntoView({behavior:"smooth"})
})
//second button
save.addEventListener('click',function()
{
    thirddiv.scrollIntoView({behavior:"smooth"})
})
//third button(EXTRA)
removeTrip.addEventListener('click',function()
{
    
    firstdiv.remove();
    seconddiv.remove();
    thirddiv.remove();
    const removing=document.createElement('div')
    removing.innerText="Your Trip Has Been Successfully Removed";
    removing.setAttribute('class','removingTrip')
    document.body.appendChild(removing)
})
//fourth button
anotherTrip.addEventListener('click',function()
{
  firstdiv.scrollIntoView({behavior:"smooth"})
})
//fifth button (EXTRA)
//ADDING HOTEL
reservehotel.addEventListener('click',function()
{
    firstdiv.remove();
    seconddiv.remove();
    thirddiv.remove();
    const addhotel=document.createElement('div')
    addhotel.innerHTML='<p >Hotel Name: <input  type="text" placeholder="Hotel Name"></p><p > Number Of Guests: <input  type="number" placeholder=" Number Of Guests:"></p><p > Number Of Rooms: <input  type="number" placeholder=" Number Of Rooms:"></p><p > Number Of Nights: <input  type="number" placeholder=" Number Of Nights:"></p>'
    const hotelbutton=document.createElement('button')
    hotelbutton.textContent="save"
    addhotel.appendChild(hotelbutton)
    addhotel.setAttribute('class','addhotel')
    //sixth button
    hotelbutton.addEventListener("click",function(){
    const HB=document.createElement('p')
    HB.textContent="RESERVATION DONE"
    addhotel.remove();
    HB.setAttribute('class','removingTrip')
    document.body.appendChild(HB)
    })
    document.body.appendChild(addhotel)
})

////// API's
let geoURL='http://api.geonames.org/searchJSON?q='
let username='travelapp'
let weatherBitURL='https://api.weatherbit.io/v2.0/current?'
let weatherBitAPI='d013d773879c47d38b7f4af2bc689680'
let pixabayURL='https://pixabay.com/api/?key='
let pixabayAPI='20174384-521ea0951726546ebb8daf504'

const travel=save.addEventListener('click',function(event)
{
    event.preventDefault()
    let loCation = document.getElementById('loc').value
    const departure =document.getElementById('departure').value
    const Date =document.getElementById('Date').value
    const Name=document.getElementById('TravelerName').value
    Client.checker(departure,loCation);
    document.getElementById('leaving').innerHTML=`Leaving From: ${departure}`
    document.getElementById('date').innerHTML=`Date : ${Date}`
    document.getElementById('Name').innerHTML=`Name : ${Name}`

    //// postData
    postData('http://localhost:8081/geo',{loc:loCation})
   //// geoname 
    geoname(geoURL,loCation,username)
    .then((geodata)=>
    {
     console.log("geoDAAATA=",geodata)
     const lat=geodata.geonames[0].lat
     console.log('lat=',lat)
     const lon=geodata.geonames[0].lng
     console.log('lon=',lon)
     const country=geodata.geonames[0].countryName
     console.log('country=',country)
     document.getElementById('location').innerHTML=`Heading To : ${country}`
  

    const weatherdata=weatherbit(weatherBitURL,lat,lon,weatherBitAPI)
    return weatherdata;

    })
    ////weatherbit
    .then((weatherdata)=>{
    console.log("weatherdata=",weatherdata)
    const temp=weatherdata.data[0].temp
    console.log('temp is=',temp)
    document.getElementById('temp').innerHTML=`Expected weather : ${temp}^C`
    const Pixabay= pixabay(pixabayURL,pixabayAPI,loCation)
    return Pixabay;
    })
    ////pixabay
    .then((PixaBay)=>{
    console.log('pixabaydataa',PixaBay)
    document.querySelector("#resultavatar").setAttribute('src', PixaBay.hits[0].webformatURL);

    })
})

///postData function
const postData = async(url="",data={})=>
{
    console.log("Post Data =",data)
    const response=await fetch(url,
        {
                method: 'POST', 
                credentials: 'same-origin',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
        })
    try
    {
        const newData=await response.json();
        console.log("newData=",newData);
        return newData;
    }
    catch(error)
    {
        console.log("error",error);
    }
}
/////fetch geoname
const geoname=async(geoURL,loCation,username)=>
{
    const response=await fetch(geoURL+loCation+"&maxRows=10&" + "username="+username);
    try
    {
        const geodata=await response.json();
        console.log("geodata=",geodata)
        return geodata;
    }
    catch(error)
    {
        console.log("error",error);
    }
}
/////fetch weatherbit
const weatherbit=async(weatherBitURL,lat,lon,weatherBitAPI)=>
{

    const response=await fetch(weatherBitURL+'lat='+lat+'&lon='+lon+'&key='+weatherBitAPI+'&include=minutely');
    try
    {
        const WB=await response.json();
        console.log("WB=",WB)
        return WB;
    }
    catch(error)
    {
        console.log("error",error);
    }
}
//////////////////fetch picture
const pixabay=async(pixabayURL,pixabayAPI,loCation)=>
{
    const response=await fetch(pixabayURL+pixabayAPI+"&q="+loCation + "+city&image_type=photo");
    try
    {
        const pixadata=await response.json();
        console.log("pixadata=",pixadata)
        return pixadata;
    }
    catch(error)
    {
        console.log("error",error);
    }
}
export { travel }
