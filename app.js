const grid = document.querySelector('#grid')

async function getUser() {
  let res = await fetch('https://randomuser.me/api/')
  let data = await res.json()

  let name = `${data.results[0].name.first} ${data.results[0].name.last}`
  let email = data.results[0].email
  let location = data.results[0].location.state
  let img = data.results[0].picture.large

  console.log(name)
  console.log(email)
  console.log(location)
  console.log(img)

  makeCard(name, email, location)
}

getUser()

function makeCard(name, email, location, img) {
  const card = document.createElement('div')

  card.className =
    'h-40 bg-white border-2 border-slate-300 rounded-xl space-x-4 flex justify-start items-center px-5'

  card.innerHTML = `
    <div class="w-32 h-32 rounded-full bg-[url(${img})] bg-no-repeat bg-cover"></div>
        <div class="flex flex-col space-y-2">
        <h2 class="font-bold text-xl text-slate-700">
            ${name}
        </h2>
        <p class="text-sm text-slate-500">${email}</p>
        <p class="text-sm text-slate-500">${location}</p>
    </div>
  `

  grid.appendChild(card)
}
