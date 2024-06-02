"use strict";

(function () {
    let isOpen = false;

    function toggleChat() {
        isOpen = !isOpen;

        const chatContainer = document.querySelector(".dante-embed-chat");

        if (isOpen) {
            chatContainer.style.display = "flex";
            const chatIframe = document.getElementById("dante_chatbot_iframe");
            chatIframe.src = window.danteEmbed;
        } else {
            chatContainer.style.display = "none";
        }
    }

    document.addEventListener("DOMContentLoaded", () => {
        // Chat button
        const chatButton = document.createElement("img");
        chatButton.src = "http://localhost:3000/icons/Horizontal 1.svg";
        chatButton.alt = "Chatbot Icon";
        chatButton.style.cssText = "position: fixed; width: 48px; height: 48px; bottom: 32px; right: 32px; z-index: 99999; background: #f8f8f8; border-radius: 50%; transition: transform 300ms ease-in-out, box-shadow 1500ms ease-in-out; cursor: pointer; box-shadow: 0px 0px 8px 3px rgba(0, 0, 0, 0.2);";
        chatButton.addEventListener("click", toggleChat);
        document.body.appendChild(chatButton);

        // Chat container
        const chatContainer = document.createElement("div");
        chatContainer.style.cssText = "position: fixed; width: 456px; height: 85vh; max-height: 900px; bottom: 30px; right: 30px; z-index: 999999; opacity: 0; transition: all 300ms ease-in-out; pointer-events: none; border: none; border-radius: 8px; box-shadow: 0px 10px 16px rgba(0, 0, 0, 0.25); display: none; align-items: center; justify-content: center; background: #f8f8f8;";
        chatContainer.classList.add("dante-embed-chat");

        const chatIframe = document.createElement("iframe");
        chatIframe.id = "dante_chatbot_iframe";
        chatIframe.src = ""; // leave it empty for now
        chatIframe.title = "Dante AI Chatbot";
        chatIframe.allow = "clipboard-write; microphone";
        chatIframe.style.cssText = "position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: none; border-radius: 8px;";
        chatContainer.appendChild(chatIframe);

        document.body.appendChild(chatContainer);

        // Handle initial open state
        const chatBubbleOpenParam = new URL(window.danteEmbed).searchParams.get("bubbleopen");
        if (chatBubbleOpenParam === "true") {
            setTimeout(() => toggleChat(), 1000);
        }
    });
})();
