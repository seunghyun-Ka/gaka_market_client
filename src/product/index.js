// 아이디에 따라 페이지 다르게 해주는 것
import { useParams } from 'react-router-dom';
//프로덕트 아이디에 따라 네트워크 요청 하기 위한 것
import axios from "axios"
import { useEffect, useState } from 'react';
import './index.css';
import { API_URL } from "../config/constants";

function ProductPage() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    useEffect(function () {
        axios.get(`${API_URL}/products/${id}`).then(
            function (result) {
                //data 다음에 product써줘서 거기 접근한다.
                setProduct(result.data.product)
            }
        ).catch(function (error) {
            console.error(error);
        });
    }, []);

    // 방어코드 위에꺼가 다 실행되야 아래로 넘어가야함
    //여기서 걸려서 끝나도 인터넷에서 받아오는 순간 product의 값이 바뀌기 때문에 다시 실행되는듯
    if (product === null) {
        return <h1>상품 정보를 받고 있습니다...</h1>
    }

    return (
        <div>
            <div id="image_box">
                <img src={"/" + product.imageUrl} />
            </div>
            <div id="profile_box">
                <img src="/images/icons/avatar.png" />
                <span>{product.seller}</span>
            </div>
            <div id="contents_box">
                <div id="name">{product.name}</div>
                <div id="price">{product.price}원</div>
                <div id="createdAt">2021년 7월 19일</div>
                <div id="description">{product.description}</div>
            </div>
        </div>
    );
}

export default ProductPage;

//상품 상세 페이지