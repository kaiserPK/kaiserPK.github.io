var WIDTH = $(window).width(),
    HEIGHT = $(window).height(),
    MAX_PARTICLES = 100,
    DRAW_INTERVAL = 60,
    container = document.querySelector('#canvas-wrap'),
    canvas = document.querySelector('#pixie'),
    context = canvas.getContext('2d'),
    gradient = null,
    pixies = new Array();
    
function setDimensions(e) {
  WIDTH = $(window).width();
  HEIGHT = $(window).height();
  container.style.width = WIDTH+'px';
  container.style.height = HEIGHT+'px';
  canvas.width = WIDTH;
  canvas.height = HEIGHT - 100;
}
    
setDimensions();

window.addEventListener('resize', setDimensions);

function Circle() {
  this.settings = {ttl:8000, xmax:5, ymax:2, rmax:10, rt:1, xdef:960, ydef:540, xdrift:4, ydrift: 4, random:true, blink:true};
  
  this.reset = function() {
    this.x = (this.settings.random ? WIDTH*Math.random() : this.settings.xdef);
    this.y = (this.settings.random ? HEIGHT*Math.random() : this.settings.ydef);
    this.r = ((this.settings.rmax-1)*Math.random()) + 1;
    this.dx = (Math.random()*this.settings.xmax) * (Math.random() < .5 ? -1 : 1);
    this.dy = (Math.random()*this.settings.ymax) * (Math.random() < .5 ? -1 : 1);
    this.hl = (this.settings.ttl/DRAW_INTERVAL)*(this.r/this.settings.rmax);
    this.rt = Math.random()*this.hl;
    this.settings.rt = Math.random()+1;
    this.stop = Math.random()*.2+.4;
    this.settings.xdrift *= Math.random() * (Math.random() < .5 ? -1 : 1);
    this.settings.ydrift *= Math.random() * (Math.random() < .5 ? -1 : 1);
  }
  
  this.fade = function() {
    this.rt += this.settings.rt;
  }

  this.draw = function() {
    if(this.settings.blink && (this.rt <= 0 || this.rt >= this.hl)) {
      this.settings.rt = this.settings.rt*-1;
    } else if(this.rt >= this.hl) {
      this.reset();
    }
    
    var newo = 1-(this.rt/this.hl);
    context.beginPath();
    context.arc(this.x, this.y, this.r, 0, Math.PI*2, true);
    context.closePath();
    
    var cr = this.r*newo;
    gradient = context.createRadialGradient(this.x, this.y, 0, this.x, this.y, (cr <= 0 ? 1 : cr));
    gradient.addColorStop(0.0, 'rgba(255,255,255,'+newo+')');
        gradient.addColorStop(this.stop, 'rgba(77,101,181,'+(newo*.6)+')');
          gradient.addColorStop(1.0, 'rgba(77,101,181,0)');
          context.fillStyle = gradient;
          context.fill();
          }

          this.move = function() {
            this.x += (this.rt/this.hl)*this.dx;
            this.y += (this.rt/this.hl)*this.dy;
            if(this.x > WIDTH || this.x < 0) this.dx *= -1;
            if(this.y > HEIGHT || this.y < 0) this.dy *= -1;
          }

          this.getX = function() { return this.x; }
          this.getY = function() { return this.y; }
}

for (var i = 0; i < MAX_PARTICLES; i++) {
  pixies.push(new Circle());
  pixies[i].reset();
}

function draw() {
  context.clearRect(0, 0, WIDTH, HEIGHT);
  for(var i = 0; i < pixies.length; i++) {
    pixies[i].fade();
    pixies[i].move();
    pixies[i].draw();
  }
}

setInterval(draw, DRAW_INTERVAL);

