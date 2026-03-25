"use client";
import { AsciiArt } from "./ui/ascii-art";
import myImage from "../assets/abi_cv_image1.jpg";

export default function AsciiArtDemo() {
    return (
        <AsciiArt
            src={myImage}
            resolution={100}
            color="#888888"
            animationStyle="fade"
            animationDuration={1.5}
            animateOnView={false}
            className="ascii-demo"
        />
    );
}
