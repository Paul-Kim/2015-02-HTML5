
var frameCallback = function (){
  console.log("frameCallback");
}

var doneCallback = function (){
  console.log("doneCallback");
}

var promiseFrame = function(){
  console.log("run2 frame");
}

var ani = {
  updateFrame : function (){},
  done : function (){},
  setUpdateFrameCallback: function (callback){
    this.updateFrame = callback;
  },
  setDoneCallback : function (callback){
    this.done = callback;
  },

  run : function (){
    var square = document.getElementById("test_div");
    var startX = square.offsetLeft;
    var startTime = 0;
    var aniTime = 1000;
    window.requestAnimationFrame(function animate(time){
      if(startTime === 0){
        startTime = time;
      }
      var t =(time - startTime)/aniTime;
      square.style.left = "" + (startX * (1-t) + 500 * t) +"px" ;
      ani.updateFrame();
      if(time - startTime <= aniTime){
        window.requestAnimationFrame(animate);
      }else{
        ani.done();
      }
    });
  },

  run2 :function (frameCallback){
    var func = new Promise(function(resolve, reject) {
      var square = document.getElementById("test_div2");
      var startX = square.offsetLeft;
      var startTime = 0;
      var aniTime = 1000;
      window.requestAnimationFrame(function animate(time){
        if(startTime === 0){
          startTime = time;
        }
        var t =(time - startTime)/aniTime;
        square.style.left = "" + (startX * (1-t) + 500 * t) +"px" ;
        var updatePromise = new Promise(function(resolve, reject) {
          resolve();
        }).then(frameCallback());
        if(time - startTime <= aniTime){
          window.requestAnimationFrame(animate);
          return updatePromise;
        }else{
          resolve();
        }
      });
    });
    return func;
  }
}

ani.setUpdateFrameCallback(frameCallback);
ani.setDoneCallback(doneCallback);

ani.run();
ani.run2(promiseFrame).then(function(){
  console.log("run2 Done.");
});
