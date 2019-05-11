'use strict'

import './style.css'
import * as BABYLON from 'babylonjs'
const canvas = document.getElementById('renderCanvas')
const imgBox = document.getElementById('img-box')
console.log(imgBox)
var imgs = [
  'https://res.cloudinary.com/archipicture/image/upload/v1557559393/sham_milan/gradient.jpg',
  'https://res.cloudinary.com/archipicture/image/upload/v1557511607/sham_milan/sham_milan_vue_01.jpg',
  'https://res.cloudinary.com/archipicture/image/upload/v1557556968/sham_milan/sham_milan_vue_02.jpg',
  'https://res.cloudinary.com/archipicture/image/upload/v1557512775/sham_milan/sham_milan_vue_03.jpg',
  'https://res.cloudinary.com/archipicture/image/upload/v1557514455/sham_milan/sham_milan_vue_04.jpg',
  'https://res.cloudinary.com/archipicture/image/upload/v1557519549/sham_milan/sham_milan_vue_05.jpg'
]
let num = 0
const btnPrev = document.getElementById('btnPrev').addEventListener('click',()=> prev())
const btnNext = document.getElementById('btnNext').addEventListener('click',()=>next())

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

const next = () => {
  console.log('num => ',num)
  //event.preventDefault()  
  num < imgs.length - 1 ?
    num++
    : num = 0
  console.log('num => ',num)
  num === 0 ?
    canvas.classList.remove('hide')
      : imgBox.classList.remove('hide')
  scene = createScene()
}

const prev = () => {
  //event.preventDefault()
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
