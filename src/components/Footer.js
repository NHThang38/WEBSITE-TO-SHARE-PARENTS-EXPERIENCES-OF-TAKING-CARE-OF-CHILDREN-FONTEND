import React from "react";

const Footer = () => {
    return (
            <footer className="text-center text-lg-start bg-dark text-muted pt-1 mt-4" >
                <section className="">
                    <div className="container text-center text-md-start mt-5">
                        <div className="row mt-3">
                            <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
                                <h6 className="text-uppercase fw-bold mb-4">
                                    <i className="fas fa-gem me-3"></i>Family
                                    Forum
                                </h6>
                                <p>
                                    Diễn đàn chia sẻ thông tin, kiến thức kinh
                                    nghiệm chăm sóc con trẻ
                                </p>
                            </div>

                            <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
                                <h6 className="text-uppercase fw-bold mb-4">
                                    Thông tin liên hệ
                                </h6>
                                <p>
                                    <i className="fas fa-home me-3"></i> 12
                                    Nguyễn Văn Bảo, Phường 4, Gò Vấp, Thành phố
                                    Hồ Chí Minh
                                </p>
                                <p>
                                    <i className="fas fa-envelope me-3"></i>
                                    duythld@gmail.com
                                </p>
                                <p>
                                    <i className="fas fa-envelope me-3"></i>
                                    thangtb100@gmail.com
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                <div
                    className="text-center p-4"
                    style={{backgroundColor: '#ecf0f1'}}
                >
                    © 2021 Copyright:
                    <a
                        className="text-reset fw-bold"
                        href="https://mdbootstrap.com/"
                    >
                       FamilyForum.com
                    </a>
                </div>
            </footer>
    );
};

export default Footer;
