
//make sample test
var square = document.getElementById("test_div");
var mouseClick = function (e){
  //console.log(e.target);
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


var makeTodo = function(todoStr){
  // #일반 TODO
  // <li class="{}">
  //   <div class="view">
  //     <input class="toggle" type="checkbox" >
  //     <label>타이틀</label>
  //     <button class="destroy"></button>
  //   </div>
  // </li>

  var input = document.createElement("input");
  input.className = "toggle";
  input.type = "checkbox";

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
var addTodo = function(e){
  var ENTER = 13;
  if(e.keyCode == ENTER)
  {
    var todoString = document.getElementById("new-todo").value;
    if( todoString.trim() == ""){
      return;
    }
    var li = makeTodo(todoString);
    var todoList = document.getElementById("todo-list");
    todoList.appendChild(li);
    document.getElementById("new-todo").value = "";
  }
}

document.addEventListener("click", mouseClick);
document.addEventListener("keydown", addTodo);
