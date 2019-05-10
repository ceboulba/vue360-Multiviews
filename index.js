import './style.css'
import * as BABYLON from 'babylonjs'
const canvas = document.getElementById('renderCanvas')
//var img = 'http://www.bandoltourisme.fr/fileadmin/Image-Tourisme/actualites/20190328_Bandol_360__.jpg'
var imgs = [
  'https://res.cloudinary.com/archipicture/image/upload/v1557355560/ca_pano.jpg',
  'https://res.cloudinary.com/archipicture/image/upload/v1557472339/bandol.jpg',
  'https://res.cloudinary.com/archipicture/image/upload/v1557472339/city.jpg'
]

let num = 0
const btnPrev = document.getElementById('btnPrev')
const btnNext = document.getElementById('btnNext')
btnNext.onclick = () => {
  next()
}
btnPrev.onclick = () => {
  prev()
}


var engine = new BABYLON.Engine(canvas, true)

var createScene = function () {
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
  //camera.lowerAlphaLimit = .85
  //camera.upperAlphaLimit = 4.77

  let zoomLevel = 2

  var dome = new BABYLON.PhotoDome(
    'testdome',
    imgs[num],
    {
      resolution: 32,
      size: 15,
      useDirectMapping: false,
    },
    scene
  )

  return scene
}

const scene = createScene()

const next = () => {
  event.preventDefault()
  num < imgs.length - 1 ?
    num++
    : num = 0
  console.log('coucou next')
  console.log(num)
  scene = createScene()
}

const prev = () => {
  event.preventDefault()
  num === 0 ?
    num = imgs.length - 1
    : num--
  console.log('coucou previous')
  console.log(num)
    scene = createScene()
}

engine.runRenderLoop(function () {
  scene.render()
})

window.addEventListener('resize', function () {
  engine.resize()
})
