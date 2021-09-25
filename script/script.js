document.getElementById('searchBtn').addEventListener('click', function(){
    const searchCategory = document.getElementById('searchInput').value;
    const searchURL = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${searchCategory}`;
    if(!searchCategory){
        alert('Please search by country category.');
    }else{
        fetch(searchURL)
        .then(res => res.json())
        .then(data => {
            const menu = data.meals;
                displayAllItems(menu);
        })
        document.getElementById('searchInput').value = '';
        document.getElementById('display-item-single').innerHTML = '';
    }
        
});

const displayAllItems = allItems => {
    if(allItems == null){
        alert('Search items are not found.');
    }else{
    let showAllItems = '';
    allItems.forEach(items =>{
        const itemName = items.strMeal;
        const itemID = items.idMeal;
        const itemImg = items.strMealThumb;
        const displayItems = document.getElementById('display-items');
        const showItem = `
            <div class="item-single" onclick="displaySingleItem('${itemID}')">
                <img src="${itemImg}"/>
                <h3 class="item-heading"> ${itemName}</h3>
            </div>
        `;
        showAllItems += showItem;
        displayItems.innerHTML = showAllItems;
    });
    }

}

const displaySingleItem = mealID => {
const itemURL = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`;
    fetch(itemURL)
    .then(res => res.json())
    .then(data => {
        const itemDetails = data.meals;
        displaySingleItemDetails(itemDetails);
    })
}

const displaySingleItemDetails = details => {
    details.forEach(items =>{
        const displayItemSingle = document.getElementById('display-item-single');
        const itemDisplay = `
            <div class="display-item-details">
                <h1>Display item detail</h1>
                <img src="${items.strMealThumb}"/>
                <h2>${items.strMeal}</h2>
                <h3>Ingredients</h3>
                <div class="ingrediants">
                    <div>
                        <li>${items.strIngredient1}</li>
                        <li>${items.strIngredient2}</li>
                        <li>${items.strIngredient3}</li>
                        <li>${items.strIngredient4}</li>
                        <li>${items.strIngredient5}</li>
                        <li>${items.strIngredient6}</li>
                        <li>${items.strIngredient7}</li>
                        <li>${items.strIngredient8}</li>
                        <li>${items.strIngredient9}</li>
                        <li>${items.strIngredient10}</li>

                    </div>
                    <div>
                        <li>${items.strIngredient11}</li>
                        <li>${items.strIngredient12}</li>
                        <li>${items.strIngredient13}</li>
                        <li>${items.strIngredient14}</li>
                        <li>${items.strIngredient15}</li>
                        <li>${items.strIngredient16}</li>
                        <li>${items.strIngredient17}</li>
                        <li>${items.strIngredient18}</li>
                        <li>${items.strIngredient19}</li>
                        <li>${items.strIngredient20}</li>
                    </div>
                </div>
            </div>
        `;
        displayItemSingle.innerHTML = itemDisplay;
    });
}




