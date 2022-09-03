const loadAllNews = async () => {
    try {
        const res = await fetch('https://openapi.programming-hero.com/api/news/categories');
        const data = await res.json();
        return data.data.news_category;

    } catch (error) {
        alert(error);
    }
}

const setAllMenu = async () => {
    const data = await loadAllNews();
    // console.log(data);
    const allMenu = document.getElementById('menu-items');
    for (const news of data) {
        getNewsCategoryDetails(news.category_id, news.category_name);
        const div = document.createElement('div');
        div.innerHTML = `
            <li class="nav-item mx-4 fw-bold menu-hover">
                <a onclick="getNewsCategoryDetails('${news.category_id}', '${news.category_name}')" class="nav-link" href="#home">${news.category_name}</a>
            </li>
        `;
        allMenu.appendChild(div);
    }

}

const getNewsCategoryDetails = async (category_id, category_name) => {
    //    spinner Start
    toggleSpinner(true);
    try {
        const res = await fetch(`https://openapi.programming-hero.com/api/news/category/${category_id}`);
        const data = await res.json();
        const allNews = data.data;
        displayAllNews(allNews);

    } catch (error) {
        alert(error)
    }
    document.getElementById('count-item-name').innerText = category_name;
}

// Spinner 
const toggleSpinner = isClick => {
    const loaderSection = document.getElementById('loader');
    if (isClick) {
        loaderSection.classList.remove('d-none');
    }
    else {
        loaderSection.classList.add('d-none');
    }
}


const displayAllNews = categoryNews => {
    const newsContainer = document.getElementById('news-container');
    newsContainer.textContent = '';
    if (categoryNews.length !== 0) {
        document.getElementById('count-item').innerText = categoryNews.length;
    } else {
        document.getElementById('count-item').innerText = 'No';
    }
}