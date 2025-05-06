import React from 'react';
import AgentChat from '@/components/webapp/AgentChat';

const WebappPage: React.FC = () => {
    return (
        <div className="h-screen bg-gray-100">
            <AgentChat />
        </div>
    );
};

export default WebappPage;

// import React from 'react';
// import BookmarkIcon from "@/icons/bookmarkIcon.tsx";
// import SendIcon from "@/icons/sendIcon.tsx";
//
// const WebappPage: React.FC = () => {
//
//     return (
//         <div className="h-screen bg-gray-100 w-full flex">
//             <div className="w-1/3 bg-white border-l max-w-[340px]">
//                 <h1 className={"p-6 text-xl border-b border-gray-300"}>
//                     لیست کاربران
//                 </h1>
//                 <ul className={"divide-y divide-gray-300"}>
//                     <li className={"px-6 py-3"}>
//                         <span className={"text-gray-600 font-medium text-sm"}>کاربر: </span>
//                         <span className={"text-black font-medium text-[15px]"}>42123</span>
//                     </li>
//                     <li className={"px-6 py-3"}>
//                         <span className={"text-gray-600 font-medium text-sm"}>کاربر: </span>
//                         <span className={"text-black font-medium text-[15px]"}>42123</span>
//                     </li>
//                     <li className={"px-6 py-3"}>
//                         <span className={"text-gray-600 font-medium text-sm"}>کاربر: </span>
//                         <span className={"text-black font-medium text-[15px]"}>42123</span>
//                     </li>
//                     <li className={"px-6 py-3"}>
//                         <span className={"text-gray-600 font-medium text-sm"}>کاربر: </span>
//                         <span className={"text-black font-medium text-[15px]"}>42123</span>
//                     </li>
//                 </ul>
//             </div>
//
//             <div className="w-full flex flex-col justify-between">
//                 <div className={"px-3 py-2 overflow-y-auto flex flex-col gap-y-6"}>
//                     {/*send*/}
//                     <div className={"flex items-center justify-start gap-x-2"}>
//                         <div
//                             className={"bg-white max-w-[540px] border border-gray-300 rounded-xl rounded-br-none shadow-input"}>
//                             <span className={"leading-5 inline-block text-xs p-2"}>سلام. اگر سوالی دارید، بپرسید!</span>
//                         </div>
//                         <div className={""}>
//                             <span className={"text-[8px]"}>11:23 ب.ظ</span>
//                         </div>
//                     </div>
//
//                     {/*receive*/}
//                     <div className={"flex items-center flex-row-reverse justify-start gap-x-2"}>
//                         <div
//                             className={"bg-green-600 max-w-[540px] text-white border border-gray-300 rounded-xl rounded-bl-none shadow-input"}>
//                             <span className={"leading-5 inline-block text-xs p-2"}>سلام خوبین .چطور میتونم در اپ جامع، روی یک کیوسک خاص، محصولات خاصی رو نمایش بدم؟</span>
//                         </div>
//                         <div className={""}>
//                             <span className={"text-[8px]"}>11:23 ب.ظ</span>
//                         </div>
//                     </div>
//                 </div>
//                 {/*فرم ارسال*/}
//                 <div className={"mt-auto flex items-center py-4 px-3 gap-x-2"}>
//                     <div
//                         className={"bg-white h-[62px] border border-gray-300 w-full flex items-center justify-between rounded-xl shadow-input"}>
//                         <div className={"flex items-center"}>
//                             <div className={"px-3 border-l py-3"}>
//                                 <BookmarkIcon/>
//                             </div>
//                             <div className={"w-full px-3"}>
//                                 <input
//                                     className={"text-xs w-11/12 outline-none"}
//                                     placeholder={"اینجا بنویسید ..."}
//                                 />
//                             </div>
//                         </div>
//                         <div className={"mx-6 bg-green-600 text-white flex items-center justify-center rounded-3xl gap-x-2 py-2 px-2"}>
//                             <span className={"text-nowrap"}>ارسال پیام</span>
//                             <SendIcon/>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };
//
// export default WebappPage;