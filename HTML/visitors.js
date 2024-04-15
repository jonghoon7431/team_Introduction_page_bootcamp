// 파이어베이스 관련 복습 코드입니다

// visitors.html에 다음 코드 추가!
// <script type="module">

// Firebase SDK 라이브러리 가져오기
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";
import {
  collection,
  addDoc,
} from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";
import { getDocs } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";

// Firebase 구성 정보 설정
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAoXt88s-mnGe696csxs3Ee50-ggwB8AGQ",
  authDomain: "team-introduce-9fca4.firebaseapp.com",
  projectId: "team-introduce-9fca4",
  storageBucket: "team-introduce-9fca4.appspot.com",
  messagingSenderId: "1058056294844",
  appId: "1:1058056294844:web:a1e7f7bcc1b1fd5ce61bb9",
  measurementId: "G-S59JTRMSV2"
};

// Firebase 인스턴스 초기화
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


$("#posting").click(async function () { // id 선택자를 button 태그('등록하기' 버튼)와 연결하기!!
  let id = $("#id").val();
  let comment = $("#comment").val();
  let current = new Date();
  let year = current.getFullYear();
  let month = String(current.getMonth() + 1).padStart(2, '0');
  let date = String(current.getDate()).padStart(2, '0');
  let hours = String(current.getHours()).padStart(2, '0');
  let min = String(current.getMinutes()).padStart(2, '0');
  
  let doc = {
    'id': id,
    'comment': comment,
    'date': `${year}.${month}.${date} ${hours}:${min}`
  };
  await addDoc(collection(db, "comments"), doc);

  window.location.reload();
})

let docs = await getDocs(collection(db, "comments"));
docs.forEach((doc) => {
    let row = doc.data();
    console.log(row);
}); 