"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send } from "lucide-react";
import Image from "next/image";

interface FloatingWhatsAppButtonProps {
    phoneNumber?: string;
    accountName?: string;
    avatar?: string;
    statusMessage?: string;
    chatMessage?: string;
    placeholder?: string;
    notification?: boolean;
}

export const FloatingWhatsAppButton = ({
    phoneNumber = "573017328112",
    accountName = "Laura",
    avatar = "/images/home/foto-wpp-lokl.png",
    statusMessage = "En línea",
    chatMessage = "Hola! Soy Laura 😊 Tu asesora en inversiones inmobiliarias. ¿Cuál es tu nombre?",
    placeholder = "Escríbenos un mensaje",
    notification = true,
}: FloatingWhatsAppButtonProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [showNotification, setShowNotification] = useState(notification);
    const containerRef = useRef<HTMLDivElement>(null);
    const [inputValue, setInputValue] = useState("");

    // Handle Close on Click Outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                containerRef.current &&
                !containerRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen]);

    // Handle Close on Escape Key
    useEffect(() => {
        const handleEsc = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            window.addEventListener("keydown", handleEsc);
        }

        return () => {
            window.removeEventListener("keydown", handleEsc);
        };
    }, [isOpen]);

    const handleOpen = () => {
        setIsOpen(!isOpen);
        if (!isOpen) {
            setShowNotification(false);
        }
    };

    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        if (!inputValue.trim()) return;

        const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
            inputValue
        )}`;
        window.open(url, "_blank");
        setInputValue("");
    };

    return (
        <div className="fixed bottom-6 right-6 z-[9999] flex flex-col items-end" ref={containerRef}>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, y: 20, transformOrigin: "bottom right" }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: 20 }}
                        className="mb-4 w-[340px] overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-black/5"
                        onClick={(e) => e.stopPropagation()} // Extra safety to prevent bubble-up closure
                    >
                        {/* Header */}
                        <div className="bg-[#075e54] p-4 text-white">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="relative h-10 w-10 overflow-hidden rounded-full border-2 border-white/20">
                                        <Image
                                            src={avatar}
                                            alt={accountName}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-bold leading-none">{accountName}</h3>
                                        <p className="mt-1 text-[11px] opacity-80">{statusMessage}</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="rounded-full p-1 transition-colors hover:bg-white/10"
                                >
                                    <X size={20} />
                                </button>
                            </div>
                        </div>

                        {/* Chat Body */}
                        <div className="relative h-[280px] overflow-y-auto bg-[#e5ddd5] p-4">
                            {/* Background pattern if needed */}
                            <div className="absolute inset-0 opacity-[0.06] pointer-events-none"
                                style={{ backgroundImage: "url('https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png')" }}
                            />

                            <div className="relative z-10">
                                <motion.div
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.3 }}
                                    className="max-w-[85%] rounded-lg rounded-tl-none bg-white p-3 text-[13px] text-gray-800 shadow-sm"
                                >
                                    <p className="font-semibold text-[#075e54] mb-0.5">{accountName}</p>
                                    {chatMessage}
                                    <p className="mt-1 text-[10px] text-right text-gray-400">
                                        {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </p>
                                </motion.div>
                            </div>
                        </div>

                        {/* Footer / Input */}
                        <form onSubmit={handleSendMessage} className="bg-white p-3 flex items-center gap-2 border-t">
                            <input
                                type="text"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                placeholder={placeholder}
                                className="flex-1 rounded-full bg-gray-100 px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#075e54]"
                            />
                            <button
                                type="submit"
                                disabled={!inputValue.trim()}
                                className="flex h-9 w-9 items-center justify-center rounded-full bg-[#075e54] text-white transition-opacity disabled:opacity-50"
                            >
                                <Send size={18} className="ml-0.5" />
                            </button>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Toggle Button */}
            <button
                onClick={handleOpen}
                className="relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25d366] text-white shadow-lg transition-transform hover:scale-110 active:scale-95 z-50"
            >
                <svg
                    viewBox="0 0 24 24"
                    width="32"
                    height="32"
                    stroke="currentColor"
                    strokeWidth="0"
                    fill="currentColor"
                >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>

                <AnimatePresence>
                    {showNotification && !isOpen && (
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0 }}
                            className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-[12px] font-bold text-white shadow-sm"
                        >
                            1
                        </motion.div>
                    )}
                </AnimatePresence>
            </button>
        </div>
    );
};

export default FloatingWhatsAppButton;
