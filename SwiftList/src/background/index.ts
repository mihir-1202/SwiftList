import type { ExtensionMessage } from "../types/messages";

// since chrome serializes only the function reference associated with func key when calling scripting.executeScript, all the logic must be within the function itself (the function being injected must be self contained)
function uploadImageToSite(action: string, base64String: string): void 
{
    // inline function to convert base64 to a file object
    const convertBase64ToFile = (base64String: string): File => 
    {
        const dataText = base64String.split(',')[1] || base64String;
        const byteCharacters = atob(dataText);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) 
            byteNumbers[i] = byteCharacters.charCodeAt(i);
       
        const blob = new Blob([new Uint8Array(byteNumbers)], { type: 'image/jpeg' });
        const file = new File([blob], "image.jpg", { type: "image/jpeg" });
        return file;
    }

    // create the file object from the base64 string
    const file = convertBase64ToFile(base64String);

    // upload the image to the appropriate input element on depop's selling page
    if (action === "depop") 
    {
        const inputElement = document.getElementById("upload-input__input") as HTMLInputElement;
        if (inputElement) {
            const dataTransfer = new DataTransfer();
            dataTransfer.items.add(file);
            inputElement.files = dataTransfer.files;
            inputElement.dispatchEvent(new Event("input", { bubbles: true }));
            inputElement.dispatchEvent(new Event("change", { bubbles: true }));
            console.log("Image uploaded to Depop input");
        } else {
            console.error("Could not find Depop upload input element");
        }
    }

    // upload the image to the appropriate input element on grailed's selling page
    else if (action === "grailed") 
    {
        const inputElement = document.getElementById("photo_input_0") as HTMLInputElement;
        if (inputElement) 
        {
            const dataTransfer = new DataTransfer();
            dataTransfer.items.add(file);
            inputElement.files = dataTransfer.files;
            inputElement.dispatchEvent(new Event("input", { bubbles: true }));
            inputElement.dispatchEvent(new Event("change", { bubbles: true }));
            console.log("Image uploaded to Grailed input");
        }
    }    
}

chrome.runtime.onMessage.addListener((message: ExtensionMessage, _sender, _sendResponse) => {
    if ((message.action === "openDepop" || message.action === "openGrailed") && message.base64Image) 
    {
        const url = message.action === "openDepop" 
            ? "https://www.depop.com/products/create/" 
            : "https://www.grailed.com/sell/new";
        
        const site = message.action === "openDepop" ? "depop" : "grailed";
        
        chrome.tabs.create({ url: url, active: true }, (targetTab) => {
            if (targetTab.id) {
                //event listener for when any tab in the browser is updated (url changes, starts or finishes loading, etc.)
                chrome.tabs.onUpdated.addListener(
                    function listener(tabId, info) 
                    {
                        if (tabId === targetTab.id && info.status === 'complete') {
                            chrome.tabs.onUpdated.removeListener(listener); //remove the event listener after the target tab finishes loading so that irrelevant tabs changing don't trigger it
                            
                            chrome.scripting.executeScript({
                                target: { tabId: targetTab.id },
                                args: [site, message.base64Image],
                                func: uploadImageToSite 
                            })
                            .then(() => console.log(`Injected upload script to ${site} tab`));
                        }
                    }
                );
            }
        });
    }
});