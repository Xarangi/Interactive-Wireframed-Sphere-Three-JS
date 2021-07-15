import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'
import { PointLightHelper } from 'three'

const textureloader = new THREE.TextureLoader()
const normaltexture = textureloader.load('/textures/normalmap.png')
// Debug
//const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Objects
const geometry = new THREE.IcosahedronBufferGeometry(1,1)

// Materials

const material = new THREE.MeshStandardMaterial()
material.normalMap = normaltexture
material.color = new THREE.Color(0x340143)
material.roughness=0
material.metalness=0
material.wireframe=true

// Mesh
const sphere = new THREE.Mesh(geometry,material)
scene.add(sphere)

// Lights

const pointLight2 = new THREE.PointLight(0xffffff, 0.1)
pointLight2.position.set(1.26,-0.41,0.5)
pointLight2.intensity = 2.15

scene.add(pointLight2)

const pointLight = new THREE.PointLight(0xff0000, 3)
pointLight.position.x = 2
pointLight.position.y = 3
pointLight.position.z = 4

scene.add(pointLight)


// gui.add(pointLight2.position,'y').min(-3).max(3).step(0.01)
// gui.add(pointLight2.position,'x').min(-6).max(6).step(0.01)
// gui.add(pointLight2.position,'z').min(-3).max(3).step(0.01)
// gui.add(pointLight2,'intensity').min(0).max(10).step(0.01)
// const pointlighthelper = new THREE.PointLightHelper(pointLight2,1)
// scene.add(pointlighthelper)

const pointLight3 = new THREE.PointLight(0xff0000, 2)
pointLight3.position.x = -1.34
pointLight3.position.y = 0.9
pointLight3.position.z = 0.11

scene.add(pointLight3)


// gui.add(pointLight3.position,'y').min(-3).max(3).step(0.01)
// gui.add(pointLight3.position,'x').min(-6).max(6).step(0.01)
// gui.add(pointLight3.position,'z').min(-3).max(3).step(0.01)
// gui.add(pointLight3,'intensity').min(0).max(10).step(0.01)
// const pointlighthelper3 = new THREE.PointLightHelper(pointLight3,1)
// scene.add(pointlighthelper3)
/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})
const updateSphere= (event) => {
    sphere.position.z =window.scrollY*0.01
    sphere.position.y =window.scrollY*0.005
}
window.addEventListener('scroll', updateSphere);

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 0
camera.position.y = 0
camera.position.z = 2
scene.add(camera)

// Controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha:true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */

document.addEventListener('mousemove', onDocumentMouseMove)
let mouseX=0;
let mouseY=0;
let targetX=0;
let targetY=0;
const windowHalfX = window.innerWidth/2;
const windowHalfY = window.innerHeight/2;

function onDocumentMouseMove(event) {
    mouseX = (event.clientX - windowHalfX)
    mouseY = (event.clientY - windowHalfY)
}
const clock = new THREE.Clock()

const tick = () =>
{
    targetX= mouseX * 0.001
    targetY= mouseY * 0.001
    const elapsedTime = clock.getElapsedTime()

    // Update objects
    sphere.rotation.y = .5 * elapsedTime
    sphere.rotation.y += .5 * (targetX - sphere.rotation.y)
    sphere.rotation.x += .5 * (targetY - sphere.rotation.x)
    sphere.position.z += .5 * (targetY - sphere.rotation.x)

    // Update Orbital Controls
    // controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()