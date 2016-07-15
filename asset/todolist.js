
//make sample test code
var square = document.getElementById("test_div");
var moveSquare = function(e)
{
  var mouseX = e.clientX;
  var mouseY = e.clientY;
  var startX = square.offsetLeft;
  var startY = square.offsetTop;

  var startTime = 0;
  var aniTime = 1000;
  requestAnimationFrame(function animate(time){
    if(startTime === 0){
      startTime = time;
    }
    var t =(time - startTime)/aniTime;
    square.style.left = "" + (startX * (1-t) + mouseX * t) +"px" ;
    square.style.top =  "" + (startY * (1-t) + mouseY * t) +"px" ;
    if(time - startTime <= aniTime){
       requestAnimationFrame(animate);
    }
  })
}

var fadeout = function(element, duration){
  var startTime = 0;
  requestAnimationFrame(function animate(time){
    if(startTime == 0) startTime = time;
    var t = (time - startTime) / duration;
    console.log(1-t);
    element.style.opacity = 1 - t;

    if(time - startTime < duration ){
      requestAnimationFrame(animate);
    }
    else {
      element.parentNode.removeChild(element);
    }
  });
}

var mouseClick = function (e){
  moveSquare(e); //test code
  var target = e.target;

  // if checkbox click
  if(target.tagName ==="INPUT" && target.type == "checkbox"){
    var li = findParentTodoLI(target);
    li.classList.toggle("completed");
  };

  //if del button click
  if(target.tagName === "BUTTON" && target.classList.contains("destroy") ){
    var li = findParentTodoLI(target);
    fadeout(li, 1000);
  };


}

var makeTodo = function(todoStr){
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

}


var findParentTodoLI = function (target){
  var li = target;
  while(li.tagName != "LI"){
    li = li.parentNode;
    if(!li) break;
  }
  return li;
};

var addTodo = function(e){
  var ENTER = 13;
  if(e.keyCode == ENTER)
  {
    var todoString = document.getElementById("new-todo").value;
    if( todoString.trim() == ""){
      return;
    }
    var li = makeTodo(todoString);
    //li.style.top = "-24px";
    li.style.height = "0px";
    var todoList = document.getElementById("todo-list");
    todoList.appendChild(li);
    slideDown(li, 500, 58);

    document.getElementById("new-todo").value = "";
  }
}

var slideDown = function (element, duration, height){
  var startTime = 0;
  requestAnimationFrame( function animate(time){
    if(startTime == 0 ) startTime = time;
    var t = (time - startTime)/duration;
    element.style.height = "" + t*height+ "px";
    //element.style.top = "" + (-(1-t)*height) + "px";
    if( time - startTime < duration){
      requestAnimationFrame(animate)
    }
  });
}

document.addEventListener("click", mouseClick);
document.addEventListener("keydown", addTodo);
