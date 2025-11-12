import { Browser,chromium,Page,Locator } from "@playwright/test";

let page :Page;
//IIFE
(async() => {
    let browser : Browser = await chromium.launch({
        headless : false,
        channel : 'chrome'
    });
   
//1.multipleFileUploadPopUp
    //for fileUpload Popup ,We should inspect choose file (but should not click)
    // and also we should see the type="file" attribute should be there for there choose button,
    //type="file" and multiple attribute both should be there for multiple FileUpload
    // otherwise we cannot upload the file or we cannot automate

    page = await browser.newPage();
    // page.goto(`https://davidwalsh.name/demo/multiple-file-upload.php`);
    
    // //multiple file upload
    // await page.locator('#filesToUpload').setInputFiles([
        
    //     'C:/Users/Mallukinnis/OneDrive/Documents/mallu.xlsx',
    //     'C:/Users/Mallukinnis/OneDrive/Desktop/Jmeter.pdf',
    //     'C:/Users/Mallukinnis/OneDrive/Desktop/d/hotel.html',
    //     'C:/Users/Mallukinnis/OneDrive/Desktop/d/xpathVScssselector.jpeg',
    // ]);

    //we can create file/s dynamicallywithout having them in our local machine 
    //it is useful for the test cases where you dont want to maiantain the files....

    await page.goto('https://davidwalsh.name/demo/multiple-file-upload.php');

    await page.locator('#filesToUpload').setInputFiles([
    {

        name : 'API notes.docx',
        mimeType : 'text/plain',
        buffer : Buffer.from('An API'),
    },
    {

        name : 'hotel.html',
        mimeType : 'text/html',
        buffer : Buffer.from(''),
    },

])
    
})();
