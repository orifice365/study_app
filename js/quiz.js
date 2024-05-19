// ボタンidから
const workbookId = sessionStorage.getItem('key');
// クイズの入る箱
const quizContainerElement = document.getElementById('quiz-container');
// 問題数
let numberOfQuizzes;
// まるばつボタン
const correctButton = document.getElementById('correct');
const incorrectButton = document.getElementById('incorrect');

// JSONファイルを取得する関数
async function fetchJsonData(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('ネットワークレスポンスが正しくありません');
        }
        const jsonData = await response.json();
        return jsonData;
    } catch (error) {
        console.error('データの取得中にエラーが発生しました:', error);
        return null;
    }
}

// データを取得して格納する関数
async function enterQuizData() {
    const jsonFileUrl = 'json/' + workbookId + '.json';
    // JSONファイルを取得
    const marchJsonData = await fetchJsonData(jsonFileUrl);
    if (!marchJsonData) {
        console.error('JSONデータが取得できませんでした');
        return;
    }

    // 配列をランダムに並び替える
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }
    const shuffledQuizzes = shuffleArray(marchJsonData.quizzes);

    // 問題数の取得
    numberOfQuizzes = marchJsonData.quizzes.length;

    // 各オブジェクトに対して処理を行う
    shuffledQuizzes.forEach((quiz, index) => {
        const quizWrapper = document.createElement('div');
        quizWrapper.setAttribute('class', 'quiz-item');
        const quizQuestion = '<p class="question">' + quiz.question + '</p>';
        const quizAnswer = '<p class="answer">' + quiz.answer + '</p>';
        quizWrapper.innerHTML = quizQuestion + quizAnswer;

        // 最後のオブジェクト
        if (index === numberOfQuizzes - 1) {
            quizWrapper.classList.add('is-current');
        }
        quizContainerElement.appendChild(quizWrapper);
    });

    // 問題数入れる
    countQuiz()
}

// 問題数カウント関数
function countQuiz() {
    const countQuizElement = document.getElementById('remaining-quiz');
    countQuizElement.innerHTML = numberOfQuizzes;

    if (numberOfQuizzes === 2) {
        quizContainerElement.classList.add('after-is-hidden');
    }
    if (numberOfQuizzes === 1) {
        quizContainerElement.classList.add('before-is-hidden');
    }
    if (numberOfQuizzes === 0) {
        correctButton.classList.add('is-disabled');
        incorrectButton.classList.add('is-disabled');
    }
}

// 解答の表示非表示
document.addEventListener('click', function (event) {
    if (event.target.classList.contains('is-current')) {
        const currentAnswer = event.target.querySelector('.answer');
        currentAnswer.classList.toggle('is-shown');
    }
});

// 正解時の処理
correctButton.addEventListener('click', function () {
    const currentQuiz = document.querySelector('.is-current');
    
    currentQuiz.classList.add('is-correct');
    changeCurrentQuiz();
    setTimeout(function () {
        currentQuiz.remove();
    }, 400);

    // 問題数の処理
    numberOfQuizzes = numberOfQuizzes - 1;
    countQuiz();
})

// 不正解時の処理
incorrectButton.addEventListener('click', function () {
    const currentQuiz = document.querySelector('.is-current');
    const clonedQuiz = currentQuiz.cloneNode(true);

    clonedQuiz.classList.remove('is-current');
    //解答を非表示に
    const clonedAnswer = clonedQuiz.querySelector('.answer');
    if (clonedAnswer.classList.contains('is-shown')) {
        clonedAnswer.classList.remove('is-shown');
    }
    quizContainerElement.prepend(clonedQuiz);

    currentQuiz.classList.add('is-incorrect');
    changeCurrentQuiz();
    setTimeout(function () {
        currentQuiz.remove();
    }, 400);
})

// is-currentを次の要素へ
function changeCurrentQuiz() {
    const currentQuiz = document.querySelector('.is-current');
    const nextQuiz = currentQuiz.previousElementSibling;
    if (nextQuiz) {
        nextQuiz.classList.add('is-current');
    }
}

enterQuizData();