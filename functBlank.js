

    var mask = () => {
        setTimeout(() => {
            let o = prompt(
            '[Leave Empty For Test] Full Page URL:',
            'https://www.youtube.com/embed/J---aiyznGQ?si=BZNu4186sJuOMK41'
          )
          function iframeThis(url) {
            var U = window.open()
            U.document.body.style.margin = '0'
            U.document.body.style.height = '100vh'
            var i = U.document.createElement('iframe')
            i.style.border = 'none'
            i.style.width = '100%'
            i.style.height = '100%'
            i.style.margin = '0'
            i.src = url
            U.document.body.appendChild(i)
        }
    iframeThis(o)
    }, '1000')
      }


