// 아이디에 따라 페이지 다르게 해주는 것
import { useParams } from 'react-router-dom';
//프로덕트 아이디에 따라 네트워크 요청 하기 위한 것
import axios from "axios"
import { useEffect, useState } from 'react';
import './index.css';
import { API_URL } from "../config/constants";
// 날자 보기 쉽게
import dayjs from 'dayjs';
import { Button, message } from 'antd'

function ProductPage() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const getProduct = () => {
        // 새로고침 같이 써도 됨 새로 통신해서 가져오는 코드기 때문
        axios.get(`${API_URL}/products/${id}`).then(
            function (result) {
                //data 다음에 product써줘서 거기 접근한다.
                setProduct(result.data.product)
            }
        ).catch(function (error) {
            console.error(error);
        });
    }

    useEffect(function () {
        getProduct();
    }, []);

    // 방어코드 위에꺼가 다 실행되야 아래로 넘어가야함
    //여기서 걸려서 끝나도 인터넷에서 받아오는 순간 product의 값이 바뀌기 때문에 다시 실행되는듯
    if (product === null) {
        return <h1>상품 정보를 받고 있습니다...</h1>
    }



    // 결재 버튼
    const onClickPurchase = () => {
        // 이걸로 접속하면 1로 바뀜
        axios.post(`${API_URL}/purchase/${id}`)
            .then((result) => {
                // 새로고침
                getProduct();
                message.info("구매 완료.");
            }).catch((error) => {
                message.error(`에러 발생. ${error.message}`)
            })
    }

    return (
        <div>
            <div id="image_box">
                <img src={`${API_URL}/${product.imageUrl}`} />
            </div>
            <div id="profile_box">
                <img src="/images/icons/avatar.png" />
                <span>{product.seller}</span>
            </div>
            <div id="contents_box">
                <div id="name">{product.name}</div>
                <div id="price">{product.price}원</div>
                <div id="createdAt">{dayjs(product.createdAt).format('YYYY년 MM월 DD일')}</div>
                {/* 버튼 클릭 했을 때 온클릭 함수 실행 */}
                <Button size='large'
                    id="purchase_button"
                    type="primary"
                    danger onClick={onClickPurchase}
                    disabled={product.soldout === 1}>
                    구매하기
                </Button>
                <pre id="description">{product.description}</pre>
                {/* pre는 줄바꿈 가능 */}
            </div>
        </div >
    );
}

export default ProductPage;

//상품 상세 페이지