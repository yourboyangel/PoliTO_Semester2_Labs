import dayjs from 'dayjs';

function Film(id, title, favorite=false, watchDate=null, rating=null, userId=1){
    this.id = id;
    this.title = title;
    this.favorite = favorite;
    //A better way to initialize the date would be with a && check to make sure the value is stored as null rather than an Invalid Date object when no date is provided. That is why isValid() checks needed to be done in the sortByDate function. 
    this.watchDate = dayjs(watchDate);
    this.rating = rating;
    this.userId = userId;

    //This makes more sense to return a string but I am not redoing it LOL
    this.toString = () => {
        console.log(
            `Id: ${this.id}, Title: ${this.title}, Favorite: ${this.favorite}, Watch date: ${this.watchDate.format('MMMM D, YYYY')}, Rating: ${this.rating}, User id: ${this.userId}`
        );
    }
};

function FilmLibrary(){
    this.films_array = [];
    this.addFilm = (film) => { 
        if(!this.films_array.some(f => f.id === film.id)){
            this.films_array.push(film);
        }
        else{
            console.log("Film already in library!");
        }

    };

    this.sortByDate = () => {
        const newArray = [...this.films_array];
        newArray.sort((a,b) => { 
            if(!a.watchDate || !a.watchDate.isValid()) return 1;
            if(!b.watchDate || !b.watchDate.isValid()) return -1;
            return a.watchDate.diff(b.watchDate);

        });
        return newArray;
    };

    this.removeFilm = (id) => {
        const newArray = this.films_array.filter((film) => {return film.id !== id}); 
        this.films_array = newArray;
    };
    
    this.updateRating = (id, new_rating) => {
        const index = this.films_array.findIndex((film) => film.id === id);
        this.films_array[index].rating = new_rating;
    };


};

const film_lib = new FilmLibrary();

const film1 = new Film(1, "Pulp Fiction", true, "2025-03-10", 5);
const film2 = new Film(2, "21 Grams", true, "2025-03-17", 4);
const film3 = new Film(3, "Star Wars");
const film4 = new Film(4, "Matrix");
const film5 = new Film(5, "Shrek", false, "2025-03-21", 3);

film_lib.addFilm(film1);
film_lib.addFilm(film2);
film_lib.addFilm(film3);
film_lib.addFilm(film4);
film_lib.addFilm(film5);

film_lib.films_array.forEach(film => film.toString());

const sorted_library = film_lib.sortByDate();
console.log("Sorted library");
sorted_library.forEach(film => film.toString());

console.log("Removing sth");
film_lib.removeFilm(4);
film_lib.films_array.forEach(film => film.toString());


film_lib.updateRating(2,5);
console.log("Updated ranking");
film_lib.films_array.forEach(film => film.toString());

