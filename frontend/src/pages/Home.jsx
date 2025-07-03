import React, { useState, useRef, useEffect } from "react";
import Button from "../components/Button";
import { FaPlay, FaPause } from "react-icons/fa6";
import { FaVolumeUp, FaVolumeOff } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import videoSrc from "../assets/final.mp4";

// importing sections

export default function Home() {
  const [showVideo, setShowVideo] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [animateIn, setAnimateIn] = useState(false);
  const videoRef = useRef(null);

  // When modal opens: autoplay & optionally unmute
  useEffect(() => {
    if (showVideo && videoRef.current) {
      const video = videoRef.current;

      video.muted = false;
      video.play().catch(() => {
        video.muted = true;
        video.play();
        setIsMuted(true);
      });

      setIsPlaying(true);
      setIsMuted(false);
      setTimeout(() => setAnimateIn(true), 50); // for slide-in animation
    }
  }, [showVideo]);

  useEffect(() => {
    if (videoRef.current) {
      isPlaying ? videoRef.current.play() : videoRef.current.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isMuted;
    }
  }, [isMuted]);

  return (
    <div className="scroll-smooth overflow-x-hidden">
      {/* Hero Section */}
      <div className="relative w-screen min-h-screen pt-32 lg:pt-0">
        <div
          className={`transition duration-300 ${
            showVideo ? "blur-sm opacity-50" : "opacity-100"
          }`}
        >
          <div className="flex flex-col lg:justify-center items-center min-h-screen px-6  lg:px-40 lg:py-40">
            <h1 className="text-4xl lg:text-5xl font-bold max-w-4xl leading-snug text-center">
              Smart AI-powered&nbsp;
              <span className="text-blue-700">reservation</span>
              <br />
              <span className="block text-blue-700">and booking system.</span>
            </h1>

            <p className="text-base sm:text-lg max-w-3xl text-center p-5">
              Reserve AI uses artificial intelligence to simplify booking and appointment management,
              offering personalized and efficient scheduling for users and businesses.
            </p>

            <div className="flex md:flex-row justify-center w-screen lg:w-full gap-6 p-5 max-w-md">
              <Button
                textValue={"Get 7 days free"}
                className="transition duration-300 ease-in-out hover:scale-105"
              />

              <div
                onClick={() => setShowVideo(true)}
                className="py-2 px-4 flex justify-center items-center border border-gray-200 rounded-3xl cursor-pointer hover:border-gray-300 transition duration-300 ease-in-out w-2/3 lg:w-auto"
              >
                <FaPlay className="text-blue-600 mx-2" />
                <span>Watch video</span>
              </div>
            </div>
          </div>
        </div>

        {/* Video Modal */}
        {showVideo && (
          <div className="absolute inset-0 z-50 flex items-center justify-center pointer-events-auto bg-black/20">
            <div
              className={`relative bg-white rounded-xl p-4 w-full max-w-xl mx-4 shadow-2xl transform transition-transform duration-500 ${
                animateIn ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
              }`}
            >
              <button
                onClick={() => {
                  setAnimateIn(false);
                  setTimeout(() => setShowVideo(false), 300);
                }}
                className="absolute top-2 right-2 bg-black text-white hover:bg-gray-900 rounded-full p-1 z-10 cursor-pointer"
              >
                <IoClose size={18} />
              </button>

              <div className="w-full rounded-lg overflow-hidden">
                <video
                  ref={videoRef}
                  src={videoSrc}
                  className="w-full h-auto"
                />

                <div className="flex items-center justify-between bg-gray-100 px-4 py-2">
                  <button
                    onClick={() => setIsPlaying((prev) => !prev)}
                    className="text-blue-700 hover:text-blue-900"
                  >
                    {isPlaying ? <FaPause size={20} /> : <FaPlay size={20} />}
                  </button>

                  <button
                    onClick={() => setIsMuted((prev) => !prev)}
                    className="text-blue-700 hover:text-blue-900"
                  >
                    {isMuted ? <FaVolumeOff size={20} /> : <FaVolumeUp size={20} />}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      
    </div>
  );
}