$(document).ready(function(){
  var $landscape = $('#landscape');
  var $grass = $('#grass');
  var $container = $('#canvas-wrap');
  var $leftButton = $('#move_btns .move_btn.left');
  var $rightButton = $('#move_btns .move_btn.right');
  // BB-8 Parts
  var $sphere = $('.sphere');
  var topPart = document.querySelector('.top-part');
  var activeMotion;
  var timeout;
  var rotation = 0;

  // Background animation using mouse
  // $container.mousedown(function(ev){
  //   var ox = ev.clientX;
  //   var om = parseInt($landscape.css('background-position').substr(0, $landscape.css('background-position').search(' ')));
  //   var og = parseInt($grass.css('background-position').substr(0, $grass.css('background-position').search(' ')));
  //   $container.mousemove(function(e){
  //     $landscape.css('background-position', om+((e.clientX-ox)/10)+'px 0px');
  //     $grass.css('background-position', og+((e.clientX-ox)/4)+'px 0px');
  //   });
  //   $container.mouseup(function(){
  //     $container.unbind('mousemove');
  //     $container.unbind('mouseup');
  //   });
  // });

  // Background animation using key press

  function parseKeyCode(e) {
    var result = 0;
    switch (e.keyCode) {
      case 37:
        result = 'left';
        break;
      case 39:
        result = 'right';
        break;
    }
    return result;
  }

  var animate = function() {
    var om = parseInt($landscape.css('background-position').substr(0, $landscape.css('background-position').search(' ')));
    var og = parseInt($grass.css('background-position').substr(0, $grass.css('background-position').search(' ')));

    if (activeMotion === 'left') {
      $landscape.css('background-position', om+(30/10)+'px 0px');
      $grass.css('background-position', og+(30/4)+'px 0px');
      rotation -= 3;
      if (rotation < -360) {
        rotation = 0;
      }
      $sphere.css('transform', 'rotate('+rotation+'deg)');
    }
    else if (activeMotion === 'right') {
      $landscape.css('background-position', om+(-30/10)+'px 0px');
      $grass.css('background-position', og+(-30/4)+'px 0px');
      rotation += 3;
      if (rotation > 360) {
        rotation = 0;
      }
      $sphere.css('transform', 'rotate('+rotation+'deg)');
    }

    timeout = setTimeout(animate, 10);
  }

  $(document).keydown(function(e) {
    var direction = parseKeyCode(e);
    if ((e.which === 37 || e.which === 39) && activeMotion !== direction) {
      activeMotion = direction;
      clearTimeout(timeout);
      animate();
    }
  }).keyup(function() {
    activeMotion = null;
  });

  $leftButton.mousedown(function(e) {
    var direction = 'left';
    if (activeMotion !== direction) {
      activeMotion = direction;
      clearTimeout(timeout);
      animate();
      controlAnimation(topPart, direction);
    }
  }).mouseup(function() {
    activeMotion = null;
    controlAnimation(topPart, 'stop');
  });

  $rightButton.mousedown(function(e) {
    var direction = 'right';
    if (activeMotion !== direction) {
      activeMotion = direction;
      clearTimeout(timeout);
      animate();
      controlAnimation(topPart, direction);
    }
  }).mouseup(function() {
    activeMotion = null;
    controlAnimation(topPart, 'stop');
  });

  function controlAnimation() {
    var args = [].slice.call(arguments);
    var elements = args.slice(0, -1);
    var animationSetting = args[args.length - 1];
    elements.forEach(function(elem) {
      if (animationSetting !== 'stop') {
        if (animationSetting === 'right') {
          elem.classList.add('move-right');
        }
        else if (animationSetting === 'left') {
          elem.classList.add('move-left');
        }
      }
      else {
        elem.classList.contains('move-right')
          ? elem.classList.remove('move-right')
          : elem.classList.remove('move-left');
      }
    });
  }

  function handleKeyDown(e) {
    var direction = parseKeyCode(e);
    controlAnimation(topPart, direction);
  }

  function handleKeyUp(e) {
    controlAnimation(topPart, 'stop');
  }

  document.addEventListener('keydown', handleKeyDown);
  document.addEventListener('keyup', handleKeyUp);

});
