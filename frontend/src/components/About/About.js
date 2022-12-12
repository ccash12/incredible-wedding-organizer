import React from "react";
import courtney from "../../images/courtney.jpg"
import mark from "../../images/mark.png"
import nick from "../../images/nick.png"

export const About = () => {
    return (
    <>
        <div className="text-center text-4xl">
            About Us
        </div>
        <div >
            <div className="grid gap-6 mb-8 md:grid-cols-2 lg:grid-cols-4 " >
                <img src={courtney} />
                <img src={mark} />
                <img src={nick} />
            </div>
        </div>
    </>
)};
