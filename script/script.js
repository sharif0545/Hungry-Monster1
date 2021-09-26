document.getElementById('searchBtn').addEventListener('click', function(){
    const searchCategory = document.getElementById('searchInput').value;   
    const searchURL = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${searchCategory}`;
    if(!searchCategory){   
        document.getElementById('wrongSearch').innerHTML = 'Please search by country category.';
        document.getElementById('display-items').innerHTML = '';
        document.getElementById('display-item-single').innerHTML = '';
        document.getElementById('country-foods').innerHTML = '';
    }else{
        fetch(searchURL)
        .then(res => res.json())
        .then(data => {
             const menu = data.meals;
              displayAllItems(menu);
        })
        .catch(error => {
            showError('Sorry your search category can not reach.');
        })
        document.getElementById('searchInput').value = '';
        document.getElementById('display-item-single').innerHTML = '';
        document.getElementById('wrongSearch').innerHTML = '';
    }
        
});

const displayAllItems = allItems => {
    if(allItems == null){
        document.getElementById('notFound').innerHTML = 'Search items are not found.';
        document.getElementById('display-items').innerHTML = '';
        document.getElementById('country-foods').innerHTML = '';
    }else{
    let showAllItems = '';
    allItems.forEach(items =>{
        const itemName = items.strMeal;
        const itemID = items.idMeal;
        const itemImg = items.strMealThumb;
        const searchCategory = document.getElementById('searchInput').value;    
       // for dynamic name of  categorized foods 
        const itemURL = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${itemID}`;
        fetch(itemURL)
        .then(res => res.json())
        .then(data => {
            const itemDetails = data.meals;
            const countryItemName = itemDetails[0].strArea;
            document.getElementById('country-foods').innerHTML = countryItemName + ' foods'
        })
         // for dynamic name of  categorized foods 
        
        const showItem = `
            <div class="item-single" onclick="displaySingleItem('${itemID}')">
                <img src="${itemImg}"/>
                <h3 class="item-heading"> ${itemName}</h3>
            </div>
        `;
        showAllItems += showItem;
        document.getElementById('display-items').innerHTML = showAllItems;
    });
    document.getElementById('notFound').innerHTML = '';
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
    .catch(error => {
        showError('Sorry your selected item is not found.');
    })
}

const displaySingleItemDetails = details => {
    details.forEach(items =>{
        const itemDisplay = `
            <div class="display-item-details">
                <h1 id="single-food-display">Display ${items.strArea} food detail</h1>
                <img src="${items.strMealThumb}"/>
                <h2>${items.strMeal}</h2>
                <h3>Ingredients</h3>
                <div class="ingrediants">
                    <div>
                        <ul>
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
                        </ul>

                    </div>
                    <div>
                        <ul>
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
                        </ul>
                    </div>
                </div>
            </div>
        `;
        document.getElementById('display-item-single').innerHTML = itemDisplay;
    });
}

const showError = error => {
    document.getElementById('errorMessage').innerHTML = error;
}




