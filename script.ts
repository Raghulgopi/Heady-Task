import { Page } from "playwright";

export async function getHotelDetailsForYatraSite(page:Page, searchDetails:{checkIn:string, checkOut:string, room:string, adults:string, children:string, childrenAge:string, city:string, rating:string})
{
    try
    {
        let pageUrl = `https://hotel.yatra.com/hotel-search/seodom/hotelSearch?checkinDate=${searchDetails.checkIn}&checkoutDate=${searchDetails.checkOut}&roomRequests[0].id=${searchDetails.room}&roomRequests[0].noOfAdults=${searchDetails.adults}&roomRequests[0].noOfChildren=${searchDetails.children}&roomRequests[0].childrenAge[0]=${searchDetails.childrenAge}&source=BOOKING_ENGINE&tenant=B2C&city.name=${searchDetails.city}&city.code=&starRating=${searchDetails.rating}&localities=&amenities=&ctg=&pg=1&htlFindMthd=booking%20engine:seo`
        await page.goto(pageUrl, {waitUntil:'load'});
        await page.waitForSelector("#result-wrapper", {state:'visible', timeout:50000});
        let details:{hotel:string, price:number}[]=[];
        let checkNoResult = await page.locator(".original-results").getByText("No hotels found!").isVisible();
        if(checkNoResult)
            details = [{hotel:"No Hotels Found", price:0}]
        else
        {
            let hotelList = page.locator("//div[contains(@class, 'result-item') and @id]");
            let hotelName = page.locator(".result-item").locator(".hotel-name:not(.nowrap)");
            let hotelPrice = page.locator(".result-item").locator("//div[contains(@class, 'new-theme-price')]//p[contains(@class, 'hotel-price-value')]//span[contains(@class, 'rs')]//following-sibling::span")
            for(let i=0;i<await hotelList.count();i++)
                details!.push({hotel:await hotelName.nth(i).innerText(), price:Number((await hotelPrice.nth(i).innerText()).replace(/,/g, ''))})
        }
        details.sort((x,y)=>x.price- y.price)
        console.log("Hotels Details for the search result:")
        console.log(details!);
}
catch(error)
{throw error;}
}
