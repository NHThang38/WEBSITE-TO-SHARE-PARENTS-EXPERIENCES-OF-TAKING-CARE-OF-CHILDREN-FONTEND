import React from "react";

const Rules = () => {
    document.title = "Quy định- điều khoản";
    return (
        <div className="pt-4 container">
            <h2>Điều khoản của website</h2>
            <h5 className="text-danger">CHÚ Ý: Khi bạn sử dụng FamilyForum thì được xem là đồng nghĩa với việc bạn đã đọc hiểu và đồng ý mọi điều khoản trong quy định này. Nếu bạn không đồng ý với bất cứ điều khoản nào trong quy định này thì hãy ngay lập tức rời bỏ trang web FamilyForum này vì nếu bạn tiếp tục sử dụng hay viện dẫn thông tin từ FamilyForum là đồng nghĩa với việc bạn chấp nhận và đồng ý với mọi điều khoản trong quy định này.</h5>
            <ul>
                <li> Đăng nhập thành viên hợp lệ trước khi post bài .</li>
                <li>
                    {" "}
                    Đăng tin vào đúng diễn đàn (forum). Bài của bạn có thể bị
                    xóa, di chuyển mà không được thông báo nếu bạn đăng bài
                    không đúng forum.
                </li>
                <li>
                    {" "}
                    Đặt tiêu đề topic phù hợp với nội dung: Bạn cần chọn một
                    tiêu đề phù hợp với nội dung trao đổi. Nếu bạn đặt tiêu đề
                    không phù hợp BQT có thể sẽ tự động sửa lại tiêu đề hoặc
                    chuyển bài đến khu vực khác.
                </li>
                <li>
                    {" "}
                    Không post nhiều lần: Hãy chắc chắn là bạn không đăng một
                    bài làm nhiều lần hoặc đăng lại nội dung đã có, hãy tìm kiếm
                    trong diễn đàn những bài, câu hỏi và trả lời đã có sẵn
                    trước. Điều này tránh cho việc một câu hỏi được xuất hiện
                    nhiều lần và làm mất đi sự thống nhất.
                </li>
                <li>
                    {" "}
                    Không gửi tin nhắn để quảng cáo trừ trường hợp được người
                    nhận đồng ý.
                </li>
                <li>
                    {" "}
                    Không phê phán, chỉ trích, xúc phạm, vu khống hay làm phiền
                    người khác: Xin vui lòng không dùng những lời lẽ chỉ trích
                    cá nhân làm phiền lòng hoặc làm cho người khác mất vui. Đặc
                    biệt, tránh mọi hình thức quấy rối, khiêu khích, đe dọa hoặc
                    làm tổn hại lòng tự trọng của người khác, làm ảnh hưởng đến
                    hòa khí trên diển đàn.
                </li>
                <li>
                    {" "}
                    Không được kỳ thị vùng miền. Không được gọi người khác là
                    "phản động", nếu BQT phát hiện một thành viên gọi một người
                    khác là "phản động" sẽ khóa nick ngay lập tức mà không cần
                    có cảnh báo trước.
                </li>
                <li>
                    {" "}
                    Những thành viên mới có thời gian tham gia dưới 1 tháng và
                    có số bài viết dưới 50 bài mà không cung danh tính cụ thể
                    (gửi PM Họ tên, Địa chỉ, Điện thoại cho BQT với nick Mod
                    MSTD) thì những bài phản hồi, phàn nàn đó có thể bị xóa bất
                    cứ lúc nào mà không cần có thông báo trước.
                </li>
                <li>
                    {" "}
                    Các phản hồi về thành viên diễn đàn Family Forum cần phải được
                    đưa vào mục ĐỐI CHẤT, còn phàn nàn hay phản hồi về các đối
                    tượng ngoài diễn đàn cần phải đưa vào mục báo cáo.
                    Nếu phản hồi sai mục, tất cả những bài viết phản hồi đó có
                    thể bị xóa bỏ mà không cần có thông báo trước. Trường hợp
                    phản hồi một cách không tích cực hoặc về vấn đề không tích
                    cực ngoài phạm vi diễn đàn người có thông tin phản hồi cần
                    gửi thông tin cá nhân cho BQT và ghi rõ "Tôi cam kết rằng
                    thông tin này trung thực và chịu trách nhiệm cá nhân trước
                    pháp luật về những thông tin mà tôi đăng lên diễn đàn Family Forum." Nếu người đăng thông tin phản hồi mà không đảm bảo
                    điều kiện đó, BQT có quyền xóa bỏ thông tin bất cứ lúc nào
                    mà không cần có thông báo trước.
                </li>
                <li>
                    {" "}
                    Để đảm bảo tránh những trường hợp nặc danh nhằm bôi nhọ cá
                    nhân, tổ chức,... rất mong các thành viên diễn đàn chung tay
                    giúp BQT thông báo về các trường hợp vi phạm.
                </li>
                <li>
                    {" "}
                    Không đăng thông tin có nội dung không lành mạnh, khiêu dâm,
                    gây mất đoàn kết hoặc các thông tin vi phạm đạo đức.
                </li>
                <li>
                    {" "}
                    Không đăng các liên kết web đến các địa chỉ không lành mạnh
                    hoặc các địa chỉ của các website chứa thông tin của những kẻ
                    khủng bố, bom thư, có chứa virus/spyware...
                </li>
                <li>
                    {" "}
                    Xin vui lòng tôn trọng sự riêng tư của người khác: Không
                    đăng thông tin về địa chỉ, số điện thoại, địa chỉ email của
                    một người khác trừ trường hợp được sự đồng ý.
                </li>
                <li>
                    {" "}
                    Mỗi thành viên xin chỉ đăng ký 1 account. Trong trường hợp
                    bạn là một doanh nghiệp bạn có thể đăng ký tạo nhóm nick tại
                    đây.
                </li>
                <li>
                    {" "}
                    Mỗi thành viên có trách nhiệm tôn trọng sự riêng tư của
                    người khác, không gửi tin nhắn spam, không dùng thủ thuật để
                    câu kéo bài lên.
                </li>
                <li>
                    {" "}
                    Không đăng quảng cáo vào các nội dung thảo luận của diễn
                    đàn. Trong diễn đàn có phần "Mua Sắm, Tiêu dùng" để các
                    thành viên có thể đăng thông tin bán hàng hoặc cần mua. Tại
                    đây bạn cần đăng thông tin một cách đúng mục. Điều đó có
                    nghĩa nếu bạn đăng topic bán đồ trẻ em thì không đăng trong
                    mục dành cho người lớn, không đăng bán đồ mỹ phẩm hay quần
                    áo trong mục Thực phẩm...
                </li>
                <li>
                    {" "}
                    Không đặt nhiều liên kết vào các từ khoá để liên kết đến một
                    địa chỉ trang web. Khi BQT phát hiện ra những bài viết có
                    đặt nhiều liên kết chỉ để nhằm mục đích SEO thì BQT sẽ có
                    quyền xoá bài và khoá tài khoản của người đó. Bạn có thể
                    đăng liên kết để giới thiệu cho thành viên biết đến các
                    trang web, nhưng lợi dụng để SEO sẽ được coi là vi phạm quy
                    định.
                </li>
                <li>
                    {" "}
                    Tại khu vực bán hàng, một người không tạo quá nhiều chủ đề
                    (topic) cho những chủng loại mặt hàng giống nhau. Không dùng
                    thủ thuật để kéo topic lên bằng những bài viết vô nghĩa hoặc
                    nội dung trùng lặp.
                </li>
                <li>
                    {" "}
                    Chính trị và tôn giáo: Diễn đàn này được lập không phải vì
                    mục đích chính trị hay tôn giạo Do vậy những nội dung liên
                    quan đến chính trị và tôn giáo là không phù hợp với diễn đàn
                    này. Tuy nhiên, những bài viết có nội dung chính trị hay tôn
                    giáo không phải là những điều cấm kỵ trên diễn đàn này.
                </li>
                <li>
                    {" "}
                    Nội dung của bài viết: Tác giả của bài viết tự chịu trách
                    nhiệm về nội dung mà mình đăng tin. Ban quản trị diễn đàn
                    không chịu trách nhiệm về thông tin do người sử dụng đăng
                    lên.
                </li>
                <li>
                    {" "}
                    Sử dụng tiếng Việt: Tiếng Việt là ngôn ngữ chính để sử dụng
                    trong diễn đàn, do vậy rất mong mọi người sử dụng chữ tiếng
                    Việt có dấu. Tuy nhiên bạn có thể dùng tiếng Anh trong những
                    trường hợp thật cần thiết.
                </li>
                <li>
                    {" "}
                    Gõ tiếng Việt: Diễn đàn có tích hợp chức năng gõ tiếng Việt
                    có dấu (tức là trên máy của bạn không cần cài phần mềm gõ
                    tiếng Việt). Để chọn kiểu gõ phù hợp, bạn chỉ việc nhìn
                    xuống dòng trạng thái (status bar) của trình duyệt và bấm
                    phím F8 để chọn kiểu gõ phù hợp với mình nhất.
                </li>
                <li>
                    {" "}
                    Các hoạt động cộng đồng: Các hoạt động cộng đồng do thành
                    viên tự lập không được sử dụng tên, biểu tượng (logo), hình
                    ảnh của Family Forum nếu không được sự đồng ý của ban quản
                    trị. Ban quản trị có quyền can thiệp và yêu cầu chấm dứt bất
                    cứ hoạt động cộng đồng nào dựa trên diễn đàn Family Forum mà
                    không cần phải giải thích lý do.
                </li>
                <li>
                    {" "}
                    Quyền sở hữu thông tin: Tất cả thông tin trên diễn đàn Family Forum bao gồm bài viết, thông tin về tài khoản, danh sách
                    người sử dụng và những thông tin khác trên diễn đàn Family Forum đều thuộc quyền sở hữu của BQT diễn đàn Family Forum.
                </li>
                <li>
                    {" "}
                    Khai thác thông tin: Bạn không được quyền khai thác thông
                    tin như danh sách thành viên, địa chỉ email, các thông tin
                    liên lạc và nội dung bài viết, cấu trúc của diễn đàn Family Forum cho những mục đích thương mại, kinh doanh hoặc dùng cho ý
                    định cạnh tranh lại với Family Forum.
                </li>
                <li>
                    {" "}
                    Sử dụng phần mềm đăng bài tự động, dùng phần mềm khai thác
                    thông tin thành viên tự động, hoặc đăng ký tài khoản tự động
                    bằng phần mềm tại diễn đàn Family Forum (Family Forum) mà
                    không được sự đồng ý của BQT diễn đàn là vi phạm nghiêm
                    trọng quy định của diễn đàn và bạn phải chịu phạt số tiền
                    lên tới 10 tỷ đồng cho BQT diễn đàn. Điều này có nghĩa khi
                    bạn sử dụng phần mềm đăng bài tự động, khai thác thông tin
                    tự động, đăng ký tạo tài khoản tự động mà không được sự đồng
                    ý của BQT là bạn cam kết nộp phạt 10 tỷ đồng cho BQT.
                </li>
                <li>
                    {" "}
                    Việc sử dụng dịch vụ hoặc cung cấp dịch vụ nhằm lừa dối có
                    tính hệ thống như nói xấu người khác hoặc cạnh tranh không
                    lành mạnh, tung hứng bán hàng là vi phạm nghiêm trọng quy
                    định của diễn đàn và người vi phạm phải chịu phạt với số
                    tiền lên đến 5 tỷ đồng cho BQT diễn đàn. Điều này có nghĩa
                    là nếu bạn sử dụng hoặc cung cấp dịch vụ lừa dối có tính
                    chất hệ thống là đồng nghĩa với việc bạn cam kết sẽ nôp phạt
                    cho BQT với số tiền 5 tỷ đồng.
                </li>
                <li>
                    {" "}
                    Khi bạn đồng ý với điều khoản này cũng đồng nghĩa với việc
                    bạn đồng ý rằng việc khai thác thông tin cá nhân của thành
                    viên diễn đàn, sử dụng phần mềm để đăng tin hoặc khai thác
                    thông tin tự động, sử dụng các tính năng của diễn đàn vào
                    các mục đích, hay những hoạt động có tính chất cạnh tranh
                    với Family Forum, SPAM, hoặc lừa dối là bất hợp pháp, và bạn
                    sẽ phải chịu trách nhiệm bồi thường mọi thiệt hại cũng như
                    chịu mọi trách nhiệm hay hậu quả có liên quan. Khi bạn tạo
                    tài khoản, kích hoạt, và sử dụng các tính năng của diễn đàn
                    là đồng nghĩa với việc bạn đã ĐỌC, HIỂU và ĐỒNG Ý với quy
                    định này.
                </li>
                <li>
                    {" "}
                    Không sử dụng thông tin ở Family Forum để chống lại ban quản
                    trị trang web Family Forum (gọi tắt là BQT) và công ty chủ
                    quản sở hữu Family Forum (công ty TNHH Hiệp Đồng). Nếu bạn
                    sử dụng thông tin ở Family Forum cho việc chống lại BQT hoặc
                    công ty Hiệp Đồng thì bạn sẽ phải chịu tất cả mọi chi phí
                    trực tiếp hoặc gián tiếp cho BQT hoặc công ty TNHH Hiệp Đồng
                    trong bất cứ tình huống nào.
                </li>
                <li>
                    {" "}
                    Quyền của ban quản trị (BQT): Ban quản trị diễn đàn Family Forum có toàn quyền với những nội dung, cấu trúc, và các thông
                    tin khác trên diễn đàn Family Forum.
                </li>
                <li>
                    {" "}
                    Việc sử dụng phần mềm đồng loạt truy cập vào Family Forum
                    một cách đồng thời với mục tiêu tấn công máy chủ của
                    Family Forum (gọi tắt là tấn công) là hoạt động phương hại
                    đến toàn thể cộng đồng thành viên của Family Forum và làm
                    ảnh hưởng nghiêm trọng đến quyền lợi của mỗi thành viên. Khi
                    bạn phát động tấn công máy chủ của Family Forum là đồng
                    nghĩa với việc bạn đồng ý và cam kết nộp phạt cho BQT
                    Family Forum số tiền lên đến 100 tỷ đồng.
                </li>
            </ul>

        </div>
    );
};

export default Rules;
