function Cube (name) {

	if (typeof cubes === 'undefined') cubes = [];

	this.id = cubes.length;
	this.name = name;
	this.div = document.getElementById(name);
	cubes.push(this);
	this.init();
}

Cube.prototype = {

	init: function () {
		this.createTimeline();
		this.createRenderer();
		this.createCamera();
		this.createScene();
		this.createObject();
		this.animate();
		this.animation();
		window.addEventListener('resize', this.onWindowResize, false);
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
		for (var i=0; i<cubes.length; i++){
			cubes[i].camera.aspect = cubes[i].div.clientWidth / cubes[i].div.clientHeight;
			cubes[i].camera.updateProjectionMatrix();
			cubes[i].renderer.setSize( cubes[i].div.clientWidth, cubes[i].div.clientHeight );
		}
	},

	animate: function () {
		requestAnimationFrame( cubes[0].animate );

		for (var i=0; i<cubes.length; i++){
			cubes[i].mesh.rotation.x += 0.005;
			cubes[i].mesh.rotation.y += 0.01;
			cubes[i].renderer.render( cubes[i].scene, cubes[i].camera );
		}
	},

	animation: function () {
		this.timeLine.to(this.mesh.position, 1, { x: 300, y: 170, z: -180, ease:Strong.easeInOut, onComplete: this.reverseAnimation, onCompleteParams: [this] } );
	},

	reverseAnimation: function (self) {
		self.timeLine.reverse();
	}
};