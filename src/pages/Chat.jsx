import { ScrollArea } from "@/components/ui/scroll-area";
import { useEffect, useState, useRef } from "react";
import ChatItem from "@/components/common/ChatItem";
import doctor3 from "../assets/doctor3.png";
import {
  getAllChatsForOneDoctor,
  getAllMessagesForOneChat,
  sendMessage,
  getChatById,
  getMessageCount,
} from "@/services/homeServices";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import useRequireAuth from "@/custom hooks/useRequireAuth";

function Chat2() {
  useRequireAuth();
  // const [selectedChat, setSelectedChat] = useState([]);
  // const [count, setcount] = useState(0);
  // const [chatId, setChatId] = useState(1);
  const scrollRef = useRef(null);
  const [chats, setChats] = useState([]);
  const [selectedPatientId, setSelectedPatientId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(true);
  const [messagesLoading, setMessagesLoading] = useState(false); // New state for messages loading

  useEffect(() => {
    setLoading(true);
    getAllChatsForOneDoctor(localStorage.getItem("id"))
      .then((res) => {
        setChats(res.data);
        console.log(res.data)
      })
      .catch((err) => {
        console.error("Error fetching chats:", err);
      });
      setLoading(false);
  }, []);

  useEffect(() => {
    let timer;
    const fetchMessages = async () => {
      if (selectedPatientId) {
        getAllMessagesForOneChat(selectedPatientId)
          .then((res) => {
            setMessages(res.data);
          })
          .catch((err) => {
            console.error("Error fetching messages for patient:", err);
          });
      }
    };

    fetchMessages();
    timer = setInterval(fetchMessages, 2000);

    return () => {
      clearInterval(timer);
    };
  }, [selectedPatientId]);

  useEffect(() => {
    // Scroll to the end after messages state has been updated
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);

  const handleChatClick = (chat) => {
    setMessagesLoading(true);
    setSelectedPatientId(chat.chat_id);
    setMessages([]); // Clear messages when switching doctors
    setMessagesLoading(false);
  };

  const messagesSent = async () => {
    await sendMessage(selectedPatientId, localStorage.getItem("id"), inputValue);
    getAllMessagesForOneChat(selectedPatientId)
      .then((res) => {
        setMessages(res.data);
        var inputs = document.getElementsByClassName("message_value");
        for (var i = 0; i < inputs.length; i++) {
          inputs[i].value = "";
        }
        // Scroll to the end after sending the message
        scrollRef.current?.scrollTo({
          top: scrollRef.current.scrollHeight,
          behavior: "smooth",
        });
      })
      .catch((err) => {
        console.error("Error fetching messages for doctor:", err);
      });
  };

  return (
    <>
    <section className="w-full h-screen">
      <Header />
      {loading ? (
        <div className="h-96 w-full flex justify-center items-center">
          <div className="text-center w-full flex flex-col justify-center items-center">
            <i className="fa-solid fa-spinner fa-10x" style={{ color: "rgb(148 163 184)" }}></i>
            <h2 className="text-5xl primary-text-bold text-slate-400 py-7">Loading....</h2>
          </div>
        </div>
      ) : chats.length > 0 ? (
        <section className="w-full h-full flex lg:flex-row md:flex-col sm:flex-col xs:flex-col">
          <div className="lg:w-2/6 md:w-full sm:w-full xs:w-full p-5 lg:overflow-y-scroll lg:overflow-x-hidden md:overflow-x-scroll md:overflow-y-hidden sm:overflow-x-scroll sm:overflow-y-hidden xs:overflow-x-scroll">
            <div>
              <ul className="font-medium flex lg:flex-col items-center h-full w-full gap-3">
                {chats.map((chat, index) => (
                  <li
                    className={`p-3 flex flex-col items-start w-full shadow shadow-gray-300 my-2 text-gray-900 rounded-lg dark:text-white ${selectedPatientId === chat.chat_id ? 'bg-blue-500 text-white' : ''}`}
                    key={index}
                    onClick={() => handleChatClick(chat)}
                  >
                    <ChatItem
                      src={chat?.patient?.personal_image}
                      key={index}
                      name={`${chat?.patient.first_name} ${chat?.patient.last_name}`}
                    />
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="lg:w-4/6 md:w-full sm:w-full xs:w-full h-full relative">
            {messagesLoading && (
              <div className="absolute inset-0 flex justify-center items-center bg-gray-100 bg-opacity-75 z-50">
                <i className="fa-solid fa-spinner fa-3x animate-spin" style={{ color: "rgb(148 163 184)" }}></i>
              </div>
            )}
            <div className="w-full rounded-md border p-4 flex flex-col gap-3 justify-start items-start overflow-y-scroll h-5/6" id="scrollableDiv" ref={scrollRef}>
              {messages.messages &&
                messages.messages.map((message, index) => (
                  message.sender == localStorage.getItem("id") ? (
                    <div key={index} className="max-w-lg ms-auto flex justify-end gap-x-2 sm:gap-x-4">
                      <div className="grow text-end space-y-3">
                        <div className="inline-block bg-blue-600 rounded-2xl p-4 shadow-sm">
                          <p className="text-sm text-white">{message.content}</p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div key={index} className="max-w-lg flex gap-x-2 sm:gap-x-4">
                      <div className="bg-white border border-gray-200 rounded-2xl p-4 space-y-3 dark:bg-slate-900 dark:border-gray-700">
                        <p className="text-sm text-gray-800 dark:text-white">{message.content}</p>
                      </div>
                    </div>
                  )
                ))}
            </div>
            <div className="h-1/6 flex items-center justify-center gap-4 px-5 py-4 border-t bg-gray-50 dark:border-gray-600 absolute left-0 right-0 bottom-0">
              <input
                type="text"
                placeholder="Type your message..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="w-full py-3 px-4 rounded-xl bg-white text-black message_value"
              />
              <button
                onClick={messagesSent}
                type="submit"
                className="flex justify-center items-center h-14 w-14 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-full focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800"
              >
                <i className="fa-solid fa-paper-plane fa-2x" style={{ color: "white" }}></i>
              </button>
            </div>
          </div>
        </section>
      ) : (
        <div className="flex justify-center items-center h-full">
          <div className="text-center w-full flex flex-col justify-center items-center">
            <i className="fa-solid fa-ban fa-10x" style={{ color: "rgb(148 163 184)" }}></i>
            <h2 className="text-5xl primary-text-bold text-slate-400 py-7">No Chats Yet</h2>
          </div>
        </div>
      )}
    </section>
  </>
  );
}

export default Chat2;


    //  <section className="w-full h-full relative flex  justify-between sm:flex-col  xs-flex-col">
    //     {/* <div className=" z-40 w-1/4 lg:h-full   sm:w-3/4 sm:m-auto sm:h-1/4  transition-transform  sm:translate-x-0 bg-black"> */}
    //       <div className="w-2/6">

    //         {/* <div className="w-full h-px my-4 bg-black"></div> */}
    //       </div>
    //     {/* </div> */}

        
    //       <div className="w-/6 bg-red-700">
            
    //       </div>

    //   </section> 