/* Global Variables */
const API_KEY = 'c74f255a22a6951d02db6fe09efea88d';
const BASE_URL = 'https://api.openweathermap.org/data/2.5/';
const LOCAL_URL = 'http://localhost:3000/';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + 1 + '.' + d.getDate() + '.' + d.getFullYear();


document.getElementById('generate').addEventListener('click', async () => {

  const zip = document.getElementById('zip').value;

  if (zip) {
    // getting the data from openweathermap api
    getTemp(zip).then(async (res) => {
      try {
        const result = await res.json();

        // getting user data from UI
        const userData = document.getElementById('feelings').value;

        // creating the reqeust body from user data
        const body = new Object({
          temp: result.main.temp,
          feeling: userData,
          date: newDate
        });

        // posting data to the server
        postData(body).then(async (res) => {
          try {
            const result = await res.json();
            // getting data from the server
            getAll().then(async (res) => {
              try {
                const result = await res.json();
                document.getElementById('date').innerHTML = result.date;
                document.getElementById('temp').innerHTML = result.temp;
                document.getElementById('content').innerHTML = result.feeling;
              } catch (error) {
                console.log('error', error);
              }
            }).catch(e => console.log(e));
          } catch (error) {
            console.log('error', error);
          }
        }).catch(e => console.log('eerr' + e));
      } catch (error) {
        console.log('error', error);
      }
    }).catch(e => console.log('eerr' + e));
  }else {
    alert('please enter a valid zip code!')
  }
});

const getTemp = async (zip) => {
  return await fetch(`${BASE_URL}weather?zip=${zip}&APPID=${API_KEY}`);
}

const postData = async (data) => {
  return await fetch(`${LOCAL_URL}add`, {
    method: 'POST',
    mode: 'cors',
    credentials: 'same-origin',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
}

const getAll = async () => {
  return await fetch(`${LOCAL_URL}all`);
}