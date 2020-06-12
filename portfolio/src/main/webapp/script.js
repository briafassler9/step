// Copyright 2019 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.


var numOfDogImages = 10;

/*A function that generates a random image of a dog*/
function randomDogImage(){
  const imageIndex = Math.floor(Math.random() * numOfDogImages) + 1;
  const imageUrl = 'DogImages/Dog' + imageIndex + '.jpg';
  const imageElement = document.createElement('img');
  imageElement.src = imageUrl;
  const imageRemover = document.getElementById('random-image-container');
  imageRemover.innerHTML = '';
  imageRemover.appendChild(imageElement);
}

/** Displays amount of comments chosen by the user. */
function getNumComments(commentsNum) {
  fetch('/data?numOfComments=' + commentsNum).then(response => response.json()).then((comments) => {
    const taskListElement = document.getElementById('task-list');
    taskListElement.innerHTML="";
      for (let i=0; i<comments.length; i++)
      {
        taskListElement.appendChild(createCommentElement(comments[i]));
      } 
  });
}

/**A function that creates the comment and delete button. */
function createCommentElement(task) {
  const taskElement = document.createElement('li');
  taskElement.className = 'task';

  const titleElement = document.createElement('span');
  titleElement.innerText = task;

  const deleteButtonElement = document.createElement('button');
  deleteButtonElement.innerText = 'Delete';
  deleteButtonElement.addEventListener('click', () => {
    deleteTask(task);

    // Remove the task from the DOM.
    taskElement.remove();
  });

  taskElement.appendChild(titleElement);
  taskElement.appendChild(deleteButtonElement);
  return taskElement;
}

/** Tells the server to delete the task. */
function deleteTask(task) {
  const params = new URLSearchParams();
  params.append('id', task.id);
  fetch('/data', {method: 'POST', body: params});
}

google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawFoodChart);

/** Draws user inputted pie chart and adds to page. */
function drawFoodChart() {
  fetch('/food-data').then(response => response.json())
  .then((foodVotes) => {
    const breakfastData = new google.visualization.DataTable();
      breakfastData.addColumn('string', 'Breakfast Food');
      breakfastData.addColumn('number', 'Votes');
      Object.keys(foodVotes).forEach((food) => {
        breakfastData.addRow([food, foodVotes[food]]);
      });

      const dimensions = {
        'title': 'Favorite Breakfast Food',
        'width': 650,
        'height': 500,
      };

      const foodChart = new google.visualization.PieChart(
        document.getElementById('chart-container'));
        foodChart.draw(breakfastData, dimensions);
  });
}

/**Creates a map in dark mode and adds it to the page. */
function createMap() {
  const map = new google.maps.Map(
    document.getElementById('map'),
    //coordinates pointing to Googleplex
    {center: {lat: 39.443167, lng: -76.616569}, zoom: 12,
    styles: [
      {elementType: 'geometry', stylers: [{color: '#242f3e'}]},
      {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
      {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
      {
        featureType: 'administrative.locality',
        elementType: 'labels.text.fill',
        stylers: [{color: '#d59563'}]
      },
      {
        featureType: 'poi',
        elementType: 'labels.text.fill',
        stylers: [{color: '#d59563'}]
      },
      {
        featureType: 'poi.park',
        elementType: 'geometry',
        stylers: [{color: '#263c3f'}]
      },
      {
        featureType: 'poi.park',
        elementType: 'labels.text.fill',
        stylers: [{color: '#6b9a76'}]
      },
      {
        featureType: 'road',
        elementType: 'geometry',
        stylers: [{color: '#38414e'}]
      },
      {
        featureType: 'road',
        elementType: 'geometry.stroke',
        stylers: [{color: '#212a37'}]
      },
      {
        featureType: 'road',
        elementType: 'labels.text.fill',
        stylers: [{color: '#9ca5b3'}]
      },
      {
        featureType: 'road.highway',
        elementType: 'geometry',
        stylers: [{color: '#746855'}]
      },
      {
        featureType: 'road.highway',
        elementType: 'geometry.stroke',
        stylers: [{color: '#1f2835'}]
      },
      {
        featureType: 'road.highway',
        elementType: 'labels.text.fill',
        stylers: [{color: '#f3d19c'}]
      },
      {
        featureType: 'transit',
        elementType: 'geometry',
        stylers: [{color: '#2f3948'}]
      },
      {
        featureType: 'transit.station',
        elementType: 'labels.text.fill',
        stylers: [{color: '#d59563'}]
      },
      {
        featureType: 'water',
        elementType: 'geometry',
        stylers: [{color: '#17263c'}]
      },
      {
        featureType: 'water',
        elementType: 'labels.text.fill',
        stylers: [{color: '#515c6d'}]
      },
      {
        featureType: 'water',
        elementType: 'labels.text.stroke',
        stylers: [{color: '#17263c'}]
      }
    ]
  });

  addLandmark(
    map, 39.443167, -76.616569, 'Baltimore County',
    'Baltimore County is where I was born and raised!')
  addLandmark(
    map, 39.269615, -76.713206, 'Western Tech',
    'I went to high school here and graduated in 2019.')
  addLandmark(
    map, 39.394783, -76.827264, 'Northwest Regional Park',
    'Favorite park to relax or play soccer at.')
  addLandmark(
      map, 38.922274, -77.019653, 'Howard University',
      'I am currently a rising sophomore majoring in Computer Science.')
  addLandmark(
      map, 39.413118, -76.774756, 'Foundry Row',
      'Best spot to get food and hang with friends!');
}

/** Adds a marker that shows an info window when clicked. */
function addLandmark(map, lat, lng, title, description) {
  const marker = new google.maps.Marker(
      {position: {lat: lat, lng: lng}, map: map, title: title});

  const infoWindow = new google.maps.InfoWindow({content: description});
  marker.addListener('click', () => {
    infoWindow.open(map, marker);
  });
}
