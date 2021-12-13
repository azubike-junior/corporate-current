import React from 'react'

export default function Footer() {
    return (
       <div className="container container-fixed-lg footer my-4">
        <div className="copyright sm-text-center">
            <p className="small no-margin pull-left sm-pull-reset">
                <span className="">Copyright &copy; 2021 </span>

                <span className="">All rights reserved. </span>
                <span className="sm-block">
                    <a href="https://suntrustng.com/terms-of-use/" target="_blank" className="m-l-10 m-r-10">Terms of
                        use</a>
                    <span className="muted">|</span>
                <a href="https://suntrustng.com/privacy-policy/" target="_blank" className="m-l-10">Privacy
                        Policy</a></span>
            </p>
            <p className="small no-margin pull-right sm-pull-reset">
                Enjoy amazing benefits when you open an account.
            </p>
            <div className="clearfix"></div>
        </div>
    </div>
    )
}
