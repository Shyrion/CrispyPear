Crispy Pear
===========

What is it ?
------------
Crispy Pear is a javascript library to build games using HTML5 canvas. It is designed to be easy to integrate and to use.

It takes its inspirations from frameworks like [Corona SDK](http://www.coronalabs.com/products/corona-sdk/) or [Unity 3D](http://unity3d.com/).


Code Layout
------------
    CrispyPear
    |-- CPDemo
       |-- images 					# Images used for the demo project
       |-- scripts 					# Scripts used for the demo project (not including this lib)
       |-- index.html 				# The main html file
       |-- style.css 				# Some stylesheet
    |-- CPActionCanvas.js			# Responsible for mouse events
    |-- CPButton.js					# Button display object
    |-- CPDisplayGroup.js			# Responsible for actions on grouped object
    |-- CPSceneManager.js			# Responsible for all game loop
    |-- CPImage.js					# Image display object
    |-- CPGame.js					# Globals
    |-- CPDisplayObject.js			# Base display object. Shouldn't be instanciated
    |-- CPSprite.js					# Animated sprite display object
    |-- CPText.js					# Text display object
    |-- CPLayer.js					# Layer (added canvas) that can handle display objects
    |-- CPUtils.js					# Utils method
    |-- CPScene.js					# Scene graph, can handle layers
    |-- CPResourceManager.js		# Responsible for loading resources once (loading callbacks,...)
    |-- CPDebug.js					# Debug methods
    |-- Readme.md 					# This readme
    |-- settings.json 				# Game settings

External tools that can also help you to make games :
-----------------------------------------------------

* The [Spritools](http://jeremy.gabriele.free.fr/SpriteViewer/) enable you to :
> - Check if your spritesheet are running fine
> - Create spritesheets from multiple images
> - Explode a spritesheets in many images (so you can modify the frame that didn't fit nice, and use the tool just before to recreate your spritesheet)