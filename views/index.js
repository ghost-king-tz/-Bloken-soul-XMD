window.onload = () => {
  const chat = document.querySelector('div.container-fluid')
  const trigger = document.getElementById('msgTrigger')

  function addMsg(text) {
    const html = document.createElement('span')
    html.className = 'msg'
    html.textContent = text
    chat.appendChild(html)
  }

  if (trigger) {
    trigger.addEventListener('click', () => addMsg('Hello from Spectra!'))
  }
}
