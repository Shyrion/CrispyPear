/*
    This file is part of the Crispy Pear's Demo.
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

var Player = function (params) {
    if (params) {
        CPSprite.call(this, params);
    }
        
    this.dx = 0;
    this.dy = 0;


    this.speed = params.speed;
    this.jumpForce = params.jumpForce;
    this.gravity = params.gravity;
    this.friction = params.friction;
    this.hitWall = false;
    this.isJumping = false;
}

Player.inheritsFrom(CPSprite);

Player.prototype.update = function(dt, groundY) {
    
    var contextToRedraw = false;

    if (CPSprite.prototype.update.call(this, dt)) {
        contextToRedraw = this.context;
    }

    if (this.dx > 0.1 || this.dx < -0.1) {
      this.dx *= this.friction;
      contextToRedraw = this.context;
    } else {
      this.dx = 0;
    }

    this.x += this.dx;

    // physics
    if (this.y < groundY){ 
      this.dy += this.gravity*dt;
      this.y += this.dy/(this.hitWall ? 2 : 1);
      contextToRedraw = this.context;
    }

    // Hit the top
    if (this.y < this.height/2) {
      this.y = this.height/2;
      this.dy = 0;
    }

    // Hit walls
    if (this.x < this.width/2) {
        this.x = this.width/2;
        this.dx = 0;
        if (!this.hitWall && this.y != groundY) { // "slide"
            this.dy = 0;
            this.hitWall = true;
        }
        this.isJumping = false;
    }
    if (this.x > CPGame.instance.canvasWidth-this.width/2) {
        this.x = CPGame.instance.canvasWidth-this.width/2;
        this.dx = 0;
        if (!this.hitWall && this.y != groundY) { // "slide"
            this.dy = 0;
            this.hitWall = true;
        }
        this.isJumping = false;
    }

    // Hit the ground
    if (this.y > groundY) {
        this.y = groundY;
        this.dy = 0;
        this.hitWall = false;
        this.isJumping = false;
    }

    return contextToRedraw;
}


Player.prototype.goRight = function (dt) {
    this.flipX = false;
    this.dx += this.speed*dt;
}

Player.prototype.goLeft = function (dt) {
    this.flipX = true;
    this.dx -= this.speed*dt;
}

Player.prototype.jump = function (dt) {
    if (! this.isJumping) {
        this.dy = -this.jumpForce*dt;
        this.y -= 2;
        this.isJumping = true;
    }
}