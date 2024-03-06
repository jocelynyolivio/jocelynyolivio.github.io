var createPostArea = document.querySelector('#create-post');
var sharedMomentsArea = document.querySelector('#shared-moments');

function createCard(data) {
  var cardWrapper = document.createElement('a');
  cardWrapper.href = 'details.html?id=' + data.id;
  cardWrapper.className = 'shared-moment-card mdl-card mdl-shadow--2dp';

  var cardImage = document.createElement('div');
  cardImage.className = 'mdl-card__title';
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
  cardWrapper.appendChild(cardName);
  componentHandler.upgradeElement(cardWrapper);
  sharedMomentsArea.appendChild(cardWrapper);
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

