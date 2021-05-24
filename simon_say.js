
const celeste = document.getElementById('celeste')
const violeta = document.getElementById('violeta')
const naranja = document.getElementById('naranja')
const verde = document.getElementById('verde')
const rojo = document.getElementById('rojo')
const amarillo = document.getElementById('amarillo')
const btnEmpezar = document.getElementById('btnEmpezar')
const sound_do = document.getElementById('sound_do')
const sound_re = document.getElementById('sound_re')
const sound_mi = document.getElementById('sound_mi')
const sound_fa = document.getElementById('sound_fa')
const sound_sol = document.getElementById('sound_sol')
const sound_la = document.getElementById('sound_la')
const sound_lose = document.getElementById('sound_lose')
const sound_win = document.getElementById('sound_win')
const ULTIMO_NIVEL = 100
var myMusic
swal('Bienvenido(a), el siguiente juego se realizo con fines educativos, para demostracion y aplicacion de JavaScript.')

class Juego {
  constructor() {
    myMusic = new sound ('Audio/sound_gamedark.mp3')
    myMusic.play()
      this.inicializar = this.inicializar.bind(this)
    this.inicializar()
    this.generarSecuencia()
    setTimeout(this.siguienteNivel(),500)
    
  }
  inicializar() {
      this.elegirColor= this.elegirColor.bind(this)
      this.siguienteNivel = this.siguienteNivel.bind(this)
      this.toggleBtnEmpezar()
       this.nivel= 1
       this.colores= {
      celeste,
      violeta,
      naranja,
      verde,
      rojo,
      amarillo
    }
    this.sounds={
        sound_do,
        sound_re,
        sound_mi,
        sound_fa,
        sound_sol,
        sound_la,
        sound_lose,
        sound_win
      }
  }

  toggleBtnEmpezar(){
      if(btnEmpezar.classList.contains('hide')){
          btnEmpezar.classList.remove('hide')
      }else{
          btnEmpezar.classList.add('hide')
      }
  }

  generarSecuencia(){
  this.secuencia= new Array(ULTIMO_NIVEL).fill(0).map(n=> Math.floor(Math.random()*6))
//   this.secuenciaAudios = this.secuencia.map(n => audios[n])
 }

 siguienteNivel(){
     this.subnivel = 0
     this.iluminarSecuencia()
     this.agregarEventosClick()
 }

 transformarNumeroAColor(numero)
 {

  switch(numero){

      case 0:
      return 'celeste'
      case 1:
      return 'violeta'
      case 2:
      return 'naranja'
      case 3:
      return 'verde'
      case 4:
      return 'rojo'
      case 5:
      return 'amarillo'

  }

 }

 transformarColorANumero(color)
 {

  switch(color){

      case 'celeste':
      return 0
      case 'violeta':
      return 1
      case 'naranja':
      return 2
      case 'verde':
      return 3
      case 'rojo':
      return 4
      case 'amarillo':
      return 5

  }

 }
 reproducirSonido(color) {
    switch(color) {
      case 'celeste':
        this.sounds.sound_do.play()
      case 'violeta':
        this.sounds.sound_re.play()
      case 'naranja': 
        this.sounds.sound_mi.play()
      case 'verde':
        this.sounds.sound_fa.play()
        case 'rojo':
        this.sounds.sound_sol.play()
        case 'amarillo':
        this.sounds.sound_la.play()
    }
  }


 iluminarSecuencia(){
    let time=0
  for(let  i=0; i <  this.nivel; i++)
  {
      let color =this.transformarNumeroAColor(this.secuencia[i])
      setTimeout(() => this.reproducirSonido(color), 1000 * i)
     setTimeout(() => {
      console.log(color)
      this.iluminarColor(color)
  },  1000 * i ) 
  time++ 
     
      }
      setTimeout(() => this.agregarEventosClick(), 700 * time) 
 }
 
 iluminarColor(color){

  this.colores[color].classList.add('light')
  setTimeout(() => this.apagarColor(color),350)

 }


 apagarColor(color) {
     this.colores[color].classList.remove('light')
 }

 agregarEventosClick(){
     this.colores.celeste.addEventListener('click',this.elegirColor)
     this.colores.verde.addEventListener('click',this.elegirColor)
     this.colores.violeta.addEventListener('click',this.elegirColor)
     this.colores.naranja.addEventListener('click',this.elegirColor)
     this.colores.rojo.addEventListener('click',this.elegirColor)
     this.colores.amarillo.addEventListener('click',this.elegirColor)
  }

  eliminarEventosClick(){
      this.colores.celeste.removeEventListener('click',this.elegirColor)
     this.colores.verde.removeEventListener('click',this.elegirColor)
     this.colores.violeta.removeEventListener('click',this.elegirColor)
     this.colores.naranja.removeEventListener('click',this.elegirColor)
     this.colores.rojo.removeEventListener('click',this.elegirColor)
     this.colores.amarillo.removeEventListener('click',this.elegirColor)
  }

  elegirColor(ev){
     const nombreColor = ev.target.dataset.color
     const numeroColor = this.transformarColorANumero(nombreColor)
     this.iluminarColor(nombreColor)
     this.reproducirSonido(nombreColor)
     if(numeroColor === this.secuencia[this.subnivel]){
        this.aumentarNumeroPuntos()
      this.subnivel++
      if(this.subnivel==this.nivel){
        this.aumentarNumeroNivel()
          this.nivel++
          this.eliminarEventosClick()
          if(this.nivel ==(ULTIMO_NIVEL + 1)){
              this.ganoElJuego()
              this.aumentarNumeroNivel(1)
          }else{
              setTimeout(this.siguienteNivel,1000)
          }
      }

     }else{
        this.aumentarNumeroNivel(1)
        this.aumentarNumeroPuntos(1)
         this.perdioElJuego()
     }
  }

  ganoElJuego(){
    myMusic.stop()
    this.sounds.sound_win.play()
      swal('GANASTE','Felicitaciones','success')
      .then(this.inicializar)
  }

  perdioElJuego(){
    myMusic.stop()
    this.sounds.sound_lose.play()
      swal('GAME OVER','Intenta de Nuevo','error')
      .then(() =>{
              this.eliminarEventosClick()
          this.inicializar()
          })
  }

aumentarNumeroPuntos(reinicio) {
    var points = document.getElementById('puntos');
    var numberpoints = points.innerHTML;
    (reinicio)? numberpoints=0 : numberpoints++
    points.innerHTML = numberpoints;
  }

  aumentarNumeroNivel(reinicio) {
      var level = document.getElementById('nivel');
      var number = level.innerHTML;
      (reinicio)? number= 0 : number ++
      level.innerHTML = number;
}}

function empezarJuego() {
  window.juego = new Juego()

}
    
    
