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
            <div className="grid gap-6 mb-8 md:grid-cols-2 lg:grid-cols-4" >
                <img src={courtney} />
                <img src={mark} />
                <img src={nick} />
            </div>
            <div className="grid gap-6 mb-8 md:grid-cols-2 lg:grid-cols-4 ">
                <h3>Courtney Cash</h3>
                <h4>Mark Lohse-Miranda</h4>
                <h4>Nick Gray</h4>
            </div>
            <div className="grid gap-6 mb-8 md:grid-cols-2 lg:grid-cols-4"> 
                <p>
                    Hi, my name is Courtney. I currently work at a company called Inofosys as an associate software engineer. I went to the Flatiron School in 2021 where I learned how to code using Javascript, React, Ruby, and Ruby on Rails. Currently I am learning Node.js with this project and I am always looking to build on my knowledge and skills. 
                </p>
            </div>
        </div>
    </>
)};
