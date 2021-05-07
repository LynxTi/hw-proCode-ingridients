const menuContainer = document.querySelector('.userDish-container');
const formIngridents = document.querySelector('.SelctionByIngridents');
const formDish = document.querySelector('.SelctionByDish');
const similarUserDishContainer = document.querySelector('.similarUserDish-container');



const ingridents = [
    {id: '1', name: 'лук'},
    {id: '2', name: 'картошка'},
    {id: '3', name: 'курица'},
    {id: '4', name: 'свинина'},
    {id: '5', name: 'говядина'},
    {id: '6', name: 'сыр'},
    {id: '7', name: 'оливки'},
    {id: '8', name: 'перец'},
    {id: '9', name: 'капуста'},
    {id: '10', name: 'томаты'},
    {id: '11', name: 'огурец'},
    {id: '12', name: 'свекла'}
]
const dishes = [
    {name:'Греческий салат', ingridents: ['10', '6', '7']},
    {name:'Салат цезарь', ingridents: ['10', '3', '7']},
    {name:'салат венегрет', ingridents: ['12', '11', '2']},
    {name:'Борщ', ingridents: ['3', '12', '2']},
    {name:'Пицца', ingridents: ['3', '6', '8' , '7', '10']},
    {name:'Перец фаршированый', ingridents: ['3', '8', '10']},
    {name:'Медальеный', ingridents: ['1', '4', '10']},
    {name:'Стейк с картошкой фри', ingridents: ['5', '8', '2']},
    {name:'Бургер с картошкой фри', ingridents: ['5', '6', '1', '8', '10']},
    {name:'Оливье', ingridents: ['3', '11', '2']}
]
let counterID = 0;

const renderDishes = (insertionPosition, dishes) => { 
    const htmlCode =  dishes.reduce((acam, item) => {
        acam += `<div class="dish">Блюдо: ${item.name}</div>`;
        return acam;
    },'');

    insertionPosition.innerHTML = htmlCode;
}

const getIdIngridient = (userIngrident) => {
    const id = ingridents.reduce( (prev, ingridient) => {
        if (userIngrident === ingridient.name) {
            return prev + ingridient.id 
        } else {
            return prev + '';
        }
    },'');

    return id;
}

const findDishByIngrident = (idIngrident) => {
    const dishesForUser = menu.filter(dish => {
        if (dish.ingridients.includes(idIngrident)) {
            return dish;
        }
    });

    return dishesForUser;
}

const Dish = function(data) {
    this.id = counterID;
    this.name = data.name;
    this.ingridients = data.ingridents;
    counterID++;
}

const menu = dishes.map( dish => {
    const newDishInMenu = new Dish(dish)

    return newDishInMenu;
})

formIngridents.addEventListener('submit', (event)=> {
    event.preventDefault();

    const dataFormIngridents = new FormData(formIngridents);
    const idIngrident = getIdIngridient(dataFormIngridents.get('nameIngridient'));
    const dishesForUser = findDishByIngrident(idIngrident);

    renderDishes(menuContainer, dishesForUser)

});

// ---------------------------------------------------------------------------------------------------------   lv2

const findDishByName = (dishName) => {
    const dishForUser = menu.find(dish => {
        if (dishName === dish.name) {
            return dish;
        }
    });

    return dishForUser;
}

const findSimilarDishes = dish => {
    const similarDishes = menu.filter(dishInMenu => {
        let repeatCounter = 0;

        for (const ingridient of dish.ingridients) {
            if (dishInMenu.ingridients.includes(ingridient)) {
                repeatCounter++;
            }
        }

        if (repeatCounter > 2) {
            return dishInMenu;
        }
    });

    return similarDishes;
}

formDish.addEventListener('submit', (event)=> {
    event.preventDefault();

    const dataFormDish = new FormData(formDish);
    const dishForUSer = findDishByName(dataFormDish.get('nameDish'));
    const similarDishes = findSimilarDishes(dishForUSer);
    
    renderDishes(menuContainer, [dishForUSer]);
    renderDishes(similarUserDishContainer, similarDishes);
});

// const myDish = findDishByName('Пицца');
// console.log(myDish);
// const mysimilarDishes = findSimilarDishes(myDish);
// console.log(mysimilarDishes);