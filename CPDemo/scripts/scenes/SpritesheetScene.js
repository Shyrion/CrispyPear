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

var SpritesheetScene = function (params) {

	this.parent.call(this, params);

	// Layers
	this.mainLayer = this.addLayer(1);
	this.buttonsLayer = this.addLayer(4);

	// Misc
	this.buttons = {};

	var _w = CPGame.instance.canvasWidth;
	var _h = CPGame.instance.canvasHeight;

	// shortcut
	var res = CPResourceManager.instance;

	var i = 0;

	this.addAnimatedSprite = function (){
		var posX = Math.random()*(_w-100);
		var posY = Math.random()*(_h-100);

		var newSprite = new CPSprite({
			x: posX,
			y: posY,
			width: 100,
			height: 100,
			anchor: Anchors.TOPLEFT,
			canvas: this.mainLayer.canvas
		});

		newSprite.add({
			sequenceName: 'kirby',
			spriteSheet: res.getImage('nocKirby'),
			totalFrame: 4,
			offset: 0,
			framePerSecond: 8,
			// scale: 100/300,
			frameSize: {w:100, h:100}
		});

		newSprite.start('kirby');
		this.mainLayer.insert("sprite"+i++, newSprite);

		this.numberOfSpriteText.content = i + " sprites";
	}

	this.addXSprites = function(x) {
		for (var k=0; k<x; k++) {
			this.addAnimatedSprite();
		}
	}

	this.removeXSprites = function(x) {
		for (var k=0; k<x; k++) {
			if (i<=0) return;
			--i;
			console.log(i);
			this.mainLayer.remove("sprite"+i);
		}
		this.numberOfSpriteText.content = i + " sprites";
	}

	// this.player.add({
	// 	sequenceName: "breath",
	// 	spriteSheet: res.getImage("nocBreathSprite"),
	// 	totalFrame: 4,
	// 	offset: 0,
	// 	framePerSecond: 1,
	// 	scale: 0.5,
	// 	frameSize: {w:400, h:400}
	// });
	// this.player.add({
	// 	sequenceName: "run",
	// 	spriteSheet: res.getImage("nocRunSprite"),
	// 	totalFrame: 20,
	// 	offset: 0,
	// 	framePerSecond: 30,
	// 	scale: 0.5,
	// 	frameSize: {w:400, h:400}
	// });
	// this.player.add({
	// 	sequenceName: "kirby",
	// 	spriteSheet: res.getImage("nocKirby"),
	// 	totalFrame: 4,
	// 	offset: 0,
	// 	framePerSecond: 4,
	// 	scale: 100/300,
	// 	frameSize: {w:300, h:300}
	// });

	// Text
	this.numberOfSpriteText = new CPText({
		x: _w,
		y: _h,
		anchor: Anchors.BOTTOMRIGHT,
		font: '20pt BeautifulEveryTime',
		color: 'white',
		backgroundColor: 'rgba(0,0,0,0.6)'
	});
	this.buttonsLayer.insert("numberOfSpriteText", this.numberOfSpriteText);

	this.fpsText = new CPText({
		x: _w,
		y: _h-36,
		anchor: Anchors.BOTTOMRIGHT,
		font: this.numberOfSpriteText.font,
		color: this.numberOfSpriteText.color,
		backgroundColor: this.numberOfSpriteText.backgroundColor
	});
	this.buttonsLayer.insert("fpsText", this.fpsText);

	// Controls info
	this.controlsGroup = new CPDisplayGroup();
	var controlX=0;
	var controlY=0;

	var controlText = new CPText({
		x: controlX,
		y: controlY,
		anchor: Anchors.TOPLEFT,
		font: this.numberOfSpriteText.font,
		color: this.numberOfSpriteText.color,
		// backgroundColor: 'rgba(255,0,0,1)',
		content: '   +10 sprites'
	});
	this.buttonsLayer.insert("topControlText", controlText);
	this.controlsGroup.insert("topControlText", controlText);
	var controlImage = new CPImage({
		x: controlX+10,
		y: controlY+controlText.height/2,
		width: 20,
		height: 20,
		anchor: Anchors.CENTERLEFT,
		img: res.getImage('topArrow')
	});
	this.buttonsLayer.insert("topControlImage", controlImage);
	this.controlsGroup.insert("topControlImage", controlImage);

	controlY += 30;
	controlText = new CPText({
		x: controlX,
		y: controlY,
		anchor: Anchors.TOPLEFT,
		font: this.numberOfSpriteText.font,
		color: this.numberOfSpriteText.color,
		content: '   +1 sprite'
	});
	this.buttonsLayer.insert("rightControlText", controlText);
	this.controlsGroup.insert("rightControlText", controlText);
	controlImage = new CPImage({
		x: controlX+10,
		y: controlY+controlText.height/2,
		width: 20,
		height: 20,
		anchor: Anchors.CENTERLEFT,
		img: res.getImage('rightArrow')
	});
	this.buttonsLayer.insert("rightControlImage", controlImage);
	this.controlsGroup.insert("rightControlImage", controlImage);

	controlY += 30;
	controlText = new CPText({
		x: controlX,
		y: controlY,
		anchor: Anchors.TOPLEFT,
		font: this.numberOfSpriteText.font,
		color: this.numberOfSpriteText.color,
		content: '   -10 sprites'
	});
	this.buttonsLayer.insert("bottomControlText", controlText);
	this.controlsGroup.insert("bottomControlText", controlText);
	controlImage = new CPImage({
		x: controlX+10,
		y: controlY+controlText.height/2,
		width: 20,
		height: 20,
		anchor: Anchors.CENTERLEFT,
		img: res.getImage('bottomArrow')
	});
	this.buttonsLayer.insert("bottomControlImage", controlImage);
	this.controlsGroup.insert("bottomControlImage", controlImage);

	controlY += 30;
	controlText = new CPText({
		x: controlX,
		y: controlY,
		anchor: Anchors.TOPLEFT,
		font: this.numberOfSpriteText.font,
		color: this.numberOfSpriteText.color,
		content: '   -1 sprite'
	});
	this.buttonsLayer.insert("leftControlText", controlText);
	this.controlsGroup.insert("leftControlText", controlText);
	controlImage = new CPImage({
		x: controlX+10,
		y: controlY+controlText.height/2,
		width: 20,
		height: 20,
		anchor: Anchors.CENTERLEFT,
		img: res.getImage('leftArrow')
	});
	this.buttonsLayer.insert("leftControlImage", controlImage);
	this.controlsGroup.insert("leftControlImage", controlImage);

	// Back button
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


	// Groups

	this.controlsGroup.x = 0;
	this.controlsGroup.y = 195;

	this.controlsGroupBox = {
		minX:this.controlsGroup._boxMinX,
		minY:this.controlsGroup._boxMinY,
		maxX:this.controlsGroup._boxMaxX,
		maxY:this.controlsGroup._boxMaxY
	};

	this.addXSprites(1);
}

SpritesheetScene.inheritsFrom(CPScene);

SpritesheetScene.prototype.free = function () {
	console.log("free game scene");
}

SpritesheetScene.prototype.update = function (dt) {
	CPScene.prototype.update.call(this,dt);

	this.fpsText.content = '~' + Math.round(CPGame.instance.fps/3)*3 + ' fps';
}

SpritesheetScene.prototype.render = function (ctxList) {
    this.buttonsLayer.context.beginPath();
    this.buttonsLayer.context.rect(
    	this.controlsGroupBox.minX+this.controlsGroup.x,
    	this.controlsGroupBox.minY+this.controlsGroup.y,
    	this.controlsGroupBox.maxX-this.controlsGroupBox.minX+10,
    	this.controlsGroupBox.maxY-this.controlsGroupBox.minY);

    	// controlsGroup.width, controlsGroup.height);
    this.buttonsLayer.context.fillStyle = 'rgba(0,0,0,0.6)';
    this.buttonsLayer.context.fill();

	CPScene.prototype.render.call(this,ctxList);
}

SpritesheetScene.prototype.keyDown = function (event) {
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