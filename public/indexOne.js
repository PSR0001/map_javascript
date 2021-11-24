//   code for map
  
  
  let lat = 0, lon = 0;
  // ========map==========

  const button = document.getElementById('submit');
  button.addEventListener('click', async event => {
    const mood = document.getElementById('mood').value;
    const data = { lat, lon, mood };
    // for post request from this webpage
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    };
    const response = await fetch('/api', options);
    const json = await response.json();
    console.log(json);
  });
  // ends here---------------------------------------------

  // geolocation part==========================
  if ('geolocation' in navigator) {
    console.log('geolocation available');
    navigator.geolocation.getCurrentPosition(async position => {
      lat = position.coords.latitude;
      lon = position.coords.longitude;
      document.getElementById('latitude').textContent = lat;
      document.getElementById('longitude').textContent = lon;
    });
  } else {
    console.log('geolocation not available');
  }

  // console.log(lat,lon)
  // ends here===========================================


  // map code starts here--------------------------------------------------
  const mymap = L.map('issMap').setView([0, 0], 3);
  const attribution = '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
  const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
  const tile = L.tileLayer(tileUrl, attribution);
  tile.addTo(mymap);

  // ----for map icon--------
  const pngIss = L.icon({
    iconUrl: 'saveiss.png',
    iconSize: [50, 32],
    iconAnchor: [25, 16],
  });
  const markup = L.marker([0, 0], { icon: pngIss }).addTo(mymap);
  // map icon ends here------------
  // L.marker(['22.5726', '88.3639']).addTo(mymap);
  // L.marker(['28.7041', '77.1025']).addTo(mymap);

  // getData function starts here=======
  async function getData() {
    const response = await fetch('/getdata');
    const data2 = await response.json();
    // const { ,  } = data;
    // let latUser = data2.lat;
    // let longUser = data2.lon;
    console.log(data2,'cool guy');
    // console.log(response,'fuck Man');

    // markup.setLatLng([latUser, longUser]);
    // mymap.setView([latUser, longUser], 7);
    data2.forEach(element => {

      const first = element;
      // console.log(first);
      L.marker([first.lat, first.lon]).addTo(mymap);
    })
  }

  // ======map end========
  getData();
//   setInterval(getData,10000)
