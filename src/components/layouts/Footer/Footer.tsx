
import { result } from "@/components/test";
import React from "react";

function Footer() {
//   const getReleaseDate = (ts:number)=>{

//   const date = new Date(ts);
//   const options = {
//     year: "numeric",
//     month: "long",
//     day: "numeric",
//     hour: "2-digit",
//     minute: "2-digit",
//     second: "2-digit",
//     hour12: true, // Use 24-hour time
//   };
//   // @ts-ignore
//   const formattedDate = date.toDateString('en-US', options);
//   return formattedDate
// }

// const Monday = []
// const Tuesday = []
// const Wednesday = []
// const Thursday = []
// const Friday = []
// const Saturday = []
// const Sunday = []

// const sortSchedules = ()=>{
//   const data = result

//   data.map((item)=>{
//     const tsDate= getReleaseDate(item.ts)
  
//     if(tsDate.includes("Mon")){
//       Monday.push(item)
//       return 
//     }
//     else if(tsDate.includes("Tue")){
//       Tuesday.push(item)
//       return 
//     }
//     else if(tsDate.includes("Wed")){
//       Wednesday.push(item)
//       return 
//     }
//     else if(tsDate.includes("Thu")){
//       Thursday.push(item)
//       return 
//     }
//     else if(tsDate.includes("Fri")){
//       Friday.push(item)
//       return 
//     }
//     else if(tsDate.includes("Sat")){
//       Saturday.push(item)
//       return 
//     }
//     else if(tsDate.includes("Sun")){
//       Sunday.push(item)
//       return 
//     }
//   })

// }



  return (
    <footer className="w-full bg-[#1e1e1e] p-4 sm:px-64 text-white flex flex-col justify-center items-center text-lg my- gap-4 ">
      <p className="text-center text-nowrap">All Rights reserved &copy;</p>
      <p className="text-xs text-center ">
        This site does not store any files on our server, we only linked to the
        media which is hosted on 3rd party services.
      </p>
    </footer>
  );
}

export default Footer;
