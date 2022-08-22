const grid = document.querySelector('#grid')

async function getUser() {
  let res = await fetch('https://randomuser.me/api/?results=12')
  let data = await res.json()

  for (i = 0; i < 12; i++) {
    let api = data.results[i]
    let name = `${api.name.first} ${api.name.last}`
    let email = api.email
    let location = api.location.state
    let img = api.picture.large
    let phone = api.phone
    let address = `${api.location.street.number} ${
      api.location.city
    } ${api.location.state.slice(0, 2).toUpperCase()} ${api.location.postcode}`
    let dob = `Birthday: ${api.dob.date.slice(0, 4)}/${api.dob.date.slice(
      5,
      7
    )}/${api.dob.date.slice(8, 10)}`

    console.log(address)

    makeCard(name, email, location, img, phone, address, dob)
  }
}

function makeCard(name, email, location, img, phone, address, dob) {
  const card = document.createElement('div')

  card.className =
    'h-40 bg-white border-2 border-slate-300 rounded-xl space-x-4 flex justify-start items-center px-5 hover:border-slate-400 hover:cursor-pointer'

  card.innerHTML = `
    <div class="w-32 h-32 rounded-full bg-[url(${img})] bg-no-repeat bg-cover bg-center"></div>
        <div class="flex flex-col space-y-2">
        <h2 class="font-bold text-xl text-slate-700">
            ${name}
        </h2>
        <p class="text-sm text-slate-500">${email}</p>
        <p class="text-sm text-slate-500">${location}</p>
    </div>
  `

  grid.appendChild(card)
  card.addEventListener('click', () => {
    modal(name, email, location, img, phone, address, dob)
  })
}

function modal(name, email, location, img, phone, address, dob) {
  const modal = document.createElement('div')
  modal.className = `px-40 modal`

  const card = document.createElement('div')
  card.className = `absolute m-auto left-0 right-0 bottom-0 top-0 text-center h-[600px] w-[80%] max-w-[540px] bg-white opacity-100 flex flex-col items-center justify-center rounded-lg`

  const close = document.createElement('i')
  close.className = `bx bx-x absolute top-5 right-5 text-2xl hover:cursor-pointer hover:text-red-500`
  close.addEventListener('click', () => {
    document.body.removeChild(modal)
  })

  modal.innerHTML = `
    <div
    class="absolute top-0 left-0 w-screen h-screen bg-black px-40 opacity-50"
    ></div>
  `
  card.innerHTML = `
  <div
    class="absolute m-auto left-0 right-0 bottom-0 top-0 text-center h-[600px] w-[80%] max-w-[540px] bg-white opacity-100 flex flex-col items-center justify-center rounded-lg"
    >

    <div class="space-y-1 ">
        <div
        class="bg-[url(${img})] rounded-full bg-cover bg-center w-40 h-40 opacity-100 block mx-auto mb-5"
        ></div>
        <h2 class="font-bold text-xl text-slate-600">${name}</h2>
        <p class="text-slate-500">${email}</p>
        <p class="text-slate-500 pb-7">${location}</p>
    </div>

    <div class="text-slate-500 space-y-2 pt-9 border-t border-slate-400">
        <p>${phone}</p>
        <p>${address}</p>
        <p>${dob}</p>
    </div>
    </div>`

  modal.appendChild(card)
  card.appendChild(close)
  document.body.appendChild(modal)
}

getUser()
