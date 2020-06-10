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
