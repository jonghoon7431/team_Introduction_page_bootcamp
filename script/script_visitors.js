// Firebase SDK 라이브러리 임포트
// import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
// import { getFirestore } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";
// import {
//   collection,
//   addDoc,
// } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";
// import { getDocs } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";

/* <조원의 이름에 따라 '/' 이후에 오는 이름이 바뀌는 기능> */
let urlParams = new URLSearchParams(window.location.search); // URL에서 물음표(?) 이후에 오는 부분 가져오기
let referrer = urlParams.get('referrer'); // referrer 속성의 값 가져오기
let username = null; // 페이지에 따라 바뀔 이름
// console.log(referrer);

switch(referrer) {
    case "member1.html":
        username = "김현진";
        break;
    case "member2.html":
        username = "이녕수";
        break;
    case "member3.html":
        username = "이종훈";
        break;
    case "member4.html":
        username = "서샛별";
        break;
    case "member5.html":
        username = "남수빈";
        break;
    case "member6.html":
        username = "한효림";
        break;
}

let buttons = document.getElementsByClassName("button_name");
for (let i = 0; i < buttons.length; i++) {
    buttons[i].textContent = "조원 선택 / " + username;
}


/* <댓글을 다는 기능> */
let writeTextarea = document.querySelector('.write .reply_textarea');
let writeBtn = document.querySelector('.write button');
let replySectionList = document.querySelector('.reply_section ul');

// 이 두 밑에 변수 쓰이지 않음 -> 삭제해도 되나요?
let fixBtn = document.querySelector('.fix');
let deleteBtn = document.querySelector('.delete');

// 댓글 단 날짜 함수 (따로 뺌)
function replyDate() {
    let today = new Date();
    let year = today.getFullYear();
    let month = ('0' + (today.getMonth() + 1)).slice(-2);
    let day = ('0' + today.getDate()).slice(-2);
    let hours = ('0' + today.getHours()).slice(-2);
    let minutes = ('0' + today.getMinutes()).slice(-2);
    let seconds = ('0' + today.getSeconds()).slice(-2);

    let dateString = year + '.' + month + '.' + day;
    let timeString = hours + ':' + minutes + ':' + seconds;

    return {dateString, timeString};
}

// reply() 함수 밑에서도 사용하기 위해서 매개변수 추가 및 리턴문 추가(기능은 동일하게 작동함)
function reply(textThing) {
    let {dateString, timeString} = replyDate();

    let html = `
    <li>
        <div class="texts">
            <p class="texts_reply">${textThing}</p>
            <textarea class="reply_textarea"></textarea>
            <p class="texts_inf">
                <span>${dateString}</span>
                <span>${timeString}</span>
                <button class="fix">수정</button>
                <button class="delete">삭제</button>
            </p>
        </div>
    </li>
    `;

    return html;
}
//날짜와 시간이 사용자가 입력한 텍스트와 함께 등록되도록 한다.

/* function fixReplies() {
    //현재 댓글의 위치에서 input 창을 연다
    //수정한 댓글 내용을 현재 댓글 위치에 반영한다
    let replies = document.querySelectorAll('.reply_section ul li');
    console.log(replies);
};
//'수정' 버튼 클릭시 내용을 수정할 수 있게 한다 */

writeBtn.addEventListener('click', () => {
    if (writeTextarea.value === '') {
        alert('내용을 입력해주세요.')
        writeTextarea.focus();
        return
    }
    let html = reply(writeTextarea.value);
    replySectionList.innerHTML += html;
    writeTextarea.value = '';
})
// 클릭하면 input.value의 내용이 댓글란에 등록된다. 이후 input.value를 비운다. 공백인 경우 alert창이 뜬 후 input에 focus가 생긴다


// 댓글 삭제 및 수정
replySectionList.addEventListener('click', (event) => {
    const t = event.target;

    if(t.className === "delete") { // 댓글 삭제
        const removeTarget = t.parentNode.parentNode.parentNode;
        // console.log(removeTarget);
        removeTarget.remove();
    } else if (t.className === "fix") { // 댓글 수정
        let fixedTarget = t.parentNode.parentNode.parentNode;
        const fixTextarea = t.parentNode.previousSibling.previousElementSibling; // textarea 노드
        const written = fixTextarea.previousSibling.previousSibling; // 기존 입력된 댓글 노드(p 노드)
        const writtenText = written.innerText; // 기존에 입력된 댓글 내용
        
        fixTextarea.style.display = "block"; // 기존에 입력된 댓글 노드 안보이게
        written.style.display = "none"; // 수정이 가능하도록 textarea를 보여준다
        fixTextarea.innerText += writtenText; // 기존에 입력된 댓글 내용을 textarea에 추가한다

        // 남은 부분: fixedText를 다시 written 의 innerText에 덮어씌워주면 된다.
        console.log("첫 번째 클릭했을 때 Text:" + writtenText);

        // 안에서 또 클릭 이벤트 핸들러 함수 -> 한 번 더 수정 버튼을 누를 때는 수정된 댓글이 등록되게
        replySectionList.addEventListener("click", (event2) => {
            const t2 = event2.target;

            if(t2.className === "delete") { // 댓글 삭제
                const removeTarget2 = t2.parentNode.parentNode.parentNode;
                removeTarget2.remove();
            } else if (t2.className === "fix") { // 댓글 수정 -> 등록
                console.log("여기까지 들어옴?"); // 한번 더 수정 버튼을 눌렀을 때 이 문장이 찍히는 거 확인 완료
                let fixedText = fixTextarea.value; // 새롭게 추가 또는 삭제한 댓글 내용을 변수에 저장했다. -> 위에 써져 있던 코드를 여기로 옮김
                console.log("두 번째 클릭했을 때 Text:" + fixedText);
                // 남은 부분: reply() 함수 호출 -> 기존에 있던 html을 수정한 html로 덮어쓰기!
                let newHtml = reply(fixedText);
                console.log(newHtml);
                fixedTarget = newHtml;
                console.log(fixedTarget);
            }
        })
    }
})
