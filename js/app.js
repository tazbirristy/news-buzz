const loadAllNews = async () => {
    try {
        const res = await fetch('https://openapi.programming-hero.com/api/news/categories');
        const data = await res.json();
        return data.data.news_category;

    } catch (error) {
        alert(error);
    }
}