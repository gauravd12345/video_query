console.log("[MediaAssistant] injecting overlay...");

const iframe = document.createElement("iframe");
const runtime = typeof browser !== 'undefined' ? browser : chrome;
iframe.src = runtime.runtime.getURL("dist/index.html");  
iframe.style.width = "300px";
iframe.style.height = "400px";
iframe.style.position = "fixed";
iframe.style.bottom = "20px";
iframe.style.right = "20px";
iframe.sandbox = "allow-scripts allow-same-origin";
iframe.style.pointerEvents = "auto"; // Let iframe receive clicks
iframe.style.zIndex = "999999"; // Sit on top of YouTube elements
iframe.style.overflow = "hidden"; // Prevent iframe content from overflowing

document.body.appendChild(iframe);

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

