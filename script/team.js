const aNodes = document.querySelectorAll(".toggle");
const divNodes = [...document.querySelectorAll(".container")];

// a 태그를 클릭할 때마다 div 태그가 열고 닫히도록 설정함
aNodes.forEach((a) => {
  a.addEventListener("click", (event) => {
    let url = event.target.href;
    let fragUrl = url.split("#");
    let word = fragUrl[fragUrl.length - 1];
    divNodes.filter((div) => {
      if (div.id === word && div.className.includes("hidden")) {
        div.classList.remove("hidden");
      } else if (div.id === word && !div.className.includes("hidden")) {
        div.classList.add("hidden");
      }
    });
  });
});