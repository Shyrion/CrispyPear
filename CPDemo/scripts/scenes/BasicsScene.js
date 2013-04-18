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

var BasicsScene = function (params) {

	this.parent.call(this, params);

	// Layers
	this.staticLayer = this.addLayer(1);
	this.animatedLayer = this.addLayer(2);
	this.buttonsLayer = this.addLayer(4);

	// Misc
	this.buttons = {};

	var _w = CPGame.instance.canvasWidth;
	var _h = CPGame.instance.canvasHeight;

	// shortcut
	var res = CPResourceManager.instance;

	var i = 0;

	var posX = posY = 0;

	var presentationText = "haha";

	function objectPresentation(name, id, pos, pThis) {
		presentationText = new CPText({
			x: pos.x,
			y: pos.y,
			content: name,
			anchor: Anchors.BOTTOMCENTER,
			font: '14pt BeautifulEveryTime',
			color: 'black'
		});
		pThis.staticLayer.insert(id, presentationText);
	}

	//=================================//
	//============ CPImage ============//
	//=================================//

	posX = 140;
	posY = 30;

	cpimage = new CPImage({
		x: posX,
		y: posY+15,
		width: 50,
		height: 50,
		anchor: Anchors.TOPCENTER,
		img: res.getImage('hero')
	});
	this.staticLayer.insert("cpimage", cpimage);

	objectPresentation('CPImage', 'cpimagetext', {x: posX, y:posY}, this);

	//=================================//
	//============ CPSprite ===========//
	//=================================//

	posX = 240;
	posY = 30;

	// Create the sprite
	var animatedSprite = new CPSprite({
		x: posX,
		y: posY,
		width: 100,
		height: 100,
		anchor: Anchors.TOPCENTER
	});

	animatedSprite.add({
		sequenceName: 'spriteSequence',
		spriteSheet: res.getImage('nocKirby'),
		totalFrame: 4,
		offset: 0,
		framePerSecond: 8,
		// scale: 100/300,
		frameSize: {w:100, h:100}
	});
	animatedSprite.start('spriteSequence');
	this.animatedLayer.insert("animatedSprite", animatedSprite);

	objectPresentation('CPSprite', 'cpspritetext', {x: posX, y:posY}, this);


	//=================================//
	//========= CPDisplayGroup ========//
	//=================================//

	posX = 360;
	posY = 38;

	var cpdisplaygroup = new CPDisplayGroup();

	cpimage = new CPImage({
		x: 0,
		y: posY,
		width: 30,
		height: 30,
		anchor: Anchors.TOPRIGHT,
		img: res.getImage('hero')
	});
	cpdisplaygroup.insert("cpimagegroup1", cpimage);
	this.staticLayer.insert("cpimagegroup1", cpimage);

	cpimage = new CPImage({
		x: 0,
		y: posY,
		width: 30,
		height: 30,
		anchor: Anchors.BOTTOMCENTER,
		img: res.getImage('hero')
	});
	cpdisplaygroup.insert("cpimagegroup2", cpimage);
	this.staticLayer.insert("cpimagegroup2", cpimage);

	cpimage = new CPImage({
		x: 0,
		y: posY,
		width: 30,
		height: 30,
		anchor: Anchors.TOPLEFT,
		img: res.getImage('hero')
	});
	cpdisplaygroup.insert("cpimagegroup3", cpimage);
	this.staticLayer.insert("cpimagegroup3", cpimage);

	cpdisplaygroup.x = posX;
	cpdisplaygroup.y = posY;

	objectPresentation('CPDisplayGroup', 'cpgrouptext', {x: posX, y:posY-8}, this);


	//=================================//
	//============ CPButton ===========//
	//=================================//

	posX = 50;
	posY = 150;

	function onButton() {
		console.log("onButton");
	}
	var cpbutton = new CPButton({
		x: posX,
		y: posY,
		width: 50,
		height: 50,
        anchor: Anchors.TOPCENTER,

		text: "",
		buttonNormal: CPResourceManager.instance.getImage("hero"),
		buttonOver: CPResourceManager.instance.getImage("selector"),
		buttonTouched: CPResourceManager.instance.getImage("monster")
	});
	this.staticLayer.insert("cpbutton", cpbutton);

	objectPresentation('CPButton', 'cpbuttontext', {x: posX, y:posY}, this);


	//=================================//
	//============ CPLayer ===========//
	//=================================//

	posX = 150;
	posY = 150;

	this.bottomLayer = this.addLayer(5);
	this.middleLayer = this.addLayer(6);
	this.topLayer = this.addLayer(7);

	cpimage = new CPImage({
		x: posX,
		y: posY,
		width: 40,
		height: 40,
		anchor: Anchors.TOPCENTER,
		img: res.getImage('hero')
	});
	this.middleLayer.insert("cpimagebottom", cpimage);

	cpimage = new CPImage({
		x: posX+20,
		y: posY+20,
		width: 40,
		height: 40,
		anchor: Anchors.TOPCENTER,
		img: res.getImage('monster')
	});
	this.topLayer.insert("cpimagemiddle", cpimage);

	cpimage = new CPImage({
		x: posX-20,
		y: posY+20,
		width: 40,
		height: 40,
		anchor: Anchors.TOPCENTER,
		img: res.getImage('hero')
	});
	this.bottomLayer.insert("cpimagetop", cpimage);

	objectPresentation('CPLayer', 'cplayertext', {x: posX, y:posY}, this);


	//=================================//
	//=========== Back Button =========//
	//=================================//


	function onBack() {
		this.sceneManager.setScene("DemoScene");
	}
	var backButton = new CPButton({
		x: 10,
		y: 10,
		width: 70,
		height: 27,

		text: "Retour",
		buttonNormal: CPResourceManager.instance.getImage("playButton"),
		buttonOver: CPResourceManager.instance.getImage("playButton_over"),
		buttonTouched: CPResourceManager.instance.getImage("playButton_touched"),
		font: '12pt Courier',
		// bgColor: 'lightblue',
		// strokeColor: 'blue',
		// bgColorOver: 'lightgreen',
		// strokeColorOver: 'green',
		// bgColorTouched: 'lightpink',
		// strokeColorTouched: 'red',
		// strokeWidth: 0,

		onClick: onBack.bind(this)
	})
	this.buttonsLayer.insert("backButton", backButton);
	backButton = null;
}

BasicsScene.inheritsFrom(CPScene);

BasicsScene.prototype.free = function () {
	console.log("free game scene");
}

// BasicsScene.prototype.update = function (dt) {
// 	CPScene.prototype.update.call(this,dt);
// }

// BasicsScene.prototype.render = function (ctxList) {
// 	CPScene.prototype.render.call(this,ctxList);
// }

BasicsScene.prototype.keyDown = function (event) {
	var weDidNothing = true;
	
	if (event.key == 'esc') {
		this.sceneManager.setScene('DemoScene');
		return false;
	}
	
	if (event.key == 'up') {
		this.addXSprites(10);
		weDidNothing = false;
	}
	
	if (event.key == 'down') {
		this.removeXSprites(10);
		weDidNothing = false;
	}
	
	if (event.key == 'left') {
		this.removeXSprites(1);
		weDidNothing = false;
	}
	
	if (event.key == 'right') {
		this.addXSprites(1);
		this.buttons.right = true;

		//this.move.right = true;
		//this.physics.stop();
		//console.log(this.displayGroup.get("dg2").get("noc"));
		// var action = {
		//   character: 2,
		//   x: 10
		// };
		// ws.sendMessage("charactermove", action);
		weDidNothing = false;
	}

	return weDidNothing;
}