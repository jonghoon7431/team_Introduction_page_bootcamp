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

let replyCount = 0;

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

function reply(textThing) {
    let {dateString, timeString} = replyDate();
    let html = `
    <li>
        <div class="texts">
            <p class="texts_reply">${textThing}</p>
            <textarea class="reply_textarea">${textThing}</textarea>
            <p class="texts_inf">
                <span>${dateString}</span>
                <span>${timeString}</span>
                <button class="fix">수정</button>
                <button class="complete">수정 완료</button>
                <button class="delete">삭제</button>
            </p>
        </div>
    </li>
    `;
    return html;
}

writeBtn.addEventListener('click', () => {
    replyCount++;
    if (writeTextarea.value === '') {
        alert('내용을 입력해주세요.')
        writeTextarea.focus();
        return
    }
    let html = reply(writeTextarea.value);
    console.log(html);
    replySectionList.innerHTML += html;
    writeTextarea.value = '';
})
// 클릭하면 input.value의 내용이 댓글란에 등록된다. 이후 input.value를 비운다. 공백인 경우 alert창이 뜬 후 input에 focus가 생긴다

function deleteReply(target) {
    const removeTarget = target.closest("li");
    removeTarget.remove();
}

function fixReply(target) {
    const textsDiv = target.closest(".texts");
    const fixTextarea = textsDiv.querySelector(".reply_textarea");
    const textsReply = textsDiv.querySelector(".texts_reply");

    fixTextarea.style.display = "block";
    textsReply.style.display = "none";

    target.style.display = "none"; // "수정" 버튼 감추기
    target.nextSibling.nextSibling.style.display = "block"; // "수정 완료" 버튼 보이기
}

function completeReply(target) {
    const textsLi = target.closest("li");
    const textsDiv = textsLi.querySelector(".texts");
    const fixTextarea = textsDiv.querySelector(".reply_textarea");

    let newHtml = reply(fixTextarea.value);
    textsLi.innerHTML = newHtml;

    target.style.display = "none"; // "수정 완료" 버튼 감추기
    target.previousSibling.previousSibling.style.display = "block"; // "수정" 버튼 보이기
}

replySectionList.addEventListener('click', (event) => {
    const t = event.target;
    if(t.className === "delete") {
        deleteReply(t);
    } else if (t.className === "fix") {
        fixReply(t);
    } else if (t.className === "complete") {
        completeReply(t);
    }
})