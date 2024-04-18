const aNode = document.querySelector(".toggle");
const pNodes = document.querySelectorAll("p");
console.log(pNodes);

// a 태그를 클릭할 때마다 p 태그가 열고 닫히도록 설정함
aNode.addEventListener("click", () => {
  pNodes.forEach((pNode) => {
    console.log(pNode.style.display);
    let display = pNode.style.display;
    if(display === "none")
      display = "block";
    else
      display = "none";
  });
});
