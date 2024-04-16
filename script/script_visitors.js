/* 
<기능>
방명록 : 
    1. input에서 사용자가 입력한 텍스트를 받아온다.
    2. '등록' 버튼을 누르면 input에서 작성된 텍스트가 하단의 ul태그 안으로 들어온다.
    3. 댓글이 하단에 등록될 때, 해당 댓글을 작성한 연도, 날짜, 시간이 자동으로 함께 기록된다.
    3. '수정' 버튼을 누르면 해당 위치에서 텍스트 수정이 가능해지며, 새롭게 생성된 '등록' 버튼을 누를 시 변경된 내용으로 갱신된다.
    4. '삭제' 버튼을 누르면 해당 댓글이 삭제된다.

*/

let writeInput = document.querySelector('.write input');
let writeBtn = document.querySelector('.write button');
let replySectionList = document.querySelector('.reply_section ul');

/* function printInput() {
    let textOfInput = writeInput.value;
    replySectionList.innerText += 
} */

writeBtn.addEventListener('click', () => {printInput()})
//'등록하기' 버튼 클릭 시 input의 텍스트 내용 들어오는 것 확인됨
