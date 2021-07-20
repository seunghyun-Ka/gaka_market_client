import { Button, Divider, Form, Input, InputNumber } from "antd";
import "./index.css";
function UploadPage() {
    // 람다 상품 업로드에 온서브밋이 여기 밸류로 들감
    const onSubmit = (values) => {
        console.log(values);
    }
    return (
        <div id="upload_container">
            {/* 폼은 그냥 감싸주는 듯  */}
            <Form name="상품 업로드" onFinish={onSubmit}>
                {/* 폼은 폼 아이템으로부터 관리 
                업로드(이름)은 온서브밋으 키값이 된다함*/}
                <Form.Item name="upload" label={<div className="upload_label">상품 사진</div>}>
                    <div id="upload_img_placeholder">
                        <img src="/images/icons/camera.png" />
                        <span>이미지를 업로드해주세요.</span>
                    </div>
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
        </div>
    )
}

export default UploadPage