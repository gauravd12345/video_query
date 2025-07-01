console.log("[MediaAssistant] injecting overlay...");

const iframe = document.createElement("iframe");
// Use chrome API for cross-browser compatibility
const runtime = typeof browser !== 'undefined' ? browser : chrome;
iframe.src = runtime.runtime.getURL("dist/index.html");  
iframe.style.width = "400px";
iframe.style.height = "300px";
iframe.style.position = "fixed";
iframe.style.bottom = "20px";
iframe.style.right = "20px";
iframe.style.border = "2px solid white";
iframe.style.zIndex = "999999";
iframe.style.borderRadius = "12px";
iframe.sandbox = "allow-scripts allow-same-origin";
document.body.appendChild(iframe);
