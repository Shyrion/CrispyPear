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

var GameScene = function (params) {

	this.parent.call(this, params);

	this.move = {};
	this.allPlatforms = [];

	// characters
	this.player = null;

	// displayGroup
	this.ennemyGroup = null;

	// Conf
	this.gravity = 30;
	this.characterSpeed = 22;
	this.characterJump = 600;
	this.friction = 0.97;
	this.groundY = 400;

	// Layers
	this.backgroundLayer = this.addLayer(1);
	this.characterLayer = this.addLayer(2);
	this.foregroundLayer = this.addLayer(3);
	this.buttonsLayer = this.addLayer(4);

	// Misc
	this.buttons = {};

	var _w = CPGame.instance.canvasWidth;
	var _h = CPGame.instance.canvasHeight;

	// shortcut
	var res = CPResourceManager.instance;

	// Character
	this.player = new Player({
		x: 200,
		y: 220,
		width: 100,
		height: 100,
		anchor: Anchors.CENTER,
		speed: this.characterSpeed,
		jumpForce: this.characterJump,
		gravity: this.gravity,
		friction: this.friction
	});

	this.groundY = _h-this.player.height/2;

	this.player.add({
		sequenceName: "breath",
		spriteSheet: res.getImage("nocBreathSprite"),
		totalFrame: 4,
		offset: 0,
		framePerSecond: 1,
		scale: 0.5,
		frameSize: {w:400, h:400}
	});
	this.player.add({
		sequenceName: "run",
		spriteSheet: res.getImage("nocRunSprite"),
		totalFrame: 20,
		offset: 0,
		framePerSecond: 30,
		scale: 0.5,
		frameSize: {w:400, h:400}
	});
	this.player.add({
		sequenceName: "kirby",
		spriteSheet: res.getImage("nocKirby"),
		totalFrame: 4,
		offset: 0,
		framePerSecond: 4,
		frameSize: {w:100, h:100}
	});

	this.player.start('kirby');
	this.characterLayer.insert("player", this.player);

	// Backgrounds and Foregrounds
	var bg = new CPImage({
		img: res.getImage("bg"),
		x: 0,
		y: 0,
		width: _w,
		height: _h,
		canvas: this.backgroundLayer.canvas
	});
	this.backgroundLayer.insert("bg",bg);
	bg = null;

	var middlebg = new CPImage({
		img: res.getImage("middlebg"),
		x: 0,
		y: 100,
		width: _w,
		height: _h,
		canvas: this.backgroundLayer.canvas
	});
	this.backgroundLayer.insert("middlebg",middlebg);
	middlebg = null;

	var middlefront = new CPImage({
		img: res.getImage("middlefront"),
		x: 0,
		y: 220,
		width: _w,
		height: _h,
		canvas: this.backgroundLayer.canvas
	});
	this.backgroundLayer.insert("middlefront",middlefront);
	middlefront = null;

	var front = new CPImage({
		img: res.getImage("front"),
		x: 0,
		y: 100,
		width: _w,
		height: _h,
		canvas: this.foregroundLayer.canvas
	});
	this.foregroundLayer.insert("front",front);
	front = null;

	// Monsters
	// ennemyGroup = new DisplayGroup();

	// var monster1 = new CPImage({
	//   img: res.getImage("monster"),
	//   x: 150,
	//   y: 150,
	//   width: 50,
	//   height: 50,
	//   canvas: this.characterLayer.canvas
	// });
	// ennemyGroup.insert("monster1",monster1);

	// var monster2 = new CPImage({
	//   img: res.getImage("monster"),
	//   x: 120,
	//   y: 120,
	//   width: 20,
	//   height: 20,
	//   canvas: this.characterLayer.canvas
	// });
	// ennemyGroup.insert("monster2",monster2);

	// var monster3 = new CPImage({
	//   img: res.getImage("monster"),
	//   x: 180,
	//   y: 120,
	//   width: 20,
	//   height: 20,
	//   canvas: this.characterLayer.canvas
	// });
	// ennemyGroup.insert("monster3",monster3);

	// this.characterLayer.insert("ennemyGroup", ennemyGroup);
	// ennemyGroup.x = 200;

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

	// Web socket
	// ws.addCallbackForMessageType("charactermove", this.onWSMessage.bind(this));

	this.buttons.right = false;
	this.buttons.left = false;
	this.buttons.up = false;
	this.buttons.bottom = false;
}

GameScene.inheritsFrom(CPScene);

GameScene.prototype.free = function () {
	console.log("free game scene");
}

GameScene.prototype.update = function (dt) {
	CPScene.prototype.update.call(this,dt);

	// Buttons
	if (this.buttons.right) {
		this.player.goRight(dt);
	}

	if (this.buttons.left) {
		this.player.goLeft(dt);
	}

	if (this.buttons.up) {
		if (!this.player.isJumping) {
			this.player.jump(dt);
		}
	}

	if (this.player.update(dt, this.groundY)) {
		this.player.needsRedraw();
	}

	/*if (this.physics.started)
	if (this.physics.update(dt)) // true if something changed
	this.sceneManager.invalidate();
	*/
}

// onWSMessage: function onWSMessage(message){
//   console.log(message.content);
//   this.player.x += message.content.x;
// },

GameScene.prototype.keyDown = function (event) {
	var weDidNothing = true;
	
	if (event.key == 'esc') {
		// this.sceneManager.setScene(new SceneTitle());
		return false;
	}
	
	if (event.key == 'up') {
		this.buttons.up = true;
		//this.objects.hero.active = 50;
		//this.physics.applyForce(this.objects.hero, {x:0, y: -10});
		weDidNothing = false;
	}
	
	if (event.key == 'down') {
		this.buttons.down = true;
		//this.move.down = true;
		//this.physics.log(this.physics.world.principalBody);
		weDidNothing = false;
	}
	
	if (event.key == 'left') {
		this.buttons.left = true;

		//this.move.left = true;
		//this.physics.start();

		weDidNothing = false;
	}
	
	if (event.key == 'right') {
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

GameScene.prototype.keyUp = function (event) {

	var weDidNothing = true;

	if (event.key == 'up') {
		this.buttons.up = false;
		weDidNothing = false;
	}

	if (event.key == 'down') {
		this.buttons.down = false;
		weDidNothing = false;
	}

	if (event.key == 'left') {
		this.buttons.left = false;
		weDidNothing = false;
	}
	
	if (event.key == 'right') {
		this.buttons.right = false;
		weDidNothing = false;
	}

	return weDidNothing;
}