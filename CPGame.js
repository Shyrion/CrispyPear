/*
    Copyright (C) 2011  Jérémy Gabriele

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

CPGame = function () {

    this.canvasWidth = 480;
    this.canvasHeight = 320;

    this.firstSceneName = 'DemoScene';

    // this.transitionManager = new CPTransitionManager();

    var onResourcesLoaded = function() {
        console.log('Resources loaded !');
        this.startGame(this.firstSceneName);
    }.bind(this)
    var onResourcesProgress = function(progress) {
        // console.log(progress + '%');
    }

    var allImages = [
      { imageName: "titleBG", imagePath: "images/bg.png" },

      { imageName: "bg", imagePath: 'images/bg.png' },
      { imageName: "front", imagePath: 'images/front.png' },
      { imageName: "middlebg", imagePath: 'images/middlebg.png' },
      { imageName: "middlefront", imagePath: 'images/middlefront.png' },
      { imageName: "nocBreathSprite", imagePath: 'images/nocBreathSprite.png' },
      { imageName: "nocBreathSprite2", imagePath: 'images/nocBreathSprite2.png' },
      { imageName: "nocRunSprite", imagePath: 'images/nocRunSprite.png' },
      { imageName: "nocKirby", imagePath: 'images/nocKirby.png' },
      { imageName: "selector", imagePath: 'images/selector.png' },
      { imageName: "hero", imagePath: 'images/hero.png' },
      { imageName: "monster", imagePath: 'images/monster.png' },
      { imageName: "playButton", imagePath: 'images/buttons/playButton.png' },
      { imageName: "playButton_over", imagePath: 'images/buttons/playButton_over.png' },
      { imageName: "playButton_touched", imagePath: 'images/buttons/playButton_touched.png' },
      { imageName: "topArrow", imagePath: 'images/icons/topArrow.png' },
      { imageName: "bottomArrow", imagePath: 'images/icons/bottomArrow.png' },
      { imageName: "leftArrow", imagePath: 'images/icons/leftArrow.png' },
      { imageName: "rightArrow", imagePath: 'images/icons/rightArrow.png' }
    ];

    CPResourceManager.instance.init(allImages, onResourcesLoaded,
      onResourcesProgress);

    CPResourceManager.instance.startLoading();

    if (window.XMLHttpRequest) {
        // request = new XMLHttpRequest();
        // request.open("GET", "settings.json", true);
    } else {
        console.error("No XMLHttpRequest available :/.")
    }
}

/*
    Singleton instance
*/
CPGame.defineSingleton();
CPGame.instance;

CPGame.prototype.startGame = function (firstSceneName) {
    if (firstSceneName) {
      CPSceneManager.instance.setScene(firstSceneName);
    }
    else
        console.error("No first scene given");
}