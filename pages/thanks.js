import React, { useState } from 'react'

export default function Thanks() {

    return (
        <div className="root">
            <div className="container">

                <div className="header">
                    <div className="logo">
                        <img src="./greenLogo.png" alt="" className="logoPic" />
                    </div>
                    <div className="titleBox">
                        <h1>Thank you!</h1>
                        <p>Your details have updated</p>
                    </div>
                </div>

                <div className="main">
                    <div className="app">
                        <h1>Did you know you could use our app?</h1>
                        <div className="btnBox">
                            <a href="https://apps.apple.com/us/app/green/id1454534817?ls=1">
                                <img src="./ios.svg" className="ios" alt="" />
                            </a>
                            <a href="https://play.google.com/store/apps/details?id=green.energy.app">
                                <img src="./google.svg" className="google" alt="" />
                            </a>

                        </div>
                        {/* <button type="submit" className="submitBtn">
                            Download Now
                        </button> */}
                    </div>

                </div>

                <div className="footer">
                    <div className="logo">
                        <img src="./logoGreen.svg" alt="" className="logoPic" />
                    </div>

                    <p>© 2020 Green Supplier Limited</p>

                </div>

            </div>
        </div >)
}
