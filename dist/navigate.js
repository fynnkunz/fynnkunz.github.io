import './navigate.css'

//Sizes | Viewport
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
  }

//Resize
window.addEventListener('resize', () => {
    //Update Sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight
})

//Loop
const loop = () => {
    window.requestAnimationFrame(loop)
    document.getElementById('topbar').setAttribute('style', 'background: #070141; z-index: 2; position: absolute; top: 0%; left: 0%; width: ' + sizes.width + 'px; height: 80px')
  }
  loop()