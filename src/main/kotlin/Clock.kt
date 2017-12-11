import org.w3c.dom.*
import kotlin.browser.document
import kotlin.browser.window
import kotlin.js.Date
import kotlin.js.Math.PI
import kotlin.js.Math.cos
import kotlin.js.Math.sin

//获取audio
val audio = document.getElementById("audio") as HTMLAudioElement

//获取canvas
val canvas = document.getElementById("canvas") as HTMLCanvasElement
//获取context
val context = canvas.getContext("2d") as CanvasRenderingContext2D
//浏览器宽度和高度
val width = window.innerWidth
val height = window.innerHeight

var hour = 0
var minute = 0
var second = 0

//自定义钟表的大小半径
val radius = 100.0

//自定义圆点数量和圆点分布角度
val point = 0..59
val pointAngle = 2 * PI / 60

//自定义时间文本数组
val timeArray = arrayOf("3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "1", "2")
val textAngle = 2 * PI / 12

fun main(args: Array<String>) {

    //动态的获取电脑宽度和高度
    getSize()

    //绘制时钟
    drawClock()

    //定时获取系统时间，修改时钟
    window.setInterval({ drawClock();playAudio() }, 1000)
}

fun getSize() {
    context.canvas.width = width
    context.canvas.height = height
}

fun drawClock() {

    //清空画布
    context.clearRect(0.0, 0.0, width.toDouble(), height.toDouble())

    //获取当前时间
    getNowTime()

    //绘制钟表外圆环
    drawOutCircle()

    //绘制钟表内圆环点
    drawInsidePoint()

    //绘制内圆环数字
    drawTimeText()

    //绘制时针
    drawHourLine(hour, minute)

    //绘制分针
    drawMinuteLine(minute)

    //绘制秒针
    drawSecondLine(second)

    //绘制圆心
    drawCenter()

    //恢复画布
    context.restore()
}

fun getNowTime() {
    //asDynamic()包装成js类型,关闭类型检查
    val date = Date().asDynamic()
    hour = date.getHours()
    minute = date.getMinutes()
    second = date.getSeconds()
}

fun drawOutCircle() {
    context.save()
    context.beginPath()
    context.lineWidth = 5.0
    context.strokeStyle = "#fff"
    //将钟表中心点指定到画布中心
    context.translate(width / 2.toDouble(), height / 2.toDouble())
    context.arc(0.0, 0.0, radius, 0.0, 2 * PI)
    context.stroke()
}

fun drawInsidePoint() {
    point.forEach {
        context.beginPath()
        if (it % 5 == 0) {
            context.fillStyle = "#CE0000"
        } else {
            context.fillStyle = "#FFECEC"
        }
        //求每一个圆点的x和y
        val x = cos(it * pointAngle) * (radius - 10)
        val y = sin(it * pointAngle) * (radius - 10)
        context.arc(x, y, 2.0, 0.0, 2 * PI)
        context.fill()
    }
}

fun drawTimeText() {
    timeArray.forEachIndexed { index, s ->
        context.beginPath()
        context.font = "20px Arial"
        context.fillStyle = "#fff"
        //水平方向和竖直方向居中
        context.textAlign = CanvasTextAlign.CENTER
        context.textBaseline = CanvasTextBaseline.MIDDLE
        //求每一个文字的x和y
        val x = cos(index * textAngle) * (radius - 25)
        val y = sin(index * textAngle) * (radius - 25)
        context.fillText(timeArray[index], x, y)
    }
}

fun drawHourLine(hour: Int, minute: Int) {
    context.save()
    context.beginPath()
    context.lineWidth = 7.0
    context.strokeStyle = "#F75000"
    //指定末端的样式
    context.lineCap = CanvasLineCap.ROUND
    val hourAngle = hour * textAngle
    val minuteAngle = minute / 60.toDouble() * textAngle
    //旋转画布
    context.rotate(hourAngle + minuteAngle)
    context.moveTo(0.0, 10.0)
    context.lineTo(0.0, -radius / 2)
    context.stroke()
    context.restore()
}

fun drawMinuteLine(minute: Int) {
    context.save()
    context.beginPath()
    context.lineWidth = 5.0
    context.strokeStyle = "#F75000"
    context.lineCap = CanvasLineCap.ROUND
    //旋转画布
    context.rotate(minute * pointAngle)

    context.moveTo(0.0, 12.0)
    context.lineTo(0.0, -radius / 2 - 10)
    context.stroke()
    context.restore()
}

fun drawSecondLine(second: Int) {
    context.save()
    context.beginPath()
    context.fillStyle = "#00DB00"
    context.rotate(second * pointAngle)

    context.moveTo(-2.0, 20.0)
    context.lineTo(2.0, 20.0)
    context.lineTo(1.0, -radius + 18)
    context.lineTo(-1.0, -radius + 18)

    context.fill()
    context.restore()
}

fun drawCenter() {
    context.beginPath()
    context.fillStyle = "#ccc"
    context.arc(0.0, 0.0, 7.0, 0.0, 2 * PI)
    context.fill()
}

fun playAudio() {
    audio.play()
}