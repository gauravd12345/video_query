const iframe = document.createElement("iframe");
const runtime = typeof browser !== 'undefined' ? browser : chrome;
iframe.src = runtime.runtime.getURL("dist/index.html");
iframe.style.width = "300px";
iframe.style.height = "400px";
iframe.style.position = "fixed";
iframe.style.bottom = "20px";
iframe.style.right = "20px";
iframe.sandbox = "allow-scripts allow-same-origin allow-forms";
iframe.style.pointerEvents = "auto";
iframe.style.zIndex = "999999";
iframe.style.overflow = "hidden";

document.body.appendChild(iframe);
iframe.onload = () => {
  chrome.runtime.sendMessage({ type: "get-tab-url" }, (response) => {
  const url = response.url;
  document.querySelector("iframe").contentWindow.postMessage(
      { type: "current-url", url },
      "*"
    );
  });

};

window.addEventListener("message", (event) => {
  if (event.data?.type === "resize-iframe") {
    if (event.data.height) {
      iframe.style.height = `${event.data.height}px`;
    }
    if (event.data.width) {
      iframe.style.width = `${event.data.width}px`;
    }
  }
});
