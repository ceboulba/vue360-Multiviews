'use strict'
import './style.css'
import * as BABYLON from 'babylonjs'
const canvas = document.getElementById('renderCanvas')
const imgBox = document.getElementById('img-box')
var imgs = [
  'https://res.cloudinary.com/archipicture/image/upload/v1557582530/sham_milan/sham_milan_vue_axo.jpg',
  'https://res.cloudinary.com/archipicture/image/upload/v1557571155/sham_milan/sham_milan_vue_04.jpg',
  'https://res.cloudinary.com/archipicture/image/upload/v1557571155/sham_milan/sham_milan_vue_06.jpg',
  'https://res.cloudinary.com/archipicture/image/upload/v1557593825/sham_milan/sham_milan_vue_01.jpg',
  'https://res.cloudinary.com/archipicture/image/upload/v1557571158/sham_milan/sham_milan_vue_05.jpg',
  'https://res.cloudinary.com/archipicture/image/upload/v1557571154/sham_milan/sham_milan_vue_03.jpg',
  'https://res.cloudinary.com/archipicture/image/upload/v1557571152/sham_milan/sham_milan_vue_02.jpg',
]
let num = 0
const btnPrev = document.getElementById('btnPrev').addEventListener('click', () => prev())
const btnNext = document.getElementById('btnNext').addEventListener('click', () => next())

var engine = new BABYLON.Engine(canvas, true)

var createScene = function () {
  var scene = new BABYLON.Scene(engine)
  var camera = new BABYLON.ArcRotateCamera(
    'Camera',
    -Math.PI / 2,
    Math.PI / 2,
    2,
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

const check = () => {
  num === 0 ? (() => {
    canvas.classList.add('hide');
    imgBox.classList.remove('hide');
    })()

    : (() => {
      canvas.classList.remove('hide')
      imgBox.classList.add('hide')
    })()
    scene.render()
}

check()

const next = () => {
  num < imgs.length - 1 ?
    num++
    : num = 0
  scene = createScene()
  check()
}

const prev = () => {
  //event.preventDefault()
  num === 0 ?
    num = imgs.length - 1
    : num--
  scene = createScene()
  check()
}

engine.runRenderLoop(function () {
  check()
  scene.render()
})

window.addEventListener('resize', function () {
  check()
  engine.resize()
})
