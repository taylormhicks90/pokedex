const filterTypes = document.querySelectorAll('.filter button span')

for(let type of filterTypes) {
    type.addEventListener('click', (e) => {

        const pokeContainer = document.querySelector('.pokemon.container')
        const form = new FormData;
        form.append('type', e.target.dataset.type)

        const pokemon = async () => {
            const response = await fetch('../app/api/filter.php', {
                method: 'POST',
                body: form
            })

            return await response.json()
        }

       pokemon().then(data => {

           let pokemons = Object.values(data.pokemon)
           let newPokemons = [];

           function* chunk(arr, off) {
               for(let i = 0; i < arr.length; i += off) {
                   yield arr.slice(i, i + off)
               }
           }

           for(let pokemon of [...chunk(pokemons, 6)]) {
               let newRow = document.createElement('div')
               newRow.classList.add('row')

                pokemon.forEach((pokemon, key) => {

                   const newPokemon = document.createElement('div')
                   newPokemon.classList.add('col-lg-2', 'col-sm-4')

                    if(key === 0) {
                        newRow.classList.add('mt-4')
                    }

                   const card = document.createElement('div')
                   card.classList.add('card')

                   const cardBody = document.createElement('div')
                   cardBody.classList.add('card-body')

                   const cardText = document.createElement('div')
                   cardText.classList.add('card-text')

                   const cardTop = document.createElement('div')
                   cardTop.classList.add('d-flex', 'justify-content-between')

                   const cardStrong = document.createElement('strong')
                   cardStrong.innerText = `#${pokemon.id}`

                   const cardSpan = document.createElement('span')
                   cardSpan.innerText = `EXP: ${pokemon.experience}`

                   cardTop.appendChild(cardStrong)
                   cardTop.appendChild(cardSpan)

                   const pokeName = document.createElement('p');
                   pokeName.classList.add('h5', 'mt-2')

                   pokeName.innerText = pokemon.name

                   cardText.appendChild(cardTop)
                   cardText.appendChild(pokeName)

                   for(let type of pokemon.types) {
                       let pokeType = document.createElement('span')
                       pokeType.classList.add('badge', `text-bg-${type}`)
                       pokeType.innerText = type
                       cardText.appendChild(pokeType)
                   }

                   cardBody.appendChild(cardText)

                   const pokeImage = document.createElement('img')
                   pokeImage.classList.add(`card-bg-${pokemon.types[0]}`)
                   pokeImage.src = pokemon.image

                   card.appendChild(pokeImage)
                   card.appendChild(cardBody)

                   newPokemon.appendChild(card)
                   newRow.appendChild(newPokemon)

                })

               newPokemons.push(pokeContainer.appendChild(newRow))
           }

           pokeContainer.replaceChildren(...newPokemons)
       })
    })
}