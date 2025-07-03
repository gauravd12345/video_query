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

// ✅ Wait for iframe to load before sending message
iframe.onload = () => {
  runtime.runtime.sendMessage("get-tab-info", (info) => {
    if (info?.url) {
      console.log("📨 Sending tab URL to iframe:", info.url);
      iframe.contentWindow?.postMessage(
        {
          type: "tab-info",
          url: info.url,
        },
        "*"
      );
    } else {
      console.warn("❌ No tab info received.");
    }
  });
};

let currentUrl = location.href;

const checkUrlChange = () => {
  const newUrl = location.href;
  if (newUrl !== currentUrl) {
    currentUrl = newUrl;
    console.log("🔄 URL changed to:", newUrl);

    // Send to iframe
    iframe.contentWindow?.postMessage({
      type: "tab-info",
      url: currentUrl,
    }, "*");
  }
};

// Watch every 1s (adjustable)
setInterval(checkUrlChange, 1000);


// ✅ Handle resizing from React app
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
