const startButton = document.querySelectorAll('.start-button');

// startButtonをクリック
startButton.forEach(function (item) {
    item.addEventListener('click', function (e) {
        const clickedButtonId = e.currentTarget.id;

        // キーが "key" で値が "value" のデータをセッションストレージに保存する
        sessionStorage.setItem('key', clickedButtonId);
        window.location.href = 'quiz.html';
    });
});