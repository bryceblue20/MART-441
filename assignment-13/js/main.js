var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
var sphere, sphere2;
var modelObject;
// create the first box
function createEarth() {
  // create a box
  var geometry = new THREE.SphereGeometry();
  var material = new THREE.MeshBasicMaterial({
    color:  0x1234ee
  });
  sphere = new THREE.Mesh(geometry, material);
  sphere.position.set(50, 0, -30);
  scene.add(sphere);
  sphere.scale.x = 40; // SCALE
  sphere.scale.y = 40; // SCALE
  sphere.scale.z = 40; // SCALE


  animate();
}

// animate the first box
function animate() {
  requestAnimationFrame(animate);
  sphere.rotation.z += 0.01;
  createMoon();
  renderer.render(scene, camera);

}


function createMoon() {

  var geometry = new THREE.SphereGeometry();
  var material = new THREE.MeshBasicMaterial({
    color: 0xaaaaaa
  });
  sphere2 = new THREE.Mesh(geometry, material);
  sphere2.position.set(2, 0,2);
  sphere.add(sphere2);
  sphere2.scale.x = .4; 
  sphere2.scale.y = .4; 
  sphere2.scale.z = .4; 
 
}

//for Snowman
function getMainScene() {
  var scene = new THREE.Scene();
  scene.background = new THREE.Color(0x000000);
  return scene;
}

function getTheCamera() {
  var aspectRatio = window.innerWidth / window.innerHeight;
  var camera = new THREE.PerspectiveCamera(75, aspectRatio, 0.1, 1000);
  camera.position.set(0, 90, -10);
  return camera;
}

function getPointLight(scene) {
  var light = new THREE.PointLight(0xffffff, 1, 0);
  light.position.set(20, 80, 20);
  scene.add(light);

  return light;
}

function getRendererDevice() {
  var renderer = new THREE.WebGLRenderer({
    antialias: true
  });
  
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);
  return renderer;
}


function getTheControls(camera, renderer) {
  var controls = new THREE.TrackballControls(camera, renderer.domElement);
  controls.zoomSpeed = 0.4;
  controls.panSpeed = 0.4;
  return controls;
}


function loadTheModel() {
  loader = new THREE.OBJLoader();
  loader.load('models/snowman.obj', function (object) {
    object.rotation.z = Math.PI;
    modelObject = object;
    scene.add(object);
    object.scale.x = 7; 
    object.scale.y = 7; 
    object.scale.z = 7;
    object.position.set(-60, 0,-60);
  
    animateModel();
  });
}

function animateModel() {
  requestAnimationFrame(animateModel);
 
  modelObject.rotation.z += 0.04;
}


function render() {
  requestAnimationFrame(render);
  renderer.render(scene, camera);
  controls.update();
};

var scene = getMainScene();
var camera = getTheCamera();
var light = getPointLight(scene);
var renderer = getRendererDevice();
var controls = getTheControls(camera, renderer);
var game1 = createEarth();


loadTheModel()

render();
