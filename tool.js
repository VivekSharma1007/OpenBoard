let toolsContainer = document.querySelector(".tool-options-icons-container");
let optionContainer = document.querySelector(".option-icon");
let optionFlag = true;
let idNo = 0;
let upload = document.querySelector(".upload");
let toolPencil = document.querySelector(".tool-pencil");
let toolEraser = document.querySelector(".tool-eraser");
let pencilIcon = document.querySelector(".pencil");
let eraserIcon = document.querySelector(".eraser");
let stickyIcon = document.querySelector(".sticky");
let pencilFlag = false;
let eraserFlag = false;


optionContainer.addEventListener("click", (e) => {
    optionFlag = !optionFlag;

    if(optionFlag)
    {
        openTools();
    }
    else
    {
        closeTools();
    }
})


function openTools()
{
    let iconElement = optionContainer.children[0];
    iconElement.classList.remove("fa-times");
    iconElement.classList.add("fa-bars");
    toolsContainer.style.display = "flex";
    
}

function closeTools()
{
    let iconElement = optionContainer.children[0];
    iconElement.classList.remove("fa-bars");
    iconElement.classList.add("fa-times");
    toolsContainer.style.display = "none";
    toolPencil.style.display = "none";
    toolEraser.style.display = "none";
}


pencilIcon.addEventListener("click", (e) => {
    pencilFlag = !pencilFlag;
    if(pencilFlag)
    {
        toolPencil.style.display ="block";
    }
    else
    {
        toolPencil.style.display ="none";
    }
})

eraserIcon.addEventListener("click", (e) => {
    eraserFlag = !eraserFlag;
    if(eraserFlag)
    {
        toolEraser.style.display = "block";
    }
    else
    {
        toolEraser.style.display = "none";
    }
})


stickyIcon.addEventListener("click", (e) => {
    let toolSticky = document.createElement("div");
    toolSticky.setAttribute("class", "tool-sticky");
    idNo++;
    toolSticky.setAttribute("id", "id"+idNo);
    toolSticky.innerHTML = `
        <div class="sticky-header">
            <div class="sticky-minimize"></div>
            <div class="sticky-close"></div>
        </div>
        <div class="sticky-body">
            <textarea></textarea>
        </div>
    `
    document.body.appendChild(toolSticky);


    let minimize = document.querySelector(".sticky-minimize");
    let close = document.querySelector(".sticky-close");


    // close.addEventListener("click", (e) =>{
    //     toolSticky.remove();
    // })

    stickyBody(minimize, close, toolSticky,idNo);

    toolSticky.onmousedown = function(event){
        dragAndDrop(toolSticky, event);
    };

    toolSticky.ondragstart = function()
    {
        return false;
    };
})


function stickyBody(minimize, close, tool,idNo)
{
    close.addEventListener("click" , (e) => {
       tool.remove();
       
    })

    minimize.addEventListener("click", (e) => {
        let stickyBody = toolSticky.querySelector(".sticky-body");
        let display = getComputedStyle(stickyBody).getPropertyValue("display");
        if(display === "none")
        {
             stickyBody.style.display = "block";
        }
        else
        {
            stickyBody.style.display = "none";
            toolSticky.style.height = "2rem";
        }
    })
}

upload.addEventListener("click", (e) => {
    let input = document.createElement("input");
    input.setAttribute("type", "file");
    input.click();

    input.addEventListener("change", (e) => {
        let file = input.files[0];
        let url = URL.createObjectURL(file);

        let toolSticky = document.createElement("div");
        toolSticky.setAttribute("class", "tool-sticky");
        toolSticky.innerHTML = `
            <div class="sticky-header">
                <div class="sticky-minimize"></div>
                <div class="sticky-close"></div>
            </div>
            <div class="sticky-body">
                <img src="${url}"/>
            </div>
        `
        document.body.appendChild(toolSticky);
    
    
        let minimize = document.querySelector(".sticky-minimize");
        let close = document.querySelector(".sticky-close");
    
        stickyBody(minimize, close, toolSticky);
    
        toolSticky.onmousedown = function(event){
            dragAndDrop(toolSticky, event);
        };
    
        toolSticky.ondragstart = function()
        {
            return false;
        }; 
    })
})


function dragAndDrop(element, event)
{
    let shiftX = event.clientX - element.getBoundingClientRect().left;
    let shiftY = event.clientY - element.getBoundingClientRect().top;

  element.style.position = 'absolute';
  element.style.zIndex = 1000;
  

  moveAt(event.pageX, event.pageY);

  // moves the ball at (pageX, pageY) coordinates
  // taking initial shifts into account
  function moveAt(pageX, pageY) {
    element.style.left = pageX - shiftX + 'px';
    element.style.top = pageY - shiftY + 'px';
  }

  function onMouseMove(event) {
    moveAt(event.pageX, event.pageY);
  }

  // move the ball on mousemove
  document.addEventListener('mousemove', onMouseMove);

  // drop the ball, remove unneeded handlers
  element.onmouseup = function() {
    document.removeEventListener('mousemove', onMouseMove);
    element.onmouseup = null;
  };

};


