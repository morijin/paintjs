const canvas = document.getElementById("jsCanvas")
const ctx = canvas.getContext("2d")
const colors = document.getElementsByClassName("jsColor")
const range = document.getElementById("jsRange")
const mode = document.getElementById("jsMode")

ctx.strokeStyle = "#2c2c2c"
ctx.lineWidth = 2.5


let painting = false;
let filling = false;

// 페인팅을 그만!을 따로 만들어서
function stopPainting(){
    painting = false
}

function startPainting(){
    painting = true
}

function onMouseMove(event){
    const x = event.offsetX
    const y = event.offsetY
    if(!painting){
        ctx.moveTo(x, y)
        ctx.beginPath()
        console.log(`path만 만들어 준다`,x, y)
        // 움직이는 모든 순간이 path를 만들어
        // 선을 만들어주는 것과 별개로 움직여야
        // 선을 만드는 것과 마우스가 이동하고 클릭한 곳과 만나지 않는다
    } else {
        ctx.lineTo(x, y)
        ctx.stroke()
        console.log(`선을 만들어 준다`,x , y)
    }
}

// 클릭을 하는 순간부터!!
// function onMouseDown(event){
//     paingting = true
// }

// 캔버스 밖으로 벗어나도 false
function onMouseLeave(event){
    stopPainting()
}

function handlecolorClick(event){
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
}

function handleRangeChange(event){
    const size = event.target.value;
    ctx.lineWidth = size;
}

function handleModeClick(){
    if(filling === true){
        filling = false;
        mode.innerText = "FILL"
    } else {
        filling = true
        mode.innerText = "PAINT"
    }
}

if(canvas){
    canvas.addEventListener("mousemove", onMouseMove)
    canvas.addEventListener("mousedown", startPainting)
    canvas.addEventListener("mouseup", stopPainting)
    canvas.addEventListener("mouseleave", stopPainting)
}
// 캔버스 안에서 마우스가 움직이면!!

Array.from(colors).forEach(color => 
    color.addEventListener("click", handlecolorClick)
)

if(range){
    range.addEventListener("input", handleRangeChange)
}

if(mode){
    mode.addEventListener("click", handleModeClick)
}