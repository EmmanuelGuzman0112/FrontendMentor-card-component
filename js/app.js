console.log("hola mundo");

const getRandom = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
};

document.addEventListener("DOMContentLoaded", () => {
  const random = getRandom(1, 151);
  fechData(random);
});

const fechData = async (id) => {
  try {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    const resultado = await fetch(url);
    const data = await resultado.json();

    console.log("data", data);

    const pokemon = {
      img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${data.id}.png`,
      imgJuego: data.sprites.front_default,
      imgCvg: data.sprites.other.dream_world.front_default,
      nombre: data.name,
      experiencia: data.base_experience,
      hp: data.stats[0].base_stat,
      ataque: data.stats[1].base_stat,
      defensa: data.stats[2].base_stat,
      especial: data.stats[3].base_stat,
    };

    createCard(pokemon);
  } catch (error) {
    console.log(error);
  }
};

const createCard = (pokemon) => {
    //Capturo el padre del elemento que voy a modificar
    const flex = document.querySelector(".flex");
    //Capturo el elemento que voy a modificar
    const template = document.getElementById("card"). content;
    const clone = template.cloneNode(true);
    const fragment = document.createDocumentFragment();

    //Agrego los datos al clone
    //Imagen
    clone.querySelector(".card-body-img").setAttribute("src", pokemon.imgCvg);

    //Nombre y hp
    clone.querySelector(".card-body-title").innerHTML = `${pokemon.nombre} <span>${pokemon.hp} hp</span>`;

    //Footer
    //Ataque
    clone.querySelectorAll(".card-footer-social h3")[0].textContent = pokemon.ataque + "K";

    //Ataque especial
    clone.querySelectorAll(".card-footer-social h3")[1].textContent = pokemon.especial + "K";

    //Defensa
    clone.querySelectorAll(".card-footer-social h3")[2].textContent = pokemon.defensa + "K";


    //Agrego lo clonado a el html
    fragment.appendChild(clone);
    flex.appendChild(fragment);

}
