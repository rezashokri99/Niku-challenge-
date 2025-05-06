import React from 'react';
import ClientChat from '@/components/client/ClientChat';

const ClientPage: React.FC = () => {
    return (
        <div className="h-screen bg-gray-100">
            <ClientChat />
        </div>
    );
};

export default ClientPage;

// import React from 'react';
// import MicrophoneIcon from "@/icons/microphone.tsx";
// import PaperClipIcon from "@/icons/paperClipIcon.tsx";
// import EmojiIcon from "@/icons/emojiIcon.tsx";
// import SendIcon from "@/icons/sendIcon.tsx";
//
//
// const ClientPage: React.FC = () => {
//
//     return (
//         <div className="min-h-screen bg-gray-200">
//             <div
//                 className="w-full bg-white max-w-[366px] h-full min-h-[528px] mx-auto flex flex-col rounded-t-xl rounded-b-xl overflow-hidden border border-gray-50"
//             >
//                 {/*هدر*/}
//                 <div className="flex items-center gap-x-2 bg-green-600 h-16 p-3 pb-2">
//                     <div
//                         className={"bg-green-200 border-2 border-white rounded-full w-9 h-9 flex items-center justify-center"}>
//                         <span className={"h-3.5 text-xs font-medium text-purple-950"}>JD</span>
//                     </div>
//                     <div className={"flex flex-col gap-y-1"}>
//                         <span className={"text-sm font-medium text-white"}>پشتیبانی آنلاین</span>
//                         <span className={"text-xs font-medium text-slate-300"}>پاسخگوی سوالات شما هستیم</span>
//                     </div>
//                 </div>
//
//                 {/* محتوای چت */}
//                 <div className="flex-1 bg-white px-3 py-2 overflow-y-auto flex flex-col gap-y-6">
//                     {/*send*/}
//                     <div className={"flex items-center justify-start gap-x-2"}>
//                         <div
//                             className={"bg-green-400 border-2 border-white rounded-full w-[30px] h-[30px] flex items-center justify-center"}>
//                             <span className={"h-3.5 text-xs font-medium text-purple-950"}>JD</span>
//                         </div>
//                         <div className={"bg-white max-w-[184px] border border-gray-300 rounded-xl rounded-br-none shadow-input"}>
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
//                             className={"bg-green-600 max-w-[184px] text-white border border-gray-300 rounded-xl rounded-bl-none shadow-input"}>
//                             <span className={"leading-5 inline-block text-xs p-2"}>سلام خوبین .چطور میتونم در اپ جامع، روی یک کیوسک خاص، محصولات خاصی رو نمایش بدم؟</span>
//                         </div>
//                         <div className={""}>
//                             <span className={"text-[8px]"}>11:23 ب.ظ</span>
//                         </div>
//                     </div>
//                 </div>
//
//                 {/*فرم ارسال*/}
//                 <div className={"mt-auto bg-white flex items-center py-4 px-3 gap-x-2"}>
//                     <div
//                         className={"border border-gray-300 w-full h-[42px] flex items-center justify-between rounded-xl px-2 py-3 shadow-input"}>
//                         <div className={"flex-1 flex items-center gap-x-2 w-full"}>
//                             <MicrophoneIcon/>
//                             <div className={"w-full"}>
//                                 <input
//                                     className={"text-xs w-11/12 outline-none"}
//                                     placeholder={"اینجا بنویسید ..."}
//                                 />
//                             </div>
//                         </div>
//                         <div className={"flex items-center justify-center gap-x-1"}>
//                             <EmojiIcon/>
//                             <PaperClipIcon/>
//                         </div>
//                     </div>
//                     <div className={"bg-gray-300 p-2.5 rounded-full"}>
//                         <SendIcon/>
//                     </div>
//                 </div>
//             </div>
//
//
//         </div>
//     );
// };
//
// export default ClientPage;