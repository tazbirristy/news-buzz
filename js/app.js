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
    // most viewed news sorting
    categoryNews.sort((a, b) => (b.total_view > a.total_view) ? 1 : ((a.total_view > b.total_view) ? -1 : 0));

    categoryNews.forEach(news => {
        const cardDiv = document.createElement('div');
        cardDiv.innerHTML = `
        <div  class="card mb-4 p-4">
        <div class="row g-0">
            <div class="col-md-4">
                <img src="${news.thumbnail_url}" class="img-fluid rounded-start" alt="...">
                </div>
                <div class="col-md-8">
                <div class="card-body">
                    <h5 class="card-title">${news.title}</h5>
                    <p class="card-text">${news.details.length > 400 ? news.details.substring(0, 399) + '...' : news.details}</p>

                </div>
                <div class="d-flex align-items-center justify-content-between mt-5">
                    <div class="d-flex align-items-center">
                        <img class="image-round" src="${news.author.img}" alt="">
                        <div class="ms-3">
                            <h6 class="fs-5">${news.author.name ? news.author.name : ' No Data Found'}</h6>
                            <h6 class="fs-6">${news.author.published_date ? news.author.published_date : ' No Data Found'}</h6>
                        </div>
                    </div>
                    <div>
                        <h3 class="fs-5"><i class="fa-regular fa-eye"></i> ${news.total_view ? news.total_view : 'No Data Found'}</h3>
                    </div>
                    <div>
                        <button onclick="loadNewsDetails('${news._id}')" class="border-0 text-primary fw-bold fs-2" data-bs-toggle="modal" data-bs-target="#newsModal"><i class="fa-solid fa-circle-arrow-right"></i>
                    </div>
                </div>
            </div>
        </div>
        </div>
        `;
        newsContainer.appendChild(cardDiv);
    });

    // spinner stop
    toggleSpinner(false);
}

// news details
const loadNewsDetails = async _id => {
    try {
        const url = `https://openapi.programming-hero.com/api/news/${_id}`
        const res = await fetch(url);
        const data = await res.json();
        const detailsNews = data.data;
        displayNewsDetails(detailsNews);

    } catch (error) {
        alert(error);
    }
}

const displayNewsDetails = newsDetails => {
    const newsModalLabel = document.getElementById('newsModalLabel');
    newsModalLabel.innerText = newsDetails[0].title;
    const modalBody = document.getElementById('details-news');
    modalBody.innerHTML = `
    <img class="w-100" src="${newsDetails[0].image_url}">
    <p> ${newsDetails[0].details} </p>
    <div class="d-flex align-items-center justify-content-around">
        <img class="image-round" src="${newsDetails[0].author.img}" >
        <h6>${newsDetails[0].author.name ? newsDetails[0].author.name : 'No Data Found'}</h6>
        <p>${newsDetails[0].author.published_date}</p>
    </div>
    `;

}


setAllMenu();