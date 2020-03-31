(function () {
  document.querySelector('.btn').addEventListener('click', function () {
    let serch = document.serchForm.serchVal.value;
    let prom = new Promise(function (resolve, reject) {
      let htmlReques = new XMLHttpRequest();
      htmlReques.open('GET', `https://api.itbook.store/1.0/search/${serch}`)
      document.serchForm.reset();
      document.querySelector('.result').innerHTML = '';
      htmlReques.onload = () => {
        if (htmlReques.readyState == 4 && htmlReques.status == 200) {
          let data = JSON.parse(htmlReques.responseText);
          resolve(data)
        } else {
          reject(Error(htmlReques.statusText))

        }
      }
      htmlReques.send()
    })
    prom
      .then(data => {
        if (data.total > 0) {
          document.querySelector('.result').innerHTML = `<p>first ${data.books.length} books from ${data.total}</p>`
          for (let items of data.books) {
            document.querySelector('.result').innerHTML += `<a href="${items.url}" title="${items.description}"> ${items.title}</a><br>`
          }
        } else {
          document.querySelector('.result').innerText = 'no result'
        }
      }).catch(error => {
        document.querySelector('.result').innerText = 'not today'
      })

  })
})()