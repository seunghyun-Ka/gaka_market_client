// css가져오기 npm install axios 통신 라이브러리 npm install react-router-dom, npm install antd
import React from 'react';
import './index.css';
import axios from "axios"
import { Link } from 'react-router-dom'
import dayjs from 'dayjs';
import relativeTime from "dayjs/plugin/relativeTime"
import 'dayjs/locale/ko';
import { API_URL } from '../config/constants';
import { Carousel } from 'antd';

dayjs.extend(relativeTime);
dayjs.locale('ko');
// 배너 움직이게


function MainPage() {
    // 리엑트 사용 프로덕트는 배열이기 때문에 빈 배열 사용
    // 리엑트는 물건 카드 업뎃하는데 사용(엑시오스에서 가져언거 업뎃용)
    const [products, setProducts] = React.useState([]);
    const [banners, setBanners] = React.useState([]);
    // 무한반복 없에는 코드 setProducts가 product계속 업뎃시키면서 무한반복함 그거 없애줌
    React.useEffect(
        function () {
            axios.get(`${API_URL}/products`)
                .then(function (result) {
                    const products = result.data.products;
                    // 업데이트 함수
                    setProducts(products);
                }).catch(function (error) {
                    console.error("에러 발생", error)
                })

            axios.get(`${API_URL}/banners`).then((result) => {
                const banners = result.data.banners;
                setBanners(banners);
            }).catch((error) => {
                console.error("에러 발생 : ", error);
            })
        }, [])
    // 엑시옥수로 목서버에서 가져온다 정보들

    // 여기선 div로 씌워줘야함 크게
    return (
        <div>
            <Carousel autoplay autoplaySpeed={3000}>
                {banners.map((banner, index) => {
                    return (
                        <Link to={banner.href}>
                            <div id="banner">
                                <img src={`${API_URL}/${banner.imageUrl}`} />
                            </div>
                        </Link>
                    );
                })}
            </Carousel>
            <h1 id="product_headline">판매되는 상품들</h1>
            <div id="product_list">
                {/* 리엑트 사용위해 jsx문법 사용 */}
                {
                    // map은 함수를 순회함 순회하면서 div태그들을 리턴해줌 위에 리엑트[]가 빈칸이면 0번 순회
                    products.map(function (product, index) {
                        return (
                            <div className="product_card">
                                {
                                    product.soldout === 1 && <div className="product_blur" />
                                }
                                {/* 카드 누르면 페이지 이동              템플릿 리터럴*/}
                                <Link className="product_link" to={`products/${product.id}`}>
                                    <div>
                                        <img className="product_img" src={`${API_URL}/${product.imageUrl}`} />
                                    </div>
                                    <div className="product_contents">
                                        <span className="product_name"> {product.name} </span>
                                        <span className="product_price"> {product.price}원 </span>
                                        <div className="product_footer">
                                            <div className="product_seller">
                                                <img className="product_avatar" src="images/icons/avatar.png" />
                                                <span>{product.seller}</span>
                                            </div>
                                            <span className="product_date">{dayjs(product.createdAt).fromNow()}</span>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        )
                    })
                }
            </div>

        </div>
    )
}
export default MainPage;