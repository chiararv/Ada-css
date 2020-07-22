
const cardContainer = document.querySelector("#card-container")
const search = document.querySelector("#searchBar")


const jobList = (jobs) => {
  cardContainer.innerHTML = jobs.reduce((accum, job) => {
    return accum + `
    <div class="card card--selected">
      <div class="card__column card__column--left">
        <img src="${job.logo}" alt="${job.company}" class="card__img" />
        <div class="card__info">
          <h2 class="card__subtitle">
            <span class="card__subtitle__texts">${job.company}</span>
            ${isNew(job)}
            ${isFeatured(job)}
          </h2>
          <h2 class="card__title">
            ${job.position}
          </h2>
          <div class="card__detail">
            <p class="card__detail__item">${job.postedAt}</p>
            <p class="card__detail__item">${job.contract}</p>
            <p class="card__detail__item">${job.location}</p>
          </div>
        </div>
      </div>
    <div class="card__column card__column--rigth">
      ${tags(
        [
          job.role,
          job.level,
          ...(job.languages || []),
          ...(job.tools || []),
        ]
      )}
    </div>
  </div>
  `
  }, "")
}

const isNew = (job) => job.new ? `<span class="badge badge--primary">New!</span>` : ""

const isFeatured = (job) => job.featured ? '<span class="badge badge--black">Featured!</span>' : "" 

const tags = (arr) => {
    return arr.reduce((accum, item) => {
    return accum + `<span class="card__tag ${filters.includes(item) && "active"}" onClick="filterJobs('${item}')">${item}</span>`
    }, "")
    
}

let filters = []
let show = false

const showSearch = (show) => {
  if(show){
    const tags= filters.map(i => {
     return `<span class="card__tag">${i} <button onclick="filterJobs('${i}')"> X </button></span>`
    }).join("")
    
    search.innerHTML = `${tags} <div onclick="clearAll()" class="clear-btn"> clear </div>`
    search.classList.remove("hide")
  }else{
    search.innerHTML = ""
    search.classList.add("hide")  
  }

}


const filterJobs  = (item) => {
  show = true

  if(filters.indexOf(item) !== -1){
    filters.splice(filters.indexOf(item), 1)
  }else{
    filters.push(item)
  }

  if(filters.length === 0) {
    show = false
    jobList(jobs) 
  }

  showSearch(show)

  let jobsFiltered = jobs.filter((job) =>{
    return filters.every(filtro => {
     return [
        job.role,
        job.level,
        ...(job.languages || []),
        ...(job.tools || []),
      ].includes(filtro)
    })
  })


  jobList(jobsFiltered)
}

const clearAll = () => {
  filters = []
  show = false
  showSearch(show)
  jobList(jobs) 
}


jobList(jobs)




