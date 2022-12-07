import React from "react";
import courtney from "../../images/courtney.jpg"
import mark from "../../images/mark.png"

export const About = () => {
    return (
    <>
        <div>
            About
        </div>
        <div class="mx-auto max-w-lg h-auto" >
            <img src={courtney} />
        </div>
        <div class="mx-auto max-w-lg h-auto">
            <img src={mark} />
        </div>
    </>
)};
