var TODO = {
  ENTER_KEY_CODE : 13,

  init : function(){
    document.addEventListener("DOMContentLoaded", (function(){
      document.addEventListener("keydown", this.add.bind(this));
      document.addEventListener("click", this.click.bind(this));
    }).bind(this));
  },

  add : function (e){
    if(e.keyCode != this.ENTER_KEY_CODE){ return; }

    var todoString = document.getElementById("new-todo").value;

    if( todoString.trim() == ""){
      return;
    }
    var li = this.make(todoString);
    li.style.height = "0px";
    var todoList = document.getElementById("todo-list");
    todoList.appendChild(li);
    this.slideDown(li, 500, 58);

    document.getElementById("new-todo").value = "";
  },

  make : function(todoStr){
    // //일반 TODO
    // <li class="{}">
    //   <div class="view">
    //     <input class="toggle" type="checkbox" >
    //     <label>타이틀</label>
    //     <button class="destroy"></button>
    //   </div>
    // </li>

    var input = document.createElement("input");
    input.className = "toggle";
    input.setAttribute("type", "checkbox");

    var label = document.createElement("label");
    label.innerHTML = todoStr;

    var button = document.createElement("button");
    button.className = "destroy";

    var div_view = document.createElement("div");
    div_view.className = "view";
    div_view.appendChild(input);
    div_view.appendChild(label);
    div_view.appendChild(button);

    var li = document.createElement("li");
    li.appendChild(div_view);
    return li;
  },

  click : function(e){
    var findParentTodoLI = function (target){
      var li = target;
      while(li.tagName != "LI"){
        li = li.parentNode;
        if(!li) break;
      }
      return li;
    };

    var target = e.target;
    // if checkbox click toggle completed
    if(target.tagName ==="INPUT" && target.type == "checkbox"){
      var li = findParentTodoLI(target);
      li.classList.toggle("completed");
    };

    //if del button click del object
    if(target.tagName === "BUTTON" && target.classList.contains("destroy") ){
      var li = findParentTodoLI(target);
      this.fadeout(li, 1000, function(element){
        element.parentNode.removeChild(element);
      });
    };

  },

  fadeout : function(element, duration, callback){
    var startTime = 0;
    window.requestAnimationFrame(function animate(time){
      if(startTime == 0) startTime = time;
      var t = (time - startTime) / duration;
      //console.log(1-t);
      element.style.opacity = 1 - t;

      if(time - startTime < duration ){
        window.requestAnimationFrame(animate);
      }
      else {
        callback(element);
      }
    });
  },

  slideDown : function (element, duration, height){
    var startTime = 0;
    window.requestAnimationFrame( function animate(time){
      if(startTime == 0 ) startTime = time;
      var t = (time - startTime)/duration;
      element.style.height = "" + t*height+ "px";
      //element.style.top = "" + (-(1-t)*height) + "px";
      if( time - startTime < duration){
        window.requestAnimationFrame(animate)
      }
    });
  },
};


var moveSquare = function(e){ //sample test code for animation
  var square = document.getElementById("test_div");
  var mouseX = e.clientX;
  var mouseY = e.clientY;
  var startX = square.offsetLeft;
  var startY = square.offsetTop;

  var startTime = 0;
  var aniTime = 1000;
  window.requestAnimationFrame(function animate(time){
    if(startTime === 0){
      startTime = time;
    }
    var t =(time - startTime)/aniTime;
    square.style.left = "" + (startX * (1-t) + mouseX * t) +"px" ;
    square.style.top =  "" + (startY * (1-t) + mouseY * t) +"px" ;
    if(time - startTime <= aniTime){
       window.requestAnimationFrame(animate);
    }
  })
}

document.addEventListener("click", moveSquare);
TODO.init();
