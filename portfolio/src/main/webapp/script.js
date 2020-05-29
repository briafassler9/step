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


function randomPepperImage(){
    const imageIndex1 = Math.floor(Math.random() * 5) + 1;
    const imageUrl = 'PepperImages/Pepper' + imageIndex1 + '.jpg';
    const imageElement = document.createElement('img');
    imageElement.src = imageUrl;
    const imageRemover1 = document.getElementById('random-image-container');
  // Remove the previous image.
  imageRemover1.innerHTML = '';
  imageRemover1.appendChild(imageElement);

}

function randomGingerImage(){
    const imageIndex2 = Math.floor(Math.random() * 5) + 1;
    const imageUrl = 'GingerImages/Ginger' + imageIndex2 + '.jpg';
    const imageElement = document.createElement('img');
    imageElement.src = imageUrl;
    const imageRemover2 = document.getElementById('random-image-container');
  imageRemover2.innerHTML = '';
  imageRemover2.appendChild(imageElement);

}



