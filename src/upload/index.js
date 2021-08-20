import { Button, Divider, Form, Input, InputNumber, Upload } from "antd";
import { useState } from "react";
import { API_URL } from "../config/constants"
import "./index.css";
function UploadPage() {
    const [imageUrl, setImageUrl] = useState(null)
    // 람다 상품 업로드에 온서브밋이 여기 밸류로 들감
    const onSubmit = (values) => {
        console.log(values);
    }
    // 파일이 업로딩 중이면 냅두고 업로드가 완되면 실행
    const onChangeImage = (info) => {
        if (info.file.status === 'uploading') {
            return;
        }
        if (info.file.status === 'done') {
            const response = info.file.response;
            const imageUrl = response.imageUrl;
            // 이미지 업로드 하면 이미지 스테이트 업데이트 해줌
            setImageUrl(imageUrl);
        }
    }
    return (
        <div id="upload_container">
            {/* 폼은 그냥 감싸주는 듯  */}
            <Form name="상품 업로드" onFinish={onSubmit}>
                {/* 폼은 폼 아이템으로부터 관리 
                업로드(이름)은 온서브밋으 키값이 된다함*/}
                <Form.Item name="upload" label={<div className="upload_label">상품 사진</div>}>
                    {/* 이미지 업로드 이미지 올리면  */}
                    <Upload name="image"
                        action={`${API_URL}/image`}
                        listType="picture"
                        showUploadList={false}
                        onChange={onChangeImage} >
                        {
                            // 삼항연산자이미지 유알엘 있으면 보여주고 없으면 업로드 하라는 거 출력
                            imageUrl ? <img id="upload_img" src={`${API_URL}/${imageUrl}`} /> :
                                (<div id="upload_img_placeholder">
                                    <img src="/images/icons/camera.png" />
                                    <span>이미지를 업로드해주세요.</span>
                                </div>)
                        }
                    </Upload>
                </Form.Item >
                {/* 영역나누기 선도 그어줌*/}
                <Divider />
                {/* 라벨은 인풋(입력칸)옆에 뭐 만들어줌        룰 1. 무조건 입력 되야함 */}
                <Form.Item name="seller" label={<div className="upload_label">판매자 명</div>}
                    rules={[{ required: true, message: '판매자 이름을 입력해주세요.' }]}>
                    <Input className="upload_name" size="large" placeholder="이름을 입력해주세요." />
                </Form.Item>
                <Divider />
                <Form.Item name="name" label={<div className="upload_label">상품 이름</div>}
                    rules={[{ required: true, message: "상품 이름을 입력해주세요." }]}>
                    <Input className="upload_name" size="large" placeholder="상품 이름을 입력해주세요." />
                </Form.Item>
                <Divider />
                <Form.Item
                    name="price"
                    label={<div className="upload_label">상품 가격</div>}
                    rules={[{ required: true, message: '상품 가격을 입력해주세요' }]}>
                    <InputNumber className="upload_price" size="large" defaultValue={0} />
                </Form.Item>
                <Divider />
                <Form.Item name="description" label={<div className="upload_label">상품 소개</div>}
                    rules={[{ required: true, message: "상품 소개를 입력해주세요" }]}>
                    <Input.TextArea size="large" id="product_description" showCount maxLength={300}
                        placeholder="상품 소개를 적어주세요." />
                </Form.Item>
                <Divider />
                <Form.Item>
                    <Button id="submit_button" size="large" htmlType="submit">등록</Button>
                </Form.Item>
            </Form>
        </div >
    )
}

export default UploadPage