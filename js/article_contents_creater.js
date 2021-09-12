const ARTICLE_NUM = articles.length;
const ARTICLE_MAX_NUM = 100;

let current_article_num = ARTICLE_NUM;
let current_article_list = [];

function createArticleBox() {

    let loop_num = current_article_num - (ARTICLE_MAX_NUM * (current_page_idx - 1));
    if (loop_num > ARTICLE_MAX_NUM) {
        loop_num = ARTICLE_MAX_NUM;
    }

    for (let i = 0; i < loop_num; i++) {
        const ela = document.createElement('a');
        ela.classList.add('article-box');

        ela.innerHTML = '<img class="article-thumbnail" alt="サムネイル"> \
                        <div class="article-header"> \
                            <div class="attribute"> \
                                <ul class="category"></ul> \
                                <date></date> \
                            </div> \
                        </div><!-- article-header -->'

        const elArticleList = document.querySelector('.article-container');
        elArticleList.appendChild(ela);
    }
}

function updateArticleBoxContents() {

    // 現在のページの先頭番号を計算
    const top_idx = (current_page_idx - 1) * ARTICLE_MAX_NUM;

    const elArticleBox = document.getElementsByClassName('article-box');
    const elArticleThumbnail = document.querySelectorAll('.article-thumbnail');
    const elArticleHeader = document.querySelectorAll('.article-header');
    const elDate = document.getElementsByTagName('date');
    const elCategory = document.querySelectorAll('.category');

    for (let i = 0; i < elArticleBox.length; i++) {
        // サムネイルの更新
        elArticleThumbnail[i].setAttribute("src", current_article_list[top_idx+i]['thumbnail']);

        // 記事タイトルの更新
        const elh1 = document.createElement('h1');
        elh1.innerText = current_article_list[top_idx+i]['title'];
        elArticleHeader[i].appendChild(elh1);

        // // 記事冒頭の更新
        const elp = document.createElement('p');
        elp.innerText = current_article_list[top_idx+i]['opening'];
        elArticleHeader[i].appendChild(elp);

        // 記事日付の更新
        elDate[i].innerText = current_article_list[top_idx+i]['date'];

        // pathの更新
        elArticleBox[i].setAttribute("href", current_article_list[top_idx+i]['path']);

        // タグの更新
        for (let j = 0; j < current_article_list[top_idx+i]['tag'].length; j++) {
            const elli = document.createElement('li');
            elli.innerText = current_article_list[top_idx+i]['tag'][j];
            elCategory[i].appendChild(elli);
        }
    }
}


function update_current_article_list() {
    for ( let i = 0; i < current_article_num; i++ ) {
        current_article_list.push(articles[i])
    }
}

function initialize() {

    // 変数の初期化
    current_article_num = ARTICLE_NUM;
    current_article_list = [];
    current_page_idx = 1;
    current_page_toal_num = Math.floor(ARTICLE_NUM / 3) + 1;
    
    update_current_article_list()
    createArticleBox()
    updateArticleBoxContents()
}


initialize()