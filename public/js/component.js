const container = document.querySelector('.pokemon.container .row')
let lastCard = container.lastElementChild

const callback = (array) => {
    array.forEach(card => {
        if(card.isIntersecting) {
            observer.unobserve(lastCard)
            apiCall()
            lastCard = document.querySelector('.pokemon.container').lastElementChild
        }
    })
}

const observer = new IntersectionObserver(callback, {threshold: 0.4, rootMargin: "100px"})
observer.observe(lastCard)

const apiCall = async () => {
    const offset = document.querySelectorAll('.pokemon .row .col-lg-2').length
    const form = new FormData
    form.append('offset', offset)

    await fetch('../app/api/load.php', {
        method: "POST",
        body: form,
    }).then(data => data.json())
        .then(res => {

            const newRow = document.createElement('div')
            newRow.classList.add('row')

            for(let pokemon of res.data) {

                const newPokemon = document.createElement('div')
                newPokemon.classList.add('col-lg-2', 'col-sm-4', 'mt-4')

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

                const pokeName = document.createElement('p')
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
            }

            document.querySelector('.pokemon.container').appendChild(newRow)
        }).then(() => {
            observer.observe(lastCard)
        });
}