var globalCounter = 0;
var globalArray = [];

function Cube ( name ) {
	this.id = globalCounter;
	this.name = name;
	this.div = document.getElementById(this.name);
	globalArray.push(this);
	this.init();
	globalCounter++;
}

Cube.prototype = {

	init: function () {
		this.createTimeline();
		this.createRenderer();
		this.createCamera();
		this.createScene();
		this.createObject();
		this.animate();
		this.tween();
		window.addEventListener( 'resize', this.onWindowResize, false );
	},

	createTimeline: function () {
		this.timeLine = new TimelineLite();
	},

	createRenderer: function () {
		this.renderer = new THREE.WebGLRenderer();
		this.renderer.setSize( this.div.clientWidth, this.div.clientHeight );
		this.div.appendChild( this.renderer.domElement );
	},

	createCamera: function () {
		this.camera = new THREE.PerspectiveCamera( 70, this.div.clientWidth / this.div.clientHeight, 1, 1000 );
		this.camera.position.z = 400;
	},

	createScene: function () {
		this.scene = new THREE.Scene();
	},

	createObject: function () {
		var geometry = new THREE.CubeGeometry( 200, 200, 200 );
		var texture = THREE.ImageUtils.loadTexture( 'images/crate.gif' );
		texture.anisotropy = this.renderer.getMaxAnisotropy();
		var material = new THREE.MeshBasicMaterial( { map: texture } );

		this.mesh = new THREE.Mesh( geometry, material );
		this.scene.add( this.mesh );
	},
	
	onWindowResize: function () {
		for ( var i=0; i<globalCounter; i++ ) {
			globalArray[i].camera.aspect = globalArray[i].div.clientWidth / globalArray[i].div.clientHeight;
			globalArray[i].camera.updateProjectionMatrix();
			globalArray[i].renderer.setSize( globalArray[i].div.clientWidth, globalArray[i].div.clientHeight );
		}
	},

	animate: function () {
		requestAnimationFrame( globalArray[0].animate );

		for ( var i=0; i<globalCounter; i++ ) {
			globalArray[i].mesh.rotation.x += 0.005;
			globalArray[i].mesh.rotation.y += 0.01;
			globalArray[i].renderer.render( globalArray[i].scene, globalArray[i].camera );
		}
	},

	tween: function () {
		this.timeLine.to(this.mesh.position, 1, { x: 300, y: 170, z: -180, ease:Strong.easeInOut, onComplete: this.reverseAnimation, onCompleteParams: [this] } );
	},

	reverseAnimation: function (self) {
		self.timeLine.reverse();
	}
};