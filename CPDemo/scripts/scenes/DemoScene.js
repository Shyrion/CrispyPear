/*
    This file is part of the Crispy Pear Demo.
    Copyright (C) 2011  Jérémy Gabriele, Romaric Pighetti, Wiz

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

var DemoScene = function (params) {

    this.parent.call(this, params);

    this.backgroundLayer = this.addLayer(10);
    this.buttonsLayer = this.addLayer(20);

    var _w = CPGame.instance.canvasWidth;
    var _h = CPGame.instance.canvasHeight;

    // Background
    var bg = new CPImage({
      img: CPResourceManager.instance.getImage("titleBG"),
      x: 0,
      y: 0,
      width: _w,
      height: _h,
    });
    this.backgroundLayer.insert("bg",bg);

    var titleText = new CPText({
        x: _w/2,
        y: 0,
        content: 'Demo',
        anchor: Anchors.TOPCENTER,
        font: '30pt BeautifulEveryTime',
        color: 'rgb(255, 0, 0)'
    },this);
    this.backgroundLayer.insert("titleText",titleText);
    
    //this.timers.transitionManager.add(this.objects.titleText, {time:2000, x:0});
    
    var baseY = 70;
    var i = 0;
    var allButtons = [
    {
        title: "Bases",
        id:    "basicsButton",
        scene: "BasicsScene"
    },
    {
        title: "Sprite animé",
        id:    "animatedSpriteButton",
        scene: "SpritesheetScene"
    },{
        title: "Jeu",
        id:    "gameButton",
        scene: "GameScene"
    }]

    allButtons.each(function(buttonInfo) {
        function onClick() {
            this.sceneManager.setScene(buttonInfo.scene);
        }
        var button = new CPButton({
            x: _w/6+((i%3)*_w/3),
            y: baseY,
            width: 140,
            height: 50,

            text: buttonInfo.title,
            buttonNormal: CPResourceManager.instance.getImage("playButton"),
            buttonOver: CPResourceManager.instance.getImage("playButton_over"),
            buttonTouched: CPResourceManager.instance.getImage("playButton_touched"),
            font: '14pt Courier',
            // bgColor: 'lightblue',
            // strokeColor: 'blue',
            // bgColorOver: 'lightgreen',
            // strokeColorOver: 'green',
            // bgColorTouched: 'lightpink',
            // strokeColorTouched: 'red',
            // strokeWidth: 0,

            onClick: onClick.bind(this)
        })
        button.x -= button.width/2;
        this.buttonsLayer.insert("button"+i, button);

        if (!(++i%3)) {
            baseY += button.height + 20;
        }
    }.bind(this));

    _w = _h = null;
}
  
DemoScene.inheritsFrom(CPScene);

DemoScene.prototype.free = function () {
    console.log("free");
}