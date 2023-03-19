import * as THREE from 'three';
import './style.css'
import { GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader'
import { CSS2DRenderer, CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer'

//Scene
const scene = new THREE.Scene();
scene.background = new THREE.Color( 0x8c8c8c );

//GLTFLoader
const loader = new GLTFLoader()

loader.load( './assets/desk.gltf', function ( gltf ) {

	scene.add( gltf.scene );
  gltf.scene.position.x = 0.4
  gltf.scene.position.z = -15
} );

//contact redirect
const contact = document.createElement('a')
contact.href = './contact.html'
contact.style.width = '5vw'
contact.style.height = '8vw'
contact.style.backgroundColor = 'transparent'
const contactobj = new CSS2DObject(contact)
contactobj.position.set(-1.08, 2.22, -15)
scene.add(contactobj)

//Sizes | Viewport
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
}

function vw() {
  var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
  var wp = (0.65 * -w * 0.01)
  return wp
}

//Light | Light has color! 0x says that this is hexadecimal ffffff is the hex for white (color, , )
const light = new THREE.PointLight(0xffffff, 1, 100)
light.position.set(0, 2, 9)
light.intensity = 1.25

//Add Light to the Scene
scene.add(light)

//Camera (FOV, aspect ratio x / aspect ratio y, min. range of sight, max. range of sight) keep FOV under 50 because of distortion
const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height, 0.1, 100)
camera.position.z = vw()
camera.position.y = 2.8
scene.add(camera)

//CSS2DRenderer
const htmlRenderer = new CSS2DRenderer()
htmlRenderer.setSize(sizes.width, sizes.height)
htmlRenderer.domElement.style.position = 'absolute'
htmlRenderer.domElement.style.top = '0px'
document.body.appendChild(htmlRenderer.domElement)

//Renderer
const canvas = document.querySelector('.webgl')
const renderer = new THREE.WebGLRenderer({canvas})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(2)
renderer.render(scene, camera)

//Resize
window.addEventListener('resize', () => {
  //Update Sizes
  sizes.width = window.innerWidth
  sizes.height = window.innerHeight

  //Update Camera
  camera.aspect = sizes.width / sizes.height
  camera.updateProjectionMatrix()
  //Update Renderer
  renderer.setSize(sizes.width, sizes.height)
  htmlRenderer.setSize(sizes.width, sizes.height)
})

//Loop
const loop = () => {
  //render
  renderer.render(scene, camera)
  htmlRenderer.render(scene, camera)
  window.requestAnimationFrame(loop)

  camera.position.z = vw()

  document.getElementById('topbar').setAttribute('style', 'background: #070141; z-index: 2; position: absolute; top: 0%; left: 0%; width: ' + sizes.width + 'px; height: 80px;')
}
loop()