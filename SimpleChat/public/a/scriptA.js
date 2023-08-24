const iframeChat = document.getElementById('iframeChat');
const iframeInput = document.getElementById('iframeInput');
const iframeSend = document.getElementById('iframeSend');

window.onload = () => {
  iframeSend.addEventListener('click', () => {
    const message = iframeInput.value;
    parent.postMessage(message, 'http://b.com');
    iframeChat.value += `me:>${message}\n`;
    iframeInput.value = '';
  });
}

window.addEventListener('message', (event) => {
  if (event.origin === 'http://b.com') {
    iframeChat.value += `other:>${event.data}\n`;
  }
});