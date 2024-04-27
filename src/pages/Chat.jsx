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

  useEffect(() => {
    getAllChatsForOneDoctor(localStorage.getItem("id"))
      .then((res) => {
        setChats(res.data);
        console.log(res.data)
      })
      .catch((err) => {
        console.error("Error fetching chats:", err);
      });
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
    setSelectedPatientId(chat.chat_id);
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
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
      <Header />
      <section className="w-full overflow-y-scroll" style={{height:"100%"}}>
      <section className="w-full h-full relative flex flex-col items-center justify-center gap-10  md:flex-col sm:flex-col  xs-flex-col">
        <div className=" z-40 w-full lg:h-full   sm:w-3/4 sm:m-auto sm:h-1/4  transition-transform  sm:translate-x-0">
          <div className="lg:h-full md:h-full sm:h-32 xs:h-32 px-3 py-4 w-full bg-gray-100 dark:bg-gray-800 rounded-xl">
            <div >
              {chats.length > 0 && (
                <ul className="py-5 font-medium flex items-center justify-around overflow-x-scroll">
                  {chats.map((chat, index) => (
                   <>
                   <li
                      className={`flex flex-col items-start w-96  shadow-lg shadow-gray-300 p-5  text-gray-900 rounded-lg dark:text-white ${selectedPatientId === chat.chat_id ? 'bg-blue-500 text-white' : ''}`}
                      key={index}
                      onClick={() => handleChatClick(chat)}
                    >
                      <ChatItem
                        src={chat?.patient?.personal_image}
                        key={index}
                        name={`${chat?.patient.first_name} ${chat?.patient.last_name}`}
                      />
                    </li>
                    </>
                  ))}
                </ul>
              )}
            </div>
            {/* <div className="w-full h-px my-4 bg-black"></div> */}
          </div>
        </div>

        <div className="px-3 w-full" style={{height:"80vh"}}>
          <div className="w-full h-full mb-4 border border-gray-200 rounded-lg bg-gray-100 dark:bg-gray-700 dark:border-gray-600 relative bg">
            <div className="h-5/6 bg-white w-full rounded-md border p-4 flex flex-col gap-3 justify-start items-start overflow-y-scroll" id="scrollableDiv" ref={scrollRef}>
              {messages.messages &&
                messages.messages.map((message, index) => {
                  return message.sender == localStorage.getItem("id") ? (
                    <div
                      key={index}
                      className="max-w-lg ms-auto flex justify-end gap-x-2 sm:gap-x-4"
                    >
                      <div className="grow text-end space-y-3">
                        <div className="inline-block bg-blue-600 rounded-2xl p-4 shadow-sm">
                          <p className="text-sm text-white">{message.content}</p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div
                      key={index}
                      className="max-w-lg flex gap-x-2 sm:gap-x-4"
                    >
                      <div className="bg-white border border-gray-200 rounded-2xl p-4 space-y-3 dark:bg-slate-900 dark:border-gray-700">
                        <p className="text-sm text-gray-800 dark:text-white">
                          {message.content}
                        </p>
                      </div>
                    </div>
                  );
                })}
            </div>
            <div className=" h-1/6 flex items-center justify-center gap-4 px-5 py-4 border-t bg-gra dark:border-gray-600 absolute left-0 right-0 bottom-0">
              <input
                type="text"
                placeholder="Type your message..."
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
        </div>
      </section>
      </section>
    </>
  );
}

export default Chat2;
