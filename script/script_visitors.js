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

let fixBtn = document.querySelector('.fix');
let deleteBtn = document.querySelector('.delete');

function reply() {
    let today = new Date();
    let year = today.getFullYear();
    let month = ('0' + (today.getMonth() + 1)).slice(-2);
    let day = ('0' + today.getDate()).slice(-2);
    let hours = ('0' + today.getHours()).slice(-2);
    let minutes = ('0' + today.getMinutes()).slice(-2);
    let seconds = ('0' + today.getSeconds()).slice(-2);

    let dateString = year + '.' + month + '.' + day;
    let timeString = hours + ':' + minutes + ':' + seconds;

    let html = `
    <li>
        <div class="texts">
            <p class="texts_reply">${writeTextarea.value}</p>
            <p class="texts_inf">
                <span>${dateString}</span>
                <span>${timeString}</span>
                <button class="fix">수정</button>
                <button class="delete">삭제</button>
            </p>
        </div>
    </li>
    `;

    replySectionList.innerHTML += html;
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
    reply()
    writeTextarea.value = '';
})
// 클릭하면 input.value의 내용이 댓글란에 등록된다. 이후 input.value를 비운다. 공백인 경우 alert창이 뜬 후 input에 focus가 생긴다.
/* if (replySectionList.childElementCount > 0) {
    fixBtn.addEventListener('click', (e) => { 
        fixReplies()
        e.target
    })
} */
