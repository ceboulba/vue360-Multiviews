import './style.css'
import * as BABYLON from 'babylonjs'
const canvas = document.getElementById('renderCanvas')
var img = 'https://res.cloudinary.com/archipicture/image/upload/v1557355560/ca_pano.jpg'
var imgs = [
  '00',
  '01',
  '02',
  "03"
]

const btnPrev = document.getElementById('btnPrev')
const btnNext = document.getElementById('btnNext')

let num = 0

const next = () => {
  num++;
  console.log('coucou next')
  console.log(num)
}

const prev = () => {
  num--;
  console.log('coucou previous')
  console.log(num)
}

btnNext.onclick = function(){
  next()
}
btnPrev.onclick = function(){
  prev()
}

var engine = new BABYLON.Engine(canvas, true)

var createScene = function() {
  var scene = new BABYLON.Scene(engine)
  var camera = new BABYLON.ArcRotateCamera(
    'Camera',
    -Math.PI / 2,
    Math.PI / 2,
    0.5,
    BABYLON.Vector3.Zero(),
    scene
  )
  camera.attachControl(canvas, true)
  camera.inputs.attached.mousewheel.detachControl(canvas)
  camera.lowerAlphaLimit = .85
  camera.upperAlphaLimit = 4.77

  let zoomLevel = 2

  var dome = new BABYLON.PhotoDome(
    'testdome',
    img,
    {
      resolution: 32,
      size:15,
      useDirectMapping: false,
    },
    scene
  )

  return scene
}

const scene = createScene()

engine.runRenderLoop(function() {
  scene.render()
})

window.addEventListener('resize', function() {
  engine.resize()
})
