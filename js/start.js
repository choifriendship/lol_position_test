const main = document.querySelector("#main");
const qna = document.querySelector("#qna");
const result = document.querySelector("#result");

const endPoint = 12; // 질문 12개
const select = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]; // 사용자 선택 배열

function calResult() {
  var result = select.indexOf(Math.max(...select));
  return result;
}

function setResult() {
  let point = calResult();
  const resultName = document.querySelector(".resultname");
  resultName.innerHTML = infoList[point].name;

  var resultImg = document.createElement("img");
  const imgDiv = document.querySelector("#resultImg");
  var imgURL = "img/image-" + point + ".png";
  resultImg.src = imgURL;
  resultImg.alt = point;
  resultImg.classList.add("img-fluid");
  imgDiv.appendChild(resultImg);

  const resultDesc = document.querySelector(".resultDesc");
  resultDesc.innerHTML = infoList[point].desc;
}

function goResult() {
  qna.style.WebkitAnimation = "fadeOut 0.7s";
  qna.style.animation = "fadeOut 0.7s";
  setTimeout(() => {
    result.style.WebkitAnimation = "fadeIn 0.7s";
    result.style.animation = "fadeIn 0.7s";
    setTimeout(() => {
      qna.style.display = "none";
      result.style.display = "block";
    }, 150);
  });
  setResult();
}

function addAnswer(answerText, qIdx, idx) {
  var a = document.querySelector(".answerBox"); // 답변 버튼
  var answer = document.createElement("button");
  answer.classList.add("answerList");
  answer.classList.add("my-3");
  answer.classList.add("py-3");
  answer.classList.add("mx-auto");
  answer.classList.add("fadeIn");

  a.appendChild(answer);
  answer.innerHTML = answerText;

  answer.addEventListener(
    "click",
    function () {
      var children = document.querySelectorAll(".answerList");
      for (let i = 0; i < children.length; i++) {
        children[i].disabled = true;
        children[i].style.WebkitAnimation = "fadeOut 0.5s";
        children[i].style.animation = "fadeOut 0.5s";
      }
      setTimeout(() => {
        var target = qnaList[qIdx].a[idx].type;
        for (let i = 0; i < target.length; i++) {
          select[target[i]] += 1;
        }
        for (let i = 0; i < children.length; i++) {
          children[i].style.display = "none";
        }
        goNext(++qIdx);
      }, 450);
    },
    false
  );
}

function goNext(qIdx) {
  if (qIdx === endPoint) {
    goResult();
    return;
  }

  var q = document.querySelector(".qBox");
  q.innerHTML = qnaList[qIdx].q;

  var qnaImg = document.querySelector(".qnaImg");
  var qnaURL = "./img/question/qnaimage-";
  qnaImg.src = qnaURL + qIdx + ".png";

  try {
    qnaImg.classList.remove("fadeOut");
  } catch (e) {
    console.log(e);
  }
  qnaImg.classList.add("fadeIn");

  qnaImg.addEventListener(
    "click",
    function () {
      var target = qnaList[qIdx].a[0].type;
      ImageFadeOut(qIdx, 0);
    },
    false
  );

  for (let i in qnaList[qIdx].a) {
    // 첫번째 질문에 대한 첫번째 대답 qnaList[0].a[0].answer
    // 첫번째 질문에 대한 두번째 대답 qnaList[0].a[1].answer
    // 첫번째 질문에 대한 세번째 대답 qnaList[0].a[2].answer
    addAnswer(qnaList[qIdx].a[i].answer, qIdx, i);
  }
  var status = document.querySelector(".statusBar");
  status.style.width = (100 / endPoint) * (qIdx + 1) + "%";
}

function begin() {
  // 시작할 때 전환되는 속도
  main.style.WebkitAnimation = "fadeOut 0.7s";
  main.style.animation = "fadeOut 0.7s";
  setTimeout(() => {
    qna.style.WebkitAnimation = "fadeIn 0.7s";
    qna.style.animation = "fadeIn 0.7s";
    setTimeout(() => {
      main.style.display = "none";
      qna.style.display = "block";
    }, 150);
    let qIdx = 0;
    goNext(qIdx);
  }, 150);
}
