import test, { expect } from "playwright/test";
import { getHotelDetailsForYatraSite } from "../script";
import {data} from '../data';

test(`test1`, async({page})=>
{
  let searchDetails:{checkIn:string, checkOut:string, room:string, adults:string, children:string, childrenAge:string, city:string, rating:string}
  = ({checkIn:data.checkInDate, checkOut:data.checkOutDate, room:data.requiredRooms, adults:data.noOfadults, children:data.noOfchildren, childrenAge:data.ageOfchildren, city:data.cityName, rating:data.starRating})
  await getHotelDetailsForYatraSite(page, searchDetails);
})