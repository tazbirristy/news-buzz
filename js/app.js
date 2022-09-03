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