var createPostArea = document.querySelector('#create-post');
var sharedMomentsArea = document.querySelector('#shared-moments');

function createCard(data) {
  var cardWrapper = document.createElement('a');
  cardWrapper.href = 'details.html?id=' + data.id;
  cardWrapper.className = 'shared-moment-card mdl-card mdl-shadow--2dp card';
  cardWrapper.style.textDecoration = 'none';

  var cardImage = document.createElement('div');
  cardImage.className = 'card-title';
  cardImage.style.backgroundImage = 'url(' + data.image + ')';
  cardImage.style.backgroundSize = 'cover';
  cardImage.style.height = '180px';
  cardWrapper.appendChild(cardImage);

  var cardIcon = document.createElement('div');
  cardIcon.className = data.icon;
  // cardIcon.style.backgroundImage = 'url(' + data.icon + ')';
  cardIcon.style.backgroundSize = '10% 10%';
  cardIcon.style.height = '10px';
  cardIcon.style.position = 'absolute';
  cardIcon.style.bottom = '25px';
  cardIcon.style.right = '20px';
  cardWrapper.appendChild(cardIcon);
  
  var cardName = document.createElement('div');
  cardName.className = 'mdl-card__supporting-text h5';
  cardName.textContent = data.id;
  cardName.style.textAlign = 'center';
  cardName.style.textTransform = 'uppercase';
  // cardName.style.color = 'red';
  cardWrapper.appendChild(cardName);
  componentHandler.upgradeElement(cardWrapper);
  sharedMomentsArea.appendChild(cardWrapper);

  // cardWrapper.addEventListener('click',function() {
  //   cardClicked(data.id)
  // })
}

function loadDetail(){

}

function onSaveButtonClicked(event) {
  console.log('clicked');
  if ('caches' in window) {
    caches.open('user-requested')
      .then(function(cache) {
        cache.add('https://httpbin.org/get');
        cache.add('/src/images/sf-boat.jpg');
      });
  }
}

function clearCards() {
  while(sharedMomentsArea.hasChildNodes()) {
    sharedMomentsArea.removeChild(sharedMomentsArea.lastChild);
  }
}

function updateUI(data) {
  clearCards();
  for (var i = 0; i < data.length; i++) {
    createCard(data[i]);
  }
}

// function cardClicked(id) {
//   const urlParams = new URLSearchParams(location.search);
//     console.log(urlParams.get("id"));
//     var id = urlParams.get("id");
//     alert(id);
//     // localStorage.fitness = id;
//     // alert(localStorage.fitness);
//     // var myProp = localStorage.fitness;
//     // alert(myProp);
//     var networkDataReceived = false;

//     var url =
//       "https://yoliambw-42086-default-rtdb.asia-southeast1.firebasedatabase.app/fitness/" +
//       id +
//       ".json";

//     var keteranganArea = document.querySelector("#keterangan");

//     if (!localStorage.getItem(id)) {
//     fetch(url)
//       .then(function (res) {
//         return res.json();
//       })
//       .then(function (data) {
//         networkDataReceived = true;
//         localStorage.setItem('now', JSON.stringify(data));
//         console.log(data);
//         localStorage.setItem(id, JSON.stringify(data));
        
//         window.location.href = '/details.html'; 
//       })
//       .catch(function (error) {
//         console.error('Fetch error:', error);
//         window.location.href = '/offline.html'; 
//       });
//     } else {
//         localStorage.setItem('now', localStorage.getItem(id));
//         window.location.href = '/details.html';
//     }
// }

var url = 'https://yoliambw-42086-default-rtdb.asia-southeast1.firebasedatabase.app/fitness.json';
var networkDataReceived = false;

fetch(url)
  .then(function(res) {
    return res.json();
  })
  .then(function(data) {
    networkDataReceived = true;
    console.log('From web', data);
    var dataArray = [];
    for (var key in data) {
      dataArray.push(data[key]);
      // localStorage.
      // console.log(key);
    }
    updateUI(dataArray);
  });

if ('indexedDB' in window) {
  readAllData('fitness')
    .then(function(data) {
      if (!networkDataReceived) {
        console.log('From cache', data);
        updateUI(data);
      }
    });
}

